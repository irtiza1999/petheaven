import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

const addOrderItems = asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
  
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      orderItems.map(async (item) => {
        const product = await Product.findById(item._id);
        if (product) {
          product.countInStock = product.countInStock - item.qty;
          await product.save();
        }
      });

      const order = new Order({
        orderItems: orderItems.map((x) => ({
          ...x,
          product: x._id,
          _id: undefined,
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
  
      const createdOrder = await order.save();
  
      res.status(201).json(createdOrder);
    }
  });

  const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name email');
    if(orders){
      res.json(orders);
    }else{
      res.status(404);
      throw new Error('Orders not found');
    }
  });


  const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.orderId).populate(
      'user',
      'name email'
    );
    if(order){
      res.json(order);
    }else{
      res.status(404);
      throw new Error('Order not found');
    }
  });
  
  const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    if(order){
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      const updateOrder = await order.save();
      res.json(updateOrder);
    }else{
      res.status(404);
      throw new Error('Order not found');
    }
  });

  const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    if(order){
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updateOrder = await order.save();
      res.json(updateOrder);
    }else{
      res.status(404);
      throw new Error('Order not found');
    }
  });

const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.userId })
    .sort({ createdAt: -1 })
    .exec();

  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('Orders not found');
  }
});


const updateOrderToCancel = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.body.orderId);
  if (order) {
    await Promise.all(
      order.orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        if (product) {
          product.countInStock += item.qty;
          await product.save();
        }
      })
    );

    order.isCancelled = true;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const filterOrder = asyncHandler(async (req, res) => {
  const filter = req.params.filter;
  if(filter === 'paid'){
    const orders = await Order.find({ isPaid: true }).populate(
      'user',
      'name email'
    )
    .sort({ createdAt: -1 })
    .exec();
    res.status(200).json(orders);
  }else if(filter === 'notPaid'){
    const orders = await Order.find({ isPaid: false }).populate(
      'user',
      'name email'
    ).sort({ createdAt: -1 })
    .exec();
    res.status(200).json(orders);
  }else if(filter === 'delivered'){
    const orders = await Order.find({ isDelivered: true }).populate(
      'user',
      'name email'
    ).sort({ createdAt: -1 })
    .exec();
    res.status(200).json(orders);
  }else if(filter === 'notDelivered'){
    const orders = await Order.find({ isDelivered: false }).populate(
      'user',
      'name email'
    ).sort({ createdAt: -1 })
    .exec();
    res.status(200).json(orders);
  }else if(filter === 'cancelled'){
    const orders = await Order.find({ isCancelled: true }).populate(
      'user',
      'name email'
    ).sort({ createdAt: -1 })
    .exec();
    res.status(200).json(orders);
  }else if(filter === 'notCancelled'){
    const orders = await Order.find({ isCancelled: false }).populate(
      'user',
      'name email'
    ).sort({ createdAt: -1 })
    .exec();
    res.status(200).json(orders);
  }else{
    res.status(404);
    throw new Error('Invalid filter');
  }
});  

  export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders,
    myOrders,
    updateOrderToCancel,
    filterOrder
  };
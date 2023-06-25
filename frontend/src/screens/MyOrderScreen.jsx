import { useEffect } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice.js';
import { useSelector } from 'react-redux';
import { useCreateOrderMutation, useCancelOrderMutation } from '../slices/ordersApiSlice.js';
import { toast } from 'react-toastify';

const MyOrderScreen = () => {
  const { userInfo } = useSelector(state => state.auth);
  const userId = userInfo?._id;
  const { data: orders, refetch, isLoading, isError, error } = useGetMyOrdersQuery({userId});

  useEffect(() => {
    refetch();
  }, []);
  const [createOrder, { ReorderIsLoading, ReorderError }] = useCreateOrderMutation();
  const [cancelOrder, { cancelOrderIsLoading, cancelOrderError }] = useCancelOrderMutation();

  const placeOrderHandler = async (orderId) => {
    try {
      const res = await createOrder({
        orderItems: orderId.orderItems,
        shippingAddress: orderId.shippingAddress,
        paymentMethod: orderId.paymentMethod,
        itemsPrice: orderId.itemsPrice,
        shippingPrice: orderId.shippingPrice,
        taxPrice: orderId.taxPrice,
        totalPrice: orderId.totalPrice,
      }).unwrap();
      toast.success('Reorder Successful!!');
      refetch();
    } catch (err) {
      toast.error(err);
    }
  };

  const cancelOrderHandler = async (orderId) => {
    try {
      const res = await cancelOrder({orderId :orderId})
      console.log(res);
      if(res.error){
          toast.error(res.error.data.message);
      }else{
        toast.success('Order Cancelled Successfully!!');
        refetch();
      }
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <Grid container spacing={2} style={{paddingTop:'40px'}}>
      <Grid item xs={12}>
        <Typography variant="h3" style={{padding:'20px'}}>My Orders</Typography>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message>{error?.message}</Message>
        ) : !orders || orders.length === 0 ? (
          <Message>No orders found.</Message>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Total Price</b></TableCell>
                  <TableCell><b>Payment Status</b></TableCell>
                  <TableCell><b>Delivery Status</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders && orders.map((order) => (
                    <>
                  <TableRow key={order._id}>
                    <LinkContainer to={`/order/${order._id}`} style={{ cursor: 'pointer', color: 'blue' }}>
                      <TableCell><b>{order._id}</b></TableCell>
                    </LinkContainer>
                    <TableCell>${order.totalPrice}</TableCell>
                    {order.isPaid ? (
                      <TableCell>
                        <b style={{ color: 'green' }}>
                          Paid at :{' '}
                        </b>
                        {new Date(order.paidAt).toLocaleString()}
                      </TableCell>
                    ) : (
                      <TableCell style={{ color: 'red' }}><b>Not Paid</b></TableCell>
                    )}

                    {order.isPaid && !order.isDelivered ? (
                      <TableCell>
                        <b style={{ color: 'red' }}>
                          Not Delivered
                        </b>
                      </TableCell>
                    ) : !order.isDelivered && !order.isPaid ? (
                      <TableCell style={{ color: 'red' }}><b>Not Delivered</b></TableCell>
                    ) : (
                      <TableCell style={{ color: 'green' }}><b>Delivered</b></TableCell>
                    )}
                    {!order.isPaid ? (
                    <TableCell>
                      {!order.isCancelled ? (
                        <Button variant="danger" onClick={() => cancelOrderHandler(order._id)}>
                          Cancel Order
                        </Button>
                      ) : (
                        <Message variant="error">
                          Order Cancelled
                        </Message>
                      )}
                    </TableCell>
                  ) : order.isDelivered ? (
                    <TableCell>
                      <Button variant="success" onClick={() => placeOrderHandler(order)}>
                        Reorder
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <Button variant="danger" disabled>
                        Cancel Order
                      </Button>
                    </TableCell>
                  )}
                  </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default MyOrderScreen;

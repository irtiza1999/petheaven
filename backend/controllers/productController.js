import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Review from '../models/reviewModel.js';


const getProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById( productId );
    if(product){
        res.status(200).json(product);

    }else{
        res.status(404);
        throw new Error('Product not found');
    }
});

const getUniqueCategories = asyncHandler(async (req, res) => {
    const categories = await Product.distinct('petCategory');
    res.status(200).json(categories);
  });

const getCategoryProducts = asyncHandler(async (req, res) => {
    const category = req.params.myCategory;
    const products = await Product.find({ petCategory: category});
    if (products.length === 0) {
      res.status(404);
      throw new Error('No products found');
    } else {
      res.status(200).json(products);
    }
  });

const createProduct = asyncHandler(async (req, res) => {
    const {name,description,petCategory,itemCategory
        ,price,countInStock,image} = req.body;
    const product = await Product.findOne({ name:name });
    if(product){
        res.status(400);
        throw new Error('Product already exists');
    }
    else{
        const imageName = (req.file) ? req.file.filename : null;
        const category = petCategory.toUpperCase();
        const subCat = itemCategory.toUpperCase();
        const newProduct = await Product.create({
            name,
            description,
            petCategory : category,
            itemCategory : subCat,
            price,
            countInStock,
            image: imageName,
        });
        if(newProduct){
            res.status(201).json({
                name : product.name,
                description : product.description,
                petCategory : product.petCategory,
                itemCategory : product.itemCategory,
                price : product.price,
                countInStock : product.countInStock,
                image : product.image
            });
        }else{
            res.status(400);
            throw new Error('Invalid product data');
        }
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.body.productId;
    const product = await Product.findById(productId);
    if(product){
        const imageName = (req.file) ? req.file.filename : null;
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.petCategory = req.body.petCategory || product.petCategory;
        product.itemCategory = req.body.itemCategory || product.itemCategory;
        product.price = req.body.price || product.price;
        product.countInStock = req.body.countInStock || product.countInStock;
        product.image = imageName || product.image;
        
        const updatedProduct = await product.save();
        res.status(200).json({
            _id : updatedProduct._id,
            name : updatedProduct.name,
            description : updatedProduct.description,
            category : updatedProduct.category,
            price : updatedProduct.price,
            countInStock : updatedProduct.countInStock,
            image : updatedProduct.image
        });
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
});


const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.body.productId;
    console.log(productId);
    const deletedProduct = await Product.deleteOne({ _id: productId });
    if(deletedProduct){
        res.status(200).json({message: 'Product removed'});
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
});

const getProductsByFilter = asyncHandler(async (req, res) => {
    const filter = req.params.filter;
    if (filter === 'pLow'){
        const products = await Product.find({}).sort({ price: 1 });
        res.status(200).json(products);
    }else if (filter === 'pHigh'){
        const products = await Product.find({}).sort({ price: -1 });
        res.status(200).json(products);}
    else if (filter === 'alphaA'){
        const products = await Product.find({}).sort({ name: 1 });
        res.status(200).json(products);}
    else if (filter === 'alphaZ'){
        const products = await Product.find({}).sort({ name: -1 });
        res.status(200).json(products);}
    else if (filter === 'ratingHigh'){
        const products = await Product.find({}).sort({ rating: -1 });
        res.status(200).json(products);}
    else if (filter === 'ratingLow'){
        const products = await Product.find({}).sort({ rating: 1 });
        res.status(200).json(products);}
    else if (filter === 'stock') {
        const products = await Product.find({ countInStock: { $gt: 0 } }).sort({ countInStock: -1 });
        res.status(200).json(products);
        }
    else{
        res.status(404);
        throw new Error('Invalid filter');
    }
  });

const getProductsBySearch = asyncHandler(async (req, res) => {
    const search = req.params.search;
    const products = await Product.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { petCategory: { $regex: search, $options: 'i' } },
          { itemCategory: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ]
      });
    if (products.length === 0) {
        res.status(404);
        throw new Error('No products found');
    } else {
        res.status(200).json(products);
    }
    });

const getSubCategoryProducts = asyncHandler(async (req, res) => {
    const category = req.params.category;
    const products = await Product.find({ itemCategory: category });
    if (products.length === 0) {
      res.status(404);
      throw new Error('No products found');
    } else {
      res.status(200).json(products);
    }
  });

const getUniqueSubCategories = asyncHandler(async (req, res) => {
    const categories = await Product.distinct('itemCategory');
    res.status(200).json(categories);
  });

const categorySubcategoryProduct = asyncHandler(async (req, res) => {
    const category = req.params.category;
    const subcategory = req.params.subcategory;
    const products = await Product.find({ itemCategory: subcategory, petCategory: category });
    if (products.length === 0) {
        res.status(404);
        throw new Error('No products found');
    } else {
        res.status(200).json(products);
    }
    });

const uniqueCategorySubcategory = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const products = await Product.find({ petCategory: category });
  const categorySubcategories = {};

  products.forEach(product => {
    const subcategory = product.itemCategory;
    if (subcategory) {
      if (!categorySubcategories[category]) {
        categorySubcategories[category] = new Set();
      }
      categorySubcategories[category].add(subcategory);
    }
  });

  const distinctSubcategories = {};
  for (const category in categorySubcategories) {
    distinctSubcategories[category] = [...categorySubcategories[category]];
  }

  if (Object.keys(distinctSubcategories).length === 0) {
    res.status(404);
    throw new Error('No subcategories found for the given category');
  } else {
    res.status(200).json(distinctSubcategories);
  }
});


export {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getUniqueCategories,
    getCategoryProducts,
    getProductsByFilter,
    getProductsBySearch,
    getSubCategoryProducts,
    getUniqueSubCategories,
    categorySubcategoryProduct,
    uniqueCategorySubcategory
};
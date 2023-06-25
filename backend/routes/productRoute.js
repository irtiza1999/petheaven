import express from 'express';
import {getProduct, createProduct, getProductById, 
    updateProduct, deleteProduct, getUniqueCategories, getCategoryProducts, 
    getProductsByFilter, getProductsBySearch} from '../controllers/productController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/category', getUniqueCategories);
router.get('/:productId', getProductById);
router.get('/', getProduct);
router.get('/category/:myCategory', getCategoryProducts);
router.get('/filter/:filter', getProductsByFilter);
router.get('/search/:search', getProductsBySearch);
router.post('/', protect, createProduct);
router.put('/', protect, updateProduct);
router.delete('/', protect, deleteProduct);


export default router;
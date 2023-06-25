import express from 'express';
import {getProduct, createProduct, getProductById, 
    updateProduct, deleteProduct, getUniqueCategories, getCategoryProducts, 
    getProductsByFilter, getProductsBySearch, 
    getSubCategoryProducts,getUniqueSubCategories, categorySubcategoryProduct,
    uniqueCategorySubcategory
} from '../controllers/productController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/category', getUniqueCategories);
router.get('/subcategory', getUniqueSubCategories);
router.get('/:productId', getProductById);
router.get('/', getProduct);
router.get('/category/:myCategory', getCategoryProducts);
router.get('/filter/:filter', getProductsByFilter);
router.get('/search/:search', getProductsBySearch);
router.post('/', protect, createProduct);
router.put('/', protect, updateProduct);
router.delete('/', protect, deleteProduct);
router.get('/subcategory/:category', getSubCategoryProducts);
router.get('/item/:category', uniqueCategorySubcategory);
router.get('/:category/:subcategory', categorySubcategoryProduct);




export default router;
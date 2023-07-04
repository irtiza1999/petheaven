import express from 'express';
import {getProduct, createProduct, getProductById, 
    updateProduct, deleteProduct, getUniqueCategories, getCategoryProducts, 
    getProductsByFilter, getProductsBySearch, 
    getSubCategoryProducts,getUniqueSubCategories, categorySubcategoryProduct,
    uniqueCategorySubcategory
} from '../controllers/productController.js';
import {protect} from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage(
    {
        destination: function(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }
)
const upload = multer({storage: storage});

router.get('/category', getUniqueCategories);
router.get('/subcategory', getUniqueSubCategories);
router.get('/:productId', getProductById);
router.get('/', getProduct);
router.get('/category/:myCategory', getCategoryProducts);
router.get('/filter/:filter', getProductsByFilter);
router.get('/search/:search', getProductsBySearch);
router.put('/', upload.single('image'), protect, updateProduct);
router.post('/', upload.single('image'), protect, createProduct);
router.delete('/', protect, deleteProduct);
router.get('/subcategory/:category', getSubCategoryProducts);
router.get('/item/:category', uniqueCategorySubcategory);
router.get('/:category/:subcategory', categorySubcategoryProduct);




export default router;
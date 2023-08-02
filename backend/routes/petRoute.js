import express from 'express';
import {  createPet, getAllPet, getPetById, getAllPetsNotVerified,
    markAsVerified, markAsAdopted } from '../controllers/petController.js';

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
 

router.post('/', upload.single('image'),createPet);
router.get('/', getAllPet);
router.get('/:id', getPetById);
router.get('/admin/all', getAllPetsNotVerified);
router.put('/admin/verify/:id', markAsVerified)
router.put('/admin/adopt/:id', markAsAdopted)
export default router;
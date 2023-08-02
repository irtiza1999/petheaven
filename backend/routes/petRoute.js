import express from 'express';
import {  createPet, getAllPet, getPetById, getAllPetsNotVerified,
    markAsVerified, markAsAdopted } from '../controllers/petController.js';

const router = express.Router();
 

router.post('/', createPet);
router.get('/', getAllPet);
router.get('/:id', getPetById);
router.get('/admin/all', getAllPetsNotVerified);
router.put('/admin/verify/:id', markAsVerified)
router.put('/admin/adopt/:id', markAsAdopted)
export default router;
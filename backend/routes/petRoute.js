import express from 'express';
import {  createPet, getAllPet, getPetById } from '../controllers/petController.js';

const router = express.Router();
 

router.post('/', createPet);
router.get('/', getAllPet);
router.get('/:id', getPetById);
export default router;
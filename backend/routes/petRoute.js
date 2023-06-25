import express from 'express';
import { petInfo, createPet, allPetInfo, removePet, updatePet } from '../controllers/petController.js';

const router = express.Router();
 
router.get('/', allPetInfo);
router.delete('/', removePet);
router.get('/:name', petInfo);
router.put('/', updatePet);
router.post('/', createPet);

export default router;
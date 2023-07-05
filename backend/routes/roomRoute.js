import express from 'express';
import { createRoom, getAllAvailableRooms, getRoomById, createBooking
 } from '../controllers/roomController.js';
import {protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',protect, createRoom);
router.get('/available', protect, getAllAvailableRooms);
router.get('/:id', protect, getRoomById);
router.put('/book', protect, createBooking);


export default router;
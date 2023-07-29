import express from 'express';
import { createRoom, getAllRooms, getRoomById, createBooking
 } from '../controllers/roomController.js';
import {protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',protect, createRoom);
router.get('/available', protect, getAllRooms);
router.get('/:id', protect, getRoomById);
router.put('/book/room', protect, createBooking);

export default router;
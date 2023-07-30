import express from 'express';
import { createRoom, getAllRooms, getRoomById, createBooking, getMyBookings,
    getAllRoomsByDate,getAllBookings,markAsPaid
 } from '../controllers/roomController.js';
import {protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',protect, createRoom);
router.get('/available', protect, getAllRooms);
router.get('/:id', protect, getRoomById);
router.put('/book/room', protect, createBooking);
router.get('/myBookings/:id', protect, getMyBookings);
router.get('/available/:in/:out', protect, getAllRoomsByDate);
router.get('/admin/allBookings', protect, getAllBookings);
router.put('/admin/markAsPaid', protect, markAsPaid);

export default router;
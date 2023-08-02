import express from 'express';
import { createRoom, getAllRooms, getRoomById, createBooking, getMyBookings,
    getAllRoomsByDate,getAllBookings,markAsPaid, updateRoom
 } from '../controllers/roomController.js';
import {protect, admin} from '../middleware/authMiddleware.js';
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

router.post('/',protect, createRoom);
router.get('/available', protect, getAllRooms);
router.get('/:id', protect, getRoomById);
router.put('/book/room', protect, createBooking);
router.get('/myBookings/:id', protect, getMyBookings);
router.get('/available/:in/:out', protect, getAllRoomsByDate);
router.get('/admin/allBookings', protect, getAllBookings);
router.put('/admin/markAsPaid', protect, markAsPaid);
router.put('/admin/updateRoom', upload.single('image'), protect, updateRoom)

export default router;
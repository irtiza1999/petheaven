import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Room from '../models/roomModel.js';

const createRoom = asyncHandler(async (req, res) => {
    const { name, roomNumber, type, petCategory, price, image } = req.body;
    const nameExists = await Room.findOne({ name });
    if(nameExists) {
        res.status(400);
        throw new Error('Room already exists');
    }else{
        const numExists = await Room.findOne({ roomNumber });
        if(numExists) {
            res.status(400);
            throw new Error('Room number already exists');
        }else{
            const room = new Room({
                name,
                roomNumber,
                type,
                petCategory,
                price,
                image,
            });
            const createdRoom = await room.save();
            res.status(201).json(createdRoom);
        }
    }
});

const getAllAvailableRooms = asyncHandler(async (req, res) => {
    const today = new Date();
    const rooms = await Room.find({
        $or: [
            { "booking.isBooked": false },
            { "booking.checkInDate": { $lte: today } },
            { "booking.checkOutDate": { $gte: today } },
            ],
            });
    if(rooms.length > 0) {
    res.json(rooms);
    } else {
        res.status(404);
        throw new Error('No rooms found');
    }
});

const getRoomById = asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id);
    if(room) {
        res.json(room);
    } else {
        res.status(404);
        throw new Error('Room not found');
    }
});

const createBooking = asyncHandler(async (req, res) => {
  const { id, checkInDate, checkOutDate, userId, totalPrice } = req.body;
  const room = await Room.findById(id);

  if (room) {
    const overlappingBooking = room.booking.find(
      (booking) =>
        booking.isBooked &&
        checkInDate < booking.checkOutDate &&
        checkOutDate > booking.checkInDate
    );

    if (overlappingBooking) {
      res.status(400);
      throw new Error('Room is already booked for these dates');
    } else {
      room.booking.push({
        isBooked: true,
        checkInDate,
        checkOutDate,
        user: userId,
        totalPrice,
        isPaid: true,
      });

      const updatedRoom = await room.save();
      res.json(updatedRoom);
    }
  } else {
    res.status(404);
    throw new Error('Room not found');
  }
});


  export {
    createRoom,
    getAllAvailableRooms,
    getRoomById,
    createBooking,

  };
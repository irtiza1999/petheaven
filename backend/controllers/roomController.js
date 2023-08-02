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

const getAllRooms = asyncHandler(async (req, res) => {
    const rooms = await Room.find({});
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
  try {
    const room = await Room.findById(id);
    const findUser = await User.findById(userId);
    if (room && findUser) {
      let overlappingBooking = false;
      for (const booking of room.booking) {
        const bookingCheckInDate = new Date(booking.checkInDate);
        const bookingCheckOutDate = new Date(booking.checkOutDate);
        if (
          checkInDate < bookingCheckOutDate ||
          checkOutDate > bookingCheckInDate
        ) {
          overlappingBooking = true;
          break; // Stop checking further bookings, as there's already an overlap
        }
      }

      if (overlappingBooking) {
        res.status(400);
        throw new Error('Room is already booked for these dates');
      } else {
        const newBooking = {
          isBooked: true,
          checkInDate,
          checkOutDate,
          user: findUser._id,
          totalPrice,
        };

        room.booking.push(newBooking);

        const updatedRoom = await room.save();

        // Send a response with the updated room details
        res.json(updatedRoom);
      }
    } else {
      res.status(404);
      throw new Error('Room or User not found');
    }
  } catch (error) {
    console.error('Error in creating booking:', error);
    res.status(500);
    throw new Error('Error in saving room: ' + error.message);
  }
});


const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Room.find({ 'booking.user': req.params.id });
  if (bookings) {
    let bookList = [];
    bookings.forEach((booking) => {
      booking.booking.forEach((book) => {
        if (book.user.toString() === req.params.id) {
          bookList.push(book);
        }
      });
    });
    res.json(bookList);
  } else {
    res.status(404);
    throw new Error('No bookings found');
  }
});

const getAllRoomsByDate = asyncHandler(async (req, res) => {
  const { in: checkInDate, out: checkOutDate } = req.params;
  const rooms = await Room.find({});
  if (rooms.length > 0) {
    const availableRooms = [];
    for (const room of rooms) {
      let overlappingBooking = false;
      for (const booking of room.booking) {
        const bookingCheckInDate = new Date(booking.checkInDate);
        const bookingCheckOutDate = new Date(booking.checkOutDate);
        if (
          checkInDate < bookingCheckOutDate ||
          checkOutDate > bookingCheckInDate
        ) {
          overlappingBooking = true;
          break; // Stop checking further bookings, as there's already an overlap
        }
      }

      if (!overlappingBooking) {
        availableRooms.push(room);
      }
    }
    res.json(availableRooms);
  } else {
    res.status(404);
    throw new Error('No rooms found');
  }
});

const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Room.find({ 'booking.isBooked': true });
  if (bookings) {
    res.json(bookings);
  } else {
    res.status(404);
    throw new Error('No bookings found');
  }
});

const markAsPaid = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  console.log(orderId);
  const bookings = await Room.find({ 'booking._id': orderId });
  if (bookings) {
    bookings[0].booking.forEach((booking) => {
      if (booking._id.toString() === orderId) {
        booking.isPaid = true;
        booking.paidAt = Date.now();
      }
    });
    const updatedRoom = await bookings[0].save();
    res.json(updatedRoom);
  } else {
    res.status(404);
    throw new Error('No bookings found');
  }
});


  export {
    createRoom,
    getAllRooms,
    getRoomById,
    createBooking,
    getMyBookings,
    getAllRoomsByDate,
    getAllBookings,    
    markAsPaid,
  };
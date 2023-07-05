import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    petCategory: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    numReviews: {
      type: Number,
      default: 0,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      required: true,
    },
    booking: [{
        isBooked: {
            type: Boolean,
            default: false,
            required: true,
        },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      checkInDate: {
        type: Date,
      },
      checkOutDate: {
        type: Date,
      },
      totalPrice: {
        type: Number,
      },
      isPaid: {
        type: Boolean,
        default: false,
      },
      paidAt: {
        type: Date,
      },
    }],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;

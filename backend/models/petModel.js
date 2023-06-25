import mongoose from "mongoose";

const petSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    species: {
      type: String,
      required: true
    },
    breed: String,
    age: {
      type: Number,
      min: 0
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Unknown"]
    },
    color: String,
    size: {
      type: String,
      enum: ["Small", "Medium", "Large"]
    },
    weight: {
      type: Number,
      min: 0
    },
    description: String,
    temperament: String,
    isAdopted: {
      type: Boolean,
      default: false
    },
    adoptionFee: Number,
    images: String,
    location: String,
    contactInfo: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Pet = mongoose.model("Pet", petSchema);

export default Pet;

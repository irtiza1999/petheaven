import asyncHandler from 'express-async-handler';
import Pet from '../models/petModel.js';
import Product from '../models/productModel.js';

const petInfo = asyncHandler(async (req, res) => {
});

const createPet = asyncHandler(async (req, res) => {
});

const allPetInfo = asyncHandler(async (req, res) => {
});

const removePet = asyncHandler(async (req, res) => {
});

const updatePet = asyncHandler(async (req, res) => {
});

export {
    petInfo,
    createPet,
    allPetInfo,
    removePet,
    updatePet
};
import asyncHandler from 'express-async-handler';
import Pet from '../models/petModel.js';
import Product from '../models/productModel.js';

const createPet = asyncHandler(async (req, res) => {
    const {name, species, breed, age, gender, color, size,
    weight, description, temperament, image, location, contactInfo} = req.body;
    
    const pet = await Pet.findOne({ name });
    if(pet){
        res.status(400);
        throw new Error('Pet already exists');
    }
    else{
        // const imageName = (req.file) ? req.file.filename : null;
        const newPet = await Pet.create({
            name, species, breed, age, gender, color, size,
            weight, description, temperament, image, location, contactInfo
        });
        if(newPet){
            res.status(201).json({
                name : pet.name,
            });
        }else{
            res.status(400);
            throw new Error('Invalid pet data');
        }
    }
});

const getAllPet = asyncHandler(async (req, res) => {
    const pets = await Pet.find({});
    res.json(pets);
});

const getPetById = asyncHandler(async (req, res) => {
    const pet = await Pet.findById(req.params.id);
    if(pet){
        res.json(pet);
    }else{
        res.status(404);
        throw new Error('Pet not found');
    }
});

export {
    createPet,
    getAllPet,
    getPetById
};
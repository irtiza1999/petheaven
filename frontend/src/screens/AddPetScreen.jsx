import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import Formcontainer from "../components/Formcontainer";
import {toast} from 'react-toastify'
import Loader from "../components/Loader";
import Message from "../components/Message";
import Grid from '@mui/material/Grid';
import {useCreatePetMutation} from '../slices/petApiSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AddPet = () => {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [weight, setWeight] = useState(0);
    const [description, setDescription] = useState('');
    const [temperament, setTemperament] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const [contactInfo, setContactInfo] = useState('');

    const navigate = useNavigate();
    
    const [createPet, { isLoading: isLoadingCreate, error: errorCreate }] = useCreatePetMutation();
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
const submitHandler = async (e) => {
  e.preventDefault();
  let imageBase64 = null;
    if (image) {
      imageBase64 = await readFileAsDataURL(image);
    }
  try {
    const petData = {
      name: name,
      species: species,
      breed: breed,
      age: age,
      gender: gender,
      color: color,
      size: size,
      weight: weight,
      description: description,
      temperament: temperament,
      image: imageBase64,
      location: location,
      contactInfo: contactInfo,
    };

    const res = await createPet(petData).unwrap();
    if (res) {
      navigate("/services/rescue");
      toast.success("Pet added successfully. Wait for verification");
    }
  } catch (err) {
    toast.error(err?.data?.message || err?.error);
    console.log(err);
  }
};


    return (
        <Grid container spacing={6}>
        <Grid item xs={12}>
        <Formcontainer>
            <h1>Add Pet</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className = 'my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter Name' value={name} 
            onChange={(e) => setName(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='species'>
            <Form.Label>Species</Form.Label>
            <Form.Control type='text' placeholder='Enter Species' value={species} 
            onChange={(e) => setSpecies(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='gender'>
            <Form.Label>Gender</Form.Label>
            <Form.Control as='select' value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value=''>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Unknown'>Unknown</option>
            </Form.Control>
        </Form.Group>

        <Form.Group className = 'my-2' controlId='breed'>
            <Form.Label>Breed</Form.Label>
            <Form.Control type='text' placeholder='Enter Breed' value={breed}
            onChange={(e) => setBreed(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='age'>
            <Form.Label>Age</Form.Label>
            <Form.Control type='text' placeholder='Enter Age' value={age}
            onChange={(e) => setAge(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='color'>
            <Form.Label>Color</Form.Label>
            <Form.Control type='text' placeholder='Enter Color' value={color}
            onChange={(e) => setColor(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='size'>
        <Form.Label>Size</Form.Label>
            <Form.Control as='select' value={size} onChange={(e) => setSize(e.target.value)}>
                <option value=''>Select Size</option>
                <option value='Small'>Small</option>
                <option value='Medium'>Medium</option>
                <option value='Large'>Large</option>
            </Form.Control>
        </Form.Group>

        <Form.Group className = 'my-2' controlId='weight'>
            <Form.Label>Weight</Form.Label>
            <Form.Control type='text' placeholder='Enter Weight' value={weight}
            onChange={(e) => setWeight(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' placeholder='Enter Description' value={description}
            onChange={(e) => setDescription(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='temperament'>
            <Form.Label>Temperament</Form.Label>
            <Form.Control type='text' placeholder='Enter Temperament' value={temperament}
            onChange={(e) => setTemperament(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='location'>
            <Form.Label>Location</Form.Label>
            <Form.Control type='text' placeholder='Enter Location' value={location}
            onChange={(e) => setLocation(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='contactInfo'>
            <Form.Label>Contact Info</Form.Label>
            <Form.Control type='text' placeholder='Enter Contact Info' value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}>
            </Form.Control>
        </Form.Group>
            <Form.Group className="my-2" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                placeholder="Image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Button type='submit' variant='success' className='mt-3'>Confirm</Button>
        </Form>
        </Formcontainer>
        </Grid>
        </Grid>
  )
}

export default AddPet

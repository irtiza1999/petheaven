import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import Formcontainer from "../../components/Formcontainer";
import {toast} from 'react-toastify'
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Grid from '@mui/material/Grid';
import AdminPanelScreen from './AdminPanelScreen.jsx';
import {useCreateRoomMutation} from '../../slices/roomApiSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AdminAddRoomScreen = () => {
    const [show, setShow] = useState(false);
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [type, setType] = useState('');
    const [petCategory, setPetCategory] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();
    
    const [createProduct, { isLoading: isLoadingCreate, error: errorCreate }] = useCreateRoomMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('name', name);
            formData.append('roomNumber', roomNumber);
            formData.append('type', type);
            formData.append('petCategory', petCategory);
            formData.append('price', price);
            formData.append('image', image);
            const res = await createProduct(formData).unwrap();
            if(res){
                navigate("/admin/rooms");
                toast.success('Room added successfully');
            }
        }catch(err){
            toast.error(err?.data?.message || err?.error);
            console.log(err);
        }
    };

    return (
        <Grid container spacing={6}>
            <Grid item xs={2}>
                <AdminPanelScreen />
            </Grid>
        <Grid item xs={12}>
        <Formcontainer>
            <h1>Add Room</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className = 'my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter Name' value={name} 
            onChange={(e) => setName(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group className = 'my-2' controlId='roomNumber'>
            <Form.Label>Room Number</Form.Label>
            <Form.Control type='text' placeholder='Enter Room Number' value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='category'>
            <Form.Label>Type</Form.Label>
            <Form.Control type='text' placeholder='Enter Type' value={type}
            onChange={(e) => setType(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='artists'>
            <Form.Label>Pet Category</Form.Label>
            <Form.Control type='text' placeholder='Enter Pet Category' value={petCategory}
            onChange={(e) => setPetCategory(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control type='text' placeholder='Enter Price' value={price}
            onChange={(e) => setPrice(e.target.value)}>
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

export default AdminAddRoomScreen

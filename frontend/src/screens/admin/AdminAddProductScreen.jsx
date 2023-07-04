import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import Formcontainer from "../../components/Formcontainer";
import {toast} from 'react-toastify'
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Grid from '@mui/material/Grid';
import AdminPanelScreen from './AdminPanelScreen.jsx';
import {useCreateProductMutation} from '../../slices/productsApiSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AdminAddProductScreen = () => {
    const [name, setName] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
     const [itemCategory, setItemCategory] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [image, setImage] = useState('');

    const handleClose = () => {
        setShow(false);
        setProductId('');
        setName('');
        setSize('');
        setDescription('');
        setCategory('');
        setItemCategory('');
        setPrice('');
        setCountInStock('');
        setImage('');
  };

    const navigate = useNavigate();
    
    const [createProduct, { isLoading: isLoadingCreate, error: errorCreate }] = useCreateProductMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('name', name);
            formData.append('size', size);
            formData.append('description', description);
            formData.append('petCategory', category);
            formData.append('itemCategory', itemCategory);
            formData.append('price', price);
            formData.append('countInStock', countInStock);
            formData.append('image', image);
            const res = await createProduct(formData).unwrap();
            if(res){
                navigate("/admin/productslist");
                toast.success('Product added successfully');
                handleClose();
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
            <h1>Add Product</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className = 'my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter Name' value={name} 
            onChange={(e) => setName(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group className = 'my-2' controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' placeholder='Enter Description' value={description}
            onChange={(e) => setDescription(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control type='text' placeholder='Enter Category' value={category}
            onChange={(e) => setCategory(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='artists'>
            <Form.Label>Item Category</Form.Label>
            <Form.Control type='text' placeholder='Enter Item Category' value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control type='text' placeholder='Enter Price' value={price}
            onChange={(e) => setPrice(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control type='text' placeholder='Enter Count In Stock' value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}>
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

export default AdminAddProductScreen

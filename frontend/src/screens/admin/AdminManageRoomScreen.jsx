import { useEffect, useState } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { useGetAllAvailableRoomsQuery, useUpdateRoomMutation, 
useDeleteRoomMutation} from '../../slices/roomApiSlice.js';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import AdminPanelScreen from './AdminPanelScreen.jsx';
import Grid from '@mui/material/Grid';
import { Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AddCircleIcon from '@mui/icons-material/AddCircle';




const AdminRoomScreen = () => {
    const imageBaseUrl = 'http://localhost:5000/uploads/';
    const { data, isLoading, refetch, error } = useGetAllAvailableRoomsQuery();
    const [show, setShow] = useState(false);
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [petCategory, setPetCategory] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const handleClose = () => {
        setShow(false);
        setProductId('');
        setName('');
        setPrice('');
        setPetCategory('');
        setImage('');
        setRoomNumber('');
  };

    const handleShow = (product) => {
        setShow(true);
        setProductId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setPetCategory(product.petCategory);
        setRoomNumber(product.roomNumber);
    };

    useEffect(() => {}, []);

    const [updateProduct, { isLoading: isLoadingUpdate, error: errorUpdate }] = useUpdateRoomMutation();
    const submitHandler = (e) => {
        e.preventDefault();
        try{
          const formData = new FormData();
            formData.append('productId', productId);
            formData.append('name', name);
            formData.append('petCategory', petCategory);
            formData.append('price', price);
            formData.append('image', image);
            formData.append('roomNumber', roomNumber);
            const res = updateProduct(formData);
            if(res){
            toast.success('Product updated successfully');
            handleClose();
            refetch();
            }

        }catch(error){
            toast.error(error.message);
        }
    }



    const [deleteProduct, { isLoading: isLoadingDelete, error: errorDelete }] = useDeleteRoomMutation();
    const handleRemoveProduct = (e) => {
        e.preventDefault();
        try{
            const res = deleteProduct({productId});
            toast.success('Product deleted successfully');
            handleClose();
            refetch();
        }catch(error){
            toast.error(error.message);
        }
    }
  useEffect(() => {
    refetch();
  }, []);
  

  return (
    <Grid container spacing={0}>
       <Grid item xs={2}>
        <AdminPanelScreen />
      </Grid>
      <Grid item xs={10}>
      <Grid container alignItems="center" justifyContent="space-between" style={{ margin : '10px'}}>
            <Grid item>
                <Typography variant="h3">All Products</Typography>
            </Grid>
            <Grid item>
                <LinkContainer container to="/admin/addroom">
                <Button variant="success" className="btn-sm">
                <AddCircleIcon />
                </Button>
                </LinkContainer>
            </Grid>
        </Grid>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error.message}</Message>
      ) : data && data.length === 0 ? (
        <Message>No product found.</Message>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Room Number</TableCell>
                <TableCell>Pet Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map((data) => (
                <TableRow key={data._id}>
                  <LinkContainer to={`/services/accommodation/${data._id}`} style={{ cursor: 'pointer', color: 'blue' }}>
                    <TableCell><b>{data.name}</b></TableCell>
                  </LinkContainer> 
                  <TableCell><img 
                  src={
                    imageBaseUrl+
                  data.image} style={{height:'40px', width:'30px'}}/></TableCell>
                <TableCell>{data.roomNumber}</TableCell>
                <TableCell>{data.petCategory.toUpperCase()}</TableCell>
                <TableCell>${data.price}</TableCell>
                    <TableCell>
                        <Button variant="info" 
                        onClick={() => handleShow(data)}
                        style={{}}
                        className="btn-sm">
                          Update Product
                        </Button>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
      </Grid>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form 
        onSubmit={submitHandler}
        >
        <Form.Group className = 'my-2' controlId='name'>
            <Form.Label>Update Name</Form.Label>
            <Form.Control type='text' placeholder='Enter Name' value={name} 
            onChange={(e) => setName(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='description'>
            <Form.Label>Update Room Number</Form.Label>
            <Form.Control type='text' placeholder='Enter Room Number' value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='category'>
            <Form.Label>Update Pet Category</Form.Label>
            <Form.Control type='text' placeholder='Enter Category' value={petCategory}
            onChange={(e) => setPetCategory(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='price'>
            <Form.Label>Update Price</Form.Label>
            <Form.Control type='text' placeholder='Enter Price' value={price}
            onChange={(e) => setPrice(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='image'>
            <Form.Label>Update Image</Form.Label>
            <Form.Control
                type="file"
                placeholder="Image"
                onChange={(e) => setImage(e.target.files[0])}
            />
        </Form.Group>
        {isLoading && <Loader />}
        <Button type='submit' variant='primary' className='mt-3'>Update Product</Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" 
        // onClick={handleRemoveProduct}
        >Remove Product</Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Grid>

  );
};
export default AdminRoomScreen;
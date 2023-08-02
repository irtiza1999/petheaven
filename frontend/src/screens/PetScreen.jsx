import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Typography, Paper, Button, Box } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import Loader from '../components/Loader';
import { Row, Col, Form } from 'react-bootstrap';
import { cartAdd } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from '@mui/material/Rating';
import {  useGetPetByIdQuery} from '../slices/petApiSlice';
import Message from '../components/Message';
import Input from "@material-ui/core/Input";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

 

const RoomScreen = () => {
   const imageBaseUrl = 'http://localhost:5000/uploads/';
  const { id } = useParams();
  const {userInfo} = useSelector(state => state.auth);
  const { data, isLoading, refetch: refetchProduct, error } = useGetPetByIdQuery(id);
  
  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1500 },
  });

  const navigate = useNavigate();

  return (
    <div>
    <Box paddingTop="100px">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">
          {error.message}
        </Message>
      ) : (
        <animated.div style={fadeInProps}>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <img
                src={
                    imageBaseUrl+
                    data.image}
                alt="Product"
                style={{ width: '100%', height: 'auto', maxWidth: '300px', maxHeight: '300px', objectFit: 'cover' }}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Paper style={{ height: '100%', padding: '20px', marginLeft : '40px' }}>
                <Grid item style={{ paddingBottom: '10px' }}>
            <h3 style={{ textAlign: 'center'}}>Pet Description</h3>
              <nav style={{ backgroundColor: "#eeeeee", paddingTop: "40px",
                    border: "1px solid #ccfc", borderRadius: '100px', padding: '40px' }}>
<Grid container spacing={3}>
  <Grid item xs={12} sm={6}>
    {/* Left column content */}
    {data && (
      <Box paddingTop="20px">
        <Typography>
          Name: <b>{data.name.toUpperCase()}</b>
        </Typography>
        <Typography>
          Species: <b>{data.species.toUpperCase()}</b>
        </Typography>
        <Typography>
          Breed: <b>{data.breed.toUpperCase()}</b>
        </Typography>
        <Typography>
          Age: <b>{data.age}</b>
        </Typography>
        <Typography>
          Gender: <b>{data.gender.toUpperCase()}</b>
        </Typography>
        <Typography>
          Color: <b>{data.color.toUpperCase()}</b>
        </Typography>
      </Box>
    )}
  </Grid>
  <Grid item xs={12} sm={6}>
    {/* Right column content */}
    {data && (
      <Box paddingTop="20px">
        <Typography>
          Size: <b>{data.size.toUpperCase()}</b>
        </Typography>
        <Typography>
          Weight: <b>{data.weight}</b>
        </Typography>
        <Typography>
          Description: <b>{data.breed}</b>
        </Typography>
        <Typography>
          Temperament: <b>{data.temperament}</b>
        </Typography>
        <Typography>
          Contact Info: <b>{data.contactInfo}</b>
        </Typography>
        <Typography>
          Location: <b>{data.location}</b>
        </Typography>
      </Box>
    )}
  </Grid>
</Grid>
    </nav>
    </Grid>
    </Paper>

          </Grid>
          </Grid>
        </animated.div>
      )}
    </Box>
  </div>
  );
};

export default RoomScreen;

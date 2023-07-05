import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import {  useGetRoomByIdQuery, useCreateBookingMutation} from '../slices/roomApiSlice';
import Message from '../components/Message';
import Input from "@material-ui/core/Input";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import {
  useGetPaypalClientIdQuery,
} from '../slices/ordersApiSlice';
 

const RoomScreen = () => {
//    const imageBaseUrl = 'http://localhost:5000/uploads/';
const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(new Date());
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(new Date());
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const {userInfo} = useSelector(state => state.auth);
  const { data, isLoading, refetch: refetchProduct, error } = useGetRoomByIdQuery(id);
  
  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const handleCheckInClick = () => {
    setShowCheckInCalendar(true);
  };

  const handleCheckOutClick = () => {
    setShowCheckOutCalendar(true);
  };

  const handleCheckInDateChange = (date) => {
    setSelectedCheckInDate(date);
    setTotalPrice(data.price * (selectedCheckOutDate - selectedCheckInDate))
    setShowCheckInCalendar(false);
    if(selectedCheckInDate > selectedCheckOutDate){
      setSelectedCheckOutDate(date);
      setTotalPrice(data.price * (selectedCheckOutDate.getTime() - selectedCheckInDate.getTime()))

    }
  };

  const handleCheckOutDateChange = (date) => {
    if(date < selectedCheckInDate){
        toast.error("Check-out date cannot be before check-in date");
        setSelectedCheckOutDate(selectedCheckInDate);
        setTotalPrice(data.price * (selectedCheckOutDate.getTime() - selectedCheckInDate.getTime()))

        return;
    }
    setSelectedCheckOutDate(date);
    setTotalPrice(data.price * (selectedCheckOutDate.getTime() - selectedCheckInDate.getTime()))

    setShowCheckOutCalendar(false);
  };

  const handleCheckOutBlur = () => {
    setTimeout(() => {
      setShowCheckOutCalendar(false);
    }, 5000);
  };

    const handleCheckInBlur = () => {
    setTimeout(() => {
      setShowCheckInCalendar(false);
    }, 5000);
  };
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

    function onError(err) {
    toast.error(err.message);
  }

function createOrder(data, actions, totalPrice) {
  return actions.order
    .create({
      purchase_units: [
        {
          amount: { value: totalPrice },
        },
      ],
    })
    .then((order) => {
      return order.id;
    });
}


  const [createBooking , { isLoading: loadingCreateBooking }] = useCreateBookingMutation();
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await createBooking(
            {   id, 
                checkInDate: selectedCheckInDate, 
                checkOutDate: selectedCheckOutDate, 
                userId: userInfo._id,
                totalPrice
             });
        toast.success('Order is paid');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

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
                    // imageBaseUrl+
                    data.image}
                alt="Product"
                style={{ width: '100%', height: 'auto', maxWidth: '300px', maxHeight: '300px', objectFit: 'cover' }}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Paper style={{ height: '100%', padding: '20px' }}>
                <Grid item style={{ paddingBottom: '10px' }}>
            <h4 style={{textAlign :'center'}}>Book Now</h4>
              <nav style={{ backgroundColor: "#eeeeee", paddingTop: "40px",
                    border: "1px solid #ccfc", borderRadius: '100px', padding: '40px' }}>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <div>
            <label><b>Check-in Date:</b></label>
            <Input
                color="neutral"
                disabled={false}
                placeholder=""
                size="lg"
              type="text"
              value={selectedCheckInDate.toDateString()}
              onClick={handleCheckInClick}
              onBlur={handleCheckInBlur}
              readOnly
            />
            {showCheckInCalendar && (
              <Calendar
                onChange={handleCheckInDateChange}
                value={selectedCheckInDate}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <div>
            <label><b>Check-out Date:</b></label>
            <Input
                color="neutral"
                disabled={false}
                placeholder=""
                size="lg"
              type="text"
              value={selectedCheckOutDate.toDateString()}
              onClick={handleCheckOutClick}
              onBlur={handleCheckOutBlur}
              readOnly
            />
            {showCheckOutCalendar && (
              <Calendar
                onChange={handleCheckOutDateChange}
                value={selectedCheckOutDate}
              />
            )}
          </div>
        </Grid>
      </Grid>
      <Grid container style={{ justifyContent: 'center', marginTop: '10px' }} spacing={2}>
        <Grid item xs={6} sm={6} md={6} lg={6}>
            <div>
            <Typography variant="body1">Price: <b>$
                {(data.price * (selectedCheckOutDate - selectedCheckInDate))}
                </b></Typography>
            </div>
        </Grid>
        </Grid>
        <Grid container style={{ justifyContent: 'center', marginTop: '10px' }} spacing={2}>
        <Grid item xs={6} sm={6} md={6} lg={6}>
            <div>
            <PayPalScriptProvider options={{ 'client-id': paypal.clientId, currency: 'USD' }}>
            <PayPalButtons
                variant="contained"
                color="success"
                size="large"
                style={{ layout: 'horizontal', color: 'gold', shape: 'pill', label: 'paypal', tagline: false }}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
                >
                Book
                </PayPalButtons>
                </PayPalScriptProvider>       
            </div>
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
    {data && (
         <Box paddingTop="20px" >
    <Grid container>
      <Grid item sm={12}>
        <Paper style={{ height: '100%', padding: '20px' }}>
            <h3 style={{ textAlign: 'center'}}>Room Description</h3>
        <Grid item style={{ paddingBottom: '10px' }}>
              <Paper style={{ height: '100%', padding: '10px' }}>
                <Grid item>
                    <Grid item>
                    <Typography>            
                      <b>{data.name.toUpperCase()}</b>
                    </Typography>
                    </Grid>
                <Grid>
                  <Typography>            
                      Room Type: <b>{data.type.toUpperCase()}</b>
                    </Typography>
                </Grid>
                <Grid>
                    <Typography>               
                      Room For <b>{data.petCategory.toUpperCase()}</b>
                    </Typography>
                    </Grid>
                <Grid item>
                    <Typography variant="body1">Price: <b>${data.price}</b></Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
        </Paper>
      </Grid>
    </Grid>
  </Box>
    )}
   
  </div>
  );
};

export default RoomScreen;

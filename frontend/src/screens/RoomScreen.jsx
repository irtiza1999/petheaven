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
  const [totalPrice, setTotalPrice] = useState(100);
  const { id } = useParams();
  const {userInfo} = useSelector(state => state.auth);
  const { data, isLoading, refetch: refetchProduct, error } = useGetRoomByIdQuery(id);
  const [available, setAvailable] = useState(false);
  
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

useEffect(() => {
  if (data) {
    const daysGone = calculateDaysGone(selectedCheckInDate, selectedCheckOutDate);
    const newTotalPrice = data.price * daysGone;
    setTotalPrice(newTotalPrice);
  }
}, [selectedCheckInDate, selectedCheckOutDate, data]);

const calculateDaysGone = (checkInDate, checkOutDate) => {
  const checkInTimestamp = checkInDate.getTime();
  const checkOutTimestamp = checkOutDate.getTime();

  const differenceMs = checkOutTimestamp - checkInTimestamp;

  const daysGone = 1+Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  return daysGone;
};
  const handleCheckInDateChange = (date) => {
    setAvailable(false);
    if(date < new Date()){
        toast.error("Check-in date cannot be before today's date");
        setSelectedCheckInDate(new Date());
        return;
    }
    setSelectedCheckInDate(date);
    setShowCheckInCalendar(false);
    if(selectedCheckInDate > selectedCheckOutDate){
      setSelectedCheckOutDate(date);
    }
  };

  const handleCheckOutDateChange = (date) => {
    setAvailable(false);
    if(date < selectedCheckInDate){
        toast.error("Check-out date cannot be before check-in date");
        setSelectedCheckOutDate(selectedCheckInDate);
        return;
    }
        setSelectedCheckOutDate(date);

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


const availableCheck = () => {
  if (selectedCheckInDate && selectedCheckOutDate) {
    const daysGone = calculateDaysGone(selectedCheckInDate, selectedCheckOutDate);
    const newTotalPrice = data.price * daysGone;
    setTotalPrice(newTotalPrice);

    let overlappingBooking = false;
    for (const booking of data.booking) {

      const bookingCheckInDate = new Date(booking.checkInDate);
      const bookingCheckOutDate = new Date(booking.checkOutDate);
      console.log(bookingCheckInDate, bookingCheckOutDate);
      if (
        (selectedCheckInDate >= bookingCheckInDate && selectedCheckInDate < bookingCheckOutDate) ||
        (selectedCheckOutDate > bookingCheckInDate && selectedCheckOutDate <= bookingCheckOutDate) ||
        (selectedCheckInDate < bookingCheckInDate && selectedCheckOutDate > bookingCheckOutDate)
      ) {
        overlappingBooking = true;
        break; // Stop checking further bookings, as there's already an overlap
      }
    }

    if (overlappingBooking) {
      toast.error('Room is already booked for these dates');
      setAvailable(false);
    } else {
      toast.success('Room is available for these dates. Book now!!');
      // setAvailable(true);
    }
  } else {
    toast.error('Please select check-in and check-out dates');
  }
};



  const [createBooking, { createIsLoading, createError }] = useCreateBookingMutation();
  const handleCheckout = async () => {
    try {
      const res = await createBooking({
        id,
        checkInDate: selectedCheckInDate,
        checkOutDate: selectedCheckOutDate,
        userId: userInfo._id,
        totalPrice,
      }).unwrap();
      if(res){
      toast.success('Booking Added Successfully!!');
      refetchProduct();
      }else{
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

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
              <Paper style={{ height: '100%', padding: '20px', marginLeft : '40px' }}>
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
      <Grid container style={{ justifyContent: 'center', marginTop: '20px' }} spacing={2}>
        <Row>
        <Grid item xs={6} sm={6} md={6} lg={6}>
            <div>
            <Typography variant="body1">Price: 
            <b>$
                {totalPrice}
            </b>
                </Typography>
            </div>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
            <div>
              {!available ? (
                <>
                <Button
                onClick={() => {
                availableCheck()
              }}
              variant="contained" color="success" size="small" 
              style={{ width: '100%' }}
              >
                Check Availability
              </Button>
                </>
              ) : (
                <>
                  <Button
              onClick={() => {
                handleCheckout()
              }}
              variant="contained" color="success" size="small" style={{ width: '100%' }}>
                Book Now
              </Button>
                </>
              )
                }
              
            </div>
        </Grid>
        </Row>
        </Grid>
        <Grid container style={{ justifyContent: 'center', marginTop: '10px' }} spacing={2}>
        <Grid item xs={6} sm={6} md={6} lg={6}>
  {/* <div>
               {loadingPayPal ? (
  <Loader />
) : errorPayPal ? (
  <Message variant="error">
    Error loading PayPal: {errorPayPal.message}
  </Message>
) : (
  <PayPalScriptProvider options={{ 'client-id': paypal.clientId, currency: 'USD' }}>
    <PayPalButtons
      variant="contained"
      color="success"
      size="large"
      style={{ layout: 'horizontal', color: 'gold', shape: 'pill', label: 'paypal', tagline: false }}
      createOrder={(data, actions) => createOrder(data, actions, totalPrice)}
      onApprove={onApprove}
      onError={onError}
    >
      Book
    </PayPalButtons>
  </PayPalScriptProvider>
)}
      </div> */}
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

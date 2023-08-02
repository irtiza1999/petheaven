import { useEffect } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import { useGetMyBookingsQuery } from '../slices/roomApiSlice.js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';


const MyBookingScreen = () => {
  const { userInfo } = useSelector(state => state.auth);
  const userId = userInfo?._id;
  const { data: orders, refetch, isLoading, isError, error } = useGetMyBookingsQuery(userId);
  console.log(orders);

  return (
    <Grid container spacing={2} style={{paddingTop:'100px'}}>
      <Typography variant="h4" style={{padding:'20px'}}>My Bookings</Typography>
      <Grid item xs={12}>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message>{error?.message}</Message>
        ) : !orders || orders.length === 0 ? (
          <Message>No booking found.</Message>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Total Price</b></TableCell>
                  <TableCell><b>Check In Date</b></TableCell>
                  <TableCell><b>Check Out Date</b></TableCell>
                  <TableCell><b>Payment Status</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders && orders.map((order) => (
                    <>
                  <TableRow key={order._id}>
                    <TableCell><b>{order._id}</b></TableCell>
                    <TableCell>${order.totalPrice}</TableCell>
                    <TableCell>{order.checkInDate.substring(0, 10)}</TableCell>
                    <TableCell>{order.checkOutDate.substring(0, 10)}</TableCell>
                    <TableCell>
                        {order.isPaid ? (
                            <Typography variant="body2" style={{ color: 'green' }}>
                                <Button variant="outline-success" className="btn-sm" disabled>
                            <i className="fas fa-check">Paid</i>
                          </Button>
                            </Typography>
                        ) : (
                            <Typography variant="body2" style={{ color: 'red' }}>
                                Not Paid
                            </Typography>
                        )}
                    </TableCell>
                    
                  </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default MyBookingScreen;

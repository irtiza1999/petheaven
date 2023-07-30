import { useEffect, useState } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { useGetAllBookingsQuery, useMarkAsPaidMutation } from '../../slices/roomApiSlice.js';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import AdminPanelScreen from './AdminPanelScreen.jsx';
import Grid from '@mui/material/Grid';

const AllBookingScreen = () => {
  const { data: orders, refetch, isLoading, error } = useGetAllBookingsQuery();

  useEffect(() => {
    refetch();
  }, []);

  const [makePayment, { isLoading: loadingPayment }] = useMarkAsPaidMutation();
  const paymentHandler = async (orderId) => {
    try {
      await makePayment({ orderId });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <AdminPanelScreen />
      </Grid>
      <Grid item xs={10}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item style={{ margin: '10px' }}>
            <Typography variant="h3">All Orders</Typography>
          </Grid>
        </Grid>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error.message}</Message>
        ) : orders && orders.length === 0 ? (
          <Message>No orders found.</Message>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders &&
                  orders[0].booking.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>
                        <b>{order._id}</b>
                      </TableCell>
                      <TableCell>${order.totalPrice}</TableCell>
                      {order.isPaid ? (
                        <TableCell>
                          <b style={{ color: 'green' }}>Paid at : </b>
                          {new Date(order.paidAt).toLocaleString()}
                        </TableCell>
                      ) : (
                        <TableCell style={{ color: 'red' }}>
                          <b>Not Paid</b>
                        </TableCell>
                      )}
                      {order.isPaid ? (
                        <TableCell>
                          <Button variant="outline-success" className="btn-sm" disabled>
                            <i className="fas fa-check">Paid</i>
                          </Button>
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Button
                            variant="outline-danger"
                            className="btn-sm"
                            onClick={() => {
                              paymentHandler(order._id);
                            }}
                          >
                            <i className="fas fa-times">Mark As Paid</i>
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default AllBookingScreen;

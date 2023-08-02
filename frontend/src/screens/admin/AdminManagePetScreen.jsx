import { useEffect, useState } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { useGetAllPetsQuery, useMarkAsVerifiedMutation, useMarkAsAdoptedMutation } from '../../slices/petApiSlice.js';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import AdminPanelScreen from './AdminPanelScreen.jsx';
import Grid from '@mui/material/Grid';

const AdminManagePetScreen = () => {
  const { data: orders, refetch, isLoading, error } = useGetAllPetsQuery();

  const [verify, { isLoading: loadingVerify }] = useMarkAsVerifiedMutation();
  const verifyHandler = async (orderId) => {
    try {
      await verify( orderId );
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const [adopt, { isLoading: loadingAdopt }] = useMarkAsAdoptedMutation();
  const adoptionHandler = async (orderId) => {
    try {
        await adopt( orderId );
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
                <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Breed</TableCell>
                  <TableCell>Verification Status</TableCell>
                  <TableCell>Verification Action</TableCell>
                  <TableCell>Adoption Status</TableCell>
                  <TableCell>Adoption Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders &&
                  orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>
                        <LinkContainer to={`/pet/${order._id}`}
                        style={{cursor: 'pointer', color: 'blue'}}
                        >
                        <b>{order._id}</b>
                        </LinkContainer>
                      </TableCell>
                       <TableCell>
                        <b>{order.name}</b>
                      </TableCell>
                       <TableCell>
                        <b>{order.breed}</b>
                      </TableCell>
                      {order.isVerified ? (
                        <TableCell>
                            <Typography variant="body1" color="green"
                            style={{color: 'green'}}
                            >
                                Verified
                                </Typography>
                                </TableCell>
                                ) : (
                        <TableCell>
                            <Typography color="error">
                                Not Verified
                                </Typography>
                                </TableCell>
                                    )
                                    }
                      {order.isVerified ? (
                        <TableCell>
                            <Typography variant="body1" color="green"
                            style={{color: 'green'}}>
                                Verified
                                </Typography>
                                </TableCell>
                                ) : (
                            <TableCell>
                                <Typography>
                                <Button variant="success" size="sm"
                                 onClick={() => verifyHandler(order._id)}
                                >
                                    Verify
                                </Button>
                                </Typography>
                                </TableCell>
                        )}
                        {order.isAdopted ? (
                            <TableCell>
                                <Typography variant="body1" color="green"
                                style={{color: 'green'}}>
                                    Adopted
                                    </Typography>
                                    </TableCell>
                                    ) : (
                            <TableCell>
                                <Typography variant="body1" color="green"
                                style={{color: 'red'}}>
                                    Not Adopted
                                    </Typography>
                                </TableCell>
                        )}
                        {order.isAdopted ? (
                            <TableCell>
                                <Typography variant="body1" color="green"
                                style={{color: 'green'}}>
                                    Adopted
                                    </Typography>
                                    </TableCell>
                                    ) : (
                            <TableCell>
                                <Typography>
                                <Button variant="success" size="sm"
                                    onClick={() => adoptionHandler(order._id)}
                                >
                                    Mark As Adopted
                                </Button>
                                </Typography>
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

export default AdminManagePetScreen;

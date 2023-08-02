import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { LinkContainer } from 'react-router-bootstrap';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReviewsIcon from '@mui/icons-material/Reviews';
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import PetsIcon from '@mui/icons-material/Pets';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const drawerWidth = 240;

export default function ClippedDrawer() {
  return (
    <Grid container spacing={2} style={{marginTop:'40px'}}>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Grid item>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          // width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ overflow: 'auto' }} style={{marginTop:'40px'}}>
          <List>
              <ListItem disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Admin Panel'} />
                </ListItem>
              </ListItem>
          </List>
          <Divider />
          <List>
          <LinkContainer to='/'>
              <ListItem disablePadding>
              <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Home'} />
                </ListItemButton>
              </ListItem>
          </LinkContainer>
          </List>
          <Divider />
          <List>
            <LinkContainer to='/admin/userslist'>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <SupervisedUserCircleIcon />
                    </ListItemIcon>
                        <ListItemText primary={'Manage Customers'} />
                    </ListItemButton>
                </ListItem>
            </LinkContainer>
            <LinkContainer to='/admin/orders'>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                        <ListItemText primary={'Manage Orders'} />
                    </ListItemButton>
                </ListItem>
            </LinkContainer>
            <LinkContainer to='/admin/productslist'>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <InventoryIcon />
                    </ListItemIcon>
                        <ListItemText primary={'Manage Products'} />
                    </ListItemButton>
                </ListItem>
            </LinkContainer>
             <LinkContainer to='/admin/reviewslist'>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <ReviewsIcon />
                    </ListItemIcon>
                        <ListItemText primary={'Manage Reviews'} />
                    </ListItemButton>
                </ListItem>
            </LinkContainer>
             <LinkContainer to='/admin/bookings'>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <HotelIcon />
                    </ListItemIcon>
                        <ListItemText primary={'Manage Bookings'} />
                    </ListItemButton>
                </ListItem>
            </LinkContainer>
            <LinkContainer to='/admin/sales'>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <MonetizationOnIcon />
                    </ListItemIcon>
                        <ListItemText primary={'Sales and Analytics'} />
                    </ListItemButton>
                </ListItem>
            </LinkContainer>
            <LinkContainer to='/admin/pets'>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <PetsIcon />
                    </ListItemIcon>
                        <ListItemText primary={'Manage Pets'} />
                    </ListItemButton>
                </ListItem>
            </LinkContainer>
            <LinkContainer to='/admin/rooms'>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <MeetingRoomIcon />
                    </ListItemIcon>
                        <ListItemText primary={'Manage Rooms'} />
                    </ListItemButton>
                </ListItem>
            </LinkContainer>
          </List>
        </Box>
      </Drawer>
    </Box>
    </Grid>        
    </Grid>
    </Grid>
  );
}
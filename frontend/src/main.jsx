import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import store from './store.js'
import {Provider} from 'react-redux'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import ProductScreen from './screens/ProductScreen.jsx'
import CategoryScreen from './screens/CategoryScreen.jsx'
import CartScreen from './screens/CartScreen.jsx'
import ShippingScreen from './screens/ShippingScreen.jsx'
import PaymentScreen from './screens/PaymentScreen.jsx'
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx'
import OrderScreen from './screens/OrderScreen.jsx'
import FilterScreen from './screens/FilterScreen.jsx'
import FavoritesScreen from './screens/FavoritesScreen.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import SearchScreen from './screens/SearchScreen.jsx'
import NotFoundScreen from './screens/NotFoundScreen.jsx'
import MyOrderScreen from './screens/MyOrderScreen.jsx'
import ItemCategoryScreen from './screens/ItemCategoryScreen.jsx'
import MyFilterOrderScreen from './screens/MyFilterOrderScreen.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import AllOrderScreen from './screens/admin/AllOrderScreen.jsx'
import AdminPanelScreen from './screens/admin/AdminPanelScreen.jsx'
import AllUserScreen from './screens/admin/AllUserScreen.jsx'
import AdminAllProductScreen from './screens/admin/AdminAllProductScreen.jsx'
import AdminAddProductScreen from './screens/admin/AdminAddProductScreen.jsx'
import AllReviewScreen from './screens/admin/AllReviewScreen.jsx'
import FilterOrderScreen from './screens/admin/FilterOrderScreen.jsx'
import AccommodationScreen from './screens/AccommodationScreen.jsx'
import RoomScreen from './screens/RoomScreen.jsx'
import MyBookingScreen from './screens/MyBookingScreen.jsx'
import SalesScreen from './screens/admin/SalesScreen.jsx'
import FilterAccommodationScreen from './screens/FilterAccommodationScreen.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/:category' element={<CategoryScreen />} />
      <Route path='/search/:keyWord' element={<SearchScreen />} />
      <Route path='/filter/:filter' element={<FilterScreen />} />
      <Route path='' element={<PrivateRoute/>}> <Route path='/services/accommodation' element={<AccommodationScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/services/accommodation/:id' element={<RoomScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/myorder/:userId/filter/:filter' element={<MyFilterOrderScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/profile' element={<ProfileScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/favorites/:id' element={<FavoritesScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/shipping' element={<ShippingScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/payment' element={<PaymentScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/placeorder' element={<PlaceOrderScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/order/:id' element={<OrderScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/myorder/:userId' element={<MyOrderScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/myBookings/:id' element={<MyBookingScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/accommodation/:in/:out' element={<FilterAccommodationScreen />} /> </Route>
      
      <Route path='item/:item' element={<ItemCategoryScreen />} />
      <Route path='' element={<AdminRoute/>}> <Route path='/admin' element={<AdminPanelScreen />} /> </Route>
      <Route path='' element={<AdminRoute/>}> <Route path='/admin/orders' element={<AllOrderScreen />} /> </Route>
      <Route path='' element={<AdminRoute/>}> <Route path='/admin/userslist' element={<AllUserScreen />} /> </Route>
      <Route path='' element={<AdminRoute/>}> <Route path='/admin/productslist' element={<AdminAllProductScreen />} /> </Route>
      <Route path='' element={<AdminRoute/>}> <Route path='/admin/addproduct' element={<AdminAddProductScreen />} /> </Route>
      <Route path='' element={<AdminRoute/>}> <Route path='/admin/reviewslist' element={<AllReviewScreen />} /> </Route>
      <Route path='' element={<AdminRoute/>}> <Route path='/admin/orders/filter/:filter' element={<FilterOrderScreen />} /> </Route>
       <Route path='' element={<AdminRoute/>}> <Route path='/admin/sales' element={<SalesScreen />} /> </Route>
      <Route path='*' element={<NotFoundScreen />} />
    </Route>
  ))
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
      <RouterProvider router={router}/>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
)

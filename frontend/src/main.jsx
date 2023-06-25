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
      <Route path='' element={<PrivateRoute/>}> <Route path='/profile' element={<ProfileScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/favorites/:id' element={<FavoritesScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/shipping' element={<ShippingScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/payment' element={<PaymentScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/placeorder' element={<PlaceOrderScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/order/:id' element={<OrderScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/myorder/:userId' element={<MyOrderScreen />} /> </Route>
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

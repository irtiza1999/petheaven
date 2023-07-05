import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import petRoute from './routes/petRoute.js';
import roomRoute from './routes/roomRoute.js';

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();
app.use('/api/users', userRoutes);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/pet', petRoute);
app.use('/api/accommodation', roomRoute)
app.use('/uploads', express.static('uploads'));
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
app.get('/', (req, res) => { res.send('Pet Store API is running...'); });

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
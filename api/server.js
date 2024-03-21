import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import ErrorHnadler from './middlewares/error.js';
import authRouters from './routes/auth.router.js';
import userRouters from './routes/user.router.js';
import categoryRouters from './routes/category.router.js';
import uploadRouters from './routes/upload.router.js';
import productRouters from './routes/product.router.js';
import paymentRouters from './routes/payment.router.js';
import cloudinary from 'cloudinary';
import fileUpload from 'express-fileupload';
import path from 'path';
dotenv.config();
const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['*'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
connectDB();
// routers
app.use(express.static(path.join(__dirname, '/client/dist')));
app.use('/api/v2/auth', authRouters);
app.use('/api/v2/user', userRouters);
app.use('/api/v2/category', categoryRouters);
app.use('/api/v2/product', productRouters);
app.use('/api/v2/upload', uploadRouters);
app.use('/api/v2/payment', paymentRouters);

// Handle error
app.use(ErrorHnadler);

app.listen(3000, () => {
  console.log('Server running on port 3000.');
});

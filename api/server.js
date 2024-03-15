import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import ErrorHnadler from './middlewares/error.js';
import authRouters from './routes/auth.router.js';
import userRouters from './routes/user.router.js';
import categoryRouters from './routes/category.router.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
connectDB();
// routers
app.use('/api/v2/auth', authRouters);
app.use('/api/v2/user', userRouters);
app.use('/api/v2/category', categoryRouters);

// Handle error
app.use(ErrorHnadler);

app.listen(3000, () => {
  console.log('Server running on port 3000.');
});

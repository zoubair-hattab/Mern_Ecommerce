import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import ErrorHnadler from './middlewares/error.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Handle error
app.use(ErrorHnadler);
connectDB();
app.listen(3000, () => {
  console.log('Server running on port 3000.');
});

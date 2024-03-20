import express from 'express';
import {
  createPayment,
  getPayments,
} from '../controllers/payment.controller.js';
import { adminToken, useryToken } from '../middlewares/verifyToken.js';
const router = express.Router();
router
  .route('/')
  .get(useryToken, adminToken, getPayments)
  .post(useryToken, createPayment);
export default router;

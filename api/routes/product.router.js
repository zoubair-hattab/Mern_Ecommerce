import express from 'express';
import { adminToken, useryToken } from '../middlewares/verifyToken.js';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
const router = express.Router();
router.get('/getProducts', getProducts);
router.post('/create-product', useryToken, adminToken, createProduct);
router.put('/update/:productId', useryToken, adminToken, updateProduct);
router.delete('/delete/:productId', useryToken, adminToken, deleteProduct);

export default router;

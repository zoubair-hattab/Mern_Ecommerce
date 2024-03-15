import express from 'express';
import { adminToken, useryToken } from '../middlewares/verifyToken.js';
import {
  deleteCategory,
  getCategory,
  updateCategory,
} from '../controllers/category.controller.js';
const router = express.Router();

router.get('/getcategories', getCategory);
router.post('/create-category', useryToken, adminToken, createCategory);
router.put('/upadate/:categoryId', useryToken, adminToken, updateCategory);
router.delete('/delete/:categoryId', useryToken, adminToken, deleteCategory);

export default router;

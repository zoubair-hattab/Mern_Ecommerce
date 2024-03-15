import express from 'express';
import { adminToken, useryToken } from '../middlewares/verifyToken.js';
const router = express.Router();

router.post('/create-category', useryToken, adminToken, createCategory);

export default router;

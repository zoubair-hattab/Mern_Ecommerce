import express from 'express';
import { createUser, login } from '../controllers/auth.controller.js';
const router = express.Router();
router.post('/create-user', createUser);
router.post('/login', login);

export default router;

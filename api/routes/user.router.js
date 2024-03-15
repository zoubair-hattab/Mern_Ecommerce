import express from 'express';
import { signout } from '../controllers/user.controller.js';
import { useryToken } from '../middlewares/verifyToken.js';
const router = express();
router.all('/logout', signout);
router.get('/user-info', useryToken, getInfoUser);

export default router;

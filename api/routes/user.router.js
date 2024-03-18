import express from 'express';
import {
  addTocard,
  getInfoUser,
  signout,
} from '../controllers/user.controller.js';
import { useryToken } from '../middlewares/verifyToken.js';
const router = express();
router.all('/logout', signout);
router.get('/user-info', useryToken, getInfoUser);
router.patch('/add-to-cart', useryToken, addTocard);
export default router;

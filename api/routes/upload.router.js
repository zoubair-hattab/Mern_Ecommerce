import express from 'express';
const router = express.Router();
import { useryToken, adminToken } from '../middlewares/verifyToken.js';
import { deleteImage, uploadImage } from '../controllers/upload.controller.js';

// we will upload image on cloudinary

router.post('/upload-image', useryToken, adminToken, uploadImage);
router.delete('/delete-image', useryToken, adminToken, deleteImage);

export default router;

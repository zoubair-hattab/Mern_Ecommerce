import ErrorHandler from '../utils/errorHandler.js';
import cloudinary from 'cloudinary';
import fs from 'fs';
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler('No files were uploaded.', 400));
    }
    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return next(new ErrorHandler('Size too large.', 400));
    }
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath);
      return next(new ErrorHandler('File format is incorrect.', 400));
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: '' },
      async (err, result) => {
        if (err) throw err;

        removeTmp(file.tempFilePath);

        res.status(200).json({
          success: true,
          message: { public_id: result.public_id, url: result.secure_url },
        });
      }
    );
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    if (!id) {
      return next(new ErrorHandler('No images Selected', 400));
    }
    cloudinary.v2.uploader.destroy(id, async (err, result) => {
      if (err) throw err;

      res.json({
        success: true,
        message: 'Deleted Image',
      });
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

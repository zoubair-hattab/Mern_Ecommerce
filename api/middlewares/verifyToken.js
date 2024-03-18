import User from '../models/user.model.js';
import ErrorHandler from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';

// verify if the user has logged in.
export const useryToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(
        new ErrorHandler('You are not authenticated. Please log in first.', 400)
      );
    }
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
      if (err) {
        return next(new ErrorHandler(err.message, 400));
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

//  verify if the user is an administrator.

export const adminToken = async (req, res, next) => {
  try {
    //get user Information by id
    const user = await User.findById(req.user.id);
    if (!user.isAdmin) {
      return next(new ErrorHandler('Admin resources acces denied'));
    }
    next();
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

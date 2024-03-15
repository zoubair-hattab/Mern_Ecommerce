import User from '../models/user.model.js';
import ErrorHandler from '../utils/errorHandler.js';

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const getInfoUser = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(
        new ErrorHandler('You are not authenticated. Please log in first.', 400)
      );
    }
    const user = User.findById(req.user.id).select('-password');
    if (!user) {
      return next(new ErrorHandler('This user does not exist.', 400));
    }
    res.status(200).json({
      success: true,
      message: user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

import User from '../models/user.model.js';
import ErrorHandler from '../utils/errorHandler.js';
import Payment from '../models/payment.model.js';
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
    const user = await User.findById(req.user.id).select('-password');
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
export const addTocard = async (req, res, next) => {
  try {
    const { cart } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new ErrorHandler('User does not exist', 404));
    }
    await User.findByIdAndUpdate(req.user.id, {
      cart,
    });
    res.status(200).json({
      success: true,
      message: 'Added to cart',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const history = async (req, res, next) => {
  try {
    const history = await Payment.find({ user_id: req.user.id });
    res.status(200).json({ success: true, message: history });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

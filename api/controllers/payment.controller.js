import Payment from '../models/payment.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import ErrorHandler from '../utils/errorHandler.js';

export const getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find();
    res.status(200).json({
      success: true,
      message: payments,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const createPayment = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('name email');
    if (!user) {
      return next(new ErrorHandler('This user is not exist.'));
    }
    const { _id, name, email } = user;
    const { cart, paymentID, address } = req.body;
    const newPayment = new Payment({
      user_id: _id,
      name,
      email,
      address,
      cart,
      paymentID,
    });

    cart.filter((item) => {
      return sold(item._id, item.quantity, item.sold);
    });

    await newPayment.save();
    res.status(200).json({
      success: 200,
      message: 'Payment Success.',
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

const sold = async (id, quantity, oldSold) => {
  await Product.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

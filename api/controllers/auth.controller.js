import User from '../models/user.model.js';
import ErrorHandler from '../utils/errorHandler.js';
import bcryptjs from 'bcryptjs';
import jsonToken from '../utils/jsonToken.js';
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = User.findOne({ email });
    if (user) {
      return next(new ErrorHandler('This email already exists.', 400));
    }
    if (password.length < 8) {
      return next(
        new ErrorHandler('Password must be at least 8 characters long.', 400)
      );
    }
    passwordHash = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: 'Register Sucess!',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler('This user is not exists.'));
    }
    isMatched = bcryptjs.compareSync(user.password, password);
    if (!isMatched) {
      return next(new ErrorHandler('Your credentials are not correct.', 400));
    }
    jsonToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

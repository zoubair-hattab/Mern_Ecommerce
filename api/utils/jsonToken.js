import jwt from 'jsonwebtoken';
const jsonToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
    expiresIn: '1d',
  });
  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };

  res.status(statusCode).cookie('access_token', token, options).json({
    success: true,
    message: user,
  });
};
export default jsonToken;

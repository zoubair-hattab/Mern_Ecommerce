export const validateRegister = ({ name, email, password }) => {
  const err = {};
  if (!name) {
    err.name = 'Kindly input your name.';
  }
  if (!password) {
    err.password = 'Kindly input your password.';
  } else if (password.length < 8) {
    err.password = 'Your password must be a minimum of 8 characters in length.';
  }
  if (!email) {
    err.email = 'Kindly input your email.';
  } else if (!validateEmail(email)) {
    err.email = 'Please provide an email address that is valid.';
  }
  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

export const validateLogin = ({ email, password }) => {
  const err = {};

  if (!password) {
    err.password = 'Kindly input your password.';
  } else if (password.length < 8) {
    err.password = 'Your password must be a minimum of 8 characters in length.';
  }
  if (!email) {
    err.email = 'Kindly input your email.';
  } else if (!validateEmail(email)) {
    err.email = 'Please provide an email address that is valid.';
  }
  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

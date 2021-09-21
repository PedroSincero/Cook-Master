const Joi = require('joi');
const { findEmailPassword } = require('../models/loginModel');

const validBodyLogin = (email, password) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ email, password });
  return error;
};

const loginIsExist = async (email, password) => {
  const isBodyValid = validBodyLogin(email, password);
  if (isBodyValid) {
    return 'ok';
  }
  // const isemail = await findByEmail(email);
  // const ispassword = await findByPassword(password);
  const result = await findEmailPassword(email, password);
  if (!result) {
    return false;
  }
  return result;
};

module.exports = {
  validBodyLogin,
  loginIsExist,
};
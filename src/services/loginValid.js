const Joi = require('joi');
const { findByEmail, findByPassword } = require('../models/loginModel');

const validBodyLogin = (email, password) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ email, password });
  return error;
};

const emailIsExist = async (email) => {
  const result = await findByEmail(email);
  if (!result) {
    return false;
  }
  return true;
};

const passwordIsExist = async (email) => {
  const result = await findByPassword(email);
  if (!result) {
    return false;
  }
  return true;
};

module.exports = {
  validBodyLogin,
  emailIsExist,
  passwordIsExist,
};
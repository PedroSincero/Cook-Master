const Joi = require('joi');
const { findByEmail } = require('../models/userModel');

const validBody = (name, email, password) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ name, email, password });
  return error;
};

const emailIsUnique = async (email) => {
  const result = await findByEmail(email);
  if (!result) {
    return false;
  }
  return true;
};

module.exports = {
  validBody,
  emailIsUnique,
};
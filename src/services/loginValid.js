const Joi = require('joi');

const validBodyLogin = (email, password) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ email, password });
  return error;
};

module.exports = {
  validBodyLogin,
};
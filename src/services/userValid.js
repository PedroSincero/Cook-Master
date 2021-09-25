const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { findByEmail } = require('../models/userModel');
// const { validJWT } = require('../services/recipesValid');
const secret = 'teste';

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

const validAdmin = async (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    const admin = await findByEmail(decoded.email);
    if (admin.role !== 'admin') return false;

    return admin;
  } catch (err) {
    return false;
  }
};

module.exports = {
  validBody,
  emailIsUnique,
  validAdmin,
};
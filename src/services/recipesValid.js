const Joi = require('joi');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'teste';
const validBody = (name, ingredients, preparation) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate({ name, ingredients, preparation });
  return error;
};

const validJWT = async (token) => {
  if (!token) return false;
  try {
   const decoded = jwt.verify(token, secret);
   const user = await userModel.findByEmail(decoded.email);

   if (!user) return false;

   return user;
  } catch (err) {
    return false;
  }
};

module.exports = {
  validBody,
  validJWT,
};

// Agradecimentos a Gabriel essenio Turma 10 Tribo B - pelo auxilio no validJwT

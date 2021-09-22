const recipesModel = require('../models/recipesModel');
const { validBody, validJWT } = require('../services/recipesValid');

const add = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const isValidBody = validBody(name, ingredients, preparation);
  const isValidToken = await validJWT(token);
  if (isValidBody) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  if (!isValidToken) {
    return res.status(401).json({
      message: 'jwt malformed',
    });
  }
  const { _id } = isValidToken;
  const [recipe] = await recipesModel.add(name, ingredients, preparation, _id);
  return res.status(201).json({ recipe });
};

const findAll = async (req, res) => {
  const result = await recipesModel.findAll();
  console.log(result);
  return res.status(200).json(result);
};

module.exports = { 
  add,
  findAll,
};

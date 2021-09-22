const recipesModel = require('../models/recipesModel');
const { validBody, validJWT, validId, valiEdit } = require('../services/recipesValid');

const add = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const isValidBody = validBody(name, ingredients, preparation);
  const isValidToken = await validJWT(token);
  if (isValidBody) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  if (!isValidToken || isValidToken === 'ok') {
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
  return res.status(200).json(result);
};

const findOne = async (req, res) => {
  const { id } = req.params;
  const getOne = await validId(id);
  if (!getOne) return res.status(404).json({ message: 'recipe not found' });
  return res.status(200).json(getOne);
};

const edit = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const { id } = req.params;
  const isValidToken = await validJWT(token);

  if (isValidToken === 'ok') {
    return res.status(401).json({
      message: 'jwt malformed',
    });
  }
  if (!isValidToken) {
    return res.status(401).json({
      message: 'missing auth token',
    });
  }
  const result = await valiEdit(id, name, ingredients, preparation);
  console.log('controller: ', result);
  return res.status(200).json(result);
};

module.exports = { 
  add,
  findAll,
  findOne,
  edit,
};

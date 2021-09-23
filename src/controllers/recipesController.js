const recipesModel = require('../models/recipesModel');
const { validBody, 
  validJWT, validId, valiEdit, validExclude } = require('../services/recipesValid');

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

const findAll = async (_req, res) => {
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
  return res.status(200).json(result);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  const isValidToken = await validJWT(token);
  if (!isValidToken) {
    return res.status(401).json({
      message: 'missing auth token',
    });
  }
  await validExclude(id);
  return res.status(204).json();
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const image = `localhost:3000/${req.file.path}`;
  const result = await recipesModel.editImage(id, image);
  res.status(200).json(result);
};

module.exports = { 
  add,
  findAll,
  findOne,
  edit,
  exclude,
  addImage,
};

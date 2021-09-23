const { ObjectId } = require('mongodb');
const connection = require('./connections');

const serialize = (db) => {
  const { name, ingredients, preparation, userId, _id } = db;
  return {
    name,
    ingredients, 
    preparation,
    userId,
    _id,
  };
};

const add = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const addRecipe = await db.collection('recipes').insertOne({
    name, ingredients, preparation, userId,
  });
  const result = addRecipe.ops;
  return result.map(serialize);
};

const findAll = async () => {
  const db = await connection();
  const getAll = await db.collection('recipes').find().toArray();
  return getAll;
};

const findOne = async (id) => {
  const db = await connection();
  const getOne = await db.collection('recipes').findOne(ObjectId(id));
  return getOne;
};

const edit = async (id, name, ingredients, preparation) => {
  const db = await connection();
  const update = await db.collection('recipes')
  .findOneAndUpdate({ _id: ObjectId(id) },
  { $set: { name, ingredients, preparation } }, { returnOriginal: false });

  return update.value;
};

const exclude = async (id) => {
  const db = await connection();
  // const recipeID = await findOne(id);
  const result = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return result;
};

const editImage = async (id, image) => {
  const db = await connection();
  const update = await db.collection('recipes')
  .findOneAndUpdate({ _id: ObjectId(id) },
  { $set: { image } }, { returnOriginal: false });

  return update.value;
};

module.exports = {
  add,
  findAll,
  findOne,
  edit,
  exclude,
  editImage,
};

// Agradecimentos a Leandro Reis Turma 10 - Tribo B - Pelo auxilio no update
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
  console.log('Model:', getOne);
  return getOne;
};

module.exports = {
  add,
  findAll,
  findOne,
};
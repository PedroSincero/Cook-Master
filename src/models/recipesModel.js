// const { ObjectId } = require('mongodb');
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

module.exports = {
  add,
};
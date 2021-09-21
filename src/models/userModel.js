// const { ObjectId } = require('mongodb');
const connection = require('./connections');

const add = async (name, email, password) => {
  const db = await connection();
  const addUser = await db.collection('users').insertOne({ name, email, password });
  // console.log('Model', addUser);
  return addUser;
};

module.exports = {
  add,
};
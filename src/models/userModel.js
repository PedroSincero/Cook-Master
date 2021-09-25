// const { ObjectId } = require('mongodb');
const connection = require('./connections');

const serialize = (db) => {
  const { name, email, _id, role } = db;
  return {
    name,
    email, 
    role,
    _id,
  };
};

const add = async (name, email, password, role) => {
  const db = await connection();
  const addUser = await db.collection('users').insertOne({ name, email, password, role });
  const result = addUser.ops;
  return result.map(serialize);
};

const findByEmail = async (email) => {
  const db = await connection();
  const findEmail = await db.collection('users').findOne({ email });
  return findEmail;
};

module.exports = {
  add,
  findByEmail,
};
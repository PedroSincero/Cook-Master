const connection = require('./connections');

const findByEmail = async (email) => {
  const db = await connection();
  const findEmail = await db.collection('users').findOne({ email });
  return findEmail;
};

const findByPassword = async (password) => {
  const db = await connection();
  const findPassword = await db.collection('users').findOne({ password });
  return findPassword;
};

module.exports = {
  findByEmail,
  findByPassword,
};
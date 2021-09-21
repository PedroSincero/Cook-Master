const connection = require('./connections');

const findEmailPassword = async (email, password) => {
  const db = await connection();
  const findPassword = await db.collection('users').findOne({ email, password });
  return findPassword;
};

module.exports = {
  findEmailPassword,
};
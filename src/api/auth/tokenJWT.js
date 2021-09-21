const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const secret = 'teste';

const jwtLogin = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = {
  jwtLogin,
};

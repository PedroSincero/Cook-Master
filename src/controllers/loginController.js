// const userModel = require('../models/userModel');

const { jwtLogin } = require('../api/auth/tokenJWT');
const { loginIsExist } = require('../services/loginValid');

const login = async (req, res) => {
  const { email, password } = req.body;
  const isLogin = await loginIsExist(email, password);
  if (isLogin === 'ok') {
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }
  if (!isLogin) {
    return res.status(401).json({
      message: 'Incorrect username or password',
    });
  }
  const { _id, role } = isLogin;
  const payload = { _id, email, role };
  const token = jwtLogin(payload);
  console.log(token);
  return res.status(200).json(token);
};

module.exports = { 
  login,
};
// const userModel = require('../models/userModel');
const { validBodyLogin, emailIsExist, passwordIsExist } = require('../services/loginValid');

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('controller', email, password);
  const isValidBody = validBodyLogin(email, password);
  const isValidEmail = await emailIsExist(email);
  const isValidPassword = await passwordIsExist(password);
  if (isValidBody) {
    console.log('is valid ? ', isValidBody);
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }
  if (!isValidEmail || !isValidPassword) {
    return res.status(401).json({
      message: 'Incorrect username or password',
    });
  }
  return res.status(200).json('funcionar funciona');
};

module.exports = { 
  login,
};
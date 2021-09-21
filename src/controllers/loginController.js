// const userModel = require('../models/userModel');
const { validBodyLogin } = require('../services/loginValid');

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('controller', email, password);
  const isValidBody = validBodyLogin(email, password);
  if (isValidBody) {
    console.log('is valid ? ', isValidBody);
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }
  return res.status(200).json('funcionar funciona');
};

module.exports = { 
  login,
};
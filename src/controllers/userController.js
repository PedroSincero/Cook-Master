const userModel = require('../models/userModel');

const add = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log('Controller', name, email, password);
  const newUser = await userModel.add(name, email, password);
  return res.status(201).json(newUser);
};

module.exports = { 
  add,
};

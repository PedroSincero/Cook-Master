const userModel = require('../models/userModel');
const { validBody, emailIsUnique } = require('../services/userValid');

const add = async (req, res) => {
  const { name, email, password } = req.body;

  const isValidBody = validBody(name, email, password);
  if (isValidBody) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  
  const uniqueEmail = await emailIsUnique(email);
  if (uniqueEmail) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }

  const [user] = await userModel.add(name, email, password);
  return res.status(201).json({ user });
};

module.exports = { 
  add,
};

// Agradecimentos a Lucas Martigns Turma 10 - Tribo B Por ter me auxiliado no Requisito 1
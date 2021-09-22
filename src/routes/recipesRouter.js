const express = require('express');
const recipesController = require('../controllers/recipesController');

const router = express.Router();

router.post('/', recipesController.add);

module.exports = router;
const express = require('express');
const recipesController = require('../controllers/recipesController');

const router = express.Router();

router.get('/:id', recipesController.findOne);

router.get('/', recipesController.findAll);

router.post('/', recipesController.add);

module.exports = router;
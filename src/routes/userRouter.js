const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/admin', userController.newAdmin);

router.post('/', userController.add);

module.exports = router;
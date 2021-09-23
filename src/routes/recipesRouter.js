const express = require('express');
const multer = require('multer');
const recipesController = require('../controllers/recipesController');
const { validImage } = require('../api/auth/validImage');

const router = express.Router();

const storage = multer.diskStorage({
  // aonde devo salvar
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  // nomear o arquivo
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

router.get('/:id', recipesController.findOne);

router.get('/', recipesController.findAll);

router.post('/', recipesController.add);

router.put('/:id/image', validImage, upload.single('image'), recipesController.addImage);

router.put('/:id', recipesController.edit);

router.delete('/:id', recipesController.exclude);

module.exports = router;
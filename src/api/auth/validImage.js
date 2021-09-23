const { validJWT } = require('../../services/recipesValid');

const validImage = async (req, res, next) => {
  const token = req.headers.authorization;

  const isValidToken = await validJWT(token);
  if (!isValidToken || isValidToken === 'ok') {
    return res.status(401).json({
      message: 'missing auth token',
    });
  }

  next();
};

module.exports = {
  validImage,
};

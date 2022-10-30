const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../constants/constants');
const { HTTP_RESPONSE } = require('../constants/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error(HTTP_RESPONSE.unauthorized.message);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error(HTTP_RESPONSE.unauthorized.message);
  }

  req.user = payload;

  next();
  return false;
};

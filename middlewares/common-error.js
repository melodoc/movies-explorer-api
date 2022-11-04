const { HTTP_RESPONSE } = require('../constants/errors');

module.exports = (err, req, res, next) => {
  const { statusCode = HTTP_RESPONSE.internalError.status, message } = err;
  res.status(statusCode).send({
    message: statusCode === HTTP_RESPONSE.internalError.status
      ? HTTP_RESPONSE.internalError.message
      : message,
  });
  next();
};

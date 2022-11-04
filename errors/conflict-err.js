const { HTTP_RESPONSE } = require('../constants/errors');

class ConflictError extends Error {
  constructor(message = HTTP_RESPONSE.conflict.message) {
    super(message);
    this.statusCode = HTTP_RESPONSE.conflict.status;
  }
}

module.exports = ConflictError;

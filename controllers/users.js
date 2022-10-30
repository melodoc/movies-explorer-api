const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');
const { ERROR_TYPE } = require('../constants/errors');
const { SECRET_KEY } = require('../constants/constants');

// POST /signup — creates a user
module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    })
      .then((user) => res.send({
        email,
        name: user.name,
      }))
      .catch((err) => {
        if (err.name === ERROR_TYPE.validity) {
          next(new BadRequestError());
          return;
        }
        if (err.code === 11000) {
          next(new ConflictError());
        }
        next(err);
      }))
    .catch(next);
};

// POST /signin — login with existing account
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError());
    });
};

// GET /users/me - returns information about the user (email and name)
module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(HTTP_RESPONSE.notFound.absentedMessage.user));
      }
      return res.send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      next(err);
    });
};

// PATCH /users/me - updates information about the user (email and name)
module.exports.updateProfile = (req, res, next) => {
  User.find({})
    .then(() => res.send({ message: 'updateProfile worked' }))
    .catch(next);
};

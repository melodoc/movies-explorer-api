const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const { ERROR_TYPE } = require('../constants/errors');

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
  User.find({})
    .then(() => res.send({ message: 'login worked' }))
    .catch(next);
};

// GET /me - returns information about the user (email and name)
module.exports.getCurrentUser = (req, res, next) => {
  User.find({})
    .then(() => res.send({ message: 'getCurrentUser worked' }))
    .catch(next);
};

// PATCH /me - updates information about the user (email and name)
module.exports.updateProfile = (req, res, next) => {
  User.find({})
    .then(() => res.send({ message: 'updateProfile worked' }))
    .catch(next);
};

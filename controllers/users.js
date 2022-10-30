const User = require('../models/user');

// POST /signup — creates a user
module.exports.createUser = (req, res, next) => {
  User.find({})
    .then(() => res.send({ message: 'createUser worked' }))
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

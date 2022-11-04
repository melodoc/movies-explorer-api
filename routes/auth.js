const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { createUser, login } = require('../controllers/users');

// creates a user
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  }),
  createUser,
);

// login with existing account
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

module.exports = router;

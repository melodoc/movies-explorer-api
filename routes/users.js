const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { updateProfile, getCurrentUser } = require('../controllers/users');

// returns information about the user (email and name)
router.get('/me', getCurrentUser);

// updates information about the user (email and name)
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile,
);

module.exports = router;

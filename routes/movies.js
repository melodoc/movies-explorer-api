const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');
const { URL_REG_EXP } = require('../constants/constants');

// returns all movies saved by the current user
router.get('/', getMovies);

// creates a movie
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().uri().regex(URL_REG_EXP).required(),
      trailerLink: Joi.string().uri().regex(URL_REG_EXP).required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().uri().regex(URL_REG_EXP).required(),
      movieId: Joi.number().integer().required(),
    }),
  }),
  createMovie,
);

// delete a movie by movieId
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required(),
    }),
  }),
  deleteMovieById,
);

module.exports = router;

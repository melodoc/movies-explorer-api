const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');
const { URL_REG_EXP } = require('../constants/constants');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными параметрами
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
      movieId: Joi.string().required(),
    }),
  }),
  createMovie,
);

// удаляет сохранённый фильм по id
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

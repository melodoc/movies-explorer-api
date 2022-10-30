const Movie = require('../models/movie');
const { ERROR_TYPE } = require('../constants/errors');
const BadRequestError = require('../errors/bad-request-err');

// GET /movies — returns all movies saved by the current user
module.exports.getMovies = (_req, res, next) => {
  Movie.find({})
    .then((card) => res.send(card))
    .catch(next);
};

// POST /movies — creates a movie
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner = req.user._id,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast || err.name === ERROR_TYPE.validity) {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

// DELETE /movies/:movieId — delete a movie by movieId
module.exports.deleteMovieById = (req, res, next) => {
  Movie.find({})
    .then(() => res.send({ message: 'deleteMovieById worked' }))
    .catch(next);
};

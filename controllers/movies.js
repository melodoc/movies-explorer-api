const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const { ERROR_TYPE, HTTP_RESPONSE } = require('../constants/errors');

// GET /movies — returns all movies saved by the current user
module.exports.getMovies = (_req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
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
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(HTTP_RESPONSE.notFound.absentedMessage.movie);
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError();
      }
      Movie.findByIdAndDelete(req.params.movieId)
        .then((foundMovie) => {
          if (!foundMovie) {
            throw new ForbiddenError();
          }
          res.send(foundMovie);
        });
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        next(new BadRequestError());
        return;
      }
      next(err);
    })
    .catch(next);
};

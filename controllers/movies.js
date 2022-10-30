const Movie = require('../models/movie');

// GET /movies — returns all movies saved by the current user
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then(() => res.send({ message: 'getMovies worked' }))
    .catch(next);
};

// POST /movies — creates a movie
module.exports.createMovie = (req, res, next) => {
  Movie.find({})
    .then(() => res.send({ message: 'createMovie worked' }))
    .catch(next);
};

// DELETE /cards/:movieId — delete a movie by movieId
module.exports.deleteMovieById = (req, res, next) => {
  Movie.find({})
    .then(() => res.send({ message: 'deleteMovieById worked' }))
    .catch(next);
};

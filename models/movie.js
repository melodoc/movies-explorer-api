const mongoose = require('mongoose');
const { isURL } = require('validator');
const { VALIDATION_ERROR_MESSAGE } = require('../constants/errors');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return isURL(value);
      },
      message: VALIDATION_ERROR_MESSAGE.URL,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return isURL(value);
      },
      message: VALIDATION_ERROR_MESSAGE.URL,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return isURL(value);
      },
      message: VALIDATION_ERROR_MESSAGE.URL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

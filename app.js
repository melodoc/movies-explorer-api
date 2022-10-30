const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const commonError = require('./middlewares/common-error');
const userAuth = require('./routes/auth');
const user = require('./routes/users');
const movie = require('./routes/movies');
const { HTTP_RESPONSE } = require('./constants/errors');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;

const app = express();

// to collect JSON format
app.use(bodyParser.json());
// for receiving web pages inside a POST request
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use('/', userAuth);
app.use(auth);
app.use('/users', user);
app.use('/movies', movie);
app.all('/*', (req, res, next) => {
  next(new NotFoundError(HTTP_RESPONSE.notFound.message));
});

app.use(errors());
app.use(commonError);
app.listen(PORT);

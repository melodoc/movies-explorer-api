require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const commonError = require('./middlewares/common-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const userAuth = require('./routes/auth');
const user = require('./routes/users');
const movie = require('./routes/movies');
const { HTTP_RESPONSE } = require('./constants/errors');
const { DEV_DB_URL } = require('./constants/constants');
const NotFoundError = require('./errors/not-found-err');
const { cors } = require('./middlewares/cors');

const { NODE_ENV, DB_URL, PORT } = process.env;

const app = express();

// to collect JSON format
app.use(bodyParser.json());
// for receiving web pages inside a POST request
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);

const MONGOOSE_URL = NODE_ENV === 'production' ? DB_URL : DEV_DB_URL;

mongoose.connect(MONGOOSE_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use('/', userAuth);
app.use(auth);
app.use('/users', user);
app.use('/movies', movie);
app.all('/*', (req, res, next) => {
  next(new NotFoundError(HTTP_RESPONSE.notFound.message));
});

app.use(errorLogger);
app.use(errors());
app.use(commonError);
app.listen(NODE_ENV === 'production' ? PORT : 3000);

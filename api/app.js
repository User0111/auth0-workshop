const createError = require('http-errors');
const express = require('express');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const db = require('./config/db');
const usersRouter = require('./routes/users');
const app = express();
const cors = require('cors');
const jwtCheck = require('./services/auth');
const userManager = require('./middlewares/userManagerMiddleware');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(jwtCheck);
app.use(userManager);

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {status: 500};

  res.status(err.status);
  res.json(err);
});

module.exports = app;

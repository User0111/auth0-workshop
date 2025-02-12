const createError = require('http-errors');
const express = require('express');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const db = require('./config/db');
const usersRouter = require('./routes/users');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true});

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

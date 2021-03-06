var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var appInsights=require("applicationinsights");

try{
  appInsights.setup().start();
}
catch(e){
  console.error(e);
}

var indexRouter = require('./routes/index');
var logRouter = require('./routes/log');
var currentRouter= require('./routes/current');
var current2Router= require('./routes/current2');
var telemetrylist= require('./routes/telemetrylist');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/log', logRouter);
app.use('/current', currentRouter);
app.use('/current2',current2Router);
app.use('/telemetrylist',telemetrylist);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

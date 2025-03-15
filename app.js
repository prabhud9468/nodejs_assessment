var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const bodyParser = require('body-parser');
// var schedule = require('node-schedule');
// const moment = require('moment-timezone');
const cors = require('cors');
require('dotenv').config({ path: path.join(__dirname,'utils/env') });
const mongolib = require('./src/model/mongooseSchema');
var indexRouter = require('./routes/index');
const { monitorCpuUsage } = require("./cpu_health_check");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ limit:'2mb', extended: true }));
app.use(express.json({ limit:'2mb' }));
// app.use(bodyParser.urlencoded({limit:'1mb',extended: true}));
// app.use(bodyParser.json({limit:'1mb'}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,access_token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// API Routes
app.use('/', indexRouter);

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
process.title = "INSUREDMINE_Assessment";
const used = process.memoryUsage().heapUsed / 1024 / 1024;
const available = process.memoryUsage().heapTotal / 1024 / 1024;
console.log(`The approximately available memory is: ${Math.round(available * 100) / 100} MB`);
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
console.log("Node Server Process Name: "+process.title)
// Checking CPU health for Every 50 seconds and retart the server when it consume >= 70% CPU usage
monitorCpuUsage();
module.exports = app;

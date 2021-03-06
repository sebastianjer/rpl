var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var loginRouter = require('./routes/login');
var adminlRouter = require('./routes/adminl');

var mainRouter = require('./routes/main');
var mainAdminRouter = require('./routes/mainadmin');

var orderRouter = require('./routes/pemesanan');
var confirmRouter = require('./routes/confirm');

var historiRouter = require('./routes/histori');
var historiPusatRouter = require('./routes/historipusat');

var getHomeMA = require('./routes/manajemenAkun');
var manageAccountRouter = require('./routes/akun');

var stokRouter = require('./routes/stok');

var logoutRouter = require('./routes/logout');

var app = express();
global.uname = "";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); //welcome
app.use('/users', usersRouter); //users

app.use('/login', loginRouter); //login mitra
app.use('/adminl', adminlRouter); //login pusat

app.use('/main', mainRouter); //mainpage mitra
app.use('/mainAdmin', mainAdminRouter); //mainpage pusat

app.use('/order', orderRouter); //pemesanan mitra
app.use('/confirm', confirmRouter); //konfirmasi pusat

app.use('/histori', historiRouter); //histori mitra
app.use('/historipusat', historiPusatRouter); //histori pusat

//manajemen akun
app.use('/accountList', getHomeMA);
app.use('/manageAccount', manageAccountRouter);

app.use('/stok', stokRouter);

app.use('/logout', logoutRouter); //logout



/* -------------------------------------------------------------------- */

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

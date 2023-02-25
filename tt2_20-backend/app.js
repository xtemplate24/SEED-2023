var conn = require('./db/db_conn.js')
var dbsetup = require('./db/setup.js')

<<<<<<< HEAD
=======
//pool.query("CREATE TABLE test1 (col1 INT);")
//pool.query("INSERT INTO test1 (col1) VALUES (1);")
//conn.query("SELECT * FROM test1;", (err, rows) => console.log(rows))
dbsetup()
>>>>>>> 4792c2c4b9c3dded2358bc9ee9a6a6254652b96a

var createError = require('http-errors');
var express = require('express');
const dotenv = require('dotenv').config()
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



module.exports = app;

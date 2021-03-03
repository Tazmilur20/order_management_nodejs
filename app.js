var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const regRouter=require('./routes/reg')
const ProductRouter=require('./routes/product');
const orderRouter = require('./routes/order');


const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/order_management');

const db= mongoose.connection


db.on('error',(err)=>{
    console.log(err);
})

db.once('open',()=>{
    console.log('database connection Establist');
})

var app = express();
const PORT=process.env.PORT||3000

app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`);
})




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users_post', usersRouter);
app.use('/users_get', usersRouter);
app.use('/users_put', usersRouter);
app.use('/users_delete', usersRouter);
app.use('/users_entry',regRouter);

app.use('/postProduct',ProductRouter);
app.use('/getProduct',ProductRouter);

app.use('/getFakeData',ProductRouter);
app.use('/postFakeData',ProductRouter);


app.use('/changeStatus',orderRouter);
app.use('/totalOrder',orderRouter);
app.use('/place_order',orderRouter);




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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var thankyouregRouter = require('./routes/thankyou-reg');
var thankyouconRouter = require('./routes/thankyou-con');
var underconstRouter = require('./routes/underconst');
var contactusRouter = require('./routes/contactus');
var packageRouter = require('./routes/package');
var bookingRouter = require('./routes/booking');
var bookingdetailRouter = require('./routes/bookingdetail');
var mgrDataRouter = require("./routes/mgrData");
var agentDataRouter = require("./routes/agentData");

const HC_MONGO_COMPASS_URL = "mongodb://localhost:27017/travelexperts";
const HC_MONGO_ATLAS_URL = "mongodb+srv://gacasti:1234321@cluster0.jg6vs.mongodb.net/travelexperts?retryWrites=true&w=majority";
const mongoSanitize = require("express-mongo-sanitize");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware needs to be declared before the end points
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// -------------------------------------------------------------
// For Passport.js
require("./my-passport").init(app);
// -------------------------------------------------------------
//  Put the messages in the res.locals
app.use((req, res, next) => {
  res.locals.message = req.session.msg; // Read the message from the session variable
  req.session.msg = null;
  next();
});




// to replace prohibited characters with _, use:
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

// -------------------------------------------------------------
// Configure the DB connection using Mongoose
var mongoose = require("mongoose");

// Set up a mongoose connection.  This will ensure to find
// at least one valid connection string.
mongoose.connect(process.env.MONGO_ATLAS_URL || HC_MONGO_ATLAS_URL || HC_MONGO_COMPASS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Get the connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function () {
  console.log(`we are connected to the ${db.name} database ...`);
});


// -------------------------------------------------------------
// Proxy the dash request to the Python server
app.all(/(data|_dash|_reload)\S*/, require("./routes/data-proxy"));

// -------------------------------------------------------------
// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/post", postRouter);


// Endpoints need to come in after the middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/thankyou-reg', thankyouregRouter);
app.use('/thankyou-con', thankyouconRouter);
app.use('/underconst', underconstRouter);
app.use('/contactus', contactusRouter);
app.use('/package', packageRouter);
app.use('/booking', bookingRouter);
app.use('/bookingdetail', bookingdetailRouter);
app.use('/mgrData', mgrDataRouter);
app.use('/agentData', agentDataRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  res.render('404page', {
    title: '404 Page Not Found',
    pageNotFound: 'We could not find what you were looking for.'
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

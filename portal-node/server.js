var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var testApi = require('./api/test');

var app = express();

var server;

//// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('none', function() { 
  var err = new Error('This service does not provide a view engine.');
  err.status = 500;
  next(err);
});
app.set('view engine', 'none');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/test', testApi);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// #region Error Handlers

if (app.get('env') === 'development') {
  // development error handler - includes stack trace
  app.use(function(err, req, res, next) {
    console.log('error: ' + req.originalUrl + ' - ' + err.message);
    res.status(err.status || 500);
    res.json({ message: err.message, error: err });
  });
} else {
  // production error handler - no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    //console.log('error: ' + err.message);
    res.status(err.status || 500);
    res.json({ message: err.message, error: {} });
  });
}

// #endregion

app.set('port', process.env.PORT || 8081);

server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});

//module.exports = app;
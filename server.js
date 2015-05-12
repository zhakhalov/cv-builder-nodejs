global.__require = function (path) {
  return require(require('path').join(__dirname, path));
};
//-----------------------------------------------------------------
// npm modules
//-----------------------------------------------------------------
var http = require('http');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//-----------------------------------------------------------------
// config
//-----------------------------------------------------------------

var dbConfig = require('./config/db-cfg.js');
var serverConfig = require('./config/server-cfg.js');

//-----------------------------------------------------------------
// controllers
//-----------------------------------------------------------------

var UsersApiCtrl = require('./controllers/users-api-ctrl.js');
var ErrApiCtrl = require('./controllers/err-api-ctrl.js');

//-----------------------------------------------------------------
// bootstrap app
//-----------------------------------------------------------------

// -----  express

var app = express();
var apiRouter = express.Router();
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', apiRouter);

var server = http.createServer(app);

// -----  controllers

UsersApiCtrl(apiRouter);
ErrApiCtrl(apiRouter);

//-----------------------------------------------------------------
// start app
//-----------------------------------------------------------------

mongoose.connect(dbConfig.connection, function (err) {
  if (err) {
    console.error({ category:'database', message: 'could not connect', err: err });
  } else {
    console.log('database connected');
  }
});

server.listen(serverConfig.port, serverConfig.ip, function () {
  var addr = server.address();
  console.log('server started at ' + addr.port);
});
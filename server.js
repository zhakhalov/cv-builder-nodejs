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

var AuthApiCtrl = require('./controllers/auth-api-ctrl.js');
var UsersApiCtrl = require('./controllers/users-api-ctrl.js');
var ErrApiCtrl = require('./controllers/err-api-ctrl.js');

var IndexCtrl = require('./controllers/index-ctrl.js')

//-----------------------------------------------------------------
// bootstrap app
//-----------------------------------------------------------------

// -----  express

var app = express();
var apiRouter = express.Router();
var viewRouter = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'ejs');
// app.engine('ejs', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

app.use('/api', apiRouter);
app.use(viewRouter);
app.use(express.static(path.join(__dirname, 'client')));

var server = http.createServer(app);

// -----  controllers

AuthApiCtrl(apiRouter);
UsersApiCtrl(apiRouter);
ErrApiCtrl(apiRouter);

IndexCtrl(viewRouter);

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
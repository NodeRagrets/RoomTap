var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var morgan = require('morgan');


// initialize express


//checking to see if PORT# is defined otherwise use 3000

var port = process.env.PORT || 3000;

require('./config/routeconfig.js')(app, express);

  /*
  express.static is a function taking the path name as an argument
  takes care of entire client side
  */
  
app.use(express.static(__dirname +  "/../public"));
app.use(morgan('dev'));

server.listen(port);

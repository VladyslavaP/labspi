var PORT = 8008;

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(PORT);

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/static/index.html');
});

var _usersList = [
  {
    name: "test",
    password: "test"
  },
  {
    name: "user",
    password: "user"
  }
];

io.sockets.on('connection', function (socket) {

  socket.on('login', function(user) {
    for (var key in _usersList) {
      var _user = _usersList[key];
      if (_user.name === user.name && _user.password === user.password) {     
        if (_user.socket) {
          socket.emit('login',  { name: user.name, isLogged: false, message: "You are already logged in" });
        } else {
          socket.emit('login', { name: user.name, isLogged: true });
          _user.socket = socket;
        }

        return;
      }            
    }

    socket.emit('login',  { name: user.name, isLogged: false, message: "Invalid username or password" });
  });

  socket.on('message', function (message) {
    socket.emit('message', message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', function() {
    for (var key in _usersList) {
      var user = _usersList[key];
      if(user.socket === socket) {
        delete user.socket;
      }
    }
  });
});
var express = require('express');
var app = express();
var session = require('express-session');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(__dirname + '/static/'));

var uuid = require('uuid');

app.use(session({
  genid: function(req) {
    return uuid.v4();
  },
  secret: 'asdasdasdasdasdasdasdasdasdss',
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use('/', require('./routes.js'));

var server = require('http').createServer(app);

var config = require('./config.js');

server.listen(config.PORT, config.IP, function() {
  console.log('Express server started on port %d.', config.PORT);
});
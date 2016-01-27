var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/static", express.static(__dirname + "/static/"));

app.use("/", require("./routes.js"));

var server = require("http").createServer(app);

var config = require("./config.js");

server.listen(config.PORT, config.IP, function() {
  console.log("Express server started on port %d.", config.PORT);
});
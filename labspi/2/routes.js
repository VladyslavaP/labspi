var express = require('express');
var router  = express.Router();

var goHome = function(req, res) {
  res.sendFile(
	  	__dirname + '/static/main.html'
    );
}

router.get('/', goHome);

router.get('/user', function(req, res) {
	if (!req.session.authorized)
    goHome(req, res);
  else
	  res.sendFile(
		  	__dirname + '/static/user.html'
	    );
});

router.get('/admin', function(req, res) {
	if (!req.session.authorized)
    goHome(req, res);
  else
	  res.sendFile(
		  	__dirname + '/static/admin.html'
	    );
});

var UsersRouter = require('./js/routes.js');

router.use('/users', UsersRouter);

module.exports = router;
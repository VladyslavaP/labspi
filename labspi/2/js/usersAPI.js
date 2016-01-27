var UserManager = require("./userManager.js");
var Validator = require("./validator.js");
var Errors = require('./errors.js');
var Roles = require('./role.js')

var UsersAPI = function() {

	var _userManager = new UserManager();
	var _validator = new Validator();

	this.seed = function() {
		var admin = _userManager.addUser('root', 'root', 'root@example.com', 'root');
		admin.setRole(Roles.admin);
	};

	this.addUser = function(req, res) {

		var errors = _validator.notEmpty('username', req.body.userName)
		                       .longerThan('username', req.body.userName, 5)
		                       .notEmpty('fullname', req.body.fullName)
		                       .email('email', req.body.email)
		                       .longerThan('password', req.body.password, 3)
		                       .validate();

		if (errors.length > 0)
		  return res.sendStatus(400, errors);

    var user = _userManager.addUser( 
			  req.body.userName, 
			  req.body.fullName, 
			  req.body.email, 
			  req.body.password
			);

		if (!user)
			res.sendStatus(400, [Errors.usernameTaken]);
		else
			res.sendStatus(201, user.getData());
	};

	this.removeUser = function(req, res) {

		if (!_userManager.removeUser(req.body.userName))
			res.sendStatus(400, [Errors.userNotFound]);
		else 
			res.sendStatus(200);
	};

	this.editUser = function(req, res) {

    var errors = _validator.notEmpty('fullname', req.body.fullName)
		                       .email('email', req.body.email)
		                       .longerThan('password', req.body.password, 3)
		                       .validate();

    console.log(errors);

		if (errors.length > 0)
		  return res.status(400).json(errors);

		var success = _userManager.editUser(
				req.body.userName, 
			  req.body.fullName, 
			  req.body.email, 
			  req.body.password
			);

		if (!success)
			res.status(400).json([Errors.userNotFound]);
		else 
			res.status(200).json(_userManager.findUser(req.body.userName).getData());
	};

	this.login = function(req, res) {

		var user = _userManager.findUser(req.body.userName);

		if (!user)
		  res.status(400).json([Errors.userNotFound]);
		else 
		if (!user.testPassword(req.body.password)) 
			res.status(400).json([Errors.cannotLogin]);
		else
		{
			req.session.username = user.getUserName();
			req.session.authorized = true;

			res.status(200).json({
				redirectURL: user.getRole().homepage
			});
		}
	};

	this.me = function(req, res) {
		if (req.session.username)
	   	res.status(200).json(
	   		  _userManager.findUser(req.session.username).getData()
	   		);
	  else
		  res.sendStatus(400);
	};

	this.logout = function(req, res) {
    req.session.destroy();

    res.status(200).json({
				redirectURL: '/'
			});
	};

	this.list = function(req, res) {
    res.status(200).json(_userManager.getUsers());
	}
};

module.exports = UsersAPI;
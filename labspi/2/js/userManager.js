var User = require("./user.js");
var Roles = require("./role.js");
var _ = require("lodash");
var Errors = require("./errors.js");

function UserManager() {

	var _users = []; 

	this.addUser = function(userName, fullName, email, password) {

		if (this.findUser(userName)) 
			return null;

		var user = new User(userName, fullName, email, password);
		user.setRole(Roles.user);
		_users.push(user);

		return user;
	};

	this.removeUser = function(userName) {

		var user = this.findUser(userName);

		if (!user) 
			return false;

		_users.splice(
				_users.indexOf(user), 
				1
			);

		return true;
	};

	this.editUser = function(userName, fullName, email, password) {

		var user = this.findUser(userName);

		if (!user) 
			return false;

		user.setFullName(fullName);
		user.setEmail(email);
		user.setPassword(password);

		return true;
	};

	this.findUser = function(userName) {

		return _.find(
			  _users, 
			  function(user) {
			  	return user.getUserName() === userName;
			  }
			);
	};

	this.getUsers = function() {
    return _.filter(
    	_.map(_users, function(user) {
    	  return user.getData();
      }),
      function(user) {
    	  return user.role !== Roles.admin.name;
      });
	};
};

module.exports = UserManager;
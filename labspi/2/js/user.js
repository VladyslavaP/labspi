function User(userName, fullName, email, password) {
	this._userName = userName;
	this._fullName = fullName;
	this._email = email;
	this._password = password;
	this._role;

	this.getUserName = function() {
		return this._userName;
	};

	this.getRole = function() {
		return this._role;
	};

	this.setRole = function(role) {
		this._role = role;
	};

	this.setFullName = function(fullName) {
		this._fullName = fullName;
	};

		this.setEmail = function(email) {
		this._email = email;
	};

	this.setPassword = function(password) {
		this._password = password;
	};


	this.getData = function() {
		return {
			userName: this._userName,
			fullName: this._fullName,
			email: this._email,
			role: this._role.name
		};
	};

	this.testPassword = function(password) {
		return password === this._password;
	};
};  

module.exports = User;
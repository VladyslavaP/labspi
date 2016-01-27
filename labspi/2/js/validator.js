var Errors = require('./errors.js');
var format = require('string-format')

var Validator = function() {
  
	var _errors = [];

  this._reset = function() {
  	_errors = [];
  };

  this.validate = function() {
  	var errors = _errors;
  	this._reset();
  	return errors;
  };

	this.notEmpty = function(name, value) {
		if (!value || value === '')
      _errors.push(format(Errors.empty, name));

    return this;
	};

	this.longerThan = function(name, value, length) {
		if (value.length < length)
			 _errors.push(format(Errors.longerThan, name, length));

		return this;
	};

	this.email = function(name, value) {
		if (value.indexOf('@') < 0)
			 _errors.push(format(Errors.email, name));

		return this;
	};
}

module.exports = Validator;
"use strict";

module.exports.calculate = function(req, res) {
  
  var params = {
    x: req.body.x,
    y: req.body.y,
    op: req.body.op
  };

  var result = {};

  var validation = validate(params);
  result.error = validation.error;

  if (!result.error) {
    result.answer = calc(params);
  }

  res.status(200).json(result);
};

var allowedOps = [ "+", "-", "*", "/" ];

var isOpAllowed = function(symbol) {

  for (var i in allowedOps) {
    var op = allowedOps[i];

    if (symbol === op) 
      return true;
  }

  return false;
};

var validate = function(params) {

  if ( isNaN(parseFloat(params.x)) || isNaN(parseFloat(params.y)) || !isOpAllowed(params.op)) {
    return { error: "Invalid papameters" };
  }

  if (params.op === '/' && parseFloat(params.y) === 0) {
    return { error: "Devision by zero" };
  }

  return {};
};

var calc = function(params) {

  var x = parseFloat(params.x);
  var y = parseFloat(params.y);

  if ( params.op === "+")
    return x + y;
  if ( params.op === "-")
    return x - y;
  if ( params.op === "*")
    return x * y;
  if ( params.op === "/")
    return x / y;
};
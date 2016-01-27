var express = require("express");
var router  = express.Router();

var calc = require("./calc.js");

router.post("/", calc.calculate);

module.exports = router;
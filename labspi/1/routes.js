var express = require("express");
var router  = express.Router();

router.get("/", function(req, res) {
  res.sendFile(
	  	'static/home.html',
	  	{
	  	  root: __dirname
	    }
    );
});

router.use("/calculate", require("./calc/routes.js"));

module.exports = router;
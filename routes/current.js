var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res, next) {
    var value=fs.readFileSync("./nexturi.log","UTF8");
    res.json({uri:value});
  });

module.exports = router;
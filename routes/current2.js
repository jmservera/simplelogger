var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res, next) {
    var value=fs.readFileSync("./nexturi.log","UTF8");
    var uris=value.replace('\r','').split('\n');
    res.json({uris:uris});
  });

module.exports = router;
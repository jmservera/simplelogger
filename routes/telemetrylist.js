var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res, next) {
    var value=fs.readFileSync("./telemetry.log","UTF8");
    if(value!==undefined){
        var uris=value.replace('\r','').split('\n');
        res.json({uris:uris});
    }
  });

module.exports = router;
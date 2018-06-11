var express = require('express');
var router = express.Router();
var fs = require("fs");


/* GET users listing. */
router.get('/', function(req, res, next) {
  data=`${new Date().toISOString()};${req.ip};"${req.headers["user-agent"]}"\n`;
    console.info(req);
    fs.appendFile('./calls.log', data, (err) => {
        if (err) throw err;
      });
    res.send("OK");
});

module.exports = router;

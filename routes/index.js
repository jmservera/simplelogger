var express = require('express');
var router = express.Router();
var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');

/* GET home page. */
router.get('/', function (req, res, next) {
  list = []
  try {
    var parser = parse({ delimiter: ';' });
    var input = fs.createReadStream('./calls.log');
    input.pipe(parser).on("data", function (data) {
      var a={
        date:new Date(data[0]),
        ip:data[1],
        agent:data[2]
      }
      list.push(a);
    }).on("end", function () {
      console.log("rendering page");
      res.render('index', { title: 'Express', values: list });
      console.log("file parsed");
    })
  }
  catch (e) {
    console.error(e);
  }
  //index=index.split(/\r?\n/);
  //res.render('index', { title: 'Express', values: list });
});

module.exports = router;

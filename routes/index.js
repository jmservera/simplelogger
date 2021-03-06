var express = require('express');
var router = express.Router();
var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');

/* GET home page. */
router.get('/', function (req, res, next) {
  showList(req, res, next);
});

router.post('/', function (req, res, next) {
  if (req.body) {

    if (req.body.newUri !== undefined && req.body.newUri !== "") {

      var uri = "";
      if (fs.existsSync("./nexturi.log")) {
        uri = fs.readFileSync("./nexturi.log", "UTF8");
      }

      if (uri !== req.body.newUri) {
        var ts = Date.now();
        try {
          if (fs.existsSync("./calls.log")) {
            fs.renameSync("./calls.log", `./calls_${ts}.log`);
          }
        } catch (e) {
          console.error(e);
        }
        try {
          if (fs.existsSync("./nexturi.log")) {
            fs.renameSync("./nexturi.log", `./nexturi_${ts}.log`);
          }
        } catch (e) {
          console.error(e);
        }
        fs.writeFileSync("./nexturi.log", req.body.newUri);
      }
      else {
        console.log("Uri not changed.");
      }
    }

    if (req.body.logPages !== undefined && req.body.logPages !== "") {
      var ts = Date.now();
      try {
        if (fs.existsSync("./telemetrylist.log")) {
          fs.renameSync("./telemetrylist.log", `./telemetrylist_${ts}.log`);
        }
      } catch (e) {
        console.error(e);
      }
      fs.writeFileSync("./telemetrylist.log", req.body.logPages);
    }
  }
  showList(req, res, next);
})

function showList(req, res, next) {
  list = []
  try {
    var parser = parse({ delimiter: ';' });
    var input = fs.createReadStream('./calls.log');
    input.on("error", function (e) {
      res.render('index', { title: 'Download stats', values: [], length: 0, difflength: 0 })
      console.error(e);
    });
    input.pipe(parser).on("data", function (data) {
      ip = data[1].split(':')[0];
      if (ip == "") {
        ip = data[1];
      }
      var a = {
        date: new Date(data[0]),
        ip: ip,
        agent: data[2]
      }
      list.push(a);
    }).on("end", function () {
      list.sort(function (a, b) { return b.date - a.date; });

      var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      var ls2 = Object.keys(groupBy(list, "ip"));

      res.render('index', { title: 'Download stats', values: list, length: list.length, difflength: ls2.length });
    }).on("error", function (e) {
      res.render('index', { title: 'Download stats', values: [], length: 0, difflength: 0 })
      console.error(e);
    })
  }
  catch (e) {
    res.render('index', { title: 'Download stats', values: [], length: 0, difflength: 0 })
    console.error(e);
  }
}

module.exports = router;

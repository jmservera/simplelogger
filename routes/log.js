var express = require('express');
var router = express.Router();
var fs = require("fs");


/* GET users listing. */
router.get('/', function(req, res, next) {
  ip=getClientIp(req);
  data=`${new Date().toISOString()};${ip};"${req.headers["user-agent"]}";${req.query.uri}\n`;
    fs.appendFile('./calls.log', data, (err) => {
        if (err) throw err;
      });
  res.json({result:"Ok", clientIp:ip});
});

// snippet taken from http://catapulty.tumblr.com/post/8303749793/heroku-and-node-js-how-to-get-the-client-ip-address
function getClientIp(req) {
  var ipAddress;
  // The request may be forwarded from local web server.
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // If request was not forwarded
    ipAddress = req.connection.remoteAddress;
  }
  if(!ipAddress){
    ipAddress = req.ip;
  }
  return ipAddress;
};

module.exports = router;

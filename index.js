var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');
var port = process.env.PORT || 1337;

console.log(`Starting server in port ${port}. Open a browser in http://localhost:${port}`);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
}).listen(port);
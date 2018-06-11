var http = require('http');
var fs = require('fs');
let appInsights = require('applicationinsights');

var index = fs.readFileSync('index.html');
var port = process.env.PORT || 1337;
console.info("Start appInsights");
try {
    appInsights.setup().start();
}
catch(e) {
    console.error(e);
}

console.info(`Starting server in port ${port}. Open a browser in http://localhost:${port}`);

http.createServer(function (req, res) {
    console.info("Serve index.html");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
}).listen(port);
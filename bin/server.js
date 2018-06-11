var http = require('http');
var fs = require('fs');
var path= require('path');

let appInsights = require('applicationinsights');

var index = fs.readFileSync(path.join(__dirname,'templates/index.html'));
var port = process.env.PORT || 1337;
console.info("Start appInsights");
console.info(`Starting in ${__dirname}`);
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
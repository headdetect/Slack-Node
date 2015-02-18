//Javascript code for the slack chatpage goes here
var http = require('http');
var gui = require('nw.gui');

function log(msg) {
    console.log("[Slack-Node] " + msg);
}

var win = gui.Window.get();
var domain = win.SLACK_DOMAIN;

log("Setting up slack proxy for " + domain + "...");

http.createServer(function(request, response) {
    if (!request.url.startsWith('/local/')) {
        var proxy = http.createClient(80, 'http://' + SLACK_DOMAIN + '.slack.com');
        var proxy_request = proxy.request(request.method, request.url, request.headers);
        proxy_request.addListener('response', function (proxy_response) {
            proxy_response.addListener('data', function (chunk) {
                response.write(chunk, 'binary');
            });
            proxy_response.addListener('end', function () {
                response.end();
            });
            response.writeHead(proxy_response.statusCode, proxy_response.headers);
        });
        request.addListener('data', function (chunk) {
            proxy_request.write(chunk, 'binary');
        });
        request.addListener('end', function () {
            proxy_request.end();
        });
    }
}).listen(8080);

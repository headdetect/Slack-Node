// This is a core file and should not be included in the js library //

_proxyEvents = function() {
    this.slackContentHandler = null;
    this.onSlackContent = function(uri, onComplete) {
        console.log("Executing " + this.slackContentHandler);
        onComplete(this.slackContentHandler(uri))
    }
};

global.ProxyEvents = new _proxyEvents();

(function(events) {
    console.log("==== Starting Proxy ====");

    var http = require('http'),
        https = require('https'),
        url = require("url"),
        path = require("path"),
        fs = require("fs"),
        port = 8080;

    http.createServer(function (request, response) {
        var uri = url.parse(request.url).pathname;

        console.log("Got request for " + uri);

        if (!uri.match(/\/local\/.*/)) {
            console.log("This is a slack request!");
            events.onSlackContent(uri, function(data) {
                //var domainedUrl = "https://" + data.domain + ".slack.com/" + uri;
                request.rawHeaders.Cookie = data.cookies;
                var requestOptions = {
                    hostname: data.domain + '.slack.com',
                    port: 443,
                    path: uri,
                    headers: request.rawHeaders,
                    method: request.method
                };

                console.log("Redirecting " + uri + "  to " + requestOptions.hostname + requestOptions.path + " using cookies: " + data.cookies);


                var slackRequest = https.request(requestOptions, function(res) {
                    console.log("Got response for " + uri + " : " + res.statusCode + " !");
                    var data = '';
                    console.log("Sending response..");
                    response.writeHead(200, res.rawHeaders);
                    res.on('data', function(chunk) {
                        response.write(chunk);
                    });
                    res.on('end', function() {
                        console.log("Response sent!");
                        response.end();
                    });
                });

                slackRequest.on('error', function(e) {
                    response.writeHead(500, e);
                    response.write("Error : " + e);
                });

                console.log("Invoking request.end()");
                slackRequest.end();

                /*http.get(domainedUrl, function(content) {
                    // Serve Slack stuff //
                    response.writeHead(200, {"Content-Type": "text/plain"});
                    response.write(content);
                    response.end();
                });*/
            });
            return;
        }

        var filename = path.join(process.cwd() || process.env.PWD + "/public", uri.slice('/local'.length, uri.length));

        console.log("Serving " +  filename);

        fs.exists(filename, function (exists) {
            if (!exists) {

                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write("404 Not Found\n");
                response.end();
                return;
            }

            if (fs.statSync(filename).isDirectory()) filename += '/index.html';

            fs.readFile(filename, function (err, file) {
                if (err) {
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();
                    return;
                }

                response.writeHead(200);
                response.write(file, "utf8");
                response.end();
            });
        });
    }).listen(port);
})(global.ProxyEvents);

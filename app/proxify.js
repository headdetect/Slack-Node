// This is a core file and should not be included in the js library //

(function(events) {
    console.log("==== Starting Proxy ====");

    var http = require("http"),
        url = require("url"),
        path = require("path"),
        fs = require("fs"),
        port = 8080;

    http.createServer(function (request, response) {
        var uri = url.parse(request.url).pathname;


        if (!uri.match(/\/local\/.*/)) {
            events.onSlackContent(uri, function(data) {
                var domainedUrl = "https://" + data.domain + ".slack.com/" + uri;
                http.get(domainedUrl, function(content) {
                    // Serve Slack stuff //
                    response.writeHead(200, {"Content-Type": "text/plain"});
                    response.write(content);
                    response.end();
                });
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

_proxyEvents = function() {
    this.slackContentHandler = null;
    this.onSlackContent = function(uri, onComplete) {
        onComplete(slackContentHandler(uri))
    }
}

global.ProxyEvents = new _proxyEvents();

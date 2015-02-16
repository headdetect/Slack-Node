var http = require('https');
var cheerio = require('cheerio');

module.exports = {
    login: function (options, completeCallback, errorCallback) {
        var domain = options['domain'];
        var username = options['username'];
        var password = options['password'];

        this.getCrumbFor(domain, function (crumb) {
            var loginData = "signin=1&redir=&crumb=" + crumb + "&email=" + username + "&password=" + password + "&remember=on";
            var loginOptions = {
                hostname: domain + '.slack.com',
                port: 443,
                path: '/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': loginData.length
                }
            };

            var req = http.request(loginOptions, function (res) {
                var data = '';
                res.on('data', function(chunk) {
                    data += chunk;
                });
                res.on('end', function() {
                    /*console.log(data);
                    var cookieData1 = res.headers['set-cookie'][0];
                    var cookieData2 = res.headers['set-cookie'][1];

                    var cookie1 = cookieData1.split(';')[0];
                    var cookie2 = cookieData2.split(';')[0];

                    completeCallback(cookie1, cookie2);*/
                    completeCallback(data); //Slack is responding with the chat page HTML instead of the cookies..
                });
            });

            req.on('error', function (e) {
                errorCallback(e);
            });

            req.write(loginData);
            req.end();
        }, errorCallback);
    },

    getCrumbFor: function (domain, callback, errorCallback) {
        this.downloadString('https://' + domain + '.slack.com/', function (html) {
            var $ = cheerio.load(html);
            var crumb = '';
            $('input').each(function (i, elem) {
                if ($(this).attr('name') == 'crumb') {
                    crumb = $(this).attr('value');
                    return false;
                }
            });

            if (crumb === '')
                errorCallback("No crumb found!");
            else
                callback(crumb);
        }, errorCallback);
    },

    downloadString: function (options, callback, errorCallback) {
        http.get(options, function (res) {
            var data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                if (data != "")
                    callback(data);
            });
        }).on('error', function (e) {
            errorCallback(e);
        });
    }
};
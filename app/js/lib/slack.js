var http = require('https');
var cheerio = require('cheerio');

module.exports = {
    login: function (options, completeCallback, errorCallback) {
        var domain = options['domain'];
        var username = options['username'];
        var password = options['password'];

        this.getCrumbFor(domain, function (crumb) {
            crumb = encodeURIComponent(crumb);
            var loginData = "signin=1&redir=&crumb=" + crumb + "&email=" + username + "&password=" + password + "&remember=on";

            var loginOptions = {
                hostname: domain + '.slack.com',
                port: 443,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': loginData.length
                }
            };

            /*var loginForm = {
                signin: '1',
                crumb: crumb,
                email: username,
                password: password,
                remember: 'on'
            };

            var j = request.jar();

            request.post({url: 'https://' + domain + '.slack.com', formData: loginForm, jar: j}, function(err, httpResponse, body) {
                if (err) {
                    errorCallback("Login failed: " + err);
                }
                else if (body.indexOf("That password is incorrect. Please try again.") > -1) {
                    errorCallback("That password is incorrect.");
                } else if (body.indexOf("Sorry, we can't find an account with that email address.") > -1) {
                    errorCallback("That email is incorrect.");
                } else {
                    var cookies = j.getCookies('.slack.com');

                    console.log(body);
                    console.log(cookies);

                    var $ = cheerio.load(body);
                    $('body').append("<script type=\"text/javascript\" src=\"../js/lib/slack_inject.js\">");

                    body = $.html();
                    completeCallback(body); //Slack is responding with the chat page HTML instead of the cookies..
                }
            });*/

            var req = http.request(loginOptions, function (res) {
                var data = '';
                res.on('data', function(chunk) {
                    data += chunk;
                });
                res.on('end', function() {

                    if (data.indexOf("That password is incorrect. Please try again.") > -1) {
                        errorCallback("That password is incorrect.");
                        return;
                    }
                    if (data.indexOf("Sorry, we can't find an account with that email address.") > -1) {
                        errorCallback("That email is incorrect.");
                        return;
                    }

                    var $ = cheerio.load(data);
                    $('body').append("<script type=\"text/javascript\" src=\"../js/lib/slack_inject.js\">");

                    data = $.html();
                    setTimeout(function() {
                        completeCallback(data);
                    }, 900); //Wait a few for nw.js to save the cookies
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

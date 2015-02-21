/** @jsx React.DOM */
var slack = require('../lib/slack.js');
var fs = requireNode('fs');
var os = requireNode('os');
var mkdirp  = requireNode('mkdirp');

var React = require('react');
var Toolbar = require('./Toolbar.jsx');
var LoginDomain = require('./LoginDomain.jsx');
var LoginUser = require('./LoginUser.jsx');

var gui = requireNode('nw.gui');
var win = gui.Window.get();

var Login = React.createClass({
    getInitialState: function() {
        win.cookies.getAll({domain: '.slack.com'}, function(cookies) {
            for (var i = 0; i < cookies.length; i++) {
                win.cookies.remove({url: cookies[i].domain, name: cookies[i].name});
            }
        });

        return {domain: '', step: 0};
    },
    next: function(val) {
        if (val === '') return;

        this.setState({step: 1, domain: val});
    },
    doLogin: function(username, password) {
        document.body.className = 'waiting';

        console.log("Login with " + username + " " + password + " @ " + this.state.domain + " !");

        var options = {
            username: username,
            password: password,
            domain: this.state.domain
        };

        var _domain = this.state.domain;

        slack.login(options, function(chatPage) {
            console.log("Saving chat page..");

            mkdirp('./tmp/');
            fs.writeFile("tmp/nslack.html", chatPage, function (err) {
                if (err) {
                    swal("Error going to chat page", e, "error");
                    document.body.className = '';
                } else {
                    console.log("Obtaining cookies..");

                    var cookieHeader = '';
                    win.cookies.getAll({domain: '.slack.com'}, function(cookies) {
                        for (var i = 0; i < cookies.length; i++) {
                            cookieHeader += cookies[i].name + '=' + cookies[i].value + '; ';
                        }

                        console.log("Hooking into proxy..");
                         global.ProxyEvents.slackContentHandler = function(uri) {
                             return {
                                 cookies: cookieHeader,
                                 domain: _domain
                             }
                         };

                         console.log("Displaying Chat");
                         var newWin = gui.Window.open("tmp/nslack.html", {
                           position: 'center',
                           width: 1024,
                           height: 720
                         });
                         newWin.SLACK_DOMAIN = _domain;
                         win.close();
                    });
                }
            });
        }, function(e) {
            swal("Could not sign in", e, "error");
            document.body.className = '';
        });
    },
    render: function() {
        win.resizeTo(280, 450);
        win.setMinimumSize(280, 450);
        //win.setMaximumSize(280, 450);
        var step = this.state.step;

        var currentDisplay = (step == 0 ? <LoginDomain next={this.next} /> : <LoginUser next={this.doLogin} />)

        return (
            <div className="fillDiv">
                <Toolbar title="Login" />
                {currentDisplay}
            </div>
        )
    }
});

module.exports = Login;

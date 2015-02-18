/** @jsx React.DOM */
var slack = require('../lib/slack.js');
var fs = require('fs');
var os = require('os');
var React = require('react');
var Toolbar = require('./Toolbar.jsx');
var LoginDomain = require('./LoginDomain.jsx');
var LoginUser = require('./LoginUser.jsx');

var gui = requireNode('nw.gui');
var win = gui.Window.get();

var Login = React.createClass({
    getInitialState: function() {
        return {domain: '', step: 0};
    },
    next: function(val) {
        if (val === '') return;

        this.setState({step: 1, domain: val});
    },
    doLogin: function(username, password) {
        console.log("Login with " + username + " " + password + " @ " + this.state.domain + " !");

        var options = {
            username: username,
            password: password,
            domain: this.state.domain
        };

        slack.login(options, function(chatPage) {
            console.log("Saving chat page..");
            fs.writeFile(os.tmpdir() + "\\nslack.html", function (err) {
                if (err) {
                    console.log("Error :/ " + err);
                } else {
                    gui.Window.open(os.tmpdir() + "\\nslack.html", {
                      position: 'center',
                      width: 1024,
                      height: 720
                    });
                    win.close();
                }
            });
        }, function(e) {
            console.log("error :/   " + e);
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

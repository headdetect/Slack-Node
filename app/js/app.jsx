/* @jsx React.DOM */

(function(window) {
    var gui = require('nw.gui');
    var loginWindow = true;
    var win = gui.Window.get();

    function isLoginWindow() {
        return loginWindow;
    }

    function setIsLoginWindow(val) {
        loginWindow = val;
        if (loginWindow) {
            win.width = 280;
            win.height = 430;
        } else {
            //TODO Change this to something else maybe..?
            win.width = 1024;
            win.height = 720;
        }
    }

    window.isLoginWindow = isLoginWindow;
    window.setIsLoginWindow = setIsLoginWindow;
})(window);

// Library Dependencies //
var React = require('react');

// File Dependencies //
var Channels = require("./components/Channels.jsx");

var Login = require("./components/Login.jsx");

var SlackApplication = React.createClass({
    render: function () {
        return (
            <div className="chan">
                <p>This is the channel stuff</p>
                <Channels />
            </div>
        )
    }
});

React.render (
    (isLoginWindow() ? <Login /> : <SlackApplication />), $("#container").get(0)
);
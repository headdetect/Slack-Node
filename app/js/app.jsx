/* @jsx React.DOM */
// Library Dependencies //
var React = require('react');

// File Dependencies //
var Channels = require("./components/Channels.jsx");

var Login = require("./components/Login.jsx");

var Toolbar = require("./components/Toolbar.jsx");

var isLoginWindow = true

var SlackApplication = React.createClass({
    render: function () {
        return (
            <div className="fillDiv">
                <Toolbar title="Slack" />
                <div className="chan">
                    <p>This is the channel stuff</p>
                    <Channels />
                </div>
            </div>
        )
    }
});

React.render (
    (isLoginWindow ? <Login /> : <SlackApplication />), $("#container").get(0)
);
/* @jsx React.DOM */

// Library Dependencies //
var React = require('react');

// File Dependencies //
var Channels = require("./components/Channels.jsx");

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
    <SlackApplication />, $("#container").get(0)
);
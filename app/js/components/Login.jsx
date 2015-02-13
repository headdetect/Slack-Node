/** @jsx React.DOM */
var React = require('react');
var gui = requireNode('nw.gui');

var Login = React.createClass({
    render: function() {
        return (
           <div className="login">
               <img src="img/slack-logo.png" />

                <ul>
                    <li><input type="text" placeholder="Email" /></li>
                    <li><input type="text" placeholder="Password" /></li>
                </ul>
           </div>
        )
    }
});

module.exports = Login;

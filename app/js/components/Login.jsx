/** @jsx React.DOM */
var React = require('react');

var Login = React.createClass({
    render: function() {
        return (
           <div class="login">
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
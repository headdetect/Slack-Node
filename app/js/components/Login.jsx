/** @jsx React.DOM */
var React = require('react');
var Toolbar = require('./Toolbar.jsx');
var gui = requireNode('nw.gui');
var win = gui.Window.get();

var Login = React.createClass({
    render: function() {
        win.resizeTo(280, 430);
        win.setMinimumSize(280, 430);
        //win.setMaximumSize(280, 430);

        return (
           <div>
               <Toolbar title="Login" />
               <div className="login">
                   <img src="img/slack-logo.png" />
                   <ul>
                       <li><input type="text" placeholder="Email" /></li>
                       <li><input type="text" placeholder="Password" /></li>
                   </ul>
               </div>
           </div>
        )
    }
});

module.exports = Login;

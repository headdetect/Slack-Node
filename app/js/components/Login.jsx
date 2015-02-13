/** @jsx React.DOM */
var React = require('react');
var Toolbar = require('./Toolbar.jsx');
var gui = requireNode('nw.gui');
var win = gui.Window.get();

var Login = React.createClass({
    getInitialState: function() {
        return {username: '', password: ''};
    },
    handleUserChange: function(event) {
        this.setState({username: event.target.value});
    },
    handlePasswordChange: function(event) {
        this.setState({password: event.target.value});
    },
    login: function() {
        var username = this.state.username;
        var password = this.state.password;

        console.log("Login with " + username + " " + password + "!");
    },
    render: function() {
        win.resizeTo(280, 450);
        win.setMinimumSize(280, 450);
        win.setMaximumSize(280, 450);

        var username = this.state.username;
        var password = this.state.password;
        return (
           <div className="fillDiv">
               <Toolbar title="Login" />
               <div className="login">
                   <img src="img/slack-logo.png" />
                   <ul>
                       <li><input type="email" className="form-control" placeholder="Email" value={username} onChange={this.handleUserChange} /></li>
                       <li><input type="password" className="form-control" placeholder="Password" value={password} onChange={this.handlePasswordChange} /></li>
                   </ul>

                   <button onClick={this.login} className="btn btn-success">Login</button>
               </div>
           </div>
        )
    }
});

module.exports = Login;

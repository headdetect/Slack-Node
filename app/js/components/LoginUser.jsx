/** @jsx React.DOM */
var React = require('react');
var Toolbar = require('./Toolbar.jsx');
var gui = requireNode('nw.gui');
var win = gui.Window.get();

var LoginUser = React.createClass({
    getInitialState: function() {
        return {username: '', password: ''};
    },
    handleUserChange: function(event) {
        this.setState({username: event.target.value});
    },
    handlePasswordChange: function(event) {
        this.setState({password: event.target.value});
    },
    handleClick: function() {
        var username = this.state.username;
        var password = this.state.password;
        this.props.next(username, password);
    },
    render: function() {
        var username = this.state.username;
        var password = this.state.password;
        return (
            <div className="login">
                <img src="img/slack-logo.png" />
                <ul>
                    <li><input type="email" className="form-control" placeholder="Email" value={username} onChange={this.handleUserChange} /></li>
                    <li><input type="password" className="form-control" placeholder="Password" value={password} onChange={this.handlePasswordChange} /></li>
                </ul>

                <button onClick={this.handleClick} className="btn btn-success">Login</button>
            </div>
        )
    }
});

module.exports = LoginUser;
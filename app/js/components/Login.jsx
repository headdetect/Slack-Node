/** @jsx React.DOM */
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
    login: function(username, password) {
        console.log("Login with " + username + " " + password + " @ " + this.state.domain + " !");
    },
    render: function() {
        win.resizeTo(280, 450);
        win.setMinimumSize(280, 450);
        //win.setMaximumSize(280, 450);
        var step = this.state.step;

        var currentDisplay = (step == 0 ? <LoginDomain next={this.next} /> : <LoginUser next={this.login} />)

        return (
            <div className="fillDiv">
                <Toolbar title="Login" />
                {currentDisplay}
            </div>
        )
    }
});

module.exports = Login;

/** @jsx React.DOM */
var React = require('react');
var Toolbar = require('./Toolbar.jsx');

var LoginDomain = React.createClass({
    getInitialState: function() {
        return {domain: ''};
    },
    handleDomainChange: function(event) {
        this.setState({domain: event.target.value});
    },
    handleClick: function() {
        var domain = this.state.domain;
        this.props.next(domain);
    },
    render: function() {
        var domain = this.state.domain;
        var buttonStyle = {
            marginTop: '25px'
        };
        return (
            <div className="login">
                <img src="img/slack-logo.png" />

                    <p>Enter your team's Slack domain.</p>
                    <div className="domain">
                        <input type="text" className="form-control" placeholder="teamdomain" value={domain} onChange={this.handleDomainChange} />
                        <b>.slack.com</b>
                    </div>

                    <button onClick={this.handleClick} className="btn btn-success" style={buttonStyle}>Next</button>
            </div>
        )
    }
});

module.exports = LoginDomain;
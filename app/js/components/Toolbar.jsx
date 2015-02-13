/** @jsx React.DOM */
var React = require('react');
var gui = requireNode('nw.gui');

var Toolbar = React.createClass({
    closeClick: function() {
        var win = gui.Window.get();
        win.close();
    },
    minusClick: function() {
        var win = gui.Window.get();
        win.minimize();
    },
    render: function() {
        var minusStyle = {
            marginTop: '4px'
        };
        return (
            <div className="toolbar">
                <div className="titleText">
                    {this.props.title}
                </div>
                <div className="items">
                    <div className="item" onClick={this.minusClick}><i className="fa fa-minus" style={minusStyle}></i></div>
                    <div className="item" onClick={this.closeClick}><i className="fa fa-times-circle"></i></div>
                </div>
            </div>
        )
    }
});

module.exports = Toolbar;
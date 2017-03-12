'use strict';

const styles = require('./toolbar-styles'),
    React = require('react');

const ToolBar = React.createClass({
    getInitialState: function() {
        return {
            show: true
        }
    },

    render: function() {
        return (
            <div id = "toolBarContainer" style = {styles.toolBarContainerStyle}>
                    {this.props.children}
            </div>
        );
    }
});

module.exports = ToolBar;
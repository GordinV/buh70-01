'use strict';

const styles = require('./toolbar-container-styles'),
    React = require('react');

class ToolBarContainer extends  React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id = "toolBarContainer" style = {styles.toolBarContainerStyle}>
                    {this.props.children}
            </div>
        );
    }
}

module.exports = ToolBarContainer;
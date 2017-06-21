'use strict';

const styles = require('./toolbar-container-styles'),
    React = require('react');

class ToolBarContainer extends  React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        let style = Object.assign({},styles.toolBarContainerStyle, styles[this.props.position] );
        return (
            <div id = "toolBarContainer" style = {style}>
                    {this.props.children}
            </div>
        );
    }
}

ToolBarContainer.propTypes = {
    position: React.PropTypes.string
}


ToolBarContainer.defaultProps = {
    position: 'right'
};

module.exports = ToolBarContainer;
'use strict';

const React = require('react'),
    styles = require('./button-register-styles');


class Button extends React.PureComponent {
// кнопка создания документа в регистрах
    constructor(props) {
        super(props);
        this.handleClick.bind(this);
        this.state = {
            disabled: this.props.disabled
        }
    }

    handleClick(e) {
        return this.props.onClick();
    }

    render() {
        // visibility
        let propStyle  = ('style' in this.props)? this.props.style: {},
            style = Object.assign({}, styles.button, {display: this.props.show ? 'inline' : 'none'}, propStyle)

        return <button
            disabled={this.state.disabled}
            ref="button"
            style={style}
            onClick={(e) => this.handleClick(e)}>
            {this.props.children}
            {this.props.value}
        </button>
    }
}
;

Button.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    style: React.PropTypes.object
}


Button.defaultProps = {
    disabled: false,
    show: true
};

module.exports = Button;
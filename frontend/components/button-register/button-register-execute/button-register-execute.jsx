'use strict';

const React = require('react'),
    styles = require('../button-register-styles'),
    Button = require('../button-register.jsx'),
    ICON = 'execute';


class ButtonRegisterExecute extends React.PureComponent{
// кнопка создания документа в регистрах
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick();
    }

    render() {
        return <Button
            ref="btnExecute"
            value={this.props.value}
            show={this.props.show}
            disabled={this.props.disabled}
            onClick={this.handleClick}>
            <image ref='image' src={styles.icons[ICON]}/>
        </Button>
    }
};

ButtonRegisterExecute.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired
}


ButtonRegisterExecute.defaultProps = {
    disabled: false,
    show: true
};

module.exports = ButtonRegisterExecute;
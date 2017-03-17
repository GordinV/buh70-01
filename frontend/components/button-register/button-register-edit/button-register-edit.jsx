'use strict';

const React = require('react'),
    styles = require('../button-register-styles'),
    Button = require('../button-register.jsx'),
    ICON = 'edit';


class ButtonRegisterEdit extends React.PureComponent{
// кнопка создания документа в регистрах
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        return this.props.onClick();
    }

    render() {
        return <Button
            value = 'Edit'
            ref="btnEdit"
            show={this.props.show}
            disabled={this.props.disabled}
            onClick={(e) => this.handleClick(e)}>
            <image ref='image' src={styles.icons[ICON]}/>
        </Button>
    }
};

ButtonRegisterEdit.propTypes = {
    onClick: React.PropTypes.func.isRequired,
}


ButtonRegisterEdit.defaultProps = {
    disabled: false,
    show: true
};

module.exports = ButtonRegisterEdit;
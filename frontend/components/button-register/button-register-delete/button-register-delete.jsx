'use strict';

import PropTypes from 'prop-types';

const React = require('react'),
    styles = require('../button-register-styles'),
    Button = require('../button-register.jsx'),
    ICON = 'delete';


class ButtonRegisterDelete extends React.PureComponent{
// кнопка создания документа в регистрах
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        return this.props.onClick('delete');
    }

    render() {
        return <Button
            value = 'Delete'
            ref = 'btnDelete'
            show={this.props.show}
            disabled={this.props.disabled}
            onClick={(e) => this.handleClick(e)}>
            <image ref = 'image' src={styles.icons[ICON]}/>
        </Button>
    }
};

ButtonRegisterDelete.propTypes = {
    onClick: PropTypes.func.isRequired
}


ButtonRegisterDelete.defaultProps = {
    disabled: false,
    show: true
};

module.exports = ButtonRegisterDelete;
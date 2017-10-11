'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const styles = require('../button-register-styles'),
    Button = require('../button-register.jsx'),
    ICON = 'add';


class ButtonRegisterAdd extends React.PureComponent{
// кнопка создания документа в регистрах
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        return this.props.onClick('add');
    }

    render() {
        return <Button
            value = 'Add'
            ref="btnAdd"
            style={styles.button}
            show={this.props.show}
            disabled={this.props.disabled}
            onClick={(e) => this.handleClick(e)}>
            <image ref="image" src={styles.icons[ICON]}/>
        </Button>
    }
};


ButtonRegisterAdd.propTypes = {
    onClick: PropTypes.func.isRequired
}


ButtonRegisterAdd.defaultProps = {
    disabled: false,
    show: true
};

module.exports = ButtonRegisterAdd;
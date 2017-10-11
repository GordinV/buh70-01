'use strict';

import PropTypes from 'prop-types';

const React = require('react'),
    styles = require('../button-register-styles'),
    Button = require('../button-register.jsx'),
    ICON = 'cancel';


class ButtonRegisterCancel extends React.PureComponent{
// кнопка создания документа в регистрах
    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled
        }
    }

    handleClick(e) {
        return this.props.onClick();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({disabled: nextProps.disabled})
    }

    render() {
        return <Button
            ref="btnCancel"
            value='Cancel'
            show={this.props.show}
            disabled={this.state.disabled}
            onClick={(e)=> this.handleClick(e)}>
            <image ref='image' src={styles.icons[ICON]}/>
        </Button>
    }
};

ButtonRegisterCancel.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}


ButtonRegisterCancel.defaultProps = {
    disabled: false,
    show: true
};

module.exports = ButtonRegisterCancel;
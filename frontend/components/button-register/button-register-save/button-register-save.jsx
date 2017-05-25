'use strict';

const React = require('react'),
    styles = require('../button-register-styles'),
    Button = require('../button-register.jsx'),
    ICON = 'save';


class ButtonRegisterPrint extends React.PureComponent{
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
            ref="btnSave"
            value='Save'
            show={this.props.show}
            disabled={this.state.disabled}
            onClick={(e)=> this.handleClick(e)}>
            <image ref='image' src={styles.icons[ICON]}/>
        </Button>
    }
};

ButtonRegisterPrint.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool
}


ButtonRegisterPrint.defaultProps = {
    disabled: false,
    show: true
};

module.exports = ButtonRegisterPrint;
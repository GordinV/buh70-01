'use strict';

const PropTypes = require('prop-types');

const React = require('react'),
    styles = require('./input-date-styles');

class InputDate extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
            readOnly: props.readOnly
        };
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value, readOnly: nextProps.readOnly});
    }

    onChange(e) {
        let fieldValue = e.target.value,
            validation = this.validate(fieldValue);

        if (fieldValue == null) {
            // если значение нул, то пусть будет nul
            validation = true;
        }

        if (validation) {
            this.setState({value: fieldValue});

            if (this.props.onChange) {
                // если задан обработчик, вернем его
                this.props.onChange(this.props.name, fieldValue);
            }
        }

    }

    render() {
        let inputPlaceHolder = this.props.placeholder || this.props.title,
            inputStyle = Object.assign({}, styles.input,
                this.props.width ? {width: this.props.width} : {},
                this.state.readOnly ? styles.readOnly : {}
            );

        return (
        <div style={styles.wrapper}>
            <label style={styles.label} htmlFor={this.props.name} ref="label">
                {this.props.title}
            </label>

            <input type='date'
                   name={this.props.name}
                   ref="input"
                   value={this.state.value}
                   readOnly={this.state.readOnly}
                   title={this.props.title}
                   pattern={this.props.pattern}
                   placeholder={inputPlaceHolder}
                   min={this.props.min}
                   max={this.props.max}
                   onChange={this.onChange}
                   disabled={this.props.disabled}
            />
        </div>)
    }

    validate(value) {
        let result = true;

        // проверка на мин , мах
        if (this.props.min && this.props.max && value) {
            let dateValue = new Date(value);
            result = (dateValue > this.props.min && dateValue < this.props.max);
        }

        return result;
    }

}

InputDate.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    valid: PropTypes.bool,
    pattern: PropTypes.string,
    width: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string

}


InputDate.defaultProps = {
    readOnly: false,
    disabled: false,
    valid: true,
    title: ''
}


module.exports = InputDate;
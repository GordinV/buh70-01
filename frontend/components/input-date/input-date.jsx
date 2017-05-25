'use strict';
const React = require('react'),
    styles = require('./input-date-styles');

class InputDate extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            readOnly: this.props.readOnly
        };
        this.onChange = this.onChange.bind(this);
    }

    /*
     getDefaultProps () {
     let date = new Date(),
     year = date.getFullYear(),
     month = date.getMonth(),
     day = date.getDate(),
     maxDate = new Date(year + 1, month, day),
     refId = 'InputDate',
     minDate = new Date(year - 5, month, day);

     return {
     bindData: true,
     min: minDate,
     max: maxDate,
     readOnly: false,
     disabled: false
     };
     },
     */

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

    /*
     propTypes: {
     name: React.PropTypes.string.isRequired
     },
     */

    render() {
        let inputPlaceHolder = this.props.name,
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

InputDate.PropTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.objectOf(Date),
    min: React.PropTypes.objectOf(Date),
    max: React.PropTypes.objectOf(Date),
    readOnly: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    valid: React.PropTypes.bool,
    pattern: React.PropTypes.string,
    width: React.PropTypes.string

}


InputDate.defaultProps = {
    readOnly: false,
    disabled: false,
    valid: true
}


module.exports = InputDate;
const React = require('react'),
    styles = require('./input-number-styles');

class Input extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            readOnly: props.readOnly,
            disabled: props.disabled,
            valid: props.valid
        };
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value, readOnly:nextProps.readOnly})
    }

    onChange(e) {
        let fieldValue = e.target.value;
        this.setState({value: fieldValue});


        if (this.props.onChange) {
            this.props.onChange(this.props.name, fieldValue);
        }
    }

    render() {
        let inputPlaceHolder = this.props.placeholder || this.props.name,
            inputStyle = Object.assign({}, styles.input,
                this.props.width ? {width: this.props.width} : {},
                this.state.readOnly ? styles.readOnly : {}
            ),
            inputMinValue = this.props.min,
            inputMaxValue = this.props.max;


        return (
            <div style={styles.wrapper}>
                <label style={styles.label} htmlFor={this.props.name} ref="label">
                    {this.props.title}
                </label>
                <input type='number'
                       id={this.props.name}
                       ref="input"
                       style={inputStyle}
                       name={this.props.name}
                       value={this.state.value}
                       readOnly={this.state.readOnly}
                       title={this.props.title}
                       pattern="\d+(\.\d{2})?"
                       placeholder={inputPlaceHolder}
                       onChange={this.onChange}
                       min={inputMinValue}
                       max={inputMaxValue}
                       step="0.01"

                       disabled={this.props.disabled}
                />

            </div>)
    }
}

Input.PropTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    valid: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    pattern: React.PropTypes.string,
    title: React.PropTypes.string,
    min: React.PropTypes.number,
    max: React.PropTypes.number
}


Input.defaultProps = {
    readOnly: false,
    disabled: false,
    valid: true,
    min: -999999999,
    max: 999999999
}

module.exports = Input;
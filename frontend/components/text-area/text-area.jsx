const React = require('react'),
    styles = require('./text-area-styles');

class Input extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value, readOnly: true, disabled: this.props.disabled || true
        };

        this.onChange = this.onChange.bind(this);

    }

    /*
     getDefaultProps: function () {
     return {
     name: 'defaulName',
     className: 'doc-input',
     placeholder: 'defaulName',
     title: ''
     }
     },
     */

    /*
     componentDidMount() {
     // создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
     flux.stores.docStore.on('change:docId', (newValue, previousValue)=> {
     if (newValue !== previousValue) {
     // отслеживаем создание нового документа
     let data = flux.stores.docStore.data,
     value = data[this.props.name];
     if (newValue == 0) {
     // совый документ
     this.setState({value:0});
     } else {
     this.setState({value:value});
     }
     }
     });
     flux.stores.docStore.on('change:edited', (newValue, previousValue)=> {
     if (newValue !== previousValue ) {
     this.setState({readOnly: !newValue});
     }
     });
     flux.stores.docStore.on('change:data', (newValue, previousValue)=> {
     // слушуем изменения данных;
     if (JSON.stringify(newValue) !== JSON.stringify(previousValue)) {
     let data = newValue,
     fieldValue = data[this.props.name];
     if (data[this.props.name]) {
     this.setState({value: fieldValue});
     }
     }
     });

     },
     */

    onChange(e) {
        let fieldValue = e.target.value;
//            data = flux.stores.docStore.data;

        this.setState({value: fieldValue});
        if (this.props.onChange) {
            this.props.onChange(this.props.name, fieldValue);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value})
    }

    render() {
        const inputPlaceHolder = this.props.placeholder || this.props.name,
            inputStyle = Object.assign({}, styles.input,
                this.props.width ? {width: this.props.width} : {},
                this.state.readOnly ? styles.readOnly : {}
            );

        return (
            <div style={styles.wrapper}>

                <label htmlFor={this.props.name} ref="label"
                       style={styles.label}><span>{this.props.title}</span>
                </label>

                <textarea
                    style={inputStyle}
                    ref="input"
                    id={this.props.name}
                    name={this.props.name}
                    value={this.state.value}
                    readOnly={this.props.readOnly}
                    title={this.props.title}
                    placeholder={inputPlaceHolder}
                    onChange={this.onChange}
                    disabled={this.props.disabled}
                />
            </div>)
    }

}
;

Input.PropTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    valid: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    title: React.PropTypes.string
}

Input.defaultProps = {
    readOnly: false,
    disabled: true,
    valid: true
}


module.exports = Input;
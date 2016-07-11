var React = require('react'),
    flux = require('fluxify');

const Input = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value, 
            readOnly: this.props.readOnly || false, 
            disabled: this.props.disabled || true,
            valid: true
        };
    },
    getDefaultProps: function () {
        return {
            bindData: true,
            min:-999999999,
            max: 999999999
        };
    },

    componentWillMount: function () {
// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
        var self = this;
//        console.log('componentWillMount' + this.props.name);
        flux.stores.docStore.on('change:docId', function (newValue, previousValue) {
            if (newValue !== previousValue) {
                var data = flux.stores.docStore.data,
                    value = data[self.props.name];
                if (newValue == 0) {
                    // совый документ
                    self.setState({value: 0});
                } else {
                    self.setState({value: value});
                }
            }
        });

        flux.stores.docStore.on('change:edited', function (newValue, previousValue) {
            //           console.log('on change:edited:' + newValue);
            if (newValue !== previousValue) {
                self.setState({readOnly: !newValue, disabled: !newValue});
            }
        });

        flux.stores.docStore.on('change:data', function (newValue, previousValue) {
                       console.log('on change:data:' + newValue);
            if (newValue !== previousValue) {

                var data = newValue,
                    fieldValue = data[self.props.name];

                self.setState({value: fieldValue});
            }
        });
    },
   /*
    componentWillReceiveProps: function(nextProps) {
        this.setState({value:nextProps.value })
    },*/

    shouldComponentUpdate: function (nextProps, nextState) {
        // изменения будут отражаться только в случае если такие есть
        var returnvalue = true;
        
        if (this.state) {
            var returnvalue = (nextState.value !== this.state.value ||
            nextState.readOnly !== this.state.readOnly ||
            nextState.disabled !== this.state.disabled);
        }
        return returnvalue;

    },

    onChange: function (e) {
        var fieldValue = Number(e.target.value);

        if (fieldValue >= Number(this.props.min) || fieldValue <= Number(this.props.max)) {
            // заданное ограничение не работает при ручном вводе сумм, отработаем его
            this.setState({value: fieldValue});

            if (this.props.bindData) {
                // приявязка к данным
                data = flux.stores.docStore.data;
                // получить значение
                data[this.props.name] = fieldValue;
                // задать новое значение поля
                flux.doAction('dataChange', data);
            }

            if (this.props.onChange) {
                // смотрим к чему привязан селект и отдаим его наверх
                this.props.onChange(e, this.props.name); // в случае если задан обработчик на верхнем уровне, отдадим обработку туда
            }
        }
    },

    onBlur: function() {
        // если такой метод передан сверху, то вернет его обратно
        if (this.props.onBlur) {
            this.props.onBlur(this.state.value, this.props.name);
        }
    },

    render: function () {
        var inputClassName = this.props.className || '' + 'doc-input',
            inputReadOnly = this.state.readOnly || false,
            inputDisabled = this.state.disabled || 'false',
            inputPlaceHolder = this.props.placeholder || this.props.name,
            inputMinValue = this.props.min || -999999999,
            inputMaxValue = this.props.max || 999999999;

        if (inputReadOnly) {
            inputClassName = inputClassName + ' doc-input-readonly';
        }

        if (inputDisabled == 'true') {
            return (
                <div className="form-widget">
                    <label htmlFor={this.props.name}
                           className="form-widget-label"><span>{this.props.title}</span>
                    </label>
                    <input type='number'
                           className={inputClassName}
                           name={this.props.name}
                           value={this.state.value}
                           title={this.props.title}
                           placeholder={inputPlaceHolder}
                           pattern="\d+(\.\d{2})?"
                           disabled
                    />

                </div>)

        } else {

            return (
                <div className="form-widget">
                    <label
                        htmlFor={this.props.name}>
                        <span>{this.props.title}</span>
                    </label>
                    <input type='number'
                           className={inputClassName}
                           name={this.props.name}
                           value={this.state.value}
                           readOnly={inputReadOnly}
                           title={this.props.title}
                           pattern={this.props.pattern}
                           placeholder={inputPlaceHolder}
                           min={inputMinValue}
                           max={inputMaxValue}
                           step="0.01"
                           pattern="\d+(\.\d{2})?"
                           onChange={this.onChange}
                           onBlur={this.onBlur}
                    />
                </div>)
        }

    }
});

module.exports = Input;
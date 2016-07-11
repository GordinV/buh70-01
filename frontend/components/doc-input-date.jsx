var React = require('react'),
    flux = require('fluxify');

const InputDate = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value, 
            readOnly: true, 
            disabled: this.props.disabled || true,
            valid: true
        };
    },

    getDefaultProps: function () {

        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate(),
            maxDate = new Date(year + 1, month, day),
            minDate = new Date(year - 1, month, day);

        return {
            bindData: true,
            min: minDate,
            max: maxDate
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({value:nextProps.value })
    },

    componentWillMount: function() {
// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
        var self = this;
//        console.log('componentWillMount' + this.props.name);
/*
        flux.stores.docStore.on('change:docId', function(newValue, previousValue) {
            if (newValue !== previousValue) {
                // отслеживаем создание нового документа
                /!*
                var data = flux.stores.docStore.data,
                    value = data[self.props.name];

                if (newValue == 0) {
                    // новый документ
                    self.setState({value:0});
                } else {
                    self.setState({value:value});
                }
*!/
            }
        });
*/

        flux.stores.docStore.on('change:edited', function(newValue, previousValue) {
 //           console.log('on change:edited:' + newValue);
            if (newValue !== previousValue) {
                self.setState({readOnly: !newValue});
            }
        });

        /*
         flux.stores.docStore.on('change:data', function(newValue, previousValue) {
         console.log('on change:data:' + newValue);
         if (newValue !== previousValue) {

         var data = newValue,
         fieldValue = data[self.props.name];

         self.setState({value: fieldValue});
         }
         });

         */

    },

    onChange: function(e) {
        var fieldValue = e.target.value,
            data = flux.stores.docStore.data;

        this.setState({value: fieldValue});
        data[this.props.name] = fieldValue;

        // задать новое значение поля
        flux.doAction('dataChange', data);
    },

    render: function() {
 //       console.log('date render states:',this.state);
        var inputClassName =this.props.className || 'doc-input',
            inputReadOnly = this.state.readOnly || false,
            inputDisabled = this.state.disabled,
            inputPlaceHolder = this.props.placeholder || this.props.name;

        if (inputReadOnly) {
            inputClassName = inputClassName + ' doc-input-readonly';
        }

        if (inputDisabled == 'true') {
            return (
                <div className="form-widget">
                    <label htmlFor={this.props.name}> {this.props.title}
                    </label>

                    <input type='date'
                          className={inputClassName}
                          name={this.props.name}
                          value={this.state.value}
                          readOnly={inputReadOnly}
                          title={this.props.title}
                          pattern={this.props.pattern}
                          placeholder={inputPlaceHolder}
                          onChange={this.onChange}
                          disabled
                    />
                </div>)
        } else {
            return (
                <div className="form-widget">
                    <label htmlFor={this.props.name}> {this.props.title}
                    <input type='date'
                           className={inputClassName}
                           name={this.props.name}
                           value={this.state.value}
                           readOnly={inputReadOnly}
                           title={this.props.title}
                           pattern={this.props.pattern}
                           placeholder={inputPlaceHolder}
                           min={this.props.min}
                           max={this.props.max}
                           onChange={this.onChange}
                    />
                    </label>
                </div>)
        }
    }
});

module.exports = InputDate;
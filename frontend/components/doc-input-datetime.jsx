var React = require('react'),
    flux = require('fluxify');

const InputDateTime = React.createClass({
    getInitialState: function() {
        return {value: this.props.value, readOnly: true, disabled: this.props.disabled || true};
    },

    componentWillMount: function() {
// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
        var self = this;
//        console.log('componentWillMount' + this.props.name);
/*
        flux.stores.docStore.on('change:docId', function(newValue, previousValue) {
            if (newValue !== previousValue) {
                // отслеживаем создание нового документа
                var data = flux.stores.docStore.data,
                    value = data[self.props.name];
                if (newValue == 0) {
                    // совый документ
                    self.setState({value:0});
                } else {
                    self.setState({value:value});
                }
            }
        });
*/

        flux.stores.docStore.on('change:edited', function(newValue, previousValue) {
 //           console.log('on change:edited:' + newValue);
            if (newValue !== previousValue) {
                self.setState({readOnly: !newValue});
            }
        });

        flux.stores.docStore.on('change:data', function(newValue, previousValue) {
            if (newValue !== previousValue) {

                var data = newValue,
                    fieldValue = data[self.props.name];

                self.setState({value: fieldValue});
            }
        });
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        // изменения будут отражаться только в случае если такие есть
        var returnvalue = (nextState.value !== this.state.value ||
        nextState.readOnly !== this.state.readOnly ||
        nextState.disabled !== this.state.disabled);

 //       console.log('vastus:' + returnvalue);
        return returnvalue;

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
        console.log('props:' + JSON.stringify(this.props));
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
                    <label>{this.props.title}</label>
                    <input type='datetime-local'
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
                    <label>{this.props.title}</label>
                    <input type='datetime-local'
                           className={inputClassName}
                           name={this.props.name}
                           value={this.state.value}
                           readOnly={inputReadOnly}
                           title={this.props.title}
                           pattern={this.props.pattern}
                           placeholder={inputPlaceHolder}
                           onChange={this.onChange}
                    />
                </div>)
        }
    }
});

module.exports = InputDateTime;
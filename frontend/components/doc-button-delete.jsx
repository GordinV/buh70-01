var React = require('react'),
    flux = require('fluxify');

const DocButton = React.createClass({
    name: 'btnDelete',
    getInitialState: function() {
        return {enabled: true};
    },

    componentWillMount: function() {
// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
        var self = this;

        flux.stores.docStore.on('change:edited', function(newValue, previousValue) {
            if (newValue !== previousValue) {
                // режим изменился, меняем состояние
                console.log('btnDel change:edited ' + newValue);
                self.setState({enabled:!newValue});
            }
        });

        flux.stores.docStore.on('change:saved', function(newValue, previousValue) {
            if (newValue !== previousValue) {
                // режим изменился, меняем состояние
                console.log('btnDel change:saved ' + newValue);
                self.setState({enabled:newValue});
            }
        });

    },

    onClick: function() {
        console.log('clicked Delete');
//        window.showModalDialog()
        if (confirm("Are you sure?") == true) {
            console.log('called flux to delete');
            this.props.onClick(this.name);        }

    },
    render: function() {
        if (this.state.enabled) {
            return (<button onClick={this.onClick}>{this.props.children}</button>)
        } else {
            return (<button disabled onClick={this.onClick}>{this.props.children}</button>)
        }
    }
});

module.exports = DocButton;

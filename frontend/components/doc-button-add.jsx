var React = require('react'),
    flux = require('fluxify');

const DocButton = React.createClass({
    name: 'btnAdd',
    getInitialState: function() {
        return {enabled: true}
    },

    componentWillMount: function() {
// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
        var self = this;

        flux.stores.docStore.on('change:edited', function(newValue, previousValue) {
            if (newValue !== previousValue) {
                // режим изменился, меняем состояние
                console.log('btnAdd change:edited ' + newValue);
                self.setState({enabled:!newValue});
            }
        });

        flux.stores.docStore.on('change:saved', function(newValue, previousValue) {
            if (newValue !== previousValue) {
                // режим изменился, меняем состояние
                console.log('btnAdd change:saved ' + newValue);
                self.setState({enabled:newValue});
            }
        });

    },

    onClick: function() {
        // отправим извещение наверх
//        this.props.onClick(this.name);
        console.log('btnAdd clicked');
        flux.doAction( 'docIdChange', 0 );
        flux.doAction( 'editedChange', true );
        flux.doAction( 'savedChange', false );


    },
    render: function() {
        if (this.state.enabled) {
            return (
                <button type="button" value=' Add ' name={this.props.name}
                            onClick={this.onClick}> Add </button>)
        } else {
            return (<button type="button" disabled value=' Add ' name={this.props.name}
                            onClick={this.onClick}> Add </button>)
        }
    }
});

module.exports = DocButton

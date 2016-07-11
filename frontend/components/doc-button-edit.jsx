var React = require('react'),
    flux = require('fluxify');

const DocButton = React.createClass({
    name: 'btnEdit',
    getInitialState: function() {
        return {enabled:true};
    },

    componentWillMount: function() {
// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
        var self = this;

        flux.stores.docStore.on('change:edited', function(newValue, previousValue) {
            if (newValue !== previousValue) {
                // режим изменился, меняем состояние
                self.setState({enabled:!newValue});
            }
        });

        flux.stores.docStore.on('change:saved', function(newValue, previousValue) {
            if (newValue !== previousValue) {
                // режим изменился, меняем состояние
                self.setState({enabled:newValue});
            }
        });

    },

    onClick: function() {
        // переводим документ в режим редактирования, сохранен = false
        flux.doAction( 'editedChange', true );
        flux.doAction( 'savedChange', false );
    },

    render: function() {
        if (this.state.enabled) {
            return (
                <button type="button"
                    onClick={this.onClick} 
                >
                    {this.props.children}
            </button>)
        } else {
            return (<button disabled >{this.props.children}</button>)
        }
    }
});

module.exports = DocButton;
var React = require('react'),
    flux = require('fluxify');

const DocButton = React.createClass({
    name: 'btnSalvesta',
    getInitialState: function() {
        return {enabled: false, readOnly: false};
    },

    componentWillMount: function() {
// создаем обработчик события на изменение состояния saved.
        var self = this;

        flux.stores.docStore.on('change:saved', function(newValue, previousValue) {
            if (newValue !== previousValue) {
                // режим изменился, меняем состояние
                console.log('btnSave change:saved ' + newValue);
                self.setState({enabled:!newValue});
            }
        });
    },

    onClick: function(e) {
        // валидатор
console.log('start validator')
        var isValid = !this.props.validator();
        console.log('finsihed validator')

        if (isValid) {
            // если прошли валидацию, то сохранеям
           flux.doAction( 'saveData');
        }

        return false;
    },

    render: function() {
        console.log('rendering');
        if (this.state.enabled) {
            return (<button type="button"
                onClick={this.onClick}>
                {this.props.children}
            </button>)
        } else {
            return (<button  disabled >{this.props.children}</button>)
       }
    }
});

module.exports = DocButton;

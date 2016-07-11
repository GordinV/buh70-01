var React = require('react'),
    flux = require('fluxify');

const DocButtonSalvesta = React.createClass({
    name: 'btnSalvesta',
    getInitialState: function() {
        return {enabled: true};
    },
/*

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

*/
    onClick: function() {
//        this.props.onClick(this.name);
        // валидатор
        /*
         var isValid = !this.props.validator();
         alert('onClicked');
         if (isValid) {
         // если прошли валидацию, то сохранеям
         flux.doAction( 'saveData');
         }
         */
        alert('btn salvesta clicked');
    },

    render: function() {
        console.log('rendering');
        if (this.state.enabled) {
            return (<button onClick={this.onClick}>
                {this.props.children}
            </button>)
        } else {
            return (<button  disabled >{this.props.children}</button>)
        }
    }
});

module.exports = DocButtonSalvesta;

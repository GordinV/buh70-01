var React = require('react'),
    MyButton = require('./mybutton.js'),
    flux = require('fluxify');


var ButtonAdd = React.createClass({
    displayName: 'ButtonAdd',

    onClick: function() {
        // вызовем действия на флаксе
        flux.doAction('Add');
    },

    render: function render() {
        return <MyButton buttonValue="Lisa" onClick={this.onClick}/>
    }
});

module.exports = ButtonAdd;
var MyButton = require('./mybutton.js'),
    React = require('react'),
    flux = require('fluxify');

var ButtonEdit = React.createClass({
    displayName: 'ButtonEdit',

    onClick: function() {
        // вызовем действия на флаксе
        flux.doAction('Edit');
    },

    render: function render() {
        return React.createElement(MyButton, {
            className:this.props.className,
            buttonValue: 'Muuda', 
            onClick: this.onClick
        })
    }
});

module.exports = ButtonEdit;
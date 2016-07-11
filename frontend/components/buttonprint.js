var MyButton = require('./mybutton.js'),
    React = require('react'),
    flux = require('fluxify');

var ButtonPrint = React.createClass({
    displayName: 'ButtonDelete',

    onClick: function() {
        // вызовем действия на флаксе
        flux.doAction('Print');
    },

    render: function render() {
        return React.createElement(MyButton, {
            className:this.props.className,
            buttonValue: 'Trükk',
            onClick: this.onClick
        })
    }
});

module.exports = ButtonPrint;

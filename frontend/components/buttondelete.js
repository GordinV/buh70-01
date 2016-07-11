var MyButton = require('./mybutton.js'),
    React = require('react'),
    flux = require('fluxify');

var ButtonDelete = React.createClass({
    displayName: 'ButtonDelete',

    onClick: function() {
        // вызовем действия на флаксе
        flux.doAction('Delete');
    },

    render: function render() {
        return React.createElement(MyButton, {
            className:this.props.className,
            buttonValue: 'Kustuta', 
            onClick: this.onClick
        })
    }
});

module.exports = ButtonDelete;

var MyButton = require('./mybutton.js'),
    React = require('react'),
    flux = require('fluxify');


var ButtonAdd = React.createClass({
    displayName: 'ButtonAdd',

    onClick: function() {
        // вызовем действия на флаксе
        flux.doAction('Add');
    },
    render: function render() {
        return  React.createElement(MyButton, { 
            className:this.props.className,
            buttonValue: 'Lisa (+)',
            onClick: this.onClick,})
    }
});

module.exports = ButtonAdd;
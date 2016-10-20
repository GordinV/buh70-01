'use strict';

const React = require('react');

const DocButton = (props)=> {
    let btnEnabled = props.enabled ? true: false; // установим значение по умолчанию
    return <input type="button"
                  value={props.value}
                  disabled = {btnEnabled}
                  onClick={props.onClick}/>
};

DocButton.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired
}

module.exports = DocButton

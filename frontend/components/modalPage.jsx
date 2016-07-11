'use strict';
var React = require('react');
const InputText = require('../components/doc-input-text.jsx');


var modalPage = React.createClass({
    handleBtnClick: function(btnEvent) {
        this.props.modalPageBtnClick(btnEvent);
    },
    getDefaultProps: function() {
        return {
            modalPageName: 'defaulName'
        }
    },
    render: function() {
        console.log('modalPage this.props', this.props);
        return (
            <div className='modalPage'>
                <div id = 'modalPage'>
                    <div id = 'header'>
                        <span id='headerName'> {this.props.modalPageName} </span>
                    </div>
                    <div id="modalPageContent">
                        {this.props.children}
                    </div>

                    <div id='modalPageButtons'>
                        <button
                            onClick = {this.handleBtnClick.bind(this,'Ok')}
                            className ='modalPageButtons'
                            id='btnOk'> Ok
                        </button>
                        <button
                            onClick = {this.handleBtnClick.bind(this,'Cancel')}
                            className ='modalPageButtons'
                            id='btnCancel'> Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = modalPage;
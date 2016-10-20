'use strict';
const React = require('react');

const modalPage = React.createClass({
    handleBtnClick: function(btnEvent) {
        this.props.modalPageBtnClick(btnEvent);
    },

    propTypes: {
        modalPageName: React.PropTypes.string.isRequired,
        modalPageBtnClick: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            modalPageName: 'defaulName',
            modalObjects: ['btnOk', 'btnCancel']
        }
    },

    render: function() {
        let hideBtnOk =  this.props.modalObjects.indexOf('btnOk') == -1 ? false: true, // управление кнопкой Ок
            hideBtnCancel =  this.props.modalObjects.indexOf('btnCancel') == -1 ? false: true; // управление кнопкой Cancel

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
                        {hideBtnOk ?
                        < button
                            onClick = {this.handleBtnClick.bind(this,'Ok')}
                            className ='modalPageButtons'
                            id='btnOk'> Ok
                            </button> : null
                        }
                        {hideBtnCancel ?
                        <button
                            onClick = {this.handleBtnClick.bind(this,'Cancel')}
                            className ='modalPageButtons'
                            id='btnCancel'> Cancel
                        </button>: null
                        }
                    </div>
                </div>
            </div>
        )
    }
});


module.exports = modalPage;
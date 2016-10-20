'use strict';
const React = require('react'),
    ModalPage = require('../components/modalPage.jsx');

const ModalPageDelete  = (props)=> {
    let systemMessage = props.systemMessage ? props.systemMessage: '',
        modalObjects = ['btnOk'];

    return <ModalPage
        modalPageBtnClick = {props.modalPageBtnClick}
        modalPageName = 'Warning!'
        modalObjects = {modalObjects}

    >
        <div style={{padding:50}}>
            <span> {systemMessage} </span>
        </div>
    </ModalPage>
}

module.exports = ModalPageDelete ;

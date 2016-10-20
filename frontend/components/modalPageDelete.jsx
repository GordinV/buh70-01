'use strict';
const React = require('react'),
    ModalPage = require('../components/modalPage.jsx');

const ModalPageDelete  = (props)=> {
    let modalObjects = ['btnOk', 'btnCancel'];

    return <ModalPage
        modalPageBtnClick = {props.modalPageBtnClick}
        modalPageName = 'Delete document'
    >
        <div style={{padding:50}}>
            <span> Удалить документ ? </span>
        </div>
        </ModalPage>
}

module.exports = ModalPageDelete ;
'use strict';
const React = require('react'),
    Button = require('../button-register/button-register.jsx'),
    buttonStyles = require('../button-register/button-register-styles'),
    styles = require('./modalpage-styles');

class ModalPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleBtnClick.bind(this);
        this.closeModalPage.bind(this);
        this.state = {
            show: this.props.show
        }
    }

    closeModalPage() {
        this.setState({show:false});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({show: nextProps.show});
    }

    handleBtnClick(btnEvent) {
        this.props.modalPageBtnClick(btnEvent);
    }

    render() {
        // если передан атрибу modalObjects = ['btnOk','btnCancel']
        let hideBtnOk = this.props.modalObjects.indexOf('btnOk') == -1 ? false : true, // управление кнопкой Ок
            hideBtnCancel = this.props.modalObjects.indexOf('btnCancel') == -1 ? false : true, // управление кнопкой Cancel
            displayModal = this.state.show ? 'flex': 'none' ,
            pagePosition =  this.props.position,
            containerStyle = Object.assign({}, styles.container, {display: displayModal}, {justifyContent:pagePosition});

        return (
            <div ref="container" style={containerStyle}>
                <div style={styles.modalPage} ref='modalPageContainer'>
                    <div style={styles.header} ref='modalPageHeader'>
                        <span ref='headerName' style={styles.headerName}> {this.props.modalPageName} </span>
                        <Button style={styles.buttonClose} ref="btnClose" onClick={this.closeModalPage.bind(this)} value="x" />
                    </div>
                    <div style={styles.modalPageContent} ref="modalPageContent">
                        {this.props.children}
                    </div>

                    <div style={styles.modalFooter} ref='modalPageButtons'>
                        {hideBtnOk ?
                            <Button
                                ref="btnOk"
                                value="Ok"
                                style={styles.modalPageButtons}
                                width={('width' in styles.modalPageButtons)? styles.modalPageButtons.width: null}
                                height={('height' in styles.modalPageButtons)? styles.modalPageButtons.height: null}
                                onClick={this.handleBtnClick.bind(this, 'Ok')}
                                id='btnOk'>
                                <image ref="image" src={buttonStyles.icons['ok']}/>
                            </Button> : null
                        }
                        <div style={styles.buttonsSeparator}></div>
                        {hideBtnCancel ?
                            <Button
                                ref="btnCancel"
                                value="Cancel"
                                width={('width' in styles.modalPageButtons)? styles.modalPageButtons.width: null}
                                height={('height' in styles.modalPageButtons)? styles.modalPageButtons.height: null}
                                onClick={this.handleBtnClick.bind(this, 'Cancel')}
                                className='modalPageButtons'
                                id='btnCancel'>
                                <image ref="image" src={buttonStyles.icons['cancel']}/>
                            </Button> : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

ModalPage.propTypes = {
    modalPageName: React.PropTypes.string.isRequired,
    modalPageBtnClick: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool,
    position: React.PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
}


ModalPage.defaultProps = {
    modalPageName: 'defaulName',
    modalObjects: ['btnOk', 'btnCancel'],
    position: 'center',
    show: false
}

module.exports = ModalPage;
'use strict';
const React = require('react'),
    flux = require('fluxify');

const
    Form = require('../../components/form/form.jsx'),
    InputText = require('../../components/input-text/input-text.jsx'),
    TextArea = require('../../components/text-area/text-area.jsx'),
    ToolbarContainer = require('./../../components/toolbar-container/toolbar-container.jsx'),
    DocToolBar = require('./../../components/doc-toolbar/doc-toolbar.jsx'),
    validateForm = require('../../mixin/validateForm'),
    styles = require('./asutused.styles');


// Create a store
const docStore = require('../../stores/doc_store.js');

const now = new Date();

class Asutused extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            docData: this.props.data.row,
            edited: this.props.data.row.id == 0,
            showMessageBox: 'none',
            checked: false,
            warning: ''

        }

        this.requiredFields = [
            {
                name: 'kood',
                type: 'C',
                min: null,
                max: null
            },
            {name: 'nimetus', type: 'C', min: null, max: null},
            {name: 'regkood', type: 'C', min: null, max: null}
        ]
        this.handleToolbarEvents = this.handleToolbarEvents.bind(this);
        this.validation = this.validation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    validation() {
        if (!this.state.edited) return '';

        let requiredFields = this.requiredFields;
        let warning = require('../../mixin/validateForm')(this, requiredFields);
        return warning;
    }

    componentDidMount() {
        // пишем исходные данные в хранилище, регистрируем обработчики событий
        let self = this,
            data = self.props.data.row;

        // сохраняем данные в хранилище
        flux.doAction('dataChange', data);

        // если новый документ (id == 0)

        if (data.id == 0) {
            flux.doAction('editedChange', true);
            flux.doAction('savedChange', false);
        }

        // отслеживаем режим редактирования
        docStore.on('change:edited', function (newValue, previousValue) {
            if (newValue) {
                // делаем копии
                flux.doAction('backupChange', {
                    row: Object.assign({}, flux.stores.docStore.data),
                    details: Object.assign([], flux.stores.docStore.details)
                });

            }

            if (newValue !== previousValue) {
                self.setState({edited: newValue});
            }
        });

    }

    shouldComponentUpdate(nextProps, nextState) {
        // @todo добавить проверку на изменение состояния
        return true;
    }

    render() {

        let isEditeMode = this.state.edited,
            toolbarParams = this.prepaireToolBarParameters(isEditeMode),
            validationMessage = this.validation();

        return (
            <Form pages={this.pages}
                  ref="form"
                  handlePageClick={this.handlePageClick}
                  disabled={isEditeMode}>
                <ToolbarContainer ref='toolbar-container'>
                    <div className='doc-toolbar-warning'>
                        {validationMessage ? <span>{validationMessage}</span> : null }
                    </div>
                    <div>
                        <DocToolBar ref='doc-toolbar'
                                    edited={isEditeMode}
                                    validator={this.validation}
                                    eventHandler={this.handleToolbarEvents}/>
                    </div>
                </ToolbarContainer>
                <div style={styles.doc}>
                    <div style={styles.docRow}>
                        <InputText title="Reg.kood "
                                   name='regkood'
                                   ref="input-regkood"
                                   value={this.state.docData.regkood}
                                   onChange={this.handleInputChange}/>
                    </div>
                    <div style={styles.docRow}>
                        <InputText title="Nimetus "
                                   name='nimetus'
                                   ref="input-nimetus"
                                   value={this.state.docData.nimetus}
                                   onChange={this.handleInputChange}/>
                    </div>
                    <div style={styles.docRow}>
                        <InputText title="Om.vorm"
                                   name='omvorm'
                                   ref="input-omvorm"
                                   value={this.state.docData.omvorm}
                                   onChange={this.handleInputChange}/>
                    </div>
                    <div style={styles.docRow}>
                                <TextArea title="Aadress"
                                          name='aadress'
                                          ref="textarea-aadress"
                                          onChange={this.handleInputChange}
                                          value={this.state.docData.aadress}
                                          readOnly={!isEditeMode}/>
                    </div>
                    <div style={styles.docRow}>
                                <TextArea title="kontakt"
                                          name='kontakt'
                                          ref="textarea-kontakt"
                                          onChange={this.handleInputChange}
                                          value={this.state.docData.kontakt}
                                          readOnly={!isEditeMode}/>
                    </div>
                    <div style={styles.docRow}>
                        <InputText title="Telefon"
                                   name='tel'
                                   ref="input-tel"
                                   value={this.state.docData.tel}
                                   onChange={this.handleInputChange}/>
                    </div>
                    <div style={styles.docRow}>
                        <InputText title="Email"
                                   name='email'
                                   ref="input-email"
                                   value={this.state.docData.email}
                                   onChange={this.handleInputChange}/>
                    </div>
                    <div style={styles.docRow}>
                                <TextArea title="Muud"
                                          name='muud'
                                          ref="textarea-muud"
                                          onChange={this.handleInputChange}
                                          value={this.state.docData.muud}
                                          readOnly={!isEditeMode}/>
                    </div>
                    <div style={styles.docRow}>
                                <TextArea title="Märkused"
                                          name='mark'
                                          ref="textarea-mark"
                                          onChange={this.handleInputChange}
                                          value={this.state.docData.mark}
                                          readOnly={!isEditeMode}/>
                    </div>
                </div>
            </Form >
        );
    }

    handleToolbarEvents(event) {
        // toolbar event handler

        switch (event) {
            case 'CANCEL':
                let backup = flux.stores.docStore.backup;
                this.setState({docData: backup.row, gridData: backup.details, warning: ''});
                break;
            default:
                console.error('handleToolbarEvents, no event handler for ', event);
        }
    }

    handleInputChange(inputName, inputValue) {
        // обработчик изменений
        console.log('handleInputChange', inputName, inputValue);
        // изменения допустимы только в режиме редактирования
        if (!this.state.edited) {
            console.error('not in edite mode');
            return false;
        }

        let data = this.state.docData;

        data[inputName] = inputValue;
        this.setState({docData: data});
        /*
         let data = flux.stores.docStore.data;
         data[inputName] = inputValue;
         // задать новое значение поля
         flux.doAction('dataChange', data);
         */

    }

    prepaireToolBarParameters(isEditMode) {
        let toolbarParams = {
            btnAdd: {
                show: !isEditMode,
                disabled: isEditMode
            },
            btnEdit: {
                show: !isEditMode,
                disabled: isEditMode
            },
            btnPrint: {
                show: true,
                disabled: true
            },
            btnSave: {
                show: isEditMode,
                disabled: false
            }
        };

        return toolbarParams;
    }

}


Asutused.PropTypes = {
    docData: React.PropTypes.object.isRequired,
    edited: React.PropTypes.bool,
    showMessageBox: React.PropTypes.string,
    checked: React.PropTypes.bool,
    warning: React.PropTypes.string

}


/*
 Arve.defaultProps = {
 disabled: false,
 show: true
 };
 */


module.exports = Asutused;


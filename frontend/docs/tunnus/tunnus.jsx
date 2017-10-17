'use strict';

const PropTypes = require('prop-types');

const React = require('react'),
    flux = require('fluxify');

const
    Form = require('../../components/form/form.jsx'),
    InputText = require('../../components/input-text/input-text.jsx'),
    TextArea = require('../../components/text-area/text-area.jsx'),
    ToolbarContainer = require('./../../components/toolbar-container/toolbar-container.jsx'),
    DocToolBar = require('./../../components/doc-toolbar/doc-toolbar.jsx'),
    MenuToolBar = require('./../../components/menu-toolbar/menu-toolbar.jsx'),
    validateForm = require('../../mixin/validateForm'),
    styles = require('./tunnus-styles');

// Create a store
const docStore = require('../../stores/doc_store.js');

const now = new Date();

class Tunnus extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            docData: this.props.data.row,
            edited: this.props.data.row.id == 0,
            showMessageBox: 'none',
            checked: false,
            userData: props.userData,
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
                    row: Object.assign({}, flux.stores.docStore.data)
                });

            }

            if (newValue !== previousValue) {
                self.setState({edited: newValue});
            }
        });

    }

    render() {
        let isEditeMode = this.state.edited,
            toolbarParams = this.prepaireToolBarParameters(isEditeMode),
            validationMessage = this.validation();

        const btnParams = {
            btnStart: {
                show: true
            }
        }

        return (
            <div>
                <div>
                    <MenuToolBar edited={isEditeMode} params={btnParams} userData={this.state.userData}/>
                </div>

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
                            <InputText title="Kood "
                                       name='kood'
                                       ref="input-kood"
                                       value={this.state.docData.kood}
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
                                <TextArea title="Muud"
                                          name='muud'
                                          ref="textarea-muud"
                                          onChange={this.handleInputChange}
                                          value={this.state.docData.muud}
                                          readOnly={!isEditeMode}/>
                        </div>
                    </div>
                </Form >
            </div>
        );
    }

    handleToolbarEvents(event) {
        // toolbar event handler

        switch (event) {
            case 'CANCEL':
                let backup = flux.stores.docStore.backup;
                this.setState({docData: backup.row, warning: ''});
                break;
            default:
                console.error('handleToolbarEvents, no event handler for ', event);
        }
    }

    handleInputChange(inputName, inputValue) {
        // обработчик изменений
        // изменения допустимы только в режиме редактирования
        if (!this.state.edited) {
            console.error('not in edite mode');
            return false;
        }

        let data = this.state.docData;

        data[inputName] = inputValue;
        this.setState({docData: data});
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


Tunnus.propTypes = {
    data: PropTypes.object.isRequired,
    edited: PropTypes.bool,
    showMessageBox: PropTypes.string,
    checked: PropTypes.bool,
    warning: PropTypes.string

}


/*
 Arve.defaultProps = {
 disabled: false,
 show: true
 };
 */


module.exports = Tunnus;



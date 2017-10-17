'use strict';

const PropTypes = require('prop-types');

const React = require('react'),
    flux = require('fluxify');

const
    Form = require('../../components/form/form.jsx'),
    InputText = require('../../components/input-text/input-text.jsx'),
    Select = require('../../components/select/select.jsx'),
    TextArea = require('../../components/text-area/text-area.jsx'),
    InputNumber = require('../../components/input-number/input-number.jsx'),
    ToolbarContainer = require('./../../components/toolbar-container/toolbar-container.jsx'),
    MenuToolBar = require('./../../components/menu-toolbar/menu-toolbar.jsx'),
    DocToolBar = require('./../../components/doc-toolbar/doc-toolbar.jsx'),
    validateForm = require('../../mixin/validateForm'),
    styles = require('./nomenclature-styles'),
    LIBRARIES = ['kontod', 'tunnus', 'project'];


// Create a store
const docStore = require('../../stores/doc_store.js');

const now = new Date(),
    DOKUMENTS = [
        {id: 1, kood: 'ARV', name: 'Arved'}
    ],
    CURRENCIES = [{id: 1, kood: 'EUR', name: 'EUR'}],
    TAXIES = [
        {id: 1, kood: null, name: '-%'},
        {id: 2, kood: 0, name: '0%'},
        {id: 3, kood: 5, name: '5%'},
        {id: 4, kood: 10, name: '10%'},
        {id: 5, kood: 18, name: '18%'},
        {id: 6, kood: 20, name: '20%'}
    ]

class Nomenclature extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            docData: this.props.data.row,
            edited: this.props.data.row.id == 0,
            showMessageBox: 'none',
            checked: false,
            libs: this.createLibs(),
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
                    row: Object.assign({}, flux.stores.docStore.data),
                    details: Object.assign([], flux.stores.docStore.details)
                });

            }

            if (newValue !== previousValue) {
                self.setState({edited: newValue});
            }
        });

        // грузим справочники
        LIBRARIES.forEach(lib => {
            flux.doAction("loadLibs", lib);
        });

        docStore.on('change:libs', (newValue, previousValue) => {
            let isChanged = false,
                libs = newValue,
                libsData = this.state.libs;

            if (newValue.length > 0) {

                libs.forEach(lib => {
                    if (lib.id === 'dokProps') {
                        // оставим только данные этого документа

                    }
                    if (this.state.libs[lib.id] && lib.data.length > 0) {
                        libsData[lib.id] = lib.data;
                        isChanged = true;
                    }
                });
            }

            if (isChanged) {
                self.setState({libs: libsData});
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
                        <Select title="Dokument:"
                                name='dok'
                                data={DOKUMENTS}
                                value={this.state.docData.dok}
                                defaultValue={this.state.docData.dok}
                                ref="select-dok"
                                btnDelete={isEditeMode}
                                onChange={this.handleInputChange}
                                readOnly={!isEditeMode}/>
                    </div>
                    <div style={styles.docRow}>
                        <Select title="Maksumäär:"
                                name='vat'
                                data={TAXIES}
                                collId='kood'
                                value={this.state.docData.vat}
                                defaultValue={this.state.docData.vat}
                                ref="select-vat"
                                btnDelete={isEditeMode}
                                onChange={this.handleInputChange}
                                readOnly={!isEditeMode}/>
                    </div>

                    <div style={styles.docRow}>
                        <div style={styles.docColumn}>
                            <InputNumber title="Hind: "
                                         name='hind'
                                         ref="input-hind"
                                         value={Number(this.state.docData.hind)}
                                         onChange={this.handleInputChange}/>
                        </div>
                        <div style={styles.docColumn}>
                            <div style={styles.docRow}>
                                <Select title="Valuuta:"
                                        name='valuuta'
                                        data={CURRENCIES}
                                        collId='kood'
                                        value={this.state.docData.valuuta}
                                        defaultValue={this.state.docData.valuuta}
                                        ref="select-valuuta"
                                        btnDelete={isEditeMode}
                                        onChange={this.handleInputChange}
                                        readOnly={!isEditeMode}/>
                                <InputNumber title="Kuurs: "
                                             name='kuurs'
                                             ref="input-kuurs"
                                             value={Number(this.state.docData.kuurs)}
                                             onChange={this.handleInputChange}/>
                            </div>
                        </div>
                    </div>
                    <div style={styles.docRow}>
                        <div style={styles.docColumn}>
                            <Select title="Konto (Meie teenused)"
                                    name='konto_db'
                                    libs="kontod"
                                    data={this.state.libs['kontod']}
                                    readOnly={!isEditeMode}
                                    value={this.state.docData['konto_db']}
                                    ref='select_konto_db'
                                    collId="kood"
                                    onChange={this.handleInputChange}/>
                        </div>
                        <div style={styles.docColumn}>
                            <Select title="Konto (Ostetud teenused)"
                                    name='konto_kr'
                                    libs="kontod"
                                    data={this.state.libs['kontod']}
                                    readOnly={!isEditeMode}
                                    value={this.state.docData.konto_kr}
                                    ref='select_konto_kr'
                                    collId="kood"
                                    onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div style={styles.docRow}>

                        <Select title="Projekt:"
                                name='projekt'
                                libs="project"
                                data={this.state.libs['project']}
                                readOnly={!isEditeMode}
                                value={this.state.docData['projekt']}
                                ref='select_projekt'
                                collId="kood"
                                onChange={this.handleInputChange}/>
                    </div>
                    <div style={styles.docRow}>
                        <Select title="Tunnus:"
                                name='tunnus'
                                libs="tunnus"
                                data={this.state.libs['tunnus']}
                                readOnly={!isEditeMode}
                                value={this.state.docData['tunnus']}
                                ref='select_tunnus'
                                collId="kood"
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
                this.setState({docData: backup.row, gridData: backup.details, warning: ''});
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


    createLibs() {
        // вернет объект библиотек документа
        let libs = {};
        LIBRARIES.forEach((lib) => {
            libs[lib] = [];
        })
        return libs;
    }


}


Nomenclature.propTypes = {
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


module.exports = Nomenclature;



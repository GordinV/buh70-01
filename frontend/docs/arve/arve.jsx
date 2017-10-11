'use strict';

import PropTypes from 'prop-types';

const React = require('react'),
    flux = require('fluxify');

const
    Form = require('../../components/form/form.jsx'),
    InputText = require('../../components/input-text/input-text.jsx'),
    InputDate = require('../../components/input-date/input-date.jsx'),
    InputNumber = require('../../components/input-number/input-number.jsx'),
    DocCommon = require('../../components/doc-common/doc-common.jsx'),
    Select = require('../../components/select/select.jsx'),
//    SelectData = require('../../components/select-data/select-data.jsx'),
    TextArea = require('../../components/text-area/text-area.jsx'),
    DataGrid = require('../../components/data-grid/data-grid.jsx'),
    GridButtonAdd = require('../../components/button-register/button-register-add/button-register-add.jsx'),
    GridButtonEdit = require('../../components/button-register/button-register-edit/button-register-edit.jsx'),
    GridButtonDelete = require('../../components/button-register/button-register-delete/button-register-delete.jsx'),
    DokProp = require('../../components/docprop/docprop.jsx'),
    relatedDocuments = require('../../mixin/relatedDocuments.jsx'),
    ToolbarContainer = require('./../../components/toolbar-container/toolbar-container.jsx'),
    DocToolBar = require('./../../components/doc-toolbar/doc-toolbar.jsx'),
    validateForm = require('../../mixin/validateForm'),
    ModalPage = require('./../../components/modalpage/modalPage.jsx'),
    styles = require('./arve.styles');

const LIBDOK = 'ARV',
    LIBRARIES = ['asutused', 'kontod', 'dokProps', 'users', 'aa', 'tunnus', 'project', 'nomenclature'];

// Create a store
const docStore = require('../../stores/doc_store.js');

const now = new Date();

class Arve extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            docData: this.props.data.row,
            bpm: this.props.bpm,
            edited: this.props.data.row.id == 0,
            showMessageBox: 'none',
            relations: this.props.data.relations,
            gridData: this.props.data.details,
            gridConfig: this.props.data.gridConfig,
            gridRowEdit: false,
            gridRowEvent: null,
            gridRowData: null,
            libs: this.createLibs(),
            checked: false,
            warning: ''

        }

        this.pages = [{pageName: 'Arve'}]
        this.requiredFields = [
            {
                name: 'kpv',
                type: 'D',
                min: now.setFullYear(now.getFullYear() - 1),
                max: now.setFullYear(now.getFullYear() + 1)
            },
            {
                name: 'tahtaeg',
                type: 'D',
                min: now.setFullYear(now.getFullYear() - 1),
                max: now.setFullYear(now.getFullYear() + 1)
            },
            {name: 'asutusid', type: 'N', min: null, max: null},
            {name: 'summa', type: 'N', min: -9999999, max: 999999}
        ]
        this.handleToolbarEvents = this.handleToolbarEvents.bind(this);
        this.validation = this.validation.bind(this);
        this.modalPageClick = this.modalPageClick.bind(this);
        this.handleGridBtnClick = this.handleGridBtnClick.bind(this);
        this.addRow = this.addRow.bind(this);
        this.handleGridRowChange = this.handleGridRowChange.bind(this);
        this.validateGridRow = this.validateGridRow.bind(this);
        this.handleGridRowInput = this.handleGridRowInput.bind(this);
        this.createGridRow = this.createGridRow.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    validation() {
        if (!this.state.edited) return '';

        let requiredFields = this.requiredFields;
        let warning = require('../../mixin/validateForm')(this, requiredFields);
        return warning;
    }

    componentWillMount() {
        this.relatedDocuments();
    }

    componentDidMount() {
        // пишем исходные данные в хранилище, регистрируем обработчики событий
        let self = this,
            data = self.props.data.row,
            details = self.props.data.details,
            gridConfig = self.props.data.gridConfig;

        // сохраняем данные в хранилище
        flux.doAction('dataChange', data);
        flux.doAction('detailsChange', details); // данные грида
        flux.doAction('gridConfigChange', gridConfig); // данные грида
//        flux.doAction('gridNameChange', 'arv-grid-row'); // задаем имя компонента строки грида (для редактирования

        // отслеживает изменения данных в гриде
        docStore.on('change:details', function (newValue, previousValue) {
            if (JSON.stringify(newValue) !== JSON.stringify(previousValue) && typeof newValue == 'array') {
                // итоги
                let summa = newValue.reduce((sum, row) => sum + Number(row.summa), 0), // сумма счета
                    kbm = newValue.reduce((sum, row) => sum + Number(row.kbm), 0), // сумма налога
                    docData = self.state.docData;

                docData.summa = summa;
                docData.kbm = kbm;

                self.setState({gridData: newValue, docData: docData});
            }
        });

        // грузим справочники
        LIBRARIES.forEach(lib => {
            flux.doAction("loadLibs", lib);
        });

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

    shouldComponentUpdate(nextProps, nextState) {
        // @todo добавить проверку на изменение состояния
        return true;
    }

    render() {
        // формируем зависимости
        relatedDocuments(this);

        let bpm = this.state.bpm,
            isEditeMode = this.state.edited,
            toolbarParams = this.prepaireToolBarParameters(isEditeMode),
            validationMessage = this.validation(),
            libs = flux.stores.docStore.libs;

        return (
            <div>
                <Form pages={this.pages}
                      ref="form"
                      handlePageClick={this.handlePageClick}
                      disabled={isEditeMode}>
                    <ToolbarContainer ref='toolbar-container'>
                        <div className='doc-toolbar-warning'>
                            {validationMessage ? <span>{validationMessage}</span> : null }
                        </div>
                        <div>
                            <DocToolBar bpm={bpm}
                                        ref='doc-toolbar'
                                        edited={isEditeMode}
                                        docStatus={this.state.docData.doc_status}
                                        validator={this.validation}
                                        eventHandler={this.handleToolbarEvents}/>
                        </div>
                    </ToolbarContainer>
                    <div style={styles.doc}>
                        <div style={styles.docRow}>
                            <DocCommon
                                ref='doc-common'
                                data={this.state.docData}
                                readOnly={!isEditeMode}/>
                        </div>
                        <div style={styles.docRow}>
                            <div style={styles.docColumn}>
                                <InputText ref="input-number"
                                           title='Number'
                                           name='number'
                                           value={this.state.docData.number}
                                           readOnly={!isEditeMode}
                                           onChange={this.handleInputChange}/>
                                <InputDate title='Kuupäev '
                                           name='kpv' value={this.state.docData.kpv}
                                           ref='input-kpv'
                                           readOnly={!isEditeMode}
                                           onChange={this.handleInputChange}/>
                                <InputDate title='Tähtaeg '
                                           name='tahtaeg'
                                           value={this.state.docData.tahtaeg}
                                           ref="input-tahtaeg"
                                           readOnly={!isEditeMode}
                                           onChange={this.handleInputChange}/>
                                <Select title="Asutus"
                                        name='asutusid'
                                        libs="asutused"
                                        data={this.state.libs['asutused']}
                                        value={this.state.docData.asutusid}
                                        defaultValue={this.state.docData.asutus}
                                        ref="select-asutusid"
                                        btnDelete={isEditeMode}
                                        onChange={this.handleInputChange}
                                        readOnly={!isEditeMode}/>
                                {/*
                                 <SelectData title="Asutus widget"
                                 name='asutusid'
                                 value={this.state.docData.asutusid}
                                 defaultValue={this.state.docData.asutus}
                                 collName="asutus"
                                 ref="selectData-asutusid"
                                 onChange={this.handleInputChange}
                                 readOnly={!isEditeMode}/>
                                 */}
                                <InputText title='Lisa '
                                           name='lisa'
                                           value={this.state.docData.lisa}
                                           ref='input-lisa'
                                           readOnly={!isEditeMode}
                                           onChange={this.handleInputChange}/>
                            </div>
                            <div style={styles.docColumn}>
                                <DokProp title="Konteerimine: "
                                         name='doklausid'
                                         libs="dokProps"
                                         value={this.state.docData.doklausid}
                                         defaultValue={this.state.docData.dokprop}
                                         ref="dokprop-doklausid"
                                         readOnly={!isEditeMode}/>
                            </div>
                        </div>
                        <div style={styles.docRow}>
                        <TextArea title="Märkused"
                                  name='muud'
                                  ref="textarea-muud"
                                  onChange={this.handleInputChange}
                                  value={this.state.docData.muud}
                                  readOnly={!isEditeMode}/>
                        </div>

                        {isEditeMode ?
                            <div style={styles.docRow}>
                                <ToolbarContainer
                                    ref='grid-toolbar-container'
                                    position={'left'}>
                                    <GridButtonAdd onClick={this.handleGridBtnClick} ref="grid-button-add"/>
                                    <GridButtonEdit onClick={this.handleGridBtnClick} ref="grid-button-edit"/>
                                    <GridButtonDelete onClick={this.handleGridBtnClick} ref="grid-button-delete"/>
                                </ToolbarContainer>
                            </div> : null}

                        <div style={styles.docRow}>
                            <DataGrid source='details'
                                      gridData={this.state.gridData}
                                      gridColumns={this.state.gridConfig}
                                      handleGridRow={this.handleGridRow}
                                      readOnly={!isEditeMode}
                                      ref="data-grid"/>
                        </div>
                        <div style={styles.docRow}>
                            <InputText title="Summa "
                                       name='summa'
                                       ref="input-summa"
                                       value={this.state.docData.summa} disabled='true'
                                       onChange={this.handleInputChange}
                                       pattern="^[0-9]+(\.[0-9]{1,4})?$"/>
                            <InputText title="Käibemaks "
                                       name='kbm'
                                       ref="input-kbm"
                                       disabled='true'
                                       value={this.state.docData.kbm}
                                       onChange={this.handleInputChange}
                                       pattern="^[0-9]+(\.[0-9]{1,4})?$"/>
                        </div>
                        {this.state.gridRowEdit ?
                            this.createGridRow()
                            : null}
                    </div>
                </Form >
            </div>
        );
    }

    relatedDocuments() {
        // формируем зависимости
        let relatedDocuments = this.state.relations;
        if (relatedDocuments.length > 0) {
            relatedDocuments.forEach((doc) => {
                if (doc.id) {
                    // проверим на уникальность списка документов
                    let isExists = this.pages.find((page) => {
                        if (!page.docId) {
                            return false;
                        } else {
                            return page.docId == doc.id && page.docTypeId == doc.doc_type;
                        }
                    });

                    if (!isExists) {
                        // в массиве нет, добавим ссылку на документ
                        this.pages.push({docTypeId: doc.doc_type, docId: doc.id, pageName: doc.name + ' id:' + doc.id})
                    }
                }
            });
        }
    }

    modalPageClick(btnEvent, data) {
        // отработаем Ok из модального окна
        let gridData = this.state.gridData,
            docData = this.state.docData,
            gridColumns = this.state.gridConfig,
            gridRow = this.state.gridRowData;

        if (btnEvent == 'Ok') {

            // ищем по ид строку в данных грида, если нет, то добавим строку
            if (!gridData.some(row => {
                    if (row.id === gridRow.id) return true;
                })) {
                // вставка новой строки
                gridData.splice(0, 0, gridRow);
            } else {
                gridData = gridData.map(row => {
                    if (row.id === gridRow.id) {
                        // нашли, замещаем
                        return gridRow;
                    } else {
                        return row;
                    }
                })
            }

        }

        docData = this.recalcDocSumma(docData);
        this.setState({gridRowEdit: false, gridData: gridData, docData: docData});

    }

    handlePageClick(page) {
        if (page.docId) {
            let url = "/document/" + page.docTypeId + page.docId;
            document.location.href = url;
        }
    }

    handleSelectTask(e) {
        // метод вызывается при выборе задачи
        var taskValue = e.target.value;
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

    handleGridBtnClick(btnName, id) {
        switch (btnName) {
            case 'add':
                this.addRow();
                break;
            case 'edit':
                this.editRow();
                break;
            case 'delete':
                this.deleteRow();
                break;
        }
    }

    deleteRow() {
        // удалит активную строку
        let gridData = this.state.gridData,
            gridActiveRow = this.refs['data-grid'].state.activeRow,
            docData = this.state.docData;

        gridData.splice(gridActiveRow, 1);

        // перерасчет итогов
        docData = this.recalcDocSumma(docData);

        // изменим состояние
        this.setState({gridData: gridData, docData: docData});
    }

    editRow() {
        // откроет активную строку для редактирования
        let gridData = this.state.gridData,
            gridActiveRow = this.refs['data-grid'].state.activeRow,
            gridRow = gridData[gridActiveRow];

        // откроем модальное окно для редактирования
        this.setState({gridRowEdit: true, gridRowEvent: 'edit', gridRowData: gridRow});
    }

    addRow() {
        // добавит в состояние новую строку

        let gridColumns = this.state.gridConfig,
            gridData = this.state.gridData,
            newRow = new Object();

        for (let i = 0; i < gridColumns.length; i++) {
            let field = gridColumns[i].id;
            newRow[field] = '';
        }

        newRow.id = 'NEW' + Math.random(); // генерим новое ид

        // откроем модальное окно для редактирования
        this.setState({gridRowEdit: true, gridRowEvent: 'add', gridRowData: newRow});

    }

    createGridRow() {
        let style = styles.gridRow,
            row = this.state.gridRowData,
            validateMessage = '',
            modalObjects = ['btnOk', 'btnCancel'],
            buttonOkReadOnly = validateMessage.length > 0 || !this.state.checked;

        if (buttonOkReadOnly) {
            // уберем кнопку Ок
            modalObjects.splice(0, 1);
        }


        if (!row) return <div/>;

        let nomData = this.state.libs['nomenclature'].filter(lib => {
            if (!lib.dok || lib.dok === LIBDOK) return lib;
        });

        return (<div className='.modalPage'>
            <ModalPage
                modalObjects={modalObjects}
                ref="modalpage-grid-row"
                show={true}
                modalPageBtnClick={this.modalPageClick}
                modalPageName='Rea lisamine / parandamine'>
                <div ref="grid-row-container">
                    <div style={styles.docRow}>
                        <Select title="Teenus"
                                name='nomid'
                                libs="nomenclature"
                                data={nomData}
                                readOnly={false}
                                value={row.nomid}
                                defaultValue={row.kood}
                                ref='nomid'
                                placeholder='Teenuse kood'
                                onChange={this.handleGridRowChange}/>
                    </div>
                    <div style={styles.docRow}>
                        <InputNumber title='Kogus '
                                     name='kogus'
                                     value={row.kogus}
                                     readOnly={false}
                                     disabled={false}
                                     bindData={false}
                                     ref='kogus'
                                     className='ui-c2'
                                     onChange={this.handleGridRowInput}/>
                    </div>
                    <div style={styles.docRow}>
                        <InputNumber title='Hind '
                                     name='hind'
                                     value={row.hind}
                                     readOnly={false}
                                     disabled={false}
                                     bindData={false}
                                     ref='hind'
                                     className='ui-c2'
                                     onChange={this.handleGridRowInput}/>
                    </div>
                    <div style={styles.docRow}>
                        <InputNumber title='Kbm-ta: '
                                     name='kbmta'
                                     value={row.kbmta}
                                     disabled={true}
                                     bindData={false}
                                     ref='kbmta'
                                     className='ui-c2'
                                     onChange={this.handleGridRowChange}/>
                    </div>
                    <div style={styles.docRow}>
                        <InputNumber title='Kbm: '
                                     name='kbm'
                                     value={row.kbm}
                                     disabled={true}
                                     bindData={false}
                                     ref='kbm'
                                     className='ui-c2'
                                     onBlur={this.handleGridRowInput}/>
                    </div>
                    <div style={styles.docRow}>
                        <InputNumber title='Summa: '
                                     name='Summa'
                                     value={row.summa}
                                     disabled={true}
                                     bindData={false}
                                     ref='summa'
                                     className='ui-c2'
                                     onChange={this.handleGridRowInput}/>
                    </div>
                </div>
                <div><span>{validateMessage}</span></div>
            </ModalPage>
        </div>);
    }

    handleGridRowChange(name, value) {
        // отслеживаем изменения данных на форме
        let rowData = Object({}, this.state.gridRowData);

        if (value !== rowData[name] && name === 'nomid') {
            // произошло изменение услуги, обнулим значения
            rowData['kogus'] = 0;
            rowData['hind'] = 0;
            rowData['summa'] = 0;
            rowData['kbm'] = 0;
            rowData['kbmta'] = 0;
            rowData['nomid'] = value;
        }
        // ищем по справочнику поля код и наименование

        let libData = this.state.libs['nomenclature'];
        libData.forEach(row => {
            if (row.id == value) {
                rowData['kood'] = row.kood;
                rowData['nimetus'] = row.name;
                return;
            }
        });

        rowData[name] = value;
        this.setState({gridRowData: rowData});
        this.validateGridRow();

    }

    handleGridRowInput(name, value) {
        // пересчет сумм
        let rowData = Object.assign({}, this.state.gridRowData);
        rowData[name] = value;
        rowData = this.recalcRowSumm(rowData);
        this.setState({gridRowData: rowData});
        this.validateGridRow();
    }

    recalcRowSumm(gridRowData) {
        // перерасчет суммы строки и расчет налога
        gridRowData['kogus'] = Number(gridRowData.kogus);
        gridRowData['hind'] = Number(gridRowData.hind);
        gridRowData['kbmta'] = Number(gridRowData['kogus']) * Number(gridRowData['hind']);
        gridRowData['kbm'] = Number(gridRowData['kbmta'] * 0.20); // @todo врменно
        gridRowData['summa'] = Number(gridRowData['kbmta']) + Number(gridRowData['kbm']);

        return gridRowData;
    }

    recalcDocSumma(docData) {
        let gridData = Object.assign([], this.state.gridData);

        docData['summa'] = 0;
        docData['kbm'] = 0;
        gridData.forEach(row => {
            docData['summa'] += Number(row['summa']);
            docData['kbm'] += Number(row['kbm']);
        });
        return docData;
    }

    validateGridRow() {
        // will check values on the form and return string with warning
        let warning = '',
            gridRowData = this.state.gridRowData;
        // только после проверки формы на валидность
        if (!gridRowData['nomid']) warning = warning + ' код услуги';
        if (!gridRowData['kogus']) warning = warning + ' кол-во';
        if (!gridRowData['hind']) warning = warning + ' цена';

        if (warning.length > 2) {
            // есть проблемы
            warning = 'Отсутсвуют данные:' + warning;
        }
        this.setState({checked: true, warning: warning});
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


Arve.PropTypes = {
    docData: PropTypes.object.isRequired,
    bpm: PropTypes.array,
    edited: PropTypes.bool,
    showMessageBox: PropTypes.string,
    gridData: PropTypes.array,
    relations: PropTypes.array,
    gridConfig: PropTypes.array,
    gridRowEdit: PropTypes.bool,
    gridRowEvent: PropTypes.string,
    gridRowData: PropTypes.object,
    libs: PropTypes.object,
    checked: PropTypes.bool,
    warning: PropTypes.string

}


/*
 Arve.defaultProps = {
 disabled: false,
 show: true
 };
 */


module.exports = Arve;



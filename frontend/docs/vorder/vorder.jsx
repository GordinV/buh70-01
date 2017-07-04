'use strict';
var React = require('react'),
    flux = require('fluxify');

const Form = require('../../components/form/form.jsx'),
    InputText = require('../../components/input-text/input-text.jsx'),
    InputDate = require('../../components/input-date/input-date.jsx'),
    InputNumber = require('../../components/input-number/input-number.jsx'),
    DocCommon = require('../../components/doc-common/doc-common.jsx'),
    Select = require('../../components/select/select.jsx'),
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
    styles = require('./vorder-style');

const LIBDOK = 'VORDER',
    LIBRARIES = ['asutused', 'kontod', 'dokProps', 'tunnus', 'project', 'nomenclature','kassa'];

const docStore = require('../../stores/doc_store.js');

let now = new Date();

class Vorder extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            docData: this.props.data.row,
            bpm: this.props.bpm,
            edited: false,
            gridData: this.props.data.details,
            relations: this.props.data.relations,
            gridConfig: this.props.data.gridConfig,
            gridRowEdit: false,
            gridRowEvent: null,
            gridRowData: null,
            libs: this.createLibs()
        }

        this.pages = [{pageName: 'Väljamakse kassaorder'}];
        this.requiredFields = [
            {
                name: 'kpv',
                type: 'D',
                min: now.setFullYear(now.getFullYear() - 1),
                max: now.setFullYear(now.getFullYear() + 1)
            },
            {name: 'asutusid', type: 'I'},
            {name: 'nimi', type: 'C'},
            {name: 'summa', type: 'N'}
        ];

        this.handleToolbarEvents = this.handleToolbarEvents.bind(this);
        this.validation = this.validation.bind(this);
        this.modalPageClick = this.modalPageClick.bind(this);
        this.handleGridBtnClick = this.handleGridBtnClick.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.handleGridRowChange = this.handleGridRowChange.bind(this);
        this.validateGridRow = this.validateGridRow.bind(this);
        this.handleGridRowInput = this.handleGridRowInput.bind(this);
        this.createGridRow = this.createGridRow.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleInput = this.handleInput.bind(this);

    }

    componentDidMount() {
        // пишем исходные данные в хранилище, регистрируем обработчики событий
        let self = this,
            data = this.props.data.row,
            details = this.props.data.details,
            gridConfig = this.props.data.gridConfig;

        // сохраняем данные в хранилище
        flux.doAction('dataChange', data);
        flux.doAction('docIdChange', data.id);
        flux.doAction('detailsChange', details); // данные грида
        flux.doAction('gridConfigChange', gridConfig); // данные грида

        docStore.on('change:libs', (newValue, previousValue) => {
            let isChanged = false,
                libs = newValue,
                libsData = self.state.libs;

            if (newValue.length > 0) {

                libs.forEach(lib => {

                    if (self.state.libs[lib.id] && lib.data.length > 0) {
                        libsData[lib.id] = lib.data;
                        isChanged = true;
                    }
                });
            }

            if (isChanged) {
                self.setState({libs: libsData});
            }
        });

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

        // если новый документ (id == 0)

        if (data.id == 0) {
            flux.doAction('editedChange', true);
            flux.doAction('savedChange', false);
        }

        // грузим справочники
        LIBRARIES.forEach(lib => {
            flux.doAction("loadLibs", lib);
        });

    }


    shouldComponentUpdate(nextProps, nextState) {
        // @todo добавить проверку на изменение состояния
        return true;
    }

    render () {
        // формируем зависимости
        relatedDocuments(this);

        let data = this.state.docData,
            isEditeMode = this.state.edited,
            validationMessage = this.validation(),
            bpm = this.state.bpm,
            gridData = this.state.gridData,
            gridColumns = this.state.gridConfig;

        return (
            <Form pages={this.pages}
                  ref="form"
                  handlePageClick={this.handlePageClick}
                  disabled={isEditeMode}>
                <ToolbarContainer ref='toolbar-container'>
                    <div style={styles.docToolbarWarning}>
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
                <div className='div-doc'>
                    <div style={styles.docRow}>
                        <DocCommon
                            ref='doc-common'
                            data={this.state.docData}
                            readOnly={!isEditeMode}/>
                    </div>
                    <div style={styles.docRow}>
                        <div style={styles.docColumn}>
                            <InputText title='Number'
                                       name='number'
                                       value={data.number}
                                       ref="input-number"
                                       onChange = {this.handleInput}
                                       readOnly={!isEditeMode}/>
                            <InputDate title='Kuupäev '
                                       name='kpv'
                                       value={data.kpv}
                                       ref='input-kpv'
                                       onChange = {this.handleInput}
                                       readOnly={!isEditeMode}/>
                            <Select title="Kassa"
                                    name='kassa_id'
                                    libs="kassa"
                                    value={data.kassa_id}
                                    data={this.state.libs['kassa']}
                                    defaultValue={data.kassa}
                                    ref="select-kassaId"
                                    onChange = {this.handleInput}
                                    readOnly={!isEditeMode}/>
                            <Select title="Partner"
                                    name='asutusid'
                                    data={this.state.libs['asutused']}
                                    libs="asutused"
                                    value={data.asutusid}
                                    defaultValue={data.asutus}
                                    onChange = {this.handleInput}
                                    ref="select-asutusId"
                                    readOnly={!isEditeMode}/>
                            <InputText title="Arve nr."
                                       name='arvnr'
                                       value={data.arvnr}
                                       ref="input-arvnr"
                                       onChange = {this.handleInput}
                                       readOnly={true}/>
                            <InputText title='Dokument '
                                       name='dokument'
                                       value={data.dokument}
                                       ref='input-dokument'
                                       onChange = {this.handleInput}
                                       readOnly={!isEditeMode}/>
                        </div>
                        <div style={styles.docColumn}>
                            <DokProp title="Konteerimine: "
                                     name='doklausid'
                                     libs="dokProps"
                                     value={this.state.docData.doklausid}
                                     defaultValue={this.state.docData.dokprop}
                                     ref="dokprop"
                                     onChange = {this.handleInput}
                                     readOnly={!isEditeMode}/>
                        </div>
                    </div>
                    <div style={styles.docRow}>
                            <TextArea title="Nimi"
                                      name='nimi'
                                      ref="textarea-nimi"
                                      value={data.nimi}
                                      onChange = {this.handleInput}
                                      readOnly={!isEditeMode}/>
                    </div>
                    <div style={styles.docRow}>
                            <TextArea title="Aadress"
                                      name='aadress'
                                      ref="textarea-aadress"
                                      value={data.aadress}
                                      onChange = {this.handleInput}
                                      readOnly={!isEditeMode}/>
                    </div>
                    <div style={styles.docRow}>
                            <TextArea title="Alus"
                                      name='alus'
                                      ref="textarea-alus"
                                      value={data.alus}
                                      onChange = {this.handleInput}
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
                                  gridData={gridData}
                                  gridColumns={gridColumns}
                                  handleGridRow={this.handleGridRow}
                                  readOnly={!isEditeMode}
                                  ref="data-grid"/>
                    </div>
                    <div style={styles.docRow}>
                        <InputText title="Summa: "
                                   name='summa'
                                   ref="input-summa"
                                   value={data.summa}
                                   disabled={true}
                                   pattern="^[0-9]+(\.[0-9]{1,4})?$"/>
                    </div>
                    <div style={styles.docRow}>
                            <TextArea title="Märkused"
                                      name='muud'
                                      ref="textarea-muud"
                                      value={data.muud}
                                      onChange = {this.handleInput}
                                      readOnly={!isEditeMode}/>
                    </div>

                    {this.state.gridRowEdit ?
                        this.createGridRow()
                        : null}

                </div>
            </Form>
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

    handleInput(name, value) {
        let data = this.state.docData;

        data[name] = value;
        this.setState({docData: data});
    }

    validation() {
        if (!this.state.edited) return '';

        let requiredFields = this.requiredFields;
        let warning = require('../../mixin/validateForm')(this, requiredFields, this.state.docData);

        return warning;
    }

    createGridRow() {
        // формирует объекты модального окна редактирования строки грида
        let style = styles.gridRow,
            row = Object.assign({}, this.state.gridRowData),
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
                                    value={row.nomid}
                                    defaultValue={row.kood}
                                    ref='nomid'
                                    placeholder='Teenuse kood'
                                    onChange={this.handleGridRowChange}/>
                        </div>
                        <div style={styles.docRow}>

                            <InputNumber title='Summa: '
                                         name='summa'
                                         value={row.summa}
                                         bindData={false}
                                         ref='summa'
                                         onChange={this.handleGridRowInput}/>
                        </div>
                        <div style={styles.docRow}>

                            <Select title="Korr. konto"
                                    name='konto'
                                    libs="kontod"
                                    data={this.state.libs['kontod']}
                                    value={row.konto}
                                    ref='konto'
                                    collId="kood"
                                    onChange={this.handleGridRowChange}/>
                        </div>
                        <div style={styles.docRow}>
                            <Select title="Tunnus:"
                                    name='tunnus'
                                    libs="tunnus"
                                    data={this.state.libs['tunnus']}
                                    value={row.tunnus}
                                    ref='tunnus'
                                    collId="kood"
                                    onChange={this.handleGridRowChange}/>
                        </div>
                        <div style={styles.docRow}>
                            <Select title="Project:"
                                    name='proj'
                                    libs="project"
                                    data={this.state.libs['project']}
                                    value={row.proj}
                                    ref='project'
                                    collId="kood"
                                    onChange={this.handleGridRowChange}/>
                        </div>
                    </div>
                    <div><span>{validateMessage}</span></div>
                </ModalPage>
            </
                div >
        )
            ;
    }

    handleGridRow(gridEvent, data) {
        // управление модальным окном
        this.setState({gridRowEdit: true, gridRowEvent: gridEvent, gridRowData: data});
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

    recalcDocSumma(docData) {
        // перерасчет итоговой суммы документа
        let gridData = this.state.gridData;

        docData['summa'] = 0;
        gridData.forEach(row => {
            docData['summa'] += Number(row['summa']);
        });
        return docData;
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

    handleGridRowChange(name, value) {
        // отслеживаем изменения данных на форме

        let rowData = this.state.gridRowData;

        if (value !== rowData[name] && name === 'nomid') {
            // произошло изменение услуги, обнулим значения
            rowData['summa'] = 0;
            rowData['nomid'] = value;
//            rowData['konto'] = value;
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
        let rowData = this.state.gridRowData;

        rowData[name] = value;
        this.setState({gridRowData: rowData});
        this.validateGridRow();
    }

    validateGridRow() {
        // will check values on the form and return string with warning
        let warning = '',
            gridRowData = this.state.gridRowData;
        // только после проверки формы на валидность
        if (!gridRowData['nomid']) warning = warning + ' код услуги';
        if (!gridRowData['summa']) warning = warning + ' сумма';

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

module.exports = Vorder;

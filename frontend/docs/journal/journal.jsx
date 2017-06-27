'use strict';
const React = require('react'),
    flux = require('fluxify');

const
    Form = require('../../components/form/form.jsx'),
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
    relatedDocuments = require('../../mixin/relatedDocuments.jsx'),
    ToolbarContainer = require('./../../components/toolbar-container/toolbar-container.jsx'),
    DocToolBar = require('./../../components/doc-toolbar/doc-toolbar.jsx'),
    validateForm = require('../../mixin/validateForm'),
    ModalPage = require('./../../components/modalpage/modalPage.jsx'),
    styles = require('./journal-styles.js');

const LIBRARIES = ['asutused', 'kontod', 'tunnus', 'project'];

// Create a store
const docStore = require('../../stores/doc_store.js');

class Journal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            docData: this.props.data.row,
            bpm: this.props.bpm,
            edited: false,
            showMessageBox: 'none',
            gridData: this.props.data.details,
            relations: this.props.data.relations,
            gridConfig: this.props.data.gridConfig,
            gridRowEdit: false,
            gridRowEvent: null,
            gridRowData: null,
            libs: this.createLibs(),
            checked: false,
            warning: ''
        };
        this.pages = [{pageName: 'Journal'}];
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.handleGridBtnClick = this.handleGridBtnClick.bind(this);
        this.handleGridRowChange = this.handleGridRowChange.bind(this);
        this.validateGridRow = this.validateGridRow.bind(this);
        this.handleGridRowInput = this.handleGridRowInput.bind(this);
        this.createGridRow = this.createGridRow.bind(this);
        this.modalPageClick = this.modalPageClick.bind(this);
        this.validation = this.validation.bind(this);
        this.handleToolbarEvents = this.handleToolbarEvents.bind(this);
        this.handleInput = this.handleInput.bind(this);

    }

    componentWillMount() {
        this.relatedDocuments();
    }

    componentDidMount() {
        // пишем исходные данные в хранилище, регистрируем обработчики событий
        let self = this,
            data = this.state.docData,
            details = this.state.gridData,
            gridConfig = this.state.gridConfig;

        // сохраняем данные в хранилище
        flux.doAction('dataChange', data);
        flux.doAction('docIdChange', data.id);
        flux.doAction('detailsChange', details); // данные грида
        flux.doAction('gridConfigChange', gridConfig); // данные грида
        flux.doAction('gridName', 'journal-grid-row'); // задаем имя компонента строки грида (для редактирования


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


        // грузим справочники
        LIBRARIES.forEach(lib => {
            flux.doAction("loadLibs", lib);
        });

        if (data.id == 0) {
            flux.doAction('editedChange', true);
            flux.doAction('savedChange', false);
        }

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

    shouldComponentUpdate(nextProps, nextState) {
        // @todo добавить проверку на изменение состояния
        return true;
    }

    render() {
        let data = this.state.docData,
            bpm = this.state.bpm,
            isEditeMode = this.state.edited,
            validationMessage = this.validation(),
            showMessageBox = this.state.showMessageBox, // будет управлять окном сообщений
            gridData = this.state.gridData,
            gridColumns = this.state.gridConfig;

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
                        <DocCommon ref='doc-common'
                                   data={data}
                                   readOnly={!isEditeMode}/>
                    </div>
                    <div style={styles.docColumn}>
                        <InputText
                            title='Number'
                            name='number'
                            value={data.number}
                            disabled="true"
                            onChange = {this.handleInput}
                            ref="input-number"
                            readOnly={true}/>
                        <InputDate title='Kuupäev '
                                   name='kpv'
                                   value={data.kpv}
                                   ref='input-kpv'
                                   onChange = {this.handleInput}
                                   readOnly={!isEditeMode}/>
                        <Select title="Partner"
                                name='asutusid'
                                libs="asutused"
                                data={this.state.libs['asutused']}
                                value={data.asutusid}
                                collId='id'
                                defaultValue={data.asutus}
                                onChange = {this.handleInput}
                                ref="select-asutusid"
                                readOnly={!isEditeMode}/>
                        <InputText
                            title='Dokument '
                            name='dok'
                            value={data.dok}
                            ref='input-dok'
                            onChange = {this.handleInput}
                            readOnly={!isEditeMode}/>
                    </div>
                    <div style={styles.docRow}>
                            <TextArea title="Selgitus"
                                      name='selg'
                                      ref="textarea-selg"
                                      value={data.selg}
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
                        <InputNumber
                            title="Summa: "
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

    validation() {
        if (!this.state.edited) return '';

        let requiredFields = this.requiredFields,
            warning = require('../../mixin/validateForm')(this, requiredFields);
        return warning;
    }

    handleInput(name, value) {
        // изменения допустимы только в режиме редактирования
        if (!this.state.edited) {
            console.error('not in edite mode');
            return false;
        }

        let data = this.state.docData;

        data[name] = value;
        this.setState({docData: data});
    }

    handleGridRow(gridEvent) {
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
        this.setState({gridRowEdit: !!this.state.warning, gridData: gridData, docData: docData});
    }

    handlePageClick(page) {
        if (page.docId) {
            let url = "/document/" + page.docTypeId + page.docId;
            document.location.href = url;
        }
    }

    createGridRow() {
        let style = styles.gridRow,
            row = this.state.gridRowData,
            validateMessage = this.state.warning,
            buttonOkReadOnly = validateMessage.length > 0 || !this.state.checked,
            modalObjects = ['btnOk','btnCancel'];

        if (buttonOkReadOnly) {
            // уберем кнопку Ок
            modalObjects.splice(0,1);
        }

        if (!row) return <div/>;

        return (<div className='.modalPage'>
            <ModalPage
                modalObjects = {modalObjects}
                ref="modalpage-grid-row"
                show={true}
                modalPageBtnClick={this.modalPageClick}
                modalPageName='Rea lisamine / parandamine'>
                <div ref="grid-row-container">
                    <div style={styles.docRow}>
                        <Select title="Deebet"
                                name='deebet'
                                libs="kontod"
                                data={this.state.libs['kontod']}
                                readOnly={false}
                                value={row.deebet}
                                ref='deebet'
                                collId="kood"
                                onChange={this.handleGridRowChange}/>
                    </div>
                    <div style={styles.docRow}>
                        <Select title="Kreedit"
                                name='kreedit'
                                data={this.state.libs['kontod']}
                                readOnly={false}
                                value={row.kreedit}
                                ref='kreedit'
                                collId="kood"
                                onChange={this.handleGridRowChange}/>
                    </div>
                    <div style={styles.docRow}>
                        <InputNumber title='Summa: '
                                     name='summa'
                                     value={row.summa}
                                     disabled={false}
                                     bindData={false}
                                     ref='summa'
                                     onChange={this.handleGridRowInput}/>
                    </div>
                    <div style={styles.docRow}>
                        <Select title="Tunnus"
                                name='tunnus'
                                libs="tunnus"
                                data={this.state.libs['tunnus']}
                                readOnly={false}
                                value={row.tunnus}
                                ref='tunnus'
                                placeholder='Tunnus'
                                collId="kood"
                                onChange={this.handleGridRowChange}/>
                    </div>
                    <div style={styles.docRow}>
                        <Select title="Project"
                                name='proj'
                                libs="project"
                                data={this.state.libs['project']}
                                readOnly={false}
                                value={row.proj}
                                ref='proj'
                                placeholder='Projekt'
                                collId="kood"
                                onChange={this.handleGridRowChange}/>
                    </div>


                </div>
                <div><span>{validateMessage}</span></div>
            </ModalPage>
        </div>);
    }

    handleGridRowChange(name, value) {
        // отслеживаем изменения данных на форме
        let rowData = this.state.gridRowData;

        rowData[name] = value;

        this.setState({gridRowData: rowData});
        this.validateGridRow();

    }

    handleGridRowInput(name, value) {
        let rowData = this.state.gridRowData,
            docData = this.state.docData;

        if (name == 'number') {
            //@todo hardcode, переписать с учетом типа поля из конфигурации грида
            rowData[name] = Number(value);
        } else {
            rowData[name] = value;
        }

        // перерасчет итогов
        docData = this.recalcDocSumma(docData);

        this.setState({gridRowData: rowData, docData: docData});
        this.validateGridRow();
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

    recalcDocSumma(docData) {
        let gridData = this.state.gridData;

        docData['summa'] = 0;

        gridData.forEach(row => {
            docData['summa'] += Number(row['summa']);
        });
        return docData;
    }

    validateGridRow() {
        // will check values on the form and return string with warning
        let warning = '',
            gridRowData = this.state.gridRowData;
        // только после проверки формы на валидность
        if (!gridRowData['deebet']) warning = warning + ' Дебет';
        if (!gridRowData['kreedit']) warning = warning + ' Кредит';
        if (!gridRowData['summa']) warning = warning + ' Сумма';

        if (warning.length > 2) {
            // есть проблемы
            warning = 'Отсутсвуют данные:' + warning;
        }
        this.setState({checked: true, warning: warning});
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

    createLibs() {
        // вернет объект библиотек документа
        let libs = {};
        LIBRARIES.forEach((lib) => {
            libs[lib] = [];
        })
        return libs;
    }


}

Journal.PropTypes = {
    docData: React.PropTypes.object.isRequired,
    bpm: React.PropTypes.array,
    edited: React.PropTypes.bool,
    showMessageBox: React.PropTypes.string,
    gridData: React.PropTypes.array,
    relations: React.PropTypes.array,
    gridConfig: React.PropTypes.array,
    gridRowEdit: React.PropTypes.bool,
    gridRowEvent: React.PropTypes.string,
    gridRowData: React.PropTypes.object,
    libs: React.PropTypes.object,
    checked: React.PropTypes.bool,
    warning: React.PropTypes.string

}


module.exports = Journal;

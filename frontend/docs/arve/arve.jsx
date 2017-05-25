'use strict';
const React = require('react'),
    flux = require('fluxify');

const
    Form = require('../../components/form/form.jsx'),
    InputText = require('../../components/input-text/input-text.jsx'),
    InputDate = require('../../components/input-date/input-date.jsx'),
//    InputNumber = require('../components/doc-input-number.jsx'),
//    Toolbar = require('../components/doc-toolbar.jsx'),
    DocCommon = require('../../components/doc-common/doc-common.jsx'),
    Select = require('../../components/select/select.jsx'),
    TextArea = require('../../components/text-area/text-area.jsx'),
    DataGrid = require('../../components/doc-data-grid.jsx'),
    GridRow = require('../../components/arv-grid-row.jsx'),
    DokProp = require('../../components/docprop/docprop.jsx'),
    relatedDocuments = require('../../mixin/relatedDocuments.jsx'),
    ToolbarContainer = require('./../../components/toolbar-container/toolbar-container.jsx'),
    DocToolBar = require('./../../components/doc-toolbar/doc-toolbar.jsx'),
    validateForm = require('../../mixin/validateForm'),
    styles = require('./arve.styles');

const LIBRARIES = ['asutused','kontod','dokProps','users','aa','tunnus','project','nomenclature'];

// Create a store
var docStore = require('../../stores/doc_store.js');

var now = new Date();

class Arve extends  React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            docData: this.props.data.row,
            edited: false,
            showMessageBox: 'none',
            gridData: this.props.data.details,
            relations: this.props.data.relations,
            gridConfig: this.props.data.gridConfig,
            gridRowEdit: false,
            gridRowEvent: null,
            gridRowData: null,
            libs: {
                asutused: []
            }

        }

        this.pages =  [{pageName: 'Arve'}]
        this.requiredFields= [
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

    }


    validation () {

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
        flux.doAction('gridNameChange', 'arv-grid-row'); // задаем имя компонента строки грида (для редактирования

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
            flux.doAction("loadLibs",lib);
        });

        // если новый документ (id == 0)

        if (data.id == 0) {
            flux.doAction('editedChange', true);
            flux.doAction('savedChange', false);
        }

        // отслеживаем режим редактирования
        docStore.on('change:edited', function (newValue, previousValue) {
            if (newValue !== previousValue) {
                self.setState({edited: newValue});
            }
        });

        docStore.on('change:libs', (newValue, previousValue) => {
            if (newValue.length > 0 ) {
                let libs = newValue,
                    libsData = this.state.libs;

                libs.forEach(lib => {
                    if (this.state.libs[lib.id] && lib.data.length > 0) {
                        libsData[lib.id] = lib.data;
                    }
                });
                this.setState({libs:libsData});
            }
        });


    }

    relatedDocuments () {
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

    render() {
        // формируем зависимости
        relatedDocuments(this);

        let data = this.state.docData,
            isEditeMode = this.state.edited,
            gridData = this.state.gridData,
            gridColumns = this.state.gridConfig,
            toolbarParams = this.prepaireToolBarParameters(isEditeMode),
            validationMessage = this.validation();

        return (
            <Form pages={this.pages} ref="form" handlePageClick={this.handlePageClick} disabled={isEditeMode}>
                <ToolbarContainer ref='toolbarContainer'>
                    <div className='doc-toolbar-warning'>
                        {validationMessage ? <span>{validationMessage}</span> : null }
                    </div>
                    <div>
                        <DocToolBar bpm={data.bpm} edited ={isEditeMode} docStatus = {data.doc_status}/>
                    </div>
                </ToolbarContainer>
                <div style={styles.doc}>
                    <div style={styles.docRow}>
                        <DocCommon data={data} readOnly={!isEditeMode}/>
                    </div>
                    <div style={styles.docRow}>
                        <div style={styles.docColumn}>
                            <InputText className='ui-c2' title='Number' name='number' value={data.number}
                                       readOnly={!isEditeMode}
                                       onChange = {this.handleInputChange} />
                            <InputDate title='Kuupäev ' name='kpv' value={data.kpv} ref='kpv'
                                       placeholder='Kuupäev' readOnly={!isEditeMode}
                                       onChange = {this.handleInputChange}/>
                            <InputDate className='ui-c2' title='Tähtaeg ' name='tahtaeg' value={data.tahtaeg}
                                       ref="tahtaeg"
                                       placeholder='Tähtaeg' readOnly={!isEditeMode}
                                       onChange = {this.handleInputChange}/>
                            <Select className='ui-c2'
                                    title="Asutus"
                                    name='asutusid'
                                    libs="asutused"
                                    data={this.state.libs['asutused']}
                                    value={data.asutusid}
                                    defaultValue={data.asutus}
                                    placeholder='Asutus'
                                    ref="asutusid"
                                    btnDelete = {true}
                                    onChange = {this.handleInputChange}
                                    readOnly={!isEditeMode}/>
                            <InputText className='ui-c2' title='Lisa ' name='lisa' value={data.lisa}
                                       placeholder='Lisa'
                                       ref='lisa' readOnly={!isEditeMode}
                                       onChange = {this.handleInputChange}/>
                        </div>
                        <div style={styles.docColumn}>
                            <DokProp className='ui-c2'
                                     title="Konteerimine: "
                                     name='doklausid'
                                     libs="dokProps"
                                     value={data.doklausid}
                                     defaultValue={data.dokprop}
                                     placeholder='Konteerimine'
                                     ref="doklausid"
                                     readOnly={!isEditeMode}/>
                        </div>
                    </div>
                    <div style={styles.docRow}>
                        <TextArea title="Märkused" name='muud' placeholder='Märkused'
                                  ref="muud"
                                  onChange = {this.handleInputChange}
                                  value={data.muud} readOnly={!isEditeMode}/>
                    </div>
                    <div style={styles.docRow}>
                        <DataGrid source='details' gridData={gridData} gridColumns={gridColumns}
                                  handleGridRow={this.handleGridRow}
                                  readOnly={!isEditeMode} ref="DataGrid"/>
                    </div>
                    <div style={styles.docRow}>
                        <InputText title="Summa " name='summa' placeholder='Summa'
                                   ref="summa"
                                   value={data.summa} disabled='true'
                                   onChange = {this.handleInputChange}
                                   pattern="^[0-9]+(\.[0-9]{1,4})?$"/>
                        <InputText title="Käibemaks " name='kbm' placeholder='Käibemaks'
                                   ref="kbm"
                                   disabled='true'
                                   value={data.kbm}
                                   onChange = {this.handleInputChange}
                                   pattern="^[0-9]+(\.[0-9]{1,4})?$"/>
                    </div>
                    {this.state.gridRowEdit ?
                        <GridRow modalPageClick={this.modalPageClick}
                                 gridEvent={this.state.gridRowEvent}
                                 gridRowData={this.state.gridRowData}/> : null}
                </div>
            </Form >
        );
    }

    handleGridRow(gridEvent, data) {
        // управление модальным окном
        this.setState({gridRowEdit: true, gridRowEvent: gridEvent, gridRowData: data});
    }

    modalPageClick (btnEvent, data) {
        // отработаем Ok из модального окна
        var gridData = flux.stores.docStore.details,
            docData = flux.stores.docStore.data,
            gridRowId = flux.stores.docStore.gridRowId,
            gridColumns = flux.stores.docStore.gridConfig;
        var gridRow = {};

        if (gridRowId >= 0) {
            gridRow = gridData[gridRowId];
        }

        if (btnEvent == 'Ok') {
            if (gridRowId < 0) {
                // новая запись
                // формируем пустую строку
                gridRow = {};
                gridRow['id'] = 'NEW' + Math.random();  // генерируем новое ИД
                gridColumns.forEach((field) => gridRow[field] = null); // создаем поля в объекте
            }
            // сохраним данные в хранилище
            data.forEach((field) => gridRow[field.name] = field.value);

            // заполним поля kood, nimetus
            var libs = flux.stores.docStore.libs,
                nomLib = libs.filter((data) => {
                    if (data.id == 'nomenclature') {
                        return data;
                    }
                });

            // поставим значение код и наменование в грид
            var nomRow = nomLib[0].data.filter(function (row) {
                if (row.id == Number(gridRow.nomid)) {
                    return row;
                }
            });
            if (nomRow) {
                gridRow['kood'] = nomRow[0].kood;
                gridRow['nimetus'] = nomRow[0].name;
            }

            if (gridRowId > 0) {
                gridData[gridRowId] = gridRow;
            } else {
                gridData.push(gridRow); // добавляем строку
                flux.doAction('gridRowIdChange', gridData.length); // помечаем новую строку
            }
            flux.doAction('detailsChange', gridData); // пишем изменения в хранилище
        }

        // считаем итоги

        var docSumma = gridData.reduce((sum, row) => sum + Number(row.summa), 0), // сумма счета
            docKbm = gridData.reduce((sum, row) => sum + Number(row.kbm), 0), // сумма налога
            docKbmta = docSumma - docKbm;

        docData.summa = docSumma;
        docData.kbm = docKbm;
        docData.kbmta = docKbmta;

        this.refs['DataGrid'].replaceState({gridData: gridData});
        this.setState({gridRowEdit: false, docData: docData});

    }

    handlePageClick (page)  {
        if (page.docId) {
            var url = "/document/" + page.docTypeId + page.docId;
            document.location.href = url;
        }
    }

    handleSelectTask (e) {
        // метод вызывается при выборе задачи
        var taskValue = e.target.value;
    }

    handleInputChange (inputName, inputValue) {
        // обработчик изменений
        let data = flux.stores.docStore.data;
        data[inputName] = inputValue;
        // задать новое значение поля
        flux.doAction('dataChange', data);

    }

    prepaireToolBarParameters (isEditMode) {
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


InputDate.PropTypes = {
    data: React.PropTypes.object.isRequired

}

module.exports = Arve;

'use strict';
var React = require('react'),
    flux = require('fluxify');

const Form = require('../components/form.js'),
    PageLabel = require('../components/page_label'),
    InputText = require('../components/doc-input-text.jsx'),
    InputDate = require('../components/doc-input-date.jsx'),
    InputNumber = require('../components/doc-input-number.jsx'),
    Toolbar = require('../components/doc-toolbar.jsx'),
    DocCommon = require('../components/doc-common.jsx'),
    Select = require('../components/doc-input-select.jsx'),
    TextArea = require('../components/doc-input-textarea.jsx'),
    DataGrid = require('../components/doc-data-grid.jsx'),
    GridRow = require('../components/sorder-grid-row.jsx');

var docStore = require('../stores/doc_store.js'),
    relatedDocuments = require('../mixin/relatedDocuments.jsx'),
    validateForm = require('../mixin/validateForm');

var now = new Date();

const Sorder = React.createClass({
    pages:  [{pageName: 'Sissetuliku kassaorder'}],
    requiredFields:  [
        {name: 'kpv', type: 'D', min: now.setFullYear(now.getFullYear() - 1), max: now.setFullYear(now.getFullYear() + 1)},
        {name: 'asutusid', type: 'I'},
        {name: 'nimi', type: 'C'},
        {name: 'summa', type: 'N'}
    ],
    mixins: [relatedDocuments, validateForm],

    getInitialState: function () {
        // установим изначальные данные
        return {
            docData: this.props.data.row,
            edited: false,
            showMessageBox: 'none',
            gridData: this.props.data.details,
            relations: this.props.data.relations,
            gridConfig: this.props.data.gridConfig,
            gridRowEdit: false,
            gridRowEvent: null,
            gridRowData: null
        };
    },

    componentWillMount: function () {
        // пишем исходные данные в хранилище, регистрируем обработчики событий
        var self = this,
            data = self.props.data.row,
            details = self.props.data.details,
            gridConfig = self.props.data.gridConfig;

        // сохраняем данные в хранилище
        flux.doAction('dataChange', data);
        flux.doAction('docIdChange', data.id);
        flux.doAction('detailsChange', details); // данные грида
        flux.doAction('gridConfigChange', gridConfig); // данные грида
        flux.doAction('gridName', 'sorder-grid-row'); // задаем имя компонента строки грида (для редактирования

        // отслеживаем режим редактирования
        docStore.on('change:edited', function (newValue, previousValue) {
            if (newValue !== previousValue) {
                self.setState({edited: newValue});
            }
        });

        // отслеживает изменения данных в гриде
         docStore.on('change:details', function (newValue, previousValue) {
             var isChanged = JSON.stringify(newValue) !== JSON.stringify(previousValue);
             console.log('event details changed', isChanged, typeof newValue);

             if (isChanged) {
                 // итоги
                 let summa = newValue.reduce((sum, row) => sum + Number(row.summa),0), // сумма документа
                 docData = self.state.docData;

                 docData.summa = summa;
                     console.log('new summa:', summa);
                 self.setState({gridData: newValue, docData: docData});
             }
         });


        // формируем зависимости
        this.relatedDocuments();
    },

    componentDidMount: function () {
        // грузим справочники
        flux.doAction('loadLibs', '');

        // если новый документ (id == 0)
        var data = this.state.docData;

        if (data.id == 0) {
            console.log('edited mode control', data);
            flux.doAction('editedChange', true);
            flux.doAction('savedChange', false);
        }

    },

    render: function () {
        var data = this.state.docData,
            isEditeMode = this.state.edited,
            showMessageBox = this.state.showMessageBox; // будет управлять окном сообщений

        //  pattern='[A-Za-z]{3}'
        var gridData = this.state.gridData,
            gridColumns = this.state.gridConfig;


        return (
            <Form pages={this.pages} ref="form" onSubmit={this.onSubmit} style={{display: 'table'}}>
                <Toolbar validator={this.validateForm}/>
                <div className='div-doc'>
                    <DocCommon data={data}/>
                    <div className="fieldset">
                        <ul>
                            <li>
                                <InputText className='ui-c2'
                                           title='Number'
                                           name='number'
                                           value={data.number}
                                           disabled="false"
                                           readOnly={true}/>
                            </li>
                            <li>
                                <InputDate className='ui-c2' title='Kuupäev ' name='kpv' value={data.kpv} ref='kpv'
                                           placeholder='Kuupäev' readOnly={!isEditeMode}/>
                            </li>
                            <li><Select className='ui-c2' title="Kassa" name='kassa_id' libs="aa"
                                        value={data.kassa_id}
                                        collId = 'id'
                                        defaultValue={data.kassa}
                                        placeholder='Kassa'
                                        ref="kassa_id"
                                        readOnly={!isEditeMode}/>
                            </li>

                            <li><Select className='ui-c2' title="Partner" name='asutusid' libs="asutused"
                                        value={data.asutusid}
                                        collId = 'id'
                                        defaultValue={data.asutus}
                                        placeholder='Partner'
                                        ref="asutusid"
                                        readOnly={!isEditeMode}/>
                            </li>
                            <li>
                                <Select className='ui-c2'
                                        title="Arve nr."
                                        name='arvid'
                                        libs="arvedValja"
                                        value={data.arvid}
                                        collId = 'id'
                                        defaultValue={data.arvnr}
                                        placeholder='Arve nr.'
                                        ref="arvid"
                                        btnDelete = {true}
                                        readOnly={!isEditeMode}/>
                            </li>

                            <li><InputText className='ui-c2' title='Dokument ' name='dokument' value={data.dokument}
                                           placeholder='Dokument'
                                           ref='dokument' readOnly={!isEditeMode}/>
                            </li>
                            <li><TextArea className='ui-c2' title="Nimi" name='nimi' placeholder='Nimi'
                                          ref="nimi"
                                          value={data.aadress} readOnly={!isEditeMode} width="85%"/></li>
                            <li><TextArea className='ui-c2' title="Aadress" name='aadress' placeholder='Aadress'
                                          ref="aadress"
                                          value={data.aadress} readOnly={!isEditeMode} width="85%"/></li>
                            <li><TextArea className='ui-c2' title="Alus" name='alus' placeholder='Alus'
                                          ref="alus"
                                          value={data.alus} readOnly={!isEditeMode} width="85%"/></li>
                            <li><DataGrid source='details' gridData={gridData} gridColumns={gridColumns}
                                          handleGridRow={this.handleGridRow}
                                          readOnly={!isEditeMode} ref="DataGrid"/></li>
                            <li><InputText className='ui-c2' title="Summa: " name='summa' placeholder='Summa'
                                           ref="summa"
                                           value={data.summa} disabled='true'
                                           pattern="^[0-9]+(\.[0-9]{1,4})?$"/></li>
                            {/* патерн для цифр с 4 знаками после точки*/}
                            <li><TextArea className='ui-c2' title="Märkused" name='muud' placeholder='Märkused'
                                          ref="muud"
                                          value={data.muud} readOnly={!isEditeMode} width="85%"/></li>
                        </ul>
                    </div>

                    {this.state.gridRowEdit ?
                        <GridRow modalPageClick={this.modalPageClick}
                                 gridEvent={this.state.gridRowEvent}
                                 gridRowData={this.state.gridRowData}/> : null}

                </div>
            </Form>
        );
    },

    handleGridRow: function (gridEvent, data) {
        // управление модальным окном
        this.setState({gridRowEdit: true, gridRowEvent: gridEvent, gridRowData: data});
    },

    modalPageClick: function (btnEvent, data) {
        // отработаем Ok из модального окна
        var gridData = flux.stores.docStore.details,
            docData = flux.stores.docStore.data,
            gridRowId = flux.stores.docStore.gridRowId,
            gridColumns = flux.stores.docStore.gridConfig;
        var gridRow = {};

        if (gridRowId >= 0) {
            gridRow = gridData[gridRowId];
        }
        console.log('previos state gridData, docData', gridData,  docData);

        if (btnEvent == 'Ok') {
            console.log(' modalPageClick data, gridRowId, gridRow', data, gridRowId, gridRow);
            if (gridRowId < 0) {
                // новая запись
                // формируем пустую строку
//                gridRow ={};
                gridRow['id'] = 'NEW' + Math.random();  // генерируем новое ИД
                gridColumns.forEach((field) => gridRow[field] = null); // создаем поля в объекте
            }
            // сохраним данные в хранилище
            data.forEach((field) => {
                gridRow[field.name] = field.value
                console.log('сохраним данные в хранилище, gridRow', gridRow);
            });

            // заполним поля nimetus
            var libs = flux.stores.docStore.libs,
             nomLib = libs.filter((data) => {
                 if (data.id == 'nomenclature') {
                     return data;
                 }
             });


             var   nomRow = nomLib[0].data.filter(function(row) {
                 if (row.id == Number(gridRow.nomid)) {
                     return row;
                 }
             });

             if (nomRow) {
                 gridRow['nimetus'] = nomRow[0].name;
             }

            console.log('after state gridData %s, docData %s', gridData,  docData);

            if (gridRowId >= 0) {
                gridData[gridRowId] = gridRow;
            } else {
                gridData.push(gridRow); // добавляем строку
                flux.doAction('gridRowIdChange', gridData.length); // помечаем новую строку
            }
            flux.doAction('detailsChange', gridData); // пишем изменения в хранилище
        }

        // считаем итоги

        var docSumma = gridData.reduce((sum, row) => sum + Number(row.summa), 0); // сумма счета

        docData.summa = docSumma;

        this.refs['DataGrid'].replaceState({gridData: gridData});
        this.setState({gridRowEdit: false, docData: docData});

    },

});

module.exports = Sorder;

'use strict';
const React = require('react'),
    flux = require('fluxify');

const Form = require('../components/form.js'),
    InputText = require('../components/doc-input-text.jsx'),
    InputDate = require('../components/doc-input-date.jsx'),
//    InputNumber = require('../components/doc-input-number.jsx'),
    Toolbar = require('../components/doc-toolbar.jsx'),
    DocCommon = require('../components/doc-common.jsx'),
    Select = require('../components/doc-input-select.jsx'),
    TextArea = require('../components/doc-input-textarea.jsx'),
    DataGrid = require('../components/doc-data-grid.jsx'),
    GridRow = require('../components/arv-grid-row.jsx'),
    DokProp = require('../components/doc-select-text.jsx'),
    relatedDocuments = require('../mixin/relatedDocuments.jsx'),
    validateForm = require('../mixin/validateForm');

// Create a store
var docStore = require('../stores/doc_store.js');

var now = new Date();

const Arve = React.createClass({
    pages: [{pageName: 'Arve'}],
     requiredFields: [
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
     {name: 'asutusid', type: 'N', min:null, max:null},
     {name: 'summa', type: 'N', min:-9999999, max:999999}
     ],

    mixins: [relatedDocuments], // , validateForm

    validation: function () {

/*
        const doc = require('../../models/arv'),
            requiredFields = doc.requiredFields;
*/
        let requiredFields = this.requiredFields;
        let warning = require('../mixin/validateForm')(this, requiredFields);
        return warning;
    },

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
        // формируем зависимости
        this.relatedDocuments();
    },

    componentDidMount: function () {
        // пишем исходные данные в хранилище, регистрируем обработчики событий
        let self = this,
            data = self.props.data.row,
            details = self.props.data.details,
            gridConfig = self.props.data.gridConfig;

        // сохраняем данные в хранилище
        flux.doAction('dataChange', data);
        flux.doAction('detailsChange', details); // данные грида
        flux.doAction('gridConfigChange', gridConfig); // данные грида
        flux.doAction('gridName', 'arv-grid-row'); // задаем имя компонента строки грида (для редактирования

        /*
         // создаем обработчик события на изменение даннх
         docStore.on('change:docId', function (newValue, previousValue) {
         if (newValue !== previousValue) {
         // данные изменились, меняем состояние
         var data = docStore.data,
         isEdited = !self.state.edited;

         }
         });
         */

        // отслеживаем режим редактирования
        docStore.on('change:edited', function (newValue, previousValue) {
            if (newValue !== previousValue) {
                self.setState({edited: newValue});
            }
        });

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
        flux.doAction('loadLibs', '');

        // если новый документ (id == 0)

        if (data.id == 0) {
            flux.doAction('editedChange', true);
            flux.doAction('savedChange', false);
        }

    },

    render: function () {
        let data = this.state.docData,
            isEditeMode = this.state.edited,
            gridData = this.state.gridData,
            gridColumns = this.state.gridConfig;
        return (
            <Form pages={this.pages} ref="form" onSubmit={this.onSubmit} style={{display: 'table'}}>
                <Toolbar validator={this.validation}
                         taskList={data.bpm}
                         documentStatus={data.doc_status}
                />
                <div className='div-doc'>

                    <DocCommon data={data} readOnly={!isEditeMode}/>

                    <div className="fieldset">
                        <div id="leftPanel">
                            <ul>
                                <li>
                                    <InputText className='ui-c2' title='Number' name='number' value={data.number}
                                               readOnly={!isEditeMode}/>
                                </li>

                                <li>
                                    <InputDate className='ui-c2' title='Kuupäev ' name='kpv' value={data.kpv} ref='kpv'
                                               placeholder='Kuupäev' readOnly={!isEditeMode}/>
                                </li>
                                <li>
                                    <InputDate className='ui-c2' title='Tähtaeg ' name='tahtaeg' value={data.tahtaeg}
                                               ref="tahtaeg"
                                               placeholder='Tähtaeg' readOnly={!isEditeMode}/>
                                </li>


                                <li>
                                    <Select className='ui-c2'
                                            title="Asutus"
                                            name='asutusid'
                                            libs="asutused"
                                            value={data.asutusid}
                                            defaultValue={data.asutus}
                                            placeholder='Asutus'
                                            ref="asutusid"
                                            readOnly={!isEditeMode}/>
                                </li>
                                <li><InputText className='ui-c2' title='Lisa ' name='lisa' value={data.lisa}
                                               placeholder='Lisa'
                                               ref='lisa' readOnly={!isEditeMode}/>
                                </li>
                            </ul>
                        </div>
                        <div id="rigthPanel">
                            <ul>
                                <li>
                                    <DokProp className='ui-c2'
                                             title="Konteerimine: "
                                             name='doklausid'
                                             libs="dokProps"
                                             value={data.doklausid}
                                             defaultValue={data.dokprop}
                                             placeholder='Konteerimine'
                                             ref="doklausid"
                                             readOnly={!isEditeMode}/>
                                </li>
                            </ul>

                        </div>
                        <ul>
                            <li><TextArea className='ui-c2' title="Märkused" name='muud' placeholder='Märkused'
                                          ref="muud"
                                          value={data.muud} readOnly={!isEditeMode} width="85%"/></li>
                            <li><DataGrid source='details' gridData={gridData} gridColumns={gridColumns}
                                          handleGridRow={this.handleGridRow}
                                          readOnly={!isEditeMode} ref="DataGrid"/></li>
                            <li><InputText className='ui-c2' title="Summa " name='summa' placeholder='Summa'
                                           ref="summa"
                                           value={data.summa} disabled='true'
                                           pattern="^[0-9]+(\.[0-9]{1,4})?$"/></li>
                            {/* патерн для цифр с 4 знаками после точки*/}
                            <li><InputText className='ui-c2' title="Käibemaks " name='kbm' placeholder='Käibemaks'
                                           ref="kbm"
                                           disabled='true'
                                           value={data.kbm}
                                           pattern="^[0-9]+(\.[0-9]{1,4})?$"/></li>
                            {/* патерн для цифр с 4 знаками после точки*/}
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

});

module.exports = Arve;


//             <MessageBox message="Удалить запись?" show={showMessageBox} onClick={this.handleClick} />
//                 <DocButtonDelete onClick={this.handleClick}> Delete </DocButtonDelete>

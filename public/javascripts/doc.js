var doc =
webpackJsonp_name_([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactDOM = __webpack_require__(1);
	/*
	    React = require('react'),
	    flux = require('fluxify'),
	    docComponent = '';
	*/

	// данные для хранилища
	localStorage['docStore'] = storeData;
	storeData = JSON.parse(storeData);

	// создаем обработчик события на изменение даннх
	/*
	docStore.on('change:data', function(newValue, previousValue) {
	    if (newValue !== previousValue) {
	        // данные изменились, меняем состояние
	        self.setState({docData:docStore.data})
	    }
	})
	*/

	// запросим компонент документа по его типу
	var Doc = __webpack_require__(67)(storeData.docTypeId);

	ReactDOM.render(React.createElement(Doc, { data: storeData.data, bpm: storeData.bpm }), document.getElementById('doc'));

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(3),
	    flux = __webpack_require__(4);

	const
	    Form = __webpack_require__(9),
	    InputText = __webpack_require__(13),
	    InputDate = __webpack_require__(15),
	    InputNumber = __webpack_require__(17),
	    DocCommon = __webpack_require__(19),
	    Select = __webpack_require__(23),
	//    SelectData = require('../../components/select-data/select-data.jsx'),
	    TextArea = __webpack_require__(25),
	    DataGrid = __webpack_require__(27),
	    GridButtonAdd = __webpack_require__(43),
	    GridButtonEdit = __webpack_require__(46),
	    GridButtonDelete = __webpack_require__(47),
	    DokProp = __webpack_require__(48),
	    relatedDocuments = __webpack_require__(50),
	    ToolbarContainer = __webpack_require__(51),
	    DocToolBar = __webpack_require__(53),
	    validateForm = __webpack_require__(60),
	    ModalPage = __webpack_require__(61),
	    styles = __webpack_require__(63);

	const LIBDOK = 'ARV',
	    LIBRARIES = ['asutused', 'kontod', 'dokProps', 'users', 'aa', 'tunnus', 'project', 'nomenclature'];

	// Create a store
	const docStore = __webpack_require__(64);

	const now = new Date();

	var ____ClassG=React.PureComponent;for(var ____ClassG____Key in ____ClassG){if(____ClassG.hasOwnProperty(____ClassG____Key)){Arve[____ClassG____Key]=____ClassG[____ClassG____Key];}}var ____SuperProtoOf____ClassG=____ClassG===null?null:____ClassG.prototype;Arve.prototype=Object.create(____SuperProtoOf____ClassG);Arve.prototype.constructor=Arve;Arve.__superConstructor__=____ClassG;
	    function Arve(props) {
	        ____ClassG.call(this,props);
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

	    Object.defineProperty(Arve.prototype,"validation",{writable:true,configurable:true,value:function() {
	        if (!this.state.edited) return '';

	        let requiredFields = this.requiredFields;
	        let warning = __webpack_require__(60)(this, requiredFields);
	        return warning;
	    }});

	    Object.defineProperty(Arve.prototype,"componentWillMount",{writable:true,configurable:true,value:function() {
	        this.relatedDocuments();
	    }});

	    Object.defineProperty(Arve.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {
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
	                let summa = newValue.reduce(function(sum, row)  {return sum + Number(row.summa);}, 0), // сумма счета
	                    kbm = newValue.reduce(function(sum, row)  {return sum + Number(row.kbm);}, 0), // сумма налога
	                    docData = self.state.docData;

	                docData.summa = summa;
	                docData.kbm = kbm;

	                self.setState({gridData: newValue, docData: docData});
	            }
	        });

	        // грузим справочники
	        LIBRARIES.forEach(function(lib)  {
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

	        docStore.on('change:libs', function(newValue, previousValue)  {
	            let isChanged = false,
	                libs = newValue,
	                libsData = this.state.libs;

	            if (newValue.length > 0) {

	                libs.forEach(function(lib)  {
	                    if (lib.id === 'dokProps') {
	                        // оставим только данные этого документа

	                    }
	                    if (this.state.libs[lib.id] && lib.data.length > 0) {
	                        libsData[lib.id] = lib.data;
	                        isChanged = true;
	                    }
	                }.bind(this));
	            }

	            if (isChanged) {
	                self.setState({libs: libsData});
	            }
	        }.bind(this));

	    }});

	    Object.defineProperty(Arve.prototype,"shouldComponentUpdate",{writable:true,configurable:true,value:function(nextProps, nextState) {
	        // @todo добавить проверку на изменение состояния
	        return true;
	    }});

	    Object.defineProperty(Arve.prototype,"render",{writable:true,configurable:true,value:function() {
	        // формируем зависимости
	        relatedDocuments(this);

	        let bpm = this.state.bpm,
	            isEditeMode = this.state.edited,
	            toolbarParams = this.prepaireToolBarParameters(isEditeMode),
	            validationMessage = this.validation(),
	            libs = flux.stores.docStore.libs;

	        return (
	            React.createElement("div", null, 
	                React.createElement(Form, {pages: this.pages, 
	                      ref: "form", 
	                      handlePageClick: this.handlePageClick, 
	                      disabled: isEditeMode}, 
	                    React.createElement(ToolbarContainer, {ref: "toolbar-container"}, 
	                        React.createElement("div", {className: "doc-toolbar-warning"}, 
	                            validationMessage ? React.createElement("span", null, validationMessage) : null
	                        ), 
	                        React.createElement("div", null, 
	                            React.createElement(DocToolBar, {bpm: bpm, 
	                                        ref: "doc-toolbar", 
	                                        edited: isEditeMode, 
	                                        docStatus: this.state.docData.doc_status, 
	                                        validator: this.validation, 
	                                        eventHandler: this.handleToolbarEvents})
	                        )
	                    ), 
	                    React.createElement("div", {style: styles.doc}, 
	                        React.createElement("div", {style: styles.docRow}, 
	                            React.createElement(DocCommon, {
	                                ref: "doc-common", 
	                                data: this.state.docData, 
	                                readOnly: !isEditeMode})
	                        ), 
	                        React.createElement("div", {style: styles.docRow}, 
	                            React.createElement("div", {style: styles.docColumn}, 
	                                React.createElement(InputText, {ref: "input-number", 
	                                           title: "Number", 
	                                           name: "number", 
	                                           value: this.state.docData.number, 
	                                           readOnly: !isEditeMode, 
	                                           onChange: this.handleInputChange}), 
	                                React.createElement(InputDate, {title: "Kuupäev ", 
	                                           name: "kpv", value: this.state.docData.kpv, 
	                                           ref: "input-kpv", 
	                                           readOnly: !isEditeMode, 
	                                           onChange: this.handleInputChange}), 
	                                React.createElement(InputDate, {title: "Tähtaeg ", 
	                                           name: "tahtaeg", 
	                                           value: this.state.docData.tahtaeg, 
	                                           ref: "input-tahtaeg", 
	                                           readOnly: !isEditeMode, 
	                                           onChange: this.handleInputChange}), 
	                                React.createElement(Select, {title: "Asutus", 
	                                        name: "asutusid", 
	                                        libs: "asutused", 
	                                        data: this.state.libs['asutused'], 
	                                        value: this.state.docData.asutusid, 
	                                        defaultValue: this.state.docData.asutus, 
	                                        ref: "select-asutusid", 
	                                        btnDelete: isEditeMode, 
	                                        onChange: this.handleInputChange, 
	                                        readOnly: !isEditeMode}), 
	                                /*
	                                 <SelectData title="Asutus widget"
	                                 name='asutusid'
	                                 value={this.state.docData.asutusid}
	                                 defaultValue={this.state.docData.asutus}
	                                 collName="asutus"
	                                 ref="selectData-asutusid"
	                                 onChange={this.handleInputChange}
	                                 readOnly={!isEditeMode}/>
	                                 */
	                                React.createElement(InputText, {title: "Lisa ", 
	                                           name: "lisa", 
	                                           value: this.state.docData.lisa, 
	                                           ref: "input-lisa", 
	                                           readOnly: !isEditeMode, 
	                                           onChange: this.handleInputChange})
	                            ), 
	                            React.createElement("div", {style: styles.docColumn}, 
	                                React.createElement(DokProp, {title: "Konteerimine: ", 
	                                         name: "doklausid", 
	                                         libs: "dokProps", 
	                                         value: this.state.docData.doklausid, 
	                                         defaultValue: this.state.docData.dokprop, 
	                                         ref: "dokprop-doklausid", 
	                                         readOnly: !isEditeMode})
	                            )
	                        ), 
	                        React.createElement("div", {style: styles.docRow}, 
	                        React.createElement(TextArea, {title: "Märkused", 
	                                  name: "muud", 
	                                  ref: "textarea-muud", 
	                                  onChange: this.handleInputChange, 
	                                  value: this.state.docData.muud, 
	                                  readOnly: !isEditeMode})
	                        ), 

	                        isEditeMode ?
	                            React.createElement("div", {style: styles.docRow}, 
	                                React.createElement(ToolbarContainer, {
	                                    ref: "grid-toolbar-container", 
	                                    position: 'left'}, 
	                                    React.createElement(GridButtonAdd, {onClick: this.handleGridBtnClick, ref: "grid-button-add"}), 
	                                    React.createElement(GridButtonEdit, {onClick: this.handleGridBtnClick, ref: "grid-button-edit"}), 
	                                    React.createElement(GridButtonDelete, {onClick: this.handleGridBtnClick, ref: "grid-button-delete"})
	                                )
	                            ) : null, 

	                        React.createElement("div", {style: styles.docRow}, 
	                            React.createElement(DataGrid, {source: "details", 
	                                      gridData: this.state.gridData, 
	                                      gridColumns: this.state.gridConfig, 
	                                      handleGridRow: this.handleGridRow, 
	                                      readOnly: !isEditeMode, 
	                                      ref: "data-grid"})
	                        ), 
	                        React.createElement("div", {style: styles.docRow}, 
	                            React.createElement(InputText, {title: "Summa ", 
	                                       name: "summa", 
	                                       ref: "input-summa", 
	                                       value: this.state.docData.summa, disabled: "true", 
	                                       onChange: this.handleInputChange, 
	                                       pattern: "^[0-9]+(\\.[0-9]{1,4})?$"}), 
	                            React.createElement(InputText, {title: "Käibemaks ", 
	                                       name: "kbm", 
	                                       ref: "input-kbm", 
	                                       disabled: "true", 
	                                       value: this.state.docData.kbm, 
	                                       onChange: this.handleInputChange, 
	                                       pattern: "^[0-9]+(\\.[0-9]{1,4})?$"})
	                        ), 
	                        this.state.gridRowEdit ?
	                            this.createGridRow()
	                            : null
	                    )
	                )
	            )
	        );
	    }});

	    Object.defineProperty(Arve.prototype,"relatedDocuments",{writable:true,configurable:true,value:function() {
	        // формируем зависимости
	        let relatedDocuments = this.state.relations;
	        if (relatedDocuments.length > 0) {
	            relatedDocuments.forEach(function(doc)  {
	                if (doc.id) {
	                    // проверим на уникальность списка документов
	                    let isExists = this.pages.find(function(page)  {
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
	            }.bind(this));
	        }
	    }});

	    Object.defineProperty(Arve.prototype,"modalPageClick",{writable:true,configurable:true,value:function(btnEvent, data) {
	        // отработаем Ok из модального окна
	        let gridData = this.state.gridData,
	            docData = this.state.docData,
	            gridColumns = this.state.gridConfig,
	            gridRow = this.state.gridRowData;

	        if (btnEvent == 'Ok') {

	            // ищем по ид строку в данных грида, если нет, то добавим строку
	            if (!gridData.some(function(row)  {
	                    if (row.id === gridRow.id) return true;
	                })) {
	                // вставка новой строки
	                gridData.splice(0, 0, gridRow);
	            } else {
	                gridData = gridData.map(function(row)  {
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

	    }});

	    Object.defineProperty(Arve.prototype,"handlePageClick",{writable:true,configurable:true,value:function(page) {
	        if (page.docId) {
	            let url = "/document/" + page.docTypeId + page.docId;
	            document.location.href = url;
	        }
	    }});

	    Object.defineProperty(Arve.prototype,"handleSelectTask",{writable:true,configurable:true,value:function(e) {
	        // метод вызывается при выборе задачи
	        var taskValue = e.target.value;
	    }});

	    Object.defineProperty(Arve.prototype,"handleToolbarEvents",{writable:true,configurable:true,value:function(event) {
	        // toolbar event handler

	        switch (event) {
	            case 'CANCEL':
	                let backup = flux.stores.docStore.backup;
	                this.setState({docData: backup.row, gridData: backup.details, warning: ''});
	                break;
	            default:
	                console.error('handleToolbarEvents, no event handler for ', event);
	        }
	    }});

	    Object.defineProperty(Arve.prototype,"handleInputChange",{writable:true,configurable:true,value:function(inputName, inputValue) {
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

	    }});

	    Object.defineProperty(Arve.prototype,"prepaireToolBarParameters",{writable:true,configurable:true,value:function(isEditMode) {
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
	    }});

	    Object.defineProperty(Arve.prototype,"handleGridBtnClick",{writable:true,configurable:true,value:function(btnName, id) {
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
	    }});

	    Object.defineProperty(Arve.prototype,"deleteRow",{writable:true,configurable:true,value:function() {
	        // удалит активную строку
	        let gridData = this.state.gridData,
	            gridActiveRow = this.refs['data-grid'].state.activeRow,
	            docData = this.state.docData;

	        gridData.splice(gridActiveRow, 1);

	        // перерасчет итогов
	        docData = this.recalcDocSumma(docData);

	        // изменим состояние
	        this.setState({gridData: gridData, docData: docData});
	    }});

	    Object.defineProperty(Arve.prototype,"editRow",{writable:true,configurable:true,value:function() {
	        // откроет активную строку для редактирования
	        let gridData = this.state.gridData,
	            gridActiveRow = this.refs['data-grid'].state.activeRow,
	            gridRow = gridData[gridActiveRow];

	        // откроем модальное окно для редактирования
	        this.setState({gridRowEdit: true, gridRowEvent: 'edit', gridRowData: gridRow});
	    }});

	    Object.defineProperty(Arve.prototype,"addRow",{writable:true,configurable:true,value:function() {
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

	    }});

	    Object.defineProperty(Arve.prototype,"createGridRow",{writable:true,configurable:true,value:function() {
	        let style = styles.gridRow,
	            row = this.state.gridRowData,
	            validateMessage = '',
	            modalObjects = ['btnOk', 'btnCancel'],
	            buttonOkReadOnly = validateMessage.length > 0 || !this.state.checked;

	        if (buttonOkReadOnly) {
	            // уберем кнопку Ок
	            modalObjects.splice(0, 1);
	        }


	        if (!row) return React.createElement("div", null);

	        let nomData = this.state.libs['nomenclature'].filter(function(lib)  {
	            if (!lib.dok || lib.dok === LIBDOK) return lib;
	        });

	        return (React.createElement("div", {className: ".modalPage"}, 
	            React.createElement(ModalPage, {
	                modalObjects: modalObjects, 
	                ref: "modalpage-grid-row", 
	                show: true, 
	                modalPageBtnClick: this.modalPageClick, 
	                modalPageName: "Rea lisamine / parandamine"}, 
	                React.createElement("div", {ref: "grid-row-container"}, 
	                    React.createElement("div", {style: styles.docRow}, 
	                        React.createElement(Select, {title: "Teenus", 
	                                name: "nomid", 
	                                libs: "nomenclature", 
	                                data: nomData, 
	                                readOnly: false, 
	                                value: row.nomid, 
	                                defaultValue: row.kood, 
	                                ref: "nomid", 
	                                placeholder: "Teenuse kood", 
	                                onChange: this.handleGridRowChange})
	                    ), 
	                    React.createElement("div", {style: styles.docRow}, 
	                        React.createElement(InputNumber, {title: "Kogus ", 
	                                     name: "kogus", 
	                                     value: row.kogus, 
	                                     readOnly: false, 
	                                     disabled: false, 
	                                     bindData: false, 
	                                     ref: "kogus", 
	                                     className: "ui-c2", 
	                                     onChange: this.handleGridRowInput})
	                    ), 
	                    React.createElement("div", {style: styles.docRow}, 
	                        React.createElement(InputNumber, {title: "Hind ", 
	                                     name: "hind", 
	                                     value: row.hind, 
	                                     readOnly: false, 
	                                     disabled: false, 
	                                     bindData: false, 
	                                     ref: "hind", 
	                                     className: "ui-c2", 
	                                     onChange: this.handleGridRowInput})
	                    ), 
	                    React.createElement("div", {style: styles.docRow}, 
	                        React.createElement(InputNumber, {title: "Kbm-ta: ", 
	                                     name: "kbmta", 
	                                     value: row.kbmta, 
	                                     disabled: true, 
	                                     bindData: false, 
	                                     ref: "kbmta", 
	                                     className: "ui-c2", 
	                                     onChange: this.handleGridRowChange})
	                    ), 
	                    React.createElement("div", {style: styles.docRow}, 
	                        React.createElement(InputNumber, {title: "Kbm: ", 
	                                     name: "kbm", 
	                                     value: row.kbm, 
	                                     disabled: true, 
	                                     bindData: false, 
	                                     ref: "kbm", 
	                                     className: "ui-c2", 
	                                     onBlur: this.handleGridRowInput})
	                    ), 
	                    React.createElement("div", {style: styles.docRow}, 
	                        React.createElement(InputNumber, {title: "Summa: ", 
	                                     name: "Summa", 
	                                     value: row.summa, 
	                                     disabled: true, 
	                                     bindData: false, 
	                                     ref: "summa", 
	                                     className: "ui-c2", 
	                                     onChange: this.handleGridRowInput})
	                    )
	                ), 
	                React.createElement("div", null, React.createElement("span", null, validateMessage))
	            )
	        ));
	    }});

	    Object.defineProperty(Arve.prototype,"handleGridRowChange",{writable:true,configurable:true,value:function(name, value) {
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
	        libData.forEach(function(row)  {
	            if (row.id == value) {
	                rowData['kood'] = row.kood;
	                rowData['nimetus'] = row.name;
	                return;
	            }
	        });

	        rowData[name] = value;
	        this.setState({gridRowData: rowData});
	        this.validateGridRow();

	    }});

	    Object.defineProperty(Arve.prototype,"handleGridRowInput",{writable:true,configurable:true,value:function(name, value) {
	        // пересчет сумм
	        let rowData = Object.assign({}, this.state.gridRowData);
	        rowData[name] = value;
	        rowData = this.recalcRowSumm(rowData);
	        this.setState({gridRowData: rowData});
	        this.validateGridRow();
	    }});

	    Object.defineProperty(Arve.prototype,"recalcRowSumm",{writable:true,configurable:true,value:function(gridRowData) {
	        // перерасчет суммы строки и расчет налога
	        gridRowData['kogus'] = Number(gridRowData.kogus);
	        gridRowData['hind'] = Number(gridRowData.hind);
	        gridRowData['kbmta'] = Number(gridRowData['kogus']) * Number(gridRowData['hind']);
	        gridRowData['kbm'] = Number(gridRowData['kbmta'] * 0.20); // @todo врменно
	        gridRowData['summa'] = Number(gridRowData['kbmta']) + Number(gridRowData['kbm']);

	        return gridRowData;
	    }});

	    Object.defineProperty(Arve.prototype,"recalcDocSumma",{writable:true,configurable:true,value:function(docData) {
	        let gridData = Object.assign([], this.state.gridData);

	        docData['summa'] = 0;
	        docData['kbm'] = 0;
	        gridData.forEach(function(row)  {
	            docData['summa'] += Number(row['summa']);
	            docData['kbm'] += Number(row['kbm']);
	        });
	        return docData;
	    }});

	    Object.defineProperty(Arve.prototype,"validateGridRow",{writable:true,configurable:true,value:function() {
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
	    }});

	    Object.defineProperty(Arve.prototype,"createLibs",{writable:true,configurable:true,value:function() {
	        // вернет объект библиотек документа
	        let libs = {};
	        LIBRARIES.forEach(function(lib)  {
	            libs[lib] = [];
	        })
	        return libs;
	    }});





	Arve.PropTypes = {
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


	/*
	 Arve.defaultProps = {
	 disabled: false,
	 show: true
	 };
	 */


	module.exports = Arve;




/***/ },

/***/ 63:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    docRow: {
	        display: 'flex',
	        flexDirection: 'row',
	        border: '1px solid blue'
	    },
	    docColumn: {
	        display: 'flex',
	        flexDirection: 'column',
	        border: '1px solid yellow',
	        width: '50%'
	    },
	    doc: {
	        display: 'flex',
	        flexDirection: 'column',
	        border: '1px solid brown'
	    },
	    gridRow: {
	        border: '1px solid black',
	        backgroundColor: 'white',
	        position: 'relative',
	        margin: '10% 30% 10% 30%',
	        width: 'auto',
	        opacity: '1',
	        top: '100px'
	    }

	};

/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (docTypeId) {
	    // взависимости от типа документа вернет компонент документа

	    console.log('returnDocComponent:' + docTypeId);
	    var component = {};

	    switch (docTypeId) {
	        case 'PALK':
	            component = __webpack_require__(68);
	            break;
	        default:
	            component = __webpack_require__(2);
	    }
	    return component;
	};

/***/ },

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);
	const Form = __webpack_require__(69);
	const PageLabel = __webpack_require__(70);

	var pages = ['Page1', 'Page2'];

	const Palk = React.createClass({displayName: "Palk",
	    render: function() {
	        return (
	            React.createElement(Form, {pages: pages}, 
	                React.createElement("span", null, " Palk ")
	            )
	        );
	    }});

	module.exports = Palk;

/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3),
	    flux = __webpack_require__(4);

	var PageLabel = __webpack_require__(70);

	var Form = React.createClass({
	    displayName: 'Form',

	    getInitialState: function getInitialState() {
	        var pages = [{ pageName: 'Page' }];
	        if (this.props.pages) {
	            pages = this.props.pages;
	        }
	        return {
	            pages: this.props.pages
	        };
	    },

	    render: function render() {
	        var pages = this.state.pages;
	        return React.createElement('div', { className: 'container' }, pages.map(function (page, idx) {
	            return React.createElement(PageLabel, { key: idx, pageIdx: idx }, page);
	        }), React.createElement('div', { className: 'page' }, React.createElement('form', null, this.props.children)));
	    }
	});

	module.exports = Form;

/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3),
	    flux = __webpack_require__(4);

	var PageLabel = React.createClass({
	    displayName: 'PageLabel',
	    getInitialState: function getInitialState() {
	        return {
	            disabled: false
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        var self = this;
	        //      console.log('page label componentWillMount')
	        flux.stores.docStore.on('change:edited', function (newValue, previousValue) {
	            self.setState({ disabled: newValue });
	        });
	    },

	    handleClick: function handleClick(page) {
	        // обработчик на событие клик, подгружаем связанный документ
	        //       alert('click:' + pageName);
	        // docTypeId: doc.doc_type, docId:doc.id, pageName:'Lausend id:' + doc.id

	        if (this.state.disabled) {
	            console.log('page disabled');
	            return;
	        }

	        if (page.docId) {
	            console.log('handleClick page.docTypeId %s, page.docId %n');
	            var url = "/document/" + page.docTypeId + page.docId;
	            document.location.href = url;
	        }
	    },

	    render: function render() {
	        var className = 'pageLabel';

	        return React.createElement('label', { className: className, onClick: this.handleClick.bind(this, this.props.children), disabled: this.state.disabled }, this.props.children.pageName, ' ');
	    }
	});

	module.exports = PageLabel;

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLmpzeD8xMTJmIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLnN0eWxlcy5qcz8zYTcwIiwid2VicGFjazovLy8uL21pZGRsZXdhcmUvcmV0dXJuRG9jQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvcGFsa19vcGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9wYWdlX2xhYmVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG4vKlxyXG4gICAgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIGRvY0NvbXBvbmVudCA9ICcnO1xyXG4qL1xuXG4vLyDQtNCw0L3QvdGL0LUg0LTQu9GPINGF0YDQsNC90LjQu9C40YnQsFxubG9jYWxTdG9yYWdlWydkb2NTdG9yZSddID0gc3RvcmVEYXRhO1xuc3RvcmVEYXRhID0gSlNPTi5wYXJzZShzdG9yZURhdGEpO1xuXG4vLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSDQtNCw0L3QvdGFXG4vKlxyXG5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgc2VsZi5zZXRTdGF0ZSh7ZG9jRGF0YTpkb2NTdG9yZS5kYXRhfSlcclxuICAgIH1cclxufSlcclxuKi9cblxuLy8g0LfQsNC/0YDQvtGB0LjQvCDQutC+0LzQv9C+0L3QtdC90YIg0LTQvtC60YPQvNC10L3RgtCwINC/0L4g0LXQs9C+INGC0LjQv9GDXG52YXIgRG9jID0gcmVxdWlyZSgnLi4vbWlkZGxld2FyZS9yZXR1cm5Eb2NDb21wb25lbnQnKShzdG9yZURhdGEuZG9jVHlwZUlkKTtcblxuUmVhY3RET00ucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jLCB7IGRhdGE6IHN0b3JlRGF0YS5kYXRhLCBicG06IHN0b3JlRGF0YS5icG0gfSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb2MnKSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2MuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3RcclxuICAgIEZvcm0gPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Zvcm0vZm9ybS5qc3gnKSxcclxuICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgSW5wdXREYXRlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9pbnB1dC1kYXRlL2lucHV0LWRhdGUuanN4JyksXHJcbiAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvaW5wdXQtbnVtYmVyL2lucHV0LW51bWJlci5qc3gnKSxcclxuICAgIERvY0NvbW1vbiA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZG9jLWNvbW1vbi9kb2MtY29tbW9uLmpzeCcpLFxyXG4gICAgU2VsZWN0ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmpzeCcpLFxyXG4vLyAgICBTZWxlY3REYXRhID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9zZWxlY3QtZGF0YS9zZWxlY3QtZGF0YS5qc3gnKSxcclxuICAgIFRleHRBcmVhID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy90ZXh0LWFyZWEvdGV4dC1hcmVhLmpzeCcpLFxyXG4gICAgRGF0YUdyaWQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RhdGEtZ3JpZC9kYXRhLWdyaWQuanN4JyksXHJcbiAgICBHcmlkQnV0dG9uQWRkID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWFkZC9idXR0b24tcmVnaXN0ZXItYWRkLmpzeCcpLFxyXG4gICAgR3JpZEJ1dHRvbkVkaXQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZWRpdC9idXR0b24tcmVnaXN0ZXItZWRpdC5qc3gnKSxcclxuICAgIEdyaWRCdXR0b25EZWxldGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZGVsZXRlL2J1dHRvbi1yZWdpc3Rlci1kZWxldGUuanN4JyksXHJcbiAgICBEb2tQcm9wID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kb2Nwcm9wL2RvY3Byb3AuanN4JyksXHJcbiAgICByZWxhdGVkRG9jdW1lbnRzID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vcmVsYXRlZERvY3VtZW50cy5qc3gnKSxcclxuICAgIFRvb2xiYXJDb250YWluZXIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci1jb250YWluZXIvdG9vbGJhci1jb250YWluZXIuanN4JyksXHJcbiAgICBEb2NUb29sQmFyID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL2RvYy10b29sYmFyL2RvYy10b29sYmFyLmpzeCcpLFxyXG4gICAgdmFsaWRhdGVGb3JtID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vdmFsaWRhdGVGb3JtJyksXHJcbiAgICBNb2RhbFBhZ2UgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFsUGFnZS5qc3gnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vYXJ2ZS5zdHlsZXMnKTtcclxuXHJcbmNvbnN0IExJQkRPSyA9ICdBUlYnLFxyXG4gICAgTElCUkFSSUVTID0gWydhc3V0dXNlZCcsICdrb250b2QnLCAnZG9rUHJvcHMnLCAndXNlcnMnLCAnYWEnLCAndHVubnVzJywgJ3Byb2plY3QnLCAnbm9tZW5jbGF0dXJlJ107XHJcblxyXG4vLyBDcmVhdGUgYSBzdG9yZVxyXG5jb25zdCBkb2NTdG9yZSA9IHJlcXVpcmUoJy4uLy4uL3N0b3Jlcy9kb2Nfc3RvcmUuanMnKTtcclxuXHJcbmNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcblxyXG52YXIgX19fX0NsYXNzRz1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzR19fX19LZXkgaW4gX19fX0NsYXNzRyl7aWYoX19fX0NsYXNzRy5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NHX19fX0tleSkpe0FydmVbX19fX0NsYXNzR19fX19LZXldPV9fX19DbGFzc0dbX19fX0NsYXNzR19fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NHPV9fX19DbGFzc0c9PT1udWxsP251bGw6X19fX0NsYXNzRy5wcm90b3R5cGU7QXJ2ZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzRyk7QXJ2ZS5wcm90b3R5cGUuY29uc3RydWN0b3I9QXJ2ZTtBcnZlLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc0c7XHJcbiAgICBmdW5jdGlvbiBBcnZlKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzRy5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGRvY0RhdGE6IHRoaXMucHJvcHMuZGF0YS5yb3csXHJcbiAgICAgICAgICAgIGJwbTogdGhpcy5wcm9wcy5icG0sXHJcbiAgICAgICAgICAgIGVkaXRlZDogdGhpcy5wcm9wcy5kYXRhLnJvdy5pZCA9PSAwLFxyXG4gICAgICAgICAgICBzaG93TWVzc2FnZUJveDogJ25vbmUnLFxyXG4gICAgICAgICAgICByZWxhdGlvbnM6IHRoaXMucHJvcHMuZGF0YS5yZWxhdGlvbnMsXHJcbiAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnByb3BzLmRhdGEuZGV0YWlscyxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZzogdGhpcy5wcm9wcy5kYXRhLmdyaWRDb25maWcsXHJcbiAgICAgICAgICAgIGdyaWRSb3dFZGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgZ3JpZFJvd0V2ZW50OiBudWxsLFxyXG4gICAgICAgICAgICBncmlkUm93RGF0YTogbnVsbCxcclxuICAgICAgICAgICAgbGliczogdGhpcy5jcmVhdGVMaWJzKCksXHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB3YXJuaW5nOiAnJ1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGFnZXMgPSBbe3BhZ2VOYW1lOiAnQXJ2ZSd9XVxyXG4gICAgICAgIHRoaXMucmVxdWlyZWRGaWVsZHMgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdrcHYnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0QnLFxyXG4gICAgICAgICAgICAgICAgbWluOiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgLSAxKSxcclxuICAgICAgICAgICAgICAgIG1heDogbm93LnNldEZ1bGxZZWFyKG5vdy5nZXRGdWxsWWVhcigpICsgMSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3RhaHRhZWcnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0QnLFxyXG4gICAgICAgICAgICAgICAgbWluOiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgLSAxKSxcclxuICAgICAgICAgICAgICAgIG1heDogbm93LnNldEZ1bGxZZWFyKG5vdy5nZXRGdWxsWWVhcigpICsgMSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge25hbWU6ICdhc3V0dXNpZCcsIHR5cGU6ICdOJywgbWluOiBudWxsLCBtYXg6IG51bGx9LFxyXG4gICAgICAgICAgICB7bmFtZTogJ3N1bW1hJywgdHlwZTogJ04nLCBtaW46IC05OTk5OTk5LCBtYXg6IDk5OTk5OX1cclxuICAgICAgICBdXHJcbiAgICAgICAgdGhpcy5oYW5kbGVUb29sYmFyRXZlbnRzID0gdGhpcy5oYW5kbGVUb29sYmFyRXZlbnRzLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0aW9uLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbFBhZ2VDbGljayA9IHRoaXMubW9kYWxQYWdlQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUdyaWRCdG5DbGljayA9IHRoaXMuaGFuZGxlR3JpZEJ0bkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRSb3cgPSB0aGlzLmFkZFJvdy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlR3JpZFJvd0NoYW5nZSA9IHRoaXMuaGFuZGxlR3JpZFJvd0NoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGVHcmlkUm93ID0gdGhpcy52YWxpZGF0ZUdyaWRSb3cuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUdyaWRSb3dJbnB1dCA9IHRoaXMuaGFuZGxlR3JpZFJvd0lucHV0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVHcmlkUm93ID0gdGhpcy5jcmVhdGVHcmlkUm93LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVJbnB1dENoYW5nZSA9IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJ2YWxpZGF0aW9uXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmVkaXRlZCkgcmV0dXJuICcnO1xyXG5cclxuICAgICAgICBsZXQgcmVxdWlyZWRGaWVsZHMgPSB0aGlzLnJlcXVpcmVkRmllbGRzO1xyXG4gICAgICAgIGxldCB3YXJuaW5nID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vdmFsaWRhdGVGb3JtJykodGhpcywgcmVxdWlyZWRGaWVsZHMpO1xyXG4gICAgICAgIHJldHVybiB3YXJuaW5nO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxNb3VudFwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucmVsYXRlZERvY3VtZW50cygpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImNvbXBvbmVudERpZE1vdW50XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L/QuNGI0LXQvCDQuNGB0YXQvtC00L3Ri9C1INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LUsINGA0LXQs9C40YHRgtGA0LjRgNGD0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICBkYXRhID0gc2VsZi5wcm9wcy5kYXRhLnJvdyxcclxuICAgICAgICAgICAgZGV0YWlscyA9IHNlbGYucHJvcHMuZGF0YS5kZXRhaWxzLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnID0gc2VsZi5wcm9wcy5kYXRhLmdyaWRDb25maWc7XHJcblxyXG4gICAgICAgIC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RldGFpbHNDaGFuZ2UnLCBkZXRhaWxzKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkQ29uZmlnQ2hhbmdlJywgZ3JpZENvbmZpZyk7IC8vINC00LDQvdC90YvQtSDQs9GA0LjQtNCwXHJcbi8vICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkTmFtZUNoYW5nZScsICdhcnYtZ3JpZC1yb3cnKTsgLy8g0LfQsNC00LDQtdC8INC40LzRjyDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdGC0YDQvtC60Lgg0LPRgNC40LTQsCAo0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINCyINCz0YDQuNC00LVcclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRldGFpbHMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSkgJiYgdHlwZW9mIG5ld1ZhbHVlID09ICdhcnJheScpIHtcclxuICAgICAgICAgICAgICAgIC8vINC40YLQvtCz0LhcclxuICAgICAgICAgICAgICAgIGxldCBzdW1tYSA9IG5ld1ZhbHVlLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSk7fSwgMCksIC8vINGB0YPQvNC80LAg0YHRh9C10YLQsFxyXG4gICAgICAgICAgICAgICAgICAgIGtibSA9IG5ld1ZhbHVlLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5rYm0pO30sIDApLCAvLyDRgdGD0LzQvNCwINC90LDQu9C+0LPQsFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY0RhdGEgPSBzZWxmLnN0YXRlLmRvY0RhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jRGF0YS5zdW1tYSA9IHN1bW1hO1xyXG4gICAgICAgICAgICAgICAgZG9jRGF0YS5rYm0gPSBrYm07XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Z3JpZERhdGE6IG5ld1ZhbHVlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0LPRgNGD0LfQuNC8INGB0L/RgNCw0LLQvtGH0L3QuNC60LhcclxuICAgICAgICBMSUJSQVJJRVMuZm9yRWFjaChmdW5jdGlvbihsaWIpICB7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oXCJsb2FkTGlic1wiLCBsaWIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDQtdGB0LvQuCDQvdC+0LLRi9C5INC00L7QutGD0LzQtdC90YIgKGlkID09IDApXHJcblxyXG4gICAgICAgIGlmIChkYXRhLmlkID09IDApIHtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vINC00LXQu9Cw0LXQvCDQutC+0L/QuNC4XHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdiYWNrdXBDaGFuZ2UnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93OiBPYmplY3QuYXNzaWduKHt9LCBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhKSxcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiBPYmplY3QuYXNzaWduKFtdLCBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRlZDogbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmxpYnMnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkgIHtcclxuICAgICAgICAgICAgbGV0IGlzQ2hhbmdlZCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbGlicyA9IG5ld1ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgbGlic0RhdGEgPSB0aGlzLnN0YXRlLmxpYnM7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxpYnMuZm9yRWFjaChmdW5jdGlvbihsaWIpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpYi5pZCA9PT0gJ2Rva1Byb3BzJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQvtGB0YLQsNCy0LjQvCDRgtC+0LvRjNC60L4g0LTQsNC90L3Ri9C1INGN0YLQvtCz0L4g0LTQvtC60YPQvNC10L3RgtCwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5saWJzW2xpYi5pZF0gJiYgbGliLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWJzRGF0YVtsaWIuaWRdID0gbGliLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGlzQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7bGliczogbGlic0RhdGF9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcInNob3VsZENvbXBvbmVudFVwZGF0ZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8gQHRvZG8g0LTQvtCx0LDQstC40YLRjCDQv9GA0L7QstC10YDQutGDINC90LAg0LjQt9C80LXQvdC10L3QuNC1INGB0L7RgdGC0L7Rj9C90LjRj1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XHJcbiAgICAgICAgcmVsYXRlZERvY3VtZW50cyh0aGlzKTtcclxuXHJcbiAgICAgICAgbGV0IGJwbSA9IHRoaXMuc3RhdGUuYnBtLFxyXG4gICAgICAgICAgICBpc0VkaXRlTW9kZSA9IHRoaXMuc3RhdGUuZWRpdGVkLFxyXG4gICAgICAgICAgICB0b29sYmFyUGFyYW1zID0gdGhpcy5wcmVwYWlyZVRvb2xCYXJQYXJhbWV0ZXJzKGlzRWRpdGVNb2RlKSxcclxuICAgICAgICAgICAgdmFsaWRhdGlvbk1lc3NhZ2UgPSB0aGlzLnZhbGlkYXRpb24oKSxcclxuICAgICAgICAgICAgbGlicyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmxpYnM7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIHtwYWdlczogdGhpcy5wYWdlcywgXHJcbiAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZm9ybVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVBhZ2VDbGljazogdGhpcy5oYW5kbGVQYWdlQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGlzRWRpdGVNb2RlfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyQ29udGFpbmVyLCB7cmVmOiBcInRvb2xiYXItY29udGFpbmVyXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImRvYy10b29sYmFyLXdhcm5pbmdcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1lc3NhZ2UgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB2YWxpZGF0aW9uTWVzc2FnZSkgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEb2NUb29sQmFyLCB7YnBtOiBicG0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImRvYy10b29sYmFyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGVkOiBpc0VkaXRlTW9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NTdGF0dXM6IHRoaXMuc3RhdGUuZG9jRGF0YS5kb2Nfc3RhdHVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogdGhpcy52YWxpZGF0aW9uLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlcjogdGhpcy5oYW5kbGVUb29sYmFyRXZlbnRzfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERvY0NvbW1vbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJkb2MtY29tbW9uXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc3RhdGUuZG9jRGF0YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NDb2x1bW59LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge3JlZjogXCJpbnB1dC1udW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOdW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEubnVtYmVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dERhdGUsIHt0aXRsZTogXCJLdXVww6RldiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtwdlwiLCB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLmtwdiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiaW5wdXQta3B2XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZX0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0RGF0ZSwge3RpdGxlOiBcIlTDpGh0YWVnIFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGFodGFlZ1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEudGFodGFlZywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiaW5wdXQtdGFodGFlZ1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHt0aXRsZTogXCJBc3V0dXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFzdXR1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliczogXCJhc3V0dXNlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc3RhdGUubGlic1snYXN1dHVzZWQnXSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLmFzdXR1c2lkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLmFzdXR1cywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwic2VsZWN0LWFzdXR1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnRuRGVsZXRlOiBpc0VkaXRlTW9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3REYXRhIHRpdGxlPVwiQXN1dHVzIHdpZGdldFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J2FzdXR1c2lkJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5kb2NEYXRhLmFzdXR1c2lkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMuc3RhdGUuZG9jRGF0YS5hc3V0dXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxOYW1lPVwiYXN1dHVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwic2VsZWN0RGF0YS1hc3V0dXNpZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGVNb2RlfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHt0aXRsZTogXCJMaXNhIFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGlzYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEubGlzYSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiaW5wdXQtbGlzYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY0NvbHVtbn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9rUHJvcCwge3RpdGxlOiBcIktvbnRlZXJpbWluZTogXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGF1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwiZG9rUHJvcHNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZG9jRGF0YS5kb2tsYXVzaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLmRva3Byb3AsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJkb2twcm9wLWRva2xhdXNpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHt0aXRsZTogXCJNw6Rya3VzZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm11dWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwidGV4dGFyZWEtbXV1ZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEubXV1ZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0VkaXRlTW9kZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9vbGJhckNvbnRhaW5lciwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZ3JpZC10b29sYmFyLWNvbnRhaW5lclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdsZWZ0J30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEdyaWRCdXR0b25BZGQsIHtvbkNsaWNrOiB0aGlzLmhhbmRsZUdyaWRCdG5DbGljaywgcmVmOiBcImdyaWQtYnV0dG9uLWFkZFwifSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEdyaWRCdXR0b25FZGl0LCB7b25DbGljazogdGhpcy5oYW5kbGVHcmlkQnRuQ2xpY2ssIHJlZjogXCJncmlkLWJ1dHRvbi1lZGl0XCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEJ1dHRvbkRlbGV0ZSwge29uQ2xpY2s6IHRoaXMuaGFuZGxlR3JpZEJ0bkNsaWNrLCByZWY6IFwiZ3JpZC1idXR0b24tZGVsZXRlXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERhdGFHcmlkLCB7c291cmNlOiBcImRldGFpbHNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZERhdGE6IHRoaXMuc3RhdGUuZ3JpZERhdGEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zOiB0aGlzLnN0YXRlLmdyaWRDb25maWcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUdyaWRSb3c6IHRoaXMuaGFuZGxlR3JpZFJvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImRhdGEtZ3JpZFwifSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge3RpdGxlOiBcIlN1bW1hIFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImlucHV0LXN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLnN1bW1hLCBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwiXlswLTldKyhcXFxcLlswLTldezEsNH0pPyRcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7dGl0bGU6IFwiS8OkaWJlbWFrcyBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2JtXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiaW5wdXQta2JtXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLmtibSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCJeWzAtOV0rKFxcXFwuWzAtOV17MSw0fSk/JFwifSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZ3JpZFJvd0VkaXQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkUm93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwicmVsYXRlZERvY3VtZW50c1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XHJcbiAgICAgICAgbGV0IHJlbGF0ZWREb2N1bWVudHMgPSB0aGlzLnN0YXRlLnJlbGF0aW9ucztcclxuICAgICAgICBpZiAocmVsYXRlZERvY3VtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJlbGF0ZWREb2N1bWVudHMuZm9yRWFjaChmdW5jdGlvbihkb2MpICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9jLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LjQvCDQvdCwINGD0L3QuNC60LDQu9GM0L3QvtGB0YLRjCDRgdC/0LjRgdC60LAg0LTQvtC60YPQvNC10L3RgtC+0LJcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXNFeGlzdHMgPSB0aGlzLnBhZ2VzLmZpbmQoZnVuY3Rpb24ocGFnZSkgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwYWdlLmRvY0lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFnZS5kb2NJZCA9PSBkb2MuaWQgJiYgcGFnZS5kb2NUeXBlSWQgPT0gZG9jLmRvY190eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNFeGlzdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LIg0LzQsNGB0YHQuNCy0LUg0L3QtdGCLCDQtNC+0LHQsNCy0LjQvCDRgdGB0YvQu9C60YMg0L3QsCDQtNC+0LrRg9C80LXQvdGCXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZXMucHVzaCh7ZG9jVHlwZUlkOiBkb2MuZG9jX3R5cGUsIGRvY0lkOiBkb2MuaWQsIHBhZ2VOYW1lOiBkb2MubmFtZSArICcgaWQ6JyArIGRvYy5pZH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJtb2RhbFBhZ2VDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGJ0bkV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgLy8g0L7RgtGA0LDQsdC+0YLQsNC10LwgT2sg0LjQtyDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsFxyXG4gICAgICAgIGxldCBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGRvY0RhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGEsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gdGhpcy5zdGF0ZS5ncmlkQ29uZmlnLFxyXG4gICAgICAgICAgICBncmlkUm93ID0gdGhpcy5zdGF0ZS5ncmlkUm93RGF0YTtcclxuXHJcbiAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcclxuXHJcbiAgICAgICAgICAgIC8vINC40YnQtdC8INC/0L4g0LjQtCDRgdGC0YDQvtC60YMg0LIg0LTQsNC90L3Ri9GFINCz0YDQuNC00LAsINC10YHQu9C4INC90LXRgiwg0YLQviDQtNC+0LHQsNCy0LjQvCDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgaWYgKCFncmlkRGF0YS5zb21lKGZ1bmN0aW9uKHJvdykgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93LmlkID09PSBncmlkUm93LmlkKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQstGB0YLQsNCy0LrQsCDQvdC+0LLQvtC5INGB0YLRgNC+0LrQuFxyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEuc3BsaWNlKDAsIDAsIGdyaWRSb3cpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEgPSBncmlkRGF0YS5tYXAoZnVuY3Rpb24ocm93KSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT09IGdyaWRSb3cuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0L3QsNGI0LvQuCwg0LfQsNC80LXRidCw0LXQvFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ3JpZFJvdztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb2NEYXRhID0gdGhpcy5yZWNhbGNEb2NTdW1tYShkb2NEYXRhKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtncmlkUm93RWRpdDogZmFsc2UsIGdyaWREYXRhOiBncmlkRGF0YSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJoYW5kbGVQYWdlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihwYWdlKSB7XHJcbiAgICAgICAgaWYgKHBhZ2UuZG9jSWQpIHtcclxuICAgICAgICAgICAgbGV0IHVybCA9IFwiL2RvY3VtZW50L1wiICsgcGFnZS5kb2NUeXBlSWQgKyBwYWdlLmRvY0lkO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xyXG4gICAgICAgIH1cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJoYW5kbGVTZWxlY3RUYXNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIC8vINC80LXRgtC+0LQg0LLRi9C30YvQstCw0LXRgtGB0Y8g0L/RgNC4INCy0YvQsdC+0YDQtSDQt9Cw0LTQsNGH0LhcclxuICAgICAgICB2YXIgdGFza1ZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiaGFuZGxlVG9vbGJhckV2ZW50c1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgLy8gdG9vbGJhciBldmVudCBoYW5kbGVyXHJcblxyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcclxuICAgICAgICAgICAgY2FzZSAnQ0FOQ0VMJzpcclxuICAgICAgICAgICAgICAgIGxldCBiYWNrdXAgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5iYWNrdXA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkb2NEYXRhOiBiYWNrdXAucm93LCBncmlkRGF0YTogYmFja3VwLmRldGFpbHMsIHdhcm5pbmc6ICcnfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2hhbmRsZVRvb2xiYXJFdmVudHMsIG5vIGV2ZW50IGhhbmRsZXIgZm9yICcsIGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiaGFuZGxlSW5wdXRDaGFuZ2VcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihpbnB1dE5hbWUsIGlucHV0VmFsdWUpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQuNC30LzQtdC90LXQvdC40LlcclxuICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlSW5wdXRDaGFuZ2UnLCBpbnB1dE5hbWUsIGlucHV0VmFsdWUpO1xyXG4gICAgICAgIC8vINC40LfQvNC10L3QtdC90LjRjyDQtNC+0L/Rg9GB0YLQuNC80Ysg0YLQvtC70YzQutC+INCyINGA0LXQttC40LzQtSDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmVkaXRlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdub3QgaW4gZWRpdGUgbW9kZScpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuc3RhdGUuZG9jRGF0YTtcclxuXHJcbiAgICAgICAgZGF0YVtpbnB1dE5hbWVdID0gaW5wdXRWYWx1ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtkb2NEYXRhOiBkYXRhfSk7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgbGV0IGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG4gICAgICAgICBkYXRhW2lucHV0TmFtZV0gPSBpbnB1dFZhbHVlO1xyXG4gICAgICAgICAvLyDQt9Cw0LTQsNGC0Ywg0L3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INC/0L7Qu9GPXHJcbiAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuICAgICAgICAgKi9cclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwicHJlcGFpcmVUb29sQmFyUGFyYW1ldGVyc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGlzRWRpdE1vZGUpIHtcclxuICAgICAgICBsZXQgdG9vbGJhclBhcmFtcyA9IHtcclxuICAgICAgICAgICAgYnRuQWRkOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OiAhaXNFZGl0TW9kZSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0VkaXRNb2RlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJ0bkVkaXQ6IHtcclxuICAgICAgICAgICAgICAgIHNob3c6ICFpc0VkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGlzRWRpdE1vZGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnRuUHJpbnQ6IHtcclxuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBidG5TYXZlOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OiBpc0VkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdG9vbGJhclBhcmFtcztcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJoYW5kbGVHcmlkQnRuQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihidG5OYW1lLCBpZCkge1xyXG4gICAgICAgIHN3aXRjaCAoYnRuTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlICdhZGQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSb3coKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdlZGl0JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdFJvdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVJvdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImRlbGV0ZVJvd1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINGD0LTQsNC70LjRgiDQsNC60YLQuNCy0L3Rg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgIGxldCBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGdyaWRBY3RpdmVSb3cgPSB0aGlzLnJlZnNbJ2RhdGEtZ3JpZCddLnN0YXRlLmFjdGl2ZVJvdyxcclxuICAgICAgICAgICAgZG9jRGF0YSA9IHRoaXMuc3RhdGUuZG9jRGF0YTtcclxuXHJcbiAgICAgICAgZ3JpZERhdGEuc3BsaWNlKGdyaWRBY3RpdmVSb3csIDEpO1xyXG5cclxuICAgICAgICAvLyDQv9C10YDQtdGA0LDRgdGH0LXRgiDQuNGC0L7Qs9C+0LJcclxuICAgICAgICBkb2NEYXRhID0gdGhpcy5yZWNhbGNEb2NTdW1tYShkb2NEYXRhKTtcclxuXHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdC40Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZERhdGE6IGdyaWREYXRhLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiZWRpdFJvd1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0YLQutGA0L7QtdGCINCw0LrRgtC40LLQvdGD0Y4g0YHRgtGA0L7QutGDINC00LvRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgbGV0IGdyaWREYXRhID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZ3JpZEFjdGl2ZVJvdyA9IHRoaXMucmVmc1snZGF0YS1ncmlkJ10uc3RhdGUuYWN0aXZlUm93LFxyXG4gICAgICAgICAgICBncmlkUm93ID0gZ3JpZERhdGFbZ3JpZEFjdGl2ZVJvd107XHJcblxyXG4gICAgICAgIC8vINC+0YLQutGA0L7QtdC8INC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QviDQtNC70Y8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiB0cnVlLCBncmlkUm93RXZlbnQ6ICdlZGl0JywgZ3JpZFJvd0RhdGE6IGdyaWRSb3d9KTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJhZGRSb3dcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQtNC+0LHQsNCy0LjRgiDQsiDRgdC+0YHRgtC+0Y/QvdC40LUg0L3QvtCy0YPRjiDRgdGC0YDQvtC60YNcclxuXHJcbiAgICAgICAgbGV0IGdyaWRDb2x1bW5zID0gdGhpcy5zdGF0ZS5ncmlkQ29uZmlnLFxyXG4gICAgICAgICAgICBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIG5ld1JvdyA9IG5ldyBPYmplY3QoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkQ29sdW1ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZmllbGQgPSBncmlkQ29sdW1uc1tpXS5pZDtcclxuICAgICAgICAgICAgbmV3Um93W2ZpZWxkXSA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV3Um93LmlkID0gJ05FVycgKyBNYXRoLnJhbmRvbSgpOyAvLyDQs9C10L3QtdGA0LjQvCDQvdC+0LLQvtC1INC40LRcclxuXHJcbiAgICAgICAgLy8g0L7RgtC60YDQvtC10Lwg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+INC00LvRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IHRydWUsIGdyaWRSb3dFdmVudDogJ2FkZCcsIGdyaWRSb3dEYXRhOiBuZXdSb3d9KTtcclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiY3JlYXRlR3JpZFJvd1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBzdHlsZSA9IHN0eWxlcy5ncmlkUm93LFxyXG4gICAgICAgICAgICByb3cgPSB0aGlzLnN0YXRlLmdyaWRSb3dEYXRhLFxyXG4gICAgICAgICAgICB2YWxpZGF0ZU1lc3NhZ2UgPSAnJyxcclxuICAgICAgICAgICAgbW9kYWxPYmplY3RzID0gWydidG5PaycsICdidG5DYW5jZWwnXSxcclxuICAgICAgICAgICAgYnV0dG9uT2tSZWFkT25seSA9IHZhbGlkYXRlTWVzc2FnZS5sZW5ndGggPiAwIHx8ICF0aGlzLnN0YXRlLmNoZWNrZWQ7XHJcblxyXG4gICAgICAgIGlmIChidXR0b25Pa1JlYWRPbmx5KSB7XHJcbiAgICAgICAgICAgIC8vINGD0LHQtdGA0LXQvCDQutC90L7Qv9C60YMg0J7QulxyXG4gICAgICAgICAgICBtb2RhbE9iamVjdHMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICghcm93KSByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsKTtcclxuXHJcbiAgICAgICAgbGV0IG5vbURhdGEgPSB0aGlzLnN0YXRlLmxpYnNbJ25vbWVuY2xhdHVyZSddLmZpbHRlcihmdW5jdGlvbihsaWIpICB7XHJcbiAgICAgICAgICAgIGlmICghbGliLmRvayB8fCBsaWIuZG9rID09PSBMSUJET0spIHJldHVybiBsaWI7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcIi5tb2RhbFBhZ2VcIn0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxPYmplY3RzOiBtb2RhbE9iamVjdHMsIFxyXG4gICAgICAgICAgICAgICAgcmVmOiBcIm1vZGFscGFnZS1ncmlkLXJvd1wiLCBcclxuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJSZWEgbGlzYW1pbmUgLyBwYXJhbmRhbWluZVwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtyZWY6IFwiZ3JpZC1yb3ctY29udGFpbmVyXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge3RpdGxlOiBcIlRlZW51c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5vbWlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwibm9tZW5jbGF0dXJlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG5vbURhdGEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5ub21pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiByb3cua29vZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcIm5vbWlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlRlZW51c2Uga29vZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVHcmlkUm93Q2hhbmdlfSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7dGl0bGU6IFwiS29ndXMgXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrb2d1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cua29ndXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImtvZ3VzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlR3JpZFJvd0lucHV0fSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7dGl0bGU6IFwiSGluZCBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImhpbmRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LmhpbmQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImhpbmRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVHcmlkUm93SW5wdXR9KVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHt0aXRsZTogXCJLYm0tdGE6IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2JtdGFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LmtibXRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwia2JtdGFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVHcmlkUm93Q2hhbmdlfSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7dGl0bGU6IFwiS2JtOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtibVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cua2JtLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwia2JtXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLmhhbmRsZUdyaWRSb3dJbnB1dH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NSb3d9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge3RpdGxlOiBcIlN1bW1hOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5zdW1tYSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlR3JpZFJvd0lucHV0fSlcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdmFsaWRhdGVNZXNzYWdlKSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICkpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImhhbmRsZUdyaWRSb3dDaGFuZ2VcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINC00LDQvdC90YvRhSDQvdCwINGE0L7RgNC80LVcclxuICAgICAgICBsZXQgcm93RGF0YSA9IE9iamVjdCh7fSwgdGhpcy5zdGF0ZS5ncmlkUm93RGF0YSk7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gcm93RGF0YVtuYW1lXSAmJiBuYW1lID09PSAnbm9taWQnKSB7XHJcbiAgICAgICAgICAgIC8vINC/0YDQvtC40LfQvtGI0LvQviDQuNC30LzQtdC90LXQvdC40LUg0YPRgdC70YPQs9C4LCDQvtCx0L3Rg9C70LjQvCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgICAgICAgIHJvd0RhdGFbJ2tvZ3VzJ10gPSAwO1xyXG4gICAgICAgICAgICByb3dEYXRhWydoaW5kJ10gPSAwO1xyXG4gICAgICAgICAgICByb3dEYXRhWydzdW1tYSddID0gMDtcclxuICAgICAgICAgICAgcm93RGF0YVsna2JtJ10gPSAwO1xyXG4gICAgICAgICAgICByb3dEYXRhWydrYm10YSddID0gMDtcclxuICAgICAgICAgICAgcm93RGF0YVsnbm9taWQnXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQuNGJ0LXQvCDQv9C+INGB0L/RgNCw0LLQvtGH0L3QuNC60YMg0L/QvtC70Y8g0LrQvtC0INC4INC90LDQuNC80LXQvdC+0LLQsNC90LjQtVxyXG5cclxuICAgICAgICBsZXQgbGliRGF0YSA9IHRoaXMuc3RhdGUubGlic1snbm9tZW5jbGF0dXJlJ107XHJcbiAgICAgICAgbGliRGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHJvdykgIHtcclxuICAgICAgICAgICAgaWYgKHJvdy5pZCA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcm93RGF0YVsna29vZCddID0gcm93Lmtvb2Q7XHJcbiAgICAgICAgICAgICAgICByb3dEYXRhWyduaW1ldHVzJ10gPSByb3cubmFtZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByb3dEYXRhW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0RhdGE6IHJvd0RhdGF9KTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRlR3JpZFJvdygpO1xyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJoYW5kbGVHcmlkUm93SW5wdXRcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIC8vINC/0LXRgNC10YHRh9C10YIg0YHRg9C80LxcclxuICAgICAgICBsZXQgcm93RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUuZ3JpZFJvd0RhdGEpO1xyXG4gICAgICAgIHJvd0RhdGFbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICByb3dEYXRhID0gdGhpcy5yZWNhbGNSb3dTdW1tKHJvd0RhdGEpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dEYXRhOiByb3dEYXRhfSk7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZUdyaWRSb3coKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJyZWNhbGNSb3dTdW1tXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZ3JpZFJvd0RhdGEpIHtcclxuICAgICAgICAvLyDQv9C10YDQtdGA0LDRgdGH0LXRgiDRgdGD0LzQvNGLINGB0YLRgNC+0LrQuCDQuCDRgNCw0YHRh9C10YIg0L3QsNC70L7Qs9CwXHJcbiAgICAgICAgZ3JpZFJvd0RhdGFbJ2tvZ3VzJ10gPSBOdW1iZXIoZ3JpZFJvd0RhdGEua29ndXMpO1xyXG4gICAgICAgIGdyaWRSb3dEYXRhWydoaW5kJ10gPSBOdW1iZXIoZ3JpZFJvd0RhdGEuaGluZCk7XHJcbiAgICAgICAgZ3JpZFJvd0RhdGFbJ2tibXRhJ10gPSBOdW1iZXIoZ3JpZFJvd0RhdGFbJ2tvZ3VzJ10pICogTnVtYmVyKGdyaWRSb3dEYXRhWydoaW5kJ10pO1xyXG4gICAgICAgIGdyaWRSb3dEYXRhWydrYm0nXSA9IE51bWJlcihncmlkUm93RGF0YVsna2JtdGEnXSAqIDAuMjApOyAvLyBAdG9kbyDQstGA0LzQtdC90L3QvlxyXG4gICAgICAgIGdyaWRSb3dEYXRhWydzdW1tYSddID0gTnVtYmVyKGdyaWRSb3dEYXRhWydrYm10YSddKSArIE51bWJlcihncmlkUm93RGF0YVsna2JtJ10pO1xyXG5cclxuICAgICAgICByZXR1cm4gZ3JpZFJvd0RhdGE7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwicmVjYWxjRG9jU3VtbWFcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihkb2NEYXRhKSB7XHJcbiAgICAgICAgbGV0IGdyaWREYXRhID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5zdGF0ZS5ncmlkRGF0YSk7XHJcblxyXG4gICAgICAgIGRvY0RhdGFbJ3N1bW1hJ10gPSAwO1xyXG4gICAgICAgIGRvY0RhdGFbJ2tibSddID0gMDtcclxuICAgICAgICBncmlkRGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHJvdykgIHtcclxuICAgICAgICAgICAgZG9jRGF0YVsnc3VtbWEnXSArPSBOdW1iZXIocm93WydzdW1tYSddKTtcclxuICAgICAgICAgICAgZG9jRGF0YVsna2JtJ10gKz0gTnVtYmVyKHJvd1sna2JtJ10pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkb2NEYXRhO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcInZhbGlkYXRlR3JpZFJvd1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIHdpbGwgY2hlY2sgdmFsdWVzIG9uIHRoZSBmb3JtIGFuZCByZXR1cm4gc3RyaW5nIHdpdGggd2FybmluZ1xyXG4gICAgICAgIGxldCB3YXJuaW5nID0gJycsXHJcbiAgICAgICAgICAgIGdyaWRSb3dEYXRhID0gdGhpcy5zdGF0ZS5ncmlkUm93RGF0YTtcclxuICAgICAgICAvLyDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDQv9GA0L7QstC10YDQutC4INGE0L7RgNC80Ysg0L3QsCDQstCw0LvQuNC00L3QvtGB0YLRjFxyXG4gICAgICAgIGlmICghZ3JpZFJvd0RhdGFbJ25vbWlkJ10pIHdhcm5pbmcgPSB3YXJuaW5nICsgJyDQutC+0LQg0YPRgdC70YPQs9C4JztcclxuICAgICAgICBpZiAoIWdyaWRSb3dEYXRhWydrb2d1cyddKSB3YXJuaW5nID0gd2FybmluZyArICcg0LrQvtC7LdCy0L4nO1xyXG4gICAgICAgIGlmICghZ3JpZFJvd0RhdGFbJ2hpbmQnXSkgd2FybmluZyA9IHdhcm5pbmcgKyAnINGG0LXQvdCwJztcclxuXHJcbiAgICAgICAgaWYgKHdhcm5pbmcubGVuZ3RoID4gMikge1xyXG4gICAgICAgICAgICAvLyDQtdGB0YLRjCDQv9GA0L7QsdC70LXQvNGLXHJcbiAgICAgICAgICAgIHdhcm5pbmcgPSAn0J7RgtGB0YPRgtGB0LLRg9GO0YIg0LTQsNC90L3Ri9C1OicgKyB3YXJuaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjaGVja2VkOiB0cnVlLCB3YXJuaW5nOiB3YXJuaW5nfSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiY3JlYXRlTGlic1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINCy0LXRgNC90LXRgiDQvtCx0YrQtdC60YIg0LHQuNCx0LvQuNC+0YLQtdC6INC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgICAgIGxldCBsaWJzID0ge307XHJcbiAgICAgICAgTElCUkFSSUVTLmZvckVhY2goZnVuY3Rpb24obGliKSAge1xyXG4gICAgICAgICAgICBsaWJzW2xpYl0gPSBbXTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBsaWJzO1xyXG4gICAgfX0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbkFydmUuUHJvcFR5cGVzID0ge1xyXG4gICAgZG9jRGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgYnBtOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICBlZGl0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgc2hvd01lc3NhZ2VCb3g6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBncmlkRGF0YTogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgcmVsYXRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICBncmlkQ29uZmlnOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICBncmlkUm93RWRpdDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBncmlkUm93RXZlbnQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBncmlkUm93RGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIGxpYnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBjaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIHdhcm5pbmc6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcclxuXHJcbn1cclxuXHJcblxyXG4vKlxyXG4gQXJ2ZS5kZWZhdWx0UHJvcHMgPSB7XHJcbiBkaXNhYmxlZDogZmFsc2UsXHJcbiBzaG93OiB0cnVlXHJcbiB9O1xyXG4gKi9cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFydmU7XHJcblxyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2NzL2FydmUvYXJ2ZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRvY1Jvdzoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmx1ZSdcbiAgICB9LFxuICAgIGRvY0NvbHVtbjoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgeWVsbG93JyxcbiAgICAgICAgd2lkdGg6ICc1MCUnXG4gICAgfSxcbiAgICBkb2M6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJyb3duJ1xuICAgIH0sXG4gICAgZ3JpZFJvdzoge1xuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICBtYXJnaW46ICcxMCUgMzAlIDEwJSAzMCUnLFxuICAgICAgICB3aWR0aDogJ2F1dG8nLFxuICAgICAgICBvcGFjaXR5OiAnMScsXG4gICAgICAgIHRvcDogJzEwMHB4J1xuICAgIH1cblxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLnN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRvY1R5cGVJZCkge1xuICAgIC8vINCy0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINGC0LjQv9CwINC00L7QutGD0LzQtdC90YLQsCDQstC10YDQvdC10YIg0LrQvtC80L/QvtC90LXQvdGCINC00L7QutGD0LzQtdC90YLQsFxuXG4gICAgY29uc29sZS5sb2coJ3JldHVybkRvY0NvbXBvbmVudDonICsgZG9jVHlwZUlkKTtcbiAgICB2YXIgY29tcG9uZW50ID0ge307XG5cbiAgICBzd2l0Y2ggKGRvY1R5cGVJZCkge1xuICAgICAgICBjYXNlICdQQUxLJzpcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Zyb250ZW5kL2RvY3MvcGFsa19vcGVyLmpzeCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb21wb25lbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL2FydmUvYXJ2ZS5qc3gnKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9taWRkbGV3YXJlL3JldHVybkRvY0NvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuY29uc3QgRm9ybSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZm9ybS5qcycpO1xyXG5jb25zdCBQYWdlTGFiZWwgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3BhZ2VfbGFiZWwnKTtcclxuXHJcbnZhciBwYWdlcyA9IFsnUGFnZTEnLCAnUGFnZTInXTtcclxuXHJcbmNvbnN0IFBhbGsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiUGFsa1wiLFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIHtwYWdlczogcGFnZXN9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiIFBhbGsgXCIpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfX0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYWxrO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy9wYWxrX29wZXIuanN4XG4vLyBtb2R1bGUgaWQgPSA2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4vcGFnZV9sYWJlbCcpO1xuXG52YXIgRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ0Zvcm0nLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHZhciBwYWdlcyA9IFt7IHBhZ2VOYW1lOiAnUGFnZScgfV07XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnBhZ2VzKSB7XG4gICAgICAgICAgICBwYWdlcyA9IHRoaXMucHJvcHMucGFnZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhZ2VzOiB0aGlzLnByb3BzLnBhZ2VzXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgcGFnZXMgPSB0aGlzLnN0YXRlLnBhZ2VzO1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBjbGFzc05hbWU6ICdjb250YWluZXInIH0sIHBhZ2VzLm1hcChmdW5jdGlvbiAocGFnZSwgaWR4KSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChQYWdlTGFiZWwsIHsga2V5OiBpZHgsIHBhZ2VJZHg6IGlkeCB9LCBwYWdlKTtcbiAgICAgICAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgY2xhc3NOYW1lOiAncGFnZScgfSwgUmVhY3QuY3JlYXRlRWxlbWVudCgnZm9ybScsIG51bGwsIHRoaXMucHJvcHMuY2hpbGRyZW4pKSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbnZhciBQYWdlTGFiZWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdQYWdlTGFiZWwnLFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvLyAgICAgIGNvbnNvbGUubG9nKCdwYWdlIGxhYmVsIGNvbXBvbmVudFdpbGxNb3VudCcpXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHsgZGlzYWJsZWQ6IG5ld1ZhbHVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUNsaWNrKHBhZ2UpIHtcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0L3QsCDRgdC+0LHRi9GC0LjQtSDQutC70LjQuiwg0L/QvtC00LPRgNGD0LbQsNC10Lwg0YHQstGP0LfQsNC90L3Ri9C5INC00L7QutGD0LzQtdC90YJcbiAgICAgICAgLy8gICAgICAgYWxlcnQoJ2NsaWNrOicgKyBwYWdlTmFtZSk7XG4gICAgICAgIC8vIGRvY1R5cGVJZDogZG9jLmRvY190eXBlLCBkb2NJZDpkb2MuaWQsIHBhZ2VOYW1lOidMYXVzZW5kIGlkOicgKyBkb2MuaWRcblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhZ2UgZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYWdlLmRvY0lkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlQ2xpY2sgcGFnZS5kb2NUeXBlSWQgJXMsIHBhZ2UuZG9jSWQgJW4nKTtcbiAgICAgICAgICAgIHZhciB1cmwgPSBcIi9kb2N1bWVudC9cIiArIHBhZ2UuZG9jVHlwZUlkICsgcGFnZS5kb2NJZDtcbiAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSAncGFnZUxhYmVsJztcblxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgdGhpcy5wcm9wcy5jaGlsZHJlbiksIGRpc2FibGVkOiB0aGlzLnN0YXRlLmRpc2FibGVkIH0sIHRoaXMucHJvcHMuY2hpbGRyZW4ucGFnZU5hbWUsICcgJyk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZUxhYmVsO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9wYWdlX2xhYmVsLmpzXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0dEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=
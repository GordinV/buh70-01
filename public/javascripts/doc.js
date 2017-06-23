var doc =
webpackJsonp_name_([1],{

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
	var Doc = __webpack_require__(65)(storeData.docTypeId);

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

	var ____Class0=React.PureComponent;for(var ____Class0____Key in ____Class0){if(____Class0.hasOwnProperty(____Class0____Key)){Arve[____Class0____Key]=____Class0[____Class0____Key];}}var ____SuperProtoOf____Class0=____Class0===null?null:____Class0.prototype;Arve.prototype=Object.create(____SuperProtoOf____Class0);Arve.prototype.constructor=Arve;Arve.__superConstructor__=____Class0;
	    function Arve(props) {
	        ____Class0.call(this,props);
	        this.state = {
	            docData: this.props.data.row,
	            bpm: this.props.bpm,
	            edited: this.props.data.row.id == 0,
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

	        let data = flux.stores.docStore.data;
	        data[inputName] = inputValue;
	        // задать новое значение поля
	        flux.doAction('dataChange', data);

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

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (docTypeId) {
	    // взависимости от типа документа вернет компонент документа

	    console.log('returnDocComponent:' + docTypeId);
	    var component = {};

	    switch (docTypeId) {
	        case 'VORDER':
	            component = __webpack_require__(66);
	            break;
	        case 'PALK':
	            component = __webpack_require__(80);
	            break;
	        default:
	            component = __webpack_require__(2);
	    }
	    return component;
	};

/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(3),
	    flux = __webpack_require__(4);

	const Form = __webpack_require__(67),
	    PageLabel = __webpack_require__(68),
	    InputText = __webpack_require__(69),
	    InputDate = __webpack_require__(70),
	    InputNumber = __webpack_require__(72),
	    Toolbar = __webpack_require__(73),
	    DocCommon = __webpack_require__(75),
	    Select = __webpack_require__(49),
	    TextArea = __webpack_require__(76),
	    DataGrid = __webpack_require__(77),
	    GridRow = __webpack_require__(79);

	var docStore = __webpack_require__(64),
	    relatedDocuments = __webpack_require__(50),
	    validateForm = __webpack_require__(60);

	var now = new Date();

	const Vorder = React.createClass({displayName: "Vorder",
	    pages:  [{pageName: 'Väljamakse kassaorder'}],
	    requiredFields:  [
	        {name: 'kpv', type: 'D', min: now.setFullYear(now.getFullYear() - 1), max: now.setFullYear(now.getFullYear() + 1)},
	        {name: 'asutusid', type: 'I'},
	        {name: 'nimi', type: 'C'},
	        {name: 'summa', type: 'N'}
	    ],
	/*
	    mixins: [relatedDocuments, validateForm],
	*/

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

	    componentDidMount: function () {
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
	                let summa = newValue.reduce(function(sum, row)  {return sum + Number(row.summa);},0), // сумма документа
	                    docData = self.state.docData;

	                docData.summa = summa;
	                console.log('new summa:', summa);
	                self.setState({gridData: newValue, docData: docData});
	            }
	        });

	        // отслеживаем режим редактирования
	        docStore.on('change:data', function (newValue, previousValue) {
	            console.log('vorder onChange ', newValue);
	            if (JSON.stringify(newValue) !== JSON.stringify(previousValue)) {
	//                self.setState({edited: newValue});
	                // отслеживаем изменения на поле asutusid и тогда запрос на номера счетов с параметрами ИД учреждения и номера счета
	//                console.log('vorder onChange ', newValue);

	                var data = newValue;

	                if (!newValue.asutusid ) {
	                    // стираем ссылку на счет
	                    data.arvid = null;
	                    flux.doAction('dataChange',data);
	                    this.setState({docData: data});
	                }
	                // установим новый фильтр
	                var arveLibParams = [data.asutusid, data.arvid];
	                flux.doAction('setLibsFilter', 'arved',arveLibParams);

	            }
	        });

	        // формируем зависимости
	        this.relatedDocuments();


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

	        console.log('vorder pages', this.pages);
	        return (
	            React.createElement(Form, {pages: this.pages, ref: "form", onSubmit: this.onSubmit, style: {display: 'table'}}, 
	                React.createElement(Toolbar, {validator: this.validateForm}), 
	                React.createElement("div", {className: "div-doc"}, 
	                    React.createElement(DocCommon, {data: data}), 
	                    React.createElement("div", {className: "fieldset"}, 
	                        React.createElement("ul", null, 
	                            React.createElement("li", null, 
	                                React.createElement(InputText, {className: "ui-c2", 
	                                           title: "Number", 
	                                           name: "number", 
	                                           value: data.number, 
	                                           disabled: "false", 
	                                           readOnly: true})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputDate, {className: "ui-c2", title: "Kuupäev ", 
	                                           name: "kpv", 
	                                           value: data.kpv, 
	                                           ref: "kpv", 
	                                           placeholder: "Kuupäev", 
	                                           readOnly: !isEditeMode})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(Select, {className: "ui-c2", title: "Kassa", name: "kassa_id", libs: "aa", 
	                                        value: data.kassa_id, 
	                                        collId: "id", 
	                                        defaultValue: data.kassa, 
	                                        placeholder: "Kassa", 
	                                        ref: "kassa_id", 
	                                        readOnly: !isEditeMode})
	                            ), 

	                            React.createElement("li", null, 
	                                React.createElement(Select, {className: "ui-c2", title: "Partner", 
	                                        name: "asutusid", 
	                                        libs: "asutused", 
	                                        value: data.asutusid, 
	                                        collId: "id", 
	                                        defaultValue: data.asutus, 
	                                        placeholder: "Partner", 
	                                        ref: "asutusid", 
	                                        readOnly: !isEditeMode})
	                                ), 
	                            React.createElement("li", null, 
	                                React.createElement(Select, {className: "ui-c2", 
	                                        title: "Arve nr.", 
	                                        name: "arvid", 
	                                        libs: "arvedSisse", 
	                                        value: data.arvid, 
	                                        collId: "id", 
	                                        defaultValue: data.arvnr, 
	                                        placeholder: "Arve nr.", 
	                                        ref: "arvid", 
	                                        btnDelete: true, 
	                                        readOnly: !isEditeMode})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputText, {className: "ui-c2", 
	                                           title: "Dokument ", 
	                                           name: "dokument", 
	                                           value: data.dokument, 
	                                           placeholder: "Dokument", 
	                                           ref: "dokument", readOnly: !isEditeMode})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(TextArea, {className: "ui-c2", 
	                                          title: "Nimi", 
	                                          name: "nimi", 
	                                          placeholder: "Nimi", 
	                                          ref: "nimi", 
	                                          value: data.aadress, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, 
	                                React.createElement(TextArea, {className: "ui-c2", 
	                                          title: "Aadress", 
	                                          name: "aadress", 
	                                          placeholder: "Aadress", 
	                                          ref: "aadress", 
	                                          key: "textAadress", 
	                                          value: data.aadress, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, 
	                                React.createElement(TextArea, {className: "ui-c2", title: "Alus", name: "alus", placeholder: "Alus", 
	                                          ref: "alus", 
	                                          key: "textAlus", 
	                                          value: data.alus, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, 
	                                React.createElement(DataGrid, {source: "details", gridData: gridData, gridColumns: gridColumns, 
	                                          handleGridRow: this.handleGridRow, 
	                                          readOnly: !isEditeMode, ref: "DataGrid"})), 
	                            React.createElement("li", null, 
	                                React.createElement(InputText, {className: "ui-c2", title: "Summa: ", name: "summa", placeholder: "Summa", 
	                                           ref: "summa", 
	                                           value: data.summa, disabled: "true", 
	                                           pattern: "^[0-9]+(\\.[0-9]{1,4})?$"})), 
	                            /* патерн для цифр с 4 знаками после точки*/
	                            React.createElement("li", null, 
	                                React.createElement(TextArea, {className: "ui-c2", title: "Märkused", name: "muud", placeholder: "Märkused", 
	                                          ref: "muud", 
	                                          value: data.muud, readOnly: !isEditeMode, width: "85%"}))
	                        )
	                    ), 

	                    this.state.gridRowEdit ?
	                        React.createElement(GridRow, {modalPageClick: this.modalPageClick, 
	                                 gridEvent: this.state.gridRowEvent, 
	                                 gridRowData: this.state.gridRowData}) : null

	                )
	            )
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
	//        console.log('previos state gridData, docData', gridData,  docData);

	        if (btnEvent == 'Ok') {
	//            console.log(' modalPageClick data, gridRowId, gridRow', data, gridRowId, gridRow);
	            if (gridRowId < 0) {
	                // новая запись
	                // формируем пустую строку
	//                gridRow ={};
	                gridRow['id'] = 'NEW' + Math.random();  // генерируем новое ИД
	                gridColumns.forEach(function(field)  {return gridRow[field] = null;}); // создаем поля в объекте
	            }
	            // сохраним данные в хранилище
	            data.forEach(function(field)  {
	                gridRow[field.name] = field.value
	                console.log('сохраним данные в хранилище, gridRow', gridRow);
	            });

	            // заполним поля nimetus
	            var libs = flux.stores.docStore.libs,
	                nomLib = libs.filter(function(data)  {
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

	        var docSumma = gridData.reduce(function(sum, row)  {return sum + Number(row.summa);}, 0); // сумма счета

	        docData.summa = docSumma;

	        this.refs['DataGrid'].replaceState({gridData: gridData});
	        this.setState({gridRowEdit: false, docData: docData});

	    },

	});

	module.exports = Vorder;


/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3),
	    flux = __webpack_require__(4);

	var PageLabel = __webpack_require__(68);

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

/***/ 68:
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

/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3),
	    flux = __webpack_require__(4);

	const Input = React.createClass({displayName: "Input",
	    getInitialState: function () {
	        return {
	            value: this.props.value,
	            readOnly: this.props.readOnly || false,
	            disabled: this.props.disabled || true,
	            valid: true
	        };
	    },
	    getDefaultProps: function () {
	        return {
	            name: 'defaulName',
	            className: 'doc-input',
	            placeholder: 'defaulName',
	            title: '',
	            width: 'auto',
	            pattern: ''
	        }
	    },
	    componentDidMount: function () {
	// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных

	        flux.stores.docStore.on('change:docId',  function(newValue, previousValue) {
	            if (newValue !== previousValue) {
	                // отслеживаем создание нового документа
	                var data = flux.stores.docStore.data,
	                    value = data[this.props.name];
	                if (newValue == 0) {
	                    // совый документ
	                    this.setState({value: 0});
	                } else {
	                    this.setState({value: value});
	                }
	            }
	        }.bind(this));

	        flux.stores.docStore.on('change:edited', function(newValue, previousValue) {
	            //           console.log('on change:edited:' + newValue);
	            if (newValue !== previousValue) {
	                this.setState({readOnly: !newValue});
	            }
	        }.bind(this));

	        flux.stores.docStore.on('change:data', function(newValue, previousValue) {
	            // слушуем изменения данных;
	//          console.log('input-text on change data:', newValue, previousValue);
	            if (newValue !== previousValue) {
	                var data = newValue,
	                    fieldValue = data[self.props.name];
	                if (data[self.props.name]) {
	                    this.setState({value: fieldValue});
	                }
	            }
	        }.bind(this));

	    },

	    componentWillReceiveProps: function (nextProps) {
	        this.setState({value: nextProps.value})
	    },

	    shouldComponentUpdate: function (nextProps, nextState) {
	        // изменения будут отражаться только в случае если такие есть

	        let returnValue = true;
	        if (this.state) {
	            returnValue = (nextState.value !== this.state.value ||
	            nextState.readOnly !== this.state.readOnly ||
	            nextState.disabled !== this.state.disabled);
	        }
	        return returnValue;
	    },

	    onChange: function (e) {
	        var fieldValue = e.target.value,
	            data = flux.stores.docStore.data,
	            isPatterValid = true;

	        if (this.props.pattern && fieldValue.charAt(fieldValue.length - 1) !== '.') {

	            // проводим проверку на соответствие шаблону
	            var result = fieldValue.match(this.props.pattern, '');

	            if (!result) {
	                //              console.log('Pattern vale:' + fieldValue);
	                fieldValue = data[this.props.name];
	            }
	        }
	        // только если соответствует паттерну
	        this.setState({value: fieldValue});
	        //       console.log('onChange fieldValue finish', this.props.name, this.state.value);

	        data[this.props.name] = fieldValue;
	        // задать новое значение поля
	        flux.doAction('dataChange', data);

	        /*
	         // отдадим обработчику, если задан
	         if (this.props.onChange) {
	         // смотрим к чему привязан селект и отдаим его наверх
	         this.props.onChange(e, this.props.name); // в случае если задан обработчик на верхнем уровне, отдадим обработку туда
	         }
	         */


	    },

	    propTypes: {
	        name: React.PropTypes.string.isRequired
	    },

	    render: function () {
	        var inputClassName = this.props.className || '' + 'doc-input',
	            inputReadOnly = this.state.readOnly || false,
	            inputDisabled = this.state.disabled,
	            inputPlaceHolder = this.props.placeholder || this.props.name,
	            myStyle = {width: 'auto'};

	        if (inputReadOnly) {
	            inputClassName = inputClassName + ' doc-input-readonly';
	        }
	        if (this.props.width) {
	            myStyle.width = this.props.width
	        }

	        if (inputDisabled == 'true') {
	            return (
	                React.createElement("div", {className: "form-widget"}, 
	                    React.createElement("label", {htmlFor: this.props.name, 
	                           className: "form-widget-label" + inputClassName}, React.createElement("span", null, this.props.title)
	                    ), 
	                    React.createElement("input", {type: "text", 
	                           style: myStyle, 
	                           className: inputClassName, 
	                           name: this.props.name, 
	                           id: this.props.name, 
	                           value: this.state.value, 
	                           readOnly: inputReadOnly, 
	                           title: this.props.title, 
	                           pattern: this.props.pattern, 
	                           placeholder: inputPlaceHolder, 
	                           onChange: this.onChange, 
	                           disabled: true}
	                    )

	                ))
	        } else {
	            return (
	                React.createElement("div", {className: "form-widget"}, 
	                    React.createElement("label", null, this.props.title, 
	                        React.createElement("input", {type: "text", 
	                               className: inputClassName, 
	                               name: this.props.name, 
	                               value: this.state.value, 
	                               readOnly: inputReadOnly, 
	                               title: this.props.title, 
	                               pattern: this.props.pattern, 
	                               placeholder: inputPlaceHolder, 
	                               onChange: this.onChange}
	                        )
	                    )
	                ))
	        }
	    }
	});

	module.exports = Input;

/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(3),
	    ComponentInputDate = __webpack_require__(71),
	    flux = __webpack_require__(4);

	const InputDate = React.createClass({displayName: "InputDate",
	    getInitialState: function () {
	        return {
	            value: this.props.value,
	            readOnly: true,
	            disabled: this.props.disabled || true,
	            valid: true
	        };
	    },

	    getDefaultProps: function () {

	        var date = new Date(),
	            year = date.getFullYear(),
	            month = date.getMonth(),
	            day = date.getDate(),
	            maxDate = new Date(year + 1, month, day),
	            minDate = new Date(year - 1, month, day);

	        return {
	            bindData: true,
	            min: minDate,
	            max: maxDate
	        };
	    },

	    componentWillReceiveProps: function (nextProps) {
	        this.setState({value: nextProps.value})
	    },

	    componentDidMount:function() {
	        // событие на изменение режима редактирования
	        flux.stores.docStore.on('change:edited', function(newValue, previousValue)  {
	            if (newValue !== previousValue) {
	                this.setState({readOnly: !newValue});
	            }
	        }.bind(this));
	    },
	    /*
	     componentWillMount: function() {
	     // создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	     var self = this;
	     //        console.log('componentWillMount' + this.props.name);
	     /!*
	     flux.stores.docStore.on('change:docId', function(newValue, previousValue) {
	     if (newValue !== previousValue) {
	     // отслеживаем создание нового документа
	     /!*
	     var data = flux.stores.docStore.data,
	     value = data[self.props.name];

	     if (newValue == 0) {
	     // новый документ
	     self.setState({value:0});
	     } else {
	     self.setState({value:value});
	     }
	     *!/
	     }
	     });
	     *!/

	     flux.stores.docStore.on('change:edited', function(newValue, previousValue) {
	     //           console.log('on change:edited:' + newValue);
	     if (newValue !== previousValue) {
	     self.setState({readOnly: !newValue});
	     }
	     });

	     /!*
	     flux.stores.docStore.on('change:data', function(newValue, previousValue) {
	     console.log('on change:data:' + newValue);
	     if (newValue !== previousValue) {

	     var data = newValue,
	     fieldValue = data[self.props.name];

	     self.setState({value: fieldValue});
	     }
	     });

	     *!/

	     },
	     */
	    // обязательные параметры
	    propTypes: {
	        name: React.PropTypes.string.isRequired
	     },


	    onChange: function (fieldValue) {
	        let data = flux.stores.docStore.data;
	        this.setState({value: fieldValue});
	        data[this.props.name] = fieldValue;

	        // задать новое значение поля
	        flux.doAction('dataChange', data);
	    },

	    render: function () {
	        let inputClassName = this.props.className || 'doc-input',
	            inputReadOnly = this.state.readOnly || false,
	            inputDisabled = this.state.disabled == 'true' ? true : false,
	            inputPlaceHolder = this.props.placeholder || this.props.name;

	        if (inputReadOnly) {
	            inputClassName = inputClassName + ' doc-input-readonly';
	        }
	        return (
	            React.createElement("div", {className: "form-widget"}, 
	                React.createElement("label", {htmlFor: this.props.name}, 
	                    this.props.title
	                ), 

	                React.createElement(ComponentInputDate, {
	                    className: inputClassName, 
	                    name: this.props.name, 
	                    value: this.state.value, 
	                    readOnly: inputReadOnly, 
	                    title: this.props.title, 
	                    pattern: this.props.pattern, 
	                    placeholder: inputPlaceHolder, 
	                    onChange: this.onChange, 
	                    disabled: inputDisabled}
	                )
	            ))
	    }
	});

	module.exports = InputDate;

/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(3);
	//    flux = require('fluxify');

	const InputDate = React.createClass({displayName: "InputDate",
	    getInitialState:function() {
	        return {
	            value: this.props.value
	        };
	    },

	    getDefaultProps:function () {
	        let date = new Date(),
	            year = date.getFullYear(),
	            month = date.getMonth(),
	            day = date.getDate(),
	            maxDate = new Date(year + 1, month, day),
	            refId = 'InputDate',
	            minDate = new Date(year - 5, month, day);

	        return {
	            bindData: true,
	            min: minDate,
	            max: maxDate,
	            readOnly: false,
	            disabled: false
	        };
	    },

	    componentWillReceiveProps:function(nextProps) {
	        this.setState({value: nextProps.value})
	    },


	    onChange:function(e) {
	        let fieldValue = e.target.value,
	            validation = this.validate(fieldValue);

	        if (fieldValue == null) {
	            // если значение нул, то пусть будет nul
	            validation = true;
	        }

	        if (validation ) {
	            this.setState({value: fieldValue});

	            if (this.props.onChange) {
	                // если задан обработчик, вернем его
	                this.props.onChange(fieldValue);
	            }
	        }

	    },

	    propTypes: {
	        name: React.PropTypes.string.isRequired
	    },

	    render:function() {
	        let inputClassName = this.props.className || 'doc-input',
	            inputPlaceHolder = this.props.name;

	        if (this.props.readOnly) {
	            inputClassName = inputClassName + ' doc-input-readonly';
	        }
	        return React.createElement("input", {type: "date", 
	                      className: inputClassName, 
	                      name: this.props.name, 
	                      ref: this.props.refId, 
	                      value: this.state.value, 
	                      readOnly: this.props.readOnly, 
	                      title: this.props.title, 
	                      pattern: this.props.pattern, 
	                      placeholder: inputPlaceHolder, 
	                      min: this.props.min, 
	                      max: this.props.max, 
	                      onChange: this.onChange, 
	                      disabled: this.props.disabled}
	        )
	    },

	    validate:function(value) {
	        let result = true;

	        // проверка на мин , мах
	        if (this.props.min && this.props.max && value) {
	            let dateValue = new Date(value);
	            result = (dateValue > this.props.min && dateValue < this.props.max);
	        }

	        return result;
	    }

	});

	module.exports = InputDate;

/***/ },

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4);

	const Input = React.createClass({displayName: "Input",
	    getInitialState: function () {
	        return {
	            value: this.props.value, 
	            readOnly: this.props.readOnly || false, 
	            disabled: this.props.disabled || true,
	            valid: true
	        };
	    },

	    getDefaultProps:function () {
	        return {
	            bindData: true,
	            min:-999999999,
	            max: 999999999
	        };
	    },

	    componentDidMount:function() {
	        flux.stores.docStore.on('change:docId', function (newValue, previousValue) {
	            if (newValue !== previousValue) {
	                let data = flux.stores.docStore.data,
	                    value = data[this.props.name];
	                if (newValue == 0) {
	                    // совый документ
	                    this.setState({value: 0});
	                } else {
	                    this.setState({value: value});
	                }
	            }
	        });
	        flux.stores.docStore.on('change:edited', function (newValue, previousValue) {
	            if (newValue !== previousValue) {
	                this.setState({readOnly: !newValue, disabled: !newValue});
	            }
	        });
	        flux.stores.docStore.on('change:data', function (newValue, previousValue) {
	            if (newValue !== previousValue) {

	                let data = newValue,
	                    fieldValue = data[this.props.name];

	                this.setState({value: fieldValue});
	            }
	        });

	    },

	    shouldComponentUpdate:function (nextProps, nextState) {
	        // изменения будут отражаться только в случае если такие есть
	        var returnvalue = true;
	        
	        if (this.state) {
	            var returnvalue = (nextState.value !== this.state.value ||
	            nextState.readOnly !== this.state.readOnly ||
	            nextState.disabled !== this.state.disabled);
	        }
	        return returnvalue;

	    },

	    onChange:function (e) {
	        var fieldValue = Number(e.target.value);

	        if (fieldValue >= Number(this.props.min) || fieldValue <= Number(this.props.max)) {
	            // заданное ограничение не работает при ручном вводе сумм, отработаем его
	            this.setState({value: fieldValue});

	            if (this.props.bindData) {
	                // приявязка к данным
	                data = flux.stores.docStore.data;
	                // получить значение
	                data[this.props.name] = fieldValue;
	                // задать новое значение поля
	                flux.doAction('dataChange', data);
	            }

	            if (this.props.onChange) {
	                // смотрим к чему привязан селект и отдаим его наверх
	                this.props.onChange(e, this.props.name); // в случае если задан обработчик на верхнем уровне, отдадим обработку туда
	            }
	        }
	    },

	    onBlur:function() {
	        // если такой метод передан сверху, то вернет его обратно
	        if (this.props.onBlur) {
	            this.props.onBlur(this.state.value, this.props.name);
	        }
	    },

	    render:function () {
	        var inputClassName = this.props.className || '' + 'doc-input',
	            inputReadOnly = this.state.readOnly || false,
	            inputDisabled = this.state.disabled || 'false',
	            inputPlaceHolder = this.props.placeholder || this.props.name,
	            inputMinValue = this.props.min || -999999999,
	            inputMaxValue = this.props.max || 999999999;

	        if (inputReadOnly) {
	            inputClassName = inputClassName + ' doc-input-readonly';
	        }

	        if (inputDisabled == 'true') {
	            return (
	                React.createElement("div", {className: "form-widget"}, 
	                    React.createElement("label", {htmlFor: this.props.name, 
	                           className: "form-widget-label"}, React.createElement("span", null, this.props.title)
	                    ), 
	                    React.createElement("input", {type: "number", 
	                           className: inputClassName, 
	                           name: this.props.name, 
	                           value: this.state.value, 
	                           title: this.props.title, 
	                           placeholder: inputPlaceHolder, 
	                           pattern: "\\d+(\\.\\d{2})?", 
	                           disabled: true}
	                    )

	                ))

	        } else {

	            return (
	                React.createElement("div", {className: "form-widget"}, 
	                    React.createElement("label", {
	                        htmlFor: this.props.name}, 
	                        React.createElement("span", null, this.props.title)
	                    ), 
	                    React.createElement("input", {type: "number", 
	                           className: inputClassName, 
	                           name: this.props.name, 
	                           value: this.state.value, 
	                           readOnly: inputReadOnly, 
	                           title: this.props.title, 
	                           placeholder: inputPlaceHolder, 
	                           min: inputMinValue, 
	                           max: inputMaxValue, 
	                           step: "0.01", 
	                           pattern: "\\d+(\\.\\d{2})?", 
	                           onChange: this.onChange, 
	                           onBlur: this.onBlur}
	                    )
	                ))
	        }

	    },

	    propTypes: {
	        name: React.PropTypes.string.isRequired
	    },
	});
	//                            pattern={this.props.pattern}

	module.exports = Input;

/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const DOCUMENT_CLOSED_STATUS = 2;

	const React = __webpack_require__(3),
	    DocButton = __webpack_require__(74),
	    flux = __webpack_require__(4);

	var Toolbar = React.createClass({displayName: "Toolbar",
	    getInitialState: function () {
	        return {
	            warning: false, warningMessage: '', editMode: false,
	            taskList: this.props.taskList ? this.props.taskList : this.getDefaultTask()
	        }
	    },

	    componentWillMount: function () {
	// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	        var self = this;

	        flux.stores.docStore.on('change:saved', function (newValue, previousValue) {
	            if (newValue !== previousValue) {
	                // режим изменился, меняем состояние
	                self.setState({editMode: !newValue});
	            }
	        });

	    },

	    handleSelectTask: function (e) {
	        // метод вызывается при выборе задачи
	        var taskValue = e.target.value;
	    },

	    handleButtonTask: function () {
	        // метод вызывается при выборе задачи
	        // найдем актуальную задачу

	        let actualTask = this.state.taskList.filter(function(task) {
	                if (task.actualStep) {
	                    return task;
	                }
	            }),
	            task = actualTask.map(function(task)  {
	                return task.action
	            }); // оставим только название процедуры

	        flux.doAction('executeTask', task);
	    },

	    handleEventButtonAddClick:function() {
	        // обработчик для кнопки Add
	            // отправим извещение наверх
	//        this.props.onClick(this.name);
	            flux.doAction( 'docIdChange', 0 );
	            flux.doAction( 'editedChange', true );
	            flux.doAction( 'savedChange', false );
	        },

	    handleEventButtonEditClick:function() {
	        // обработчик для кнопки Edit
	        // переводим документ в режим редактирования, сохранен = false
	        flux.doAction( 'editedChange', true );
	        flux.doAction( 'savedChange', false );

	    },

	    handleEventButtonSaveClick:function() {
	        // обработчик для кнопки Save
	        // валидатор

	        let isValid = !this.validator();

	        if (isValid) {
	            // если прошли валидацию, то сохранеям
	            flux.doAction( 'saveData');
	        }
	    },

	    render: function () {
	        let editeMode = this.state.editMode,
	            documentStatus = this.props.documentStatus,
	            isClosedStatus = documentStatus == DOCUMENT_CLOSED_STATUS ? true : false,
	            taskWidget = this.generateTaskWidget(),
	            tasks = this.state.taskList.map(function(task)  {
	                return task.action
	            });

	        return (
	            React.createElement("div", null, 
	                React.createElement("div", {className: "doc-toolbar-warning"}, 
	                    this.state.warning ? React.createElement("span", null, this.state.warningMessage) : null
	                ), 
	                React.createElement("div", {className: "doc-toolbar", style: {float:"right"}}, 
	                    isClosedStatus ? null : React.createElement(DocButton, {
	                        value: "Add", 
	                        className: "doc-toolbar", 
	                        enabled: this.state.editMode, 
	                        onClick: this.handleEventButtonAddClick}), 
	                    isClosedStatus ? null : React.createElement(DocButton, {
	                        value: "Edit", 
	                        enabled: this.state.editMode, 
	                        onClick: this.handleEventButtonEditClick, 
	                        className: "doc-toolbar"}), 
	                    isClosedStatus ? null : React.createElement(DocButton, {
	                            className: "doc-toolbar", 
	                            value: "Save", 
	                            enabled: !this.state.editMode, 
	                            onClick: this.handleEventButtonSaveClick}), 
	                    editeMode && tasks.length > 0 ? null : taskWidget
	                )
	            )
	        );
	    },

	    getDefaultTask: function () {
	        return [{step: 0, name: 'Start', action: 'start', status: 'opened'}]

	    },

	    generateTaskWidget: function () {
	        // вернет виджет задач

	        if (!this.state.taskList) {
	            this.setState({taskList: this.getDefaultTask()});
	        }

	        let tasks = this.state.taskList.filter(function(task)  {

	                if (task.status === 'opened') {
	                    return task;
	                }
	            }),

	            options,
	            taskWidget = null;

	        if (tasks.length > 1) {
	            // формируем список задач
	            options = tasks.map(function(task)  {
	                return React.createElement("option", {value: 0, key: Math.random()}, " ", task.name, " ")
	            });

	            taskWidget = React.createElement("select", {className: "ui-c2", onChange: this.handleSelectTask}, options, " ")
	        }

	        if (tasks.length == 1) {
	            var taskName = tasks[0].name;
	            // кнопка с задачей
	            taskWidget = React.createElement("input", {type: "button", className: "ui-c2", onClick: this.handleButtonTask, value: taskName})
	        }
	        return taskWidget;
	    },


	    validator: function () {
	        let warning = '';

	        if (this.props.validator) {
	            let warningMessage = this.props.validator();
	                warning = warningMessage !== 'Ok'

	            this.setState({warningMessage: warningMessage, warning: warning})
	        }
	        return warning;
	    }
	});

	module.exports = Toolbar;




/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3);

	const DocButton = function(props) {
	    let btnEnabled = props.enabled ? true: false, // установим значение по умолчанию
	        className = props.className || null,
	        style = {margin: 5},
	        refId = props.refId || 'docButton';
	//                   className = {className}

	    return React.createElement("input", {type: "button", 
	                  value: props.value, 
	                  disabled: btnEnabled, 
	                  onClick: props.onClick, 
	                  className: className, 
	                  style: {style:style}}
	    )
	};

	DocButton.propTypes = {
	    onClick: React.PropTypes.func.isRequired,
	    value: React.PropTypes.string.isRequired
	}
	//     className: React.PropTypes.string

	module.exports = DocButton


/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    InputText = __webpack_require__(69),
	    InputDateTime = __webpack_require__(20),
	    DocList = __webpack_require__(21);
	//    InputNumber = require('../components/doc-input-number.jsx');

	var DocCommon = React.createClass({displayName: "DocCommon",
	    getInitialState: function()
	    {
	        return {
	            readOnly: this.props.readOnly
	        }
	    },

	    componentWillReceiveProps: function(nextProps) {
	        // при изменении, поменяет состояние (передаст дальше режим редактирования)
	        this.setState({readOnly:nextProps.readOnly })
	    },

	    render: function () {
	        var data = this.props.data,
	            bpm = data.bpm || [],
	            actualStepData = bpm.filter(function(step)  {
	                // текущий шаг БП
	                if (step.actualStep) {
	                    return step;
	                }
	            }),
	            executers = actualStepData.map(function(stepData) {
	                // найдем исполнителей
	                return stepData.actors || {name: 'AUTHOR'};
	            });

	        return (
	            React.createElement("div", {className: "fieldset"}, 
	                React.createElement("div", null, 
	                    React.createElement("ul", null, 
	                        React.createElement("li", {style: {display:'-webkit-inline-box'}}, 
	                            React.createElement(InputText, {className: "ui-c2 form-widget-toolbar", 
	                                       title: "Id", 
	                                       name: "id", 
	                                       value: data.id, 
	                                       disabled: "true", 
	                                       width: "75%"})
	                        ), 
	                        React.createElement("li", {style: {display:'-webkit-inline-box'}}, 
	                            React.createElement(InputText, {className: "ui-c2 form-widget-toolbar", 
	                                       title: "Created", 
	                                       name: "created", 
	                                       value: data.created, 
	                                       disabled: "true", width: "75%"})
	                        ), 
	                        React.createElement("li", {style: {display:'-webkit-inline-box'}}, 
	                            React.createElement(InputText, {className: "ui-c2 form-widget-toolbar", 
	                                       title: "Updated", 
	                                       name: "lastupdate", 
	                                       value: data.lastupdate, 
	                                       disabled: "true", width: "75%"})
	                        ), 
	                        React.createElement("li", {style: {display:'-webkit-inline-box'}}, 
	                            React.createElement(InputText, {className: "ui-c2 form-widget-toolbar", 
	                                       title: "Status", 
	                                       name: "status", 
	                                       value: data.status, 
	                                       disabled: "true", 
	                                       width: "75%"})
	                        )
	/*
	                        <li style={{display:'-webkit-inline-box'}}>
	                            <DocList
	                                     title='Исполнители'
	                                     name='executors'
	                                     data={executers}
	                                     readOnly = {this.state.readOnly}
	                            />

	                        </li>
	*/
	                    )
	                )
	            )

	        );
	    }
	})

	module.exports = DocCommon;

/***/ },

/***/ 76:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3),
	    flux = __webpack_require__(4);

	const Input = React.createClass({displayName: "Input",
	    getInitialState: function() {
	        return {value: this.props.value, readOnly: true, disabled: this.props.disabled || true};
	    },

	    getDefaultProps: function () {
	        return {
	            name: 'defaulName',
	            className: 'doc-input',
	            placeholder: 'defaulName',
	            title: ''
	        }
	    },

	    componentDidMount:function() {
	// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	        flux.stores.docStore.on('change:docId', function(newValue, previousValue) {
	            if (newValue !== previousValue) {
	                // отслеживаем создание нового документа
	                let data = flux.stores.docStore.data,
	                    value = data[this.props.name];
	                if (newValue == 0) {
	                    // совый документ
	                    this.setState({value:0});
	                } else {
	                    this.setState({value:value});
	                }
	            }
	        }.bind(this));
	        flux.stores.docStore.on('change:edited', function(newValue, previousValue) {
	            if (newValue !== previousValue ) {
	                this.setState({readOnly: !newValue});
	            }
	        }.bind(this));
	        flux.stores.docStore.on('change:data', function(newValue, previousValue) {
	            // слушуем изменения данных;
	            if (JSON.stringify(newValue) !== JSON.stringify(previousValue)) {
	                let data = newValue,
	                    fieldValue = data[this.props.name];
	                if (data[this.props.name]) {
	                    this.setState({value: fieldValue});
	                }
	            }
	        }.bind(this));

	    },

	    shouldComponentUpdate:function(nextProps, nextState) {
	        // изменения будут отражаться только в случае если такие есть
	        let returnvalue = (nextState.value !== this.state.value ||
	        nextState.readOnly !== this.state.readOnly ||
	        nextState.disabled !== this.state.disabled);
	        return returnvalue;
	    },

	    onChange: function(e) {
	        let fieldValue = e.target.value,
	            data = flux.stores.docStore.data;

	        this.setState({value: fieldValue});
	        data[this.props.name] = fieldValue;
	        // задать новое значение поля
	        flux.doAction('dataChange', data);

	    },

	    componentWillReceiveProps: function(nextProps) {
	        this.setState({value:nextProps.value })
	    },

	    render: function() {
	        var inputClassName =this.props.className || 'doc-input',
	            inputReadOnly = this.state.readOnly || false,
	            inputDisabled = this.state.disabled,
	            inputPlaceHolder = this.props.placeholder || this.props.name,
	            myStyle = {width:'auto'};;

	        if (inputReadOnly) {
	            inputClassName = inputClassName + ' doc-input-readonly';
	        }
	        if (this.props.width) {
	            myStyle.width = this.props.width

	        }

	        if (inputDisabled == 'true') {
	            return (
	            React.createElement("div", {className: "form-widget"}, 
	                React.createElement("label", {htmlFor: this.props.name, 
	                       className: "form-widget-label"}, React.createElement("span", null, this.props.title)
	                ), 
	                React.createElement("textarea", {
	                        style: myStyle, 
	                          className: inputClassName, 
	                          id: this.props.name, 
	                          name: this.props.name, 
	                          value: this.state.value, 
	                          readOnly: inputReadOnly, 
	                          title: this.props.title, 
	                          placeholder: inputPlaceHolder, 
	                          onChange: this.onChange, 
	                          disabled: true}
	            )
	            ))
	        } else {
	            return (
	                React.createElement("div", {className: "form-widget"}, 
	                    React.createElement("label", {htmlFor: this.props.name, 
	                           className: "form-widget-label"}, React.createElement("span", null, this.props.title)
	                    ), 
	                React.createElement("textarea", {
	                    style: myStyle, 
	                    className: inputClassName, 
	                    id: this.props.name, 
	                    name: this.props.name, 
	                    value: this.state.value, 
	                    readOnly: inputReadOnly, 
	                    title: this.props.title, 
	                    placeholder: inputPlaceHolder, 
	                    onChange: this.onChange}
	                )
	                ))
	        }
	    },

	    propTypes: {
	        name: React.PropTypes.string.isRequired
	    },

	});

	module.exports = Input;

/***/ },

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    GridButton = __webpack_require__(78);

	var MyCell = React.createClass({displayName: "MyCell",
	    getInitialState: function () {
	        return {
	            value: this.props.value, editable: false, readOnly: this.props.readOnly, disabled: false
	        }
	    },

	    componentWillReceiveProps: function () {
	        this.setState({value: this.props.value})
	    },

	    componentDidMount: function () {
	        var self = this;

	        flux.stores.docStore.on('change:gridCellEdited', function (newValue, previousValue) {
	            // отслеживает момент перехода на другую ячейку
	            if (newValue !== self.props.id) {
	                var cell = self.refs['cell-' + self.props.id];
	                if (cell) {
	                    self.setState({editable: false}); // убираем режим редактирования
	                }
	            }
	        });

	        flux.stores.docStore.on('change:edited', function (newValue, previousValue) {
	            // отслеживает режим редактирования
	            var data = flux.stores.docStore,
	                gridData = eval('data.' + self.props.gridDataSource);
	            if (newValue !== previousValue && gridData.length > 0) {
	                self.setState({readOnly: !newValue});
	            }
	        });


	    },

	    handleClick: function () {
	        var value = !this.state.editable;
	        // отработаем редактирование
	        flux.doAction('gridCellEditedChange', this.props.id); // закроем редактирование в других ячейках
	        this.setState({editable: value});

	    },

	    onChange: function (e, bindToCell) {
	        // отрабатывает изменение состояния ячейки и пишет в хранилще
	        var value = e.target.value,
	            data = flux.stores.docStore,
	            gridData = eval('data.' + this.props.gridDataSource) || [],
	            cellName = bindToCell ? bindToCell : this.props.source;

	        this.setState({value: value});

	        // пишем состояние в хранилище
	        if (gridData.length > 0) {
	            var cellValue = gridData[this.props.rowId][cellName];

	            gridData[this.props.rowId][cellName] = value;
	            flux.doAction('detailsChange', gridData);
	            flux.doAction('gridCellEditedChange', this.props.id); // закроем редактирование в других ячейках
	        }

	    },

	    handleKeyPress: function (e) {
	        var key = e.which || e.keyCode;
	        if (key == 13) {
	            // выходим из редактирования
	            this.setState({editable: false});
	        }
	    },
	    render: function () {
	        var isEdit = (flux.stores.docStore.edited && !this.state.disabled) ? true : false,
	            cell = this.props.cell, // параметры ячейки
	            isReadOnly = !flux.stores.docStore.edited,
	//            cellType = cell.type || 'span'; // находится ли док в режиме редактирования
	            cellType = 'span'; // находится ли док в режиме редактирования

	        isReadOnly = cell.readOnly ? true : isReadOnly; // поправка на свойство ячейки, доступна ли она редактированию
	//            className = 'form-widget'; //+ t his.state.editable? ' focused': '';
	        isReadOnly = true;
	        var EditElement = React.createElement("span", {onClick: this.handleClick, className: this.props.className}, this.props.value);
	        if (isEdit) {
	            /*
	             switch (cellType) {
	             case 'text':
	             EditElement = <input type='text' readOnly={isReadOnly} value={this.state.value} style={{width:'100%'}}
	             onChange={this.onChange} onKeyPress={this.handleKeyPress}/>
	             break;
	             case 'number':
	             EditElement = <input type='number' readOnly={isReadOnly} value={this.state.value} style={{width:'100%'}}
	             onChange={this.onChange} onKeyPress={this.handleKeyPress}/>
	             break;
	             case 'select':
	             EditElement = <Select  name={cell.valueFieldName} libs={cell.dataSet} value={this.state.value} defaultValue = {this.state.value} collId = {cell.id} onChange={this.onChange}/>
	             break;
	             default:
	             <span>{this.state.value}</span>
	             }
	             */
	        }

	        return (
	            React.createElement("td", {ref: 'cell-' + this.props.id, className: this.props.className, style: {width:cell.width}}, 
	                EditElement
	            )
	        )
	    }
	})

	var DataGrid = React.createClass({displayName: "DataGrid",
	    getInitialState: function () {
	        return {
	            gridColumns: this.props.gridColumns,
	            gridData: this.prepaireGridData(this.props.gridData),
	            edited: false,
	            clicked: 0
	        };
	    },
	    getDefaultProps: function () {
	        return {
	            GridRowEdit: null
	        };
	    },
	    componentDidMount: function () {
	        var self = this;

	        flux.stores.docStore.on('change:docId', function (newValue, previousValue) {
	            // отслеживает режим создания нового документа

	            var data = flux.stores.docStore,
	                gridData = eval('data.' + self.props.source);
	            if (newValue == 0) {
	                gridData = self.delRow(null);
	                flux.doAction('detailsChange', gridData);
	            }
	        });
	        // Listen gridData changes and then callbacks for row data changes
	        flux.stores.docStore.on('change:details', function (newData, oldData) {
	            if (newData.length > 0 && oldData !== newData) {
	                self.setState({gridData: newData});
	            }
	        });

	    },

	    handleCellClick: function (idx) {
	        flux.doAction('gridRowIdChange', idx); // отметим в хранилище номер строки
	        this.setState({
	            clicked: idx
	        });
	        var rowId = flux.stores.docStore.gridRowId;
	    },

	    delRow: function (index) {
	        // удалим строку заданную строку или все, если индекс не задан
	        var gridData = this.state.gridData,
	            start = 1,
	            finish = gridData.length;

	        if (index || index == 0) {
	            start = index;
	            finish = 1;
	        }
	//        gridData.splice(start, finish);
	        gridData = gridData.filter(function (value, index) {
	            if (index < start || index > (start + finish)) {
	                return value;
	            }
	        })
	        this.setState({gridData: gridData});
	        // сохраним изменения
	        flux.doAction('detailsChange', gridData)

	    },

	    newRow: function () {
	        //вернет новую строку для грида, на основе шаблона

	        var gridColumns = this.props.gridColumns,
	            gridData = flux.stores.docStore.details,
	            row = new Object();

	        for (var i = 0; i < gridColumns.length; i++) {
	            var field = gridColumns[i].id;
	            row[field] = '';
	        }
	        return row;
	    },

	    prepaireGridData: function (sourceData) {
	        var gridData = [];
	        gridData = sourceData.map(function (row) {
	            // получаем чистую строку
	            var newRow = this.newRow();
	            // пройдем по новой строке и заполним ее поля значениями из источника

	            for (var key in newRow) {
	                newRow[key] = row[key];
	            }
	            return newRow; // вернем сформированную новую строку
	        }, this);
	        return gridData;
	    },

	    deleteRow: function () {
	        // удаление строки из грида
	        var rowIndex = flux.stores.docStore.gridRowId;
	        this.delRow(rowIndex);
	    },

	    addRow: function () {
	        // добавит в состояние новую строку
	        var newRow = this.newRow(),
	            gridData = this.state.gridData,
	            details = flux.stores.docStore.details;

	        newRow.id = 'NEW' + Math.random(); // генерим новое ид
	//        gridData.push(newRow);
	//        this.setState({edited: true, clicked: gridData.length});

	        // здесь вставить строку в хранилище
	//        details.push(newRow);
	//        flux.doAction('detailsChange', details); // пишем изменения в хранилище
	        flux.doAction('gridRowIdChange', -1); // отметим в хранилище номер строки

	  //      this.setState({gridData: gridData});

	        // откроем модальное окно для редактирования
	        this.props.handleGridRow('ADD', newRow);
	    },

	    editRow: function () {
	        // добавит в состояние новую строку
	        var gridData = this.state.gridData,
	            details = flux.stores.docStore.details,
	            row = details[flux.stores.docStore.gridRowId]

	        this.props.handleGridRow('EDIT',row ); // редактирование строки в модальном окне

	    },

	    render: function () {
	        var gridStyle = {
	            width: '100px'
	        };
	        var className = 'th';
	        var gridRows = this.state.gridData,
	            gridColumns = this.props.gridColumns,
	            clickedItem = this.state.index,
	            isReadOnly = this.props.readOnly,
	            cellId = 0,
	            gridDataSource = this.props.source;

	        return (
	            React.createElement("div", null, 
	                !isReadOnly ?
	                    React.createElement("div", null, 
	                        React.createElement(GridButton, {onClick: this.addRow, buttonValue: "Add row"}), 
	                        React.createElement(GridButton, {onClick: this.editRow, buttonValue: "Edit row"}), 
	                        React.createElement(GridButton, {onClick: this.deleteRow, buttonValue: "Delete row"})
	                    ) : null, 
	                React.createElement("table", null, 
	                    React.createElement("tbody", null, 
	                    React.createElement("tr", null, 
	                        /*заголовок*/
	                        gridColumns.map(function (column, index) {
	                            gridStyle.width = column.width;
	                            className = 'th-' + column.id;
	                            if (column.show) {
	                                // показать ил скрыть колонку
	                                className = 'show';
	                            } else {
	                                className = 'hide';
	                            }
	                            return React.createElement("th", {style: gridStyle, className: className, key: 'th-' + index, 
	                                       scope: "col"}, column.name)
	                        })
	                    ), 
	                    gridRows.map(function (row, index) {
	                        var myClass = 'notFocused',
	                            rowId = index;
	                        if (clickedItem == index) {
	                            myClass = 'focused'; // подсветим выбранную строку
	                        }
	                        ;
	                        return (
	                            React.createElement("tr", {onClick: this.handleCellClick.bind(this,index), className: myClass, key: 'tr-'+index}, 
	                                gridColumns.map(function (cell, index) {
	                                    gridStyle.width = cell.width;
	                                    var className = 'show';
	                                    if (cell.show) {
	                                        // показать ил скрыть колонку? испллдьзуем класс. Должен быть прописан в css
	                                        className = 'show';
	                                    } else {
	                                        className = 'hide';
	                                    }

	                                    return (
	                                        React.createElement(MyCell, {cell: cell, 
	                                                source: cell.id, 
	                                                className: className, 
	                                                rowId: rowId, 
	                                                gridDataSource: gridDataSource, 
	                                                readOnly: isReadOnly, 
	                                                style: gridStyle, 
	                                                value: row[cell.id], 
	                                                key: index, id: cellId++})
	                                    )
	                                })
	                            ));
	                    }, this)
	                    )
	                )
	            )
	        )
	    }
	});

	module.exports = DataGrid;


/***/ },

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);

	var MyButton = React.createClass({
	    displayName: 'MyButton',

	    render: function render() {
	        return React.createElement('input', {
	            className: this.props.className,
	            type: 'button',
	            value: this.props.buttonValue,
	            disabled: this.props.disabled,
	            onClick: this.handleButtonClick });
	    },

	    handleButtonClick: function handleButtonClick() {
	        // вернем в обработчик состояний событие клик
	        this.props.onClick();
	    }
	});

	module.exports = MyButton;

/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    ModalPage = __webpack_require__(61),
	    Select = __webpack_require__(49),
	    InputText = __webpack_require__(69),
	    InputNumber = __webpack_require__(72);

	var SorderGridRow = React.createClass({displayName: "SorderGridRow",
	    getInitialState: function () {
	//        console.log('ArvGridRow props', this.props);
	        return {
	            row: this.props.gridRowData, checked: false, warning:''
	        }
	    },

	    componentDidMount: function() {
	    // предварительная проверка
	        this.validateForm();
	    },

	    modalPageClick: function (btnEvent) {
	        var components = ['nomid',  'summa', 'proj', 'tunnus'],
	            data = [];

	        if (btnEvent == 'Ok') {
	            // проверка

	            // собираем данные для отправки на обработку
	            components.map(function(component)  {
	                var componentValue = this.refs[component].state.value;
	                if (component == 'proj' || component == 'tunnus') {
	                    componentValue = this.refs[component].state.fieldValue;
	                }
	                console.log('modalPageClick ',component, componentValue )
	                data.push({name: component, value: componentValue});
	            }.bind(this))
	        }
	        this.props.modalPageClick(btnEvent, data);
	    },

	    handleChange: function (e, name) {
	        // отслеживаем изменения данных на форме
	        console.log('select changed');
	        var value = e.target.value;
	        if (value !== this.state.row[name] && name == 'nomid') {
	            this.refs['summa'].setState({value: 0.00});
	        }
	        this.validateForm();
	    },

	    handleInput: function (value, name) {
	        // пересчет сумм
	        this.recalcRowSumm();

	    },

	    validateForm: function() {
	        // will check values on the form and return string with warning
	        var warning = '';
	        // только после проверки формы на валидность
	        if (!this.refs['nomid'].state.value) warning =  warning + ' кассовая операция';

	        if (warning.length > 2 ) {
	            // есть проблемы
	            warning = 'Отсутсвуют данные:' + warning;
	        }
	        console.log('validated', warning, this.refs['nomid'].state.value);
	        this.setState({checked: true, warning: warning});
	    },
	    render: function () {

	        var row = this.state.row,
	            validateMessage = this.state.warning,
	            buttonOkReadOnly = validateMessage.length > 0 || !this.state.checked;
	//        console.log('row render:',validateMessage, buttonOkReadOnly );
	        return (
	            React.createElement("div", {className: "modalPage"}, 
	                React.createElement(ModalPage, {
	                    modalPageBtnClick: this.modalPageClick, 
	                    modalPageName: "Rea lisamine / parandamine"}, 
	                    React.createElement("div", null, 
	                        React.createElement("ul", null, 
	                        React.createElement("li", null, 
	                            React.createElement(Select, {
	                                title: "Operatsioon: ", 
	                                name: "nomid", libs: "nomenclature", 
	                                readOnly: false, 
	                                value: row.nomid, 
	                                defaultValue: row.kood, 
	                                ref: "nomid", 
	                                placeholder: "Kassa operatsiooni kood", 
	                                className: "ui-c2", 
	                                onChange: this.handleChange})
	                            
	                        ), 
	                       React.createElement("li", null, 
	                           React.createElement(InputNumber, {
	                               title: "Summa: ", 
	                               name: "Summa:", value: row.summa, 
	                               disabled: "false", 
	                               bindData: false, ref: "summa", 
	                               className: "ui-c2"}
	                           )
	                       ), 
	                        React.createElement("li", null, 
	                            React.createElement(Select, {
	                                title: "Projekt:", 
	                                name: "proj", 
	                                libs: "project", 
	                                readOnly: false, 
	                                value: row.proj, 
	                                collId: "kood", 
	                                ref: "proj", 
	                                placeholder: "Projekt", 
	                                onChange: this.handleChange, 
	                                className: "ui-c2"}
	                            )
	                        ), 
	                        React.createElement("li", null, 
	                            React.createElement(Select, {
	                                title: "Tunnus:", 
	                                name: "tunnus", 
	                                libs: "tunnus", 
	                                readOnly: false, 
	                                value: row.tunnus, 
	                                collId: "kood", 
	                                ref: "tunnus", 
	                                placeholder: "Lausendi tunnus", 
	                                onChange: this.handleChange, 
	                                className: "ui-c2"}
	                            )
	                        )
	                        )
	                    ), 
	                    React.createElement("div", null, React.createElement("span", null, validateMessage)), ";"
	                )
	            )
	        );
	    }

	});

	/*
	<div>
	    {buttonOkReadOnly ?
	        <button disabled> Ok </button>:
	        <button onClick={this.modalPageClick.bind(this,'Ok')}> Ok </button>
	    }
	    <button onClick={this.modalPageClick.bind(this,'Cancel')}> Cancel</button>
	</div>
	*/


	module.exports = SorderGridRow;

	/*
	 <InputText title='Kood ' name='kood' value={row.kood} readOnly={false}
	 disabled="false" ref='kood' ></InputText>
	 */


/***/ },

/***/ 80:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);
	const Form = __webpack_require__(67);
	const PageLabel = __webpack_require__(68);

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

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLmpzeD8xMTJmIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLnN0eWxlcy5qcz8zYTcwIiwid2VicGFjazovLy8uL21pZGRsZXdhcmUvcmV0dXJuRG9jQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3Mvdm9yZGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9wYWdlX2xhYmVsLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWlucHV0LXRleHQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWlucHV0LWRhdGUuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtZGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtbnVtYmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy10b29sYmFyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1idXR0b24uanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWNvbW1vbi5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dGFyZWEuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWRhdGEtZ3JpZC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9teWJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3NvcmRlci1ncmlkLXJvdy5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jcy9wYWxrX29wZXIuanN4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG4vKlxyXG4gICAgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIGRvY0NvbXBvbmVudCA9ICcnO1xyXG4qL1xuXG4vLyDQtNCw0L3QvdGL0LUg0LTQu9GPINGF0YDQsNC90LjQu9C40YnQsFxubG9jYWxTdG9yYWdlWydkb2NTdG9yZSddID0gc3RvcmVEYXRhO1xuc3RvcmVEYXRhID0gSlNPTi5wYXJzZShzdG9yZURhdGEpO1xuXG4vLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSDQtNCw0L3QvdGFXG4vKlxyXG5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgc2VsZi5zZXRTdGF0ZSh7ZG9jRGF0YTpkb2NTdG9yZS5kYXRhfSlcclxuICAgIH1cclxufSlcclxuKi9cblxuLy8g0LfQsNC/0YDQvtGB0LjQvCDQutC+0LzQv9C+0L3QtdC90YIg0LTQvtC60YPQvNC10L3RgtCwINC/0L4g0LXQs9C+INGC0LjQv9GDXG52YXIgRG9jID0gcmVxdWlyZSgnLi4vbWlkZGxld2FyZS9yZXR1cm5Eb2NDb21wb25lbnQnKShzdG9yZURhdGEuZG9jVHlwZUlkKTtcblxuUmVhY3RET00ucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jLCB7IGRhdGE6IHN0b3JlRGF0YS5kYXRhLCBicG06IHN0b3JlRGF0YS5icG0gfSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb2MnKSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2MuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3RcclxuICAgIEZvcm0gPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Zvcm0vZm9ybS5qc3gnKSxcclxuICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgSW5wdXREYXRlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9pbnB1dC1kYXRlL2lucHV0LWRhdGUuanN4JyksXHJcbiAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvaW5wdXQtbnVtYmVyL2lucHV0LW51bWJlci5qc3gnKSxcclxuICAgIERvY0NvbW1vbiA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZG9jLWNvbW1vbi9kb2MtY29tbW9uLmpzeCcpLFxyXG4gICAgU2VsZWN0ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmpzeCcpLFxyXG4gICAgVGV4dEFyZWEgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3RleHQtYXJlYS90ZXh0LWFyZWEuanN4JyksXHJcbiAgICBEYXRhR3JpZCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZGF0YS1ncmlkL2RhdGEtZ3JpZC5qc3gnKSxcclxuICAgIEdyaWRCdXR0b25BZGQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItYWRkL2J1dHRvbi1yZWdpc3Rlci1hZGQuanN4JyksXHJcbiAgICBHcmlkQnV0dG9uRWRpdCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeCcpLFxyXG4gICAgR3JpZEJ1dHRvbkRlbGV0ZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1kZWxldGUvYnV0dG9uLXJlZ2lzdGVyLWRlbGV0ZS5qc3gnKSxcclxuICAgIERva1Byb3AgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RvY3Byb3AvZG9jcHJvcC5qc3gnKSxcclxuICAgIHJlbGF0ZWREb2N1bWVudHMgPSByZXF1aXJlKCcuLi8uLi9taXhpbi9yZWxhdGVkRG9jdW1lbnRzLmpzeCcpLFxyXG4gICAgVG9vbGJhckNvbnRhaW5lciA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy90b29sYmFyLWNvbnRhaW5lci90b29sYmFyLWNvbnRhaW5lci5qc3gnKSxcclxuICAgIERvY1Rvb2xCYXIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvZG9jLXRvb2xiYXIvZG9jLXRvb2xiYXIuanN4JyksXHJcbiAgICB2YWxpZGF0ZUZvcm0gPSByZXF1aXJlKCcuLi8uLi9taXhpbi92YWxpZGF0ZUZvcm0nKSxcclxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxQYWdlLmpzeCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9hcnZlLnN0eWxlcycpO1xyXG5cclxuY29uc3QgTElCRE9LID0gJ0FSVicsXHJcbiAgICBMSUJSQVJJRVMgPSBbJ2FzdXR1c2VkJywgJ2tvbnRvZCcsICdkb2tQcm9wcycsICd1c2VycycsICdhYScsICd0dW5udXMnLCAncHJvamVjdCcsICdub21lbmNsYXR1cmUnXTtcclxuXHJcbi8vIENyZWF0ZSBhIHN0b3JlXHJcbmNvbnN0IGRvY1N0b3JlID0gcmVxdWlyZSgnLi4vLi4vc3RvcmVzL2RvY19zdG9yZS5qcycpO1xyXG5cclxuY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuXHJcbnZhciBfX19fQ2xhc3MwPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3MwX19fX0tleSBpbiBfX19fQ2xhc3MwKXtpZihfX19fQ2xhc3MwLmhhc093blByb3BlcnR5KF9fX19DbGFzczBfX19fS2V5KSl7QXJ2ZVtfX19fQ2xhc3MwX19fX0tleV09X19fX0NsYXNzMFtfX19fQ2xhc3MwX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczA9X19fX0NsYXNzMD09PW51bGw/bnVsbDpfX19fQ2xhc3MwLnByb3RvdHlwZTtBcnZlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3MwKTtBcnZlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1BcnZlO0FydmUuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzMDtcclxuICAgIGZ1bmN0aW9uIEFydmUocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3MwLmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZG9jRGF0YTogdGhpcy5wcm9wcy5kYXRhLnJvdyxcclxuICAgICAgICAgICAgYnBtOiB0aGlzLnByb3BzLmJwbSxcclxuICAgICAgICAgICAgZWRpdGVkOiB0aGlzLnByb3BzLmRhdGEucm93LmlkID09IDAsXHJcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94OiAnbm9uZScsXHJcbiAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnByb3BzLmRhdGEuZGV0YWlscyxcclxuICAgICAgICAgICAgcmVsYXRpb25zOiB0aGlzLnByb3BzLmRhdGEucmVsYXRpb25zLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnOiB0aGlzLnByb3BzLmRhdGEuZ3JpZENvbmZpZyxcclxuICAgICAgICAgICAgZ3JpZFJvd0VkaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBncmlkUm93RXZlbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIGdyaWRSb3dEYXRhOiBudWxsLFxyXG4gICAgICAgICAgICBsaWJzOiB0aGlzLmNyZWF0ZUxpYnMoKSxcclxuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHdhcm5pbmc6ICcnXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wYWdlcyA9IFt7cGFnZU5hbWU6ICdBcnZlJ31dXHJcbiAgICAgICAgdGhpcy5yZXF1aXJlZEZpZWxkcyA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2twdicsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnRCcsXHJcbiAgICAgICAgICAgICAgICBtaW46IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSAtIDEpLFxyXG4gICAgICAgICAgICAgICAgbWF4OiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgKyAxKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAndGFodGFlZycsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnRCcsXHJcbiAgICAgICAgICAgICAgICBtaW46IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSAtIDEpLFxyXG4gICAgICAgICAgICAgICAgbWF4OiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgKyAxKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7bmFtZTogJ2FzdXR1c2lkJywgdHlwZTogJ04nLCBtaW46IG51bGwsIG1heDogbnVsbH0sXHJcbiAgICAgICAgICAgIHtuYW1lOiAnc3VtbWEnLCB0eXBlOiAnTicsIG1pbjogLTk5OTk5OTksIG1heDogOTk5OTk5fVxyXG4gICAgICAgIF1cclxuICAgICAgICB0aGlzLmhhbmRsZVRvb2xiYXJFdmVudHMgPSB0aGlzLmhhbmRsZVRvb2xiYXJFdmVudHMuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRpb24uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm1vZGFsUGFnZUNsaWNrID0gdGhpcy5tb2RhbFBhZ2VDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlR3JpZEJ0bkNsaWNrID0gdGhpcy5oYW5kbGVHcmlkQnRuQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZFJvdyA9IHRoaXMuYWRkUm93LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVHcmlkUm93Q2hhbmdlID0gdGhpcy5oYW5kbGVHcmlkUm93Q2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZUdyaWRSb3cgPSB0aGlzLnZhbGlkYXRlR3JpZFJvdy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlR3JpZFJvd0lucHV0ID0gdGhpcy5oYW5kbGVHcmlkUm93SW5wdXQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUdyaWRSb3cgPSB0aGlzLmNyZWF0ZUdyaWRSb3cuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJ2YWxpZGF0aW9uXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmVkaXRlZCkgcmV0dXJuICcnO1xyXG5cclxuICAgICAgICBsZXQgcmVxdWlyZWRGaWVsZHMgPSB0aGlzLnJlcXVpcmVkRmllbGRzO1xyXG4gICAgICAgIGxldCB3YXJuaW5nID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vdmFsaWRhdGVGb3JtJykodGhpcywgcmVxdWlyZWRGaWVsZHMpO1xyXG4gICAgICAgIHJldHVybiB3YXJuaW5nO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxNb3VudFwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucmVsYXRlZERvY3VtZW50cygpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImNvbXBvbmVudERpZE1vdW50XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L/QuNGI0LXQvCDQuNGB0YXQvtC00L3Ri9C1INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LUsINGA0LXQs9C40YHRgtGA0LjRgNGD0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICBkYXRhID0gc2VsZi5wcm9wcy5kYXRhLnJvdyxcclxuICAgICAgICAgICAgZGV0YWlscyA9IHNlbGYucHJvcHMuZGF0YS5kZXRhaWxzLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnID0gc2VsZi5wcm9wcy5kYXRhLmdyaWRDb25maWc7XHJcblxyXG4gICAgICAgIC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RldGFpbHNDaGFuZ2UnLCBkZXRhaWxzKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkQ29uZmlnQ2hhbmdlJywgZ3JpZENvbmZpZyk7IC8vINC00LDQvdC90YvQtSDQs9GA0LjQtNCwXHJcbi8vICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkTmFtZUNoYW5nZScsICdhcnYtZ3JpZC1yb3cnKTsgLy8g0LfQsNC00LDQtdC8INC40LzRjyDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdGC0YDQvtC60Lgg0LPRgNC40LTQsCAo0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINCyINCz0YDQuNC00LVcclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRldGFpbHMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSkgJiYgdHlwZW9mIG5ld1ZhbHVlID09ICdhcnJheScpIHtcclxuICAgICAgICAgICAgICAgIC8vINC40YLQvtCz0LhcclxuICAgICAgICAgICAgICAgIGxldCBzdW1tYSA9IG5ld1ZhbHVlLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSk7fSwgMCksIC8vINGB0YPQvNC80LAg0YHRh9C10YLQsFxyXG4gICAgICAgICAgICAgICAgICAgIGtibSA9IG5ld1ZhbHVlLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5rYm0pO30sIDApLCAvLyDRgdGD0LzQvNCwINC90LDQu9C+0LPQsFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY0RhdGEgPSBzZWxmLnN0YXRlLmRvY0RhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jRGF0YS5zdW1tYSA9IHN1bW1hO1xyXG4gICAgICAgICAgICAgICAgZG9jRGF0YS5rYm0gPSBrYm07XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Z3JpZERhdGE6IG5ld1ZhbHVlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0LPRgNGD0LfQuNC8INGB0L/RgNCw0LLQvtGH0L3QuNC60LhcclxuICAgICAgICBMSUJSQVJJRVMuZm9yRWFjaChmdW5jdGlvbihsaWIpICB7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oXCJsb2FkTGlic1wiLCBsaWIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDQtdGB0LvQuCDQvdC+0LLRi9C5INC00L7QutGD0LzQtdC90YIgKGlkID09IDApXHJcblxyXG4gICAgICAgIGlmIChkYXRhLmlkID09IDApIHtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vINC00LXQu9Cw0LXQvCDQutC+0L/QuNC4XHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdiYWNrdXBDaGFuZ2UnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93OiBPYmplY3QuYXNzaWduKHt9LCBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhKSxcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiBPYmplY3QuYXNzaWduKFtdLCBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRlZDogbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmxpYnMnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkgIHtcclxuICAgICAgICAgICAgbGV0IGlzQ2hhbmdlZCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbGlicyA9IG5ld1ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgbGlic0RhdGEgPSB0aGlzLnN0YXRlLmxpYnM7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxpYnMuZm9yRWFjaChmdW5jdGlvbihsaWIpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUubGlic1tsaWIuaWRdICYmIGxpYi5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlic0RhdGFbbGliLmlkXSA9IGxpYi5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0NoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc0NoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2xpYnM6IGxpYnNEYXRhfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJzaG91bGRDb21wb25lbnRVcGRhdGVcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgICAgIC8vIEB0b2RvINC00L7QsdCw0LLQuNGC0Ywg0L/RgNC+0LLQtdGA0LrRgyDQvdCwINC40LfQvNC10L3QtdC90LjQtSDRgdC+0YHRgtC+0Y/QvdC40Y9cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0LfQsNCy0LjRgdC40LzQvtGB0YLQuFxyXG4gICAgICAgIHJlbGF0ZWREb2N1bWVudHModGhpcyk7XHJcblxyXG4gICAgICAgIGxldCBicG0gPSB0aGlzLnN0YXRlLmJwbSxcclxuICAgICAgICAgICAgaXNFZGl0ZU1vZGUgPSB0aGlzLnN0YXRlLmVkaXRlZCxcclxuICAgICAgICAgICAgdG9vbGJhclBhcmFtcyA9IHRoaXMucHJlcGFpcmVUb29sQmFyUGFyYW1ldGVycyhpc0VkaXRlTW9kZSksXHJcbiAgICAgICAgICAgIHZhbGlkYXRpb25NZXNzYWdlID0gdGhpcy52YWxpZGF0aW9uKCksXHJcbiAgICAgICAgICAgIGxpYnMgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5saWJzO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIHtwYWdlczogdGhpcy5wYWdlcywgXHJcbiAgICAgICAgICAgICAgICAgIHJlZjogXCJmb3JtXCIsIFxyXG4gICAgICAgICAgICAgICAgICBoYW5kbGVQYWdlQ2xpY2s6IHRoaXMuaGFuZGxlUGFnZUNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGlzRWRpdGVNb2RlfSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXJDb250YWluZXIsIHtyZWY6IFwidG9vbGJhci1jb250YWluZXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJkb2MtdG9vbGJhci13YXJuaW5nXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1lc3NhZ2UgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB2YWxpZGF0aW9uTWVzc2FnZSkgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEb2NUb29sQmFyLCB7YnBtOiBicG0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZG9jLXRvb2xiYXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRlZDogaXNFZGl0ZU1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NTdGF0dXM6IHRoaXMuc3RhdGUuZG9jRGF0YS5kb2Nfc3RhdHVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiB0aGlzLnZhbGlkYXRpb24sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXI6IHRoaXMuaGFuZGxlVG9vbGJhckV2ZW50c30pXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY30sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQ29tbW9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZG9jLWNvbW1vblwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc3RhdGUuZG9jRGF0YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY0NvbHVtbn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtyZWY6IFwiaW5wdXQtbnVtYmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOdW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibnVtYmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLm51bWJlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZX0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXREYXRlLCB7dGl0bGU6IFwiS3V1cMOkZXYgXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtwdlwiLCB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLmtwdiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dC1rcHZcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZX0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXREYXRlLCB7dGl0bGU6IFwiVMOkaHRhZWcgXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRhaHRhZWdcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEudGFodGFlZywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dC10YWh0YWVnXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge3RpdGxlOiBcIkFzdXR1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhc3V0dXNpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliczogXCJhc3V0dXNlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5zdGF0ZS5saWJzWydhc3V0dXNlZCddLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZG9jRGF0YS5hc3V0dXNpZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLmFzdXR1cywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzZWxlY3QtYXN1dHVzaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ0bkRlbGV0ZTogaXNFZGl0ZU1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge3RpdGxlOiBcIkxpc2EgXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxpc2FcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEubGlzYSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dC1saXNhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NDb2x1bW59LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9rUHJvcCwge3RpdGxlOiBcIktvbnRlZXJpbWluZTogXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkb2tsYXVzaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcImRva1Byb3BzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZG9jRGF0YS5kb2tsYXVzaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEuZG9rcHJvcCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZG9rcHJvcC1kb2tsYXVzaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHt0aXRsZTogXCJNw6Rya3VzZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm11dWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwidGV4dGFyZWEtbXV1ZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEubXV1ZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXNFZGl0ZU1vZGUgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyQ29udGFpbmVyLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImdyaWQtdG9vbGJhci1jb250YWluZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdsZWZ0J30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEJ1dHRvbkFkZCwge29uQ2xpY2s6IHRoaXMuaGFuZGxlR3JpZEJ0bkNsaWNrLCByZWY6IFwiZ3JpZC1idXR0b24tYWRkXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcmlkQnV0dG9uRWRpdCwge29uQ2xpY2s6IHRoaXMuaGFuZGxlR3JpZEJ0bkNsaWNrLCByZWY6IFwiZ3JpZC1idXR0b24tZWRpdFwifSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEJ1dHRvbkRlbGV0ZSwge29uQ2xpY2s6IHRoaXMuaGFuZGxlR3JpZEJ0bkNsaWNrLCByZWY6IFwiZ3JpZC1idXR0b24tZGVsZXRlXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YUdyaWQsIHtzb3VyY2U6IFwiZGV0YWlsc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnN0YXRlLmdyaWREYXRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zOiB0aGlzLnN0YXRlLmdyaWRDb25maWcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlR3JpZFJvdzogdGhpcy5oYW5kbGVHcmlkUm93LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImRhdGEtZ3JpZFwifSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge3RpdGxlOiBcIlN1bW1hIFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dC1zdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLnN1bW1hLCBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIl5bMC05XSsoXFxcXC5bMC05XXsxLDR9KT8kXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7dGl0bGU6IFwiS8OkaWJlbWFrcyBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrYm1cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImlucHV0LWtibVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEua2JtLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCJeWzAtOV0rKFxcXFwuWzAtOV17MSw0fSk/JFwifSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmdyaWRSb3dFZGl0ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkUm93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcInJlbGF0ZWREb2N1bWVudHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0LfQsNCy0LjRgdC40LzQvtGB0YLQuFxyXG4gICAgICAgIGxldCByZWxhdGVkRG9jdW1lbnRzID0gdGhpcy5zdGF0ZS5yZWxhdGlvbnM7XHJcbiAgICAgICAgaWYgKHJlbGF0ZWREb2N1bWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZWxhdGVkRG9jdW1lbnRzLmZvckVhY2goZnVuY3Rpb24oZG9jKSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvYy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsCDRg9C90LjQutCw0LvRjNC90L7RgdGC0Ywg0YHQv9C40YHQutCwINC00L7QutGD0LzQtdC90YLQvtCyXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlzRXhpc3RzID0gdGhpcy5wYWdlcy5maW5kKGZ1bmN0aW9uKHBhZ2UpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGFnZS5kb2NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhZ2UuZG9jSWQgPT0gZG9jLmlkICYmIHBhZ2UuZG9jVHlwZUlkID09IGRvYy5kb2NfdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINCyINC80LDRgdGB0LjQstC1INC90LXRgiwg0LTQvtCx0LDQstC40Lwg0YHRgdGL0LvQutGDINC90LAg0LTQvtC60YPQvNC10L3RglxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2VzLnB1c2goe2RvY1R5cGVJZDogZG9jLmRvY190eXBlLCBkb2NJZDogZG9jLmlkLCBwYWdlTmFtZTogZG9jLm5hbWUgKyAnIGlkOicgKyBkb2MuaWR9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcIm1vZGFsUGFnZUNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oYnRuRXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAvLyDQvtGC0YDQsNCx0L7RgtCw0LXQvCBPayDQuNC3INC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwXHJcbiAgICAgICAgbGV0IGdyaWREYXRhID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZG9jRGF0YSA9IHRoaXMuc3RhdGUuZG9jRGF0YSxcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnMgPSB0aGlzLnN0YXRlLmdyaWRDb25maWcsXHJcbiAgICAgICAgICAgIGdyaWRSb3cgPSB0aGlzLnN0YXRlLmdyaWRSb3dEYXRhO1xyXG5cclxuICAgICAgICBpZiAoYnRuRXZlbnQgPT0gJ09rJykge1xyXG5cclxuICAgICAgICAgICAgLy8g0LjRidC10Lwg0L/QviDQuNC0INGB0YLRgNC+0LrRgyDQsiDQtNCw0L3QvdGL0YUg0LPRgNC40LTQsCwg0LXRgdC70Lgg0L3QtdGCLCDRgtC+INC00L7QsdCw0LLQuNC8INGB0YLRgNC+0LrRg1xyXG4gICAgICAgICAgICBpZiAoIWdyaWREYXRhLnNvbWUoZnVuY3Rpb24ocm93KSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT09IGdyaWRSb3cuaWQpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSkpIHtcclxuICAgICAgICAgICAgICAgIC8vINCy0YHRgtCw0LLQutCwINC90L7QstC+0Lkg0YHRgtGA0L7QutC4XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YS5zcGxpY2UoMCwgMCwgZ3JpZFJvdyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YSA9IGdyaWREYXRhLm1hcChmdW5jdGlvbihyb3cpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5pZCA9PT0gZ3JpZFJvdy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQvdCw0YjQu9C4LCDQt9Cw0LzQtdGJ0LDQtdC8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBncmlkUm93O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvY0RhdGEgPSB0aGlzLnJlY2FsY0RvY1N1bW1hKGRvY0RhdGEpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiBmYWxzZSwgZ3JpZERhdGE6IGdyaWREYXRhLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImhhbmRsZVBhZ2VDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKHBhZ2UpIHtcclxuICAgICAgICBpZiAocGFnZS5kb2NJZCkge1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gXCIvZG9jdW1lbnQvXCIgKyBwYWdlLmRvY1R5cGVJZCArIHBhZ2UuZG9jSWQ7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImhhbmRsZVNlbGVjdFRhc2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgLy8g0LzQtdGC0L7QtCDQstGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LLRi9Cx0L7RgNC1INC30LDQtNCw0YfQuFxyXG4gICAgICAgIHZhciB0YXNrVmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJoYW5kbGVUb29sYmFyRXZlbnRzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAvLyB0b29sYmFyIGV2ZW50IGhhbmRsZXJcclxuXHJcbiAgICAgICAgc3dpdGNoIChldmVudCkge1xyXG4gICAgICAgICAgICBjYXNlICdDQU5DRUwnOlxyXG4gICAgICAgICAgICAgICAgbGV0IGJhY2t1cCA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmJhY2t1cDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RvY0RhdGE6IGJhY2t1cC5yb3csIGdyaWREYXRhOiBiYWNrdXAuZGV0YWlscywgd2FybmluZzogJyd9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignaGFuZGxlVG9vbGJhckV2ZW50cywgbm8gZXZlbnQgaGFuZGxlciBmb3IgJywgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJoYW5kbGVJbnB1dENoYW5nZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGlucHV0TmFtZSwgaW5wdXRWYWx1ZSkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC40LfQvNC10L3QtdC90LjQuVxyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGE7XHJcbiAgICAgICAgZGF0YVtpbnB1dE5hbWVdID0gaW5wdXRWYWx1ZTtcclxuICAgICAgICAvLyDQt9Cw0LTQsNGC0Ywg0L3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INC/0L7Qu9GPXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJwcmVwYWlyZVRvb2xCYXJQYXJhbWV0ZXJzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oaXNFZGl0TW9kZSkge1xyXG4gICAgICAgIGxldCB0b29sYmFyUGFyYW1zID0ge1xyXG4gICAgICAgICAgICBidG5BZGQ6IHtcclxuICAgICAgICAgICAgICAgIHNob3c6ICFpc0VkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGlzRWRpdE1vZGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnRuRWRpdDoge1xyXG4gICAgICAgICAgICAgICAgc2hvdzogIWlzRWRpdE1vZGUsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogaXNFZGl0TW9kZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBidG5QcmludDoge1xyXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJ0blNhdmU6IHtcclxuICAgICAgICAgICAgICAgIHNob3c6IGlzRWRpdE1vZGUsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB0b29sYmFyUGFyYW1zO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImhhbmRsZUdyaWRCdG5DbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGJ0bk5hbWUsIGlkKSB7XHJcbiAgICAgICAgc3dpdGNoIChidG5OYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FkZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFJvdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VkaXQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0Um93KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlUm93KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiZGVsZXRlUm93XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0YPQtNCw0LvQuNGCINCw0LrRgtC40LLQvdGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgbGV0IGdyaWREYXRhID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZ3JpZEFjdGl2ZVJvdyA9IHRoaXMucmVmc1snZGF0YS1ncmlkJ10uc3RhdGUuYWN0aXZlUm93LFxyXG4gICAgICAgICAgICBkb2NEYXRhID0gdGhpcy5zdGF0ZS5kb2NEYXRhO1xyXG5cclxuICAgICAgICBncmlkRGF0YS5zcGxpY2UoZ3JpZEFjdGl2ZVJvdywgMSk7XHJcblxyXG4gICAgICAgIC8vINC/0LXRgNC10YDQsNGB0YfQtdGCINC40YLQvtCz0L7QslxyXG4gICAgICAgIGRvY0RhdGEgPSB0aGlzLnJlY2FsY0RvY1N1bW1hKGRvY0RhdGEpO1xyXG5cclxuICAgICAgICAvLyDQuNC30LzQtdC90LjQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtncmlkRGF0YTogZ3JpZERhdGEsIGRvY0RhdGE6IGRvY0RhdGF9KTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJlZGl0Um93XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7RgtC60YDQvtC10YIg0LDQutGC0LjQstC90YPRjiDRgdGC0YDQvtC60YMg0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBsZXQgZ3JpZERhdGEgPSB0aGlzLnN0YXRlLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBncmlkQWN0aXZlUm93ID0gdGhpcy5yZWZzWydkYXRhLWdyaWQnXS5zdGF0ZS5hY3RpdmVSb3csXHJcbiAgICAgICAgICAgIGdyaWRSb3cgPSBncmlkRGF0YVtncmlkQWN0aXZlUm93XTtcclxuXHJcbiAgICAgICAgLy8g0L7RgtC60YDQvtC10Lwg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+INC00LvRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IHRydWUsIGdyaWRSb3dFdmVudDogJ2VkaXQnLCBncmlkUm93RGF0YTogZ3JpZFJvd30pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImFkZFJvd1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC00L7QsdCw0LLQuNGCINCyINGB0L7RgdGC0L7Rj9C90LjQtSDQvdC+0LLRg9GOINGB0YLRgNC+0LrRg1xyXG5cclxuICAgICAgICBsZXQgZ3JpZENvbHVtbnMgPSB0aGlzLnN0YXRlLmdyaWRDb25maWcsXHJcbiAgICAgICAgICAgIGdyaWREYXRhID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgbmV3Um93ID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRDb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBmaWVsZCA9IGdyaWRDb2x1bW5zW2ldLmlkO1xyXG4gICAgICAgICAgICBuZXdSb3dbZmllbGRdID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXdSb3cuaWQgPSAnTkVXJyArIE1hdGgucmFuZG9tKCk7IC8vINCz0LXQvdC10YDQuNC8INC90L7QstC+0LUg0LjQtFxyXG5cclxuICAgICAgICAvLyDQvtGC0LrRgNC+0LXQvCDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L4g0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtncmlkUm93RWRpdDogdHJ1ZSwgZ3JpZFJvd0V2ZW50OiAnYWRkJywgZ3JpZFJvd0RhdGE6IG5ld1Jvd30pO1xyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJjcmVhdGVHcmlkUm93XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHN0eWxlID0gc3R5bGVzLmdyaWRSb3csXHJcbiAgICAgICAgICAgIHJvdyA9IHRoaXMuc3RhdGUuZ3JpZFJvd0RhdGEsXHJcbiAgICAgICAgICAgIHZhbGlkYXRlTWVzc2FnZSA9ICcnLFxyXG4gICAgICAgICAgICBtb2RhbE9iamVjdHMgPSBbJ2J0bk9rJywgJ2J0bkNhbmNlbCddLFxyXG4gICAgICAgICAgICBidXR0b25Pa1JlYWRPbmx5ID0gdmFsaWRhdGVNZXNzYWdlLmxlbmd0aCA+IDAgfHwgIXRoaXMuc3RhdGUuY2hlY2tlZDtcclxuXHJcbiAgICAgICAgaWYgKGJ1dHRvbk9rUmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgLy8g0YPQsdC10YDQtdC8INC60L3QvtC/0LrRgyDQntC6XHJcbiAgICAgICAgICAgIG1vZGFsT2JqZWN0cy5zcGxpY2UoMCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKCFyb3cpIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwpO1xyXG5cclxuICAgICAgICBsZXQgbm9tRGF0YSA9IHRoaXMuc3RhdGUubGlic1snbm9tZW5jbGF0dXJlJ10uZmlsdGVyKGZ1bmN0aW9uKGxpYikgIHtcclxuICAgICAgICAgICAgaWYgKCFsaWIuZG9rIHx8IGxpYi5kb2sgPT09IExJQkRPSykgcmV0dXJuIGxpYjtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiLm1vZGFsUGFnZVwifSwgXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxQYWdlLCB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbE9iamVjdHM6IG1vZGFsT2JqZWN0cywgXHJcbiAgICAgICAgICAgICAgICByZWY6IFwibW9kYWxwYWdlLWdyaWQtcm93XCIsIFxyXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VDbGljaywgXHJcbiAgICAgICAgICAgICAgICBtb2RhbFBhZ2VOYW1lOiBcIlJlYSBsaXNhbWluZSAvIHBhcmFuZGFtaW5lXCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3JlZjogXCJncmlkLXJvdy1jb250YWluZXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7dGl0bGU6IFwiVGVlbnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibm9taWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliczogXCJub21lbmNsYXR1cmVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbm9tRGF0YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93Lm5vbWlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHJvdy5rb29kLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwibm9taWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiVGVlbnVzZSBrb29kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUdyaWRSb3dDaGFuZ2V9KVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHt0aXRsZTogXCJLb2d1cyBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtvZ3VzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5rb2d1cywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwia29ndXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVHcmlkUm93SW5wdXR9KVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHt0aXRsZTogXCJIaW5kIFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaGluZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cuaGluZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiaGluZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUdyaWRSb3dJbnB1dH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NSb3d9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge3RpdGxlOiBcIktibS10YTogXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrYm10YVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cua2JtdGEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrYm10YVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUdyaWRSb3dDaGFuZ2V9KVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHt0aXRsZTogXCJLYm06IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2JtXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5rYm0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrYm1cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlR3JpZFJvd0lucHV0fSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7dGl0bGU6IFwiU3VtbWE6IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiU3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LnN1bW1hLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwic3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVHcmlkUm93SW5wdXR9KVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB2YWxpZGF0ZU1lc3NhZ2UpKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiaGFuZGxlR3JpZFJvd0NoYW5nZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINC90LAg0YTQvtGA0LzQtVxyXG4gICAgICAgIGxldCByb3dEYXRhID0gT2JqZWN0KHt9LCB0aGlzLnN0YXRlLmdyaWRSb3dEYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSByb3dEYXRhW25hbWVdICYmIG5hbWUgPT09ICdub21pZCcpIHtcclxuICAgICAgICAgICAgLy8g0L/RgNC+0LjQt9C+0YjQu9C+INC40LfQvNC10L3QtdC90LjQtSDRg9GB0LvRg9Cz0LgsINC+0LHQvdGD0LvQuNC8INC30L3QsNGH0LXQvdC40Y9cclxuICAgICAgICAgICAgcm93RGF0YVsna29ndXMnXSA9IDA7XHJcbiAgICAgICAgICAgIHJvd0RhdGFbJ2hpbmQnXSA9IDA7XHJcbiAgICAgICAgICAgIHJvd0RhdGFbJ3N1bW1hJ10gPSAwO1xyXG4gICAgICAgICAgICByb3dEYXRhWydrYm0nXSA9IDA7XHJcbiAgICAgICAgICAgIHJvd0RhdGFbJ2tibXRhJ10gPSAwO1xyXG4gICAgICAgICAgICByb3dEYXRhWydub21pZCddID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC40YnQtdC8INC/0L4g0YHQv9GA0LDQstC+0YfQvdC40LrRgyDQv9C+0LvRjyDQutC+0LQg0Lgg0L3QsNC40LzQtdC90L7QstCw0L3QuNC1XHJcblxyXG4gICAgICAgIGxldCBsaWJEYXRhID0gdGhpcy5zdGF0ZS5saWJzWydub21lbmNsYXR1cmUnXTtcclxuICAgICAgICBsaWJEYXRhLmZvckVhY2goZnVuY3Rpb24ocm93KSAge1xyXG4gICAgICAgICAgICBpZiAocm93LmlkID09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByb3dEYXRhWydrb29kJ10gPSByb3cua29vZDtcclxuICAgICAgICAgICAgICAgIHJvd0RhdGFbJ25pbWV0dXMnXSA9IHJvdy5uYW1lO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJvd0RhdGFbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtncmlkUm93RGF0YTogcm93RGF0YX0pO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGVHcmlkUm93KCk7XHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImhhbmRsZUdyaWRSb3dJbnB1dFwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgLy8g0L/QtdGA0LXRgdGH0LXRgiDRgdGD0LzQvFxyXG4gICAgICAgIGxldCByb3dEYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZS5ncmlkUm93RGF0YSk7XHJcbiAgICAgICAgcm93RGF0YVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIHJvd0RhdGEgPSB0aGlzLnJlY2FsY1Jvd1N1bW0ocm93RGF0YSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0RhdGE6IHJvd0RhdGF9KTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRlR3JpZFJvdygpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcInJlY2FsY1Jvd1N1bW1cIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihncmlkUm93RGF0YSkge1xyXG4gICAgICAgIC8vINC/0LXRgNC10YDQsNGB0YfQtdGCINGB0YPQvNC80Ysg0YHRgtGA0L7QutC4INC4INGA0LDRgdGH0LXRgiDQvdCw0LvQvtCz0LBcclxuICAgICAgICBncmlkUm93RGF0YVsna29ndXMnXSA9IE51bWJlcihncmlkUm93RGF0YS5rb2d1cyk7XHJcbiAgICAgICAgZ3JpZFJvd0RhdGFbJ2hpbmQnXSA9IE51bWJlcihncmlkUm93RGF0YS5oaW5kKTtcclxuICAgICAgICBncmlkUm93RGF0YVsna2JtdGEnXSA9IE51bWJlcihncmlkUm93RGF0YVsna29ndXMnXSkgKiBOdW1iZXIoZ3JpZFJvd0RhdGFbJ2hpbmQnXSk7XHJcbiAgICAgICAgZ3JpZFJvd0RhdGFbJ2tibSddID0gTnVtYmVyKGdyaWRSb3dEYXRhWydrYm10YSddICogMC4yMCk7IC8vIEB0b2RvINCy0YDQvNC10L3QvdC+XHJcbiAgICAgICAgZ3JpZFJvd0RhdGFbJ3N1bW1hJ10gPSBOdW1iZXIoZ3JpZFJvd0RhdGFbJ2tibXRhJ10pICsgTnVtYmVyKGdyaWRSb3dEYXRhWydrYm0nXSk7XHJcblxyXG4gICAgICAgIHJldHVybiBncmlkUm93RGF0YTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJyZWNhbGNEb2NTdW1tYVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGRvY0RhdGEpIHtcclxuICAgICAgICBsZXQgZ3JpZERhdGEgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLnN0YXRlLmdyaWREYXRhKTtcclxuXHJcbiAgICAgICAgZG9jRGF0YVsnc3VtbWEnXSA9IDA7XHJcbiAgICAgICAgZG9jRGF0YVsna2JtJ10gPSAwO1xyXG4gICAgICAgIGdyaWREYXRhLmZvckVhY2goZnVuY3Rpb24ocm93KSAge1xyXG4gICAgICAgICAgICBkb2NEYXRhWydzdW1tYSddICs9IE51bWJlcihyb3dbJ3N1bW1hJ10pO1xyXG4gICAgICAgICAgICBkb2NEYXRhWydrYm0nXSArPSBOdW1iZXIocm93WydrYm0nXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRvY0RhdGE7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwidmFsaWRhdGVHcmlkUm93XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gd2lsbCBjaGVjayB2YWx1ZXMgb24gdGhlIGZvcm0gYW5kIHJldHVybiBzdHJpbmcgd2l0aCB3YXJuaW5nXHJcbiAgICAgICAgbGV0IHdhcm5pbmcgPSAnJyxcclxuICAgICAgICAgICAgZ3JpZFJvd0RhdGEgPSB0aGlzLnN0YXRlLmdyaWRSb3dEYXRhO1xyXG4gICAgICAgIC8vINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INC/0YDQvtCy0LXRgNC60Lgg0YTQvtGA0LzRiyDQvdCwINCy0LDQu9C40LTQvdC+0YHRgtGMXHJcbiAgICAgICAgaWYgKCFncmlkUm93RGF0YVsnbm9taWQnXSkgd2FybmluZyA9IHdhcm5pbmcgKyAnINC60L7QtCDRg9GB0LvRg9Cz0LgnO1xyXG4gICAgICAgIGlmICghZ3JpZFJvd0RhdGFbJ2tvZ3VzJ10pIHdhcm5pbmcgPSB3YXJuaW5nICsgJyDQutC+0Lst0LLQvic7XHJcbiAgICAgICAgaWYgKCFncmlkUm93RGF0YVsnaGluZCddKSB3YXJuaW5nID0gd2FybmluZyArICcg0YbQtdC90LAnO1xyXG5cclxuICAgICAgICBpZiAod2FybmluZy5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICAgIC8vINC10YHRgtGMINC/0YDQvtCx0LvQtdC80YtcclxuICAgICAgICAgICAgd2FybmluZyA9ICfQntGC0YHRg9GC0YHQstGD0Y7RgiDQtNCw0L3QvdGL0LU6JyArIHdhcm5pbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NoZWNrZWQ6IHRydWUsIHdhcm5pbmc6IHdhcm5pbmd9KTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJjcmVhdGVMaWJzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0LLQtdGA0L3QtdGCINC+0LHRitC10LrRgiDQsdC40LHQu9C40L7RgtC10Log0LTQvtC60YPQvNC10L3RgtCwXHJcbiAgICAgICAgbGV0IGxpYnMgPSB7fTtcclxuICAgICAgICBMSUJSQVJJRVMuZm9yRWFjaChmdW5jdGlvbihsaWIpICB7XHJcbiAgICAgICAgICAgIGxpYnNbbGliXSA9IFtdO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGxpYnM7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuQXJ2ZS5Qcm9wVHlwZXMgPSB7XHJcbiAgICBkb2NEYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBicG06IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcclxuICAgIGVkaXRlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBzaG93TWVzc2FnZUJveDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGdyaWREYXRhOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICByZWxhdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcclxuICAgIGdyaWRDb25maWc6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcclxuICAgIGdyaWRSb3dFZGl0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIGdyaWRSb3dFdmVudDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGdyaWRSb3dEYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgbGliczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIGNoZWNrZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgd2FybmluZzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xyXG5cclxufVxyXG5cclxuXHJcbi8qXHJcbiBBcnZlLmRlZmF1bHRQcm9wcyA9IHtcclxuIGRpc2FibGVkOiBmYWxzZSxcclxuIHNob3c6IHRydWVcclxuIH07XHJcbiAqL1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXJ2ZTtcclxuXHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLmpzeFxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZG9jUm93OiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibHVlJ1xuICAgIH0sXG4gICAgZG9jQ29sdW1uOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCB5ZWxsb3cnLFxuICAgICAgICB3aWR0aDogJzUwJSdcbiAgICB9LFxuICAgIGRvYzoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYnJvd24nXG4gICAgfSxcbiAgICBncmlkUm93OiB7XG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIG1hcmdpbjogJzEwJSAzMCUgMTAlIDMwJScsXG4gICAgICAgIHdpZHRoOiAnYXV0bycsXG4gICAgICAgIG9wYWNpdHk6ICcxJyxcbiAgICAgICAgdG9wOiAnMTAwcHgnXG4gICAgfVxuXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy9hcnZlL2FydmUuc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9jVHlwZUlkKSB7XG4gICAgLy8g0LLQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+0YIg0YLQuNC/0LAg0LTQvtC60YPQvNC10L3RgtCwINCy0LXRgNC90LXRgiDQutC+0LzQv9C+0L3QtdC90YIg0LTQvtC60YPQvNC10L3RgtCwXG5cbiAgICBjb25zb2xlLmxvZygncmV0dXJuRG9jQ29tcG9uZW50OicgKyBkb2NUeXBlSWQpO1xuICAgIHZhciBjb21wb25lbnQgPSB7fTtcblxuICAgIHN3aXRjaCAoZG9jVHlwZUlkKSB7XG4gICAgICAgIGNhc2UgJ1ZPUkRFUic6XG4gICAgICAgICAgICBjb21wb25lbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL3ZvcmRlci5qc3gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdQQUxLJzpcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Zyb250ZW5kL2RvY3MvcGFsa19vcGVyLmpzeCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb21wb25lbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL2FydmUvYXJ2ZS5qc3gnKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9taWRkbGV3YXJlL3JldHVybkRvY0NvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IEZvcm0gPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2Zvcm0uanMnKSxcclxuICAgIFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGFnZV9sYWJlbCcpLFxyXG4gICAgSW5wdXRUZXh0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dC5qc3gnKSxcclxuICAgIElucHV0RGF0ZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LWRhdGUuanN4JyksXHJcbiAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LW51bWJlci5qc3gnKSxcclxuICAgIFRvb2xiYXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy10b29sYmFyLmpzeCcpLFxyXG4gICAgRG9jQ29tbW9uID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtY29tbW9uLmpzeCcpLFxyXG4gICAgU2VsZWN0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtc2VsZWN0LmpzeCcpLFxyXG4gICAgVGV4dEFyZWEgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0YXJlYS5qc3gnKSxcclxuICAgIERhdGFHcmlkID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtZGF0YS1ncmlkLmpzeCcpLFxyXG4gICAgR3JpZFJvdyA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvc29yZGVyLWdyaWQtcm93LmpzeCcpO1xyXG5cclxudmFyIGRvY1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2RvY19zdG9yZS5qcycpLFxyXG4gICAgcmVsYXRlZERvY3VtZW50cyA9IHJlcXVpcmUoJy4uL21peGluL3JlbGF0ZWREb2N1bWVudHMuanN4JyksXHJcbiAgICB2YWxpZGF0ZUZvcm0gPSByZXF1aXJlKCcuLi9taXhpbi92YWxpZGF0ZUZvcm0nKTtcclxuXHJcbnZhciBub3cgPSBuZXcgRGF0ZSgpO1xyXG5cclxuY29uc3QgVm9yZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlZvcmRlclwiLFxyXG4gICAgcGFnZXM6ICBbe3BhZ2VOYW1lOiAnVsOkbGphbWFrc2Uga2Fzc2FvcmRlcid9XSxcclxuICAgIHJlcXVpcmVkRmllbGRzOiAgW1xyXG4gICAgICAgIHtuYW1lOiAna3B2JywgdHlwZTogJ0QnLCBtaW46IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSAtIDEpLCBtYXg6IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSArIDEpfSxcclxuICAgICAgICB7bmFtZTogJ2FzdXR1c2lkJywgdHlwZTogJ0knfSxcclxuICAgICAgICB7bmFtZTogJ25pbWknLCB0eXBlOiAnQyd9LFxyXG4gICAgICAgIHtuYW1lOiAnc3VtbWEnLCB0eXBlOiAnTid9XHJcbiAgICBdLFxyXG4vKlxyXG4gICAgbWl4aW5zOiBbcmVsYXRlZERvY3VtZW50cywgdmFsaWRhdGVGb3JtXSxcclxuKi9cclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDRg9GB0YLQsNC90L7QstC40Lwg0LjQt9C90LDRh9Cw0LvRjNC90YvQtSDQtNCw0L3QvdGL0LVcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkb2NEYXRhOiB0aGlzLnByb3BzLmRhdGEucm93LFxyXG4gICAgICAgICAgICBlZGl0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93TWVzc2FnZUJveDogJ25vbmUnLFxyXG4gICAgICAgICAgICBncmlkRGF0YTogdGhpcy5wcm9wcy5kYXRhLmRldGFpbHMsXHJcbiAgICAgICAgICAgIHJlbGF0aW9uczogdGhpcy5wcm9wcy5kYXRhLnJlbGF0aW9ucyxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZzogdGhpcy5wcm9wcy5kYXRhLmdyaWRDb25maWcsXHJcbiAgICAgICAgICAgIGdyaWRSb3dFZGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgZ3JpZFJvd0V2ZW50OiBudWxsLFxyXG4gICAgICAgICAgICBncmlkUm93RGF0YTogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0L/QuNGI0LXQvCDQuNGB0YXQvtC00L3Ri9C1INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LUsINGA0LXQs9C40YHRgtGA0LjRgNGD0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICBkYXRhID0gc2VsZi5wcm9wcy5kYXRhLnJvdyxcclxuICAgICAgICAgICAgZGV0YWlscyA9IHNlbGYucHJvcHMuZGF0YS5kZXRhaWxzLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnID0gc2VsZi5wcm9wcy5kYXRhLmdyaWRDb25maWc7XHJcblxyXG4gICAgICAgIC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RvY0lkQ2hhbmdlJywgZGF0YS5pZCk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGRldGFpbHMpOyAvLyDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRDb25maWdDaGFuZ2UnLCBncmlkQ29uZmlnKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkTmFtZScsICdzb3JkZXItZ3JpZC1yb3cnKTsgLy8g0LfQsNC00LDQtdC8INC40LzRjyDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdGC0YDQvtC60Lgg0LPRgNC40LTQsCAo0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRlZDogbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdGCINC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0LIg0LPRgNC40LTQtVxyXG4gICAgICAgIGRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGV0YWlscycsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgaXNDaGFuZ2VkID0gSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50IGRldGFpbHMgY2hhbmdlZCcsIGlzQ2hhbmdlZCwgdHlwZW9mIG5ld1ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0NoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vINC40YLQvtCz0LhcclxuICAgICAgICAgICAgICAgIGxldCBzdW1tYSA9IG5ld1ZhbHVlLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSk7fSwwKSwgLy8g0YHRg9C80LzQsCDQtNC+0LrRg9C80LXQvdGC0LBcclxuICAgICAgICAgICAgICAgICAgICBkb2NEYXRhID0gc2VsZi5zdGF0ZS5kb2NEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY0RhdGEuc3VtbWEgPSBzdW1tYTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgc3VtbWE6Jywgc3VtbWEpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Z3JpZERhdGE6IG5ld1ZhbHVlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3ZvcmRlciBvbkNoYW5nZSAnLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHByZXZpb3VzVmFsdWUpKSB7XHJcbi8vICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRlZDogbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINC90LAg0L/QvtC70LUgYXN1dHVzaWQg0Lgg0YLQvtCz0LTQsCDQt9Cw0L/RgNC+0YEg0L3QsCDQvdC+0LzQtdGA0LAg0YHRh9C10YLQvtCyINGBINC/0LDRgNCw0LzQtdGC0YDQsNC80Lgg0JjQlCDRg9GH0YDQtdC20LTQtdC90LjRjyDQuCDQvdC+0LzQtdGA0LAg0YHRh9C10YLQsFxyXG4vLyAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndm9yZGVyIG9uQ2hhbmdlICcsIG5ld1ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG5ld1ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbmV3VmFsdWUuYXN1dHVzaWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0YHRgtC40YDQsNC10Lwg0YHRgdGL0LvQutGDINC90LAg0YHRh9C10YJcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmFydmlkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJyxkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkb2NEYXRhOiBkYXRhfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDRg9GB0YLQsNC90L7QstC40Lwg0L3QvtCy0YvQuSDRhNC40LvRjNGC0YBcclxuICAgICAgICAgICAgICAgIHZhciBhcnZlTGliUGFyYW1zID0gW2RhdGEuYXN1dHVzaWQsIGRhdGEuYXJ2aWRdO1xyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2V0TGlic0ZpbHRlcicsICdhcnZlZCcsYXJ2ZUxpYlBhcmFtcyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XHJcbiAgICAgICAgdGhpcy5yZWxhdGVkRG9jdW1lbnRzKCk7XHJcblxyXG5cclxuICAgICAgICAvLyDQs9GA0YPQt9C40Lwg0YHQv9GA0LDQstC+0YfQvdC40LrQuFxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2xvYWRMaWJzJywgJycpO1xyXG5cclxuICAgICAgICAvLyDQtdGB0LvQuCDQvdC+0LLRi9C5INC00L7QutGD0LzQtdC90YIgKGlkID09IDApXHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGE7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmlkID09IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2VkaXRlZCBtb2RlIGNvbnRyb2wnLCBkYXRhKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5zdGF0ZS5kb2NEYXRhLFxyXG4gICAgICAgICAgICBpc0VkaXRlTW9kZSA9IHRoaXMuc3RhdGUuZWRpdGVkLFxyXG4gICAgICAgICAgICBzaG93TWVzc2FnZUJveCA9IHRoaXMuc3RhdGUuc2hvd01lc3NhZ2VCb3g7IC8vINCx0YPQtNC10YIg0YPQv9GA0LDQstC70Y/RgtGMINC+0LrQvdC+0Lwg0YHQvtC+0LHRidC10L3QuNC5XHJcblxyXG4gICAgICAgIC8vICBwYXR0ZXJuPSdbQS1aYS16XXszfSdcclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSB0aGlzLnN0YXRlLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBncmlkQ29sdW1ucyA9IHRoaXMuc3RhdGUuZ3JpZENvbmZpZztcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ZvcmRlciBwYWdlcycsIHRoaXMucGFnZXMpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybSwge3BhZ2VzOiB0aGlzLnBhZ2VzLCByZWY6IFwiZm9ybVwiLCBvblN1Ym1pdDogdGhpcy5vblN1Ym1pdCwgc3R5bGU6IHtkaXNwbGF5OiAndGFibGUnfX0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyLCB7dmFsaWRhdG9yOiB0aGlzLnZhbGlkYXRlRm9ybX0pLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJkaXYtZG9jXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERvY0NvbW1vbiwge2RhdGE6IGRhdGF9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZpZWxkc2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTnVtYmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJudW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5udW1iZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiZmFsc2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0RGF0ZSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJLdXVww6RldiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtwdlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmtwdiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwia3B2XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiS3V1cMOkZXZcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkthc3NhXCIsIG5hbWU6IFwia2Fzc2FfaWRcIiwgbGliczogXCJhYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmthc3NhX2lkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZGF0YS5rYXNzYSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLYXNzYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrYXNzYV9pZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIlBhcnRuZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFzdXR1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliczogXCJhc3V0dXNlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFzdXR1c2lkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZGF0YS5hc3V0dXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiUGFydG5lclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJhc3V0dXNpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQXJ2ZSBuci5cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFydmlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliczogXCJhcnZlZFNpc3NlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuYXJ2aWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBkYXRhLmFydm5yLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkFydmUgbnIuXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImFydmlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnRuRGVsZXRlOiB0cnVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJEb2t1bWVudCBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRva3VtZW50XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuZG9rdW1lbnQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiRG9rdW1lbnRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZG9rdW1lbnRcIiwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOaW1pXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5pbWlcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIk5pbWlcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJuaW1pXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hYWRyZXNzLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCB3aWR0aDogXCI4NSVcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQWFkcmVzc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhYWRyZXNzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJBYWRyZXNzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYWFkcmVzc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcInRleHRBYWRyZXNzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hYWRyZXNzLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCB3aWR0aDogXCI4NSVcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJBbHVzXCIsIG5hbWU6IFwiYWx1c1wiLCBwbGFjZWhvbGRlcjogXCJBbHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYWx1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcInRleHRBbHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hbHVzLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCB3aWR0aDogXCI4NSVcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhR3JpZCwge3NvdXJjZTogXCJkZXRhaWxzXCIsIGdyaWREYXRhOiBncmlkRGF0YSwgZ3JpZENvbHVtbnM6IGdyaWRDb2x1bW5zLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlR3JpZFJvdzogdGhpcy5oYW5kbGVHcmlkUm93LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgcmVmOiBcIkRhdGFHcmlkXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIlN1bW1hOiBcIiwgbmFtZTogXCJzdW1tYVwiLCBwbGFjZWhvbGRlcjogXCJTdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnN1bW1hLCBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCJeWzAtOV0rKFxcXFwuWzAtOV17MSw0fSk/JFwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qINC/0LDRgtC10YDQvSDQtNC70Y8g0YbQuNGE0YAg0YEgNCDQt9C90LDQutCw0LzQuCDQv9C+0YHQu9C1INGC0L7Rh9C60LgqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiTcOkcmt1c2VkXCIsIG5hbWU6IFwibXV1ZFwiLCBwbGFjZWhvbGRlcjogXCJNw6Rya3VzZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJtdXVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5tdXVkLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCB3aWR0aDogXCI4NSVcIn0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZ3JpZFJvd0VkaXQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEdyaWRSb3csIHttb2RhbFBhZ2VDbGljazogdGhpcy5tb2RhbFBhZ2VDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRFdmVudDogdGhpcy5zdGF0ZS5ncmlkUm93RXZlbnQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkUm93RGF0YTogdGhpcy5zdGF0ZS5ncmlkUm93RGF0YX0pIDogbnVsbFxyXG5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUdyaWRSb3c6IGZ1bmN0aW9uIChncmlkRXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAvLyDRg9C/0YDQsNCy0LvQtdC90LjQtSDQvNC+0LTQsNC70YzQvdGL0Lwg0L7QutC90L7QvFxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiB0cnVlLCBncmlkUm93RXZlbnQ6IGdyaWRFdmVudCwgZ3JpZFJvd0RhdGE6IGRhdGF9KTtcclxuICAgIH0sXHJcblxyXG4gICAgbW9kYWxQYWdlQ2xpY2s6IGZ1bmN0aW9uIChidG5FdmVudCwgZGF0YSkge1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQvtGC0LDQtdC8IE9rINC40Lcg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LBcclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzLFxyXG4gICAgICAgICAgICBkb2NEYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgZ3JpZFJvd0lkID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZ3JpZFJvd0lkLFxyXG4gICAgICAgICAgICBncmlkQ29sdW1ucyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRDb25maWc7XHJcbiAgICAgICAgdmFyIGdyaWRSb3cgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGdyaWRSb3dJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGdyaWRSb3cgPSBncmlkRGF0YVtncmlkUm93SWRdO1xyXG4gICAgICAgIH1cclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdwcmV2aW9zIHN0YXRlIGdyaWREYXRhLCBkb2NEYXRhJywgZ3JpZERhdGEsICBkb2NEYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcclxuLy8gICAgICAgICAgICBjb25zb2xlLmxvZygnIG1vZGFsUGFnZUNsaWNrIGRhdGEsIGdyaWRSb3dJZCwgZ3JpZFJvdycsIGRhdGEsIGdyaWRSb3dJZCwgZ3JpZFJvdyk7XHJcbiAgICAgICAgICAgIGlmIChncmlkUm93SWQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvdC+0LLQsNGPINC30LDQv9C40YHRjFxyXG4gICAgICAgICAgICAgICAgLy8g0YTQvtGA0LzQuNGA0YPQtdC8INC/0YPRgdGC0YPRjiDRgdGC0YDQvtC60YNcclxuLy8gICAgICAgICAgICAgICAgZ3JpZFJvdyA9e307XHJcbiAgICAgICAgICAgICAgICBncmlkUm93WydpZCddID0gJ05FVycgKyBNYXRoLnJhbmRvbSgpOyAgLy8g0LPQtdC90LXRgNC40YDRg9C10Lwg0L3QvtCy0L7QtSDQmNCUXHJcbiAgICAgICAgICAgICAgICBncmlkQ29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSAge3JldHVybiBncmlkUm93W2ZpZWxkXSA9IG51bGw7fSk7IC8vINGB0L7Qt9C00LDQtdC8INC/0L7Qu9GPINCyINC+0LHRitC10LrRgtC1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbihmaWVsZCkgIHtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbZmllbGQubmFtZV0gPSBmaWVsZC52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9GB0L7RhdGA0LDQvdC40Lwg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtSwgZ3JpZFJvdycsIGdyaWRSb3cpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vINC30LDQv9C+0LvQvdC40Lwg0L/QvtC70Y8gbmltZXR1c1xyXG4gICAgICAgICAgICB2YXIgbGlicyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmxpYnMsXHJcbiAgICAgICAgICAgICAgICBub21MaWIgPSBsaWJzLmZpbHRlcihmdW5jdGlvbihkYXRhKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmlkID09ICdub21lbmNsYXR1cmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciAgIG5vbVJvdyA9IG5vbUxpYlswXS5kYXRhLmZpbHRlcihmdW5jdGlvbihyb3cpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT0gTnVtYmVyKGdyaWRSb3cubm9taWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvdztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobm9tUm93KSB7XHJcbiAgICAgICAgICAgICAgICBncmlkUm93WyduaW1ldHVzJ10gPSBub21Sb3dbMF0ubmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FmdGVyIHN0YXRlIGdyaWREYXRhICVzLCBkb2NEYXRhICVzJywgZ3JpZERhdGEsICBkb2NEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChncmlkUm93SWQgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGFbZ3JpZFJvd0lkXSA9IGdyaWRSb3c7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YS5wdXNoKGdyaWRSb3cpOyAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkUm93SWRDaGFuZ2UnLCBncmlkRGF0YS5sZW5ndGgpOyAvLyDQv9C+0LzQtdGH0LDQtdC8INC90L7QstGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGdyaWREYXRhKTsgLy8g0L/QuNGI0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDRgdGH0LjRgtCw0LXQvCDQuNGC0L7Qs9C4XHJcblxyXG4gICAgICAgIHZhciBkb2NTdW1tYSA9IGdyaWREYXRhLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSk7fSwgMCk7IC8vINGB0YPQvNC80LAg0YHRh9C10YLQsFxyXG5cclxuICAgICAgICBkb2NEYXRhLnN1bW1hID0gZG9jU3VtbWE7XHJcblxyXG4gICAgICAgIHRoaXMucmVmc1snRGF0YUdyaWQnXS5yZXBsYWNlU3RhdGUoe2dyaWREYXRhOiBncmlkRGF0YX0pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiBmYWxzZSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG5cclxuICAgIH0sXHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVm9yZGVyO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2RvY3Mvdm9yZGVyLmpzeFxuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbnZhciBQYWdlTGFiZWwgPSByZXF1aXJlKCcuL3BhZ2VfbGFiZWwnKTtcblxudmFyIEZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdGb3JtJyxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICB2YXIgcGFnZXMgPSBbeyBwYWdlTmFtZTogJ1BhZ2UnIH1dO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5wYWdlcykge1xuICAgICAgICAgICAgcGFnZXMgPSB0aGlzLnByb3BzLnBhZ2VzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYWdlczogdGhpcy5wcm9wcy5wYWdlc1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHBhZ2VzID0gdGhpcy5zdGF0ZS5wYWdlcztcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgY2xhc3NOYW1lOiAnY29udGFpbmVyJyB9LCBwYWdlcy5tYXAoZnVuY3Rpb24gKHBhZ2UsIGlkeCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGFnZUxhYmVsLCB7IGtleTogaWR4LCBwYWdlSWR4OiBpZHggfSwgcGFnZSk7XG4gICAgICAgIH0pLCBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGNsYXNzTmFtZTogJ3BhZ2UnIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nLCBudWxsLCB0aGlzLnByb3BzLmNoaWxkcmVuKSkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2Zvcm0uanNcbi8vIG1vZHVsZSBpZCA9IDY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xuXG52YXIgUGFnZUxhYmVsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnUGFnZUxhYmVsJyxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgLy8gICAgICBjb25zb2xlLmxvZygncGFnZSBsYWJlbCBjb21wb25lbnRXaWxsTW91bnQnKVxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7IGRpc2FibGVkOiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbiBoYW5kbGVDbGljayhwYWdlKSB7XG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0YHQvtCx0YvRgtC40LUg0LrQu9C40LosINC/0L7QtNCz0YDRg9C20LDQtdC8INGB0LLRj9C30LDQvdC90YvQuSDQtNC+0LrRg9C80LXQvdGCXG4gICAgICAgIC8vICAgICAgIGFsZXJ0KCdjbGljazonICsgcGFnZU5hbWUpO1xuICAgICAgICAvLyBkb2NUeXBlSWQ6IGRvYy5kb2NfdHlwZSwgZG9jSWQ6ZG9jLmlkLCBwYWdlTmFtZTonTGF1c2VuZCBpZDonICsgZG9jLmlkXG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYWdlIGRpc2FibGVkJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFnZS5kb2NJZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsZUNsaWNrIHBhZ2UuZG9jVHlwZUlkICVzLCBwYWdlLmRvY0lkICVuJyk7XG4gICAgICAgICAgICB2YXIgdXJsID0gXCIvZG9jdW1lbnQvXCIgKyBwYWdlLmRvY1R5cGVJZCArIHBhZ2UuZG9jSWQ7XG4gICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgY2xhc3NOYW1lID0gJ3BhZ2VMYWJlbCc7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeyBjbGFzc05hbWU6IGNsYXNzTmFtZSwgb25DbGljazogdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMsIHRoaXMucHJvcHMuY2hpbGRyZW4pLCBkaXNhYmxlZDogdGhpcy5zdGF0ZS5kaXNhYmxlZCB9LCB0aGlzLnByb3BzLmNoaWxkcmVuLnBhZ2VOYW1lLCAnICcpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VMYWJlbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvcGFnZV9sYWJlbC5qc1xuLy8gbW9kdWxlIGlkID0gNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBJbnB1dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJJbnB1dFwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB0cnVlLFxyXG4gICAgICAgICAgICB2YWxpZDogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogJ2RlZmF1bE5hbWUnLFxyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ2RlZmF1bE5hbWUnLFxyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXHJcbiAgICAgICAgICAgIHBhdHRlcm46ICcnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1IGRvY0lkLiDQldGB0LvQuCDQt9C90LDRh9C10L3QuNC1ID0gMCAo0LTQvtCx0LDQstC70Y/QtdC8INC90L7QstGD0Y4g0LfQsNC/0LjRgdGMLCDRgtC+INC/0YDQvtGB0YLQviDQvtGH0LjRgtC60LAg0L/QvtC70LXQuSwg0LjQvdCw0YfQtSDQv9C+0LTQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFXHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZG9jSWQnLCAgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGB0L7Qt9C00LDQvdC40LUg0L3QvtCy0L7Qs9C+INC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogMH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdvbiBjaGFuZ2U6ZWRpdGVkOicgKyBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkYXRhJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0YHQu9GD0YjRg9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINC00LDQvdC90YvRhTtcclxuLy8gICAgICAgICAgY29uc29sZS5sb2coJ2lucHV0LXRleHQgb24gY2hhbmdlIGRhdGE6JywgbmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gbmV3VmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhW3NlbGYucHJvcHMubmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uIChuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV4dFByb3BzLnZhbHVlfSlcclxuICAgIH0sXHJcblxyXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbiAobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyDQuNC30LzQtdC90LXQvdC40Y8g0LHRg9C00YPRgiDQvtGC0YDQsNC20LDRgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0YHQu9GD0YfQsNC1INC10YHQu9C4INGC0LDQutC40LUg0LXRgdGC0YxcclxuXHJcbiAgICAgICAgbGV0IHJldHVyblZhbHVlID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZSA9IChuZXh0U3RhdGUudmFsdWUgIT09IHRoaXMuc3RhdGUudmFsdWUgfHxcclxuICAgICAgICAgICAgbmV4dFN0YXRlLnJlYWRPbmx5ICE9PSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8XHJcbiAgICAgICAgICAgIG5leHRTdGF0ZS5kaXNhYmxlZCAhPT0gdGhpcy5zdGF0ZS5kaXNhYmxlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIGlzUGF0dGVyVmFsaWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5wYXR0ZXJuICYmIGZpZWxkVmFsdWUuY2hhckF0KGZpZWxkVmFsdWUubGVuZ3RoIC0gMSkgIT09ICcuJykge1xyXG5cclxuICAgICAgICAgICAgLy8g0L/RgNC+0LLQvtC00LjQvCDQv9GA0L7QstC10YDQutGDINC90LAg0YHQvtC+0YLQstC10YLRgdGC0LLQuNC1INGI0LDQsdC70L7QvdGDXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBmaWVsZFZhbHVlLm1hdGNoKHRoaXMucHJvcHMucGF0dGVybiwgJycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGF0dGVybiB2YWxlOicgKyBmaWVsZFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSBkYXRhW3RoaXMucHJvcHMubmFtZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0YLQvtC70YzQutC+INC10YHQu9C4INGB0L7QvtGC0LLQtdGC0YHRgtCy0YPQtdGCINC/0LDRgtGC0LXRgNC90YNcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdvbkNoYW5nZSBmaWVsZFZhbHVlIGZpbmlzaCcsIHRoaXMucHJvcHMubmFtZSwgdGhpcy5zdGF0ZS52YWx1ZSk7XHJcblxyXG4gICAgICAgIGRhdGFbdGhpcy5wcm9wcy5uYW1lXSA9IGZpZWxkVmFsdWU7XHJcbiAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAgLy8g0L7RgtC00LDQtNC40Lwg0L7QsdGA0LDQsdC+0YLRh9C40LrRgywg0LXRgdC70Lgg0LfQsNC00LDQvVxyXG4gICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAvLyDRgdC80L7RgtGA0LjQvCDQuiDRh9C10LzRgyDQv9GA0LjQstGP0LfQsNC9INGB0LXQu9C10LrRgiDQuCDQvtGC0LTQsNC40Lwg0LXQs9C+INC90LDQstC10YDRhVxyXG4gICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGUsIHRoaXMucHJvcHMubmFtZSk7IC8vINCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDQt9Cw0LTQsNC9INC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0LLQtdGA0YXQvdC10Lwg0YPRgNC+0LLQvdC1LCDQvtGC0LTQsNC00LjQvCDQvtCx0YDQsNCx0L7RgtC60YMg0YLRg9C00LBcclxuICAgICAgICAgfVxyXG4gICAgICAgICAqL1xyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaW5wdXRDbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZSB8fCAnJyArICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXREaXNhYmxlZCA9IHRoaXMuc3RhdGUuZGlzYWJsZWQsXHJcbiAgICAgICAgICAgIGlucHV0UGxhY2VIb2xkZXIgPSB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8IHRoaXMucHJvcHMubmFtZSxcclxuICAgICAgICAgICAgbXlTdHlsZSA9IHt3aWR0aDogJ2F1dG8nfTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0UmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgaW5wdXRDbGFzc05hbWUgPSBpbnB1dENsYXNzTmFtZSArICcgZG9jLWlucHV0LXJlYWRvbmx5JztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMud2lkdGgpIHtcclxuICAgICAgICAgICAgbXlTdHlsZS53aWR0aCA9IHRoaXMucHJvcHMud2lkdGhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbnB1dERpc2FibGVkID09ICd0cnVlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge2h0bWxGb3I6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb3JtLXdpZGdldC1sYWJlbFwiICsgaW5wdXRDbGFzc05hbWV9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJ0ZXh0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogbXlTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogaW5wdXRSZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy5wcm9wcy5wYXR0ZXJuLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcInRleHRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGlucHV0Q2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogaW5wdXRSZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLnByb3BzLnBhdHRlcm4sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dC5qc3hcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIENvbXBvbmVudElucHV0RGF0ZSA9IHJlcXVpcmUoJy4vaW5wdXQtZGF0ZS5qc3gnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBJbnB1dERhdGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiSW5wdXREYXRlXCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkIHx8IHRydWUsXHJcbiAgICAgICAgICAgIHZhbGlkOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICAgICAgbW9udGggPSBkYXRlLmdldE1vbnRoKCksXHJcbiAgICAgICAgICAgIGRheSA9IGRhdGUuZ2V0RGF0ZSgpLFxyXG4gICAgICAgICAgICBtYXhEYXRlID0gbmV3IERhdGUoeWVhciArIDEsIG1vbnRoLCBkYXkpLFxyXG4gICAgICAgICAgICBtaW5EYXRlID0gbmV3IERhdGUoeWVhciAtIDEsIG1vbnRoLCBkYXkpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBiaW5kRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgbWluOiBtaW5EYXRlLFxyXG4gICAgICAgICAgICBtYXg6IG1heERhdGVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbiAobmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IG5leHRQcm9wcy52YWx1ZX0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINGB0L7QsdGL0YLQuNC1INC90LAg0LjQt9C80LXQvdC10L3QuNC1INGA0LXQttC40LzQsCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkgIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtyZWFkT25seTogIW5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAvLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSBkb2NJZC4g0JXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSA9IDAgKNC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQv9C40YHRjCwg0YLQviDQv9GA0L7RgdGC0L4g0L7Rh9C40YLQutCwINC/0L7Qu9C10LksINC40L3QsNGH0LUg0L/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvRhVxyXG4gICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAvLyAgICAgICAgY29uc29sZS5sb2coJ2NvbXBvbmVudFdpbGxNb3VudCcgKyB0aGlzLnByb3BzLm5hbWUpO1xyXG4gICAgIC8hKlxyXG4gICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZG9jSWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YHQvtC30LTQsNC90LjQtSDQvdC+0LLQvtCz0L4g0LTQvtC60YPQvNC10L3RgtCwXHJcbiAgICAgLyEqXHJcbiAgICAgdmFyIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgIHZhbHVlID0gZGF0YVtzZWxmLnByb3BzLm5hbWVdO1xyXG5cclxuICAgICBpZiAobmV3VmFsdWUgPT0gMCkge1xyXG4gICAgIC8vINC90L7QstGL0Lkg0LTQvtC60YPQvNC10L3RglxyXG4gICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOjB9KTtcclxuICAgICB9IGVsc2Uge1xyXG4gICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOnZhbHVlfSk7XHJcbiAgICAgfVxyXG4gICAgICohL1xyXG4gICAgIH1cclxuICAgICB9KTtcclxuICAgICAqIS9cclxuXHJcbiAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnb24gY2hhbmdlOmVkaXRlZDonICsgbmV3VmFsdWUpO1xyXG4gICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWV9KTtcclxuICAgICB9XHJcbiAgICAgfSk7XHJcblxyXG4gICAgIC8hKlxyXG4gICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGF0YScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgY29uc29sZS5sb2coJ29uIGNoYW5nZTpkYXRhOicgKyBuZXdWYWx1ZSk7XHJcbiAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcblxyXG4gICAgIHZhciBkYXRhID0gbmV3VmFsdWUsXHJcbiAgICAgZmllbGRWYWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuXHJcbiAgICAgc2VsZi5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICB9XHJcbiAgICAgfSk7XHJcblxyXG4gICAgICohL1xyXG5cclxuICAgICB9LFxyXG4gICAgICovXHJcbiAgICAvLyDQvtCx0Y/Qt9Cw0YLQtdC70YzQvdGL0LUg0L/QsNGA0LDQvNC10YLRgNGLXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxuICAgICB9LFxyXG5cclxuXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGZpZWxkVmFsdWUpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGE7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICBkYXRhW3RoaXMucHJvcHMubmFtZV0gPSBmaWVsZFZhbHVlO1xyXG5cclxuICAgICAgICAvLyDQt9Cw0LTQsNGC0Ywg0L3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INC/0L7Qu9GPXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgaW5wdXRDbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZSB8fCAnZG9jLWlucHV0JyxcclxuICAgICAgICAgICAgaW5wdXRSZWFkT25seSA9IHRoaXMuc3RhdGUucmVhZE9ubHkgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIGlucHV0RGlzYWJsZWQgPSB0aGlzLnN0YXRlLmRpc2FibGVkID09ICd0cnVlJyA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRSZWFkT25seSkge1xyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IGlucHV0Q2xhc3NOYW1lICsgJyBkb2MtaW5wdXQtcmVhZG9ubHknO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtodG1sRm9yOiB0aGlzLnByb3BzLm5hbWV9LCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnRpdGxlXHJcbiAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudElucHV0RGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBpbnB1dFJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy5wcm9wcy5wYXR0ZXJuLCBcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZUhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpbnB1dERpc2FibGVkfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApKVxyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXREYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtZGF0ZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG4vLyAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3QgSW5wdXREYXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIklucHV0RGF0ZVwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RGVmYXVsdFByb3BzOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpLFxyXG4gICAgICAgICAgICBkYXkgPSBkYXRlLmdldERhdGUoKSxcclxuICAgICAgICAgICAgbWF4RGF0ZSA9IG5ldyBEYXRlKHllYXIgKyAxLCBtb250aCwgZGF5KSxcclxuICAgICAgICAgICAgcmVmSWQgPSAnSW5wdXREYXRlJyxcclxuICAgICAgICAgICAgbWluRGF0ZSA9IG5ldyBEYXRlKHllYXIgLSA1LCBtb250aCwgZGF5KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYmluZERhdGE6IHRydWUsXHJcbiAgICAgICAgICAgIG1pbjogbWluRGF0ZSxcclxuICAgICAgICAgICAgbWF4OiBtYXhEYXRlLFxyXG4gICAgICAgICAgICByZWFkT25seTogZmFsc2UsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6ZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IG5leHRQcm9wcy52YWx1ZX0pXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBvbkNoYW5nZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoZmllbGRWYWx1ZSk7XHJcblxyXG4gICAgICAgIGlmIChmaWVsZFZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSDQvdGD0LssINGC0L4g0L/Rg9GB0YLRjCDQsdGD0LTQtdGCIG51bFxyXG4gICAgICAgICAgICB2YWxpZGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWxpZGF0aW9uICkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIC8vINC10YHQu9C4INC30LDQtNCw0L0g0L7QsdGA0LDQsdC+0YLRh9C40LosINCy0LXRgNC90LXQvCDQtdCz0L5cclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBpbnB1dENsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5uYW1lO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IGlucHV0Q2xhc3NOYW1lICsgJyBkb2MtaW5wdXQtcmVhZG9ubHknO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcImRhdGVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGlucHV0Q2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICByZWY6IHRoaXMucHJvcHMucmVmSWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy5wcm9wcy5wYXR0ZXJuLCBcclxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgIG1pbjogdGhpcy5wcm9wcy5taW4sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWF4OiB0aGlzLnByb3BzLm1heCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICApXHJcbiAgICB9LFxyXG5cclxuICAgIHZhbGlkYXRlOmZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LAg0L3QsCDQvNC40L0gLCDQvNCw0YVcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5taW4gJiYgdGhpcy5wcm9wcy5tYXggJiYgdmFsdWUpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGVWYWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKGRhdGVWYWx1ZSA+IHRoaXMucHJvcHMubWluICYmIGRhdGVWYWx1ZSA8IHRoaXMucHJvcHMubWF4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXREYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC1kYXRlLmpzeFxuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IElucHV0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIklucHV0XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSwgXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5IHx8IGZhbHNlLCBcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdHJ1ZSxcclxuICAgICAgICAgICAgdmFsaWQ6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJpbmREYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICBtaW46LTk5OTk5OTk5OSxcclxuICAgICAgICAgICAgbWF4OiA5OTk5OTk5OTlcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpIHtcclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogMH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZSwgZGlzYWJsZWQ6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkYXRhJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbmV3VmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IGRhdGFbdGhpcy5wcm9wcy5uYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6ZnVuY3Rpb24gKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdC10L3QuNGPINCx0YPQtNGD0YIg0L7RgtGA0LDQttCw0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDRgtCw0LrQuNC1INC10YHRgtGMXHJcbiAgICAgICAgdmFyIHJldHVybnZhbHVlID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSkge1xyXG4gICAgICAgICAgICB2YXIgcmV0dXJudmFsdWUgPSAobmV4dFN0YXRlLnZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlIHx8XHJcbiAgICAgICAgICAgIG5leHRTdGF0ZS5yZWFkT25seSAhPT0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fFxyXG4gICAgICAgICAgICBuZXh0U3RhdGUuZGlzYWJsZWQgIT09IHRoaXMuc3RhdGUuZGlzYWJsZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0dXJudmFsdWU7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTpmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBmaWVsZFZhbHVlID0gTnVtYmVyKGUudGFyZ2V0LnZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKGZpZWxkVmFsdWUgPj0gTnVtYmVyKHRoaXMucHJvcHMubWluKSB8fCBmaWVsZFZhbHVlIDw9IE51bWJlcih0aGlzLnByb3BzLm1heCkpIHtcclxuICAgICAgICAgICAgLy8g0LfQsNC00LDQvdC90L7QtSDQvtCz0YDQsNC90LjRh9C10L3QuNC1INC90LUg0YDQsNCx0L7RgtCw0LXRgiDQv9GA0Lgg0YDRg9GH0L3QvtC8INCy0LLQvtC00LUg0YHRg9C80LwsINC+0YLRgNCw0LHQvtGC0LDQtdC8INC10LPQvlxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYmluZERhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vINC/0YDQuNGP0LLRj9C30LrQsCDQuiDQtNCw0L3QvdGL0LxcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgLy8g0L/QvtC70YPRh9C40YLRjCDQt9C90LDRh9C10L3QuNC1XHJcbiAgICAgICAgICAgICAgICBkYXRhW3RoaXMucHJvcHMubmFtZV0gPSBmaWVsZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0YHQvNC+0YLRgNC40Lwg0Log0YfQtdC80YMg0L/RgNC40LLRj9C30LDQvSDRgdC10LvQtdC60YIg0Lgg0L7RgtC00LDQuNC8INC10LPQviDQvdCw0LLQtdGA0YVcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZSwgdGhpcy5wcm9wcy5uYW1lKTsgLy8g0LIg0YHQu9GD0YfQsNC1INC10YHQu9C4INC30LDQtNCw0L0g0L7QsdGA0LDQsdC+0YLRh9C40Log0L3QsCDQstC10YDRhdC90LXQvCDRg9GA0L7QstC90LUsINC+0YLQtNCw0LTQuNC8INC+0LHRgNCw0LHQvtGC0LrRgyDRgtGD0LTQsFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkJsdXI6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0YLQsNC60L7QuSDQvNC10YLQvtC0INC/0LXRgNC10LTQsNC9INGB0LLQtdGA0YXRgywg0YLQviDQstC10YDQvdC10YIg0LXQs9C+INC+0LHRgNCw0YLQvdC+XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25CbHVyKHRoaXMuc3RhdGUudmFsdWUsIHRoaXMucHJvcHMubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpbnB1dENsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICcnICsgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dERpc2FibGVkID0gdGhpcy5zdGF0ZS5kaXNhYmxlZCB8fCAnZmFsc2UnLFxyXG4gICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLm5hbWUsXHJcbiAgICAgICAgICAgIGlucHV0TWluVmFsdWUgPSB0aGlzLnByb3BzLm1pbiB8fCAtOTk5OTk5OTk5LFxyXG4gICAgICAgICAgICBpbnB1dE1heFZhbHVlID0gdGhpcy5wcm9wcy5tYXggfHwgOTk5OTk5OTk5O1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRSZWFkT25seSkge1xyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IGlucHV0Q2xhc3NOYW1lICsgJyBkb2MtaW5wdXQtcmVhZG9ubHknO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlucHV0RGlzYWJsZWQgPT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7aHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJudW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIlxcXFxkKyhcXFxcLlxcXFxkezJ9KT9cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICApKVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHRoaXMucHJvcHMudGl0bGUpXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcIm51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluOiBpbnB1dE1pblZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiBpbnB1dE1heFZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogXCIwLjAxXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIlxcXFxkKyhcXFxcLlxcXFxkezJ9KT9cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLm9uQmx1cn1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxyXG4gICAgfSxcclxufSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm49e3RoaXMucHJvcHMucGF0dGVybn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1udW1iZXIuanN4XG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBET0NVTUVOVF9DTE9TRURfU1RBVFVTID0gMjtcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIERvY0J1dHRvbiA9IHJlcXVpcmUoJy4vZG9jLWJ1dHRvbi5qc3gnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG52YXIgVG9vbGJhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJUb29sYmFyXCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3YXJuaW5nOiBmYWxzZSwgd2FybmluZ01lc3NhZ2U6ICcnLCBlZGl0TW9kZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRhc2tMaXN0OiB0aGlzLnByb3BzLnRhc2tMaXN0ID8gdGhpcy5wcm9wcy50YXNrTGlzdCA6IHRoaXMuZ2V0RGVmYXVsdFRhc2soKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1IGRvY0lkLiDQldGB0LvQuCDQt9C90LDRh9C10L3QuNC1ID0gMCAo0LTQvtCx0LDQstC70Y/QtdC8INC90L7QstGD0Y4g0LfQsNC/0LjRgdGMLCDRgtC+INC/0YDQvtGB0YLQviDQvtGH0LjRgtC60LAg0L/QvtC70LXQuSwg0LjQvdCw0YfQtSDQv9C+0LTQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOnNhdmVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0YDQtdC20LjQvCDQuNC30LzQtdC90LjQu9GB0Y8sINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRNb2RlOiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlU2VsZWN0VGFzazogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyDQvNC10YLQvtC0INCy0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQstGL0LHQvtGA0LUg0LfQsNC00LDRh9C4XHJcbiAgICAgICAgdmFyIHRhc2tWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVCdXR0b25UYXNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0LzQtdGC0L7QtCDQstGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LLRi9Cx0L7RgNC1INC30LDQtNCw0YfQuFxyXG4gICAgICAgIC8vINC90LDQudC00LXQvCDQsNC60YLRg9Cw0LvRjNC90YPRjiDQt9Cw0LTQsNGH0YNcclxuXHJcbiAgICAgICAgbGV0IGFjdHVhbFRhc2sgPSB0aGlzLnN0YXRlLnRhc2tMaXN0LmZpbHRlcihmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFzay5hY3R1YWxTdGVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB0YXNrID0gYWN0dWFsVGFzay5tYXAoZnVuY3Rpb24odGFzaykgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0YXNrLmFjdGlvblxyXG4gICAgICAgICAgICB9KTsgLy8g0L7RgdGC0LDQstC40Lwg0YLQvtC70YzQutC+INC90LDQt9Cy0LDQvdC40LUg0L/RgNC+0YbQtdC00YPRgNGLXHJcblxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2V4ZWN1dGVUYXNrJywgdGFzayk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUV2ZW50QnV0dG9uQWRkQ2xpY2s6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LTQu9GPINC60L3QvtC/0LrQuCBBZGRcclxuICAgICAgICAgICAgLy8g0L7RgtC/0YDQsNCy0LjQvCDQuNC30LLQtdGJ0LXQvdC40LUg0L3QsNCy0LXRgNGFXHJcbi8vICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5uYW1lKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbiggJ2RvY0lkQ2hhbmdlJywgMCApO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnZWRpdGVkQ2hhbmdlJywgdHJ1ZSApO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnc2F2ZWRDaGFuZ2UnLCBmYWxzZSApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgaGFuZGxlRXZlbnRCdXR0b25FZGl0Q2xpY2s6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LTQu9GPINC60L3QvtC/0LrQuCBFZGl0XHJcbiAgICAgICAgLy8g0L/QtdGA0LXQstC+0LTQuNC8INC00L7QutGD0LzQtdC90YIg0LIg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPLCDRgdC+0YXRgNCw0L3QtdC9ID0gZmFsc2VcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCAnZWRpdGVkQ2hhbmdlJywgdHJ1ZSApO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oICdzYXZlZENoYW5nZScsIGZhbHNlICk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVFdmVudEJ1dHRvblNhdmVDbGljazpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQtNC70Y8g0LrQvdC+0L/QutC4IFNhdmVcclxuICAgICAgICAvLyDQstCw0LvQuNC00LDRgtC+0YBcclxuXHJcbiAgICAgICAgbGV0IGlzVmFsaWQgPSAhdGhpcy52YWxpZGF0b3IoKTtcclxuXHJcbiAgICAgICAgaWYgKGlzVmFsaWQpIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/RgNC+0YjQu9C4INCy0LDQu9C40LTQsNGG0LjRjiwg0YLQviDRgdC+0YXRgNCw0L3QtdGP0LxcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbiggJ3NhdmVEYXRhJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZWRpdGVNb2RlID0gdGhpcy5zdGF0ZS5lZGl0TW9kZSxcclxuICAgICAgICAgICAgZG9jdW1lbnRTdGF0dXMgPSB0aGlzLnByb3BzLmRvY3VtZW50U3RhdHVzLFxyXG4gICAgICAgICAgICBpc0Nsb3NlZFN0YXR1cyA9IGRvY3VtZW50U3RhdHVzID09IERPQ1VNRU5UX0NMT1NFRF9TVEFUVVMgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHRhc2tXaWRnZXQgPSB0aGlzLmdlbmVyYXRlVGFza1dpZGdldCgpLFxyXG4gICAgICAgICAgICB0YXNrcyA9IHRoaXMuc3RhdGUudGFza0xpc3QubWFwKGZ1bmN0aW9uKHRhc2spICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFzay5hY3Rpb25cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZG9jLXRvb2xiYXItd2FybmluZ1wifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS53YXJuaW5nID8gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdGhpcy5zdGF0ZS53YXJuaW5nTWVzc2FnZSkgOiBudWxsXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJkb2MtdG9vbGJhclwiLCBzdHlsZToge2Zsb2F0OlwicmlnaHRcIn19LCBcclxuICAgICAgICAgICAgICAgICAgICBpc0Nsb3NlZFN0YXR1cyA/IG51bGwgOiBSZWFjdC5jcmVhdGVFbGVtZW50KERvY0J1dHRvbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJBZGRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJkb2MtdG9vbGJhclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5zdGF0ZS5lZGl0TW9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlRXZlbnRCdXR0b25BZGRDbGlja30pLCBcclxuICAgICAgICAgICAgICAgICAgICBpc0Nsb3NlZFN0YXR1cyA/IG51bGwgOiBSZWFjdC5jcmVhdGVFbGVtZW50KERvY0J1dHRvbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJFZGl0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLnN0YXRlLmVkaXRNb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVFdmVudEJ1dHRvbkVkaXRDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJkb2MtdG9vbGJhclwifSksIFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2xvc2VkU3RhdHVzID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQnV0dG9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZG9jLXRvb2xiYXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJTYXZlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogIXRoaXMuc3RhdGUuZWRpdE1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVFdmVudEJ1dHRvblNhdmVDbGlja30pLCBcclxuICAgICAgICAgICAgICAgICAgICBlZGl0ZU1vZGUgJiYgdGFza3MubGVuZ3RoID4gMCA/IG51bGwgOiB0YXNrV2lkZ2V0XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXREZWZhdWx0VGFzazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBbe3N0ZXA6IDAsIG5hbWU6ICdTdGFydCcsIGFjdGlvbjogJ3N0YXJ0Jywgc3RhdHVzOiAnb3BlbmVkJ31dXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnZW5lcmF0ZVRhc2tXaWRnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDQstC10YDQvdC10YIg0LLQuNC00LbQtdGCINC30LDQtNCw0YdcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnRhc2tMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Rhc2tMaXN0OiB0aGlzLmdldERlZmF1bHRUYXNrKCl9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0YXNrcyA9IHRoaXMuc3RhdGUudGFza0xpc3QuZmlsdGVyKGZ1bmN0aW9uKHRhc2spICB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2suc3RhdHVzID09PSAnb3BlbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXNrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgICAgIHRhc2tXaWRnZXQgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGFza3MubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0YHQv9C40YHQvtC6INC30LDQtNCw0YdcclxuICAgICAgICAgICAgb3B0aW9ucyA9IHRhc2tzLm1hcChmdW5jdGlvbih0YXNrKSAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiAwLCBrZXk6IE1hdGgucmFuZG9tKCl9LCBcIiBcIiwgdGFzay5uYW1lLCBcIiBcIilcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0YXNrV2lkZ2V0ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZVNlbGVjdFRhc2t9LCBvcHRpb25zLCBcIiBcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXNrcy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICB2YXIgdGFza05hbWUgPSB0YXNrc1swXS5uYW1lO1xyXG4gICAgICAgICAgICAvLyDQutC90L7Qv9C60LAg0YEg0LfQsNC00LDRh9C10LlcclxuICAgICAgICAgICAgdGFza1dpZGdldCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJidXR0b25cIiwgY2xhc3NOYW1lOiBcInVpLWMyXCIsIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQnV0dG9uVGFzaywgdmFsdWU6IHRhc2tOYW1lfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhc2tXaWRnZXQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgd2FybmluZyA9ICcnO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy52YWxpZGF0b3IpIHtcclxuICAgICAgICAgICAgbGV0IHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy52YWxpZGF0b3IoKTtcclxuICAgICAgICAgICAgICAgIHdhcm5pbmcgPSB3YXJuaW5nTWVzc2FnZSAhPT0gJ09rJ1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7d2FybmluZ01lc3NhZ2U6IHdhcm5pbmdNZXNzYWdlLCB3YXJuaW5nOiB3YXJuaW5nfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdhcm5pbmc7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUb29sYmFyO1xyXG5cclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtdG9vbGJhci5qc3hcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbmNvbnN0IERvY0J1dHRvbiA9IGZ1bmN0aW9uKHByb3BzKSB7XHJcbiAgICBsZXQgYnRuRW5hYmxlZCA9IHByb3BzLmVuYWJsZWQgPyB0cnVlOiBmYWxzZSwgLy8g0YPRgdGC0LDQvdC+0LLQuNC8INC30L3QsNGH0LXQvdC40LUg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cclxuICAgICAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUgfHwgbnVsbCxcclxuICAgICAgICBzdHlsZSA9IHttYXJnaW46IDV9LFxyXG4gICAgICAgIHJlZklkID0gcHJvcHMucmVmSWQgfHwgJ2RvY0J1dHRvbic7XHJcbi8vICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IHtjbGFzc05hbWV9XHJcblxyXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJidXR0b25cIiwgXHJcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBidG5FbmFibGVkLCBcclxuICAgICAgICAgICAgICAgICAgb25DbGljazogcHJvcHMub25DbGljaywgXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgc3R5bGU6IHtzdHlsZTpzdHlsZX19XHJcbiAgICApXHJcbn07XHJcblxyXG5Eb2NCdXR0b24ucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxufVxyXG4vLyAgICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERvY0J1dHRvblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWJ1dHRvbi5qc3hcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgSW5wdXRUZXh0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dC5qc3gnKSxcclxuICAgIElucHV0RGF0ZVRpbWUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRldGltZS5qc3gnKSxcclxuICAgIERvY0xpc3QgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1saXN0LmpzeCcpO1xyXG4vLyAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LW51bWJlci5qc3gnKTtcclxuXHJcbnZhciBEb2NDb21tb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiRG9jQ29tbW9uXCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgLy8g0L/RgNC4INC40LfQvNC10L3QtdC90LjQuCwg0L/QvtC80LXQvdGP0LXRgiDRgdC+0YHRgtC+0Y/QvdC40LUgKNC/0LXRgNC10LTQsNGB0YIg0LTQsNC70YzRiNC1INGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjylcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtyZWFkT25seTpuZXh0UHJvcHMucmVhZE9ubHkgfSlcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnByb3BzLmRhdGEsXHJcbiAgICAgICAgICAgIGJwbSA9IGRhdGEuYnBtIHx8IFtdLFxyXG4gICAgICAgICAgICBhY3R1YWxTdGVwRGF0YSA9IGJwbS5maWx0ZXIoZnVuY3Rpb24oc3RlcCkgIHtcclxuICAgICAgICAgICAgICAgIC8vINGC0LXQutGD0YnQuNC5INGI0LDQsyDQkdCfXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RlcC5hY3R1YWxTdGVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ZXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBleGVjdXRlcnMgPSBhY3R1YWxTdGVwRGF0YS5tYXAoZnVuY3Rpb24oc3RlcERhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vINC90LDQudC00LXQvCDQuNGB0L/QvtC70L3QuNGC0LXQu9C10LlcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGVwRGF0YS5hY3RvcnMgfHwge25hbWU6ICdBVVRIT1InfTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmaWVsZHNldFwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtzdHlsZToge2Rpc3BsYXk6Jy13ZWJraXQtaW5saW5lLWJveCd9fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMiBmb3JtLXdpZGdldC10b29sYmFyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI3NSVcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwge3N0eWxlOiB7ZGlzcGxheTonLXdlYmtpdC1pbmxpbmUtYm94J319LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyIGZvcm0td2lkZ2V0LXRvb2xiYXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkNyZWF0ZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3JlYXRlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuY3JlYXRlZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcInRydWVcIiwgd2lkdGg6IFwiNzUlXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtzdHlsZToge2Rpc3BsYXk6Jy13ZWJraXQtaW5saW5lLWJveCd9fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMiBmb3JtLXdpZGdldC10b29sYmFyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJVcGRhdGVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxhc3R1cGRhdGVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmxhc3R1cGRhdGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIHdpZHRoOiBcIjc1JVwifSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7c3R5bGU6IHtkaXNwbGF5Oictd2Via2l0LWlubGluZS1ib3gnfX0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzIgZm9ybS13aWRnZXQtdG9vbGJhclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhdHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXR1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuc3RhdHVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNzUlXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbi8qXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBzdHlsZT17e2Rpc3BsYXk6Jy13ZWJraXQtaW5saW5lLWJveCd9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2NMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT0n0JjRgdC/0L7Qu9C90LjRgtC10LvQuCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J2V4ZWN1dG9ycydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2V4ZWN1dGVyc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5ID0ge3RoaXMuc3RhdGUucmVhZE9ubHl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuKi9cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9jQ29tbW9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtY29tbW9uLmpzeFxuLy8gbW9kdWxlIGlkID0gNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBJbnB1dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJJbnB1dFwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge3ZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLCByZWFkT25seTogdHJ1ZSwgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdHJ1ZX07XHJcbiAgICB9LFxyXG5cclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdkZWZhdWxOYW1lJyxcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnZG9jLWlucHV0JyxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdkZWZhdWxOYW1lJyxcclxuICAgICAgICAgICAgdGl0bGU6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpIHtcclxuLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUgZG9jSWQuINCV0YHQu9C4INC30L3QsNGH0LXQvdC40LUgPSAwICjQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0L/QuNGB0YwsINGC0L4g0L/RgNC+0YHRgtC+INC+0YfQuNGC0LrQsCDQv9C+0LvQtdC5LCDQuNC90LDRh9C1INC/0L7QtNCz0YDRg9C30LrQsCDQtNCw0L3QvdGL0YVcclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGB0L7Qt9C00LDQvdC40LUg0L3QvtCy0L7Qs9C+INC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTowfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOnZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDRgdC70YPRiNGD0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFO1xyXG4gICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBuZXdWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZFZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbdGhpcy5wcm9wcy5uYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOmZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdC10L3QuNGPINCx0YPQtNGD0YIg0L7RgtGA0LDQttCw0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDRgtCw0LrQuNC1INC10YHRgtGMXHJcbiAgICAgICAgbGV0IHJldHVybnZhbHVlID0gKG5leHRTdGF0ZS52YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSB8fFxyXG4gICAgICAgIG5leHRTdGF0ZS5yZWFkT25seSAhPT0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fFxyXG4gICAgICAgIG5leHRTdGF0ZS5kaXNhYmxlZCAhPT0gdGhpcy5zdGF0ZS5kaXNhYmxlZCk7XHJcbiAgICAgICAgcmV0dXJuIHJldHVybnZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGxldCBmaWVsZFZhbHVlID0gZS50YXJnZXQudmFsdWUsXHJcbiAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgIGRhdGFbdGhpcy5wcm9wcy5uYW1lXSA9IGZpZWxkVmFsdWU7XHJcbiAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOm5leHRQcm9wcy52YWx1ZSB9KVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBpbnB1dENsYXNzTmFtZSA9dGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dERpc2FibGVkID0gdGhpcy5zdGF0ZS5kaXNhYmxlZCxcclxuICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICBteVN0eWxlID0ge3dpZHRoOidhdXRvJ307O1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRSZWFkT25seSkge1xyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IGlucHV0Q2xhc3NOYW1lICsgJyBkb2MtaW5wdXQtcmVhZG9ubHknO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy53aWR0aCkge1xyXG4gICAgICAgICAgICBteVN0eWxlLndpZHRoID0gdGhpcy5wcm9wcy53aWR0aFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbnB1dERpc2FibGVkID09ICd0cnVlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtodG1sRm9yOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb3JtLXdpZGdldC1sYWJlbFwifSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSlcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IG15U3R5bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBpbnB1dFJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZX1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7aHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogbXlTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZUhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXHJcbiAgICB9LFxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dGFyZWEuanN4XG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIEdyaWRCdXR0b24gPSByZXF1aXJlKCcuL215YnV0dG9uJyk7XHJcblxyXG52YXIgTXlDZWxsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIk15Q2VsbFwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUsIGVkaXRhYmxlOiBmYWxzZSwgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiB0aGlzLnByb3BzLnZhbHVlfSlcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6Z3JpZENlbGxFZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDQvNC+0LzQtdC90YIg0L/QtdGA0LXRhdC+0LTQsCDQvdCwINC00YDRg9Cz0YPRjiDRj9GH0LXQudC60YNcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBzZWxmLnByb3BzLmlkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2VsbCA9IHNlbGYucmVmc1snY2VsbC0nICsgc2VsZi5wcm9wcy5pZF07XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRhYmxlOiBmYWxzZX0pOyAvLyDRg9Cx0LjRgNCw0LXQvCDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdGCINGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLFxyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEgPSBldmFsKCdkYXRhLicgKyBzZWxmLnByb3BzLmdyaWREYXRhU291cmNlKTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlICYmIGdyaWREYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gIXRoaXMuc3RhdGUuZWRpdGFibGU7XHJcbiAgICAgICAgLy8g0L7RgtGA0LDQsdC+0YLQsNC10Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRDZWxsRWRpdGVkQ2hhbmdlJywgdGhpcy5wcm9wcy5pZCk7IC8vINC30LDQutGA0L7QtdC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LUg0LIg0LTRgNGD0LPQuNGFINGP0YfQtdC50LrQsNGFXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGFibGU6IHZhbHVlfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGUsIGJpbmRUb0NlbGwpIHtcclxuICAgICAgICAvLyDQvtGC0YDQsNCx0LDRgtGL0LLQsNC10YIg0LjQt9C80LXQvdC10L3QuNC1INGB0L7RgdGC0L7Rj9C90LjRjyDRj9GH0LXQudC60Lgg0Lgg0L/QuNGI0LXRgiDQsiDRhdGA0LDQvdC40LvRidC1XHJcbiAgICAgICAgdmFyIHZhbHVlID0gZS50YXJnZXQudmFsdWUsXHJcbiAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZSxcclxuICAgICAgICAgICAgZ3JpZERhdGEgPSBldmFsKCdkYXRhLicgKyB0aGlzLnByb3BzLmdyaWREYXRhU291cmNlKSB8fCBbXSxcclxuICAgICAgICAgICAgY2VsbE5hbWUgPSBiaW5kVG9DZWxsID8gYmluZFRvQ2VsbCA6IHRoaXMucHJvcHMuc291cmNlO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuXHJcbiAgICAgICAgLy8g0L/QuNGI0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgaWYgKGdyaWREYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGNlbGxWYWx1ZSA9IGdyaWREYXRhW3RoaXMucHJvcHMucm93SWRdW2NlbGxOYW1lXTtcclxuXHJcbiAgICAgICAgICAgIGdyaWREYXRhW3RoaXMucHJvcHMucm93SWRdW2NlbGxOYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkQ2VsbEVkaXRlZENoYW5nZScsIHRoaXMucHJvcHMuaWQpOyAvLyDQt9Cw0LrRgNC+0LXQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNC1INCyINC00YDRg9Cz0LjRhSDRj9GH0LXQudC60LDRhVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUtleVByZXNzOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcclxuICAgICAgICBpZiAoa2V5ID09IDEzKSB7XHJcbiAgICAgICAgICAgIC8vINCy0YvRhdC+0LTQuNC8INC40Lcg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0YWJsZTogZmFsc2V9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGlzRWRpdCA9IChmbHV4LnN0b3Jlcy5kb2NTdG9yZS5lZGl0ZWQgJiYgIXRoaXMuc3RhdGUuZGlzYWJsZWQpID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBjZWxsID0gdGhpcy5wcm9wcy5jZWxsLCAvLyDQv9Cw0YDQsNC80LXRgtGA0Ysg0Y/Rh9C10LnQutC4XHJcbiAgICAgICAgICAgIGlzUmVhZE9ubHkgPSAhZmx1eC5zdG9yZXMuZG9jU3RvcmUuZWRpdGVkLFxyXG4vLyAgICAgICAgICAgIGNlbGxUeXBlID0gY2VsbC50eXBlIHx8ICdzcGFuJzsgLy8g0L3QsNGF0L7QtNC40YLRgdGPINC70Lgg0LTQvtC6INCyINGA0LXQttC40LzQtSDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgICAgIGNlbGxUeXBlID0gJ3NwYW4nOyAvLyDQvdCw0YXQvtC00LjRgtGB0Y8g0LvQuCDQtNC+0Log0LIg0YDQtdC20LjQvNC1INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHJcbiAgICAgICAgaXNSZWFkT25seSA9IGNlbGwucmVhZE9ubHkgPyB0cnVlIDogaXNSZWFkT25seTsgLy8g0L/QvtC/0YDQsNCy0LrQsCDQvdCwINGB0LLQvtC50YHRgtCy0L4g0Y/Rh9C10LnQutC4LCDQtNC+0YHRgtGD0L/QvdCwINC70Lgg0L7QvdCwINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y5cclxuLy8gICAgICAgICAgICBjbGFzc05hbWUgPSAnZm9ybS13aWRnZXQnOyAvLysgdCBoaXMuc3RhdGUuZWRpdGFibGU/ICcgZm9jdXNlZCc6ICcnO1xyXG4gICAgICAgIGlzUmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgIHZhciBFZGl0RWxlbWVudCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrLCBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lfSwgdGhpcy5wcm9wcy52YWx1ZSk7XHJcbiAgICAgICAgaWYgKGlzRWRpdCkge1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgc3dpdGNoIChjZWxsVHlwZSkge1xyXG4gICAgICAgICAgICAgY2FzZSAndGV4dCc6XHJcbiAgICAgICAgICAgICBFZGl0RWxlbWVudCA9IDxpbnB1dCB0eXBlPSd0ZXh0JyByZWFkT25seT17aXNSZWFkT25seX0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IHN0eWxlPXt7d2lkdGg6JzEwMCUnfX1cclxuICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSBvbktleVByZXNzPXt0aGlzLmhhbmRsZUtleVByZXNzfS8+XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICBFZGl0RWxlbWVudCA9IDxpbnB1dCB0eXBlPSdudW1iZXInIHJlYWRPbmx5PXtpc1JlYWRPbmx5fSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gc3R5bGU9e3t3aWR0aDonMTAwJSd9fVxyXG4gICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IG9uS2V5UHJlc3M9e3RoaXMuaGFuZGxlS2V5UHJlc3N9Lz5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgY2FzZSAnc2VsZWN0JzpcclxuICAgICAgICAgICAgIEVkaXRFbGVtZW50ID0gPFNlbGVjdCAgbmFtZT17Y2VsbC52YWx1ZUZpZWxkTmFtZX0gbGlicz17Y2VsbC5kYXRhU2V0fSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gZGVmYXVsdFZhbHVlID0ge3RoaXMuc3RhdGUudmFsdWV9IGNvbGxJZCA9IHtjZWxsLmlkfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX0vPlxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgPHNwYW4+e3RoaXMuc3RhdGUudmFsdWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCB7cmVmOiAnY2VsbC0nICsgdGhpcy5wcm9wcy5pZCwgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZSwgc3R5bGU6IHt3aWR0aDpjZWxsLndpZHRofX0sIFxyXG4gICAgICAgICAgICAgICAgRWRpdEVsZW1lbnRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH1cclxufSlcclxuXHJcbnZhciBEYXRhR3JpZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJEYXRhR3JpZFwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnM6IHRoaXMucHJvcHMuZ3JpZENvbHVtbnMsXHJcbiAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnByZXBhaXJlR3JpZERhdGEodGhpcy5wcm9wcy5ncmlkRGF0YSksXHJcbiAgICAgICAgICAgIGVkaXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsaWNrZWQ6IDBcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIEdyaWRSb3dFZGl0OiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkb2NJZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdGCINGA0LXQttC40Lwg0YHQvtC30LTQsNC90LjRjyDQvdC+0LLQvtCz0L4g0LTQvtC60YPQvNC10L3RgtCwXHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLFxyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEgPSBldmFsKCdkYXRhLicgKyBzZWxmLnByb3BzLnNvdXJjZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YSA9IHNlbGYuZGVsUm93KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGdyaWREYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIExpc3RlbiBncmlkRGF0YSBjaGFuZ2VzIGFuZCB0aGVuIGNhbGxiYWNrcyBmb3Igcm93IGRhdGEgY2hhbmdlc1xyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGV0YWlscycsIGZ1bmN0aW9uIChuZXdEYXRhLCBvbGREYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdEYXRhLmxlbmd0aCA+IDAgJiYgb2xkRGF0YSAhPT0gbmV3RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Z3JpZERhdGE6IG5ld0RhdGF9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlQ2VsbENsaWNrOiBmdW5jdGlvbiAoaWR4KSB7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZFJvd0lkQ2hhbmdlJywgaWR4KTsgLy8g0L7RgtC80LXRgtC40Lwg0LIg0YXRgNCw0L3QuNC70LjRidC1INC90L7QvNC10YAg0YHRgtGA0L7QutC4XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGNsaWNrZWQ6IGlkeFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciByb3dJZCA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRSb3dJZDtcclxuICAgIH0sXHJcblxyXG4gICAgZGVsUm93OiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAvLyDRg9C00LDQu9C40Lwg0YHRgtGA0L7QutGDINC30LDQtNCw0L3QvdGD0Y4g0YHRgtGA0L7QutGDINC40LvQuCDQstGB0LUsINC10YHQu9C4INC40L3QtNC10LrRgSDQvdC1INC30LDQtNCw0L1cclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSB0aGlzLnN0YXRlLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBzdGFydCA9IDEsXHJcbiAgICAgICAgICAgIGZpbmlzaCA9IGdyaWREYXRhLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4IHx8IGluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgc3RhcnQgPSBpbmRleDtcclxuICAgICAgICAgICAgZmluaXNoID0gMTtcclxuICAgICAgICB9XHJcbi8vICAgICAgICBncmlkRGF0YS5zcGxpY2Uoc3RhcnQsIGZpbmlzaCk7XHJcbiAgICAgICAgZ3JpZERhdGEgPSBncmlkRGF0YS5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCBzdGFydCB8fCBpbmRleCA+IChzdGFydCArIGZpbmlzaCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZERhdGE6IGdyaWREYXRhfSk7XHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQuNC30LzQtdC90LXQvdC40Y9cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBuZXdSb3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL9Cy0LXRgNC90LXRgiDQvdC+0LLRg9GOINGB0YLRgNC+0LrRgyDQtNC70Y8g0LPRgNC40LTQsCwg0L3QsCDQvtGB0L3QvtCy0LUg0YjQsNCx0LvQvtC90LBcclxuXHJcbiAgICAgICAgdmFyIGdyaWRDb2x1bW5zID0gdGhpcy5wcm9wcy5ncmlkQ29sdW1ucyxcclxuICAgICAgICAgICAgZ3JpZERhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzLFxyXG4gICAgICAgICAgICByb3cgPSBuZXcgT2JqZWN0KCk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JpZENvbHVtbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGZpZWxkID0gZ3JpZENvbHVtbnNbaV0uaWQ7XHJcbiAgICAgICAgICAgIHJvd1tmaWVsZF0gPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJvdztcclxuICAgIH0sXHJcblxyXG4gICAgcHJlcGFpcmVHcmlkRGF0YTogZnVuY3Rpb24gKHNvdXJjZURhdGEpIHtcclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSBbXTtcclxuICAgICAgICBncmlkRGF0YSA9IHNvdXJjZURhdGEubWFwKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgLy8g0L/QvtC70YPRh9Cw0LXQvCDRh9C40YHRgtGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgIHZhciBuZXdSb3cgPSB0aGlzLm5ld1JvdygpO1xyXG4gICAgICAgICAgICAvLyDQv9GA0L7QudC00LXQvCDQv9C+INC90L7QstC+0Lkg0YHRgtGA0L7QutC1INC4INC30LDQv9C+0LvQvdC40Lwg0LXQtSDQv9C+0LvRjyDQt9C90LDRh9C10L3QuNGP0LzQuCDQuNC3INC40YHRgtC+0YfQvdC40LrQsFxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG5ld1Jvdykge1xyXG4gICAgICAgICAgICAgICAgbmV3Um93W2tleV0gPSByb3dba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3Um93OyAvLyDQstC10YDQvdC10Lwg0YHRhNC+0YDQvNC40YDQvtCy0LDQvdC90YPRjiDQvdC+0LLRg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIHJldHVybiBncmlkRGF0YTtcclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlUm93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0YPQtNCw0LvQtdC90LjQtSDRgdGC0YDQvtC60Lgg0LjQtyDQs9GA0LjQtNCwXHJcbiAgICAgICAgdmFyIHJvd0luZGV4ID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZ3JpZFJvd0lkO1xyXG4gICAgICAgIHRoaXMuZGVsUm93KHJvd0luZGV4KTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkUm93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0LTQvtCx0LDQstC40YIg0LIg0YHQvtGB0YLQvtGP0L3QuNC1INC90L7QstGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgdmFyIG5ld1JvdyA9IHRoaXMubmV3Um93KCksXHJcbiAgICAgICAgICAgIGdyaWREYXRhID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZGV0YWlscyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRldGFpbHM7XHJcblxyXG4gICAgICAgIG5ld1Jvdy5pZCA9ICdORVcnICsgTWF0aC5yYW5kb20oKTsgLy8g0LPQtdC90LXRgNC40Lwg0L3QvtCy0L7QtSDQuNC0XHJcbi8vICAgICAgICBncmlkRGF0YS5wdXNoKG5ld1Jvdyk7XHJcbi8vICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0ZWQ6IHRydWUsIGNsaWNrZWQ6IGdyaWREYXRhLmxlbmd0aH0pO1xyXG5cclxuICAgICAgICAvLyDQt9C00LXRgdGMINCy0YHRgtCw0LLQuNGC0Ywg0YHRgtGA0L7QutGDINCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4vLyAgICAgICAgZGV0YWlscy5wdXNoKG5ld1Jvdyk7XHJcbi8vICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZGV0YWlscyk7IC8vINC/0LjRiNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRSb3dJZENoYW5nZScsIC0xKTsgLy8g0L7RgtC80LXRgtC40Lwg0LIg0YXRgNCw0L3QuNC70LjRidC1INC90L7QvNC10YAg0YHRgtGA0L7QutC4XHJcblxyXG4gIC8vICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZERhdGE6IGdyaWREYXRhfSk7XHJcblxyXG4gICAgICAgIC8vINC+0YLQutGA0L7QtdC8INC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QviDQtNC70Y8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlR3JpZFJvdygnQUREJywgbmV3Um93KTtcclxuICAgIH0sXHJcblxyXG4gICAgZWRpdFJvdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINC00L7QsdCw0LLQuNGCINCyINGB0L7RgdGC0L7Rj9C90LjQtSDQvdC+0LLRg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGRldGFpbHMgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzLFxyXG4gICAgICAgICAgICByb3cgPSBkZXRhaWxzW2ZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRSb3dJZF1cclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVHcmlkUm93KCdFRElUJyxyb3cgKTsgLy8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtSDRgdGC0YDQvtC60Lgg0LIg0LzQvtC00LDQu9GM0L3QvtC8INC+0LrQvdC1XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZ3JpZFN0eWxlID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogJzEwMHB4J1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICd0aCc7XHJcbiAgICAgICAgdmFyIGdyaWRSb3dzID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnMgPSB0aGlzLnByb3BzLmdyaWRDb2x1bW5zLFxyXG4gICAgICAgICAgICBjbGlja2VkSXRlbSA9IHRoaXMuc3RhdGUuaW5kZXgsXHJcbiAgICAgICAgICAgIGlzUmVhZE9ubHkgPSB0aGlzLnByb3BzLnJlYWRPbmx5LFxyXG4gICAgICAgICAgICBjZWxsSWQgPSAwLFxyXG4gICAgICAgICAgICBncmlkRGF0YVNvdXJjZSA9IHRoaXMucHJvcHMuc291cmNlO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgIWlzUmVhZE9ubHkgP1xyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEJ1dHRvbiwge29uQ2xpY2s6IHRoaXMuYWRkUm93LCBidXR0b25WYWx1ZTogXCJBZGQgcm93XCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEJ1dHRvbiwge29uQ2xpY2s6IHRoaXMuZWRpdFJvdywgYnV0dG9uVmFsdWU6IFwiRWRpdCByb3dcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcmlkQnV0dG9uLCB7b25DbGljazogdGhpcy5kZWxldGVSb3csIGJ1dHRvblZhbHVlOiBcIkRlbGV0ZSByb3dcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSA6IG51bGwsIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRhYmxlXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8q0LfQsNCz0L7Qu9C+0LLQvtC6Ki9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZENvbHVtbnMubWFwKGZ1bmN0aW9uIChjb2x1bW4sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkU3R5bGUud2lkdGggPSBjb2x1bW4ud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAndGgtJyArIGNvbHVtbi5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW4uc2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINC/0L7QutCw0LfQsNGC0Ywg0LjQuyDRgdC60YDRi9GC0Ywg0LrQvtC70L7QvdC60YNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAnc2hvdyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdoaWRlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwge3N0eWxlOiBncmlkU3R5bGUsIGNsYXNzTmFtZTogY2xhc3NOYW1lLCBrZXk6ICd0aC0nICsgaW5kZXgsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZTogXCJjb2xcIn0sIGNvbHVtbi5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRSb3dzLm1hcChmdW5jdGlvbiAocm93LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXlDbGFzcyA9ICdub3RGb2N1c2VkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0lkID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGlja2VkSXRlbSA9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlDbGFzcyA9ICdmb2N1c2VkJzsgLy8g0L/QvtC00YHQstC10YLQuNC8INCy0YvQsdGA0LDQvdC90YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwge29uQ2xpY2s6IHRoaXMuaGFuZGxlQ2VsbENsaWNrLmJpbmQodGhpcyxpbmRleCksIGNsYXNzTmFtZTogbXlDbGFzcywga2V5OiAndHItJytpbmRleH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zLm1hcChmdW5jdGlvbiAoY2VsbCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFN0eWxlLndpZHRoID0gY2VsbC53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuc2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0L/QvtC60LDQt9Cw0YLRjCDQuNC7INGB0LrRgNGL0YLRjCDQutC+0LvQvtC90LrRgz8g0LjRgdC/0LvQu9C00YzQt9GD0LXQvCDQutC70LDRgdGBLiDQlNC+0LvQttC10L0g0LHRi9GC0Ywg0L/RgNC+0L/QuNGB0LDQvSDQsiBjc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdoaWRlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTXlDZWxsLCB7Y2VsbDogY2VsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogY2VsbC5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93SWQ6IHJvd0lkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZERhdGFTb3VyY2U6IGdyaWREYXRhU291cmNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlzUmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogZ3JpZFN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvd1tjZWxsLmlkXSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogaW5kZXgsIGlkOiBjZWxsSWQrK30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcylcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXRhR3JpZDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1kYXRhLWdyaWQuanN4XG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBNeUJ1dHRvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ015QnV0dG9uJyxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy5idXR0b25WYWx1ZSxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVCdXR0b25DbGljayB9KTtcbiAgICB9LFxuXG4gICAgaGFuZGxlQnV0dG9uQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUJ1dHRvbkNsaWNrKCkge1xuICAgICAgICAvLyDQstC10YDQvdC10Lwg0LIg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtGB0YLQvtGP0L3QuNC5INGB0L7QsdGL0YLQuNC1INC60LvQuNC6XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljaygpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE15QnV0dG9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9teWJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gNzhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBNb2RhbFBhZ2UgPSByZXF1aXJlKCcuL21vZGFscGFnZS9tb2RhbFBhZ2UuanN4JyksXHJcbiAgICBTZWxlY3QgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC1zZWxlY3QuanN4JyksXHJcbiAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgSW5wdXROdW1iZXIgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC1udW1iZXIuanN4Jyk7XHJcblxyXG52YXIgU29yZGVyR3JpZFJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJTb3JkZXJHcmlkUm93XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdBcnZHcmlkUm93IHByb3BzJywgdGhpcy5wcm9wcyk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcm93OiB0aGlzLnByb3BzLmdyaWRSb3dEYXRhLCBjaGVja2VkOiBmYWxzZSwgd2FybmluZzonJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8g0L/RgNC10LTQstCw0YDQuNGC0LXQu9GM0L3QsNGPINC/0YDQvtCy0LXRgNC60LBcclxuICAgICAgICB0aGlzLnZhbGlkYXRlRm9ybSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBtb2RhbFBhZ2VDbGljazogZnVuY3Rpb24gKGJ0bkV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGNvbXBvbmVudHMgPSBbJ25vbWlkJywgICdzdW1tYScsICdwcm9qJywgJ3R1bm51cyddLFxyXG4gICAgICAgICAgICBkYXRhID0gW107XHJcblxyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LBcclxuXHJcbiAgICAgICAgICAgIC8vINGB0L7QsdC40YDQsNC10Lwg0LTQsNC90L3Ri9C1INC00LvRjyDQvtGC0L/RgNCw0LLQutC4INC90LAg0L7QsdGA0LDQsdC+0YLQutGDXHJcbiAgICAgICAgICAgIGNvbXBvbmVudHMubWFwKGZ1bmN0aW9uKGNvbXBvbmVudCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnRWYWx1ZSA9IHRoaXMucmVmc1tjb21wb25lbnRdLnN0YXRlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudCA9PSAncHJvaicgfHwgY29tcG9uZW50ID09ICd0dW5udXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50VmFsdWUgPSB0aGlzLnJlZnNbY29tcG9uZW50XS5zdGF0ZS5maWVsZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21vZGFsUGFnZUNsaWNrICcsY29tcG9uZW50LCBjb21wb25lbnRWYWx1ZSApXHJcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2goe25hbWU6IGNvbXBvbmVudCwgdmFsdWU6IGNvbXBvbmVudFZhbHVlfSk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9wcy5tb2RhbFBhZ2VDbGljayhidG5FdmVudCwgZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUNoYW5nZTogZnVuY3Rpb24gKGUsIG5hbWUpIHtcclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0L3QsCDRhNC+0YDQvNC1XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3NlbGVjdCBjaGFuZ2VkJyk7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnN0YXRlLnJvd1tuYW1lXSAmJiBuYW1lID09ICdub21pZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZzWydzdW1tYSddLnNldFN0YXRlKHt2YWx1ZTogMC4wMH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZhbGlkYXRlRm9ybSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVJbnB1dDogZnVuY3Rpb24gKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgLy8g0L/QtdGA0LXRgdGH0LXRgiDRgdGD0LzQvFxyXG4gICAgICAgIHRoaXMucmVjYWxjUm93U3VtbSgpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgdmFsaWRhdGVGb3JtOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyB3aWxsIGNoZWNrIHZhbHVlcyBvbiB0aGUgZm9ybSBhbmQgcmV0dXJuIHN0cmluZyB3aXRoIHdhcm5pbmdcclxuICAgICAgICB2YXIgd2FybmluZyA9ICcnO1xyXG4gICAgICAgIC8vINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INC/0YDQvtCy0LXRgNC60Lgg0YTQvtGA0LzRiyDQvdCwINCy0LDQu9C40LTQvdC+0YHRgtGMXHJcbiAgICAgICAgaWYgKCF0aGlzLnJlZnNbJ25vbWlkJ10uc3RhdGUudmFsdWUpIHdhcm5pbmcgPSAgd2FybmluZyArICcg0LrQsNGB0YHQvtCy0LDRjyDQvtC/0LXRgNCw0YbQuNGPJztcclxuXHJcbiAgICAgICAgaWYgKHdhcm5pbmcubGVuZ3RoID4gMiApIHtcclxuICAgICAgICAgICAgLy8g0LXRgdGC0Ywg0L/RgNC+0LHQu9C10LzRi1xyXG4gICAgICAgICAgICB3YXJuaW5nID0gJ9Ce0YLRgdGD0YLRgdCy0YPRjtGCINC00LDQvdC90YvQtTonICsgd2FybmluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ZhbGlkYXRlZCcsIHdhcm5pbmcsIHRoaXMucmVmc1snbm9taWQnXS5zdGF0ZS52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hlY2tlZDogdHJ1ZSwgd2FybmluZzogd2FybmluZ30pO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgcm93ID0gdGhpcy5zdGF0ZS5yb3csXHJcbiAgICAgICAgICAgIHZhbGlkYXRlTWVzc2FnZSA9IHRoaXMuc3RhdGUud2FybmluZyxcclxuICAgICAgICAgICAgYnV0dG9uT2tSZWFkT25seSA9IHZhbGlkYXRlTWVzc2FnZS5sZW5ndGggPiAwIHx8ICF0aGlzLnN0YXRlLmNoZWNrZWQ7XHJcbi8vICAgICAgICBjb25zb2xlLmxvZygncm93IHJlbmRlcjonLHZhbGlkYXRlTWVzc2FnZSwgYnV0dG9uT2tSZWFkT25seSApO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJtb2RhbFBhZ2VcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2UsIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJSZWEgbGlzYW1pbmUgLyBwYXJhbmRhbWluZVwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk9wZXJhdHNpb29uOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJub21pZFwiLCBsaWJzOiBcIm5vbWVuY2xhdHVyZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cubm9taWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogcm93Lmtvb2QsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJub21pZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLYXNzYSBvcGVyYXRzaW9vbmkga29vZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN1bW1hOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlN1bW1hOlwiLCB2YWx1ZTogcm93LnN1bW1hLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcImZhbHNlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCByZWY6IFwic3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlByb2pla3Q6XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJvalwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcInByb2plY3RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LnByb2osIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJrb29kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJwcm9qXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlByb2pla3RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVHVubnVzOlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR1bm51c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcInR1bm51c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cudHVubnVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsSWQ6IFwia29vZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwidHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkxhdXNlbmRpIHR1bm51c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHZhbGlkYXRlTWVzc2FnZSkpLCBcIjtcIlxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbi8qXHJcbjxkaXY+XHJcbiAgICB7YnV0dG9uT2tSZWFkT25seSA/XHJcbiAgICAgICAgPGJ1dHRvbiBkaXNhYmxlZD4gT2sgPC9idXR0b24+OlxyXG4gICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5tb2RhbFBhZ2VDbGljay5iaW5kKHRoaXMsJ09rJyl9PiBPayA8L2J1dHRvbj5cclxuICAgIH1cclxuICAgIDxidXR0b24gb25DbGljaz17dGhpcy5tb2RhbFBhZ2VDbGljay5iaW5kKHRoaXMsJ0NhbmNlbCcpfT4gQ2FuY2VsPC9idXR0b24+XHJcbjwvZGl2PlxyXG4qL1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU29yZGVyR3JpZFJvdztcclxuXHJcbi8qXHJcbiA8SW5wdXRUZXh0IHRpdGxlPSdLb29kICcgbmFtZT0na29vZCcgdmFsdWU9e3Jvdy5rb29kfSByZWFkT25seT17ZmFsc2V9XHJcbiBkaXNhYmxlZD1cImZhbHNlXCIgcmVmPSdrb29kJyA+PC9JbnB1dFRleHQ+XHJcbiAqL1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvc29yZGVyLWdyaWQtcm93LmpzeFxuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuY29uc3QgRm9ybSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZm9ybS5qcycpO1xyXG5jb25zdCBQYWdlTGFiZWwgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3BhZ2VfbGFiZWwnKTtcclxuXHJcbnZhciBwYWdlcyA9IFsnUGFnZTEnLCAnUGFnZTInXTtcclxuXHJcbmNvbnN0IFBhbGsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiUGFsa1wiLFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIHtwYWdlczogcGFnZXN9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiIFBhbGsgXCIpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfX0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYWxrO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy9wYWxrX29wZXIuanN4XG4vLyBtb2R1bGUgaWQgPSA4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNyVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNuVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDOUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==
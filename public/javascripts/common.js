/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp_name_"];
/******/ 	window["webpackJsonp_name_"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		4:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"arv","1":"doc","2":"docs","3":"journal"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 2 */
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

	//@todo поменять на this.state.libs
	const LIBDOK = 'ARV',
	    LIBRARIES = ['asutused', 'kontod', 'dokProps', 'users', 'aa', 'tunnus', 'project', 'nomenclature'];

	// Create a store
	const docStore = __webpack_require__(64);

	var now = new Date();

	var ____Class2=React.PureComponent;for(var ____Class2____Key in ____Class2){if(____Class2.hasOwnProperty(____Class2____Key)){Arve[____Class2____Key]=____Class2[____Class2____Key];}}var ____SuperProtoOf____Class2=____Class2===null?null:____Class2.prototype;Arve.prototype=Object.create(____SuperProtoOf____Class2);Arve.prototype.constructor=Arve;Arve.__superConstructor__=____Class2;
	    function Arve(props) {
	        ____Class2.call(this,props);
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
	            libs: {
	                asutused: [],
	                nomenclature: []
	            },
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
	            if(newValue) {
	                // делаем копии
	                flux.doAction('backupChange', {
	                    row: Object.assign({},flux.stores.docStore.data),
	                    details: Object.assign([],flux.stores.docStore.details)
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
	                            React.createElement(InputText, {className: "ui-c2", 
	                                       ref: "input-number", 
	                                       title: "Number", name: "number", 
	                                       value: this.state.docData.number, 
	                                       readOnly: !isEditeMode, 
	                                       onChange: this.handleInputChange}), 
	                            React.createElement(InputDate, {title: "Kuupäev ", name: "kpv", value: this.state.docData.kpv, 
	                                       ref: "input-kpv", 
	                                       placeholder: "Kuupäev", readOnly: !isEditeMode, 
	                                       onChange: this.handleInputChange}), 
	                            React.createElement(InputDate, {className: "ui-c2", title: "Tähtaeg ", name: "tahtaeg", 
	                                       value: this.state.docData.tahtaeg, 
	                                       ref: "input-tahtaeg", 
	                                       placeholder: "Tähtaeg", readOnly: !isEditeMode, 
	                                       onChange: this.handleInputChange}), 
	                            React.createElement(Select, {className: "ui-c2", 
	                                    title: "Asutus", 
	                                    name: "asutusid", 
	                                    libs: "asutused", 
	                                    data: this.state.libs['asutused'], 
	                                    value: this.state.docData.asutusid, 
	                                    defaultValue: this.state.docData.asutus, 
	                                    placeholder: "Asutus", 
	                                    ref: "select-asutusid", 
	                                    btnDelete: isEditeMode, 
	                                    onChange: this.handleInputChange, 
	                                    readOnly: !isEditeMode}), 
	                            React.createElement(InputText, {className: "ui-c2", title: "Lisa ", name: "lisa", value: this.state.docData.lisa, 
	                                       placeholder: "Lisa", 
	                                       ref: "input-lisa", readOnly: !isEditeMode, 
	                                       onChange: this.handleInputChange})
	                        ), 
	                        React.createElement("div", {style: styles.docColumn}, 
	                            React.createElement(DokProp, {className: "ui-c2", 
	                                     title: "Konteerimine: ", 
	                                     name: "doklausid", 
	                                     libs: "dokProps", 
	                                     value: this.state.docData.doklausid, 
	                                     defaultValue: this.state.docData.dokprop, 
	                                     placeholder: "Konteerimine", 
	                                     ref: "dokprop-doklausid", 
	                                     readOnly: !isEditeMode})
	                        )
	                    ), 
	                    React.createElement("div", {style: styles.docRow}, 
	                        React.createElement(TextArea, {title: "Märkused", 
	                                  name: "muud", 
	                                  placeholder: "Märkused", 
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
	                                   placeholder: "Summa", 
	                                   ref: "input-summa", 
	                                   value: this.state.docData.summa, disabled: "true", 
	                                   onChange: this.handleInputChange, 
	                                   pattern: "^[0-9]+(\\.[0-9]{1,4})?$"}), 
	                        React.createElement(InputText, {title: "Käibemaks ", 
	                                   name: "kbm", 
	                                   placeholder: "Käibemaks", 
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
	        //@todo вынести в отдельный файл
	        let style = {
	            border: '1px solid black',
	            backgroundColor: 'white',
	            position: 'relative',
	            margin: '10% 30% 10% 30%',
	            width: 'auto',
	            opacity: '1',
	            top: '100px'
	        };

	        let row = Object.assign({},this.state.gridRowData),
	            validateMessage = '',
	            modalObjects = ['btnOk','btnCancel'],
	            buttonOkReadOnly = validateMessage.length > 0 || !this.state.checked;

	        if (buttonOkReadOnly) {
	            // уберем кнопку Ок
	            modalObjects.splice(0,1);
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
	        let rowData = Object({},this.state.gridRowData);

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
	        let rowData = Object.assign({},this.state.gridRowData);
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
	        let gridData = Object.assign([],this.state.gridData);

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
/* 3 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var XDispatcher = __webpack_require__(5),
	    XStore = __webpack_require__(6);

	//#build

	/**
	 * Fluxify class that will be used as a singleton.
	 * Initializes the dispatcher and the store.
	 * Also set the Promise object if it is globally available.
	 */
	var Fluxify = function Fluxify() {
		Object.defineProperty(this, 'dispatcher', {
			value: new XDispatcher()
		});

		this.stores = {};

		if (typeof Promise != 'undefined') {
			this.promisify(Promise);
		}
	};

	Fluxify.prototype = {
		/**
	  * Create a new store. If an id is passed in the options,
	  * the store will be registered in the dispatcher and saved
	  * in fluxify.stores[id].
	  *
	  * @param  {Object} options {id, initialState, actionCallback}
	  * @return {XStore}
	  */
		createStore: function createStore(options) {
			var store = new XStore(options);

			// If the store has an id, register it in Fluxify and in the dispatcher
			if (store._id) {
				this.stores[store._id] = store;
				this.dispatcher.registerStore(store._id, store);
			}

			return store;
		},

		/**
	  * Executes an action. The arguments of this function will be available
	  * for the action callbacks registered in the dispatcher.
	  * @return { Promise } A promise that is resolved when all the action callbacks
	  *                   have finished.
	  */
		doAction: function doAction() {
			return this.dispatcher.dispatch.apply(this.dispatcher, arguments);
		},

		/**
	  * If ES6 Promise object is not defined globally or polyfilled, a Promise object
	  * can be given to fluxify in order to make it work, using this method.
	  *
	  * @param  { Promise } Promise ES6 Promise compatible object
	  * @return { undefined }
	  */
		promisify: function promisify(Promise) {
			this._Promise = Promise;
			this.dispatcher._Promise = Promise;
		}
	};

	//#build

	module.exports = new Fluxify();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	//#build

	/**
	 * The asynchronous dispatcher compatible with Facebook's flux dispatcher
	 * http://facebook.github.io/flux/docs/dispatcher.html
	 *
	 * Dispatch actions to the registered callbacks, those action can be
	 * asynchronous if they return a Promise.
	 */

	var XDispatcher = function XDispatcher() {
		this._callbacks = {};
		this._dispatchQueue = [];
		this._currentDispatch = false;
		this._ID = 1;

		if (typeof Promise != 'undefined') {
			this._Promise = Promise;
		}
	};

	XDispatcher.prototype = {

		/**
	  * Register a callback that will be called when an action is dispatched.
	  *
	  * @param  {String | Function}   id  If a string is passed, it will be the id of the callback.
	  *                  If a function is passed, it will be used as callback, and id is generated
	  *                  automatically.
	  * @param  {Function} callback If an id is passed as a first argument, this will be the callback.
	  * @return {String}            The id of the callback to be used with the waitFor method.
	  */
		register: function register(id, callback) {
			var ID = id;

			// If the callback is the first parameter
			if (typeof id == 'function') {
				ID = 'ID_' + this._ID;
				callback = id;
			}

			this._callbacks[ID] = callback;
			this._ID++;

			return ID;
		},

		/**
	  * Register a XStore in the dispacher. XStores has a method called callback. The dispatcher
	  * register that function as a regular callback.
	  *
	  * @param  {String} id     The id for the store to be used in the waitFor method.
	  * @param  {XStore} xStore Store to register in the dispatcher
	  * @return {String}        The id of the callback to be used with the waitFor method.
	  */
		registerStore: function registerStore(id, xStore) {

			Object.defineProperty(xStore, '_dispatcher', {
				value: this
			});

			return this.register(id, xStore.callback);
		},

		/**
	  * Unregister a callback given its id.
	  *
	  * @param  {String} id Callback/Store id
	  * @return {undefined}
	  */
		unregister: function unregister(id) {
			delete this._callbacks[id];
		},

		/**
	  * Creates a promise and waits for the callbacks specified to complete before resolve it.
	  * If it is used by an actionCallback, the promise should be resolved to let other callbacks
	  * wait for it if needed.
	  *
	  * Be careful of not to wait by a callback that is waiting by the current callback, or the
	  * promises will never fulfill.
	  *
	  * @param  {String<Array>|String} ids The id or ids of the callbacks/stores to wait for.
	  * @return {Promise} A promise to be resolved when the specified callbacks are completed.
	  */
		waitFor: function waitFor(ids) {
			var promises = [],
			    i = 0;

			if (!Array.isArray(ids)) ids = [ids];

			for (; i < ids.length; i++) {
				if (this._promises[ids[i]]) promises.push(this._promises[ids[i]]);
			}

			if (!promises.length) return this._Promise.resolve();

			return this._Promise.all(promises);
		},

		/**
	  * Dispatches an action to all the registered callbacks/stores.
	  *
	  * If a second action is dispatched while there is a dispatch on, it will be
	  * enqueued an dispatched after the current one.
	  *
	  * @return { Promise } A promise to be resolved when all the callbacks have finised.
	  */
		dispatch: function dispatch() {
			var me = this,
			    dispatchArguments = arguments,
			    promise,
			    dequeue;

			if (!this._Promise) throw new TypeError('No promises.');

			// If we are in the middle of a dispatch, enqueue the dispatch
			if (this._currentDispatch) {

				// Dispatch after the current one
				promise = this._currentDispatch.then(function () {
					return me._dispatch.apply(me, dispatchArguments);
				});

				// Enqueue, set the chain as the current promise and return
				this._dispatchQueue.push(promise);
				return this._currentDispatch = promise;
			}

			return this._currentDispatch = this._dispatch.apply(me, dispatchArguments);
		},

		/**
	  * Dispatches an action inmediatelly.
	  *
	  * @return {Promise} A promise to be resolved when all the callbacks have finised.
	  */
		_dispatch: function _dispatch() {
			var me = this,
			    dispatchArguments = arguments,
			    promises = [];

			this._promises = [];

			// A closure is needed for the callback id
			Object.keys(this._callbacks).forEach(function (id) {

				// All the promises must be set in me._promises before trying to resolve
				// in order to make waitFor work ok
				me._promises[id] = me._Promise.resolve().then(function () {
					return me._callbacks[id].apply(me, dispatchArguments);
				}).catch(function (err) {
					console.error(err.stack || err);
				});

				promises.push(me._promises[id]);
			});

			//
			var dequeue = function dequeue() {
				me._dispatchQueue.shift();
				if (!me._dispatchQueue.length) me._currentDispatch = false;
			};

			return this._Promise.all(promises).then(dequeue, dequeue);
		},

		/**
	  * Is this dispatcher currently dispatching.
	  *
	  * @return {Boolean}
	  */
		isDispatching: function isDispatching() {
			return !!this._dispatchQueue.length;
		}

	};

	//#build

	module.exports = XDispatcher;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var XEmitter = __webpack_require__(7),
	    xUtils = __webpack_require__(8);

	//#build

	var Store = XEmitter._extend({
		initialize: function initialize(props) {
			if (!props) return this.props = {};

			this.props = {};
			for (var p in props) {
				this.props[p] = props[p];
			}
		},

		get: function get(prop) {
			return this.props[prop];
		},

		set: function set(prop, value) {
			var props = prop,
			    updates = [],
			    previousValue,
			    p;

			if (typeof value != 'undefined') {
				props = {};
				props[prop] = value;
			}

			for (p in props) {
				if (this.props[p] != props[p]) {
					previousValue = this.props[p];
					this.props[p] = props[p];
					updates.push({
						prop: p,
						previousValue: previousValue,
						value: props[p]
					});
				}
			}

			if (updates.length) this.emit('change', updates);
		}
	});

	var XStore = XEmitter._extend({
		initialize: function initialize(options) {
			var me = this,
			    opts = options || {},
			    store = new Store(opts.initialState),
			    actionType,
			    stateProp;

			// Store id
			if (options.id) {
				Object.defineProperty(this, '_id', {
					value: options.id
				});
			}

			// Register action callbacks in the store
			Object.defineProperties(this, {
				_callbacks: {
					writable: true,
					configurable: true,
					value: {}
				},
				addActionCallbacks: {
					value: function value(clbks) {
						for (actionType in clbks) {
							me._callbacks[actionType] = clbks[actionType].bind(this, store);
						}
					}
				},

				// Callback for register in the dispatcher
				callback: {
					value: function () {
						var actionType = arguments[0],
						    args = [].slice.call(arguments, 1);

						if (this._callbacks[actionType]) {
							// The callbacks are already bound to this xStore and the mutable store
							return this._callbacks[actionType].apply(this, args);
						}

						return true;
					}.bind(this)
				}
			});

			this.addActionCallbacks(opts.actionCallbacks || {});

			// Create inmmutable properties
			var addProperty = function addProperty(propName, value) {
				Object.defineProperty(me, propName, {
					enumerable: true,
					configurable: false,
					get: function get() {
						return store.get(propName);
					}
				});
			};

			if (opts.initialState) {
				for (stateProp in opts.initialState) {
					addProperty(stateProp, opts.initialState[stateProp]);
				}
			}

			// Emit on store change
			store.on('change', function (updates) {
				var updatesLength = updates.length,
				    update,
				    i;

				for (i = 0; i < updatesLength; i++) {
					update = updates[i];

					// If the property is new, add it to the xStore
					if (!me.hasOwnProperty(update.prop)) addProperty(update.prop, update.value);

					me.emit('change:' + update.prop, update.value, update.previousValue);
				}

				me.emit('change', updates);
			});
		},

		getState: function getState() {
			// Clone the store properties
			return xUtils._extend({}, this);
		},

		waitFor: function waitFor(ids) {
			// The xDispatcher adds itself as a property
			// when the xStore is registered
			return this._dispatcher.waitFor(ids);
		}
	});

	//#build

	module.exports = XStore;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var xUtils = __webpack_require__(8);

	//#build

	var XEmitter = function XEmitter() {
		Object.defineProperty(this, '_events', {
			value: {}
		});

		if (typeof this.initialize == 'function') this.initialize.apply(this, arguments);
	};

	// The prototype methods are stored in a different object
	// and applied as non enumerable properties later
	var emitterPrototype = {
		on: function on(eventName, listener, once) {
			var listeners = this._events[eventName] || [];

			listeners.push({ callback: listener, once: once });
			this._events[eventName] = listeners;

			return this;
		},

		once: function once(eventName, listener) {
			this.on(eventName, listener, true);
		},

		off: function off(eventName, listener) {
			if (typeof eventName == 'undefined') {
				this._events = {};
			} else if (typeof listener == 'undefined') {
				this._events[eventName] = [];
			} else {
				var listeners = this._events[eventName] || [],
				    i;

				for (i = listeners.length - 1; i >= 0; i--) {
					if (listeners[i].callback === listener) listeners.splice(i, 1);
				}
			}

			return this;
		},

		trigger: function trigger(eventName) {
			var args = [].slice.call(arguments, 1),
			    listeners = this._events[eventName] || [],
			    onceListeners = [],
			    i,
			    listener;

			// Call listeners
			for (i = 0; i < listeners.length; i++) {
				listener = listeners[i];

				if (listener.callback) listener.callback.apply(null, args);else {
					// If there is not a callback, remove!
					listener.once = true;
				}

				if (listener.once) onceListeners.push(i);
			}

			// Remove listeners marked as once
			for (i = onceListeners.length - 1; i >= 0; i--) {
				listeners.splice(onceListeners[i], 1);
			}

			return this;
		}
	};

	// EventEmitter methods
	xUtils._extend(emitterPrototype, {
		addListener: emitterPrototype.on,
		removeListener: emitterPrototype.off,
		removeAllListeners: emitterPrototype.off,
		emit: emitterPrototype.trigger
	});

	// Methods are not enumerable so, when the stores are
	// extended with the emitter, they can be iterated as
	// hashmaps
	XEmitter.prototype = {};
	for (var method in emitterPrototype) {
		Object.defineProperty(XEmitter.prototype, method, {
			value: emitterPrototype[method]
		});
	}

	// Extend method for 'inheritance', nod to backbone.js
	Object.defineProperty(XEmitter, '_extend', {
		value: function value(protoProps) {
			var parent = this,
			    child;

			if (protoProps && protoProps.hasOwnProperty(constructor)) {
				child = protoProps.constructor;
			} else {
				child = function child() {
					return parent.apply(this, arguments);
				};
			}

			xUtils._extend(child, parent);

			var Surrogate = function Surrogate() {
				// Again the constructor is also defined as not enumerable
				Object.defineProperty(this, 'constructor', {
					value: child
				});
			};
			Surrogate.prototype = parent.prototype;
			child.prototype = new Surrogate();

			// All the extending methods need to be also
			// non enumerable properties
			if (protoProps) {
				for (var p in protoProps) {
					if (p != 'constructor') {
						Object.defineProperty(child.prototype, p, {
							value: protoProps[p]
						});
					}
				}
			}

			child.__super__ = parent.prototype;

			return child;
		}
	});

	//#build

	module.exports = XEmitter;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	//#build

	var xUtils = {
		// Object extend, Nod to underscore.js
		_extend: function _extend(obj) {
			var source, prop;

			for (var i = 0; i < arguments.length; i++) {
				source = arguments[i];
				for (prop in source) {
					obj[prop] = source[prop];
				}
			}

			return obj;
		}
	};

	//#build

	module.exports = xUtils;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    PageLabel = __webpack_require__(10),
	    styles = __webpack_require__(12);

	var ____Classg=React.PureComponent;for(var ____Classg____Key in ____Classg){if(____Classg.hasOwnProperty(____Classg____Key)){Form[____Classg____Key]=____Classg[____Classg____Key];}}var ____SuperProtoOf____Classg=____Classg===null?null:____Classg.prototype;Form.prototype=Object.create(____SuperProtoOf____Classg);Form.prototype.constructor=Form;Form.__superConstructor__=____Classg;
	    function Form(props) {"use strict";
	        ____Classg.call(this,props);
	        this.state = {
	            pages: this.props.pages
	        };
	        this.handlePageClick = this.handlePageClick.bind(this);

	    }

	    Object.defineProperty(Form.prototype,"handlePageClick",{writable:true,configurable:true,value:function(page) {"use strict";

	        if (this.props.handlePageClick) {
	            this.props.handlePageClick(page);
	        }
	    }});

	    Object.defineProperty(Form.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
	        let pages = this.state.pages;

	        return (
	            React.createElement("div", null, 
	                pages.map(function(page, idx)  {
	                        return React.createElement(PageLabel, {
	                            key: idx, 
	                            active: idx == 0 ? true: false, 
	                            handlePageClick: this.handlePageClick, 
	                            page: page, 
	                            disabled: this.props.disabled, 
	                            ref: 'page-' + idx})
	                    }.bind(this)
	                ), 
	                React.createElement("div", {style: styles.page}, 
	                        this.props.children
	                )
	            )
	        )
	    }});

	;


	Form.PropTypes = {
	    pages: React.PropTypes.object.isRequired,
	    handlePageClick: React.PropTypes.func,
	    disabled: React.PropTypes.bool
	}


	Form.defaultProps = {
	    disabled: false
	}

	module.exports = Form;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    styles = __webpack_require__(11);

	var ____Classq=React.PureComponent;for(var ____Classq____Key in ____Classq){if(____Classq.hasOwnProperty(____Classq____Key)){PageLabel[____Classq____Key]=____Classq[____Classq____Key];}}var ____SuperProtoOf____Classq=____Classq===null?null:____Classq.prototype;PageLabel.prototype=Object.create(____SuperProtoOf____Classq);PageLabel.prototype.constructor=PageLabel;PageLabel.__superConstructor__=____Classq;
	    function PageLabel(props) {
	        ____Classq.call(this,props);
	        this.state = {
	            disabled: props.disabled
	        }

	        this.handleClick = this.handleClick.bind(this);

	    }

	    Object.defineProperty(PageLabel.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({disabled: nextProps.disabled});
	    }});


	    Object.defineProperty(PageLabel.prototype,"handleClick",{writable:true,configurable:true,value:function() {
	        // обработчик на событие клик, подгружаем связанный документ

	        if (this.state.disabled) {
	            return;
	        }

	        let page = this.props.page;

	        if (this.props.handlePageClick) {
	            this.props.handlePageClick(page);
	        }
	    }});


	    Object.defineProperty(PageLabel.prototype,"render",{writable:true,configurable:true,value:function() {
	        let page = this.props.page,
	            style = Object.assign({},styles.pageLabel, this.props.active  ? {backgroundColor:'white'}: {})

	        return React.createElement("label", {style: style, 
	                      disabled: this.state.disabled, 
	                      ref: "pageLabel", 
	                      onClick: this.handleClick}, 
	            page.pageName
	        )
	    }});



	PageLabel.PropTypes = {
	    handlePageClick: React.PropTypes.func,
	    page: React.PropTypes.object.isRequired,
	    disabled: React.PropTypes.bool,
	    active: React.PropTypes.bool
	};


	PageLabel.defaultProps = {
	    disabled: false,
	    active: true
	}


	module.exports = PageLabel;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    pageLabel: {
	        border: '1px solid black',
	        borderRadius: '3px',
	        borderBottom: '1px solid white',
	        margin: '2px',
	        padding: '2px 10px 2px 10px'
	    }
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    page: {
	        border: '1px solid black',
	        borderRadius: '3px'
	    },
	    icons: {
	        add: 'images/icons/add.png',
	        edit: 'images/icons/edit.png',
	        delete: 'images/icons/delete.png',
	        filter: 'images/icons/filter.png',
	        print: 'images/icons/print.png',
	        ok: 'images/icons/ok.png',
	        cancel: 'images/icons/cancel.png'
	    }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(3),
	    styles = __webpack_require__(14);

	var ____Classh=React.PureComponent;for(var ____Classh____Key in ____Classh){if(____Classh.hasOwnProperty(____Classh____Key)){Input[____Classh____Key]=____Classh[____Classh____Key];}}var ____SuperProtoOf____Classh=____Classh===null?null:____Classh.prototype;Input.prototype=Object.create(____SuperProtoOf____Classh);Input.prototype.constructor=Input;Input.__superConstructor__=____Classh;
	    function Input(props) {"use strict";
	        ____Classh.call(this,props);
	        this.state = {
	            value: props.value,
	            readOnly: props.readOnly,
	            disabled: props.disabled,
	            valid: props.valid
	        };
	        this.onChange = this.onChange.bind(this);
	    }

	    Object.defineProperty(Input.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {"use strict";
	        this.setState({value: nextProps.value, readOnly:nextProps.readOnly})
	    }});

	    Object.defineProperty(Input.prototype,"onChange",{writable:true,configurable:true,value:function(e) {"use strict";
	        let fieldValue = e.target.value;
	        this.setState({value: fieldValue});


	        if (this.props.onChange) {
	            this.props.onChange(this.props.name, fieldValue);
	        }
	    }});

	    Object.defineProperty(Input.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
	        let inputPlaceHolder = this.props.placeholder || this.props.name,
	            inputStyle = Object.assign({}, styles.input,
	                this.props.width ? {width: this.props.width} : {},
	                this.state.readOnly ? styles.readOnly : {}
	            );

	        return (
	            React.createElement("div", {style: styles.wrapper}, 
	                React.createElement("label", {style: styles.label, htmlFor: this.props.name, ref: "label"}, 
	                    this.props.title
	                ), 
	                    React.createElement("input", {type: "text", 
	                           id: this.props.name, 
	                           ref: "input", 
	                           style: inputStyle, 
	                           name: this.props.name, 
	                           value: this.state.value, 
	                           readOnly: this.state.readOnly, 
	                           title: this.props.title, 
	                           pattern: this.props.pattern, 
	                           placeholder: inputPlaceHolder, 
	                           onChange: this.onChange, 
	                           disabled: this.props.disabled}
	                    )

	            ))
	    }});


	Input.PropTypes = {
	    name: React.PropTypes.string.isRequired,
	    value: React.PropTypes.string,
	    readOnly: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    valid: React.PropTypes.bool,
	    placeholder: React.PropTypes.string,
	    pattern: React.PropTypes.string,
	    title: React.PropTypes.string
	}


	Input.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true
	}

	module.exports = Input;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    input: {
	        width: '70%',
	        marginLeft: '5px'
	    },
	    focused: {
	        backgroundColor: 'lightblue'
	    },
	    readOnly: {
	        backgroundColor: '#F3EFEF'
	    },
	    wrapper: {
	        margin: '5px',
	        display: 'flex',
	        width: '95%'
	    },
	    label: {
	        width: '30%',
	        margin: '5px'
	    }
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(3),
	    styles = __webpack_require__(16);

	var ____Classi=React.PureComponent;for(var ____Classi____Key in ____Classi){if(____Classi.hasOwnProperty(____Classi____Key)){InputDate[____Classi____Key]=____Classi[____Classi____Key];}}var ____SuperProtoOf____Classi=____Classi===null?null:____Classi.prototype;InputDate.prototype=Object.create(____SuperProtoOf____Classi);InputDate.prototype.constructor=InputDate;InputDate.__superConstructor__=____Classi;

	    function InputDate(props) {
	        ____Classi.call(this,props);
	        this.state = {
	            value: this.props.value,
	            readOnly: this.props.readOnly
	        };
	        this.onChange = this.onChange.bind(this);
	    }

	    /*
	     getDefaultProps () {
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
	     */

	    Object.defineProperty(InputDate.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({value: nextProps.value, readOnly: nextProps.readOnly});
	    }});

	    Object.defineProperty(InputDate.prototype,"onChange",{writable:true,configurable:true,value:function(e) {
	        let fieldValue = e.target.value,
	            validation = this.validate(fieldValue);

	        if (fieldValue == null) {
	            // если значение нул, то пусть будет nul
	            validation = true;
	        }

	        if (validation) {
	            this.setState({value: fieldValue});

	            if (this.props.onChange) {
	                // если задан обработчик, вернем его
	                this.props.onChange(this.props.name, fieldValue);
	            }
	        }

	    }});

	    /*
	     propTypes: {
	     name: React.PropTypes.string.isRequired
	     },
	     */

	    Object.defineProperty(InputDate.prototype,"render",{writable:true,configurable:true,value:function() {
	        let inputPlaceHolder = this.props.name,
	            inputStyle = Object.assign({}, styles.input,
	                this.props.width ? {width: this.props.width} : {},
	                this.state.readOnly ? styles.readOnly : {}
	            );

	        return (
	        React.createElement("div", {style: styles.wrapper}, 
	            React.createElement("label", {style: styles.label, htmlFor: this.props.name, ref: "label"}, 
	                this.props.title
	            ), 

	            React.createElement("input", {type: "date", 
	                   name: this.props.name, 
	                   ref: "input", 
	                   value: this.state.value, 
	                   readOnly: this.state.readOnly, 
	                   title: this.props.title, 
	                   pattern: this.props.pattern, 
	                   placeholder: inputPlaceHolder, 
	                   min: this.props.min, 
	                   max: this.props.max, 
	                   onChange: this.onChange, 
	                   disabled: this.props.disabled}
	            )
	        ))
	    }});

	    Object.defineProperty(InputDate.prototype,"validate",{writable:true,configurable:true,value:function(value) {
	        let result = true;

	        // проверка на мин , мах
	        if (this.props.min && this.props.max && value) {
	            let dateValue = new Date(value);
	            result = (dateValue > this.props.min && dateValue < this.props.max);
	        }

	        return result;
	    }});



	InputDate.PropTypes = {
	    name: React.PropTypes.string.isRequired,
	    value: React.PropTypes.objectOf(Date),
	    min: React.PropTypes.objectOf(Date),
	    max: React.PropTypes.objectOf(Date),
	    readOnly: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    valid: React.PropTypes.bool,
	    pattern: React.PropTypes.string,
	    width: React.PropTypes.string

	}


	InputDate.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true
	}


	module.exports = InputDate;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    input: {
	        width: '70%'
	    },
	    focused: {
	        backgroundColor: 'lightblue'
	    },
	    readOnly: {
	        backgroundColor: '#F3EFEF'
	    },
	    wrapper: {
	        margin: '5px',
	        display: 'flex',
	        width: '95%'
	    },
	    label: {
	        width: '30%',
	        margin: '5px'
	    }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(3),
	    styles = __webpack_require__(18);

	var ____Classj=React.PureComponent;for(var ____Classj____Key in ____Classj){if(____Classj.hasOwnProperty(____Classj____Key)){Input[____Classj____Key]=____Classj[____Classj____Key];}}var ____SuperProtoOf____Classj=____Classj===null?null:____Classj.prototype;Input.prototype=Object.create(____SuperProtoOf____Classj);Input.prototype.constructor=Input;Input.__superConstructor__=____Classj;
	    function Input(props) {"use strict";
	        ____Classj.call(this,props);
	        this.state = {
	            value: props.value,
	            readOnly: props.readOnly,
	            disabled: props.disabled,
	            valid: props.valid
	        };
	        this.onChange = this.onChange.bind(this);
	    }

	    Object.defineProperty(Input.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {"use strict";
	        this.setState({value: nextProps.value, readOnly:nextProps.readOnly})
	    }});

	    Object.defineProperty(Input.prototype,"onChange",{writable:true,configurable:true,value:function(e) {"use strict";
	        let fieldValue = e.target.value;
	        this.setState({value: fieldValue});


	        if (this.props.onChange) {
	            this.props.onChange(this.props.name, fieldValue);
	        }
	    }});

	    Object.defineProperty(Input.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
	        let inputPlaceHolder = this.props.placeholder || this.props.name,
	            inputStyle = Object.assign({}, styles.input,
	                this.props.width ? {width: this.props.width} : {},
	                this.state.readOnly ? styles.readOnly : {}
	            ),
	            inputMinValue = this.props.min,
	            inputMaxValue = this.props.max;


	        return (
	            React.createElement("div", {style: styles.wrapper}, 
	                React.createElement("label", {style: styles.label, htmlFor: this.props.name, ref: "label"}, 
	                    this.props.title
	                ), 
	                React.createElement("input", {type: "number", 
	                       id: this.props.name, 
	                       ref: "input", 
	                       style: inputStyle, 
	                       name: this.props.name, 
	                       value: this.state.value, 
	                       readOnly: this.state.readOnly, 
	                       title: this.props.title, 
	                       pattern: "\\d+(\\.\\d{2})?", 
	                       placeholder: inputPlaceHolder, 
	                       onChange: this.onChange, 
	                       min: inputMinValue, 
	                       max: inputMaxValue, 
	                       step: "0.01", 

	                       disabled: this.props.disabled}
	                )

	            ))
	    }});


	Input.PropTypes = {
	    name: React.PropTypes.string.isRequired,
	    value: React.PropTypes.string,
	    readOnly: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    valid: React.PropTypes.bool,
	    placeholder: React.PropTypes.string,
	    pattern: React.PropTypes.string,
	    title: React.PropTypes.string,
	    min: React.PropTypes.number,
	    max: React.PropTypes.number
	}


	Input.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true,
	    min: -999999999,
	    max: 999999999
	}

	module.exports = Input;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    input: {
	        width: '70%',
	        marginLeft: '5px'
	    },
	    focused: {
	        backgroundColor: 'lightblue'
	    },
	    readOnly: {
	        backgroundColor: '#F3EFEF'
	    },
	    wrapper: {
	        margin: '5px',
	        display: 'flex',
	        width: '95%'
	    },
	    label: {
	        width: '30%',
	        margin: '5px'
	    }
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    InputText = __webpack_require__(13),
	    InputDateTime = __webpack_require__(20),
	    DocList = __webpack_require__(21),
	    styles = __webpack_require__(22);

	var ____Classl=React.PureComponent;for(var ____Classl____Key in ____Classl){if(____Classl.hasOwnProperty(____Classl____Key)){DocCommon[____Classl____Key]=____Classl[____Classl____Key];}}var ____SuperProtoOf____Classl=____Classl===null?null:____Classl.prototype;DocCommon.prototype=Object.create(____SuperProtoOf____Classl);DocCommon.prototype.constructor=DocCommon;DocCommon.__superConstructor__=____Classl;
	    function DocCommon(props) {"use strict";
	        ____Classl.call(this,props);
	        this.state = {
	            readOnly: props.readOnly,
	            data: this.props.data
	        }
	    }

	    Object.defineProperty(DocCommon.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {"use strict";
	        // при изменении, поменяет состояние (передаст дальше режим редактирования)
	        this.setState({readOnly:nextProps.readOnly })
	    }});

	    Object.defineProperty(DocCommon.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
	/*
	        var data = this.props.data,
	            bpm = data.bpm || [],
	            actualStepData = bpm.filter((step) => {
	                // текущий шаг БП
	                if (step.actualStep) {
	                    return step;
	                }
	            }),
	            executers = actualStepData.map((stepData)=> {
	                // найдем исполнителей
	                return stepData.actors || {name: 'AUTHOR'};
	            });
	*/
	        let data = this.state.data;

	        return (
	            React.createElement("div", {ref: "wrapper", style: styles.wrapper}, 
	                            React.createElement(InputText, {ref: "id", 
	                                       title: "Id", 
	                                       name: "id", 
	                                       value: data.id, 
	                                       disabled: "true", 
	                                       width: "75%"}), 
	                            React.createElement(InputText, {ref: "created", 
	                                       title: "Created", 
	                                       name: "created", 
	                                       value: data.created, 
	                                       disabled: "true", width: "75%"}), 
	                            React.createElement(InputText, {ref: "lastupdate", 
	                                       title: "Updated", 
	                                       name: "lastupdate", 
	                                       value: data.lastupdate, 
	                                       disabled: "true", width: "75%"}), 
	                            React.createElement(InputText, {ref: "status", 
	                                       title: "Status", 
	                                       name: "status", 
	                                       value: data.status, 
	                                       disabled: "true", 
	                                       width: "75%"})
	            )
	        );
	    }});

	    Object.defineProperty(DocCommon.prototype,"onChangeHandler",{writable:true,configurable:true,value:function(inputName, inputValue) {"use strict";
	        // обработчик изменений
	        let data = flux.stores.docStore.data;
	        data[inputName] = inputValue;
	        // задать новое значение поля
	        flux.doAction('dataChange', data);
	    }});


	DocCommon.PropTypes = {
	    readOnly: React.PropTypes.bool,
	    data: React.PropTypes.object.isRequired
	}

	DocCommon.defaultProps = {
	    readOnly: true
	}

	module.exports = DocCommon;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3),
	    flux = __webpack_require__(4);

	const InputDateTime = React.createClass({displayName: "InputDateTime",
	    getInitialState: function() {
	        return {value: this.props.value, readOnly: true, disabled: this.props.disabled || true};
	    },

	    componentWillMount: function() {
	// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	        var self = this;
	//        console.log('componentWillMount' + this.props.name);
	/*
	        flux.stores.docStore.on('change:docId', function(newValue, previousValue) {
	            if (newValue !== previousValue) {
	                // отслеживаем создание нового документа
	                var data = flux.stores.docStore.data,
	                    value = data[self.props.name];
	                if (newValue == 0) {
	                    // совый документ
	                    self.setState({value:0});
	                } else {
	                    self.setState({value:value});
	                }
	            }
	        });
	*/

	        flux.stores.docStore.on('change:edited', function(newValue, previousValue) {
	 //           console.log('on change:edited:' + newValue);
	            if (newValue !== previousValue) {
	                self.setState({readOnly: !newValue});
	            }
	        });

	        flux.stores.docStore.on('change:data', function(newValue, previousValue) {
	            if (newValue !== previousValue) {

	                var data = newValue,
	                    fieldValue = data[self.props.name];

	                self.setState({value: fieldValue});
	            }
	        });
	    },

	    shouldComponentUpdate: function(nextProps, nextState) {
	        // изменения будут отражаться только в случае если такие есть
	        var returnvalue = (nextState.value !== this.state.value ||
	        nextState.readOnly !== this.state.readOnly ||
	        nextState.disabled !== this.state.disabled);

	 //       console.log('vastus:' + returnvalue);
	        return returnvalue;

	    },

	    onChange: function(e) {
	        var fieldValue = e.target.value,
	            data = flux.stores.docStore.data;

	        this.setState({value: fieldValue});
	        data[this.props.name] = fieldValue;

	        // задать новое значение поля
	        flux.doAction('dataChange', data);
	    },

	    render: function() {
	        console.log('props:' + JSON.stringify(this.props));
	        var inputClassName =this.props.className || 'doc-input',
	            inputReadOnly = this.state.readOnly || false,
	            inputDisabled = this.state.disabled,
	            inputPlaceHolder = this.props.placeholder || this.props.name;

	         if (inputReadOnly) {
	            inputClassName = inputClassName + ' doc-input-readonly';
	        }

	        if (inputDisabled == 'true') {
	            return (
	                React.createElement("div", {className: "form-widget"}, 
	                    React.createElement("label", null, this.props.title), 
	                    React.createElement("input", {type: "datetime-local", 
	                              className: inputClassName, 
	                              name: this.props.name, 
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
	                    React.createElement("label", null, this.props.title), 
	                    React.createElement("input", {type: "datetime-local", 
	                           className: inputClassName, 
	                           name: this.props.name, 
	                           value: this.state.value, 
	                           readOnly: inputReadOnly, 
	                           title: this.props.title, 
	                           pattern: this.props.pattern, 
	                           placeholder: inputPlaceHolder, 
	                           onChange: this.onChange}
	                    )
	                ))
	        }
	    }
	});

	module.exports = InputDateTime;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),

	    List = React.createClass({displayName: "List",
	        getInitialState: function () {
	            return {
	                readOnly: this.props.readOnly,
	                disabled: this.props.disabled,
	                data: this.props.data,
	                clicked: 0
	            }
	        },

	        getDefaultProps: function () {
	            return {
	                readOnly: true,
	                data: [],
	                disabled: false,
	                title: '',
	                name: 'My default List',
	                className: ''
	            }
	        },

	        /*  componentWillMount: ()=> {
	         // создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	         let self = this;

	         flux.stores.docStore.on('change:docId', function (newValue, previousValue) {
	         if (newValue !== previousValue) {
	         var data = flux.stores.docStore.data,
	         value = data[self.props.name];
	         if (newValue == 0) {
	         // совый документ
	         self.setState({value: 0});
	         } else {
	         self.setState({value: value});
	         }
	         }
	         });

	         flux.stores.docStore.on('change:edited', function (newValue, previousValue) {
	         if (newValue !== previousValue) {
	         self.setState({readOnly: !newValue, disabled: !newValue});
	         }
	         });

	         flux.stores.docStore.on('change:libs', function (newValue, previousValue) {
	         var vastus = JSON.stringify(newValue) !== JSON.stringify(previousValue);
	         // will watch libs change (from server)
	         var data = newValue.filter(function (item) {
	         if (item.id === self.props.libs) {
	         return item;
	         }
	         });

	         if (data && data.length > 0) {
	         self.setState({data: data[0].data});
	         }
	         });
	         },
	         */

	        handleLiClick: function (index) {
	            this.setState({
	                clicked: index
	            });
	        },


	        handleClickBtnDeleteExecutor: function (index) {
	            let data = this.state.data;
	            console.log('list btn delete', index);
	        },

	        handleClickBtnAddExecutor: function (index) {
	            let data = this.state.data;
	            console.log('list btn add', index);

	        },

	        componentWillReceiveProps: function(nextProps) {
	            // при изменении срежима редактирования, поменяет состояние виджета
	            this.setState({readOnly:nextProps.readOnly })
	        },

	        render: function () {

	            let data = this.state.data || [],
	                inputClassName = this.props.className || 'doc-input form-widget',
	                inputReadOnly = this.state.readOnly || false,
	                inputPlaceHolder = this.props.placeholder || this.props.name,
	                Options = null;

	            // создадим список значений
	            if (data.length) {
	                Options = data.map(function (item, index) {
	                    let className = this.props.className;

	                    if (typeof item == 'array') {
	                        item = item[0];
	                    }

	                    if (this.state.index == index && !this.state.readOnly ) {
	                        // выделим в списке значение, при условии, что режим редактирования это позволяет
	                        className = className + ' focused';
	                    }
	                    return (
	                        React.createElement("li", {
	                            key: Math.random(), 
	                            className: className, 
	                            onClick: this.handleLiClick.bind(this, index)
	                        }, item.name
	                        )
	                    )
	                }, this);
	            }

	            let widget = React.createElement("ul", {
	                name: this.props.name, 
	                style: {width: '100%', height: '100%'}}, 
	                Options
	            );


	            return React.createElement("div", {className: "form-widget"}, 
	                React.createElement("div", {style: {display: "flex"}}, 
	                    React.createElement("label", {style: {paddingRight: "5px"}}, " ", this.props.title), 
	                    this.state.readOnly ? null : React.createElement("input", {type: "button", value: " Add ", onClick: this.handleClickBtnAddExecutor}), 
	                    this.state.readOnly ? null : React.createElement("input", {type: "button", value: " Delete ", onClick: this.handleClickBtnDeleteExecutor})
	                ), 
	                widget
	            )
	        }

	    });

	module.exports = List;


/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    wrapper: {
	        display: 'flex',
	        flexDirection: 'row',
	        width: '100%',
	        justifyContent: 'flex-start'
	    }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    styles = __webpack_require__(24);

	//    InputText = require('./doc-input-text.jsx');

	var ____Classk=React.PureComponent;for(var ____Classk____Key in ____Classk){if(____Classk.hasOwnProperty(____Classk____Key)){Select[____Classk____Key]=____Classk[____Classk____Key];}}var ____SuperProtoOf____Classk=____Classk===null?null:____Classk.prototype;Select.prototype=Object.create(____SuperProtoOf____Classk);Select.prototype.constructor=Select;Select.__superConstructor__=____Classk;
	    function Select(props) {
	        ____Classk.call(this,props);
	        this.state = {
	            value: props.value/* здесь по значению ИД */,
	            readOnly: props.readOnly,
	            disabled: props.disabled,
	            data: props.data,
	            fieldValue: props.value /*здесь по значени поля collId */,
	            btnDelete: props.btnDelete /* если истину, то рисуем рядом кнопку для очистки значения*/
	        };
	        this.onChange = this.onChange.bind(this);
	        this.btnDelClick = this.btnDelClick.bind(this);

	    }

	    Object.defineProperty(Select.prototype,"findFieldValue",{writable:true,configurable:true,value:function(data, collId, value) {
	        // привяжет к значеню поля
	        // надо привязать данные
	        data.forEach(function(row)  {
	            if (row[collId] == value) {
	                this.setState({value: row[collId], fieldValue: row[collId]});
	                return;
	            }
	        }.bind(this), this);

	    }});

	    Object.defineProperty(Select.prototype,"getValueById",{writable:true,configurable:true,value:function(collId, rowId) {
	        // вернет значения поля по выбранному ИД

	        let fieldValue,
	            data = this.state.data;

	        data.forEach(function(row)  {
	            if (row[collId] == rowId) {
	                fieldValue = row[collId];
	                this.setState({fieldValue: fieldValue});
	                return;
	            }
	        }.bind(this), this);

	        return fieldValue;
	    }});

	    Object.defineProperty(Select.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({
	            value: nextProps.value,
	            readOnly: nextProps.readOnly, data: nextProps.data
	        });
	    }});

	    Object.defineProperty(Select.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {
	        if (this.props.collId && this.props.collId !== 'id') {
	            // ищем ИД по значению поля
	            this.findFieldValue(this.state.data, this.props.collId, this.props.value);
	        }
	    }});

	    Object.defineProperty(Select.prototype,"onChange",{writable:true,configurable:true,value:function(e) {
	        let fieldValue = e.target.value;

	        if (fieldValue == '') {
	            fieldValue = null;
	        }

	        if (this.props.collId) {
	            // найдем по ид значение поля в collId
	            fieldValue = this.getValueById(this.props.collId, fieldValue);
	        }
	        // сохраним ид как value
	        this.setState({value: e.target.value, fieldValue: fieldValue});

	        if (this.props.onChange) {
	            // смотрим к чему привязан селект и отдаим его наверх
	            this.props.onChange(this.props.name, fieldValue); // в случае если задан обработчик на верхнем уровне, отдадим обработку туда
	        }

	    }});

	/*
	    shouldComponentUpdate(nextProps, nextState) {
	        // @todo добавить проверку на изменение состояния
	        return true;
	    }
	*/

	    Object.defineProperty(Select.prototype,"render",{writable:true,configurable:true,value:function() {
	        let dataOptions = this.state.data || [],
	            inputClassName = this.props.className || 'doc-input',
	            inputReadOnly = this.state.readOnly || false,
	            inputPlaceHolder = this.props.placeholder || this.props.name,
	            Options = null,
	            inputDefaultValue = this.props.defaultValue; // Дадим дефолтное значение для виджета, чтоб покать его сразу, до подгрузки библиотеки

	        if (!this.state.value) { // добавим пустую строку в массив
	            // проверим наличие пустой строки в массиве

	            let emptyObj = dataOptions.filter(function(obj)  {
	                if (obj.id === 0) {
	                    return obj;
	                }
	            });

	            if (!emptyObj || emptyObj.length == 0) {
	                dataOptions.splice(0, 0, {id: 0, kood: '', name: ''});
	            }
	        }


	        let dataValue = dataOptions.filter(function(item)  {
	            if (item[this.props.collId] === this.state.value) {
	                return item;
	            }
	        }.bind(this), this);

	        if (dataOptions.length) {
	            Options = dataOptions.map(function(item, index)  {

	                if (typeof item == 'array') {
	                    item = item[0];
	                }
	                let key = 'option-' + index;
	                return React.createElement("option", {value: item[this.props.collId], key: key, ref: key}, " ", item.name, " ")
	            }.bind(this), this);
	            inputDefaultValue = dataValue.length > 0 ? dataValue[0].name : this.props.defaultValue;
	        } else {
	            Options = React.createElement("option", {value: 0, key: Math.random()}, " Empty ")
	        }

	        let inputStyle = Object.assign({}, styles.input, inputReadOnly ? {} : styles.hide,
	            inputReadOnly ? styles.readOnly: {}),
	            selectStyle = Object.assign({}, styles.select, inputReadOnly ? styles.hide : {}, inputReadOnly ? styles.readOnly: {}),
	            buttonStyle = Object.assign({}, styles.button, this.props.btnDelete ? {} : styles.hide)

	        return (
	            React.createElement("div", {style: styles.wrapper, ref: "wrapper"}, 
	            React.createElement("label", {ref: "label", style: styles.label, 
	                   htmlFor: this.props.name}, this.props.title
	            ), 

	            React.createElement("input", {type: "text", id: this.props.name, 
	                   style: inputStyle, 
	                   ref: "input", 
	                   value: inputDefaultValue, 
	                   readOnly: true}), 

	            React.createElement("select", {ref: "select", 
	                    style: selectStyle, 
	                    value: this.state.value, 
	                    id: this.props.name, 
	                    onChange: this.onChange}, Options
	            ), 
	            React.createElement("button", {ref: "button", 
	                    style: buttonStyle, 
	                    onClick: this.btnDelClick}, 
	                "Delete"
	            )
	        ))
	    }});

	    Object.defineProperty(Select.prototype,"btnDelClick",{writable:true,configurable:true,value:function(event) {
	        // по вызову кнопку удалить, обнуляет значение
	        this.setState({value: ''});
	        this.onChange(event);
	    }});


	Select.PropTypes = {
	    data: React.PropTypes.array,
	    readOnly: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    btnDelete: React.PropTypes.bool,
	    libs:React.PropTypes.string,
	    collId: React.PropTypes.string
	}

	Select.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true,
	    btnDelete: false,
	    value: 0,
	    collId: 'id'
	}

	module.exports = Select;


/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    wrapper: {
	        margin: '5px',
	        display: 'flex',
	        width: '95%'

	    },
	    input: {
	        width: '70%',
	        marginLeft: '5px'

	    },
	    hide: {
	        display: 'none'
	    },
	    select: {
	        width: '60%',
	        marginLeft: '5px'
	    },
	    readOnly: {
	        backgroundColor: '#F3EFEF'
	    },
	    label: {
	        width: '30%',
	        margin: '5px'
	    },
	    button: {
	        width: '10%'
	    }

	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(3),
	    styles = __webpack_require__(26);

	var ____Classm=React.PureComponent;for(var ____Classm____Key in ____Classm){if(____Classm.hasOwnProperty(____Classm____Key)){Input[____Classm____Key]=____Classm[____Classm____Key];}}var ____SuperProtoOf____Classm=____Classm===null?null:____Classm.prototype;Input.prototype=Object.create(____SuperProtoOf____Classm);Input.prototype.constructor=Input;Input.__superConstructor__=____Classm;
	    function Input(props) {"use strict";
	        ____Classm.call(this,props);
	        this.state = {
	            value: this.props.value, readOnly: true, disabled: this.props.disabled || true
	        };

	        this.onChange = this.onChange.bind(this);

	    }

	    Object.defineProperty(Input.prototype,"onChange",{writable:true,configurable:true,value:function(e) {"use strict";
	        let fieldValue = e.target.value;

	        this.setState({value: fieldValue});
	        if (this.props.onChange) {
	            this.props.onChange(this.props.name, fieldValue);
	        }
	    }});

	    Object.defineProperty(Input.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {"use strict";
	        this.setState({value: nextProps.value})
	    }});

	    Object.defineProperty(Input.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
	        const inputPlaceHolder = this.props.placeholder || this.props.name,
	            inputStyle = Object.assign({}, styles.input,
	                this.props.width ? {width: this.props.width} : {},
	                this.state.readOnly ? styles.readOnly : {}
	            );

	        return (
	            React.createElement("div", {style: styles.wrapper}, 

	                React.createElement("label", {htmlFor: this.props.name, ref: "label", 
	                       style: styles.label}, React.createElement("span", null, this.props.title)
	                ), 

	                React.createElement("textarea", {
	                    style: inputStyle, 
	                    ref: "input", 
	                    id: this.props.name, 
	                    name: this.props.name, 
	                    value: this.state.value, 
	                    readOnly: this.props.readOnly, 
	                    title: this.props.title, 
	                    placeholder: inputPlaceHolder, 
	                    onChange: this.onChange, 
	                    disabled: this.props.disabled}
	                )
	            ))
	    }});


	;

	Input.PropTypes = {
	    name: React.PropTypes.string.isRequired,
	    value: React.PropTypes.string,
	    readOnly: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    valid: React.PropTypes.bool,
	    placeholder: React.PropTypes.string,
	    title: React.PropTypes.string
	}

	Input.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true
	}


	module.exports = Input;

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    input: {
	        width: '100%'
	    },
	    focused: {
	        backgroundColor: 'lightblue'
	    },
	    readOnly: {
	        backgroundColor: '#F3EFEF'
	    },
	    wrapper: {
	        margin: '5px',
	        display: 'flex',
	        width: '98%',
	        flexDirection: 'column'
	    },
	    label: {
	        margin: '5px'
	    }
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(28),
	    keydown = __webpack_require__(29),
	    KEYS = [ 38, 40]; // мониторим только стрелки вверх и внизх

	const isExists = function(object, prop)  {
	    let result = false;
	    if (prop in object) {
	        result = true;
	    }
	    return result;
	}

	//@keydown @todo
	var ____Class3=React.PureComponent;for(var ____Class3____Key in ____Class3){if(____Class3.hasOwnProperty(____Class3____Key)){DataGrid[____Class3____Key]=____Class3[____Class3____Key];}}var ____SuperProtoOf____Class3=____Class3===null?null:____Class3.prototype;DataGrid.prototype=Object.create(____SuperProtoOf____Class3);DataGrid.prototype.constructor=DataGrid;DataGrid.__superConstructor__=____Class3;
	    function DataGrid(props) {
	        ____Class3.call(this,props);
	        this.state = {
	            gridColumns: this.props.gridColumns,
	            gridData: this.props.gridData,
	            activeRow: 0,
	            activeColumn: '',
	            sort: {
	                name: null,
	                direction: null
	            }
	        }
	        this.handleGridHeaderClick.bind(this);
	        this.handleCellDblClick.bind(this);
	        this.handleKeyDown.bind(this);
	        this.prepareTableRow = this.prepareTableRow.bind(this);

	    }

	    Object.defineProperty(DataGrid.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {
	        // надем по по props.value индекс активной строки
	        if (this.props.value) {
	           let index = this.getGridRowIndexById(this.props.value);
	           this.setState({activeRow: index});
	        }
	   }});

	    Object.defineProperty(DataGrid.prototype,"getGridRowIndexById",{writable:true,configurable:true,value:function(docId) {
	        // ищем индех в массиве данных
	        let index = 0,
	            data = this.props.gridData;

	        if (docId) {
	            for (let i = 0; i < data.length; i++) {
	                let row = data[i];
	                if (row && data[i]['id'] == docId) {
	                    index = i;
	                    break;
	                }
	            }
	        }
	        return index;
	    }});

	    Object.defineProperty(DataGrid.prototype,"handleCellClick",{writable:true,configurable:true,value:function(idx) {
	        // отрабатывает событи клика по ячейке
	        this.setState({
	            activeRow: idx
	        });

	        if (this.props.gridData.length > 0 && this.props.onChangeAction) {
	            let docId = this.props.gridData[idx].id;

	            if (this.props.onClick) {
	                this.props.onClick(this.props.onChangeAction, docId)
	            }

	        }

	    }});

	    Object.defineProperty(DataGrid.prototype,"handleCellDblClick",{writable:true,configurable:true,value:function(idx) {
	        // отметим активную строку и вызовен обработчик события dblClick
	        this.handleCellClick(idx)
	        if (this.props.onDblClick) {
	            this.props.onDblClick();
	        }
	    }});

	    Object.defineProperty(DataGrid.prototype,"handleGridHeaderClick",{writable:true,configurable:true,value:function(name) {
	        let  sort = this.state.sort;
	        if (sort.name === name) {
	            sort.direction = sort.direction === 'asc' ? 'desc': 'asc';
	        } else {
	            sort = {
	                name: name,
	                direction: 'asc'
	            }
	        }

	        let sortBy = [{column: sort.name, direction: sort.direction}];

	        this.setState({
	            activeColumn:name,
	            sort: sort
	        });

	        if (this.props.onHeaderClick) {
	            this.props.onHeaderClick(sortBy);
	        }

	    }});

	    Object.defineProperty(DataGrid.prototype,"handleKeyDown",{writable:true,configurable:true,value:function(e) {
	        // реакция на клавиатуру
	        let rowIndex = this.state.activeRow;
	        switch (e.which) {
	            case 40:
	                // вниз, увеличим активную строку на + 1
	                rowIndex++;

	                if (this.state.gridData.length < rowIndex) {
	                    // вернем прежнее значение
	                    rowIndex = this.state.activeRow
	                }
	                break;
	            case 38:
	                // вниз, увеличим активную строку на - 1
	                rowIndex--;
	                rowIndex = rowIndex < 0 ? 0: rowIndex;
	                break;
	        }
	         this.setState({
	             activeRow: rowIndex
	         });
	    }});

	    Object.defineProperty(DataGrid.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({gridColumns: nextProps.gridColumns, gridData:nextProps.gridData})
	    }});

	    Object.defineProperty(DataGrid.prototype,"shouldComponentUpdate",{writable:true,configurable:true,value:function(nextProps, nextState) {
	        // @todo добавить проверку на изменение состояния
	        return true;
	    }});

	    Object.defineProperty(DataGrid.prototype,"render",{writable:true,configurable:true,value:function() {
	        let className = 'th';
	        /*
	         self = this;
	         onKeyDown: this.handleKeyPress('Down'),
	         onDoubleClick: this.handleCellDblClick(),
	         */

	        return (React.createElement("table", {ref: "dataGridTable"}, 
	                React.createElement("tbody", null, 
	                    React.createElement("tr", null, 
	                        this.prepareTableHeader()
	                    )
	                ), 
	                React.createElement("tbody", null, 
	                    this.prepareTableRow()
	                )
	            )
	        );

	    }}); // render

	    Object.defineProperty(DataGrid.prototype,"prepareTableRow",{writable:true,configurable:true,value:function() {
	        return this.state.gridData.map(function(row, rowIndex)  {
	            let setRowActive = {},
	                objectIndex = 'tr-' + rowIndex,
	                activeRow = this.state.activeRow;

	            let rowObject = (React.createElement("tr", {
	                ref: objectIndex, 
	                onClick: this.handleCellClick.bind(this, rowIndex), 
	                onDoubleClick: this.handleCellDblClick.bind(this, rowIndex), 
	                onKeyDown: this.handleKeyDown.bind(this), 
	                style: Object.assign({}, styles.tr, activeRow === rowIndex ? styles.focused: {}), 
	                key: objectIndex}, 
	                
	                    this.state.gridColumns.map(function(column, columnIndex)  {
	                        let cellIndex = 'td-' + rowIndex + '-' + columnIndex;

	                        let display = (isExists(column, 'show') ? column.show: true) ? true: false,
	                            width = isExists(column, 'width') ? column.width: '100%',
	                            style = Object.assign({}, styles.td, !display ? {display: 'none'} : {}, {width: width});

	                        return (
	                            React.createElement("td", {style: style, ref: cellIndex, key: cellIndex}, 
	                                row[column.id]
	                            )
	                        );
	                    })
	                

	            ));
	                return rowObject;
	        }.bind(this), this);
	    }});

	    Object.defineProperty(DataGrid.prototype,"prepareTableHeader",{writable:true,configurable:true,value:function() {
	        let gridColumns = this.props.gridColumns,
	            className = 'th';

	        return gridColumns.map(function(column, index)  {
	            let headerIndex = 'th-' + index;

	             let display = (isExists(column, 'show') ? column.show: true) ? true: false,
	                 width = isExists(column, 'width') ? column.width: '100%',
	                 style = Object.assign({}, styles.th, !display ? {display: 'none'} : {}, {width: width}),
	                 activeColumn = this.state.activeColumn,
	                 iconType = this.state.sort.direction,
	                 imageStyleAsc = Object.assign({},styles.image, (activeColumn == column.id && iconType == 'asc' )  ? {}: {display: 'none'}),
	                 imageStyleDesc = Object.assign({},styles.image, (activeColumn == column.id && iconType == 'desc' )  ? {}: {display: 'none'})

	            // установить видимость
	            return React.createElement("th", {
	                style: style, 
	                ref: headerIndex, 
	                key: headerIndex, 
	                onClick: this.handleGridHeaderClick.bind(this, column.id)}, 
	                React.createElement("span", null, column.name), 
	                React.createElement("image", {ref: "imageAsc", style: imageStyleAsc, src: styles.icons['asc']}), 
	                React.createElement("image", {ref: "imageDesc", style: imageStyleDesc, src: styles.icons['desc']})
	            )
	        }.bind(this), this);
	    }});


	DataGrid.propTypes = {
	    gridColumns: React.PropTypes.array.isRequired,
	    gridData: React.PropTypes.array.isRequired,
	    onChangeAction: React.PropTypes.string,
	    onClick: React.PropTypes.func,
	    onDblClick: React.PropTypes.func,
	    onHeaderClick: React.PropTypes.func,
	    activeRow: React.PropTypes.number
	}


	DataGrid.defaultProps = {
	    gridColumns: [],
	    gridData: []
	};

	module.exports = DataGrid;


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    th: {
	        borderBottom: '1px solid black',
	        backgroundColor: 'grey',
	        height: '50px',
	        border: '1px solid lightgray'
	    },

	    tr: {
	        backgroundColor: 'white'
	    },

	    focused: {
	        backgroundColor: 'lightblue'
	    },

	    td: {
	        border: '1px solid lightgray'
	    },

	    icons: {
	        asc: '/images/icons/sort-alpha-asc.png',
	        desc: '/images/icons/sort-alpha-desc.png'
	    },

	    image: {
	        margin: '1px'
	    }

	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// polyfill array.from (mainly for IE)
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequire(obj) {
	  return obj && obj.__esModule ? obj['default'] : obj;
	}

	__webpack_require__(30);

	// @keydown and @keydownScoped

	var _decorators = __webpack_require__(31);

	exports['default'] = _interopRequire(_decorators);
	Object.defineProperty(exports, 'keydownScoped', {
	  enumerable: true,
	  get: function get() {
	    return _decorators.keydownScoped;
	  }
	});

	// setBinding - only useful if you're not going to use decorators

	var _store = __webpack_require__(33);

	Object.defineProperty(exports, 'setBinding', {
	  enumerable: true,
	  get: function get() {
	    return _store.setBinding;
	  }
	});

	// Keys - use this to find key codes for strings. for example: Keys.j, Keys.enter

	var _libKeys = __webpack_require__(34);

	exports.Keys = _interopRequire(_libKeys);

/***/ },
/* 30 */
/***/ function(module, exports) {

	// Production steps of ECMA-262, Edition 6, 22.1.2.1
	// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
	'use strict';

	if (!Array.from) {
	  Array.from = function () {
	    var toStr = Object.prototype.toString;
	    var isCallable = function isCallable(fn) {
	      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
	    };
	    var toInteger = function toInteger(value) {
	      var number = Number(value);
	      if (isNaN(number)) {
	        return 0;
	      }
	      if (number === 0 || !isFinite(number)) {
	        return number;
	      }
	      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
	    };
	    var maxSafeInteger = Math.pow(2, 53) - 1;
	    var toLength = function toLength(value) {
	      var len = toInteger(value);
	      return Math.min(Math.max(len, 0), maxSafeInteger);
	    };

	    // The length property of the from method is 1.
	    return function from(arrayLike /*, mapFn, thisArg */) {
	      // 1. Let C be the this value.
	      var C = this;

	      // 2. Let items be ToObject(arrayLike).
	      var items = Object(arrayLike);

	      // 3. ReturnIfAbrupt(items).
	      if (arrayLike == null) {
	        throw new TypeError("Array.from requires an array-like object - not null or undefined");
	      }

	      // 4. If mapfn is undefined, then let mapping be false.
	      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
	      var T;
	      if (typeof mapFn !== 'undefined') {
	        // 5. else
	        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
	        if (!isCallable(mapFn)) {
	          throw new TypeError('Array.from: when provided, the second argument must be a function');
	        }

	        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
	        if (arguments.length > 2) {
	          T = arguments[2];
	        }
	      }

	      // 10. Let lenValue be Get(items, "length").
	      // 11. Let len be ToLength(lenValue).
	      var len = toLength(items.length);

	      // 13. If IsConstructor(C) is true, then
	      // 13. a. Let A be the result of calling the [[Construct]] internal method
	      // of C with an argument list containing the single item len.
	      // 14. a. Else, Let A be ArrayCreate(len).
	      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

	      // 16. Let k be 0.
	      var k = 0;
	      // 17. Repeat, while k < len… (also steps a - h)
	      var kValue;
	      while (k < len) {
	        kValue = items[k];
	        if (mapFn) {
	          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
	        } else {
	          A[k] = kValue;
	        }
	        k += 1;
	      }
	      // 18. Let putStatus be Put(A, "length", len, true).
	      A.length = len;
	      // 20. Return A.
	      return A;
	    };
	  }();
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module decorators
	 *
	 */
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _class_decorator = __webpack_require__(32);

	var _class_decorator2 = _interopRequireDefault(_class_decorator);

	var _method_decorator = __webpack_require__(41);

	var _method_decorator2 = _interopRequireDefault(_method_decorator);

	var _method_decorator_scoped = __webpack_require__(42);

	var _method_decorator_scoped2 = _interopRequireDefault(_method_decorator_scoped);

	/**
	 * _decorator
	 *
	 * @access private
	 * @param {Function} methodFn The method wrapper to delegate to, based on whether user has specified a scoped decorator or not
	 * @param {Array} ...args Remainder of arguments passed in
	 * @return {Function} The decorated class or method
	 */
	function _decorator(methodFn) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  // check the first argument to see if it's a user-supplied keycode or array
	  // of keycodes, or if it's the wrapped class or method
	  var testArg = args[0];
	  var isArray = Array.isArray(testArg);

	  // if the test argument is not an object or function, it is user-supplied
	  // keycodes. else there are no arguments and it's just the wrapped class
	  // (method decorators must have keycode arguments).
	  if (isArray || ~['string', 'number'].indexOf(typeof testArg === 'undefined' ? 'undefined' : _typeof(testArg))) {
	    var _ret = function () {
	      var keys = isArray ? testArg : args;

	      // return the decorator function, which on the next call will look for
	      // the presence of a method name to determine if this is a wrapped method
	      // or component
	      return {
	        v: function v(target, methodName, descriptor) {
	          return methodName ? methodFn({ target: target, descriptor: descriptor, keys: keys }) : (0, _class_decorator2['default'])(target, keys);
	        }
	      };
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === 'object') return _ret.v;
	  } else {
	    var methodName = args[1];

	    // method decorators without keycode (which) arguments are not allowed.
	    if (!methodName) {
	      return _class_decorator2['default'].apply(undefined, args);
	    } else {
	      console.warn(methodName + ': Method decorators must have keycode arguments, so the decorator for this method will not do anything');
	    }
	  }
	}

	/**
	 * keydownScoped
	 *
	 * Method decorator that will look for changes to its targeted component's
	 * `keydown` props to decide when to trigger, rather than responding directly
	 * to keydown events. This lets you specify a @keydown decorated class higher
	 * up in the view hierarchy for larger scoping of keydown events, or for
	 * programmatically sending keydown events as props into the components in order
	 * to trigger decorated methods with matching keys.
	 *
	 * @access public
	 * @param {Array} ...args  All (or no) arguments passed in from decoration
	 * @return {Function} The decorated class or method
	 */
	function keydownScoped() {
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }

	  return _decorator.apply(undefined, [_method_decorator_scoped2['default']].concat(args));
	}

	/**
	 * keydown
	 *
	 * The main decorator and default export, handles both classes and methods.
	 *
	 * @access public
	 * @param {Array} ...args  All (or no) arguments passed in from decoration
	 * @return {Function} The decorated class or method
	 */
	function keydown() {
	  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    args[_key3] = arguments[_key3];
	  }

	  return _decorator.apply(undefined, [_method_decorator2['default']].concat(args));
	}

	exports['default'] = keydown;
	exports.keydownScoped = keydownScoped;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module componentWrapper
	 *
	 */
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x2, _x3, _x4) {
	  var _again = true;_function: while (_again) {
	    var object = _x2,
	        property = _x3,
	        receiver = _x4;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x2 = parent;_x3 = property;_x4 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _store = __webpack_require__(33);

	var _store2 = _interopRequireDefault(_store);

	var _event_handlers = __webpack_require__(38);

	/**
	 * componentWrapper
	 *
	 * @access public
	 * @param {object} WrappedComponent React component class to be wrapped
	 * @param {array} [keys] The key(s) bound to the class
	 * @return {object} The higher-order function that wraps the decorated class
	 */
	function componentWrapper(WrappedComponent) {
	  var keys = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	  var KeyBoardHelper = function (_React$Component) {
	    _inherits(KeyBoardHelper, _React$Component);

	    function KeyBoardHelper(props) {
	      _classCallCheck(this, KeyBoardHelper);

	      _get(Object.getPrototypeOf(KeyBoardHelper.prototype), 'constructor', this).call(this, props);
	      this.state = {
	        event: null
	      };
	    }

	    _createClass(KeyBoardHelper, [{
	      key: 'componentDidMount',
	      value: function componentDidMount() {
	        (0, _event_handlers.onMount)(this);
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        (0, _event_handlers.onUnmount)(this);
	      }
	    }, {
	      key: 'handleKeyDown',
	      value: function handleKeyDown(event) {
	        var _this = this;

	        // to simulate a keypress, set the event and then clear it in the callback
	        this.setState({ event: event }, function () {
	          return _this.setState({ event: null });
	        });
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return _react2['default'].createElement(WrappedComponent, _extends({}, this.props, { keydown: this.state }));
	      }
	    }]);

	    return KeyBoardHelper;
	  }(_react2['default'].Component);

	  _store2['default'].setBinding({ keys: keys, fn: KeyBoardHelper.prototype.handleKeyDown, target: KeyBoardHelper.prototype });

	  return KeyBoardHelper;
	}

	exports['default'] = componentWrapper;
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module store
	 *
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;_e = err;
	    } finally {
	      try {
	        if (!_n && _i['return']) _i['return']();
	      } finally {
	        if (_d) throw _e;
	      }
	    }return _arr;
	  }return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError('Invalid attempt to destructure non-iterable instance');
	    }
	  };
	}();

	exports._resetStore = _resetStore;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	var _libKeys = __webpack_require__(34);

	var _libMatch_keys = __webpack_require__(35);

	var _libMatch_keys2 = _interopRequireDefault(_libMatch_keys);

	var _libParse_keys = __webpack_require__(36);

	var _libParse_keys2 = _interopRequireDefault(_libParse_keys);

	var _libUuid = __webpack_require__(37);

	var _libUuid2 = _interopRequireDefault(_libUuid);

	/**
	 * private
	 * 
	 */

	// dict for class prototypes => bindings
	var _handlers = new Map();

	// all mounted instances that have keybindings
	var _instances = new Set();

	// for testing

	function _resetStore() {
	  _handlers.clear();
	  _instances.clear();
	}

	/**
	 * public
	 *
	 */

	var Store = {

	  /**
	   * activate
	   *
	   * @access public
	   * @param {object} instance Instantiated class that extended React.Component, to be focused to receive keydown events
	   */
	  activate: function activate(instances) {
	    var instancesArray = [].concat(instances);

	    // if no components were found as ancestors of the event target,
	    // effectively deactivate keydown handling by capping the set of instances
	    // with `null`.
	    if (!instancesArray.length) {
	      _instances.add(null);
	    } else {
	      _instances['delete'](null);

	      // deleting and then adding the instance(s) has the effect of sorting the set
	      // according to instance activation (ascending)
	      instancesArray.forEach(function (instance) {
	        _instances['delete'](instance);
	        _instances.add(instance);
	      });
	    }
	  },

	  /**
	   * deleteInstance
	   *
	   * @access public
	   * @param {object} target Instantiated class that extended React.Component
	   * @return {boolean} The value set.has( target ) would have returned prior to deletion
	   */
	  deleteInstance: function deleteInstance(target) {
	    _instances['delete'](target);
	  },

	  findBindingForEvent: function findBindingForEvent(event) {
	    if (!_instances.has(null)) {
	      var keyMatchesEvent = function keyMatchesEvent(keySet) {
	        return (0, _libMatch_keys2['default'])({ keySet: keySet, event: event });
	      };

	      // loop through instances in reverse activation order so that most
	      // recently activated instance gets first dibs on event
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = [].concat(_toConsumableArray(_instances)).reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var instance = _step.value;

	          var bindings = this.getBinding(instance.constructor.prototype);
	          var _iteratorNormalCompletion2 = true;
	          var _didIteratorError2 = false;
	          var _iteratorError2 = undefined;

	          try {
	            for (var _iterator2 = bindings[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	              var _step2$value = _slicedToArray(_step2.value, 2);

	              var keySets = _step2$value[0];
	              var fn = _step2$value[1];

	              if ((0, _libKeys.allKeys)(keySets) || keySets.some(keyMatchesEvent)) {
	                // return when matching keybinding is found - i.e. only one
	                // keybound component can respond to a given key code. to get around this,
	                // scope a common ancestor component class with @keydown and use
	                // @keydownScoped to bind the duplicate keys in your child components
	                // (or just inspect nextProps.keydown.event).
	                return { fn: fn, instance: instance };
	              }
	            }
	          } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion2 && _iterator2['return']) {
	                _iterator2['return']();
	              }
	            } finally {
	              if (_didIteratorError2) {
	                throw _iteratorError2;
	              }
	            }
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator['return']) {
	            _iterator['return']();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	    return null;
	  },

	  /**
	   * getBinding
	   *
	   * @access public
	   * @param {object} target Class used as key in dict of key bindings
	   * @return {object} The object containing bindings for the given class
	   */
	  getBinding: function getBinding(_ref) {
	    var __reactKeydownUUID = _ref.__reactKeydownUUID;

	    return _handlers.get(__reactKeydownUUID);
	  },

	  /**
	   * getInstances
	   *
	   * @access public
	   * @return {set} All stored instances (all mounted component instances with keybindings)
	   */
	  getInstances: function getInstances() {
	    return _instances;
	  },

	  /**
	   * isEmpty
	   *
	   * @access public
	   * @return {number} Size of the set of all stored instances
	   */
	  isEmpty: function isEmpty() {
	    return !_instances.size;
	  },

	  /**
	   * setBinding
	   *
	   * @access public
	   * @param {object} args All arguments necessary to set the binding
	   * @param {array} args.keys Key codes that should trigger the fn
	   * @param {function} args.fn The callback to be triggered when given keys are pressed
	   * @param {object} args.target The decorated class
	   */
	  setBinding: function setBinding(_ref2) {
	    var keys = _ref2.keys;
	    var fn = _ref2.fn;
	    var target = _ref2.target;

	    var keySets = keys ? (0, _libParse_keys2['default'])(keys) : (0, _libKeys.allKeys)();
	    var __reactKeydownUUID = target.__reactKeydownUUID;

	    if (!__reactKeydownUUID) {
	      target.__reactKeydownUUID = (0, _libUuid2['default'])();
	      _handlers.set(target.__reactKeydownUUID, new Map([[keySets, fn]]));
	    } else {
	      _handlers.get(__reactKeydownUUID).set(keySets, fn);
	    }
	  }
	};

	exports['default'] = Store;

/***/ },
/* 34 */
/***/ function(module, exports) {

	// TODO: Need better, more complete, and more methodical key definitions

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.allKeys = allKeys;
	var Keys = {
	  backspace: 8,
	  del: 46,
	  'delete': 46,
	  tab: 9,
	  enter: 13,
	  'return': 13,
	  esc: 27,
	  space: 32,
	  left: 37,
	  up: 38,
	  right: 39,
	  down: 40,
	  ';': 186,
	  '=': 187,
	  ',': 188,
	  '-': 189,
	  '.': 190,
	  '/': 191,
	  '`': 192,
	  '[': 219,
	  '\\': 220,
	  ']': 221
	};

	// Add uppercase versions of keys above for backwards compatibility
	Object.keys(Keys).forEach(function (key) {
	  return Keys[key.toUpperCase()] = Keys[key];
	});

	'0123456789'.split('').forEach(function (num, index) {
	  return Keys[num] = index + 48;
	});

	'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function (letter, index) {
	  Keys[letter] = index + 65;
	  Keys[letter.toLowerCase()] = index + 65;
	});

	// fn keys
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(function (item, index) {
	  return Keys['f' + index] = 111 + index;
	});

	var modifiers = {
	  control: 'ctrl',
	  ctrl: 'ctrl',
	  shift: 'shift',
	  meta: 'meta',
	  cmd: 'meta',
	  command: 'meta',
	  option: 'alt',
	  alt: 'alt'
	};

	exports.modifiers = modifiers;

	function allKeys(arg) {
	  return arg ? arg.constructor === Symbol || (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol' : Symbol('allKeys');
	}

	exports['default'] = Keys;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _keys = __webpack_require__(34);

	var modKeys = Object.keys(_keys.modifiers);

	function matchKeys(_ref) {
	  var _ref$keySet = _ref.keySet;
	  var key = _ref$keySet.key;
	  var _ref$keySet$modifiers = _ref$keySet.modifiers;
	  var modifiers = _ref$keySet$modifiers === undefined ? [] : _ref$keySet$modifiers;
	  var event = _ref.event;

	  var keysMatch = false;
	  if (key === event.which) {
	    (function () {
	      var evtModKeys = modKeys.filter(function (modKey) {
	        return event[modKey + 'Key'];
	      }).sort();
	      keysMatch = modifiers.length === evtModKeys.length && modifiers.every(function (modKey, index) {
	        return evtModKeys[index] === modKey;
	      });
	    })();
	  }
	  return keysMatch;
	}

	exports['default'] = matchKeys;
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _keys = __webpack_require__(34);

	var _keys2 = _interopRequireDefault(_keys);

	function parseKeys(keysArray) {
	  return keysArray.map(function (key) {
	    var keySet = { key: key };
	    if (typeof key === 'string') {
	      var keyString = key.toLowerCase().trim();
	      var matches = keyString.split(/\s?\+\s?/);
	      keySet = matches.length === 1 ? { key: _keys2['default'][keyString] } : {
	        key: _keys2['default'][matches.pop()],
	        modifiers: matches.map(function (modKey) {
	          return _keys.modifiers[modKey];
	        }).sort()
	      };
	    }
	    return keySet;
	  });
	}

	exports['default'] = parseKeys;
	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports) {

	// Counter being incremented. JS is single-threaded, so it'll Just Work™.
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = uuid;
	var __counter = 1;

	/**
	 * Returns a process-wide unique identifier.
	 */

	function uuid() {
	  return "uid-" + __counter++;
	}

	module.exports = exports["default"];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable no-use-before-define */
	/**
	 * @module eventHandlers
	 *
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports._onClick = _onClick;
	exports._onKeyDown = _onKeyDown;
	exports._shouldConsider = _shouldConsider;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	var _libDom_helpers = __webpack_require__(39);

	var _libDom_helpers2 = _interopRequireDefault(_libDom_helpers);

	var _libListeners = __webpack_require__(40);

	var _libListeners2 = _interopRequireDefault(_libListeners);

	var _store = __webpack_require__(33);

	var _store2 = _interopRequireDefault(_store);

	/**
	 * private
	 *
	 */

	/**
	 * _onClick
	 *
	 * @access private
	 * @param {object} event The click event object
	 * @param {object} event.target The DOM node from the click event
	 */

	function _onClick(_ref) {
	  var target = _ref.target;

	  _store2['default'].activate([].concat(_toConsumableArray(_store2['default'].getInstances())).reduce(_libDom_helpers2['default'].findContainerNodes(target), []).sort(_libDom_helpers2['default'].sortByDOMPosition).map(function (item) {
	    return item.instance;
	  }));
	}

	/**
	 * _onKeyDown: The keydown event callback
	 *
	 * @access private
	 * @param {object} event The keydown event object
	 * @param {number} event.which The key code (which) received from the keydown event
	 */

	function _onKeyDown(event) {
	  var forceConsider = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	  if (forceConsider || _shouldConsider(event)) {
	    var _ref2 = _store2['default'].findBindingForEvent(event) || {};

	    var fn = _ref2.fn;
	    var instance = _ref2.instance;

	    if (fn) {
	      fn.call(instance, event);
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * _shouldConsider: Conditions for proceeding with key event handling
	 *
	 * @access private
	 * @param {object} event The keydown event object
	 * @param {object} event.target The node origin of the event
	 * @param {string} event.target.tagName The name of the element tag
	 * @param {number} event.target.which The key pressed
	 * @return {boolean} Whether to continue procesing the keydown event
	 */

	function _shouldConsider(_ref3) {
	  var ctrlKey = _ref3.ctrlKey;
	  var tagName = _ref3.target.tagName;

	  return !~['INPUT', 'SELECT', 'TEXTAREA'].indexOf(tagName) || ctrlKey;
	}

	/**
	 * public
	 *
	 */

	/**
	 * onMount
	 *
	 * @access public
	 */
	function onMount(instance) {
	  // have to bump this to next event loop because component mounting routinely
	  // preceeds the dom click event that triggered the mount (wtf?)
	  setTimeout(function () {
	    return _store2['default'].activate(instance);
	  }, 0);
	  _libListeners2['default'].bindKeys(_onKeyDown);
	  _libListeners2['default'].bindClicks(_onClick);
	  _libDom_helpers2['default'].bindFocusables(instance, _store2['default'].activate);
	}

	/**
	 * onUnmount
	 *
	 * @access public
	 */
	function onUnmount(instance) {
	  _store2['default'].deleteInstance(instance);
	  if (_store2['default'].isEmpty()) {
	    _libListeners2['default'].unbindClicks(_onClick);
	    _libListeners2['default'].unbindKeys(_onKeyDown);
	  }
	}

	exports.onMount = onMount;
	exports.onUnmount = onUnmount;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module domHelpers
	 *
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _reactDom = __webpack_require__(1);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var focusableSelector = 'a[href], button, input, object, select, textarea, [tabindex]';

	/**
	 * bindFocusables: Find any focusable child elements of the component instance and
	 * add an onFocus handler to focus our keydown handlers on the parent component
	 * when user keys applies focus to the element.
	 *
	 * NOTE: One limitation of this right now is that if you tab out of the
	 * component, _focusedInstance will still be set until next click or mount or
	 * controlled focus.
	 *
	 * @access public
	 * @param {object} instance The key-bound component instance
	 * @param {callback} activateOnFocus The fn to fire when element is focused
	 */
	function bindFocusables(instance, activateOnFocus) {
	  if (document.querySelectorAll) {
	    var node = _reactDom2['default'].findDOMNode(instance);
	    if (node) {
	      var focusables = node.querySelectorAll(focusableSelector);
	      if (focusables.length) {
	        (function () {
	          var onFocus = function onFocus(element) {
	            var onFocusPrev = element.onfocus;
	            return function (event) {
	              activateOnFocus(instance);
	              if (onFocusPrev) onFocusPrev.call(element, event);
	            };
	          };
	          Array.prototype.slice.call(focusables).forEach(function (element) {
	            return element.onfocus = onFocus(element);
	          });
	        })();
	      }
	    }
	  }
	}

	/**
	 * findContainerNodes: Called by our click handler to find instances with nodes
	 * that are equal to or that contain the click target. Any that pass this test
	 * will be recipients of the next keydown event.
	 *
	 * @access public
	 * @param {object} target The click event.target DOM element
	 * @return {function} Reducer function
	 */
	function findContainerNodes(target) {
	  return function (memo, instance) {
	    try {
	      var node = _reactDom2['default'].findDOMNode(instance);
	      if (node && (node === target || node.contains(target))) {
	        memo.push({ instance: instance, node: node });
	      }
	    } finally {
	      return memo;
	    }
	  };
	}

	/**
	 * sortByDOMPosition: Called by our click handler to sort a list of instances
	 * according to least -> most nested. This is so that if multiple keybound
	 * instances have nodes that are ancestors of the click target, they will be
	 * sorted to let the instance closest to the click target get first dibs on the
	 * next key down event.
	 */
	function sortByDOMPosition(a, b) {
	  return a.node.compareDocumentPosition(b.node) === 10 ? 1 : -1;
	}

	exports['default'] = { bindFocusables: bindFocusables, findContainerNodes: findContainerNodes, sortByDOMPosition: sortByDOMPosition };
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * @module Listeners
	 *
	 */

	// flag for whether click listener has been bound to document
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var _clicksBound = false;

	// flag for whether keydown listener has been bound to document
	var _keysBound = false;

	var Listeners = {
	  /**
	   * _bindKeys
	   *
	   * @access public
	   */
	  bindKeys: function bindKeys(callback) {
	    if (!_keysBound) {
	      document.addEventListener('keydown', callback);
	      _keysBound = true;
	    }
	  },

	  /**
	   * unbindKeys
	   *
	   * @access public
	   */
	  unbindKeys: function unbindKeys(callback) {
	    if (_keysBound) {
	      document.removeEventListener('keydown', callback);
	      _keysBound = false;
	    }
	  },

	  /**
	   * bindClicks
	   *
	   * @access public
	   */
	  bindClicks: function bindClicks(callback) {
	    if (!_clicksBound) {
	      document.addEventListener('click', callback);
	      _clicksBound = true;
	    }
	  },

	  /**
	   * unbindClicks
	   *
	   * @access public
	   */
	  unbindClicks: function unbindClicks(callback) {
	    if (_clicksBound) {
	      document.removeEventListener('click', callback);
	      _clicksBound = false;
	    }
	  }
	};

	exports['default'] = Listeners;
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module methodWrapper
	 *
	 */
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _store = __webpack_require__(33);

	var _store2 = _interopRequireDefault(_store);

	var _event_handlers = __webpack_require__(38);

	/**
	 * _isReactKeyDown
	 *
	 * @access private
	 * @param {object} event The possibly synthetic event passed as an argument with
	 * the method invocation.
	 * @return {boolean}
	 */
	function _isReactKeyDown(event) {
	  return event && (typeof event === 'undefined' ? 'undefined' : _typeof(event)) === 'object' && event.nativeEvent instanceof window.KeyboardEvent && event.type === 'keydown';
	}

	/**
	 * methodWrapper
	 *
	 * @access public
	 * @param {object} args All arguments necessary for wrapping method
	 * @param {object} args.target The decorated class
	 * @param {object} args.descriptor Method descriptor
	 * @param {array} args.keys The array of keys bound to the given method
	 * @return {object} The method descriptor
	 */
	function methodWrapper(_ref) {
	  var target = _ref.target;
	  var descriptor = _ref.descriptor;
	  var keys = _ref.keys;

	  var fn = descriptor.value;

	  // if we haven't already created a binding for this class (via another
	  // decorated method), wrap these lifecycle methods.
	  if (!_store2['default'].getBinding(target)) {
	    (function () {
	      var componentDidMount = target.componentDidMount;
	      var componentWillUnmount = target.componentWillUnmount;

	      target.componentDidMount = function () {
	        (0, _event_handlers.onMount)(this);
	        if (componentDidMount) return componentDidMount.call(this);
	      };

	      target.componentWillUnmount = function () {
	        (0, _event_handlers.onUnmount)(this);
	        if (componentWillUnmount) return componentWillUnmount.call(this);
	      };
	    })();
	  }

	  // add this binding of keys and method to the target's bindings
	  _store2['default'].setBinding({ keys: keys, target: target, fn: fn });

	  descriptor.value = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var maybeEvent = args[0];

	    if (_isReactKeyDown(maybeEvent)) {
	      // proxy method in order to use @keydown as filter for keydown events coming
	      // from an actual onKeyDown binding (as identified by react's addition of
	      // 'nativeEvent' + type === 'keydown')
	      if (!maybeEvent.ctrlKey) {
	        // we already whitelist shortcuts with ctrl modifiers so if we were to
	        // fire it again here the method would trigger twice. see https://github.com/glortho/react-keydown/issues/38
	        return (0, _event_handlers._onKeyDown)(maybeEvent, true);
	      }
	    } else if (!maybeEvent || !(maybeEvent instanceof window.KeyboardEvent) || maybeEvent.type !== 'keydown') {
	      // if our first argument is a keydown event it is being handled by our
	      // binding system. if it's anything else, just pass through.
	      return fn.call.apply(fn, [this].concat(args));
	    }
	  };

	  return descriptor;
	}

	exports['default'] = methodWrapper;
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module methodWrapperScoped
	 *
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _libMatch_keys = __webpack_require__(35);

	var _libMatch_keys2 = _interopRequireDefault(_libMatch_keys);

	var _libParse_keys = __webpack_require__(36);

	var _libParse_keys2 = _interopRequireDefault(_libParse_keys);

	/**
	 * _shouldTrigger
	 *
	 * @access private
	 * @param {object} thisProps Exsting props from the wrapped component
	 * @param {object} thisProps.keydown The namespaced state from the higher-order
	 * component (class_decorator)
	 * @param {object} nextProps The incoming props from the wrapped component
	 * @param {object} nextProps.keydown The namescaped state from the higher-order
	 * component (class_decorator)
	 * @param {array} keys The keys bound to the decorated method
	 * @return {boolean} Whether all tests have passed
	 */
	function _shouldTrigger(_ref, keydownNext) {
	  var keydownThis = _ref.keydown;

	  return keydownNext && keydownNext.event && !keydownThis.event;
	}

	/**
	 * methodWrapperScoped
	 *
	 * @access public
	 * @param {object} args All args necessary for decorating the method
	 * @param {object} args.target The decorated method's class object
	 * @param {object} args.descriptor The method's descriptor object
	 * @param {array} args.keys The key codes bound to the decorated method
	 * @return {object} The method's descriptor object
	 */
	function methodWrapperScoped(_ref2) {
	  var target = _ref2.target;
	  var descriptor = _ref2.descriptor;
	  var keys = _ref2.keys;
	  var componentWillReceiveProps = target.componentWillReceiveProps;

	  var fn = descriptor.value;
	  if (!keys) {
	    console.warn(fn + ': keydownScoped requires one or more keys');
	  } else {
	    (function () {
	      var keySets = (0, _libParse_keys2['default'])(keys);

	      // wrap the component's lifecycle method to intercept key codes coming down
	      // from the wrapped/scoped component up the view hierarchy. if new keydown
	      // event has arrived and the key codes match what was specified in the
	      // decorator, call the wrapped method.
	      target.componentWillReceiveProps = function (nextProps) {
	        var keydown = nextProps.keydown;

	        if (_shouldTrigger(this.props, keydown)) {
	          if (keySets.some(function (keySet) {
	            return (0, _libMatch_keys2['default'])({ keySet: keySet, event: keydown.event });
	          })) {
	            return fn.call(this, keydown.event);
	          }
	        }

	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        if (componentWillReceiveProps) return componentWillReceiveProps.call.apply(componentWillReceiveProps, [this, nextProps].concat(args));
	      };
	    })();
	  }

	  return descriptor;
	}

	exports['default'] = methodWrapperScoped;
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'add';


	var ____Classb=React.PureComponent;for(var ____Classb____Key in ____Classb){if(____Classb.hasOwnProperty(____Classb____Key)){ButtonRegisterAdd[____Classb____Key]=____Classb[____Classb____Key];}}var ____SuperProtoOf____Classb=____Classb===null?null:____Classb.prototype;ButtonRegisterAdd.prototype=Object.create(____SuperProtoOf____Classb);ButtonRegisterAdd.prototype.constructor=ButtonRegisterAdd;ButtonRegisterAdd.__superConstructor__=____Classb;
	// кнопка создания документа в регистрах
	    function ButtonRegisterAdd(props) {
	        ____Classb.call(this,props);
	    }

	    Object.defineProperty(ButtonRegisterAdd.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick('add');
	    }});

	    Object.defineProperty(ButtonRegisterAdd.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            value: "Add", 
	            ref: "btnAdd", 
	            style: styles.button, 
	            show: this.props.show, 
	            disabled: this.props.disabled, 
	            onClick: function(e)  {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterAdd.propTypes = {
	    onClick: React.PropTypes.func.isRequired
	}


	ButtonRegisterAdd.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterAdd;

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    button: {
	        background: 'white',
	        margin: '2px'
	    },
	    icons: {
	        add: '/images/icons/add.png',
	        edit: '/images/icons/edit.png',
	        delete: '/images/icons/delete.png',
	        filter: '/images/icons/filter.png',
	        print: '/images/icons/print.png',
	        ok: '/images/icons/ok.png',
	        cancel: '/images/icons/cancel.png',
	        save: '/images/icons/save.png',
	        execute: '/images/icons/execute.png'
	    }
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44);


	var ____Classp=React.PureComponent;for(var ____Classp____Key in ____Classp){if(____Classp.hasOwnProperty(____Classp____Key)){Button[____Classp____Key]=____Classp[____Classp____Key];}}var ____SuperProtoOf____Classp=____Classp===null?null:____Classp.prototype;Button.prototype=Object.create(____SuperProtoOf____Classp);Button.prototype.constructor=Button;Button.__superConstructor__=____Classp;
	// кнопка создания документа в регистрах
	    function Button(props) {
	        ____Classp.call(this,props);
	        this.handleClick = this.handleClick.bind(this);
	        this.state = {
	            disabled: this.props.disabled
	        }
	    }

	    Object.defineProperty(Button.prototype,"handleClick",{writable:true,configurable:true,value:function() {
	        this.props.onClick();
	    }});

	    Object.defineProperty(Button.prototype,"render",{writable:true,configurable:true,value:function() {
	        // visibility
	        let propStyle  = ('style' in this.props)? this.props.style: {},
	            style = Object.assign({}, styles.button, {display: this.props.show ? 'inline' : 'none'}, propStyle)

	        return React.createElement("button", {
	            disabled: this.state.disabled, 
	            ref: "button", 
	            style: style, 
	            onClick: this.handleClick}, 
	            this.props.children, 
	            this.props.value
	        )
	    }});

	;

	Button.propTypes = {
	    onClick: React.PropTypes.func.isRequired,
	    value: React.PropTypes.string.isRequired,
	    style: React.PropTypes.object
	}


	Button.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = Button;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'edit';


	var ____Classc=React.PureComponent;for(var ____Classc____Key in ____Classc){if(____Classc.hasOwnProperty(____Classc____Key)){ButtonRegisterEdit[____Classc____Key]=____Classc[____Classc____Key];}}var ____SuperProtoOf____Classc=____Classc===null?null:____Classc.prototype;ButtonRegisterEdit.prototype=Object.create(____SuperProtoOf____Classc);ButtonRegisterEdit.prototype.constructor=ButtonRegisterEdit;ButtonRegisterEdit.__superConstructor__=____Classc;
	// кнопка создания документа в регистрах
	    function ButtonRegisterEdit(props) {
	        ____Classc.call(this,props);
	        this.state = {
	            disabled: this.props.disabled
	        }
	        this.handleClick = this.handleClick.bind(this);
	    }

	    Object.defineProperty(ButtonRegisterEdit.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick('edit');
	    }});

	    Object.defineProperty(ButtonRegisterEdit.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({disabled: nextProps.disabled})

	    }});

	    Object.defineProperty(ButtonRegisterEdit.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            value: "Edit", 
	            ref: "btnEdit", 
	            show: this.props.show, 
	            disabled: this.state.disabled, 
	            onClick: function(e)  {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterEdit.propTypes = {
	    onClick: React.PropTypes.func.isRequired,
	    disabled: React.PropTypes.bool
	}


	ButtonRegisterEdit.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterEdit;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'delete';


	var ____Classd=React.PureComponent;for(var ____Classd____Key in ____Classd){if(____Classd.hasOwnProperty(____Classd____Key)){ButtonRegisterDelete[____Classd____Key]=____Classd[____Classd____Key];}}var ____SuperProtoOf____Classd=____Classd===null?null:____Classd.prototype;ButtonRegisterDelete.prototype=Object.create(____SuperProtoOf____Classd);ButtonRegisterDelete.prototype.constructor=ButtonRegisterDelete;ButtonRegisterDelete.__superConstructor__=____Classd;
	// кнопка создания документа в регистрах
	    function ButtonRegisterDelete(props) {
	        ____Classd.call(this,props);
	    }

	    Object.defineProperty(ButtonRegisterDelete.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick('delete');
	    }});

	    Object.defineProperty(ButtonRegisterDelete.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            value: "Delete", 
	            ref: "btnDelete", 
	            show: this.props.show, 
	            disabled: this.props.disabled, 
	            onClick: function(e)  {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterDelete.propTypes = {
	    onClick: React.PropTypes.func.isRequired
	}


	ButtonRegisterDelete.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterDelete;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// виджет, объединяющий селект и текст. в тексте отражаютмя данные, связанные с селектом
	'use strict';

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    Select = __webpack_require__(49),
	    Text = __webpack_require__(25);


	var ____Classo=React.PureComponent;for(var ____Classo____Key in ____Classo){if(____Classo.hasOwnProperty(____Classo____Key)){SelectTextWidget[____Classo____Key]=____Classo[____Classo____Key];}}var ____SuperProtoOf____Classo=____Classo===null?null:____Classo.prototype;SelectTextWidget.prototype=Object.create(____SuperProtoOf____Classo);SelectTextWidget.prototype.constructor=SelectTextWidget;SelectTextWidget.__superConstructor__=____Classo;
	    function SelectTextWidget(props) {
	        ____Classo.call(this,props);
	        this.state = {
	            value: props.value,
	            description: '', // пойдет в текстовую область
	            libData: []
	        };
	        this.handleSelectOnChange = this.handleSelectOnChange.bind(this);
	    }


	    Object.defineProperty(SelectTextWidget.prototype,"handleSelectOnChange",{writable:true,configurable:true,value:function(e, name, value) {
	        // отработаем событие и поменяем состояние
	        if (this.state.libData) {
	            let selg = this.getDescriptionBySelectValue(this.state.libData) || null;
	            this.setState({value: value, description: selg});
	        }
	    }});

	    Object.defineProperty(SelectTextWidget.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {
	// создаем обработчик события на изменение библиотек.
	    const self = this;
	        // будем отслеживать момент когда справочник будет загружен
	        flux.stores.docStore.on('change:libs', function (newValue, previousValue) {
	            let vastus = JSON.stringify(newValue) !== JSON.stringify(previousValue),  // will watch libs change (from server)
	                data = newValue.filter(function(item)  {
	                    if (item.id === self.props.libs) {
	                        return item;
	                    }
	                }),
	                lib = data[0].data,
	                selg = data[0].data.length ? self.getDescriptionBySelectValue(lib).toString() : '';
	            self.setState({libData: lib, description: selg});
	        });
	    }});

	    Object.defineProperty(SelectTextWidget.prototype,"getDescriptionBySelectValue",{writable:true,configurable:true,value:function(libData) {
	        // найдем в справочнике описание и установим его состояние
	        let libRow = libData.filter(function(lib)  {

	                if (lib.id == this.props.value) {
	                    return lib;
	                }
	            }.bind(this)),
	            selg = '',
	            selgObject = libRow.length ? libRow[0].details : '';

	        for (let property in selgObject) {
	            if (selgObject.hasOwnProperty(property)) {
	                // интересуют только "собственные" свойства объекта
	                selg = selg + property + ':' + selgObject[property];
	            }
	        }
	        return selg;
	    }});

	    Object.defineProperty(SelectTextWidget.prototype,"render",{writable:true,configurable:true,value:function() {
	        return (
	            React.createElement("div", null, 
	                React.createElement(Select, {className: this.props.className, 
	                        ref: "select", 
	                        title: this.props.title, 
	                        name: this.props.name, 
	                        libs: this.props.libs, 
	                        value: this.props.value, 
	                        defaultValue: this.props.defaultValue, 
	                        placeholder: this.props.placeholder, 
	                        readOnly: this.props.readOnly, 
	                        onChange: this.handleSelectOnChange}
	                ), 
	                React.createElement(Text, {ref: "text", 
	                      name: "muud", 
	                      placeholder: "DokProp", 
	                      value: this.state.description, 
	                      readOnly: true, 
	                      disabled: 'true'}
	                )

	            )
	        );
	    }});


	SelectTextWidget.PropTypes = {
	    value: React.PropTypes.string,
	    name: React.PropTypes.string.isRequired,
	    title: React.PropTypes.string,
	    libs: React.PropTypes.array,
	    defaultValue: React.PropTypes.string,
	    readOnly: React.PropTypes.bool
	}


	SelectTextWidget.defaultProps = {
	    readOnly: false,
	}

	module.exports = SelectTextWidget;



/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3),
	    flux = __webpack_require__(4);
	//    InputText = require('./doc-input-text.jsx');

	const Select = React.createClass({displayName: "Select",
	    getInitialState: function () {
	        var libData = [];
	        var libs = flux.stores.docStore.libs,
	        // грузим данные из хранилища
	            data = libs.filter(function (item) {
	                if (item.id == this.props.libs) {
	                    return item;
	                }
	            }, this),
	            idValue = this.props.value; // для привязки данных

	        if (data && data.length > 0 && data[0].data) {
	            libData = data[0].data;
	        }

	        return {value: this.props.value /* здесь по значению ИД */,
	            readOnly: this.props.readOnly,
	            disabled: true,
	            data: libData || [],
	            fieldValue: this.props.value /*здесь по значени поля collId */,
	            brnDelete: this.props.btnDelete /* если истину, то рисуем рядом кнопку для очистки значения*/};
	    },

	    findFieldValue: function (data, collId, value) {
	        // привяжет к значеню поля
	        // надо привязать данные
	        // kood -> id
	        var id = 0;
	        data.forEach(function (row) {
	            if (row[collId] == value) {
	                id = row.id;
	//                return id;
	                this.setState({value: row.id, fieldValue: row[collId]});
	                return;
	            }
	        }, this);

	    },

	    getValueById: function(collId, rowId) {
	        // вернет значения поля по выбранному ИД

	        var fieldValue,
	            data = this.state.data;

	        data.forEach(function (row) {
	            if (row['id'] == rowId) {
	                fieldValue = row[collId];
	                this.setState({fieldValue: fieldValue});
	            }
	        }, this);

	    },

	    getDefaultProps: function () {
	        // покажет значение по умолчанию для виджета, пока грузится справочник
	        return {
	            defaultValue: null,
	            value: null,
	            title: null,
	            btnDelete: false
	        };
	    },

	    componentWillMount: function () {
	// создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	        var self = this;

	        flux.stores.docStore.on('change:docId', function (newValue, previousValue) {
	            if (newValue !== previousValue) {
	                var data = flux.stores.docStore.data,
	                    value = data[self.props.name];
	                if (newValue == 0) {
	                    // совый документ
	                    self.setState({value: 0});
	                } else {
	                    self.setState({value: value});
	                }
	            }
	        });

	        flux.stores.docStore.on('change:edited', function (newValue, previousValue) {
	            if (newValue !== previousValue) {
	                self.setState({readOnly: !newValue, disabled: !newValue});
	            }
	        });

	        flux.stores.docStore.on('change:libs', function (newValue, previousValue) {
	            var vastus = JSON.stringify(newValue) !== JSON.stringify(previousValue);
	            // will watch libs change (from server)
	            var data = newValue.filter(function (item) {
	                if (item.id === self.props.libs) {
	                    return item;
	                }
	            });

	            if (data && data.length > 0) {
	                self.setState({data: data[0].data});
	            }
	        });
	    },

	    componentDidMount: function () {
	        if (this.props.collId && this.props.collId !== 'id') {
	            // ищем ИД по значению поля
	            this.findFieldValue(this.state.data, this.props.collId, this.props.value);
	        }

	    },

	    onChange: function (e) {

	        var fieldValue = e.target.value,
	            data = flux.stores.docStore.data,
	            propValue = data[this.props.name];

	        if (fieldValue == '') {
	            fieldValue = null;
	        }
	        
	        // найдем по ид значение поля в collId
	        this.getValueById(this.props.collId, fieldValue);
	        // сохраним ид как value

	        this.setState({value:fieldValue});

	        if (propValue !== 'undefined') {
	            // если используется привязка к данным
	            // получить значение
	            data[this.props.name] = fieldValue;
	            // задать новое значение поля
	            flux.doAction('dataChange', data);
	        }

	        if (this.props.onChange) {
	            // смотрим к чему привязан селект и отдаим его наверх
	            this.props.onChange(e, this.props.name, this.state.value); // в случае если задан обработчик на верхнем уровне, отдадим обработку туда
	        }

	    },

	    render: function () {
	        var dataOptions = this.state.data || [],
	            inputClassName = this.props.className || 'doc-input',
	            inputReadOnly = this.state.readOnly || false,
	            inputPlaceHolder = this.props.placeholder || this.props.name,
	            Options = null,
	            inputDefaultValue = this.props.defaultValue; // Дадим дефолтное значение для виджета, чтоб покать его сразу, до подгрузки библиотеки

	        if (this.props.dok) {
	            // оставим только заданый "справочник"
	            dataOptions = dataOptions.filter(function(item)  {
	                if (item.dok === this.props.dok) {
	                    return item;
	                }
	            }.bind(this))
	        }

	        if (!this.state.value) { // добавим пустую строку в массив
	            // проверим наличие пустой строки в массиве

	            let emptyObj = dataOptions.filter(function(obj)  {
	                if (obj.id === 0) {
	                    return obj;
	                }
	            });

	            if (!emptyObj || emptyObj.length == 0) {
	                dataOptions.splice(0, 0, {id: 0, kood: '', name: ''});
	            }

	        }

	        var dataValue = dataOptions.filter(function (item) {
	            if (item.id == this.state.value) {
	                return item;
	            }
	        }, this);

	        if (dataOptions.length) {
	            Options = dataOptions.map(function (item) {

	                if (typeof item == 'array') {
	                    item = item[0];
	                }
	                return React.createElement("option", {value: item.id, key: Math.random()}, item.name)
	            }, this);
	            inputDefaultValue = dataValue.length > 0 ? dataValue[0].name : this.props.defaultValue;
	        } else {
	            Options = React.createElement("option", {value: 0, key: Math.random()}, " Empty ")
	        }

	        var widget = React.createElement("select", {value: this.state.value, onChange: this.onChange, 
	                             style: {width:'100%', height:'100%'}}, Options); // если для грида, оставим только селект
	        
	        if (this.props.title) {
	            widget = (React.createElement("div", {className: "form-widget"}, 
	                React.createElement("label", {className: "form-widget-label"}, this.props.title, 
	                React.createElement("div", {style: {display:'inline-block'}}, 
	                    inputReadOnly ?
	                        React.createElement("input", {type: "text", className: "ui-c1 doc-input-readonly", value: inputDefaultValue, 
	                               readOnly: "true"}) : null, 
	                    inputReadOnly ? null :
	                        React.createElement("div", null, 
	                            React.createElement("select", {className: "ui-c2", value: this.state.value, onChange: this.onChange}, Options), 
	                            this.props.btnDelete ?
	                            React.createElement("button", {className: "ui-c1-button", onClick: this.btnDelClick}, " Delete ") : null
	                        )
	                    
	                )
	                )
	            ));
	        }
	        return React.createElement("div", null, widget)
	    },

	    btnDelClick: function(event) {
	        // по вызову кнопку удалить, обнуляет значение
	        this.setState({value:null});
	        this.onChange(event);
	    }
	});

	module.exports = Select;


/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';

	const relatedDocuments = function(self)  {
	    // формируем зависимости
	    let relatedDocuments = self.state.relations;
	    if (relatedDocuments.length > 0) {
	        relatedDocuments.forEach(function(doc)  {
	            if (doc.id) {
	                // проверим на уникальность списка документов
	                let isExists = self.pages.find(function(page)  {
	                    if (!page.docId) {
	                        return false;
	                    } else {
	                        return page.docId == doc.id && page.docTypeId == doc.doc_type;
	                    }
	                });

	                if (!isExists) {
	                    // в массиве нет, добавим ссылку на документ
	                    self.pages.push({docTypeId: doc.doc_type, docId: doc.id, pageName: doc.name + ' id:' + doc.id})
	                }
	            }
	        });
	    }
	}

	module.exports = relatedDocuments;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const styles = __webpack_require__(52),
	    React = __webpack_require__(3);

	var ____Class9=React.Component;for(var ____Class9____Key in ____Class9){if(____Class9.hasOwnProperty(____Class9____Key)){ToolBarContainer[____Class9____Key]=____Class9[____Class9____Key];}}var ____SuperProtoOf____Class9=____Class9===null?null:____Class9.prototype;ToolBarContainer.prototype=Object.create(____SuperProtoOf____Class9);ToolBarContainer.prototype.constructor=ToolBarContainer;ToolBarContainer.__superConstructor__=____Class9;
	    function ToolBarContainer(props) {
	        ____Class9.call(this,props);
	    }

	    Object.defineProperty(ToolBarContainer.prototype,"render",{writable:true,configurable:true,value:function() {
	        let style = Object.assign({},styles.toolBarContainerStyle, styles[this.props.position] );
	        return (
	            React.createElement("div", {id: "toolBarContainer", style: style}, 
	                    this.props.children
	            )
	        );
	    }});


	ToolBarContainer.propTypes = {
	    position: React.PropTypes.string
	}


	ToolBarContainer.defaultProps = {
	    position: 'right'
	};

	module.exports = ToolBarContainer;

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    toolBarContainerStyle: {
	        display: 'flex',
	        width: '100%',
	        height: '30px',
	        border: '1px solid black'
	    },

	    right: {
	        justifyContent: 'flex-end',
	        marginLeft: '5px'
	    },

	    left: {
	        justifyContent: 'flex-start',
	        marginRight: '5px'
	    }

	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    ToolbarContainer = __webpack_require__(51),
	    BtnAdd = __webpack_require__(43),
	    BtnEdit = __webpack_require__(46),
	    BtnSave = __webpack_require__(54),
	    BtnCancel = __webpack_require__(55),
	    BtnPrint = __webpack_require__(56),
	    TaskWidget = __webpack_require__(57);

	var ____Classn=React.PureComponent;for(var ____Classn____Key in ____Classn){if(____Classn.hasOwnProperty(____Classn____Key)){DocToolBar[____Classn____Key]=____Classn[____Classn____Key];}}var ____SuperProtoOf____Classn=____Classn===null?null:____Classn.prototype;DocToolBar.prototype=Object.create(____SuperProtoOf____Classn);DocToolBar.prototype.constructor=DocToolBar;DocToolBar.__superConstructor__=____Classn;
	    function DocToolBar(props) {
	        ____Classn.call(this,props);

	        this.btnEditClick = this.btnEditClick.bind(this);
	        this.btnAddClick = this.btnAddClick.bind(this);
	        this.btnSaveClick = this.btnSaveClick.bind(this);
	        this.btnCancelClick = this.btnCancelClick.bind(this);
	        this.btnPrintClick = this.btnPrintClick.bind(this);
	        this.handleButtonTask = this.handleButtonTask.bind(this);
	        this.handleSelectTask = this.handleSelectTask.bind(this);

	    }

	    Object.defineProperty(DocToolBar.prototype,"render",{writable:true,configurable:true,value:function() {
	        let isEditMode = this.props.edited,
	            isDocDisabled = this.props.docStatus == 2 ? true : false,
	            docId = flux.stores.docStore.data.id || 0,
	            toolbarParams = {
	                btnAdd: {
	                    show: !isEditMode,
	                    disabled: isEditMode
	                },
	                btnEdit: {
	                    show: !isEditMode,
	                    disabled: isDocDisabled
	                },
	                btnPrint: {
	                    show: true,
	                    disabled: true
	                },
	                btnSave: {
	                    show: isEditMode,
	                    disabled: false
	                },
	                btnCancel: {
	                    show: isEditMode && docId !==0,
	                    disabled: false
	                }
	            };

	        return React.createElement(ToolbarContainer, {ref: "toolbarContainer"}, 
	            React.createElement("div", null, 
	                React.createElement(BtnAdd, {ref: "btnAdd", onClick: this.btnAddClick, show: toolbarParams['btnAdd'].show, 
	                        disabled: toolbarParams['btnAdd'].disabled}), 
	                React.createElement(BtnEdit, {ref: "btnEdit", onClick: this.btnEditClick, show: toolbarParams['btnEdit'].show, 
	                         disabled: toolbarParams['btnEdit'].disabled}), 
	                React.createElement(BtnSave, {ref: "btnSave", onClick: this.btnSaveClick, show: toolbarParams['btnSave'].show, 
	                         disabled: toolbarParams['btnSave'].disabled}), 
	                React.createElement(BtnCancel, {ref: "btnCancel", onClick: this.btnCancelClick, show: toolbarParams['btnCancel'].show, 
	                           disabled: toolbarParams['btnCancel'].disabled}), 
	                React.createElement(BtnPrint, {ref: "btnPrint", onClick: this.btnPrintClick, show: toolbarParams['btnPrint'].show, 
	                          disabled: toolbarParams['btnPrint'].disabled}), 
	                this.props.bpm ? React.createElement(TaskWidget, {ref: "taskWidget", 
	                                              taskList: this.props.bpm, 
	                                              handleSelectTask: this.handleSelectTask, 
	                                              handleButtonTask: this.handleButtonTask}
	                    ) : null

	            )
	        )
	    }});

	    Object.defineProperty(DocToolBar.prototype,"btnAddClick",{writable:true,configurable:true,value:function() {
	        console.log('btnAddClick called')
	        // обработчик для кнопки Add
	        // отправим извещение наверх
	//        this.props.onClick(this.name);
	        flux.doAction('docIdChange', 0);
	        flux.doAction('editedChange', true);
	        flux.doAction('savedChange', false);
	    }});

	    Object.defineProperty(DocToolBar.prototype,"btnEditClick",{writable:true,configurable:true,value:function() {
	        // обработчик для кнопки Edit
	        // переводим документ в режим редактирования, сохранен = false
	        if (!this.props.docStatus || this.props.docStatus < 2) {
	            flux.doAction('editedChange', true);
	            flux.doAction('savedChange', false);
	        }
	    }});

	    Object.defineProperty(DocToolBar.prototype,"btnPrintClick",{writable:true,configurable:true,value:function() {
	        console.log('print called');
	    }});

	    Object.defineProperty(DocToolBar.prototype,"btnSaveClick",{writable:true,configurable:true,value:function() {
	        // обработчик для кнопки Save
	        // валидатор

	        let validationMessage = this.props.validator ? this.props.validator() : 'validator do not exists',
	            isValid = this.props.validator ? !this.props.validator() : true;

	        if (isValid) {
	            // если прошли валидацию, то сохранеям
	            flux.doAction('saveData');
	            flux.doAction('editedChange', false);
	            flux.doAction('savedChange', true);

	        }
	    }});

	    Object.defineProperty(DocToolBar.prototype,"btnCancelClick",{writable:true,configurable:true,value:function() {
	        // обработчик для кнопки Cancel
	        if (this.props.eventHandler) {
	            this.props.eventHandler('CANCEL');
	        }

	        flux.doAction('editedChange', false);
	        flux.doAction('savedChange', true);

	    }});

	    Object.defineProperty(DocToolBar.prototype,"handleButtonTask",{writable:true,configurable:true,value:function(task) {
	        // метод вызывается при выборе задачи
	        //@todo Закончить

	        flux.doAction('executeTask', task);
	    }});


	    Object.defineProperty(DocToolBar.prototype,"handleSelectTask",{writable:true,configurable:true,value:function(e) {
	        // метод вызывается при выборе задачи
	        //@todo Закончить
	        const taskValue = e.target.value;
	    }});



	DocToolBar.PropTypes = {
	    bpm: React.PropTypes.array,
	    edited: React.PropTypes.bool,
	    docStatus: React.PropTypes.number,
	    validator: React.PropTypes.func
	}

	DocToolBar.defaultProps = {
	    bpm: [],
	    edited: false,
	    docStatus: 0
	}

	module.exports = DocToolBar;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'save';


	var ____Classr=React.PureComponent;for(var ____Classr____Key in ____Classr){if(____Classr.hasOwnProperty(____Classr____Key)){ButtonRegisterPrint[____Classr____Key]=____Classr[____Classr____Key];}}var ____SuperProtoOf____Classr=____Classr===null?null:____Classr.prototype;ButtonRegisterPrint.prototype=Object.create(____SuperProtoOf____Classr);ButtonRegisterPrint.prototype.constructor=ButtonRegisterPrint;ButtonRegisterPrint.__superConstructor__=____Classr;
	// кнопка создания документа в регистрах
	    function ButtonRegisterPrint(props) {
	        ____Classr.call(this,props);
	        this.state = {
	            disabled: props.disabled
	        }
	    }

	    Object.defineProperty(ButtonRegisterPrint.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick();
	    }});

	    Object.defineProperty(ButtonRegisterPrint.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({disabled: nextProps.disabled})
	    }});

	    Object.defineProperty(ButtonRegisterPrint.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            ref: "btnSave", 
	            value: "Save", 
	            show: this.props.show, 
	            disabled: this.state.disabled, 
	            onClick: function(e) {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterPrint.propTypes = {
	    onClick: React.PropTypes.func.isRequired,
	    disabled: React.PropTypes.bool
	}


	ButtonRegisterPrint.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterPrint;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'cancel';


	var ____Classt=React.PureComponent;for(var ____Classt____Key in ____Classt){if(____Classt.hasOwnProperty(____Classt____Key)){ButtonRegisterCancel[____Classt____Key]=____Classt[____Classt____Key];}}var ____SuperProtoOf____Classt=____Classt===null?null:____Classt.prototype;ButtonRegisterCancel.prototype=Object.create(____SuperProtoOf____Classt);ButtonRegisterCancel.prototype.constructor=ButtonRegisterCancel;ButtonRegisterCancel.__superConstructor__=____Classt;
	// кнопка создания документа в регистрах
	    function ButtonRegisterCancel(props) {
	        ____Classt.call(this,props);
	        this.state = {
	            disabled: props.disabled
	        }
	    }

	    Object.defineProperty(ButtonRegisterCancel.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick();
	    }});

	    Object.defineProperty(ButtonRegisterCancel.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({disabled: nextProps.disabled})
	    }});

	    Object.defineProperty(ButtonRegisterCancel.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            ref: "btnCancel", 
	            value: "Cancel", 
	            show: this.props.show, 
	            disabled: this.state.disabled, 
	            onClick: function(e) {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterCancel.propTypes = {
	    onClick: React.PropTypes.func.isRequired,
	    disabled: React.PropTypes.bool
	}


	ButtonRegisterCancel.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterCancel;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'print';


	var ____Classe=React.PureComponent;for(var ____Classe____Key in ____Classe){if(____Classe.hasOwnProperty(____Classe____Key)){ButtonRegisterPrint[____Classe____Key]=____Classe[____Classe____Key];}}var ____SuperProtoOf____Classe=____Classe===null?null:____Classe.prototype;ButtonRegisterPrint.prototype=Object.create(____SuperProtoOf____Classe);ButtonRegisterPrint.prototype.constructor=ButtonRegisterPrint;ButtonRegisterPrint.__superConstructor__=____Classe;
	// кнопка создания документа в регистрах
	    function ButtonRegisterPrint(props) {
	        ____Classe.call(this,props);
	    }

	    Object.defineProperty(ButtonRegisterPrint.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick();
	    }});

	    Object.defineProperty(ButtonRegisterPrint.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            ref: "btnPrint", 
	            value: "Print", 
	            show: this.props.show, 
	            disabled: this.props.disabled, 
	            onClick: function(e) {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterPrint.propTypes = {
	    onClick: React.PropTypes.func.isRequired
	}


	ButtonRegisterPrint.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterPrint;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(3),
	    Button = __webpack_require__(58),
	    styles = __webpack_require__(59);

	var ____Classs=React.PureComponent;for(var ____Classs____Key in ____Classs){if(____Classs.hasOwnProperty(____Classs____Key)){TaskWidget[____Classs____Key]=____Classs[____Classs____Key];}}var ____SuperProtoOf____Classs=____Classs===null?null:____Classs.prototype;TaskWidget.prototype=Object.create(____SuperProtoOf____Classs);TaskWidget.prototype.constructor=TaskWidget;TaskWidget.__superConstructor__=____Classs;
	    function TaskWidget(props) {
	        ____Classs.call(this,props);
	        let tasks = props.taskList || [];


	        if (!tasks[0].status) {
	            tasks[0].status = 'opened';
	        }

	        this.state = {
	            taskList: tasks
	        };
	        this.handleSelectTask = this.handleSelectTask.bind(this);
	        this.handleButtonTask = this.handleButtonTask.bind(this);
	    }

	    Object.defineProperty(TaskWidget.prototype,"render",{writable:true,configurable:true,value:function() {
	        let tasks = this.state.taskList.filter(function(task)  {
	            if (task.status === 'opened') {
	                return task;
	            }
	        });

	        if (!tasks) return React.createElement("div", null)

	        return (React.createElement("div", {style: styles.wrapper}, 
	                tasks.length > 1 ?
	                    React.createElement("select", {
	                        className: "ui-c2", 
	                        onChange: this.handleSelectTask, 
	                        show: true, 
	                        ref: "selectTask"}, 
	                        
	                            tasks.map(function(taskName, index)  {
	                                let key = 'option-' + index;
	                                React.createElement("option", {value: 0, key: key, ref: key}, " ", taskName.name, " ")
	                            })
	                        
	                    ) : React.createElement(Button, {
	                        ref: "buttonTask", 
	                        className: "ui-c2", 
	                        onClick: this.handleButtonTask, 
	                        show: tasks.length == 1 ? true: false, 
	                        value: tasks.length == 1? tasks[0].name: ''})
	                
	            )

	        )
	    }});

	    Object.defineProperty(TaskWidget.prototype,"handleSelectTask",{writable:true,configurable:true,value:function(e) {
	        let taskName = e.target.value;
	        this.props.handleSelectTask(taskName);
	    }});

	    Object.defineProperty(TaskWidget.prototype,"handleButtonTask",{writable:true,configurable:true,value:function() {
	        // найдем актуальную задачу
	        let actualTask = this.state.taskList.filter(function(task)  {
	                if (task.actualStep) {
	                    return task;
	                }
	            }),
	            task = actualTask.map(function(task)  {
	                return task.action
	            }); // оставим только название процедуры
	        this.props.handleButtonTask(task);
	    }});

	    Object.defineProperty(TaskWidget.prototype,"getDefaultTask",{writable:true,configurable:true,value:function() {
	        return [{step: 0, name: 'Start', action: 'start', status: 'opened'}]
	    }});



	TaskWidget.PropTypes = {
	    taskList: React.PropTypes.array.isRequired,
	    handleButtonTask: React.PropTypes.func.isRequired,
	    handleSelectTask: React.PropTypes.func.isRequired
	}


	module.exports = TaskWidget;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'execute';


	var ____Classu=React.PureComponent;for(var ____Classu____Key in ____Classu){if(____Classu.hasOwnProperty(____Classu____Key)){ButtonRegisterExecute[____Classu____Key]=____Classu[____Classu____Key];}}var ____SuperProtoOf____Classu=____Classu===null?null:____Classu.prototype;ButtonRegisterExecute.prototype=Object.create(____SuperProtoOf____Classu);ButtonRegisterExecute.prototype.constructor=ButtonRegisterExecute;ButtonRegisterExecute.__superConstructor__=____Classu;
	// кнопка создания документа в регистрах
	    function ButtonRegisterExecute(props) {
	        ____Classu.call(this,props);
	        this.handleClick = this.handleClick.bind(this);
	    }

	    Object.defineProperty(ButtonRegisterExecute.prototype,"handleClick",{writable:true,configurable:true,value:function() {
	        this.props.onClick();
	    }});

	    Object.defineProperty(ButtonRegisterExecute.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            ref: "btnExecute", 
	            value: this.props.value, 
	            show: this.props.show, 
	            disabled: this.props.disabled, 
	            onClick: this.handleClick}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterExecute.propTypes = {
	    onClick: React.PropTypes.func.isRequired,
	    value: React.PropTypes.string.isRequired
	}


	ButtonRegisterExecute.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterExecute;

/***/ },
/* 59 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    wrapper: {
	        display: 'inline-flex'
	    }
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var flux = __webpack_require__(4);

	var validateForm = function validateForm(self, reqFields) {

	    // валидация формы
	    var warning = void 0,
	        requiredFields = reqFields || [],
	        notRequiredFields = [],
	        notMinMaxRule = [],
	        data = flux.stores.docStore.data;

	    requiredFields.forEach(function (field) {
	        if (field.name in data) {

	            var value = data[field.name];

	            if (!value) {
	                notRequiredFields.push(field.name);
	            }
	            // проверка на мин . макс значения

	            // || value && value > props.max
	            var checkValue = false;

	            switch (field.type) {
	                case 'D':
	                    var controlledValueD = Date.parse(value);
	                    if (field.min && controlledValueD < field.min && field.max && controlledValueD > field.max) {
	                        checkValue = true;
	                    }
	                    break;
	                case 'N':
	                    var controlledValueN = Number(value);

	                    if (field.min && controlledValueN === 0 || field.min && controlledValueN < field.min && field.max && controlledValueN > field.max) {
	                        checkValue = true;
	                    }
	                    break;
	            }
	            if (checkValue) {
	                notMinMaxRule.push(field.name);
	            }
	        }
	    });

	    if (notRequiredFields.length > 0) {
	        warning = 'puudub vajalikud andmed (' + notRequiredFields.join(', ') + ') ';
	    }

	    if (notMinMaxRule.length > 0) {
	        warning = warning ? warning : '' + ' min/max on vale(' + notMinMaxRule.join(', ') + ') ';
	    }

	    return warning; // вернем извещение об итогах валидации
	};

	module.exports = validateForm;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(3),
	    Button = __webpack_require__(45),
	    buttonStyles = __webpack_require__(44),
	    styles = __webpack_require__(62);

	var ____Class4=React.PureComponent;for(var ____Class4____Key in ____Class4){if(____Class4.hasOwnProperty(____Class4____Key)){ModalPage[____Class4____Key]=____Class4[____Class4____Key];}}var ____SuperProtoOf____Class4=____Class4===null?null:____Class4.prototype;ModalPage.prototype=Object.create(____SuperProtoOf____Class4);ModalPage.prototype.constructor=ModalPage;ModalPage.__superConstructor__=____Class4;
	    function ModalPage(props) {
	        ____Class4.call(this,props);
	        this.handleBtnClick.bind(this);
	        this.closeModalPage.bind(this);
	        this.state = {
	            show: this.props.show
	        }
	    }

	    Object.defineProperty(ModalPage.prototype,"closeModalPage",{writable:true,configurable:true,value:function() {
	        this.setState({show:false});
	    }});

	    Object.defineProperty(ModalPage.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({show: nextProps.show});
	    }});

	    Object.defineProperty(ModalPage.prototype,"handleBtnClick",{writable:true,configurable:true,value:function(btnEvent) {
	        this.props.modalPageBtnClick(btnEvent);
	    }});

	    Object.defineProperty(ModalPage.prototype,"render",{writable:true,configurable:true,value:function() {
	        // если передан атрибу modalObjects = ['btnOk','btnCancel']
	        let hideBtnOk = this.props.modalObjects.indexOf('btnOk') == -1 ? false : true, // управление кнопкой Ок
	            hideBtnCancel = this.props.modalObjects.indexOf('btnCancel') == -1 ? false : true, // управление кнопкой Cancel
	            displayModal = this.state.show ? 'flex': 'none' ,
	            pagePosition =  this.props.position,
	            containerStyle = Object.assign({}, styles.container, {display: displayModal}, {justifyContent:pagePosition});

	        return (
	            React.createElement("div", {ref: "container", style: containerStyle}, 
	                React.createElement("div", {style: styles.modalPage, ref: "modalPageContainer"}, 
	                    React.createElement("div", {style: styles.header, ref: "modalPageHeader"}, 
	                        React.createElement("span", {ref: "headerName", style: styles.headerName}, " ", this.props.modalPageName, " "), 
	                        React.createElement(Button, {style: styles.buttonClose, ref: "btnClose", onClick: this.closeModalPage.bind(this), value: "x"})
	                    ), 
	                    React.createElement("div", {style: styles.modalPageContent, ref: "modalPageContent"}, 
	                        this.props.children
	                    ), 

	                    React.createElement("div", {style: styles.modalFooter, ref: "modalPageButtons"}, 
	                        hideBtnOk ?
	                            React.createElement(Button, {
	                                ref: "btnOk", 
	                                value: "Ok", 
	                                style: styles.modalPageButtons, 
	                                width: ('width' in styles.modalPageButtons)? styles.modalPageButtons.width: null, 
	                                height: ('height' in styles.modalPageButtons)? styles.modalPageButtons.height: null, 
	                                onClick: this.handleBtnClick.bind(this, 'Ok'), 
	                                id: "btnOk"}, 
	                                React.createElement("image", {ref: "image", src: buttonStyles.icons['ok']})
	                            ) : null, 
	                        
	                        React.createElement("div", {style: styles.buttonsSeparator}), 
	                        hideBtnCancel ?
	                            React.createElement(Button, {
	                                ref: "btnCancel", 
	                                value: "Cancel", 
	                                width: ('width' in styles.modalPageButtons)? styles.modalPageButtons.width: null, 
	                                height: ('height' in styles.modalPageButtons)? styles.modalPageButtons.height: null, 
	                                onClick: this.handleBtnClick.bind(this, 'Cancel'), 
	                                className: "modalPageButtons", 
	                                id: "btnCancel"}, 
	                                React.createElement("image", {ref: "image", src: buttonStyles.icons['cancel']})
	                            ) : null
	                        
	                    )
	                )
	            )
	        )
	    }});


	ModalPage.propTypes = {
	    modalPageName: React.PropTypes.string.isRequired,
	    modalPageBtnClick: React.PropTypes.func.isRequired,
	    show: React.PropTypes.bool,
	    position: React.PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
	}


	ModalPage.defaultProps = {
	    modalPageName: 'defaulName',
	    modalObjects: ['btnOk', 'btnCancel'],
	    position: 'center',
	    show: false
	}

	module.exports = ModalPage;

/***/ },
/* 62 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    container: {
	        position: 'fixed',
	        top: '0',
	        left: 0,
	        right: 0,
	        bottom: 0,
	        backgroundColor: 'rgba(255, 255, 255, 0.25)',
	        display: 'flex',
	        justifyContent: 'center'
	    },
	    modalPage: {
	        position: 'absolute',
	        border: '1px solid black',
	        background: 'white',
	        margin: '8px',
	        borderRadius: '4px',
	        outline: 'none',
	        display: 'flex',
	        flexDirection: 'column',
	        alignSelf: 'center'
	    },
	    modalPageContent: {
	        padding: '10px',
	        margin: '10px'
	    },
	    header: {
	        height: '30px',
	        width: '100%',
	        border: '1px solid darkgray',
	        background: 'lightgray',
	        display: 'flex',
	        justifyContent: 'space-between'
	    },

	    headerName: {
	        color: 'white',
	        alignSelf: 'center',
	        marginLeft: '10px'
	    },

	    modalFooter: {
	        alignSelf: 'center',
	        display: 'flex',
	        marginBotton: '10px'
	    },

	    modalPageButtons: {
	        height: '30px',
	        width: '100px',
	        marginBottom: '10px'
	    },

	    buttonsSeparator: {
	        width: '10px'
	    },

	    buttonClose: {
	        borderRadius: '50%',
	        backgroundColor: 'lightgray',
	        border: 'none',
	        fontWeight: '900'

	    },

	    left: {
	        right: 'auto',
	        left: '0'
	    },

	    right: {
	        left: 'auto',
	        right: '0'
	    }

	};

/***/ },
/* 63 */
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
	    }

	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var flux = __webpack_require__(4);

	var docStore = flux.createStore({
	    id: 'docStore',
	    initialState: {
	        gridCellEdited: 0, // отслеживаем в гриде редактируемую ячейку
	        data: [],
	        details: [], // данные на грид
	        relations: [], // данные на связанные документы
	        gridConfig: [], // конфигурация грида
	        gridName: '',
	        docId: 0,
	        deleted: false,
	        edited: false,
	        saved: true,
	        gridRowId: 0,
	        libs: [{
	            id: 'asutused',
	            data: [],
	            params: []
	            //                data:[{id:1, name:"Asutus 1"},{id:2, name:"Asutus 2"},{id:3, name:"Asutus 3"} ]
	        }, {
	            id: 'nomenclature',
	            data: [],
	            params: []
	        }, {
	            id: 'kontod',
	            data: [],
	            params: []
	        }, {
	            id: 'project',
	            data: [],
	            params: []
	        }, {
	            id: 'tunnus',
	            data: [],
	            params: []
	        }, {
	            id: 'aa',
	            data: [],
	            params: []
	        }, {
	            id: 'arvedSisse',
	            data: [],
	            params: [null, null],
	            fields: ['asutusid', 'arvid'] // ид контр-агента и номер счета
	        }, {
	            id: 'arvedValja',
	            data: [],
	            params: [null, null],
	            fields: ['asutusid', 'arvid'] // ид контр-агента и номер счета
	        }, {
	            id: 'users',
	            data: [],
	            params: []
	        }, {
	            id: 'dokProps',
	            data: [],
	            params: [null, null],
	            fields: ['doc_type_id', 'rekvid'] // тип документа и ид учреждения
	        }],
	        bpm: [], // данные БП документа
	        task: {}, // текущая задача
	        backup: {} // хранит неизмененное состояние документа
	    },
	    actionCallbacks: {
	        backupChange: function backupChange(updater, value) {
	            // хранит начальные данных документа
	            updater.set({ backup: value });
	        },

	        setLibsFilter: function setLibsFilter(updater, libName, filter) {

	            // ищем справочник
	            var libs = this.libs;

	            for (var i = 0; i < libs.length; i++) {
	                if (libs[i].id == libName) {
	                    if (filter) {
	                        libs[i].filter = filter;
	                        flux.doAction('loadLibs', libName); //новые данные
	                    }
	                    break;
	                }
	            }
	        },
	        gridRowIdChange: function gridRowIdChange(updater, value) {
	            //           console.log('gridRowIdChange called:' + value);
	            updater.set({ gridRowId: value });
	        },
	        loadLibs: function loadLibs(updater, libsToUpdate) {
	            var _this = this;

	            // грузим справочники
	            var libs = this.libs.filter(function (item) {
	                if (!libsToUpdate || item.id == libsToUpdate) {
	                    return item;
	                }
	            });

	            // вызываем обновление справочника с сервера
	            libs.forEach(function (item) {
	                var libParams = [];
	                if (item.params) {
	                    libParams = item.params;
	                    // установим параметры для запроса
	                    for (var i = 0; i < libParams.length; i++) {
	                        libParams[i] = _this.data[item.fields[i]];
	                    }
	                }
	                _loadLibs(item.id, libParams);
	            });
	        },
	        saveData: function saveData(updater) {
	            saveDoc();
	        },
	        executeTask: function executeTask(updater, task) {
	            _executeTask(task);
	        },
	        deleteDoc: function deleteDoc(updater) {
	            _deleteDoc();
	        },
	        gridCellEditedChange: function gridCellEditedChange(updater, value) {
	            //           console.log('called gridCellEditedChange:' + value);
	            updater.set({ gridCellEdited: value });
	        },
	        docIdChange: function docIdChange(updater, value) {
	            // Stores updates are only made inside store's action callbacks
	            // чистим данные грида
	            try {
	                //               console.log('docIdChange', value);
	                updater.set({ docId: value });
	            } catch (e) {
	                console.error('docIdChange viga', e);
	            }
	        },
	        dataChange: function dataChange(updater, value) {
	            // Отслеживает загрузку данных документа
	            updater.set({ data: value });

	            if (typeof value.arvid !== 'undefinite') {
	                // если контрагент отсутсвует, то и параметр контрагента также обнулим
	                value.arvid = value.asutusid ? value.arvid : null;
	                // зададим параметры для справочника счетов
	                flux.doAction('setLibsFilter', 'arvedSisse', [value.asutusid, value.arvid]);
	            }
	        },
	        bpmChange: function bpmChange(updater, value) {
	            // Загрузка БП
	            //            console.log('bpmChange', value);
	            updater.set({ bpm: value });
	        },
	        relationsChange: function relationsChange(updater, value) {
	            // Отслеживает загрузку данных зависимостей документа
	            updater.set({ relations: value });
	        },
	        detailsChange: function detailsChange(updater, value) {
	            // Отслеживает загрузку данных грида документа
	            updater.set({ details: value });
	        },
	        gridConfigChange: function gridConfigChange(updater, value) {
	            // Отслеживает загрузку конфигурации грида
	            updater.set({ gridConfig: value });
	        },
	        deletedChange: function deletedChange(updater, value) {
	            // была вызвана кнопка Delete
	            updater.set({ deleted: value });
	        },
	        editedChange: function editedChange(updater, value) {
	            // Меняется режим редактирования документа
	            updater.set({ edited: value });
	        },
	        savedChange: function savedChange(updater, value) {
	            // Отслеживает изменения в данных и из сохранение
	            updater.set({ saved: value });
	        },
	        libsChange: function libsChange(updater, value) {
	            // Отслеживает изменения в справочниках
	            //            console.log('libsChange called', value);
	            if (value) {
	                updater.set({ libs: value });
	            }
	        },
	        gridNameChange: function gridNameChange(updater, value) {
	            updater.set({ gridName: value });
	        }
	    }
	});

	function _deleteDoc() {
	    // вызывает метод удаления документа
	    // вернемся в регистр
	    //requery('delete', null);
	    document.location = '/documents';
	};

	function _executeTask(task) {
	    /*
	        Выполнит запрос на исполнение задачи
	     */

	    var tasksParameters = {
	        docId: docStore.data.id,
	        tasks: task,
	        doc_type_id: docStore.data.doc_type_id
	    };

	    //   console.log('executeTask:', task, tasksParameters);

	    requery('execute', JSON.stringify(tasksParameters), function (err, data) {
	        if (err || data.result == 'Error') {
	            return err;
	        }

	        try {
	            //            console.log('executeTask arrived docStore.data.id, docStore.docId, data',docStore.data.id,docStore.docId,  data);

	            // при успешном выполнении задачи, выполнить перегрузку документа (временно)
	            //@todo подтянуть изменения без перегрузки страницы
	            reloadDocument(docStore.data.id);
	        } catch (e) {
	            console.error('requery, reloadDocument', e);
	        }
	    });
	};

	function saveDoc() {
	    // вызывает метод сохранения документа
	    var saveData = {
	        id: docStore.data.id,
	        doc_type_id: docStore.data.doc_type_id, // вынесено для подгрузки модели
	        data: docStore.data,
	        details: docStore.details
	    };

	    requery('save', JSON.stringify(saveData), function (err, data) {
	        if (err) return err;

	        try {

	            console.log('saved:', data);
	            var newId = data[0].id;
	            // обновим ид
	            saveData.data.id = newId;

	            flux.doAction('dataChange', saveData.data); //новые данные
	            flux.doAction('docIdChange', newId); // новое ид
	            flux.doAction('savedChange', true); // устанавливаем режим сохранен
	            flux.doAction('editedChange', false); // устанавливаем режим сохранен


	            // reload document
	            reloadDocument(newId); //@todo выполнить перегрузку данных перез перегрузки страницы
	        } catch (e) {
	            console.error('tekkis viga', e);
	        }
	    });

	    /*
	    
	        requery('saveAndSelect', JSON.stringify(saveData), function(err, data) {
	            if (err) return err;
	    
	            try {
	                if (data.id !== saveData.data.id) {
	                    // обновим ид
	                    saveData.data.id = data.id;
	                    flux.doAction( 'dataChange', saveData.data ); //новые данные
	                }
	                flux.doAction( 'docIdChange', data.id ); // новое ид
	                flux.doAction( 'savedChange', true ); // устанавливаем режим сохранен
	                flux.doAction( 'editedChange', false ); // устанавливаем режим сохранен
	            } catch(e) {
	                console.error;
	            }
	    
	        });
	    */
	};

	function reloadDocument(docId) {
	    // reload document

	    if (docId) {
	        var url = "/document/" + docStore.data.doc_type_id + docId;
	        document.location.href = url;
	    }
	}

	function _loadLibs(libraryName, libParams) {
	    try {

	        requery('select', JSON.stringify({ doc_type_id: libraryName, id: 0, params: libParams }), function (err, data) {
	            if (err) throw err;

	            var newLibs = docStore.libs.map(function (item) {
	                // ищем данные справолчника, которые обновили
	                var returnData = item;

	                if (item.id == libraryName) {
	                    returnData.data = data;
	                }
	                return returnData;
	            });

	            if (newLibs.length > 0) {
	                flux.doAction('libsChange', newLibs); // пишем изменения в хранилище
	            }
	        });
	    } catch (e) {
	        console.error('tekkis viga', e);
	    }
	}

	function requery(action, parameters, callback) {
	    // метод обеспечит получение данных от сервера
	    if (!window.jQuery) {
	        return;
	    }

	    var URL = '/api/doc';
	    $.ajax({
	        url: URL,
	        type: "POST",
	        dataType: 'json',
	        data: {
	            action: action,
	            data: parameters
	        },
	        cache: false,
	        success: function (data) {
	            // должны получить объект
	            try {
	                callback(null, data);
	            } catch (e) {
	                console.error('Requery error:', e);
	            }
	        }.bind(this),
	        error: function (xhr, status, err) {
	            console.error('/error', status, err.toString());
	            callback(err, null);
	        }.bind(this)
	    });
	};

	module.exports = docStore;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDdkY2VhNzRiNTQ3YTY5NGQ2ODNhIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLmpzeCIsIndlYnBhY2s6Ly8vLi9+L2ZsdXhpZnkvZmx1eGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZsdXhpZnkvc3JjL3hEaXNwYXRjaGVyLmpzIiwid2VicGFjazovLy8uL34vZmx1eGlmeS9zcmMveFN0b3JlLmpzIiwid2VicGFjazovLy8uL34vZmx1eGlmeS9zcmMveEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mbHV4aWZ5L3NyYy94VXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9mb3JtL2Zvcm0uanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvcGFnZS1sYWJlbC9wYWdlLWxhYmVsLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3BhZ2UtbGFiZWwvcGFnZS1sYWJlbC1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9mb3JtL2Zvcm0tc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2lucHV0LXRleHQvaW5wdXQtdGV4dC1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC1kYXRlL2lucHV0LWRhdGUuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtZGF0ZS9pbnB1dC1kYXRlLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2lucHV0LW51bWJlci9pbnB1dC1udW1iZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtbnVtYmVyL2lucHV0LW51bWJlci1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtY29tbW9uL2RvYy1jb21tb24uanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWlucHV0LWRhdGV0aW1lLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1saXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1jb21tb24vZG9jLWNvbW1vbi1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3Qtc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvdGV4dC1hcmVhL3RleHQtYXJlYS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy90ZXh0LWFyZWEvdGV4dC1hcmVhLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC9kYXRhLWdyaWQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YS1ncmlkL2RhdGEtZ3JpZC1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1rZXlkb3duL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1rZXlkb3duL2Rpc3QvbGliL2FycmF5LmZyb20uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1rZXlkb3duL2Rpc3QvZGVjb3JhdG9ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9kZWNvcmF0b3JzL2NsYXNzX2RlY29yYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvbWF0Y2hfa2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvcGFyc2Vfa2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvdXVpZC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9ldmVudF9oYW5kbGVycy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvZG9tX2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1rZXlkb3duL2Rpc3QvbGliL2xpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9kZWNvcmF0b3JzL21ldGhvZF9kZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1rZXlkb3duL2Rpc3QvZGVjb3JhdG9ycy9tZXRob2RfZGVjb3JhdG9yX3Njb3BlZC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItYWRkL2J1dHRvbi1yZWdpc3Rlci1hZGQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZWRpdC9idXR0b24tcmVnaXN0ZXItZWRpdC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWRlbGV0ZS9idXR0b24tcmVnaXN0ZXItZGVsZXRlLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvY3Byb3AvZG9jcHJvcC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtc2VsZWN0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9taXhpbi9yZWxhdGVkRG9jdW1lbnRzLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3Rvb2xiYXItY29udGFpbmVyL3Rvb2xiYXItY29udGFpbmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3Rvb2xiYXItY29udGFpbmVyL3Rvb2xiYXItY29udGFpbmVyLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy10b29sYmFyL2RvYy10b29sYmFyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItc2F2ZS9idXR0b24tcmVnaXN0ZXItc2F2ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWNhbmNlbC9idXR0b24tcmVnaXN0ZXItY2FuY2VsLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItcHJpbnQvYnV0dG9uLXJlZ2lzdGVyLXByaW50LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3Rhc2std2lkZ2V0L3Rhc2std2lkZ2V0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZXhlY3V0ZS9idXR0b24tcmVnaXN0ZXItZXhlY3V0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy90YXNrLXdpZGdldC90YXNrLXdpZGdldC1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvbWl4aW4vdmFsaWRhdGVGb3JtLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFsUGFnZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kb2NzL2FydmUvYXJ2ZS5zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvc3RvcmVzL2RvY19zdG9yZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gd2luZG93W1wid2VicGFja0pzb25wX25hbWVfXCJdO1xuIFx0d2luZG93W1wid2VicGFja0pzb25wX25hbWVfXCJdID0gZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soY2h1bmtJZHMsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgY2FsbGJhY2tzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSlcbiBcdFx0XHRcdGNhbGxiYWNrcy5wdXNoLmFwcGx5KGNhbGxiYWNrcywgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKTtcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oY2h1bmtJZHMsIG1vcmVNb2R1bGVzKTtcbiBcdFx0d2hpbGUoY2FsbGJhY2tzLmxlbmd0aClcbiBcdFx0XHRjYWxsYmFja3Muc2hpZnQoKS5jYWxsKG51bGwsIF9fd2VicGFja19yZXF1aXJlX18pO1xuIFx0XHRpZihtb3JlTW9kdWxlc1swXSkge1xuIFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbMF0gPSAwO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gXCIwXCIgbWVhbnMgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHQvLyBBcnJheSBtZWFucyBcImxvYWRpbmdcIiwgYXJyYXkgY29udGFpbnMgY2FsbGJhY2tzXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHQ0OjBcbiBcdH07XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQsIGNhbGxiYWNrKSB7XG4gXHRcdC8vIFwiMFwiIGlzIHRoZSBzaWduYWwgZm9yIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApXG4gXHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwobnVsbCwgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gYW4gYXJyYXkgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gIT09IHVuZGVmaW5lZCkge1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXS5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW2NhbGxiYWNrXTtcbiBcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gXHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gXHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdHNjcmlwdC5hc3luYyA9IHRydWU7XG5cbiBcdFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArICh7XCIwXCI6XCJhcnZcIixcIjFcIjpcImRvY1wiLFwiMlwiOlwiZG9jc1wiLFwiM1wiOlwiam91cm5hbFwifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiO1xuIFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3ZGNlYTc0YjU0N2E2OTRkNjgzYSIsIid1c2Ugc3RyaWN0JztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0XHJcbiAgICBGb3JtID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9mb3JtL2Zvcm0uanN4JyksXHJcbiAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2lucHV0LXRleHQvaW5wdXQtdGV4dC5qc3gnKSxcclxuICAgIElucHV0RGF0ZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvaW5wdXQtZGF0ZS9pbnB1dC1kYXRlLmpzeCcpLFxyXG4gICAgSW5wdXROdW1iZXIgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2lucHV0LW51bWJlci9pbnB1dC1udW1iZXIuanN4JyksXHJcbiAgICBEb2NDb21tb24gPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RvYy1jb21tb24vZG9jLWNvbW1vbi5qc3gnKSxcclxuICAgIFNlbGVjdCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5qc3gnKSxcclxuICAgIFRleHRBcmVhID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy90ZXh0LWFyZWEvdGV4dC1hcmVhLmpzeCcpLFxyXG4gICAgRGF0YUdyaWQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RhdGEtZ3JpZC9kYXRhLWdyaWQuanN4JyksXHJcbiAgICBHcmlkQnV0dG9uQWRkID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWFkZC9idXR0b24tcmVnaXN0ZXItYWRkLmpzeCcpLFxyXG4gICAgR3JpZEJ1dHRvbkVkaXQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZWRpdC9idXR0b24tcmVnaXN0ZXItZWRpdC5qc3gnKSxcclxuICAgIEdyaWRCdXR0b25EZWxldGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZGVsZXRlL2J1dHRvbi1yZWdpc3Rlci1kZWxldGUuanN4JyksXHJcbiAgICBEb2tQcm9wID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kb2Nwcm9wL2RvY3Byb3AuanN4JyksXHJcbiAgICByZWxhdGVkRG9jdW1lbnRzID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vcmVsYXRlZERvY3VtZW50cy5qc3gnKSxcclxuICAgIFRvb2xiYXJDb250YWluZXIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci1jb250YWluZXIvdG9vbGJhci1jb250YWluZXIuanN4JyksXHJcbiAgICBEb2NUb29sQmFyID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL2RvYy10b29sYmFyL2RvYy10b29sYmFyLmpzeCcpLFxyXG4gICAgdmFsaWRhdGVGb3JtID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vdmFsaWRhdGVGb3JtJyksXHJcbiAgICBNb2RhbFBhZ2UgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFsUGFnZS5qc3gnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vYXJ2ZS5zdHlsZXMnKTtcclxuXHJcbi8vQHRvZG8g0L/QvtC80LXQvdGP0YLRjCDQvdCwIHRoaXMuc3RhdGUubGlic1xyXG5jb25zdCBMSUJET0sgPSAnQVJWJyxcclxuICAgIExJQlJBUklFUyA9IFsnYXN1dHVzZWQnLCAna29udG9kJywgJ2Rva1Byb3BzJywgJ3VzZXJzJywgJ2FhJywgJ3R1bm51cycsICdwcm9qZWN0JywgJ25vbWVuY2xhdHVyZSddO1xyXG5cclxuLy8gQ3JlYXRlIGEgc3RvcmVcclxuY29uc3QgZG9jU3RvcmUgPSByZXF1aXJlKCcuLi8uLi9zdG9yZXMvZG9jX3N0b3JlLmpzJyk7XHJcblxyXG52YXIgbm93ID0gbmV3IERhdGUoKTtcclxuXHJcbnZhciBfX19fQ2xhc3MyPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3MyX19fX0tleSBpbiBfX19fQ2xhc3MyKXtpZihfX19fQ2xhc3MyLmhhc093blByb3BlcnR5KF9fX19DbGFzczJfX19fS2V5KSl7QXJ2ZVtfX19fQ2xhc3MyX19fX0tleV09X19fX0NsYXNzMltfX19fQ2xhc3MyX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczI9X19fX0NsYXNzMj09PW51bGw/bnVsbDpfX19fQ2xhc3MyLnByb3RvdHlwZTtBcnZlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3MyKTtBcnZlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1BcnZlO0FydmUuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzMjtcclxuICAgIGZ1bmN0aW9uIEFydmUocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3MyLmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZG9jRGF0YTogdGhpcy5wcm9wcy5kYXRhLnJvdyxcclxuICAgICAgICAgICAgYnBtOiB0aGlzLnByb3BzLmJwbSxcclxuICAgICAgICAgICAgZWRpdGVkOiB0aGlzLnByb3BzLmRhdGEucm93LmlkID09IDAsXHJcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94OiAnbm9uZScsXHJcbiAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnByb3BzLmRhdGEuZGV0YWlscyxcclxuICAgICAgICAgICAgcmVsYXRpb25zOiB0aGlzLnByb3BzLmRhdGEucmVsYXRpb25zLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnOiB0aGlzLnByb3BzLmRhdGEuZ3JpZENvbmZpZyxcclxuICAgICAgICAgICAgZ3JpZFJvd0VkaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBncmlkUm93RXZlbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIGdyaWRSb3dEYXRhOiBudWxsLFxyXG4gICAgICAgICAgICBsaWJzOiB7XHJcbiAgICAgICAgICAgICAgICBhc3V0dXNlZDogW10sXHJcbiAgICAgICAgICAgICAgICBub21lbmNsYXR1cmU6IFtdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB3YXJuaW5nOiAnJ1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGFnZXMgPSBbe3BhZ2VOYW1lOiAnQXJ2ZSd9XVxyXG4gICAgICAgIHRoaXMucmVxdWlyZWRGaWVsZHMgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdrcHYnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0QnLFxyXG4gICAgICAgICAgICAgICAgbWluOiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgLSAxKSxcclxuICAgICAgICAgICAgICAgIG1heDogbm93LnNldEZ1bGxZZWFyKG5vdy5nZXRGdWxsWWVhcigpICsgMSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3RhaHRhZWcnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0QnLFxyXG4gICAgICAgICAgICAgICAgbWluOiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgLSAxKSxcclxuICAgICAgICAgICAgICAgIG1heDogbm93LnNldEZ1bGxZZWFyKG5vdy5nZXRGdWxsWWVhcigpICsgMSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge25hbWU6ICdhc3V0dXNpZCcsIHR5cGU6ICdOJywgbWluOiBudWxsLCBtYXg6IG51bGx9LFxyXG4gICAgICAgICAgICB7bmFtZTogJ3N1bW1hJywgdHlwZTogJ04nLCBtaW46IC05OTk5OTk5LCBtYXg6IDk5OTk5OX1cclxuICAgICAgICBdXHJcbiAgICAgICAgdGhpcy5oYW5kbGVUb29sYmFyRXZlbnRzID0gdGhpcy5oYW5kbGVUb29sYmFyRXZlbnRzLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0aW9uLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbFBhZ2VDbGljayA9IHRoaXMubW9kYWxQYWdlQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUdyaWRCdG5DbGljayA9IHRoaXMuaGFuZGxlR3JpZEJ0bkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRSb3cgPSB0aGlzLmFkZFJvdy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlR3JpZFJvd0NoYW5nZSA9IHRoaXMuaGFuZGxlR3JpZFJvd0NoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGVHcmlkUm93ID0gdGhpcy52YWxpZGF0ZUdyaWRSb3cuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUdyaWRSb3dJbnB1dCA9IHRoaXMuaGFuZGxlR3JpZFJvd0lucHV0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVHcmlkUm93ID0gdGhpcy5jcmVhdGVHcmlkUm93LmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwidmFsaWRhdGlvblwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5lZGl0ZWQpIHJldHVybiAnJztcclxuXHJcbiAgICAgICAgbGV0IHJlcXVpcmVkRmllbGRzID0gdGhpcy5yZXF1aXJlZEZpZWxkcztcclxuICAgICAgICBsZXQgd2FybmluZyA9IHJlcXVpcmUoJy4uLy4uL21peGluL3ZhbGlkYXRlRm9ybScpKHRoaXMsIHJlcXVpcmVkRmllbGRzKTtcclxuICAgICAgICByZXR1cm4gd2FybmluZztcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJjb21wb25lbnRXaWxsTW91bnRcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnJlbGF0ZWREb2N1bWVudHMoKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJjb21wb25lbnREaWRNb3VudFwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC/0LjRiNC10Lwg0LjRgdGF0L7QtNC90YvQtSDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1LCDRgNC10LPQuNGB0YLRgNC40YDRg9C10Lwg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgZGF0YSA9IHNlbGYucHJvcHMuZGF0YS5yb3csXHJcbiAgICAgICAgICAgIGRldGFpbHMgPSBzZWxmLnByb3BzLmRhdGEuZGV0YWlscyxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZyA9IHNlbGYucHJvcHMuZGF0YS5ncmlkQ29uZmlnO1xyXG5cclxuICAgICAgICAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZGV0YWlscyk7IC8vINC00LDQvdC90YvQtSDQs9GA0LjQtNCwXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZENvbmZpZ0NoYW5nZScsIGdyaWRDb25maWcpOyAvLyDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxyXG4vLyAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZE5hbWVDaGFuZ2UnLCAnYXJ2LWdyaWQtcm93Jyk7IC8vINC30LDQtNCw0LXQvCDQuNC80Y8g0LrQvtC80L/QvtC90LXQvdGC0LAg0YHRgtGA0L7QutC4INCz0YDQuNC00LAgKNC00LvRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcblxyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10YIg0LjQt9C80LXQvdC10L3QuNGPINC00LDQvdC90YvRhSDQsiDQs9GA0LjQtNC1XHJcbiAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTpkZXRhaWxzJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHByZXZpb3VzVmFsdWUpICYmIHR5cGVvZiBuZXdWYWx1ZSA9PSAnYXJyYXknKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQuNGC0L7Qs9C4XHJcbiAgICAgICAgICAgICAgICBsZXQgc3VtbWEgPSBuZXdWYWx1ZS5yZWR1Y2UoZnVuY3Rpb24oc3VtLCByb3cpICB7cmV0dXJuIHN1bSArIE51bWJlcihyb3cuc3VtbWEpO30sIDApLCAvLyDRgdGD0LzQvNCwINGB0YfQtdGC0LBcclxuICAgICAgICAgICAgICAgICAgICBrYm0gPSBuZXdWYWx1ZS5yZWR1Y2UoZnVuY3Rpb24oc3VtLCByb3cpICB7cmV0dXJuIHN1bSArIE51bWJlcihyb3cua2JtKTt9LCAwKSwgLy8g0YHRg9C80LzQsCDQvdCw0LvQvtCz0LBcclxuICAgICAgICAgICAgICAgICAgICBkb2NEYXRhID0gc2VsZi5zdGF0ZS5kb2NEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY0RhdGEuc3VtbWEgPSBzdW1tYTtcclxuICAgICAgICAgICAgICAgIGRvY0RhdGEua2JtID0ga2JtO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2dyaWREYXRhOiBuZXdWYWx1ZSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINCz0YDRg9C30LjQvCDRgdC/0YDQsNCy0L7Rh9C90LjQutC4XHJcbiAgICAgICAgTElCUkFSSUVTLmZvckVhY2goZnVuY3Rpb24obGliKSAge1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKFwibG9hZExpYnNcIiwgbGliKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0L3QvtCy0YvQuSDQtNC+0LrRg9C80LXQvdGCIChpZCA9PSAwKVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5pZCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2VkaXRlZENoYW5nZScsIHRydWUpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzYXZlZENoYW5nZScsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vINC00LXQu9Cw0LXQvCDQutC+0L/QuNC4XHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdiYWNrdXBDaGFuZ2UnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93OiBPYmplY3QuYXNzaWduKHt9LGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IE9iamVjdC5hc3NpZ24oW10sZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGV0YWlscylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtlZGl0ZWQ6IG5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTpsaWJzJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpICB7XHJcbiAgICAgICAgICAgIGxldCBpc0NoYW5nZWQgPSBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGxpYnMgPSBuZXdWYWx1ZSxcclxuICAgICAgICAgICAgICAgIGxpYnNEYXRhID0gdGhpcy5zdGF0ZS5saWJzO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsaWJzLmZvckVhY2goZnVuY3Rpb24obGliKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmxpYnNbbGliLmlkXSAmJiBsaWIuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpYnNEYXRhW2xpYi5pZF0gPSBsaWIuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtsaWJzOiBsaWJzRGF0YX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwicmVsYXRlZERvY3VtZW50c1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XHJcbiAgICAgICAgbGV0IHJlbGF0ZWREb2N1bWVudHMgPSB0aGlzLnN0YXRlLnJlbGF0aW9ucztcclxuICAgICAgICBpZiAocmVsYXRlZERvY3VtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJlbGF0ZWREb2N1bWVudHMuZm9yRWFjaChmdW5jdGlvbihkb2MpICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9jLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LjQvCDQvdCwINGD0L3QuNC60LDQu9GM0L3QvtGB0YLRjCDRgdC/0LjRgdC60LAg0LTQvtC60YPQvNC10L3RgtC+0LJcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXNFeGlzdHMgPSB0aGlzLnBhZ2VzLmZpbmQoZnVuY3Rpb24ocGFnZSkgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwYWdlLmRvY0lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFnZS5kb2NJZCA9PSBkb2MuaWQgJiYgcGFnZS5kb2NUeXBlSWQgPT0gZG9jLmRvY190eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNFeGlzdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LIg0LzQsNGB0YHQuNCy0LUg0L3QtdGCLCDQtNC+0LHQsNCy0LjQvCDRgdGB0YvQu9C60YMg0L3QsCDQtNC+0LrRg9C80LXQvdGCXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZXMucHVzaCh7ZG9jVHlwZUlkOiBkb2MuZG9jX3R5cGUsIGRvY0lkOiBkb2MuaWQsIHBhZ2VOYW1lOiBkb2MubmFtZSArICcgaWQ6JyArIGRvYy5pZH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJzaG91bGRDb21wb25lbnRVcGRhdGVcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgICAgIC8vIEB0b2RvINC00L7QsdCw0LLQuNGC0Ywg0L/RgNC+0LLQtdGA0LrRgyDQvdCwINC40LfQvNC10L3QtdC90LjQtSDRgdC+0YHRgtC+0Y/QvdC40Y9cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0LfQsNCy0LjRgdC40LzQvtGB0YLQuFxyXG4gICAgICAgIHJlbGF0ZWREb2N1bWVudHModGhpcyk7XHJcblxyXG4gICAgICAgIGxldCBicG0gPSB0aGlzLnN0YXRlLmJwbSxcclxuICAgICAgICAgICAgaXNFZGl0ZU1vZGUgPSB0aGlzLnN0YXRlLmVkaXRlZCxcclxuICAgICAgICAgICAgdG9vbGJhclBhcmFtcyA9IHRoaXMucHJlcGFpcmVUb29sQmFyUGFyYW1ldGVycyhpc0VkaXRlTW9kZSksXHJcbiAgICAgICAgICAgIHZhbGlkYXRpb25NZXNzYWdlID0gdGhpcy52YWxpZGF0aW9uKCksXHJcbiAgICAgICAgICAgIGxpYnMgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5saWJzO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIHtwYWdlczogdGhpcy5wYWdlcywgXHJcbiAgICAgICAgICAgICAgICAgIHJlZjogXCJmb3JtXCIsIFxyXG4gICAgICAgICAgICAgICAgICBoYW5kbGVQYWdlQ2xpY2s6IHRoaXMuaGFuZGxlUGFnZUNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGlzRWRpdGVNb2RlfSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXJDb250YWluZXIsIHtyZWY6IFwidG9vbGJhci1jb250YWluZXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJkb2MtdG9vbGJhci13YXJuaW5nXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1lc3NhZ2UgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB2YWxpZGF0aW9uTWVzc2FnZSkgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEb2NUb29sQmFyLCB7YnBtOiBicG0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZG9jLXRvb2xiYXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRlZDogaXNFZGl0ZU1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NTdGF0dXM6IHRoaXMuc3RhdGUuZG9jRGF0YS5kb2Nfc3RhdHVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiB0aGlzLnZhbGlkYXRpb24sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXI6IHRoaXMuaGFuZGxlVG9vbGJhckV2ZW50c30pXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY30sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQ29tbW9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZG9jLWNvbW1vblwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc3RhdGUuZG9jRGF0YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY0NvbHVtbn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dC1udW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk51bWJlclwiLCBuYW1lOiBcIm51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZG9jRGF0YS5udW1iZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0RGF0ZSwge3RpdGxlOiBcIkt1dXDDpGV2IFwiLCBuYW1lOiBcImtwdlwiLCB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLmtwdiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dC1rcHZcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkt1dXDDpGV2XCIsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZX0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXREYXRlLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIlTDpGh0YWVnIFwiLCBuYW1lOiBcInRhaHRhZWdcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEudGFodGFlZywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dC10YWh0YWVnXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJUw6RodGFlZ1wiLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQXN1dHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFzdXR1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcImFzdXR1c2VkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnN0YXRlLmxpYnNbJ2FzdXR1c2VkJ10sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLmFzdXR1c2lkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEuYXN1dHVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiQXN1dHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwic2VsZWN0LWFzdXR1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidG5EZWxldGU6IGlzRWRpdGVNb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiTGlzYSBcIiwgbmFtZTogXCJsaXNhXCIsIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEubGlzYSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkxpc2FcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dC1saXNhXCIsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY0NvbHVtbn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEb2tQcm9wLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiS29udGVlcmltaW5lOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRva2xhdXNpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwiZG9rUHJvcHNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLmRva2xhdXNpZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHRoaXMuc3RhdGUuZG9jRGF0YS5kb2twcm9wLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIktvbnRlZXJpbWluZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJkb2twcm9wLWRva2xhdXNpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NSb3d9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwge3RpdGxlOiBcIk3DpHJrdXNlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibXV1ZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIk3DpHJrdXNlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJ0ZXh0YXJlYS1tdXVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZG9jRGF0YS5tdXVkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpc0VkaXRlTW9kZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXJDb250YWluZXIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZ3JpZC10b29sYmFyLWNvbnRhaW5lclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2xlZnQnfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcmlkQnV0dG9uQWRkLCB7b25DbGljazogdGhpcy5oYW5kbGVHcmlkQnRuQ2xpY2ssIHJlZjogXCJncmlkLWJ1dHRvbi1hZGRcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEdyaWRCdXR0b25FZGl0LCB7b25DbGljazogdGhpcy5oYW5kbGVHcmlkQnRuQ2xpY2ssIHJlZjogXCJncmlkLWJ1dHRvbi1lZGl0XCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcmlkQnV0dG9uRGVsZXRlLCB7b25DbGljazogdGhpcy5oYW5kbGVHcmlkQnRuQ2xpY2ssIHJlZjogXCJncmlkLWJ1dHRvbi1kZWxldGVcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NSb3d9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhR3JpZCwge3NvdXJjZTogXCJkZXRhaWxzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZERhdGE6IHRoaXMuc3RhdGUuZ3JpZERhdGEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZENvbHVtbnM6IHRoaXMuc3RhdGUuZ3JpZENvbmZpZywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVHcmlkUm93OiB0aGlzLmhhbmRsZUdyaWRSb3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZGF0YS1ncmlkXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7dGl0bGU6IFwiU3VtbWEgXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiU3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImlucHV0LXN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEuc3VtbWEsIGRpc2FibGVkOiBcInRydWVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwiXlswLTldKyhcXFxcLlswLTldezEsNH0pPyRcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHt0aXRsZTogXCJLw6RpYmVtYWtzIFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtibVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLw6RpYmVtYWtzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dC1rYm1cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLmtibSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwiXlswLTldKyhcXFxcLlswLTldezEsNH0pPyRcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5ncmlkUm93RWRpdCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZFJvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJtb2RhbFBhZ2VDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGJ0bkV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgLy8g0L7RgtGA0LDQsdC+0YLQsNC10LwgT2sg0LjQtyDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsFxyXG4gICAgICAgIGxldCBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGRvY0RhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGEsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gdGhpcy5zdGF0ZS5ncmlkQ29uZmlnLFxyXG4gICAgICAgICAgICBncmlkUm93ID0gdGhpcy5zdGF0ZS5ncmlkUm93RGF0YTtcclxuXHJcbiAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcclxuXHJcbiAgICAgICAgICAgIC8vINC40YnQtdC8INC/0L4g0LjQtCDRgdGC0YDQvtC60YMg0LIg0LTQsNC90L3Ri9GFINCz0YDQuNC00LAsINC10YHQu9C4INC90LXRgiwg0YLQviDQtNC+0LHQsNCy0LjQvCDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgaWYgKCFncmlkRGF0YS5zb21lKGZ1bmN0aW9uKHJvdykgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93LmlkID09PSBncmlkUm93LmlkKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQstGB0YLQsNCy0LrQsCDQvdC+0LLQvtC5INGB0YLRgNC+0LrQuFxyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEuc3BsaWNlKDAsIDAsIGdyaWRSb3cpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEgPSBncmlkRGF0YS5tYXAoZnVuY3Rpb24ocm93KSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT09IGdyaWRSb3cuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0L3QsNGI0LvQuCwg0LfQsNC80LXRidCw0LXQvFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ3JpZFJvdztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb2NEYXRhID0gdGhpcy5yZWNhbGNEb2NTdW1tYShkb2NEYXRhKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtncmlkUm93RWRpdDogZmFsc2UsIGdyaWREYXRhOiBncmlkRGF0YSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJoYW5kbGVQYWdlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihwYWdlKSB7XHJcbiAgICAgICAgaWYgKHBhZ2UuZG9jSWQpIHtcclxuICAgICAgICAgICAgbGV0IHVybCA9IFwiL2RvY3VtZW50L1wiICsgcGFnZS5kb2NUeXBlSWQgKyBwYWdlLmRvY0lkO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xyXG4gICAgICAgIH1cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJoYW5kbGVTZWxlY3RUYXNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIC8vINC80LXRgtC+0LQg0LLRi9C30YvQstCw0LXRgtGB0Y8g0L/RgNC4INCy0YvQsdC+0YDQtSDQt9Cw0LTQsNGH0LhcclxuICAgICAgICB2YXIgdGFza1ZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiaGFuZGxlVG9vbGJhckV2ZW50c1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgLy8gdG9vbGJhciBldmVudCBoYW5kbGVyXHJcblxyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcclxuICAgICAgICAgICAgY2FzZSAnQ0FOQ0VMJzpcclxuICAgICAgICAgICAgICAgIGxldCBiYWNrdXAgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5iYWNrdXA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkb2NEYXRhOiBiYWNrdXAucm93LCBncmlkRGF0YTogYmFja3VwLmRldGFpbHMsIHdhcm5pbmc6ICcnfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2hhbmRsZVRvb2xiYXJFdmVudHMsIG5vIGV2ZW50IGhhbmRsZXIgZm9yICcsIGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiaGFuZGxlSW5wdXRDaGFuZ2VcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihpbnB1dE5hbWUsIGlucHV0VmFsdWUpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQuNC30LzQtdC90LXQvdC40LlcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG4gICAgICAgIGRhdGFbaW5wdXROYW1lXSA9IGlucHV0VmFsdWU7XHJcbiAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwicHJlcGFpcmVUb29sQmFyUGFyYW1ldGVyc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGlzRWRpdE1vZGUpIHtcclxuICAgICAgICBsZXQgdG9vbGJhclBhcmFtcyA9IHtcclxuICAgICAgICAgICAgYnRuQWRkOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OiAhaXNFZGl0TW9kZSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0VkaXRNb2RlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJ0bkVkaXQ6IHtcclxuICAgICAgICAgICAgICAgIHNob3c6ICFpc0VkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGlzRWRpdE1vZGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnRuUHJpbnQ6IHtcclxuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBidG5TYXZlOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OiBpc0VkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdG9vbGJhclBhcmFtcztcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJoYW5kbGVHcmlkQnRuQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihidG5OYW1lLCBpZCkge1xyXG4gICAgICAgIHN3aXRjaCAoYnRuTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlICdhZGQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSb3coKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdlZGl0JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdFJvdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVJvdygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImRlbGV0ZVJvd1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINGD0LTQsNC70LjRgiDQsNC60YLQuNCy0L3Rg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgIGxldCBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGdyaWRBY3RpdmVSb3cgPSB0aGlzLnJlZnNbJ2RhdGEtZ3JpZCddLnN0YXRlLmFjdGl2ZVJvdyxcclxuICAgICAgICAgICAgZG9jRGF0YSA9IHRoaXMuc3RhdGUuZG9jRGF0YTtcclxuXHJcbiAgICAgICAgZ3JpZERhdGEuc3BsaWNlKGdyaWRBY3RpdmVSb3csIDEpO1xyXG5cclxuICAgICAgICAvLyDQv9C10YDQtdGA0LDRgdGH0LXRgiDQuNGC0L7Qs9C+0LJcclxuICAgICAgICBkb2NEYXRhID0gdGhpcy5yZWNhbGNEb2NTdW1tYShkb2NEYXRhKTtcclxuXHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdC40Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZERhdGE6IGdyaWREYXRhLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiZWRpdFJvd1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0YLQutGA0L7QtdGCINCw0LrRgtC40LLQvdGD0Y4g0YHRgtGA0L7QutGDINC00LvRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgbGV0IGdyaWREYXRhID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZ3JpZEFjdGl2ZVJvdyA9IHRoaXMucmVmc1snZGF0YS1ncmlkJ10uc3RhdGUuYWN0aXZlUm93LFxyXG4gICAgICAgICAgICBncmlkUm93ID0gZ3JpZERhdGFbZ3JpZEFjdGl2ZVJvd107XHJcblxyXG4gICAgICAgIC8vINC+0YLQutGA0L7QtdC8INC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QviDQtNC70Y8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiB0cnVlLCBncmlkUm93RXZlbnQ6ICdlZGl0JywgZ3JpZFJvd0RhdGE6IGdyaWRSb3d9KTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJhZGRSb3dcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQtNC+0LHQsNCy0LjRgiDQsiDRgdC+0YHRgtC+0Y/QvdC40LUg0L3QvtCy0YPRjiDRgdGC0YDQvtC60YNcclxuXHJcbiAgICAgICAgbGV0IGdyaWRDb2x1bW5zID0gdGhpcy5zdGF0ZS5ncmlkQ29uZmlnLFxyXG4gICAgICAgICAgICBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIG5ld1JvdyA9IG5ldyBPYmplY3QoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkQ29sdW1ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZmllbGQgPSBncmlkQ29sdW1uc1tpXS5pZDtcclxuICAgICAgICAgICAgbmV3Um93W2ZpZWxkXSA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmV3Um93LmlkID0gJ05FVycgKyBNYXRoLnJhbmRvbSgpOyAvLyDQs9C10L3QtdGA0LjQvCDQvdC+0LLQvtC1INC40LRcclxuXHJcbiAgICAgICAgLy8g0L7RgtC60YDQvtC10Lwg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+INC00LvRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IHRydWUsIGdyaWRSb3dFdmVudDogJ2FkZCcsIGdyaWRSb3dEYXRhOiBuZXdSb3d9KTtcclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiY3JlYXRlR3JpZFJvd1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vQHRvZG8g0LLRi9C90LXRgdGC0Lgg0LIg0L7RgtC00LXQu9GM0L3Ri9C5INGE0LDQudC7XHJcbiAgICAgICAgbGV0IHN0eWxlID0ge1xyXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICBtYXJnaW46ICcxMCUgMzAlIDEwJSAzMCUnLFxyXG4gICAgICAgICAgICB3aWR0aDogJ2F1dG8nLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAnMScsXHJcbiAgICAgICAgICAgIHRvcDogJzEwMHB4J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCByb3cgPSBPYmplY3QuYXNzaWduKHt9LHRoaXMuc3RhdGUuZ3JpZFJvd0RhdGEpLFxyXG4gICAgICAgICAgICB2YWxpZGF0ZU1lc3NhZ2UgPSAnJyxcclxuICAgICAgICAgICAgbW9kYWxPYmplY3RzID0gWydidG5PaycsJ2J0bkNhbmNlbCddLFxyXG4gICAgICAgICAgICBidXR0b25Pa1JlYWRPbmx5ID0gdmFsaWRhdGVNZXNzYWdlLmxlbmd0aCA+IDAgfHwgIXRoaXMuc3RhdGUuY2hlY2tlZDtcclxuXHJcbiAgICAgICAgaWYgKGJ1dHRvbk9rUmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgLy8g0YPQsdC10YDQtdC8INC60L3QvtC/0LrRgyDQntC6XHJcbiAgICAgICAgICAgIG1vZGFsT2JqZWN0cy5zcGxpY2UoMCwxKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoIXJvdykgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCk7XHJcblxyXG4gICAgICAgIGxldCBub21EYXRhID0gdGhpcy5zdGF0ZS5saWJzWydub21lbmNsYXR1cmUnXS5maWx0ZXIoZnVuY3Rpb24obGliKSAge1xyXG4gICAgICAgICAgICBpZiAoIWxpYi5kb2sgfHwgbGliLmRvayA9PT0gTElCRE9LKSByZXR1cm4gbGliO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCIubW9kYWxQYWdlXCJ9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2UsIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsT2JqZWN0czogbW9kYWxPYmplY3RzLCBcclxuICAgICAgICAgICAgICAgIHJlZjogXCJtb2RhbHBhZ2UtZ3JpZC1yb3dcIiwgXHJcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLCBcclxuICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUNsaWNrLCBcclxuICAgICAgICAgICAgICAgIG1vZGFsUGFnZU5hbWU6IFwiUmVhIGxpc2FtaW5lIC8gcGFyYW5kYW1pbmVcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7cmVmOiBcImdyaWQtcm93LWNvbnRhaW5lclwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NSb3d9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHt0aXRsZTogXCJUZWVudXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJub21pZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcIm5vbWVuY2xhdHVyZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBub21EYXRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cubm9taWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogcm93Lmtvb2QsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJub21pZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJUZWVudXNlIGtvb2RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlR3JpZFJvd0NoYW5nZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NSb3d9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge3RpdGxlOiBcIktvZ3VzIFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia29ndXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LmtvZ3VzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrb2d1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUdyaWRSb3dJbnB1dH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NSb3d9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge3RpdGxlOiBcIkhpbmQgXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJoaW5kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5oaW5kLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJoaW5kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlR3JpZFJvd0lucHV0fSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7dGl0bGU6IFwiS2JtLXRhOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtibXRhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5rYm10YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImtibXRhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlR3JpZFJvd0NoYW5nZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NSb3d9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge3RpdGxlOiBcIktibTogXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrYm1cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LmtibSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImtibVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVHcmlkUm93SW5wdXR9KVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHt0aXRsZTogXCJTdW1tYTogXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJTdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cuc3VtbWEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUdyaWRSb3dJbnB1dH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHZhbGlkYXRlTWVzc2FnZSkpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJoYW5kbGVHcmlkUm93Q2hhbmdlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0L3QsCDRhNC+0YDQvNC1XHJcbiAgICAgICAgbGV0IHJvd0RhdGEgPSBPYmplY3Qoe30sdGhpcy5zdGF0ZS5ncmlkUm93RGF0YSk7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gcm93RGF0YVtuYW1lXSAmJiBuYW1lID09PSAnbm9taWQnKSB7XHJcbiAgICAgICAgICAgIC8vINC/0YDQvtC40LfQvtGI0LvQviDQuNC30LzQtdC90LXQvdC40LUg0YPRgdC70YPQs9C4LCDQvtCx0L3Rg9C70LjQvCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgICAgICAgIHJvd0RhdGFbJ2tvZ3VzJ10gPSAwO1xyXG4gICAgICAgICAgICByb3dEYXRhWydoaW5kJ10gPSAwO1xyXG4gICAgICAgICAgICByb3dEYXRhWydzdW1tYSddID0gMDtcclxuICAgICAgICAgICAgcm93RGF0YVsna2JtJ10gPSAwO1xyXG4gICAgICAgICAgICByb3dEYXRhWydrYm10YSddID0gMDtcclxuICAgICAgICAgICAgcm93RGF0YVsnbm9taWQnXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDQuNGJ0LXQvCDQv9C+INGB0L/RgNCw0LLQvtGH0L3QuNC60YMg0L/QvtC70Y8g0LrQvtC0INC4INC90LDQuNC80LXQvdC+0LLQsNC90LjQtVxyXG5cclxuICAgICAgICBsZXQgbGliRGF0YSA9IHRoaXMuc3RhdGUubGlic1snbm9tZW5jbGF0dXJlJ107XHJcbiAgICAgICAgbGliRGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHJvdykgIHtcclxuICAgICAgICAgICAgaWYgKHJvdy5pZCA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcm93RGF0YVsna29vZCddID0gcm93Lmtvb2Q7XHJcbiAgICAgICAgICAgICAgICByb3dEYXRhWyduaW1ldHVzJ10gPSByb3cubmFtZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByb3dEYXRhW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0RhdGE6IHJvd0RhdGF9KTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRlR3JpZFJvdygpO1xyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJoYW5kbGVHcmlkUm93SW5wdXRcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIC8vINC/0LXRgNC10YHRh9C10YIg0YHRg9C80LxcclxuICAgICAgICBsZXQgcm93RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sdGhpcy5zdGF0ZS5ncmlkUm93RGF0YSk7XHJcbiAgICAgICAgcm93RGF0YVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIHJvd0RhdGEgPSB0aGlzLnJlY2FsY1Jvd1N1bW0ocm93RGF0YSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0RhdGE6IHJvd0RhdGF9KTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRlR3JpZFJvdygpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcInJlY2FsY1Jvd1N1bW1cIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihncmlkUm93RGF0YSkge1xyXG4gICAgICAgIC8vINC/0LXRgNC10YDQsNGB0YfQtdGCINGB0YPQvNC80Ysg0YHRgtGA0L7QutC4INC4INGA0LDRgdGH0LXRgiDQvdCw0LvQvtCz0LBcclxuICAgICAgICBncmlkUm93RGF0YVsna29ndXMnXSA9IE51bWJlcihncmlkUm93RGF0YS5rb2d1cyk7XHJcbiAgICAgICAgZ3JpZFJvd0RhdGFbJ2hpbmQnXSA9IE51bWJlcihncmlkUm93RGF0YS5oaW5kKTtcclxuICAgICAgICBncmlkUm93RGF0YVsna2JtdGEnXSA9IE51bWJlcihncmlkUm93RGF0YVsna29ndXMnXSkgKiBOdW1iZXIoZ3JpZFJvd0RhdGFbJ2hpbmQnXSk7XHJcbiAgICAgICAgZ3JpZFJvd0RhdGFbJ2tibSddID0gTnVtYmVyKGdyaWRSb3dEYXRhWydrYm10YSddICogMC4yMCk7IC8vIEB0b2RvINCy0YDQvNC10L3QvdC+XHJcbiAgICAgICAgZ3JpZFJvd0RhdGFbJ3N1bW1hJ10gPSBOdW1iZXIoZ3JpZFJvd0RhdGFbJ2tibXRhJ10pICsgTnVtYmVyKGdyaWRSb3dEYXRhWydrYm0nXSk7XHJcblxyXG4gICAgICAgIHJldHVybiBncmlkUm93RGF0YTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJyZWNhbGNEb2NTdW1tYVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGRvY0RhdGEpIHtcclxuICAgICAgICBsZXQgZ3JpZERhdGEgPSBPYmplY3QuYXNzaWduKFtdLHRoaXMuc3RhdGUuZ3JpZERhdGEpO1xyXG5cclxuICAgICAgICBkb2NEYXRhWydzdW1tYSddID0gMDtcclxuICAgICAgICBkb2NEYXRhWydrYm0nXSA9IDA7XHJcbiAgICAgICAgZ3JpZERhdGEuZm9yRWFjaChmdW5jdGlvbihyb3cpICB7XHJcbiAgICAgICAgICAgIGRvY0RhdGFbJ3N1bW1hJ10gKz0gTnVtYmVyKHJvd1snc3VtbWEnXSk7XHJcbiAgICAgICAgICAgIGRvY0RhdGFbJ2tibSddICs9IE51bWJlcihyb3dbJ2tibSddKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZG9jRGF0YTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJ2YWxpZGF0ZUdyaWRSb3dcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyB3aWxsIGNoZWNrIHZhbHVlcyBvbiB0aGUgZm9ybSBhbmQgcmV0dXJuIHN0cmluZyB3aXRoIHdhcm5pbmdcclxuICAgICAgICBsZXQgd2FybmluZyA9ICcnLFxyXG4gICAgICAgICAgICBncmlkUm93RGF0YSA9IHRoaXMuc3RhdGUuZ3JpZFJvd0RhdGE7XHJcbiAgICAgICAgLy8g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0L/RgNC+0LLQtdGA0LrQuCDRhNC+0YDQvNGLINC90LAg0LLQsNC70LjQtNC90L7RgdGC0YxcclxuICAgICAgICBpZiAoIWdyaWRSb3dEYXRhWydub21pZCddKSB3YXJuaW5nID0gd2FybmluZyArICcg0LrQvtC0INGD0YHQu9GD0LPQuCc7XHJcbiAgICAgICAgaWYgKCFncmlkUm93RGF0YVsna29ndXMnXSkgd2FybmluZyA9IHdhcm5pbmcgKyAnINC60L7Quy3QstC+JztcclxuICAgICAgICBpZiAoIWdyaWRSb3dEYXRhWydoaW5kJ10pIHdhcm5pbmcgPSB3YXJuaW5nICsgJyDRhtC10L3QsCc7XHJcblxyXG4gICAgICAgIGlmICh3YXJuaW5nLmxlbmd0aCA+IDIpIHtcclxuICAgICAgICAgICAgLy8g0LXRgdGC0Ywg0L/RgNC+0LHQu9C10LzRi1xyXG4gICAgICAgICAgICB3YXJuaW5nID0gJ9Ce0YLRgdGD0YLRgdCy0YPRjtGCINC00LDQvdC90YvQtTonICsgd2FybmluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hlY2tlZDogdHJ1ZSwgd2FybmluZzogd2FybmluZ30pO1xyXG4gICAgfX0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbkFydmUuUHJvcFR5cGVzID0ge1xyXG4gICAgZG9jRGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgYnBtOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICBlZGl0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgc2hvd01lc3NhZ2VCb3g6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBncmlkRGF0YTogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgcmVsYXRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICBncmlkQ29uZmlnOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICBncmlkUm93RWRpdDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBncmlkUm93RXZlbnQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBncmlkUm93RGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuICAgIGxpYnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBjaGVja2VkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIHdhcm5pbmc6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcclxuXHJcbn1cclxuXHJcblxyXG4vKlxyXG4gQXJ2ZS5kZWZhdWx0UHJvcHMgPSB7XHJcbiBkaXNhYmxlZDogZmFsc2UsXHJcbiBzaG93OiB0cnVlXHJcbiB9O1xyXG4gKi9cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFydmU7XHJcblxyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2NzL2FydmUvYXJ2ZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgWERpc3BhdGNoZXIgPSByZXF1aXJlKCcuL3NyYy94RGlzcGF0Y2hlcicpLFxuICAgIFhTdG9yZSA9IHJlcXVpcmUoJy4vc3JjL3hTdG9yZScpO1xuXG4vLyNidWlsZFxuXG4vKipcclxuICogRmx1eGlmeSBjbGFzcyB0aGF0IHdpbGwgYmUgdXNlZCBhcyBhIHNpbmdsZXRvbi5cclxuICogSW5pdGlhbGl6ZXMgdGhlIGRpc3BhdGNoZXIgYW5kIHRoZSBzdG9yZS5cclxuICogQWxzbyBzZXQgdGhlIFByb21pc2Ugb2JqZWN0IGlmIGl0IGlzIGdsb2JhbGx5IGF2YWlsYWJsZS5cclxuICovXG52YXIgRmx1eGlmeSA9IGZ1bmN0aW9uIEZsdXhpZnkoKSB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnZGlzcGF0Y2hlcicsIHtcblx0XHR2YWx1ZTogbmV3IFhEaXNwYXRjaGVyKClcblx0fSk7XG5cblx0dGhpcy5zdG9yZXMgPSB7fTtcblxuXHRpZiAodHlwZW9mIFByb21pc2UgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHR0aGlzLnByb21pc2lmeShQcm9taXNlKTtcblx0fVxufTtcblxuRmx1eGlmeS5wcm90b3R5cGUgPSB7XG5cdC8qKlxyXG4gICogQ3JlYXRlIGEgbmV3IHN0b3JlLiBJZiBhbiBpZCBpcyBwYXNzZWQgaW4gdGhlIG9wdGlvbnMsXHJcbiAgKiB0aGUgc3RvcmUgd2lsbCBiZSByZWdpc3RlcmVkIGluIHRoZSBkaXNwYXRjaGVyIGFuZCBzYXZlZFxyXG4gICogaW4gZmx1eGlmeS5zdG9yZXNbaWRdLlxyXG4gICpcclxuICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyB7aWQsIGluaXRpYWxTdGF0ZSwgYWN0aW9uQ2FsbGJhY2t9XHJcbiAgKiBAcmV0dXJuIHtYU3RvcmV9XHJcbiAgKi9cblx0Y3JlYXRlU3RvcmU6IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKG9wdGlvbnMpIHtcblx0XHR2YXIgc3RvcmUgPSBuZXcgWFN0b3JlKG9wdGlvbnMpO1xuXG5cdFx0Ly8gSWYgdGhlIHN0b3JlIGhhcyBhbiBpZCwgcmVnaXN0ZXIgaXQgaW4gRmx1eGlmeSBhbmQgaW4gdGhlIGRpc3BhdGNoZXJcblx0XHRpZiAoc3RvcmUuX2lkKSB7XG5cdFx0XHR0aGlzLnN0b3Jlc1tzdG9yZS5faWRdID0gc3RvcmU7XG5cdFx0XHR0aGlzLmRpc3BhdGNoZXIucmVnaXN0ZXJTdG9yZShzdG9yZS5faWQsIHN0b3JlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gc3RvcmU7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBFeGVjdXRlcyBhbiBhY3Rpb24uIFRoZSBhcmd1bWVudHMgb2YgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGF2YWlsYWJsZVxyXG4gICogZm9yIHRoZSBhY3Rpb24gY2FsbGJhY2tzIHJlZ2lzdGVyZWQgaW4gdGhlIGRpc3BhdGNoZXIuXHJcbiAgKiBAcmV0dXJuIHsgUHJvbWlzZSB9IEEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHRoZSBhY3Rpb24gY2FsbGJhY2tzXHJcbiAgKiAgICAgICAgICAgICAgICAgICBoYXZlIGZpbmlzaGVkLlxyXG4gICovXG5cdGRvQWN0aW9uOiBmdW5jdGlvbiBkb0FjdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5kaXNwYXRjaGVyLmRpc3BhdGNoLmFwcGx5KHRoaXMuZGlzcGF0Y2hlciwgYXJndW1lbnRzKTtcblx0fSxcblxuXHQvKipcclxuICAqIElmIEVTNiBQcm9taXNlIG9iamVjdCBpcyBub3QgZGVmaW5lZCBnbG9iYWxseSBvciBwb2x5ZmlsbGVkLCBhIFByb21pc2Ugb2JqZWN0XHJcbiAgKiBjYW4gYmUgZ2l2ZW4gdG8gZmx1eGlmeSBpbiBvcmRlciB0byBtYWtlIGl0IHdvcmssIHVzaW5nIHRoaXMgbWV0aG9kLlxyXG4gICpcclxuICAqIEBwYXJhbSAgeyBQcm9taXNlIH0gUHJvbWlzZSBFUzYgUHJvbWlzZSBjb21wYXRpYmxlIG9iamVjdFxyXG4gICogQHJldHVybiB7IHVuZGVmaW5lZCB9XHJcbiAgKi9cblx0cHJvbWlzaWZ5OiBmdW5jdGlvbiBwcm9taXNpZnkoUHJvbWlzZSkge1xuXHRcdHRoaXMuX1Byb21pc2UgPSBQcm9taXNlO1xuXHRcdHRoaXMuZGlzcGF0Y2hlci5fUHJvbWlzZSA9IFByb21pc2U7XG5cdH1cbn07XG5cbi8vI2J1aWxkXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEZsdXhpZnkoKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmx1eGlmeS9mbHV4aWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIid1c2Ugc3RyaWN0JztcblxuLy8jYnVpbGRcblxuLyoqXHJcbiAqIFRoZSBhc3luY2hyb25vdXMgZGlzcGF0Y2hlciBjb21wYXRpYmxlIHdpdGggRmFjZWJvb2sncyBmbHV4IGRpc3BhdGNoZXJcclxuICogaHR0cDovL2ZhY2Vib29rLmdpdGh1Yi5pby9mbHV4L2RvY3MvZGlzcGF0Y2hlci5odG1sXHJcbiAqXHJcbiAqIERpc3BhdGNoIGFjdGlvbnMgdG8gdGhlIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLCB0aG9zZSBhY3Rpb24gY2FuIGJlXHJcbiAqIGFzeW5jaHJvbm91cyBpZiB0aGV5IHJldHVybiBhIFByb21pc2UuXHJcbiAqL1xuXG52YXIgWERpc3BhdGNoZXIgPSBmdW5jdGlvbiBYRGlzcGF0Y2hlcigpIHtcblx0dGhpcy5fY2FsbGJhY2tzID0ge307XG5cdHRoaXMuX2Rpc3BhdGNoUXVldWUgPSBbXTtcblx0dGhpcy5fY3VycmVudERpc3BhdGNoID0gZmFsc2U7XG5cdHRoaXMuX0lEID0gMTtcblxuXHRpZiAodHlwZW9mIFByb21pc2UgIT0gJ3VuZGVmaW5lZCcpIHtcblx0XHR0aGlzLl9Qcm9taXNlID0gUHJvbWlzZTtcblx0fVxufTtcblxuWERpc3BhdGNoZXIucHJvdG90eXBlID0ge1xuXG5cdC8qKlxyXG4gICogUmVnaXN0ZXIgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQuXHJcbiAgKlxyXG4gICogQHBhcmFtICB7U3RyaW5nIHwgRnVuY3Rpb259ICAgaWQgIElmIGEgc3RyaW5nIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB0aGUgaWQgb2YgdGhlIGNhbGxiYWNrLlxyXG4gICogICAgICAgICAgICAgICAgICBJZiBhIGZ1bmN0aW9uIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIGFzIGNhbGxiYWNrLCBhbmQgaWQgaXMgZ2VuZXJhdGVkXHJcbiAgKiAgICAgICAgICAgICAgICAgIGF1dG9tYXRpY2FsbHkuXHJcbiAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgSWYgYW4gaWQgaXMgcGFzc2VkIGFzIGEgZmlyc3QgYXJndW1lbnQsIHRoaXMgd2lsbCBiZSB0aGUgY2FsbGJhY2suXHJcbiAgKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgICAgVGhlIGlkIG9mIHRoZSBjYWxsYmFjayB0byBiZSB1c2VkIHdpdGggdGhlIHdhaXRGb3IgbWV0aG9kLlxyXG4gICovXG5cdHJlZ2lzdGVyOiBmdW5jdGlvbiByZWdpc3RlcihpZCwgY2FsbGJhY2spIHtcblx0XHR2YXIgSUQgPSBpZDtcblxuXHRcdC8vIElmIHRoZSBjYWxsYmFjayBpcyB0aGUgZmlyc3QgcGFyYW1ldGVyXG5cdFx0aWYgKHR5cGVvZiBpZCA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRJRCA9ICdJRF8nICsgdGhpcy5fSUQ7XG5cdFx0XHRjYWxsYmFjayA9IGlkO1xuXHRcdH1cblxuXHRcdHRoaXMuX2NhbGxiYWNrc1tJRF0gPSBjYWxsYmFjaztcblx0XHR0aGlzLl9JRCsrO1xuXG5cdFx0cmV0dXJuIElEO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogUmVnaXN0ZXIgYSBYU3RvcmUgaW4gdGhlIGRpc3BhY2hlci4gWFN0b3JlcyBoYXMgYSBtZXRob2QgY2FsbGVkIGNhbGxiYWNrLiBUaGUgZGlzcGF0Y2hlclxyXG4gICogcmVnaXN0ZXIgdGhhdCBmdW5jdGlvbiBhcyBhIHJlZ3VsYXIgY2FsbGJhY2suXHJcbiAgKlxyXG4gICogQHBhcmFtICB7U3RyaW5nfSBpZCAgICAgVGhlIGlkIGZvciB0aGUgc3RvcmUgdG8gYmUgdXNlZCBpbiB0aGUgd2FpdEZvciBtZXRob2QuXHJcbiAgKiBAcGFyYW0gIHtYU3RvcmV9IHhTdG9yZSBTdG9yZSB0byByZWdpc3RlciBpbiB0aGUgZGlzcGF0Y2hlclxyXG4gICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgVGhlIGlkIG9mIHRoZSBjYWxsYmFjayB0byBiZSB1c2VkIHdpdGggdGhlIHdhaXRGb3IgbWV0aG9kLlxyXG4gICovXG5cdHJlZ2lzdGVyU3RvcmU6IGZ1bmN0aW9uIHJlZ2lzdGVyU3RvcmUoaWQsIHhTdG9yZSkge1xuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHhTdG9yZSwgJ19kaXNwYXRjaGVyJywge1xuXHRcdFx0dmFsdWU6IHRoaXNcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzLnJlZ2lzdGVyKGlkLCB4U3RvcmUuY2FsbGJhY2spO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogVW5yZWdpc3RlciBhIGNhbGxiYWNrIGdpdmVuIGl0cyBpZC5cclxuICAqXHJcbiAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkIENhbGxiYWNrL1N0b3JlIGlkXHJcbiAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XHJcbiAgKi9cblx0dW5yZWdpc3RlcjogZnVuY3Rpb24gdW5yZWdpc3RlcihpZCkge1xuXHRcdGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbaWRdO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogQ3JlYXRlcyBhIHByb21pc2UgYW5kIHdhaXRzIGZvciB0aGUgY2FsbGJhY2tzIHNwZWNpZmllZCB0byBjb21wbGV0ZSBiZWZvcmUgcmVzb2x2ZSBpdC5cclxuICAqIElmIGl0IGlzIHVzZWQgYnkgYW4gYWN0aW9uQ2FsbGJhY2ssIHRoZSBwcm9taXNlIHNob3VsZCBiZSByZXNvbHZlZCB0byBsZXQgb3RoZXIgY2FsbGJhY2tzXHJcbiAgKiB3YWl0IGZvciBpdCBpZiBuZWVkZWQuXHJcbiAgKlxyXG4gICogQmUgY2FyZWZ1bCBvZiBub3QgdG8gd2FpdCBieSBhIGNhbGxiYWNrIHRoYXQgaXMgd2FpdGluZyBieSB0aGUgY3VycmVudCBjYWxsYmFjaywgb3IgdGhlXHJcbiAgKiBwcm9taXNlcyB3aWxsIG5ldmVyIGZ1bGZpbGwuXHJcbiAgKlxyXG4gICogQHBhcmFtICB7U3RyaW5nPEFycmF5PnxTdHJpbmd9IGlkcyBUaGUgaWQgb3IgaWRzIG9mIHRoZSBjYWxsYmFja3Mvc3RvcmVzIHRvIHdhaXQgZm9yLlxyXG4gICogQHJldHVybiB7UHJvbWlzZX0gQSBwcm9taXNlIHRvIGJlIHJlc29sdmVkIHdoZW4gdGhlIHNwZWNpZmllZCBjYWxsYmFja3MgYXJlIGNvbXBsZXRlZC5cclxuICAqL1xuXHR3YWl0Rm9yOiBmdW5jdGlvbiB3YWl0Rm9yKGlkcykge1xuXHRcdHZhciBwcm9taXNlcyA9IFtdLFxuXHRcdCAgICBpID0gMDtcblxuXHRcdGlmICghQXJyYXkuaXNBcnJheShpZHMpKSBpZHMgPSBbaWRzXTtcblxuXHRcdGZvciAoOyBpIDwgaWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodGhpcy5fcHJvbWlzZXNbaWRzW2ldXSkgcHJvbWlzZXMucHVzaCh0aGlzLl9wcm9taXNlc1tpZHNbaV1dKTtcblx0XHR9XG5cblx0XHRpZiAoIXByb21pc2VzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX1Byb21pc2UucmVzb2x2ZSgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX1Byb21pc2UuYWxsKHByb21pc2VzKTtcblx0fSxcblxuXHQvKipcclxuICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uIHRvIGFsbCB0aGUgcmVnaXN0ZXJlZCBjYWxsYmFja3Mvc3RvcmVzLlxyXG4gICpcclxuICAqIElmIGEgc2Vjb25kIGFjdGlvbiBpcyBkaXNwYXRjaGVkIHdoaWxlIHRoZXJlIGlzIGEgZGlzcGF0Y2ggb24sIGl0IHdpbGwgYmVcclxuICAqIGVucXVldWVkIGFuIGRpc3BhdGNoZWQgYWZ0ZXIgdGhlIGN1cnJlbnQgb25lLlxyXG4gICpcclxuICAqIEByZXR1cm4geyBQcm9taXNlIH0gQSBwcm9taXNlIHRvIGJlIHJlc29sdmVkIHdoZW4gYWxsIHRoZSBjYWxsYmFja3MgaGF2ZSBmaW5pc2VkLlxyXG4gICovXG5cdGRpc3BhdGNoOiBmdW5jdGlvbiBkaXNwYXRjaCgpIHtcblx0XHR2YXIgbWUgPSB0aGlzLFxuXHRcdCAgICBkaXNwYXRjaEFyZ3VtZW50cyA9IGFyZ3VtZW50cyxcblx0XHQgICAgcHJvbWlzZSxcblx0XHQgICAgZGVxdWV1ZTtcblxuXHRcdGlmICghdGhpcy5fUHJvbWlzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignTm8gcHJvbWlzZXMuJyk7XG5cblx0XHQvLyBJZiB3ZSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhIGRpc3BhdGNoLCBlbnF1ZXVlIHRoZSBkaXNwYXRjaFxuXHRcdGlmICh0aGlzLl9jdXJyZW50RGlzcGF0Y2gpIHtcblxuXHRcdFx0Ly8gRGlzcGF0Y2ggYWZ0ZXIgdGhlIGN1cnJlbnQgb25lXG5cdFx0XHRwcm9taXNlID0gdGhpcy5fY3VycmVudERpc3BhdGNoLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gbWUuX2Rpc3BhdGNoLmFwcGx5KG1lLCBkaXNwYXRjaEFyZ3VtZW50cyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gRW5xdWV1ZSwgc2V0IHRoZSBjaGFpbiBhcyB0aGUgY3VycmVudCBwcm9taXNlIGFuZCByZXR1cm5cblx0XHRcdHRoaXMuX2Rpc3BhdGNoUXVldWUucHVzaChwcm9taXNlKTtcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50RGlzcGF0Y2ggPSBwcm9taXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLl9jdXJyZW50RGlzcGF0Y2ggPSB0aGlzLl9kaXNwYXRjaC5hcHBseShtZSwgZGlzcGF0Y2hBcmd1bWVudHMpO1xuXHR9LFxuXG5cdC8qKlxyXG4gICogRGlzcGF0Y2hlcyBhbiBhY3Rpb24gaW5tZWRpYXRlbGx5LlxyXG4gICpcclxuICAqIEByZXR1cm4ge1Byb21pc2V9IEEgcHJvbWlzZSB0byBiZSByZXNvbHZlZCB3aGVuIGFsbCB0aGUgY2FsbGJhY2tzIGhhdmUgZmluaXNlZC5cclxuICAqL1xuXHRfZGlzcGF0Y2g6IGZ1bmN0aW9uIF9kaXNwYXRjaCgpIHtcblx0XHR2YXIgbWUgPSB0aGlzLFxuXHRcdCAgICBkaXNwYXRjaEFyZ3VtZW50cyA9IGFyZ3VtZW50cyxcblx0XHQgICAgcHJvbWlzZXMgPSBbXTtcblxuXHRcdHRoaXMuX3Byb21pc2VzID0gW107XG5cblx0XHQvLyBBIGNsb3N1cmUgaXMgbmVlZGVkIGZvciB0aGUgY2FsbGJhY2sgaWRcblx0XHRPYmplY3Qua2V5cyh0aGlzLl9jYWxsYmFja3MpLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG5cblx0XHRcdC8vIEFsbCB0aGUgcHJvbWlzZXMgbXVzdCBiZSBzZXQgaW4gbWUuX3Byb21pc2VzIGJlZm9yZSB0cnlpbmcgdG8gcmVzb2x2ZVxuXHRcdFx0Ly8gaW4gb3JkZXIgdG8gbWFrZSB3YWl0Rm9yIHdvcmsgb2tcblx0XHRcdG1lLl9wcm9taXNlc1tpZF0gPSBtZS5fUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBtZS5fY2FsbGJhY2tzW2lkXS5hcHBseShtZSwgZGlzcGF0Y2hBcmd1bWVudHMpO1xuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVyci5zdGFjayB8fCBlcnIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHByb21pc2VzLnB1c2gobWUuX3Byb21pc2VzW2lkXSk7XG5cdFx0fSk7XG5cblx0XHQvL1xuXHRcdHZhciBkZXF1ZXVlID0gZnVuY3Rpb24gZGVxdWV1ZSgpIHtcblx0XHRcdG1lLl9kaXNwYXRjaFF1ZXVlLnNoaWZ0KCk7XG5cdFx0XHRpZiAoIW1lLl9kaXNwYXRjaFF1ZXVlLmxlbmd0aCkgbWUuX2N1cnJlbnREaXNwYXRjaCA9IGZhbHNlO1xuXHRcdH07XG5cblx0XHRyZXR1cm4gdGhpcy5fUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZGVxdWV1ZSwgZGVxdWV1ZSk7XG5cdH0sXG5cblx0LyoqXHJcbiAgKiBJcyB0aGlzIGRpc3BhdGNoZXIgY3VycmVudGx5IGRpc3BhdGNoaW5nLlxyXG4gICpcclxuICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgKi9cblx0aXNEaXNwYXRjaGluZzogZnVuY3Rpb24gaXNEaXNwYXRjaGluZygpIHtcblx0XHRyZXR1cm4gISF0aGlzLl9kaXNwYXRjaFF1ZXVlLmxlbmd0aDtcblx0fVxuXG59O1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFhEaXNwYXRjaGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mbHV4aWZ5L3NyYy94RGlzcGF0Y2hlci5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBYRW1pdHRlciA9IHJlcXVpcmUoJy4veEVtaXR0ZXInKSxcbiAgICB4VXRpbHMgPSByZXF1aXJlKCcuL3hVdGlscycpO1xuXG4vLyNidWlsZFxuXG52YXIgU3RvcmUgPSBYRW1pdHRlci5fZXh0ZW5kKHtcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShwcm9wcykge1xuXHRcdGlmICghcHJvcHMpIHJldHVybiB0aGlzLnByb3BzID0ge307XG5cblx0XHR0aGlzLnByb3BzID0ge307XG5cdFx0Zm9yICh2YXIgcCBpbiBwcm9wcykge1xuXHRcdFx0dGhpcy5wcm9wc1twXSA9IHByb3BzW3BdO1xuXHRcdH1cblx0fSxcblxuXHRnZXQ6IGZ1bmN0aW9uIGdldChwcm9wKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHNbcHJvcF07XG5cdH0sXG5cblx0c2V0OiBmdW5jdGlvbiBzZXQocHJvcCwgdmFsdWUpIHtcblx0XHR2YXIgcHJvcHMgPSBwcm9wLFxuXHRcdCAgICB1cGRhdGVzID0gW10sXG5cdFx0ICAgIHByZXZpb3VzVmFsdWUsXG5cdFx0ICAgIHA7XG5cblx0XHRpZiAodHlwZW9mIHZhbHVlICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRwcm9wcyA9IHt9O1xuXHRcdFx0cHJvcHNbcHJvcF0gPSB2YWx1ZTtcblx0XHR9XG5cblx0XHRmb3IgKHAgaW4gcHJvcHMpIHtcblx0XHRcdGlmICh0aGlzLnByb3BzW3BdICE9IHByb3BzW3BdKSB7XG5cdFx0XHRcdHByZXZpb3VzVmFsdWUgPSB0aGlzLnByb3BzW3BdO1xuXHRcdFx0XHR0aGlzLnByb3BzW3BdID0gcHJvcHNbcF07XG5cdFx0XHRcdHVwZGF0ZXMucHVzaCh7XG5cdFx0XHRcdFx0cHJvcDogcCxcblx0XHRcdFx0XHRwcmV2aW91c1ZhbHVlOiBwcmV2aW91c1ZhbHVlLFxuXHRcdFx0XHRcdHZhbHVlOiBwcm9wc1twXVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodXBkYXRlcy5sZW5ndGgpIHRoaXMuZW1pdCgnY2hhbmdlJywgdXBkYXRlcyk7XG5cdH1cbn0pO1xuXG52YXIgWFN0b3JlID0gWEVtaXR0ZXIuX2V4dGVuZCh7XG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUob3B0aW9ucykge1xuXHRcdHZhciBtZSA9IHRoaXMsXG5cdFx0ICAgIG9wdHMgPSBvcHRpb25zIHx8IHt9LFxuXHRcdCAgICBzdG9yZSA9IG5ldyBTdG9yZShvcHRzLmluaXRpYWxTdGF0ZSksXG5cdFx0ICAgIGFjdGlvblR5cGUsXG5cdFx0ICAgIHN0YXRlUHJvcDtcblxuXHRcdC8vIFN0b3JlIGlkXG5cdFx0aWYgKG9wdGlvbnMuaWQpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2lkJywge1xuXHRcdFx0XHR2YWx1ZTogb3B0aW9ucy5pZFxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVnaXN0ZXIgYWN0aW9uIGNhbGxiYWNrcyBpbiB0aGUgc3RvcmVcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG5cdFx0XHRfY2FsbGJhY2tzOiB7XG5cdFx0XHRcdHdyaXRhYmxlOiB0cnVlLFxuXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdHZhbHVlOiB7fVxuXHRcdFx0fSxcblx0XHRcdGFkZEFjdGlvbkNhbGxiYWNrczoge1xuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gdmFsdWUoY2xia3MpIHtcblx0XHRcdFx0XHRmb3IgKGFjdGlvblR5cGUgaW4gY2xia3MpIHtcblx0XHRcdFx0XHRcdG1lLl9jYWxsYmFja3NbYWN0aW9uVHlwZV0gPSBjbGJrc1thY3Rpb25UeXBlXS5iaW5kKHRoaXMsIHN0b3JlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8vIENhbGxiYWNrIGZvciByZWdpc3RlciBpbiB0aGUgZGlzcGF0Y2hlclxuXHRcdFx0Y2FsbGJhY2s6IHtcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgYWN0aW9uVHlwZSA9IGFyZ3VtZW50c1swXSxcblx0XHRcdFx0XHQgICAgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLl9jYWxsYmFja3NbYWN0aW9uVHlwZV0pIHtcblx0XHRcdFx0XHRcdC8vIFRoZSBjYWxsYmFja3MgYXJlIGFscmVhZHkgYm91bmQgdG8gdGhpcyB4U3RvcmUgYW5kIHRoZSBtdXRhYmxlIHN0b3JlXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fY2FsbGJhY2tzW2FjdGlvblR5cGVdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9LmJpbmQodGhpcylcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMuYWRkQWN0aW9uQ2FsbGJhY2tzKG9wdHMuYWN0aW9uQ2FsbGJhY2tzIHx8IHt9KTtcblxuXHRcdC8vIENyZWF0ZSBpbm1tdXRhYmxlIHByb3BlcnRpZXNcblx0XHR2YXIgYWRkUHJvcGVydHkgPSBmdW5jdGlvbiBhZGRQcm9wZXJ0eShwcm9wTmFtZSwgdmFsdWUpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtZSwgcHJvcE5hbWUsIHtcblx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdFx0Z2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0b3JlLmdldChwcm9wTmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRpZiAob3B0cy5pbml0aWFsU3RhdGUpIHtcblx0XHRcdGZvciAoc3RhdGVQcm9wIGluIG9wdHMuaW5pdGlhbFN0YXRlKSB7XG5cdFx0XHRcdGFkZFByb3BlcnR5KHN0YXRlUHJvcCwgb3B0cy5pbml0aWFsU3RhdGVbc3RhdGVQcm9wXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRW1pdCBvbiBzdG9yZSBjaGFuZ2Vcblx0XHRzdG9yZS5vbignY2hhbmdlJywgZnVuY3Rpb24gKHVwZGF0ZXMpIHtcblx0XHRcdHZhciB1cGRhdGVzTGVuZ3RoID0gdXBkYXRlcy5sZW5ndGgsXG5cdFx0XHQgICAgdXBkYXRlLFxuXHRcdFx0ICAgIGk7XG5cblx0XHRcdGZvciAoaSA9IDA7IGkgPCB1cGRhdGVzTGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dXBkYXRlID0gdXBkYXRlc1tpXTtcblxuXHRcdFx0XHQvLyBJZiB0aGUgcHJvcGVydHkgaXMgbmV3LCBhZGQgaXQgdG8gdGhlIHhTdG9yZVxuXHRcdFx0XHRpZiAoIW1lLmhhc093blByb3BlcnR5KHVwZGF0ZS5wcm9wKSkgYWRkUHJvcGVydHkodXBkYXRlLnByb3AsIHVwZGF0ZS52YWx1ZSk7XG5cblx0XHRcdFx0bWUuZW1pdCgnY2hhbmdlOicgKyB1cGRhdGUucHJvcCwgdXBkYXRlLnZhbHVlLCB1cGRhdGUucHJldmlvdXNWYWx1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdG1lLmVtaXQoJ2NoYW5nZScsIHVwZGF0ZXMpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdGdldFN0YXRlOiBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcblx0XHQvLyBDbG9uZSB0aGUgc3RvcmUgcHJvcGVydGllc1xuXHRcdHJldHVybiB4VXRpbHMuX2V4dGVuZCh7fSwgdGhpcyk7XG5cdH0sXG5cblx0d2FpdEZvcjogZnVuY3Rpb24gd2FpdEZvcihpZHMpIHtcblx0XHQvLyBUaGUgeERpc3BhdGNoZXIgYWRkcyBpdHNlbGYgYXMgYSBwcm9wZXJ0eVxuXHRcdC8vIHdoZW4gdGhlIHhTdG9yZSBpcyByZWdpc3RlcmVkXG5cdFx0cmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIud2FpdEZvcihpZHMpO1xuXHR9XG59KTtcblxuLy8jYnVpbGRcblxubW9kdWxlLmV4cG9ydHMgPSBYU3RvcmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZsdXhpZnkvc3JjL3hTdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XG5cbnZhciB4VXRpbHMgPSByZXF1aXJlKCcuL3hVdGlscycpO1xuXG4vLyNidWlsZFxuXG52YXIgWEVtaXR0ZXIgPSBmdW5jdGlvbiBYRW1pdHRlcigpIHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfZXZlbnRzJywge1xuXHRcdHZhbHVlOiB7fVxuXHR9KTtcblxuXHRpZiAodHlwZW9mIHRoaXMuaW5pdGlhbGl6ZSA9PSAnZnVuY3Rpb24nKSB0aGlzLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5cbi8vIFRoZSBwcm90b3R5cGUgbWV0aG9kcyBhcmUgc3RvcmVkIGluIGEgZGlmZmVyZW50IG9iamVjdFxuLy8gYW5kIGFwcGxpZWQgYXMgbm9uIGVudW1lcmFibGUgcHJvcGVydGllcyBsYXRlclxudmFyIGVtaXR0ZXJQcm90b3R5cGUgPSB7XG5cdG9uOiBmdW5jdGlvbiBvbihldmVudE5hbWUsIGxpc3RlbmVyLCBvbmNlKSB7XG5cdFx0dmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldmVudE5hbWVdIHx8IFtdO1xuXG5cdFx0bGlzdGVuZXJzLnB1c2goeyBjYWxsYmFjazogbGlzdGVuZXIsIG9uY2U6IG9uY2UgfSk7XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50TmFtZV0gPSBsaXN0ZW5lcnM7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRvbmNlOiBmdW5jdGlvbiBvbmNlKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcblx0XHR0aGlzLm9uKGV2ZW50TmFtZSwgbGlzdGVuZXIsIHRydWUpO1xuXHR9LFxuXG5cdG9mZjogZnVuY3Rpb24gb2ZmKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcblx0XHRpZiAodHlwZW9mIGV2ZW50TmFtZSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZXZlbnRzID0ge307XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgbGlzdGVuZXIgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2V2ZW50c1tldmVudE5hbWVdID0gW107XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnROYW1lXSB8fCBbXSxcblx0XHRcdCAgICBpO1xuXG5cdFx0XHRmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0aWYgKGxpc3RlbmVyc1tpXS5jYWxsYmFjayA9PT0gbGlzdGVuZXIpIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0dHJpZ2dlcjogZnVuY3Rpb24gdHJpZ2dlcihldmVudE5hbWUpIHtcblx0XHR2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcblx0XHQgICAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2ZW50TmFtZV0gfHwgW10sXG5cdFx0ICAgIG9uY2VMaXN0ZW5lcnMgPSBbXSxcblx0XHQgICAgaSxcblx0XHQgICAgbGlzdGVuZXI7XG5cblx0XHQvLyBDYWxsIGxpc3RlbmVyc1xuXHRcdGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuXG5cdFx0XHRpZiAobGlzdGVuZXIuY2FsbGJhY2spIGxpc3RlbmVyLmNhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3MpO2Vsc2Uge1xuXHRcdFx0XHQvLyBJZiB0aGVyZSBpcyBub3QgYSBjYWxsYmFjaywgcmVtb3ZlIVxuXHRcdFx0XHRsaXN0ZW5lci5vbmNlID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGxpc3RlbmVyLm9uY2UpIG9uY2VMaXN0ZW5lcnMucHVzaChpKTtcblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgbGlzdGVuZXJzIG1hcmtlZCBhcyBvbmNlXG5cdFx0Zm9yIChpID0gb25jZUxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0bGlzdGVuZXJzLnNwbGljZShvbmNlTGlzdGVuZXJzW2ldLCAxKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxufTtcblxuLy8gRXZlbnRFbWl0dGVyIG1ldGhvZHNcbnhVdGlscy5fZXh0ZW5kKGVtaXR0ZXJQcm90b3R5cGUsIHtcblx0YWRkTGlzdGVuZXI6IGVtaXR0ZXJQcm90b3R5cGUub24sXG5cdHJlbW92ZUxpc3RlbmVyOiBlbWl0dGVyUHJvdG90eXBlLm9mZixcblx0cmVtb3ZlQWxsTGlzdGVuZXJzOiBlbWl0dGVyUHJvdG90eXBlLm9mZixcblx0ZW1pdDogZW1pdHRlclByb3RvdHlwZS50cmlnZ2VyXG59KTtcblxuLy8gTWV0aG9kcyBhcmUgbm90IGVudW1lcmFibGUgc28sIHdoZW4gdGhlIHN0b3JlcyBhcmVcbi8vIGV4dGVuZGVkIHdpdGggdGhlIGVtaXR0ZXIsIHRoZXkgY2FuIGJlIGl0ZXJhdGVkIGFzXG4vLyBoYXNobWFwc1xuWEVtaXR0ZXIucHJvdG90eXBlID0ge307XG5mb3IgKHZhciBtZXRob2QgaW4gZW1pdHRlclByb3RvdHlwZSkge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoWEVtaXR0ZXIucHJvdG90eXBlLCBtZXRob2QsIHtcblx0XHR2YWx1ZTogZW1pdHRlclByb3RvdHlwZVttZXRob2RdXG5cdH0pO1xufVxuXG4vLyBFeHRlbmQgbWV0aG9kIGZvciAnaW5oZXJpdGFuY2UnLCBub2QgdG8gYmFja2JvbmUuanNcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShYRW1pdHRlciwgJ19leHRlbmQnLCB7XG5cdHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShwcm90b1Byb3BzKSB7XG5cdFx0dmFyIHBhcmVudCA9IHRoaXMsXG5cdFx0ICAgIGNoaWxkO1xuXG5cdFx0aWYgKHByb3RvUHJvcHMgJiYgcHJvdG9Qcm9wcy5oYXNPd25Qcm9wZXJ0eShjb25zdHJ1Y3RvcikpIHtcblx0XHRcdGNoaWxkID0gcHJvdG9Qcm9wcy5jb25zdHJ1Y3Rvcjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2hpbGQgPSBmdW5jdGlvbiBjaGlsZCgpIHtcblx0XHRcdFx0cmV0dXJuIHBhcmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHR4VXRpbHMuX2V4dGVuZChjaGlsZCwgcGFyZW50KTtcblxuXHRcdHZhciBTdXJyb2dhdGUgPSBmdW5jdGlvbiBTdXJyb2dhdGUoKSB7XG5cdFx0XHQvLyBBZ2FpbiB0aGUgY29uc3RydWN0b3IgaXMgYWxzbyBkZWZpbmVkIGFzIG5vdCBlbnVtZXJhYmxlXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbnN0cnVjdG9yJywge1xuXHRcdFx0XHR2YWx1ZTogY2hpbGRcblx0XHRcdH0pO1xuXHRcdH07XG5cdFx0U3Vycm9nYXRlLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7XG5cdFx0Y2hpbGQucHJvdG90eXBlID0gbmV3IFN1cnJvZ2F0ZSgpO1xuXG5cdFx0Ly8gQWxsIHRoZSBleHRlbmRpbmcgbWV0aG9kcyBuZWVkIHRvIGJlIGFsc29cblx0XHQvLyBub24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzXG5cdFx0aWYgKHByb3RvUHJvcHMpIHtcblx0XHRcdGZvciAodmFyIHAgaW4gcHJvdG9Qcm9wcykge1xuXHRcdFx0XHRpZiAocCAhPSAnY29uc3RydWN0b3InKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNoaWxkLnByb3RvdHlwZSwgcCwge1xuXHRcdFx0XHRcdFx0dmFsdWU6IHByb3RvUHJvcHNbcF1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7XG5cblx0XHRyZXR1cm4gY2hpbGQ7XG5cdH1cbn0pO1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFhFbWl0dGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mbHV4aWZ5L3NyYy94RW1pdHRlci5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XG5cbi8vI2J1aWxkXG5cbnZhciB4VXRpbHMgPSB7XG5cdC8vIE9iamVjdCBleHRlbmQsIE5vZCB0byB1bmRlcnNjb3JlLmpzXG5cdF9leHRlbmQ6IGZ1bmN0aW9uIF9leHRlbmQob2JqKSB7XG5cdFx0dmFyIHNvdXJjZSwgcHJvcDtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRmb3IgKHByb3AgaW4gc291cmNlKSB7XG5cdFx0XHRcdG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9XG59O1xuXG4vLyNidWlsZFxuXG5tb2R1bGUuZXhwb3J0cyA9IHhVdGlscztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZmx1eGlmeS9zcmMveFV0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBQYWdlTGFiZWwgPSByZXF1aXJlKCcuLi9wYWdlLWxhYmVsL3BhZ2UtbGFiZWwuanN4JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2Zvcm0tc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzZz1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzZ19fX19LZXkgaW4gX19fX0NsYXNzZyl7aWYoX19fX0NsYXNzZy5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NnX19fX0tleSkpe0Zvcm1bX19fX0NsYXNzZ19fX19LZXldPV9fX19DbGFzc2dbX19fX0NsYXNzZ19fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NnPV9fX19DbGFzc2c9PT1udWxsP251bGw6X19fX0NsYXNzZy5wcm90b3R5cGU7Rm9ybS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzZyk7Rm9ybS5wcm90b3R5cGUuY29uc3RydWN0b3I9Rm9ybTtGb3JtLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc2c7XHJcbiAgICBmdW5jdGlvbiBGb3JtKHByb3BzKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgX19fX0NsYXNzZy5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHBhZ2VzOiB0aGlzLnByb3BzLnBhZ2VzXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhhbmRsZVBhZ2VDbGljayA9IHRoaXMuaGFuZGxlUGFnZUNsaWNrLmJpbmQodGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb3JtLnByb3RvdHlwZSxcImhhbmRsZVBhZ2VDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKHBhZ2UpIHtcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGFuZGxlUGFnZUNsaWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlUGFnZUNsaWNrKHBhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBsZXQgcGFnZXMgPSB0aGlzLnN0YXRlLnBhZ2VzO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgcGFnZXMubWFwKGZ1bmN0aW9uKHBhZ2UsIGlkeCkgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGFnZUxhYmVsLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGlkeCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IGlkeCA9PSAwID8gdHJ1ZTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlUGFnZUNsaWNrOiB0aGlzLmhhbmRsZVBhZ2VDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlOiBwYWdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ3BhZ2UtJyArIGlkeH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMucGFnZX0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcblxyXG47XHJcblxyXG5cclxuRm9ybS5Qcm9wVHlwZXMgPSB7XHJcbiAgICBwYWdlczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgaGFuZGxlUGFnZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuICAgIGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxyXG59XHJcblxyXG5cclxuRm9ybS5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2VcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9mb3JtL2Zvcm0uanN4XG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL3BhZ2UtbGFiZWwtc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzcT1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzcV9fX19LZXkgaW4gX19fX0NsYXNzcSl7aWYoX19fX0NsYXNzcS5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NxX19fX0tleSkpe1BhZ2VMYWJlbFtfX19fQ2xhc3NxX19fX0tleV09X19fX0NsYXNzcVtfX19fQ2xhc3NxX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3E9X19fX0NsYXNzcT09PW51bGw/bnVsbDpfX19fQ2xhc3NxLnByb3RvdHlwZTtQYWdlTGFiZWwucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3EpO1BhZ2VMYWJlbC5wcm90b3R5cGUuY29uc3RydWN0b3I9UGFnZUxhYmVsO1BhZ2VMYWJlbC5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NxO1xyXG4gICAgZnVuY3Rpb24gUGFnZUxhYmVsKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzcS5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlZFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFBhZ2VMYWJlbC5wcm90b3R5cGUsXCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGlzYWJsZWQ6IG5leHRQcm9wcy5kaXNhYmxlZH0pO1xyXG4gICAgfX0pO1xyXG5cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUGFnZUxhYmVsLnByb3RvdHlwZSxcImhhbmRsZUNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0L3QsCDRgdC+0LHRi9GC0LjQtSDQutC70LjQuiwg0L/QvtC00LPRgNGD0LbQsNC10Lwg0YHQstGP0LfQsNC90L3Ri9C5INC00L7QutGD0LzQtdC90YJcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhhbmRsZVBhZ2VDbGljaykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZVBhZ2VDbGljayhwYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQYWdlTGFiZWwucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2UsXHJcbiAgICAgICAgICAgIHN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSxzdHlsZXMucGFnZUxhYmVsLCB0aGlzLnByb3BzLmFjdGl2ZSAgPyB7YmFja2dyb3VuZENvbG9yOid3aGl0ZSd9OiB7fSlcclxuXHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7c3R5bGU6IHN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJwYWdlTGFiZWxcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrfSwgXHJcbiAgICAgICAgICAgIHBhZ2UucGFnZU5hbWVcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcblxyXG5cclxuXHJcblBhZ2VMYWJlbC5Qcm9wVHlwZXMgPSB7XHJcbiAgICBoYW5kbGVQYWdlQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG4gICAgcGFnZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgZGlzYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgYWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxyXG59O1xyXG5cclxuXHJcblBhZ2VMYWJlbC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBhY3RpdmU6IHRydWVcclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFnZUxhYmVsO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9wYWdlLWxhYmVsL3BhZ2UtbGFiZWwuanN4XG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHBhZ2VMYWJlbDoge1xuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICczcHgnLFxuICAgICAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgd2hpdGUnLFxuICAgICAgICBtYXJnaW46ICcycHgnLFxuICAgICAgICBwYWRkaW5nOiAnMnB4IDEwcHggMnB4IDEwcHgnXG4gICAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvcGFnZS1sYWJlbC9wYWdlLWxhYmVsLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwYWdlOiB7XG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsXG4gICAgICAgIGJvcmRlclJhZGl1czogJzNweCdcbiAgICB9LFxuICAgIGljb25zOiB7XG4gICAgICAgIGFkZDogJ2ltYWdlcy9pY29ucy9hZGQucG5nJyxcbiAgICAgICAgZWRpdDogJ2ltYWdlcy9pY29ucy9lZGl0LnBuZycsXG4gICAgICAgIGRlbGV0ZTogJ2ltYWdlcy9pY29ucy9kZWxldGUucG5nJyxcbiAgICAgICAgZmlsdGVyOiAnaW1hZ2VzL2ljb25zL2ZpbHRlci5wbmcnLFxuICAgICAgICBwcmludDogJ2ltYWdlcy9pY29ucy9wcmludC5wbmcnLFxuICAgICAgICBvazogJ2ltYWdlcy9pY29ucy9vay5wbmcnLFxuICAgICAgICBjYW5jZWw6ICdpbWFnZXMvaWNvbnMvY2FuY2VsLnBuZydcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9mb3JtL2Zvcm0tc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCJjb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2lucHV0LXRleHQtc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzaD1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzaF9fX19LZXkgaW4gX19fX0NsYXNzaCl7aWYoX19fX0NsYXNzaC5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NoX19fX0tleSkpe0lucHV0W19fX19DbGFzc2hfX19fS2V5XT1fX19fQ2xhc3NoW19fX19DbGFzc2hfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzaD1fX19fQ2xhc3NoPT09bnVsbD9udWxsOl9fX19DbGFzc2gucHJvdG90eXBlO0lucHV0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NoKTtJbnB1dC5wcm90b3R5cGUuY29uc3RydWN0b3I9SW5wdXQ7SW5wdXQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzaDtcclxuICAgIGZ1bmN0aW9uIElucHV0KHByb3BzKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgX19fX0NsYXNzaC5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IHByb3BzLnJlYWRPbmx5LFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZWQsXHJcbiAgICAgICAgICAgIHZhbGlkOiBwcm9wcy52YWxpZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSW5wdXQucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1widXNlIHN0cmljdFwiO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBuZXh0UHJvcHMudmFsdWUsIHJlYWRPbmx5Om5leHRQcm9wcy5yZWFkT25seX0pXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0LnByb3RvdHlwZSxcIm9uQ2hhbmdlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1widXNlIHN0cmljdFwiO1xyXG4gICAgICAgIGxldCBmaWVsZFZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5wcm9wcy5uYW1lLCBmaWVsZFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0LnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1widXNlIHN0cmljdFwiO1xyXG4gICAgICAgIGxldCBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLm5hbWUsXHJcbiAgICAgICAgICAgIGlucHV0U3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuaW5wdXQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLndpZHRoID8ge3dpZHRoOiB0aGlzLnByb3BzLndpZHRofSA6IHt9LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5yZWFkT25seSA/IHN0eWxlcy5yZWFkT25seSA6IHt9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMud3JhcHBlcn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtzdHlsZTogc3R5bGVzLmxhYmVsLCBodG1sRm9yOiB0aGlzLnByb3BzLm5hbWUsIHJlZjogXCJsYWJlbFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50aXRsZVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcInRleHRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiaW5wdXRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBpbnB1dFN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdGhpcy5zdGF0ZS5yZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy5wcm9wcy5wYXR0ZXJuLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICkpXHJcbiAgICB9fSk7XHJcblxyXG5cclxuSW5wdXQuUHJvcFR5cGVzID0ge1xyXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICByZWFkT25seTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICB2YWxpZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHBhdHRlcm46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xyXG59XHJcblxyXG5cclxuSW5wdXQuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgcmVhZE9ubHk6IGZhbHNlLFxyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgdmFsaWQ6IHRydWVcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmpzeFxuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbnB1dDoge1xuICAgICAgICB3aWR0aDogJzcwJScsXG4gICAgICAgIG1hcmdpbkxlZnQ6ICc1cHgnXG4gICAgfSxcbiAgICBmb2N1c2VkOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Ymx1ZSdcbiAgICB9LFxuICAgIHJlYWRPbmx5OiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGM0VGRUYnXG4gICAgfSxcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIG1hcmdpbjogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgd2lkdGg6ICc5NSUnXG4gICAgfSxcbiAgICBsYWJlbDoge1xuICAgICAgICB3aWR0aDogJzMwJScsXG4gICAgICAgIG1hcmdpbjogJzVweCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC10ZXh0L2lucHV0LXRleHQtc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vaW5wdXQtZGF0ZS1zdHlsZXMnKTtcclxuXHJcbnZhciBfX19fQ2xhc3NpPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NpX19fX0tleSBpbiBfX19fQ2xhc3NpKXtpZihfX19fQ2xhc3NpLmhhc093blByb3BlcnR5KF9fX19DbGFzc2lfX19fS2V5KSl7SW5wdXREYXRlW19fX19DbGFzc2lfX19fS2V5XT1fX19fQ2xhc3NpW19fX19DbGFzc2lfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzaT1fX19fQ2xhc3NpPT09bnVsbD9udWxsOl9fX19DbGFzc2kucHJvdG90eXBlO0lucHV0RGF0ZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzaSk7SW5wdXREYXRlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1JbnB1dERhdGU7SW5wdXREYXRlLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc2k7XHJcblxyXG4gICAgZnVuY3Rpb24gSW5wdXREYXRlKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzaS5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLFxyXG4gICAgICAgICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgIGdldERlZmF1bHRQcm9wcyAoKSB7XHJcbiAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpLFxyXG4gICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgbW9udGggPSBkYXRlLmdldE1vbnRoKCksXHJcbiAgICAgZGF5ID0gZGF0ZS5nZXREYXRlKCksXHJcbiAgICAgbWF4RGF0ZSA9IG5ldyBEYXRlKHllYXIgKyAxLCBtb250aCwgZGF5KSxcclxuICAgICByZWZJZCA9ICdJbnB1dERhdGUnLFxyXG4gICAgIG1pbkRhdGUgPSBuZXcgRGF0ZSh5ZWFyIC0gNSwgbW9udGgsIGRheSk7XHJcblxyXG4gICAgIHJldHVybiB7XHJcbiAgICAgYmluZERhdGE6IHRydWUsXHJcbiAgICAgbWluOiBtaW5EYXRlLFxyXG4gICAgIG1heDogbWF4RGF0ZSxcclxuICAgICByZWFkT25seTogZmFsc2UsXHJcbiAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgfTtcclxuICAgICB9LFxyXG4gICAgICovXHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0RGF0ZS5wcm90b3R5cGUsXCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IG5leHRQcm9wcy52YWx1ZSwgcmVhZE9ubHk6IG5leHRQcm9wcy5yZWFkT25seX0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dERhdGUucHJvdG90eXBlLFwib25DaGFuZ2VcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoZmllbGRWYWx1ZSk7XHJcblxyXG4gICAgICAgIGlmIChmaWVsZFZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSDQvdGD0LssINGC0L4g0L/Rg9GB0YLRjCDQsdGD0LTQtdGCIG51bFxyXG4gICAgICAgICAgICB2YWxpZGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWxpZGF0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LfQsNC00LDQvSDQvtCx0YDQsNCx0L7RgtGH0LjQuiwg0LLQtdGA0L3QtdC8INC10LPQvlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLm5hbWUsIGZpZWxkVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICAvKlxyXG4gICAgIHByb3BUeXBlczoge1xyXG4gICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxyXG4gICAgIH0sXHJcbiAgICAgKi9cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSW5wdXREYXRlLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICBpbnB1dFN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmlucHV0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy53aWR0aCA/IHt3aWR0aDogdGhpcy5wcm9wcy53aWR0aH0gOiB7fSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucmVhZE9ubHkgPyBzdHlsZXMucmVhZE9ubHkgOiB7fVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMud3JhcHBlcn0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge3N0eWxlOiBzdHlsZXMubGFiZWwsIGh0bWxGb3I6IHRoaXMucHJvcHMubmFtZSwgcmVmOiBcImxhYmVsXCJ9LCBcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGl0bGVcclxuICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwiZGF0ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICByZWY6IFwiaW5wdXRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICByZWFkT25seTogdGhpcy5zdGF0ZS5yZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLnByb3BzLnBhdHRlcm4sIFxyXG4gICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgbWluOiB0aGlzLnByb3BzLm1pbiwgXHJcbiAgICAgICAgICAgICAgICAgICBtYXg6IHRoaXMucHJvcHMubWF4LCBcclxuICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSlcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSW5wdXREYXRlLnByb3RvdHlwZSxcInZhbGlkYXRlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LrQsCDQvdCwINC80LjQvSAsINC80LDRhVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm1pbiAmJiB0aGlzLnByb3BzLm1heCAmJiB2YWx1ZSkge1xyXG4gICAgICAgICAgICBsZXQgZGF0ZVZhbHVlID0gbmV3IERhdGUodmFsdWUpO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAoZGF0ZVZhbHVlID4gdGhpcy5wcm9wcy5taW4gJiYgZGF0ZVZhbHVlIDwgdGhpcy5wcm9wcy5tYXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH19KTtcclxuXHJcblxyXG5cclxuSW5wdXREYXRlLlByb3BUeXBlcyA9IHtcclxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0T2YoRGF0ZSksXHJcbiAgICBtaW46IFJlYWN0LlByb3BUeXBlcy5vYmplY3RPZihEYXRlKSxcclxuICAgIG1heDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdE9mKERhdGUpLFxyXG4gICAgcmVhZE9ubHk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgZGlzYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgdmFsaWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgcGF0dGVybjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXHJcblxyXG59XHJcblxyXG5cclxuSW5wdXREYXRlLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHJlYWRPbmx5OiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHZhbGlkOiB0cnVlXHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0RGF0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtZGF0ZS9pbnB1dC1kYXRlLmpzeFxuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbnB1dDoge1xuICAgICAgICB3aWR0aDogJzcwJSdcbiAgICB9LFxuICAgIGZvY3VzZWQ6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnbGlnaHRibHVlJ1xuICAgIH0sXG4gICAgcmVhZE9ubHk6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI0YzRUZFRidcbiAgICB9LFxuICAgIHdyYXBwZXI6IHtcbiAgICAgICAgbWFyZ2luOiAnNXB4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICB3aWR0aDogJzk1JSdcbiAgICB9LFxuICAgIGxhYmVsOiB7XG4gICAgICAgIHdpZHRoOiAnMzAlJyxcbiAgICAgICAgbWFyZ2luOiAnNXB4J1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2lucHV0LWRhdGUvaW5wdXQtZGF0ZS1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vaW5wdXQtbnVtYmVyLXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzc2o9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc2pfX19fS2V5IGluIF9fX19DbGFzc2ope2lmKF9fX19DbGFzc2ouaGFzT3duUHJvcGVydHkoX19fX0NsYXNzal9fX19LZXkpKXtJbnB1dFtfX19fQ2xhc3NqX19fX0tleV09X19fX0NsYXNzaltfX19fQ2xhc3NqX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2o9X19fX0NsYXNzaj09PW51bGw/bnVsbDpfX19fQ2xhc3NqLnByb3RvdHlwZTtJbnB1dC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzaik7SW5wdXQucHJvdG90eXBlLmNvbnN0cnVjdG9yPUlucHV0O0lucHV0Ll9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc2o7XHJcbiAgICBmdW5jdGlvbiBJbnB1dChwcm9wcykge1widXNlIHN0cmljdFwiO1xyXG4gICAgICAgIF9fX19DbGFzc2ouY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogcHJvcHMudmFsdWUsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiBwcm9wcy5yZWFkT25seSxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVkLFxyXG4gICAgICAgICAgICB2YWxpZDogcHJvcHMudmFsaWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0LnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV4dFByb3BzLnZhbHVlLCByZWFkT25seTpuZXh0UHJvcHMucmVhZE9ubHl9KVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dC5wcm90b3R5cGUsXCJvbkNoYW5nZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBsZXQgZmllbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMubmFtZSwgZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBsZXQgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICBpbnB1dFN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmlucHV0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy53aWR0aCA/IHt3aWR0aDogdGhpcy5wcm9wcy53aWR0aH0gOiB7fSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucmVhZE9ubHkgPyBzdHlsZXMucmVhZE9ubHkgOiB7fVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBpbnB1dE1pblZhbHVlID0gdGhpcy5wcm9wcy5taW4sXHJcbiAgICAgICAgICAgIGlucHV0TWF4VmFsdWUgPSB0aGlzLnByb3BzLm1heDtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMud3JhcHBlcn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtzdHlsZTogc3R5bGVzLmxhYmVsLCBodG1sRm9yOiB0aGlzLnByb3BzLm5hbWUsIHJlZjogXCJsYWJlbFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50aXRsZVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwibnVtYmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogaW5wdXRTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMuc3RhdGUucmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIlxcXFxkKyhcXFxcLlxcXFxkezJ9KT9cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICBtaW46IGlucHV0TWluVmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIG1heDogaW5wdXRNYXhWYWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogXCIwLjAxXCIsIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICkpXHJcbiAgICB9fSk7XHJcblxyXG5cclxuSW5wdXQuUHJvcFR5cGVzID0ge1xyXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICByZWFkT25seTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICB2YWxpZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHBhdHRlcm46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG1pbjogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcclxuICAgIG1heDogUmVhY3QuUHJvcFR5cGVzLm51bWJlclxyXG59XHJcblxyXG5cclxuSW5wdXQuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgcmVhZE9ubHk6IGZhbHNlLFxyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgdmFsaWQ6IHRydWUsXHJcbiAgICBtaW46IC05OTk5OTk5OTksXHJcbiAgICBtYXg6IDk5OTk5OTk5OVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC1udW1iZXIvaW5wdXQtbnVtYmVyLmpzeFxuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbnB1dDoge1xuICAgICAgICB3aWR0aDogJzcwJScsXG4gICAgICAgIG1hcmdpbkxlZnQ6ICc1cHgnXG4gICAgfSxcbiAgICBmb2N1c2VkOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Ymx1ZSdcbiAgICB9LFxuICAgIHJlYWRPbmx5OiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGM0VGRUYnXG4gICAgfSxcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIG1hcmdpbjogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgd2lkdGg6ICc5NSUnXG4gICAgfSxcbiAgICBsYWJlbDoge1xuICAgICAgICB3aWR0aDogJzMwJScsXG4gICAgICAgIG1hcmdpbjogJzVweCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC1udW1iZXIvaW5wdXQtbnVtYmVyLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4vLi4vaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgSW5wdXREYXRlVGltZSA9IHJlcXVpcmUoJy4vLi4vZG9jLWlucHV0LWRhdGV0aW1lLmpzeCcpLFxyXG4gICAgRG9jTGlzdCA9IHJlcXVpcmUoJy4vLi4vZG9jLWlucHV0LWxpc3QuanN4JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2RvYy1jb21tb24tc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzbD1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzbF9fX19LZXkgaW4gX19fX0NsYXNzbCl7aWYoX19fX0NsYXNzbC5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NsX19fX0tleSkpe0RvY0NvbW1vbltfX19fQ2xhc3NsX19fX0tleV09X19fX0NsYXNzbFtfX19fQ2xhc3NsX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2w9X19fX0NsYXNzbD09PW51bGw/bnVsbDpfX19fQ2xhc3NsLnByb3RvdHlwZTtEb2NDb21tb24ucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2wpO0RvY0NvbW1vbi5wcm90b3R5cGUuY29uc3RydWN0b3I9RG9jQ29tbW9uO0RvY0NvbW1vbi5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NsO1xyXG4gICAgZnVuY3Rpb24gRG9jQ29tbW9uKHByb3BzKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgX19fX0NsYXNzbC5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiBwcm9wcy5yZWFkT25seSxcclxuICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NDb21tb24ucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1widXNlIHN0cmljdFwiO1xyXG4gICAgICAgIC8vINC/0YDQuCDQuNC30LzQtdC90LXQvdC40LgsINC/0L7QvNC10L3Rj9C10YIg0YHQvtGB0YLQvtGP0L3QuNC1ICjQv9C10YDQtdC00LDRgdGCINC00LDQu9GM0YjQtSDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8pXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZE9ubHk6bmV4dFByb3BzLnJlYWRPbmx5IH0pXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERvY0NvbW1vbi5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcInVzZSBzdHJpY3RcIjtcclxuLypcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMucHJvcHMuZGF0YSxcclxuICAgICAgICAgICAgYnBtID0gZGF0YS5icG0gfHwgW10sXHJcbiAgICAgICAgICAgIGFjdHVhbFN0ZXBEYXRhID0gYnBtLmZpbHRlcigoc3RlcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g0YLQtdC60YPRidC40Lkg0YjQsNCzINCR0J9cclxuICAgICAgICAgICAgICAgIGlmIChzdGVwLmFjdHVhbFN0ZXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RlcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGV4ZWN1dGVycyA9IGFjdHVhbFN0ZXBEYXRhLm1hcCgoc3RlcERhdGEpPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g0L3QsNC50LTQtdC8INC40YHQv9C+0LvQvdC40YLQtdC70LXQuVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0ZXBEYXRhLmFjdG9ycyB8fCB7bmFtZTogJ0FVVEhPUid9O1xyXG4gICAgICAgICAgICB9KTtcclxuKi9cclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuc3RhdGUuZGF0YTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7cmVmOiBcIndyYXBwZXJcIiwgc3R5bGU6IHN0eWxlcy53cmFwcGVyfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge3JlZjogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNzUlXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge3JlZjogXCJjcmVhdGVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJDcmVhdGVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNyZWF0ZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmNyZWF0ZWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIHdpZHRoOiBcIjc1JVwifSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtyZWY6IFwibGFzdHVwZGF0ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVXBkYXRlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsYXN0dXBkYXRlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5sYXN0dXBkYXRlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCB3aWR0aDogXCI3NSVcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7cmVmOiBcInN0YXR1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhdHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXR1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuc3RhdHVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNzUlXCJ9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRG9jQ29tbW9uLnByb3RvdHlwZSxcIm9uQ2hhbmdlSGFuZGxlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGlucHV0TmFtZSwgaW5wdXRWYWx1ZSkge1widXNlIHN0cmljdFwiO1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC40LfQvNC10L3QtdC90LjQuVxyXG4gICAgICAgIGxldCBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YTtcclxuICAgICAgICBkYXRhW2lucHV0TmFtZV0gPSBpbnB1dFZhbHVlO1xyXG4gICAgICAgIC8vINC30LDQtNCw0YLRjCDQvdC+0LLQvtC1INC30L3QsNGH0LXQvdC40LUg0L/QvtC70Y9cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuRG9jQ29tbW9uLlByb3BUeXBlcyA9IHtcclxuICAgIHJlYWRPbmx5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5Eb2NDb21tb24uZGVmYXVsdFByb3BzID0ge1xyXG4gICAgcmVhZE9ubHk6IHRydWVcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEb2NDb21tb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1jb21tb24vZG9jLWNvbW1vbi5qc3hcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3QgSW5wdXREYXRlVGltZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJJbnB1dERhdGVUaW1lXCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7dmFsdWU6IHRoaXMucHJvcHMudmFsdWUsIHJlYWRPbmx5OiB0cnVlLCBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB0cnVlfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcclxuLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUgZG9jSWQuINCV0YHQu9C4INC30L3QsNGH0LXQvdC40LUgPSAwICjQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0L/QuNGB0YwsINGC0L4g0L/RgNC+0YHRgtC+INC+0YfQuNGC0LrQsCDQv9C+0LvQtdC5LCDQuNC90LDRh9C1INC/0L7QtNCz0YDRg9C30LrQsCDQtNCw0L3QvdGL0YVcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbi8vICAgICAgICBjb25zb2xlLmxvZygnY29tcG9uZW50V2lsbE1vdW50JyArIHRoaXMucHJvcHMubmFtZSk7XHJcbi8qXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkb2NJZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgdC+0LfQtNCw0L3QuNC1INC90L7QstC+0LPQviDQtNC+0LrRg9C80LXQvdGC0LBcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0YHQvtCy0YvQuSDQtNC+0LrRg9C80LXQvdGCXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7dmFsdWU6MH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTp2YWx1ZX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiovXHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnb24gY2hhbmdlOmVkaXRlZDonICsgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG5ld1ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSBkYXRhW3NlbGYucHJvcHMubmFtZV07XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdC10L3QuNGPINCx0YPQtNGD0YIg0L7RgtGA0LDQttCw0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDRgtCw0LrQuNC1INC10YHRgtGMXHJcbiAgICAgICAgdmFyIHJldHVybnZhbHVlID0gKG5leHRTdGF0ZS52YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSB8fFxyXG4gICAgICAgIG5leHRTdGF0ZS5yZWFkT25seSAhPT0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fFxyXG4gICAgICAgIG5leHRTdGF0ZS5kaXNhYmxlZCAhPT0gdGhpcy5zdGF0ZS5kaXNhYmxlZCk7XHJcblxyXG4gLy8gICAgICAgY29uc29sZS5sb2coJ3Zhc3R1czonICsgcmV0dXJudmFsdWUpO1xyXG4gICAgICAgIHJldHVybiByZXR1cm52YWx1ZTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2hhbmdlOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGE7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgICAgZGF0YVt0aGlzLnByb3BzLm5hbWVdID0gZmllbGRWYWx1ZTtcclxuXHJcbiAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncHJvcHM6JyArIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMpKTtcclxuICAgICAgICB2YXIgaW5wdXRDbGFzc05hbWUgPXRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXREaXNhYmxlZCA9IHRoaXMuc3RhdGUuZGlzYWJsZWQsXHJcbiAgICAgICAgICAgIGlucHV0UGxhY2VIb2xkZXIgPSB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8IHRoaXMucHJvcHMubmFtZTtcclxuXHJcbiAgICAgICAgIGlmIChpbnB1dFJlYWRPbmx5KSB7XHJcbiAgICAgICAgICAgIGlucHV0Q2xhc3NOYW1lID0gaW5wdXRDbGFzc05hbWUgKyAnIGRvYy1pbnB1dC1yZWFkb25seSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW5wdXREaXNhYmxlZCA9PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIHRoaXMucHJvcHMudGl0bGUpLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwiZGF0ZXRpbWUtbG9jYWxcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBpbnB1dFJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLnByb3BzLnBhdHRlcm4sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZUhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJkYXRldGltZS1sb2NhbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMucHJvcHMucGF0dGVybiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dERhdGVUaW1lO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtZGF0ZXRpbWUuanN4XG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG5cclxuICAgIExpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTGlzdFwiLFxyXG4gICAgICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZGF0YSxcclxuICAgICAgICAgICAgICAgIGNsaWNrZWQ6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdNeSBkZWZhdWx0IExpc3QnLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyogIGNvbXBvbmVudFdpbGxNb3VudDogKCk9PiB7XHJcbiAgICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1IGRvY0lkLiDQldGB0LvQuCDQt9C90LDRh9C10L3QuNC1ID0gMCAo0LTQvtCx0LDQstC70Y/QtdC8INC90L7QstGD0Y4g0LfQsNC/0LjRgdGMLCDRgtC+INC/0YDQvtGB0YLQviDQvtGH0LjRgtC60LAg0L/QvtC70LXQuSwg0LjQvdCw0YfQtSDQv9C+0LTQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZG9jSWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgIHZhciBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgdmFsdWUgPSBkYXRhW3NlbGYucHJvcHMubmFtZV07XHJcbiAgICAgICAgIGlmIChuZXdWYWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgIC8vINGB0L7QstGL0Lkg0LTQvtC60YPQvNC10L3RglxyXG4gICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTogMH0pO1xyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWUsIGRpc2FibGVkOiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6bGlicycsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICB2YXIgdmFzdHVzID0gSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKTtcclxuICAgICAgICAgLy8gd2lsbCB3YXRjaCBsaWJzIGNoYW5nZSAoZnJvbSBzZXJ2ZXIpXHJcbiAgICAgICAgIHZhciBkYXRhID0gbmV3VmFsdWUuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgIGlmIChpdGVtLmlkID09PSBzZWxmLnByb3BzLmxpYnMpIHtcclxuICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7ZGF0YTogZGF0YVswXS5kYXRhfSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgIH0sXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIGhhbmRsZUxpQ2xpY2s6IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGNsaWNrZWQ6IGluZGV4XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICBoYW5kbGVDbGlja0J0bkRlbGV0ZUV4ZWN1dG9yOiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0YXRlLmRhdGE7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsaXN0IGJ0biBkZWxldGUnLCBpbmRleCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlQ2xpY2tCdG5BZGRFeGVjdXRvcjogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbGlzdCBidG4gYWRkJywgaW5kZXgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICAgICAgLy8g0L/RgNC4INC40LfQvNC10L3QtdC90LjQuCDRgdGA0LXQttC40LzQsCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPLCDQv9C+0LzQtdC90Y/QtdGCINGB0L7RgdGC0L7Rj9C90LjQtSDQstC40LTQttC10YLQsFxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtyZWFkT25seTpuZXh0UHJvcHMucmVhZE9ubHkgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhIHx8IFtdLFxyXG4gICAgICAgICAgICAgICAgaW5wdXRDbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZSB8fCAnZG9jLWlucHV0IGZvcm0td2lkZ2V0JyxcclxuICAgICAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICAgICAgT3B0aW9ucyA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAvLyDRgdC+0LfQtNCw0LTQuNC8INGB0L/QuNGB0L7QuiDQt9C90LDRh9C10L3QuNC5XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgT3B0aW9ucyA9IGRhdGEubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09ICdhcnJheScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5pbmRleCA9PSBpbmRleCAmJiAhdGhpcy5zdGF0ZS5yZWFkT25seSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LLRi9C00LXQu9C40Lwg0LIg0YHQv9C40YHQutC1INC30L3QsNGH0LXQvdC40LUsINC/0YDQuCDRg9GB0LvQvtCy0LjQuCwg0YfRgtC+INGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjyDRjdGC0L4g0L/QvtC30LLQvtC70Y/QtdGCXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZSArICcgZm9jdXNlZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IE1hdGgucmFuZG9tKCksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVMaUNsaWNrLmJpbmQodGhpcywgaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGl0ZW0ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB3aWRnZXQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJSd9fSwgXHJcbiAgICAgICAgICAgICAgICBPcHRpb25zXHJcbiAgICAgICAgICAgICk7XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZToge2Rpc3BsYXk6IFwiZmxleFwifX0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7c3R5bGU6IHtwYWRkaW5nUmlnaHQ6IFwiNXB4XCJ9fSwgXCIgXCIsIHRoaXMucHJvcHMudGl0bGUpLCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJlYWRPbmx5ID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJidXR0b25cIiwgdmFsdWU6IFwiIEFkZCBcIiwgb25DbGljazogdGhpcy5oYW5kbGVDbGlja0J0bkFkZEV4ZWN1dG9yfSksIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucmVhZE9ubHkgPyBudWxsIDogUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcImJ1dHRvblwiLCB2YWx1ZTogXCIgRGVsZXRlIFwiLCBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrQnRuRGVsZXRlRXhlY3V0b3J9KVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICB3aWRnZXRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGlzdDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1saXN0LmpzeFxuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnZmxleC1zdGFydCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtY29tbW9uL2RvYy1jb21tb24tc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9zZWxlY3Qtc3R5bGVzJyk7XHJcblxyXG4vLyAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC10ZXh0LmpzeCcpO1xyXG5cclxudmFyIF9fX19DbGFzc2s9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc2tfX19fS2V5IGluIF9fX19DbGFzc2spe2lmKF9fX19DbGFzc2suaGFzT3duUHJvcGVydHkoX19fX0NsYXNza19fX19LZXkpKXtTZWxlY3RbX19fX0NsYXNza19fX19LZXldPV9fX19DbGFzc2tbX19fX0NsYXNza19fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NrPV9fX19DbGFzc2s9PT1udWxsP251bGw6X19fX0NsYXNzay5wcm90b3R5cGU7U2VsZWN0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NrKTtTZWxlY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yPVNlbGVjdDtTZWxlY3QuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzaztcclxuICAgIGZ1bmN0aW9uIFNlbGVjdChwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc2suY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogcHJvcHMudmFsdWUvKiDQt9C00LXRgdGMINC/0L4g0LfQvdCw0YfQtdC90LjRjiDQmNCUICovLFxyXG4gICAgICAgICAgICByZWFkT25seTogcHJvcHMucmVhZE9ubHksXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlZCxcclxuICAgICAgICAgICAgZGF0YTogcHJvcHMuZGF0YSxcclxuICAgICAgICAgICAgZmllbGRWYWx1ZTogcHJvcHMudmFsdWUgLyrQt9C00LXRgdGMINC/0L4g0LfQvdCw0YfQtdC90Lgg0L/QvtC70Y8gY29sbElkICovLFxyXG4gICAgICAgICAgICBidG5EZWxldGU6IHByb3BzLmJ0bkRlbGV0ZSAvKiDQtdGB0LvQuCDQuNGB0YLQuNC90YMsINGC0L4g0YDQuNGB0YPQtdC8INGA0Y/QtNC+0Lwg0LrQvdC+0L/QutGDINC00LvRjyDQvtGH0LjRgdGC0LrQuCDQt9C90LDRh9C10L3QuNGPKi9cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5idG5EZWxDbGljayA9IHRoaXMuYnRuRGVsQ2xpY2suYmluZCh0aGlzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdC5wcm90b3R5cGUsXCJmaW5kRmllbGRWYWx1ZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGRhdGEsIGNvbGxJZCwgdmFsdWUpIHtcclxuICAgICAgICAvLyDQv9GA0LjQstGP0LbQtdGCINC6INC30L3QsNGH0LXQvdGOINC/0L7Qu9GPXHJcbiAgICAgICAgLy8g0L3QsNC00L4g0L/RgNC40LLRj9C30LDRgtGMINC00LDQvdC90YvQtVxyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbihyb3cpICB7XHJcbiAgICAgICAgICAgIGlmIChyb3dbY29sbElkXSA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IHJvd1tjb2xsSWRdLCBmaWVsZFZhbHVlOiByb3dbY29sbElkXX0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLCB0aGlzKTtcclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdC5wcm90b3R5cGUsXCJnZXRWYWx1ZUJ5SWRcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihjb2xsSWQsIHJvd0lkKSB7XHJcbiAgICAgICAgLy8g0LLQtdGA0L3QtdGCINC30L3QsNGH0LXQvdC40Y8g0L/QvtC70Y8g0L/QviDQstGL0LHRgNCw0L3QvdC+0LzRgyDQmNCUXHJcblxyXG4gICAgICAgIGxldCBmaWVsZFZhbHVlLFxyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhO1xyXG5cclxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24ocm93KSAge1xyXG4gICAgICAgICAgICBpZiAocm93W2NvbGxJZF0gPT0gcm93SWQpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSByb3dbY29sbElkXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZpZWxkVmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBmaWVsZFZhbHVlO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZWxlY3QucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB2YWx1ZTogbmV4dFByb3BzLnZhbHVlLFxyXG4gICAgICAgICAgICByZWFkT25seTogbmV4dFByb3BzLnJlYWRPbmx5LCBkYXRhOiBuZXh0UHJvcHMuZGF0YVxyXG4gICAgICAgIH0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZWxlY3QucHJvdG90eXBlLFwiY29tcG9uZW50RGlkTW91bnRcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xsSWQgJiYgdGhpcy5wcm9wcy5jb2xsSWQgIT09ICdpZCcpIHtcclxuICAgICAgICAgICAgLy8g0LjRidC10Lwg0JjQlCDQv9C+INC30L3QsNGH0LXQvdC40Y4g0L/QvtC70Y9cclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRWYWx1ZSh0aGlzLnN0YXRlLmRhdGEsIHRoaXMucHJvcHMuY29sbElkLCB0aGlzLnByb3BzLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdC5wcm90b3R5cGUsXCJvbkNoYW5nZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBsZXQgZmllbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoZmllbGRWYWx1ZSA9PSAnJykge1xyXG4gICAgICAgICAgICBmaWVsZFZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNvbGxJZCkge1xyXG4gICAgICAgICAgICAvLyDQvdCw0LnQtNC10Lwg0L/QviDQuNC0INC30L3QsNGH0LXQvdC40LUg0L/QvtC70Y8g0LIgY29sbElkXHJcbiAgICAgICAgICAgIGZpZWxkVmFsdWUgPSB0aGlzLmdldFZhbHVlQnlJZCh0aGlzLnByb3BzLmNvbGxJZCwgZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINGB0L7RhdGA0LDQvdC40Lwg0LjQtCDQutCw0LogdmFsdWVcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZS50YXJnZXQudmFsdWUsIGZpZWxkVmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgLy8g0YHQvNC+0YLRgNC40Lwg0Log0YfQtdC80YMg0L/RgNC40LLRj9C30LDQvSDRgdC10LvQtdC60YIg0Lgg0L7RgtC00LDQuNC8INC10LPQviDQvdCw0LLQtdGA0YVcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLm5hbWUsIGZpZWxkVmFsdWUpOyAvLyDQsiDRgdC70YPRh9Cw0LUg0LXRgdC70Lgg0LfQsNC00LDQvSDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINCy0LXRgNGF0L3QtdC8INGD0YDQvtCy0L3QtSwg0L7RgtC00LDQtNC40Lwg0L7QsdGA0LDQsdC+0YLQutGDINGC0YPQtNCwXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH19KTtcclxuXHJcbi8qXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyBAdG9kbyDQtNC+0LHQsNCy0LjRgtGMINC/0YDQvtCy0LXRgNC60YMg0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0YHQvtGB0YLQvtGP0L3QuNGPXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiovXHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgZGF0YU9wdGlvbnMgPSB0aGlzLnN0YXRlLmRhdGEgfHwgW10sXHJcbiAgICAgICAgICAgIGlucHV0Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLm5hbWUsXHJcbiAgICAgICAgICAgIE9wdGlvbnMgPSBudWxsLFxyXG4gICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZSA9IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlOyAvLyDQlNCw0LTQuNC8INC00LXRhNC+0LvRgtC90L7QtSDQt9C90LDRh9C10L3QuNC1INC00LvRjyDQstC40LTQttC10YLQsCwg0YfRgtC+0LEg0L/QvtC60LDRgtGMINC10LPQviDRgdGA0LDQt9GDLCDQtNC+INC/0L7QtNCz0YDRg9C30LrQuCDQsdC40LHQu9C40L7RgtC10LrQuFxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUudmFsdWUpIHsgLy8g0LTQvtCx0LDQstC40Lwg0L/Rg9GB0YLRg9GOINGB0YLRgNC+0LrRgyDQsiDQvNCw0YHRgdC40LJcclxuICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LjQvCDQvdCw0LvQuNGH0LjQtSDQv9GD0YHRgtC+0Lkg0YHRgtGA0L7QutC4INCyINC80LDRgdGB0LjQstC1XHJcblxyXG4gICAgICAgICAgICBsZXQgZW1wdHlPYmogPSBkYXRhT3B0aW9ucy5maWx0ZXIoZnVuY3Rpb24ob2JqKSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5pZCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFlbXB0eU9iaiB8fCBlbXB0eU9iai5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YU9wdGlvbnMuc3BsaWNlKDAsIDAsIHtpZDogMCwga29vZDogJycsIG5hbWU6ICcnfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgZGF0YVZhbHVlID0gZGF0YU9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pICB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtW3RoaXMucHJvcHMuY29sbElkXSA9PT0gdGhpcy5zdGF0ZS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAoZGF0YU9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIE9wdGlvbnMgPSBkYXRhT3B0aW9ucy5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpICB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09ICdhcnJheScpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbVswXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSAnb3B0aW9uLScgKyBpbmRleDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogaXRlbVt0aGlzLnByb3BzLmNvbGxJZF0sIGtleToga2V5LCByZWY6IGtleX0sIFwiIFwiLCBpdGVtLm5hbWUsIFwiIFwiKVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMpO1xyXG4gICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZSA9IGRhdGFWYWx1ZS5sZW5ndGggPiAwID8gZGF0YVZhbHVlWzBdLm5hbWUgOiB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBPcHRpb25zID0gUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IDAsIGtleTogTWF0aC5yYW5kb20oKX0sIFwiIEVtcHR5IFwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlucHV0U3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuaW5wdXQsIGlucHV0UmVhZE9ubHkgPyB7fSA6IHN0eWxlcy5oaWRlLFxyXG4gICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID8gc3R5bGVzLnJlYWRPbmx5OiB7fSksXHJcbiAgICAgICAgICAgIHNlbGVjdFN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLnNlbGVjdCwgaW5wdXRSZWFkT25seSA/IHN0eWxlcy5oaWRlIDoge30sIGlucHV0UmVhZE9ubHkgPyBzdHlsZXMucmVhZE9ubHk6IHt9KSxcclxuICAgICAgICAgICAgYnV0dG9uU3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuYnV0dG9uLCB0aGlzLnByb3BzLmJ0bkRlbGV0ZSA/IHt9IDogc3R5bGVzLmhpZGUpXHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMud3JhcHBlciwgcmVmOiBcIndyYXBwZXJcIn0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge3JlZjogXCJsYWJlbFwiLCBzdHlsZTogc3R5bGVzLmxhYmVsLCBcclxuICAgICAgICAgICAgICAgICAgIGh0bWxGb3I6IHRoaXMucHJvcHMubmFtZX0sIHRoaXMucHJvcHMudGl0bGVcclxuICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwidGV4dFwiLCBpZDogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgIHN0eWxlOiBpbnB1dFN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dFwiLCBcclxuICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpbnB1dERlZmF1bHRWYWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZX0pLCBcclxuXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiwge3JlZjogXCJzZWxlY3RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHNlbGVjdFN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2V9LCBPcHRpb25zXHJcbiAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtyZWY6IFwiYnV0dG9uXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBidXR0b25TdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5idG5EZWxDbGlja30sIFxuICAgICAgICAgICAgICAgIFwiRGVsZXRlXCJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZWxlY3QucHJvdG90eXBlLFwiYnRuRGVsQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIC8vINC/0L4g0LLRi9C30L7QstGDINC60L3QvtC/0LrRgyDRg9C00LDQu9C40YLRjCwg0L7QsdC90YPQu9GP0LXRgiDQt9C90LDRh9C10L3QuNC1XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6ICcnfSk7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZShldmVudCk7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuU2VsZWN0LlByb3BUeXBlcyA9IHtcclxuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcclxuICAgIHJlYWRPbmx5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIGJ0bkRlbGV0ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBsaWJzOlJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBjb2xsSWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcclxufVxyXG5cclxuU2VsZWN0LmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHJlYWRPbmx5OiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHZhbGlkOiB0cnVlLFxyXG4gICAgYnRuRGVsZXRlOiBmYWxzZSxcclxuICAgIHZhbHVlOiAwLFxyXG4gICAgY29sbElkOiAnaWQnXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5qc3hcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgd3JhcHBlcjoge1xuICAgICAgICBtYXJnaW46ICc1cHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIHdpZHRoOiAnOTUlJ1xuXG4gICAgfSxcbiAgICBpbnB1dDoge1xuICAgICAgICB3aWR0aDogJzcwJScsXG4gICAgICAgIG1hcmdpbkxlZnQ6ICc1cHgnXG5cbiAgICB9LFxuICAgIGhpZGU6IHtcbiAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgICAgd2lkdGg6ICc2MCUnLFxuICAgICAgICBtYXJnaW5MZWZ0OiAnNXB4J1xuICAgIH0sXG4gICAgcmVhZE9ubHk6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI0YzRUZFRidcbiAgICB9LFxuICAgIGxhYmVsOiB7XG4gICAgICAgIHdpZHRoOiAnMzAlJyxcbiAgICAgICAgbWFyZ2luOiAnNXB4J1xuICAgIH0sXG4gICAgYnV0dG9uOiB7XG4gICAgICAgIHdpZHRoOiAnMTAlJ1xuICAgIH1cblxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vdGV4dC1hcmVhLXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzc209UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc21fX19fS2V5IGluIF9fX19DbGFzc20pe2lmKF9fX19DbGFzc20uaGFzT3duUHJvcGVydHkoX19fX0NsYXNzbV9fX19LZXkpKXtJbnB1dFtfX19fQ2xhc3NtX19fX0tleV09X19fX0NsYXNzbVtfX19fQ2xhc3NtX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc209X19fX0NsYXNzbT09PW51bGw/bnVsbDpfX19fQ2xhc3NtLnByb3RvdHlwZTtJbnB1dC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzbSk7SW5wdXQucHJvdG90eXBlLmNvbnN0cnVjdG9yPUlucHV0O0lucHV0Ll9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc207XHJcbiAgICBmdW5jdGlvbiBJbnB1dChwcm9wcykge1widXNlIHN0cmljdFwiO1xyXG4gICAgICAgIF9fX19DbGFzc20uY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSwgcmVhZE9ubHk6IHRydWUsIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkIHx8IHRydWVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSW5wdXQucHJvdG90eXBlLFwib25DaGFuZ2VcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihlKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMubmFtZSwgZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dC5wcm90b3R5cGUsXCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmV4dFByb3BzKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IG5leHRQcm9wcy52YWx1ZX0pXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0LnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1widXNlIHN0cmljdFwiO1xyXG4gICAgICAgIGNvbnN0IGlucHV0UGxhY2VIb2xkZXIgPSB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8IHRoaXMucHJvcHMubmFtZSxcclxuICAgICAgICAgICAgaW5wdXRTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5pbnB1dCxcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMud2lkdGggPyB7d2lkdGg6IHRoaXMucHJvcHMud2lkdGh9IDoge30sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJlYWRPbmx5ID8gc3R5bGVzLnJlYWRPbmx5IDoge31cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy53cmFwcGVyfSwgXHJcblxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtodG1sRm9yOiB0aGlzLnByb3BzLm5hbWUsIHJlZjogXCJsYWJlbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogc3R5bGVzLmxhYmVsfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSlcclxuICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGlucHV0U3R5bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dFwiLCBcclxuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWR9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkpXHJcbiAgICB9fSk7XHJcblxyXG5cclxuO1xyXG5cclxuSW5wdXQuUHJvcFR5cGVzID0ge1xyXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICByZWFkT25seTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICB2YWxpZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXHJcbn1cclxuXHJcbklucHV0LmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHJlYWRPbmx5OiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHZhbGlkOiB0cnVlXHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy90ZXh0LWFyZWEvdGV4dC1hcmVhLmpzeFxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbnB1dDoge1xuICAgICAgICB3aWR0aDogJzEwMCUnXG4gICAgfSxcbiAgICBmb2N1c2VkOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Ymx1ZSdcbiAgICB9LFxuICAgIHJlYWRPbmx5OiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGM0VGRUYnXG4gICAgfSxcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIG1hcmdpbjogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgd2lkdGg6ICc5OCUnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJ1xuICAgIH0sXG4gICAgbGFiZWw6IHtcbiAgICAgICAgbWFyZ2luOiAnNXB4J1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3RleHQtYXJlYS90ZXh0LWFyZWEtc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2RhdGEtZ3JpZC1zdHlsZXMnKSxcclxuICAgIGtleWRvd24gPSByZXF1aXJlKCdyZWFjdC1rZXlkb3duJyksXHJcbiAgICBLRVlTID0gWyAzOCwgNDBdOyAvLyDQvNC+0L3QuNGC0L7RgNC40Lwg0YLQvtC70YzQutC+INGB0YLRgNC10LvQutC4INCy0LLQtdGA0YUg0Lgg0LLQvdC40LfRhVxyXG5cclxuY29uc3QgaXNFeGlzdHMgPSBmdW5jdGlvbihvYmplY3QsIHByb3ApICB7XHJcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICBpZiAocHJvcCBpbiBvYmplY3QpIHtcclxuICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLy9Aa2V5ZG93biBAdG9kb1xyXG52YXIgX19fX0NsYXNzMz1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzM19fX19LZXkgaW4gX19fX0NsYXNzMyl7aWYoX19fX0NsYXNzMy5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3MzX19fX0tleSkpe0RhdGFHcmlkW19fX19DbGFzczNfX19fS2V5XT1fX19fQ2xhc3MzW19fX19DbGFzczNfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzMz1fX19fQ2xhc3MzPT09bnVsbD9udWxsOl9fX19DbGFzczMucHJvdG90eXBlO0RhdGFHcmlkLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3MzKTtEYXRhR3JpZC5wcm90b3R5cGUuY29uc3RydWN0b3I9RGF0YUdyaWQ7RGF0YUdyaWQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzMztcclxuICAgIGZ1bmN0aW9uIERhdGFHcmlkKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzMy5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zOiB0aGlzLnByb3BzLmdyaWRDb2x1bW5zLFxyXG4gICAgICAgICAgICBncmlkRGF0YTogdGhpcy5wcm9wcy5ncmlkRGF0YSxcclxuICAgICAgICAgICAgYWN0aXZlUm93OiAwLFxyXG4gICAgICAgICAgICBhY3RpdmVDb2x1bW46ICcnLFxyXG4gICAgICAgICAgICBzb3J0OiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oYW5kbGVHcmlkSGVhZGVyQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUNlbGxEYmxDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucHJlcGFyZVRhYmxlUm93ID0gdGhpcy5wcmVwYXJlVGFibGVSb3cuYmluZCh0aGlzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFHcmlkLnByb3RvdHlwZSxcImNvbXBvbmVudERpZE1vdW50XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L3QsNC00LXQvCDQv9C+INC/0L4gcHJvcHMudmFsdWUg0LjQvdC00LXQutGBINCw0LrRgtC40LLQvdC+0Lkg0YHRgtGA0L7QutC4XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudmFsdWUpIHtcclxuICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldEdyaWRSb3dJbmRleEJ5SWQodGhpcy5wcm9wcy52YWx1ZSk7XHJcbiAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlUm93OiBpbmRleH0pO1xyXG4gICAgICAgIH1cclxuICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEYXRhR3JpZC5wcm90b3R5cGUsXCJnZXRHcmlkUm93SW5kZXhCeUlkXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZG9jSWQpIHtcclxuICAgICAgICAvLyDQuNGJ0LXQvCDQuNC90LTQtdGFINCyINC80LDRgdGB0LjQstC1INC00LDQvdC90YvRhVxyXG4gICAgICAgIGxldCBpbmRleCA9IDAsXHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnByb3BzLmdyaWREYXRhO1xyXG5cclxuICAgICAgICBpZiAoZG9jSWQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcm93ID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cgJiYgZGF0YVtpXVsnaWQnXSA9PSBkb2NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFHcmlkLnByb3RvdHlwZSxcImhhbmRsZUNlbGxDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGlkeCkge1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQsNGC0YvQstCw0LXRgiDRgdC+0LHRi9GC0Lgg0LrQu9C40LrQsCDQv9C+INGP0YfQtdC50LrQtVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBhY3RpdmVSb3c6IGlkeFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5ncmlkRGF0YS5sZW5ndGggPiAwICYmIHRoaXMucHJvcHMub25DaGFuZ2VBY3Rpb24pIHtcclxuICAgICAgICAgICAgbGV0IGRvY0lkID0gdGhpcy5wcm9wcy5ncmlkRGF0YVtpZHhdLmlkO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25DbGljaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMucHJvcHMub25DaGFuZ2VBY3Rpb24sIGRvY0lkKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFHcmlkLnByb3RvdHlwZSxcImhhbmRsZUNlbGxEYmxDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGlkeCkge1xyXG4gICAgICAgIC8vINC+0YLQvNC10YLQuNC8INCw0LrRgtC40LLQvdGD0Y4g0YHRgtGA0L7QutGDINC4INCy0YvQt9C+0LLQtdC9INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPIGRibENsaWNrXHJcbiAgICAgICAgdGhpcy5oYW5kbGVDZWxsQ2xpY2soaWR4KVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uRGJsQ2xpY2spIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkRibENsaWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEYXRhR3JpZC5wcm90b3R5cGUsXCJoYW5kbGVHcmlkSGVhZGVyQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgbGV0ICBzb3J0ID0gdGhpcy5zdGF0ZS5zb3J0O1xyXG4gICAgICAgIGlmIChzb3J0Lm5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgc29ydC5kaXJlY3Rpb24gPSBzb3J0LmRpcmVjdGlvbiA9PT0gJ2FzYycgPyAnZGVzYyc6ICdhc2MnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNvcnQgPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiAnYXNjJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc29ydEJ5ID0gW3tjb2x1bW46IHNvcnQubmFtZSwgZGlyZWN0aW9uOiBzb3J0LmRpcmVjdGlvbn1dO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgYWN0aXZlQ29sdW1uOm5hbWUsXHJcbiAgICAgICAgICAgIHNvcnQ6IHNvcnRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25IZWFkZXJDbGljaykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSGVhZGVyQ2xpY2soc29ydEJ5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEYXRhR3JpZC5wcm90b3R5cGUsXCJoYW5kbGVLZXlEb3duXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIC8vINGA0LXQsNC60YbQuNGPINC90LAg0LrQu9Cw0LLQuNCw0YLRg9GA0YNcclxuICAgICAgICBsZXQgcm93SW5kZXggPSB0aGlzLnN0YXRlLmFjdGl2ZVJvdztcclxuICAgICAgICBzd2l0Y2ggKGUud2hpY2gpIHtcclxuICAgICAgICAgICAgY2FzZSA0MDpcclxuICAgICAgICAgICAgICAgIC8vINCy0L3QuNC3LCDRg9Cy0LXQu9C40YfQuNC8INCw0LrRgtC40LLQvdGD0Y4g0YHRgtGA0L7QutGDINC90LAgKyAxXHJcbiAgICAgICAgICAgICAgICByb3dJbmRleCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmdyaWREYXRhLmxlbmd0aCA8IHJvd0luZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0LLQtdGA0L3QtdC8INC/0YDQtdC20L3QtdC1INC30L3QsNGH0LXQvdC40LVcclxuICAgICAgICAgICAgICAgICAgICByb3dJbmRleCA9IHRoaXMuc3RhdGUuYWN0aXZlUm93XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgICAgIC8vINCy0L3QuNC3LCDRg9Cy0LXQu9C40YfQuNC8INCw0LrRgtC40LLQvdGD0Y4g0YHRgtGA0L7QutGDINC90LAgLSAxXHJcbiAgICAgICAgICAgICAgICByb3dJbmRleC0tO1xyXG4gICAgICAgICAgICAgICAgcm93SW5kZXggPSByb3dJbmRleCA8IDAgPyAwOiByb3dJbmRleDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICBhY3RpdmVSb3c6IHJvd0luZGV4XHJcbiAgICAgICAgIH0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEYXRhR3JpZC5wcm90b3R5cGUsXCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZENvbHVtbnM6IG5leHRQcm9wcy5ncmlkQ29sdW1ucywgZ3JpZERhdGE6bmV4dFByb3BzLmdyaWREYXRhfSlcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGF0YUdyaWQucHJvdG90eXBlLFwic2hvdWxkQ29tcG9uZW50VXBkYXRlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyBAdG9kbyDQtNC+0LHQsNCy0LjRgtGMINC/0YDQvtCy0LXRgNC60YMg0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0YHQvtGB0YLQvtGP0L3QuNGPXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFHcmlkLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjbGFzc05hbWUgPSAndGgnO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5UHJlc3MoJ0Rvd24nKSxcclxuICAgICAgICAgb25Eb3VibGVDbGljazogdGhpcy5oYW5kbGVDZWxsRGJsQ2xpY2soKSxcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwge3JlZjogXCJkYXRhR3JpZFRhYmxlXCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZVRhYmxlSGVhZGVyKClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVUYWJsZVJvdygpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgIH19KTsgLy8gcmVuZGVyXHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFHcmlkLnByb3RvdHlwZSxcInByZXBhcmVUYWJsZVJvd1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmdyaWREYXRhLm1hcChmdW5jdGlvbihyb3csIHJvd0luZGV4KSAge1xyXG4gICAgICAgICAgICBsZXQgc2V0Um93QWN0aXZlID0ge30sXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJbmRleCA9ICd0ci0nICsgcm93SW5kZXgsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVSb3cgPSB0aGlzLnN0YXRlLmFjdGl2ZVJvdztcclxuXHJcbiAgICAgICAgICAgIGxldCByb3dPYmplY3QgPSAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIHtcclxuICAgICAgICAgICAgICAgIHJlZjogb2JqZWN0SW5kZXgsIFxyXG4gICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDZWxsQ2xpY2suYmluZCh0aGlzLCByb3dJbmRleCksIFxyXG4gICAgICAgICAgICAgICAgb25Eb3VibGVDbGljazogdGhpcy5oYW5kbGVDZWxsRGJsQ2xpY2suYmluZCh0aGlzLCByb3dJbmRleCksIFxyXG4gICAgICAgICAgICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKSwgXHJcbiAgICAgICAgICAgICAgICBzdHlsZTogT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLnRyLCBhY3RpdmVSb3cgPT09IHJvd0luZGV4ID8gc3R5bGVzLmZvY3VzZWQ6IHt9KSwgXHJcbiAgICAgICAgICAgICAgICBrZXk6IG9iamVjdEluZGV4fSwgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmdyaWRDb2x1bW5zLm1hcChmdW5jdGlvbihjb2x1bW4sIGNvbHVtbkluZGV4KSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbEluZGV4ID0gJ3RkLScgKyByb3dJbmRleCArICctJyArIGNvbHVtbkluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3BsYXkgPSAoaXNFeGlzdHMoY29sdW1uLCAnc2hvdycpID8gY29sdW1uLnNob3c6IHRydWUpID8gdHJ1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IGlzRXhpc3RzKGNvbHVtbiwgJ3dpZHRoJykgPyBjb2x1bW4ud2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLnRkLCAhZGlzcGxheSA/IHtkaXNwbGF5OiAnbm9uZSd9IDoge30sIHt3aWR0aDogd2lkdGh9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwge3N0eWxlOiBzdHlsZSwgcmVmOiBjZWxsSW5kZXgsIGtleTogY2VsbEluZGV4fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93W2NvbHVtbi5pZF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByb3dPYmplY3Q7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLCB0aGlzKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGF0YUdyaWQucHJvdG90eXBlLFwicHJlcGFyZVRhYmxlSGVhZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGdyaWRDb2x1bW5zID0gdGhpcy5wcm9wcy5ncmlkQ29sdW1ucyxcclxuICAgICAgICAgICAgY2xhc3NOYW1lID0gJ3RoJztcclxuXHJcbiAgICAgICAgcmV0dXJuIGdyaWRDb2x1bW5zLm1hcChmdW5jdGlvbihjb2x1bW4sIGluZGV4KSAge1xyXG4gICAgICAgICAgICBsZXQgaGVhZGVySW5kZXggPSAndGgtJyArIGluZGV4O1xyXG5cclxuICAgICAgICAgICAgIGxldCBkaXNwbGF5ID0gKGlzRXhpc3RzKGNvbHVtbiwgJ3Nob3cnKSA/IGNvbHVtbi5zaG93OiB0cnVlKSA/IHRydWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgIHdpZHRoID0gaXNFeGlzdHMoY29sdW1uLCAnd2lkdGgnKSA/IGNvbHVtbi53aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgIHN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLnRoLCAhZGlzcGxheSA/IHtkaXNwbGF5OiAnbm9uZSd9IDoge30sIHt3aWR0aDogd2lkdGh9KSxcclxuICAgICAgICAgICAgICAgICBhY3RpdmVDb2x1bW4gPSB0aGlzLnN0YXRlLmFjdGl2ZUNvbHVtbixcclxuICAgICAgICAgICAgICAgICBpY29uVHlwZSA9IHRoaXMuc3RhdGUuc29ydC5kaXJlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgaW1hZ2VTdHlsZUFzYyA9IE9iamVjdC5hc3NpZ24oe30sc3R5bGVzLmltYWdlLCAoYWN0aXZlQ29sdW1uID09IGNvbHVtbi5pZCAmJiBpY29uVHlwZSA9PSAnYXNjJyApICA/IHt9OiB7ZGlzcGxheTogJ25vbmUnfSksXHJcbiAgICAgICAgICAgICAgICAgaW1hZ2VTdHlsZURlc2MgPSBPYmplY3QuYXNzaWduKHt9LHN0eWxlcy5pbWFnZSwgKGFjdGl2ZUNvbHVtbiA9PSBjb2x1bW4uaWQgJiYgaWNvblR5cGUgPT0gJ2Rlc2MnICkgID8ge306IHtkaXNwbGF5OiAnbm9uZSd9KVxyXG5cclxuICAgICAgICAgICAgLy8g0YPRgdGC0LDQvdC+0LLQuNGC0Ywg0LLQuNC00LjQvNC+0YHRgtGMXHJcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHN0eWxlLCBcclxuICAgICAgICAgICAgICAgIHJlZjogaGVhZGVySW5kZXgsIFxyXG4gICAgICAgICAgICAgICAga2V5OiBoZWFkZXJJbmRleCwgXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUdyaWRIZWFkZXJDbGljay5iaW5kKHRoaXMsIGNvbHVtbi5pZCl9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIGNvbHVtbi5uYW1lKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIiwge3JlZjogXCJpbWFnZUFzY1wiLCBzdHlsZTogaW1hZ2VTdHlsZUFzYywgc3JjOiBzdHlsZXMuaWNvbnNbJ2FzYyddfSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VEZXNjXCIsIHN0eWxlOiBpbWFnZVN0eWxlRGVzYywgc3JjOiBzdHlsZXMuaWNvbnNbJ2Rlc2MnXX0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMpO1xyXG4gICAgfX0pO1xyXG5cclxuXHJcbkRhdGFHcmlkLnByb3BUeXBlcyA9IHtcclxuICAgIGdyaWRDb2x1bW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgIGdyaWREYXRhOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgIG9uQ2hhbmdlQWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkRibENsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uSGVhZGVyQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG4gICAgYWN0aXZlUm93OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXHJcbn1cclxuXHJcblxyXG5EYXRhR3JpZC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBncmlkQ29sdW1uczogW10sXHJcbiAgICBncmlkRGF0YTogW11cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGF0YUdyaWQ7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhLWdyaWQvZGF0YS1ncmlkLmpzeFxuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB0aDoge1xuICAgICAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdncmV5JyxcbiAgICAgICAgaGVpZ2h0OiAnNTBweCcsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBsaWdodGdyYXknXG4gICAgfSxcblxuICAgIHRyOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJ1xuICAgIH0sXG5cbiAgICBmb2N1c2VkOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Ymx1ZSdcbiAgICB9LFxuXG4gICAgdGQ6IHtcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGxpZ2h0Z3JheSdcbiAgICB9LFxuXG4gICAgaWNvbnM6IHtcbiAgICAgICAgYXNjOiAnL2ltYWdlcy9pY29ucy9zb3J0LWFscGhhLWFzYy5wbmcnLFxuICAgICAgICBkZXNjOiAnL2ltYWdlcy9pY29ucy9zb3J0LWFscGhhLWRlc2MucG5nJ1xuICAgIH0sXG5cbiAgICBpbWFnZToge1xuICAgICAgICBtYXJnaW46ICcxcHgnXG4gICAgfVxuXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhLWdyaWQvZGF0YS1ncmlkLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLy8gcG9seWZpbGwgYXJyYXkuZnJvbSAobWFpbmx5IGZvciBJRSlcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZShvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9ialsnZGVmYXVsdCddIDogb2JqO1xufVxuXG5yZXF1aXJlKCcuL2xpYi9hcnJheS5mcm9tJyk7XG5cbi8vIEBrZXlkb3duIGFuZCBAa2V5ZG93blNjb3BlZFxuXG52YXIgX2RlY29yYXRvcnMgPSByZXF1aXJlKCcuL2RlY29yYXRvcnMnKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gX2ludGVyb3BSZXF1aXJlKF9kZWNvcmF0b3JzKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAna2V5ZG93blNjb3BlZCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9kZWNvcmF0b3JzLmtleWRvd25TY29wZWQ7XG4gIH1cbn0pO1xuXG4vLyBzZXRCaW5kaW5nIC0gb25seSB1c2VmdWwgaWYgeW91J3JlIG5vdCBnb2luZyB0byB1c2UgZGVjb3JhdG9yc1xuXG52YXIgX3N0b3JlID0gcmVxdWlyZSgnLi9zdG9yZScpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3NldEJpbmRpbmcnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfc3RvcmUuc2V0QmluZGluZztcbiAgfVxufSk7XG5cbi8vIEtleXMgLSB1c2UgdGhpcyB0byBmaW5kIGtleSBjb2RlcyBmb3Igc3RyaW5ncy4gZm9yIGV4YW1wbGU6IEtleXMuaiwgS2V5cy5lbnRlclxuXG52YXIgX2xpYktleXMgPSByZXF1aXJlKCcuL2xpYi9rZXlzJyk7XG5cbmV4cG9ydHMuS2V5cyA9IF9pbnRlcm9wUmVxdWlyZShfbGliS2V5cyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLy8gUHJvZHVjdGlvbiBzdGVwcyBvZiBFQ01BLTI2MiwgRWRpdGlvbiA2LCAyMi4xLjIuMVxuLy8gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2Zyb21cbid1c2Ugc3RyaWN0JztcblxuaWYgKCFBcnJheS5mcm9tKSB7XG4gIEFycmF5LmZyb20gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgICB2YXIgaXNDYWxsYWJsZSA9IGZ1bmN0aW9uIGlzQ2FsbGFibGUoZm4pIHtcbiAgICAgIHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgfHwgdG9TdHIuY2FsbChmbikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgfTtcbiAgICB2YXIgdG9JbnRlZ2VyID0gZnVuY3Rpb24gdG9JbnRlZ2VyKHZhbHVlKSB7XG4gICAgICB2YXIgbnVtYmVyID0gTnVtYmVyKHZhbHVlKTtcbiAgICAgIGlmIChpc05hTihudW1iZXIpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgaWYgKG51bWJlciA9PT0gMCB8fCAhaXNGaW5pdGUobnVtYmVyKSkge1xuICAgICAgICByZXR1cm4gbnVtYmVyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChudW1iZXIgPiAwID8gMSA6IC0xKSAqIE1hdGguZmxvb3IoTWF0aC5hYnMobnVtYmVyKSk7XG4gICAgfTtcbiAgICB2YXIgbWF4U2FmZUludGVnZXIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuICAgIHZhciB0b0xlbmd0aCA9IGZ1bmN0aW9uIHRvTGVuZ3RoKHZhbHVlKSB7XG4gICAgICB2YXIgbGVuID0gdG9JbnRlZ2VyKHZhbHVlKTtcbiAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChsZW4sIDApLCBtYXhTYWZlSW50ZWdlcik7XG4gICAgfTtcblxuICAgIC8vIFRoZSBsZW5ndGggcHJvcGVydHkgb2YgdGhlIGZyb20gbWV0aG9kIGlzIDEuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qLCBtYXBGbiwgdGhpc0FyZyAqLykge1xuICAgICAgLy8gMS4gTGV0IEMgYmUgdGhlIHRoaXMgdmFsdWUuXG4gICAgICB2YXIgQyA9IHRoaXM7XG5cbiAgICAgIC8vIDIuIExldCBpdGVtcyBiZSBUb09iamVjdChhcnJheUxpa2UpLlxuICAgICAgdmFyIGl0ZW1zID0gT2JqZWN0KGFycmF5TGlrZSk7XG5cbiAgICAgIC8vIDMuIFJldHVybklmQWJydXB0KGl0ZW1zKS5cbiAgICAgIGlmIChhcnJheUxpa2UgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJyYXkuZnJvbSByZXF1aXJlcyBhbiBhcnJheS1saWtlIG9iamVjdCAtIG5vdCBudWxsIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gNC4gSWYgbWFwZm4gaXMgdW5kZWZpbmVkLCB0aGVuIGxldCBtYXBwaW5nIGJlIGZhbHNlLlxuICAgICAgdmFyIG1hcEZuID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB2b2lkIHVuZGVmaW5lZDtcbiAgICAgIHZhciBUO1xuICAgICAgaWYgKHR5cGVvZiBtYXBGbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gNS4gZWxzZVxuICAgICAgICAvLyA1LiBhIElmIElzQ2FsbGFibGUobWFwZm4pIGlzIGZhbHNlLCB0aHJvdyBhIFR5cGVFcnJvciBleGNlcHRpb24uXG4gICAgICAgIGlmICghaXNDYWxsYWJsZShtYXBGbikpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5mcm9tOiB3aGVuIHByb3ZpZGVkLCB0aGUgc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gNS4gYi4gSWYgdGhpc0FyZyB3YXMgc3VwcGxpZWQsIGxldCBUIGJlIHRoaXNBcmc7IGVsc2UgbGV0IFQgYmUgdW5kZWZpbmVkLlxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICBUID0gYXJndW1lbnRzWzJdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIDEwLiBMZXQgbGVuVmFsdWUgYmUgR2V0KGl0ZW1zLCBcImxlbmd0aFwiKS5cbiAgICAgIC8vIDExLiBMZXQgbGVuIGJlIFRvTGVuZ3RoKGxlblZhbHVlKS5cbiAgICAgIHZhciBsZW4gPSB0b0xlbmd0aChpdGVtcy5sZW5ndGgpO1xuXG4gICAgICAvLyAxMy4gSWYgSXNDb25zdHJ1Y3RvcihDKSBpcyB0cnVlLCB0aGVuXG4gICAgICAvLyAxMy4gYS4gTGV0IEEgYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBbW0NvbnN0cnVjdF1dIGludGVybmFsIG1ldGhvZFxuICAgICAgLy8gb2YgQyB3aXRoIGFuIGFyZ3VtZW50IGxpc3QgY29udGFpbmluZyB0aGUgc2luZ2xlIGl0ZW0gbGVuLlxuICAgICAgLy8gMTQuIGEuIEVsc2UsIExldCBBIGJlIEFycmF5Q3JlYXRlKGxlbikuXG4gICAgICB2YXIgQSA9IGlzQ2FsbGFibGUoQykgPyBPYmplY3QobmV3IEMobGVuKSkgOiBuZXcgQXJyYXkobGVuKTtcblxuICAgICAgLy8gMTYuIExldCBrIGJlIDAuXG4gICAgICB2YXIgayA9IDA7XG4gICAgICAvLyAxNy4gUmVwZWF0LCB3aGlsZSBrIDwgbGVu4oCmIChhbHNvIHN0ZXBzIGEgLSBoKVxuICAgICAgdmFyIGtWYWx1ZTtcbiAgICAgIHdoaWxlIChrIDwgbGVuKSB7XG4gICAgICAgIGtWYWx1ZSA9IGl0ZW1zW2tdO1xuICAgICAgICBpZiAobWFwRm4pIHtcbiAgICAgICAgICBBW2tdID0gdHlwZW9mIFQgPT09ICd1bmRlZmluZWQnID8gbWFwRm4oa1ZhbHVlLCBrKSA6IG1hcEZuLmNhbGwoVCwga1ZhbHVlLCBrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBBW2tdID0ga1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGsgKz0gMTtcbiAgICAgIH1cbiAgICAgIC8vIDE4LiBMZXQgcHV0U3RhdHVzIGJlIFB1dChBLCBcImxlbmd0aFwiLCBsZW4sIHRydWUpLlxuICAgICAgQS5sZW5ndGggPSBsZW47XG4gICAgICAvLyAyMC4gUmV0dXJuIEEuXG4gICAgICByZXR1cm4gQTtcbiAgICB9O1xuICB9KCk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvYXJyYXkuZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLyoqXG4gKiBAbW9kdWxlIGRlY29yYXRvcnNcbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTtcbn1cblxudmFyIF9jbGFzc19kZWNvcmF0b3IgPSByZXF1aXJlKCcuL2NsYXNzX2RlY29yYXRvcicpO1xuXG52YXIgX2NsYXNzX2RlY29yYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc19kZWNvcmF0b3IpO1xuXG52YXIgX21ldGhvZF9kZWNvcmF0b3IgPSByZXF1aXJlKCcuL21ldGhvZF9kZWNvcmF0b3InKTtcblxudmFyIF9tZXRob2RfZGVjb3JhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21ldGhvZF9kZWNvcmF0b3IpO1xuXG52YXIgX21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkID0gcmVxdWlyZSgnLi9tZXRob2RfZGVjb3JhdG9yX3Njb3BlZCcpO1xuXG52YXIgX21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkKTtcblxuLyoqXG4gKiBfZGVjb3JhdG9yXG4gKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2RGbiBUaGUgbWV0aG9kIHdyYXBwZXIgdG8gZGVsZWdhdGUgdG8sIGJhc2VkIG9uIHdoZXRoZXIgdXNlciBoYXMgc3BlY2lmaWVkIGEgc2NvcGVkIGRlY29yYXRvciBvciBub3RcbiAqIEBwYXJhbSB7QXJyYXl9IC4uLmFyZ3MgUmVtYWluZGVyIG9mIGFyZ3VtZW50cyBwYXNzZWQgaW5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgZGVjb3JhdGVkIGNsYXNzIG9yIG1ldGhvZFxuICovXG5mdW5jdGlvbiBfZGVjb3JhdG9yKG1ldGhvZEZuKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgLy8gY2hlY2sgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHNlZSBpZiBpdCdzIGEgdXNlci1zdXBwbGllZCBrZXljb2RlIG9yIGFycmF5XG4gIC8vIG9mIGtleWNvZGVzLCBvciBpZiBpdCdzIHRoZSB3cmFwcGVkIGNsYXNzIG9yIG1ldGhvZFxuICB2YXIgdGVzdEFyZyA9IGFyZ3NbMF07XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSh0ZXN0QXJnKTtcblxuICAvLyBpZiB0aGUgdGVzdCBhcmd1bWVudCBpcyBub3QgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uLCBpdCBpcyB1c2VyLXN1cHBsaWVkXG4gIC8vIGtleWNvZGVzLiBlbHNlIHRoZXJlIGFyZSBubyBhcmd1bWVudHMgYW5kIGl0J3MganVzdCB0aGUgd3JhcHBlZCBjbGFzc1xuICAvLyAobWV0aG9kIGRlY29yYXRvcnMgbXVzdCBoYXZlIGtleWNvZGUgYXJndW1lbnRzKS5cbiAgaWYgKGlzQXJyYXkgfHwgflsnc3RyaW5nJywgJ251bWJlciddLmluZGV4T2YodHlwZW9mIHRlc3RBcmcgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHRlc3RBcmcpKSkge1xuICAgIHZhciBfcmV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGtleXMgPSBpc0FycmF5ID8gdGVzdEFyZyA6IGFyZ3M7XG5cbiAgICAgIC8vIHJldHVybiB0aGUgZGVjb3JhdG9yIGZ1bmN0aW9uLCB3aGljaCBvbiB0aGUgbmV4dCBjYWxsIHdpbGwgbG9vayBmb3JcbiAgICAgIC8vIHRoZSBwcmVzZW5jZSBvZiBhIG1ldGhvZCBuYW1lIHRvIGRldGVybWluZSBpZiB0aGlzIGlzIGEgd3JhcHBlZCBtZXRob2RcbiAgICAgIC8vIG9yIGNvbXBvbmVudFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdjogZnVuY3Rpb24gdih0YXJnZXQsIG1ldGhvZE5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICByZXR1cm4gbWV0aG9kTmFtZSA/IG1ldGhvZEZuKHsgdGFyZ2V0OiB0YXJnZXQsIGRlc2NyaXB0b3I6IGRlc2NyaXB0b3IsIGtleXM6IGtleXMgfSkgOiAoMCwgX2NsYXNzX2RlY29yYXRvcjJbJ2RlZmF1bHQnXSkodGFyZ2V0LCBrZXlzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICBpZiAoKHR5cGVvZiBfcmV0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihfcmV0KSkgPT09ICdvYmplY3QnKSByZXR1cm4gX3JldC52O1xuICB9IGVsc2Uge1xuICAgIHZhciBtZXRob2ROYW1lID0gYXJnc1sxXTtcblxuICAgIC8vIG1ldGhvZCBkZWNvcmF0b3JzIHdpdGhvdXQga2V5Y29kZSAod2hpY2gpIGFyZ3VtZW50cyBhcmUgbm90IGFsbG93ZWQuXG4gICAgaWYgKCFtZXRob2ROYW1lKSB7XG4gICAgICByZXR1cm4gX2NsYXNzX2RlY29yYXRvcjJbJ2RlZmF1bHQnXS5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4obWV0aG9kTmFtZSArICc6IE1ldGhvZCBkZWNvcmF0b3JzIG11c3QgaGF2ZSBrZXljb2RlIGFyZ3VtZW50cywgc28gdGhlIGRlY29yYXRvciBmb3IgdGhpcyBtZXRob2Qgd2lsbCBub3QgZG8gYW55dGhpbmcnKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBrZXlkb3duU2NvcGVkXG4gKlxuICogTWV0aG9kIGRlY29yYXRvciB0aGF0IHdpbGwgbG9vayBmb3IgY2hhbmdlcyB0byBpdHMgdGFyZ2V0ZWQgY29tcG9uZW50J3NcbiAqIGBrZXlkb3duYCBwcm9wcyB0byBkZWNpZGUgd2hlbiB0byB0cmlnZ2VyLCByYXRoZXIgdGhhbiByZXNwb25kaW5nIGRpcmVjdGx5XG4gKiB0byBrZXlkb3duIGV2ZW50cy4gVGhpcyBsZXRzIHlvdSBzcGVjaWZ5IGEgQGtleWRvd24gZGVjb3JhdGVkIGNsYXNzIGhpZ2hlclxuICogdXAgaW4gdGhlIHZpZXcgaGllcmFyY2h5IGZvciBsYXJnZXIgc2NvcGluZyBvZiBrZXlkb3duIGV2ZW50cywgb3IgZm9yXG4gKiBwcm9ncmFtbWF0aWNhbGx5IHNlbmRpbmcga2V5ZG93biBldmVudHMgYXMgcHJvcHMgaW50byB0aGUgY29tcG9uZW50cyBpbiBvcmRlclxuICogdG8gdHJpZ2dlciBkZWNvcmF0ZWQgbWV0aG9kcyB3aXRoIG1hdGNoaW5nIGtleXMuXG4gKlxuICogQGFjY2VzcyBwdWJsaWNcbiAqIEBwYXJhbSB7QXJyYXl9IC4uLmFyZ3MgIEFsbCAob3Igbm8pIGFyZ3VtZW50cyBwYXNzZWQgaW4gZnJvbSBkZWNvcmF0aW9uXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGRlY29yYXRlZCBjbGFzcyBvciBtZXRob2RcbiAqL1xuZnVuY3Rpb24ga2V5ZG93blNjb3BlZCgpIHtcbiAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gIH1cblxuICByZXR1cm4gX2RlY29yYXRvci5hcHBseSh1bmRlZmluZWQsIFtfbWV0aG9kX2RlY29yYXRvcl9zY29wZWQyWydkZWZhdWx0J11dLmNvbmNhdChhcmdzKSk7XG59XG5cbi8qKlxuICoga2V5ZG93blxuICpcbiAqIFRoZSBtYWluIGRlY29yYXRvciBhbmQgZGVmYXVsdCBleHBvcnQsIGhhbmRsZXMgYm90aCBjbGFzc2VzIGFuZCBtZXRob2RzLlxuICpcbiAqIEBhY2Nlc3MgcHVibGljXG4gKiBAcGFyYW0ge0FycmF5fSAuLi5hcmdzICBBbGwgKG9yIG5vKSBhcmd1bWVudHMgcGFzc2VkIGluIGZyb20gZGVjb3JhdGlvblxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBkZWNvcmF0ZWQgY2xhc3Mgb3IgbWV0aG9kXG4gKi9cbmZ1bmN0aW9uIGtleWRvd24oKSB7XG4gIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgYXJnc1tfa2V5M10gPSBhcmd1bWVudHNbX2tleTNdO1xuICB9XG5cbiAgcmV0dXJuIF9kZWNvcmF0b3IuYXBwbHkodW5kZWZpbmVkLCBbX21ldGhvZF9kZWNvcmF0b3IyWydkZWZhdWx0J11dLmNvbmNhdChhcmdzKSk7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGtleWRvd247XG5leHBvcnRzLmtleWRvd25TY29wZWQgPSBrZXlkb3duU2NvcGVkO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1rZXlkb3duL2Rpc3QvZGVjb3JhdG9ycy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLyoqXG4gKiBAbW9kdWxlIGNvbXBvbmVudFdyYXBwZXJcbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfXJldHVybiB0YXJnZXQ7XG59O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO2Rlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7aWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfXJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtyZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94MiwgX3gzLCBfeDQpIHtcbiAgdmFyIF9hZ2FpbiA9IHRydWU7X2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7XG4gICAgdmFyIG9iamVjdCA9IF94MixcbiAgICAgICAgcHJvcGVydHkgPSBfeDMsXG4gICAgICAgIHJlY2VpdmVyID0gX3g0O19hZ2FpbiA9IGZhbHNlO2lmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTt2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7aWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpO2lmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF94MiA9IHBhcmVudDtfeDMgPSBwcm9wZXJ0eTtfeDQgPSByZWNlaXZlcjtfYWdhaW4gPSB0cnVlO2Rlc2MgPSBwYXJlbnQgPSB1bmRlZmluZWQ7Y29udGludWUgX2Z1bmN0aW9uO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7XG4gICAgICByZXR1cm4gZGVzYy52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGdldHRlciA9IGRlc2MuZ2V0O2lmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfXJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9O1xufVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgKHR5cGVvZiBzdXBlckNsYXNzID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihzdXBlckNsYXNzKSkpO1xuICB9c3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTtpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9zdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3JlJyk7XG5cbnZhciBfc3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3RvcmUpO1xuXG52YXIgX2V2ZW50X2hhbmRsZXJzID0gcmVxdWlyZSgnLi4vZXZlbnRfaGFuZGxlcnMnKTtcblxuLyoqXG4gKiBjb21wb25lbnRXcmFwcGVyXG4gKlxuICogQGFjY2VzcyBwdWJsaWNcbiAqIEBwYXJhbSB7b2JqZWN0fSBXcmFwcGVkQ29tcG9uZW50IFJlYWN0IGNvbXBvbmVudCBjbGFzcyB0byBiZSB3cmFwcGVkXG4gKiBAcGFyYW0ge2FycmF5fSBba2V5c10gVGhlIGtleShzKSBib3VuZCB0byB0aGUgY2xhc3NcbiAqIEByZXR1cm4ge29iamVjdH0gVGhlIGhpZ2hlci1vcmRlciBmdW5jdGlvbiB0aGF0IHdyYXBzIHRoZSBkZWNvcmF0ZWQgY2xhc3NcbiAqL1xuZnVuY3Rpb24gY29tcG9uZW50V3JhcHBlcihXcmFwcGVkQ29tcG9uZW50KSB7XG4gIHZhciBrZXlzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1sxXTtcblxuICB2YXIgS2V5Qm9hcmRIZWxwZXIgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhLZXlCb2FyZEhlbHBlciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBLZXlCb2FyZEhlbHBlcihwcm9wcykge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEtleUJvYXJkSGVscGVyKTtcblxuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoS2V5Qm9hcmRIZWxwZXIucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBwcm9wcyk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBldmVudDogbnVsbFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoS2V5Qm9hcmRIZWxwZXIsIFt7XG4gICAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgICgwLCBfZXZlbnRfaGFuZGxlcnMub25Nb3VudCkodGhpcyk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICAoMCwgX2V2ZW50X2hhbmRsZXJzLm9uVW5tb3VudCkodGhpcyk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnaGFuZGxlS2V5RG93bicsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIC8vIHRvIHNpbXVsYXRlIGEga2V5cHJlc3MsIHNldCB0aGUgZXZlbnQgYW5kIHRoZW4gY2xlYXIgaXQgaW4gdGhlIGNhbGxiYWNrXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBldmVudDogZXZlbnQgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5zZXRTdGF0ZSh7IGV2ZW50OiBudWxsIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFdyYXBwZWRDb21wb25lbnQsIF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLCB7IGtleWRvd246IHRoaXMuc3RhdGUgfSkpO1xuICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBLZXlCb2FyZEhlbHBlcjtcbiAgfShfcmVhY3QyWydkZWZhdWx0J10uQ29tcG9uZW50KTtcblxuICBfc3RvcmUyWydkZWZhdWx0J10uc2V0QmluZGluZyh7IGtleXM6IGtleXMsIGZuOiBLZXlCb2FyZEhlbHBlci5wcm90b3R5cGUuaGFuZGxlS2V5RG93biwgdGFyZ2V0OiBLZXlCb2FyZEhlbHBlci5wcm90b3R5cGUgfSk7XG5cbiAgcmV0dXJuIEtleUJvYXJkSGVscGVyO1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBjb21wb25lbnRXcmFwcGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9kZWNvcmF0b3JzL2NsYXNzX2RlY29yYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLyoqXG4gKiBAbW9kdWxlIHN0b3JlXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTt2YXIgX24gPSB0cnVlO3ZhciBfZCA9IGZhbHNlO3ZhciBfZSA9IHVuZGVmaW5lZDt0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO2lmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVsncmV0dXJuJ10pIF9pWydyZXR1cm4nXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9cmV0dXJuIF9hcnI7XG4gIH1yZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHtcbiAgICAgIHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UnKTtcbiAgICB9XG4gIH07XG59KCk7XG5cbmV4cG9ydHMuX3Jlc2V0U3RvcmUgPSBfcmVzZXRTdG9yZTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTtcbn1cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9cmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJyKTtcbiAgfVxufVxuXG52YXIgX2xpYktleXMgPSByZXF1aXJlKCcuL2xpYi9rZXlzJyk7XG5cbnZhciBfbGliTWF0Y2hfa2V5cyA9IHJlcXVpcmUoJy4vbGliL21hdGNoX2tleXMnKTtcblxudmFyIF9saWJNYXRjaF9rZXlzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xpYk1hdGNoX2tleXMpO1xuXG52YXIgX2xpYlBhcnNlX2tleXMgPSByZXF1aXJlKCcuL2xpYi9wYXJzZV9rZXlzJyk7XG5cbnZhciBfbGliUGFyc2Vfa2V5czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9saWJQYXJzZV9rZXlzKTtcblxudmFyIF9saWJVdWlkID0gcmVxdWlyZSgnLi9saWIvdXVpZCcpO1xuXG52YXIgX2xpYlV1aWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGliVXVpZCk7XG5cbi8qKlxuICogcHJpdmF0ZVxuICogXG4gKi9cblxuLy8gZGljdCBmb3IgY2xhc3MgcHJvdG90eXBlcyA9PiBiaW5kaW5nc1xudmFyIF9oYW5kbGVycyA9IG5ldyBNYXAoKTtcblxuLy8gYWxsIG1vdW50ZWQgaW5zdGFuY2VzIHRoYXQgaGF2ZSBrZXliaW5kaW5nc1xudmFyIF9pbnN0YW5jZXMgPSBuZXcgU2V0KCk7XG5cbi8vIGZvciB0ZXN0aW5nXG5cbmZ1bmN0aW9uIF9yZXNldFN0b3JlKCkge1xuICBfaGFuZGxlcnMuY2xlYXIoKTtcbiAgX2luc3RhbmNlcy5jbGVhcigpO1xufVxuXG4vKipcbiAqIHB1YmxpY1xuICpcbiAqL1xuXG52YXIgU3RvcmUgPSB7XG5cbiAgLyoqXG4gICAqIGFjdGl2YXRlXG4gICAqXG4gICAqIEBhY2Nlc3MgcHVibGljXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpbnN0YW5jZSBJbnN0YW50aWF0ZWQgY2xhc3MgdGhhdCBleHRlbmRlZCBSZWFjdC5Db21wb25lbnQsIHRvIGJlIGZvY3VzZWQgdG8gcmVjZWl2ZSBrZXlkb3duIGV2ZW50c1xuICAgKi9cbiAgYWN0aXZhdGU6IGZ1bmN0aW9uIGFjdGl2YXRlKGluc3RhbmNlcykge1xuICAgIHZhciBpbnN0YW5jZXNBcnJheSA9IFtdLmNvbmNhdChpbnN0YW5jZXMpO1xuXG4gICAgLy8gaWYgbm8gY29tcG9uZW50cyB3ZXJlIGZvdW5kIGFzIGFuY2VzdG9ycyBvZiB0aGUgZXZlbnQgdGFyZ2V0LFxuICAgIC8vIGVmZmVjdGl2ZWx5IGRlYWN0aXZhdGUga2V5ZG93biBoYW5kbGluZyBieSBjYXBwaW5nIHRoZSBzZXQgb2YgaW5zdGFuY2VzXG4gICAgLy8gd2l0aCBgbnVsbGAuXG4gICAgaWYgKCFpbnN0YW5jZXNBcnJheS5sZW5ndGgpIHtcbiAgICAgIF9pbnN0YW5jZXMuYWRkKG51bGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfaW5zdGFuY2VzWydkZWxldGUnXShudWxsKTtcblxuICAgICAgLy8gZGVsZXRpbmcgYW5kIHRoZW4gYWRkaW5nIHRoZSBpbnN0YW5jZShzKSBoYXMgdGhlIGVmZmVjdCBvZiBzb3J0aW5nIHRoZSBzZXRcbiAgICAgIC8vIGFjY29yZGluZyB0byBpbnN0YW5jZSBhY3RpdmF0aW9uIChhc2NlbmRpbmcpXG4gICAgICBpbnN0YW5jZXNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICBfaW5zdGFuY2VzWydkZWxldGUnXShpbnN0YW5jZSk7XG4gICAgICAgIF9pbnN0YW5jZXMuYWRkKGluc3RhbmNlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogZGVsZXRlSW5zdGFuY2VcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBJbnN0YW50aWF0ZWQgY2xhc3MgdGhhdCBleHRlbmRlZCBSZWFjdC5Db21wb25lbnRcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVGhlIHZhbHVlIHNldC5oYXMoIHRhcmdldCApIHdvdWxkIGhhdmUgcmV0dXJuZWQgcHJpb3IgdG8gZGVsZXRpb25cbiAgICovXG4gIGRlbGV0ZUluc3RhbmNlOiBmdW5jdGlvbiBkZWxldGVJbnN0YW5jZSh0YXJnZXQpIHtcbiAgICBfaW5zdGFuY2VzWydkZWxldGUnXSh0YXJnZXQpO1xuICB9LFxuXG4gIGZpbmRCaW5kaW5nRm9yRXZlbnQ6IGZ1bmN0aW9uIGZpbmRCaW5kaW5nRm9yRXZlbnQoZXZlbnQpIHtcbiAgICBpZiAoIV9pbnN0YW5jZXMuaGFzKG51bGwpKSB7XG4gICAgICB2YXIga2V5TWF0Y2hlc0V2ZW50ID0gZnVuY3Rpb24ga2V5TWF0Y2hlc0V2ZW50KGtleVNldCkge1xuICAgICAgICByZXR1cm4gKDAsIF9saWJNYXRjaF9rZXlzMlsnZGVmYXVsdCddKSh7IGtleVNldDoga2V5U2V0LCBldmVudDogZXZlbnQgfSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBsb29wIHRocm91Z2ggaW5zdGFuY2VzIGluIHJldmVyc2UgYWN0aXZhdGlvbiBvcmRlciBzbyB0aGF0IG1vc3RcbiAgICAgIC8vIHJlY2VudGx5IGFjdGl2YXRlZCBpbnN0YW5jZSBnZXRzIGZpcnN0IGRpYnMgb24gZXZlbnRcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KF9pbnN0YW5jZXMpKS5yZXZlcnNlKClbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGluc3RhbmNlID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICB2YXIgYmluZGluZ3MgPSB0aGlzLmdldEJpbmRpbmcoaW5zdGFuY2UuY29uc3RydWN0b3IucHJvdG90eXBlKTtcbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBiaW5kaW5nc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgICAgICB2YXIgX3N0ZXAyJHZhbHVlID0gX3NsaWNlZFRvQXJyYXkoX3N0ZXAyLnZhbHVlLCAyKTtcblxuICAgICAgICAgICAgICB2YXIga2V5U2V0cyA9IF9zdGVwMiR2YWx1ZVswXTtcbiAgICAgICAgICAgICAgdmFyIGZuID0gX3N0ZXAyJHZhbHVlWzFdO1xuXG4gICAgICAgICAgICAgIGlmICgoMCwgX2xpYktleXMuYWxsS2V5cykoa2V5U2V0cykgfHwga2V5U2V0cy5zb21lKGtleU1hdGNoZXNFdmVudCkpIHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gd2hlbiBtYXRjaGluZyBrZXliaW5kaW5nIGlzIGZvdW5kIC0gaS5lLiBvbmx5IG9uZVxuICAgICAgICAgICAgICAgIC8vIGtleWJvdW5kIGNvbXBvbmVudCBjYW4gcmVzcG9uZCB0byBhIGdpdmVuIGtleSBjb2RlLiB0byBnZXQgYXJvdW5kIHRoaXMsXG4gICAgICAgICAgICAgICAgLy8gc2NvcGUgYSBjb21tb24gYW5jZXN0b3IgY29tcG9uZW50IGNsYXNzIHdpdGggQGtleWRvd24gYW5kIHVzZVxuICAgICAgICAgICAgICAgIC8vIEBrZXlkb3duU2NvcGVkIHRvIGJpbmQgdGhlIGR1cGxpY2F0ZSBrZXlzIGluIHlvdXIgY2hpbGQgY29tcG9uZW50c1xuICAgICAgICAgICAgICAgIC8vIChvciBqdXN0IGluc3BlY3QgbmV4dFByb3BzLmtleWRvd24uZXZlbnQpLlxuICAgICAgICAgICAgICAgIHJldHVybiB7IGZuOiBmbiwgaW5zdGFuY2U6IGluc3RhbmNlIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMlsncmV0dXJuJ10pIHtcbiAgICAgICAgICAgICAgICBfaXRlcmF0b3IyWydyZXR1cm4nXSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvclsncmV0dXJuJ10pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvclsncmV0dXJuJ10oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGdldEJpbmRpbmdcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBDbGFzcyB1c2VkIGFzIGtleSBpbiBkaWN0IG9mIGtleSBiaW5kaW5nc1xuICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBvYmplY3QgY29udGFpbmluZyBiaW5kaW5ncyBmb3IgdGhlIGdpdmVuIGNsYXNzXG4gICAqL1xuICBnZXRCaW5kaW5nOiBmdW5jdGlvbiBnZXRCaW5kaW5nKF9yZWYpIHtcbiAgICB2YXIgX19yZWFjdEtleWRvd25VVUlEID0gX3JlZi5fX3JlYWN0S2V5ZG93blVVSUQ7XG5cbiAgICByZXR1cm4gX2hhbmRsZXJzLmdldChfX3JlYWN0S2V5ZG93blVVSUQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBnZXRJbnN0YW5jZXNcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICogQHJldHVybiB7c2V0fSBBbGwgc3RvcmVkIGluc3RhbmNlcyAoYWxsIG1vdW50ZWQgY29tcG9uZW50IGluc3RhbmNlcyB3aXRoIGtleWJpbmRpbmdzKVxuICAgKi9cbiAgZ2V0SW5zdGFuY2VzOiBmdW5jdGlvbiBnZXRJbnN0YW5jZXMoKSB7XG4gICAgcmV0dXJuIF9pbnN0YW5jZXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGlzRW1wdHlcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICogQHJldHVybiB7bnVtYmVyfSBTaXplIG9mIHRoZSBzZXQgb2YgYWxsIHN0b3JlZCBpbnN0YW5jZXNcbiAgICovXG4gIGlzRW1wdHk6IGZ1bmN0aW9uIGlzRW1wdHkoKSB7XG4gICAgcmV0dXJuICFfaW5zdGFuY2VzLnNpemU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIHNldEJpbmRpbmdcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICogQHBhcmFtIHtvYmplY3R9IGFyZ3MgQWxsIGFyZ3VtZW50cyBuZWNlc3NhcnkgdG8gc2V0IHRoZSBiaW5kaW5nXG4gICAqIEBwYXJhbSB7YXJyYXl9IGFyZ3Mua2V5cyBLZXkgY29kZXMgdGhhdCBzaG91bGQgdHJpZ2dlciB0aGUgZm5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gYXJncy5mbiBUaGUgY2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gZ2l2ZW4ga2V5cyBhcmUgcHJlc3NlZFxuICAgKiBAcGFyYW0ge29iamVjdH0gYXJncy50YXJnZXQgVGhlIGRlY29yYXRlZCBjbGFzc1xuICAgKi9cbiAgc2V0QmluZGluZzogZnVuY3Rpb24gc2V0QmluZGluZyhfcmVmMikge1xuICAgIHZhciBrZXlzID0gX3JlZjIua2V5cztcbiAgICB2YXIgZm4gPSBfcmVmMi5mbjtcbiAgICB2YXIgdGFyZ2V0ID0gX3JlZjIudGFyZ2V0O1xuXG4gICAgdmFyIGtleVNldHMgPSBrZXlzID8gKDAsIF9saWJQYXJzZV9rZXlzMlsnZGVmYXVsdCddKShrZXlzKSA6ICgwLCBfbGliS2V5cy5hbGxLZXlzKSgpO1xuICAgIHZhciBfX3JlYWN0S2V5ZG93blVVSUQgPSB0YXJnZXQuX19yZWFjdEtleWRvd25VVUlEO1xuXG4gICAgaWYgKCFfX3JlYWN0S2V5ZG93blVVSUQpIHtcbiAgICAgIHRhcmdldC5fX3JlYWN0S2V5ZG93blVVSUQgPSAoMCwgX2xpYlV1aWQyWydkZWZhdWx0J10pKCk7XG4gICAgICBfaGFuZGxlcnMuc2V0KHRhcmdldC5fX3JlYWN0S2V5ZG93blVVSUQsIG5ldyBNYXAoW1trZXlTZXRzLCBmbl1dKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9oYW5kbGVycy5nZXQoX19yZWFjdEtleWRvd25VVUlEKS5zZXQoa2V5U2V0cywgZm4pO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gU3RvcmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLy8gVE9ETzogTmVlZCBiZXR0ZXIsIG1vcmUgY29tcGxldGUsIGFuZCBtb3JlIG1ldGhvZGljYWwga2V5IGRlZmluaXRpb25zXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuYWxsS2V5cyA9IGFsbEtleXM7XG52YXIgS2V5cyA9IHtcbiAgYmFja3NwYWNlOiA4LFxuICBkZWw6IDQ2LFxuICAnZGVsZXRlJzogNDYsXG4gIHRhYjogOSxcbiAgZW50ZXI6IDEzLFxuICAncmV0dXJuJzogMTMsXG4gIGVzYzogMjcsXG4gIHNwYWNlOiAzMixcbiAgbGVmdDogMzcsXG4gIHVwOiAzOCxcbiAgcmlnaHQ6IDM5LFxuICBkb3duOiA0MCxcbiAgJzsnOiAxODYsXG4gICc9JzogMTg3LFxuICAnLCc6IDE4OCxcbiAgJy0nOiAxODksXG4gICcuJzogMTkwLFxuICAnLyc6IDE5MSxcbiAgJ2AnOiAxOTIsXG4gICdbJzogMjE5LFxuICAnXFxcXCc6IDIyMCxcbiAgJ10nOiAyMjFcbn07XG5cbi8vIEFkZCB1cHBlcmNhc2UgdmVyc2lvbnMgb2Yga2V5cyBhYm92ZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbk9iamVjdC5rZXlzKEtleXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gS2V5c1trZXkudG9VcHBlckNhc2UoKV0gPSBLZXlzW2tleV07XG59KTtcblxuJzAxMjM0NTY3ODknLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChudW0sIGluZGV4KSB7XG4gIHJldHVybiBLZXlzW251bV0gPSBpbmRleCArIDQ4O1xufSk7XG5cbidBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWicuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlciwgaW5kZXgpIHtcbiAgS2V5c1tsZXR0ZXJdID0gaW5kZXggKyA2NTtcbiAgS2V5c1tsZXR0ZXIudG9Mb3dlckNhc2UoKV0gPSBpbmRleCArIDY1O1xufSk7XG5cbi8vIGZuIGtleXNcblsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICByZXR1cm4gS2V5c1snZicgKyBpbmRleF0gPSAxMTEgKyBpbmRleDtcbn0pO1xuXG52YXIgbW9kaWZpZXJzID0ge1xuICBjb250cm9sOiAnY3RybCcsXG4gIGN0cmw6ICdjdHJsJyxcbiAgc2hpZnQ6ICdzaGlmdCcsXG4gIG1ldGE6ICdtZXRhJyxcbiAgY21kOiAnbWV0YScsXG4gIGNvbW1hbmQ6ICdtZXRhJyxcbiAgb3B0aW9uOiAnYWx0JyxcbiAgYWx0OiAnYWx0J1xufTtcblxuZXhwb3J0cy5tb2RpZmllcnMgPSBtb2RpZmllcnM7XG5cbmZ1bmN0aW9uIGFsbEtleXMoYXJnKSB7XG4gIHJldHVybiBhcmcgPyBhcmcuY29uc3RydWN0b3IgPT09IFN5bWJvbCB8fCAodHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoYXJnKSkgPT09ICdzeW1ib2wnIDogU3ltYm9sKCdhbGxLZXlzJyk7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEtleXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9rZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cbnZhciBtb2RLZXlzID0gT2JqZWN0LmtleXMoX2tleXMubW9kaWZpZXJzKTtcblxuZnVuY3Rpb24gbWF0Y2hLZXlzKF9yZWYpIHtcbiAgdmFyIF9yZWYka2V5U2V0ID0gX3JlZi5rZXlTZXQ7XG4gIHZhciBrZXkgPSBfcmVmJGtleVNldC5rZXk7XG4gIHZhciBfcmVmJGtleVNldCRtb2RpZmllcnMgPSBfcmVmJGtleVNldC5tb2RpZmllcnM7XG4gIHZhciBtb2RpZmllcnMgPSBfcmVmJGtleVNldCRtb2RpZmllcnMgPT09IHVuZGVmaW5lZCA/IFtdIDogX3JlZiRrZXlTZXQkbW9kaWZpZXJzO1xuICB2YXIgZXZlbnQgPSBfcmVmLmV2ZW50O1xuXG4gIHZhciBrZXlzTWF0Y2ggPSBmYWxzZTtcbiAgaWYgKGtleSA9PT0gZXZlbnQud2hpY2gpIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGV2dE1vZEtleXMgPSBtb2RLZXlzLmZpbHRlcihmdW5jdGlvbiAobW9kS2V5KSB7XG4gICAgICAgIHJldHVybiBldmVudFttb2RLZXkgKyAnS2V5J107XG4gICAgICB9KS5zb3J0KCk7XG4gICAgICBrZXlzTWF0Y2ggPSBtb2RpZmllcnMubGVuZ3RoID09PSBldnRNb2RLZXlzLmxlbmd0aCAmJiBtb2RpZmllcnMuZXZlcnkoZnVuY3Rpb24gKG1vZEtleSwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGV2dE1vZEtleXNbaW5kZXhdID09PSBtb2RLZXk7XG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9XG4gIHJldHVybiBrZXlzTWF0Y2g7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IG1hdGNoS2V5cztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1rZXlkb3duL2Rpc3QvbGliL21hdGNoX2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07XG59XG5cbnZhciBfa2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG52YXIgX2tleXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfa2V5cyk7XG5cbmZ1bmN0aW9uIHBhcnNlS2V5cyhrZXlzQXJyYXkpIHtcbiAgcmV0dXJuIGtleXNBcnJheS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBrZXlTZXQgPSB7IGtleToga2V5IH07XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIga2V5U3RyaW5nID0ga2V5LnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgICAgdmFyIG1hdGNoZXMgPSBrZXlTdHJpbmcuc3BsaXQoL1xccz9cXCtcXHM/Lyk7XG4gICAgICBrZXlTZXQgPSBtYXRjaGVzLmxlbmd0aCA9PT0gMSA/IHsga2V5OiBfa2V5czJbJ2RlZmF1bHQnXVtrZXlTdHJpbmddIH0gOiB7XG4gICAgICAgIGtleTogX2tleXMyWydkZWZhdWx0J11bbWF0Y2hlcy5wb3AoKV0sXG4gICAgICAgIG1vZGlmaWVyczogbWF0Y2hlcy5tYXAoZnVuY3Rpb24gKG1vZEtleSkge1xuICAgICAgICAgIHJldHVybiBfa2V5cy5tb2RpZmllcnNbbW9kS2V5XTtcbiAgICAgICAgfSkuc29ydCgpXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ga2V5U2V0O1xuICB9KTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gcGFyc2VLZXlzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvcGFyc2Vfa2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLy8gQ291bnRlciBiZWluZyBpbmNyZW1lbnRlZC4gSlMgaXMgc2luZ2xlLXRocmVhZGVkLCBzbyBpdCdsbCBKdXN0IFdvcmvihKIuXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdXVpZDtcbnZhciBfX2NvdW50ZXIgPSAxO1xuXG4vKipcbiAqIFJldHVybnMgYSBwcm9jZXNzLXdpZGUgdW5pcXVlIGlkZW50aWZpZXIuXG4gKi9cblxuZnVuY3Rpb24gdXVpZCgpIHtcbiAgcmV0dXJuIFwidWlkLVwiICsgX19jb3VudGVyKys7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvdXVpZC5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbi8qKlxuICogQG1vZHVsZSBldmVudEhhbmRsZXJzXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5fb25DbGljayA9IF9vbkNsaWNrO1xuZXhwb3J0cy5fb25LZXlEb3duID0gX29uS2V5RG93bjtcbmV4cG9ydHMuX3Nob3VsZENvbnNpZGVyID0gX3Nob3VsZENvbnNpZGVyO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9O1xufVxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1yZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhcnIpO1xuICB9XG59XG5cbnZhciBfbGliRG9tX2hlbHBlcnMgPSByZXF1aXJlKCcuL2xpYi9kb21faGVscGVycycpO1xuXG52YXIgX2xpYkRvbV9oZWxwZXJzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xpYkRvbV9oZWxwZXJzKTtcblxudmFyIF9saWJMaXN0ZW5lcnMgPSByZXF1aXJlKCcuL2xpYi9saXN0ZW5lcnMnKTtcblxudmFyIF9saWJMaXN0ZW5lcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGliTGlzdGVuZXJzKTtcblxudmFyIF9zdG9yZSA9IHJlcXVpcmUoJy4vc3RvcmUnKTtcblxudmFyIF9zdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdG9yZSk7XG5cbi8qKlxuICogcHJpdmF0ZVxuICpcbiAqL1xuXG4vKipcbiAqIF9vbkNsaWNrXG4gKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgVGhlIGNsaWNrIGV2ZW50IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IGV2ZW50LnRhcmdldCBUaGUgRE9NIG5vZGUgZnJvbSB0aGUgY2xpY2sgZXZlbnRcbiAqL1xuXG5mdW5jdGlvbiBfb25DbGljayhfcmVmKSB7XG4gIHZhciB0YXJnZXQgPSBfcmVmLnRhcmdldDtcblxuICBfc3RvcmUyWydkZWZhdWx0J10uYWN0aXZhdGUoW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShfc3RvcmUyWydkZWZhdWx0J10uZ2V0SW5zdGFuY2VzKCkpKS5yZWR1Y2UoX2xpYkRvbV9oZWxwZXJzMlsnZGVmYXVsdCddLmZpbmRDb250YWluZXJOb2Rlcyh0YXJnZXQpLCBbXSkuc29ydChfbGliRG9tX2hlbHBlcnMyWydkZWZhdWx0J10uc29ydEJ5RE9NUG9zaXRpb24pLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgIHJldHVybiBpdGVtLmluc3RhbmNlO1xuICB9KSk7XG59XG5cbi8qKlxuICogX29uS2V5RG93bjogVGhlIGtleWRvd24gZXZlbnQgY2FsbGJhY2tcbiAqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCBUaGUga2V5ZG93biBldmVudCBvYmplY3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBldmVudC53aGljaCBUaGUga2V5IGNvZGUgKHdoaWNoKSByZWNlaXZlZCBmcm9tIHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cblxuZnVuY3Rpb24gX29uS2V5RG93bihldmVudCkge1xuICB2YXIgZm9yY2VDb25zaWRlciA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogYXJndW1lbnRzWzFdO1xuXG4gIGlmIChmb3JjZUNvbnNpZGVyIHx8IF9zaG91bGRDb25zaWRlcihldmVudCkpIHtcbiAgICB2YXIgX3JlZjIgPSBfc3RvcmUyWydkZWZhdWx0J10uZmluZEJpbmRpbmdGb3JFdmVudChldmVudCkgfHwge307XG5cbiAgICB2YXIgZm4gPSBfcmVmMi5mbjtcbiAgICB2YXIgaW5zdGFuY2UgPSBfcmVmMi5pbnN0YW5jZTtcblxuICAgIGlmIChmbikge1xuICAgICAgZm4uY2FsbChpbnN0YW5jZSwgZXZlbnQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBfc2hvdWxkQ29uc2lkZXI6IENvbmRpdGlvbnMgZm9yIHByb2NlZWRpbmcgd2l0aCBrZXkgZXZlbnQgaGFuZGxpbmdcbiAqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCBUaGUga2V5ZG93biBldmVudCBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudC50YXJnZXQgVGhlIG5vZGUgb3JpZ2luIG9mIHRoZSBldmVudFxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50LnRhcmdldC50YWdOYW1lIFRoZSBuYW1lIG9mIHRoZSBlbGVtZW50IHRhZ1xuICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50LnRhcmdldC53aGljaCBUaGUga2V5IHByZXNzZWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgdG8gY29udGludWUgcHJvY2VzaW5nIHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cblxuZnVuY3Rpb24gX3Nob3VsZENvbnNpZGVyKF9yZWYzKSB7XG4gIHZhciBjdHJsS2V5ID0gX3JlZjMuY3RybEtleTtcbiAgdmFyIHRhZ05hbWUgPSBfcmVmMy50YXJnZXQudGFnTmFtZTtcblxuICByZXR1cm4gIX5bJ0lOUFVUJywgJ1NFTEVDVCcsICdURVhUQVJFQSddLmluZGV4T2YodGFnTmFtZSkgfHwgY3RybEtleTtcbn1cblxuLyoqXG4gKiBwdWJsaWNcbiAqXG4gKi9cblxuLyoqXG4gKiBvbk1vdW50XG4gKlxuICogQGFjY2VzcyBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gb25Nb3VudChpbnN0YW5jZSkge1xuICAvLyBoYXZlIHRvIGJ1bXAgdGhpcyB0byBuZXh0IGV2ZW50IGxvb3AgYmVjYXVzZSBjb21wb25lbnQgbW91bnRpbmcgcm91dGluZWx5XG4gIC8vIHByZWNlZWRzIHRoZSBkb20gY2xpY2sgZXZlbnQgdGhhdCB0cmlnZ2VyZWQgdGhlIG1vdW50ICh3dGY/KVxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3N0b3JlMlsnZGVmYXVsdCddLmFjdGl2YXRlKGluc3RhbmNlKTtcbiAgfSwgMCk7XG4gIF9saWJMaXN0ZW5lcnMyWydkZWZhdWx0J10uYmluZEtleXMoX29uS2V5RG93bik7XG4gIF9saWJMaXN0ZW5lcnMyWydkZWZhdWx0J10uYmluZENsaWNrcyhfb25DbGljayk7XG4gIF9saWJEb21faGVscGVyczJbJ2RlZmF1bHQnXS5iaW5kRm9jdXNhYmxlcyhpbnN0YW5jZSwgX3N0b3JlMlsnZGVmYXVsdCddLmFjdGl2YXRlKTtcbn1cblxuLyoqXG4gKiBvblVubW91bnRcbiAqXG4gKiBAYWNjZXNzIHB1YmxpY1xuICovXG5mdW5jdGlvbiBvblVubW91bnQoaW5zdGFuY2UpIHtcbiAgX3N0b3JlMlsnZGVmYXVsdCddLmRlbGV0ZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgaWYgKF9zdG9yZTJbJ2RlZmF1bHQnXS5pc0VtcHR5KCkpIHtcbiAgICBfbGliTGlzdGVuZXJzMlsnZGVmYXVsdCddLnVuYmluZENsaWNrcyhfb25DbGljayk7XG4gICAgX2xpYkxpc3RlbmVyczJbJ2RlZmF1bHQnXS51bmJpbmRLZXlzKF9vbktleURvd24pO1xuICB9XG59XG5cbmV4cG9ydHMub25Nb3VudCA9IG9uTW91bnQ7XG5leHBvcnRzLm9uVW5tb3VudCA9IG9uVW5tb3VudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2V2ZW50X2hhbmRsZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIvKipcbiAqIEBtb2R1bGUgZG9tSGVscGVyc1xuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTtcbn1cblxudmFyIF9yZWFjdERvbSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuXG52YXIgX3JlYWN0RG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0RG9tKTtcblxudmFyIGZvY3VzYWJsZVNlbGVjdG9yID0gJ2FbaHJlZl0sIGJ1dHRvbiwgaW5wdXQsIG9iamVjdCwgc2VsZWN0LCB0ZXh0YXJlYSwgW3RhYmluZGV4XSc7XG5cbi8qKlxuICogYmluZEZvY3VzYWJsZXM6IEZpbmQgYW55IGZvY3VzYWJsZSBjaGlsZCBlbGVtZW50cyBvZiB0aGUgY29tcG9uZW50IGluc3RhbmNlIGFuZFxuICogYWRkIGFuIG9uRm9jdXMgaGFuZGxlciB0byBmb2N1cyBvdXIga2V5ZG93biBoYW5kbGVycyBvbiB0aGUgcGFyZW50IGNvbXBvbmVudFxuICogd2hlbiB1c2VyIGtleXMgYXBwbGllcyBmb2N1cyB0byB0aGUgZWxlbWVudC5cbiAqXG4gKiBOT1RFOiBPbmUgbGltaXRhdGlvbiBvZiB0aGlzIHJpZ2h0IG5vdyBpcyB0aGF0IGlmIHlvdSB0YWIgb3V0IG9mIHRoZVxuICogY29tcG9uZW50LCBfZm9jdXNlZEluc3RhbmNlIHdpbGwgc3RpbGwgYmUgc2V0IHVudGlsIG5leHQgY2xpY2sgb3IgbW91bnQgb3JcbiAqIGNvbnRyb2xsZWQgZm9jdXMuXG4gKlxuICogQGFjY2VzcyBwdWJsaWNcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnN0YW5jZSBUaGUga2V5LWJvdW5kIGNvbXBvbmVudCBpbnN0YW5jZVxuICogQHBhcmFtIHtjYWxsYmFja30gYWN0aXZhdGVPbkZvY3VzIFRoZSBmbiB0byBmaXJlIHdoZW4gZWxlbWVudCBpcyBmb2N1c2VkXG4gKi9cbmZ1bmN0aW9uIGJpbmRGb2N1c2FibGVzKGluc3RhbmNlLCBhY3RpdmF0ZU9uRm9jdXMpIHtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwpIHtcbiAgICB2YXIgbm9kZSA9IF9yZWFjdERvbTJbJ2RlZmF1bHQnXS5maW5kRE9NTm9kZShpbnN0YW5jZSk7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHZhciBmb2N1c2FibGVzID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKGZvY3VzYWJsZVNlbGVjdG9yKTtcbiAgICAgIGlmIChmb2N1c2FibGVzLmxlbmd0aCkge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBvbkZvY3VzID0gZnVuY3Rpb24gb25Gb2N1cyhlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgb25Gb2N1c1ByZXYgPSBlbGVtZW50Lm9uZm9jdXM7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgIGFjdGl2YXRlT25Gb2N1cyhpbnN0YW5jZSk7XG4gICAgICAgICAgICAgIGlmIChvbkZvY3VzUHJldikgb25Gb2N1c1ByZXYuY2FsbChlbGVtZW50LCBldmVudCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH07XG4gICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZm9jdXNhYmxlcykuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQub25mb2N1cyA9IG9uRm9jdXMoZWxlbWVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogZmluZENvbnRhaW5lck5vZGVzOiBDYWxsZWQgYnkgb3VyIGNsaWNrIGhhbmRsZXIgdG8gZmluZCBpbnN0YW5jZXMgd2l0aCBub2Rlc1xuICogdGhhdCBhcmUgZXF1YWwgdG8gb3IgdGhhdCBjb250YWluIHRoZSBjbGljayB0YXJnZXQuIEFueSB0aGF0IHBhc3MgdGhpcyB0ZXN0XG4gKiB3aWxsIGJlIHJlY2lwaWVudHMgb2YgdGhlIG5leHQga2V5ZG93biBldmVudC5cbiAqXG4gKiBAYWNjZXNzIHB1YmxpY1xuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBUaGUgY2xpY2sgZXZlbnQudGFyZ2V0IERPTSBlbGVtZW50XG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gUmVkdWNlciBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBmaW5kQ29udGFpbmVyTm9kZXModGFyZ2V0KSB7XG4gIHJldHVybiBmdW5jdGlvbiAobWVtbywgaW5zdGFuY2UpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIG5vZGUgPSBfcmVhY3REb20yWydkZWZhdWx0J10uZmluZERPTU5vZGUoaW5zdGFuY2UpO1xuICAgICAgaWYgKG5vZGUgJiYgKG5vZGUgPT09IHRhcmdldCB8fCBub2RlLmNvbnRhaW5zKHRhcmdldCkpKSB7XG4gICAgICAgIG1lbW8ucHVzaCh7IGluc3RhbmNlOiBpbnN0YW5jZSwgbm9kZTogbm9kZSB9KTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIHNvcnRCeURPTVBvc2l0aW9uOiBDYWxsZWQgYnkgb3VyIGNsaWNrIGhhbmRsZXIgdG8gc29ydCBhIGxpc3Qgb2YgaW5zdGFuY2VzXG4gKiBhY2NvcmRpbmcgdG8gbGVhc3QgLT4gbW9zdCBuZXN0ZWQuIFRoaXMgaXMgc28gdGhhdCBpZiBtdWx0aXBsZSBrZXlib3VuZFxuICogaW5zdGFuY2VzIGhhdmUgbm9kZXMgdGhhdCBhcmUgYW5jZXN0b3JzIG9mIHRoZSBjbGljayB0YXJnZXQsIHRoZXkgd2lsbCBiZVxuICogc29ydGVkIHRvIGxldCB0aGUgaW5zdGFuY2UgY2xvc2VzdCB0byB0aGUgY2xpY2sgdGFyZ2V0IGdldCBmaXJzdCBkaWJzIG9uIHRoZVxuICogbmV4dCBrZXkgZG93biBldmVudC5cbiAqL1xuZnVuY3Rpb24gc29ydEJ5RE9NUG9zaXRpb24oYSwgYikge1xuICByZXR1cm4gYS5ub2RlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGIubm9kZSkgPT09IDEwID8gMSA6IC0xO1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSB7IGJpbmRGb2N1c2FibGVzOiBiaW5kRm9jdXNhYmxlcywgZmluZENvbnRhaW5lck5vZGVzOiBmaW5kQ29udGFpbmVyTm9kZXMsIHNvcnRCeURPTVBvc2l0aW9uOiBzb3J0QnlET01Qb3NpdGlvbiB9O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvZG9tX2hlbHBlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIi8qKlxuICogQG1vZHVsZSBMaXN0ZW5lcnNcbiAqXG4gKi9cblxuLy8gZmxhZyBmb3Igd2hldGhlciBjbGljayBsaXN0ZW5lciBoYXMgYmVlbiBib3VuZCB0byBkb2N1bWVudFxuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBfY2xpY2tzQm91bmQgPSBmYWxzZTtcblxuLy8gZmxhZyBmb3Igd2hldGhlciBrZXlkb3duIGxpc3RlbmVyIGhhcyBiZWVuIGJvdW5kIHRvIGRvY3VtZW50XG52YXIgX2tleXNCb3VuZCA9IGZhbHNlO1xuXG52YXIgTGlzdGVuZXJzID0ge1xuICAvKipcbiAgICogX2JpbmRLZXlzXG4gICAqXG4gICAqIEBhY2Nlc3MgcHVibGljXG4gICAqL1xuICBiaW5kS2V5czogZnVuY3Rpb24gYmluZEtleXMoY2FsbGJhY2spIHtcbiAgICBpZiAoIV9rZXlzQm91bmQpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjYWxsYmFjayk7XG4gICAgICBfa2V5c0JvdW5kID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIHVuYmluZEtleXNcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICovXG4gIHVuYmluZEtleXM6IGZ1bmN0aW9uIHVuYmluZEtleXMoY2FsbGJhY2spIHtcbiAgICBpZiAoX2tleXNCb3VuZCkge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGNhbGxiYWNrKTtcbiAgICAgIF9rZXlzQm91bmQgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIGJpbmRDbGlja3NcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICovXG4gIGJpbmRDbGlja3M6IGZ1bmN0aW9uIGJpbmRDbGlja3MoY2FsbGJhY2spIHtcbiAgICBpZiAoIV9jbGlja3NCb3VuZCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYWxsYmFjayk7XG4gICAgICBfY2xpY2tzQm91bmQgPSB0cnVlO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogdW5iaW5kQ2xpY2tzXG4gICAqXG4gICAqIEBhY2Nlc3MgcHVibGljXG4gICAqL1xuICB1bmJpbmRDbGlja3M6IGZ1bmN0aW9uIHVuYmluZENsaWNrcyhjYWxsYmFjaykge1xuICAgIGlmIChfY2xpY2tzQm91bmQpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2FsbGJhY2spO1xuICAgICAgX2NsaWNrc0JvdW5kID0gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBMaXN0ZW5lcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9saXN0ZW5lcnMuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIi8qKlxuICogQG1vZHVsZSBtZXRob2RXcmFwcGVyXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07XG59XG5cbnZhciBfc3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZScpO1xuXG52YXIgX3N0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0b3JlKTtcblxudmFyIF9ldmVudF9oYW5kbGVycyA9IHJlcXVpcmUoJy4uL2V2ZW50X2hhbmRsZXJzJyk7XG5cbi8qKlxuICogX2lzUmVhY3RLZXlEb3duXG4gKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgVGhlIHBvc3NpYmx5IHN5bnRoZXRpYyBldmVudCBwYXNzZWQgYXMgYW4gYXJndW1lbnQgd2l0aFxuICogdGhlIG1ldGhvZCBpbnZvY2F0aW9uLlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gX2lzUmVhY3RLZXlEb3duKGV2ZW50KSB7XG4gIHJldHVybiBldmVudCAmJiAodHlwZW9mIGV2ZW50ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihldmVudCkpID09PSAnb2JqZWN0JyAmJiBldmVudC5uYXRpdmVFdmVudCBpbnN0YW5jZW9mIHdpbmRvdy5LZXlib2FyZEV2ZW50ICYmIGV2ZW50LnR5cGUgPT09ICdrZXlkb3duJztcbn1cblxuLyoqXG4gKiBtZXRob2RXcmFwcGVyXG4gKlxuICogQGFjY2VzcyBwdWJsaWNcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzIEFsbCBhcmd1bWVudHMgbmVjZXNzYXJ5IGZvciB3cmFwcGluZyBtZXRob2RcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzLnRhcmdldCBUaGUgZGVjb3JhdGVkIGNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gYXJncy5kZXNjcmlwdG9yIE1ldGhvZCBkZXNjcmlwdG9yXG4gKiBAcGFyYW0ge2FycmF5fSBhcmdzLmtleXMgVGhlIGFycmF5IG9mIGtleXMgYm91bmQgdG8gdGhlIGdpdmVuIG1ldGhvZFxuICogQHJldHVybiB7b2JqZWN0fSBUaGUgbWV0aG9kIGRlc2NyaXB0b3JcbiAqL1xuZnVuY3Rpb24gbWV0aG9kV3JhcHBlcihfcmVmKSB7XG4gIHZhciB0YXJnZXQgPSBfcmVmLnRhcmdldDtcbiAgdmFyIGRlc2NyaXB0b3IgPSBfcmVmLmRlc2NyaXB0b3I7XG4gIHZhciBrZXlzID0gX3JlZi5rZXlzO1xuXG4gIHZhciBmbiA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgLy8gaWYgd2UgaGF2ZW4ndCBhbHJlYWR5IGNyZWF0ZWQgYSBiaW5kaW5nIGZvciB0aGlzIGNsYXNzICh2aWEgYW5vdGhlclxuICAvLyBkZWNvcmF0ZWQgbWV0aG9kKSwgd3JhcCB0aGVzZSBsaWZlY3ljbGUgbWV0aG9kcy5cbiAgaWYgKCFfc3RvcmUyWydkZWZhdWx0J10uZ2V0QmluZGluZyh0YXJnZXQpKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb21wb25lbnREaWRNb3VudCA9IHRhcmdldC5jb21wb25lbnREaWRNb3VudDtcbiAgICAgIHZhciBjb21wb25lbnRXaWxsVW5tb3VudCA9IHRhcmdldC5jb21wb25lbnRXaWxsVW5tb3VudDtcblxuICAgICAgdGFyZ2V0LmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAoMCwgX2V2ZW50X2hhbmRsZXJzLm9uTW91bnQpKHRoaXMpO1xuICAgICAgICBpZiAoY29tcG9uZW50RGlkTW91bnQpIHJldHVybiBjb21wb25lbnREaWRNb3VudC5jYWxsKHRoaXMpO1xuICAgICAgfTtcblxuICAgICAgdGFyZ2V0LmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAoMCwgX2V2ZW50X2hhbmRsZXJzLm9uVW5tb3VudCkodGhpcyk7XG4gICAgICAgIGlmIChjb21wb25lbnRXaWxsVW5tb3VudCkgcmV0dXJuIGNvbXBvbmVudFdpbGxVbm1vdW50LmNhbGwodGhpcyk7XG4gICAgICB9O1xuICAgIH0pKCk7XG4gIH1cblxuICAvLyBhZGQgdGhpcyBiaW5kaW5nIG9mIGtleXMgYW5kIG1ldGhvZCB0byB0aGUgdGFyZ2V0J3MgYmluZGluZ3NcbiAgX3N0b3JlMlsnZGVmYXVsdCddLnNldEJpbmRpbmcoeyBrZXlzOiBrZXlzLCB0YXJnZXQ6IHRhcmdldCwgZm46IGZuIH0pO1xuXG4gIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIG1heWJlRXZlbnQgPSBhcmdzWzBdO1xuXG4gICAgaWYgKF9pc1JlYWN0S2V5RG93bihtYXliZUV2ZW50KSkge1xuICAgICAgLy8gcHJveHkgbWV0aG9kIGluIG9yZGVyIHRvIHVzZSBAa2V5ZG93biBhcyBmaWx0ZXIgZm9yIGtleWRvd24gZXZlbnRzIGNvbWluZ1xuICAgICAgLy8gZnJvbSBhbiBhY3R1YWwgb25LZXlEb3duIGJpbmRpbmcgKGFzIGlkZW50aWZpZWQgYnkgcmVhY3QncyBhZGRpdGlvbiBvZlxuICAgICAgLy8gJ25hdGl2ZUV2ZW50JyArIHR5cGUgPT09ICdrZXlkb3duJylcbiAgICAgIGlmICghbWF5YmVFdmVudC5jdHJsS2V5KSB7XG4gICAgICAgIC8vIHdlIGFscmVhZHkgd2hpdGVsaXN0IHNob3J0Y3V0cyB3aXRoIGN0cmwgbW9kaWZpZXJzIHNvIGlmIHdlIHdlcmUgdG9cbiAgICAgICAgLy8gZmlyZSBpdCBhZ2FpbiBoZXJlIHRoZSBtZXRob2Qgd291bGQgdHJpZ2dlciB0d2ljZS4gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9nbG9ydGhvL3JlYWN0LWtleWRvd24vaXNzdWVzLzM4XG4gICAgICAgIHJldHVybiAoMCwgX2V2ZW50X2hhbmRsZXJzLl9vbktleURvd24pKG1heWJlRXZlbnQsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIW1heWJlRXZlbnQgfHwgIShtYXliZUV2ZW50IGluc3RhbmNlb2Ygd2luZG93LktleWJvYXJkRXZlbnQpIHx8IG1heWJlRXZlbnQudHlwZSAhPT0gJ2tleWRvd24nKSB7XG4gICAgICAvLyBpZiBvdXIgZmlyc3QgYXJndW1lbnQgaXMgYSBrZXlkb3duIGV2ZW50IGl0IGlzIGJlaW5nIGhhbmRsZWQgYnkgb3VyXG4gICAgICAvLyBiaW5kaW5nIHN5c3RlbS4gaWYgaXQncyBhbnl0aGluZyBlbHNlLCBqdXN0IHBhc3MgdGhyb3VnaC5cbiAgICAgIHJldHVybiBmbi5jYWxsLmFwcGx5KGZuLCBbdGhpc10uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGRlc2NyaXB0b3I7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IG1ldGhvZFdyYXBwZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2RlY29yYXRvcnMvbWV0aG9kX2RlY29yYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLyoqXG4gKiBAbW9kdWxlIG1ldGhvZFdyYXBwZXJTY29wZWRcbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07XG59XG5cbnZhciBfbGliTWF0Y2hfa2V5cyA9IHJlcXVpcmUoJy4uL2xpYi9tYXRjaF9rZXlzJyk7XG5cbnZhciBfbGliTWF0Y2hfa2V5czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9saWJNYXRjaF9rZXlzKTtcblxudmFyIF9saWJQYXJzZV9rZXlzID0gcmVxdWlyZSgnLi4vbGliL3BhcnNlX2tleXMnKTtcblxudmFyIF9saWJQYXJzZV9rZXlzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xpYlBhcnNlX2tleXMpO1xuXG4vKipcbiAqIF9zaG91bGRUcmlnZ2VyXG4gKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcGFyYW0ge29iamVjdH0gdGhpc1Byb3BzIEV4c3RpbmcgcHJvcHMgZnJvbSB0aGUgd3JhcHBlZCBjb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSB0aGlzUHJvcHMua2V5ZG93biBUaGUgbmFtZXNwYWNlZCBzdGF0ZSBmcm9tIHRoZSBoaWdoZXItb3JkZXJcbiAqIGNvbXBvbmVudCAoY2xhc3NfZGVjb3JhdG9yKVxuICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wcyBUaGUgaW5jb21pbmcgcHJvcHMgZnJvbSB0aGUgd3JhcHBlZCBjb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHMua2V5ZG93biBUaGUgbmFtZXNjYXBlZCBzdGF0ZSBmcm9tIHRoZSBoaWdoZXItb3JkZXJcbiAqIGNvbXBvbmVudCAoY2xhc3NfZGVjb3JhdG9yKVxuICogQHBhcmFtIHthcnJheX0ga2V5cyBUaGUga2V5cyBib3VuZCB0byB0aGUgZGVjb3JhdGVkIG1ldGhvZFxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBhbGwgdGVzdHMgaGF2ZSBwYXNzZWRcbiAqL1xuZnVuY3Rpb24gX3Nob3VsZFRyaWdnZXIoX3JlZiwga2V5ZG93bk5leHQpIHtcbiAgdmFyIGtleWRvd25UaGlzID0gX3JlZi5rZXlkb3duO1xuXG4gIHJldHVybiBrZXlkb3duTmV4dCAmJiBrZXlkb3duTmV4dC5ldmVudCAmJiAha2V5ZG93blRoaXMuZXZlbnQ7XG59XG5cbi8qKlxuICogbWV0aG9kV3JhcHBlclNjb3BlZFxuICpcbiAqIEBhY2Nlc3MgcHVibGljXG4gKiBAcGFyYW0ge29iamVjdH0gYXJncyBBbGwgYXJncyBuZWNlc3NhcnkgZm9yIGRlY29yYXRpbmcgdGhlIG1ldGhvZFxuICogQHBhcmFtIHtvYmplY3R9IGFyZ3MudGFyZ2V0IFRoZSBkZWNvcmF0ZWQgbWV0aG9kJ3MgY2xhc3Mgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gYXJncy5kZXNjcmlwdG9yIFRoZSBtZXRob2QncyBkZXNjcmlwdG9yIG9iamVjdFxuICogQHBhcmFtIHthcnJheX0gYXJncy5rZXlzIFRoZSBrZXkgY29kZXMgYm91bmQgdG8gdGhlIGRlY29yYXRlZCBtZXRob2RcbiAqIEByZXR1cm4ge29iamVjdH0gVGhlIG1ldGhvZCdzIGRlc2NyaXB0b3Igb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIG1ldGhvZFdyYXBwZXJTY29wZWQoX3JlZjIpIHtcbiAgdmFyIHRhcmdldCA9IF9yZWYyLnRhcmdldDtcbiAgdmFyIGRlc2NyaXB0b3IgPSBfcmVmMi5kZXNjcmlwdG9yO1xuICB2YXIga2V5cyA9IF9yZWYyLmtleXM7XG4gIHZhciBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gdGFyZ2V0LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM7XG5cbiAgdmFyIGZuID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgaWYgKCFrZXlzKSB7XG4gICAgY29uc29sZS53YXJuKGZuICsgJzoga2V5ZG93blNjb3BlZCByZXF1aXJlcyBvbmUgb3IgbW9yZSBrZXlzJyk7XG4gIH0gZWxzZSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBrZXlTZXRzID0gKDAsIF9saWJQYXJzZV9rZXlzMlsnZGVmYXVsdCddKShrZXlzKTtcblxuICAgICAgLy8gd3JhcCB0aGUgY29tcG9uZW50J3MgbGlmZWN5Y2xlIG1ldGhvZCB0byBpbnRlcmNlcHQga2V5IGNvZGVzIGNvbWluZyBkb3duXG4gICAgICAvLyBmcm9tIHRoZSB3cmFwcGVkL3Njb3BlZCBjb21wb25lbnQgdXAgdGhlIHZpZXcgaGllcmFyY2h5LiBpZiBuZXcga2V5ZG93blxuICAgICAgLy8gZXZlbnQgaGFzIGFycml2ZWQgYW5kIHRoZSBrZXkgY29kZXMgbWF0Y2ggd2hhdCB3YXMgc3BlY2lmaWVkIGluIHRoZVxuICAgICAgLy8gZGVjb3JhdG9yLCBjYWxsIHRoZSB3cmFwcGVkIG1ldGhvZC5cbiAgICAgIHRhcmdldC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gKG5leHRQcm9wcykge1xuICAgICAgICB2YXIga2V5ZG93biA9IG5leHRQcm9wcy5rZXlkb3duO1xuXG4gICAgICAgIGlmIChfc2hvdWxkVHJpZ2dlcih0aGlzLnByb3BzLCBrZXlkb3duKSkge1xuICAgICAgICAgIGlmIChrZXlTZXRzLnNvbWUoZnVuY3Rpb24gKGtleVNldCkge1xuICAgICAgICAgICAgcmV0dXJuICgwLCBfbGliTWF0Y2hfa2V5czJbJ2RlZmF1bHQnXSkoeyBrZXlTZXQ6IGtleVNldCwgZXZlbnQ6IGtleWRvd24uZXZlbnQgfSk7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGtleWRvd24uZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMpIHJldHVybiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzLmNhbGwuYXBwbHkoY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcywgW3RoaXMsIG5leHRQcm9wc10uY29uY2F0KGFyZ3MpKTtcbiAgICAgIH07XG4gICAgfSkoKTtcbiAgfVxuXG4gIHJldHVybiBkZXNjcmlwdG9yO1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBtZXRob2RXcmFwcGVyU2NvcGVkO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9kZWNvcmF0b3JzL21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyksXHJcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXHJcbiAgICBJQ09OID0gJ2FkZCc7XHJcblxyXG5cclxudmFyIF9fX19DbGFzc2I9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc2JfX19fS2V5IGluIF9fX19DbGFzc2Ipe2lmKF9fX19DbGFzc2IuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzYl9fX19LZXkpKXtCdXR0b25SZWdpc3RlckFkZFtfX19fQ2xhc3NiX19fX0tleV09X19fX0NsYXNzYltfX19fQ2xhc3NiX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2I9X19fX0NsYXNzYj09PW51bGw/bnVsbDpfX19fQ2xhc3NiLnByb3RvdHlwZTtCdXR0b25SZWdpc3RlckFkZC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzYik7QnV0dG9uUmVnaXN0ZXJBZGQucHJvdG90eXBlLmNvbnN0cnVjdG9yPUJ1dHRvblJlZ2lzdGVyQWRkO0J1dHRvblJlZ2lzdGVyQWRkLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc2I7XHJcbi8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcclxuICAgIGZ1bmN0aW9uIEJ1dHRvblJlZ2lzdGVyQWRkKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzYi5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlckFkZC5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCdhZGQnKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJBZGQucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcIkFkZFwiLCBcclxuICAgICAgICAgICAgcmVmOiBcImJ0bkFkZFwiLCBcclxuICAgICAgICAgICAgc3R5bGU6IHN0eWxlcy5idXR0b24sIFxyXG4gICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnNob3csIFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCwgXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKGUpICB7cmV0dXJuIHRoaXMuaGFuZGxlQ2xpY2soZSk7fS5iaW5kKHRoaXMpfSwgXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWFnZVwiLCB7cmVmOiBcImltYWdlXCIsIHNyYzogc3R5bGVzLmljb25zW0lDT05dfSlcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcbjtcclxuXHJcbkJ1dHRvblJlZ2lzdGVyQWRkLnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufVxyXG5cclxuXHJcbkJ1dHRvblJlZ2lzdGVyQWRkLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHNob3c6IHRydWVcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uUmVnaXN0ZXJBZGQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItYWRkL2J1dHRvbi1yZWdpc3Rlci1hZGQuanN4XG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGJ1dHRvbjoge1xuICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICBtYXJnaW46ICcycHgnXG4gICAgfSxcbiAgICBpY29uczoge1xuICAgICAgICBhZGQ6ICcvaW1hZ2VzL2ljb25zL2FkZC5wbmcnLFxuICAgICAgICBlZGl0OiAnL2ltYWdlcy9pY29ucy9lZGl0LnBuZycsXG4gICAgICAgIGRlbGV0ZTogJy9pbWFnZXMvaWNvbnMvZGVsZXRlLnBuZycsXG4gICAgICAgIGZpbHRlcjogJy9pbWFnZXMvaWNvbnMvZmlsdGVyLnBuZycsXG4gICAgICAgIHByaW50OiAnL2ltYWdlcy9pY29ucy9wcmludC5wbmcnLFxuICAgICAgICBvazogJy9pbWFnZXMvaWNvbnMvb2sucG5nJyxcbiAgICAgICAgY2FuY2VsOiAnL2ltYWdlcy9pY29ucy9jYW5jZWwucG5nJyxcbiAgICAgICAgc2F2ZTogJy9pbWFnZXMvaWNvbnMvc2F2ZS5wbmcnLFxuICAgICAgICBleGVjdXRlOiAnL2ltYWdlcy9pY29ucy9leGVjdXRlLnBuZydcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyk7XHJcblxyXG5cclxudmFyIF9fX19DbGFzc3A9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc3BfX19fS2V5IGluIF9fX19DbGFzc3Ape2lmKF9fX19DbGFzc3AuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzcF9fX19LZXkpKXtCdXR0b25bX19fX0NsYXNzcF9fX19LZXldPV9fX19DbGFzc3BbX19fX0NsYXNzcF9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NwPV9fX19DbGFzc3A9PT1udWxsP251bGw6X19fX0NsYXNzcC5wcm90b3R5cGU7QnV0dG9uLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NwKTtCdXR0b24ucHJvdG90eXBlLmNvbnN0cnVjdG9yPUJ1dHRvbjtCdXR0b24uX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzcDtcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgZnVuY3Rpb24gQnV0dG9uKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzcC5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvbi5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25DbGljaygpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b24ucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gdmlzaWJpbGl0eVxyXG4gICAgICAgIGxldCBwcm9wU3R5bGUgID0gKCdzdHlsZScgaW4gdGhpcy5wcm9wcyk/IHRoaXMucHJvcHMuc3R5bGU6IHt9LFxyXG4gICAgICAgICAgICBzdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5idXR0b24sIHtkaXNwbGF5OiB0aGlzLnByb3BzLnNob3cgPyAnaW5saW5lJyA6ICdub25lJ30sIHByb3BTdHlsZSlcclxuXHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5kaXNhYmxlZCwgXHJcbiAgICAgICAgICAgIHJlZjogXCJidXR0b25cIiwgXHJcbiAgICAgICAgICAgIHN0eWxlOiBzdHlsZSwgXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2t9LCBcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlbiwgXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcblxyXG47XHJcblxyXG5CdXR0b24ucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxyXG59XHJcblxyXG5cclxuQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHNob3c6IHRydWVcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLmpzeFxuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcycpLFxyXG4gICAgQnV0dG9uID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLmpzeCcpLFxyXG4gICAgSUNPTiA9ICdlZGl0JztcclxuXHJcblxyXG52YXIgX19fX0NsYXNzYz1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzY19fX19LZXkgaW4gX19fX0NsYXNzYyl7aWYoX19fX0NsYXNzYy5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NjX19fX0tleSkpe0J1dHRvblJlZ2lzdGVyRWRpdFtfX19fQ2xhc3NjX19fX0tleV09X19fX0NsYXNzY1tfX19fQ2xhc3NjX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2M9X19fX0NsYXNzYz09PW51bGw/bnVsbDpfX19fQ2xhc3NjLnByb3RvdHlwZTtCdXR0b25SZWdpc3RlckVkaXQucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2MpO0J1dHRvblJlZ2lzdGVyRWRpdC5wcm90b3R5cGUuY29uc3RydWN0b3I9QnV0dG9uUmVnaXN0ZXJFZGl0O0J1dHRvblJlZ2lzdGVyRWRpdC5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NjO1xyXG4vLyDQutC90L7Qv9C60LAg0YHQvtC30LTQsNC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LAg0LIg0YDQtdCz0LjRgdGC0YDQsNGFXHJcbiAgICBmdW5jdGlvbiBCdXR0b25SZWdpc3RlckVkaXQocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3NjLmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWRcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJFZGl0LnByb3RvdHlwZSxcImhhbmRsZUNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uQ2xpY2soJ2VkaXQnKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJFZGl0LnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtkaXNhYmxlZDogbmV4dFByb3BzLmRpc2FibGVkfSlcclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyRWRpdC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHtcclxuICAgICAgICAgICAgdmFsdWU6IFwiRWRpdFwiLCBcclxuICAgICAgICAgICAgcmVmOiBcImJ0bkVkaXRcIiwgXHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdywgXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24oZSkgIHtyZXR1cm4gdGhpcy5oYW5kbGVDbGljayhlKTt9LmJpbmQodGhpcyl9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VcIiwgc3JjOiBzdHlsZXMuaWNvbnNbSUNPTl19KVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuO1xyXG5cclxuQnV0dG9uUmVnaXN0ZXJFZGl0LnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2xcclxufVxyXG5cclxuXHJcbkJ1dHRvblJlZ2lzdGVyRWRpdC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBzaG93OiB0cnVlXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblJlZ2lzdGVyRWRpdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeFxuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcycpLFxyXG4gICAgQnV0dG9uID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLmpzeCcpLFxyXG4gICAgSUNPTiA9ICdkZWxldGUnO1xyXG5cclxuXHJcbnZhciBfX19fQ2xhc3NkPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NkX19fX0tleSBpbiBfX19fQ2xhc3NkKXtpZihfX19fQ2xhc3NkLmhhc093blByb3BlcnR5KF9fX19DbGFzc2RfX19fS2V5KSl7QnV0dG9uUmVnaXN0ZXJEZWxldGVbX19fX0NsYXNzZF9fX19LZXldPV9fX19DbGFzc2RbX19fX0NsYXNzZF9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NkPV9fX19DbGFzc2Q9PT1udWxsP251bGw6X19fX0NsYXNzZC5wcm90b3R5cGU7QnV0dG9uUmVnaXN0ZXJEZWxldGUucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2QpO0J1dHRvblJlZ2lzdGVyRGVsZXRlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1CdXR0b25SZWdpc3RlckRlbGV0ZTtCdXR0b25SZWdpc3RlckRlbGV0ZS5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NkO1xyXG4vLyDQutC90L7Qv9C60LAg0YHQvtC30LTQsNC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LAg0LIg0YDQtdCz0LjRgdGC0YDQsNGFXHJcbiAgICBmdW5jdGlvbiBCdXR0b25SZWdpc3RlckRlbGV0ZShwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc2QuY2FsbCh0aGlzLHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJEZWxldGUucHJvdG90eXBlLFwiaGFuZGxlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DbGljaygnZGVsZXRlJyk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyRGVsZXRlLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge1xyXG4gICAgICAgICAgICB2YWx1ZTogXCJEZWxldGVcIiwgXHJcbiAgICAgICAgICAgIHJlZjogXCJidG5EZWxldGVcIiwgXHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdywgXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24oZSkgIHtyZXR1cm4gdGhpcy5oYW5kbGVDbGljayhlKTt9LmJpbmQodGhpcyl9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VcIiwgc3JjOiBzdHlsZXMuaWNvbnNbSUNPTl19KVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuO1xyXG5cclxuQnV0dG9uUmVnaXN0ZXJEZWxldGUucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5cclxuQnV0dG9uUmVnaXN0ZXJEZWxldGUuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgc2hvdzogdHJ1ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25SZWdpc3RlckRlbGV0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1kZWxldGUvYnV0dG9uLXJlZ2lzdGVyLWRlbGV0ZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIi8vINCy0LjQtNC20LXRgiwg0L7QsdGK0LXQtNC40L3Rj9GO0YnQuNC5INGB0LXQu9C10LrRgiDQuCDRgtC10LrRgdGCLiDQsiDRgtC10LrRgdGC0LUg0L7RgtGA0LDQttCw0Y7RgtC80Y8g0LTQsNC90L3Ri9C1LCDRgdCy0Y/Qt9Cw0L3QvdGL0LUg0YEg0YHQtdC70LXQutGC0L7QvFxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgU2VsZWN0ID0gcmVxdWlyZSgnLi4vZG9jLWlucHV0LXNlbGVjdC5qc3gnKSxcclxuICAgIFRleHQgPSByZXF1aXJlKCcuLi90ZXh0LWFyZWEvdGV4dC1hcmVhLmpzeCcpO1xyXG5cclxuXHJcbnZhciBfX19fQ2xhc3NvPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NvX19fX0tleSBpbiBfX19fQ2xhc3NvKXtpZihfX19fQ2xhc3NvLmhhc093blByb3BlcnR5KF9fX19DbGFzc29fX19fS2V5KSl7U2VsZWN0VGV4dFdpZGdldFtfX19fQ2xhc3NvX19fX0tleV09X19fX0NsYXNzb1tfX19fQ2xhc3NvX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc289X19fX0NsYXNzbz09PW51bGw/bnVsbDpfX19fQ2xhc3NvLnByb3RvdHlwZTtTZWxlY3RUZXh0V2lkZ2V0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NvKTtTZWxlY3RUZXh0V2lkZ2V0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1TZWxlY3RUZXh0V2lkZ2V0O1NlbGVjdFRleHRXaWRnZXQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzbztcclxuICAgIGZ1bmN0aW9uIFNlbGVjdFRleHRXaWRnZXQocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3NvLmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IHByb3BzLnZhbHVlLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJycsIC8vINC/0L7QudC00LXRgiDQsiDRgtC10LrRgdGC0L7QstGD0Y4g0L7QsdC70LDRgdGC0YxcclxuICAgICAgICAgICAgbGliRGF0YTogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0T25DaGFuZ2UgPSB0aGlzLmhhbmRsZVNlbGVjdE9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZWxlY3RUZXh0V2lkZ2V0LnByb3RvdHlwZSxcImhhbmRsZVNlbGVjdE9uQ2hhbmdlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSwgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAvLyDQvtGC0YDQsNCx0L7RgtCw0LXQvCDRgdC+0LHRi9GC0LjQtSDQuCDQv9C+0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmxpYkRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGcgPSB0aGlzLmdldERlc2NyaXB0aW9uQnlTZWxlY3RWYWx1ZSh0aGlzLnN0YXRlLmxpYkRhdGEpIHx8IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiB2YWx1ZSwgZGVzY3JpcHRpb246IHNlbGd9KTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdFRleHRXaWRnZXQucHJvdG90eXBlLFwiY29tcG9uZW50RGlkTW91bnRcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0LHQuNCx0LvQuNC+0YLQtdC6LlxyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8g0LHRg9C00LXQvCDQvtGC0YHQu9C10LbQuNCy0LDRgtGMINC80L7QvNC10L3RgiDQutC+0LPQtNCwINGB0L/RgNCw0LLQvtGH0L3QuNC6INCx0YPQtNC10YIg0LfQsNCz0YDRg9C20LXQvVxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6bGlicycsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBsZXQgdmFzdHVzID0gSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKSwgIC8vIHdpbGwgd2F0Y2ggbGlicyBjaGFuZ2UgKGZyb20gc2VydmVyKVxyXG4gICAgICAgICAgICAgICAgZGF0YSA9IG5ld1ZhbHVlLmZpbHRlcihmdW5jdGlvbihpdGVtKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBzZWxmLnByb3BzLmxpYnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBsaWIgPSBkYXRhWzBdLmRhdGEsXHJcbiAgICAgICAgICAgICAgICBzZWxnID0gZGF0YVswXS5kYXRhLmxlbmd0aCA/IHNlbGYuZ2V0RGVzY3JpcHRpb25CeVNlbGVjdFZhbHVlKGxpYikudG9TdHJpbmcoKSA6ICcnO1xyXG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtsaWJEYXRhOiBsaWIsIGRlc2NyaXB0aW9uOiBzZWxnfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdFRleHRXaWRnZXQucHJvdG90eXBlLFwiZ2V0RGVzY3JpcHRpb25CeVNlbGVjdFZhbHVlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obGliRGF0YSkge1xyXG4gICAgICAgIC8vINC90LDQudC00LXQvCDQsiDRgdC/0YDQsNCy0L7Rh9C90LjQutC1INC+0L/QuNGB0LDQvdC40LUg0Lgg0YPRgdGC0LDQvdC+0LLQuNC8INC10LPQviDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICBsZXQgbGliUm93ID0gbGliRGF0YS5maWx0ZXIoZnVuY3Rpb24obGliKSAge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsaWIuaWQgPT0gdGhpcy5wcm9wcy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsaWI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSksXHJcbiAgICAgICAgICAgIHNlbGcgPSAnJyxcclxuICAgICAgICAgICAgc2VsZ09iamVjdCA9IGxpYlJvdy5sZW5ndGggPyBsaWJSb3dbMF0uZGV0YWlscyA6ICcnO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eSBpbiBzZWxnT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxnT2JqZWN0Lmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LjQvdGC0LXRgNC10YHRg9GO0YIg0YLQvtC70YzQutC+IFwi0YHQvtCx0YHRgtCy0LXQvdC90YvQtVwiINGB0LLQvtC50YHRgtCy0LAg0L7QsdGK0LXQutGC0LBcclxuICAgICAgICAgICAgICAgIHNlbGcgPSBzZWxnICsgcHJvcGVydHkgKyAnOicgKyBzZWxnT2JqZWN0W3Byb3BlcnR5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZztcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2VsZWN0VGV4dFdpZGdldC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInNlbGVjdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiB0aGlzLnByb3BzLmxpYnMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlU2VsZWN0T25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwge3JlZjogXCJ0ZXh0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtdXVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiRG9rUHJvcFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRlc2NyaXB0aW9uLCBcclxuICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAndHJ1ZSd9XHJcbiAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH19KTtcclxuXHJcblxyXG5TZWxlY3RUZXh0V2lkZ2V0LlByb3BUeXBlcyA9IHtcclxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBsaWJzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICBkZWZhdWx0VmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICByZWFkT25seTogUmVhY3QuUHJvcFR5cGVzLmJvb2xcclxufVxyXG5cclxuXHJcblNlbGVjdFRleHRXaWRnZXQuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgcmVhZE9ubHk6IGZhbHNlLFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdFRleHRXaWRnZXQ7XHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jcHJvcC9kb2Nwcm9wLmpzeFxuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcbi8vICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LXRleHQuanN4Jyk7XHJcblxyXG5jb25zdCBTZWxlY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiU2VsZWN0XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbGliRGF0YSA9IFtdO1xyXG4gICAgICAgIHZhciBsaWJzID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUubGlicyxcclxuICAgICAgICAvLyDQs9GA0YPQt9C40Lwg0LTQsNC90L3Ri9C1INC40Lcg0YXRgNCw0L3QuNC70LjRidCwXHJcbiAgICAgICAgICAgIGRhdGEgPSBsaWJzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT0gdGhpcy5wcm9wcy5saWJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHRoaXMpLFxyXG4gICAgICAgICAgICBpZFZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZTsgLy8g0LTQu9GPINC/0YDQuNCy0Y/Qt9C60Lgg0LTQsNC90L3Ri9GFXHJcblxyXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCAmJiBkYXRhWzBdLmRhdGEpIHtcclxuICAgICAgICAgICAgbGliRGF0YSA9IGRhdGFbMF0uZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7dmFsdWU6IHRoaXMucHJvcHMudmFsdWUgLyog0LfQtNC10YHRjCDQv9C+INC30L3QsNGH0LXQvdC40Y4g0JjQlCAqLyxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBkYXRhOiBsaWJEYXRhIHx8IFtdLFxyXG4gICAgICAgICAgICBmaWVsZFZhbHVlOiB0aGlzLnByb3BzLnZhbHVlIC8q0LfQtNC10YHRjCDQv9C+INC30L3QsNGH0LXQvdC4INC/0L7Qu9GPIGNvbGxJZCAqLyxcclxuICAgICAgICAgICAgYnJuRGVsZXRlOiB0aGlzLnByb3BzLmJ0bkRlbGV0ZSAvKiDQtdGB0LvQuCDQuNGB0YLQuNC90YMsINGC0L4g0YDQuNGB0YPQtdC8INGA0Y/QtNC+0Lwg0LrQvdC+0L/QutGDINC00LvRjyDQvtGH0LjRgdGC0LrQuCDQt9C90LDRh9C10L3QuNGPKi99O1xyXG4gICAgfSxcclxuXHJcbiAgICBmaW5kRmllbGRWYWx1ZTogZnVuY3Rpb24gKGRhdGEsIGNvbGxJZCwgdmFsdWUpIHtcclxuICAgICAgICAvLyDQv9GA0LjQstGP0LbQtdGCINC6INC30L3QsNGH0LXQvdGOINC/0L7Qu9GPXHJcbiAgICAgICAgLy8g0L3QsNC00L4g0L/RgNC40LLRj9C30LDRgtGMINC00LDQvdC90YvQtVxyXG4gICAgICAgIC8vIGtvb2QgLT4gaWRcclxuICAgICAgICB2YXIgaWQgPSAwO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgIGlmIChyb3dbY29sbElkXSA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSByb3cuaWQ7XHJcbi8vICAgICAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiByb3cuaWQsIGZpZWxkVmFsdWU6IHJvd1tjb2xsSWRdfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldFZhbHVlQnlJZDogZnVuY3Rpb24oY29sbElkLCByb3dJZCkge1xyXG4gICAgICAgIC8vINCy0LXRgNC90LXRgiDQt9C90LDRh9C10L3QuNGPINC/0L7Qu9GPINC/0L4g0LLRi9Cx0YDQsNC90L3QvtC80YMg0JjQlFxyXG5cclxuICAgICAgICB2YXIgZmllbGRWYWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuc3RhdGUuZGF0YTtcclxuXHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgaWYgKHJvd1snaWQnXSA9PSByb3dJZCkge1xyXG4gICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IHJvd1tjb2xsSWRdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZmllbGRWYWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDQv9C+0LrQsNC20LXRgiDQt9C90LDRh9C10L3QuNC1INC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC00LvRjyDQstC40LTQttC10YLQsCwg0L/QvtC60LAg0LPRgNGD0LfQuNGC0YHRjyDRgdC/0YDQsNCy0L7Rh9C90LjQulxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgdmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgIHRpdGxlOiBudWxsLFxyXG4gICAgICAgICAgICBidG5EZWxldGU6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1IGRvY0lkLiDQldGB0LvQuCDQt9C90LDRh9C10L3QuNC1ID0gMCAo0LTQvtCx0LDQstC70Y/QtdC8INC90L7QstGD0Y4g0LfQsNC/0LjRgdGMLCDRgtC+INC/0YDQvtGB0YLQviDQvtGH0LjRgtC60LAg0L/QvtC70LXQuSwg0LjQvdCw0YfQtSDQv9C+0LTQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVtzZWxmLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTogMH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWUsIGRpc2FibGVkOiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmxpYnMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIHZhc3R1cyA9IEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgICAgIC8vIHdpbGwgd2F0Y2ggbGlicyBjaGFuZ2UgKGZyb20gc2VydmVyKVxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IG5ld1ZhbHVlLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IHNlbGYucHJvcHMubGlicykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7ZGF0YTogZGF0YVswXS5kYXRhfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xsSWQgJiYgdGhpcy5wcm9wcy5jb2xsSWQgIT09ICdpZCcpIHtcclxuICAgICAgICAgICAgLy8g0LjRidC10Lwg0JjQlCDQv9C+INC30L3QsNGH0LXQvdC40Y4g0L/QvtC70Y9cclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRWYWx1ZSh0aGlzLnN0YXRlLmRhdGEsIHRoaXMucHJvcHMuY29sbElkLCB0aGlzLnByb3BzLnZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIHByb3BWYWx1ZSA9IGRhdGFbdGhpcy5wcm9wcy5uYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKGZpZWxkVmFsdWUgPT0gJycpIHtcclxuICAgICAgICAgICAgZmllbGRWYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vINC90LDQudC00LXQvCDQv9C+INC40LQg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRjyDQsiBjb2xsSWRcclxuICAgICAgICB0aGlzLmdldFZhbHVlQnlJZCh0aGlzLnByb3BzLmNvbGxJZCwgZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQuNC0INC60LDQuiB2YWx1ZVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTpmaWVsZFZhbHVlfSk7XHJcblxyXG4gICAgICAgIGlmIChwcm9wVmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQv9GA0LjQstGP0LfQutCwINC6INC00LDQvdC90YvQvFxyXG4gICAgICAgICAgICAvLyDQv9C+0LvRg9GH0LjRgtGMINC30L3QsNGH0LXQvdC40LVcclxuICAgICAgICAgICAgZGF0YVt0aGlzLnByb3BzLm5hbWVdID0gZmllbGRWYWx1ZTtcclxuICAgICAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAvLyDRgdC80L7RgtGA0LjQvCDQuiDRh9C10LzRgyDQv9GA0LjQstGP0LfQsNC9INGB0LXQu9C10LrRgiDQuCDQvtGC0LTQsNC40Lwg0LXQs9C+INC90LDQstC10YDRhVxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGUsIHRoaXMucHJvcHMubmFtZSwgdGhpcy5zdGF0ZS52YWx1ZSk7IC8vINCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDQt9Cw0LTQsNC9INC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0LLQtdGA0YXQvdC10Lwg0YPRgNC+0LLQvdC1LCDQvtGC0LTQsNC00LjQvCDQvtCx0YDQsNCx0L7RgtC60YMg0YLRg9C00LBcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGF0YU9wdGlvbnMgPSB0aGlzLnN0YXRlLmRhdGEgfHwgW10sXHJcbiAgICAgICAgICAgIGlucHV0Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLm5hbWUsXHJcbiAgICAgICAgICAgIE9wdGlvbnMgPSBudWxsLFxyXG4gICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZSA9IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlOyAvLyDQlNCw0LTQuNC8INC00LXRhNC+0LvRgtC90L7QtSDQt9C90LDRh9C10L3QuNC1INC00LvRjyDQstC40LTQttC10YLQsCwg0YfRgtC+0LEg0L/QvtC60LDRgtGMINC10LPQviDRgdGA0LDQt9GDLCDQtNC+INC/0L7QtNCz0YDRg9C30LrQuCDQsdC40LHQu9C40L7RgtC10LrQuFxyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5kb2spIHtcclxuICAgICAgICAgICAgLy8g0L7RgdGC0LDQstC40Lwg0YLQvtC70YzQutC+INC30LDQtNCw0L3Ri9C5IFwi0YHQv9GA0LDQstC+0YfQvdC40LpcIlxyXG4gICAgICAgICAgICBkYXRhT3B0aW9ucyA9IGRhdGFPcHRpb25zLmZpbHRlcihmdW5jdGlvbihpdGVtKSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZG9rID09PSB0aGlzLnByb3BzLmRvaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUudmFsdWUpIHsgLy8g0LTQvtCx0LDQstC40Lwg0L/Rg9GB0YLRg9GOINGB0YLRgNC+0LrRgyDQsiDQvNCw0YHRgdC40LJcclxuICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LjQvCDQvdCw0LvQuNGH0LjQtSDQv9GD0YHRgtC+0Lkg0YHRgtGA0L7QutC4INCyINC80LDRgdGB0LjQstC1XHJcblxyXG4gICAgICAgICAgICBsZXQgZW1wdHlPYmogPSBkYXRhT3B0aW9ucy5maWx0ZXIoZnVuY3Rpb24ob2JqKSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5pZCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFlbXB0eU9iaiB8fCBlbXB0eU9iai5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YU9wdGlvbnMuc3BsaWNlKDAsIDAsIHtpZDogMCwga29vZDogJycsIG5hbWU6ICcnfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZGF0YVZhbHVlID0gZGF0YU9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmlkID09IHRoaXMuc3RhdGUudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhT3B0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgT3B0aW9ucyA9IGRhdGFPcHRpb25zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PSAnYXJyYXknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1bMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IGl0ZW0uaWQsIGtleTogTWF0aC5yYW5kb20oKX0sIGl0ZW0ubmFtZSlcclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGlucHV0RGVmYXVsdFZhbHVlID0gZGF0YVZhbHVlLmxlbmd0aCA+IDAgPyBkYXRhVmFsdWVbMF0ubmFtZSA6IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIE9wdGlvbnMgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogMCwga2V5OiBNYXRoLnJhbmRvbSgpfSwgXCIgRW1wdHkgXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgd2lkZ2V0ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCB7dmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge3dpZHRoOicxMDAlJywgaGVpZ2h0OicxMDAlJ319LCBPcHRpb25zKTsgLy8g0LXRgdC70Lgg0LTQu9GPINCz0YDQuNC00LAsINC+0YHRgtCw0LLQuNC8INGC0L7Qu9GM0LrQviDRgdC10LvQtdC60YJcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy50aXRsZSkge1xyXG4gICAgICAgICAgICB3aWRnZXQgPSAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCJ9LCB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB7ZGlzcGxheTonaW5saW5lLWJsb2NrJ319LCBcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcInRleHRcIiwgY2xhc3NOYW1lOiBcInVpLWMxIGRvYy1pbnB1dC1yZWFkb25seVwiLCB2YWx1ZTogaW5wdXREZWZhdWx0VmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IFwidHJ1ZVwifSkgOiBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID8gbnVsbCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlfSwgT3B0aW9ucyksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5idG5EZWxldGUgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7Y2xhc3NOYW1lOiBcInVpLWMxLWJ1dHRvblwiLCBvbkNsaWNrOiB0aGlzLmJ0bkRlbENsaWNrfSwgXCIgRGVsZXRlIFwiKSA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgd2lkZ2V0KVxyXG4gICAgfSxcclxuXHJcbiAgICBidG5EZWxDbGljazogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAvLyDQv9C+INCy0YvQt9C+0LLRgyDQutC90L7Qv9C60YMg0YPQtNCw0LvQuNGC0YwsINC+0LHQvdGD0LvRj9C10YIg0LfQvdCw0YfQtdC90LjQtVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOm51bGx9KTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKGV2ZW50KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1zZWxlY3QuanN4XG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCByZWxhdGVkRG9jdW1lbnRzID0gZnVuY3Rpb24oc2VsZikgIHtcclxuICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XHJcbiAgICBsZXQgcmVsYXRlZERvY3VtZW50cyA9IHNlbGYuc3RhdGUucmVsYXRpb25zO1xyXG4gICAgaWYgKHJlbGF0ZWREb2N1bWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJlbGF0ZWREb2N1bWVudHMuZm9yRWFjaChmdW5jdGlvbihkb2MpICB7XHJcbiAgICAgICAgICAgIGlmIChkb2MuaWQpIHtcclxuICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsCDRg9C90LjQutCw0LvRjNC90L7RgdGC0Ywg0YHQv9C40YHQutCwINC00L7QutGD0LzQtdC90YLQvtCyXHJcbiAgICAgICAgICAgICAgICBsZXQgaXNFeGlzdHMgPSBzZWxmLnBhZ2VzLmZpbmQoZnVuY3Rpb24ocGFnZSkgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhZ2UuZG9jSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYWdlLmRvY0lkID09IGRvYy5pZCAmJiBwYWdlLmRvY1R5cGVJZCA9PSBkb2MuZG9jX3R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0V4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINCyINC80LDRgdGB0LjQstC1INC90LXRgiwg0LTQvtCx0LDQstC40Lwg0YHRgdGL0LvQutGDINC90LAg0LTQvtC60YPQvNC10L3RglxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGFnZXMucHVzaCh7ZG9jVHlwZUlkOiBkb2MuZG9jX3R5cGUsIGRvY0lkOiBkb2MuaWQsIHBhZ2VOYW1lOiBkb2MubmFtZSArICcgaWQ6JyArIGRvYy5pZH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZWxhdGVkRG9jdW1lbnRzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvbWl4aW4vcmVsYXRlZERvY3VtZW50cy5qc3hcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vdG9vbGJhci1jb250YWluZXItc3R5bGVzJyksXHJcbiAgICBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcblxyXG52YXIgX19fX0NsYXNzOT1SZWFjdC5Db21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3M5X19fX0tleSBpbiBfX19fQ2xhc3M5KXtpZihfX19fQ2xhc3M5Lmhhc093blByb3BlcnR5KF9fX19DbGFzczlfX19fS2V5KSl7VG9vbEJhckNvbnRhaW5lcltfX19fQ2xhc3M5X19fX0tleV09X19fX0NsYXNzOVtfX19fQ2xhc3M5X19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczk9X19fX0NsYXNzOT09PW51bGw/bnVsbDpfX19fQ2xhc3M5LnByb3RvdHlwZTtUb29sQmFyQ29udGFpbmVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3M5KTtUb29sQmFyQ29udGFpbmVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1Ub29sQmFyQ29udGFpbmVyO1Rvb2xCYXJDb250YWluZXIuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzOTtcclxuICAgIGZ1bmN0aW9uIFRvb2xCYXJDb250YWluZXIocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3M5LmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRvb2xCYXJDb250YWluZXIucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSxzdHlsZXMudG9vbEJhckNvbnRhaW5lclN0eWxlLCBzdHlsZXNbdGhpcy5wcm9wcy5wb3NpdGlvbl0gKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJ0b29sQmFyQ29udGFpbmVyXCIsIHN0eWxlOiBzdHlsZX0sIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuVG9vbEJhckNvbnRhaW5lci5wcm9wVHlwZXMgPSB7XHJcbiAgICBwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xyXG59XHJcblxyXG5cclxuVG9vbEJhckNvbnRhaW5lci5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBwb3NpdGlvbjogJ3JpZ2h0J1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUb29sQmFyQ29udGFpbmVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy90b29sYmFyLWNvbnRhaW5lci90b29sYmFyLWNvbnRhaW5lci5qc3hcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdG9vbEJhckNvbnRhaW5lclN0eWxlOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgaGVpZ2h0OiAnMzBweCcsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaydcbiAgICB9LFxuXG4gICAgcmlnaHQ6IHtcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsXG4gICAgICAgIG1hcmdpbkxlZnQ6ICc1cHgnXG4gICAgfSxcblxuICAgIGxlZnQ6IHtcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LXN0YXJ0JyxcbiAgICAgICAgbWFyZ2luUmlnaHQ6ICc1cHgnXG4gICAgfVxuXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy90b29sYmFyLWNvbnRhaW5lci90b29sYmFyLWNvbnRhaW5lci1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBUb29sYmFyQ29udGFpbmVyID0gcmVxdWlyZSgnLi8uLi90b29sYmFyLWNvbnRhaW5lci90b29sYmFyLWNvbnRhaW5lci5qc3gnKSxcclxuICAgIEJ0bkFkZCA9IHJlcXVpcmUoJy4vLi4vYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1hZGQvYnV0dG9uLXJlZ2lzdGVyLWFkZC5qc3gnKSxcclxuICAgIEJ0bkVkaXQgPSByZXF1aXJlKCcuLy4uL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZWRpdC9idXR0b24tcmVnaXN0ZXItZWRpdC5qc3gnKSxcclxuICAgIEJ0blNhdmUgPSByZXF1aXJlKCcuLy4uL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItc2F2ZS9idXR0b24tcmVnaXN0ZXItc2F2ZS5qc3gnKSxcclxuICAgIEJ0bkNhbmNlbCA9IHJlcXVpcmUoJy4vLi4vYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1jYW5jZWwvYnV0dG9uLXJlZ2lzdGVyLWNhbmNlbC5qc3gnKSxcclxuICAgIEJ0blByaW50ID0gcmVxdWlyZSgnLi8uLi9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXByaW50L2J1dHRvbi1yZWdpc3Rlci1wcmludC5qc3gnKSxcclxuICAgIFRhc2tXaWRnZXQgPSByZXF1aXJlKCcuLy4uL3Rhc2std2lkZ2V0L3Rhc2std2lkZ2V0LmpzeCcpO1xyXG5cclxudmFyIF9fX19DbGFzc249UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc25fX19fS2V5IGluIF9fX19DbGFzc24pe2lmKF9fX19DbGFzc24uaGFzT3duUHJvcGVydHkoX19fX0NsYXNzbl9fX19LZXkpKXtEb2NUb29sQmFyW19fX19DbGFzc25fX19fS2V5XT1fX19fQ2xhc3NuW19fX19DbGFzc25fX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzbj1fX19fQ2xhc3NuPT09bnVsbD9udWxsOl9fX19DbGFzc24ucHJvdG90eXBlO0RvY1Rvb2xCYXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc24pO0RvY1Rvb2xCYXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPURvY1Rvb2xCYXI7RG9jVG9vbEJhci5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NuO1xyXG4gICAgZnVuY3Rpb24gRG9jVG9vbEJhcihwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc24uY2FsbCh0aGlzLHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5idG5FZGl0Q2xpY2sgPSB0aGlzLmJ0bkVkaXRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuQWRkQ2xpY2sgPSB0aGlzLmJ0bkFkZENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5idG5TYXZlQ2xpY2sgPSB0aGlzLmJ0blNhdmVDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuQ2FuY2VsQ2xpY2sgPSB0aGlzLmJ0bkNhbmNlbENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5idG5QcmludENsaWNrID0gdGhpcy5idG5QcmludENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVCdXR0b25UYXNrID0gdGhpcy5oYW5kbGVCdXR0b25UYXNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3RUYXNrID0gdGhpcy5oYW5kbGVTZWxlY3RUYXNrLmJpbmQodGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NUb29sQmFyLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBpc0VkaXRNb2RlID0gdGhpcy5wcm9wcy5lZGl0ZWQsXHJcbiAgICAgICAgICAgIGlzRG9jRGlzYWJsZWQgPSB0aGlzLnByb3BzLmRvY1N0YXR1cyA9PSAyID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBkb2NJZCA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEuaWQgfHwgMCxcclxuICAgICAgICAgICAgdG9vbGJhclBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGJ0bkFkZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6ICFpc0VkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0VkaXRNb2RlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYnRuRWRpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6ICFpc0VkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0RvY0Rpc2FibGVkXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYnRuUHJpbnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYnRuU2F2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IGlzRWRpdE1vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYnRuQ2FuY2VsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogaXNFZGl0TW9kZSAmJiBkb2NJZCAhPT0wLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyQ29udGFpbmVyLCB7cmVmOiBcInRvb2xiYXJDb250YWluZXJcIn0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5BZGQsIHtyZWY6IFwiYnRuQWRkXCIsIG9uQ2xpY2s6IHRoaXMuYnRuQWRkQ2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0bkFkZCddLnNob3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdG9vbGJhclBhcmFtc1snYnRuQWRkJ10uZGlzYWJsZWR9KSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ0bkVkaXQsIHtyZWY6IFwiYnRuRWRpdFwiLCBvbkNsaWNrOiB0aGlzLmJ0bkVkaXRDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuRWRpdCddLnNob3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRvb2xiYXJQYXJhbXNbJ2J0bkVkaXQnXS5kaXNhYmxlZH0pLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuU2F2ZSwge3JlZjogXCJidG5TYXZlXCIsIG9uQ2xpY2s6IHRoaXMuYnRuU2F2ZUNsaWNrLCBzaG93OiB0b29sYmFyUGFyYW1zWydidG5TYXZlJ10uc2hvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdG9vbGJhclBhcmFtc1snYnRuU2F2ZSddLmRpc2FibGVkfSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5DYW5jZWwsIHtyZWY6IFwiYnRuQ2FuY2VsXCIsIG9uQ2xpY2s6IHRoaXMuYnRuQ2FuY2VsQ2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0bkNhbmNlbCddLnNob3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdG9vbGJhclBhcmFtc1snYnRuQ2FuY2VsJ10uZGlzYWJsZWR9KSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ0blByaW50LCB7cmVmOiBcImJ0blByaW50XCIsIG9uQ2xpY2s6IHRoaXMuYnRuUHJpbnRDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuUHJpbnQnXS5zaG93LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdG9vbGJhclBhcmFtc1snYnRuUHJpbnQnXS5kaXNhYmxlZH0pLCBcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYnBtID8gUmVhY3QuY3JlYXRlRWxlbWVudChUYXNrV2lkZ2V0LCB7cmVmOiBcInRhc2tXaWRnZXRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrTGlzdDogdGhpcy5wcm9wcy5icG0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlU2VsZWN0VGFzazogdGhpcy5oYW5kbGVTZWxlY3RUYXNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUJ1dHRvblRhc2s6IHRoaXMuaGFuZGxlQnV0dG9uVGFza31cclxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbFxyXG5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRG9jVG9vbEJhci5wcm90b3R5cGUsXCJidG5BZGRDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdidG5BZGRDbGljayBjYWxsZWQnKVxyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQutC90L7Qv9C60LggQWRkXHJcbiAgICAgICAgLy8g0L7RgtC/0YDQsNCy0LjQvCDQuNC30LLQtdGJ0LXQvdC40LUg0L3QsNCy0LXRgNGFXHJcbi8vICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5uYW1lKTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NJZENoYW5nZScsIDApO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2VkaXRlZENoYW5nZScsIHRydWUpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgZmFsc2UpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NUb29sQmFyLnByb3RvdHlwZSxcImJ0bkVkaXRDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQutC90L7Qv9C60LggRWRpdFxyXG4gICAgICAgIC8vINC/0LXRgNC10LLQvtC00LjQvCDQtNC+0LrRg9C80LXQvdGCINCyINGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjywg0YHQvtGF0YDQsNC90LXQvSA9IGZhbHNlXHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmRvY1N0YXR1cyB8fCB0aGlzLnByb3BzLmRvY1N0YXR1cyA8IDIpIHtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRG9jVG9vbEJhci5wcm90b3R5cGUsXCJidG5QcmludENsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ByaW50IGNhbGxlZCcpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NUb29sQmFyLnByb3RvdHlwZSxcImJ0blNhdmVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQutC90L7Qv9C60LggU2F2ZVxyXG4gICAgICAgIC8vINCy0LDQu9C40LTQsNGC0L7RgFxyXG5cclxuICAgICAgICBsZXQgdmFsaWRhdGlvbk1lc3NhZ2UgPSB0aGlzLnByb3BzLnZhbGlkYXRvciA/IHRoaXMucHJvcHMudmFsaWRhdG9yKCkgOiAndmFsaWRhdG9yIGRvIG5vdCBleGlzdHMnLFxyXG4gICAgICAgICAgICBpc1ZhbGlkID0gdGhpcy5wcm9wcy52YWxpZGF0b3IgPyAhdGhpcy5wcm9wcy52YWxpZGF0b3IoKSA6IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC/0YDQvtGI0LvQuCDQstCw0LvQuNC00LDRhtC40Y4sINGC0L4g0YHQvtGF0YDQsNC90LXRj9C8XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVEYXRhJyk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2VkaXRlZENoYW5nZScsIGZhbHNlKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2F2ZWRDaGFuZ2UnLCB0cnVlKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NUb29sQmFyLnByb3RvdHlwZSxcImJ0bkNhbmNlbENsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LTQu9GPINC60L3QvtC/0LrQuCBDYW5jZWxcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5ldmVudEhhbmRsZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ldmVudEhhbmRsZXIoJ0NBTkNFTCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgZmFsc2UpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgdHJ1ZSk7XHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NUb29sQmFyLnByb3RvdHlwZSxcImhhbmRsZUJ1dHRvblRhc2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgLy8g0LzQtdGC0L7QtCDQstGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LLRi9Cx0L7RgNC1INC30LDQtNCw0YfQuFxyXG4gICAgICAgIC8vQHRvZG8g0JfQsNC60L7QvdGH0LjRgtGMXHJcblxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2V4ZWN1dGVUYXNrJywgdGFzayk7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NUb29sQmFyLnByb3RvdHlwZSxcImhhbmRsZVNlbGVjdFRhc2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgLy8g0LzQtdGC0L7QtCDQstGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LLRi9Cx0L7RgNC1INC30LDQtNCw0YfQuFxyXG4gICAgICAgIC8vQHRvZG8g0JfQsNC60L7QvdGH0LjRgtGMXHJcbiAgICAgICAgY29uc3QgdGFza1ZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuXHJcbkRvY1Rvb2xCYXIuUHJvcFR5cGVzID0ge1xyXG4gICAgYnBtOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICBlZGl0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgZG9jU3RhdHVzOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgdmFsaWRhdG9yOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xyXG59XHJcblxyXG5Eb2NUb29sQmFyLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGJwbTogW10sXHJcbiAgICBlZGl0ZWQ6IGZhbHNlLFxyXG4gICAgZG9jU3RhdHVzOiAwXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9jVG9vbEJhcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLXRvb2xiYXIvZG9jLXRvb2xiYXIuanN4XG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyksXHJcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXHJcbiAgICBJQ09OID0gJ3NhdmUnO1xyXG5cclxuXHJcbnZhciBfX19fQ2xhc3NyPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NyX19fX0tleSBpbiBfX19fQ2xhc3NyKXtpZihfX19fQ2xhc3NyLmhhc093blByb3BlcnR5KF9fX19DbGFzc3JfX19fS2V5KSl7QnV0dG9uUmVnaXN0ZXJQcmludFtfX19fQ2xhc3NyX19fX0tleV09X19fX0NsYXNzcltfX19fQ2xhc3NyX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3I9X19fX0NsYXNzcj09PW51bGw/bnVsbDpfX19fQ2xhc3NyLnByb3RvdHlwZTtCdXR0b25SZWdpc3RlclByaW50LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NyKTtCdXR0b25SZWdpc3RlclByaW50LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1CdXR0b25SZWdpc3RlclByaW50O0J1dHRvblJlZ2lzdGVyUHJpbnQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzcjtcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgZnVuY3Rpb24gQnV0dG9uUmVnaXN0ZXJQcmludChwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc3IuY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyUHJpbnQucHJvdG90eXBlLFwiaGFuZGxlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DbGljaygpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlclByaW50LnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtkaXNhYmxlZDogbmV4dFByb3BzLmRpc2FibGVkfSlcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJQcmludC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHtcclxuICAgICAgICAgICAgcmVmOiBcImJ0blNhdmVcIiwgXHJcbiAgICAgICAgICAgIHZhbHVlOiBcIlNhdmVcIiwgXHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdywgXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24oZSkge3JldHVybiB0aGlzLmhhbmRsZUNsaWNrKGUpO30uYmluZCh0aGlzKX0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIiwge3JlZjogXCJpbWFnZVwiLCBzcmM6IHN0eWxlcy5pY29uc1tJQ09OXX0pXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG47XHJcblxyXG5CdXR0b25SZWdpc3RlclByaW50LnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2xcclxufVxyXG5cclxuXHJcbkJ1dHRvblJlZ2lzdGVyUHJpbnQuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgc2hvdzogdHJ1ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25SZWdpc3RlclByaW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXNhdmUvYnV0dG9uLXJlZ2lzdGVyLXNhdmUuanN4XG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyksXHJcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXHJcbiAgICBJQ09OID0gJ2NhbmNlbCc7XHJcblxyXG5cclxudmFyIF9fX19DbGFzc3Q9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc3RfX19fS2V5IGluIF9fX19DbGFzc3Qpe2lmKF9fX19DbGFzc3QuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzdF9fX19LZXkpKXtCdXR0b25SZWdpc3RlckNhbmNlbFtfX19fQ2xhc3N0X19fX0tleV09X19fX0NsYXNzdFtfX19fQ2xhc3N0X19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3Q9X19fX0NsYXNzdD09PW51bGw/bnVsbDpfX19fQ2xhc3N0LnByb3RvdHlwZTtCdXR0b25SZWdpc3RlckNhbmNlbC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzdCk7QnV0dG9uUmVnaXN0ZXJDYW5jZWwucHJvdG90eXBlLmNvbnN0cnVjdG9yPUJ1dHRvblJlZ2lzdGVyQ2FuY2VsO0J1dHRvblJlZ2lzdGVyQ2FuY2VsLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc3Q7XHJcbi8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcclxuICAgIGZ1bmN0aW9uIEJ1dHRvblJlZ2lzdGVyQ2FuY2VsKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzdC5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJDYW5jZWwucHJvdG90eXBlLFwiaGFuZGxlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DbGljaygpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlckNhbmNlbC5wcm90b3R5cGUsXCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGlzYWJsZWQ6IG5leHRQcm9wcy5kaXNhYmxlZH0pXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyQ2FuY2VsLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge1xyXG4gICAgICAgICAgICByZWY6IFwiYnRuQ2FuY2VsXCIsIFxyXG4gICAgICAgICAgICB2YWx1ZTogXCJDYW5jZWxcIiwgXHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdywgXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24oZSkge3JldHVybiB0aGlzLmhhbmRsZUNsaWNrKGUpO30uYmluZCh0aGlzKX0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIiwge3JlZjogXCJpbWFnZVwiLCBzcmM6IHN0eWxlcy5pY29uc1tJQ09OXX0pXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG47XHJcblxyXG5CdXR0b25SZWdpc3RlckNhbmNlbC5wcm9wVHlwZXMgPSB7XHJcbiAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgZGlzYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sXHJcbn1cclxuXHJcblxyXG5CdXR0b25SZWdpc3RlckNhbmNlbC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBzaG93OiB0cnVlXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblJlZ2lzdGVyQ2FuY2VsO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWNhbmNlbC9idXR0b24tcmVnaXN0ZXItY2FuY2VsLmpzeFxuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcycpLFxyXG4gICAgQnV0dG9uID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLmpzeCcpLFxyXG4gICAgSUNPTiA9ICdwcmludCc7XHJcblxyXG5cclxudmFyIF9fX19DbGFzc2U9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc2VfX19fS2V5IGluIF9fX19DbGFzc2Upe2lmKF9fX19DbGFzc2UuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzZV9fX19LZXkpKXtCdXR0b25SZWdpc3RlclByaW50W19fX19DbGFzc2VfX19fS2V5XT1fX19fQ2xhc3NlW19fX19DbGFzc2VfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzZT1fX19fQ2xhc3NlPT09bnVsbD9udWxsOl9fX19DbGFzc2UucHJvdG90eXBlO0J1dHRvblJlZ2lzdGVyUHJpbnQucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2UpO0J1dHRvblJlZ2lzdGVyUHJpbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yPUJ1dHRvblJlZ2lzdGVyUHJpbnQ7QnV0dG9uUmVnaXN0ZXJQcmludC5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NlO1xyXG4vLyDQutC90L7Qv9C60LAg0YHQvtC30LTQsNC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LAg0LIg0YDQtdCz0LjRgdGC0YDQsNGFXHJcbiAgICBmdW5jdGlvbiBCdXR0b25SZWdpc3RlclByaW50KHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzZS5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlclByaW50LnByb3RvdHlwZSxcImhhbmRsZUNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uQ2xpY2soKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJQcmludC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHtcclxuICAgICAgICAgICAgcmVmOiBcImJ0blByaW50XCIsIFxyXG4gICAgICAgICAgICB2YWx1ZTogXCJQcmludFwiLCBcclxuICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93LCBcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQsIFxyXG4gICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbihlKSB7cmV0dXJuIHRoaXMuaGFuZGxlQ2xpY2soZSk7fS5iaW5kKHRoaXMpfSwgXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWFnZVwiLCB7cmVmOiBcImltYWdlXCIsIHNyYzogc3R5bGVzLmljb25zW0lDT05dfSlcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcbjtcclxuXHJcbkJ1dHRvblJlZ2lzdGVyUHJpbnQucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5cclxuQnV0dG9uUmVnaXN0ZXJQcmludC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBzaG93OiB0cnVlXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblJlZ2lzdGVyUHJpbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItcHJpbnQvYnV0dG9uLXJlZ2lzdGVyLXByaW50LmpzeFxuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWV4ZWN1dGUvYnV0dG9uLXJlZ2lzdGVyLWV4ZWN1dGUuanN4JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL3Rhc2std2lkZ2V0LXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzc3M9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc3NfX19fS2V5IGluIF9fX19DbGFzc3Mpe2lmKF9fX19DbGFzc3MuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzc19fX19LZXkpKXtUYXNrV2lkZ2V0W19fX19DbGFzc3NfX19fS2V5XT1fX19fQ2xhc3NzW19fX19DbGFzc3NfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzcz1fX19fQ2xhc3NzPT09bnVsbD9udWxsOl9fX19DbGFzc3MucHJvdG90eXBlO1Rhc2tXaWRnZXQucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3MpO1Rhc2tXaWRnZXQucHJvdG90eXBlLmNvbnN0cnVjdG9yPVRhc2tXaWRnZXQ7VGFza1dpZGdldC5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NzO1xyXG4gICAgZnVuY3Rpb24gVGFza1dpZGdldChwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc3MuY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICBsZXQgdGFza3MgPSBwcm9wcy50YXNrTGlzdCB8fCBbXTtcclxuXHJcblxyXG4gICAgICAgIGlmICghdGFza3NbMF0uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHRhc2tzWzBdLnN0YXR1cyA9ICdvcGVuZWQnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdGFza0xpc3Q6IHRhc2tzXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdFRhc2sgPSB0aGlzLmhhbmRsZVNlbGVjdFRhc2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUJ1dHRvblRhc2sgPSB0aGlzLmhhbmRsZUJ1dHRvblRhc2suYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFza1dpZGdldC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgdGFza3MgPSB0aGlzLnN0YXRlLnRhc2tMaXN0LmZpbHRlcihmdW5jdGlvbih0YXNrKSAge1xyXG4gICAgICAgICAgICBpZiAodGFzay5zdGF0dXMgPT09ICdvcGVuZWQnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFzaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXRhc2tzKSByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsKVxyXG5cclxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMud3JhcHBlcn0sIFxyXG4gICAgICAgICAgICAgICAgdGFza3MubGVuZ3RoID4gMSA/XHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlU2VsZWN0VGFzaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwic2VsZWN0VGFza1wifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza3MubWFwKGZ1bmN0aW9uKHRhc2tOYW1lLCBpbmRleCkgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gJ29wdGlvbi0nICsgaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IDAsIGtleToga2V5LCByZWY6IGtleX0sIFwiIFwiLCB0YXNrTmFtZS5uYW1lLCBcIiBcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICkgOiBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYnV0dG9uVGFza1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUJ1dHRvblRhc2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0YXNrcy5sZW5ndGggPT0gMSA/IHRydWU6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRhc2tzLmxlbmd0aCA9PSAxPyB0YXNrc1swXS5uYW1lOiAnJ30pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tXaWRnZXQucHJvdG90eXBlLFwiaGFuZGxlU2VsZWN0VGFza1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBsZXQgdGFza05hbWUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZVNlbGVjdFRhc2sodGFza05hbWUpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrV2lkZ2V0LnByb3RvdHlwZSxcImhhbmRsZUJ1dHRvblRhc2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQvdCw0LnQtNC10Lwg0LDQutGC0YPQsNC70YzQvdGD0Y4g0LfQsNC00LDRh9GDXHJcbiAgICAgICAgbGV0IGFjdHVhbFRhc2sgPSB0aGlzLnN0YXRlLnRhc2tMaXN0LmZpbHRlcihmdW5jdGlvbih0YXNrKSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2suYWN0dWFsU3RlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXNrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgdGFzayA9IGFjdHVhbFRhc2subWFwKGZ1bmN0aW9uKHRhc2spICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFzay5hY3Rpb25cclxuICAgICAgICAgICAgfSk7IC8vINC+0YHRgtCw0LLQuNC8INGC0L7Qu9GM0LrQviDQvdCw0LfQstCw0L3QuNC1INC/0YDQvtGG0LXQtNGD0YDRi1xyXG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlQnV0dG9uVGFzayh0YXNrKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFza1dpZGdldC5wcm90b3R5cGUsXCJnZXREZWZhdWx0VGFza1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBbe3N0ZXA6IDAsIG5hbWU6ICdTdGFydCcsIGFjdGlvbjogJ3N0YXJ0Jywgc3RhdHVzOiAnb3BlbmVkJ31dXHJcbiAgICB9fSk7XHJcblxyXG5cclxuXHJcblRhc2tXaWRnZXQuUHJvcFR5cGVzID0ge1xyXG4gICAgdGFza0xpc3Q6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxyXG4gICAgaGFuZGxlQnV0dG9uVGFzazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIGhhbmRsZVNlbGVjdFRhc2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVGFza1dpZGdldDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvdGFzay13aWRnZXQvdGFzay13aWRnZXQuanN4XG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyksXHJcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXHJcbiAgICBJQ09OID0gJ2V4ZWN1dGUnO1xyXG5cclxuXHJcbnZhciBfX19fQ2xhc3N1PVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3N1X19fX0tleSBpbiBfX19fQ2xhc3N1KXtpZihfX19fQ2xhc3N1Lmhhc093blByb3BlcnR5KF9fX19DbGFzc3VfX19fS2V5KSl7QnV0dG9uUmVnaXN0ZXJFeGVjdXRlW19fX19DbGFzc3VfX19fS2V5XT1fX19fQ2xhc3N1W19fX19DbGFzc3VfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzdT1fX19fQ2xhc3N1PT09bnVsbD9udWxsOl9fX19DbGFzc3UucHJvdG90eXBlO0J1dHRvblJlZ2lzdGVyRXhlY3V0ZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzdSk7QnV0dG9uUmVnaXN0ZXJFeGVjdXRlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1CdXR0b25SZWdpc3RlckV4ZWN1dGU7QnV0dG9uUmVnaXN0ZXJFeGVjdXRlLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc3U7XHJcbi8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcclxuICAgIGZ1bmN0aW9uIEJ1dHRvblJlZ2lzdGVyRXhlY3V0ZShwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc3UuY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlckV4ZWN1dGUucHJvdG90eXBlLFwiaGFuZGxlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJFeGVjdXRlLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge1xyXG4gICAgICAgICAgICByZWY6IFwiYnRuRXhlY3V0ZVwiLCBcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUsIFxyXG4gICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnNob3csIFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCwgXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2t9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VcIiwgc3JjOiBzdHlsZXMuaWNvbnNbSUNPTl19KVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuO1xyXG5cclxuQnV0dG9uUmVnaXN0ZXJFeGVjdXRlLnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXHJcbn1cclxuXHJcblxyXG5CdXR0b25SZWdpc3RlckV4ZWN1dGUuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgc2hvdzogdHJ1ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25SZWdpc3RlckV4ZWN1dGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZXhlY3V0ZS9idXR0b24tcmVnaXN0ZXItZXhlY3V0ZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgd3JhcHBlcjoge1xuICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnXG4gICAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvdGFzay13aWRnZXQvdGFzay13aWRnZXQtc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xuXG52YXIgdmFsaWRhdGVGb3JtID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtKHNlbGYsIHJlcUZpZWxkcykge1xuXG4gICAgLy8g0LLQsNC70LjQtNCw0YbQuNGPINGE0L7RgNC80YtcbiAgICB2YXIgd2FybmluZyA9IHZvaWQgMCxcbiAgICAgICAgcmVxdWlyZWRGaWVsZHMgPSByZXFGaWVsZHMgfHwgW10sXG4gICAgICAgIG5vdFJlcXVpcmVkRmllbGRzID0gW10sXG4gICAgICAgIG5vdE1pbk1heFJ1bGUgPSBbXSxcbiAgICAgICAgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGE7XG5cbiAgICByZXF1aXJlZEZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICBpZiAoZmllbGQubmFtZSBpbiBkYXRhKSB7XG5cbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGRhdGFbZmllbGQubmFtZV07XG5cbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBub3RSZXF1aXJlZEZpZWxkcy5wdXNoKGZpZWxkLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LrQsCDQvdCwINC80LjQvSAuINC80LDQutGBINC30L3QsNGH0LXQvdC40Y9cblxuICAgICAgICAgICAgLy8gfHwgdmFsdWUgJiYgdmFsdWUgPiBwcm9wcy5tYXhcbiAgICAgICAgICAgIHZhciBjaGVja1ZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZmllbGQudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udHJvbGxlZFZhbHVlRCA9IERhdGUucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGQubWluICYmIGNvbnRyb2xsZWRWYWx1ZUQgPCBmaWVsZC5taW4gJiYgZmllbGQubWF4ICYmIGNvbnRyb2xsZWRWYWx1ZUQgPiBmaWVsZC5tYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udHJvbGxlZFZhbHVlTiA9IE51bWJlcih2YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLm1pbiAmJiBjb250cm9sbGVkVmFsdWVOID09PSAwIHx8IGZpZWxkLm1pbiAmJiBjb250cm9sbGVkVmFsdWVOIDwgZmllbGQubWluICYmIGZpZWxkLm1heCAmJiBjb250cm9sbGVkVmFsdWVOID4gZmllbGQubWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGVja1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm90TWluTWF4UnVsZS5wdXNoKGZpZWxkLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAobm90UmVxdWlyZWRGaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgICB3YXJuaW5nID0gJ3B1dWR1YiB2YWphbGlrdWQgYW5kbWVkICgnICsgbm90UmVxdWlyZWRGaWVsZHMuam9pbignLCAnKSArICcpICc7XG4gICAgfVxuXG4gICAgaWYgKG5vdE1pbk1heFJ1bGUubGVuZ3RoID4gMCkge1xuICAgICAgICB3YXJuaW5nID0gd2FybmluZyA/IHdhcm5pbmcgOiAnJyArICcgbWluL21heCBvbiB2YWxlKCcgKyBub3RNaW5NYXhSdWxlLmpvaW4oJywgJykgKyAnKSAnO1xuICAgIH1cblxuICAgIHJldHVybiB3YXJuaW5nOyAvLyDQstC10YDQvdC10Lwg0LjQt9Cy0LXRidC10L3QuNC1INC+0LEg0LjRgtC+0LPQsNGFINCy0LDQu9C40LTQsNGG0LjQuFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZGF0ZUZvcm07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9taXhpbi92YWxpZGF0ZUZvcm0uanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIid1c2Ugc3RyaWN0JztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgQnV0dG9uID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcclxuICAgIGJ1dHRvblN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL21vZGFscGFnZS1zdHlsZXMnKTtcclxuXHJcbnZhciBfX19fQ2xhc3M0PVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3M0X19fX0tleSBpbiBfX19fQ2xhc3M0KXtpZihfX19fQ2xhc3M0Lmhhc093blByb3BlcnR5KF9fX19DbGFzczRfX19fS2V5KSl7TW9kYWxQYWdlW19fX19DbGFzczRfX19fS2V5XT1fX19fQ2xhc3M0W19fX19DbGFzczRfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzND1fX19fQ2xhc3M0PT09bnVsbD9udWxsOl9fX19DbGFzczQucHJvdG90eXBlO01vZGFsUGFnZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzNCk7TW9kYWxQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1Nb2RhbFBhZ2U7TW9kYWxQYWdlLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzczQ7XHJcbiAgICBmdW5jdGlvbiBNb2RhbFBhZ2UocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3M0LmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VNb2RhbFBhZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnNob3dcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1vZGFsUGFnZS5wcm90b3R5cGUsXCJjbG9zZU1vZGFsUGFnZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3c6ZmFsc2V9KTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTW9kYWxQYWdlLnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93OiBuZXh0UHJvcHMuc2hvd30pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb2RhbFBhZ2UucHJvdG90eXBlLFwiaGFuZGxlQnRuQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihidG5FdmVudCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMubW9kYWxQYWdlQnRuQ2xpY2soYnRuRXZlbnQpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb2RhbFBhZ2UucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0L/QtdGA0LXQtNCw0L0g0LDRgtGA0LjQsdGDIG1vZGFsT2JqZWN0cyA9IFsnYnRuT2snLCdidG5DYW5jZWwnXVxyXG4gICAgICAgIGxldCBoaWRlQnRuT2sgPSB0aGlzLnByb3BzLm1vZGFsT2JqZWN0cy5pbmRleE9mKCdidG5PaycpID09IC0xID8gZmFsc2UgOiB0cnVlLCAvLyDRg9C/0YDQsNCy0LvQtdC90LjQtSDQutC90L7Qv9C60L7QuSDQntC6XHJcbiAgICAgICAgICAgIGhpZGVCdG5DYW5jZWwgPSB0aGlzLnByb3BzLm1vZGFsT2JqZWN0cy5pbmRleE9mKCdidG5DYW5jZWwnKSA9PSAtMSA/IGZhbHNlIDogdHJ1ZSwgLy8g0YPQv9GA0LDQstC70LXQvdC40LUg0LrQvdC+0L/QutC+0LkgQ2FuY2VsXHJcbiAgICAgICAgICAgIGRpc3BsYXlNb2RhbCA9IHRoaXMuc3RhdGUuc2hvdyA/ICdmbGV4JzogJ25vbmUnICxcclxuICAgICAgICAgICAgcGFnZVBvc2l0aW9uID0gIHRoaXMucHJvcHMucG9zaXRpb24sXHJcbiAgICAgICAgICAgIGNvbnRhaW5lclN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmNvbnRhaW5lciwge2Rpc3BsYXk6IGRpc3BsYXlNb2RhbH0sIHtqdXN0aWZ5Q29udGVudDpwYWdlUG9zaXRpb259KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7cmVmOiBcImNvbnRhaW5lclwiLCBzdHlsZTogY29udGFpbmVyU3R5bGV9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMubW9kYWxQYWdlLCByZWY6IFwibW9kYWxQYWdlQ29udGFpbmVyXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmhlYWRlciwgcmVmOiBcIm1vZGFsUGFnZUhlYWRlclwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtyZWY6IFwiaGVhZGVyTmFtZVwiLCBzdHlsZTogc3R5bGVzLmhlYWRlck5hbWV9LCBcIiBcIiwgdGhpcy5wcm9wcy5tb2RhbFBhZ2VOYW1lLCBcIiBcIiksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge3N0eWxlOiBzdHlsZXMuYnV0dG9uQ2xvc2UsIHJlZjogXCJidG5DbG9zZVwiLCBvbkNsaWNrOiB0aGlzLmNsb3NlTW9kYWxQYWdlLmJpbmQodGhpcyksIHZhbHVlOiBcInhcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5tb2RhbFBhZ2VDb250ZW50LCByZWY6IFwibW9kYWxQYWdlQ29udGVudFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5tb2RhbEZvb3RlciwgcmVmOiBcIm1vZGFsUGFnZUJ1dHRvbnNcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRlQnRuT2sgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYnRuT2tcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiT2tcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogKCd3aWR0aCcgaW4gc3R5bGVzLm1vZGFsUGFnZUJ1dHRvbnMpPyBzdHlsZXMubW9kYWxQYWdlQnV0dG9ucy53aWR0aDogbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAoJ2hlaWdodCcgaW4gc3R5bGVzLm1vZGFsUGFnZUJ1dHRvbnMpPyBzdHlsZXMubW9kYWxQYWdlQnV0dG9ucy5oZWlnaHQ6IG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQnRuQ2xpY2suYmluZCh0aGlzLCAnT2snKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYnRuT2tcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWFnZVwiLCB7cmVmOiBcImltYWdlXCIsIHNyYzogYnV0dG9uU3R5bGVzLmljb25zWydvayddfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuYnV0dG9uc1NlcGFyYXRvcn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUJ0bkNhbmNlbCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJidG5DYW5jZWxcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiQ2FuY2VsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAoJ3dpZHRoJyBpbiBzdHlsZXMubW9kYWxQYWdlQnV0dG9ucyk/IHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zLndpZHRoOiBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICgnaGVpZ2h0JyBpbiBzdHlsZXMubW9kYWxQYWdlQnV0dG9ucyk/IHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zLmhlaWdodDogbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMsICdDYW5jZWwnKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm1vZGFsUGFnZUJ1dHRvbnNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYnRuQ2FuY2VsXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIiwge3JlZjogXCJpbWFnZVwiLCBzcmM6IGJ1dHRvblN0eWxlcy5pY29uc1snY2FuY2VsJ119KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG5cclxuXHJcbk1vZGFsUGFnZS5wcm9wVHlwZXMgPSB7XHJcbiAgICBtb2RhbFBhZ2VOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBtb2RhbFBhZ2VCdG5DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHNob3c6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgcG9zaXRpb246IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ2NlbnRlcicsICdmbGV4LXN0YXJ0JywgJ2ZsZXgtZW5kJ10pLFxyXG59XHJcblxyXG5cclxuTW9kYWxQYWdlLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIG1vZGFsUGFnZU5hbWU6ICdkZWZhdWxOYW1lJyxcclxuICAgIG1vZGFsT2JqZWN0czogWydidG5PaycsICdidG5DYW5jZWwnXSxcclxuICAgIHBvc2l0aW9uOiAnY2VudGVyJyxcclxuICAgIHNob3c6IGZhbHNlXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW9kYWxQYWdlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxQYWdlLmpzeFxuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb250YWluZXI6IHtcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgIHRvcDogJzAnLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpJyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcidcbiAgICB9LFxuICAgIG1vZGFsUGFnZToge1xuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcbiAgICAgICAgbWFyZ2luOiAnOHB4JyxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICAgICAgb3V0bGluZTogJ25vbmUnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICBhbGlnblNlbGY6ICdjZW50ZXInXG4gICAgfSxcbiAgICBtb2RhbFBhZ2VDb250ZW50OiB7XG4gICAgICAgIHBhZGRpbmc6ICcxMHB4JyxcbiAgICAgICAgbWFyZ2luOiAnMTBweCdcbiAgICB9LFxuICAgIGhlYWRlcjoge1xuICAgICAgICBoZWlnaHQ6ICczMHB4JyxcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGRhcmtncmF5JyxcbiAgICAgICAgYmFja2dyb3VuZDogJ2xpZ2h0Z3JheScsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJ1xuICAgIH0sXG5cbiAgICBoZWFkZXJOYW1lOiB7XG4gICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICAgICAgICBtYXJnaW5MZWZ0OiAnMTBweCdcbiAgICB9LFxuXG4gICAgbW9kYWxGb290ZXI6IHtcbiAgICAgICAgYWxpZ25TZWxmOiAnY2VudGVyJyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBtYXJnaW5Cb3R0b246ICcxMHB4J1xuICAgIH0sXG5cbiAgICBtb2RhbFBhZ2VCdXR0b25zOiB7XG4gICAgICAgIGhlaWdodDogJzMwcHgnLFxuICAgICAgICB3aWR0aDogJzEwMHB4JyxcbiAgICAgICAgbWFyZ2luQm90dG9tOiAnMTBweCdcbiAgICB9LFxuXG4gICAgYnV0dG9uc1NlcGFyYXRvcjoge1xuICAgICAgICB3aWR0aDogJzEwcHgnXG4gICAgfSxcblxuICAgIGJ1dHRvbkNsb3NlOiB7XG4gICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Z3JheScsXG4gICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICBmb250V2VpZ2h0OiAnOTAwJ1xuXG4gICAgfSxcblxuICAgIGxlZnQ6IHtcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJzAnXG4gICAgfSxcblxuICAgIHJpZ2h0OiB7XG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6ICcwJ1xuICAgIH1cblxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZG9jUm93OiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibHVlJ1xuICAgIH0sXG4gICAgZG9jQ29sdW1uOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCB5ZWxsb3cnLFxuICAgICAgICB3aWR0aDogJzUwJSdcbiAgICB9LFxuICAgIGRvYzoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYnJvd24nXG4gICAgfVxuXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy9hcnZlL2FydmUuc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIndXNlIHN0cmljdCc7XG5cbnZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xuXG52YXIgZG9jU3RvcmUgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgICBpZDogJ2RvY1N0b3JlJyxcbiAgICBpbml0aWFsU3RhdGU6IHtcbiAgICAgICAgZ3JpZENlbGxFZGl0ZWQ6IDAsIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0LIg0LPRgNC40LTQtSDRgNC10LTQsNC60YLQuNGA0YPQtdC80YPRjiDRj9GH0LXQudC60YNcbiAgICAgICAgZGF0YTogW10sXG4gICAgICAgIGRldGFpbHM6IFtdLCAvLyDQtNCw0L3QvdGL0LUg0L3QsCDQs9GA0LjQtFxuICAgICAgICByZWxhdGlvbnM6IFtdLCAvLyDQtNCw0L3QvdGL0LUg0L3QsCDRgdCy0Y/Qt9Cw0L3QvdGL0LUg0LTQvtC60YPQvNC10L3RgtGLXG4gICAgICAgIGdyaWRDb25maWc6IFtdLCAvLyDQutC+0L3RhNC40LPRg9GA0LDRhtC40Y8g0LPRgNC40LTQsFxuICAgICAgICBncmlkTmFtZTogJycsXG4gICAgICAgIGRvY0lkOiAwLFxuICAgICAgICBkZWxldGVkOiBmYWxzZSxcbiAgICAgICAgZWRpdGVkOiBmYWxzZSxcbiAgICAgICAgc2F2ZWQ6IHRydWUsXG4gICAgICAgIGdyaWRSb3dJZDogMCxcbiAgICAgICAgbGliczogW3tcbiAgICAgICAgICAgIGlkOiAnYXN1dHVzZWQnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBkYXRhOlt7aWQ6MSwgbmFtZTpcIkFzdXR1cyAxXCJ9LHtpZDoyLCBuYW1lOlwiQXN1dHVzIDJcIn0se2lkOjMsIG5hbWU6XCJBc3V0dXMgM1wifSBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnbm9tZW5jbGF0dXJlJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ2tvbnRvZCcsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICdwcm9qZWN0JyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ3R1bm51cycsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICdhYScsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICdhcnZlZFNpc3NlJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBmaWVsZHM6IFsnYXN1dHVzaWQnLCAnYXJ2aWQnXSAvLyDQuNC0INC60L7QvdGC0YAt0LDQs9C10L3RgtCwINC4INC90L7QvNC10YAg0YHRh9C10YLQsFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ2FydmVkVmFsamEnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIGZpZWxkczogWydhc3V0dXNpZCcsICdhcnZpZCddIC8vINC40LQg0LrQvtC90YLRgC3QsNCz0LXQvdGC0LAg0Lgg0L3QvtC80LXRgCDRgdGH0LXRgtCwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAndXNlcnMnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnZG9rUHJvcHMnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIGZpZWxkczogWydkb2NfdHlwZV9pZCcsICdyZWt2aWQnXSAvLyDRgtC40L8g0LTQvtC60YPQvNC10L3RgtCwINC4INC40LQg0YPRh9GA0LXQttC00LXQvdC40Y9cbiAgICAgICAgfV0sXG4gICAgICAgIGJwbTogW10sIC8vINC00LDQvdC90YvQtSDQkdCfINC00L7QutGD0LzQtdC90YLQsFxuICAgICAgICB0YXNrOiB7fSwgLy8g0YLQtdC60YPRidCw0Y8g0LfQsNC00LDRh9CwXG4gICAgICAgIGJhY2t1cDoge30gLy8g0YXRgNCw0L3QuNGCINC90LXQuNC30LzQtdC90LXQvdC90L7QtSDRgdC+0YHRgtC+0Y/QvdC40LUg0LTQvtC60YPQvNC10L3RgtCwXG4gICAgfSxcbiAgICBhY3Rpb25DYWxsYmFja3M6IHtcbiAgICAgICAgYmFja3VwQ2hhbmdlOiBmdW5jdGlvbiBiYWNrdXBDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINGF0YDQsNC90LjRgiDQvdCw0YfQsNC70YzQvdGL0LUg0LTQsNC90L3Ri9GFINC00L7QutGD0LzQtdC90YLQsFxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBiYWNrdXA6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldExpYnNGaWx0ZXI6IGZ1bmN0aW9uIHNldExpYnNGaWx0ZXIodXBkYXRlciwgbGliTmFtZSwgZmlsdGVyKSB7XG5cbiAgICAgICAgICAgIC8vINC40YnQtdC8INGB0L/RgNCw0LLQvtGH0L3QuNC6XG4gICAgICAgICAgICB2YXIgbGlicyA9IHRoaXMubGlicztcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpYnNbaV0uaWQgPT0gbGliTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaWJzW2ldLmZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2xvYWRMaWJzJywgbGliTmFtZSk7IC8v0L3QvtCy0YvQtSDQtNCw0L3QvdGL0LVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdyaWRSb3dJZENoYW5nZTogZnVuY3Rpb24gZ3JpZFJvd0lkQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgY29uc29sZS5sb2coJ2dyaWRSb3dJZENoYW5nZSBjYWxsZWQ6JyArIHZhbHVlKTtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZ3JpZFJvd0lkOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZExpYnM6IGZ1bmN0aW9uIGxvYWRMaWJzKHVwZGF0ZXIsIGxpYnNUb1VwZGF0ZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgLy8g0LPRgNGD0LfQuNC8INGB0L/RgNCw0LLQvtGH0L3QuNC60LhcbiAgICAgICAgICAgIHZhciBsaWJzID0gdGhpcy5saWJzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmICghbGlic1RvVXBkYXRlIHx8IGl0ZW0uaWQgPT0gbGlic1RvVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyDQstGL0LfRi9Cy0LDQtdC8INC+0LHQvdC+0LLQu9C10L3QuNC1INGB0L/RgNCw0LLQvtGH0L3QuNC60LAg0YEg0YHQtdGA0LLQtdGA0LBcbiAgICAgICAgICAgIGxpYnMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHZhciBsaWJQYXJhbXMgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGliUGFyYW1zID0gaXRlbS5wYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIC8vINGD0YHRgtCw0L3QvtCy0LjQvCDQv9Cw0YDQsNC80LXRgtGA0Ysg0LTQu9GPINC30LDQv9GA0L7RgdCwXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGliUGFyYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaWJQYXJhbXNbaV0gPSBfdGhpcy5kYXRhW2l0ZW0uZmllbGRzW2ldXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfbG9hZExpYnMoaXRlbS5pZCwgbGliUGFyYW1zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzYXZlRGF0YTogZnVuY3Rpb24gc2F2ZURhdGEodXBkYXRlcikge1xuICAgICAgICAgICAgc2F2ZURvYygpO1xuICAgICAgICB9LFxuICAgICAgICBleGVjdXRlVGFzazogZnVuY3Rpb24gZXhlY3V0ZVRhc2sodXBkYXRlciwgdGFzaykge1xuICAgICAgICAgICAgX2V4ZWN1dGVUYXNrKHRhc2spO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVEb2M6IGZ1bmN0aW9uIGRlbGV0ZURvYyh1cGRhdGVyKSB7XG4gICAgICAgICAgICBfZGVsZXRlRG9jKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdyaWRDZWxsRWRpdGVkQ2hhbmdlOiBmdW5jdGlvbiBncmlkQ2VsbEVkaXRlZENoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsZWQgZ3JpZENlbGxFZGl0ZWRDaGFuZ2U6JyArIHZhbHVlKTtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZ3JpZENlbGxFZGl0ZWQ6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBkb2NJZENoYW5nZTogZnVuY3Rpb24gZG9jSWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgLy8g0YfQuNGB0YLQuNC8INC00LDQvdC90YvQtSDQs9GA0LjQtNCwXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RvY0lkQ2hhbmdlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZG9jSWQ6IHZhbHVlIH0pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2RvY0lkQ2hhbmdlIHZpZ2EnLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGF0YUNoYW5nZTogZnVuY3Rpb24gZGF0YUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQt9Cw0LPRgNGD0LfQutGDINC00LDQvdC90YvRhSDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZGF0YTogdmFsdWUgfSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUuYXJ2aWQgIT09ICd1bmRlZmluaXRlJykge1xuICAgICAgICAgICAgICAgIC8vINC10YHQu9C4INC60L7QvdGC0YDQsNCz0LXQvdGCINC+0YLRgdGD0YLRgdCy0YPQtdGCLCDRgtC+INC4INC/0LDRgNCw0LzQtdGC0YAg0LrQvtC90YLRgNCw0LPQtdC90YLQsCDRgtCw0LrQttC1INC+0LHQvdGD0LvQuNC8XG4gICAgICAgICAgICAgICAgdmFsdWUuYXJ2aWQgPSB2YWx1ZS5hc3V0dXNpZCA/IHZhbHVlLmFydmlkIDogbnVsbDtcbiAgICAgICAgICAgICAgICAvLyDQt9Cw0LTQsNC00LjQvCDQv9Cw0YDQsNC80LXRgtGA0Ysg0LTQu9GPINGB0L/RgNCw0LLQvtGH0L3QuNC60LAg0YHRh9C10YLQvtCyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2V0TGlic0ZpbHRlcicsICdhcnZlZFNpc3NlJywgW3ZhbHVlLmFzdXR1c2lkLCB2YWx1ZS5hcnZpZF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBicG1DaGFuZ2U6IGZ1bmN0aW9uIGJwbUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0JfQsNCz0YDRg9C30LrQsCDQkdCfXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCdicG1DaGFuZ2UnLCB2YWx1ZSk7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGJwbTogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbGF0aW9uc0NoYW5nZTogZnVuY3Rpb24gcmVsYXRpb25zQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyDQntGC0YHQu9C10LbQuNCy0LDQtdGCINC30LDQs9GA0YPQt9C60YMg0LTQsNC90L3Ri9GFINC30LDQstC40YHQuNC80L7RgdGC0LXQuSDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgcmVsYXRpb25zOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZGV0YWlsc0NoYW5nZTogZnVuY3Rpb24gZGV0YWlsc0NoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQt9Cw0LPRgNGD0LfQutGDINC00LDQvdC90YvRhSDQs9GA0LjQtNCwINC00L7QutGD0LzQtdC90YLQsFxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkZXRhaWxzOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ3JpZENvbmZpZ0NoYW5nZTogZnVuY3Rpb24gZ3JpZENvbmZpZ0NoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQt9Cw0LPRgNGD0LfQutGDINC60L7QvdGE0LjQs9GD0YDQsNGG0LjQuCDQs9GA0LjQtNCwXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGdyaWRDb25maWc6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVkQ2hhbmdlOiBmdW5jdGlvbiBkZWxldGVkQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyDQsdGL0LvQsCDQstGL0LfQstCw0L3QsCDQutC90L7Qv9C60LAgRGVsZXRlXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRlbGV0ZWQ6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlZGl0ZWRDaGFuZ2U6IGZ1bmN0aW9uIGVkaXRlZENoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0JzQtdC90Y/QtdGC0YHRjyDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGVkaXRlZDogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNhdmVkQ2hhbmdlOiBmdW5jdGlvbiBzYXZlZENoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LIg0LTQsNC90L3Ri9GFINC4INC40Lcg0YHQvtGF0YDQsNC90LXQvdC40LVcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgc2F2ZWQ6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBsaWJzQ2hhbmdlOiBmdW5jdGlvbiBsaWJzQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyDQntGC0YHQu9C10LbQuNCy0LDQtdGCINC40LfQvNC10L3QtdC90LjRjyDQsiDRgdC/0YDQsNCy0L7Rh9C90LjQutCw0YVcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5sb2coJ2xpYnNDaGFuZ2UgY2FsbGVkJywgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBsaWJzOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ3JpZE5hbWVDaGFuZ2U6IGZ1bmN0aW9uIGdyaWROYW1lQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGdyaWROYW1lOiB2YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBfZGVsZXRlRG9jKCkge1xuICAgIC8vINCy0YvQt9GL0LLQsNC10YIg0LzQtdGC0L7QtCDRg9C00LDQu9C10L3QuNGPINC00L7QutGD0LzQtdC90YLQsFxuICAgIC8vINCy0LXRgNC90LXQvNGB0Y8g0LIg0YDQtdCz0LjRgdGC0YBcbiAgICAvL3JlcXVlcnkoJ2RlbGV0ZScsIG51bGwpO1xuICAgIGRvY3VtZW50LmxvY2F0aW9uID0gJy9kb2N1bWVudHMnO1xufTtcblxuZnVuY3Rpb24gX2V4ZWN1dGVUYXNrKHRhc2spIHtcbiAgICAvKlxyXG4gICAgICAgINCS0YvQv9C+0LvQvdC40YIg0LfQsNC/0YDQvtGBINC90LAg0LjRgdC/0L7Qu9C90LXQvdC40LUg0LfQsNC00LDRh9C4XHJcbiAgICAgKi9cblxuICAgIHZhciB0YXNrc1BhcmFtZXRlcnMgPSB7XG4gICAgICAgIGRvY0lkOiBkb2NTdG9yZS5kYXRhLmlkLFxuICAgICAgICB0YXNrczogdGFzayxcbiAgICAgICAgZG9jX3R5cGVfaWQ6IGRvY1N0b3JlLmRhdGEuZG9jX3R5cGVfaWRcbiAgICB9O1xuXG4gICAgLy8gICBjb25zb2xlLmxvZygnZXhlY3V0ZVRhc2s6JywgdGFzaywgdGFza3NQYXJhbWV0ZXJzKTtcblxuICAgIHJlcXVlcnkoJ2V4ZWN1dGUnLCBKU09OLnN0cmluZ2lmeSh0YXNrc1BhcmFtZXRlcnMpLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIgfHwgZGF0YS5yZXN1bHQgPT0gJ0Vycm9yJykge1xuICAgICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCdleGVjdXRlVGFzayBhcnJpdmVkIGRvY1N0b3JlLmRhdGEuaWQsIGRvY1N0b3JlLmRvY0lkLCBkYXRhJyxkb2NTdG9yZS5kYXRhLmlkLGRvY1N0b3JlLmRvY0lkLCAgZGF0YSk7XG5cbiAgICAgICAgICAgIC8vINC/0YDQuCDRg9GB0L/QtdGI0L3QvtC8INCy0YvQv9C+0LvQvdC10L3QuNC4INC30LDQtNCw0YfQuCwg0LLRi9C/0L7Qu9C90LjRgtGMINC/0LXRgNC10LPRgNGD0LfQutGDINC00L7QutGD0LzQtdC90YLQsCAo0LLRgNC10LzQtdC90L3QvilcbiAgICAgICAgICAgIC8vQHRvZG8g0L/QvtC00YLRj9C90YPRgtGMINC40LfQvNC10L3QtdC90LjRjyDQsdC10Lcg0L/QtdGA0LXQs9GA0YPQt9C60Lgg0YHRgtGA0LDQvdC40YbRi1xuICAgICAgICAgICAgcmVsb2FkRG9jdW1lbnQoZG9jU3RvcmUuZGF0YS5pZCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3JlcXVlcnksIHJlbG9hZERvY3VtZW50JywgZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHNhdmVEb2MoKSB7XG4gICAgLy8g0LLRi9C30YvQstCw0LXRgiDQvNC10YLQvtC0INGB0L7RhdGA0LDQvdC10L3QuNGPINC00L7QutGD0LzQtdC90YLQsFxuICAgIHZhciBzYXZlRGF0YSA9IHtcbiAgICAgICAgaWQ6IGRvY1N0b3JlLmRhdGEuaWQsXG4gICAgICAgIGRvY190eXBlX2lkOiBkb2NTdG9yZS5kYXRhLmRvY190eXBlX2lkLCAvLyDQstGL0L3QtdGB0LXQvdC+INC00LvRjyDQv9C+0LTQs9GA0YPQt9C60Lgg0LzQvtC00LXQu9C4XG4gICAgICAgIGRhdGE6IGRvY1N0b3JlLmRhdGEsXG4gICAgICAgIGRldGFpbHM6IGRvY1N0b3JlLmRldGFpbHNcbiAgICB9O1xuXG4gICAgcmVxdWVyeSgnc2F2ZScsIEpTT04uc3RyaW5naWZ5KHNhdmVEYXRhKSwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gZXJyO1xuXG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzYXZlZDonLCBkYXRhKTtcbiAgICAgICAgICAgIHZhciBuZXdJZCA9IGRhdGFbMF0uaWQ7XG4gICAgICAgICAgICAvLyDQvtCx0L3QvtCy0LjQvCDQuNC0XG4gICAgICAgICAgICBzYXZlRGF0YS5kYXRhLmlkID0gbmV3SWQ7XG5cbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBzYXZlRGF0YS5kYXRhKTsgLy/QvdC+0LLRi9C1INC00LDQvdC90YvQtVxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZG9jSWRDaGFuZ2UnLCBuZXdJZCk7IC8vINC90L7QstC+0LUg0LjQtFxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2F2ZWRDaGFuZ2UnLCB0cnVlKTsgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQtdC20LjQvCDRgdC+0YXRgNCw0L3QtdC9XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdlZGl0ZWRDaGFuZ2UnLCBmYWxzZSk7IC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INGA0LXQttC40Lwg0YHQvtGF0YDQsNC90LXQvVxuXG5cbiAgICAgICAgICAgIC8vIHJlbG9hZCBkb2N1bWVudFxuICAgICAgICAgICAgcmVsb2FkRG9jdW1lbnQobmV3SWQpOyAvL0B0b2RvINCy0YvQv9C+0LvQvdC40YLRjCDQv9C10YDQtdCz0YDRg9C30LrRgyDQtNCw0L3QvdGL0YUg0L/QtdGA0LXQtyDQv9C10YDQtdCz0YDRg9C30LrQuCDRgdGC0YDQsNC90LjRhtGLXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Rla2tpcyB2aWdhJywgZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qXHJcbiAgICBcclxuICAgICAgICByZXF1ZXJ5KCdzYXZlQW5kU2VsZWN0JywgSlNPTi5zdHJpbmdpZnkoc2F2ZURhdGEpLCBmdW5jdGlvbihlcnIsIGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGVycjtcclxuICAgIFxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaWQgIT09IHNhdmVEYXRhLmRhdGEuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDQvtCx0L3QvtCy0LjQvCDQuNC0XHJcbiAgICAgICAgICAgICAgICAgICAgc2F2ZURhdGEuZGF0YS5pZCA9IGRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbiggJ2RhdGFDaGFuZ2UnLCBzYXZlRGF0YS5kYXRhICk7IC8v0L3QvtCy0YvQtSDQtNCw0L3QvdGL0LVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oICdkb2NJZENoYW5nZScsIGRhdGEuaWQgKTsgLy8g0L3QvtCy0L7QtSDQuNC0XHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnc2F2ZWRDaGFuZ2UnLCB0cnVlICk7IC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INGA0LXQttC40Lwg0YHQvtGF0YDQsNC90LXQvVxyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbiggJ2VkaXRlZENoYW5nZScsIGZhbHNlICk7IC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INGA0LXQttC40Lwg0YHQvtGF0YDQsNC90LXQvVxyXG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgKi9cbn07XG5cbmZ1bmN0aW9uIHJlbG9hZERvY3VtZW50KGRvY0lkKSB7XG4gICAgLy8gcmVsb2FkIGRvY3VtZW50XG5cbiAgICBpZiAoZG9jSWQpIHtcbiAgICAgICAgdmFyIHVybCA9IFwiL2RvY3VtZW50L1wiICsgZG9jU3RvcmUuZGF0YS5kb2NfdHlwZV9pZCArIGRvY0lkO1xuICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gX2xvYWRMaWJzKGxpYnJhcnlOYW1lLCBsaWJQYXJhbXMpIHtcbiAgICB0cnkge1xuXG4gICAgICAgIHJlcXVlcnkoJ3NlbGVjdCcsIEpTT04uc3RyaW5naWZ5KHsgZG9jX3R5cGVfaWQ6IGxpYnJhcnlOYW1lLCBpZDogMCwgcGFyYW1zOiBsaWJQYXJhbXMgfSksIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgdmFyIG5ld0xpYnMgPSBkb2NTdG9yZS5saWJzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIC8vINC40YnQtdC8INC00LDQvdC90YvQtSDRgdC/0YDQsNCy0L7Qu9GH0L3QuNC60LAsINC60L7RgtC+0YDRi9C1INC+0LHQvdC+0LLQuNC70LhcbiAgICAgICAgICAgICAgICB2YXIgcmV0dXJuRGF0YSA9IGl0ZW07XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5pZCA9PSBsaWJyYXJ5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5EYXRhLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuRGF0YTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobmV3TGlicy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignbGlic0NoYW5nZScsIG5ld0xpYnMpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCd0ZWtraXMgdmlnYScsIGUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVxdWVyeShhY3Rpb24sIHBhcmFtZXRlcnMsIGNhbGxiYWNrKSB7XG4gICAgLy8g0LzQtdGC0L7QtCDQvtCx0LXRgdC/0LXRh9C40YIg0L/QvtC70YPRh9C10L3QuNC1INC00LDQvdC90YvRhSDQvtGCINGB0LXRgNCy0LXRgNCwXG4gICAgaWYgKCF3aW5kb3cualF1ZXJ5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgVVJMID0gJy9hcGkvZG9jJztcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFVSTCxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1ldGVyc1xuICAgICAgICB9LFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAvLyDQtNC+0LvQttC90Ysg0L/QvtC70YPRh9C40YLRjCDQvtCx0YrQtdC60YJcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignUmVxdWVyeSBlcnJvcjonLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJy9lcnJvcicsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyLCBudWxsKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRvY1N0b3JlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvc3RvcmVzL2RvY19zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSA0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoc0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzNJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDalFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzNJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQy9GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OzsiLCJzb3VyY2VSb290IjoiIn0=
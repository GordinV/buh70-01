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
	var Doc = __webpack_require__(69)(storeData.docTypeId);

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
	    SelectData = __webpack_require__(25),
	    TextArea = __webpack_require__(47),
	    DataGrid = __webpack_require__(27),
	    GridButtonAdd = __webpack_require__(49),
	    GridButtonEdit = __webpack_require__(50),
	    GridButtonDelete = __webpack_require__(51),
	    DokProp = __webpack_require__(52),
	    relatedDocuments = __webpack_require__(54),
	    ToolbarContainer = __webpack_require__(55),
	    DocToolBar = __webpack_require__(57),
	    validateForm = __webpack_require__(64),
	    ModalPage = __webpack_require__(45),
	    styles = __webpack_require__(65);

	const LIBDOK = 'ARV',
	    LIBRARIES = ['asutused', 'kontod', 'dokProps', 'users', 'aa', 'tunnus', 'project', 'nomenclature'];

	// Create a store
	const docStore = __webpack_require__(66);

	const now = new Date();

	var ____Classc=React.PureComponent;for(var ____Classc____Key in ____Classc){if(____Classc.hasOwnProperty(____Classc____Key)){Arve[____Classc____Key]=____Classc[____Classc____Key];}}var ____SuperProtoOf____Classc=____Classc===null?null:____Classc.prototype;Arve.prototype=Object.create(____SuperProtoOf____Classc);Arve.prototype.constructor=Arve;Arve.__superConstructor__=____Classc;
	    function Arve(props) {
	        ____Classc.call(this,props);
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
	        let warning = __webpack_require__(64)(this, requiredFields);
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

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	//@todo закончить после справочников
	const React = __webpack_require__(3),
	    flux=__webpack_require__(4),
	    styles = __webpack_require__(26),
	    DataGrid = __webpack_require__(27),
	    Button = __webpack_require__(43),
	    InputText = __webpack_require__(13),
	    ModalPage = __webpack_require__(45);

	var ____Classz=React.PureComponent;for(var ____Classz____Key in ____Classz){if(____Classz.hasOwnProperty(____Classz____Key)){SelectData[____Classz____Key]=____Classz[____Classz____Key];}}var ____SuperProtoOf____Classz=____Classz===null?null:____Classz.prototype;SelectData.prototype=Object.create(____SuperProtoOf____Classz);SelectData.prototype.constructor=SelectData;SelectData.__superConstructor__=____Classz;
	    function SelectData(props) {
	        ____Classz.call(this,props);
	        this.state = {
	            value: props.value, /* возвращаемое значение, например id*/
	            fieldValue: props.defaultValue, /*видимое значение, например kood или name по указанному в collId */
	            readOnly: props.readOnly,
	            disabled: props.disabled,
	            edited: props.edited,
	            gridData: [],
	            gridConfig: [],
	            gridActiveRow: 0,
	            show: this.props.show
	        };
	//        this.onChange = this.onChange.bind(this);
	        this.handleInputChange = this.handleInputChange.bind(this);
	        this.handleGridClick = this.handleGridClick.bind(this);
	        this. modalPageClick = this. modalPageClick.bind(this);
	        this.testConfiguration = this.testConfiguration.bind(this);
	    }

	    Object.defineProperty(SelectData.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({
	            value: nextProps.value,
	            fieldValue: nextProps.defaultValue,
	            readOnly: nextProps.readOnly,
	            show: nextProps.show
	        });
	    }});

	    Object.defineProperty(SelectData.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {
	        // запрос
	        flux.stores.docStore.requery('select',{})
	        this.testConfiguration();
	    }});

	    Object.defineProperty(SelectData.prototype,"shouldComponentUpdate",{writable:true,configurable:true,value:function(nextProps, nextState) {
	        // @todo добавить проверку на изменение состояния
	        return true;
	    }});

	    Object.defineProperty(SelectData.prototype,"render",{writable:true,configurable:true,value:function() {
	        let isEditeMode = !this.state.readOnly,
	            btnStyle = Object.assign({}, styles.button, {display: isEditeMode ? 'inline' : 'none'})

	        console.log('render ', this.state.fieldValue);
	        return (
	            React.createElement("div", {style: styles.wrapper}, 
	                React.createElement(InputText, {ref: "input", 
	                           title: this.props.title, 
	                           name: this.props.name, 
	                           value: this.state.fieldValue, 
	                           readOnly: !isEditeMode, 
	                           onChange: this.handleInputChange}), 
	                React.createElement(Button, {value: "v", 
	                        ref: "btnShow", 
	                        style: btnStyle, 
	                        onClick: function(e)  {return this.handleClick(e);}.bind(this)}
	                ), 

	                
	                    this.state.show ? this.modalPage() : null
	                
	            )
	        )
	    }});

	    Object.defineProperty(SelectData.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        this.setState({
	            show: true
	        });
	    }});

	    Object.defineProperty(SelectData.prototype,"modalPage",{writable:true,configurable:true,value:function() {
	        let modalObjects = ['btnOk', 'btnCancel'];
	        return (
	            React.createElement("div", null, 
	                React.createElement(ModalPage, {
	                    modalObjects: modalObjects, 
	                    ref: "modalpage-grid", 
	                    show: true, 
	                    modalPageBtnClick: this.modalPageClick, 
	                    modalPageName: "Vali rea"}, 
	                    React.createElement("div", {ref: "grid-row-container"}, 
	                        React.createElement(InputText, {ref: "input-filter", 
	                                   title: "Otsingu parametrid", 
	                                   name: "gridFilter", 
	                                   value: this.state.fieldValue, 
	                                   readOnly: false, 
	                                   onChange: this.handleInputChange}), 
	                        React.createElement(DataGrid, {gridData: this.state.gridData, 
	                                  gridColumns: this.state.gridConfig, 
	                                  onClick: this.handleGridClick, 
	                                  ref: "data-grid"})
	                    )
	                )
	            ));
	    }});

	    Object.defineProperty(SelectData.prototype,"handleInputChange",{writable:true,configurable:true,value:function(name, value) {
	        console.log('handleInputChange', name, value);
	    }});

	    Object.defineProperty(SelectData.prototype,"modalPageClick",{writable:true,configurable:true,value:function(event) {
	        if (event === 'Ok') {
	            // надо найти активную строку

	            let activeRow = this.state.gridActiveRow,
	                value = this.state.gridData[activeRow]['id'],
	                fieldValue = this.state.gridData[activeRow]['name'];
	            // получить данные полей и установить состояние для виджета

	            this.setState({value: value, fieldValue: fieldValue, show: false});

	            // вернуть значение наверх
	            if (this.props.onChange) {
	                this.props.onChange(this.props.name, value);
	                //@todo описать
	                if (this.props.collName) {
	                    this.props.onChange(this.props.collName, fieldValue);
	                }
	            }

	        }
	    }});

	    Object.defineProperty(SelectData.prototype,"handleGridClick",{writable:true,configurable:true,value:function(event, value, activeRow) {
	        this.setState({gridActiveRow: activeRow});
	    }});

	    Object.defineProperty(SelectData.prototype,"testConfiguration",{writable:true,configurable:true,value:function() {
	        let data = [
	                {id: 1, type: 'DOK1', name: 'name 1', created: '2017-01-01', lastupdate: '2017-01-01', status: 'ok'},
	                {id: 2, type: 'DOK1', name: 'name 2', created: '2017-01-01', lastupdate: '2017-01-01', status: 'ok'},
	                {id: 3, type: 'DOK1', name: 'name 3', created: '2017-01-01', lastupdate: '2017-01-01', status: 'ok'},
	                {id: 4, type: 'DOK1', name: 'name 4', created: '2017-01-01', lastupdate: '2017-01-01', status: 'ok'},
	                {id: 5, type: 'DOK1', name: 'name 5', created: '2017-01-01', lastupdate: '2017-01-01', status: 'ok'},
	            ],
	            config = [
	                {id: "id", name: "id", width: "50px", show: false},
	                {id: "type", name: "type", width: "100px"},
	                {id: "name", name: "Nimetus", width: "100px"},
	                {id: "created", name: "created", width: "150px"},
	                {id: "lastupdate", name: "Last change", width: "150px"},
	                {id: "status", name: "Status", width: "100px"}
	            ];
	        this.setState({
	            gridConfig: config,
	            gridData: data
	        });
	    }});


	    
	      
	           
	          
	       
	     
	     
	     

	    
	      
	        

	         
	       
	     

	       
	            
	        
	     
	         
	        

	       
	              
	                  
	     

	     
	     



	       
	              
	          
	            
	        

	           
	        
	             
	             
	             
	             
	                 
	                 
	            
	             
	               
	                   
	                 
	                     
	                   
	                      
	                

	            
	                 
	                  
	                 
	            
	        

	    




	SelectData.PropTypes = {
	    readOnly: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    collId: React.PropTypes.string,
	    title: React.PropTypes.string,
	    placeholder: React.PropTypes.string,
	    name: React.PropTypes.string.isRequired,
	    show: React.PropTypes.bool
	}

	SelectData.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    btnDelete: false,
	    value: 0,
	    collId: 'id',
	    title: '',
	    show: false
	}

	module.exports = SelectData;


/***/ },

/***/ 26:
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

/***/ 65:
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

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (docTypeId) {
	    // взависимости от типа документа вернет компонент документа

	    console.log('returnDocComponent:' + docTypeId);
	    var component = {};

	    switch (docTypeId) {
	        case 'PALK':
	            component = __webpack_require__(70);
	            break;
	        default:
	            component = __webpack_require__(2);
	    }
	    return component;
	};

/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);
	const Form = __webpack_require__(71);
	const PageLabel = __webpack_require__(72);

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

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3),
	    flux = __webpack_require__(4);

	var PageLabel = __webpack_require__(72);

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

/***/ 72:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLmpzeD8xMTJmIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvc2VsZWN0LWRhdGEvc2VsZWN0LWRhdGEuanN4PzAzMzMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9zZWxlY3QtZGF0YS9zZWxlY3QtZGF0YS1zdHlsZXMuanM/ZDIwMyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kb2NzL2FydmUvYXJ2ZS5zdHlsZXMuanM/M2E3MCIsIndlYnBhY2s6Ly8vLi9taWRkbGV3YXJlL3JldHVybkRvY0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kb2NzL3BhbGtfb3Blci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9mb3JtLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvcGFnZV9sYWJlbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuLypcclxuICAgIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBkb2NDb21wb25lbnQgPSAnJztcclxuKi9cblxuLy8g0LTQsNC90L3Ri9C1INC00LvRjyDRhdGA0LDQvdC40LvQuNGJ0LBcbmxvY2FsU3RvcmFnZVsnZG9jU3RvcmUnXSA9IHN0b3JlRGF0YTtcbnN0b3JlRGF0YSA9IEpTT04ucGFyc2Uoc3RvcmVEYXRhKTtcblxuLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0LTQsNC90L3RhVxuLypcclxuZG9jU3RvcmUub24oJ2NoYW5nZTpkYXRhJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgIC8vINC00LDQvdC90YvQtSDQuNC30LzQtdC90LjQu9C40YHRjCwg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgIHNlbGYuc2V0U3RhdGUoe2RvY0RhdGE6ZG9jU3RvcmUuZGF0YX0pXHJcbiAgICB9XHJcbn0pXHJcbiovXG5cbi8vINC30LDQv9GA0L7RgdC40Lwg0LrQvtC80L/QvtC90LXQvdGCINC00L7QutGD0LzQtdC90YLQsCDQv9C+INC10LPQviDRgtC40L/Rg1xudmFyIERvYyA9IHJlcXVpcmUoJy4uL21pZGRsZXdhcmUvcmV0dXJuRG9jQ29tcG9uZW50Jykoc3RvcmVEYXRhLmRvY1R5cGVJZCk7XG5cblJlYWN0RE9NLnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KERvYywgeyBkYXRhOiBzdG9yZURhdGEuZGF0YSwgYnBtOiBzdG9yZURhdGEuYnBtIH0pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG9jJykpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0XHJcbiAgICBGb3JtID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9mb3JtL2Zvcm0uanN4JyksXHJcbiAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2lucHV0LXRleHQvaW5wdXQtdGV4dC5qc3gnKSxcclxuICAgIElucHV0RGF0ZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvaW5wdXQtZGF0ZS9pbnB1dC1kYXRlLmpzeCcpLFxyXG4gICAgSW5wdXROdW1iZXIgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2lucHV0LW51bWJlci9pbnB1dC1udW1iZXIuanN4JyksXHJcbiAgICBEb2NDb21tb24gPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RvYy1jb21tb24vZG9jLWNvbW1vbi5qc3gnKSxcclxuICAgIFNlbGVjdCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5qc3gnKSxcclxuICAgIFNlbGVjdERhdGEgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3NlbGVjdC1kYXRhL3NlbGVjdC1kYXRhLmpzeCcpLFxyXG4gICAgVGV4dEFyZWEgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3RleHQtYXJlYS90ZXh0LWFyZWEuanN4JyksXHJcbiAgICBEYXRhR3JpZCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZGF0YS1ncmlkL2RhdGEtZ3JpZC5qc3gnKSxcclxuICAgIEdyaWRCdXR0b25BZGQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItYWRkL2J1dHRvbi1yZWdpc3Rlci1hZGQuanN4JyksXHJcbiAgICBHcmlkQnV0dG9uRWRpdCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeCcpLFxyXG4gICAgR3JpZEJ1dHRvbkRlbGV0ZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1kZWxldGUvYnV0dG9uLXJlZ2lzdGVyLWRlbGV0ZS5qc3gnKSxcclxuICAgIERva1Byb3AgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RvY3Byb3AvZG9jcHJvcC5qc3gnKSxcclxuICAgIHJlbGF0ZWREb2N1bWVudHMgPSByZXF1aXJlKCcuLi8uLi9taXhpbi9yZWxhdGVkRG9jdW1lbnRzLmpzeCcpLFxyXG4gICAgVG9vbGJhckNvbnRhaW5lciA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy90b29sYmFyLWNvbnRhaW5lci90b29sYmFyLWNvbnRhaW5lci5qc3gnKSxcclxuICAgIERvY1Rvb2xCYXIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvZG9jLXRvb2xiYXIvZG9jLXRvb2xiYXIuanN4JyksXHJcbiAgICB2YWxpZGF0ZUZvcm0gPSByZXF1aXJlKCcuLi8uLi9taXhpbi92YWxpZGF0ZUZvcm0nKSxcclxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxQYWdlLmpzeCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9hcnZlLnN0eWxlcycpO1xyXG5cclxuY29uc3QgTElCRE9LID0gJ0FSVicsXHJcbiAgICBMSUJSQVJJRVMgPSBbJ2FzdXR1c2VkJywgJ2tvbnRvZCcsICdkb2tQcm9wcycsICd1c2VycycsICdhYScsICd0dW5udXMnLCAncHJvamVjdCcsICdub21lbmNsYXR1cmUnXTtcclxuXHJcbi8vIENyZWF0ZSBhIHN0b3JlXHJcbmNvbnN0IGRvY1N0b3JlID0gcmVxdWlyZSgnLi4vLi4vc3RvcmVzL2RvY19zdG9yZS5qcycpO1xyXG5cclxuY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuXHJcbnZhciBfX19fQ2xhc3NjPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NjX19fX0tleSBpbiBfX19fQ2xhc3NjKXtpZihfX19fQ2xhc3NjLmhhc093blByb3BlcnR5KF9fX19DbGFzc2NfX19fS2V5KSl7QXJ2ZVtfX19fQ2xhc3NjX19fX0tleV09X19fX0NsYXNzY1tfX19fQ2xhc3NjX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2M9X19fX0NsYXNzYz09PW51bGw/bnVsbDpfX19fQ2xhc3NjLnByb3RvdHlwZTtBcnZlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NjKTtBcnZlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1BcnZlO0FydmUuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzYztcclxuICAgIGZ1bmN0aW9uIEFydmUocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3NjLmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZG9jRGF0YTogdGhpcy5wcm9wcy5kYXRhLnJvdyxcclxuICAgICAgICAgICAgYnBtOiB0aGlzLnByb3BzLmJwbSxcclxuICAgICAgICAgICAgZWRpdGVkOiB0aGlzLnByb3BzLmRhdGEucm93LmlkID09IDAsXHJcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94OiAnbm9uZScsXHJcbiAgICAgICAgICAgIHJlbGF0aW9uczogdGhpcy5wcm9wcy5kYXRhLnJlbGF0aW9ucyxcclxuICAgICAgICAgICAgZ3JpZERhdGE6IHRoaXMucHJvcHMuZGF0YS5kZXRhaWxzLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnOiB0aGlzLnByb3BzLmRhdGEuZ3JpZENvbmZpZyxcclxuICAgICAgICAgICAgZ3JpZFJvd0VkaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBncmlkUm93RXZlbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIGdyaWRSb3dEYXRhOiBudWxsLFxyXG4gICAgICAgICAgICBsaWJzOiB0aGlzLmNyZWF0ZUxpYnMoKSxcclxuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHdhcm5pbmc6ICcnXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wYWdlcyA9IFt7cGFnZU5hbWU6ICdBcnZlJ31dXHJcbiAgICAgICAgdGhpcy5yZXF1aXJlZEZpZWxkcyA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2twdicsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnRCcsXHJcbiAgICAgICAgICAgICAgICBtaW46IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSAtIDEpLFxyXG4gICAgICAgICAgICAgICAgbWF4OiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgKyAxKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAndGFodGFlZycsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnRCcsXHJcbiAgICAgICAgICAgICAgICBtaW46IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSAtIDEpLFxyXG4gICAgICAgICAgICAgICAgbWF4OiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgKyAxKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7bmFtZTogJ2FzdXR1c2lkJywgdHlwZTogJ04nLCBtaW46IG51bGwsIG1heDogbnVsbH0sXHJcbiAgICAgICAgICAgIHtuYW1lOiAnc3VtbWEnLCB0eXBlOiAnTicsIG1pbjogLTk5OTk5OTksIG1heDogOTk5OTk5fVxyXG4gICAgICAgIF1cclxuICAgICAgICB0aGlzLmhhbmRsZVRvb2xiYXJFdmVudHMgPSB0aGlzLmhhbmRsZVRvb2xiYXJFdmVudHMuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRpb24uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm1vZGFsUGFnZUNsaWNrID0gdGhpcy5tb2RhbFBhZ2VDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlR3JpZEJ0bkNsaWNrID0gdGhpcy5oYW5kbGVHcmlkQnRuQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZFJvdyA9IHRoaXMuYWRkUm93LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVHcmlkUm93Q2hhbmdlID0gdGhpcy5oYW5kbGVHcmlkUm93Q2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZUdyaWRSb3cgPSB0aGlzLnZhbGlkYXRlR3JpZFJvdy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlR3JpZFJvd0lucHV0ID0gdGhpcy5oYW5kbGVHcmlkUm93SW5wdXQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUdyaWRSb3cgPSB0aGlzLmNyZWF0ZUdyaWRSb3cuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlID0gdGhpcy5oYW5kbGVJbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcInZhbGlkYXRpb25cIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuZWRpdGVkKSByZXR1cm4gJyc7XHJcblxyXG4gICAgICAgIGxldCByZXF1aXJlZEZpZWxkcyA9IHRoaXMucmVxdWlyZWRGaWVsZHM7XHJcbiAgICAgICAgbGV0IHdhcm5pbmcgPSByZXF1aXJlKCcuLi8uLi9taXhpbi92YWxpZGF0ZUZvcm0nKSh0aGlzLCByZXF1aXJlZEZpZWxkcyk7XHJcbiAgICAgICAgcmV0dXJuIHdhcm5pbmc7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbE1vdW50XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5yZWxhdGVkRG9jdW1lbnRzKCk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiY29tcG9uZW50RGlkTW91bnRcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQv9C40YjQtdC8INC40YHRhdC+0LTQvdGL0LUg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtSwg0YDQtdCz0LjRgdGC0YDQuNGA0YPQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YHQvtCx0YvRgtC40LlcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIGRhdGEgPSBzZWxmLnByb3BzLmRhdGEucm93LFxyXG4gICAgICAgICAgICBkZXRhaWxzID0gc2VsZi5wcm9wcy5kYXRhLmRldGFpbHMsXHJcbiAgICAgICAgICAgIGdyaWRDb25maWcgPSBzZWxmLnByb3BzLmRhdGEuZ3JpZENvbmZpZztcclxuXHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGRldGFpbHMpOyAvLyDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRDb25maWdDaGFuZ2UnLCBncmlkQ29uZmlnKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuLy8gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWROYW1lQ2hhbmdlJywgJ2Fydi1ncmlkLXJvdycpOyAvLyDQt9Cw0LTQsNC10Lwg0LjQvNGPINC60L7QvNC/0L7QvdC10L3RgtCwINGB0YLRgNC+0LrQuCDQs9GA0LjQtNCwICjQtNC70Y8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG5cclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdGCINC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0LIg0LPRgNC40LTQtVxyXG4gICAgICAgIGRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGV0YWlscycsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKSAmJiB0eXBlb2YgbmV3VmFsdWUgPT0gJ2FycmF5Jykge1xyXG4gICAgICAgICAgICAgICAgLy8g0LjRgtC+0LPQuFxyXG4gICAgICAgICAgICAgICAgbGV0IHN1bW1hID0gbmV3VmFsdWUucmVkdWNlKGZ1bmN0aW9uKHN1bSwgcm93KSAge3JldHVybiBzdW0gKyBOdW1iZXIocm93LnN1bW1hKTt9LCAwKSwgLy8g0YHRg9C80LzQsCDRgdGH0LXRgtCwXHJcbiAgICAgICAgICAgICAgICAgICAga2JtID0gbmV3VmFsdWUucmVkdWNlKGZ1bmN0aW9uKHN1bSwgcm93KSAge3JldHVybiBzdW0gKyBOdW1iZXIocm93LmtibSk7fSwgMCksIC8vINGB0YPQvNC80LAg0L3QsNC70L7Qs9CwXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jRGF0YSA9IHNlbGYuc3RhdGUuZG9jRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2NEYXRhLnN1bW1hID0gc3VtbWE7XHJcbiAgICAgICAgICAgICAgICBkb2NEYXRhLmtibSA9IGtibTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtncmlkRGF0YTogbmV3VmFsdWUsIGRvY0RhdGE6IGRvY0RhdGF9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDQs9GA0YPQt9C40Lwg0YHQv9GA0LDQstC+0YfQvdC40LrQuFxyXG4gICAgICAgIExJQlJBUklFUy5mb3JFYWNoKGZ1bmN0aW9uKGxpYikgIHtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbihcImxvYWRMaWJzXCIsIGxpYik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINC10YHQu9C4INC90L7QstGL0Lkg0LTQvtC60YPQvNC10L3RgiAoaWQgPT0gMClcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuaWQgPT0gMCkge1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdlZGl0ZWRDaGFuZ2UnLCB0cnVlKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2F2ZWRDaGFuZ2UnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIGRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LTQtdC70LDQtdC8INC60L7Qv9C40LhcclxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2JhY2t1cENoYW5nZScsIHtcclxuICAgICAgICAgICAgICAgICAgICByb3c6IE9iamVjdC5hc3NpZ24oe30sIGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IE9iamVjdC5hc3NpZ24oW10sIGZsdXguc3RvcmVzLmRvY1N0b3JlLmRldGFpbHMpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7ZWRpdGVkOiBuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY1N0b3JlLm9uKCdjaGFuZ2U6bGlicycsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSAge1xyXG4gICAgICAgICAgICBsZXQgaXNDaGFuZ2VkID0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBsaWJzID0gbmV3VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBsaWJzRGF0YSA9IHRoaXMuc3RhdGUubGlicztcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGlicy5mb3JFYWNoKGZ1bmN0aW9uKGxpYikgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGliLmlkID09PSAnZG9rUHJvcHMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINC+0YHRgtCw0LLQuNC8INGC0L7Qu9GM0LrQviDQtNCw0L3QvdGL0LUg0Y3RgtC+0LPQviDQtNC+0LrRg9C80LXQvdGC0LBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmxpYnNbbGliLmlkXSAmJiBsaWIuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpYnNEYXRhW2xpYi5pZF0gPSBsaWIuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtsaWJzOiBsaWJzRGF0YX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwic2hvdWxkQ29tcG9uZW50VXBkYXRlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyBAdG9kbyDQtNC+0LHQsNCy0LjRgtGMINC/0YDQvtCy0LXRgNC60YMg0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0YHQvtGB0YLQvtGP0L3QuNGPXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0YTQvtGA0LzQuNGA0YPQtdC8INC30LDQstC40YHQuNC80L7RgdGC0LhcclxuICAgICAgICByZWxhdGVkRG9jdW1lbnRzKHRoaXMpO1xyXG5cclxuICAgICAgICBsZXQgYnBtID0gdGhpcy5zdGF0ZS5icG0sXHJcbiAgICAgICAgICAgIGlzRWRpdGVNb2RlID0gdGhpcy5zdGF0ZS5lZGl0ZWQsXHJcbiAgICAgICAgICAgIHRvb2xiYXJQYXJhbXMgPSB0aGlzLnByZXBhaXJlVG9vbEJhclBhcmFtZXRlcnMoaXNFZGl0ZU1vZGUpLFxyXG4gICAgICAgICAgICB2YWxpZGF0aW9uTWVzc2FnZSA9IHRoaXMudmFsaWRhdGlvbigpLFxyXG4gICAgICAgICAgICBsaWJzID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUubGlicztcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtLCB7cGFnZXM6IHRoaXMucGFnZXMsIFxyXG4gICAgICAgICAgICAgICAgICByZWY6IFwiZm9ybVwiLCBcclxuICAgICAgICAgICAgICAgICAgaGFuZGxlUGFnZUNsaWNrOiB0aGlzLmhhbmRsZVBhZ2VDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0VkaXRlTW9kZX0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyQ29udGFpbmVyLCB7cmVmOiBcInRvb2xiYXItY29udGFpbmVyXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZG9jLXRvb2xiYXItd2FybmluZ1wifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25NZXNzYWdlID8gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdmFsaWRhdGlvbk1lc3NhZ2UpIDogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jVG9vbEJhciwge2JwbTogYnBtLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImRvYy10b29sYmFyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0ZWQ6IGlzRWRpdGVNb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jU3RhdHVzOiB0aGlzLnN0YXRlLmRvY0RhdGEuZG9jX3N0YXR1cywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogdGhpcy52YWxpZGF0aW9uLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyOiB0aGlzLmhhbmRsZVRvb2xiYXJFdmVudHN9KVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2N9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERvY0NvbW1vbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImRvYy1jb21tb25cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnN0YXRlLmRvY0RhdGEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NSb3d9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NDb2x1bW59LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7cmVmOiBcImlucHV0LW51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTnVtYmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZG9jRGF0YS5udW1iZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0RGF0ZSwge3RpdGxlOiBcIkt1dXDDpGV2IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrcHZcIiwgdmFsdWU6IHRoaXMuc3RhdGUuZG9jRGF0YS5rcHYsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiaW5wdXQta3B2XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0RGF0ZSwge3RpdGxlOiBcIlTDpGh0YWVnIFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0YWh0YWVnXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLnRhaHRhZWcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiaW5wdXQtdGFodGFlZ1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHt0aXRsZTogXCJBc3V0dXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYXN1dHVzaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwiYXN1dHVzZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc3RhdGUubGlic1snYXN1dHVzZWQnXSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEuYXN1dHVzaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHRoaXMuc3RhdGUuZG9jRGF0YS5hc3V0dXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwic2VsZWN0LWFzdXR1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidG5EZWxldGU6IGlzRWRpdGVNb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSksIFxyXG4vKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdERhdGEgdGl0bGU9XCJBc3V0dXMgd2lkZ2V0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J2FzdXR1c2lkJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZG9jRGF0YS5hc3V0dXNpZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5zdGF0ZS5kb2NEYXRhLmFzdXR1c31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxOYW1lPVwiYXN1dHVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInNlbGVjdERhdGEtYXN1dHVzaWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGVNb2RlfS8+XHJcbiovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge3RpdGxlOiBcIkxpc2EgXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxpc2FcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEubGlzYSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dC1saXNhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NDb2x1bW59LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9rUHJvcCwge3RpdGxlOiBcIktvbnRlZXJpbWluZTogXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkb2tsYXVzaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcImRva1Byb3BzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZG9jRGF0YS5kb2tsYXVzaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEuZG9rcHJvcCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZG9rcHJvcC1kb2tsYXVzaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHt0aXRsZTogXCJNw6Rya3VzZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm11dWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwidGV4dGFyZWEtbXV1ZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEubXV1ZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXNFZGl0ZU1vZGUgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyQ29udGFpbmVyLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImdyaWQtdG9vbGJhci1jb250YWluZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdsZWZ0J30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEJ1dHRvbkFkZCwge29uQ2xpY2s6IHRoaXMuaGFuZGxlR3JpZEJ0bkNsaWNrLCByZWY6IFwiZ3JpZC1idXR0b24tYWRkXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcmlkQnV0dG9uRWRpdCwge29uQ2xpY2s6IHRoaXMuaGFuZGxlR3JpZEJ0bkNsaWNrLCByZWY6IFwiZ3JpZC1idXR0b24tZWRpdFwifSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEJ1dHRvbkRlbGV0ZSwge29uQ2xpY2s6IHRoaXMuaGFuZGxlR3JpZEJ0bkNsaWNrLCByZWY6IFwiZ3JpZC1idXR0b24tZGVsZXRlXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YUdyaWQsIHtzb3VyY2U6IFwiZGV0YWlsc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnN0YXRlLmdyaWREYXRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zOiB0aGlzLnN0YXRlLmdyaWRDb25maWcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlR3JpZFJvdzogdGhpcy5oYW5kbGVHcmlkUm93LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImRhdGEtZ3JpZFwifSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge3RpdGxlOiBcIlN1bW1hIFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJpbnB1dC1zdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLnN1bW1hLCBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIl5bMC05XSsoXFxcXC5bMC05XXsxLDR9KT8kXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7dGl0bGU6IFwiS8OkaWJlbWFrcyBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrYm1cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImlucHV0LWtibVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEua2JtLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCJeWzAtOV0rKFxcXFwuWzAtOV17MSw0fSk/JFwifSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmdyaWRSb3dFZGl0ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkUm93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcInJlbGF0ZWREb2N1bWVudHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0LfQsNCy0LjRgdC40LzQvtGB0YLQuFxyXG4gICAgICAgIGxldCByZWxhdGVkRG9jdW1lbnRzID0gdGhpcy5zdGF0ZS5yZWxhdGlvbnM7XHJcbiAgICAgICAgaWYgKHJlbGF0ZWREb2N1bWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZWxhdGVkRG9jdW1lbnRzLmZvckVhY2goZnVuY3Rpb24oZG9jKSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvYy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsCDRg9C90LjQutCw0LvRjNC90L7RgdGC0Ywg0YHQv9C40YHQutCwINC00L7QutGD0LzQtdC90YLQvtCyXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlzRXhpc3RzID0gdGhpcy5wYWdlcy5maW5kKGZ1bmN0aW9uKHBhZ2UpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGFnZS5kb2NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhZ2UuZG9jSWQgPT0gZG9jLmlkICYmIHBhZ2UuZG9jVHlwZUlkID09IGRvYy5kb2NfdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINCyINC80LDRgdGB0LjQstC1INC90LXRgiwg0LTQvtCx0LDQstC40Lwg0YHRgdGL0LvQutGDINC90LAg0LTQvtC60YPQvNC10L3RglxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2VzLnB1c2goe2RvY1R5cGVJZDogZG9jLmRvY190eXBlLCBkb2NJZDogZG9jLmlkLCBwYWdlTmFtZTogZG9jLm5hbWUgKyAnIGlkOicgKyBkb2MuaWR9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwibW9kYWxQYWdlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihidG5FdmVudCwgZGF0YSkge1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQvtGC0LDQtdC8IE9rINC40Lcg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LBcclxuICAgICAgICBsZXQgZ3JpZERhdGEgPSB0aGlzLnN0YXRlLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBkb2NEYXRhID0gdGhpcy5zdGF0ZS5kb2NEYXRhLFxyXG4gICAgICAgICAgICBncmlkQ29sdW1ucyA9IHRoaXMuc3RhdGUuZ3JpZENvbmZpZyxcclxuICAgICAgICAgICAgZ3JpZFJvdyA9IHRoaXMuc3RhdGUuZ3JpZFJvd0RhdGE7XHJcblxyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcblxyXG4gICAgICAgICAgICAvLyDQuNGJ0LXQvCDQv9C+INC40LQg0YHRgtGA0L7QutGDINCyINC00LDQvdC90YvRhSDQs9GA0LjQtNCwLCDQtdGB0LvQuCDQvdC10YIsINGC0L4g0LTQvtCx0LDQstC40Lwg0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgIGlmICghZ3JpZERhdGEuc29tZShmdW5jdGlvbihyb3cpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5pZCA9PT0gZ3JpZFJvdy5pZCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LLRgdGC0LDQstC60LAg0L3QvtCy0L7QuSDRgdGC0YDQvtC60LhcclxuICAgICAgICAgICAgICAgIGdyaWREYXRhLnNwbGljZSgwLCAwLCBncmlkUm93KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdyaWREYXRhID0gZ3JpZERhdGEubWFwKGZ1bmN0aW9uKHJvdykgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93LmlkID09PSBncmlkUm93LmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINC90LDRiNC70LgsINC30LDQvNC10YnQsNC10LxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdyaWRSb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvdztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG9jRGF0YSA9IHRoaXMucmVjYWxjRG9jU3VtbWEoZG9jRGF0YSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IGZhbHNlLCBncmlkRGF0YTogZ3JpZERhdGEsIGRvY0RhdGE6IGRvY0RhdGF9KTtcclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiaGFuZGxlUGFnZUNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24ocGFnZSkge1xyXG4gICAgICAgIGlmIChwYWdlLmRvY0lkKSB7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBcIi9kb2N1bWVudC9cIiArIHBhZ2UuZG9jVHlwZUlkICsgcGFnZS5kb2NJZDtcclxuICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiaGFuZGxlU2VsZWN0VGFza1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAvLyDQvNC10YLQvtC0INCy0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQstGL0LHQvtGA0LUg0LfQsNC00LDRh9C4XHJcbiAgICAgICAgdmFyIHRhc2tWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImhhbmRsZVRvb2xiYXJFdmVudHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIC8vIHRvb2xiYXIgZXZlbnQgaGFuZGxlclxyXG5cclxuICAgICAgICBzd2l0Y2ggKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ0NBTkNFTCc6XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFja3VwID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuYmFja3VwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZG9jRGF0YTogYmFja3VwLnJvdywgZ3JpZERhdGE6IGJhY2t1cC5kZXRhaWxzLCB3YXJuaW5nOiAnJ30pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdoYW5kbGVUb29sYmFyRXZlbnRzLCBubyBldmVudCBoYW5kbGVyIGZvciAnLCBldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImhhbmRsZUlucHV0Q2hhbmdlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oaW5wdXROYW1lLCBpbnB1dFZhbHVlKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LjQt9C80LXQvdC10L3QuNC5XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsZUlucHV0Q2hhbmdlJywgaW5wdXROYW1lLCBpbnB1dFZhbHVlKTtcclxuICAgICAgICAvLyDQuNC30LzQtdC90LXQvdC40Y8g0LTQvtC/0YPRgdGC0LjQvNGLINGC0L7Qu9GM0LrQviDQsiDRgNC10LbQuNC80LUg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5lZGl0ZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignbm90IGluIGVkaXRlIG1vZGUnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGE7XHJcblxyXG4gICAgICAgIGRhdGFbaW5wdXROYW1lXSA9IGlucHV0VmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZG9jRGF0YTogZGF0YX0pO1xyXG4vKlxyXG4gICAgICAgIGxldCBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YTtcclxuICAgICAgICBkYXRhW2lucHV0TmFtZV0gPSBpbnB1dFZhbHVlO1xyXG4gICAgICAgIC8vINC30LDQtNCw0YLRjCDQvdC+0LLQvtC1INC30L3QsNGH0LXQvdC40LUg0L/QvtC70Y9cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcbiovXHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcInByZXBhaXJlVG9vbEJhclBhcmFtZXRlcnNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihpc0VkaXRNb2RlKSB7XHJcbiAgICAgICAgbGV0IHRvb2xiYXJQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGJ0bkFkZDoge1xyXG4gICAgICAgICAgICAgICAgc2hvdzogIWlzRWRpdE1vZGUsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogaXNFZGl0TW9kZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBidG5FZGl0OiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OiAhaXNFZGl0TW9kZSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0VkaXRNb2RlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJ0blByaW50OiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnRuU2F2ZToge1xyXG4gICAgICAgICAgICAgICAgc2hvdzogaXNFZGl0TW9kZSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRvb2xiYXJQYXJhbXM7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiaGFuZGxlR3JpZEJ0bkNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oYnRuTmFtZSwgaWQpIHtcclxuICAgICAgICBzd2l0Y2ggKGJ0bk5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYWRkJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUm93KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZWRpdCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRSb3coKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkZWxldGUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVSb3coKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJkZWxldGVSb3dcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDRg9C00LDQu9C40YIg0LDQutGC0LjQstC90YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICBsZXQgZ3JpZERhdGEgPSB0aGlzLnN0YXRlLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBncmlkQWN0aXZlUm93ID0gdGhpcy5yZWZzWydkYXRhLWdyaWQnXS5zdGF0ZS5hY3RpdmVSb3csXHJcbiAgICAgICAgICAgIGRvY0RhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGE7XHJcblxyXG4gICAgICAgIGdyaWREYXRhLnNwbGljZShncmlkQWN0aXZlUm93LCAxKTtcclxuXHJcbiAgICAgICAgLy8g0L/QtdGA0LXRgNCw0YHRh9C10YIg0LjRgtC+0LPQvtCyXHJcbiAgICAgICAgZG9jRGF0YSA9IHRoaXMucmVjYWxjRG9jU3VtbWEoZG9jRGF0YSk7XHJcblxyXG4gICAgICAgIC8vINC40LfQvNC10L3QuNC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWREYXRhOiBncmlkRGF0YSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImVkaXRSb3dcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQvtGC0LrRgNC+0LXRgiDQsNC60YLQuNCy0L3Rg9GOINGB0YLRgNC+0LrRgyDQtNC70Y8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIGxldCBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGdyaWRBY3RpdmVSb3cgPSB0aGlzLnJlZnNbJ2RhdGEtZ3JpZCddLnN0YXRlLmFjdGl2ZVJvdyxcclxuICAgICAgICAgICAgZ3JpZFJvdyA9IGdyaWREYXRhW2dyaWRBY3RpdmVSb3ddO1xyXG5cclxuICAgICAgICAvLyDQvtGC0LrRgNC+0LXQvCDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L4g0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtncmlkUm93RWRpdDogdHJ1ZSwgZ3JpZFJvd0V2ZW50OiAnZWRpdCcsIGdyaWRSb3dEYXRhOiBncmlkUm93fSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiYWRkUm93XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0LTQvtCx0LDQstC40YIg0LIg0YHQvtGB0YLQvtGP0L3QuNC1INC90L7QstGD0Y4g0YHRgtGA0L7QutGDXHJcblxyXG4gICAgICAgIGxldCBncmlkQ29sdW1ucyA9IHRoaXMuc3RhdGUuZ3JpZENvbmZpZyxcclxuICAgICAgICAgICAgZ3JpZERhdGEgPSB0aGlzLnN0YXRlLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBuZXdSb3cgPSBuZXcgT2JqZWN0KCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZENvbHVtbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGZpZWxkID0gZ3JpZENvbHVtbnNbaV0uaWQ7XHJcbiAgICAgICAgICAgIG5ld1Jvd1tmaWVsZF0gPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5ld1Jvdy5pZCA9ICdORVcnICsgTWF0aC5yYW5kb20oKTsgLy8g0LPQtdC90LXRgNC40Lwg0L3QvtCy0L7QtSDQuNC0XHJcblxyXG4gICAgICAgIC8vINC+0YLQutGA0L7QtdC8INC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QviDQtNC70Y8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiB0cnVlLCBncmlkUm93RXZlbnQ6ICdhZGQnLCBncmlkUm93RGF0YTogbmV3Um93fSk7XHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImNyZWF0ZUdyaWRSb3dcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgc3R5bGUgPSBzdHlsZXMuZ3JpZFJvdyxcclxuICAgICAgICAgICAgcm93ID0gdGhpcy5zdGF0ZS5ncmlkUm93RGF0YSxcclxuICAgICAgICAgICAgdmFsaWRhdGVNZXNzYWdlID0gJycsXHJcbiAgICAgICAgICAgIG1vZGFsT2JqZWN0cyA9IFsnYnRuT2snLCAnYnRuQ2FuY2VsJ10sXHJcbiAgICAgICAgICAgIGJ1dHRvbk9rUmVhZE9ubHkgPSB2YWxpZGF0ZU1lc3NhZ2UubGVuZ3RoID4gMCB8fCAhdGhpcy5zdGF0ZS5jaGVja2VkO1xyXG5cclxuICAgICAgICBpZiAoYnV0dG9uT2tSZWFkT25seSkge1xyXG4gICAgICAgICAgICAvLyDRg9Cx0LXRgNC10Lwg0LrQvdC+0L/QutGDINCe0LpcclxuICAgICAgICAgICAgbW9kYWxPYmplY3RzLnNwbGljZSgwLCAxKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoIXJvdykgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCk7XHJcblxyXG4gICAgICAgIGxldCBub21EYXRhID0gdGhpcy5zdGF0ZS5saWJzWydub21lbmNsYXR1cmUnXS5maWx0ZXIoZnVuY3Rpb24obGliKSAge1xyXG4gICAgICAgICAgICBpZiAoIWxpYi5kb2sgfHwgbGliLmRvayA9PT0gTElCRE9LKSByZXR1cm4gbGliO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCIubW9kYWxQYWdlXCJ9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2UsIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsT2JqZWN0czogbW9kYWxPYmplY3RzLCBcclxuICAgICAgICAgICAgICAgIHJlZjogXCJtb2RhbHBhZ2UtZ3JpZC1yb3dcIiwgXHJcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLCBcclxuICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUNsaWNrLCBcclxuICAgICAgICAgICAgICAgIG1vZGFsUGFnZU5hbWU6IFwiUmVhIGxpc2FtaW5lIC8gcGFyYW5kYW1pbmVcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7cmVmOiBcImdyaWQtcm93LWNvbnRhaW5lclwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NSb3d9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHt0aXRsZTogXCJUZWVudXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJub21pZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcIm5vbWVuY2xhdHVyZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBub21EYXRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cubm9taWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogcm93Lmtvb2QsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJub21pZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJUZWVudXNlIGtvb2RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlR3JpZFJvd0NoYW5nZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NSb3d9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge3RpdGxlOiBcIktvZ3VzIFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia29ndXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LmtvZ3VzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrb2d1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUdyaWRSb3dJbnB1dH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NSb3d9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge3RpdGxlOiBcIkhpbmQgXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJoaW5kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5oaW5kLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJoaW5kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlR3JpZFJvd0lucHV0fSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7dGl0bGU6IFwiS2JtLXRhOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtibXRhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5rYm10YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImtibXRhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlR3JpZFJvd0NoYW5nZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2NSb3d9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge3RpdGxlOiBcIktibTogXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrYm1cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LmtibSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImtibVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVHcmlkUm93SW5wdXR9KVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHt0aXRsZTogXCJTdW1tYTogXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJTdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cuc3VtbWEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUdyaWRSb3dJbnB1dH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHZhbGlkYXRlTWVzc2FnZSkpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJoYW5kbGVHcmlkUm93Q2hhbmdlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0L3QsCDRhNC+0YDQvNC1XHJcbiAgICAgICAgbGV0IHJvd0RhdGEgPSBPYmplY3Qoe30sIHRoaXMuc3RhdGUuZ3JpZFJvd0RhdGEpO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgIT09IHJvd0RhdGFbbmFtZV0gJiYgbmFtZSA9PT0gJ25vbWlkJykge1xyXG4gICAgICAgICAgICAvLyDQv9GA0L7QuNC30L7RiNC70L4g0LjQt9C80LXQvdC10L3QuNC1INGD0YHQu9GD0LPQuCwg0L7QsdC90YPQu9C40Lwg0LfQvdCw0YfQtdC90LjRj1xyXG4gICAgICAgICAgICByb3dEYXRhWydrb2d1cyddID0gMDtcclxuICAgICAgICAgICAgcm93RGF0YVsnaGluZCddID0gMDtcclxuICAgICAgICAgICAgcm93RGF0YVsnc3VtbWEnXSA9IDA7XHJcbiAgICAgICAgICAgIHJvd0RhdGFbJ2tibSddID0gMDtcclxuICAgICAgICAgICAgcm93RGF0YVsna2JtdGEnXSA9IDA7XHJcbiAgICAgICAgICAgIHJvd0RhdGFbJ25vbWlkJ10gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0LjRidC10Lwg0L/QviDRgdC/0YDQsNCy0L7Rh9C90LjQutGDINC/0L7Qu9GPINC60L7QtCDQuCDQvdCw0LjQvNC10L3QvtCy0LDQvdC40LVcclxuXHJcbiAgICAgICAgbGV0IGxpYkRhdGEgPSB0aGlzLnN0YXRlLmxpYnNbJ25vbWVuY2xhdHVyZSddO1xyXG4gICAgICAgIGxpYkRhdGEuZm9yRWFjaChmdW5jdGlvbihyb3cpICB7XHJcbiAgICAgICAgICAgIGlmIChyb3cuaWQgPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJvd0RhdGFbJ2tvb2QnXSA9IHJvdy5rb29kO1xyXG4gICAgICAgICAgICAgICAgcm93RGF0YVsnbmltZXR1cyddID0gcm93Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcm93RGF0YVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dEYXRhOiByb3dEYXRhfSk7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZUdyaWRSb3coKTtcclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiaGFuZGxlR3JpZFJvd0lucHV0XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAvLyDQv9C10YDQtdGB0YfQtdGCINGB0YPQvNC8XHJcbiAgICAgICAgbGV0IHJvd0RhdGEgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlLmdyaWRSb3dEYXRhKTtcclxuICAgICAgICByb3dEYXRhW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgcm93RGF0YSA9IHRoaXMucmVjYWxjUm93U3VtbShyb3dEYXRhKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtncmlkUm93RGF0YTogcm93RGF0YX0pO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGVHcmlkUm93KCk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwicmVjYWxjUm93U3VtbVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGdyaWRSb3dEYXRhKSB7XHJcbiAgICAgICAgLy8g0L/QtdGA0LXRgNCw0YHRh9C10YIg0YHRg9C80LzRiyDRgdGC0YDQvtC60Lgg0Lgg0YDQsNGB0YfQtdGCINC90LDQu9C+0LPQsFxyXG4gICAgICAgIGdyaWRSb3dEYXRhWydrb2d1cyddID0gTnVtYmVyKGdyaWRSb3dEYXRhLmtvZ3VzKTtcclxuICAgICAgICBncmlkUm93RGF0YVsnaGluZCddID0gTnVtYmVyKGdyaWRSb3dEYXRhLmhpbmQpO1xyXG4gICAgICAgIGdyaWRSb3dEYXRhWydrYm10YSddID0gTnVtYmVyKGdyaWRSb3dEYXRhWydrb2d1cyddKSAqIE51bWJlcihncmlkUm93RGF0YVsnaGluZCddKTtcclxuICAgICAgICBncmlkUm93RGF0YVsna2JtJ10gPSBOdW1iZXIoZ3JpZFJvd0RhdGFbJ2tibXRhJ10gKiAwLjIwKTsgLy8gQHRvZG8g0LLRgNC80LXQvdC90L5cclxuICAgICAgICBncmlkUm93RGF0YVsnc3VtbWEnXSA9IE51bWJlcihncmlkUm93RGF0YVsna2JtdGEnXSkgKyBOdW1iZXIoZ3JpZFJvd0RhdGFbJ2tibSddKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGdyaWRSb3dEYXRhO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcInJlY2FsY0RvY1N1bW1hXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZG9jRGF0YSkge1xyXG4gICAgICAgIGxldCBncmlkRGF0YSA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMuc3RhdGUuZ3JpZERhdGEpO1xyXG5cclxuICAgICAgICBkb2NEYXRhWydzdW1tYSddID0gMDtcclxuICAgICAgICBkb2NEYXRhWydrYm0nXSA9IDA7XHJcbiAgICAgICAgZ3JpZERhdGEuZm9yRWFjaChmdW5jdGlvbihyb3cpICB7XHJcbiAgICAgICAgICAgIGRvY0RhdGFbJ3N1bW1hJ10gKz0gTnVtYmVyKHJvd1snc3VtbWEnXSk7XHJcbiAgICAgICAgICAgIGRvY0RhdGFbJ2tibSddICs9IE51bWJlcihyb3dbJ2tibSddKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZG9jRGF0YTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJ2YWxpZGF0ZUdyaWRSb3dcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyB3aWxsIGNoZWNrIHZhbHVlcyBvbiB0aGUgZm9ybSBhbmQgcmV0dXJuIHN0cmluZyB3aXRoIHdhcm5pbmdcclxuICAgICAgICBsZXQgd2FybmluZyA9ICcnLFxyXG4gICAgICAgICAgICBncmlkUm93RGF0YSA9IHRoaXMuc3RhdGUuZ3JpZFJvd0RhdGE7XHJcbiAgICAgICAgLy8g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0L/RgNC+0LLQtdGA0LrQuCDRhNC+0YDQvNGLINC90LAg0LLQsNC70LjQtNC90L7RgdGC0YxcclxuICAgICAgICBpZiAoIWdyaWRSb3dEYXRhWydub21pZCddKSB3YXJuaW5nID0gd2FybmluZyArICcg0LrQvtC0INGD0YHQu9GD0LPQuCc7XHJcbiAgICAgICAgaWYgKCFncmlkUm93RGF0YVsna29ndXMnXSkgd2FybmluZyA9IHdhcm5pbmcgKyAnINC60L7Quy3QstC+JztcclxuICAgICAgICBpZiAoIWdyaWRSb3dEYXRhWydoaW5kJ10pIHdhcm5pbmcgPSB3YXJuaW5nICsgJyDRhtC10L3QsCc7XHJcblxyXG4gICAgICAgIGlmICh3YXJuaW5nLmxlbmd0aCA+IDIpIHtcclxuICAgICAgICAgICAgLy8g0LXRgdGC0Ywg0L/RgNC+0LHQu9C10LzRi1xyXG4gICAgICAgICAgICB3YXJuaW5nID0gJ9Ce0YLRgdGD0YLRgdCy0YPRjtGCINC00LDQvdC90YvQtTonICsgd2FybmluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hlY2tlZDogdHJ1ZSwgd2FybmluZzogd2FybmluZ30pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImNyZWF0ZUxpYnNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQstC10YDQvdC10YIg0L7QsdGK0LXQutGCINCx0LjQsdC70LjQvtGC0LXQuiDQtNC+0LrRg9C80LXQvdGC0LBcclxuICAgICAgICBsZXQgbGlicyA9IHt9O1xyXG4gICAgICAgIExJQlJBUklFUy5mb3JFYWNoKGZ1bmN0aW9uKGxpYikgIHtcclxuICAgICAgICAgICAgbGlic1tsaWJdID0gW107XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gbGlicztcclxuICAgIH19KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5BcnZlLlByb3BUeXBlcyA9IHtcclxuICAgIGRvY0RhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIGJwbTogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgZWRpdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIHNob3dNZXNzYWdlQm94OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgZ3JpZERhdGE6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcclxuICAgIHJlbGF0aW9uczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgZ3JpZENvbmZpZzogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgZ3JpZFJvd0VkaXQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgZ3JpZFJvd0V2ZW50OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgZ3JpZFJvd0RhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBsaWJzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgY2hlY2tlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICB3YXJuaW5nOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXHJcblxyXG59XHJcblxyXG5cclxuLypcclxuIEFydmUuZGVmYXVsdFByb3BzID0ge1xyXG4gZGlzYWJsZWQ6IGZhbHNlLFxyXG4gc2hvdzogdHJ1ZVxyXG4gfTtcclxuICovXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBcnZlO1xyXG5cclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy9hcnZlL2FydmUuanN4XG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIiwiJ3VzZSBzdHJpY3QnO1xyXG4vL0B0b2RvINC30LDQutC+0L3Rh9C40YLRjCDQv9C+0YHQu9C1INGB0L/RgNCw0LLQvtGH0L3QuNC60L7QslxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4PXJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vc2VsZWN0LWRhdGEtc3R5bGVzJyksXHJcbiAgICBEYXRhR3JpZCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZGF0YS1ncmlkL2RhdGEtZ3JpZC5qc3gnKSxcclxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcclxuICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbFBhZ2UuanN4Jyk7XHJcblxyXG52YXIgX19fX0NsYXNzej1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzel9fX19LZXkgaW4gX19fX0NsYXNzeil7aWYoX19fX0NsYXNzei5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3N6X19fX0tleSkpe1NlbGVjdERhdGFbX19fX0NsYXNzel9fX19LZXldPV9fX19DbGFzc3pbX19fX0NsYXNzel9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3N6PV9fX19DbGFzc3o9PT1udWxsP251bGw6X19fX0NsYXNzei5wcm90b3R5cGU7U2VsZWN0RGF0YS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzeik7U2VsZWN0RGF0YS5wcm90b3R5cGUuY29uc3RydWN0b3I9U2VsZWN0RGF0YTtTZWxlY3REYXRhLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc3o7XHJcbiAgICBmdW5jdGlvbiBTZWxlY3REYXRhKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzei5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSwgLyog0LLQvtC30LLRgNCw0YnQsNC10LzQvtC1INC30L3QsNGH0LXQvdC40LUsINC90LDQv9GA0LjQvNC10YAgaWQqL1xyXG4gICAgICAgICAgICBmaWVsZFZhbHVlOiBwcm9wcy5kZWZhdWx0VmFsdWUsIC8q0LLQuNC00LjQvNC+0LUg0LfQvdCw0YfQtdC90LjQtSwg0L3QsNC/0YDQuNC80LXRgCBrb29kINC40LvQuCBuYW1lINC/0L4g0YPQutCw0LfQsNC90L3QvtC80YMg0LIgY29sbElkICovXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiBwcm9wcy5yZWFkT25seSxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVkLFxyXG4gICAgICAgICAgICBlZGl0ZWQ6IHByb3BzLmVkaXRlZCxcclxuICAgICAgICAgICAgZ3JpZERhdGE6IFtdLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnOiBbXSxcclxuICAgICAgICAgICAgZ3JpZEFjdGl2ZVJvdzogMCxcclxuICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93XHJcbiAgICAgICAgfTtcclxuLy8gICAgICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVJbnB1dENoYW5nZSA9IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUdyaWRDbGljayA9IHRoaXMuaGFuZGxlR3JpZENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy4gbW9kYWxQYWdlQ2xpY2sgPSB0aGlzLiBtb2RhbFBhZ2VDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudGVzdENvbmZpZ3VyYXRpb24gPSB0aGlzLnRlc3RDb25maWd1cmF0aW9uLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdERhdGEucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB2YWx1ZTogbmV4dFByb3BzLnZhbHVlLFxyXG4gICAgICAgICAgICBmaWVsZFZhbHVlOiBuZXh0UHJvcHMuZGVmYXVsdFZhbHVlLFxyXG4gICAgICAgICAgICByZWFkT25seTogbmV4dFByb3BzLnJlYWRPbmx5LFxyXG4gICAgICAgICAgICBzaG93OiBuZXh0UHJvcHMuc2hvd1xyXG4gICAgICAgIH0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZWxlY3REYXRhLnByb3RvdHlwZSxcImNvbXBvbmVudERpZE1vdW50XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0LfQsNC/0YDQvtGBXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUucmVxdWVyeSgnc2VsZWN0Jyx7fSlcclxuICAgICAgICB0aGlzLnRlc3RDb25maWd1cmF0aW9uKCk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdERhdGEucHJvdG90eXBlLFwic2hvdWxkQ29tcG9uZW50VXBkYXRlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyBAdG9kbyDQtNC+0LHQsNCy0LjRgtGMINC/0YDQvtCy0LXRgNC60YMg0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0YHQvtGB0YLQvtGP0L3QuNGPXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdERhdGEucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGlzRWRpdGVNb2RlID0gIXRoaXMuc3RhdGUucmVhZE9ubHksXHJcbiAgICAgICAgICAgIGJ0blN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmJ1dHRvbiwge2Rpc3BsYXk6IGlzRWRpdGVNb2RlID8gJ2lubGluZScgOiAnbm9uZSd9KVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygncmVuZGVyICcsIHRoaXMuc3RhdGUuZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy53cmFwcGVyfSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge3JlZjogXCJpbnB1dFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5maWVsZFZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHt2YWx1ZTogXCJ2XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYnRuU2hvd1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGJ0blN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24oZSkgIHtyZXR1cm4gdGhpcy5oYW5kbGVDbGljayhlKTt9LmJpbmQodGhpcyl9XHJcbiAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNob3cgPyB0aGlzLm1vZGFsUGFnZSgpIDogbnVsbFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdERhdGEucHJvdG90eXBlLFwiaGFuZGxlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHNob3c6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2VsZWN0RGF0YS5wcm90b3R5cGUsXCJtb2RhbFBhZ2VcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgbW9kYWxPYmplY3RzID0gWydidG5PaycsICdidG5DYW5jZWwnXTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2UsIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbE9iamVjdHM6IG1vZGFsT2JqZWN0cywgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVmOiBcIm1vZGFscGFnZS1ncmlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VOYW1lOiBcIlZhbGkgcmVhXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtyZWY6IFwiZ3JpZC1yb3ctY29udGFpbmVyXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtyZWY6IFwiaW5wdXQtZmlsdGVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk90c2luZ3UgcGFyYW1ldHJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRGaWx0ZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZmllbGRWYWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZX0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhR3JpZCwge2dyaWREYXRhOiB0aGlzLnN0YXRlLmdyaWREYXRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zOiB0aGlzLnN0YXRlLmdyaWRDb25maWcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVHcmlkQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImRhdGEtZ3JpZFwifSlcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZWxlY3REYXRhLnByb3RvdHlwZSxcImhhbmRsZUlucHV0Q2hhbmdlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlSW5wdXRDaGFuZ2UnLCBuYW1lLCB2YWx1ZSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdERhdGEucHJvdG90eXBlLFwibW9kYWxQYWdlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudCA9PT0gJ09rJykge1xyXG4gICAgICAgICAgICAvLyDQvdCw0LTQviDQvdCw0LnRgtC4INCw0LrRgtC40LLQvdGD0Y4g0YHRgtGA0L7QutGDXHJcblxyXG4gICAgICAgICAgICBsZXQgYWN0aXZlUm93ID0gdGhpcy5zdGF0ZS5ncmlkQWN0aXZlUm93LFxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnN0YXRlLmdyaWREYXRhW2FjdGl2ZVJvd11bJ2lkJ10sXHJcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlID0gdGhpcy5zdGF0ZS5ncmlkRGF0YVthY3RpdmVSb3ddWyduYW1lJ107XHJcbiAgICAgICAgICAgIC8vINC/0L7Qu9GD0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC/0L7Qu9C10Lkg0Lgg0YPRgdGC0LDQvdC+0LLQuNGC0Ywg0YHQvtGB0YLQvtGP0L3QuNC1INC00LvRjyDQstC40LTQttC10YLQsFxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IHZhbHVlLCBmaWVsZFZhbHVlOiBmaWVsZFZhbHVlLCBzaG93OiBmYWxzZX0pO1xyXG5cclxuICAgICAgICAgICAgLy8g0LLQtdGA0L3Rg9GC0Ywg0LfQvdCw0YfQtdC90LjQtSDQvdCw0LLQtdGA0YVcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5wcm9wcy5uYW1lLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAvL0B0b2RvINC+0L/QuNGB0LDRgtGMXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xsTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5wcm9wcy5jb2xsTmFtZSwgZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZWxlY3REYXRhLnByb3RvdHlwZSxcImhhbmRsZUdyaWRDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGV2ZW50LCB2YWx1ZSwgYWN0aXZlUm93KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZEFjdGl2ZVJvdzogYWN0aXZlUm93fSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdERhdGEucHJvdG90eXBlLFwidGVzdENvbmZpZ3VyYXRpb25cIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IFtcclxuICAgICAgICAgICAgICAgIHtpZDogMSwgdHlwZTogJ0RPSzEnLCBuYW1lOiAnbmFtZSAxJywgY3JlYXRlZDogJzIwMTctMDEtMDEnLCBsYXN0dXBkYXRlOiAnMjAxNy0wMS0wMScsIHN0YXR1czogJ29rJ30sXHJcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHR5cGU6ICdET0sxJywgbmFtZTogJ25hbWUgMicsIGNyZWF0ZWQ6ICcyMDE3LTAxLTAxJywgbGFzdHVwZGF0ZTogJzIwMTctMDEtMDEnLCBzdGF0dXM6ICdvayd9LFxyXG4gICAgICAgICAgICAgICAge2lkOiAzLCB0eXBlOiAnRE9LMScsIG5hbWU6ICduYW1lIDMnLCBjcmVhdGVkOiAnMjAxNy0wMS0wMScsIGxhc3R1cGRhdGU6ICcyMDE3LTAxLTAxJywgc3RhdHVzOiAnb2snfSxcclxuICAgICAgICAgICAgICAgIHtpZDogNCwgdHlwZTogJ0RPSzEnLCBuYW1lOiAnbmFtZSA0JywgY3JlYXRlZDogJzIwMTctMDEtMDEnLCBsYXN0dXBkYXRlOiAnMjAxNy0wMS0wMScsIHN0YXR1czogJ29rJ30sXHJcbiAgICAgICAgICAgICAgICB7aWQ6IDUsIHR5cGU6ICdET0sxJywgbmFtZTogJ25hbWUgNScsIGNyZWF0ZWQ6ICcyMDE3LTAxLTAxJywgbGFzdHVwZGF0ZTogJzIwMTctMDEtMDEnLCBzdGF0dXM6ICdvayd9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBjb25maWcgPSBbXHJcbiAgICAgICAgICAgICAgICB7aWQ6IFwiaWRcIiwgbmFtZTogXCJpZFwiLCB3aWR0aDogXCI1MHB4XCIsIHNob3c6IGZhbHNlfSxcclxuICAgICAgICAgICAgICAgIHtpZDogXCJ0eXBlXCIsIG5hbWU6IFwidHlwZVwiLCB3aWR0aDogXCIxMDBweFwifSxcclxuICAgICAgICAgICAgICAgIHtpZDogXCJuYW1lXCIsIG5hbWU6IFwiTmltZXR1c1wiLCB3aWR0aDogXCIxMDBweFwifSxcclxuICAgICAgICAgICAgICAgIHtpZDogXCJjcmVhdGVkXCIsIG5hbWU6IFwiY3JlYXRlZFwiLCB3aWR0aDogXCIxNTBweFwifSxcclxuICAgICAgICAgICAgICAgIHtpZDogXCJsYXN0dXBkYXRlXCIsIG5hbWU6IFwiTGFzdCBjaGFuZ2VcIiwgd2lkdGg6IFwiMTUwcHhcIn0sXHJcbiAgICAgICAgICAgICAgICB7aWQ6IFwic3RhdHVzXCIsIG5hbWU6IFwiU3RhdHVzXCIsIHdpZHRoOiBcIjEwMHB4XCJ9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGdyaWRDb25maWc6IGNvbmZpZyxcclxuICAgICAgICAgICAgZ3JpZERhdGE6IGRhdGFcclxuICAgICAgICB9KTtcclxuICAgIH19KTtcclxuXHJcblxyXG4gICAgXHJcbiAgICAgIFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgXHJcbiAgICAgICBcclxuICAgICBcclxuICAgICBcclxuICAgICBcclxuXHJcbiAgICBcclxuICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgICBcclxuICAgICAgIFxyXG4gICAgIFxyXG5cclxuICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICBcclxuICAgICBcclxuICAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgIFxyXG5cclxuICAgICBcclxuICAgICBcclxuXHJcblxyXG5cclxuICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgXHJcblxyXG5cclxuXHJcblxyXG5TZWxlY3REYXRhLlByb3BUeXBlcyA9IHtcclxuICAgIHJlYWRPbmx5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIGNvbGxJZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgcGxhY2Vob2xkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBzaG93OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxyXG59XHJcblxyXG5TZWxlY3REYXRhLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHJlYWRPbmx5OiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIGJ0bkRlbGV0ZTogZmFsc2UsXHJcbiAgICB2YWx1ZTogMCxcclxuICAgIGNvbGxJZDogJ2lkJyxcclxuICAgIHRpdGxlOiAnJyxcclxuICAgIHNob3c6IGZhbHNlXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0RGF0YTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3NlbGVjdC1kYXRhL3NlbGVjdC1kYXRhLmpzeFxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHdyYXBwZXI6IHtcbiAgICAgICAgbWFyZ2luOiAnNXB4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICB3aWR0aDogJzk1JSdcblxuICAgIH0sXG4gICAgaW5wdXQ6IHtcbiAgICAgICAgd2lkdGg6ICc3MCUnLFxuICAgICAgICBtYXJnaW5MZWZ0OiAnNXB4J1xuXG4gICAgfSxcbiAgICBoaWRlOiB7XG4gICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgIH0sXG4gICAgc2VsZWN0OiB7XG4gICAgICAgIHdpZHRoOiAnNjAlJyxcbiAgICAgICAgbWFyZ2luTGVmdDogJzVweCdcbiAgICB9LFxuICAgIHJlYWRPbmx5OiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGM0VGRUYnXG4gICAgfSxcbiAgICBsYWJlbDoge1xuICAgICAgICB3aWR0aDogJzMwJScsXG4gICAgICAgIG1hcmdpbjogJzVweCdcbiAgICB9LFxuICAgIGJ1dHRvbjoge1xuICAgICAgICB3aWR0aDogJzEwJSdcbiAgICB9XG5cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3NlbGVjdC1kYXRhL3NlbGVjdC1kYXRhLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRvY1Jvdzoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmx1ZSdcbiAgICB9LFxuICAgIGRvY0NvbHVtbjoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgeWVsbG93JyxcbiAgICAgICAgd2lkdGg6ICc1MCUnXG4gICAgfSxcbiAgICBkb2M6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJyb3duJ1xuICAgIH0sXG4gICAgZ3JpZFJvdzoge1xuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICBtYXJnaW46ICcxMCUgMzAlIDEwJSAzMCUnLFxuICAgICAgICB3aWR0aDogJ2F1dG8nLFxuICAgICAgICBvcGFjaXR5OiAnMScsXG4gICAgICAgIHRvcDogJzEwMHB4J1xuICAgIH1cblxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLnN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRvY1R5cGVJZCkge1xuICAgIC8vINCy0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINGC0LjQv9CwINC00L7QutGD0LzQtdC90YLQsCDQstC10YDQvdC10YIg0LrQvtC80L/QvtC90LXQvdGCINC00L7QutGD0LzQtdC90YLQsFxuXG4gICAgY29uc29sZS5sb2coJ3JldHVybkRvY0NvbXBvbmVudDonICsgZG9jVHlwZUlkKTtcbiAgICB2YXIgY29tcG9uZW50ID0ge307XG5cbiAgICBzd2l0Y2ggKGRvY1R5cGVJZCkge1xuICAgICAgICBjYXNlICdQQUxLJzpcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Zyb250ZW5kL2RvY3MvcGFsa19vcGVyLmpzeCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb21wb25lbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL2FydmUvYXJ2ZS5qc3gnKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9taWRkbGV3YXJlL3JldHVybkRvY0NvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuY29uc3QgRm9ybSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZm9ybS5qcycpO1xyXG5jb25zdCBQYWdlTGFiZWwgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3BhZ2VfbGFiZWwnKTtcclxuXHJcbnZhciBwYWdlcyA9IFsnUGFnZTEnLCAnUGFnZTInXTtcclxuXHJcbmNvbnN0IFBhbGsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiUGFsa1wiLFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIHtwYWdlczogcGFnZXN9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiIFBhbGsgXCIpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfX0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYWxrO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy9wYWxrX29wZXIuanN4XG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4vcGFnZV9sYWJlbCcpO1xuXG52YXIgRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ0Zvcm0nLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHZhciBwYWdlcyA9IFt7IHBhZ2VOYW1lOiAnUGFnZScgfV07XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnBhZ2VzKSB7XG4gICAgICAgICAgICBwYWdlcyA9IHRoaXMucHJvcHMucGFnZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhZ2VzOiB0aGlzLnByb3BzLnBhZ2VzXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgcGFnZXMgPSB0aGlzLnN0YXRlLnBhZ2VzO1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBjbGFzc05hbWU6ICdjb250YWluZXInIH0sIHBhZ2VzLm1hcChmdW5jdGlvbiAocGFnZSwgaWR4KSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChQYWdlTGFiZWwsIHsga2V5OiBpZHgsIHBhZ2VJZHg6IGlkeCB9LCBwYWdlKTtcbiAgICAgICAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgY2xhc3NOYW1lOiAncGFnZScgfSwgUmVhY3QuY3JlYXRlRWxlbWVudCgnZm9ybScsIG51bGwsIHRoaXMucHJvcHMuY2hpbGRyZW4pKSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbnZhciBQYWdlTGFiZWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdQYWdlTGFiZWwnLFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvLyAgICAgIGNvbnNvbGUubG9nKCdwYWdlIGxhYmVsIGNvbXBvbmVudFdpbGxNb3VudCcpXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHsgZGlzYWJsZWQ6IG5ld1ZhbHVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUNsaWNrKHBhZ2UpIHtcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0L3QsCDRgdC+0LHRi9GC0LjQtSDQutC70LjQuiwg0L/QvtC00LPRgNGD0LbQsNC10Lwg0YHQstGP0LfQsNC90L3Ri9C5INC00L7QutGD0LzQtdC90YJcbiAgICAgICAgLy8gICAgICAgYWxlcnQoJ2NsaWNrOicgKyBwYWdlTmFtZSk7XG4gICAgICAgIC8vIGRvY1R5cGVJZDogZG9jLmRvY190eXBlLCBkb2NJZDpkb2MuaWQsIHBhZ2VOYW1lOidMYXVzZW5kIGlkOicgKyBkb2MuaWRcblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhZ2UgZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYWdlLmRvY0lkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlQ2xpY2sgcGFnZS5kb2NUeXBlSWQgJXMsIHBhZ2UuZG9jSWQgJW4nKTtcbiAgICAgICAgICAgIHZhciB1cmwgPSBcIi9kb2N1bWVudC9cIiArIHBhZ2UuZG9jVHlwZUlkICsgcGFnZS5kb2NJZDtcbiAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSAncGFnZUxhYmVsJztcblxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgdGhpcy5wcm9wcy5jaGlsZHJlbiksIGRpc2FibGVkOiB0aGlzLnN0YXRlLmRpc2FibGVkIH0sIHRoaXMucHJvcHMuY2hpbGRyZW4ucGFnZU5hbWUsICcgJyk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZUxhYmVsO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9wYWdlX2xhYmVsLmpzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3B0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM3UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=
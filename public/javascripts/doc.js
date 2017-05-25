var doc =
webpackJsonp_name_([0],[
/* 0 */
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
	var Doc = __webpack_require__(2)(storeData.docTypeId);
	console.log('storeData: Doc', Doc);

	ReactDOM.render(React.createElement(Doc, { data: storeData.data, bpm: storeData.bpm }), document.getElementById('doc'));

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (docTypeId) {
	    // взависимости от типа документа вернет компонент документа

	    console.log('returnDocComponent:' + docTypeId);
	    var component = {};

	    switch (docTypeId) {
	        case 'ARV':
	            component = __webpack_require__(3);
	            break;
	        case 'JOURNAL':
	            component = __webpack_require__(51);
	            break;
	        case 'SORDER':
	            component = __webpack_require__(61);
	            break;
	        case 'VORDER':
	            component = __webpack_require__(63);
	            break;
	        case 'PALK':
	            component = __webpack_require__(64);
	            break;
	        default:
	            component = __webpack_require__(3);
	    }
	    return component;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const
	    Form = __webpack_require__(10),
	    InputText = __webpack_require__(14),
	    InputDate = __webpack_require__(16),
	//    InputNumber = require('../components/doc-input-number.jsx'),
	//    Toolbar = require('../components/doc-toolbar.jsx'),
	    DocCommon = __webpack_require__(18),
	    Select = __webpack_require__(22),
	    TextArea = __webpack_require__(24),
	    DataGrid = __webpack_require__(26),
	    GridRow = __webpack_require__(28),
	    DokProp = __webpack_require__(36),
	    relatedDocuments = __webpack_require__(37),
	    ToolbarContainer = __webpack_require__(38),
	    DocToolBar = __webpack_require__(40),
	    validateForm = __webpack_require__(48),
	    styles = __webpack_require__(49);

	const LIBRARIES = ['asutused','kontod','dokProps','users','aa','tunnus','project','nomenclature'];

	// Create a store
	var docStore = __webpack_require__(50);

	var now = new Date();

	var ____Class1=React.PureComponent;for(var ____Class1____Key in ____Class1){if(____Class1.hasOwnProperty(____Class1____Key)){Arve[____Class1____Key]=____Class1[____Class1____Key];}}var ____SuperProtoOf____Class1=____Class1===null?null:____Class1.prototype;Arve.prototype=Object.create(____SuperProtoOf____Class1);Arve.prototype.constructor=Arve;Arve.__superConstructor__=____Class1;
	    function Arve(props) {
	        ____Class1.call(this,props);
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


	    Object.defineProperty(Arve.prototype,"validation",{writable:true,configurable:true,value:function( ) {

	        let requiredFields = this.requiredFields;
	        let warning = __webpack_require__(48)(this, requiredFields);
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
	        flux.doAction('gridNameChange', 'arv-grid-row'); // задаем имя компонента строки грида (для редактирования

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

	        docStore.on('change:libs', function(newValue, previousValue)  {
	            if (newValue.length > 0 ) {
	                let libs = newValue,
	                    libsData = this.state.libs;

	                libs.forEach(function(lib)  {
	                    if (this.state.libs[lib.id] && lib.data.length > 0) {
	                        libsData[lib.id] = lib.data;
	                    }
	                }.bind(this));
	                this.setState({libs:libsData});
	            }
	        }.bind(this));


	    }});

	    Object.defineProperty(Arve.prototype,"relatedDocuments",{writable:true,configurable:true,value:function( ) {
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

	    Object.defineProperty(Arve.prototype,"render",{writable:true,configurable:true,value:function() {
	        // формируем зависимости
	        relatedDocuments(this);

	        let data = this.state.docData,
	            isEditeMode = this.state.edited,
	            gridData = this.state.gridData,
	            gridColumns = this.state.gridConfig,
	            toolbarParams = this.prepaireToolBarParameters(isEditeMode),
	            validationMessage = this.validation();

	        return (
	            React.createElement(Form, {pages: this.pages, ref: "form", handlePageClick: this.handlePageClick, disabled: isEditeMode}, 
	                React.createElement(ToolbarContainer, {ref: "toolbarContainer"}, 
	                    React.createElement("div", {className: "doc-toolbar-warning"}, 
	                        validationMessage ? React.createElement("span", null, validationMessage) : null
	                    ), 
	                    React.createElement("div", null, 
	                        React.createElement(DocToolBar, {bpm: data.bpm, edited: isEditeMode, docStatus: data.doc_status})
	                    )
	                ), 
	                React.createElement("div", {style: styles.doc}, 
	                    React.createElement("div", {style: styles.docRow}, 
	                        React.createElement(DocCommon, {data: data, readOnly: !isEditeMode})
	                    ), 
	                    React.createElement("div", {style: styles.docRow}, 
	                        React.createElement("div", {style: styles.docColumn}, 
	                            React.createElement(InputText, {className: "ui-c2", title: "Number", name: "number", value: data.number, 
	                                       readOnly: !isEditeMode, 
	                                       onChange: this.handleInputChange}), 
	                            React.createElement(InputDate, {title: "Kuupäev ", name: "kpv", value: data.kpv, ref: "kpv", 
	                                       placeholder: "Kuupäev", readOnly: !isEditeMode, 
	                                       onChange: this.handleInputChange}), 
	                            React.createElement(InputDate, {className: "ui-c2", title: "Tähtaeg ", name: "tahtaeg", value: data.tahtaeg, 
	                                       ref: "tahtaeg", 
	                                       placeholder: "Tähtaeg", readOnly: !isEditeMode, 
	                                       onChange: this.handleInputChange}), 
	                            React.createElement(Select, {className: "ui-c2", 
	                                    title: "Asutus", 
	                                    name: "asutusid", 
	                                    libs: "asutused", 
	                                    data: this.state.libs['asutused'], 
	                                    value: data.asutusid, 
	                                    defaultValue: data.asutus, 
	                                    placeholder: "Asutus", 
	                                    ref: "asutusid", 
	                                    btnDelete: true, 
	                                    onChange: this.handleInputChange, 
	                                    readOnly: !isEditeMode}), 
	                            React.createElement(InputText, {className: "ui-c2", title: "Lisa ", name: "lisa", value: data.lisa, 
	                                       placeholder: "Lisa", 
	                                       ref: "lisa", readOnly: !isEditeMode, 
	                                       onChange: this.handleInputChange})
	                        ), 
	                        React.createElement("div", {style: styles.docColumn}, 
	                            React.createElement(DokProp, {className: "ui-c2", 
	                                     title: "Konteerimine: ", 
	                                     name: "doklausid", 
	                                     libs: "dokProps", 
	                                     value: data.doklausid, 
	                                     defaultValue: data.dokprop, 
	                                     placeholder: "Konteerimine", 
	                                     ref: "doklausid", 
	                                     readOnly: !isEditeMode})
	                        )
	                    ), 
	                    React.createElement("div", {style: styles.docRow}, 
	                        React.createElement(TextArea, {title: "Märkused", name: "muud", placeholder: "Märkused", 
	                                  ref: "muud", 
	                                  onChange: this.handleInputChange, 
	                                  value: data.muud, readOnly: !isEditeMode})
	                    ), 
	                    React.createElement("div", {style: styles.docRow}, 
	                        React.createElement(DataGrid, {source: "details", gridData: gridData, gridColumns: gridColumns, 
	                                  handleGridRow: this.handleGridRow, 
	                                  readOnly: !isEditeMode, ref: "DataGrid"})
	                    ), 
	                    React.createElement("div", {style: styles.docRow}, 
	                        React.createElement(InputText, {title: "Summa ", name: "summa", placeholder: "Summa", 
	                                   ref: "summa", 
	                                   value: data.summa, disabled: "true", 
	                                   onChange: this.handleInputChange, 
	                                   pattern: "^[0-9]+(\\.[0-9]{1,4})?$"}), 
	                        React.createElement(InputText, {title: "Käibemaks ", name: "kbm", placeholder: "Käibemaks", 
	                                   ref: "kbm", 
	                                   disabled: "true", 
	                                   value: data.kbm, 
	                                   onChange: this.handleInputChange, 
	                                   pattern: "^[0-9]+(\\.[0-9]{1,4})?$"})
	                    ), 
	                    this.state.gridRowEdit ?
	                        React.createElement(GridRow, {modalPageClick: this.modalPageClick, 
	                                 gridEvent: this.state.gridRowEvent, 
	                                 gridRowData: this.state.gridRowData}) : null
	                )
	            )
	        );
	    }});

	    Object.defineProperty(Arve.prototype,"handleGridRow",{writable:true,configurable:true,value:function(gridEvent, data) {
	        // управление модальным окном
	        this.setState({gridRowEdit: true, gridRowEvent: gridEvent, gridRowData: data});
	    }});

	    Object.defineProperty(Arve.prototype,"modalPageClick",{writable:true,configurable:true,value:function(btnEvent, data) {
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
	                gridColumns.forEach(function(field)  {return gridRow[field] = null;}); // создаем поля в объекте
	            }
	            // сохраним данные в хранилище
	            data.forEach(function(field)  {return gridRow[field.name] = field.value;});

	            // заполним поля kood, nimetus
	            var libs = flux.stores.docStore.libs,
	                nomLib = libs.filter(function(data)  {
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

	        var docSumma = gridData.reduce(function(sum, row)  {return sum + Number(row.summa);}, 0), // сумма счета
	            docKbm = gridData.reduce(function(sum, row)  {return sum + Number(row.kbm);}, 0), // сумма налога
	            docKbmta = docSumma - docKbm;

	        docData.summa = docSumma;
	        docData.kbm = docKbm;
	        docData.kbmta = docKbmta;

	        this.refs['DataGrid'].replaceState({gridData: gridData});
	        this.setState({gridRowEdit: false, docData: docData});

	    }});

	    Object.defineProperty(Arve.prototype,"handlePageClick",{writable:true,configurable:true,value:function(page)  {
	        if (page.docId) {
	            var url = "/document/" + page.docTypeId + page.docId;
	            document.location.href = url;
	        }
	    }});

	    Object.defineProperty(Arve.prototype,"handleSelectTask",{writable:true,configurable:true,value:function(e) {
	        // метод вызывается при выборе задачи
	        var taskValue = e.target.value;
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




	InputDate.PropTypes = {
	    data: React.PropTypes.object.isRequired

	}

	module.exports = Arve;


/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    PageLabel = __webpack_require__(11),
	    styles = __webpack_require__(13);

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    styles = __webpack_require__(12);

	var ____Classo=React.PureComponent;for(var ____Classo____Key in ____Classo){if(____Classo.hasOwnProperty(____Classo____Key)){PageLabel[____Classo____Key]=____Classo[____Classo____Key];}}var ____SuperProtoOf____Classo=____Classo===null?null:____Classo.prototype;PageLabel.prototype=Object.create(____SuperProtoOf____Classo);PageLabel.prototype.constructor=PageLabel;PageLabel.__superConstructor__=____Classo;
	    function PageLabel(props) {
	        ____Classo.call(this,props);
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
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(4),
	    styles = __webpack_require__(15);

	var ____Classf=React.PureComponent;for(var ____Classf____Key in ____Classf){if(____Classf.hasOwnProperty(____Classf____Key)){Input[____Classf____Key]=____Classf[____Classf____Key];}}var ____SuperProtoOf____Classf=____Classf===null?null:____Classf.prototype;Input.prototype=Object.create(____SuperProtoOf____Classf);Input.prototype.constructor=Input;Input.__superConstructor__=____Classf;
	    function Input(props) {"use strict";
	        ____Classf.call(this,props);
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
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(4),
	    styles = __webpack_require__(17);

	var ____Classh=React.PureComponent;for(var ____Classh____Key in ____Classh){if(____Classh.hasOwnProperty(____Classh____Key)){InputDate[____Classh____Key]=____Classh[____Classh____Key];}}var ____SuperProtoOf____Classh=____Classh===null?null:____Classh.prototype;InputDate.prototype=Object.create(____SuperProtoOf____Classh);InputDate.prototype.constructor=InputDate;InputDate.__superConstructor__=____Classh;

	    function InputDate(props) {
	        ____Classh.call(this,props);
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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    InputText = __webpack_require__(14),
	    InputDateTime = __webpack_require__(19),
	    DocList = __webpack_require__(20),
	    styles = __webpack_require__(21);

	var ____Classi=React.PureComponent;for(var ____Classi____Key in ____Classi){if(____Classi.hasOwnProperty(____Classi____Key)){DocCommon[____Classi____Key]=____Classi[____Classi____Key];}}var ____SuperProtoOf____Classi=____Classi===null?null:____Classi.prototype;DocCommon.prototype=Object.create(____SuperProtoOf____Classi);DocCommon.prototype.constructor=DocCommon;DocCommon.__superConstructor__=____Classi;
	    function DocCommon(props) {"use strict";
	        ____Classi.call(this,props);
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5),

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
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    styles = __webpack_require__(23);

	//    InputText = require('./doc-input-text.jsx');

	var ____Classj=React.PureComponent;for(var ____Classj____Key in ____Classj){if(____Classj.hasOwnProperty(____Classj____Key)){Select[____Classj____Key]=____Classj[____Classj____Key];}}var ____SuperProtoOf____Classj=____Classj===null?null:____Classj.prototype;Select.prototype=Object.create(____SuperProtoOf____Classj);Select.prototype.constructor=Select;Select.__superConstructor__=____Classj;
	    function Select(props) {
	        ____Classj.call(this,props);
	        this.state = {
	            value: props.value /* здесь по значению ИД */,
	            readOnly: props.readOnly,
	            disabled: props.disabled,
	            data: props.data,
	            fieldValue: props.value /*здесь по значени поля collId */,
	            btnDelete: props.btnDelete /* если истину, то рисуем рядом кнопку для очистки значения*/
	        };
	        this.onChange = this.onChange.bind(this);

	    }

	    /*   getInitialState: function () {
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

	     return {
	     value: this.props.value /!* здесь по значению ИД *!/,
	     readOnly: this.props.readOnly,
	     disabled: true,
	     data: libData || [],
	     fieldValue: this.props.value /!*здесь по значени поля collId *!/,
	     brnDelete: this.props.btnDelete /!* если истину, то рисуем рядом кнопку для очистки значения*!/};
	     },
	     */
	    Object.defineProperty(Select.prototype,"findFieldValue",{writable:true,configurable:true,value:function(data, collId, value) {
	        // привяжет к значеню поля
	        // надо привязать данные
	        // kood -> id
	        let id = 0;
	        data.forEach(function(row)  {
	            if (row[collId] == value) {
	                id = row.id;
	//                return id;
	                this.setState({value: row.id, fieldValue: row[collId]});
	                return;
	            }
	        }.bind(this), this);

	    }});

	    Object.defineProperty(Select.prototype,"getValueById",{writable:true,configurable:true,value:function(collId, rowId) {
	        // вернет значения поля по выбранному ИД

	        let fieldValue,
	            data = this.state.data;

	        data.forEach(function(row)  {
	            if (row['id'] == rowId) {
	                fieldValue = row[collId];
	                this.setState({fieldValue: fieldValue});
	            }
	        }.bind(this), this);

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
	/*
	            data = flux.stores.docStore.data,
	            propValue = data[this.props.name];
	*/

	        if (fieldValue == '') {
	            fieldValue = null;
	        }

	        // найдем по ид значение поля в collId
	        this.getValueById(this.props.collId, fieldValue);
	        // сохраним ид как value

	        this.setState({value: fieldValue});
	/*

	        if (propValue !== 'undefined') {
	            // если используется привязка к данным
	            // получить значение
	            data[this.props.name] = fieldValue;
	            // задать новое значение поля
	            flux.doAction('dataChange', data);
	        }
	*/

	        if (this.props.onChange) {
	            // смотрим к чему привязан селект и отдаим его наверх
	            this.props.onChange(this.props.name, fieldValue); // в случае если задан обработчик на верхнем уровне, отдадим обработку туда
	        }

	    }});

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
	            if (item.id == this.state.value) {
	                return item;
	            }
	        }.bind(this), this);

	        if (dataOptions.length) {
	            Options = dataOptions.map(function(item, index)  {

	                if (typeof item == 'array') {
	                    item = item[0];
	                }
	                let key = 'option-' + index;
	                return React.createElement("option", {value: item.id, key: key, ref: key}, " ", item.name, " ")
	            }, this);
	            inputDefaultValue = dataValue.length > 0 ? dataValue[0].name : this.props.defaultValue;
	        } else {
	            Options = React.createElement("option", {value: 0, key: Math.random()}, " Empty ")
	        }

	        /*
	         let widget = <select value={this.state.value} onChange={this.onChange}
	         style={{width: '100%', height: '100%'}}>{Options}
	         </select>; // если для грида, оставим только селект
	         */

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
	                    className: "ui-c1-button", 
	                    onClick: this.btnDelClick}, 
	                "Delete"
	            )
	        ))
	    }});

	    Object.defineProperty(Select.prototype,"btnDelClick",{writable:true,configurable:true,value:function(event) {
	        // по вызову кнопку удалить, обнуляет значение
	        this.setState({value: null});
	        this.onChange(event);
	    }});


	Select.PropTypes = {
	    data: React.PropTypes.array,
	    readOnly: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    btnDelete: React.PropTypes.bool,
	    libs:React.PropTypes.string
	}

	Select.defaultProps = {
	    readOnly: false,
	    disabled: false,
	    valid: true,
	    btnDelete: false
	}

	module.exports = Select;


/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    wrapper: {
	        margin: '5px',
	        display: 'flex',
	        width: '95%'

	    },
	    input: {
	        width: '60%',
	        marginLeft: '10px'
	    },
	    hide: {
	        display: 'none'
	    },
	    select: {
	        width: '60%',
	        margin: '5px'
	    },
	    readOnly: {
	        backgroundColor: '#F3EFEF'
	    },
	    label: {
	        width: '40%',
	        margin: '5px'
	    }

	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(4),
	    styles = __webpack_require__(25);

	var ____Classk=React.PureComponent;for(var ____Classk____Key in ____Classk){if(____Classk.hasOwnProperty(____Classk____Key)){Input[____Classk____Key]=____Classk[____Classk____Key];}}var ____SuperProtoOf____Classk=____Classk===null?null:____Classk.prototype;Input.prototype=Object.create(____SuperProtoOf____Classk);Input.prototype.constructor=Input;Input.__superConstructor__=____Classk;
	    function Input(props) {"use strict";
	        ____Classk.call(this,props);
	        this.state = {
	            value: this.props.value, readOnly: true, disabled: this.props.disabled || true
	        };

	        this.onChange = this.onChange.bind(this);

	    }

	    /*
	     getDefaultProps: function () {
	     return {
	     name: 'defaulName',
	     className: 'doc-input',
	     placeholder: 'defaulName',
	     title: ''
	     }
	     },
	     */

	    /*
	     componentDidMount() {
	     // создаем обработчик события на изменение docId. Если значение = 0 (добавляем новую запись, то просто очитка полей, иначе подгрузка данных
	     flux.stores.docStore.on('change:docId', (newValue, previousValue)=> {
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
	     });
	     flux.stores.docStore.on('change:edited', (newValue, previousValue)=> {
	     if (newValue !== previousValue ) {
	     this.setState({readOnly: !newValue});
	     }
	     });
	     flux.stores.docStore.on('change:data', (newValue, previousValue)=> {
	     // слушуем изменения данных;
	     if (JSON.stringify(newValue) !== JSON.stringify(previousValue)) {
	     let data = newValue,
	     fieldValue = data[this.props.name];
	     if (data[this.props.name]) {
	     this.setState({value: fieldValue});
	     }
	     }
	     });

	     },
	     */

	    Object.defineProperty(Input.prototype,"onChange",{writable:true,configurable:true,value:function(e) {"use strict";
	        let fieldValue = e.target.value;
	//            data = flux.stores.docStore.data;

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
	    disabled: true,
	    valid: true
	}


	module.exports = Input;

/***/ },
/* 25 */
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    GridButton = __webpack_require__(27);

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
	        //       console.log('cell click' + value + ' id:' + this.props.id + 'readOnly:' + this.state.readOnly);

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
	        //       console.log('clicked rowId :' + rowId + 'rowIndex:' + idx);

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
	//        console.log('new row:' + JSON.stringify(gridData));
	//        this.setState({gridData:gridData});
	        return row;
	    },

	    prepaireGridData: function (sourceData) {
	        var gridData = [];
	        gridData = sourceData.map(function (row) {
	            // получаем чистую строку
	            var newRow = this.newRow();
	            // пройдем по новой строке и заполним ее поля значениями из источника
	//            console.log('чистую строку:' + JSON.stringify(row) + ' newRow:' + JSON.stringify(newRow));

	            for (var key in newRow) {
	//                console.log('key:' + JSON.stringify(key));
	                newRow[key] = row[key];
	            }
	            return newRow; // вернем сформированную новую строку
	        }, this);
	//        console.log('gridData:' + JSON.stringify(gridData) );
	        return gridData;
	    },

	    deleteRow: function () {
	        // удаление строки из грида
	        var rowIndex = flux.stores.docStore.gridRowId;
	               console.log('deleteRow:' + rowIndex);
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

	//        console.log('grid render', this.props);
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4);

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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    ModalPage = __webpack_require__(29),
	    Select = __webpack_require__(33),
	    InputText = __webpack_require__(34),
	    InputNumber = __webpack_require__(35);


	var ArvGridRow = React.createClass({displayName: "ArvGridRow",
	    getInitialState: function () {
	        return {
	            row: this.props.gridRowData, checked: false, warning: ''
	        }
	    },

	    modalPageClick: function (btnEvent) {
	        // отработает событие клик
	        var components = ['nomid', 'kogus', 'hind', 'kbm', 'kbmta', 'summa'],
	            data = [];

	        if (btnEvent == 'Ok') {
	            // проверка

	            // собираем данные для отправки на обработку
	            components.map(function(component)  {
	                data.push({name: component, value: this.refs[component].state.value});
	            }.bind(this))
	        }
	        this.props.modalPageClick(btnEvent, data);
	    },

	    handleChange: function (e, name) {
	        // отслеживаем изменения данных на форме
	        var value = e.target.value;
	        if (value !== this.state.row[name] && name == 'nomid') {
	            this.refs['kogus'].setState({value: 0.000});
	            this.refs['hind'].setState({value: 0.00});
	            this.refs['kbm'].setState({value: 0.00});
	            this.refs['kbmta'].setState({value: 0.00});
	            this.refs['summa'].setState({value: 0.00});
	        }
	        this.recalcRowSumm();

	    },

	    handleInput: function (value, name) {
	        // пересчет сумм
	        this.recalcRowSumm();

	    },

	    recalcRowSumm: function () {
	        var kogus = Number(this.refs['kogus'].state.value),
	            hind = Number(this.refs['hind'].state.value),
	            kbmta = kogus * hind,
	            kbm = kogus * hind * 0.20, // врменно
	            summa = kbmta + kbm;
	        this.refs['kbm'].setState({value: kbm});
	        this.refs['kbmta'].setState({value: kbmta});
	        this.refs['summa'].setState({value: summa});
	        this.validateForm();
	    },

	    validateForm: function () {
	        // will check values on the form and return string with warning
	        var warning = '';
	        // только после проверки формы на валидность
	        if (!this.refs['nomid'].state.value) warning = warning + ' код услуги';
	        if (!this.refs['kogus'].state.value) warning = warning + ' кол-во';
	        if (!this.refs['hind'].state.value) warning = warning + ' цена';

	        if (warning.length > 2) {
	            // есть проблемы
	            warning = 'Отсутсвуют данные:' + warning;
	        }
	        this.setState({checked: true, warning: warning});
	    },
	    render: function () {
	        // @todo вынести в css
	        var style = {
	            border: '1px solid black',
	            backgroundColor: 'white',
	            position: 'relative',
	            margin: '10% 30% 10% 30%',
	            width: 'auto',
	            opacity: '1',
	            top: '100px'
	        };

	        var row = this.state.row,
	            validateMessage = this.state.warning,
	            buttonOkReadOnly = validateMessage.length > 0 || !this.state.checked;

	        /*
	         <div style={style}>
	         */

	        return (
	            React.createElement("div", {className: ".modalPage"}, 
	                React.createElement(ModalPage, {
	                    modalPageBtnClick: this.modalPageClick, 
	                    modalPageName: "Rea lisamine / parandamine"}, 
	                    React.createElement("div", null, 
	                        React.createElement("ul", null, 
	                            React.createElement("li", null, 
	                                React.createElement(Select, {title: "Teenus", 
	                                        name: "nomid", 
	                                        libs: "nomenclature", 
	                                        dok: "ARV", 
	                                        readOnly: false, 
	                                        value: row.nomid, 
	                                        defaultValue: row.kood, 
	                                        ref: "nomid", 
	                                        placeholder: "Teenuse kood", 
	                                        className: "ui-c2", 
	                                        onChange: this.handleChange})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputNumber, {title: "Kogus ", 
	                                             name: "kogus", 
	                                             value: row.kogus, 
	                                             readOnly: false, 
	                                             disabled: "false", 
	                                             bindData: false, 
	                                             ref: "kogus", 
	                                             className: "ui-c2", 
	                                             onBlur: this.handleInput})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputNumber, {title: "Hind ", 
	                                             name: "hind", 
	                                             value: row.hind, 
	                                             readOnly: false, 
	                                             disabled: "false", 
	                                             bindData: false, ref: "hind", 
	                                             className: "ui-c2", 
	                                             onBlur: this.handleInput})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputNumber, {title: "Summa kbm-ta: ", 
	                                             name: "kbmta", 
	                                             value: row.kbmta, 
	                                             disabled: "true", 
	                                             bindData: false, 
	                                             ref: "kbmta", 
	                                             className: "ui-c2", 
	                                             onChange: this.handleChange})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputNumber, {title: "Käibemaks: ", 
	                                             name: "kbm", 
	                                             value: row.kbm, 
	                                             disabled: "true", 
	                                             bindData: false, 
	                                             ref: "kbm", 
	                                             className: "ui-c2", 
	                                             onBlur: this.handleInput})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputNumber, {title: "Summa: ", 
	                                             name: "Summa", 
	                                             value: row.summa, 
	                                             disabled: "true", 
	                                             bindData: false, 
	                                             ref: "summa", 
	                                             className: "ui-c2", 
	                                             onBlur: this.handleInput})
	                            )
	                        )
	                    ), 
	                    React.createElement("div", null, React.createElement("span", null, validateMessage))
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


	module.exports = ArvGridRow;

	/*
	 <InputText title='Kood ' name='kood' value={row.kood} readOnly={false}
	 disabled="false" ref='kood' ></InputText>
	 */


/***/ },
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5);

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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// виджет, объединяющий селект и текст. в тексте отражаютмя данные, связанные с селектом
	'use strict';

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    Select = __webpack_require__(33),
	    Text = __webpack_require__(24);


	var ____Classl=React.PureComponent;for(var ____Classl____Key in ____Classl){if(____Classl.hasOwnProperty(____Classl____Key)){SelectTextWidget[____Classl____Key]=____Classl[____Classl____Key];}}var ____SuperProtoOf____Classl=____Classl===null?null:____Classl.prototype;SelectTextWidget.prototype=Object.create(____SuperProtoOf____Classl);SelectTextWidget.prototype.constructor=SelectTextWidget;SelectTextWidget.__superConstructor__=____Classl;
	    function SelectTextWidget(props) {
	        ____Classl.call(this,props);
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
/* 37 */
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
/* 38 */,
/* 39 */,
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    ToolbarContainer = __webpack_require__(38),
	    BtnAdd = __webpack_require__(41),
	    BtnEdit = __webpack_require__(42),
	    BtnSave = __webpack_require__(43),
	    BtnPrint = __webpack_require__(44),
	    TaskWidget = __webpack_require__(45);

	var ____Classm=React.PureComponent;for(var ____Classm____Key in ____Classm){if(____Classm.hasOwnProperty(____Classm____Key)){DocToolBar[____Classm____Key]=____Classm[____Classm____Key];}}var ____SuperProtoOf____Classm=____Classm===null?null:____Classm.prototype;DocToolBar.prototype=Object.create(____SuperProtoOf____Classm);DocToolBar.prototype.constructor=DocToolBar;DocToolBar.__superConstructor__=____Classm;
	    function DocToolBar(props) {
	        ____Classm.call(this,props);

	        this.btnEditClick = this.btnEditClick.bind(this);
	        this.btnAddClick = this.btnAddClick.bind(this);
	        this.btnSaveClick = this.btnSaveClick.bind(this);
	        this.btnPrintClick = this.btnPrintClick.bind(this);

	    }

	    Object.defineProperty(DocToolBar.prototype,"render",{writable:true,configurable:true,value:function() {
	        let isEditMode = this.props.edited,
	            isDocDisabled = this.props.docStatus == 2 ? true: false,
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
	                React.createElement(BtnPrint, {ref: "btnPrint", onClick: this.btnPrintClick, show: toolbarParams['btnPrint'].show, 
	                          disabled: toolbarParams['btnPrint'].disabled}), 
	                this.props.bpm ? React.createElement(TaskWidget, {ref: "taskWidget", taskList: this.props.bpm, 
	                                              handleSelectTask: this.handleSelectTask, 
	                                              handleButtonTask: this.handleButtonTask}
	                    ) : null

	            )
	        )
	    }});

	    Object.defineProperty(DocToolBar.prototype,"btnAddClick",{writable:true,configurable:true,value:function() {
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
	        if (!this.props.docStatus || this.props.docStatus < 2 ) {
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

	//        let isValid = !this.validator(); @todo validator
	        let isValid = true;

	        if (isValid) {
	            // если прошли валидацию, то сохранеям
	            flux.doAction('saveData');
	            flux.doAction('editedChange', false);
	            flux.doAction('savedChange', true);

	        }
	    }});

	    Object.defineProperty(DocToolBar.prototype,"handleButtonTask",{writable:true,configurable:true,value:function() {
	        // метод вызывается при выборе задачи
	        // найдем актуальную задачу

	        let actualTask = this.state.taskList.filter(function(task)  {
	                if (task.actualStep) {
	                    return task;
	                }
	            }),
	            task = actualTask.map(function(task)  {
	                return task.action
	            }); // оставим только название процедуры

	        flux.doAction('executeTask', task);
	    }});


	    Object.defineProperty(DocToolBar.prototype,"handleSelectTask",{writable:true,configurable:true,value:function(e) {
	        // метод вызывается при выборе задачи
	        //todo Закончить
	        const taskValue = e.target.value;
	    }});



	DocToolBar.PropTypes = {
	    bpm: React.PropTypes.array,
	    edited: React.PropTypes.bool,
	    docStatus: React.PropTypes.number
	}

	DocToolBar.defaultProps = {
	    bpm: [],
	    edited: false,
	    docStatus: 0
	}

	module.exports = DocToolBar;

/***/ },
/* 41 */,
/* 42 */,
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    styles = __webpack_require__(31),
	    Button = __webpack_require__(30),
	    ICON = 'save';


	var ____Classp=React.PureComponent;for(var ____Classp____Key in ____Classp){if(____Classp.hasOwnProperty(____Classp____Key)){ButtonRegisterPrint[____Classp____Key]=____Classp[____Classp____Key];}}var ____SuperProtoOf____Classp=____Classp===null?null:____Classp.prototype;ButtonRegisterPrint.prototype=Object.create(____SuperProtoOf____Classp);ButtonRegisterPrint.prototype.constructor=ButtonRegisterPrint;ButtonRegisterPrint.__superConstructor__=____Classp;
	// кнопка создания документа в регистрах
	    function ButtonRegisterPrint(props) {
	        ____Classp.call(this,props);
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
/* 44 */,
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(4),
	    Button = __webpack_require__(46),
	    styles = __webpack_require__(47);

	var ____Classq=React.PureComponent;for(var ____Classq____Key in ____Classq){if(____Classq.hasOwnProperty(____Classq____Key)){TaskWidget[____Classq____Key]=____Classq[____Classq____Key];}}var ____SuperProtoOf____Classq=____Classq===null?null:____Classq.prototype;TaskWidget.prototype=Object.create(____SuperProtoOf____Classq);TaskWidget.prototype.constructor=TaskWidget;TaskWidget.__superConstructor__=____Classq;
	    function TaskWidget(props) {
	        ____Classq.call(this,props);
	        let tasks = props.taskList;

	        console.log('tasks', tasks);
	        if (tasks.length == 0) {
	            tasks = [{step: 0, name: 'Start', action: 'start', status: 'opened'}];
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
	        this.props.handleButtonTask();
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    styles = __webpack_require__(31),
	    Button = __webpack_require__(30),
	    ICON = 'execute';


	var ____Classr=React.PureComponent;for(var ____Classr____Key in ____Classr){if(____Classr.hasOwnProperty(____Classr____Key)){ButtonRegisterExecute[____Classr____Key]=____Classr[____Classr____Key];}}var ____SuperProtoOf____Classr=____Classr===null?null:____Classr.prototype;ButtonRegisterExecute.prototype=Object.create(____SuperProtoOf____Classr);ButtonRegisterExecute.prototype.constructor=ButtonRegisterExecute;ButtonRegisterExecute.__superConstructor__=____Classr;
	// кнопка создания документа в регистрах
	    function ButtonRegisterExecute(props) {
	        ____Classr.call(this,props);
	        this.handleClick = this.handleClick.bind(this);
	    }

	    Object.defineProperty(ButtonRegisterExecute.prototype,"handleClick",{writable:true,configurable:true,value:function() {
	        console.log('clicked');
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
/* 47 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    wrapper: {
	        display: 'inline-flex'
	    }
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var flux = __webpack_require__(5);

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
/* 49 */
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var flux = __webpack_require__(5);

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
	        task: {} // текущая задача
	    },
	    actionCallbacks: {
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

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const Form = __webpack_require__(52),
	    PageLabel = __webpack_require__(53),
	    InputText = __webpack_require__(34),
	    InputDate = __webpack_require__(54),
	    InputNumber = __webpack_require__(35),
	    Toolbar = __webpack_require__(56),
	    DocCommon = __webpack_require__(58),
	    Select = __webpack_require__(33),
	    TextArea = __webpack_require__(59),
	    DataGrid = __webpack_require__(26),
	    GridRow = __webpack_require__(60),
	    relatedDocuments = __webpack_require__(37);

	var docStore = __webpack_require__(50);

	const Journal = React.createClass({displayName: "Journal",
	    pages: [{pageName: 'Journal'}],

	//    mixins: [relatedDocuments], //, validateForm

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
	        }
	            ;
	    },

	    validation:function() {
	        let now = new Date,
	            requiredFields = [
	                {
	                    name: 'kpv',
	                    type: 'D',
	                    min: now.setFullYear(now.getFullYear() - 1),
	                    max: now.setFullYear(now.getFullYear() + 1)
	                },
	                {name: 'selg', type: 'C'},
	                {name: 'summa', type: 'N'}
	            ],
	            warning = __webpack_require__(48)(this, requiredFields);
	        return warning;
	    },

	    componentDidMount: function () {
	        // пишем исходные данные в хранилище, регистрируем обработчики событий
	        let data = this.state.docData,
	            details = this.state.gridData,
	            gridConfig = this.state.gridConfig;

	        // сохраняем данные в хранилище
	        flux.doAction('dataChange', data);
	        flux.doAction('docIdChange', data.id);
	        flux.doAction('detailsChange', details); // данные грида
	        flux.doAction('gridConfigChange', gridConfig); // данные грида
	        flux.doAction('gridName', 'journal-grid-row'); // задаем имя компонента строки грида (для редактирования


	        // отслеживаем режим редактирования
	        docStore.on('change:edited', function(newValue, previousValue)  {
	            if (newValue !== previousValue) {
	                this.setState({edited: newValue});
	            }
	        }.bind(this));

	        // отслеживает изменения данных в гриде
	        /*
	         docStore.on('change:details', function (newValue, previousValue) {
	         console.log('event details changed');
	         if (JSON.stringify(newValue) !== JSON.stringify(previousValue) && typeof newValue == 'array') {
	         // итоги
	         let summa = newValue.reduce((sum, row) => sum + Number(row.summa),0), // сумма счета
	         kbm = newValue.reduce((sum, row) => sum + Number(row.kbm),0), // сумма налога
	         docData = self.state.docData;

	         docData.summa = summa;
	         docData.kbm = kbm;

	         self.setState({gridData: newValue, docData: docData});
	         }
	         });
	         */

	        // грузим справочники
	        flux.doAction('loadLibs', '');

	        if (data.id == 0) {
	            flux.doAction('editedChange', true);
	            flux.doAction('savedChange', false);
	        }

	        // формируем зависимости
	        relatedDocuments(this);

	    },

	    render: function () {
	        var data = this.state.docData,
	            isEditeMode = this.state.edited,
	            showMessageBox = this.state.showMessageBox; // будет управлять окном сообщений

	        //  pattern='[A-Za-z]{3}'
	//console.log('arve rendering:', data);
	        var gridData = this.state.gridData,
	            gridColumns = this.state.gridConfig;

	        return (
	            React.createElement(Form, {pages: this.pages, ref: "form", onSubmit: this.onSubmit, style: {display: 'table'}}, 
	                React.createElement(Toolbar, {validator: this.validation}), 
	                React.createElement("div", {className: "div-doc"}, 
	                    React.createElement(DocCommon, {data: data}), 
	                    React.createElement("div", {className: "fieldset"}, 
	                        React.createElement("ul", null, 
	                            React.createElement("li", null, 
	                                React.createElement(InputText, {className: "ui-c2", 
	                                           title: "Number", 
	                                           name: "number", 
	                                           value: data.number, 
	                                           disabled: "true", 
	                                           readOnly: true})
	                            ), 
	                            React.createElement("li", null, 
	                                React.createElement(InputDate, {className: "ui-c2", title: "Kuupäev ", name: "kpv", value: data.kpv, ref: "kpv", 
	                                           placeholder: "Kuupäev", readOnly: !isEditeMode})
	                            ), 

	                            React.createElement("li", null, React.createElement(Select, {className: "ui-c2", title: "Partner", name: "asutusid", libs: "asutused", 
	                                        value: data.asutusid, 
	                                        collId: "id", 
	                                        defaultValue: data.asutus, 
	                                        placeholder: "Partner", 
	                                        ref: "asutusid", 
	                                        readOnly: !isEditeMode})
	                            ), 
	                            React.createElement("li", null, React.createElement(InputText, {className: "ui-c2", title: "Dokument ", name: "dok", value: data.dok, 
	                                           placeholder: "Dokument", 
	                                           ref: "dok", readOnly: !isEditeMode})
	                            ), 
	                            React.createElement("li", null, React.createElement(TextArea, {className: "ui-c2", title: "Selgitus", name: "selg", placeholder: "Selgitus", 
	                                          ref: "selg", 
	                                          value: data.selg, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, React.createElement(DataGrid, {source: "details", gridData: gridData, gridColumns: gridColumns, 
	                                          handleGridRow: this.handleGridRow, 
	                                          readOnly: !isEditeMode, ref: "DataGrid"})), 
	                            React.createElement("li", null, React.createElement(InputText, {className: "ui-c2", title: "Summa: ", name: "summa", placeholder: "Summa", 
	                                           ref: "summa", 
	                                           value: data.summa, disabled: "true", 
	                                           pattern: "^[0-9]+(\\.[0-9]{1,4})?$"})), 
	                            /* патерн для цифр с 4 знаками после точки*/
	                            React.createElement("li", null, React.createElement(TextArea, {className: "ui-c2", title: "Märkused", name: "muud", placeholder: "Märkused", 
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
	        console.log('previos state gridData, docData', gridData, docData);

	        if (btnEvent == 'Ok') {
	            console.log(' modalPageClick data, gridRowId, gridRow', data, gridRowId, gridRow);
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

	            // заполним поля kood, nimetus
	            var libs = flux.stores.docStore.libs;
	            /*
	             nomLib = libs.filter((data) => {
	             if (data.id == 'nomenclature') {
	             return data;
	             }
	             });
	             */
	            /*

	             var   nomRow = nomLib[0].data.filter(function(row) {
	             if (row.id == Number(gridRow.nomid)) {
	             return row;
	             }
	             });

	             if (nomRow) {
	             gridRow['kood'] = nomRow[0].kood;
	             gridRow['nimetus'] = nomRow[0].name;
	             }
	             */
	            console.log('after state gridData %s, docData %s', gridData, docData);

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

	module.exports = Journal;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	var PageLabel = __webpack_require__(53);

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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(4),
	    ComponentInputDate = __webpack_require__(55),
	    flux = __webpack_require__(5);

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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(4);
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const DOCUMENT_CLOSED_STATUS = 2;

	const React = __webpack_require__(4),
	    DocButton = __webpack_require__(57),
	    flux = __webpack_require__(5);

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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4);

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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    InputText = __webpack_require__(34),
	    InputDateTime = __webpack_require__(19),
	    DocList = __webpack_require__(20);
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    ModalPage = __webpack_require__(29),
	    Select = __webpack_require__(33),
	    InputText = __webpack_require__(34),
	    InputNumber = __webpack_require__(35);


	var JournalGridRow = React.createClass({displayName: "JournalGridRow",
	    getInitialState: function () {
	//        console.log('ArvGridRow props', this.props);
	        return {
	            row: this.props.gridRowData, checked: false, warning:''
	        }
	    },

	    modalPageClick: function (btnEvent) {
	        var components = ['deebet', 'kreedit', 'summa', 'valuuta', 'kuurs', 'proj', 'tunnus'],
	            data = [];


	        if (btnEvent == 'Ok') {
	            // проверка
	            // собираем данные для отправки на обработку
	            components.map(function(component)  {
	                console.log('this.refs[component].state', this.refs[component].state);
	                var componentValue = this.refs[component].state.value;
	                if (component == 'deebet' || component == 'kreedit' || component == 'proj' || component == 'tunnus') {
	                    componentValue = this.refs[component].state.fieldValue;
	                }
	                data.push({name: component, value: componentValue});
	            }.bind(this))
	        }
	        this.props.modalPageClick(btnEvent, data);
	    },

	    handleChange: function (e, name) {
	        // отслеживаем изменения данных на форме
	        var value = e.target.value;
	/*
	        if (value !== this.state.row[name] && name == 'nomid') {
	            this.refs['kogus'].setState({value: 0.000});
	            this.refs['hind'].setState({value: 0.00});
	            this.refs['kbm'].setState({value: 0.00});
	            this.refs['kbmta'].setState({value: 0.00});
	            this.refs['summa'].setState({value: 0.00});
	        }
	*/
	        console.log('handleChange', value);
	        this.recalcRowSumm();

	    },

	    handleInput: function (value, name) {
	        // пересчет сумм
	        this.recalcRowSumm();

	    },

	    recalcRowSumm: function() {

	/*
	        var summa = Number(this.refs['summa'].state.value),
	            kuurs = Number(this.refs['kuurs'].state.value),
	            valsumma = summa * kuurs;
	        this.refs['valsumma'].setState({value: valsumma});
	*/
	 //       console.log('recalcRowSumm');

	//        this.validateForm();
	    },

	    validateForm: function() {
	        // will check values on the form and return string with warning
	        var warning = '';
	        // только после проверки формы на валидность
	/*
	        if (!this.refs['nomid'].state.value) warning =  warning + ' код услуги';
	        if (!this.refs['kogus'].state.value) warning =  warning + ' кол-во';
	        if (!this.refs['hind'].state.value) warning =  warning + ' цена';
	*/

	        if (warning.length > 2 ) {
	            // есть проблемы
	            warning = 'Отсутсвуют данные:' + warning;
	        }
	//        console.log('validateForm', warning);
	        this.setState({checked: true, warning: warning});
	    },
	    render: function () {

	        var row = this.state.row,
	            validateMessage = this.state.warning,
	            buttonOkReadOnly = validateMessage.length > 0 || !this.state.checked;

	        if (!row.valuuta) {
	            row.valuuta = 'EUR';
	            row.kuurs = 1;
	        }

	        buttonOkReadOnly = false; // todo костыль
	//        console.log('row render:',validateMessage, buttonOkReadOnly );
	/*
	        <Select title="Teenus" name='nomid' libs="nomenclature" readOnly={false}
	                value={row.nomid} defaultValue={row.kood} ref='nomid' placeholder='Teenuse kood'
	                onChange={this.handleChange}/>
	*/
	        return (
	            React.createElement("div", {className: "modalPage"}, 
	                React.createElement(ModalPage, {
	                    modalPageBtnClick: this.modalPageClick, 
	                    modalPageName: "Rea lisamine / parandamine"}, 

	                    React.createElement("div", null, 
	                        React.createElement("ul", null, 
	                            React.createElement("li", null, React.createElement(Select, {
	                                    title: "Deebet:", 
	                                    name: "deebet", 
	                                    libs: "kontod", 
	                                    readOnly: false, 
	                                    value: row.deebet, 
	                                    collId: "kood", 
	                                    ref: "deebet", 
	                                    placeholder: "Deebet", 
	                                    onChange: this.handleChange, 
	                                    className: "ui-c2"}
	                            )
	                            ), 
	                            React.createElement("li", null, React.createElement(Select, {
	                                title: "Kreedit:", 
	                                name: "kreedit", 
	                                libs: "kontod", 
	                                readOnly: false, 
	                                value: row.kreedit, 
	                                collId: "kood", 
	                                ref: "kreedit", 
	                                placeholder: "Kreedit", 
	                                onChange: this.handleChange, 
	                                className: "ui-c2"}
	                            )), 
	                            React.createElement("li", null, React.createElement(InputNumber, {
	                                title: "Summa: ", 
	                                name: "summa", 
	                                value: row.summa, 
	                                disabled: "false", 
	                                bindData: false, 
	                                ref: "summa", 
	                                onChange: this.handleChange, 
	                                className: "ui-c2"}
	                            )), 

	                            React.createElement("li", null, React.createElement(InputText, {
	                                title: "Valuuta: ", 
	                                name: "valuuta", 
	                                value: row.valuuta, 
	                                readOnly: false, 
	                                disabled: "false", 
	                                bindData: false, 
	                                ref: "valuuta", 
	                                className: "ui-c2"}
	                            )), 
	                            React.createElement("li", null, React.createElement(InputNumber, {
	                                title: "Kuurs: ", 
	                                name: "kuurs", 
	                                value: row.kuurs, 
	                                disabled: "false", 
	                                bindData: false, 
	                                ref: "kuurs", 
	                                onBlur: this.handleInput, 
	                                className: "ui-c2"}
	                            )), 
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
	                            React.createElement("li", null, React.createElement(Select, {
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

	module.exports = JournalGridRow;

	/*

	 <InputText title='Kood ' name='kood' value={row.kood} readOnly={false}
	 disabled="false" ref='kood' ></Input
	 Text>
	 */


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const Form = __webpack_require__(52),
	    PageLabel = __webpack_require__(53),
	    InputText = __webpack_require__(34),
	    InputDate = __webpack_require__(54),
	    InputNumber = __webpack_require__(35),
	    Toolbar = __webpack_require__(56),
	    DocCommon = __webpack_require__(58),
	    Select = __webpack_require__(33),
	    TextArea = __webpack_require__(59),
	    DataGrid = __webpack_require__(26),
	    GridRow = __webpack_require__(62);

	var docStore = __webpack_require__(50),
	    relatedDocuments = __webpack_require__(37),
	    validateForm = __webpack_require__(48);

	var now = new Date();

	const Sorder = React.createClass({displayName: "Sorder",
	    pages:  [{pageName: 'Sissetuliku kassaorder'}],
	    requiredFields:  [
	        {name: 'kpv', type: 'D', min: now.setFullYear(now.getFullYear() - 1), max: now.setFullYear(now.getFullYear() + 1)},
	        {name: 'asutusid', type: 'I'},
	        {name: 'nimi', type: 'C'},
	        {name: 'summa', type: 'N'}
	    ],
	/*
	    mixins: [relatedDocuments, validateForm],
	*/
	    relatedDocuments: function()  {
	        return relatedDocuments(this)
	    }.bind(this),

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

	/*
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
	*/

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
	                                React.createElement(InputDate, {className: "ui-c2", title: "Kuupäev ", name: "kpv", value: data.kpv, ref: "kpv", 
	                                           placeholder: "Kuupäev", readOnly: !isEditeMode})
	                            ), 
	                            React.createElement("li", null, React.createElement(Select, {className: "ui-c2", title: "Kassa", name: "kassa_id", libs: "aa", 
	                                        value: data.kassa_id, 
	                                        collId: "id", 
	                                        defaultValue: data.kassa, 
	                                        placeholder: "Kassa", 
	                                        ref: "kassa_id", 
	                                        readOnly: !isEditeMode})
	                            ), 

	                            React.createElement("li", null, React.createElement(Select, {className: "ui-c2", title: "Partner", name: "asutusid", libs: "asutused", 
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
	                                        libs: "arvedValja", 
	                                        value: data.arvid, 
	                                        collId: "id", 
	                                        defaultValue: data.arvnr, 
	                                        placeholder: "Arve nr.", 
	                                        ref: "arvid", 
	                                        btnDelete: true, 
	                                        readOnly: !isEditeMode})
	                            ), 

	                            React.createElement("li", null, React.createElement(InputText, {className: "ui-c2", title: "Dokument ", name: "dokument", value: data.dokument, 
	                                           placeholder: "Dokument", 
	                                           ref: "dokument", readOnly: !isEditeMode})
	                            ), 
	                            React.createElement("li", null, React.createElement(TextArea, {className: "ui-c2", title: "Nimi", name: "nimi", placeholder: "Nimi", 
	                                          ref: "nimi", 
	                                          value: data.aadress, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, React.createElement(TextArea, {className: "ui-c2", title: "Aadress", name: "aadress", placeholder: "Aadress", 
	                                          ref: "aadress", 
	                                          value: data.aadress, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, React.createElement(TextArea, {className: "ui-c2", title: "Alus", name: "alus", placeholder: "Alus", 
	                                          ref: "alus", 
	                                          value: data.alus, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, React.createElement(DataGrid, {source: "details", gridData: gridData, gridColumns: gridColumns, 
	                                          handleGridRow: this.handleGridRow, 
	                                          readOnly: !isEditeMode, ref: "DataGrid"})), 
	                            React.createElement("li", null, React.createElement(InputText, {className: "ui-c2", title: "Summa: ", name: "summa", placeholder: "Summa", 
	                                           ref: "summa", 
	                                           value: data.summa, disabled: "true", 
	                                           pattern: "^[0-9]+(\\.[0-9]{1,4})?$"})), 
	                            /* патерн для цифр с 4 знаками после точки*/
	                            React.createElement("li", null, React.createElement(TextArea, {className: "ui-c2", title: "Märkused", name: "muud", placeholder: "Märkused", 
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
	        console.log('previos state gridData, docData', gridData,  docData);

	        if (btnEvent == 'Ok') {
	            console.log(' modalPageClick data, gridRowId, gridRow', data, gridRowId, gridRow);
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

	module.exports = Sorder;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    ModalPage = __webpack_require__(29),
	    Select = __webpack_require__(33),
	    InputText = __webpack_require__(34),
	    InputNumber = __webpack_require__(35);

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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const Form = __webpack_require__(52),
	    PageLabel = __webpack_require__(53),
	    InputText = __webpack_require__(34),
	    InputDate = __webpack_require__(54),
	    InputNumber = __webpack_require__(35),
	    Toolbar = __webpack_require__(56),
	    DocCommon = __webpack_require__(58),
	    Select = __webpack_require__(33),
	    TextArea = __webpack_require__(59),
	    DataGrid = __webpack_require__(26),
	    GridRow = __webpack_require__(62);

	var docStore = __webpack_require__(50),
	    relatedDocuments = __webpack_require__(37),
	    validateForm = __webpack_require__(48);

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
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	const Form = __webpack_require__(52);
	const PageLabel = __webpack_require__(53);

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
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jLmpzIiwid2VicGFjazovLy8uL21pZGRsZXdhcmUvcmV0dXJuRG9jQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2Zvcm0vZm9ybS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9wYWdlLWxhYmVsL3BhZ2UtbGFiZWwuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvcGFnZS1sYWJlbC9wYWdlLWxhYmVsLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2Zvcm0vZm9ybS1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC10ZXh0L2lucHV0LXRleHQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtdGV4dC9pbnB1dC10ZXh0LXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2lucHV0LWRhdGUvaW5wdXQtZGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC1kYXRlL2lucHV0LWRhdGUtc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWNvbW1vbi9kb2MtY29tbW9uLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRldGltZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtbGlzdC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtY29tbW9uL2RvYy1jb21tb24tc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3RleHQtYXJlYS90ZXh0LWFyZWEuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvdGV4dC1hcmVhL3RleHQtYXJlYS1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtZGF0YS1ncmlkLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL215YnV0dG9uLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYXJ2LWdyaWQtcm93LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1zZWxlY3QuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWlucHV0LXRleHQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWlucHV0LW51bWJlci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2Nwcm9wL2RvY3Byb3AuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL21peGluL3JlbGF0ZWREb2N1bWVudHMuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLXRvb2xiYXIvZG9jLXRvb2xiYXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1zYXZlL2J1dHRvbi1yZWdpc3Rlci1zYXZlLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3Rhc2std2lkZ2V0L3Rhc2std2lkZ2V0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZXhlY3V0ZS9idXR0b24tcmVnaXN0ZXItZXhlY3V0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy90YXNrLXdpZGdldC90YXNrLXdpZGdldC1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvbWl4aW4vdmFsaWRhdGVGb3JtLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLnN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9zdG9yZXMvZG9jX3N0b3JlLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3Mvam91cm5hbC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9mb3JtLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvcGFnZV9sYWJlbC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRlLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2lucHV0LWRhdGUuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLXRvb2xiYXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWJ1dHRvbi5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtY29tbW9uLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0YXJlYS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9qb3VybmFsLWdyaWQtcm93LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kb2NzL3NvcmRlci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9zb3JkZXItZ3JpZC1yb3cuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3Mvdm9yZGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kb2NzL3BhbGtfb3Blci5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcbi8qXHJcbiAgICBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgZG9jQ29tcG9uZW50ID0gJyc7XHJcbiovXG5cbi8vINC00LDQvdC90YvQtSDQtNC70Y8g0YXRgNCw0L3QuNC70LjRidCwXG5sb2NhbFN0b3JhZ2VbJ2RvY1N0b3JlJ10gPSBzdG9yZURhdGE7XG5zdG9yZURhdGEgPSBKU09OLnBhcnNlKHN0b3JlRGF0YSk7XG5cbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1INC00LDQvdC90YVcbi8qXHJcbmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGF0YScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAvLyDQtNCw0L3QvdGL0LUg0LjQt9C80LXQvdC40LvQuNGB0YwsINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICBzZWxmLnNldFN0YXRlKHtkb2NEYXRhOmRvY1N0b3JlLmRhdGF9KVxyXG4gICAgfVxyXG59KVxyXG4qL1xuXG4vLyDQt9Cw0L/RgNC+0YHQuNC8INC60L7QvNC/0L7QvdC10L3RgiDQtNC+0LrRg9C80LXQvdGC0LAg0L/QviDQtdCz0L4g0YLQuNC/0YNcbnZhciBEb2MgPSByZXF1aXJlKCcuLi9taWRkbGV3YXJlL3JldHVybkRvY0NvbXBvbmVudCcpKHN0b3JlRGF0YS5kb2NUeXBlSWQpO1xuY29uc29sZS5sb2coJ3N0b3JlRGF0YTogRG9jJywgRG9jKTtcblxuUmVhY3RET00ucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jLCB7IGRhdGE6IHN0b3JlRGF0YS5kYXRhLCBicG06IHN0b3JlRGF0YS5icG0gfSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb2MnKSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2MuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkb2NUeXBlSWQpIHtcbiAgICAvLyDQstC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDRgtC40L/QsCDQtNC+0LrRg9C80LXQvdGC0LAg0LLQtdGA0L3QtdGCINC60L7QvNC/0L7QvdC10L3RgiDQtNC+0LrRg9C80LXQvdGC0LBcblxuICAgIGNvbnNvbGUubG9nKCdyZXR1cm5Eb2NDb21wb25lbnQ6JyArIGRvY1R5cGVJZCk7XG4gICAgdmFyIGNvbXBvbmVudCA9IHt9O1xuXG4gICAgc3dpdGNoIChkb2NUeXBlSWQpIHtcbiAgICAgICAgY2FzZSAnQVJWJzpcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLmpzeCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0pPVVJOQUwnOlxuICAgICAgICAgICAgY29tcG9uZW50ID0gcmVxdWlyZSgnLi4vZnJvbnRlbmQvZG9jcy9qb3VybmFsLmpzeCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1NPUkRFUic6XG4gICAgICAgICAgICBjb21wb25lbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL3NvcmRlci5qc3gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdWT1JERVInOlxuICAgICAgICAgICAgY29tcG9uZW50ID0gcmVxdWlyZSgnLi4vZnJvbnRlbmQvZG9jcy92b3JkZXIuanN4Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnUEFMSyc6XG4gICAgICAgICAgICBjb21wb25lbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL3BhbGtfb3Blci5qc3gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29tcG9uZW50ID0gcmVxdWlyZSgnLi4vZnJvbnRlbmQvZG9jcy9hcnZlL2FydmUuanN4Jyk7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbWlkZGxld2FyZS9yZXR1cm5Eb2NDb21wb25lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3RcclxuICAgIEZvcm0gPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Zvcm0vZm9ybS5qc3gnKSxcclxuICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgSW5wdXREYXRlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9pbnB1dC1kYXRlL2lucHV0LWRhdGUuanN4JyksXHJcbi8vICAgIElucHV0TnVtYmVyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtbnVtYmVyLmpzeCcpLFxyXG4vLyAgICBUb29sYmFyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtdG9vbGJhci5qc3gnKSxcclxuICAgIERvY0NvbW1vbiA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZG9jLWNvbW1vbi9kb2MtY29tbW9uLmpzeCcpLFxyXG4gICAgU2VsZWN0ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmpzeCcpLFxyXG4gICAgVGV4dEFyZWEgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3RleHQtYXJlYS90ZXh0LWFyZWEuanN4JyksXHJcbiAgICBEYXRhR3JpZCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZG9jLWRhdGEtZ3JpZC5qc3gnKSxcclxuICAgIEdyaWRSb3cgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Fydi1ncmlkLXJvdy5qc3gnKSxcclxuICAgIERva1Byb3AgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RvY3Byb3AvZG9jcHJvcC5qc3gnKSxcclxuICAgIHJlbGF0ZWREb2N1bWVudHMgPSByZXF1aXJlKCcuLi8uLi9taXhpbi9yZWxhdGVkRG9jdW1lbnRzLmpzeCcpLFxyXG4gICAgVG9vbGJhckNvbnRhaW5lciA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy90b29sYmFyLWNvbnRhaW5lci90b29sYmFyLWNvbnRhaW5lci5qc3gnKSxcclxuICAgIERvY1Rvb2xCYXIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvZG9jLXRvb2xiYXIvZG9jLXRvb2xiYXIuanN4JyksXHJcbiAgICB2YWxpZGF0ZUZvcm0gPSByZXF1aXJlKCcuLi8uLi9taXhpbi92YWxpZGF0ZUZvcm0nKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vYXJ2ZS5zdHlsZXMnKTtcclxuXHJcbmNvbnN0IExJQlJBUklFUyA9IFsnYXN1dHVzZWQnLCdrb250b2QnLCdkb2tQcm9wcycsJ3VzZXJzJywnYWEnLCd0dW5udXMnLCdwcm9qZWN0Jywnbm9tZW5jbGF0dXJlJ107XHJcblxyXG4vLyBDcmVhdGUgYSBzdG9yZVxyXG52YXIgZG9jU3RvcmUgPSByZXF1aXJlKCcuLi8uLi9zdG9yZXMvZG9jX3N0b3JlLmpzJyk7XHJcblxyXG52YXIgbm93ID0gbmV3IERhdGUoKTtcclxuXHJcbnZhciBfX19fQ2xhc3MxPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3MxX19fX0tleSBpbiBfX19fQ2xhc3MxKXtpZihfX19fQ2xhc3MxLmhhc093blByb3BlcnR5KF9fX19DbGFzczFfX19fS2V5KSl7QXJ2ZVtfX19fQ2xhc3MxX19fX0tleV09X19fX0NsYXNzMVtfX19fQ2xhc3MxX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczE9X19fX0NsYXNzMT09PW51bGw/bnVsbDpfX19fQ2xhc3MxLnByb3RvdHlwZTtBcnZlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3MxKTtBcnZlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1BcnZlO0FydmUuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzMTtcclxuICAgIGZ1bmN0aW9uIEFydmUocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3MxLmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZG9jRGF0YTogdGhpcy5wcm9wcy5kYXRhLnJvdyxcclxuICAgICAgICAgICAgZWRpdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd01lc3NhZ2VCb3g6ICdub25lJyxcclxuICAgICAgICAgICAgZ3JpZERhdGE6IHRoaXMucHJvcHMuZGF0YS5kZXRhaWxzLFxyXG4gICAgICAgICAgICByZWxhdGlvbnM6IHRoaXMucHJvcHMuZGF0YS5yZWxhdGlvbnMsXHJcbiAgICAgICAgICAgIGdyaWRDb25maWc6IHRoaXMucHJvcHMuZGF0YS5ncmlkQ29uZmlnLFxyXG4gICAgICAgICAgICBncmlkUm93RWRpdDogZmFsc2UsXHJcbiAgICAgICAgICAgIGdyaWRSb3dFdmVudDogbnVsbCxcclxuICAgICAgICAgICAgZ3JpZFJvd0RhdGE6IG51bGwsXHJcbiAgICAgICAgICAgIGxpYnM6IHtcclxuICAgICAgICAgICAgICAgIGFzdXR1c2VkOiBbXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wYWdlcyA9ICBbe3BhZ2VOYW1lOiAnQXJ2ZSd9XVxyXG4gICAgICAgIHRoaXMucmVxdWlyZWRGaWVsZHM9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2twdicsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnRCcsXHJcbiAgICAgICAgICAgICAgICBtaW46IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSAtIDEpLFxyXG4gICAgICAgICAgICAgICAgbWF4OiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgKyAxKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAndGFodGFlZycsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnRCcsXHJcbiAgICAgICAgICAgICAgICBtaW46IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSAtIDEpLFxyXG4gICAgICAgICAgICAgICAgbWF4OiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgKyAxKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7bmFtZTogJ2FzdXR1c2lkJywgdHlwZTogJ04nLCBtaW46IG51bGwsIG1heDogbnVsbH0sXHJcbiAgICAgICAgICAgIHtuYW1lOiAnc3VtbWEnLCB0eXBlOiAnTicsIG1pbjogLTk5OTk5OTksIG1heDogOTk5OTk5fVxyXG4gICAgICAgIF1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcInZhbGlkYXRpb25cIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbiggKSB7XHJcblxyXG4gICAgICAgIGxldCByZXF1aXJlZEZpZWxkcyA9IHRoaXMucmVxdWlyZWRGaWVsZHM7XHJcbiAgICAgICAgbGV0IHdhcm5pbmcgPSByZXF1aXJlKCcuLi8uLi9taXhpbi92YWxpZGF0ZUZvcm0nKSh0aGlzLCByZXF1aXJlZEZpZWxkcyk7XHJcbiAgICAgICAgcmV0dXJuIHdhcm5pbmc7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbE1vdW50XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5yZWxhdGVkRG9jdW1lbnRzKCk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiY29tcG9uZW50RGlkTW91bnRcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQv9C40YjQtdC8INC40YHRhdC+0LTQvdGL0LUg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtSwg0YDQtdCz0LjRgdGC0YDQuNGA0YPQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YHQvtCx0YvRgtC40LlcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIGRhdGEgPSBzZWxmLnByb3BzLmRhdGEucm93LFxyXG4gICAgICAgICAgICBkZXRhaWxzID0gc2VsZi5wcm9wcy5kYXRhLmRldGFpbHMsXHJcbiAgICAgICAgICAgIGdyaWRDb25maWcgPSBzZWxmLnByb3BzLmRhdGEuZ3JpZENvbmZpZztcclxuXHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGRldGFpbHMpOyAvLyDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRDb25maWdDaGFuZ2UnLCBncmlkQ29uZmlnKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkTmFtZUNoYW5nZScsICdhcnYtZ3JpZC1yb3cnKTsgLy8g0LfQsNC00LDQtdC8INC40LzRjyDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdGC0YDQvtC60Lgg0LPRgNC40LTQsCAo0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINCyINCz0YDQuNC00LVcclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRldGFpbHMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSkgJiYgdHlwZW9mIG5ld1ZhbHVlID09ICdhcnJheScpIHtcclxuICAgICAgICAgICAgICAgIC8vINC40YLQvtCz0LhcclxuICAgICAgICAgICAgICAgIGxldCBzdW1tYSA9IG5ld1ZhbHVlLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSk7fSwgMCksIC8vINGB0YPQvNC80LAg0YHRh9C10YLQsFxyXG4gICAgICAgICAgICAgICAgICAgIGtibSA9IG5ld1ZhbHVlLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5rYm0pO30sIDApLCAvLyDRgdGD0LzQvNCwINC90LDQu9C+0LPQsFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY0RhdGEgPSBzZWxmLnN0YXRlLmRvY0RhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jRGF0YS5zdW1tYSA9IHN1bW1hO1xyXG4gICAgICAgICAgICAgICAgZG9jRGF0YS5rYm0gPSBrYm07XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Z3JpZERhdGE6IG5ld1ZhbHVlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0LPRgNGD0LfQuNC8INGB0L/RgNCw0LLQvtGH0L3QuNC60LhcclxuICAgICAgICBMSUJSQVJJRVMuZm9yRWFjaChmdW5jdGlvbihsaWIpICB7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oXCJsb2FkTGlic1wiLGxpYik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINC10YHQu9C4INC90L7QstGL0Lkg0LTQvtC60YPQvNC10L3RgiAoaWQgPT0gMClcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuaWQgPT0gMCkge1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdlZGl0ZWRDaGFuZ2UnLCB0cnVlKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2F2ZWRDaGFuZ2UnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIGRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7ZWRpdGVkOiBuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY1N0b3JlLm9uKCdjaGFuZ2U6bGlicycsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSAge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUubGVuZ3RoID4gMCApIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaWJzID0gbmV3VmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlic0RhdGEgPSB0aGlzLnN0YXRlLmxpYnM7XHJcblxyXG4gICAgICAgICAgICAgICAgbGlicy5mb3JFYWNoKGZ1bmN0aW9uKGxpYikgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5saWJzW2xpYi5pZF0gJiYgbGliLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWJzRGF0YVtsaWIuaWRdID0gbGliLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2xpYnM6bGlic0RhdGF9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJyZWxhdGVkRG9jdW1lbnRzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oICkge1xyXG4gICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XHJcbiAgICAgICAgbGV0IHJlbGF0ZWREb2N1bWVudHMgPSB0aGlzLnN0YXRlLnJlbGF0aW9ucztcclxuICAgICAgICBpZiAocmVsYXRlZERvY3VtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJlbGF0ZWREb2N1bWVudHMuZm9yRWFjaChmdW5jdGlvbihkb2MpICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9jLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LjQvCDQvdCwINGD0L3QuNC60LDQu9GM0L3QvtGB0YLRjCDRgdC/0LjRgdC60LAg0LTQvtC60YPQvNC10L3RgtC+0LJcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXNFeGlzdHMgPSB0aGlzLnBhZ2VzLmZpbmQoZnVuY3Rpb24ocGFnZSkgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwYWdlLmRvY0lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFnZS5kb2NJZCA9PSBkb2MuaWQgJiYgcGFnZS5kb2NUeXBlSWQgPT0gZG9jLmRvY190eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNFeGlzdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LIg0LzQsNGB0YHQuNCy0LUg0L3QtdGCLCDQtNC+0LHQsNCy0LjQvCDRgdGB0YvQu9C60YMg0L3QsCDQtNC+0LrRg9C80LXQvdGCXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZXMucHVzaCh7ZG9jVHlwZUlkOiBkb2MuZG9jX3R5cGUsIGRvY0lkOiBkb2MuaWQsIHBhZ2VOYW1lOiBkb2MubmFtZSArICcgaWQ6JyArIGRvYy5pZH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0LfQsNCy0LjRgdC40LzQvtGB0YLQuFxyXG4gICAgICAgIHJlbGF0ZWREb2N1bWVudHModGhpcyk7XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5zdGF0ZS5kb2NEYXRhLFxyXG4gICAgICAgICAgICBpc0VkaXRlTW9kZSA9IHRoaXMuc3RhdGUuZWRpdGVkLFxyXG4gICAgICAgICAgICBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gdGhpcy5zdGF0ZS5ncmlkQ29uZmlnLFxyXG4gICAgICAgICAgICB0b29sYmFyUGFyYW1zID0gdGhpcy5wcmVwYWlyZVRvb2xCYXJQYXJhbWV0ZXJzKGlzRWRpdGVNb2RlKSxcclxuICAgICAgICAgICAgdmFsaWRhdGlvbk1lc3NhZ2UgPSB0aGlzLnZhbGlkYXRpb24oKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtLCB7cGFnZXM6IHRoaXMucGFnZXMsIHJlZjogXCJmb3JtXCIsIGhhbmRsZVBhZ2VDbGljazogdGhpcy5oYW5kbGVQYWdlQ2xpY2ssIGRpc2FibGVkOiBpc0VkaXRlTW9kZX0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyQ29udGFpbmVyLCB7cmVmOiBcInRvb2xiYXJDb250YWluZXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJkb2MtdG9vbGJhci13YXJuaW5nXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1lc3NhZ2UgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB2YWxpZGF0aW9uTWVzc2FnZSkgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEb2NUb29sQmFyLCB7YnBtOiBkYXRhLmJwbSwgZWRpdGVkOiBpc0VkaXRlTW9kZSwgZG9jU3RhdHVzOiBkYXRhLmRvY19zdGF0dXN9KVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5kb2N9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERvY0NvbW1vbiwge2RhdGE6IGRhdGEsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jQ29sdW1ufSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJOdW1iZXJcIiwgbmFtZTogXCJudW1iZXJcIiwgdmFsdWU6IGRhdGEubnVtYmVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dERhdGUsIHt0aXRsZTogXCJLdXVww6RldiBcIiwgbmFtZTogXCJrcHZcIiwgdmFsdWU6IGRhdGEua3B2LCByZWY6IFwia3B2XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLdXVww6RldlwiLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2V9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0RGF0ZSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJUw6RodGFlZyBcIiwgbmFtZTogXCJ0YWh0YWVnXCIsIHZhbHVlOiBkYXRhLnRhaHRhZWcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwidGFodGFlZ1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiVMOkaHRhZWdcIiwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkFzdXR1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhc3V0dXNpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliczogXCJhc3V0dXNlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5zdGF0ZS5saWJzWydhc3V0dXNlZCddLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuYXN1dHVzaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGRhdGEuYXN1dHVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiQXN1dHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYXN1dHVzaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ0bkRlbGV0ZTogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkxpc2EgXCIsIG5hbWU6IFwibGlzYVwiLCB2YWx1ZTogZGF0YS5saXNhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTGlzYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImxpc2FcIiwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jQ29sdW1ufSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERva1Byb3AsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJLb250ZWVyaW1pbmU6IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGF1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliczogXCJkb2tQcm9wc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmRva2xhdXNpZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGRhdGEuZG9rcHJvcCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLb250ZWVyaW1pbmVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZG9rbGF1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmRvY1Jvd30sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7dGl0bGU6IFwiTcOkcmt1c2VkXCIsIG5hbWU6IFwibXV1ZFwiLCBwbGFjZWhvbGRlcjogXCJNw6Rya3VzZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwibXV1ZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLm11dWQsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YUdyaWQsIHtzb3VyY2U6IFwiZGV0YWlsc1wiLCBncmlkRGF0YTogZ3JpZERhdGEsIGdyaWRDb2x1bW5zOiBncmlkQ29sdW1ucywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVHcmlkUm93OiB0aGlzLmhhbmRsZUdyaWRSb3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgcmVmOiBcIkRhdGFHcmlkXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZG9jUm93fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7dGl0bGU6IFwiU3VtbWEgXCIsIG5hbWU6IFwic3VtbWFcIiwgcGxhY2Vob2xkZXI6IFwiU3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnN1bW1hLCBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIl5bMC05XSsoXFxcXC5bMC05XXsxLDR9KT8kXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7dGl0bGU6IFwiS8OkaWJlbWFrcyBcIiwgbmFtZTogXCJrYm1cIiwgcGxhY2Vob2xkZXI6IFwiS8OkaWJlbWFrc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwia2JtXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcInRydWVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEua2JtLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCJeWzAtOV0rKFxcXFwuWzAtOV17MSw0fSk/JFwifSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmdyaWRSb3dFZGl0ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcmlkUm93LCB7bW9kYWxQYWdlQ2xpY2s6IHRoaXMubW9kYWxQYWdlQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkRXZlbnQ6IHRoaXMuc3RhdGUuZ3JpZFJvd0V2ZW50LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFJvd0RhdGE6IHRoaXMuc3RhdGUuZ3JpZFJvd0RhdGF9KSA6IG51bGxcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiaGFuZGxlR3JpZFJvd1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGdyaWRFdmVudCwgZGF0YSkge1xyXG4gICAgICAgIC8vINGD0L/RgNCw0LLQu9C10L3QuNC1INC80L7QtNCw0LvRjNC90YvQvCDQvtC60L3QvtC8XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IHRydWUsIGdyaWRSb3dFdmVudDogZ3JpZEV2ZW50LCBncmlkUm93RGF0YTogZGF0YX0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcIm1vZGFsUGFnZUNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oYnRuRXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAvLyDQvtGC0YDQsNCx0L7RgtCw0LXQvCBPayDQuNC3INC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwXHJcbiAgICAgICAgdmFyIGdyaWREYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGV0YWlscyxcclxuICAgICAgICAgICAgZG9jRGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIGdyaWRSb3dJZCA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRSb3dJZCxcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnMgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5ncmlkQ29uZmlnO1xyXG4gICAgICAgIHZhciBncmlkUm93ID0ge307XHJcblxyXG4gICAgICAgIGlmIChncmlkUm93SWQgPj0gMCkge1xyXG4gICAgICAgICAgICBncmlkUm93ID0gZ3JpZERhdGFbZ3JpZFJvd0lkXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIGlmIChncmlkUm93SWQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvdC+0LLQsNGPINC30LDQv9C40YHRjFxyXG4gICAgICAgICAgICAgICAgLy8g0YTQvtGA0LzQuNGA0YPQtdC8INC/0YPRgdGC0YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgICAgIGdyaWRSb3cgPSB7fTtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbJ2lkJ10gPSAnTkVXJyArIE1hdGgucmFuZG9tKCk7ICAvLyDQs9C10L3QtdGA0LjRgNGD0LXQvCDQvdC+0LLQvtC1INCY0JRcclxuICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oZmllbGQpICB7cmV0dXJuIGdyaWRSb3dbZmllbGRdID0gbnVsbDt9KTsgLy8g0YHQvtC30LTQsNC10Lwg0L/QvtC70Y8g0LIg0L7QsdGK0LXQutGC0LVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSAge3JldHVybiBncmlkUm93W2ZpZWxkLm5hbWVdID0gZmllbGQudmFsdWU7fSk7XHJcblxyXG4gICAgICAgICAgICAvLyDQt9Cw0L/QvtC70L3QuNC8INC/0L7Qu9GPIGtvb2QsIG5pbWV0dXNcclxuICAgICAgICAgICAgdmFyIGxpYnMgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5saWJzLFxyXG4gICAgICAgICAgICAgICAgbm9tTGliID0gbGlicy5maWx0ZXIoZnVuY3Rpb24oZGF0YSkgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5pZCA9PSAnbm9tZW5jbGF0dXJlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vINC/0L7RgdGC0LDQstC40Lwg0LfQvdCw0YfQtdC90LjQtSDQutC+0LQg0Lgg0L3QsNC80LXQvdC+0LLQsNC90LjQtSDQsiDQs9GA0LjQtFxyXG4gICAgICAgICAgICB2YXIgbm9tUm93ID0gbm9tTGliWzBdLmRhdGEuZmlsdGVyKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT0gTnVtYmVyKGdyaWRSb3cubm9taWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvdztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChub21Sb3cpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbJ2tvb2QnXSA9IG5vbVJvd1swXS5rb29kO1xyXG4gICAgICAgICAgICAgICAgZ3JpZFJvd1snbmltZXR1cyddID0gbm9tUm93WzBdLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChncmlkUm93SWQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YVtncmlkUm93SWRdID0gZ3JpZFJvdztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdyaWREYXRhLnB1c2goZ3JpZFJvdyk7IC8vINC00L7QsdCw0LLQu9GP0LXQvCDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRSb3dJZENoYW5nZScsIGdyaWREYXRhLmxlbmd0aCk7IC8vINC/0L7QvNC10YfQsNC10Lwg0L3QvtCy0YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINGB0YfQuNGC0LDQtdC8INC40YLQvtCz0LhcclxuXHJcbiAgICAgICAgdmFyIGRvY1N1bW1hID0gZ3JpZERhdGEucmVkdWNlKGZ1bmN0aW9uKHN1bSwgcm93KSAge3JldHVybiBzdW0gKyBOdW1iZXIocm93LnN1bW1hKTt9LCAwKSwgLy8g0YHRg9C80LzQsCDRgdGH0LXRgtCwXHJcbiAgICAgICAgICAgIGRvY0tibSA9IGdyaWREYXRhLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5rYm0pO30sIDApLCAvLyDRgdGD0LzQvNCwINC90LDQu9C+0LPQsFxyXG4gICAgICAgICAgICBkb2NLYm10YSA9IGRvY1N1bW1hIC0gZG9jS2JtO1xyXG5cclxuICAgICAgICBkb2NEYXRhLnN1bW1hID0gZG9jU3VtbWE7XHJcbiAgICAgICAgZG9jRGF0YS5rYm0gPSBkb2NLYm07XHJcbiAgICAgICAgZG9jRGF0YS5rYm10YSA9IGRvY0tibXRhO1xyXG5cclxuICAgICAgICB0aGlzLnJlZnNbJ0RhdGFHcmlkJ10ucmVwbGFjZVN0YXRlKHtncmlkRGF0YTogZ3JpZERhdGF9KTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtncmlkUm93RWRpdDogZmFsc2UsIGRvY0RhdGE6IGRvY0RhdGF9KTtcclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFydmUucHJvdG90eXBlLFwiaGFuZGxlUGFnZUNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24ocGFnZSkgIHtcclxuICAgICAgICBpZiAocGFnZS5kb2NJZCkge1xyXG4gICAgICAgICAgICB2YXIgdXJsID0gXCIvZG9jdW1lbnQvXCIgKyBwYWdlLmRvY1R5cGVJZCArIHBhZ2UuZG9jSWQ7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcImhhbmRsZVNlbGVjdFRhc2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgLy8g0LzQtdGC0L7QtCDQstGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LLRi9Cx0L7RgNC1INC30LDQtNCw0YfQuFxyXG4gICAgICAgIHZhciB0YXNrVmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJ2ZS5wcm90b3R5cGUsXCJoYW5kbGVJbnB1dENoYW5nZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGlucHV0TmFtZSwgaW5wdXRWYWx1ZSkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC40LfQvNC10L3QtdC90LjQuVxyXG4gICAgICAgIGxldCBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YTtcclxuICAgICAgICBkYXRhW2lucHV0TmFtZV0gPSBpbnB1dFZhbHVlO1xyXG4gICAgICAgIC8vINC30LDQtNCw0YLRjCDQvdC+0LLQvtC1INC30L3QsNGH0LXQvdC40LUg0L/QvtC70Y9cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnZlLnByb3RvdHlwZSxcInByZXBhaXJlVG9vbEJhclBhcmFtZXRlcnNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihpc0VkaXRNb2RlKSB7XHJcbiAgICAgICAgbGV0IHRvb2xiYXJQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGJ0bkFkZDoge1xyXG4gICAgICAgICAgICAgICAgc2hvdzogIWlzRWRpdE1vZGUsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogaXNFZGl0TW9kZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBidG5FZGl0OiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OiAhaXNFZGl0TW9kZSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0VkaXRNb2RlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJ0blByaW50OiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnRuU2F2ZToge1xyXG4gICAgICAgICAgICAgICAgc2hvdzogaXNFZGl0TW9kZSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRvb2xiYXJQYXJhbXM7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuXHJcblxyXG5JbnB1dERhdGUuUHJvcFR5cGVzID0ge1xyXG4gICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFydmU7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy9hcnZlL2FydmUuanN4XG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBQYWdlTGFiZWwgPSByZXF1aXJlKCcuLi9wYWdlLWxhYmVsL3BhZ2UtbGFiZWwuanN4JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2Zvcm0tc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzZz1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzZ19fX19LZXkgaW4gX19fX0NsYXNzZyl7aWYoX19fX0NsYXNzZy5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NnX19fX0tleSkpe0Zvcm1bX19fX0NsYXNzZ19fX19LZXldPV9fX19DbGFzc2dbX19fX0NsYXNzZ19fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NnPV9fX19DbGFzc2c9PT1udWxsP251bGw6X19fX0NsYXNzZy5wcm90b3R5cGU7Rm9ybS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzZyk7Rm9ybS5wcm90b3R5cGUuY29uc3RydWN0b3I9Rm9ybTtGb3JtLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc2c7XHJcbiAgICBmdW5jdGlvbiBGb3JtKHByb3BzKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgX19fX0NsYXNzZy5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHBhZ2VzOiB0aGlzLnByb3BzLnBhZ2VzXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhhbmRsZVBhZ2VDbGljayA9IHRoaXMuaGFuZGxlUGFnZUNsaWNrLmJpbmQodGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb3JtLnByb3RvdHlwZSxcImhhbmRsZVBhZ2VDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKHBhZ2UpIHtcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGFuZGxlUGFnZUNsaWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlUGFnZUNsaWNrKHBhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBsZXQgcGFnZXMgPSB0aGlzLnN0YXRlLnBhZ2VzO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgcGFnZXMubWFwKGZ1bmN0aW9uKHBhZ2UsIGlkeCkgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGFnZUxhYmVsLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGlkeCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IGlkeCA9PSAwID8gdHJ1ZTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlUGFnZUNsaWNrOiB0aGlzLmhhbmRsZVBhZ2VDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlOiBwYWdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ3BhZ2UtJyArIGlkeH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMucGFnZX0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcblxyXG47XHJcblxyXG5cclxuRm9ybS5Qcm9wVHlwZXMgPSB7XHJcbiAgICBwYWdlczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgaGFuZGxlUGFnZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuICAgIGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxyXG59XHJcblxyXG5cclxuRm9ybS5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2VcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9mb3JtL2Zvcm0uanN4XG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9wYWdlLWxhYmVsLXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzc289UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc29fX19fS2V5IGluIF9fX19DbGFzc28pe2lmKF9fX19DbGFzc28uaGFzT3duUHJvcGVydHkoX19fX0NsYXNzb19fX19LZXkpKXtQYWdlTGFiZWxbX19fX0NsYXNzb19fX19LZXldPV9fX19DbGFzc29bX19fX0NsYXNzb19fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NvPV9fX19DbGFzc289PT1udWxsP251bGw6X19fX0NsYXNzby5wcm90b3R5cGU7UGFnZUxhYmVsLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NvKTtQYWdlTGFiZWwucHJvdG90eXBlLmNvbnN0cnVjdG9yPVBhZ2VMYWJlbDtQYWdlTGFiZWwuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzbztcclxuICAgIGZ1bmN0aW9uIFBhZ2VMYWJlbChwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc28uY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZWRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQYWdlTGFiZWwucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2Rpc2FibGVkOiBuZXh0UHJvcHMuZGlzYWJsZWR9KTtcclxuICAgIH19KTtcclxuXHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFBhZ2VMYWJlbC5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0YHQvtCx0YvRgtC40LUg0LrQu9C40LosINC/0L7QtNCz0YDRg9C20LDQtdC8INGB0LLRj9C30LDQvdC90YvQuSDQtNC+0LrRg9C80LXQvdGCXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYWdlID0gdGhpcy5wcm9wcy5wYWdlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5oYW5kbGVQYWdlQ2xpY2spIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVQYWdlQ2xpY2socGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUGFnZUxhYmVsLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBwYWdlID0gdGhpcy5wcm9wcy5wYWdlLFxyXG4gICAgICAgICAgICBzdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sc3R5bGVzLnBhZ2VMYWJlbCwgdGhpcy5wcm9wcy5hY3RpdmUgID8ge2JhY2tncm91bmRDb2xvcjond2hpdGUnfToge30pXHJcblxyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge3N0eWxlOiBzdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5kaXNhYmxlZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICByZWY6IFwicGFnZUxhYmVsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDbGlja30sIFxyXG4gICAgICAgICAgICBwYWdlLnBhZ2VOYW1lXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG5cclxuXHJcblxyXG5QYWdlTGFiZWwuUHJvcFR5cGVzID0ge1xyXG4gICAgaGFuZGxlUGFnZUNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuICAgIHBhZ2U6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIGFjdGl2ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2xcclxufTtcclxuXHJcblxyXG5QYWdlTGFiZWwuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgYWN0aXZlOiB0cnVlXHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VMYWJlbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvcGFnZS1sYWJlbC9wYWdlLWxhYmVsLmpzeFxuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwYWdlTGFiZWw6IHtcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnM3B4JyxcbiAgICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHdoaXRlJyxcbiAgICAgICAgbWFyZ2luOiAnMnB4JyxcbiAgICAgICAgcGFkZGluZzogJzJweCAxMHB4IDJweCAxMHB4J1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3BhZ2UtbGFiZWwvcGFnZS1sYWJlbC1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcGFnZToge1xuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICczcHgnXG4gICAgfSxcbiAgICBpY29uczoge1xuICAgICAgICBhZGQ6ICdpbWFnZXMvaWNvbnMvYWRkLnBuZycsXG4gICAgICAgIGVkaXQ6ICdpbWFnZXMvaWNvbnMvZWRpdC5wbmcnLFxuICAgICAgICBkZWxldGU6ICdpbWFnZXMvaWNvbnMvZGVsZXRlLnBuZycsXG4gICAgICAgIGZpbHRlcjogJ2ltYWdlcy9pY29ucy9maWx0ZXIucG5nJyxcbiAgICAgICAgcHJpbnQ6ICdpbWFnZXMvaWNvbnMvcHJpbnQucG5nJyxcbiAgICAgICAgb2s6ICdpbWFnZXMvaWNvbnMvb2sucG5nJyxcbiAgICAgICAgY2FuY2VsOiAnaW1hZ2VzL2ljb25zL2NhbmNlbC5wbmcnXG4gICAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZm9ybS9mb3JtLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9pbnB1dC10ZXh0LXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzc2Y9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc2ZfX19fS2V5IGluIF9fX19DbGFzc2Ype2lmKF9fX19DbGFzc2YuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzZl9fX19LZXkpKXtJbnB1dFtfX19fQ2xhc3NmX19fX0tleV09X19fX0NsYXNzZltfX19fQ2xhc3NmX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2Y9X19fX0NsYXNzZj09PW51bGw/bnVsbDpfX19fQ2xhc3NmLnByb3RvdHlwZTtJbnB1dC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzZik7SW5wdXQucHJvdG90eXBlLmNvbnN0cnVjdG9yPUlucHV0O0lucHV0Ll9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc2Y7XHJcbiAgICBmdW5jdGlvbiBJbnB1dChwcm9wcykge1widXNlIHN0cmljdFwiO1xyXG4gICAgICAgIF9fX19DbGFzc2YuY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogcHJvcHMudmFsdWUsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiBwcm9wcy5yZWFkT25seSxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVkLFxyXG4gICAgICAgICAgICB2YWxpZDogcHJvcHMudmFsaWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0LnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV4dFByb3BzLnZhbHVlLCByZWFkT25seTpuZXh0UHJvcHMucmVhZE9ubHl9KVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dC5wcm90b3R5cGUsXCJvbkNoYW5nZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBsZXQgZmllbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMubmFtZSwgZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBsZXQgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICBpbnB1dFN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmlucHV0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy53aWR0aCA/IHt3aWR0aDogdGhpcy5wcm9wcy53aWR0aH0gOiB7fSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucmVhZE9ubHkgPyBzdHlsZXMucmVhZE9ubHkgOiB7fVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLndyYXBwZXJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7c3R5bGU6IHN0eWxlcy5sYWJlbCwgaHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lLCByZWY6IFwibGFiZWxcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGl0bGVcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJ0ZXh0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImlucHV0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogaW5wdXRTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMuc3RhdGUucmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMucHJvcHMucGF0dGVybiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICApKVxyXG4gICAgfX0pO1xyXG5cclxuXHJcbklucHV0LlByb3BUeXBlcyA9IHtcclxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgcmVhZE9ubHk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgZGlzYWJsZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgdmFsaWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgcGxhY2Vob2xkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBwYXR0ZXJuOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcclxufVxyXG5cclxuXHJcbklucHV0LmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHJlYWRPbmx5OiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHZhbGlkOiB0cnVlXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2lucHV0LXRleHQvaW5wdXQtdGV4dC5qc3hcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5wdXQ6IHtcbiAgICAgICAgd2lkdGg6ICc3MCUnLFxuICAgICAgICBtYXJnaW5MZWZ0OiAnNXB4J1xuICAgIH0sXG4gICAgZm9jdXNlZDoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdsaWdodGJsdWUnXG4gICAgfSxcbiAgICByZWFkT25seToge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRjNFRkVGJ1xuICAgIH0sXG4gICAgd3JhcHBlcjoge1xuICAgICAgICBtYXJnaW46ICc1cHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIHdpZHRoOiAnOTUlJ1xuICAgIH0sXG4gICAgbGFiZWw6IHtcbiAgICAgICAgd2lkdGg6ICczMCUnLFxuICAgICAgICBtYXJnaW46ICc1cHgnXG4gICAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtdGV4dC9pbnB1dC10ZXh0LXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2lucHV0LWRhdGUtc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzaD1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzaF9fX19LZXkgaW4gX19fX0NsYXNzaCl7aWYoX19fX0NsYXNzaC5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NoX19fX0tleSkpe0lucHV0RGF0ZVtfX19fQ2xhc3NoX19fX0tleV09X19fX0NsYXNzaFtfX19fQ2xhc3NoX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2g9X19fX0NsYXNzaD09PW51bGw/bnVsbDpfX19fQ2xhc3NoLnByb3RvdHlwZTtJbnB1dERhdGUucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2gpO0lucHV0RGF0ZS5wcm90b3R5cGUuY29uc3RydWN0b3I9SW5wdXREYXRlO0lucHV0RGF0ZS5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NoO1xyXG5cclxuICAgIGZ1bmN0aW9uIElucHV0RGF0ZShwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc2guY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICBnZXREZWZhdWx0UHJvcHMgKCkge1xyXG4gICAgIGxldCBkYXRlID0gbmV3IERhdGUoKSxcclxuICAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpLFxyXG4gICAgIGRheSA9IGRhdGUuZ2V0RGF0ZSgpLFxyXG4gICAgIG1heERhdGUgPSBuZXcgRGF0ZSh5ZWFyICsgMSwgbW9udGgsIGRheSksXHJcbiAgICAgcmVmSWQgPSAnSW5wdXREYXRlJyxcclxuICAgICBtaW5EYXRlID0gbmV3IERhdGUoeWVhciAtIDUsIG1vbnRoLCBkYXkpO1xyXG5cclxuICAgICByZXR1cm4ge1xyXG4gICAgIGJpbmREYXRhOiB0cnVlLFxyXG4gICAgIG1pbjogbWluRGF0ZSxcclxuICAgICBtYXg6IG1heERhdGUsXHJcbiAgICAgcmVhZE9ubHk6IGZhbHNlLFxyXG4gICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgIH07XHJcbiAgICAgfSxcclxuICAgICAqL1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dERhdGUucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBuZXh0UHJvcHMudmFsdWUsIHJlYWRPbmx5OiBuZXh0UHJvcHMucmVhZE9ubHl9KTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSW5wdXREYXRlLnByb3RvdHlwZSxcIm9uQ2hhbmdlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGxldCBmaWVsZFZhbHVlID0gZS50YXJnZXQudmFsdWUsXHJcbiAgICAgICAgICAgIHZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKGZpZWxkVmFsdWUpO1xyXG5cclxuICAgICAgICBpZiAoZmllbGRWYWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC30L3QsNGH0LXQvdC40LUg0L3Rg9C7LCDRgtC+INC/0YPRgdGC0Ywg0LHRg9C00LXRgiBudWxcclxuICAgICAgICAgICAgdmFsaWRhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmFsaWRhdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIC8vINC10YHQu9C4INC30LDQtNCw0L0g0L7QsdGA0LDQsdC+0YLRh9C40LosINCy0LXRgNC90LXQvCDQtdCz0L5cclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5wcm9wcy5uYW1lLCBmaWVsZFZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgLypcclxuICAgICBwcm9wVHlwZXM6IHtcclxuICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxuICAgICB9LFxyXG4gICAgICovXHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0RGF0ZS5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMubmFtZSxcclxuICAgICAgICAgICAgaW5wdXRTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5pbnB1dCxcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMud2lkdGggPyB7d2lkdGg6IHRoaXMucHJvcHMud2lkdGh9IDoge30sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJlYWRPbmx5ID8gc3R5bGVzLnJlYWRPbmx5IDoge31cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLndyYXBwZXJ9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtzdHlsZTogc3R5bGVzLmxhYmVsLCBodG1sRm9yOiB0aGlzLnByb3BzLm5hbWUsIHJlZjogXCJsYWJlbFwifSwgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnRpdGxlXHJcbiAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcImRhdGVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgcmVmOiBcImlucHV0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMuc3RhdGUucmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy5wcm9wcy5wYXR0ZXJuLCBcclxuICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgIG1pbjogdGhpcy5wcm9wcy5taW4sIFxyXG4gICAgICAgICAgICAgICAgICAgbWF4OiB0aGlzLnByb3BzLm1heCwgXHJcbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICkpXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0RGF0ZS5wcm90b3R5cGUsXCJ2YWxpZGF0ZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LAg0L3QsCDQvNC40L0gLCDQvNCw0YVcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5taW4gJiYgdGhpcy5wcm9wcy5tYXggJiYgdmFsdWUpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGVWYWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKGRhdGVWYWx1ZSA+IHRoaXMucHJvcHMubWluICYmIGRhdGVWYWx1ZSA8IHRoaXMucHJvcHMubWF4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuXHJcbklucHV0RGF0ZS5Qcm9wVHlwZXMgPSB7XHJcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdE9mKERhdGUpLFxyXG4gICAgbWluOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0T2YoRGF0ZSksXHJcbiAgICBtYXg6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RPZihEYXRlKSxcclxuICAgIHJlYWRPbmx5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIHZhbGlkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIHBhdHRlcm46IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xyXG5cclxufVxyXG5cclxuXHJcbklucHV0RGF0ZS5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICByZWFkT25seTogZmFsc2UsXHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICB2YWxpZDogdHJ1ZVxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dERhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2lucHV0LWRhdGUvaW5wdXQtZGF0ZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5wdXQ6IHtcbiAgICAgICAgd2lkdGg6ICc3MCUnXG4gICAgfSxcbiAgICBmb2N1c2VkOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Ymx1ZSdcbiAgICB9LFxuICAgIHJlYWRPbmx5OiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGM0VGRUYnXG4gICAgfSxcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIG1hcmdpbjogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgd2lkdGg6ICc5NSUnXG4gICAgfSxcbiAgICBsYWJlbDoge1xuICAgICAgICB3aWR0aDogJzMwJScsXG4gICAgICAgIG1hcmdpbjogJzVweCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC1kYXRlL2lucHV0LWRhdGUtc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgSW5wdXRUZXh0ID0gcmVxdWlyZSgnLi8uLi9pbnB1dC10ZXh0L2lucHV0LXRleHQuanN4JyksXHJcbiAgICBJbnB1dERhdGVUaW1lID0gcmVxdWlyZSgnLi8uLi9kb2MtaW5wdXQtZGF0ZXRpbWUuanN4JyksXHJcbiAgICBEb2NMaXN0ID0gcmVxdWlyZSgnLi8uLi9kb2MtaW5wdXQtbGlzdC5qc3gnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vZG9jLWNvbW1vbi1zdHlsZXMnKTtcclxuXHJcbnZhciBfX19fQ2xhc3NpPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NpX19fX0tleSBpbiBfX19fQ2xhc3NpKXtpZihfX19fQ2xhc3NpLmhhc093blByb3BlcnR5KF9fX19DbGFzc2lfX19fS2V5KSl7RG9jQ29tbW9uW19fX19DbGFzc2lfX19fS2V5XT1fX19fQ2xhc3NpW19fX19DbGFzc2lfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzaT1fX19fQ2xhc3NpPT09bnVsbD9udWxsOl9fX19DbGFzc2kucHJvdG90eXBlO0RvY0NvbW1vbi5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzaSk7RG9jQ29tbW9uLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1Eb2NDb21tb247RG9jQ29tbW9uLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc2k7XHJcbiAgICBmdW5jdGlvbiBEb2NDb21tb24ocHJvcHMpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBfX19fQ2xhc3NpLmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcmVhZE9ubHk6IHByb3BzLnJlYWRPbmx5LFxyXG4gICAgICAgICAgICBkYXRhOiB0aGlzLnByb3BzLmRhdGFcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERvY0NvbW1vbi5wcm90b3R5cGUsXCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmV4dFByb3BzKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgLy8g0L/RgNC4INC40LfQvNC10L3QtdC90LjQuCwg0L/QvtC80LXQvdGP0LXRgiDRgdC+0YHRgtC+0Y/QvdC40LUgKNC/0LXRgNC10LTQsNGB0YIg0LTQsNC70YzRiNC1INGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjylcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtyZWFkT25seTpuZXh0UHJvcHMucmVhZE9ubHkgfSlcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRG9jQ29tbW9uLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1widXNlIHN0cmljdFwiO1xyXG4vKlxyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5wcm9wcy5kYXRhLFxyXG4gICAgICAgICAgICBicG0gPSBkYXRhLmJwbSB8fCBbXSxcclxuICAgICAgICAgICAgYWN0dWFsU3RlcERhdGEgPSBicG0uZmlsdGVyKChzdGVwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDRgtC10LrRg9GJ0LjQuSDRiNCw0LMg0JHQn1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0ZXAuYWN0dWFsU3RlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGVwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgZXhlY3V0ZXJzID0gYWN0dWFsU3RlcERhdGEubWFwKChzdGVwRGF0YSk9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvdCw0LnQtNC10Lwg0LjRgdC/0L7Qu9C90LjRgtC10LvQtdC5XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RlcERhdGEuYWN0b3JzIHx8IHtuYW1lOiAnQVVUSE9SJ307XHJcbiAgICAgICAgICAgIH0pO1xyXG4qL1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtyZWY6IFwid3JhcHBlclwiLCBzdHlsZTogc3R5bGVzLndyYXBwZXJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7cmVmOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI3NSVcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7cmVmOiBcImNyZWF0ZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkNyZWF0ZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3JlYXRlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuY3JlYXRlZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcInRydWVcIiwgd2lkdGg6IFwiNzUlXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge3JlZjogXCJsYXN0dXBkYXRlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJVcGRhdGVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxhc3R1cGRhdGVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmxhc3R1cGRhdGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIHdpZHRoOiBcIjc1JVwifSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtyZWY6IFwic3RhdHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTdGF0dXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RhdHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5zdGF0dXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI3NSVcIn0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NDb21tb24ucHJvdG90eXBlLFwib25DaGFuZ2VIYW5kbGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oaW5wdXROYW1lLCBpbnB1dFZhbHVlKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LjQt9C80LXQvdC10L3QuNC5XHJcbiAgICAgICAgbGV0IGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG4gICAgICAgIGRhdGFbaW5wdXROYW1lXSA9IGlucHV0VmFsdWU7XHJcbiAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuICAgIH19KTtcclxuXHJcblxyXG5Eb2NDb21tb24uUHJvcFR5cGVzID0ge1xyXG4gICAgcmVhZE9ubHk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXHJcbn1cclxuXHJcbkRvY0NvbW1vbi5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICByZWFkT25seTogdHJ1ZVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERvY0NvbW1vbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWNvbW1vbi9kb2MtY29tbW9uLmpzeFxuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBJbnB1dERhdGVUaW1lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIklucHV0RGF0ZVRpbWVcIixcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSwgcmVhZE9ubHk6IHRydWUsIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkIHx8IHRydWV9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4vLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSBkb2NJZC4g0JXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSA9IDAgKNC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQv9C40YHRjCwg0YLQviDQv9GA0L7RgdGC0L4g0L7Rh9C40YLQutCwINC/0L7Qu9C10LksINC40L3QsNGH0LUg0L/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvRhVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdjb21wb25lbnRXaWxsTW91bnQnICsgdGhpcy5wcm9wcy5uYW1lKTtcclxuLypcclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGB0L7Qt9C00LDQvdC40LUg0L3QvtCy0L7Qs9C+INC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVtzZWxmLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTowfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOnZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuKi9cclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdvbiBjaGFuZ2U6ZWRpdGVkOicgKyBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGF0YScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gbmV3VmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyDQuNC30LzQtdC90LXQvdC40Y8g0LHRg9C00YPRgiDQvtGC0YDQsNC20LDRgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0YHQu9GD0YfQsNC1INC10YHQu9C4INGC0LDQutC40LUg0LXRgdGC0YxcclxuICAgICAgICB2YXIgcmV0dXJudmFsdWUgPSAobmV4dFN0YXRlLnZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlIHx8XHJcbiAgICAgICAgbmV4dFN0YXRlLnJlYWRPbmx5ICE9PSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8XHJcbiAgICAgICAgbmV4dFN0YXRlLmRpc2FibGVkICE9PSB0aGlzLnN0YXRlLmRpc2FibGVkKTtcclxuXHJcbiAvLyAgICAgICBjb25zb2xlLmxvZygndmFzdHVzOicgKyByZXR1cm52YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHJldHVybnZhbHVlO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25DaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgZmllbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlLFxyXG4gICAgICAgICAgICBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICBkYXRhW3RoaXMucHJvcHMubmFtZV0gPSBmaWVsZFZhbHVlO1xyXG5cclxuICAgICAgICAvLyDQt9Cw0LTQsNGC0Ywg0L3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INC/0L7Qu9GPXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwcm9wczonICsgSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcykpO1xyXG4gICAgICAgIHZhciBpbnB1dENsYXNzTmFtZSA9dGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dERpc2FibGVkID0gdGhpcy5zdGF0ZS5kaXNhYmxlZCxcclxuICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lO1xyXG5cclxuICAgICAgICAgaWYgKGlucHV0UmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgaW5wdXRDbGFzc05hbWUgPSBpbnB1dENsYXNzTmFtZSArICcgZG9jLWlucHV0LXJlYWRvbmx5JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbnB1dERpc2FibGVkID09ICd0cnVlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJkYXRldGltZS1sb2NhbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMucHJvcHMucGF0dGVybiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcImRhdGV0aW1lLWxvY2FsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGlucHV0Q2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogaW5wdXRSZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy5wcm9wcy5wYXR0ZXJuLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0RGF0ZVRpbWU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRldGltZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcblxyXG4gICAgTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJMaXN0XCIsXHJcbiAgICAgICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhLFxyXG4gICAgICAgICAgICAgICAgY2xpY2tlZDogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IFtdLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ015IGRlZmF1bHQgTGlzdCcsXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiAgY29tcG9uZW50V2lsbE1vdW50OiAoKT0+IHtcclxuICAgICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUgZG9jSWQuINCV0YHQu9C4INC30L3QsNGH0LXQvdC40LUgPSAwICjQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0L/QuNGB0YwsINGC0L4g0L/RgNC+0YHRgtC+INC+0YfQuNGC0LrQsCDQv9C+0LvQtdC5LCDQuNC90LDRh9C1INC/0L7QtNCz0YDRg9C30LrQsCDQtNCw0L3QvdGL0YVcclxuICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkb2NJZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgdmFyIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICB2YWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgLy8g0YHQvtCy0YvQuSDQtNC+0LrRg9C80LXQvdGCXHJcbiAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOiAwfSk7XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOiB2YWx1ZX0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZSwgZGlzYWJsZWQ6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpsaWJzJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgIHZhciB2YXN0dXMgPSBKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgICAvLyB3aWxsIHdhdGNoIGxpYnMgY2hhbmdlIChmcm9tIHNlcnZlcilcclxuICAgICAgICAgdmFyIGRhdGEgPSBuZXdWYWx1ZS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IHNlbGYucHJvcHMubGlicykge1xyXG4gICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICBzZWxmLnNldFN0YXRlKHtkYXRhOiBkYXRhWzBdLmRhdGF9KTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuICAgICAgICAgfSxcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgaGFuZGxlTGlDbGljazogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgY2xpY2tlZDogaW5kZXhcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIGhhbmRsZUNsaWNrQnRuRGVsZXRlRXhlY3V0b3I6IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuc3RhdGUuZGF0YTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xpc3QgYnRuIGRlbGV0ZScsIGluZGV4KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kbGVDbGlja0J0bkFkZEV4ZWN1dG9yOiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0YXRlLmRhdGE7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsaXN0IGJ0biBhZGQnLCBpbmRleCk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgICAgICAvLyDQv9GA0Lgg0LjQt9C80LXQvdC10L3QuNC4INGB0YDQtdC20LjQvNCwINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8sINC/0L7QvNC10L3Rj9C10YIg0YHQvtGB0YLQvtGP0L3QuNC1INCy0LjQtNC20LXRgtCwXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3JlYWRPbmx5Om5leHRQcm9wcy5yZWFkT25seSB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0YXRlLmRhdGEgfHwgW10sXHJcbiAgICAgICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICdkb2MtaW5wdXQgZm9ybS13aWRnZXQnLFxyXG4gICAgICAgICAgICAgICAgaW5wdXRSZWFkT25seSA9IHRoaXMuc3RhdGUucmVhZE9ubHkgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBPcHRpb25zID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIC8vINGB0L7Qt9C00LDQtNC40Lwg0YHQv9C40YHQvtC6INC30L3QsNGH0LXQvdC40LlcclxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBPcHRpb25zID0gZGF0YS5tYXAoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT0gJ2FycmF5Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmluZGV4ID09IGluZGV4ICYmICF0aGlzLnN0YXRlLnJlYWRPbmx5ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQstGL0LTQtdC70LjQvCDQsiDRgdC/0LjRgdC60LUg0LfQvdCw0YfQtdC90LjQtSwg0L/RgNC4INGD0YHQu9C+0LLQuNC4LCDRh9GC0L4g0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPINGN0YLQviDQv9C+0LfQstC+0LvRj9C10YJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lICsgJyBmb2N1c2VkJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogTWF0aC5yYW5kb20oKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUxpQ2xpY2suYmluZCh0aGlzLCBpbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgaXRlbS5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHdpZGdldCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHt3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJ319LCBcclxuICAgICAgICAgICAgICAgIE9wdGlvbnNcclxuICAgICAgICAgICAgKTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB7ZGlzcGxheTogXCJmbGV4XCJ9fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtzdHlsZToge3BhZGRpbmdSaWdodDogXCI1cHhcIn19LCBcIiBcIiwgdGhpcy5wcm9wcy50aXRsZSksIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucmVhZE9ubHkgPyBudWxsIDogUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcImJ1dHRvblwiLCB2YWx1ZTogXCIgQWRkIFwiLCBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrQnRuQWRkRXhlY3V0b3J9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5yZWFkT25seSA/IG51bGwgOiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwiYnV0dG9uXCIsIHZhbHVlOiBcIiBEZWxldGUgXCIsIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2tCdG5EZWxldGVFeGVjdXRvcn0pXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIHdpZGdldFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMaXN0O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWlucHV0LWxpc3QuanN4XG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHdyYXBwZXI6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LXN0YXJ0J1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1jb21tb24vZG9jLWNvbW1vbi1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL3NlbGVjdC1zdHlsZXMnKTtcclxuXHJcbi8vICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LXRleHQuanN4Jyk7XHJcblxyXG52YXIgX19fX0NsYXNzaj1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzal9fX19LZXkgaW4gX19fX0NsYXNzail7aWYoX19fX0NsYXNzai5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NqX19fX0tleSkpe1NlbGVjdFtfX19fQ2xhc3NqX19fX0tleV09X19fX0NsYXNzaltfX19fQ2xhc3NqX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2o9X19fX0NsYXNzaj09PW51bGw/bnVsbDpfX19fQ2xhc3NqLnByb3RvdHlwZTtTZWxlY3QucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2opO1NlbGVjdC5wcm90b3R5cGUuY29uc3RydWN0b3I9U2VsZWN0O1NlbGVjdC5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NqO1xyXG4gICAgZnVuY3Rpb24gU2VsZWN0KHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzai5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSAvKiDQt9C00LXRgdGMINC/0L4g0LfQvdCw0YfQtdC90LjRjiDQmNCUICovLFxyXG4gICAgICAgICAgICByZWFkT25seTogcHJvcHMucmVhZE9ubHksXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlZCxcclxuICAgICAgICAgICAgZGF0YTogcHJvcHMuZGF0YSxcclxuICAgICAgICAgICAgZmllbGRWYWx1ZTogcHJvcHMudmFsdWUgLyrQt9C00LXRgdGMINC/0L4g0LfQvdCw0YfQtdC90Lgg0L/QvtC70Y8gY29sbElkICovLFxyXG4gICAgICAgICAgICBidG5EZWxldGU6IHByb3BzLmJ0bkRlbGV0ZSAvKiDQtdGB0LvQuCDQuNGB0YLQuNC90YMsINGC0L4g0YDQuNGB0YPQtdC8INGA0Y/QtNC+0Lwg0LrQvdC+0L/QutGDINC00LvRjyDQvtGH0LjRgdGC0LrQuCDQt9C90LDRh9C10L3QuNGPKi9cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgdmFyIGxpYkRhdGEgPSBbXTtcclxuICAgICB2YXIgbGlicyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmxpYnMsXHJcbiAgICAgLy8g0LPRgNGD0LfQuNC8INC00LDQvdC90YvQtSDQuNC3INGF0YDQsNC90LjQu9C40YnQsFxyXG4gICAgIGRhdGEgPSBsaWJzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgIGlmIChpdGVtLmlkID09IHRoaXMucHJvcHMubGlicykge1xyXG4gICAgIHJldHVybiBpdGVtO1xyXG4gICAgIH1cclxuICAgICB9LCB0aGlzKSxcclxuICAgICBpZFZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZTsgLy8g0LTQu9GPINC/0YDQuNCy0Y/Qt9C60Lgg0LTQsNC90L3Ri9GFXHJcblxyXG4gICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCAmJiBkYXRhWzBdLmRhdGEpIHtcclxuICAgICBsaWJEYXRhID0gZGF0YVswXS5kYXRhO1xyXG4gICAgIH1cclxuXHJcbiAgICAgcmV0dXJuIHtcclxuICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSAvISog0LfQtNC10YHRjCDQv9C+INC30L3QsNGH0LXQvdC40Y4g0JjQlCAqIS8sXHJcbiAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksXHJcbiAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgZGF0YTogbGliRGF0YSB8fCBbXSxcclxuICAgICBmaWVsZFZhbHVlOiB0aGlzLnByb3BzLnZhbHVlIC8hKtC30LTQtdGB0Ywg0L/QviDQt9C90LDRh9C10L3QuCDQv9C+0LvRjyBjb2xsSWQgKiEvLFxyXG4gICAgIGJybkRlbGV0ZTogdGhpcy5wcm9wcy5idG5EZWxldGUgLyEqINC10YHQu9C4INC40YHRgtC40L3Rgywg0YLQviDRgNC40YHRg9C10Lwg0YDRj9C00L7QvCDQutC90L7Qv9C60YMg0LTQu9GPINC+0YfQuNGB0YLQutC4INC30L3QsNGH0LXQvdC40Y8qIS99O1xyXG4gICAgIH0sXHJcbiAgICAgKi9cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZWxlY3QucHJvdG90eXBlLFwiZmluZEZpZWxkVmFsdWVcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihkYXRhLCBjb2xsSWQsIHZhbHVlKSB7XHJcbiAgICAgICAgLy8g0L/RgNC40LLRj9C20LXRgiDQuiDQt9C90LDRh9C10L3RjiDQv9C+0LvRj1xyXG4gICAgICAgIC8vINC90LDQtNC+INC/0YDQuNCy0Y/Qt9Cw0YLRjCDQtNCw0L3QvdGL0LVcclxuICAgICAgICAvLyBrb29kIC0+IGlkXHJcbiAgICAgICAgbGV0IGlkID0gMDtcclxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24ocm93KSAge1xyXG4gICAgICAgICAgICBpZiAocm93W2NvbGxJZF0gPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlkID0gcm93LmlkO1xyXG4vLyAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogcm93LmlkLCBmaWVsZFZhbHVlOiByb3dbY29sbElkXX0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLCB0aGlzKTtcclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdC5wcm90b3R5cGUsXCJnZXRWYWx1ZUJ5SWRcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihjb2xsSWQsIHJvd0lkKSB7XHJcbiAgICAgICAgLy8g0LLQtdGA0L3QtdGCINC30L3QsNGH0LXQvdC40Y8g0L/QvtC70Y8g0L/QviDQstGL0LHRgNCw0L3QvdC+0LzRgyDQmNCUXHJcblxyXG4gICAgICAgIGxldCBmaWVsZFZhbHVlLFxyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhO1xyXG5cclxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24ocm93KSAge1xyXG4gICAgICAgICAgICBpZiAocm93WydpZCddID09IHJvd0lkKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlID0gcm93W2NvbGxJZF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmaWVsZFZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMpO1xyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2VsZWN0LnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgdmFsdWU6IG5leHRQcm9wcy52YWx1ZSxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IG5leHRQcm9wcy5yZWFkT25seSwgZGF0YTogbmV4dFByb3BzLmRhdGFcclxuICAgICAgICB9KTtcclxuICAgIH19KTtcclxuXHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdC5wcm90b3R5cGUsXCJjb21wb25lbnREaWRNb3VudFwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNvbGxJZCAmJiB0aGlzLnByb3BzLmNvbGxJZCAhPT0gJ2lkJykge1xyXG4gICAgICAgICAgICAvLyDQuNGJ0LXQvCDQmNCUINC/0L4g0LfQvdCw0YfQtdC90LjRjiDQv9C+0LvRj1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZFZhbHVlKHRoaXMuc3RhdGUuZGF0YSwgdGhpcy5wcm9wcy5jb2xsSWQsIHRoaXMucHJvcHMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2VsZWN0LnByb3RvdHlwZSxcIm9uQ2hhbmdlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGxldCBmaWVsZFZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcbi8qXHJcbiAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICBwcm9wVmFsdWUgPSBkYXRhW3RoaXMucHJvcHMubmFtZV07XHJcbiovXHJcblxyXG4gICAgICAgIGlmIChmaWVsZFZhbHVlID09ICcnKSB7XHJcbiAgICAgICAgICAgIGZpZWxkVmFsdWUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0L3QsNC50LTQtdC8INC/0L4g0LjQtCDQt9C90LDRh9C10L3QuNC1INC/0L7Qu9GPINCyIGNvbGxJZFxyXG4gICAgICAgIHRoaXMuZ2V0VmFsdWVCeUlkKHRoaXMucHJvcHMuY29sbElkLCBmaWVsZFZhbHVlKTtcclxuICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INC40LQg0LrQsNC6IHZhbHVlXHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbi8qXHJcblxyXG4gICAgICAgIGlmIChwcm9wVmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQv9GA0LjQstGP0LfQutCwINC6INC00LDQvdC90YvQvFxyXG4gICAgICAgICAgICAvLyDQv9C+0LvRg9GH0LjRgtGMINC30L3QsNGH0LXQvdC40LVcclxuICAgICAgICAgICAgZGF0YVt0aGlzLnByb3BzLm5hbWVdID0gZmllbGRWYWx1ZTtcclxuICAgICAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcbiAgICAgICAgfVxyXG4qL1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAvLyDRgdC80L7RgtGA0LjQvCDQuiDRh9C10LzRgyDQv9GA0LjQstGP0LfQsNC9INGB0LXQu9C10LrRgiDQuCDQvtGC0LTQsNC40Lwg0LXQs9C+INC90LDQstC10YDRhVxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMucHJvcHMubmFtZSwgZmllbGRWYWx1ZSk7IC8vINCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDQt9Cw0LTQsNC9INC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0LLQtdGA0YXQvdC10Lwg0YPRgNC+0LLQvdC1LCDQvtGC0LTQsNC00LjQvCDQvtCx0YDQsNCx0L7RgtC60YMg0YLRg9C00LBcclxuICAgICAgICB9XHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZWxlY3QucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGRhdGFPcHRpb25zID0gdGhpcy5zdGF0ZS5kYXRhIHx8IFtdLFxyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICBPcHRpb25zID0gbnVsbCxcclxuICAgICAgICAgICAgaW5wdXREZWZhdWx0VmFsdWUgPSB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZTsgLy8g0JTQsNC00LjQvCDQtNC10YTQvtC70YLQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQtNC70Y8g0LLQuNC00LbQtdGC0LAsINGH0YLQvtCxINC/0L7QutCw0YLRjCDQtdCz0L4g0YHRgNCw0LfRgywg0LTQviDQv9C+0LTQs9GA0YPQt9C60Lgg0LHQuNCx0LvQuNC+0YLQtdC60LhcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnZhbHVlKSB7IC8vINC00L7QsdCw0LLQuNC8INC/0YPRgdGC0YPRjiDRgdGC0YDQvtC60YMg0LIg0LzQsNGB0YHQuNCyXHJcbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsNC70LjRh9C40LUg0L/Rg9GB0YLQvtC5INGB0YLRgNC+0LrQuCDQsiDQvNCw0YHRgdC40LLQtVxyXG5cclxuICAgICAgICAgICAgbGV0IGVtcHR5T2JqID0gZGF0YU9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKG9iaikgIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmouaWQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZW1wdHlPYmogfHwgZW1wdHlPYmoubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGRhdGFPcHRpb25zLnNwbGljZSgwLCAwLCB7aWQ6IDAsIGtvb2Q6ICcnLCBuYW1lOiAnJ30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGF0YVZhbHVlID0gZGF0YU9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pICB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmlkID09IHRoaXMuc3RhdGUudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLCB0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGFPcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBPcHRpb25zID0gZGF0YU9wdGlvbnMubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSAge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PSAnYXJyYXknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1bMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gJ29wdGlvbi0nICsgaW5kZXg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IGl0ZW0uaWQsIGtleToga2V5LCByZWY6IGtleX0sIFwiIFwiLCBpdGVtLm5hbWUsIFwiIFwiKVxyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICAgICAgaW5wdXREZWZhdWx0VmFsdWUgPSBkYXRhVmFsdWUubGVuZ3RoID4gMCA/IGRhdGFWYWx1ZVswXS5uYW1lIDogdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgT3B0aW9ucyA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiAwLCBrZXk6IE1hdGgucmFuZG9tKCl9LCBcIiBFbXB0eSBcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIGxldCB3aWRnZXQgPSA8c2VsZWN0IHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cclxuICAgICAgICAgc3R5bGU9e3t3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJ319PntPcHRpb25zfVxyXG4gICAgICAgICA8L3NlbGVjdD47IC8vINC10YHQu9C4INC00LvRjyDQs9GA0LjQtNCwLCDQvtGB0YLQsNCy0LjQvCDRgtC+0LvRjNC60L4g0YHQtdC70LXQutGCXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIGxldCBpbnB1dFN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmlucHV0LCBpbnB1dFJlYWRPbmx5ID8ge30gOiBzdHlsZXMuaGlkZSxcclxuICAgICAgICAgICAgaW5wdXRSZWFkT25seSA/IHN0eWxlcy5yZWFkT25seToge30pLFxyXG4gICAgICAgICAgICBzZWxlY3RTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5zZWxlY3QsIGlucHV0UmVhZE9ubHkgPyBzdHlsZXMuaGlkZSA6IHt9LCBpbnB1dFJlYWRPbmx5ID8gc3R5bGVzLnJlYWRPbmx5OiB7fSksXHJcbiAgICAgICAgICAgIGJ1dHRvblN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmJ1dHRvbiwgdGhpcy5wcm9wcy5idG5EZWxldGUgPyB7fSA6IHN0eWxlcy5oaWRlKVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLndyYXBwZXIsIHJlZjogXCJ3cmFwcGVyXCJ9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtyZWY6IFwibGFiZWxcIiwgc3R5bGU6IHN0eWxlcy5sYWJlbCwgXHJcbiAgICAgICAgICAgICAgICAgICBodG1sRm9yOiB0aGlzLnByb3BzLm5hbWV9LCB0aGlzLnByb3BzLnRpdGxlXHJcbiAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcInRleHRcIiwgaWQ6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICBzdHlsZTogaW5wdXRTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICByZWY6IFwiaW5wdXRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICB2YWx1ZTogaW5wdXREZWZhdWx0VmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRydWV9KSwgXHJcblxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHtyZWY6IFwic2VsZWN0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBzZWxlY3RTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlfSwgT3B0aW9uc1xyXG4gICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7cmVmOiBcImJ1dHRvblwiLCBcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzEtYnV0dG9uXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuYnRuRGVsQ2xpY2t9LCBcbiAgICAgICAgICAgICAgICBcIkRlbGV0ZVwiXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKSlcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2VsZWN0LnByb3RvdHlwZSxcImJ0bkRlbENsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAvLyDQv9C+INCy0YvQt9C+0LLRgyDQutC90L7Qv9C60YMg0YPQtNCw0LvQuNGC0YwsINC+0LHQvdGD0LvRj9C10YIg0LfQvdCw0YfQtdC90LjQtVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBudWxsfSk7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZShldmVudCk7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuU2VsZWN0LlByb3BUeXBlcyA9IHtcclxuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcclxuICAgIHJlYWRPbmx5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIGJ0bkRlbGV0ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBsaWJzOlJlYWN0LlByb3BUeXBlcy5zdHJpbmdcclxufVxyXG5cclxuU2VsZWN0LmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHJlYWRPbmx5OiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHZhbGlkOiB0cnVlLFxyXG4gICAgYnRuRGVsZXRlOiBmYWxzZVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuanN4XG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHdyYXBwZXI6IHtcbiAgICAgICAgbWFyZ2luOiAnNXB4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICB3aWR0aDogJzk1JSdcblxuICAgIH0sXG4gICAgaW5wdXQ6IHtcbiAgICAgICAgd2lkdGg6ICc2MCUnLFxuICAgICAgICBtYXJnaW5MZWZ0OiAnMTBweCdcbiAgICB9LFxuICAgIGhpZGU6IHtcbiAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSxcbiAgICBzZWxlY3Q6IHtcbiAgICAgICAgd2lkdGg6ICc2MCUnLFxuICAgICAgICBtYXJnaW46ICc1cHgnXG4gICAgfSxcbiAgICByZWFkT25seToge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRjNFRkVGJ1xuICAgIH0sXG4gICAgbGFiZWw6IHtcbiAgICAgICAgd2lkdGg6ICc0MCUnLFxuICAgICAgICBtYXJnaW46ICc1cHgnXG4gICAgfVxuXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi90ZXh0LWFyZWEtc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzaz1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNza19fX19LZXkgaW4gX19fX0NsYXNzayl7aWYoX19fX0NsYXNzay5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NrX19fX0tleSkpe0lucHV0W19fX19DbGFzc2tfX19fS2V5XT1fX19fQ2xhc3NrW19fX19DbGFzc2tfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzaz1fX19fQ2xhc3NrPT09bnVsbD9udWxsOl9fX19DbGFzc2sucHJvdG90eXBlO0lucHV0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NrKTtJbnB1dC5wcm90b3R5cGUuY29uc3RydWN0b3I9SW5wdXQ7SW5wdXQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzaztcclxuICAgIGZ1bmN0aW9uIElucHV0KHByb3BzKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgX19fX0NsYXNzay5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLCByZWFkT25seTogdHJ1ZSwgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdHJ1ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgcmV0dXJuIHtcclxuICAgICBuYW1lOiAnZGVmYXVsTmFtZScsXHJcbiAgICAgY2xhc3NOYW1lOiAnZG9jLWlucHV0JyxcclxuICAgICBwbGFjZWhvbGRlcjogJ2RlZmF1bE5hbWUnLFxyXG4gICAgIHRpdGxlOiAnJ1xyXG4gICAgIH1cclxuICAgICB9LFxyXG4gICAgICovXHJcblxyXG4gICAgLypcclxuICAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAvLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSBkb2NJZC4g0JXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSA9IDAgKNC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQv9C40YHRjCwg0YLQviDQv9GA0L7RgdGC0L4g0L7Rh9C40YLQutCwINC/0L7Qu9C10LksINC40L3QsNGH0LUg0L/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvRhVxyXG4gICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZG9jSWQnLCAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpPT4ge1xyXG4gICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YHQvtC30LTQsNC90LjQtSDQvdC+0LLQvtCz0L4g0LTQvtC60YPQvNC10L3RgtCwXHJcbiAgICAgbGV0IGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgIHZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG4gICAgIGlmIChuZXdWYWx1ZSA9PSAwKSB7XHJcbiAgICAgLy8g0YHQvtCy0YvQuSDQtNC+0LrRg9C80LXQvdGCXHJcbiAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6MH0pO1xyXG4gICAgIH0gZWxzZSB7XHJcbiAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6dmFsdWV9KTtcclxuICAgICB9XHJcbiAgICAgfVxyXG4gICAgIH0pO1xyXG4gICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKT0+IHtcclxuICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUgKSB7XHJcbiAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZX0pO1xyXG4gICAgIH1cclxuICAgICB9KTtcclxuICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpPT4ge1xyXG4gICAgIC8vINGB0LvRg9GI0YPQtdC8INC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YU7XHJcbiAgICAgaWYgKEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSkpIHtcclxuICAgICBsZXQgZGF0YSA9IG5ld1ZhbHVlLFxyXG4gICAgIGZpZWxkVmFsdWUgPSBkYXRhW3RoaXMucHJvcHMubmFtZV07XHJcbiAgICAgaWYgKGRhdGFbdGhpcy5wcm9wcy5uYW1lXSkge1xyXG4gICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgfVxyXG4gICAgIH1cclxuICAgICB9KTtcclxuXHJcbiAgICAgfSxcclxuICAgICAqL1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbnB1dC5wcm90b3R5cGUsXCJvbkNoYW5nZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBsZXQgZmllbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4vLyAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5wcm9wcy5uYW1lLCBmaWVsZFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElucHV0LnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV4dFByb3BzLnZhbHVlfSlcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSW5wdXQucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgY29uc3QgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICBpbnB1dFN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmlucHV0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy53aWR0aCA/IHt3aWR0aDogdGhpcy5wcm9wcy53aWR0aH0gOiB7fSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucmVhZE9ubHkgPyBzdHlsZXMucmVhZE9ubHkgOiB7fVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLndyYXBwZXJ9LCBcclxuXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge2h0bWxGb3I6IHRoaXMucHJvcHMubmFtZSwgcmVmOiBcImxhYmVsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBzdHlsZXMubGFiZWx9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogaW5wdXRTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVmOiBcImlucHV0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSlcclxuICAgIH19KTtcclxuXHJcblxyXG47XHJcblxyXG5JbnB1dC5Qcm9wVHlwZXMgPSB7XHJcbiAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHJlYWRPbmx5OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIGRpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIHZhbGlkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIHBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcclxufVxyXG5cclxuSW5wdXQuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgcmVhZE9ubHk6IGZhbHNlLFxyXG4gICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICB2YWxpZDogdHJ1ZVxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvdGV4dC1hcmVhL3RleHQtYXJlYS5qc3hcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5wdXQ6IHtcbiAgICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgIH0sXG4gICAgZm9jdXNlZDoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdsaWdodGJsdWUnXG4gICAgfSxcbiAgICByZWFkT25seToge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRjNFRkVGJ1xuICAgIH0sXG4gICAgd3JhcHBlcjoge1xuICAgICAgICBtYXJnaW46ICc1cHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIHdpZHRoOiAnOTglJyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbidcbiAgICB9LFxuICAgIGxhYmVsOiB7XG4gICAgICAgIG1hcmdpbjogJzVweCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy90ZXh0LWFyZWEvdGV4dC1hcmVhLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBHcmlkQnV0dG9uID0gcmVxdWlyZSgnLi9teWJ1dHRvbicpO1xyXG5cclxudmFyIE15Q2VsbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJNeUNlbGxcIixcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLCBlZGl0YWJsZTogZmFsc2UsIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5LCBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZX0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmdyaWRDZWxsRWRpdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10YIg0LzQvtC80LXQvdGCINC/0LXRgNC10YXQvtC00LAg0L3QsCDQtNGA0YPQs9GD0Y4g0Y/Rh9C10LnQutGDXHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gc2VsZi5wcm9wcy5pZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNlbGwgPSBzZWxmLnJlZnNbJ2NlbGwtJyArIHNlbGYucHJvcHMuaWRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtlZGl0YWJsZTogZmFsc2V9KTsgLy8g0YPQsdC40YDQsNC10Lwg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZSxcclxuICAgICAgICAgICAgICAgIGdyaWREYXRhID0gZXZhbCgnZGF0YS4nICsgc2VsZi5wcm9wcy5ncmlkRGF0YVNvdXJjZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSAmJiBncmlkRGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtyZWFkT25seTogIW5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVDbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9ICF0aGlzLnN0YXRlLmVkaXRhYmxlO1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQvtGC0LDQtdC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkQ2VsbEVkaXRlZENoYW5nZScsIHRoaXMucHJvcHMuaWQpOyAvLyDQt9Cw0LrRgNC+0LXQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNC1INCyINC00YDRg9Cz0LjRhSDRj9GH0LXQudC60LDRhVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRhYmxlOiB2YWx1ZX0pO1xyXG4gICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdjZWxsIGNsaWNrJyArIHZhbHVlICsgJyBpZDonICsgdGhpcy5wcm9wcy5pZCArICdyZWFkT25seTonICsgdGhpcy5zdGF0ZS5yZWFkT25seSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGUsIGJpbmRUb0NlbGwpIHtcclxuICAgICAgICAvLyDQvtGC0YDQsNCx0LDRgtGL0LLQsNC10YIg0LjQt9C80LXQvdC10L3QuNC1INGB0L7RgdGC0L7Rj9C90LjRjyDRj9GH0LXQudC60Lgg0Lgg0L/QuNGI0LXRgiDQsiDRhdGA0LDQvdC40LvRidC1XHJcbiAgICAgICAgdmFyIHZhbHVlID0gZS50YXJnZXQudmFsdWUsXHJcbiAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZSxcclxuICAgICAgICAgICAgZ3JpZERhdGEgPSBldmFsKCdkYXRhLicgKyB0aGlzLnByb3BzLmdyaWREYXRhU291cmNlKSB8fCBbXSxcclxuICAgICAgICAgICAgY2VsbE5hbWUgPSBiaW5kVG9DZWxsID8gYmluZFRvQ2VsbCA6IHRoaXMucHJvcHMuc291cmNlO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuXHJcbiAgICAgICAgLy8g0L/QuNGI0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgaWYgKGdyaWREYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGNlbGxWYWx1ZSA9IGdyaWREYXRhW3RoaXMucHJvcHMucm93SWRdW2NlbGxOYW1lXTtcclxuXHJcbiAgICAgICAgICAgIGdyaWREYXRhW3RoaXMucHJvcHMucm93SWRdW2NlbGxOYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkQ2VsbEVkaXRlZENoYW5nZScsIHRoaXMucHJvcHMuaWQpOyAvLyDQt9Cw0LrRgNC+0LXQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNC1INCyINC00YDRg9Cz0LjRhSDRj9GH0LXQudC60LDRhVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUtleVByZXNzOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcclxuICAgICAgICBpZiAoa2V5ID09IDEzKSB7XHJcbiAgICAgICAgICAgIC8vINCy0YvRhdC+0LTQuNC8INC40Lcg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0YWJsZTogZmFsc2V9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGlzRWRpdCA9IChmbHV4LnN0b3Jlcy5kb2NTdG9yZS5lZGl0ZWQgJiYgIXRoaXMuc3RhdGUuZGlzYWJsZWQpID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBjZWxsID0gdGhpcy5wcm9wcy5jZWxsLCAvLyDQv9Cw0YDQsNC80LXRgtGA0Ysg0Y/Rh9C10LnQutC4XHJcbiAgICAgICAgICAgIGlzUmVhZE9ubHkgPSAhZmx1eC5zdG9yZXMuZG9jU3RvcmUuZWRpdGVkLFxyXG4vLyAgICAgICAgICAgIGNlbGxUeXBlID0gY2VsbC50eXBlIHx8ICdzcGFuJzsgLy8g0L3QsNGF0L7QtNC40YLRgdGPINC70Lgg0LTQvtC6INCyINGA0LXQttC40LzQtSDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgICAgIGNlbGxUeXBlID0gJ3NwYW4nOyAvLyDQvdCw0YXQvtC00LjRgtGB0Y8g0LvQuCDQtNC+0Log0LIg0YDQtdC20LjQvNC1INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHJcbiAgICAgICAgaXNSZWFkT25seSA9IGNlbGwucmVhZE9ubHkgPyB0cnVlIDogaXNSZWFkT25seTsgLy8g0L/QvtC/0YDQsNCy0LrQsCDQvdCwINGB0LLQvtC50YHRgtCy0L4g0Y/Rh9C10LnQutC4LCDQtNC+0YHRgtGD0L/QvdCwINC70Lgg0L7QvdCwINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y5cclxuLy8gICAgICAgICAgICBjbGFzc05hbWUgPSAnZm9ybS13aWRnZXQnOyAvLysgdCBoaXMuc3RhdGUuZWRpdGFibGU/ICcgZm9jdXNlZCc6ICcnO1xyXG4gICAgICAgIGlzUmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgIHZhciBFZGl0RWxlbWVudCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrLCBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lfSwgdGhpcy5wcm9wcy52YWx1ZSk7XHJcbiAgICAgICAgaWYgKGlzRWRpdCkge1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgc3dpdGNoIChjZWxsVHlwZSkge1xyXG4gICAgICAgICAgICAgY2FzZSAndGV4dCc6XHJcbiAgICAgICAgICAgICBFZGl0RWxlbWVudCA9IDxpbnB1dCB0eXBlPSd0ZXh0JyByZWFkT25seT17aXNSZWFkT25seX0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IHN0eWxlPXt7d2lkdGg6JzEwMCUnfX1cclxuICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSBvbktleVByZXNzPXt0aGlzLmhhbmRsZUtleVByZXNzfS8+XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICBFZGl0RWxlbWVudCA9IDxpbnB1dCB0eXBlPSdudW1iZXInIHJlYWRPbmx5PXtpc1JlYWRPbmx5fSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gc3R5bGU9e3t3aWR0aDonMTAwJSd9fVxyXG4gICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IG9uS2V5UHJlc3M9e3RoaXMuaGFuZGxlS2V5UHJlc3N9Lz5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgY2FzZSAnc2VsZWN0JzpcclxuICAgICAgICAgICAgIEVkaXRFbGVtZW50ID0gPFNlbGVjdCAgbmFtZT17Y2VsbC52YWx1ZUZpZWxkTmFtZX0gbGlicz17Y2VsbC5kYXRhU2V0fSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gZGVmYXVsdFZhbHVlID0ge3RoaXMuc3RhdGUudmFsdWV9IGNvbGxJZCA9IHtjZWxsLmlkfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX0vPlxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgPHNwYW4+e3RoaXMuc3RhdGUudmFsdWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCB7cmVmOiAnY2VsbC0nICsgdGhpcy5wcm9wcy5pZCwgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZSwgc3R5bGU6IHt3aWR0aDpjZWxsLndpZHRofX0sIFxyXG4gICAgICAgICAgICAgICAgRWRpdEVsZW1lbnRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH1cclxufSlcclxuXHJcbnZhciBEYXRhR3JpZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJEYXRhR3JpZFwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnM6IHRoaXMucHJvcHMuZ3JpZENvbHVtbnMsXHJcbiAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnByZXBhaXJlR3JpZERhdGEodGhpcy5wcm9wcy5ncmlkRGF0YSksXHJcbiAgICAgICAgICAgIGVkaXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsaWNrZWQ6IDBcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIEdyaWRSb3dFZGl0OiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkb2NJZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdGCINGA0LXQttC40Lwg0YHQvtC30LTQsNC90LjRjyDQvdC+0LLQvtCz0L4g0LTQvtC60YPQvNC10L3RgtCwXHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLFxyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEgPSBldmFsKCdkYXRhLicgKyBzZWxmLnByb3BzLnNvdXJjZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YSA9IHNlbGYuZGVsUm93KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGdyaWREYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIExpc3RlbiBncmlkRGF0YSBjaGFuZ2VzIGFuZCB0aGVuIGNhbGxiYWNrcyBmb3Igcm93IGRhdGEgY2hhbmdlc1xyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGV0YWlscycsIGZ1bmN0aW9uIChuZXdEYXRhLCBvbGREYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdEYXRhLmxlbmd0aCA+IDAgJiYgb2xkRGF0YSAhPT0gbmV3RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Z3JpZERhdGE6IG5ld0RhdGF9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlQ2VsbENsaWNrOiBmdW5jdGlvbiAoaWR4KSB7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZFJvd0lkQ2hhbmdlJywgaWR4KTsgLy8g0L7RgtC80LXRgtC40Lwg0LIg0YXRgNCw0L3QuNC70LjRidC1INC90L7QvNC10YAg0YHRgtGA0L7QutC4XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGNsaWNrZWQ6IGlkeFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciByb3dJZCA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRSb3dJZDtcclxuICAgICAgICAvLyAgICAgICBjb25zb2xlLmxvZygnY2xpY2tlZCByb3dJZCA6JyArIHJvd0lkICsgJ3Jvd0luZGV4OicgKyBpZHgpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZGVsUm93OiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAvLyDRg9C00LDQu9C40Lwg0YHRgtGA0L7QutGDINC30LDQtNCw0L3QvdGD0Y4g0YHRgtGA0L7QutGDINC40LvQuCDQstGB0LUsINC10YHQu9C4INC40L3QtNC10LrRgSDQvdC1INC30LDQtNCw0L1cclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSB0aGlzLnN0YXRlLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBzdGFydCA9IDEsXHJcbiAgICAgICAgICAgIGZpbmlzaCA9IGdyaWREYXRhLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4IHx8IGluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgc3RhcnQgPSBpbmRleDtcclxuICAgICAgICAgICAgZmluaXNoID0gMTtcclxuICAgICAgICB9XHJcbi8vICAgICAgICBncmlkRGF0YS5zcGxpY2Uoc3RhcnQsIGZpbmlzaCk7XHJcbiAgICAgICAgZ3JpZERhdGEgPSBncmlkRGF0YS5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCBzdGFydCB8fCBpbmRleCA+IChzdGFydCArIGZpbmlzaCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZERhdGE6IGdyaWREYXRhfSk7XHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQuNC30LzQtdC90LXQvdC40Y9cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBuZXdSb3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL9Cy0LXRgNC90LXRgiDQvdC+0LLRg9GOINGB0YLRgNC+0LrRgyDQtNC70Y8g0LPRgNC40LTQsCwg0L3QsCDQvtGB0L3QvtCy0LUg0YjQsNCx0LvQvtC90LBcclxuXHJcbiAgICAgICAgdmFyIGdyaWRDb2x1bW5zID0gdGhpcy5wcm9wcy5ncmlkQ29sdW1ucyxcclxuICAgICAgICAgICAgZ3JpZERhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzLFxyXG4gICAgICAgICAgICByb3cgPSBuZXcgT2JqZWN0KCk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JpZENvbHVtbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGZpZWxkID0gZ3JpZENvbHVtbnNbaV0uaWQ7XHJcbiAgICAgICAgICAgIHJvd1tmaWVsZF0gPSAnJztcclxuICAgICAgICB9XHJcbi8vICAgICAgICBjb25zb2xlLmxvZygnbmV3IHJvdzonICsgSlNPTi5zdHJpbmdpZnkoZ3JpZERhdGEpKTtcclxuLy8gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWREYXRhOmdyaWREYXRhfSk7XHJcbiAgICAgICAgcmV0dXJuIHJvdztcclxuICAgIH0sXHJcblxyXG4gICAgcHJlcGFpcmVHcmlkRGF0YTogZnVuY3Rpb24gKHNvdXJjZURhdGEpIHtcclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSBbXTtcclxuICAgICAgICBncmlkRGF0YSA9IHNvdXJjZURhdGEubWFwKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgLy8g0L/QvtC70YPRh9Cw0LXQvCDRh9C40YHRgtGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgIHZhciBuZXdSb3cgPSB0aGlzLm5ld1JvdygpO1xyXG4gICAgICAgICAgICAvLyDQv9GA0L7QudC00LXQvCDQv9C+INC90L7QstC+0Lkg0YHRgtGA0L7QutC1INC4INC30LDQv9C+0LvQvdC40Lwg0LXQtSDQv9C+0LvRjyDQt9C90LDRh9C10L3QuNGP0LzQuCDQuNC3INC40YHRgtC+0YfQvdC40LrQsFxyXG4vLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCfRh9C40YHRgtGD0Y4g0YHRgtGA0L7QutGDOicgKyBKU09OLnN0cmluZ2lmeShyb3cpICsgJyBuZXdSb3c6JyArIEpTT04uc3RyaW5naWZ5KG5ld1JvdykpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG5ld1Jvdykge1xyXG4vLyAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygna2V5OicgKyBKU09OLnN0cmluZ2lmeShrZXkpKTtcclxuICAgICAgICAgICAgICAgIG5ld1Jvd1trZXldID0gcm93W2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ld1JvdzsgLy8g0LLQtdGA0L3QtdC8INGB0YTQvtGA0LzQuNGA0L7QstCw0L3QvdGD0Y4g0L3QvtCy0YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICB9LCB0aGlzKTtcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdncmlkRGF0YTonICsgSlNPTi5zdHJpbmdpZnkoZ3JpZERhdGEpICk7XHJcbiAgICAgICAgcmV0dXJuIGdyaWREYXRhO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVSb3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDRg9C00LDQu9C10L3QuNC1INGB0YLRgNC+0LrQuCDQuNC3INCz0YDQuNC00LBcclxuICAgICAgICB2YXIgcm93SW5kZXggPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5ncmlkUm93SWQ7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZWxldGVSb3c6JyArIHJvd0luZGV4KTtcclxuICAgICAgICB0aGlzLmRlbFJvdyhyb3dJbmRleCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZFJvdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINC00L7QsdCw0LLQuNGCINCyINGB0L7RgdGC0L7Rj9C90LjQtSDQvdC+0LLRg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgIHZhciBuZXdSb3cgPSB0aGlzLm5ld1JvdygpLFxyXG4gICAgICAgICAgICBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGRldGFpbHMgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzO1xyXG5cclxuICAgICAgICBuZXdSb3cuaWQgPSAnTkVXJyArIE1hdGgucmFuZG9tKCk7IC8vINCz0LXQvdC10YDQuNC8INC90L7QstC+0LUg0LjQtFxyXG4vLyAgICAgICAgZ3JpZERhdGEucHVzaChuZXdSb3cpO1xyXG4vLyAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGVkOiB0cnVlLCBjbGlja2VkOiBncmlkRGF0YS5sZW5ndGh9KTtcclxuXHJcbiAgICAgICAgLy8g0LfQtNC10YHRjCDQstGB0YLQsNCy0LjRgtGMINGB0YLRgNC+0LrRgyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuLy8gICAgICAgIGRldGFpbHMucHVzaChuZXdSb3cpO1xyXG4vLyAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGRldGFpbHMpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkUm93SWRDaGFuZ2UnLCAtMSk7IC8vINC+0YLQvNC10YLQuNC8INCyINGF0YDQsNC90LjQu9C40YnQtSDQvdC+0LzQtdGAINGB0YLRgNC+0LrQuFxyXG5cclxuICAvLyAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWREYXRhOiBncmlkRGF0YX0pO1xyXG5cclxuICAgICAgICAvLyDQvtGC0LrRgNC+0LXQvCDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L4g0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZUdyaWRSb3coJ0FERCcsIG5ld1Jvdyk7XHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZWRpdFJvdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINC00L7QsdCw0LLQuNGCINCyINGB0L7RgdGC0L7Rj9C90LjQtSDQvdC+0LLRg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGRldGFpbHMgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzLFxyXG4gICAgICAgICAgICByb3cgPSBkZXRhaWxzW2ZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRSb3dJZF1cclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVHcmlkUm93KCdFRElUJyxyb3cgKTsgLy8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtSDRgdGC0YDQvtC60Lgg0LIg0LzQvtC00LDQu9GM0L3QvtC8INC+0LrQvdC1XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuXHJcbi8vICAgICAgICBjb25zb2xlLmxvZygnZ3JpZCByZW5kZXInLCB0aGlzLnByb3BzKTtcclxuICAgICAgICB2YXIgZ3JpZFN0eWxlID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogJzEwMHB4J1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICd0aCc7XHJcbiAgICAgICAgdmFyIGdyaWRSb3dzID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnMgPSB0aGlzLnByb3BzLmdyaWRDb2x1bW5zLFxyXG4gICAgICAgICAgICBjbGlja2VkSXRlbSA9IHRoaXMuc3RhdGUuaW5kZXgsXHJcbiAgICAgICAgICAgIGlzUmVhZE9ubHkgPSB0aGlzLnByb3BzLnJlYWRPbmx5LFxyXG4gICAgICAgICAgICBjZWxsSWQgPSAwLFxyXG4gICAgICAgICAgICBncmlkRGF0YVNvdXJjZSA9IHRoaXMucHJvcHMuc291cmNlO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgIWlzUmVhZE9ubHkgP1xyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEJ1dHRvbiwge29uQ2xpY2s6IHRoaXMuYWRkUm93LCBidXR0b25WYWx1ZTogXCJBZGQgcm93XCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEJ1dHRvbiwge29uQ2xpY2s6IHRoaXMuZWRpdFJvdywgYnV0dG9uVmFsdWU6IFwiRWRpdCByb3dcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcmlkQnV0dG9uLCB7b25DbGljazogdGhpcy5kZWxldGVSb3csIGJ1dHRvblZhbHVlOiBcIkRlbGV0ZSByb3dcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSA6IG51bGwsIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRhYmxlXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8q0LfQsNCz0L7Qu9C+0LLQvtC6Ki9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZENvbHVtbnMubWFwKGZ1bmN0aW9uIChjb2x1bW4sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkU3R5bGUud2lkdGggPSBjb2x1bW4ud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAndGgtJyArIGNvbHVtbi5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW4uc2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINC/0L7QutCw0LfQsNGC0Ywg0LjQuyDRgdC60YDRi9GC0Ywg0LrQvtC70L7QvdC60YNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAnc2hvdyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdoaWRlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwge3N0eWxlOiBncmlkU3R5bGUsIGNsYXNzTmFtZTogY2xhc3NOYW1lLCBrZXk6ICd0aC0nICsgaW5kZXgsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZTogXCJjb2xcIn0sIGNvbHVtbi5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRSb3dzLm1hcChmdW5jdGlvbiAocm93LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXlDbGFzcyA9ICdub3RGb2N1c2VkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0lkID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGlja2VkSXRlbSA9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlDbGFzcyA9ICdmb2N1c2VkJzsgLy8g0L/QvtC00YHQstC10YLQuNC8INCy0YvQsdGA0LDQvdC90YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwge29uQ2xpY2s6IHRoaXMuaGFuZGxlQ2VsbENsaWNrLmJpbmQodGhpcyxpbmRleCksIGNsYXNzTmFtZTogbXlDbGFzcywga2V5OiAndHItJytpbmRleH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zLm1hcChmdW5jdGlvbiAoY2VsbCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFN0eWxlLndpZHRoID0gY2VsbC53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuc2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0L/QvtC60LDQt9Cw0YLRjCDQuNC7INGB0LrRgNGL0YLRjCDQutC+0LvQvtC90LrRgz8g0LjRgdC/0LvQu9C00YzQt9GD0LXQvCDQutC70LDRgdGBLiDQlNC+0LvQttC10L0g0LHRi9GC0Ywg0L/RgNC+0L/QuNGB0LDQvSDQsiBjc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdoaWRlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTXlDZWxsLCB7Y2VsbDogY2VsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogY2VsbC5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93SWQ6IHJvd0lkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZERhdGFTb3VyY2U6IGdyaWREYXRhU291cmNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlzUmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogZ3JpZFN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvd1tjZWxsLmlkXSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogaW5kZXgsIGlkOiBjZWxsSWQrK30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcylcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXRhR3JpZDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1kYXRhLWdyaWQuanN4XG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBNeUJ1dHRvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ015QnV0dG9uJyxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy5idXR0b25WYWx1ZSxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVCdXR0b25DbGljayB9KTtcbiAgICB9LFxuXG4gICAgaGFuZGxlQnV0dG9uQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUJ1dHRvbkNsaWNrKCkge1xuICAgICAgICAvLyDQstC10YDQvdC10Lwg0LIg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtGB0YLQvtGP0L3QuNC5INGB0L7QsdGL0YLQuNC1INC60LvQuNC6XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljaygpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE15QnV0dG9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9teWJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4vbW9kYWxwYWdlL21vZGFsUGFnZS5qc3gnKSxcclxuICAgIFNlbGVjdCA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LXNlbGVjdC5qc3gnKSxcclxuICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LXRleHQuanN4JyksXHJcbiAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LW51bWJlci5qc3gnKTtcclxuXHJcblxyXG52YXIgQXJ2R3JpZFJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJBcnZHcmlkUm93XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByb3c6IHRoaXMucHJvcHMuZ3JpZFJvd0RhdGEsIGNoZWNrZWQ6IGZhbHNlLCB3YXJuaW5nOiAnJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW9kYWxQYWdlQ2xpY2s6IGZ1bmN0aW9uIChidG5FdmVudCkge1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQvtGC0LDQtdGCINGB0L7QsdGL0YLQuNC1INC60LvQuNC6XHJcbiAgICAgICAgdmFyIGNvbXBvbmVudHMgPSBbJ25vbWlkJywgJ2tvZ3VzJywgJ2hpbmQnLCAna2JtJywgJ2tibXRhJywgJ3N1bW1hJ10sXHJcbiAgICAgICAgICAgIGRhdGEgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcclxuICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LrQsFxyXG5cclxuICAgICAgICAgICAgLy8g0YHQvtCx0LjRgNCw0LXQvCDQtNCw0L3QvdGL0LUg0LTQu9GPINC+0YLQv9GA0LDQstC60Lgg0L3QsCDQvtCx0YDQsNCx0L7RgtC60YNcclxuICAgICAgICAgICAgY29tcG9uZW50cy5tYXAoZnVuY3Rpb24oY29tcG9uZW50KSAge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoKHtuYW1lOiBjb21wb25lbnQsIHZhbHVlOiB0aGlzLnJlZnNbY29tcG9uZW50XS5zdGF0ZS52YWx1ZX0pO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvcHMubW9kYWxQYWdlQ2xpY2soYnRuRXZlbnQsIGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uIChlLCBuYW1lKSB7XHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINC90LAg0YTQvtGA0LzQtVxyXG4gICAgICAgIHZhciB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5zdGF0ZS5yb3dbbmFtZV0gJiYgbmFtZSA9PSAnbm9taWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmc1sna29ndXMnXS5zZXRTdGF0ZSh7dmFsdWU6IDAuMDAwfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmc1snaGluZCddLnNldFN0YXRlKHt2YWx1ZTogMC4wMH0pO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnNbJ2tibSddLnNldFN0YXRlKHt2YWx1ZTogMC4wMH0pO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnNbJ2tibXRhJ10uc2V0U3RhdGUoe3ZhbHVlOiAwLjAwfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmc1snc3VtbWEnXS5zZXRTdGF0ZSh7dmFsdWU6IDAuMDB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWNhbGNSb3dTdW1tKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVJbnB1dDogZnVuY3Rpb24gKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgLy8g0L/QtdGA0LXRgdGH0LXRgiDRgdGD0LzQvFxyXG4gICAgICAgIHRoaXMucmVjYWxjUm93U3VtbSgpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVjYWxjUm93U3VtbTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBrb2d1cyA9IE51bWJlcih0aGlzLnJlZnNbJ2tvZ3VzJ10uc3RhdGUudmFsdWUpLFxyXG4gICAgICAgICAgICBoaW5kID0gTnVtYmVyKHRoaXMucmVmc1snaGluZCddLnN0YXRlLnZhbHVlKSxcclxuICAgICAgICAgICAga2JtdGEgPSBrb2d1cyAqIGhpbmQsXHJcbiAgICAgICAgICAgIGtibSA9IGtvZ3VzICogaGluZCAqIDAuMjAsIC8vINCy0YDQvNC10L3QvdC+XHJcbiAgICAgICAgICAgIHN1bW1hID0ga2JtdGEgKyBrYm07XHJcbiAgICAgICAgdGhpcy5yZWZzWydrYm0nXS5zZXRTdGF0ZSh7dmFsdWU6IGtibX0pO1xyXG4gICAgICAgIHRoaXMucmVmc1sna2JtdGEnXS5zZXRTdGF0ZSh7dmFsdWU6IGtibXRhfSk7XHJcbiAgICAgICAgdGhpcy5yZWZzWydzdW1tYSddLnNldFN0YXRlKHt2YWx1ZTogc3VtbWF9KTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRlRm9ybSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB2YWxpZGF0ZUZvcm06IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyB3aWxsIGNoZWNrIHZhbHVlcyBvbiB0aGUgZm9ybSBhbmQgcmV0dXJuIHN0cmluZyB3aXRoIHdhcm5pbmdcclxuICAgICAgICB2YXIgd2FybmluZyA9ICcnO1xyXG4gICAgICAgIC8vINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INC/0YDQvtCy0LXRgNC60Lgg0YTQvtGA0LzRiyDQvdCwINCy0LDQu9C40LTQvdC+0YHRgtGMXHJcbiAgICAgICAgaWYgKCF0aGlzLnJlZnNbJ25vbWlkJ10uc3RhdGUudmFsdWUpIHdhcm5pbmcgPSB3YXJuaW5nICsgJyDQutC+0LQg0YPRgdC70YPQs9C4JztcclxuICAgICAgICBpZiAoIXRoaXMucmVmc1sna29ndXMnXS5zdGF0ZS52YWx1ZSkgd2FybmluZyA9IHdhcm5pbmcgKyAnINC60L7Quy3QstC+JztcclxuICAgICAgICBpZiAoIXRoaXMucmVmc1snaGluZCddLnN0YXRlLnZhbHVlKSB3YXJuaW5nID0gd2FybmluZyArICcg0YbQtdC90LAnO1xyXG5cclxuICAgICAgICBpZiAod2FybmluZy5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICAgIC8vINC10YHRgtGMINC/0YDQvtCx0LvQtdC80YtcclxuICAgICAgICAgICAgd2FybmluZyA9ICfQntGC0YHRg9GC0YHQstGD0Y7RgiDQtNCw0L3QvdGL0LU6JyArIHdhcm5pbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NoZWNrZWQ6IHRydWUsIHdhcm5pbmc6IHdhcm5pbmd9KTtcclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBAdG9kbyDQstGL0L3QtdGB0YLQuCDQsiBjc3NcclxuICAgICAgICB2YXIgc3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcclxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgIG1hcmdpbjogJzEwJSAzMCUgMTAlIDMwJScsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6ICcxJyxcclxuICAgICAgICAgICAgdG9wOiAnMTAwcHgnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIHJvdyA9IHRoaXMuc3RhdGUucm93LFxyXG4gICAgICAgICAgICB2YWxpZGF0ZU1lc3NhZ2UgPSB0aGlzLnN0YXRlLndhcm5pbmcsXHJcbiAgICAgICAgICAgIGJ1dHRvbk9rUmVhZE9ubHkgPSB2YWxpZGF0ZU1lc3NhZ2UubGVuZ3RoID4gMCB8fCAhdGhpcy5zdGF0ZS5jaGVja2VkO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZX0+XHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCIubW9kYWxQYWdlXCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxQYWdlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZU5hbWU6IFwiUmVhIGxpc2FtaW5lIC8gcGFyYW5kYW1pbmVcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge3RpdGxlOiBcIlRlZW51c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibm9taWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcIm5vbWVuY2xhdHVyZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvazogXCJBUlZcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5ub21pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHJvdy5rb29kLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJub21pZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlRlZW51c2Uga29vZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7dGl0bGU6IFwiS29ndXMgXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtvZ3VzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LmtvZ3VzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiZmFsc2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrb2d1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlSW5wdXR9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge3RpdGxlOiBcIkhpbmQgXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImhpbmRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cuaGluZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcImZhbHNlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIHJlZjogXCJoaW5kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVJbnB1dH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7dGl0bGU6IFwiU3VtbWEga2JtLXRhOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2JtdGFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cua2JtdGEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwia2JtdGFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHt0aXRsZTogXCJLw6RpYmVtYWtzOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2JtXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LmtibSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcInRydWVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrYm1cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLmhhbmRsZUlucHV0fSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHt0aXRsZTogXCJTdW1tYTogXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LnN1bW1hLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVJbnB1dH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHZhbGlkYXRlTWVzc2FnZSkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5cclxuLypcclxuIDxkaXY+XHJcbiB7YnV0dG9uT2tSZWFkT25seSA/XHJcbiA8YnV0dG9uIGRpc2FibGVkPiBPayA8L2J1dHRvbj46XHJcbiA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMubW9kYWxQYWdlQ2xpY2suYmluZCh0aGlzLCdPaycpfT4gT2sgPC9idXR0b24+XHJcbiB9XHJcbiA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMubW9kYWxQYWdlQ2xpY2suYmluZCh0aGlzLCdDYW5jZWwnKX0+IENhbmNlbDwvYnV0dG9uPlxyXG4gPC9kaXY+XHJcbiAqL1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXJ2R3JpZFJvdztcclxuXHJcbi8qXHJcbiA8SW5wdXRUZXh0IHRpdGxlPSdLb29kICcgbmFtZT0na29vZCcgdmFsdWU9e3Jvdy5rb29kfSByZWFkT25seT17ZmFsc2V9XHJcbiBkaXNhYmxlZD1cImZhbHNlXCIgcmVmPSdrb29kJyA+PC9JbnB1dFRleHQ+XHJcbiAqL1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYXJ2LWdyaWQtcm93LmpzeFxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcbi8vICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LXRleHQuanN4Jyk7XHJcblxyXG5jb25zdCBTZWxlY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiU2VsZWN0XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbGliRGF0YSA9IFtdO1xyXG4gICAgICAgIHZhciBsaWJzID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUubGlicyxcclxuICAgICAgICAvLyDQs9GA0YPQt9C40Lwg0LTQsNC90L3Ri9C1INC40Lcg0YXRgNCw0L3QuNC70LjRidCwXHJcbiAgICAgICAgICAgIGRhdGEgPSBsaWJzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT0gdGhpcy5wcm9wcy5saWJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHRoaXMpLFxyXG4gICAgICAgICAgICBpZFZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZTsgLy8g0LTQu9GPINC/0YDQuNCy0Y/Qt9C60Lgg0LTQsNC90L3Ri9GFXHJcblxyXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCAmJiBkYXRhWzBdLmRhdGEpIHtcclxuICAgICAgICAgICAgbGliRGF0YSA9IGRhdGFbMF0uZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7dmFsdWU6IHRoaXMucHJvcHMudmFsdWUgLyog0LfQtNC10YHRjCDQv9C+INC30L3QsNGH0LXQvdC40Y4g0JjQlCAqLyxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBkYXRhOiBsaWJEYXRhIHx8IFtdLFxyXG4gICAgICAgICAgICBmaWVsZFZhbHVlOiB0aGlzLnByb3BzLnZhbHVlIC8q0LfQtNC10YHRjCDQv9C+INC30L3QsNGH0LXQvdC4INC/0L7Qu9GPIGNvbGxJZCAqLyxcclxuICAgICAgICAgICAgYnJuRGVsZXRlOiB0aGlzLnByb3BzLmJ0bkRlbGV0ZSAvKiDQtdGB0LvQuCDQuNGB0YLQuNC90YMsINGC0L4g0YDQuNGB0YPQtdC8INGA0Y/QtNC+0Lwg0LrQvdC+0L/QutGDINC00LvRjyDQvtGH0LjRgdGC0LrQuCDQt9C90LDRh9C10L3QuNGPKi99O1xyXG4gICAgfSxcclxuXHJcbiAgICBmaW5kRmllbGRWYWx1ZTogZnVuY3Rpb24gKGRhdGEsIGNvbGxJZCwgdmFsdWUpIHtcclxuICAgICAgICAvLyDQv9GA0LjQstGP0LbQtdGCINC6INC30L3QsNGH0LXQvdGOINC/0L7Qu9GPXHJcbiAgICAgICAgLy8g0L3QsNC00L4g0L/RgNC40LLRj9C30LDRgtGMINC00LDQvdC90YvQtVxyXG4gICAgICAgIC8vIGtvb2QgLT4gaWRcclxuICAgICAgICB2YXIgaWQgPSAwO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgIGlmIChyb3dbY29sbElkXSA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSByb3cuaWQ7XHJcbi8vICAgICAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiByb3cuaWQsIGZpZWxkVmFsdWU6IHJvd1tjb2xsSWRdfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldFZhbHVlQnlJZDogZnVuY3Rpb24oY29sbElkLCByb3dJZCkge1xyXG4gICAgICAgIC8vINCy0LXRgNC90LXRgiDQt9C90LDRh9C10L3QuNGPINC/0L7Qu9GPINC/0L4g0LLRi9Cx0YDQsNC90L3QvtC80YMg0JjQlFxyXG5cclxuICAgICAgICB2YXIgZmllbGRWYWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuc3RhdGUuZGF0YTtcclxuXHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgaWYgKHJvd1snaWQnXSA9PSByb3dJZCkge1xyXG4gICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IHJvd1tjb2xsSWRdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZmllbGRWYWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDQv9C+0LrQsNC20LXRgiDQt9C90LDRh9C10L3QuNC1INC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC00LvRjyDQstC40LTQttC10YLQsCwg0L/QvtC60LAg0LPRgNGD0LfQuNGC0YHRjyDRgdC/0YDQsNCy0L7Rh9C90LjQulxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgdmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgIHRpdGxlOiBudWxsLFxyXG4gICAgICAgICAgICBidG5EZWxldGU6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1IGRvY0lkLiDQldGB0LvQuCDQt9C90LDRh9C10L3QuNC1ID0gMCAo0LTQvtCx0LDQstC70Y/QtdC8INC90L7QstGD0Y4g0LfQsNC/0LjRgdGMLCDRgtC+INC/0YDQvtGB0YLQviDQvtGH0LjRgtC60LAg0L/QvtC70LXQuSwg0LjQvdCw0YfQtSDQv9C+0LTQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVtzZWxmLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTogMH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWUsIGRpc2FibGVkOiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmxpYnMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIHZhc3R1cyA9IEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgICAgIC8vIHdpbGwgd2F0Y2ggbGlicyBjaGFuZ2UgKGZyb20gc2VydmVyKVxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IG5ld1ZhbHVlLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IHNlbGYucHJvcHMubGlicykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7ZGF0YTogZGF0YVswXS5kYXRhfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xsSWQgJiYgdGhpcy5wcm9wcy5jb2xsSWQgIT09ICdpZCcpIHtcclxuICAgICAgICAgICAgLy8g0LjRidC10Lwg0JjQlCDQv9C+INC30L3QsNGH0LXQvdC40Y4g0L/QvtC70Y9cclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRWYWx1ZSh0aGlzLnN0YXRlLmRhdGEsIHRoaXMucHJvcHMuY29sbElkLCB0aGlzLnByb3BzLnZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIHByb3BWYWx1ZSA9IGRhdGFbdGhpcy5wcm9wcy5uYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKGZpZWxkVmFsdWUgPT0gJycpIHtcclxuICAgICAgICAgICAgZmllbGRWYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vINC90LDQudC00LXQvCDQv9C+INC40LQg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRjyDQsiBjb2xsSWRcclxuICAgICAgICB0aGlzLmdldFZhbHVlQnlJZCh0aGlzLnByb3BzLmNvbGxJZCwgZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQuNC0INC60LDQuiB2YWx1ZVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTpmaWVsZFZhbHVlfSk7XHJcblxyXG4gICAgICAgIGlmIChwcm9wVmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQv9GA0LjQstGP0LfQutCwINC6INC00LDQvdC90YvQvFxyXG4gICAgICAgICAgICAvLyDQv9C+0LvRg9GH0LjRgtGMINC30L3QsNGH0LXQvdC40LVcclxuICAgICAgICAgICAgZGF0YVt0aGlzLnByb3BzLm5hbWVdID0gZmllbGRWYWx1ZTtcclxuICAgICAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAvLyDRgdC80L7RgtGA0LjQvCDQuiDRh9C10LzRgyDQv9GA0LjQstGP0LfQsNC9INGB0LXQu9C10LrRgiDQuCDQvtGC0LTQsNC40Lwg0LXQs9C+INC90LDQstC10YDRhVxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGUsIHRoaXMucHJvcHMubmFtZSwgdGhpcy5zdGF0ZS52YWx1ZSk7IC8vINCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDQt9Cw0LTQsNC9INC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0LLQtdGA0YXQvdC10Lwg0YPRgNC+0LLQvdC1LCDQvtGC0LTQsNC00LjQvCDQvtCx0YDQsNCx0L7RgtC60YMg0YLRg9C00LBcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGF0YU9wdGlvbnMgPSB0aGlzLnN0YXRlLmRhdGEgfHwgW10sXHJcbiAgICAgICAgICAgIGlucHV0Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLm5hbWUsXHJcbiAgICAgICAgICAgIE9wdGlvbnMgPSBudWxsLFxyXG4gICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZSA9IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlOyAvLyDQlNCw0LTQuNC8INC00LXRhNC+0LvRgtC90L7QtSDQt9C90LDRh9C10L3QuNC1INC00LvRjyDQstC40LTQttC10YLQsCwg0YfRgtC+0LEg0L/QvtC60LDRgtGMINC10LPQviDRgdGA0LDQt9GDLCDQtNC+INC/0L7QtNCz0YDRg9C30LrQuCDQsdC40LHQu9C40L7RgtC10LrQuFxyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5kb2spIHtcclxuICAgICAgICAgICAgLy8g0L7RgdGC0LDQstC40Lwg0YLQvtC70YzQutC+INC30LDQtNCw0L3Ri9C5IFwi0YHQv9GA0LDQstC+0YfQvdC40LpcIlxyXG4gICAgICAgICAgICBkYXRhT3B0aW9ucyA9IGRhdGFPcHRpb25zLmZpbHRlcihmdW5jdGlvbihpdGVtKSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZG9rID09PSB0aGlzLnByb3BzLmRvaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUudmFsdWUpIHsgLy8g0LTQvtCx0LDQstC40Lwg0L/Rg9GB0YLRg9GOINGB0YLRgNC+0LrRgyDQsiDQvNCw0YHRgdC40LJcclxuICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LjQvCDQvdCw0LvQuNGH0LjQtSDQv9GD0YHRgtC+0Lkg0YHRgtGA0L7QutC4INCyINC80LDRgdGB0LjQstC1XHJcblxyXG4gICAgICAgICAgICBsZXQgZW1wdHlPYmogPSBkYXRhT3B0aW9ucy5maWx0ZXIoZnVuY3Rpb24ob2JqKSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5pZCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFlbXB0eU9iaiB8fCBlbXB0eU9iai5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YU9wdGlvbnMuc3BsaWNlKDAsIDAsIHtpZDogMCwga29vZDogJycsIG5hbWU6ICcnfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZGF0YVZhbHVlID0gZGF0YU9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmlkID09IHRoaXMuc3RhdGUudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhT3B0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgT3B0aW9ucyA9IGRhdGFPcHRpb25zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PSAnYXJyYXknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1bMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IGl0ZW0uaWQsIGtleTogTWF0aC5yYW5kb20oKX0sIGl0ZW0ubmFtZSlcclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGlucHV0RGVmYXVsdFZhbHVlID0gZGF0YVZhbHVlLmxlbmd0aCA+IDAgPyBkYXRhVmFsdWVbMF0ubmFtZSA6IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIE9wdGlvbnMgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogMCwga2V5OiBNYXRoLnJhbmRvbSgpfSwgXCIgRW1wdHkgXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgd2lkZ2V0ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCB7dmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge3dpZHRoOicxMDAlJywgaGVpZ2h0OicxMDAlJ319LCBPcHRpb25zKTsgLy8g0LXRgdC70Lgg0LTQu9GPINCz0YDQuNC00LAsINC+0YHRgtCw0LLQuNC8INGC0L7Qu9GM0LrQviDRgdC10LvQtdC60YJcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy50aXRsZSkge1xyXG4gICAgICAgICAgICB3aWRnZXQgPSAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCJ9LCB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB7ZGlzcGxheTonaW5saW5lLWJsb2NrJ319LCBcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcInRleHRcIiwgY2xhc3NOYW1lOiBcInVpLWMxIGRvYy1pbnB1dC1yZWFkb25seVwiLCB2YWx1ZTogaW5wdXREZWZhdWx0VmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IFwidHJ1ZVwifSkgOiBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID8gbnVsbCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlfSwgT3B0aW9ucyksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5idG5EZWxldGUgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7Y2xhc3NOYW1lOiBcInVpLWMxLWJ1dHRvblwiLCBvbkNsaWNrOiB0aGlzLmJ0bkRlbENsaWNrfSwgXCIgRGVsZXRlIFwiKSA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgd2lkZ2V0KVxyXG4gICAgfSxcclxuXHJcbiAgICBidG5EZWxDbGljazogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAvLyDQv9C+INCy0YvQt9C+0LLRgyDQutC90L7Qv9C60YMg0YPQtNCw0LvQuNGC0YwsINC+0LHQvdGD0LvRj9C10YIg0LfQvdCw0YfQtdC90LjQtVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOm51bGx9KTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKGV2ZW50KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1zZWxlY3QuanN4XG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IElucHV0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIklucHV0XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHkgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkIHx8IHRydWUsXHJcbiAgICAgICAgICAgIHZhbGlkOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiAnZGVmYXVsTmFtZScsXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnZGVmYXVsTmFtZScsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgICAgd2lkdGg6ICdhdXRvJyxcclxuICAgICAgICAgICAgcGF0dGVybjogJydcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUgZG9jSWQuINCV0YHQu9C4INC30L3QsNGH0LXQvdC40LUgPSAwICjQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0L/QuNGB0YwsINGC0L4g0L/RgNC+0YHRgtC+INC+0YfQuNGC0LrQsCDQv9C+0LvQtdC5LCDQuNC90LDRh9C1INC/0L7QtNCz0YDRg9C30LrQsCDQtNCw0L3QvdGL0YVcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkb2NJZCcsICBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YHQvtC30LTQsNC90LjQtSDQvdC+0LLQvtCz0L4g0LTQvtC60YPQvNC10L3RgtCwXHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhW3RoaXMucHJvcHMubmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINGB0L7QstGL0Lkg0LTQvtC60YPQvNC10L3RglxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiAwfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiB2YWx1ZX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgY29uc29sZS5sb2coJ29uIGNoYW5nZTplZGl0ZWQ6JyArIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtyZWFkT25seTogIW5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDRgdC70YPRiNGD0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFO1xyXG4vLyAgICAgICAgICBjb25zb2xlLmxvZygnaW5wdXQtdGV4dCBvbiBjaGFuZ2UgZGF0YTonLCBuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBuZXdWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZFZhbHVlID0gZGF0YVtzZWxmLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbc2VsZi5wcm9wcy5uYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBuZXh0UHJvcHMudmFsdWV9KVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uIChuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgICAgIC8vINC40LfQvNC10L3QtdC90LjRjyDQsdGD0LTRg9GCINC+0YLRgNCw0LbQsNGC0YzRgdGPINGC0L7Qu9GM0LrQviDQsiDRgdC70YPRh9Cw0LUg0LXRgdC70Lgg0YLQsNC60LjQtSDQtdGB0YLRjFxyXG5cclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWUgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblZhbHVlID0gKG5leHRTdGF0ZS52YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSB8fFxyXG4gICAgICAgICAgICBuZXh0U3RhdGUucmVhZE9ubHkgIT09IHRoaXMuc3RhdGUucmVhZE9ubHkgfHxcclxuICAgICAgICAgICAgbmV4dFN0YXRlLmRpc2FibGVkICE9PSB0aGlzLnN0YXRlLmRpc2FibGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgZmllbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlLFxyXG4gICAgICAgICAgICBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgaXNQYXR0ZXJWYWxpZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnBhdHRlcm4gJiYgZmllbGRWYWx1ZS5jaGFyQXQoZmllbGRWYWx1ZS5sZW5ndGggLSAxKSAhPT0gJy4nKSB7XHJcblxyXG4gICAgICAgICAgICAvLyDQv9GA0L7QstC+0LTQuNC8INC/0YDQvtCy0LXRgNC60YMg0L3QsCDRgdC+0L7RgtCy0LXRgtGB0YLQstC40LUg0YjQsNCx0LvQvtC90YNcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZpZWxkVmFsdWUubWF0Y2godGhpcy5wcm9wcy5wYXR0ZXJuLCAnJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQYXR0ZXJuIHZhbGU6JyArIGZpZWxkVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IGRhdGFbdGhpcy5wcm9wcy5uYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDRgtC+0LvRjNC60L4g0LXRgdC70Lgg0YHQvtC+0YLQstC10YLRgdGC0LLRg9C10YIg0L/QsNGC0YLQtdGA0L3Rg1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgICAgLy8gICAgICAgY29uc29sZS5sb2coJ29uQ2hhbmdlIGZpZWxkVmFsdWUgZmluaXNoJywgdGhpcy5wcm9wcy5uYW1lLCB0aGlzLnN0YXRlLnZhbHVlKTtcclxuXHJcbiAgICAgICAgZGF0YVt0aGlzLnByb3BzLm5hbWVdID0gZmllbGRWYWx1ZTtcclxuICAgICAgICAvLyDQt9Cw0LTQsNGC0Ywg0L3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INC/0L7Qu9GPXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICAvLyDQvtGC0LTQsNC00LjQvCDQvtCx0YDQsNCx0L7RgtGH0LjQutGDLCDQtdGB0LvQuCDQt9Cw0LTQsNC9XHJcbiAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XHJcbiAgICAgICAgIC8vINGB0LzQvtGC0YDQuNC8INC6INGH0LXQvNGDINC/0YDQuNCy0Y/Qt9Cw0L0g0YHQtdC70LXQutGCINC4INC+0YLQtNCw0LjQvCDQtdCz0L4g0L3QsNCy0LXRgNGFXHJcbiAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZSwgdGhpcy5wcm9wcy5uYW1lKTsgLy8g0LIg0YHQu9GD0YfQsNC1INC10YHQu9C4INC30LDQtNCw0L0g0L7QsdGA0LDQsdC+0YLRh9C40Log0L3QsCDQstC10YDRhdC90LXQvCDRg9GA0L7QstC90LUsINC+0YLQtNCw0LTQuNC8INC+0LHRgNCw0LHQvtGC0LrRgyDRgtGD0LTQsFxyXG4gICAgICAgICB9XHJcbiAgICAgICAgICovXHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpbnB1dENsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICcnICsgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dERpc2FibGVkID0gdGhpcy5zdGF0ZS5kaXNhYmxlZCxcclxuICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICBteVN0eWxlID0ge3dpZHRoOiAnYXV0byd9O1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRSZWFkT25seSkge1xyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IGlucHV0Q2xhc3NOYW1lICsgJyBkb2MtaW5wdXQtcmVhZG9ubHknO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy53aWR0aCkge1xyXG4gICAgICAgICAgICBteVN0eWxlLndpZHRoID0gdGhpcy5wcm9wcy53aWR0aFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlucHV0RGlzYWJsZWQgPT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7aHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCIgKyBpbnB1dENsYXNzTmFtZX0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHRoaXMucHJvcHMudGl0bGUpXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcInRleHRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBteVN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBpbnB1dFJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLnByb3BzLnBhdHRlcm4sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZUhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgICAgICkpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwidGV4dFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBpbnB1dFJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMucHJvcHMucGF0dGVybiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZUhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0LmpzeFxuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IElucHV0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIklucHV0XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSwgXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5IHx8IGZhbHNlLCBcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdHJ1ZSxcclxuICAgICAgICAgICAgdmFsaWQ6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJpbmREYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICBtaW46LTk5OTk5OTk5OSxcclxuICAgICAgICAgICAgbWF4OiA5OTk5OTk5OTlcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpIHtcclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogMH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZSwgZGlzYWJsZWQ6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkYXRhJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbmV3VmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IGRhdGFbdGhpcy5wcm9wcy5uYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6ZnVuY3Rpb24gKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdC10L3QuNGPINCx0YPQtNGD0YIg0L7RgtGA0LDQttCw0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDRgtCw0LrQuNC1INC10YHRgtGMXHJcbiAgICAgICAgdmFyIHJldHVybnZhbHVlID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSkge1xyXG4gICAgICAgICAgICB2YXIgcmV0dXJudmFsdWUgPSAobmV4dFN0YXRlLnZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlIHx8XHJcbiAgICAgICAgICAgIG5leHRTdGF0ZS5yZWFkT25seSAhPT0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fFxyXG4gICAgICAgICAgICBuZXh0U3RhdGUuZGlzYWJsZWQgIT09IHRoaXMuc3RhdGUuZGlzYWJsZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0dXJudmFsdWU7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTpmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBmaWVsZFZhbHVlID0gTnVtYmVyKGUudGFyZ2V0LnZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKGZpZWxkVmFsdWUgPj0gTnVtYmVyKHRoaXMucHJvcHMubWluKSB8fCBmaWVsZFZhbHVlIDw9IE51bWJlcih0aGlzLnByb3BzLm1heCkpIHtcclxuICAgICAgICAgICAgLy8g0LfQsNC00LDQvdC90L7QtSDQvtCz0YDQsNC90LjRh9C10L3QuNC1INC90LUg0YDQsNCx0L7RgtCw0LXRgiDQv9GA0Lgg0YDRg9GH0L3QvtC8INCy0LLQvtC00LUg0YHRg9C80LwsINC+0YLRgNCw0LHQvtGC0LDQtdC8INC10LPQvlxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYmluZERhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vINC/0YDQuNGP0LLRj9C30LrQsCDQuiDQtNCw0L3QvdGL0LxcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgLy8g0L/QvtC70YPRh9C40YLRjCDQt9C90LDRh9C10L3QuNC1XHJcbiAgICAgICAgICAgICAgICBkYXRhW3RoaXMucHJvcHMubmFtZV0gPSBmaWVsZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0YHQvNC+0YLRgNC40Lwg0Log0YfQtdC80YMg0L/RgNC40LLRj9C30LDQvSDRgdC10LvQtdC60YIg0Lgg0L7RgtC00LDQuNC8INC10LPQviDQvdCw0LLQtdGA0YVcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZSwgdGhpcy5wcm9wcy5uYW1lKTsgLy8g0LIg0YHQu9GD0YfQsNC1INC10YHQu9C4INC30LDQtNCw0L0g0L7QsdGA0LDQsdC+0YLRh9C40Log0L3QsCDQstC10YDRhdC90LXQvCDRg9GA0L7QstC90LUsINC+0YLQtNCw0LTQuNC8INC+0LHRgNCw0LHQvtGC0LrRgyDRgtGD0LTQsFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkJsdXI6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0YLQsNC60L7QuSDQvNC10YLQvtC0INC/0LXRgNC10LTQsNC9INGB0LLQtdGA0YXRgywg0YLQviDQstC10YDQvdC10YIg0LXQs9C+INC+0LHRgNCw0YLQvdC+XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25CbHVyKHRoaXMuc3RhdGUudmFsdWUsIHRoaXMucHJvcHMubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpbnB1dENsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICcnICsgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dERpc2FibGVkID0gdGhpcy5zdGF0ZS5kaXNhYmxlZCB8fCAnZmFsc2UnLFxyXG4gICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLm5hbWUsXHJcbiAgICAgICAgICAgIGlucHV0TWluVmFsdWUgPSB0aGlzLnByb3BzLm1pbiB8fCAtOTk5OTk5OTk5LFxyXG4gICAgICAgICAgICBpbnB1dE1heFZhbHVlID0gdGhpcy5wcm9wcy5tYXggfHwgOTk5OTk5OTk5O1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRSZWFkT25seSkge1xyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IGlucHV0Q2xhc3NOYW1lICsgJyBkb2MtaW5wdXQtcmVhZG9ubHknO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlucHV0RGlzYWJsZWQgPT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7aHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJudW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIlxcXFxkKyhcXFxcLlxcXFxkezJ9KT9cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICApKVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHRoaXMucHJvcHMudGl0bGUpXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcIm51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluOiBpbnB1dE1pblZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiBpbnB1dE1heFZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogXCIwLjAxXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIlxcXFxkKyhcXFxcLlxcXFxkezJ9KT9cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLm9uQmx1cn1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxyXG4gICAgfSxcclxufSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm49e3RoaXMucHJvcHMucGF0dGVybn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1udW1iZXIuanN4XG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyDQstC40LTQttC10YIsINC+0LHRitC10LTQuNC90Y/RjtGJ0LjQuSDRgdC10LvQtdC60YIg0Lgg0YLQtdC60YHRgi4g0LIg0YLQtdC60YHRgtC1INC+0YLRgNCw0LbQsNGO0YLQvNGPINC00LDQvdC90YvQtSwg0YHQstGP0LfQsNC90L3Ri9C1INGBINGB0LXQu9C10LrRgtC+0LxcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIFNlbGVjdCA9IHJlcXVpcmUoJy4uL2RvYy1pbnB1dC1zZWxlY3QuanN4JyksXHJcbiAgICBUZXh0ID0gcmVxdWlyZSgnLi4vdGV4dC1hcmVhL3RleHQtYXJlYS5qc3gnKTtcclxuXHJcblxyXG52YXIgX19fX0NsYXNzbD1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzbF9fX19LZXkgaW4gX19fX0NsYXNzbCl7aWYoX19fX0NsYXNzbC5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NsX19fX0tleSkpe1NlbGVjdFRleHRXaWRnZXRbX19fX0NsYXNzbF9fX19LZXldPV9fX19DbGFzc2xbX19fX0NsYXNzbF9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NsPV9fX19DbGFzc2w9PT1udWxsP251bGw6X19fX0NsYXNzbC5wcm90b3R5cGU7U2VsZWN0VGV4dFdpZGdldC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzbCk7U2VsZWN0VGV4dFdpZGdldC5wcm90b3R5cGUuY29uc3RydWN0b3I9U2VsZWN0VGV4dFdpZGdldDtTZWxlY3RUZXh0V2lkZ2V0Ll9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc2w7XHJcbiAgICBmdW5jdGlvbiBTZWxlY3RUZXh0V2lkZ2V0KHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzbC5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLCAvLyDQv9C+0LnQtNC10YIg0LIg0YLQtdC60YHRgtC+0LLRg9GOINC+0LHQu9Cw0YHRgtGMXHJcbiAgICAgICAgICAgIGxpYkRhdGE6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdE9uQ2hhbmdlID0gdGhpcy5oYW5kbGVTZWxlY3RPbkNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2VsZWN0VGV4dFdpZGdldC5wcm90b3R5cGUsXCJoYW5kbGVTZWxlY3RPbkNoYW5nZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUsIG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgLy8g0L7RgtGA0LDQsdC+0YLQsNC10Lwg0YHQvtCx0YvRgtC40LUg0Lgg0L/QvtC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5saWJEYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxnID0gdGhpcy5nZXREZXNjcmlwdGlvbkJ5U2VsZWN0VmFsdWUodGhpcy5zdGF0ZS5saWJEYXRhKSB8fCBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdmFsdWUsIGRlc2NyaXB0aW9uOiBzZWxnfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZWxlY3RUZXh0V2lkZ2V0LnByb3RvdHlwZSxcImNvbXBvbmVudERpZE1vdW50XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1INCx0LjQsdC70LjQvtGC0LXQui5cclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vINCx0YPQtNC10Lwg0L7RgtGB0LvQtdC20LjQstCw0YLRjCDQvNC+0LzQtdC90YIg0LrQvtCz0LTQsCDRgdC/0YDQsNCy0L7Rh9C90LjQuiDQsdGD0LTQtdGCINC30LDQs9GA0YPQttC10L1cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmxpYnMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgbGV0IHZhc3R1cyA9IEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSksICAvLyB3aWxsIHdhdGNoIGxpYnMgY2hhbmdlIChmcm9tIHNlcnZlcilcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBuZXdWYWx1ZS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gc2VsZi5wcm9wcy5saWJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbGliID0gZGF0YVswXS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgc2VsZyA9IGRhdGFbMF0uZGF0YS5sZW5ndGggPyBzZWxmLmdldERlc2NyaXB0aW9uQnlTZWxlY3RWYWx1ZShsaWIpLnRvU3RyaW5nKCkgOiAnJztcclxuICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7bGliRGF0YTogbGliLCBkZXNjcmlwdGlvbjogc2VsZ30pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZWxlY3RUZXh0V2lkZ2V0LnByb3RvdHlwZSxcImdldERlc2NyaXB0aW9uQnlTZWxlY3RWYWx1ZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGxpYkRhdGEpIHtcclxuICAgICAgICAvLyDQvdCw0LnQtNC10Lwg0LIg0YHQv9GA0LDQstC+0YfQvdC40LrQtSDQvtC/0LjRgdCw0L3QuNC1INC4INGD0YHRgtCw0L3QvtCy0LjQvCDQtdCz0L4g0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgbGV0IGxpYlJvdyA9IGxpYkRhdGEuZmlsdGVyKGZ1bmN0aW9uKGxpYikgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobGliLmlkID09IHRoaXMucHJvcHMudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGliO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpLFxyXG4gICAgICAgICAgICBzZWxnID0gJycsXHJcbiAgICAgICAgICAgIHNlbGdPYmplY3QgPSBsaWJSb3cubGVuZ3RoID8gbGliUm93WzBdLmRldGFpbHMgOiAnJztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcHJvcGVydHkgaW4gc2VsZ09iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZ09iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcclxuICAgICAgICAgICAgICAgIC8vINC40L3RgtC10YDQtdGB0YPRjtGCINGC0L7Qu9GM0LrQviBcItGB0L7QsdGB0YLQstC10L3QvdGL0LVcIiDRgdCy0L7QudGB0YLQstCwINC+0LHRitC10LrRgtCwXHJcbiAgICAgICAgICAgICAgICBzZWxnID0gc2VsZyArIHByb3BlcnR5ICsgJzonICsgc2VsZ09iamVjdFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGc7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNlbGVjdFRleHRXaWRnZXQucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7Y2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzZWxlY3RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGliczogdGhpcy5wcm9wcy5saWJzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZVNlbGVjdE9uQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHtyZWY6IFwidGV4dFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibXV1ZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkRva1Byb3BcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5kZXNjcmlwdGlvbiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogJ3RydWUnfVxyXG4gICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuU2VsZWN0VGV4dFdpZGdldC5Qcm9wVHlwZXMgPSB7XHJcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbGliczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgcmVhZE9ubHk6IFJlYWN0LlByb3BUeXBlcy5ib29sXHJcbn1cclxuXHJcblxyXG5TZWxlY3RUZXh0V2lkZ2V0LmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHJlYWRPbmx5OiBmYWxzZSxcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RUZXh0V2lkZ2V0O1xyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvY3Byb3AvZG9jcHJvcC5qc3hcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IHJlbGF0ZWREb2N1bWVudHMgPSBmdW5jdGlvbihzZWxmKSAge1xyXG4gICAgLy8g0YTQvtGA0LzQuNGA0YPQtdC8INC30LDQstC40YHQuNC80L7RgdGC0LhcclxuICAgIGxldCByZWxhdGVkRG9jdW1lbnRzID0gc2VsZi5zdGF0ZS5yZWxhdGlvbnM7XHJcbiAgICBpZiAocmVsYXRlZERvY3VtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgcmVsYXRlZERvY3VtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGRvYykgIHtcclxuICAgICAgICAgICAgaWYgKGRvYy5pZCkge1xyXG4gICAgICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LjQvCDQvdCwINGD0L3QuNC60LDQu9GM0L3QvtGB0YLRjCDRgdC/0LjRgdC60LAg0LTQvtC60YPQvNC10L3RgtC+0LJcclxuICAgICAgICAgICAgICAgIGxldCBpc0V4aXN0cyA9IHNlbGYucGFnZXMuZmluZChmdW5jdGlvbihwYWdlKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGFnZS5kb2NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhZ2UuZG9jSWQgPT0gZG9jLmlkICYmIHBhZ2UuZG9jVHlwZUlkID09IGRvYy5kb2NfdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzRXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0LIg0LzQsNGB0YHQuNCy0LUg0L3QtdGCLCDQtNC+0LHQsNCy0LjQvCDRgdGB0YvQu9C60YMg0L3QsCDQtNC+0LrRg9C80LXQvdGCXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wYWdlcy5wdXNoKHtkb2NUeXBlSWQ6IGRvYy5kb2NfdHlwZSwgZG9jSWQ6IGRvYy5pZCwgcGFnZU5hbWU6IGRvYy5uYW1lICsgJyBpZDonICsgZG9jLmlkfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbGF0ZWREb2N1bWVudHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9taXhpbi9yZWxhdGVkRG9jdW1lbnRzLmpzeFxuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIFRvb2xiYXJDb250YWluZXIgPSByZXF1aXJlKCcuLy4uL3Rvb2xiYXItY29udGFpbmVyL3Rvb2xiYXItY29udGFpbmVyLmpzeCcpLFxyXG4gICAgQnRuQWRkID0gcmVxdWlyZSgnLi8uLi9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWFkZC9idXR0b24tcmVnaXN0ZXItYWRkLmpzeCcpLFxyXG4gICAgQnRuRWRpdCA9IHJlcXVpcmUoJy4vLi4vYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeCcpLFxyXG4gICAgQnRuU2F2ZSA9IHJlcXVpcmUoJy4vLi4vYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1zYXZlL2J1dHRvbi1yZWdpc3Rlci1zYXZlLmpzeCcpLFxyXG4gICAgQnRuUHJpbnQgPSByZXF1aXJlKCcuLy4uL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItcHJpbnQvYnV0dG9uLXJlZ2lzdGVyLXByaW50LmpzeCcpLFxyXG4gICAgVGFza1dpZGdldCA9IHJlcXVpcmUoJy4vLi4vdGFzay13aWRnZXQvdGFzay13aWRnZXQuanN4Jyk7XHJcblxyXG52YXIgX19fX0NsYXNzbT1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzbV9fX19LZXkgaW4gX19fX0NsYXNzbSl7aWYoX19fX0NsYXNzbS5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NtX19fX0tleSkpe0RvY1Rvb2xCYXJbX19fX0NsYXNzbV9fX19LZXldPV9fX19DbGFzc21bX19fX0NsYXNzbV9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NtPV9fX19DbGFzc209PT1udWxsP251bGw6X19fX0NsYXNzbS5wcm90b3R5cGU7RG9jVG9vbEJhci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzbSk7RG9jVG9vbEJhci5wcm90b3R5cGUuY29uc3RydWN0b3I9RG9jVG9vbEJhcjtEb2NUb29sQmFyLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc207XHJcbiAgICBmdW5jdGlvbiBEb2NUb29sQmFyKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzbS5jYWxsKHRoaXMscHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLmJ0bkVkaXRDbGljayA9IHRoaXMuYnRuRWRpdENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5idG5BZGRDbGljayA9IHRoaXMuYnRuQWRkQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmJ0blNhdmVDbGljayA9IHRoaXMuYnRuU2F2ZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5idG5QcmludENsaWNrID0gdGhpcy5idG5QcmludENsaWNrLmJpbmQodGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NUb29sQmFyLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBpc0VkaXRNb2RlID0gdGhpcy5wcm9wcy5lZGl0ZWQsXHJcbiAgICAgICAgICAgIGlzRG9jRGlzYWJsZWQgPSB0aGlzLnByb3BzLmRvY1N0YXR1cyA9PSAyID8gdHJ1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRvb2xiYXJQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICBidG5BZGQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiAhaXNFZGl0TW9kZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogaXNFZGl0TW9kZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJ0bkVkaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiAhaXNFZGl0TW9kZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogaXNEb2NEaXNhYmxlZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJ0blByaW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJ0blNhdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiBpc0VkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyQ29udGFpbmVyLCB7cmVmOiBcInRvb2xiYXJDb250YWluZXJcIn0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5BZGQsIHtyZWY6IFwiYnRuQWRkXCIsIG9uQ2xpY2s6IHRoaXMuYnRuQWRkQ2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0bkFkZCddLnNob3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdG9vbGJhclBhcmFtc1snYnRuQWRkJ10uZGlzYWJsZWR9KSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ0bkVkaXQsIHtyZWY6IFwiYnRuRWRpdFwiLCBvbkNsaWNrOiB0aGlzLmJ0bkVkaXRDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuRWRpdCddLnNob3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRvb2xiYXJQYXJhbXNbJ2J0bkVkaXQnXS5kaXNhYmxlZH0pLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuU2F2ZSwge3JlZjogXCJidG5TYXZlXCIsIG9uQ2xpY2s6IHRoaXMuYnRuU2F2ZUNsaWNrLCBzaG93OiB0b29sYmFyUGFyYW1zWydidG5TYXZlJ10uc2hvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdG9vbGJhclBhcmFtc1snYnRuU2F2ZSddLmRpc2FibGVkfSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5QcmludCwge3JlZjogXCJidG5QcmludFwiLCBvbkNsaWNrOiB0aGlzLmJ0blByaW50Q2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0blByaW50J10uc2hvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRvb2xiYXJQYXJhbXNbJ2J0blByaW50J10uZGlzYWJsZWR9KSwgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmJwbSA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFza1dpZGdldCwge3JlZjogXCJ0YXNrV2lkZ2V0XCIsIHRhc2tMaXN0OiB0aGlzLnByb3BzLmJwbSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVTZWxlY3RUYXNrOiB0aGlzLmhhbmRsZVNlbGVjdFRhc2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQnV0dG9uVGFzazogdGhpcy5oYW5kbGVCdXR0b25UYXNrfVxyXG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsXHJcblxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NUb29sQmFyLnByb3RvdHlwZSxcImJ0bkFkZENsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LTQu9GPINC60L3QvtC/0LrQuCBBZGRcclxuICAgICAgICAvLyDQvtGC0L/RgNCw0LLQuNC8INC40LfQstC10YnQtdC90LjQtSDQvdCw0LLQtdGA0YVcclxuLy8gICAgICAgIHRoaXMucHJvcHMub25DbGljayh0aGlzLm5hbWUpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RvY0lkQ2hhbmdlJywgMCk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgdHJ1ZSk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignc2F2ZWRDaGFuZ2UnLCBmYWxzZSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERvY1Rvb2xCYXIucHJvdG90eXBlLFwiYnRuRWRpdENsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LTQu9GPINC60L3QvtC/0LrQuCBFZGl0XHJcbiAgICAgICAgLy8g0L/QtdGA0LXQstC+0LTQuNC8INC00L7QutGD0LzQtdC90YIg0LIg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPLCDRgdC+0YXRgNCw0L3QtdC9ID0gZmFsc2VcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuZG9jU3RhdHVzIHx8IHRoaXMucHJvcHMuZG9jU3RhdHVzIDwgMiApIHtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRG9jVG9vbEJhci5wcm90b3R5cGUsXCJidG5QcmludENsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ByaW50IGNhbGxlZCcpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEb2NUb29sQmFyLnByb3RvdHlwZSxcImJ0blNhdmVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQutC90L7Qv9C60LggU2F2ZVxyXG4gICAgICAgIC8vINCy0LDQu9C40LTQsNGC0L7RgFxyXG5cclxuLy8gICAgICAgIGxldCBpc1ZhbGlkID0gIXRoaXMudmFsaWRhdG9yKCk7IEB0b2RvIHZhbGlkYXRvclxyXG4gICAgICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKGlzVmFsaWQpIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/RgNC+0YjQu9C4INCy0LDQu9C40LTQsNGG0LjRjiwg0YLQviDRgdC+0YXRgNCw0L3QtdGP0LxcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2F2ZURhdGEnKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzYXZlZENoYW5nZScsIHRydWUpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERvY1Rvb2xCYXIucHJvdG90eXBlLFwiaGFuZGxlQnV0dG9uVGFza1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC80LXRgtC+0LQg0LLRi9C30YvQstCw0LXRgtGB0Y8g0L/RgNC4INCy0YvQsdC+0YDQtSDQt9Cw0LTQsNGH0LhcclxuICAgICAgICAvLyDQvdCw0LnQtNC10Lwg0LDQutGC0YPQsNC70YzQvdGD0Y4g0LfQsNC00LDRh9GDXHJcblxyXG4gICAgICAgIGxldCBhY3R1YWxUYXNrID0gdGhpcy5zdGF0ZS50YXNrTGlzdC5maWx0ZXIoZnVuY3Rpb24odGFzaykgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YXNrLmFjdHVhbFN0ZXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFzaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHRhc2sgPSBhY3R1YWxUYXNrLm1hcChmdW5jdGlvbih0YXNrKSAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhc2suYWN0aW9uXHJcbiAgICAgICAgICAgIH0pOyAvLyDQvtGB0YLQsNCy0LjQvCDRgtC+0LvRjNC60L4g0L3QsNC30LLQsNC90LjQtSDQv9GA0L7RhtC10LTRg9GA0YtcclxuXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZXhlY3V0ZVRhc2snLCB0YXNrKTtcclxuICAgIH19KTtcclxuXHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERvY1Rvb2xCYXIucHJvdG90eXBlLFwiaGFuZGxlU2VsZWN0VGFza1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAvLyDQvNC10YLQvtC0INCy0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQstGL0LHQvtGA0LUg0LfQsNC00LDRh9C4XHJcbiAgICAgICAgLy90b2RvINCX0LDQutC+0L3Rh9C40YLRjFxyXG4gICAgICAgIGNvbnN0IHRhc2tWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgfX0pO1xyXG5cclxuXHJcblxyXG5Eb2NUb29sQmFyLlByb3BUeXBlcyA9IHtcclxuICAgIGJwbTogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgZWRpdGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIGRvY1N0YXR1czogUmVhY3QuUHJvcFR5cGVzLm51bWJlclxyXG59XHJcblxyXG5Eb2NUb29sQmFyLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGJwbTogW10sXHJcbiAgICBlZGl0ZWQ6IGZhbHNlLFxyXG4gICAgZG9jU3RhdHVzOiAwXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9jVG9vbEJhcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLXRvb2xiYXIvZG9jLXRvb2xiYXIuanN4XG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyksXHJcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXHJcbiAgICBJQ09OID0gJ3NhdmUnO1xyXG5cclxuXHJcbnZhciBfX19fQ2xhc3NwPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NwX19fX0tleSBpbiBfX19fQ2xhc3NwKXtpZihfX19fQ2xhc3NwLmhhc093blByb3BlcnR5KF9fX19DbGFzc3BfX19fS2V5KSl7QnV0dG9uUmVnaXN0ZXJQcmludFtfX19fQ2xhc3NwX19fX0tleV09X19fX0NsYXNzcFtfX19fQ2xhc3NwX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3A9X19fX0NsYXNzcD09PW51bGw/bnVsbDpfX19fQ2xhc3NwLnByb3RvdHlwZTtCdXR0b25SZWdpc3RlclByaW50LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NwKTtCdXR0b25SZWdpc3RlclByaW50LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1CdXR0b25SZWdpc3RlclByaW50O0J1dHRvblJlZ2lzdGVyUHJpbnQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzcDtcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgZnVuY3Rpb24gQnV0dG9uUmVnaXN0ZXJQcmludChwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc3AuY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyUHJpbnQucHJvdG90eXBlLFwiaGFuZGxlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DbGljaygpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlclByaW50LnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtkaXNhYmxlZDogbmV4dFByb3BzLmRpc2FibGVkfSlcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJQcmludC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHtcclxuICAgICAgICAgICAgcmVmOiBcImJ0blNhdmVcIiwgXHJcbiAgICAgICAgICAgIHZhbHVlOiBcIlNhdmVcIiwgXHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdywgXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnN0YXRlLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24oZSkge3JldHVybiB0aGlzLmhhbmRsZUNsaWNrKGUpO30uYmluZCh0aGlzKX0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIiwge3JlZjogXCJpbWFnZVwiLCBzcmM6IHN0eWxlcy5pY29uc1tJQ09OXX0pXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG47XHJcblxyXG5CdXR0b25SZWdpc3RlclByaW50LnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2xcclxufVxyXG5cclxuXHJcbkJ1dHRvblJlZ2lzdGVyUHJpbnQuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgc2hvdzogdHJ1ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25SZWdpc3RlclByaW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXNhdmUvYnV0dG9uLXJlZ2lzdGVyLXNhdmUuanN4XG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZXhlY3V0ZS9idXR0b24tcmVnaXN0ZXItZXhlY3V0ZS5qc3gnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vdGFzay13aWRnZXQtc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzcT1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzcV9fX19LZXkgaW4gX19fX0NsYXNzcSl7aWYoX19fX0NsYXNzcS5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NxX19fX0tleSkpe1Rhc2tXaWRnZXRbX19fX0NsYXNzcV9fX19LZXldPV9fX19DbGFzc3FbX19fX0NsYXNzcV9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NxPV9fX19DbGFzc3E9PT1udWxsP251bGw6X19fX0NsYXNzcS5wcm90b3R5cGU7VGFza1dpZGdldC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzcSk7VGFza1dpZGdldC5wcm90b3R5cGUuY29uc3RydWN0b3I9VGFza1dpZGdldDtUYXNrV2lkZ2V0Ll9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc3E7XHJcbiAgICBmdW5jdGlvbiBUYXNrV2lkZ2V0KHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzcS5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIGxldCB0YXNrcyA9IHByb3BzLnRhc2tMaXN0O1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygndGFza3MnLCB0YXNrcyk7XHJcbiAgICAgICAgaWYgKHRhc2tzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRhc2tzID0gW3tzdGVwOiAwLCBuYW1lOiAnU3RhcnQnLCBhY3Rpb246ICdzdGFydCcsIHN0YXR1czogJ29wZW5lZCd9XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHRhc2tMaXN0OiB0YXNrc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3RUYXNrID0gdGhpcy5oYW5kbGVTZWxlY3RUYXNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVCdXR0b25UYXNrID0gdGhpcy5oYW5kbGVCdXR0b25UYXNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tXaWRnZXQucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHRhc2tzID0gdGhpcy5zdGF0ZS50YXNrTGlzdC5maWx0ZXIoZnVuY3Rpb24odGFzaykgIHtcclxuICAgICAgICAgICAgaWYgKHRhc2suc3RhdHVzID09PSAnb3BlbmVkJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhc2s7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXRhc2tzKSByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsKVxyXG5cclxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMud3JhcHBlcn0sIFxyXG4gICAgICAgICAgICAgICAgdGFza3MubGVuZ3RoID4gMSA/XHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlU2VsZWN0VGFzaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzZWxlY3RUYXNrXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrcy5tYXAoZnVuY3Rpb24odGFza05hbWUsIGluZGV4KSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSAnb3B0aW9uLScgKyBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHt2YWx1ZTogMCwga2V5OiBrZXksIHJlZjoga2V5fSwgXCIgXCIsIHRhc2tOYW1lLm5hbWUsIFwiIFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgKSA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJidXR0b25UYXNrXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQnV0dG9uVGFzaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRhc2tzLmxlbmd0aCA9PSAxID8gdHJ1ZTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGFza3MubGVuZ3RoID09IDE/IHRhc2tzWzBdLm5hbWU6ICcnfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICApXHJcblxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGFza1dpZGdldC5wcm90b3R5cGUsXCJoYW5kbGVTZWxlY3RUYXNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGxldCB0YXNrTmFtZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlU2VsZWN0VGFzayh0YXNrTmFtZSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRhc2tXaWRnZXQucHJvdG90eXBlLFwiaGFuZGxlQnV0dG9uVGFza1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlQnV0dG9uVGFzaygpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUYXNrV2lkZ2V0LnByb3RvdHlwZSxcImdldERlZmF1bHRUYXNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFt7c3RlcDogMCwgbmFtZTogJ1N0YXJ0JywgYWN0aW9uOiAnc3RhcnQnLCBzdGF0dXM6ICdvcGVuZWQnfV1cclxuICAgIH19KTtcclxuXHJcblxyXG5cclxuVGFza1dpZGdldC5Qcm9wVHlwZXMgPSB7XHJcbiAgICB0YXNrTGlzdDogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICBoYW5kbGVCdXR0b25UYXNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgaGFuZGxlU2VsZWN0VGFzazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUYXNrV2lkZ2V0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy90YXNrLXdpZGdldC90YXNrLXdpZGdldC5qc3hcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcclxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcclxuICAgIElDT04gPSAnZXhlY3V0ZSc7XHJcblxyXG5cclxudmFyIF9fX19DbGFzc3I9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc3JfX19fS2V5IGluIF9fX19DbGFzc3Ipe2lmKF9fX19DbGFzc3IuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzcl9fX19LZXkpKXtCdXR0b25SZWdpc3RlckV4ZWN1dGVbX19fX0NsYXNzcl9fX19LZXldPV9fX19DbGFzc3JbX19fX0NsYXNzcl9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NyPV9fX19DbGFzc3I9PT1udWxsP251bGw6X19fX0NsYXNzci5wcm90b3R5cGU7QnV0dG9uUmVnaXN0ZXJFeGVjdXRlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NyKTtCdXR0b25SZWdpc3RlckV4ZWN1dGUucHJvdG90eXBlLmNvbnN0cnVjdG9yPUJ1dHRvblJlZ2lzdGVyRXhlY3V0ZTtCdXR0b25SZWdpc3RlckV4ZWN1dGUuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzcjtcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgZnVuY3Rpb24gQnV0dG9uUmVnaXN0ZXJFeGVjdXRlKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzci5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyRXhlY3V0ZS5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGlja2VkJyk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKCk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyRXhlY3V0ZS5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHtcclxuICAgICAgICAgICAgcmVmOiBcImJ0bkV4ZWN1dGVcIiwgXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLCBcclxuICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93LCBcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQsIFxyXG4gICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrfSwgXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWFnZVwiLCB7cmVmOiBcImltYWdlXCIsIHNyYzogc3R5bGVzLmljb25zW0lDT05dfSlcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcbjtcclxuXHJcbkJ1dHRvblJlZ2lzdGVyRXhlY3V0ZS5wcm9wVHlwZXMgPSB7XHJcbiAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5cclxuQnV0dG9uUmVnaXN0ZXJFeGVjdXRlLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHNob3c6IHRydWVcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uUmVnaXN0ZXJFeGVjdXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWV4ZWN1dGUvYnV0dG9uLXJlZ2lzdGVyLWV4ZWN1dGUuanN4XG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHdyYXBwZXI6IHtcbiAgICAgICAgZGlzcGxheTogJ2lubGluZS1mbGV4J1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3Rhc2std2lkZ2V0L3Rhc2std2lkZ2V0LXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIHZhbGlkYXRlRm9ybSA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybShzZWxmLCByZXFGaWVsZHMpIHtcblxuICAgIC8vINCy0LDQu9C40LTQsNGG0LjRjyDRhNC+0YDQvNGLXG4gICAgdmFyIHdhcm5pbmcgPSB2b2lkIDAsXG4gICAgICAgIHJlcXVpcmVkRmllbGRzID0gcmVxRmllbGRzIHx8IFtdLFxuICAgICAgICBub3RSZXF1aXJlZEZpZWxkcyA9IFtdLFxuICAgICAgICBub3RNaW5NYXhSdWxlID0gW10sXG4gICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xuXG4gICAgcmVxdWlyZWRGaWVsZHMuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgaWYgKGZpZWxkLm5hbWUgaW4gZGF0YSkge1xuXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBkYXRhW2ZpZWxkLm5hbWVdO1xuXG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm90UmVxdWlyZWRGaWVsZHMucHVzaChmaWVsZC5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LAg0L3QsCDQvNC40L0gLiDQvNCw0LrRgSDQt9C90LDRh9C10L3QuNGPXG5cbiAgICAgICAgICAgIC8vIHx8IHZhbHVlICYmIHZhbHVlID4gcHJvcHMubWF4XG4gICAgICAgICAgICB2YXIgY2hlY2tWYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGZpZWxkLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRyb2xsZWRWYWx1ZUQgPSBEYXRlLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLm1pbiAmJiBjb250cm9sbGVkVmFsdWVEIDwgZmllbGQubWluICYmIGZpZWxkLm1heCAmJiBjb250cm9sbGVkVmFsdWVEID4gZmllbGQubWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRyb2xsZWRWYWx1ZU4gPSBOdW1iZXIodmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZC5taW4gJiYgY29udHJvbGxlZFZhbHVlTiA9PT0gMCB8fCBmaWVsZC5taW4gJiYgY29udHJvbGxlZFZhbHVlTiA8IGZpZWxkLm1pbiAmJiBmaWVsZC5tYXggJiYgY29udHJvbGxlZFZhbHVlTiA+IGZpZWxkLm1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hlY2tWYWx1ZSkge1xuICAgICAgICAgICAgICAgIG5vdE1pbk1heFJ1bGUucHVzaChmaWVsZC5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG5vdFJlcXVpcmVkRmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgd2FybmluZyA9ICdwdXVkdWIgdmFqYWxpa3VkIGFuZG1lZCAoJyArIG5vdFJlcXVpcmVkRmllbGRzLmpvaW4oJywgJykgKyAnKSAnO1xuICAgIH1cblxuICAgIGlmIChub3RNaW5NYXhSdWxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgd2FybmluZyA9IHdhcm5pbmcgPyB3YXJuaW5nIDogJycgKyAnIG1pbi9tYXggb24gdmFsZSgnICsgbm90TWluTWF4UnVsZS5qb2luKCcsICcpICsgJykgJztcbiAgICB9XG5cbiAgICByZXR1cm4gd2FybmluZzsgLy8g0LLQtdGA0L3QtdC8INC40LfQstC10YnQtdC90LjQtSDQvtCxINC40YLQvtCz0LDRhSDQstCw0LvQuNC00LDRhtC40Lhcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsaWRhdGVGb3JtO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvbWl4aW4vdmFsaWRhdGVGb3JtLmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRvY1Jvdzoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmx1ZSdcbiAgICB9LFxuICAgIGRvY0NvbHVtbjoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgeWVsbG93JyxcbiAgICAgICAgd2lkdGg6ICc1MCUnXG4gICAgfSxcbiAgICBkb2M6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJyb3duJ1xuICAgIH1cblxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLnN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIGRvY1N0b3JlID0gZmx1eC5jcmVhdGVTdG9yZSh7XG4gICAgaWQ6ICdkb2NTdG9yZScsXG4gICAgaW5pdGlhbFN0YXRlOiB7XG4gICAgICAgIGdyaWRDZWxsRWRpdGVkOiAwLCAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INCyINCz0YDQuNC00LUg0YDQtdC00LDQutGC0LjRgNGD0LXQvNGD0Y4g0Y/Rh9C10LnQutGDXG4gICAgICAgIGRhdGE6IFtdLFxuICAgICAgICBkZXRhaWxzOiBbXSwgLy8g0LTQsNC90L3Ri9C1INC90LAg0LPRgNC40LRcbiAgICAgICAgcmVsYXRpb25zOiBbXSwgLy8g0LTQsNC90L3Ri9C1INC90LAg0YHQstGP0LfQsNC90L3Ri9C1INC00L7QutGD0LzQtdC90YLRi1xuICAgICAgICBncmlkQ29uZmlnOiBbXSwgLy8g0LrQvtC90YTQuNCz0YPRgNCw0YbQuNGPINCz0YDQuNC00LBcbiAgICAgICAgZ3JpZE5hbWU6ICcnLFxuICAgICAgICBkb2NJZDogMCxcbiAgICAgICAgZGVsZXRlZDogZmFsc2UsXG4gICAgICAgIGVkaXRlZDogZmFsc2UsXG4gICAgICAgIHNhdmVkOiB0cnVlLFxuICAgICAgICBncmlkUm93SWQ6IDAsXG4gICAgICAgIGxpYnM6IFt7XG4gICAgICAgICAgICBpZDogJ2FzdXR1c2VkJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbXVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZGF0YTpbe2lkOjEsIG5hbWU6XCJBc3V0dXMgMVwifSx7aWQ6MiwgbmFtZTpcIkFzdXR1cyAyXCJ9LHtpZDozLCBuYW1lOlwiQXN1dHVzIDNcIn0gXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ25vbWVuY2xhdHVyZScsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICdrb250b2QnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAncHJvamVjdCcsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICd0dW5udXMnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnYWEnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnYXJ2ZWRTaXNzZScsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW251bGwsIG51bGxdLFxuICAgICAgICAgICAgZmllbGRzOiBbJ2FzdXR1c2lkJywgJ2FydmlkJ10gLy8g0LjQtCDQutC+0L3RgtGALdCw0LPQtdC90YLQsCDQuCDQvdC+0LzQtdGAINGB0YfQtdGC0LBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICdhcnZlZFZhbGphJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBmaWVsZHM6IFsnYXN1dHVzaWQnLCAnYXJ2aWQnXSAvLyDQuNC0INC60L7QvdGC0YAt0LDQs9C10L3RgtCwINC4INC90L7QvNC10YAg0YHRh9C10YLQsFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ3VzZXJzJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ2Rva1Byb3BzJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbbnVsbCwgbnVsbF0sXG4gICAgICAgICAgICBmaWVsZHM6IFsnZG9jX3R5cGVfaWQnLCAncmVrdmlkJ10gLy8g0YLQuNC/INC00L7QutGD0LzQtdC90YLQsCDQuCDQuNC0INGD0YfRgNC10LbQtNC10L3QuNGPXG4gICAgICAgIH1dLFxuICAgICAgICBicG06IFtdLCAvLyDQtNCw0L3QvdGL0LUg0JHQnyDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAgICAgdGFzazoge30gLy8g0YLQtdC60YPRidCw0Y8g0LfQsNC00LDRh9CwXG4gICAgfSxcbiAgICBhY3Rpb25DYWxsYmFja3M6IHtcbiAgICAgICAgc2V0TGlic0ZpbHRlcjogZnVuY3Rpb24gc2V0TGlic0ZpbHRlcih1cGRhdGVyLCBsaWJOYW1lLCBmaWx0ZXIpIHtcblxuICAgICAgICAgICAgLy8g0LjRidC10Lwg0YHQv9GA0LDQstC+0YfQvdC40LpcbiAgICAgICAgICAgIHZhciBsaWJzID0gdGhpcy5saWJzO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGlic1tpXS5pZCA9PSBsaWJOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpYnNbaV0uZmlsdGVyID0gZmlsdGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignbG9hZExpYnMnLCBsaWJOYW1lKTsgLy/QvdC+0LLRi9C1INC00LDQvdC90YvQtVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBncmlkUm93SWRDaGFuZ2U6IGZ1bmN0aW9uIGdyaWRSb3dJZENoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdncmlkUm93SWRDaGFuZ2UgY2FsbGVkOicgKyB2YWx1ZSk7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGdyaWRSb3dJZDogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRMaWJzOiBmdW5jdGlvbiBsb2FkTGlicyh1cGRhdGVyLCBsaWJzVG9VcGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vINCz0YDRg9C30LjQvCDRgdC/0YDQsNCy0L7Rh9C90LjQutC4XG4gICAgICAgICAgICB2YXIgbGlicyA9IHRoaXMubGlicy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWxpYnNUb1VwZGF0ZSB8fCBpdGVtLmlkID09IGxpYnNUb1VwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8g0LLRi9C30YvQstCw0LXQvCDQvtCx0L3QvtCy0LvQtdC90LjQtSDRgdC/0YDQsNCy0L7Rh9C90LjQutCwINGBINGB0LXRgNCy0LXRgNCwXG4gICAgICAgICAgICBsaWJzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgbGliUGFyYW1zID0gW107XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpYlBhcmFtcyA9IGl0ZW0ucGFyYW1zO1xuICAgICAgICAgICAgICAgICAgICAvLyDRg9GB0YLQsNC90L7QstC40Lwg0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDQt9Cw0L/RgNC+0YHQsFxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpYlBhcmFtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGliUGFyYW1zW2ldID0gX3RoaXMuZGF0YVtpdGVtLmZpZWxkc1tpXV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX2xvYWRMaWJzKGl0ZW0uaWQsIGxpYlBhcmFtcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2F2ZURhdGE6IGZ1bmN0aW9uIHNhdmVEYXRhKHVwZGF0ZXIpIHtcbiAgICAgICAgICAgIHNhdmVEb2MoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXhlY3V0ZVRhc2s6IGZ1bmN0aW9uIGV4ZWN1dGVUYXNrKHVwZGF0ZXIsIHRhc2spIHtcbiAgICAgICAgICAgIF9leGVjdXRlVGFzayh0YXNrKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlRG9jOiBmdW5jdGlvbiBkZWxldGVEb2ModXBkYXRlcikge1xuICAgICAgICAgICAgX2RlbGV0ZURvYygpO1xuICAgICAgICB9LFxuICAgICAgICBncmlkQ2VsbEVkaXRlZENoYW5nZTogZnVuY3Rpb24gZ3JpZENlbGxFZGl0ZWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbGVkIGdyaWRDZWxsRWRpdGVkQ2hhbmdlOicgKyB2YWx1ZSk7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGdyaWRDZWxsRWRpdGVkOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZG9jSWRDaGFuZ2U6IGZ1bmN0aW9uIGRvY0lkQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIC8vINGH0LjRgdGC0LjQvCDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkb2NJZENoYW5nZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRvY0lkOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdkb2NJZENoYW5nZSB2aWdhJywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFDaGFuZ2U6IGZ1bmN0aW9uIGRhdGFDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCe0YLRgdC70LXQttC40LLQsNC10YIg0LfQsNCz0YDRg9C30LrRgyDQtNCw0L3QvdGL0YUg0LTQvtC60YPQvNC10L3RgtCwXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRhdGE6IHZhbHVlIH0pO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlLmFydmlkICE9PSAndW5kZWZpbml0ZScpIHtcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQutC+0L3RgtGA0LDQs9C10L3RgiDQvtGC0YHRg9GC0YHQstGD0LXRgiwg0YLQviDQuCDQv9Cw0YDQsNC80LXRgtGAINC60L7QvdGC0YDQsNCz0LXQvdGC0LAg0YLQsNC60LbQtSDQvtCx0L3Rg9C70LjQvFxuICAgICAgICAgICAgICAgIHZhbHVlLmFydmlkID0gdmFsdWUuYXN1dHVzaWQgPyB2YWx1ZS5hcnZpZCA6IG51bGw7XG4gICAgICAgICAgICAgICAgLy8g0LfQsNC00LDQtNC40Lwg0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDRgdC/0YDQsNCy0L7Rh9C90LjQutCwINGB0YfQtdGC0L7QslxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NldExpYnNGaWx0ZXInLCAnYXJ2ZWRTaXNzZScsIFt2YWx1ZS5hc3V0dXNpZCwgdmFsdWUuYXJ2aWRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYnBtQ2hhbmdlOiBmdW5jdGlvbiBicG1DaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCX0LDQs9GA0YPQt9C60LAg0JHQn1xuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZygnYnBtQ2hhbmdlJywgdmFsdWUpO1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBicG06IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZWxhdGlvbnNDaGFuZ2U6IGZ1bmN0aW9uIHJlbGF0aW9uc0NoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQt9Cw0LPRgNGD0LfQutGDINC00LDQvdC90YvRhSDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC10Lkg0LTQvtC60YPQvNC10L3RgtCwXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHJlbGF0aW9uczogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRldGFpbHNDaGFuZ2U6IGZ1bmN0aW9uIGRldGFpbHNDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCe0YLRgdC70LXQttC40LLQsNC10YIg0LfQsNCz0YDRg9C30LrRgyDQtNCw0L3QvdGL0YUg0LPRgNC40LTQsCDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZGV0YWlsczogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdyaWRDb25maWdDaGFuZ2U6IGZ1bmN0aW9uIGdyaWRDb25maWdDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCe0YLRgdC70LXQttC40LLQsNC10YIg0LfQsNCz0YDRg9C30LrRgyDQutC+0L3RhNC40LPRg9GA0LDRhtC40Lgg0LPRgNC40LTQsFxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBncmlkQ29uZmlnOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlZENoYW5nZTogZnVuY3Rpb24gZGVsZXRlZENoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0LHRi9C70LAg0LLRi9C30LLQsNC90LAg0LrQvdC+0L/QutCwIERlbGV0ZVxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkZWxldGVkOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdGVkQ2hhbmdlOiBmdW5jdGlvbiBlZGl0ZWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCc0LXQvdGP0LXRgtGB0Y8g0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsFxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBlZGl0ZWQ6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzYXZlZENoYW5nZTogZnVuY3Rpb24gc2F2ZWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCe0YLRgdC70LXQttC40LLQsNC10YIg0LjQt9C80LXQvdC10L3QuNGPINCyINC00LDQvdC90YvRhSDQuCDQuNC3INGB0L7RhdGA0LDQvdC10L3QuNC1XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHNhdmVkOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbGlic0NoYW5nZTogZnVuY3Rpb24gbGlic0NoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YHQv9GA0LDQstC+0YfQvdC40LrQsNGFXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsaWJzQ2hhbmdlIGNhbGxlZCcsIHZhbHVlKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgbGliczogdmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdyaWROYW1lQ2hhbmdlOiBmdW5jdGlvbiBncmlkTmFtZUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBncmlkTmFtZTogdmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZnVuY3Rpb24gX2RlbGV0ZURvYygpIHtcbiAgICAvLyDQstGL0LfRi9Cy0LDQtdGCINC80LXRgtC+0LQg0YPQtNCw0LvQtdC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAvLyDQstC10YDQvdC10LzRgdGPINCyINGA0LXQs9C40YHRgtGAXG4gICAgLy9yZXF1ZXJ5KCdkZWxldGUnLCBudWxsKTtcbiAgICBkb2N1bWVudC5sb2NhdGlvbiA9ICcvZG9jdW1lbnRzJztcbn07XG5cbmZ1bmN0aW9uIF9leGVjdXRlVGFzayh0YXNrKSB7XG4gICAgLypcclxuICAgICAgICDQktGL0L/QvtC70L3QuNGCINC30LDQv9GA0L7RgSDQvdCwINC40YHQv9C+0LvQvdC10L3QuNC1INC30LDQtNCw0YfQuFxyXG4gICAgICovXG5cbiAgICB2YXIgdGFza3NQYXJhbWV0ZXJzID0ge1xuICAgICAgICBkb2NJZDogZG9jU3RvcmUuZGF0YS5pZCxcbiAgICAgICAgdGFza3M6IHRhc2ssXG4gICAgICAgIGRvY190eXBlX2lkOiBkb2NTdG9yZS5kYXRhLmRvY190eXBlX2lkXG4gICAgfTtcblxuICAgIC8vICAgY29uc29sZS5sb2coJ2V4ZWN1dGVUYXNrOicsIHRhc2ssIHRhc2tzUGFyYW1ldGVycyk7XG5cbiAgICByZXF1ZXJ5KCdleGVjdXRlJywgSlNPTi5zdHJpbmdpZnkodGFza3NQYXJhbWV0ZXJzKSwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyIHx8IGRhdGEucmVzdWx0ID09ICdFcnJvcicpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZygnZXhlY3V0ZVRhc2sgYXJyaXZlZCBkb2NTdG9yZS5kYXRhLmlkLCBkb2NTdG9yZS5kb2NJZCwgZGF0YScsZG9jU3RvcmUuZGF0YS5pZCxkb2NTdG9yZS5kb2NJZCwgIGRhdGEpO1xuXG4gICAgICAgICAgICAvLyDQv9GA0Lgg0YPRgdC/0LXRiNC90L7QvCDQstGL0L/QvtC70L3QtdC90LjQuCDQt9Cw0LTQsNGH0LgsINCy0YvQv9C+0LvQvdC40YLRjCDQv9C10YDQtdCz0YDRg9C30LrRgyDQtNC+0LrRg9C80LXQvdGC0LAgKNCy0YDQtdC80LXQvdC90L4pXG4gICAgICAgICAgICAvL0B0b2RvINC/0L7QtNGC0Y/QvdGD0YLRjCDQuNC30LzQtdC90LXQvdC40Y8g0LHQtdC3INC/0LXRgNC10LPRgNGD0LfQutC4INGB0YLRgNCw0L3QuNGG0YtcbiAgICAgICAgICAgIHJlbG9hZERvY3VtZW50KGRvY1N0b3JlLmRhdGEuaWQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdyZXF1ZXJ5LCByZWxvYWREb2N1bWVudCcsIGUpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBzYXZlRG9jKCkge1xuICAgIC8vINCy0YvQt9GL0LLQsNC10YIg0LzQtdGC0L7QtCDRgdC+0YXRgNCw0L3QtdC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICB2YXIgc2F2ZURhdGEgPSB7XG4gICAgICAgIGlkOiBkb2NTdG9yZS5kYXRhLmlkLFxuICAgICAgICBkb2NfdHlwZV9pZDogZG9jU3RvcmUuZGF0YS5kb2NfdHlwZV9pZCwgLy8g0LLRi9C90LXRgdC10L3QviDQtNC70Y8g0L/QvtC00LPRgNGD0LfQutC4INC80L7QtNC10LvQuFxuICAgICAgICBkYXRhOiBkb2NTdG9yZS5kYXRhLFxuICAgICAgICBkZXRhaWxzOiBkb2NTdG9yZS5kZXRhaWxzXG4gICAgfTtcblxuICAgIHJlcXVlcnkoJ3NhdmUnLCBKU09OLnN0cmluZ2lmeShzYXZlRGF0YSksIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGVycjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIG5ld0lkID0gZGF0YVswXS5pZDtcbiAgICAgICAgICAgIC8vINC+0LHQvdC+0LLQuNC8INC40LRcbiAgICAgICAgICAgIHNhdmVEYXRhLmRhdGEuaWQgPSBuZXdJZDtcblxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIHNhdmVEYXRhLmRhdGEpOyAvL9C90L7QstGL0LUg0LTQsNC90L3Ri9C1XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NJZENoYW5nZScsIG5ld0lkKTsgLy8g0L3QvtCy0L7QtSDQuNC0XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzYXZlZENoYW5nZScsIHRydWUpOyAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDRgNC10LbQuNC8INGB0L7RhdGA0LDQvdC10L1cbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2VkaXRlZENoYW5nZScsIGZhbHNlKTsgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQtdC20LjQvCDRgdC+0YXRgNCw0L3QtdC9XG5cblxuICAgICAgICAgICAgLy8gcmVsb2FkIGRvY3VtZW50XG4gICAgICAgICAgICByZWxvYWREb2N1bWVudChuZXdJZCk7IC8vQHRvZG8g0LLRi9C/0L7Qu9C90LjRgtGMINC/0LXRgNC10LPRgNGD0LfQutGDINC00LDQvdC90YvRhSDQv9C10YDQtdC3INC/0LXRgNC10LPRgNGD0LfQutC4INGB0YLRgNCw0L3QuNGG0YtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigndGVra2lzIHZpZ2EnLCBlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLypcclxuICAgIFxyXG4gICAgICAgIHJlcXVlcnkoJ3NhdmVBbmRTZWxlY3QnLCBKU09OLnN0cmluZ2lmeShzYXZlRGF0YSksIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZXJyO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5pZCAhPT0gc2F2ZURhdGEuZGF0YS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINC+0LHQvdC+0LLQuNC8INC40LRcclxuICAgICAgICAgICAgICAgICAgICBzYXZlRGF0YS5kYXRhLmlkID0gZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnZGF0YUNoYW5nZScsIHNhdmVEYXRhLmRhdGEgKTsgLy/QvdC+0LLRi9C1INC00LDQvdC90YvQtVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbiggJ2RvY0lkQ2hhbmdlJywgZGF0YS5pZCApOyAvLyDQvdC+0LLQvtC1INC40LRcclxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oICdzYXZlZENoYW5nZScsIHRydWUgKTsgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQtdC20LjQvCDRgdC+0YXRgNCw0L3QtdC9XHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnZWRpdGVkQ2hhbmdlJywgZmFsc2UgKTsgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQtdC20LjQvCDRgdC+0YXRgNCw0L3QtdC9XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAqL1xufTtcblxuZnVuY3Rpb24gcmVsb2FkRG9jdW1lbnQoZG9jSWQpIHtcbiAgICAvLyByZWxvYWQgZG9jdW1lbnRcblxuICAgIGlmIChkb2NJZCkge1xuICAgICAgICB2YXIgdXJsID0gXCIvZG9jdW1lbnQvXCIgKyBkb2NTdG9yZS5kYXRhLmRvY190eXBlX2lkICsgZG9jSWQ7XG4gICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBfbG9hZExpYnMobGlicmFyeU5hbWUsIGxpYlBhcmFtcykge1xuICAgIHRyeSB7XG5cbiAgICAgICAgcmVxdWVyeSgnc2VsZWN0JywgSlNPTi5zdHJpbmdpZnkoeyBkb2NfdHlwZV9pZDogbGlicmFyeU5hbWUsIGlkOiAwLCBwYXJhbXM6IGxpYlBhcmFtcyB9KSwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgICAgICAgICB2YXIgbmV3TGlicyA9IGRvY1N0b3JlLmxpYnMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgLy8g0LjRidC10Lwg0LTQsNC90L3Ri9C1INGB0L/RgNCw0LLQvtC70YfQvdC40LrQsCwg0LrQvtGC0L7RgNGL0LUg0L7QsdC90L7QstC40LvQuFxuICAgICAgICAgICAgICAgIHZhciByZXR1cm5EYXRhID0gaXRlbTtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09IGxpYnJhcnlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybkRhdGEuZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5EYXRhO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChuZXdMaWJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdsaWJzQ2hhbmdlJywgbmV3TGlicyk7IC8vINC/0LjRiNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyINGF0YDQsNC90LjQu9C40YnQtVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Rla2tpcyB2aWdhJywgZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZXF1ZXJ5KGFjdGlvbiwgcGFyYW1ldGVycywgY2FsbGJhY2spIHtcbiAgICAvLyDQvNC10YLQvtC0INC+0LHQtdGB0L/QtdGH0LjRgiDQv9C+0LvRg9GH0LXQvdC40LUg0LTQsNC90L3Ri9GFINC+0YIg0YHQtdGA0LLQtdGA0LBcbiAgICBpZiAoIXdpbmRvdy5qUXVlcnkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBVUkwgPSAnL2FwaS9kb2MnO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogVVJMLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICBkYXRhOiBwYXJhbWV0ZXJzXG4gICAgICAgIH0sXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIC8vINC00L7Qu9C20L3RiyDQv9C+0LvRg9GH0LjRgtGMINC+0LHRitC10LrRglxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBkYXRhKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdSZXF1ZXJ5IGVycm9yOicsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignL2Vycm9yJywgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIG51bGwpO1xuICAgICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZG9jU3RvcmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9zdG9yZXMvZG9jX3N0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBGb3JtID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9mb3JtLmpzJyksXHJcbiAgICBQYWdlTGFiZWwgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3BhZ2VfbGFiZWwnKSxcclxuICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LXRleHQuanN4JyksXHJcbiAgICBJbnB1dERhdGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRlLmpzeCcpLFxyXG4gICAgSW5wdXROdW1iZXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1udW1iZXIuanN4JyksXHJcbiAgICBUb29sYmFyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtdG9vbGJhci5qc3gnKSxcclxuICAgIERvY0NvbW1vbiA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWNvbW1vbi5qc3gnKSxcclxuICAgIFNlbGVjdCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LXNlbGVjdC5qc3gnKSxcclxuICAgIFRleHRBcmVhID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dGFyZWEuanN4JyksXHJcbiAgICBEYXRhR3JpZCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWRhdGEtZ3JpZC5qc3gnKSxcclxuICAgIEdyaWRSb3cgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2pvdXJuYWwtZ3JpZC1yb3cuanN4JyksXHJcbiAgICByZWxhdGVkRG9jdW1lbnRzID0gcmVxdWlyZSgnLi4vbWl4aW4vcmVsYXRlZERvY3VtZW50cy5qc3gnKTtcclxuXHJcbnZhciBkb2NTdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3Jlcy9kb2Nfc3RvcmUuanMnKTtcclxuXHJcbmNvbnN0IEpvdXJuYWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiSm91cm5hbFwiLFxyXG4gICAgcGFnZXM6IFt7cGFnZU5hbWU6ICdKb3VybmFsJ31dLFxyXG5cclxuLy8gICAgbWl4aW5zOiBbcmVsYXRlZERvY3VtZW50c10sIC8vLCB2YWxpZGF0ZUZvcm1cclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDRg9GB0YLQsNC90L7QstC40Lwg0LjQt9C90LDRh9Cw0LvRjNC90YvQtSDQtNCw0L3QvdGL0LVcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkb2NEYXRhOiB0aGlzLnByb3BzLmRhdGEucm93LFxyXG4gICAgICAgICAgICBlZGl0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93TWVzc2FnZUJveDogJ25vbmUnLFxyXG4gICAgICAgICAgICBncmlkRGF0YTogdGhpcy5wcm9wcy5kYXRhLmRldGFpbHMsXHJcbiAgICAgICAgICAgIHJlbGF0aW9uczogdGhpcy5wcm9wcy5kYXRhLnJlbGF0aW9ucyxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZzogdGhpcy5wcm9wcy5kYXRhLmdyaWRDb25maWcsXHJcbiAgICAgICAgICAgIGdyaWRSb3dFZGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgZ3JpZFJvd0V2ZW50OiBudWxsLFxyXG4gICAgICAgICAgICBncmlkUm93RGF0YTogbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgO1xyXG4gICAgfSxcclxuXHJcbiAgICB2YWxpZGF0aW9uOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSxcclxuICAgICAgICAgICAgcmVxdWlyZWRGaWVsZHMgPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2twdicsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0QnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbjogbm93LnNldEZ1bGxZZWFyKG5vdy5nZXRGdWxsWWVhcigpIC0gMSksXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4OiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgKyAxKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtuYW1lOiAnc2VsZycsIHR5cGU6ICdDJ30sXHJcbiAgICAgICAgICAgICAgICB7bmFtZTogJ3N1bW1hJywgdHlwZTogJ04nfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB3YXJuaW5nID0gcmVxdWlyZSgnLi4vbWl4aW4vdmFsaWRhdGVGb3JtJykodGhpcywgcmVxdWlyZWRGaWVsZHMpO1xyXG4gICAgICAgIHJldHVybiB3YXJuaW5nO1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINC/0LjRiNC10Lwg0LjRgdGF0L7QtNC90YvQtSDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1LCDRgNC10LPQuNGB0YLRgNC40YDRg9C10Lwg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5zdGF0ZS5kb2NEYXRhLFxyXG4gICAgICAgICAgICBkZXRhaWxzID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZyA9IHRoaXMuc3RhdGUuZ3JpZENvbmZpZztcclxuXHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZG9jSWRDaGFuZ2UnLCBkYXRhLmlkKTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZGV0YWlscyk7IC8vINC00LDQvdC90YvQtSDQs9GA0LjQtNCwXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZENvbmZpZ0NoYW5nZScsIGdyaWRDb25maWcpOyAvLyDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWROYW1lJywgJ2pvdXJuYWwtZ3JpZC1yb3cnKTsgLy8g0LfQsNC00LDQtdC8INC40LzRjyDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdGC0YDQvtC60Lgg0LPRgNC40LTQsCAo0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHJcblxyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkgIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0ZWQ6IG5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdGCINC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0LIg0LPRgNC40LTQtVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIGRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGV0YWlscycsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICBjb25zb2xlLmxvZygnZXZlbnQgZGV0YWlscyBjaGFuZ2VkJyk7XHJcbiAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHByZXZpb3VzVmFsdWUpICYmIHR5cGVvZiBuZXdWYWx1ZSA9PSAnYXJyYXknKSB7XHJcbiAgICAgICAgIC8vINC40YLQvtCz0LhcclxuICAgICAgICAgbGV0IHN1bW1hID0gbmV3VmFsdWUucmVkdWNlKChzdW0sIHJvdykgPT4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSksMCksIC8vINGB0YPQvNC80LAg0YHRh9C10YLQsFxyXG4gICAgICAgICBrYm0gPSBuZXdWYWx1ZS5yZWR1Y2UoKHN1bSwgcm93KSA9PiBzdW0gKyBOdW1iZXIocm93LmtibSksMCksIC8vINGB0YPQvNC80LAg0L3QsNC70L7Qs9CwXHJcbiAgICAgICAgIGRvY0RhdGEgPSBzZWxmLnN0YXRlLmRvY0RhdGE7XHJcblxyXG4gICAgICAgICBkb2NEYXRhLnN1bW1hID0gc3VtbWE7XHJcbiAgICAgICAgIGRvY0RhdGEua2JtID0ga2JtO1xyXG5cclxuICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Z3JpZERhdGE6IG5ld1ZhbHVlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8vINCz0YDRg9C30LjQvCDRgdC/0YDQsNCy0L7Rh9C90LjQutC4XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignbG9hZExpYnMnLCAnJyk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmlkID09IDApIHtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0YTQvtGA0LzQuNGA0YPQtdC8INC30LDQstC40YHQuNC80L7RgdGC0LhcclxuICAgICAgICByZWxhdGVkRG9jdW1lbnRzKHRoaXMpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGEsXHJcbiAgICAgICAgICAgIGlzRWRpdGVNb2RlID0gdGhpcy5zdGF0ZS5lZGl0ZWQsXHJcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94ID0gdGhpcy5zdGF0ZS5zaG93TWVzc2FnZUJveDsgLy8g0LHRg9C00LXRgiDRg9C/0YDQsNCy0LvRj9GC0Ywg0L7QutC90L7QvCDRgdC+0L7QsdGJ0LXQvdC40LlcclxuXHJcbiAgICAgICAgLy8gIHBhdHRlcm49J1tBLVphLXpdezN9J1xyXG4vL2NvbnNvbGUubG9nKCdhcnZlIHJlbmRlcmluZzonLCBkYXRhKTtcclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSB0aGlzLnN0YXRlLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBncmlkQ29sdW1ucyA9IHRoaXMuc3RhdGUuZ3JpZENvbmZpZztcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtLCB7cGFnZXM6IHRoaXMucGFnZXMsIHJlZjogXCJmb3JtXCIsIG9uU3VibWl0OiB0aGlzLm9uU3VibWl0LCBzdHlsZToge2Rpc3BsYXk6ICd0YWJsZSd9fSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXIsIHt2YWxpZGF0b3I6IHRoaXMudmFsaWRhdGlvbn0pLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJkaXYtZG9jXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERvY0NvbW1vbiwge2RhdGE6IGRhdGF9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZpZWxkc2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTnVtYmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJudW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5udW1iZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXREYXRlLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkt1dXDDpGV2IFwiLCBuYW1lOiBcImtwdlwiLCB2YWx1ZTogZGF0YS5rcHYsIHJlZjogXCJrcHZcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLdXVww6RldlwiLCByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJQYXJ0bmVyXCIsIG5hbWU6IFwiYXN1dHVzaWRcIiwgbGliczogXCJhc3V0dXNlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFzdXR1c2lkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZGF0YS5hc3V0dXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiUGFydG5lclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJhc3V0dXNpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiRG9rdW1lbnQgXCIsIG5hbWU6IFwiZG9rXCIsIHZhbHVlOiBkYXRhLmRvaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJEb2t1bWVudFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJkb2tcIiwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIlNlbGdpdHVzXCIsIG5hbWU6IFwic2VsZ1wiLCBwbGFjZWhvbGRlcjogXCJTZWxnaXR1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInNlbGdcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnNlbGcsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KERhdGFHcmlkLCB7c291cmNlOiBcImRldGFpbHNcIiwgZ3JpZERhdGE6IGdyaWREYXRhLCBncmlkQ29sdW1uczogZ3JpZENvbHVtbnMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVHcmlkUm93OiB0aGlzLmhhbmRsZUdyaWRSb3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlLCByZWY6IFwiRGF0YUdyaWRcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiU3VtbWE6IFwiLCBuYW1lOiBcInN1bW1hXCIsIHBsYWNlaG9sZGVyOiBcIlN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuc3VtbWEsIGRpc2FibGVkOiBcInRydWVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIl5bMC05XSsoXFxcXC5bMC05XXsxLDR9KT8kXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyog0L/QsNGC0LXRgNC9INC00LvRjyDRhtC40YTRgCDRgSA0INC30L3QsNC60LDQvNC4INC/0L7RgdC70LUg0YLQvtGH0LrQuCovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJNw6Rya3VzZWRcIiwgbmFtZTogXCJtdXVkXCIsIHBsYWNlaG9sZGVyOiBcIk3DpHJrdXNlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcIm11dWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLm11dWQsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5ncmlkUm93RWRpdCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZFJvdywge21vZGFsUGFnZUNsaWNrOiB0aGlzLm1vZGFsUGFnZUNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZEV2ZW50OiB0aGlzLnN0YXRlLmdyaWRSb3dFdmVudCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRSb3dEYXRhOiB0aGlzLnN0YXRlLmdyaWRSb3dEYXRhfSkgOiBudWxsXHJcblxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlR3JpZFJvdzogZnVuY3Rpb24gKGdyaWRFdmVudCwgZGF0YSkge1xyXG4gICAgICAgIC8vINGD0L/RgNCw0LLQu9C10L3QuNC1INC80L7QtNCw0LvRjNC90YvQvCDQvtC60L3QvtC8XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IHRydWUsIGdyaWRSb3dFdmVudDogZ3JpZEV2ZW50LCBncmlkUm93RGF0YTogZGF0YX0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBtb2RhbFBhZ2VDbGljazogZnVuY3Rpb24gKGJ0bkV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgLy8g0L7RgtGA0LDQsdC+0YLQsNC10LwgT2sg0LjQtyDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsFxyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRldGFpbHMsXHJcbiAgICAgICAgICAgIGRvY0RhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICBncmlkUm93SWQgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5ncmlkUm93SWQsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZ3JpZENvbmZpZztcclxuICAgICAgICB2YXIgZ3JpZFJvdyA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoZ3JpZFJvd0lkID49IDApIHtcclxuICAgICAgICAgICAgZ3JpZFJvdyA9IGdyaWREYXRhW2dyaWRSb3dJZF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwcmV2aW9zIHN0YXRlIGdyaWREYXRhLCBkb2NEYXRhJywgZ3JpZERhdGEsIGRvY0RhdGEpO1xyXG5cclxuICAgICAgICBpZiAoYnRuRXZlbnQgPT0gJ09rJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnIG1vZGFsUGFnZUNsaWNrIGRhdGEsIGdyaWRSb3dJZCwgZ3JpZFJvdycsIGRhdGEsIGdyaWRSb3dJZCwgZ3JpZFJvdyk7XHJcbiAgICAgICAgICAgIGlmIChncmlkUm93SWQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvdC+0LLQsNGPINC30LDQv9C40YHRjFxyXG4gICAgICAgICAgICAgICAgLy8g0YTQvtGA0LzQuNGA0YPQtdC8INC/0YPRgdGC0YPRjiDRgdGC0YDQvtC60YNcclxuLy8gICAgICAgICAgICAgICAgZ3JpZFJvdyA9e307XHJcbiAgICAgICAgICAgICAgICBncmlkUm93WydpZCddID0gJ05FVycgKyBNYXRoLnJhbmRvbSgpOyAgLy8g0LPQtdC90LXRgNC40YDRg9C10Lwg0L3QvtCy0L7QtSDQmNCUXHJcbiAgICAgICAgICAgICAgICBncmlkQ29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSAge3JldHVybiBncmlkUm93W2ZpZWxkXSA9IG51bGw7fSk7IC8vINGB0L7Qt9C00LDQtdC8INC/0L7Qu9GPINCyINC+0LHRitC10LrRgtC1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbihmaWVsZCkgIHtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbZmllbGQubmFtZV0gPSBmaWVsZC52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9GB0L7RhdGA0LDQvdC40Lwg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtSwgZ3JpZFJvdycsIGdyaWRSb3cpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vINC30LDQv9C+0LvQvdC40Lwg0L/QvtC70Y8ga29vZCwgbmltZXR1c1xyXG4gICAgICAgICAgICB2YXIgbGlicyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmxpYnM7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICBub21MaWIgPSBsaWJzLmZpbHRlcigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgaWYgKGRhdGEuaWQgPT0gJ25vbWVuY2xhdHVyZScpIHtcclxuICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAvKlxyXG5cclxuICAgICAgICAgICAgIHZhciAgIG5vbVJvdyA9IG5vbUxpYlswXS5kYXRhLmZpbHRlcihmdW5jdGlvbihyb3cpIHtcclxuICAgICAgICAgICAgIGlmIChyb3cuaWQgPT0gTnVtYmVyKGdyaWRSb3cubm9taWQpKSB7XHJcbiAgICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgaWYgKG5vbVJvdykge1xyXG4gICAgICAgICAgICAgZ3JpZFJvd1sna29vZCddID0gbm9tUm93WzBdLmtvb2Q7XHJcbiAgICAgICAgICAgICBncmlkUm93WyduaW1ldHVzJ10gPSBub21Sb3dbMF0ubmFtZTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhZnRlciBzdGF0ZSBncmlkRGF0YSAlcywgZG9jRGF0YSAlcycsIGdyaWREYXRhLCBkb2NEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChncmlkUm93SWQgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGFbZ3JpZFJvd0lkXSA9IGdyaWRSb3c7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YS5wdXNoKGdyaWRSb3cpOyAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkUm93SWRDaGFuZ2UnLCBncmlkRGF0YS5sZW5ndGgpOyAvLyDQv9C+0LzQtdGH0LDQtdC8INC90L7QstGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGdyaWREYXRhKTsgLy8g0L/QuNGI0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDRgdGH0LjRgtCw0LXQvCDQuNGC0L7Qs9C4XHJcblxyXG4gICAgICAgIHZhciBkb2NTdW1tYSA9IGdyaWREYXRhLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSk7fSwgMCk7IC8vINGB0YPQvNC80LAg0YHRh9C10YLQsFxyXG5cclxuICAgICAgICBkb2NEYXRhLnN1bW1hID0gZG9jU3VtbWE7XHJcblxyXG4gICAgICAgIHRoaXMucmVmc1snRGF0YUdyaWQnXS5yZXBsYWNlU3RhdGUoe2dyaWREYXRhOiBncmlkRGF0YX0pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiBmYWxzZSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG5cclxuICAgIH0sXHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSm91cm5hbDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2NzL2pvdXJuYWwuanN4XG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4vcGFnZV9sYWJlbCcpO1xuXG52YXIgRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ0Zvcm0nLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHZhciBwYWdlcyA9IFt7IHBhZ2VOYW1lOiAnUGFnZScgfV07XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnBhZ2VzKSB7XG4gICAgICAgICAgICBwYWdlcyA9IHRoaXMucHJvcHMucGFnZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhZ2VzOiB0aGlzLnByb3BzLnBhZ2VzXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgcGFnZXMgPSB0aGlzLnN0YXRlLnBhZ2VzO1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBjbGFzc05hbWU6ICdjb250YWluZXInIH0sIHBhZ2VzLm1hcChmdW5jdGlvbiAocGFnZSwgaWR4KSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChQYWdlTGFiZWwsIHsga2V5OiBpZHgsIHBhZ2VJZHg6IGlkeCB9LCBwYWdlKTtcbiAgICAgICAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgY2xhc3NOYW1lOiAncGFnZScgfSwgUmVhY3QuY3JlYXRlRWxlbWVudCgnZm9ybScsIG51bGwsIHRoaXMucHJvcHMuY2hpbGRyZW4pKSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbnZhciBQYWdlTGFiZWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdQYWdlTGFiZWwnLFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvLyAgICAgIGNvbnNvbGUubG9nKCdwYWdlIGxhYmVsIGNvbXBvbmVudFdpbGxNb3VudCcpXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHsgZGlzYWJsZWQ6IG5ld1ZhbHVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUNsaWNrKHBhZ2UpIHtcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0L3QsCDRgdC+0LHRi9GC0LjQtSDQutC70LjQuiwg0L/QvtC00LPRgNGD0LbQsNC10Lwg0YHQstGP0LfQsNC90L3Ri9C5INC00L7QutGD0LzQtdC90YJcbiAgICAgICAgLy8gICAgICAgYWxlcnQoJ2NsaWNrOicgKyBwYWdlTmFtZSk7XG4gICAgICAgIC8vIGRvY1R5cGVJZDogZG9jLmRvY190eXBlLCBkb2NJZDpkb2MuaWQsIHBhZ2VOYW1lOidMYXVzZW5kIGlkOicgKyBkb2MuaWRcblxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhZ2UgZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYWdlLmRvY0lkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlQ2xpY2sgcGFnZS5kb2NUeXBlSWQgJXMsIHBhZ2UuZG9jSWQgJW4nKTtcbiAgICAgICAgICAgIHZhciB1cmwgPSBcIi9kb2N1bWVudC9cIiArIHBhZ2UuZG9jVHlwZUlkICsgcGFnZS5kb2NJZDtcbiAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSAncGFnZUxhYmVsJztcblxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgdGhpcy5wcm9wcy5jaGlsZHJlbiksIGRpc2FibGVkOiB0aGlzLnN0YXRlLmRpc2FibGVkIH0sIHRoaXMucHJvcHMuY2hpbGRyZW4ucGFnZU5hbWUsICcgJyk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZUxhYmVsO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9wYWdlX2xhYmVsLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBDb21wb25lbnRJbnB1dERhdGUgPSByZXF1aXJlKCcuL2lucHV0LWRhdGUuanN4JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3QgSW5wdXREYXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIklucHV0RGF0ZVwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB0cnVlLFxyXG4gICAgICAgICAgICB2YWxpZDogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpLFxyXG4gICAgICAgICAgICBkYXkgPSBkYXRlLmdldERhdGUoKSxcclxuICAgICAgICAgICAgbWF4RGF0ZSA9IG5ldyBEYXRlKHllYXIgKyAxLCBtb250aCwgZGF5KSxcclxuICAgICAgICAgICAgbWluRGF0ZSA9IG5ldyBEYXRlKHllYXIgLSAxLCBtb250aCwgZGF5KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYmluZERhdGE6IHRydWUsXHJcbiAgICAgICAgICAgIG1pbjogbWluRGF0ZSxcclxuICAgICAgICAgICAgbWF4OiBtYXhEYXRlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBuZXh0UHJvcHMudmFsdWV9KVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDRgdC+0LHRi9GC0LjQtSDQvdCwINC40LfQvNC10L3QtdC90LjQtSDRgNC10LbQuNC80LAg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpICB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH0sXHJcbiAgICAvKlxyXG4gICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUgZG9jSWQuINCV0YHQu9C4INC30L3QsNGH0LXQvdC40LUgPSAwICjQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0L/QuNGB0YwsINGC0L4g0L/RgNC+0YHRgtC+INC+0YfQuNGC0LrQsCDQv9C+0LvQtdC5LCDQuNC90LDRh9C1INC/0L7QtNCz0YDRg9C30LrQsCDQtNCw0L3QvdGL0YVcclxuICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKCdjb21wb25lbnRXaWxsTW91bnQnICsgdGhpcy5wcm9wcy5uYW1lKTtcclxuICAgICAvISpcclxuICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGB0L7Qt9C00LDQvdC40LUg0L3QvtCy0L7Qs9C+INC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgIC8hKlxyXG4gICAgIHZhciBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICB2YWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuXHJcbiAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAvLyDQvdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTowfSk7XHJcbiAgICAgfSBlbHNlIHtcclxuICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTp2YWx1ZX0pO1xyXG4gICAgIH1cclxuICAgICAqIS9cclxuICAgICB9XHJcbiAgICAgfSk7XHJcbiAgICAgKiEvXHJcblxyXG4gICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAvLyAgICAgICAgICAgY29uc29sZS5sb2coJ29uIGNoYW5nZTplZGl0ZWQ6JyArIG5ld1ZhbHVlKTtcclxuICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICBzZWxmLnNldFN0YXRlKHtyZWFkT25seTogIW5ld1ZhbHVlfSk7XHJcbiAgICAgfVxyXG4gICAgIH0pO1xyXG5cclxuICAgICAvISpcclxuICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgIGNvbnNvbGUubG9nKCdvbiBjaGFuZ2U6ZGF0YTonICsgbmV3VmFsdWUpO1xyXG4gICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG5cclxuICAgICB2YXIgZGF0YSA9IG5ld1ZhbHVlLFxyXG4gICAgIGZpZWxkVmFsdWUgPSBkYXRhW3NlbGYucHJvcHMubmFtZV07XHJcblxyXG4gICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgfVxyXG4gICAgIH0pO1xyXG5cclxuICAgICAqIS9cclxuXHJcbiAgICAgfSxcclxuICAgICAqL1xyXG4gICAgLy8g0L7QsdGP0LfQsNGC0LXQu9GM0L3Ri9C1INC/0LDRgNCw0LzQtdGC0YDRi1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXHJcbiAgICAgfSxcclxuXHJcblxyXG4gICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChmaWVsZFZhbHVlKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgICAgZGF0YVt0aGlzLnByb3BzLm5hbWVdID0gZmllbGRWYWx1ZTtcclxuXHJcbiAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGlucHV0Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dERpc2FibGVkID0gdGhpcy5zdGF0ZS5kaXNhYmxlZCA9PSAndHJ1ZScgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlucHV0UGxhY2VIb2xkZXIgPSB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8IHRoaXMucHJvcHMubmFtZTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0UmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgaW5wdXRDbGFzc05hbWUgPSBpbnB1dENsYXNzTmFtZSArICcgZG9jLWlucHV0LXJlYWRvbmx5JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7aHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50aXRsZVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnRJbnB1dERhdGUsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGlucHV0Q2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogaW5wdXRSZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMucHJvcHMucGF0dGVybiwgXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogaW5wdXREaXNhYmxlZH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSlcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0RGF0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWlucHV0LWRhdGUuanN4XG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuLy8gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IElucHV0RGF0ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJJbnB1dERhdGVcIixcclxuICAgIGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIGdldERlZmF1bHRQcm9wczpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSxcclxuICAgICAgICAgICAgZGF5ID0gZGF0ZS5nZXREYXRlKCksXHJcbiAgICAgICAgICAgIG1heERhdGUgPSBuZXcgRGF0ZSh5ZWFyICsgMSwgbW9udGgsIGRheSksXHJcbiAgICAgICAgICAgIHJlZklkID0gJ0lucHV0RGF0ZScsXHJcbiAgICAgICAgICAgIG1pbkRhdGUgPSBuZXcgRGF0ZSh5ZWFyIC0gNSwgbW9udGgsIGRheSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJpbmREYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICBtaW46IG1pbkRhdGUsXHJcbiAgICAgICAgICAgIG1heDogbWF4RGF0ZSxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOmZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBuZXh0UHJvcHMudmFsdWV9KVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgb25DaGFuZ2U6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGxldCBmaWVsZFZhbHVlID0gZS50YXJnZXQudmFsdWUsXHJcbiAgICAgICAgICAgIHZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKGZpZWxkVmFsdWUpO1xyXG5cclxuICAgICAgICBpZiAoZmllbGRWYWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vINC10YHQu9C4INC30L3QsNGH0LXQvdC40LUg0L3Rg9C7LCDRgtC+INC/0YPRgdGC0Ywg0LHRg9C00LXRgiBudWxcclxuICAgICAgICAgICAgdmFsaWRhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmFsaWRhdGlvbiApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQt9Cw0LTQsNC9INC+0LHRgNCw0LHQvtGC0YfQuNC6LCDQstC10YDQvdC10Lwg0LXQs9C+XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGZpZWxkVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjpmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgaW5wdXRDbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZSB8fCAnZG9jLWlucHV0JyxcclxuICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMubmFtZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgaW5wdXRDbGFzc05hbWUgPSBpbnB1dENsYXNzTmFtZSArICcgZG9jLWlucHV0LXJlYWRvbmx5JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJkYXRlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgcmVmOiB0aGlzLnByb3BzLnJlZklkLCBcclxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMucHJvcHMucGF0dGVybiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZUhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBtaW46IHRoaXMucHJvcHMubWluLCBcclxuICAgICAgICAgICAgICAgICAgICAgIG1heDogdGhpcy5wcm9wcy5tYXgsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWR9XHJcbiAgICAgICAgKVxyXG4gICAgfSxcclxuXHJcbiAgICB2YWxpZGF0ZTpmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyDQv9GA0L7QstC10YDQutCwINC90LAg0LzQuNC9ICwg0LzQsNGFXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubWluICYmIHRoaXMucHJvcHMubWF4ICYmIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRlVmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IChkYXRlVmFsdWUgPiB0aGlzLnByb3BzLm1pbiAmJiBkYXRlVmFsdWUgPCB0aGlzLnByb3BzLm1heCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0RGF0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtZGF0ZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IERPQ1VNRU5UX0NMT1NFRF9TVEFUVVMgPSAyO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgRG9jQnV0dG9uID0gcmVxdWlyZSgnLi9kb2MtYnV0dG9uLmpzeCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbnZhciBUb29sYmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlRvb2xiYXJcIixcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdhcm5pbmc6IGZhbHNlLCB3YXJuaW5nTWVzc2FnZTogJycsIGVkaXRNb2RlOiBmYWxzZSxcclxuICAgICAgICAgICAgdGFza0xpc3Q6IHRoaXMucHJvcHMudGFza0xpc3QgPyB0aGlzLnByb3BzLnRhc2tMaXN0IDogdGhpcy5nZXREZWZhdWx0VGFzaygpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUgZG9jSWQuINCV0YHQu9C4INC30L3QsNGH0LXQvdC40LUgPSAwICjQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0L/QuNGB0YwsINGC0L4g0L/RgNC+0YHRgtC+INC+0YfQuNGC0LrQsCDQv9C+0LvQtdC5LCDQuNC90LDRh9C1INC/0L7QtNCz0YDRg9C30LrQsCDQtNCw0L3QvdGL0YVcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6c2F2ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDRgNC10LbQuNC8INC40LfQvNC10L3QuNC70YHRjywg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7ZWRpdE1vZGU6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVTZWxlY3RUYXNrOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIC8vINC80LXRgtC+0LQg0LLRi9C30YvQstCw0LXRgtGB0Y8g0L/RgNC4INCy0YvQsdC+0YDQtSDQt9Cw0LTQsNGH0LhcclxuICAgICAgICB2YXIgdGFza1ZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUJ1dHRvblRhc2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDQvNC10YLQvtC0INCy0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQstGL0LHQvtGA0LUg0LfQsNC00LDRh9C4XHJcbiAgICAgICAgLy8g0L3QsNC50LTQtdC8INCw0LrRgtGD0LDQu9GM0L3Rg9GOINC30LDQtNCw0YfRg1xyXG5cclxuICAgICAgICBsZXQgYWN0dWFsVGFzayA9IHRoaXMuc3RhdGUudGFza0xpc3QuZmlsdGVyKGZ1bmN0aW9uKHRhc2spIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YXNrLmFjdHVhbFN0ZXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFzaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHRhc2sgPSBhY3R1YWxUYXNrLm1hcChmdW5jdGlvbih0YXNrKSAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhc2suYWN0aW9uXHJcbiAgICAgICAgICAgIH0pOyAvLyDQvtGB0YLQsNCy0LjQvCDRgtC+0LvRjNC60L4g0L3QsNC30LLQsNC90LjQtSDQv9GA0L7RhtC10LTRg9GA0YtcclxuXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZXhlY3V0ZVRhc2snLCB0YXNrKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlRXZlbnRCdXR0b25BZGRDbGljazpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQtNC70Y8g0LrQvdC+0L/QutC4IEFkZFxyXG4gICAgICAgICAgICAvLyDQvtGC0L/RgNCw0LLQuNC8INC40LfQstC10YnQtdC90LjQtSDQvdCw0LLQtdGA0YVcclxuLy8gICAgICAgIHRoaXMucHJvcHMub25DbGljayh0aGlzLm5hbWUpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnZG9jSWRDaGFuZ2UnLCAwICk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oICdlZGl0ZWRDaGFuZ2UnLCB0cnVlICk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oICdzYXZlZENoYW5nZScsIGZhbHNlICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICBoYW5kbGVFdmVudEJ1dHRvbkVkaXRDbGljazpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQtNC70Y8g0LrQvdC+0L/QutC4IEVkaXRcclxuICAgICAgICAvLyDQv9C10YDQtdCy0L7QtNC40Lwg0LTQvtC60YPQvNC10L3RgiDQsiDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8sINGB0L7RhdGA0LDQvdC10L0gPSBmYWxzZVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oICdlZGl0ZWRDaGFuZ2UnLCB0cnVlICk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbiggJ3NhdmVkQ2hhbmdlJywgZmFsc2UgKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUV2ZW50QnV0dG9uU2F2ZUNsaWNrOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQutC90L7Qv9C60LggU2F2ZVxyXG4gICAgICAgIC8vINCy0LDQu9C40LTQsNGC0L7RgFxyXG5cclxuICAgICAgICBsZXQgaXNWYWxpZCA9ICF0aGlzLnZhbGlkYXRvcigpO1xyXG5cclxuICAgICAgICBpZiAoaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9GA0L7RiNC70Lgg0LLQsNC70LjQtNCw0YbQuNGOLCDRgtC+INGB0L7RhdGA0LDQvdC10Y/QvFxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnc2F2ZURhdGEnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBlZGl0ZU1vZGUgPSB0aGlzLnN0YXRlLmVkaXRNb2RlLFxyXG4gICAgICAgICAgICBkb2N1bWVudFN0YXR1cyA9IHRoaXMucHJvcHMuZG9jdW1lbnRTdGF0dXMsXHJcbiAgICAgICAgICAgIGlzQ2xvc2VkU3RhdHVzID0gZG9jdW1lbnRTdGF0dXMgPT0gRE9DVU1FTlRfQ0xPU0VEX1NUQVRVUyA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgdGFza1dpZGdldCA9IHRoaXMuZ2VuZXJhdGVUYXNrV2lkZ2V0KCksXHJcbiAgICAgICAgICAgIHRhc2tzID0gdGhpcy5zdGF0ZS50YXNrTGlzdC5tYXAoZnVuY3Rpb24odGFzaykgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0YXNrLmFjdGlvblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJkb2MtdG9vbGJhci13YXJuaW5nXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLndhcm5pbmcgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB0aGlzLnN0YXRlLndhcm5pbmdNZXNzYWdlKSA6IG51bGxcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImRvYy10b29sYmFyXCIsIHN0eWxlOiB7ZmxvYXQ6XCJyaWdodFwifX0sIFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2xvc2VkU3RhdHVzID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQnV0dG9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkFkZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImRvYy10b29sYmFyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLnN0YXRlLmVkaXRNb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVFdmVudEJ1dHRvbkFkZENsaWNrfSksIFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2xvc2VkU3RhdHVzID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQnV0dG9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkVkaXRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMuc3RhdGUuZWRpdE1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUV2ZW50QnV0dG9uRWRpdENsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImRvYy10b29sYmFyXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDbG9zZWRTdGF0dXMgPyBudWxsIDogUmVhY3QuY3JlYXRlRWxlbWVudChEb2NCdXR0b24sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJkb2MtdG9vbGJhclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlNhdmVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiAhdGhpcy5zdGF0ZS5lZGl0TW9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUV2ZW50QnV0dG9uU2F2ZUNsaWNrfSksIFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRlTW9kZSAmJiB0YXNrcy5sZW5ndGggPiAwID8gbnVsbCA6IHRhc2tXaWRnZXRcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldERlZmF1bHRUYXNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIFt7c3RlcDogMCwgbmFtZTogJ1N0YXJ0JywgYWN0aW9uOiAnc3RhcnQnLCBzdGF0dXM6ICdvcGVuZWQnfV1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdlbmVyYXRlVGFza1dpZGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINCy0LXRgNC90LXRgiDQstC40LTQttC10YIg0LfQsNC00LDRh1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUudGFza0xpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGFza0xpc3Q6IHRoaXMuZ2V0RGVmYXVsdFRhc2soKX0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRhc2tzID0gdGhpcy5zdGF0ZS50YXNrTGlzdC5maWx0ZXIoZnVuY3Rpb24odGFzaykgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGFzay5zdGF0dXMgPT09ICdvcGVuZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICAgICAgdGFza1dpZGdldCA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0YXNrcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDRgdC/0LjRgdC+0Log0LfQsNC00LDRh1xyXG4gICAgICAgICAgICBvcHRpb25zID0gdGFza3MubWFwKGZ1bmN0aW9uKHRhc2spICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IDAsIGtleTogTWF0aC5yYW5kb20oKX0sIFwiIFwiLCB0YXNrLm5hbWUsIFwiIFwiKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRhc2tXaWRnZXQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgb25DaGFuZ2U6IHRoaXMuaGFuZGxlU2VsZWN0VGFza30sIG9wdGlvbnMsIFwiIFwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhc2tzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXNrTmFtZSA9IHRhc2tzWzBdLm5hbWU7XHJcbiAgICAgICAgICAgIC8vINC60L3QvtC/0LrQsCDRgSDQt9Cw0LTQsNGH0LXQuVxyXG4gICAgICAgICAgICB0YXNrV2lkZ2V0ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcImJ1dHRvblwiLCBjbGFzc05hbWU6IFwidWktYzJcIiwgb25DbGljazogdGhpcy5oYW5kbGVCdXR0b25UYXNrLCB2YWx1ZTogdGFza05hbWV9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFza1dpZGdldDtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIHZhbGlkYXRvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCB3YXJuaW5nID0gJyc7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICBsZXQgd2FybmluZ01lc3NhZ2UgPSB0aGlzLnByb3BzLnZhbGlkYXRvcigpO1xyXG4gICAgICAgICAgICAgICAgd2FybmluZyA9IHdhcm5pbmdNZXNzYWdlICE9PSAnT2snXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt3YXJuaW5nTWVzc2FnZTogd2FybmluZ01lc3NhZ2UsIHdhcm5pbmc6IHdhcm5pbmd9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gd2FybmluZztcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRvb2xiYXI7XHJcblxyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy10b29sYmFyLmpzeFxuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5cclxuY29uc3QgRG9jQnV0dG9uID0gZnVuY3Rpb24ocHJvcHMpIHtcclxuICAgIGxldCBidG5FbmFibGVkID0gcHJvcHMuZW5hYmxlZCA/IHRydWU6IGZhbHNlLCAvLyDRg9GB0YLQsNC90L7QstC40Lwg0LfQvdCw0YfQtdC90LjQtSDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxyXG4gICAgICAgIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSB8fCBudWxsLFxyXG4gICAgICAgIHN0eWxlID0ge21hcmdpbjogNX0sXHJcbiAgICAgICAgcmVmSWQgPSBwcm9wcy5yZWZJZCB8fCAnZG9jQnV0dG9uJztcclxuLy8gICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0ge2NsYXNzTmFtZX1cclxuXHJcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcImJ1dHRvblwiLCBcclxuICAgICAgICAgICAgICAgICAgdmFsdWU6IHByb3BzLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGJ0bkVuYWJsZWQsIFxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5vbkNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICBzdHlsZToge3N0eWxlOnN0eWxlfX1cclxuICAgIClcclxufTtcclxuXHJcbkRvY0J1dHRvbi5wcm9wVHlwZXMgPSB7XHJcbiAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxyXG59XHJcbi8vICAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9jQnV0dG9uXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtYnV0dG9uLmpzeFxuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgSW5wdXREYXRlVGltZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LWRhdGV0aW1lLmpzeCcpLFxyXG4gICAgRG9jTGlzdCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LWxpc3QuanN4Jyk7XHJcbi8vICAgIElucHV0TnVtYmVyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtbnVtYmVyLmpzeCcpO1xyXG5cclxudmFyIERvY0NvbW1vbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJEb2NDb21tb25cIixcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICAvLyDQv9GA0Lgg0LjQt9C80LXQvdC10L3QuNC4LCDQv9C+0LzQtdC90Y/QtdGCINGB0L7RgdGC0L7Rj9C90LjQtSAo0L/QtdGA0LXQtNCw0YHRgiDQtNCw0LvRjNGI0LUg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3JlYWRPbmx5Om5leHRQcm9wcy5yZWFkT25seSB9KVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMucHJvcHMuZGF0YSxcclxuICAgICAgICAgICAgYnBtID0gZGF0YS5icG0gfHwgW10sXHJcbiAgICAgICAgICAgIGFjdHVhbFN0ZXBEYXRhID0gYnBtLmZpbHRlcihmdW5jdGlvbihzdGVwKSAge1xyXG4gICAgICAgICAgICAgICAgLy8g0YLQtdC60YPRidC40Lkg0YjQsNCzINCR0J9cclxuICAgICAgICAgICAgICAgIGlmIChzdGVwLmFjdHVhbFN0ZXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RlcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGV4ZWN1dGVycyA9IGFjdHVhbFN0ZXBEYXRhLm1hcChmdW5jdGlvbihzdGVwRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0L3QsNC50LTQtdC8INC40YHQv9C+0LvQvdC40YLQtdC70LXQuVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0ZXBEYXRhLmFjdG9ycyB8fCB7bmFtZTogJ0FVVEhPUid9O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZpZWxkc2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwge3N0eWxlOiB7ZGlzcGxheTonLXdlYmtpdC1pbmxpbmUtYm94J319LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyIGZvcm0td2lkZ2V0LXRvb2xiYXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIklkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcInRydWVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjc1JVwifSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7c3R5bGU6IHtkaXNwbGF5Oictd2Via2l0LWlubGluZS1ib3gnfX0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzIgZm9ybS13aWRnZXQtdG9vbGJhclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQ3JlYXRlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjcmVhdGVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5jcmVhdGVkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCB3aWR0aDogXCI3NSVcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwge3N0eWxlOiB7ZGlzcGxheTonLXdlYmtpdC1pbmxpbmUtYm94J319LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyIGZvcm0td2lkZ2V0LXRvb2xiYXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlVwZGF0ZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGFzdHVwZGF0ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEubGFzdHVwZGF0ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcInRydWVcIiwgd2lkdGg6IFwiNzUlXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtzdHlsZToge2Rpc3BsYXk6Jy13ZWJraXQtaW5saW5lLWJveCd9fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMiBmb3JtLXdpZGdldC10b29sYmFyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTdGF0dXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RhdHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5zdGF0dXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI3NSVcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuLypcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIHN0eWxlPXt7ZGlzcGxheTonLXdlYmtpdC1pbmxpbmUtYm94J319PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvY0xpc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPSfQmNGB0L/QvtC70L3QuNGC0LXQu9C4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT0nZXhlY3V0b3JzJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17ZXhlY3V0ZXJzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHkgPSB7dGhpcy5zdGF0ZS5yZWFkT25seX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4qL1xyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEb2NDb21tb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1jb21tb24uanN4XG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IElucHV0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIklucHV0XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7dmFsdWU6IHRoaXMucHJvcHMudmFsdWUsIHJlYWRPbmx5OiB0cnVlLCBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB0cnVlfTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogJ2RlZmF1bE5hbWUnLFxyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ2RlZmF1bE5hbWUnLFxyXG4gICAgICAgICAgICB0aXRsZTogJydcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OmZ1bmN0aW9uKCkge1xyXG4vLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSBkb2NJZC4g0JXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSA9IDAgKNC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQv9C40YHRjCwg0YLQviDQv9GA0L7RgdGC0L4g0L7Rh9C40YLQutCwINC/0L7Qu9C10LksINC40L3QsNGH0LUg0L/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvRhVxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZG9jSWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YHQvtC30LTQsNC90LjQtSDQvdC+0LLQvtCz0L4g0LTQvtC60YPQvNC10L3RgtCwXHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhW3RoaXMucHJvcHMubmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINGB0L7QstGL0Lkg0LTQvtC60YPQvNC10L3RglxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOjB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6dmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtyZWFkT25seTogIW5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGF0YScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vINGB0LvRg9GI0YPQtdC8INC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YU7XHJcbiAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHByZXZpb3VzVmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IG5ld1ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSBkYXRhW3RoaXMucHJvcHMubmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVt0aGlzLnByb3BzLm5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6ZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyDQuNC30LzQtdC90LXQvdC40Y8g0LHRg9C00YPRgiDQvtGC0YDQsNC20LDRgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0YHQu9GD0YfQsNC1INC10YHQu9C4INGC0LDQutC40LUg0LXRgdGC0YxcclxuICAgICAgICBsZXQgcmV0dXJudmFsdWUgPSAobmV4dFN0YXRlLnZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlIHx8XHJcbiAgICAgICAgbmV4dFN0YXRlLnJlYWRPbmx5ICE9PSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8XHJcbiAgICAgICAgbmV4dFN0YXRlLmRpc2FibGVkICE9PSB0aGlzLnN0YXRlLmRpc2FibGVkKTtcclxuICAgICAgICByZXR1cm4gcmV0dXJudmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2hhbmdlOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGE7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgICAgZGF0YVt0aGlzLnByb3BzLm5hbWVdID0gZmllbGRWYWx1ZTtcclxuICAgICAgICAvLyDQt9Cw0LTQsNGC0Ywg0L3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INC/0L7Qu9GPXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6bmV4dFByb3BzLnZhbHVlIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGlucHV0Q2xhc3NOYW1lID10aGlzLnByb3BzLmNsYXNzTmFtZSB8fCAnZG9jLWlucHV0JyxcclxuICAgICAgICAgICAgaW5wdXRSZWFkT25seSA9IHRoaXMuc3RhdGUucmVhZE9ubHkgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIGlucHV0RGlzYWJsZWQgPSB0aGlzLnN0YXRlLmRpc2FibGVkLFxyXG4gICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLm5hbWUsXHJcbiAgICAgICAgICAgIG15U3R5bGUgPSB7d2lkdGg6J2F1dG8nfTs7XHJcblxyXG4gICAgICAgIGlmIChpbnB1dFJlYWRPbmx5KSB7XHJcbiAgICAgICAgICAgIGlucHV0Q2xhc3NOYW1lID0gaW5wdXRDbGFzc05hbWUgKyAnIGRvYy1pbnB1dC1yZWFkb25seSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLndpZHRoKSB7XHJcbiAgICAgICAgICAgIG15U3R5bGUud2lkdGggPSB0aGlzLnByb3BzLndpZHRoXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlucHV0RGlzYWJsZWQgPT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge2h0bWxGb3I6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogbXlTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZUhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtodG1sRm9yOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9ybS13aWRnZXQtbGFiZWxcIn0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHRoaXMucHJvcHMudGl0bGUpXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBteVN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGlucHV0Q2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogaW5wdXRSZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZX1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICkpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxuICAgIH0sXHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0YXJlYS5qc3hcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi9tb2RhbHBhZ2UvbW9kYWxQYWdlLmpzeCcpLFxyXG4gICAgU2VsZWN0ID0gcmVxdWlyZSgnLi9kb2MtaW5wdXQtc2VsZWN0LmpzeCcpLFxyXG4gICAgSW5wdXRUZXh0ID0gcmVxdWlyZSgnLi9kb2MtaW5wdXQtdGV4dC5qc3gnKSxcclxuICAgIElucHV0TnVtYmVyID0gcmVxdWlyZSgnLi9kb2MtaW5wdXQtbnVtYmVyLmpzeCcpO1xyXG5cclxuXHJcbnZhciBKb3VybmFsR3JpZFJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJKb3VybmFsR3JpZFJvd1wiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICBjb25zb2xlLmxvZygnQXJ2R3JpZFJvdyBwcm9wcycsIHRoaXMucHJvcHMpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJvdzogdGhpcy5wcm9wcy5ncmlkUm93RGF0YSwgY2hlY2tlZDogZmFsc2UsIHdhcm5pbmc6JydcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vZGFsUGFnZUNsaWNrOiBmdW5jdGlvbiAoYnRuRXZlbnQpIHtcclxuICAgICAgICB2YXIgY29tcG9uZW50cyA9IFsnZGVlYmV0JywgJ2tyZWVkaXQnLCAnc3VtbWEnLCAndmFsdXV0YScsICdrdXVycycsICdwcm9qJywgJ3R1bm51cyddLFxyXG4gICAgICAgICAgICBkYXRhID0gW107XHJcblxyXG5cclxuICAgICAgICBpZiAoYnRuRXZlbnQgPT0gJ09rJykge1xyXG4gICAgICAgICAgICAvLyDQv9GA0L7QstC10YDQutCwXHJcbiAgICAgICAgICAgIC8vINGB0L7QsdC40YDQsNC10Lwg0LTQsNC90L3Ri9C1INC00LvRjyDQvtGC0L/RgNCw0LLQutC4INC90LAg0L7QsdGA0LDQsdC+0YLQutGDXHJcbiAgICAgICAgICAgIGNvbXBvbmVudHMubWFwKGZ1bmN0aW9uKGNvbXBvbmVudCkgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLnJlZnNbY29tcG9uZW50XS5zdGF0ZScsIHRoaXMucmVmc1tjb21wb25lbnRdLnN0YXRlKTtcclxuICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnRWYWx1ZSA9IHRoaXMucmVmc1tjb21wb25lbnRdLnN0YXRlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudCA9PSAnZGVlYmV0JyB8fCBjb21wb25lbnQgPT0gJ2tyZWVkaXQnIHx8IGNvbXBvbmVudCA9PSAncHJvaicgfHwgY29tcG9uZW50ID09ICd0dW5udXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50VmFsdWUgPSB0aGlzLnJlZnNbY29tcG9uZW50XS5zdGF0ZS5maWVsZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoKHtuYW1lOiBjb21wb25lbnQsIHZhbHVlOiBjb21wb25lbnRWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvcHMubW9kYWxQYWdlQ2xpY2soYnRuRXZlbnQsIGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uIChlLCBuYW1lKSB7XHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINC90LAg0YTQvtGA0LzQtVxyXG4gICAgICAgIHZhciB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4vKlxyXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5zdGF0ZS5yb3dbbmFtZV0gJiYgbmFtZSA9PSAnbm9taWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmc1sna29ndXMnXS5zZXRTdGF0ZSh7dmFsdWU6IDAuMDAwfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmc1snaGluZCddLnNldFN0YXRlKHt2YWx1ZTogMC4wMH0pO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnNbJ2tibSddLnNldFN0YXRlKHt2YWx1ZTogMC4wMH0pO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnNbJ2tibXRhJ10uc2V0U3RhdGUoe3ZhbHVlOiAwLjAwfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmc1snc3VtbWEnXS5zZXRTdGF0ZSh7dmFsdWU6IDAuMDB9KTtcclxuICAgICAgICB9XHJcbiovXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsZUNoYW5nZScsIHZhbHVlKTtcclxuICAgICAgICB0aGlzLnJlY2FsY1Jvd1N1bW0oKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUlucHV0OiBmdW5jdGlvbiAodmFsdWUsIG5hbWUpIHtcclxuICAgICAgICAvLyDQv9C10YDQtdGB0YfQtdGCINGB0YPQvNC8XHJcbiAgICAgICAgdGhpcy5yZWNhbGNSb3dTdW1tKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZWNhbGNSb3dTdW1tOiBmdW5jdGlvbigpIHtcclxuXHJcbi8qXHJcbiAgICAgICAgdmFyIHN1bW1hID0gTnVtYmVyKHRoaXMucmVmc1snc3VtbWEnXS5zdGF0ZS52YWx1ZSksXHJcbiAgICAgICAgICAgIGt1dXJzID0gTnVtYmVyKHRoaXMucmVmc1sna3V1cnMnXS5zdGF0ZS52YWx1ZSksXHJcbiAgICAgICAgICAgIHZhbHN1bW1hID0gc3VtbWEgKiBrdXVycztcclxuICAgICAgICB0aGlzLnJlZnNbJ3ZhbHN1bW1hJ10uc2V0U3RhdGUoe3ZhbHVlOiB2YWxzdW1tYX0pO1xyXG4qL1xyXG4gLy8gICAgICAgY29uc29sZS5sb2coJ3JlY2FsY1Jvd1N1bW0nKTtcclxuXHJcbi8vICAgICAgICB0aGlzLnZhbGlkYXRlRm9ybSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB2YWxpZGF0ZUZvcm06IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIHdpbGwgY2hlY2sgdmFsdWVzIG9uIHRoZSBmb3JtIGFuZCByZXR1cm4gc3RyaW5nIHdpdGggd2FybmluZ1xyXG4gICAgICAgIHZhciB3YXJuaW5nID0gJyc7XHJcbiAgICAgICAgLy8g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0L/RgNC+0LLQtdGA0LrQuCDRhNC+0YDQvNGLINC90LAg0LLQsNC70LjQtNC90L7RgdGC0YxcclxuLypcclxuICAgICAgICBpZiAoIXRoaXMucmVmc1snbm9taWQnXS5zdGF0ZS52YWx1ZSkgd2FybmluZyA9ICB3YXJuaW5nICsgJyDQutC+0LQg0YPRgdC70YPQs9C4JztcclxuICAgICAgICBpZiAoIXRoaXMucmVmc1sna29ndXMnXS5zdGF0ZS52YWx1ZSkgd2FybmluZyA9ICB3YXJuaW5nICsgJyDQutC+0Lst0LLQvic7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJlZnNbJ2hpbmQnXS5zdGF0ZS52YWx1ZSkgd2FybmluZyA9ICB3YXJuaW5nICsgJyDRhtC10L3QsCc7XHJcbiovXHJcblxyXG4gICAgICAgIGlmICh3YXJuaW5nLmxlbmd0aCA+IDIgKSB7XHJcbiAgICAgICAgICAgIC8vINC10YHRgtGMINC/0YDQvtCx0LvQtdC80YtcclxuICAgICAgICAgICAgd2FybmluZyA9ICfQntGC0YHRg9GC0YHQstGD0Y7RgiDQtNCw0L3QvdGL0LU6JyArIHdhcm5pbmc7XHJcbiAgICAgICAgfVxyXG4vLyAgICAgICAgY29uc29sZS5sb2coJ3ZhbGlkYXRlRm9ybScsIHdhcm5pbmcpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NoZWNrZWQ6IHRydWUsIHdhcm5pbmc6IHdhcm5pbmd9KTtcclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIHJvdyA9IHRoaXMuc3RhdGUucm93LFxyXG4gICAgICAgICAgICB2YWxpZGF0ZU1lc3NhZ2UgPSB0aGlzLnN0YXRlLndhcm5pbmcsXHJcbiAgICAgICAgICAgIGJ1dHRvbk9rUmVhZE9ubHkgPSB2YWxpZGF0ZU1lc3NhZ2UubGVuZ3RoID4gMCB8fCAhdGhpcy5zdGF0ZS5jaGVja2VkO1xyXG5cclxuICAgICAgICBpZiAoIXJvdy52YWx1dXRhKSB7XHJcbiAgICAgICAgICAgIHJvdy52YWx1dXRhID0gJ0VVUic7XHJcbiAgICAgICAgICAgIHJvdy5rdXVycyA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidXR0b25Pa1JlYWRPbmx5ID0gZmFsc2U7IC8vIHRvZG8g0LrQvtGB0YLRi9C70YxcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdyb3cgcmVuZGVyOicsdmFsaWRhdGVNZXNzYWdlLCBidXR0b25Pa1JlYWRPbmx5ICk7XHJcbi8qXHJcbiAgICAgICAgPFNlbGVjdCB0aXRsZT1cIlRlZW51c1wiIG5hbWU9J25vbWlkJyBsaWJzPVwibm9tZW5jbGF0dXJlXCIgcmVhZE9ubHk9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3Jvdy5ub21pZH0gZGVmYXVsdFZhbHVlPXtyb3cua29vZH0gcmVmPSdub21pZCcgcGxhY2Vob2xkZXI9J1RlZW51c2Uga29vZCdcclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0vPlxyXG4qL1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJtb2RhbFBhZ2VcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2UsIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJSZWEgbGlzYW1pbmUgLyBwYXJhbmRhbWluZVwifSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJEZWViZXQ6XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRlZWJldFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliczogXCJrb250b2RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cuZGVlYmV0LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImtvb2RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJkZWViZXRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkRlZWJldFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIktyZWVkaXQ6XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3JlZWRpdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcImtvbnRvZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cua3JlZWRpdCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImtvb2RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImtyZWVkaXRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiS3JlZWRpdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTdW1tYTogXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5zdW1tYSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiZmFsc2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwic3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJWYWx1dXRhOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWx1dXRhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cudmFsdXV0YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJmYWxzZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJ2YWx1dXRhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJLdXVyczogXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3V1cnNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5rdXVycywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiZmFsc2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwia3V1cnNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLmhhbmRsZUlucHV0LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlByb2pla3Q6XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJvalwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcInByb2plY3RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LnByb2osIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJrb29kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJwcm9qXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlByb2pla3RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVHVubnVzOlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR1bm51c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcInR1bm51c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cudHVubnVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsSWQ6IFwia29vZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwidHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkxhdXNlbmRpIHR1bm51c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdmFsaWRhdGVNZXNzYWdlKSksIFwiO1wiXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuLypcclxuPGRpdj5cclxuICAgIHtidXR0b25Pa1JlYWRPbmx5ID9cclxuICAgICAgICA8YnV0dG9uIGRpc2FibGVkPiBPayA8L2J1dHRvbj46XHJcbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm1vZGFsUGFnZUNsaWNrLmJpbmQodGhpcywnT2snKX0+IE9rIDwvYnV0dG9uPlxyXG4gICAgfVxyXG4gICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm1vZGFsUGFnZUNsaWNrLmJpbmQodGhpcywnQ2FuY2VsJyl9PiBDYW5jZWw8L2J1dHRvbj5cclxuPC9kaXY+XHJcbiovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEpvdXJuYWxHcmlkUm93O1xyXG5cclxuLypcclxuXHJcbiA8SW5wdXRUZXh0IHRpdGxlPSdLb29kICcgbmFtZT0na29vZCcgdmFsdWU9e3Jvdy5rb29kfSByZWFkT25seT17ZmFsc2V9XHJcbiBkaXNhYmxlZD1cImZhbHNlXCIgcmVmPSdrb29kJyA+PC9JbnB1dFxyXG4gVGV4dD5cclxuICovXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9qb3VybmFsLWdyaWQtcm93LmpzeFxuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IEZvcm0gPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2Zvcm0uanMnKSxcclxuICAgIFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGFnZV9sYWJlbCcpLFxyXG4gICAgSW5wdXRUZXh0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dC5qc3gnKSxcclxuICAgIElucHV0RGF0ZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LWRhdGUuanN4JyksXHJcbiAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LW51bWJlci5qc3gnKSxcclxuICAgIFRvb2xiYXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy10b29sYmFyLmpzeCcpLFxyXG4gICAgRG9jQ29tbW9uID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtY29tbW9uLmpzeCcpLFxyXG4gICAgU2VsZWN0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtc2VsZWN0LmpzeCcpLFxyXG4gICAgVGV4dEFyZWEgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0YXJlYS5qc3gnKSxcclxuICAgIERhdGFHcmlkID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtZGF0YS1ncmlkLmpzeCcpLFxyXG4gICAgR3JpZFJvdyA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvc29yZGVyLWdyaWQtcm93LmpzeCcpO1xyXG5cclxudmFyIGRvY1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2RvY19zdG9yZS5qcycpLFxyXG4gICAgcmVsYXRlZERvY3VtZW50cyA9IHJlcXVpcmUoJy4uL21peGluL3JlbGF0ZWREb2N1bWVudHMuanN4JyksXHJcbiAgICB2YWxpZGF0ZUZvcm0gPSByZXF1aXJlKCcuLi9taXhpbi92YWxpZGF0ZUZvcm0nKTtcclxuXHJcbnZhciBub3cgPSBuZXcgRGF0ZSgpO1xyXG5cclxuY29uc3QgU29yZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlNvcmRlclwiLFxyXG4gICAgcGFnZXM6ICBbe3BhZ2VOYW1lOiAnU2lzc2V0dWxpa3Uga2Fzc2FvcmRlcid9XSxcclxuICAgIHJlcXVpcmVkRmllbGRzOiAgW1xyXG4gICAgICAgIHtuYW1lOiAna3B2JywgdHlwZTogJ0QnLCBtaW46IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSAtIDEpLCBtYXg6IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSArIDEpfSxcclxuICAgICAgICB7bmFtZTogJ2FzdXR1c2lkJywgdHlwZTogJ0knfSxcclxuICAgICAgICB7bmFtZTogJ25pbWknLCB0eXBlOiAnQyd9LFxyXG4gICAgICAgIHtuYW1lOiAnc3VtbWEnLCB0eXBlOiAnTid9XHJcbiAgICBdLFxyXG4vKlxyXG4gICAgbWl4aW5zOiBbcmVsYXRlZERvY3VtZW50cywgdmFsaWRhdGVGb3JtXSxcclxuKi9cclxuICAgIHJlbGF0ZWREb2N1bWVudHM6IGZ1bmN0aW9uKCkgIHtcclxuICAgICAgICByZXR1cm4gcmVsYXRlZERvY3VtZW50cyh0aGlzKVxyXG4gICAgfS5iaW5kKHRoaXMpLFxyXG5cclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINGD0YHRgtCw0L3QvtCy0LjQvCDQuNC30L3QsNGH0LDQu9GM0L3Ri9C1INC00LDQvdC90YvQtVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRvY0RhdGE6IHRoaXMucHJvcHMuZGF0YS5yb3csXHJcbiAgICAgICAgICAgIGVkaXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94OiAnbm9uZScsXHJcbiAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnByb3BzLmRhdGEuZGV0YWlscyxcclxuICAgICAgICAgICAgcmVsYXRpb25zOiB0aGlzLnByb3BzLmRhdGEucmVsYXRpb25zLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnOiB0aGlzLnByb3BzLmRhdGEuZ3JpZENvbmZpZyxcclxuICAgICAgICAgICAgZ3JpZFJvd0VkaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBncmlkUm93RXZlbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIGdyaWRSb3dEYXRhOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4vKlxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0L/QuNGI0LXQvCDQuNGB0YXQvtC00L3Ri9C1INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LUsINGA0LXQs9C40YHRgtGA0LjRgNGD0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICBkYXRhID0gc2VsZi5wcm9wcy5kYXRhLnJvdyxcclxuICAgICAgICAgICAgZGV0YWlscyA9IHNlbGYucHJvcHMuZGF0YS5kZXRhaWxzLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnID0gc2VsZi5wcm9wcy5kYXRhLmdyaWRDb25maWc7XHJcblxyXG4gICAgICAgIC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RvY0lkQ2hhbmdlJywgZGF0YS5pZCk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGRldGFpbHMpOyAvLyDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRDb25maWdDaGFuZ2UnLCBncmlkQ29uZmlnKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkTmFtZScsICdzb3JkZXItZ3JpZC1yb3cnKTsgLy8g0LfQsNC00LDQtdC8INC40LzRjyDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdGC0YDQvtC60Lgg0LPRgNC40LTQsCAo0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRlZDogbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdGCINC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0LIg0LPRgNC40LTQtVxyXG4gICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRldGFpbHMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgIHZhciBpc0NoYW5nZWQgPSBKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50IGRldGFpbHMgY2hhbmdlZCcsIGlzQ2hhbmdlZCwgdHlwZW9mIG5ld1ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICBpZiAoaXNDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgLy8g0LjRgtC+0LPQuFxyXG4gICAgICAgICAgICAgICAgIGxldCBzdW1tYSA9IG5ld1ZhbHVlLnJlZHVjZSgoc3VtLCByb3cpID0+IHN1bSArIE51bWJlcihyb3cuc3VtbWEpLDApLCAvLyDRgdGD0LzQvNCwINC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgICAgICAgICAgICAgIGRvY0RhdGEgPSBzZWxmLnN0YXRlLmRvY0RhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgIGRvY0RhdGEuc3VtbWEgPSBzdW1tYTtcclxuICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25ldyBzdW1tYTonLCBzdW1tYSk7XHJcbiAgICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Z3JpZERhdGE6IG5ld1ZhbHVlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy8g0YTQvtGA0LzQuNGA0YPQtdC8INC30LDQstC40YHQuNC80L7RgdGC0LhcclxuICAgICAgICB0aGlzLnJlbGF0ZWREb2N1bWVudHMoKTtcclxuICAgIH0sXHJcbiovXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgLy8g0L/QuNGI0LXQvCDQuNGB0YXQvtC00L3Ri9C1INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LUsINGA0LXQs9C40YHRgtGA0LjRgNGD0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICBkYXRhID0gc2VsZi5wcm9wcy5kYXRhLnJvdyxcclxuICAgICAgICAgICAgZGV0YWlscyA9IHNlbGYucHJvcHMuZGF0YS5kZXRhaWxzLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnID0gc2VsZi5wcm9wcy5kYXRhLmdyaWRDb25maWc7XHJcblxyXG4gICAgICAgIC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RvY0lkQ2hhbmdlJywgZGF0YS5pZCk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGRldGFpbHMpOyAvLyDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRDb25maWdDaGFuZ2UnLCBncmlkQ29uZmlnKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkTmFtZScsICdzb3JkZXItZ3JpZC1yb3cnKTsgLy8g0LfQsNC00LDQtdC8INC40LzRjyDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdGC0YDQvtC60Lgg0LPRgNC40LTQsCAo0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRlZDogbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdGCINC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0LIg0LPRgNC40LTQtVxyXG4gICAgICAgIGRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGV0YWlscycsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgaXNDaGFuZ2VkID0gSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50IGRldGFpbHMgY2hhbmdlZCcsIGlzQ2hhbmdlZCwgdHlwZW9mIG5ld1ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0NoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vINC40YLQvtCz0LhcclxuICAgICAgICAgICAgICAgIGxldCBzdW1tYSA9IG5ld1ZhbHVlLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSk7fSwwKSwgLy8g0YHRg9C80LzQsCDQtNC+0LrRg9C80LXQvdGC0LBcclxuICAgICAgICAgICAgICAgICAgICBkb2NEYXRhID0gc2VsZi5zdGF0ZS5kb2NEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY0RhdGEuc3VtbWEgPSBzdW1tYTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgc3VtbWE6Jywgc3VtbWEpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Z3JpZERhdGE6IG5ld1ZhbHVlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XHJcbiAgICAgICAgdGhpcy5yZWxhdGVkRG9jdW1lbnRzKCk7XHJcblxyXG4gICAgICAgIC8vINCz0YDRg9C30LjQvCDRgdC/0YDQsNCy0L7Rh9C90LjQutC4XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignbG9hZExpYnMnLCAnJyk7XHJcblxyXG4gICAgICAgIC8vINC10YHQu9C4INC90L7QstGL0Lkg0LTQvtC60YPQvNC10L3RgiAoaWQgPT0gMClcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuc3RhdGUuZG9jRGF0YTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuaWQgPT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZWRpdGVkIG1vZGUgY29udHJvbCcsIGRhdGEpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdlZGl0ZWRDaGFuZ2UnLCB0cnVlKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2F2ZWRDaGFuZ2UnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGEsXHJcbiAgICAgICAgICAgIGlzRWRpdGVNb2RlID0gdGhpcy5zdGF0ZS5lZGl0ZWQsXHJcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94ID0gdGhpcy5zdGF0ZS5zaG93TWVzc2FnZUJveDsgLy8g0LHRg9C00LXRgiDRg9C/0YDQsNCy0LvRj9GC0Ywg0L7QutC90L7QvCDRgdC+0L7QsdGJ0LXQvdC40LlcclxuXHJcbiAgICAgICAgLy8gIHBhdHRlcm49J1tBLVphLXpdezN9J1xyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gdGhpcy5zdGF0ZS5ncmlkQ29uZmlnO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtLCB7cGFnZXM6IHRoaXMucGFnZXMsIHJlZjogXCJmb3JtXCIsIG9uU3VibWl0OiB0aGlzLm9uU3VibWl0LCBzdHlsZToge2Rpc3BsYXk6ICd0YWJsZSd9fSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXIsIHt2YWxpZGF0b3I6IHRoaXMudmFsaWRhdGVGb3JtfSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImRpdi1kb2NcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQ29tbW9uLCB7ZGF0YTogZGF0YX0pLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZmllbGRzZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOdW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLm51bWJlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJmYWxzZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXREYXRlLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkt1dXDDpGV2IFwiLCBuYW1lOiBcImtwdlwiLCB2YWx1ZTogZGF0YS5rcHYsIHJlZjogXCJrcHZcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLdXVww6RldlwiLCByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkthc3NhXCIsIG5hbWU6IFwia2Fzc2FfaWRcIiwgbGliczogXCJhYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmthc3NhX2lkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZGF0YS5rYXNzYSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLYXNzYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrYXNzYV9pZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIlBhcnRuZXJcIiwgbmFtZTogXCJhc3V0dXNpZFwiLCBsaWJzOiBcImFzdXR1c2VkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuYXN1dHVzaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBkYXRhLmFzdXR1cywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJQYXJ0bmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImFzdXR1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkFydmUgbnIuXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhcnZpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwiYXJ2ZWRWYWxqYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFydmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZGF0YS5hcnZuciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJBcnZlIG5yLlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJhcnZpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ0bkRlbGV0ZTogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJEb2t1bWVudCBcIiwgbmFtZTogXCJkb2t1bWVudFwiLCB2YWx1ZTogZGF0YS5kb2t1bWVudCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJEb2t1bWVudFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJkb2t1bWVudFwiLCByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiTmltaVwiLCBuYW1lOiBcIm5pbWlcIiwgcGxhY2Vob2xkZXI6IFwiTmltaVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcIm5pbWlcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFhZHJlc3MsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkFhZHJlc3NcIiwgbmFtZTogXCJhYWRyZXNzXCIsIHBsYWNlaG9sZGVyOiBcIkFhZHJlc3NcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJhYWRyZXNzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hYWRyZXNzLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCB3aWR0aDogXCI4NSVcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJBbHVzXCIsIG5hbWU6IFwiYWx1c1wiLCBwbGFjZWhvbGRlcjogXCJBbHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYWx1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuYWx1cywgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgd2lkdGg6IFwiODUlXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YUdyaWQsIHtzb3VyY2U6IFwiZGV0YWlsc1wiLCBncmlkRGF0YTogZ3JpZERhdGEsIGdyaWRDb2x1bW5zOiBncmlkQ29sdW1ucywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUdyaWRSb3c6IHRoaXMuaGFuZGxlR3JpZFJvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHJlZjogXCJEYXRhR3JpZFwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJTdW1tYTogXCIsIG5hbWU6IFwic3VtbWFcIiwgcGxhY2Vob2xkZXI6IFwiU3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwic3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5zdW1tYSwgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwiXlswLTldKyhcXFxcLlswLTldezEsNH0pPyRcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiDQv9Cw0YLQtdGA0L0g0LTQu9GPINGG0LjRhNGAINGBIDQg0LfQvdCw0LrQsNC80Lgg0L/QvtGB0LvQtSDRgtC+0YfQutC4Ki9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIk3DpHJrdXNlZFwiLCBuYW1lOiBcIm11dWRcIiwgcGxhY2Vob2xkZXI6IFwiTcOkcmt1c2VkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwibXV1ZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEubXV1ZCwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgd2lkdGg6IFwiODUlXCJ9KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmdyaWRSb3dFZGl0ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcmlkUm93LCB7bW9kYWxQYWdlQ2xpY2s6IHRoaXMubW9kYWxQYWdlQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkRXZlbnQ6IHRoaXMuc3RhdGUuZ3JpZFJvd0V2ZW50LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFJvd0RhdGE6IHRoaXMuc3RhdGUuZ3JpZFJvd0RhdGF9KSA6IG51bGxcclxuXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVHcmlkUm93OiBmdW5jdGlvbiAoZ3JpZEV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgLy8g0YPQv9GA0LDQstC70LXQvdC40LUg0LzQvtC00LDQu9GM0L3Ri9C8INC+0LrQvdC+0LxcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtncmlkUm93RWRpdDogdHJ1ZSwgZ3JpZFJvd0V2ZW50OiBncmlkRXZlbnQsIGdyaWRSb3dEYXRhOiBkYXRhfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG1vZGFsUGFnZUNsaWNrOiBmdW5jdGlvbiAoYnRuRXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAvLyDQvtGC0YDQsNCx0L7RgtCw0LXQvCBPayDQuNC3INC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwXHJcbiAgICAgICAgdmFyIGdyaWREYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGV0YWlscyxcclxuICAgICAgICAgICAgZG9jRGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIGdyaWRSb3dJZCA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRSb3dJZCxcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnMgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5ncmlkQ29uZmlnO1xyXG4gICAgICAgIHZhciBncmlkUm93ID0ge307XHJcblxyXG4gICAgICAgIGlmIChncmlkUm93SWQgPj0gMCkge1xyXG4gICAgICAgICAgICBncmlkUm93ID0gZ3JpZERhdGFbZ3JpZFJvd0lkXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ByZXZpb3Mgc3RhdGUgZ3JpZERhdGEsIGRvY0RhdGEnLCBncmlkRGF0YSwgIGRvY0RhdGEpO1xyXG5cclxuICAgICAgICBpZiAoYnRuRXZlbnQgPT0gJ09rJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnIG1vZGFsUGFnZUNsaWNrIGRhdGEsIGdyaWRSb3dJZCwgZ3JpZFJvdycsIGRhdGEsIGdyaWRSb3dJZCwgZ3JpZFJvdyk7XHJcbiAgICAgICAgICAgIGlmIChncmlkUm93SWQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvdC+0LLQsNGPINC30LDQv9C40YHRjFxyXG4gICAgICAgICAgICAgICAgLy8g0YTQvtGA0LzQuNGA0YPQtdC8INC/0YPRgdGC0YPRjiDRgdGC0YDQvtC60YNcclxuLy8gICAgICAgICAgICAgICAgZ3JpZFJvdyA9e307XHJcbiAgICAgICAgICAgICAgICBncmlkUm93WydpZCddID0gJ05FVycgKyBNYXRoLnJhbmRvbSgpOyAgLy8g0LPQtdC90LXRgNC40YDRg9C10Lwg0L3QvtCy0L7QtSDQmNCUXHJcbiAgICAgICAgICAgICAgICBncmlkQ29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSAge3JldHVybiBncmlkUm93W2ZpZWxkXSA9IG51bGw7fSk7IC8vINGB0L7Qt9C00LDQtdC8INC/0L7Qu9GPINCyINC+0LHRitC10LrRgtC1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbihmaWVsZCkgIHtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbZmllbGQubmFtZV0gPSBmaWVsZC52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9GB0L7RhdGA0LDQvdC40Lwg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtSwgZ3JpZFJvdycsIGdyaWRSb3cpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vINC30LDQv9C+0LvQvdC40Lwg0L/QvtC70Y8gbmltZXR1c1xyXG4gICAgICAgICAgICB2YXIgbGlicyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmxpYnMsXHJcbiAgICAgICAgICAgICBub21MaWIgPSBsaWJzLmZpbHRlcihmdW5jdGlvbihkYXRhKSAge1xyXG4gICAgICAgICAgICAgICAgIGlmIChkYXRhLmlkID09ICdub21lbmNsYXR1cmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICB2YXIgICBub21Sb3cgPSBub21MaWJbMF0uZGF0YS5maWx0ZXIoZnVuY3Rpb24ocm93KSB7XHJcbiAgICAgICAgICAgICAgICAgaWYgKHJvdy5pZCA9PSBOdW1iZXIoZ3JpZFJvdy5ub21pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvdztcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICBpZiAobm9tUm93KSB7XHJcbiAgICAgICAgICAgICAgICAgZ3JpZFJvd1snbmltZXR1cyddID0gbm9tUm93WzBdLm5hbWU7XHJcbiAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWZ0ZXIgc3RhdGUgZ3JpZERhdGEgJXMsIGRvY0RhdGEgJXMnLCBncmlkRGF0YSwgIGRvY0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGdyaWRSb3dJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YVtncmlkUm93SWRdID0gZ3JpZFJvdztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdyaWREYXRhLnB1c2goZ3JpZFJvdyk7IC8vINC00L7QsdCw0LLQu9GP0LXQvCDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRSb3dJZENoYW5nZScsIGdyaWREYXRhLmxlbmd0aCk7IC8vINC/0L7QvNC10YfQsNC10Lwg0L3QvtCy0YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINGB0YfQuNGC0LDQtdC8INC40YLQvtCz0LhcclxuXHJcbiAgICAgICAgdmFyIGRvY1N1bW1hID0gZ3JpZERhdGEucmVkdWNlKGZ1bmN0aW9uKHN1bSwgcm93KSAge3JldHVybiBzdW0gKyBOdW1iZXIocm93LnN1bW1hKTt9LCAwKTsgLy8g0YHRg9C80LzQsCDRgdGH0LXRgtCwXHJcblxyXG4gICAgICAgIGRvY0RhdGEuc3VtbWEgPSBkb2NTdW1tYTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZzWydEYXRhR3JpZCddLnJlcGxhY2VTdGF0ZSh7Z3JpZERhdGE6IGdyaWREYXRhfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IGZhbHNlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb3JkZXI7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy9zb3JkZXIuanN4XG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4vbW9kYWxwYWdlL21vZGFsUGFnZS5qc3gnKSxcclxuICAgIFNlbGVjdCA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LXNlbGVjdC5qc3gnKSxcclxuICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LXRleHQuanN4JyksXHJcbiAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LW51bWJlci5qc3gnKTtcclxuXHJcbnZhciBTb3JkZXJHcmlkUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlNvcmRlckdyaWRSb3dcIixcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgY29uc29sZS5sb2coJ0FydkdyaWRSb3cgcHJvcHMnLCB0aGlzLnByb3BzKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByb3c6IHRoaXMucHJvcHMuZ3JpZFJvd0RhdGEsIGNoZWNrZWQ6IGZhbHNlLCB3YXJuaW5nOicnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyDQv9GA0LXQtNCy0LDRgNC40YLQtdC70YzQvdCw0Y8g0L/RgNC+0LLQtdGA0LrQsFxyXG4gICAgICAgIHRoaXMudmFsaWRhdGVGb3JtKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG1vZGFsUGFnZUNsaWNrOiBmdW5jdGlvbiAoYnRuRXZlbnQpIHtcclxuICAgICAgICB2YXIgY29tcG9uZW50cyA9IFsnbm9taWQnLCAgJ3N1bW1hJywgJ3Byb2onLCAndHVubnVzJ10sXHJcbiAgICAgICAgICAgIGRhdGEgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcclxuICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LrQsFxyXG5cclxuICAgICAgICAgICAgLy8g0YHQvtCx0LjRgNCw0LXQvCDQtNCw0L3QvdGL0LUg0LTQu9GPINC+0YLQv9GA0LDQstC60Lgg0L3QsCDQvtCx0YDQsNCx0L7RgtC60YNcclxuICAgICAgICAgICAgY29tcG9uZW50cy5tYXAoZnVuY3Rpb24oY29tcG9uZW50KSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudFZhbHVlID0gdGhpcy5yZWZzW2NvbXBvbmVudF0uc3RhdGUudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50ID09ICdwcm9qJyB8fCBjb21wb25lbnQgPT0gJ3R1bm51cycpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRWYWx1ZSA9IHRoaXMucmVmc1tjb21wb25lbnRdLnN0YXRlLmZpZWxkVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW9kYWxQYWdlQ2xpY2sgJyxjb21wb25lbnQsIGNvbXBvbmVudFZhbHVlIClcclxuICAgICAgICAgICAgICAgIGRhdGEucHVzaCh7bmFtZTogY29tcG9uZW50LCB2YWx1ZTogY29tcG9uZW50VmFsdWV9KTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb3BzLm1vZGFsUGFnZUNsaWNrKGJ0bkV2ZW50LCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlOiBmdW5jdGlvbiAoZSwgbmFtZSkge1xyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINC00LDQvdC90YvRhSDQvdCwINGE0L7RgNC80LVcclxuICAgICAgICBjb25zb2xlLmxvZygnc2VsZWN0IGNoYW5nZWQnKTtcclxuICAgICAgICB2YXIgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuc3RhdGUucm93W25hbWVdICYmIG5hbWUgPT0gJ25vbWlkJykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnNbJ3N1bW1hJ10uc2V0U3RhdGUoe3ZhbHVlOiAwLjAwfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmFsaWRhdGVGb3JtKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUlucHV0OiBmdW5jdGlvbiAodmFsdWUsIG5hbWUpIHtcclxuICAgICAgICAvLyDQv9C10YDQtdGB0YfQtdGCINGB0YPQvNC8XHJcbiAgICAgICAgdGhpcy5yZWNhbGNSb3dTdW1tKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB2YWxpZGF0ZUZvcm06IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIHdpbGwgY2hlY2sgdmFsdWVzIG9uIHRoZSBmb3JtIGFuZCByZXR1cm4gc3RyaW5nIHdpdGggd2FybmluZ1xyXG4gICAgICAgIHZhciB3YXJuaW5nID0gJyc7XHJcbiAgICAgICAgLy8g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0L/RgNC+0LLQtdGA0LrQuCDRhNC+0YDQvNGLINC90LAg0LLQsNC70LjQtNC90L7RgdGC0YxcclxuICAgICAgICBpZiAoIXRoaXMucmVmc1snbm9taWQnXS5zdGF0ZS52YWx1ZSkgd2FybmluZyA9ICB3YXJuaW5nICsgJyDQutCw0YHRgdC+0LLQsNGPINC+0L/QtdGA0LDRhtC40Y8nO1xyXG5cclxuICAgICAgICBpZiAod2FybmluZy5sZW5ndGggPiAyICkge1xyXG4gICAgICAgICAgICAvLyDQtdGB0YLRjCDQv9GA0L7QsdC70LXQvNGLXHJcbiAgICAgICAgICAgIHdhcm5pbmcgPSAn0J7RgtGB0YPRgtGB0LLRg9GO0YIg0LTQsNC90L3Ri9C1OicgKyB3YXJuaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhdGVkJywgd2FybmluZywgdGhpcy5yZWZzWydub21pZCddLnN0YXRlLnZhbHVlKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjaGVja2VkOiB0cnVlLCB3YXJuaW5nOiB3YXJuaW5nfSk7XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciByb3cgPSB0aGlzLnN0YXRlLnJvdyxcclxuICAgICAgICAgICAgdmFsaWRhdGVNZXNzYWdlID0gdGhpcy5zdGF0ZS53YXJuaW5nLFxyXG4gICAgICAgICAgICBidXR0b25Pa1JlYWRPbmx5ID0gdmFsaWRhdGVNZXNzYWdlLmxlbmd0aCA+IDAgfHwgIXRoaXMuc3RhdGUuY2hlY2tlZDtcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdyb3cgcmVuZGVyOicsdmFsaWRhdGVNZXNzYWdlLCBidXR0b25Pa1JlYWRPbmx5ICk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcIm1vZGFsUGFnZVwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VOYW1lOiBcIlJlYSBsaXNhbWluZSAvIHBhcmFuZGFtaW5lXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiT3BlcmF0c2lvb246IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5vbWlkXCIsIGxpYnM6IFwibm9tZW5jbGF0dXJlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5ub21pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiByb3cua29vZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcIm5vbWlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkthc3NhIG9wZXJhdHNpb29uaSBrb29kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2V9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3VtbWE6IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiU3VtbWE6XCIsIHZhbHVlOiByb3cuc3VtbWEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiZmFsc2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIHJlZjogXCJzdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUHJvamVrdDpcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcm9qXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwicHJvamVjdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cucHJvaiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImtvb2RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInByb2pcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiUHJvamVrdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJUdW5udXM6XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwidHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy50dW5udXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJrb29kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJ0dW5udXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTGF1c2VuZGkgdHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdmFsaWRhdGVNZXNzYWdlKSksIFwiO1wiXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuLypcclxuPGRpdj5cclxuICAgIHtidXR0b25Pa1JlYWRPbmx5ID9cclxuICAgICAgICA8YnV0dG9uIGRpc2FibGVkPiBPayA8L2J1dHRvbj46XHJcbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm1vZGFsUGFnZUNsaWNrLmJpbmQodGhpcywnT2snKX0+IE9rIDwvYnV0dG9uPlxyXG4gICAgfVxyXG4gICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm1vZGFsUGFnZUNsaWNrLmJpbmQodGhpcywnQ2FuY2VsJyl9PiBDYW5jZWw8L2J1dHRvbj5cclxuPC9kaXY+XHJcbiovXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb3JkZXJHcmlkUm93O1xyXG5cclxuLypcclxuIDxJbnB1dFRleHQgdGl0bGU9J0tvb2QgJyBuYW1lPSdrb29kJyB2YWx1ZT17cm93Lmtvb2R9IHJlYWRPbmx5PXtmYWxzZX1cclxuIGRpc2FibGVkPVwiZmFsc2VcIiByZWY9J2tvb2QnID48L0lucHV0VGV4dD5cclxuICovXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9zb3JkZXItZ3JpZC1yb3cuanN4XG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3QgRm9ybSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZm9ybS5qcycpLFxyXG4gICAgUGFnZUxhYmVsID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9wYWdlX2xhYmVsJyksXHJcbiAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgSW5wdXREYXRlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtZGF0ZS5qc3gnKSxcclxuICAgIElucHV0TnVtYmVyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtbnVtYmVyLmpzeCcpLFxyXG4gICAgVG9vbGJhciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLXRvb2xiYXIuanN4JyksXHJcbiAgICBEb2NDb21tb24gPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1jb21tb24uanN4JyksXHJcbiAgICBTZWxlY3QgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1zZWxlY3QuanN4JyksXHJcbiAgICBUZXh0QXJlYSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LXRleHRhcmVhLmpzeCcpLFxyXG4gICAgRGF0YUdyaWQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1kYXRhLWdyaWQuanN4JyksXHJcbiAgICBHcmlkUm93ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9zb3JkZXItZ3JpZC1yb3cuanN4Jyk7XHJcblxyXG52YXIgZG9jU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZXMvZG9jX3N0b3JlLmpzJyksXHJcbiAgICByZWxhdGVkRG9jdW1lbnRzID0gcmVxdWlyZSgnLi4vbWl4aW4vcmVsYXRlZERvY3VtZW50cy5qc3gnKSxcclxuICAgIHZhbGlkYXRlRm9ybSA9IHJlcXVpcmUoJy4uL21peGluL3ZhbGlkYXRlRm9ybScpO1xyXG5cclxudmFyIG5vdyA9IG5ldyBEYXRlKCk7XHJcblxyXG5jb25zdCBWb3JkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiVm9yZGVyXCIsXHJcbiAgICBwYWdlczogIFt7cGFnZU5hbWU6ICdWw6RsamFtYWtzZSBrYXNzYW9yZGVyJ31dLFxyXG4gICAgcmVxdWlyZWRGaWVsZHM6ICBbXHJcbiAgICAgICAge25hbWU6ICdrcHYnLCB0eXBlOiAnRCcsIG1pbjogbm93LnNldEZ1bGxZZWFyKG5vdy5nZXRGdWxsWWVhcigpIC0gMSksIG1heDogbm93LnNldEZ1bGxZZWFyKG5vdy5nZXRGdWxsWWVhcigpICsgMSl9LFxyXG4gICAgICAgIHtuYW1lOiAnYXN1dHVzaWQnLCB0eXBlOiAnSSd9LFxyXG4gICAgICAgIHtuYW1lOiAnbmltaScsIHR5cGU6ICdDJ30sXHJcbiAgICAgICAge25hbWU6ICdzdW1tYScsIHR5cGU6ICdOJ31cclxuICAgIF0sXHJcbi8qXHJcbiAgICBtaXhpbnM6IFtyZWxhdGVkRG9jdW1lbnRzLCB2YWxpZGF0ZUZvcm1dLFxyXG4qL1xyXG5cclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINGD0YHRgtCw0L3QvtCy0LjQvCDQuNC30L3QsNGH0LDQu9GM0L3Ri9C1INC00LDQvdC90YvQtVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRvY0RhdGE6IHRoaXMucHJvcHMuZGF0YS5yb3csXHJcbiAgICAgICAgICAgIGVkaXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94OiAnbm9uZScsXHJcbiAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnByb3BzLmRhdGEuZGV0YWlscyxcclxuICAgICAgICAgICAgcmVsYXRpb25zOiB0aGlzLnByb3BzLmRhdGEucmVsYXRpb25zLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnOiB0aGlzLnByb3BzLmRhdGEuZ3JpZENvbmZpZyxcclxuICAgICAgICAgICAgZ3JpZFJvd0VkaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBncmlkUm93RXZlbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIGdyaWRSb3dEYXRhOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDQv9C40YjQtdC8INC40YHRhdC+0LTQvdGL0LUg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtSwg0YDQtdCz0LjRgdGC0YDQuNGA0YPQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YHQvtCx0YvRgtC40LlcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIGRhdGEgPSBzZWxmLnByb3BzLmRhdGEucm93LFxyXG4gICAgICAgICAgICBkZXRhaWxzID0gc2VsZi5wcm9wcy5kYXRhLmRldGFpbHMsXHJcbiAgICAgICAgICAgIGdyaWRDb25maWcgPSBzZWxmLnByb3BzLmRhdGEuZ3JpZENvbmZpZztcclxuXHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZG9jSWRDaGFuZ2UnLCBkYXRhLmlkKTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZGV0YWlscyk7IC8vINC00LDQvdC90YvQtSDQs9GA0LjQtNCwXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZENvbmZpZ0NoYW5nZScsIGdyaWRDb25maWcpOyAvLyDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWROYW1lJywgJ3NvcmRlci1ncmlkLXJvdycpOyAvLyDQt9Cw0LTQsNC10Lwg0LjQvNGPINC60L7QvNC/0L7QvdC10L3RgtCwINGB0YLRgNC+0LrQuCDQs9GA0LjQtNCwICjQtNC70Y8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG5cclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIGRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7ZWRpdGVkOiBuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10YIg0LjQt9C80LXQvdC10L3QuNGPINC00LDQvdC90YvRhSDQsiDQs9GA0LjQtNC1XHJcbiAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTpkZXRhaWxzJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBpc0NoYW5nZWQgPSBKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXZlbnQgZGV0YWlscyBjaGFuZ2VkJywgaXNDaGFuZ2VkLCB0eXBlb2YgbmV3VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LjRgtC+0LPQuFxyXG4gICAgICAgICAgICAgICAgbGV0IHN1bW1hID0gbmV3VmFsdWUucmVkdWNlKGZ1bmN0aW9uKHN1bSwgcm93KSAge3JldHVybiBzdW0gKyBOdW1iZXIocm93LnN1bW1hKTt9LDApLCAvLyDRgdGD0LzQvNCwINC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY0RhdGEgPSBzZWxmLnN0YXRlLmRvY0RhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jRGF0YS5zdW1tYSA9IHN1bW1hO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25ldyBzdW1tYTonLCBzdW1tYSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtncmlkRGF0YTogbmV3VmFsdWUsIGRvY0RhdGE6IGRvY0RhdGF9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIGRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGF0YScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndm9yZGVyIG9uQ2hhbmdlICcsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSkpIHtcclxuLy8gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7ZWRpdGVkOiBuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0L3QsCDQv9C+0LvQtSBhc3V0dXNpZCDQuCDRgtC+0LPQtNCwINC30LDQv9GA0L7RgSDQvdCwINC90L7QvNC10YDQsCDRgdGH0LXRgtC+0LIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuCDQmNCUINGD0YfRgNC10LbQtNC10L3QuNGPINC4INC90L7QvNC10YDQsCDRgdGH0LXRgtCwXHJcbi8vICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd2b3JkZXIgb25DaGFuZ2UgJywgbmV3VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gbmV3VmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFuZXdWYWx1ZS5hc3V0dXNpZCApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdGC0LjRgNCw0LXQvCDRgdGB0YvQu9C60YMg0L3QsCDRgdGH0LXRglxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYXJ2aWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RvY0RhdGE6IGRhdGF9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vINGD0YHRgtCw0L3QvtCy0LjQvCDQvdC+0LLRi9C5INGE0LjQu9GM0YLRgFxyXG4gICAgICAgICAgICAgICAgdmFyIGFydmVMaWJQYXJhbXMgPSBbZGF0YS5hc3V0dXNpZCwgZGF0YS5hcnZpZF07XHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzZXRMaWJzRmlsdGVyJywgJ2FydmVkJyxhcnZlTGliUGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0YTQvtGA0LzQuNGA0YPQtdC8INC30LDQstC40YHQuNC80L7RgdGC0LhcclxuICAgICAgICB0aGlzLnJlbGF0ZWREb2N1bWVudHMoKTtcclxuXHJcblxyXG4gICAgICAgIC8vINCz0YDRg9C30LjQvCDRgdC/0YDQsNCy0L7Rh9C90LjQutC4XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignbG9hZExpYnMnLCAnJyk7XHJcblxyXG4gICAgICAgIC8vINC10YHQu9C4INC90L7QstGL0Lkg0LTQvtC60YPQvNC10L3RgiAoaWQgPT0gMClcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuc3RhdGUuZG9jRGF0YTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuaWQgPT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZWRpdGVkIG1vZGUgY29udHJvbCcsIGRhdGEpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdlZGl0ZWRDaGFuZ2UnLCB0cnVlKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2F2ZWRDaGFuZ2UnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGEsXHJcbiAgICAgICAgICAgIGlzRWRpdGVNb2RlID0gdGhpcy5zdGF0ZS5lZGl0ZWQsXHJcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94ID0gdGhpcy5zdGF0ZS5zaG93TWVzc2FnZUJveDsgLy8g0LHRg9C00LXRgiDRg9C/0YDQsNCy0LvRj9GC0Ywg0L7QutC90L7QvCDRgdC+0L7QsdGJ0LXQvdC40LlcclxuXHJcbiAgICAgICAgLy8gIHBhdHRlcm49J1tBLVphLXpdezN9J1xyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gdGhpcy5zdGF0ZS5ncmlkQ29uZmlnO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygndm9yZGVyIHBhZ2VzJywgdGhpcy5wYWdlcyk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtLCB7cGFnZXM6IHRoaXMucGFnZXMsIHJlZjogXCJmb3JtXCIsIG9uU3VibWl0OiB0aGlzLm9uU3VibWl0LCBzdHlsZToge2Rpc3BsYXk6ICd0YWJsZSd9fSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXIsIHt2YWxpZGF0b3I6IHRoaXMudmFsaWRhdGVGb3JtfSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImRpdi1kb2NcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQ29tbW9uLCB7ZGF0YTogZGF0YX0pLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZmllbGRzZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOdW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLm51bWJlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJmYWxzZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXREYXRlLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkt1dXDDpGV2IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3B2XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEua3B2LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrcHZcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLdXVww6RldlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiS2Fzc2FcIiwgbmFtZTogXCJrYXNzYV9pZFwiLCBsaWJzOiBcImFhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEua2Fzc2FfaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBkYXRhLmthc3NhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkthc3NhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImthc3NhX2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiUGFydG5lclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYXN1dHVzaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcImFzdXR1c2VkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuYXN1dHVzaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBkYXRhLmFzdXR1cywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJQYXJ0bmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImFzdXR1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBcnZlIG5yLlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYXJ2aWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcImFydmVkU2lzc2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hcnZpZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsSWQ6IFwiaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGRhdGEuYXJ2bnIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiQXJ2ZSBuci5cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYXJ2aWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidG5EZWxldGU6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRva3VtZW50IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rdW1lbnRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5kb2t1bWVudCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJEb2t1bWVudFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJkb2t1bWVudFwiLCByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5pbWlcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmltaVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTmltaVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcIm5pbWlcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFhZHJlc3MsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBYWRyZXNzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFhZHJlc3NcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkFhZHJlc3NcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJhYWRyZXNzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwidGV4dEFhZHJlc3NcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFhZHJlc3MsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkFsdXNcIiwgbmFtZTogXCJhbHVzXCIsIHBsYWNlaG9sZGVyOiBcIkFsdXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJhbHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwidGV4dEFsdXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFsdXMsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERhdGFHcmlkLCB7c291cmNlOiBcImRldGFpbHNcIiwgZ3JpZERhdGE6IGdyaWREYXRhLCBncmlkQ29sdW1uczogZ3JpZENvbHVtbnMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVHcmlkUm93OiB0aGlzLmhhbmRsZUdyaWRSb3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlLCByZWY6IFwiRGF0YUdyaWRcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiU3VtbWE6IFwiLCBuYW1lOiBcInN1bW1hXCIsIHBsYWNlaG9sZGVyOiBcIlN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuc3VtbWEsIGRpc2FibGVkOiBcInRydWVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIl5bMC05XSsoXFxcXC5bMC05XXsxLDR9KT8kXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyog0L/QsNGC0LXRgNC9INC00LvRjyDRhtC40YTRgCDRgSA0INC30L3QsNC60LDQvNC4INC/0L7RgdC70LUg0YLQvtGH0LrQuCovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJNw6Rya3VzZWRcIiwgbmFtZTogXCJtdXVkXCIsIHBsYWNlaG9sZGVyOiBcIk3DpHJrdXNlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcIm11dWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLm11dWQsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5ncmlkUm93RWRpdCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZFJvdywge21vZGFsUGFnZUNsaWNrOiB0aGlzLm1vZGFsUGFnZUNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZEV2ZW50OiB0aGlzLnN0YXRlLmdyaWRSb3dFdmVudCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRSb3dEYXRhOiB0aGlzLnN0YXRlLmdyaWRSb3dEYXRhfSkgOiBudWxsXHJcblxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlR3JpZFJvdzogZnVuY3Rpb24gKGdyaWRFdmVudCwgZGF0YSkge1xyXG4gICAgICAgIC8vINGD0L/RgNCw0LLQu9C10L3QuNC1INC80L7QtNCw0LvRjNC90YvQvCDQvtC60L3QvtC8XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IHRydWUsIGdyaWRSb3dFdmVudDogZ3JpZEV2ZW50LCBncmlkUm93RGF0YTogZGF0YX0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBtb2RhbFBhZ2VDbGljazogZnVuY3Rpb24gKGJ0bkV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgLy8g0L7RgtGA0LDQsdC+0YLQsNC10LwgT2sg0LjQtyDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsFxyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRldGFpbHMsXHJcbiAgICAgICAgICAgIGRvY0RhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICBncmlkUm93SWQgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5ncmlkUm93SWQsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZ3JpZENvbmZpZztcclxuICAgICAgICB2YXIgZ3JpZFJvdyA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoZ3JpZFJvd0lkID49IDApIHtcclxuICAgICAgICAgICAgZ3JpZFJvdyA9IGdyaWREYXRhW2dyaWRSb3dJZF07XHJcbiAgICAgICAgfVxyXG4vLyAgICAgICAgY29uc29sZS5sb2coJ3ByZXZpb3Mgc3RhdGUgZ3JpZERhdGEsIGRvY0RhdGEnLCBncmlkRGF0YSwgIGRvY0RhdGEpO1xyXG5cclxuICAgICAgICBpZiAoYnRuRXZlbnQgPT0gJ09rJykge1xyXG4vLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgbW9kYWxQYWdlQ2xpY2sgZGF0YSwgZ3JpZFJvd0lkLCBncmlkUm93JywgZGF0YSwgZ3JpZFJvd0lkLCBncmlkUm93KTtcclxuICAgICAgICAgICAgaWYgKGdyaWRSb3dJZCA8IDApIHtcclxuICAgICAgICAgICAgICAgIC8vINC90L7QstCw0Y8g0LfQsNC/0LjRgdGMXHJcbiAgICAgICAgICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0L/Rg9GB0YLRg9GOINGB0YLRgNC+0LrRg1xyXG4vLyAgICAgICAgICAgICAgICBncmlkUm93ID17fTtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbJ2lkJ10gPSAnTkVXJyArIE1hdGgucmFuZG9tKCk7ICAvLyDQs9C10L3QtdGA0LjRgNGD0LXQvCDQvdC+0LLQvtC1INCY0JRcclxuICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oZmllbGQpICB7cmV0dXJuIGdyaWRSb3dbZmllbGRdID0gbnVsbDt9KTsgLy8g0YHQvtC30LTQsNC10Lwg0L/QvtC70Y8g0LIg0L7QsdGK0LXQutGC0LVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSAge1xyXG4gICAgICAgICAgICAgICAgZ3JpZFJvd1tmaWVsZC5uYW1lXSA9IGZpZWxkLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn0YHQvtGF0YDQsNC90LjQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1LCBncmlkUm93JywgZ3JpZFJvdyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g0LfQsNC/0L7Qu9C90LjQvCDQv9C+0LvRjyBuaW1ldHVzXHJcbiAgICAgICAgICAgIHZhciBsaWJzID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUubGlicyxcclxuICAgICAgICAgICAgICAgIG5vbUxpYiA9IGxpYnMuZmlsdGVyKGZ1bmN0aW9uKGRhdGEpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaWQgPT0gJ25vbWVuY2xhdHVyZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyICAgbm9tUm93ID0gbm9tTGliWzBdLmRhdGEuZmlsdGVyKGZ1bmN0aW9uKHJvdykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdy5pZCA9PSBOdW1iZXIoZ3JpZFJvdy5ub21pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChub21Sb3cpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbJ25pbWV0dXMnXSA9IG5vbVJvd1swXS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWZ0ZXIgc3RhdGUgZ3JpZERhdGEgJXMsIGRvY0RhdGEgJXMnLCBncmlkRGF0YSwgIGRvY0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGdyaWRSb3dJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YVtncmlkUm93SWRdID0gZ3JpZFJvdztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdyaWREYXRhLnB1c2goZ3JpZFJvdyk7IC8vINC00L7QsdCw0LLQu9GP0LXQvCDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRSb3dJZENoYW5nZScsIGdyaWREYXRhLmxlbmd0aCk7IC8vINC/0L7QvNC10YfQsNC10Lwg0L3QvtCy0YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINGB0YfQuNGC0LDQtdC8INC40YLQvtCz0LhcclxuXHJcbiAgICAgICAgdmFyIGRvY1N1bW1hID0gZ3JpZERhdGEucmVkdWNlKGZ1bmN0aW9uKHN1bSwgcm93KSAge3JldHVybiBzdW0gKyBOdW1iZXIocm93LnN1bW1hKTt9LCAwKTsgLy8g0YHRg9C80LzQsCDRgdGH0LXRgtCwXHJcblxyXG4gICAgICAgIGRvY0RhdGEuc3VtbWEgPSBkb2NTdW1tYTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZzWydEYXRhR3JpZCddLnJlcGxhY2VTdGF0ZSh7Z3JpZERhdGE6IGdyaWREYXRhfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IGZhbHNlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBWb3JkZXI7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy92b3JkZXIuanN4XG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5jb25zdCBGb3JtID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9mb3JtLmpzJyk7XHJcbmNvbnN0IFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGFnZV9sYWJlbCcpO1xyXG5cclxudmFyIHBhZ2VzID0gWydQYWdlMScsICdQYWdlMiddO1xyXG5cclxuY29uc3QgUGFsayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJQYWxrXCIsXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybSwge3BhZ2VzOiBwYWdlc30sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCIgUGFsayBcIilcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9fSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBhbGs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2NzL3BhbGtfb3Blci5qc3hcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDN0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQy9GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNqT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==
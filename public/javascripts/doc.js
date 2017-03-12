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
/* 1 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
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
	            component = __webpack_require__(31);
	            break;
	        case 'SORDER':
	            component = __webpack_require__(33);
	            break;
	        case 'VORDER':
	            component = __webpack_require__(35);
	            break;
	        case 'PALK':
	            component = __webpack_require__(36);
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

	const Form = __webpack_require__(10),
	    InputText = __webpack_require__(12),
	    InputDate = __webpack_require__(13),
	//    InputNumber = require('../components/doc-input-number.jsx'),
	    Toolbar = __webpack_require__(15),
	    DocCommon = __webpack_require__(17),
	    Select = __webpack_require__(20),
	    TextArea = __webpack_require__(21),
	    DataGrid = __webpack_require__(22),
	    GridRow = __webpack_require__(24),
	    DokProp = __webpack_require__(27),
	    relatedDocuments = __webpack_require__(28),
	    validateForm = __webpack_require__(29);

	// Create a store
	var docStore = __webpack_require__(30);

	var now = new Date();

	const Arve = React.createClass({displayName: "Arve",
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

	/*
	    mixins: [relatedDocuments], // , validateForm
	*/

	    validation: function () {

	/*
	        const doc = require('../../models/arv'),
	            requiredFields = doc.requiredFields;
	*/
	        let requiredFields = this.requiredFields;
	        let warning = __webpack_require__(29)(this, requiredFields);
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
	                let summa = newValue.reduce(function(sum, row)  {return sum + Number(row.summa);}, 0), // сумма счета
	                    kbm = newValue.reduce(function(sum, row)  {return sum + Number(row.kbm);}, 0), // сумма налога
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
	            React.createElement(Form, {pages: this.pages, ref: "form", onSubmit: this.onSubmit, style: {display: 'table'}}, 
	                React.createElement(Toolbar, {validator: this.validation, 
	                         taskList: data.bpm, 
	                         documentStatus: data.doc_status}
	                ), 
	                React.createElement("div", {className: "div-doc"}, 

	                    React.createElement(DocCommon, {data: data, readOnly: !isEditeMode}), 

	                    React.createElement("div", {className: "fieldset"}, 
	                        React.createElement("div", {id: "leftPanel"}, 
	                            React.createElement("ul", null, 
	                                React.createElement("li", null, 
	                                    React.createElement(InputText, {className: "ui-c2", title: "Number", name: "number", value: data.number, 
	                                               readOnly: !isEditeMode})
	                                ), 

	                                React.createElement("li", null, 
	                                    React.createElement(InputDate, {className: "ui-c2", title: "Kuupäev ", name: "kpv", value: data.kpv, ref: "kpv", 
	                                               placeholder: "Kuupäev", readOnly: !isEditeMode})
	                                ), 
	                                React.createElement("li", null, 
	                                    React.createElement(InputDate, {className: "ui-c2", title: "Tähtaeg ", name: "tahtaeg", value: data.tahtaeg, 
	                                               ref: "tahtaeg", 
	                                               placeholder: "Tähtaeg", readOnly: !isEditeMode})
	                                ), 


	                                React.createElement("li", null, 
	                                    React.createElement(Select, {className: "ui-c2", 
	                                            title: "Asutus", 
	                                            name: "asutusid", 
	                                            libs: "asutused", 
	                                            value: data.asutusid, 
	                                            defaultValue: data.asutus, 
	                                            placeholder: "Asutus", 
	                                            ref: "asutusid", 
	                                            readOnly: !isEditeMode})
	                                ), 
	                                React.createElement("li", null, React.createElement(InputText, {className: "ui-c2", title: "Lisa ", name: "lisa", value: data.lisa, 
	                                               placeholder: "Lisa", 
	                                               ref: "lisa", readOnly: !isEditeMode})
	                                )
	                            )
	                        ), 
	                        React.createElement("div", {id: "rigthPanel"}, 
	                            React.createElement("ul", null, 
	                                React.createElement("li", null, 
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
	                            )

	                        ), 
	                        React.createElement("ul", null, 
	                            React.createElement("li", null, React.createElement(TextArea, {className: "ui-c2", title: "Märkused", name: "muud", placeholder: "Märkused", 
	                                          ref: "muud", 
	                                          value: data.muud, readOnly: !isEditeMode, width: "85%"})), 
	                            React.createElement("li", null, React.createElement(DataGrid, {source: "details", gridData: gridData, gridColumns: gridColumns, 
	                                          handleGridRow: this.handleGridRow, 
	                                          readOnly: !isEditeMode, ref: "DataGrid"})), 
	                            React.createElement("li", null, React.createElement(InputText, {className: "ui-c2", title: "Summa ", name: "summa", placeholder: "Summa", 
	                                           ref: "summa", 
	                                           value: data.summa, disabled: "true", 
	                                           pattern: "^[0-9]+(\\.[0-9]{1,4})?$"})), 
	                            /* патерн для цифр с 4 знаками после точки*/
	                            React.createElement("li", null, React.createElement(InputText, {className: "ui-c2", title: "Käibemaks ", name: "kbm", placeholder: "Käibemaks", 
	                                           ref: "kbm", 
	                                           disabled: "true", 
	                                           value: data.kbm, 
	                                           pattern: "^[0-9]+(\\.[0-9]{1,4})?$"}))
	                            /* патерн для цифр с 4 знаками после точки*/
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

	    }

	});

	module.exports = Arve;


	//             <MessageBox message="Удалить запись?" show={showMessageBox} onClick={this.handleClick} />
	//                 <DocButtonDelete onClick={this.handleClick}> Delete </DocButtonDelete>


/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	var PageLabel = __webpack_require__(11);

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
/* 11 */
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

	    componentWillMount: function componentWillMount() {
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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(4),
	    ComponentInputDate = __webpack_require__(14),
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
	                React.createElement("label", {htmlFor: this.props.name}, " ", this.props.title
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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const DOCUMENT_CLOSED_STATUS = 2;

	const React = __webpack_require__(4),
	    DocButton = __webpack_require__(16),
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
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    InputText = __webpack_require__(12),
	    InputDateTime = __webpack_require__(18),
	    DocList = __webpack_require__(19);
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
/* 18 */
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
/* 19 */
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

	                    if (this.state.clicked == index && !this.state.readOnly ) {
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
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    GridButton = __webpack_require__(23);

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
	            clickedItem = this.state.clicked,
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
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    ModalPage = __webpack_require__(25),
	    Select = __webpack_require__(20),
	    InputText = __webpack_require__(12),
	    InputNumber = __webpack_require__(26);


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
/* 25 */,
/* 26 */
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// виджет, объединяющий селект и текст. в тексте отражаютмя данные, связанные с селектом
	'use strict';

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    Select = __webpack_require__(20),
	    Text = __webpack_require__(21);


	const SelectTextWidget = React.createClass({displayName: "SelectTextWidget",
	    getInitialState: function() {
	        return {
	            value: this.props.value,
	            description: '', // пойдет в текстовую область
	            libData : []
	        }
	    },

	    handleSelectOnChange: function(e, name, value) {
	        // отработаем событие и поменяем состояние
	        if (this.state.libData) {
	            let selg = this.getDescriptionBySelectValue(this.state.libData) || null;
	            this.setState({value: value, description: selg});
	        }
	    },

	    componentWillMount: function () {
	// создаем обработчик события на изменение библиотек.
	        var self = this;

	        // будем отслеживать момент когда справочник будет загружен
	        flux.stores.docStore.on('change:libs', function (newValue, previousValue) {
	            let vastus = JSON.stringify(newValue) !== JSON.stringify(previousValue),  // will watch libs change (from server)
	                data = newValue.filter(function(item)  {
	                    if (item.id === self.props.libs) {
	                        return item;
	                    }
	                }),
	                lib = data[0].data,
	                selg = data[0].data.length? self.getDescriptionBySelectValue(lib).toString(): '';
	                self.setState({libData: lib, description: selg});
	        });
	    },

	    getDescriptionBySelectValue: function(libData) {
	      // найдем в справочнике описание и установим его состояние
	        let libRow = libData.filter(function(lib) {

	                if (lib.id == this.props.value) {
	                    return lib;
	                }
	            }.bind(this)),
	            selg = '',
	            selgObject = libRow.length ? libRow[0].details:  '';

	        for (let property in selgObject ) {
	            if (selgObject.hasOwnProperty(property)) {
	                // интересуют только "собственные" свойства объекта
	                selg = selg + property + ':' + selgObject[property];
	            }
	        }
	        return selg;
	    },

	    render: function () {
	        return (
	        React.createElement("div", null, 
	            React.createElement(Select, {className: this.props.className, 
	                    title: this.props.title, 
	                    name: this.props.name, 
	                    libs: this.props.libs, 
	                    value: this.props.value, 
	                    defaultValue: this.props.defaultValue, 
	                    placeholder: this.props.placeholder, 
	                    ref: this.props.ref, 
	                    readOnly: this.props.readOnly, 
	                    onChange: this.handleSelectOnChange}
	            ), 
	            React.createElement(Text, {className: "ui-c2", 
	                  name: "muud", 
	                  placeholder: "DokProp", 
	                  ref: "dokPropSelg", 
	                  value: this.state.description, 
	                  readOnly: true, 
	                  disabled: 'true', 
	                  width: "85%"}
	            )

	        )
	        );
	    }
	});


	module.exports = SelectTextWidget;



/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	var relatedDocuments = {
	    relatedDocuments: function () {
	        // формируем зависимости
	        let relatedDocuments = this.state.relations;
	        if (relatedDocuments.length > 0 ) {
	            relatedDocuments.forEach(function(doc) {
	                if (doc.id ) {
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
	                        this.pages.push({docTypeId: doc.doc_type, docId:doc.id, pageName:doc.name + ' id:' + doc.id})
	                    }
	                }
	            }.bind(this));
	        }
	    }
	}

	module.exports = relatedDocuments;

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	var validateForm = function validateForm(self, reqFields) {

	    // валидация формы
	    var warning = '',
	        requiredFields = reqFields || [],
	        notRequiredFields = [],
	        notMinMaxRule = [];

	    console.log('validateForm self', self);
	    requiredFields.forEach(function (field) {

	        var component = self.refs[field.name],
	            value = component.state.value,
	            props = component.props,
	            title = props.title;

	        if (!value) {
	            notRequiredFields.push(title);
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
	            /*
	             default:
	             checkValue = true;
	             break;
	             */
	        }
	        if (checkValue) {
	            notMinMaxRule.push(title);
	        }
	    });

	    if (notRequiredFields.length > 0) {
	        warning = 'puudub vajalikud andmed (' + notRequiredFields.join(', ') + ') ';
	    }

	    if (notMinMaxRule.length > 0) {
	        warning = warning + ' min/max on vale(' + notMinMaxRule.join(', ') + ') ';
	    }

	    if (warning.length == 0) {
	        warning = 'Ok';
	    }

	    console.log('validation warning:', warning);
	    return warning; // вернем извещение об итогах валидации
	};

	module.exports = validateForm;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
	            //console.log('loadLibs called:' + JSON.stringify(libsToUpdate));
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
	                        libParams[i] = this.data[item.fields[i]];
	                    }
	                }
	                _loadLibs(item.id, libParams);
	            }, this);
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
	                console.error;
	            }
	        },
	        dataChange: function dataChange(updater, value) {
	            // Отслеживает загрузку данных документа
	            console.log('dataChange', value, _typeof(value.arvid));
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
	            console.error;
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
	            console.error;
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
	    //    console.log('loadLibs:', libraryName, libParams);
	    try {

	        requery('select', JSON.stringify({ doc_type_id: libraryName, id: 0, params: libParams }), function (err, data) {
	            if (err) throw err;

	            var newLibs = docStore.libs.map(function (item) {
	                // ищем данные справолчника, которые обновили
	                //                 console.log('loadLibs item:' + JSON.stringify(item) + ' data:' + JSON.stringify(data));
	                var returnData = item;

	                if (item.id == libraryName) {
	                    returnData.data = data;
	                }
	                return returnData;
	            });

	            if (newLibs.length > 0) {
	                //                console.log('libs loaded', newLibs);
	                flux.doAction('libsChange', newLibs); // пишем изменения в хранилище
	            }
	        });
	    } catch (e) {
	        console.error;
	    }
	}

	function requery(action, parameters, callback) {
	    // метод обеспечит получение данных от сервера

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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const Form = __webpack_require__(10),
	    PageLabel = __webpack_require__(11),
	    InputText = __webpack_require__(12),
	    InputDate = __webpack_require__(13),
	    InputNumber = __webpack_require__(26),
	    Toolbar = __webpack_require__(15),
	    DocCommon = __webpack_require__(17),
	    Select = __webpack_require__(20),
	    TextArea = __webpack_require__(21),
	    DataGrid = __webpack_require__(22),
	    GridRow = __webpack_require__(32),
	    relatedDocuments = __webpack_require__(28);

	var docStore = __webpack_require__(30);

	const Journal = React.createClass({displayName: "Journal",
	    pages: [{pageName: 'Journal'}],

	/*
	    mixins: [relatedDocuments], //, validateForm
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
	            warning = __webpack_require__(29)(this, requiredFields);
	        return warning;
	    },

	    componentWillMount: function () {
	        // формируем зависимости
	        this.relatedDocuments();
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
	        docStore.on('change:edited', function(newValue, previousValue) {
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    ModalPage = __webpack_require__(25),
	    Select = __webpack_require__(20),
	    InputText = __webpack_require__(12),
	    InputNumber = __webpack_require__(26);


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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const Form = __webpack_require__(10),
	    PageLabel = __webpack_require__(11),
	    InputText = __webpack_require__(12),
	    InputDate = __webpack_require__(13),
	    InputNumber = __webpack_require__(26),
	    Toolbar = __webpack_require__(15),
	    DocCommon = __webpack_require__(17),
	    Select = __webpack_require__(20),
	    TextArea = __webpack_require__(21),
	    DataGrid = __webpack_require__(22),
	    GridRow = __webpack_require__(34);

	var docStore = __webpack_require__(30),
	    relatedDocuments = __webpack_require__(28),
	    validateForm = __webpack_require__(29);

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
	                 let summa = newValue.reduce(function(sum, row)  {return sum + Number(row.summa);},0), // сумма документа
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    ModalPage = __webpack_require__(25),
	    Select = __webpack_require__(20),
	    InputText = __webpack_require__(12),
	    InputNumber = __webpack_require__(26);

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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	const Form = __webpack_require__(10),
	    PageLabel = __webpack_require__(11),
	    InputText = __webpack_require__(12),
	    InputDate = __webpack_require__(13),
	    InputNumber = __webpack_require__(26),
	    Toolbar = __webpack_require__(15),
	    DocCommon = __webpack_require__(17),
	    Select = __webpack_require__(20),
	    TextArea = __webpack_require__(21),
	    DataGrid = __webpack_require__(22),
	    GridRow = __webpack_require__(34);

	var docStore = __webpack_require__(30),
	    relatedDocuments = __webpack_require__(28),
	    validateForm = __webpack_require__(29);

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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	const Form = __webpack_require__(10);
	const PageLabel = __webpack_require__(11);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jLmpzIiwid2VicGFjazovLy8uL21pZGRsZXdhcmUvcmV0dXJuRG9jQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvYXJ2ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9mb3JtLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvcGFnZV9sYWJlbC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRlLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2lucHV0LWRhdGUuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLXRvb2xiYXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWJ1dHRvbi5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtY29tbW9uLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRldGltZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtbGlzdC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtc2VsZWN0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0YXJlYS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtZGF0YS1ncmlkLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL215YnV0dG9uLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYXJ2LWdyaWQtcm93LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1udW1iZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLXNlbGVjdC10ZXh0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9taXhpbi9yZWxhdGVkRG9jdW1lbnRzLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9taXhpbi92YWxpZGF0ZUZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvc3RvcmVzL2RvY19zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kb2NzL2pvdXJuYWwuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvam91cm5hbC1ncmlkLXJvdy5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jcy9zb3JkZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvc29yZGVyLWdyaWQtcm93LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kb2NzL3ZvcmRlci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jcy9wYWxrX29wZXIuanN4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG4vKlxyXG4gICAgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIGRvY0NvbXBvbmVudCA9ICcnO1xyXG4qL1xuXG4vLyDQtNCw0L3QvdGL0LUg0LTQu9GPINGF0YDQsNC90LjQu9C40YnQsFxubG9jYWxTdG9yYWdlWydkb2NTdG9yZSddID0gc3RvcmVEYXRhO1xuc3RvcmVEYXRhID0gSlNPTi5wYXJzZShzdG9yZURhdGEpO1xuXG4vLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSDQtNCw0L3QvdGFXG4vKlxyXG5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgc2VsZi5zZXRTdGF0ZSh7ZG9jRGF0YTpkb2NTdG9yZS5kYXRhfSlcclxuICAgIH1cclxufSlcclxuKi9cblxuLy8g0LfQsNC/0YDQvtGB0LjQvCDQutC+0LzQv9C+0L3QtdC90YIg0LTQvtC60YPQvNC10L3RgtCwINC/0L4g0LXQs9C+INGC0LjQv9GDXG52YXIgRG9jID0gcmVxdWlyZSgnLi4vbWlkZGxld2FyZS9yZXR1cm5Eb2NDb21wb25lbnQnKShzdG9yZURhdGEuZG9jVHlwZUlkKTtcbmNvbnNvbGUubG9nKCdzdG9yZURhdGE6IERvYycsIERvYyk7XG5cblJlYWN0RE9NLnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KERvYywgeyBkYXRhOiBzdG9yZURhdGEuZGF0YSwgYnBtOiBzdG9yZURhdGEuYnBtIH0pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG9jJykpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9jVHlwZUlkKSB7XG4gICAgLy8g0LLQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+0YIg0YLQuNC/0LAg0LTQvtC60YPQvNC10L3RgtCwINCy0LXRgNC90LXRgiDQutC+0LzQv9C+0L3QtdC90YIg0LTQvtC60YPQvNC10L3RgtCwXG5cbiAgICBjb25zb2xlLmxvZygncmV0dXJuRG9jQ29tcG9uZW50OicgKyBkb2NUeXBlSWQpO1xuICAgIHZhciBjb21wb25lbnQgPSB7fTtcblxuICAgIHN3aXRjaCAoZG9jVHlwZUlkKSB7XG4gICAgICAgIGNhc2UgJ0FSVic6XG4gICAgICAgICAgICBjb21wb25lbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL2FydmUuanN4Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnSk9VUk5BTCc6XG4gICAgICAgICAgICBjb21wb25lbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL2pvdXJuYWwuanN4Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnU09SREVSJzpcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Zyb250ZW5kL2RvY3Mvc29yZGVyLmpzeCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1ZPUkRFUic6XG4gICAgICAgICAgICBjb21wb25lbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL3ZvcmRlci5qc3gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdQQUxLJzpcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Zyb250ZW5kL2RvY3MvcGFsa19vcGVyLmpzeCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb21wb25lbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL2FydmUuanN4Jyk7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbWlkZGxld2FyZS9yZXR1cm5Eb2NDb21wb25lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3QgRm9ybSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZm9ybS5qcycpLFxyXG4gICAgSW5wdXRUZXh0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dC5qc3gnKSxcclxuICAgIElucHV0RGF0ZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LWRhdGUuanN4JyksXHJcbi8vICAgIElucHV0TnVtYmVyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtbnVtYmVyLmpzeCcpLFxyXG4gICAgVG9vbGJhciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLXRvb2xiYXIuanN4JyksXHJcbiAgICBEb2NDb21tb24gPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1jb21tb24uanN4JyksXHJcbiAgICBTZWxlY3QgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1zZWxlY3QuanN4JyksXHJcbiAgICBUZXh0QXJlYSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LXRleHRhcmVhLmpzeCcpLFxyXG4gICAgRGF0YUdyaWQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1kYXRhLWdyaWQuanN4JyksXHJcbiAgICBHcmlkUm93ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9hcnYtZ3JpZC1yb3cuanN4JyksXHJcbiAgICBEb2tQcm9wID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2Mtc2VsZWN0LXRleHQuanN4JyksXHJcbiAgICByZWxhdGVkRG9jdW1lbnRzID0gcmVxdWlyZSgnLi4vbWl4aW4vcmVsYXRlZERvY3VtZW50cy5qc3gnKSxcclxuICAgIHZhbGlkYXRlRm9ybSA9IHJlcXVpcmUoJy4uL21peGluL3ZhbGlkYXRlRm9ybScpO1xyXG5cclxuLy8gQ3JlYXRlIGEgc3RvcmVcclxudmFyIGRvY1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2RvY19zdG9yZS5qcycpO1xyXG5cclxudmFyIG5vdyA9IG5ldyBEYXRlKCk7XHJcblxyXG5jb25zdCBBcnZlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkFydmVcIixcclxuICAgIHBhZ2VzOiBbe3BhZ2VOYW1lOiAnQXJ2ZSd9XSxcclxuICAgICByZXF1aXJlZEZpZWxkczogW1xyXG4gICAgIHtcclxuICAgICBuYW1lOiAna3B2JyxcclxuICAgICB0eXBlOiAnRCcsXHJcbiAgICAgbWluOiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgLSAxKSxcclxuICAgICBtYXg6IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSArIDEpXHJcbiAgICAgfSxcclxuICAgICB7XHJcbiAgICAgbmFtZTogJ3RhaHRhZWcnLFxyXG4gICAgIHR5cGU6ICdEJyxcclxuICAgICBtaW46IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSAtIDEpLFxyXG4gICAgIG1heDogbm93LnNldEZ1bGxZZWFyKG5vdy5nZXRGdWxsWWVhcigpICsgMSlcclxuICAgICB9LFxyXG4gICAgIHtuYW1lOiAnYXN1dHVzaWQnLCB0eXBlOiAnTicsIG1pbjpudWxsLCBtYXg6bnVsbH0sXHJcbiAgICAge25hbWU6ICdzdW1tYScsIHR5cGU6ICdOJywgbWluOi05OTk5OTk5LCBtYXg6OTk5OTk5fVxyXG4gICAgIF0sXHJcblxyXG4vKlxyXG4gICAgbWl4aW5zOiBbcmVsYXRlZERvY3VtZW50c10sIC8vICwgdmFsaWRhdGVGb3JtXHJcbiovXHJcblxyXG4gICAgdmFsaWRhdGlvbjogZnVuY3Rpb24gKCkge1xyXG5cclxuLypcclxuICAgICAgICBjb25zdCBkb2MgPSByZXF1aXJlKCcuLi8uLi9tb2RlbHMvYXJ2JyksXHJcbiAgICAgICAgICAgIHJlcXVpcmVkRmllbGRzID0gZG9jLnJlcXVpcmVkRmllbGRzO1xyXG4qL1xyXG4gICAgICAgIGxldCByZXF1aXJlZEZpZWxkcyA9IHRoaXMucmVxdWlyZWRGaWVsZHM7XHJcbiAgICAgICAgbGV0IHdhcm5pbmcgPSByZXF1aXJlKCcuLi9taXhpbi92YWxpZGF0ZUZvcm0nKSh0aGlzLCByZXF1aXJlZEZpZWxkcyk7XHJcbiAgICAgICAgcmV0dXJuIHdhcm5pbmc7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINGD0YHRgtCw0L3QvtCy0LjQvCDQuNC30L3QsNGH0LDQu9GM0L3Ri9C1INC00LDQvdC90YvQtVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRvY0RhdGE6IHRoaXMucHJvcHMuZGF0YS5yb3csXHJcbiAgICAgICAgICAgIGVkaXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94OiAnbm9uZScsXHJcbiAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnByb3BzLmRhdGEuZGV0YWlscyxcclxuICAgICAgICAgICAgcmVsYXRpb25zOiB0aGlzLnByb3BzLmRhdGEucmVsYXRpb25zLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnOiB0aGlzLnByb3BzLmRhdGEuZ3JpZENvbmZpZyxcclxuICAgICAgICAgICAgZ3JpZFJvd0VkaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBncmlkUm93RXZlbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIGdyaWRSb3dEYXRhOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0YTQvtGA0LzQuNGA0YPQtdC8INC30LDQstC40YHQuNC80L7RgdGC0LhcclxuICAgICAgICB0aGlzLnJlbGF0ZWREb2N1bWVudHMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDQv9C40YjQtdC8INC40YHRhdC+0LTQvdGL0LUg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtSwg0YDQtdCz0LjRgdGC0YDQuNGA0YPQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YHQvtCx0YvRgtC40LlcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIGRhdGEgPSBzZWxmLnByb3BzLmRhdGEucm93LFxyXG4gICAgICAgICAgICBkZXRhaWxzID0gc2VsZi5wcm9wcy5kYXRhLmRldGFpbHMsXHJcbiAgICAgICAgICAgIGdyaWRDb25maWcgPSBzZWxmLnByb3BzLmRhdGEuZ3JpZENvbmZpZztcclxuXHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGRldGFpbHMpOyAvLyDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRDb25maWdDaGFuZ2UnLCBncmlkQ29uZmlnKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkTmFtZScsICdhcnYtZ3JpZC1yb3cnKTsgLy8g0LfQsNC00LDQtdC8INC40LzRjyDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdGC0YDQvtC60Lgg0LPRgNC40LTQsCAo0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0LTQsNC90L3RhVxyXG4gICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAvLyDQtNCw0L3QvdGL0LUg0LjQt9C80LXQvdC40LvQuNGB0YwsINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICAgdmFyIGRhdGEgPSBkb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICBpc0VkaXRlZCA9ICFzZWxmLnN0YXRlLmVkaXRlZDtcclxuXHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtlZGl0ZWQ6IG5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINCyINCz0YDQuNC00LVcclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRldGFpbHMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSkgJiYgdHlwZW9mIG5ld1ZhbHVlID09ICdhcnJheScpIHtcclxuICAgICAgICAgICAgICAgIC8vINC40YLQvtCz0LhcclxuICAgICAgICAgICAgICAgIGxldCBzdW1tYSA9IG5ld1ZhbHVlLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSk7fSwgMCksIC8vINGB0YPQvNC80LAg0YHRh9C10YLQsFxyXG4gICAgICAgICAgICAgICAgICAgIGtibSA9IG5ld1ZhbHVlLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5rYm0pO30sIDApLCAvLyDRgdGD0LzQvNCwINC90LDQu9C+0LPQsFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY0RhdGEgPSBzZWxmLnN0YXRlLmRvY0RhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jRGF0YS5zdW1tYSA9IHN1bW1hO1xyXG4gICAgICAgICAgICAgICAgZG9jRGF0YS5rYm0gPSBrYm07XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Z3JpZERhdGE6IG5ld1ZhbHVlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0LPRgNGD0LfQuNC8INGB0L/RgNCw0LLQvtGH0L3QuNC60LhcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdsb2FkTGlicycsICcnKTtcclxuXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0L3QvtCy0YvQuSDQtNC+0LrRg9C80LXQvdGCIChpZCA9PSAwKVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5pZCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2VkaXRlZENoYW5nZScsIHRydWUpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzYXZlZENoYW5nZScsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuc3RhdGUuZG9jRGF0YSxcclxuICAgICAgICAgICAgaXNFZGl0ZU1vZGUgPSB0aGlzLnN0YXRlLmVkaXRlZCxcclxuICAgICAgICAgICAgZ3JpZERhdGEgPSB0aGlzLnN0YXRlLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBncmlkQ29sdW1ucyA9IHRoaXMuc3RhdGUuZ3JpZENvbmZpZztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIHtwYWdlczogdGhpcy5wYWdlcywgcmVmOiBcImZvcm1cIiwgb25TdWJtaXQ6IHRoaXMub25TdWJtaXQsIHN0eWxlOiB7ZGlzcGxheTogJ3RhYmxlJ319LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9vbGJhciwge3ZhbGlkYXRvcjogdGhpcy52YWxpZGF0aW9uLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tMaXN0OiBkYXRhLmJwbSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudFN0YXR1czogZGF0YS5kb2Nfc3RhdHVzfVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZGl2LWRvY1wifSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQ29tbW9uLCB7ZGF0YTogZGF0YSwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZpZWxkc2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwibGVmdFBhbmVsXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIk51bWJlclwiLCBuYW1lOiBcIm51bWJlclwiLCB2YWx1ZTogZGF0YS5udW1iZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXREYXRlLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkt1dXDDpGV2IFwiLCBuYW1lOiBcImtwdlwiLCB2YWx1ZTogZGF0YS5rcHYsIHJlZjogXCJrcHZcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiS3V1cMOkZXZcIiwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0RGF0ZSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJUw6RodGFlZyBcIiwgbmFtZTogXCJ0YWh0YWVnXCIsIHZhbHVlOiBkYXRhLnRhaHRhZWcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJ0YWh0YWVnXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlTDpGh0YWVnXCIsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBc3V0dXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhc3V0dXNpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcImFzdXR1c2VkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFzdXR1c2lkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGRhdGEuYXN1dHVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJBc3V0dXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImFzdXR1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJMaXNhIFwiLCBuYW1lOiBcImxpc2FcIiwgdmFsdWU6IGRhdGEubGlzYSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTGlzYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwibGlzYVwiLCByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJyaWd0aFBhbmVsXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9rUHJvcCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiS29udGVlcmltaW5lOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGF1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcImRva1Byb3BzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5kb2tsYXVzaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGRhdGEuZG9rcHJvcCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIktvbnRlZXJpbWluZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImRva2xhdXNpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIk3DpHJrdXNlZFwiLCBuYW1lOiBcIm11dWRcIiwgcGxhY2Vob2xkZXI6IFwiTcOkcmt1c2VkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwibXV1ZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEubXV1ZCwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgd2lkdGg6IFwiODUlXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YUdyaWQsIHtzb3VyY2U6IFwiZGV0YWlsc1wiLCBncmlkRGF0YTogZ3JpZERhdGEsIGdyaWRDb2x1bW5zOiBncmlkQ29sdW1ucywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUdyaWRSb3c6IHRoaXMuaGFuZGxlR3JpZFJvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHJlZjogXCJEYXRhR3JpZFwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJTdW1tYSBcIiwgbmFtZTogXCJzdW1tYVwiLCBwbGFjZWhvbGRlcjogXCJTdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnN1bW1hLCBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCJeWzAtOV0rKFxcXFwuWzAtOV17MSw0fSk/JFwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qINC/0LDRgtC10YDQvSDQtNC70Y8g0YbQuNGE0YAg0YEgNCDQt9C90LDQutCw0LzQuCDQv9C+0YHQu9C1INGC0L7Rh9C60LgqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkvDpGliZW1ha3MgXCIsIG5hbWU6IFwia2JtXCIsIHBsYWNlaG9sZGVyOiBcIkvDpGliZW1ha3NcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwia2JtXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmtibSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIl5bMC05XSsoXFxcXC5bMC05XXsxLDR9KT8kXCJ9KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qINC/0LDRgtC10YDQvSDQtNC70Y8g0YbQuNGE0YAg0YEgNCDQt9C90LDQutCw0LzQuCDQv9C+0YHQu9C1INGC0L7Rh9C60LgqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZ3JpZFJvd0VkaXQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEdyaWRSb3csIHttb2RhbFBhZ2VDbGljazogdGhpcy5tb2RhbFBhZ2VDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRFdmVudDogdGhpcy5zdGF0ZS5ncmlkUm93RXZlbnQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkUm93RGF0YTogdGhpcy5zdGF0ZS5ncmlkUm93RGF0YX0pIDogbnVsbFxyXG5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUdyaWRSb3c6IGZ1bmN0aW9uIChncmlkRXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAvLyDRg9C/0YDQsNCy0LvQtdC90LjQtSDQvNC+0LTQsNC70YzQvdGL0Lwg0L7QutC90L7QvFxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiB0cnVlLCBncmlkUm93RXZlbnQ6IGdyaWRFdmVudCwgZ3JpZFJvd0RhdGE6IGRhdGF9KTtcclxuICAgIH0sXHJcblxyXG4gICAgbW9kYWxQYWdlQ2xpY2s6IGZ1bmN0aW9uIChidG5FdmVudCwgZGF0YSkge1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQvtGC0LDQtdC8IE9rINC40Lcg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LBcclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzLFxyXG4gICAgICAgICAgICBkb2NEYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgZ3JpZFJvd0lkID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZ3JpZFJvd0lkLFxyXG4gICAgICAgICAgICBncmlkQ29sdW1ucyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRDb25maWc7XHJcbiAgICAgICAgdmFyIGdyaWRSb3cgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGdyaWRSb3dJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGdyaWRSb3cgPSBncmlkRGF0YVtncmlkUm93SWRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcclxuICAgICAgICAgICAgaWYgKGdyaWRSb3dJZCA8IDApIHtcclxuICAgICAgICAgICAgICAgIC8vINC90L7QstCw0Y8g0LfQsNC/0LjRgdGMXHJcbiAgICAgICAgICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0L/Rg9GB0YLRg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgICAgICAgICAgZ3JpZFJvdyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZ3JpZFJvd1snaWQnXSA9ICdORVcnICsgTWF0aC5yYW5kb20oKTsgIC8vINCz0LXQvdC10YDQuNGA0YPQtdC8INC90L7QstC+0LUg0JjQlFxyXG4gICAgICAgICAgICAgICAgZ3JpZENvbHVtbnMuZm9yRWFjaChmdW5jdGlvbihmaWVsZCkgIHtyZXR1cm4gZ3JpZFJvd1tmaWVsZF0gPSBudWxsO30pOyAvLyDRgdC+0LfQtNCw0LXQvCDQv9C+0LvRjyDQsiDQvtCx0YrQtdC60YLQtVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vINGB0L7RhdGA0LDQvdC40Lwg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24oZmllbGQpICB7cmV0dXJuIGdyaWRSb3dbZmllbGQubmFtZV0gPSBmaWVsZC52YWx1ZTt9KTtcclxuXHJcbiAgICAgICAgICAgIC8vINC30LDQv9C+0LvQvdC40Lwg0L/QvtC70Y8ga29vZCwgbmltZXR1c1xyXG4gICAgICAgICAgICB2YXIgbGlicyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmxpYnMsXHJcbiAgICAgICAgICAgICAgICBub21MaWIgPSBsaWJzLmZpbHRlcihmdW5jdGlvbihkYXRhKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmlkID09ICdub21lbmNsYXR1cmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g0L/QvtGB0YLQsNCy0LjQvCDQt9C90LDRh9C10L3QuNC1INC60L7QtCDQuCDQvdCw0LzQtdC90L7QstCw0L3QuNC1INCyINCz0YDQuNC0XHJcbiAgICAgICAgICAgIHZhciBub21Sb3cgPSBub21MaWJbMF0uZGF0YS5maWx0ZXIoZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdy5pZCA9PSBOdW1iZXIoZ3JpZFJvdy5ub21pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKG5vbVJvdykge1xyXG4gICAgICAgICAgICAgICAgZ3JpZFJvd1sna29vZCddID0gbm9tUm93WzBdLmtvb2Q7XHJcbiAgICAgICAgICAgICAgICBncmlkUm93WyduaW1ldHVzJ10gPSBub21Sb3dbMF0ubmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGdyaWRSb3dJZCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGdyaWREYXRhW2dyaWRSb3dJZF0gPSBncmlkUm93O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEucHVzaChncmlkUm93KTsgLy8g0LTQvtCx0LDQstC70Y/QtdC8INGB0YLRgNC+0LrRg1xyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZFJvd0lkQ2hhbmdlJywgZ3JpZERhdGEubGVuZ3RoKTsgLy8g0L/QvtC80LXRh9Cw0LXQvCDQvdC+0LLRg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RldGFpbHNDaGFuZ2UnLCBncmlkRGF0YSk7IC8vINC/0LjRiNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0YHRh9C40YLQsNC10Lwg0LjRgtC+0LPQuFxyXG5cclxuICAgICAgICB2YXIgZG9jU3VtbWEgPSBncmlkRGF0YS5yZWR1Y2UoZnVuY3Rpb24oc3VtLCByb3cpICB7cmV0dXJuIHN1bSArIE51bWJlcihyb3cuc3VtbWEpO30sIDApLCAvLyDRgdGD0LzQvNCwINGB0YfQtdGC0LBcclxuICAgICAgICAgICAgZG9jS2JtID0gZ3JpZERhdGEucmVkdWNlKGZ1bmN0aW9uKHN1bSwgcm93KSAge3JldHVybiBzdW0gKyBOdW1iZXIocm93LmtibSk7fSwgMCksIC8vINGB0YPQvNC80LAg0L3QsNC70L7Qs9CwXHJcbiAgICAgICAgICAgIGRvY0tibXRhID0gZG9jU3VtbWEgLSBkb2NLYm07XHJcblxyXG4gICAgICAgIGRvY0RhdGEuc3VtbWEgPSBkb2NTdW1tYTtcclxuICAgICAgICBkb2NEYXRhLmtibSA9IGRvY0tibTtcclxuICAgICAgICBkb2NEYXRhLmtibXRhID0gZG9jS2JtdGE7XHJcblxyXG4gICAgICAgIHRoaXMucmVmc1snRGF0YUdyaWQnXS5yZXBsYWNlU3RhdGUoe2dyaWREYXRhOiBncmlkRGF0YX0pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiBmYWxzZSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG5cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBcnZlO1xyXG5cclxuXHJcbi8vICAgICAgICAgICAgIDxNZXNzYWdlQm94IG1lc3NhZ2U9XCLQo9C00LDQu9C40YLRjCDQt9Cw0L/QuNGB0Yw/XCIgc2hvdz17c2hvd01lc3NhZ2VCb3h9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9IC8+XHJcbi8vICAgICAgICAgICAgICAgICA8RG9jQnV0dG9uRGVsZXRlIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PiBEZWxldGUgPC9Eb2NCdXR0b25EZWxldGU+XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy9hcnZlLmpzeFxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4vcGFnZV9sYWJlbCcpO1xuXG52YXIgRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ0Zvcm0nLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHZhciBwYWdlcyA9IFt7IHBhZ2VOYW1lOiAnUGFnZScgfV07XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnBhZ2VzKSB7XG4gICAgICAgICAgICBwYWdlcyA9IHRoaXMucHJvcHMucGFnZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhZ2VzOiB0aGlzLnByb3BzLnBhZ2VzXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgcGFnZXMgPSB0aGlzLnN0YXRlLnBhZ2VzO1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBjbGFzc05hbWU6ICdjb250YWluZXInIH0sIHBhZ2VzLm1hcChmdW5jdGlvbiAocGFnZSwgaWR4KSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChQYWdlTGFiZWwsIHsga2V5OiBpZHgsIHBhZ2VJZHg6IGlkeCB9LCBwYWdlKTtcbiAgICAgICAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgY2xhc3NOYW1lOiAncGFnZScgfSwgUmVhY3QuY3JlYXRlRWxlbWVudCgnZm9ybScsIG51bGwsIHRoaXMucHJvcHMuY2hpbGRyZW4pKSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbnZhciBQYWdlTGFiZWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdQYWdlTGFiZWwnLFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vICAgICAgY29uc29sZS5sb2coJ3BhZ2UgbGFiZWwgY29tcG9uZW50V2lsbE1vdW50JylcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoeyBkaXNhYmxlZDogbmV3VmFsdWUgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBoYW5kbGVDbGljazogZnVuY3Rpb24gaGFuZGxlQ2xpY2socGFnZSkge1xuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINGB0L7QsdGL0YLQuNC1INC60LvQuNC6LCDQv9C+0LTQs9GA0YPQttCw0LXQvCDRgdCy0Y/Qt9Cw0L3QvdGL0Lkg0LTQvtC60YPQvNC10L3RglxuICAgICAgICAvLyAgICAgICBhbGVydCgnY2xpY2s6JyArIHBhZ2VOYW1lKTtcbiAgICAgICAgLy8gZG9jVHlwZUlkOiBkb2MuZG9jX3R5cGUsIGRvY0lkOmRvYy5pZCwgcGFnZU5hbWU6J0xhdXNlbmQgaWQ6JyArIGRvYy5pZFxuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGFnZSBkaXNhYmxlZCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhZ2UuZG9jSWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoYW5kbGVDbGljayBwYWdlLmRvY1R5cGVJZCAlcywgcGFnZS5kb2NJZCAlbicpO1xuICAgICAgICAgICAgdmFyIHVybCA9IFwiL2RvY3VtZW50L1wiICsgcGFnZS5kb2NUeXBlSWQgKyBwYWdlLmRvY0lkO1xuICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdwYWdlTGFiZWwnO1xuXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCB0aGlzLnByb3BzLmNoaWxkcmVuKSwgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuZGlzYWJsZWQgfSwgdGhpcy5wcm9wcy5jaGlsZHJlbi5wYWdlTmFtZSwgJyAnKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlTGFiZWw7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3BhZ2VfbGFiZWwuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3QgSW5wdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiSW5wdXRcIixcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLFxyXG4gICAgICAgICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdHJ1ZSxcclxuICAgICAgICAgICAgdmFsaWQ6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdkZWZhdWxOYW1lJyxcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnZG9jLWlucHV0JyxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdkZWZhdWxOYW1lJyxcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICB3aWR0aDogJ2F1dG8nLFxyXG4gICAgICAgICAgICBwYXR0ZXJuOiAnJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xyXG4vLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSBkb2NJZC4g0JXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSA9IDAgKNC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQv9C40YHRjCwg0YLQviDQv9GA0L7RgdGC0L4g0L7Rh9C40YLQutCwINC/0L7Qu9C10LksINC40L3QsNGH0LUg0L/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvRhVxyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgdC+0LfQtNCw0L3QuNC1INC90L7QstC+0LPQviDQtNC+0LrRg9C80LXQvdGC0LBcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGFbdGhpcy5wcm9wcy5uYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0YHQvtCy0YvQuSDQtNC+0LrRg9C80LXQvdGCXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IDB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IHZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnb24gY2hhbmdlOmVkaXRlZDonICsgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGF0YScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vINGB0LvRg9GI0YPQtdC8INC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YU7XHJcbi8vICAgICAgICAgIGNvbnNvbGUubG9nKCdpbnB1dC10ZXh0IG9uIGNoYW5nZSBkYXRhOicsIG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG5ld1ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSBkYXRhW3NlbGYucHJvcHMubmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVtzZWxmLnByb3BzLm5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbiAobmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IG5leHRQcm9wcy52YWx1ZX0pXHJcbiAgICB9LFxyXG5cclxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24gKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdC10L3QuNGPINCx0YPQtNGD0YIg0L7RgtGA0LDQttCw0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDRgtCw0LrQuNC1INC10YHRgtGMXHJcblxyXG4gICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSAobmV4dFN0YXRlLnZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlIHx8XHJcbiAgICAgICAgICAgIG5leHRTdGF0ZS5yZWFkT25seSAhPT0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fFxyXG4gICAgICAgICAgICBuZXh0U3RhdGUuZGlzYWJsZWQgIT09IHRoaXMuc3RhdGUuZGlzYWJsZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBmaWVsZFZhbHVlID0gZS50YXJnZXQudmFsdWUsXHJcbiAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICBpc1BhdHRlclZhbGlkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucGF0dGVybiAmJiBmaWVsZFZhbHVlLmNoYXJBdChmaWVsZFZhbHVlLmxlbmd0aCAtIDEpICE9PSAnLicpIHtcclxuXHJcbiAgICAgICAgICAgIC8vINC/0YDQvtCy0L7QtNC40Lwg0L/RgNC+0LLQtdGA0LrRgyDQvdCwINGB0L7QvtGC0LLQtdGC0YHRgtCy0LjQtSDRiNCw0LHQu9C+0L3Rg1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZmllbGRWYWx1ZS5tYXRjaCh0aGlzLnByb3BzLnBhdHRlcm4sICcnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BhdHRlcm4gdmFsZTonICsgZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINGC0L7Qu9GM0LrQviDQtdGB0LvQuCDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0LXRgiDQv9Cw0YLRgtC10YDQvdGDXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICAvLyAgICAgICBjb25zb2xlLmxvZygnb25DaGFuZ2UgZmllbGRWYWx1ZSBmaW5pc2gnLCB0aGlzLnByb3BzLm5hbWUsIHRoaXMuc3RhdGUudmFsdWUpO1xyXG5cclxuICAgICAgICBkYXRhW3RoaXMucHJvcHMubmFtZV0gPSBmaWVsZFZhbHVlO1xyXG4gICAgICAgIC8vINC30LDQtNCw0YLRjCDQvdC+0LLQvtC1INC30L3QsNGH0LXQvdC40LUg0L/QvtC70Y9cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIC8vINC+0YLQtNCw0LTQuNC8INC+0LHRgNCw0LHQvtGC0YfQuNC60YMsINC10YHQu9C4INC30LDQtNCw0L1cclxuICAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgLy8g0YHQvNC+0YLRgNC40Lwg0Log0YfQtdC80YMg0L/RgNC40LLRj9C30LDQvSDRgdC10LvQtdC60YIg0Lgg0L7RgtC00LDQuNC8INC10LPQviDQvdCw0LLQtdGA0YVcclxuICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShlLCB0aGlzLnByb3BzLm5hbWUpOyAvLyDQsiDRgdC70YPRh9Cw0LUg0LXRgdC70Lgg0LfQsNC00LDQvSDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINCy0LXRgNGF0L3QtdC8INGD0YDQvtCy0L3QtSwg0L7RgtC00LDQtNC40Lwg0L7QsdGA0LDQsdC+0YLQutGDINGC0YPQtNCwXHJcbiAgICAgICAgIH1cclxuICAgICAgICAgKi9cclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGlucHV0Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJycgKyAnZG9jLWlucHV0JyxcclxuICAgICAgICAgICAgaW5wdXRSZWFkT25seSA9IHRoaXMuc3RhdGUucmVhZE9ubHkgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIGlucHV0RGlzYWJsZWQgPSB0aGlzLnN0YXRlLmRpc2FibGVkLFxyXG4gICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLm5hbWUsXHJcbiAgICAgICAgICAgIG15U3R5bGUgPSB7d2lkdGg6ICdhdXRvJ307XHJcblxyXG4gICAgICAgIGlmIChpbnB1dFJlYWRPbmx5KSB7XHJcbiAgICAgICAgICAgIGlucHV0Q2xhc3NOYW1lID0gaW5wdXRDbGFzc05hbWUgKyAnIGRvYy1pbnB1dC1yZWFkb25seSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLndpZHRoKSB7XHJcbiAgICAgICAgICAgIG15U3R5bGUud2lkdGggPSB0aGlzLnByb3BzLndpZHRoXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW5wdXREaXNhYmxlZCA9PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtodG1sRm9yOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9ybS13aWRnZXQtbGFiZWxcIiArIGlucHV0Q2xhc3NOYW1lfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwidGV4dFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IG15U3R5bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGlucHV0Q2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMucHJvcHMucGF0dGVybiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgKSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJ0ZXh0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy5wcm9wcy5wYXR0ZXJuLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWlucHV0LXRleHQuanN4XG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBDb21wb25lbnRJbnB1dERhdGUgPSByZXF1aXJlKCcuL2lucHV0LWRhdGUuanN4JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3QgSW5wdXREYXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIklucHV0RGF0ZVwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB0cnVlLFxyXG4gICAgICAgICAgICB2YWxpZDogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpLFxyXG4gICAgICAgICAgICBkYXkgPSBkYXRlLmdldERhdGUoKSxcclxuICAgICAgICAgICAgbWF4RGF0ZSA9IG5ldyBEYXRlKHllYXIgKyAxLCBtb250aCwgZGF5KSxcclxuICAgICAgICAgICAgbWluRGF0ZSA9IG5ldyBEYXRlKHllYXIgLSAxLCBtb250aCwgZGF5KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYmluZERhdGE6IHRydWUsXHJcbiAgICAgICAgICAgIG1pbjogbWluRGF0ZSxcclxuICAgICAgICAgICAgbWF4OiBtYXhEYXRlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBuZXh0UHJvcHMudmFsdWV9KVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDRgdC+0LHRi9GC0LjQtSDQvdCwINC40LfQvNC10L3QtdC90LjQtSDRgNC10LbQuNC80LAg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpICB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH0sXHJcbiAgICAvKlxyXG4gICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUgZG9jSWQuINCV0YHQu9C4INC30L3QsNGH0LXQvdC40LUgPSAwICjQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0L/QuNGB0YwsINGC0L4g0L/RgNC+0YHRgtC+INC+0YfQuNGC0LrQsCDQv9C+0LvQtdC5LCDQuNC90LDRh9C1INC/0L7QtNCz0YDRg9C30LrQsCDQtNCw0L3QvdGL0YVcclxuICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKCdjb21wb25lbnRXaWxsTW91bnQnICsgdGhpcy5wcm9wcy5uYW1lKTtcclxuICAgICAvISpcclxuICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGB0L7Qt9C00LDQvdC40LUg0L3QvtCy0L7Qs9C+INC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgIC8hKlxyXG4gICAgIHZhciBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICB2YWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuXHJcbiAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAvLyDQvdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTowfSk7XHJcbiAgICAgfSBlbHNlIHtcclxuICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTp2YWx1ZX0pO1xyXG4gICAgIH1cclxuICAgICAqIS9cclxuICAgICB9XHJcbiAgICAgfSk7XHJcbiAgICAgKiEvXHJcblxyXG4gICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAvLyAgICAgICAgICAgY29uc29sZS5sb2coJ29uIGNoYW5nZTplZGl0ZWQ6JyArIG5ld1ZhbHVlKTtcclxuICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICBzZWxmLnNldFN0YXRlKHtyZWFkT25seTogIW5ld1ZhbHVlfSk7XHJcbiAgICAgfVxyXG4gICAgIH0pO1xyXG5cclxuICAgICAvISpcclxuICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgIGNvbnNvbGUubG9nKCdvbiBjaGFuZ2U6ZGF0YTonICsgbmV3VmFsdWUpO1xyXG4gICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG5cclxuICAgICB2YXIgZGF0YSA9IG5ld1ZhbHVlLFxyXG4gICAgIGZpZWxkVmFsdWUgPSBkYXRhW3NlbGYucHJvcHMubmFtZV07XHJcblxyXG4gICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgfVxyXG4gICAgIH0pO1xyXG5cclxuICAgICAqIS9cclxuXHJcbiAgICAgfSxcclxuICAgICAqL1xyXG4gICAgLy8g0L7QsdGP0LfQsNGC0LXQu9GM0L3Ri9C1INC/0LDRgNCw0LzQtdGC0YDRi1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXHJcbiAgICAgfSxcclxuXHJcblxyXG4gICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChmaWVsZFZhbHVlKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgICAgZGF0YVt0aGlzLnByb3BzLm5hbWVdID0gZmllbGRWYWx1ZTtcclxuXHJcbiAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGlucHV0Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dERpc2FibGVkID0gdGhpcy5zdGF0ZS5kaXNhYmxlZCA9PSAndHJ1ZScgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlucHV0UGxhY2VIb2xkZXIgPSB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8IHRoaXMucHJvcHMubmFtZTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0UmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgaW5wdXRDbGFzc05hbWUgPSBpbnB1dENsYXNzTmFtZSArICcgZG9jLWlucHV0LXJlYWRvbmx5JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7aHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lfSwgXCIgXCIsIHRoaXMucHJvcHMudGl0bGVcclxuICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50SW5wdXREYXRlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLnByb3BzLnBhdHRlcm4sIFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGlucHV0RGlzYWJsZWR9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkpXHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dERhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRlLmpzeFxuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbi8vICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBJbnB1dERhdGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiSW5wdXREYXRlXCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICAgICAgbW9udGggPSBkYXRlLmdldE1vbnRoKCksXHJcbiAgICAgICAgICAgIGRheSA9IGRhdGUuZ2V0RGF0ZSgpLFxyXG4gICAgICAgICAgICBtYXhEYXRlID0gbmV3IERhdGUoeWVhciArIDEsIG1vbnRoLCBkYXkpLFxyXG4gICAgICAgICAgICByZWZJZCA9ICdJbnB1dERhdGUnLFxyXG4gICAgICAgICAgICBtaW5EYXRlID0gbmV3IERhdGUoeWVhciAtIDUsIG1vbnRoLCBkYXkpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBiaW5kRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgbWluOiBtaW5EYXRlLFxyXG4gICAgICAgICAgICBtYXg6IG1heERhdGUsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczpmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV4dFByb3BzLnZhbHVlfSlcclxuICAgIH0sXHJcblxyXG5cclxuICAgIG9uQ2hhbmdlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBsZXQgZmllbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlLFxyXG4gICAgICAgICAgICB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShmaWVsZFZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKGZpZWxkVmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQt9C90LDRh9C10L3QuNC1INC90YPQuywg0YLQviDQv9GD0YHRgtGMINCx0YPQtNC10YIgbnVsXHJcbiAgICAgICAgICAgIHZhbGlkYXRpb24gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbGlkYXRpb24gKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LfQsNC00LDQvSDQvtCx0YDQsNCx0L7RgtGH0LjQuiwg0LLQtdGA0L3QtdC8INC10LPQvlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShmaWVsZFZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGlucHV0Q2xhc3NOYW1lID0gdGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UGxhY2VIb2xkZXIgPSB0aGlzLnByb3BzLm5hbWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XHJcbiAgICAgICAgICAgIGlucHV0Q2xhc3NOYW1lID0gaW5wdXRDbGFzc05hbWUgKyAnIGRvYy1pbnB1dC1yZWFkb25seSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwiZGF0ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgIHJlZjogdGhpcy5wcm9wcy5yZWZJZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLnByb3BzLnBhdHRlcm4sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWluOiB0aGlzLnByb3BzLm1pbiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBtYXg6IHRoaXMucHJvcHMubWF4LCBcclxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkfVxyXG4gICAgICAgIClcclxuICAgIH0sXHJcblxyXG4gICAgdmFsaWRhdGU6ZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LrQsCDQvdCwINC80LjQvSAsINC80LDRhVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm1pbiAmJiB0aGlzLnByb3BzLm1heCAmJiB2YWx1ZSkge1xyXG4gICAgICAgICAgICBsZXQgZGF0ZVZhbHVlID0gbmV3IERhdGUodmFsdWUpO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAoZGF0ZVZhbHVlID4gdGhpcy5wcm9wcy5taW4gJiYgZGF0ZVZhbHVlIDwgdGhpcy5wcm9wcy5tYXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dERhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2lucHV0LWRhdGUuanN4XG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBET0NVTUVOVF9DTE9TRURfU1RBVFVTID0gMjtcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIERvY0J1dHRvbiA9IHJlcXVpcmUoJy4vZG9jLWJ1dHRvbi5qc3gnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG52YXIgVG9vbGJhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJUb29sYmFyXCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3YXJuaW5nOiBmYWxzZSwgd2FybmluZ01lc3NhZ2U6ICcnLCBlZGl0TW9kZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRhc2tMaXN0OiB0aGlzLnByb3BzLnRhc2tMaXN0ID8gdGhpcy5wcm9wcy50YXNrTGlzdCA6IHRoaXMuZ2V0RGVmYXVsdFRhc2soKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1IGRvY0lkLiDQldGB0LvQuCDQt9C90LDRh9C10L3QuNC1ID0gMCAo0LTQvtCx0LDQstC70Y/QtdC8INC90L7QstGD0Y4g0LfQsNC/0LjRgdGMLCDRgtC+INC/0YDQvtGB0YLQviDQvtGH0LjRgtC60LAg0L/QvtC70LXQuSwg0LjQvdCw0YfQtSDQv9C+0LTQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOnNhdmVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0YDQtdC20LjQvCDQuNC30LzQtdC90LjQu9GB0Y8sINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRNb2RlOiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlU2VsZWN0VGFzazogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyDQvNC10YLQvtC0INCy0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQstGL0LHQvtGA0LUg0LfQsNC00LDRh9C4XHJcbiAgICAgICAgdmFyIHRhc2tWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVCdXR0b25UYXNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0LzQtdGC0L7QtCDQstGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LLRi9Cx0L7RgNC1INC30LDQtNCw0YfQuFxyXG4gICAgICAgIC8vINC90LDQudC00LXQvCDQsNC60YLRg9Cw0LvRjNC90YPRjiDQt9Cw0LTQsNGH0YNcclxuXHJcbiAgICAgICAgbGV0IGFjdHVhbFRhc2sgPSB0aGlzLnN0YXRlLnRhc2tMaXN0LmZpbHRlcihmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFzay5hY3R1YWxTdGVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB0YXNrID0gYWN0dWFsVGFzay5tYXAoZnVuY3Rpb24odGFzaykgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0YXNrLmFjdGlvblxyXG4gICAgICAgICAgICB9KTsgLy8g0L7RgdGC0LDQstC40Lwg0YLQvtC70YzQutC+INC90LDQt9Cy0LDQvdC40LUg0L/RgNC+0YbQtdC00YPRgNGLXHJcblxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2V4ZWN1dGVUYXNrJywgdGFzayk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUV2ZW50QnV0dG9uQWRkQ2xpY2s6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LTQu9GPINC60L3QvtC/0LrQuCBBZGRcclxuICAgICAgICAgICAgLy8g0L7RgtC/0YDQsNCy0LjQvCDQuNC30LLQtdGJ0LXQvdC40LUg0L3QsNCy0LXRgNGFXHJcbi8vICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5uYW1lKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbiggJ2RvY0lkQ2hhbmdlJywgMCApO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnZWRpdGVkQ2hhbmdlJywgdHJ1ZSApO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnc2F2ZWRDaGFuZ2UnLCBmYWxzZSApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgaGFuZGxlRXZlbnRCdXR0b25FZGl0Q2xpY2s6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LTQu9GPINC60L3QvtC/0LrQuCBFZGl0XHJcbiAgICAgICAgLy8g0L/QtdGA0LXQstC+0LTQuNC8INC00L7QutGD0LzQtdC90YIg0LIg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPLCDRgdC+0YXRgNCw0L3QtdC9ID0gZmFsc2VcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCAnZWRpdGVkQ2hhbmdlJywgdHJ1ZSApO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oICdzYXZlZENoYW5nZScsIGZhbHNlICk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVFdmVudEJ1dHRvblNhdmVDbGljazpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQtNC70Y8g0LrQvdC+0L/QutC4IFNhdmVcclxuICAgICAgICAvLyDQstCw0LvQuNC00LDRgtC+0YBcclxuXHJcbiAgICAgICAgbGV0IGlzVmFsaWQgPSAhdGhpcy52YWxpZGF0b3IoKTtcclxuXHJcbiAgICAgICAgaWYgKGlzVmFsaWQpIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/RgNC+0YjQu9C4INCy0LDQu9C40LTQsNGG0LjRjiwg0YLQviDRgdC+0YXRgNCw0L3QtdGP0LxcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbiggJ3NhdmVEYXRhJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZWRpdGVNb2RlID0gdGhpcy5zdGF0ZS5lZGl0TW9kZSxcclxuICAgICAgICAgICAgZG9jdW1lbnRTdGF0dXMgPSB0aGlzLnByb3BzLmRvY3VtZW50U3RhdHVzLFxyXG4gICAgICAgICAgICBpc0Nsb3NlZFN0YXR1cyA9IGRvY3VtZW50U3RhdHVzID09IERPQ1VNRU5UX0NMT1NFRF9TVEFUVVMgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHRhc2tXaWRnZXQgPSB0aGlzLmdlbmVyYXRlVGFza1dpZGdldCgpLFxyXG4gICAgICAgICAgICB0YXNrcyA9IHRoaXMuc3RhdGUudGFza0xpc3QubWFwKGZ1bmN0aW9uKHRhc2spICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFzay5hY3Rpb25cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZG9jLXRvb2xiYXItd2FybmluZ1wifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS53YXJuaW5nID8gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdGhpcy5zdGF0ZS53YXJuaW5nTWVzc2FnZSkgOiBudWxsXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJkb2MtdG9vbGJhclwiLCBzdHlsZToge2Zsb2F0OlwicmlnaHRcIn19LCBcclxuICAgICAgICAgICAgICAgICAgICBpc0Nsb3NlZFN0YXR1cyA/IG51bGwgOiBSZWFjdC5jcmVhdGVFbGVtZW50KERvY0J1dHRvbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJBZGRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJkb2MtdG9vbGJhclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5zdGF0ZS5lZGl0TW9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlRXZlbnRCdXR0b25BZGRDbGlja30pLCBcclxuICAgICAgICAgICAgICAgICAgICBpc0Nsb3NlZFN0YXR1cyA/IG51bGwgOiBSZWFjdC5jcmVhdGVFbGVtZW50KERvY0J1dHRvbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJFZGl0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLnN0YXRlLmVkaXRNb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVFdmVudEJ1dHRvbkVkaXRDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJkb2MtdG9vbGJhclwifSksIFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2xvc2VkU3RhdHVzID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQnV0dG9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZG9jLXRvb2xiYXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJTYXZlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogIXRoaXMuc3RhdGUuZWRpdE1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVFdmVudEJ1dHRvblNhdmVDbGlja30pLCBcclxuICAgICAgICAgICAgICAgICAgICBlZGl0ZU1vZGUgJiYgdGFza3MubGVuZ3RoID4gMCA/IG51bGwgOiB0YXNrV2lkZ2V0XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXREZWZhdWx0VGFzazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBbe3N0ZXA6IDAsIG5hbWU6ICdTdGFydCcsIGFjdGlvbjogJ3N0YXJ0Jywgc3RhdHVzOiAnb3BlbmVkJ31dXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnZW5lcmF0ZVRhc2tXaWRnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDQstC10YDQvdC10YIg0LLQuNC00LbQtdGCINC30LDQtNCw0YdcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnRhc2tMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Rhc2tMaXN0OiB0aGlzLmdldERlZmF1bHRUYXNrKCl9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0YXNrcyA9IHRoaXMuc3RhdGUudGFza0xpc3QuZmlsdGVyKGZ1bmN0aW9uKHRhc2spICB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2suc3RhdHVzID09PSAnb3BlbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXNrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgICAgIHRhc2tXaWRnZXQgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGFza3MubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0YHQv9C40YHQvtC6INC30LDQtNCw0YdcclxuICAgICAgICAgICAgb3B0aW9ucyA9IHRhc2tzLm1hcChmdW5jdGlvbih0YXNrKSAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiAwLCBrZXk6IE1hdGgucmFuZG9tKCl9LCBcIiBcIiwgdGFzay5uYW1lLCBcIiBcIilcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0YXNrV2lkZ2V0ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZVNlbGVjdFRhc2t9LCBvcHRpb25zLCBcIiBcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXNrcy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICB2YXIgdGFza05hbWUgPSB0YXNrc1swXS5uYW1lO1xyXG4gICAgICAgICAgICAvLyDQutC90L7Qv9C60LAg0YEg0LfQsNC00LDRh9C10LlcclxuICAgICAgICAgICAgdGFza1dpZGdldCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJidXR0b25cIiwgY2xhc3NOYW1lOiBcInVpLWMyXCIsIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQnV0dG9uVGFzaywgdmFsdWU6IHRhc2tOYW1lfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhc2tXaWRnZXQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgd2FybmluZyA9ICcnO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy52YWxpZGF0b3IpIHtcclxuICAgICAgICAgICAgbGV0IHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy52YWxpZGF0b3IoKTtcclxuICAgICAgICAgICAgICAgIHdhcm5pbmcgPSB3YXJuaW5nTWVzc2FnZSAhPT0gJ09rJ1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7d2FybmluZ01lc3NhZ2U6IHdhcm5pbmdNZXNzYWdlLCB3YXJuaW5nOiB3YXJuaW5nfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdhcm5pbmc7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUb29sYmFyO1xyXG5cclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtdG9vbGJhci5qc3hcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbmNvbnN0IERvY0J1dHRvbiA9IGZ1bmN0aW9uKHByb3BzKSB7XHJcbiAgICBsZXQgYnRuRW5hYmxlZCA9IHByb3BzLmVuYWJsZWQgPyB0cnVlOiBmYWxzZSwgLy8g0YPRgdGC0LDQvdC+0LLQuNC8INC30L3QsNGH0LXQvdC40LUg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cclxuICAgICAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUgfHwgbnVsbCxcclxuICAgICAgICBzdHlsZSA9IHttYXJnaW46IDV9LFxyXG4gICAgICAgIHJlZklkID0gcHJvcHMucmVmSWQgfHwgJ2RvY0J1dHRvbic7XHJcbi8vICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IHtjbGFzc05hbWV9XHJcblxyXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJidXR0b25cIiwgXHJcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBidG5FbmFibGVkLCBcclxuICAgICAgICAgICAgICAgICAgb25DbGljazogcHJvcHMub25DbGljaywgXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgc3R5bGU6IHtzdHlsZTpzdHlsZX19XHJcbiAgICApXHJcbn07XHJcblxyXG5Eb2NCdXR0b24ucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxufVxyXG4vLyAgICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERvY0J1dHRvblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWJ1dHRvbi5qc3hcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgSW5wdXRUZXh0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dC5qc3gnKSxcclxuICAgIElucHV0RGF0ZVRpbWUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRldGltZS5qc3gnKSxcclxuICAgIERvY0xpc3QgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1saXN0LmpzeCcpO1xyXG4vLyAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LW51bWJlci5qc3gnKTtcclxuXHJcbnZhciBEb2NDb21tb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiRG9jQ29tbW9uXCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgLy8g0L/RgNC4INC40LfQvNC10L3QtdC90LjQuCwg0L/QvtC80LXQvdGP0LXRgiDRgdC+0YHRgtC+0Y/QvdC40LUgKNC/0LXRgNC10LTQsNGB0YIg0LTQsNC70YzRiNC1INGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjylcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtyZWFkT25seTpuZXh0UHJvcHMucmVhZE9ubHkgfSlcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnByb3BzLmRhdGEsXHJcbiAgICAgICAgICAgIGJwbSA9IGRhdGEuYnBtIHx8IFtdLFxyXG4gICAgICAgICAgICBhY3R1YWxTdGVwRGF0YSA9IGJwbS5maWx0ZXIoZnVuY3Rpb24oc3RlcCkgIHtcclxuICAgICAgICAgICAgICAgIC8vINGC0LXQutGD0YnQuNC5INGI0LDQsyDQkdCfXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RlcC5hY3R1YWxTdGVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ZXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBleGVjdXRlcnMgPSBhY3R1YWxTdGVwRGF0YS5tYXAoZnVuY3Rpb24oc3RlcERhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vINC90LDQudC00LXQvCDQuNGB0L/QvtC70L3QuNGC0LXQu9C10LlcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGVwRGF0YS5hY3RvcnMgfHwge25hbWU6ICdBVVRIT1InfTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmaWVsZHNldFwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtzdHlsZToge2Rpc3BsYXk6Jy13ZWJraXQtaW5saW5lLWJveCd9fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMiBmb3JtLXdpZGdldC10b29sYmFyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI3NSVcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwge3N0eWxlOiB7ZGlzcGxheTonLXdlYmtpdC1pbmxpbmUtYm94J319LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyIGZvcm0td2lkZ2V0LXRvb2xiYXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkNyZWF0ZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3JlYXRlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuY3JlYXRlZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcInRydWVcIiwgd2lkdGg6IFwiNzUlXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtzdHlsZToge2Rpc3BsYXk6Jy13ZWJraXQtaW5saW5lLWJveCd9fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMiBmb3JtLXdpZGdldC10b29sYmFyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJVcGRhdGVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxhc3R1cGRhdGVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmxhc3R1cGRhdGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIHdpZHRoOiBcIjc1JVwifSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7c3R5bGU6IHtkaXNwbGF5Oictd2Via2l0LWlubGluZS1ib3gnfX0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzIgZm9ybS13aWRnZXQtdG9vbGJhclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhdHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXR1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuc3RhdHVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNzUlXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbi8qXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBzdHlsZT17e2Rpc3BsYXk6Jy13ZWJraXQtaW5saW5lLWJveCd9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2NMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT0n0JjRgdC/0L7Qu9C90LjRgtC10LvQuCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J2V4ZWN1dG9ycydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2V4ZWN1dGVyc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5ID0ge3RoaXMuc3RhdGUucmVhZE9ubHl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuKi9cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9jQ29tbW9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtY29tbW9uLmpzeFxuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBJbnB1dERhdGVUaW1lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIklucHV0RGF0ZVRpbWVcIixcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSwgcmVhZE9ubHk6IHRydWUsIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkIHx8IHRydWV9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4vLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSBkb2NJZC4g0JXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSA9IDAgKNC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQv9C40YHRjCwg0YLQviDQv9GA0L7RgdGC0L4g0L7Rh9C40YLQutCwINC/0L7Qu9C10LksINC40L3QsNGH0LUg0L/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvRhVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdjb21wb25lbnRXaWxsTW91bnQnICsgdGhpcy5wcm9wcy5uYW1lKTtcclxuLypcclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGB0L7Qt9C00LDQvdC40LUg0L3QvtCy0L7Qs9C+INC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVtzZWxmLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTowfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOnZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuKi9cclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdvbiBjaGFuZ2U6ZWRpdGVkOicgKyBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGF0YScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gbmV3VmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyDQuNC30LzQtdC90LXQvdC40Y8g0LHRg9C00YPRgiDQvtGC0YDQsNC20LDRgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0YHQu9GD0YfQsNC1INC10YHQu9C4INGC0LDQutC40LUg0LXRgdGC0YxcclxuICAgICAgICB2YXIgcmV0dXJudmFsdWUgPSAobmV4dFN0YXRlLnZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlIHx8XHJcbiAgICAgICAgbmV4dFN0YXRlLnJlYWRPbmx5ICE9PSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8XHJcbiAgICAgICAgbmV4dFN0YXRlLmRpc2FibGVkICE9PSB0aGlzLnN0YXRlLmRpc2FibGVkKTtcclxuXHJcbiAvLyAgICAgICBjb25zb2xlLmxvZygndmFzdHVzOicgKyByZXR1cm52YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHJldHVybnZhbHVlO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25DaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgZmllbGRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlLFxyXG4gICAgICAgICAgICBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICBkYXRhW3RoaXMucHJvcHMubmFtZV0gPSBmaWVsZFZhbHVlO1xyXG5cclxuICAgICAgICAvLyDQt9Cw0LTQsNGC0Ywg0L3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INC/0L7Qu9GPXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwcm9wczonICsgSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcykpO1xyXG4gICAgICAgIHZhciBpbnB1dENsYXNzTmFtZSA9dGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dERpc2FibGVkID0gdGhpcy5zdGF0ZS5kaXNhYmxlZCxcclxuICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lO1xyXG5cclxuICAgICAgICAgaWYgKGlucHV0UmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgaW5wdXRDbGFzc05hbWUgPSBpbnB1dENsYXNzTmFtZSArICcgZG9jLWlucHV0LXJlYWRvbmx5JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbnB1dERpc2FibGVkID09ICd0cnVlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJkYXRldGltZS1sb2NhbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMucHJvcHMucGF0dGVybiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcImRhdGV0aW1lLWxvY2FsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGlucHV0Q2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogaW5wdXRSZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy5wcm9wcy5wYXR0ZXJuLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0RGF0ZVRpbWU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRldGltZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcblxyXG4gICAgTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJMaXN0XCIsXHJcbiAgICAgICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhLFxyXG4gICAgICAgICAgICAgICAgY2xpY2tlZDogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IFtdLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ015IGRlZmF1bHQgTGlzdCcsXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiAgY29tcG9uZW50V2lsbE1vdW50OiAoKT0+IHtcclxuICAgICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUgZG9jSWQuINCV0YHQu9C4INC30L3QsNGH0LXQvdC40LUgPSAwICjQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0L/QuNGB0YwsINGC0L4g0L/RgNC+0YHRgtC+INC+0YfQuNGC0LrQsCDQv9C+0LvQtdC5LCDQuNC90LDRh9C1INC/0L7QtNCz0YDRg9C30LrQsCDQtNCw0L3QvdGL0YVcclxuICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkb2NJZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgdmFyIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICB2YWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgLy8g0YHQvtCy0YvQuSDQtNC+0LrRg9C80LXQvdGCXHJcbiAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOiAwfSk7XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOiB2YWx1ZX0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZSwgZGlzYWJsZWQ6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpsaWJzJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgIHZhciB2YXN0dXMgPSBKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgICAvLyB3aWxsIHdhdGNoIGxpYnMgY2hhbmdlIChmcm9tIHNlcnZlcilcclxuICAgICAgICAgdmFyIGRhdGEgPSBuZXdWYWx1ZS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IHNlbGYucHJvcHMubGlicykge1xyXG4gICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICBzZWxmLnNldFN0YXRlKHtkYXRhOiBkYXRhWzBdLmRhdGF9KTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuICAgICAgICAgfSxcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgaGFuZGxlTGlDbGljazogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgY2xpY2tlZDogaW5kZXhcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIGhhbmRsZUNsaWNrQnRuRGVsZXRlRXhlY3V0b3I6IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuc3RhdGUuZGF0YTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xpc3QgYnRuIGRlbGV0ZScsIGluZGV4KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kbGVDbGlja0J0bkFkZEV4ZWN1dG9yOiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0YXRlLmRhdGE7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsaXN0IGJ0biBhZGQnLCBpbmRleCk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgICAgICAvLyDQv9GA0Lgg0LjQt9C80LXQvdC10L3QuNC4INGB0YDQtdC20LjQvNCwINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8sINC/0L7QvNC10L3Rj9C10YIg0YHQvtGB0YLQvtGP0L3QuNC1INCy0LjQtNC20LXRgtCwXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3JlYWRPbmx5Om5leHRQcm9wcy5yZWFkT25seSB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0YXRlLmRhdGEgfHwgW10sXHJcbiAgICAgICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICdkb2MtaW5wdXQgZm9ybS13aWRnZXQnLFxyXG4gICAgICAgICAgICAgICAgaW5wdXRSZWFkT25seSA9IHRoaXMuc3RhdGUucmVhZE9ubHkgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBPcHRpb25zID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIC8vINGB0L7Qt9C00LDQtNC40Lwg0YHQv9C40YHQvtC6INC30L3QsNGH0LXQvdC40LlcclxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBPcHRpb25zID0gZGF0YS5tYXAoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT0gJ2FycmF5Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmNsaWNrZWQgPT0gaW5kZXggJiYgIXRoaXMuc3RhdGUucmVhZE9ubHkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINCy0YvQtNC10LvQuNC8INCyINGB0L/QuNGB0LrQtSDQt9C90LDRh9C10L3QuNC1LCDQv9GA0Lgg0YPRgdC70L7QstC40LgsINGH0YLQviDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8g0Y3RgtC+INC/0L7Qt9Cy0L7Qu9GP0LXRglxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUgKyAnIGZvY3VzZWQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBNYXRoLnJhbmRvbSgpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlTGlDbGljay5iaW5kKHRoaXMsIGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBpdGVtLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgd2lkZ2V0ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICBzdHlsZToge3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnfX0sIFxyXG4gICAgICAgICAgICAgICAgT3B0aW9uc1xyXG4gICAgICAgICAgICApO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHtkaXNwbGF5OiBcImZsZXhcIn19LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge3N0eWxlOiB7cGFkZGluZ1JpZ2h0OiBcIjVweFwifX0sIFwiIFwiLCB0aGlzLnByb3BzLnRpdGxlKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5yZWFkT25seSA/IG51bGwgOiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwiYnV0dG9uXCIsIHZhbHVlOiBcIiBBZGQgXCIsIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2tCdG5BZGRFeGVjdXRvcn0pLCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJlYWRPbmx5ID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJidXR0b25cIiwgdmFsdWU6IFwiIERlbGV0ZSBcIiwgb25DbGljazogdGhpcy5oYW5kbGVDbGlja0J0bkRlbGV0ZUV4ZWN1dG9yfSlcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgd2lkZ2V0XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExpc3Q7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtbGlzdC5qc3hcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG4vLyAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC10ZXh0LmpzeCcpO1xyXG5cclxuY29uc3QgU2VsZWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlNlbGVjdFwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGxpYkRhdGEgPSBbXTtcclxuICAgICAgICB2YXIgbGlicyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmxpYnMsXHJcbiAgICAgICAgLy8g0LPRgNGD0LfQuNC8INC00LDQvdC90YvQtSDQuNC3INGF0YDQsNC90LjQu9C40YnQsFxyXG4gICAgICAgICAgICBkYXRhID0gbGlicy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09IHRoaXMucHJvcHMubGlicykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzKSxcclxuICAgICAgICAgICAgaWRWYWx1ZSA9IHRoaXMucHJvcHMudmFsdWU7IC8vINC00LvRjyDQv9GA0LjQstGP0LfQutC4INC00LDQvdC90YvRhVxyXG5cclxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDAgJiYgZGF0YVswXS5kYXRhKSB7XHJcbiAgICAgICAgICAgIGxpYkRhdGEgPSBkYXRhWzBdLmRhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge3ZhbHVlOiB0aGlzLnByb3BzLnZhbHVlIC8qINC30LTQtdGB0Ywg0L/QviDQt9C90LDRh9C10L3QuNGOINCY0JQgKi8sXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5LFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgZGF0YTogbGliRGF0YSB8fCBbXSxcclxuICAgICAgICAgICAgZmllbGRWYWx1ZTogdGhpcy5wcm9wcy52YWx1ZSAvKtC30LTQtdGB0Ywg0L/QviDQt9C90LDRh9C10L3QuCDQv9C+0LvRjyBjb2xsSWQgKi8sXHJcbiAgICAgICAgICAgIGJybkRlbGV0ZTogdGhpcy5wcm9wcy5idG5EZWxldGUgLyog0LXRgdC70Lgg0LjRgdGC0LjQvdGDLCDRgtC+INGA0LjRgdGD0LXQvCDRgNGP0LTQvtC8INC60L3QvtC/0LrRgyDQtNC70Y8g0L7Rh9C40YHRgtC60Lgg0LfQvdCw0YfQtdC90LjRjyovfTtcclxuICAgIH0sXHJcblxyXG4gICAgZmluZEZpZWxkVmFsdWU6IGZ1bmN0aW9uIChkYXRhLCBjb2xsSWQsIHZhbHVlKSB7XHJcbiAgICAgICAgLy8g0L/RgNC40LLRj9C20LXRgiDQuiDQt9C90LDRh9C10L3RjiDQv9C+0LvRj1xyXG4gICAgICAgIC8vINC90LDQtNC+INC/0YDQuNCy0Y/Qt9Cw0YLRjCDQtNCw0L3QvdGL0LVcclxuICAgICAgICAvLyBrb29kIC0+IGlkXHJcbiAgICAgICAgdmFyIGlkID0gMDtcclxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICAgICAgICBpZiAocm93W2NvbGxJZF0gPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlkID0gcm93LmlkO1xyXG4vLyAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogcm93LmlkLCBmaWVsZFZhbHVlOiByb3dbY29sbElkXX0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRWYWx1ZUJ5SWQ6IGZ1bmN0aW9uKGNvbGxJZCwgcm93SWQpIHtcclxuICAgICAgICAvLyDQstC10YDQvdC10YIg0LfQvdCw0YfQtdC90LjRjyDQv9C+0LvRjyDQv9C+INCy0YvQsdGA0LDQvdC90L7QvNGDINCY0JRcclxuXHJcbiAgICAgICAgdmFyIGZpZWxkVmFsdWUsXHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnN0YXRlLmRhdGE7XHJcblxyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgIGlmIChyb3dbJ2lkJ10gPT0gcm93SWQpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSByb3dbY29sbElkXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZpZWxkVmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0L/QvtC60LDQttC10YIg0LfQvdCw0YfQtdC90LjQtSDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQtNC70Y8g0LLQuNC00LbQtdGC0LAsINC/0L7QutCwINCz0YDRg9C30LjRgtGB0Y8g0YHQv9GA0LDQstC+0YfQvdC40LpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgIHZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICB0aXRsZTogbnVsbCxcclxuICAgICAgICAgICAgYnRuRGVsZXRlOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xyXG4vLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSBkb2NJZC4g0JXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSA9IDAgKNC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQv9C40YHRjCwg0YLQviDQv9GA0L7RgdGC0L4g0L7Rh9C40YLQutCwINC/0L7Qu9C10LksINC40L3QsNGH0LUg0L/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvRhVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkb2NJZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0YHQvtCy0YvQuSDQtNC+0LrRg9C80LXQvdGCXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7dmFsdWU6IDB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7dmFsdWU6IHZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtyZWFkT25seTogIW5ld1ZhbHVlLCBkaXNhYmxlZDogIW5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpsaWJzJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciB2YXN0dXMgPSBKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgICAgICAvLyB3aWxsIHdhdGNoIGxpYnMgY2hhbmdlIChmcm9tIHNlcnZlcilcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBuZXdWYWx1ZS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBzZWxmLnByb3BzLmxpYnMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2RhdGE6IGRhdGFbMF0uZGF0YX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY29sbElkICYmIHRoaXMucHJvcHMuY29sbElkICE9PSAnaWQnKSB7XHJcbiAgICAgICAgICAgIC8vINC40YnQtdC8INCY0JQg0L/QviDQt9C90LDRh9C10L3QuNGOINC/0L7Qu9GPXHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkVmFsdWUodGhpcy5zdGF0ZS5kYXRhLCB0aGlzLnByb3BzLmNvbGxJZCwgdGhpcy5wcm9wcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgIHZhciBmaWVsZFZhbHVlID0gZS50YXJnZXQudmFsdWUsXHJcbiAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICBwcm9wVmFsdWUgPSBkYXRhW3RoaXMucHJvcHMubmFtZV07XHJcblxyXG4gICAgICAgIGlmIChmaWVsZFZhbHVlID09ICcnKSB7XHJcbiAgICAgICAgICAgIGZpZWxkVmFsdWUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyDQvdCw0LnQtNC10Lwg0L/QviDQuNC0INC30L3QsNGH0LXQvdC40LUg0L/QvtC70Y8g0LIgY29sbElkXHJcbiAgICAgICAgdGhpcy5nZXRWYWx1ZUJ5SWQodGhpcy5wcm9wcy5jb2xsSWQsIGZpZWxkVmFsdWUpO1xyXG4gICAgICAgIC8vINGB0L7RhdGA0LDQvdC40Lwg0LjQtCDQutCw0LogdmFsdWVcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6ZmllbGRWYWx1ZX0pO1xyXG5cclxuICAgICAgICBpZiAocHJvcFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQuNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0L/RgNC40LLRj9C30LrQsCDQuiDQtNCw0L3QvdGL0LxcclxuICAgICAgICAgICAgLy8g0L/QvtC70YPRh9C40YLRjCDQt9C90LDRh9C10L3QuNC1XHJcbiAgICAgICAgICAgIGRhdGFbdGhpcy5wcm9wcy5uYW1lXSA9IGZpZWxkVmFsdWU7XHJcbiAgICAgICAgICAgIC8vINC30LDQtNCw0YLRjCDQvdC+0LLQvtC1INC30L3QsNGH0LXQvdC40LUg0L/QvtC70Y9cclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgLy8g0YHQvNC+0YLRgNC40Lwg0Log0YfQtdC80YMg0L/RgNC40LLRj9C30LDQvSDRgdC10LvQtdC60YIg0Lgg0L7RgtC00LDQuNC8INC10LPQviDQvdCw0LLQtdGA0YVcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShlLCB0aGlzLnByb3BzLm5hbWUsIHRoaXMuc3RhdGUudmFsdWUpOyAvLyDQsiDRgdC70YPRh9Cw0LUg0LXRgdC70Lgg0LfQsNC00LDQvSDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINCy0LXRgNGF0L3QtdC8INGD0YDQvtCy0L3QtSwg0L7RgtC00LDQtNC40Lwg0L7QsdGA0LDQsdC+0YLQutGDINGC0YPQtNCwXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGFPcHRpb25zID0gdGhpcy5zdGF0ZS5kYXRhIHx8IFtdLFxyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICBPcHRpb25zID0gbnVsbCxcclxuICAgICAgICAgICAgaW5wdXREZWZhdWx0VmFsdWUgPSB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZTsgLy8g0JTQsNC00LjQvCDQtNC10YTQvtC70YLQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSDQtNC70Y8g0LLQuNC00LbQtdGC0LAsINGH0YLQvtCxINC/0L7QutCw0YLRjCDQtdCz0L4g0YHRgNCw0LfRgywg0LTQviDQv9C+0LTQs9GA0YPQt9C60Lgg0LHQuNCx0LvQuNC+0YLQtdC60LhcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZG9rKSB7XHJcbiAgICAgICAgICAgIC8vINC+0YHRgtCw0LLQuNC8INGC0L7Qu9GM0LrQviDQt9Cw0LTQsNC90YvQuSBcItGB0L/RgNCw0LLQvtGH0L3QuNC6XCJcclxuICAgICAgICAgICAgZGF0YU9wdGlvbnMgPSBkYXRhT3B0aW9ucy5maWx0ZXIoZnVuY3Rpb24oaXRlbSkgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmRvayA9PT0gdGhpcy5wcm9wcy5kb2spIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnZhbHVlKSB7IC8vINC00L7QsdCw0LLQuNC8INC/0YPRgdGC0YPRjiDRgdGC0YDQvtC60YMg0LIg0LzQsNGB0YHQuNCyXHJcbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsNC70LjRh9C40LUg0L/Rg9GB0YLQvtC5INGB0YLRgNC+0LrQuCDQsiDQvNCw0YHRgdC40LLQtVxyXG5cclxuICAgICAgICAgICAgbGV0IGVtcHR5T2JqID0gZGF0YU9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKG9iaikgIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmouaWQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZW1wdHlPYmogfHwgZW1wdHlPYmoubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGRhdGFPcHRpb25zLnNwbGljZSgwLCAwLCB7aWQ6IDAsIGtvb2Q6ICcnLCBuYW1lOiAnJ30pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGRhdGFWYWx1ZSA9IGRhdGFPcHRpb25zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5pZCA9PSB0aGlzLnN0YXRlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAoZGF0YU9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIE9wdGlvbnMgPSBkYXRhT3B0aW9ucy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT0gJ2FycmF5Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtWzBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiBpdGVtLmlkLCBrZXk6IE1hdGgucmFuZG9tKCl9LCBpdGVtLm5hbWUpXHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgICAgICBpbnB1dERlZmF1bHRWYWx1ZSA9IGRhdGFWYWx1ZS5sZW5ndGggPiAwID8gZGF0YVZhbHVlWzBdLm5hbWUgOiB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBPcHRpb25zID0gUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7dmFsdWU6IDAsIGtleTogTWF0aC5yYW5kb20oKX0sIFwiIEVtcHR5IFwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHdpZGdldCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiwge3ZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHt3aWR0aDonMTAwJScsIGhlaWdodDonMTAwJSd9fSwgT3B0aW9ucyk7IC8vINC10YHQu9C4INC00LvRjyDQs9GA0LjQtNCwLCDQvtGB0YLQsNCy0LjQvCDRgtC+0LvRjNC60L4g0YHQtdC70LXQutGCXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudGl0bGUpIHtcclxuICAgICAgICAgICAgd2lkZ2V0ID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldC1sYWJlbFwifSwgdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZToge2Rpc3BsYXk6J2lubGluZS1ibG9jayd9fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWFkT25seSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJ0ZXh0XCIsIGNsYXNzTmFtZTogXCJ1aS1jMSBkb2MtaW5wdXQtcmVhZG9ubHlcIiwgdmFsdWU6IGlucHV0RGVmYXVsdFZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBcInRydWVcIn0pIDogbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRSZWFkT25seSA/IG51bGwgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZX0sIE9wdGlvbnMpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYnRuRGVsZXRlID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJ1aS1jMS1idXR0b25cIiwgb25DbGljazogdGhpcy5idG5EZWxDbGlja30sIFwiIERlbGV0ZSBcIikgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIHdpZGdldClcclxuICAgIH0sXHJcblxyXG4gICAgYnRuRGVsQ2xpY2s6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgLy8g0L/QviDQstGL0LfQvtCy0YMg0LrQvdC+0L/QutGDINGD0LTQsNC70LjRgtGMLCDQvtCx0L3Rg9C70Y/QtdGCINC30L3QsNGH0LXQvdC40LVcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTpudWxsfSk7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZShldmVudCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3Q7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtc2VsZWN0LmpzeFxuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBJbnB1dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJJbnB1dFwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge3ZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLCByZWFkT25seTogdHJ1ZSwgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdHJ1ZX07XHJcbiAgICB9LFxyXG5cclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdkZWZhdWxOYW1lJyxcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnZG9jLWlucHV0JyxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdkZWZhdWxOYW1lJyxcclxuICAgICAgICAgICAgdGl0bGU6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpIHtcclxuLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUgZG9jSWQuINCV0YHQu9C4INC30L3QsNGH0LXQvdC40LUgPSAwICjQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0L/QuNGB0YwsINGC0L4g0L/RgNC+0YHRgtC+INC+0YfQuNGC0LrQsCDQv9C+0LvQtdC5LCDQuNC90LDRh9C1INC/0L7QtNCz0YDRg9C30LrQsCDQtNCw0L3QvdGL0YVcclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGB0L7Qt9C00LDQvdC40LUg0L3QvtCy0L7Qs9C+INC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTowfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOnZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDRgdC70YPRiNGD0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFO1xyXG4gICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBuZXdWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZFZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbdGhpcy5wcm9wcy5uYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOmZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdC10L3QuNGPINCx0YPQtNGD0YIg0L7RgtGA0LDQttCw0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDRgtCw0LrQuNC1INC10YHRgtGMXHJcbiAgICAgICAgbGV0IHJldHVybnZhbHVlID0gKG5leHRTdGF0ZS52YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSB8fFxyXG4gICAgICAgIG5leHRTdGF0ZS5yZWFkT25seSAhPT0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fFxyXG4gICAgICAgIG5leHRTdGF0ZS5kaXNhYmxlZCAhPT0gdGhpcy5zdGF0ZS5kaXNhYmxlZCk7XHJcbiAgICAgICAgcmV0dXJuIHJldHVybnZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGxldCBmaWVsZFZhbHVlID0gZS50YXJnZXQudmFsdWUsXHJcbiAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgIGRhdGFbdGhpcy5wcm9wcy5uYW1lXSA9IGZpZWxkVmFsdWU7XHJcbiAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOm5leHRQcm9wcy52YWx1ZSB9KVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBpbnB1dENsYXNzTmFtZSA9dGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dERpc2FibGVkID0gdGhpcy5zdGF0ZS5kaXNhYmxlZCxcclxuICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICBteVN0eWxlID0ge3dpZHRoOidhdXRvJ307O1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRSZWFkT25seSkge1xyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IGlucHV0Q2xhc3NOYW1lICsgJyBkb2MtaW5wdXQtcmVhZG9ubHknO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy53aWR0aCkge1xyXG4gICAgICAgICAgICBteVN0eWxlLndpZHRoID0gdGhpcy5wcm9wcy53aWR0aFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbnB1dERpc2FibGVkID09ICd0cnVlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtodG1sRm9yOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb3JtLXdpZGdldC1sYWJlbFwifSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSlcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IG15U3R5bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBpbnB1dFJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZX1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7aHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogbXlTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZUhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXHJcbiAgICB9LFxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dGFyZWEuanN4XG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIEdyaWRCdXR0b24gPSByZXF1aXJlKCcuL215YnV0dG9uJyk7XHJcblxyXG52YXIgTXlDZWxsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIk15Q2VsbFwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUsIGVkaXRhYmxlOiBmYWxzZSwgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiB0aGlzLnByb3BzLnZhbHVlfSlcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6Z3JpZENlbGxFZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDQvNC+0LzQtdC90YIg0L/QtdGA0LXRhdC+0LTQsCDQvdCwINC00YDRg9Cz0YPRjiDRj9GH0LXQudC60YNcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBzZWxmLnByb3BzLmlkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2VsbCA9IHNlbGYucmVmc1snY2VsbC0nICsgc2VsZi5wcm9wcy5pZF07XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRhYmxlOiBmYWxzZX0pOyAvLyDRg9Cx0LjRgNCw0LXQvCDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdGCINGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLFxyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEgPSBldmFsKCdkYXRhLicgKyBzZWxmLnByb3BzLmdyaWREYXRhU291cmNlKTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlICYmIGdyaWREYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gIXRoaXMuc3RhdGUuZWRpdGFibGU7XHJcbiAgICAgICAgLy8g0L7RgtGA0LDQsdC+0YLQsNC10Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRDZWxsRWRpdGVkQ2hhbmdlJywgdGhpcy5wcm9wcy5pZCk7IC8vINC30LDQutGA0L7QtdC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LUg0LIg0LTRgNGD0LPQuNGFINGP0YfQtdC50LrQsNGFXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGFibGU6IHZhbHVlfSk7XHJcbiAgICAgICAgLy8gICAgICAgY29uc29sZS5sb2coJ2NlbGwgY2xpY2snICsgdmFsdWUgKyAnIGlkOicgKyB0aGlzLnByb3BzLmlkICsgJ3JlYWRPbmx5OicgKyB0aGlzLnN0YXRlLnJlYWRPbmx5KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZSwgYmluZFRvQ2VsbCkge1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQsNGC0YvQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40LUg0YHQvtGB0YLQvtGP0L3QuNGPINGP0YfQtdC50LrQuCDQuCDQv9C40YjQtdGCINCyINGF0YDQsNC90LjQu9GJ0LVcclxuICAgICAgICB2YXIgdmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLFxyXG4gICAgICAgICAgICBncmlkRGF0YSA9IGV2YWwoJ2RhdGEuJyArIHRoaXMucHJvcHMuZ3JpZERhdGFTb3VyY2UpIHx8IFtdLFxyXG4gICAgICAgICAgICBjZWxsTmFtZSA9IGJpbmRUb0NlbGwgPyBiaW5kVG9DZWxsIDogdGhpcy5wcm9wcy5zb3VyY2U7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiB2YWx1ZX0pO1xyXG5cclxuICAgICAgICAvLyDQv9C40YjQtdC8INGB0L7RgdGC0L7Rj9C90LjQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICBpZiAoZ3JpZERhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgY2VsbFZhbHVlID0gZ3JpZERhdGFbdGhpcy5wcm9wcy5yb3dJZF1bY2VsbE5hbWVdO1xyXG5cclxuICAgICAgICAgICAgZ3JpZERhdGFbdGhpcy5wcm9wcy5yb3dJZF1bY2VsbE5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RldGFpbHNDaGFuZ2UnLCBncmlkRGF0YSk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRDZWxsRWRpdGVkQ2hhbmdlJywgdGhpcy5wcm9wcy5pZCk7IC8vINC30LDQutGA0L7QtdC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LUg0LIg0LTRgNGD0LPQuNGFINGP0YfQtdC50LrQsNGFXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlS2V5UHJlc3M6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xyXG4gICAgICAgIGlmIChrZXkgPT0gMTMpIHtcclxuICAgICAgICAgICAgLy8g0LLRi9GF0L7QtNC40Lwg0LjQtyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VkaXRhYmxlOiBmYWxzZX0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaXNFZGl0ID0gKGZsdXguc3RvcmVzLmRvY1N0b3JlLmVkaXRlZCAmJiAhdGhpcy5zdGF0ZS5kaXNhYmxlZCkgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNlbGwgPSB0aGlzLnByb3BzLmNlbGwsIC8vINC/0LDRgNCw0LzQtdGC0YDRiyDRj9GH0LXQudC60LhcclxuICAgICAgICAgICAgaXNSZWFkT25seSA9ICFmbHV4LnN0b3Jlcy5kb2NTdG9yZS5lZGl0ZWQsXHJcbi8vICAgICAgICAgICAgY2VsbFR5cGUgPSBjZWxsLnR5cGUgfHwgJ3NwYW4nOyAvLyDQvdCw0YXQvtC00LjRgtGB0Y8g0LvQuCDQtNC+0Log0LIg0YDQtdC20LjQvNC1INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICAgICAgY2VsbFR5cGUgPSAnc3Bhbic7IC8vINC90LDRhdC+0LTQuNGC0YHRjyDQu9C4INC00L7QuiDQsiDRgNC10LbQuNC80LUg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG5cclxuICAgICAgICBpc1JlYWRPbmx5ID0gY2VsbC5yZWFkT25seSA/IHRydWUgOiBpc1JlYWRPbmx5OyAvLyDQv9C+0L/RgNCw0LLQutCwINC90LAg0YHQstC+0LnRgdGC0LLQviDRj9GH0LXQudC60LgsINC00L7RgdGC0YPQv9C90LAg0LvQuCDQvtC90LAg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjlxyXG4vLyAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdmb3JtLXdpZGdldCc7IC8vKyB0IGhpcy5zdGF0ZS5lZGl0YWJsZT8gJyBmb2N1c2VkJzogJyc7XHJcbiAgICAgICAgaXNSZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgdmFyIEVkaXRFbGVtZW50ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge29uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2ssIGNsYXNzTmFtZTogdGhpcy5wcm9wcy5jbGFzc05hbWV9LCB0aGlzLnByb3BzLnZhbHVlKTtcclxuICAgICAgICBpZiAoaXNFZGl0KSB7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICBzd2l0Y2ggKGNlbGxUeXBlKSB7XHJcbiAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcclxuICAgICAgICAgICAgIEVkaXRFbGVtZW50ID0gPGlucHV0IHR5cGU9J3RleHQnIHJlYWRPbmx5PXtpc1JlYWRPbmx5fSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gc3R5bGU9e3t3aWR0aDonMTAwJSd9fVxyXG4gICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IG9uS2V5UHJlc3M9e3RoaXMuaGFuZGxlS2V5UHJlc3N9Lz5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgIEVkaXRFbGVtZW50ID0gPGlucHV0IHR5cGU9J251bWJlcicgcmVhZE9ubHk9e2lzUmVhZE9ubHl9IHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfSBzdHlsZT17e3dpZHRoOicxMDAlJ319XHJcbiAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX0gb25LZXlQcmVzcz17dGhpcy5oYW5kbGVLZXlQcmVzc30vPlxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICBjYXNlICdzZWxlY3QnOlxyXG4gICAgICAgICAgICAgRWRpdEVsZW1lbnQgPSA8U2VsZWN0ICBuYW1lPXtjZWxsLnZhbHVlRmllbGROYW1lfSBsaWJzPXtjZWxsLmRhdGFTZXR9IHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfSBkZWZhdWx0VmFsdWUgPSB7dGhpcy5zdGF0ZS52YWx1ZX0gY29sbElkID0ge2NlbGwuaWR9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfS8+XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICA8c3Bhbj57dGhpcy5zdGF0ZS52YWx1ZX08L3NwYW4+XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIHtyZWY6ICdjZWxsLScgKyB0aGlzLnByb3BzLmlkLCBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lLCBzdHlsZToge3dpZHRoOmNlbGwud2lkdGh9fSwgXHJcbiAgICAgICAgICAgICAgICBFZGl0RWxlbWVudFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59KVxyXG5cclxudmFyIERhdGFHcmlkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkRhdGFHcmlkXCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBncmlkQ29sdW1uczogdGhpcy5wcm9wcy5ncmlkQ29sdW1ucyxcclxuICAgICAgICAgICAgZ3JpZERhdGE6IHRoaXMucHJlcGFpcmVHcmlkRGF0YSh0aGlzLnByb3BzLmdyaWREYXRhKSxcclxuICAgICAgICAgICAgZWRpdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY2xpY2tlZDogMFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgR3JpZFJvd0VkaXQ6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10YIg0YDQtdC20LjQvCDRgdC+0LfQtNCw0L3QuNGPINC90L7QstC+0LPQviDQtNC+0LrRg9C80LXQvdGC0LBcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUsXHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YSA9IGV2YWwoJ2RhdGEuJyArIHNlbGYucHJvcHMuc291cmNlKTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgIGdyaWREYXRhID0gc2VsZi5kZWxSb3cobnVsbCk7XHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gTGlzdGVuIGdyaWREYXRhIGNoYW5nZXMgYW5kIHRoZW4gY2FsbGJhY2tzIGZvciByb3cgZGF0YSBjaGFuZ2VzXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkZXRhaWxzJywgZnVuY3Rpb24gKG5ld0RhdGEsIG9sZERhdGEpIHtcclxuICAgICAgICAgICAgaWYgKG5ld0RhdGEubGVuZ3RoID4gMCAmJiBvbGREYXRhICE9PSBuZXdEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtncmlkRGF0YTogbmV3RGF0YX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVDZWxsQ2xpY2s6IGZ1bmN0aW9uIChpZHgpIHtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkUm93SWRDaGFuZ2UnLCBpZHgpOyAvLyDQvtGC0LzQtdGC0LjQvCDQsiDRhdGA0LDQvdC40LvQuNGJ0LUg0L3QvtC80LXRgCDRgdGC0YDQvtC60LhcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgY2xpY2tlZDogaWR4XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHJvd0lkID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZ3JpZFJvd0lkO1xyXG4gICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdjbGlja2VkIHJvd0lkIDonICsgcm93SWQgKyAncm93SW5kZXg6JyArIGlkeCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBkZWxSb3c6IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIC8vINGD0LTQsNC70LjQvCDRgdGC0YDQvtC60YMg0LfQsNC00LDQvdC90YPRjiDRgdGC0YDQvtC60YMg0LjQu9C4INCy0YHQtSwg0LXRgdC70Lgg0LjQvdC00LXQutGBINC90LUg0LfQsNC00LDQvVxyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIHN0YXJ0ID0gMSxcclxuICAgICAgICAgICAgZmluaXNoID0gZ3JpZERhdGEubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggfHwgaW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICBzdGFydCA9IGluZGV4O1xyXG4gICAgICAgICAgICBmaW5pc2ggPSAxO1xyXG4gICAgICAgIH1cclxuLy8gICAgICAgIGdyaWREYXRhLnNwbGljZShzdGFydCwgZmluaXNoKTtcclxuICAgICAgICBncmlkRGF0YSA9IGdyaWREYXRhLmZpbHRlcihmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IHN0YXJ0IHx8IGluZGV4ID4gKHN0YXJ0ICsgZmluaXNoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtncmlkRGF0YTogZ3JpZERhdGF9KTtcclxuICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INC40LfQvNC10L3QtdC90LjRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RldGFpbHNDaGFuZ2UnLCBncmlkRGF0YSlcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG5ld1JvdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8v0LLQtdGA0L3QtdGCINC90L7QstGD0Y4g0YHRgtGA0L7QutGDINC00LvRjyDQs9GA0LjQtNCwLCDQvdCwINC+0YHQvdC+0LLQtSDRiNCw0LHQu9C+0L3QsFxyXG5cclxuICAgICAgICB2YXIgZ3JpZENvbHVtbnMgPSB0aGlzLnByb3BzLmdyaWRDb2x1bW5zLFxyXG4gICAgICAgICAgICBncmlkRGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRldGFpbHMsXHJcbiAgICAgICAgICAgIHJvdyA9IG5ldyBPYmplY3QoKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncmlkQ29sdW1ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgZmllbGQgPSBncmlkQ29sdW1uc1tpXS5pZDtcclxuICAgICAgICAgICAgcm93W2ZpZWxkXSA9ICcnO1xyXG4gICAgICAgIH1cclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCduZXcgcm93OicgKyBKU09OLnN0cmluZ2lmeShncmlkRGF0YSkpO1xyXG4vLyAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZERhdGE6Z3JpZERhdGF9KTtcclxuICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgfSxcclxuXHJcbiAgICBwcmVwYWlyZUdyaWREYXRhOiBmdW5jdGlvbiAoc291cmNlRGF0YSkge1xyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IFtdO1xyXG4gICAgICAgIGdyaWREYXRhID0gc291cmNlRGF0YS5tYXAoZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICAgICAgICAvLyDQv9C+0LvRg9GH0LDQtdC8INGH0LjRgdGC0YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgdmFyIG5ld1JvdyA9IHRoaXMubmV3Um93KCk7XHJcbiAgICAgICAgICAgIC8vINC/0YDQvtC50LTQtdC8INC/0L4g0L3QvtCy0L7QuSDRgdGC0YDQvtC60LUg0Lgg0LfQsNC/0L7Qu9C90LjQvCDQtdC1INC/0L7Qu9GPINC30L3QsNGH0LXQvdC40Y/QvNC4INC40Lcg0LjRgdGC0L7Rh9C90LjQutCwXHJcbi8vICAgICAgICAgICAgY29uc29sZS5sb2coJ9GH0LjRgdGC0YPRjiDRgdGC0YDQvtC60YM6JyArIEpTT04uc3RyaW5naWZ5KHJvdykgKyAnIG5ld1JvdzonICsgSlNPTi5zdHJpbmdpZnkobmV3Um93KSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbmV3Um93KSB7XHJcbi8vICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdrZXk6JyArIEpTT04uc3RyaW5naWZ5KGtleSkpO1xyXG4gICAgICAgICAgICAgICAgbmV3Um93W2tleV0gPSByb3dba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3Um93OyAvLyDQstC10YDQvdC10Lwg0YHRhNC+0YDQvNC40YDQvtCy0LDQvdC90YPRjiDQvdC+0LLRg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4vLyAgICAgICAgY29uc29sZS5sb2coJ2dyaWREYXRhOicgKyBKU09OLnN0cmluZ2lmeShncmlkRGF0YSkgKTtcclxuICAgICAgICByZXR1cm4gZ3JpZERhdGE7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGV0ZVJvdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINGD0LTQsNC70LXQvdC40LUg0YHRgtGA0L7QutC4INC40Lcg0LPRgNC40LTQsFxyXG4gICAgICAgIHZhciByb3dJbmRleCA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRSb3dJZDtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZVJvdzonICsgcm93SW5kZXgpO1xyXG4gICAgICAgIHRoaXMuZGVsUm93KHJvd0luZGV4KTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkUm93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0LTQvtCx0LDQstC40YIg0LIg0YHQvtGB0YLQvtGP0L3QuNC1INC90L7QstGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgdmFyIG5ld1JvdyA9IHRoaXMubmV3Um93KCksXHJcbiAgICAgICAgICAgIGdyaWREYXRhID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZGV0YWlscyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRldGFpbHM7XHJcblxyXG4gICAgICAgIG5ld1Jvdy5pZCA9ICdORVcnICsgTWF0aC5yYW5kb20oKTsgLy8g0LPQtdC90LXRgNC40Lwg0L3QvtCy0L7QtSDQuNC0XHJcbi8vICAgICAgICBncmlkRGF0YS5wdXNoKG5ld1Jvdyk7XHJcbi8vICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0ZWQ6IHRydWUsIGNsaWNrZWQ6IGdyaWREYXRhLmxlbmd0aH0pO1xyXG5cclxuICAgICAgICAvLyDQt9C00LXRgdGMINCy0YHRgtCw0LLQuNGC0Ywg0YHRgtGA0L7QutGDINCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4vLyAgICAgICAgZGV0YWlscy5wdXNoKG5ld1Jvdyk7XHJcbi8vICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZGV0YWlscyk7IC8vINC/0LjRiNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRSb3dJZENoYW5nZScsIC0xKTsgLy8g0L7RgtC80LXRgtC40Lwg0LIg0YXRgNCw0L3QuNC70LjRidC1INC90L7QvNC10YAg0YHRgtGA0L7QutC4XHJcblxyXG4gIC8vICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZERhdGE6IGdyaWREYXRhfSk7XHJcblxyXG4gICAgICAgIC8vINC+0YLQutGA0L7QtdC8INC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QviDQtNC70Y8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlR3JpZFJvdygnQUREJywgbmV3Um93KTtcclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBlZGl0Um93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0LTQvtCx0LDQstC40YIg0LIg0YHQvtGB0YLQvtGP0L3QuNC1INC90L7QstGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgdmFyIGdyaWREYXRhID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZGV0YWlscyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRldGFpbHMsXHJcbiAgICAgICAgICAgIHJvdyA9IGRldGFpbHNbZmx1eC5zdG9yZXMuZG9jU3RvcmUuZ3JpZFJvd0lkXVxyXG5cclxuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZUdyaWRSb3coJ0VESVQnLHJvdyApOyAvLyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNC1INGB0YLRgNC+0LrQuCDQsiDQvNC+0LTQsNC70YzQvdC+0Lwg0L7QutC90LVcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG5cclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdncmlkIHJlbmRlcicsIHRoaXMucHJvcHMpO1xyXG4gICAgICAgIHZhciBncmlkU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwcHgnXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgY2xhc3NOYW1lID0gJ3RoJztcclxuICAgICAgICB2YXIgZ3JpZFJvd3MgPSB0aGlzLnN0YXRlLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBncmlkQ29sdW1ucyA9IHRoaXMucHJvcHMuZ3JpZENvbHVtbnMsXHJcbiAgICAgICAgICAgIGNsaWNrZWRJdGVtID0gdGhpcy5zdGF0ZS5jbGlja2VkLFxyXG4gICAgICAgICAgICBpc1JlYWRPbmx5ID0gdGhpcy5wcm9wcy5yZWFkT25seSxcclxuICAgICAgICAgICAgY2VsbElkID0gMCxcclxuICAgICAgICAgICAgZ3JpZERhdGFTb3VyY2UgPSB0aGlzLnByb3BzLnNvdXJjZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICFpc1JlYWRPbmx5ID9cclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEdyaWRCdXR0b24sIHtvbkNsaWNrOiB0aGlzLmFkZFJvdywgYnV0dG9uVmFsdWU6IFwiQWRkIHJvd1wifSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEdyaWRCdXR0b24sIHtvbkNsaWNrOiB0aGlzLmVkaXRSb3csIGJ1dHRvblZhbHVlOiBcIkVkaXQgcm93XCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEJ1dHRvbiwge29uQ2xpY2s6IHRoaXMuZGVsZXRlUm93LCBidXR0b25WYWx1ZTogXCJEZWxldGUgcm93XCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKtC30LDQs9C+0LvQvtCy0L7QuiovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zLm1hcChmdW5jdGlvbiAoY29sdW1uLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFN0eWxlLndpZHRoID0gY29sdW1uLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ3RoLScgKyBjb2x1bW4uaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uLnNob3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQv9C+0LrQsNC30LDRgtGMINC40Lsg0YHQutGA0YvRgtGMINC60L7Qu9C+0L3QutGDXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ3Nob3cnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAnaGlkZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInRoXCIsIHtzdHlsZTogZ3JpZFN0eWxlLCBjbGFzc05hbWU6IGNsYXNzTmFtZSwga2V5OiAndGgtJyArIGluZGV4LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGU6IFwiY29sXCJ9LCBjb2x1bW4ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBncmlkUm93cy5tYXAoZnVuY3Rpb24gKHJvdywgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG15Q2xhc3MgPSAnbm90Rm9jdXNlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dJZCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpY2tlZEl0ZW0gPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15Q2xhc3MgPSAnZm9jdXNlZCc7IC8vINC/0L7QtNGB0LLQtdGC0LjQvCDQstGL0LHRgNCw0L3QvdGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIHtvbkNsaWNrOiB0aGlzLmhhbmRsZUNlbGxDbGljay5iaW5kKHRoaXMsaW5kZXgpLCBjbGFzc05hbWU6IG15Q2xhc3MsIGtleTogJ3RyLScraW5kZXh9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkQ29sdW1ucy5tYXAoZnVuY3Rpb24gKGNlbGwsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRTdHlsZS53aWR0aCA9IGNlbGwud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbGFzc05hbWUgPSAnc2hvdyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLnNob3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINC/0L7QutCw0LfQsNGC0Ywg0LjQuyDRgdC60YDRi9GC0Ywg0LrQvtC70L7QvdC60YM/INC40YHQv9C70LvQtNGM0LfRg9C10Lwg0LrQu9Cw0YHRgS4g0JTQvtC70LbQtdC9INCx0YvRgtGMINC/0YDQvtC/0LjRgdCw0L0g0LIgY3NzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAnc2hvdyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAnaGlkZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE15Q2VsbCwge2NlbGw6IGNlbGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGNlbGwuaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0lkOiByb3dJZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWREYXRhU291cmNlOiBncmlkRGF0YVNvdXJjZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBpc1JlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGdyaWRTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3dbY2VsbC5pZF0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGluZGV4LCBpZDogY2VsbElkKyt9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGF0YUdyaWQ7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtZGF0YS1ncmlkLmpzeFxuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgTXlCdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdNeUJ1dHRvbicsXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMuYnV0dG9uVmFsdWUsXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQnV0dG9uQ2xpY2sgfSk7XG4gICAgfSxcblxuICAgIGhhbmRsZUJ1dHRvbkNsaWNrOiBmdW5jdGlvbiBoYW5kbGVCdXR0b25DbGljaygpIHtcbiAgICAgICAgLy8g0LLQtdGA0L3QtdC8INCyINC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7RgdGC0L7Rj9C90LjQuSDRgdC+0LHRi9GC0LjQtSDQutC70LjQulxuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNeUJ1dHRvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbXlidXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBNb2RhbFBhZ2UgPSByZXF1aXJlKCcuL21vZGFsUGFnZS5qc3gnKSxcclxuICAgIFNlbGVjdCA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LXNlbGVjdC5qc3gnKSxcclxuICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LXRleHQuanN4JyksXHJcbiAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4vZG9jLWlucHV0LW51bWJlci5qc3gnKTtcclxuXHJcblxyXG52YXIgQXJ2R3JpZFJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJBcnZHcmlkUm93XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByb3c6IHRoaXMucHJvcHMuZ3JpZFJvd0RhdGEsIGNoZWNrZWQ6IGZhbHNlLCB3YXJuaW5nOiAnJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW9kYWxQYWdlQ2xpY2s6IGZ1bmN0aW9uIChidG5FdmVudCkge1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQvtGC0LDQtdGCINGB0L7QsdGL0YLQuNC1INC60LvQuNC6XHJcbiAgICAgICAgdmFyIGNvbXBvbmVudHMgPSBbJ25vbWlkJywgJ2tvZ3VzJywgJ2hpbmQnLCAna2JtJywgJ2tibXRhJywgJ3N1bW1hJ10sXHJcbiAgICAgICAgICAgIGRhdGEgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcclxuICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LrQsFxyXG5cclxuICAgICAgICAgICAgLy8g0YHQvtCx0LjRgNCw0LXQvCDQtNCw0L3QvdGL0LUg0LTQu9GPINC+0YLQv9GA0LDQstC60Lgg0L3QsCDQvtCx0YDQsNCx0L7RgtC60YNcclxuICAgICAgICAgICAgY29tcG9uZW50cy5tYXAoZnVuY3Rpb24oY29tcG9uZW50KSAge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoKHtuYW1lOiBjb21wb25lbnQsIHZhbHVlOiB0aGlzLnJlZnNbY29tcG9uZW50XS5zdGF0ZS52YWx1ZX0pO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvcHMubW9kYWxQYWdlQ2xpY2soYnRuRXZlbnQsIGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uIChlLCBuYW1lKSB7XHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINC90LAg0YTQvtGA0LzQtVxyXG4gICAgICAgIHZhciB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5zdGF0ZS5yb3dbbmFtZV0gJiYgbmFtZSA9PSAnbm9taWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmc1sna29ndXMnXS5zZXRTdGF0ZSh7dmFsdWU6IDAuMDAwfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmc1snaGluZCddLnNldFN0YXRlKHt2YWx1ZTogMC4wMH0pO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnNbJ2tibSddLnNldFN0YXRlKHt2YWx1ZTogMC4wMH0pO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnNbJ2tibXRhJ10uc2V0U3RhdGUoe3ZhbHVlOiAwLjAwfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmc1snc3VtbWEnXS5zZXRTdGF0ZSh7dmFsdWU6IDAuMDB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWNhbGNSb3dTdW1tKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVJbnB1dDogZnVuY3Rpb24gKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgLy8g0L/QtdGA0LXRgdGH0LXRgiDRgdGD0LzQvFxyXG4gICAgICAgIHRoaXMucmVjYWxjUm93U3VtbSgpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVjYWxjUm93U3VtbTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBrb2d1cyA9IE51bWJlcih0aGlzLnJlZnNbJ2tvZ3VzJ10uc3RhdGUudmFsdWUpLFxyXG4gICAgICAgICAgICBoaW5kID0gTnVtYmVyKHRoaXMucmVmc1snaGluZCddLnN0YXRlLnZhbHVlKSxcclxuICAgICAgICAgICAga2JtdGEgPSBrb2d1cyAqIGhpbmQsXHJcbiAgICAgICAgICAgIGtibSA9IGtvZ3VzICogaGluZCAqIDAuMjAsIC8vINCy0YDQvNC10L3QvdC+XHJcbiAgICAgICAgICAgIHN1bW1hID0ga2JtdGEgKyBrYm07XHJcbiAgICAgICAgdGhpcy5yZWZzWydrYm0nXS5zZXRTdGF0ZSh7dmFsdWU6IGtibX0pO1xyXG4gICAgICAgIHRoaXMucmVmc1sna2JtdGEnXS5zZXRTdGF0ZSh7dmFsdWU6IGtibXRhfSk7XHJcbiAgICAgICAgdGhpcy5yZWZzWydzdW1tYSddLnNldFN0YXRlKHt2YWx1ZTogc3VtbWF9KTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRlRm9ybSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB2YWxpZGF0ZUZvcm06IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyB3aWxsIGNoZWNrIHZhbHVlcyBvbiB0aGUgZm9ybSBhbmQgcmV0dXJuIHN0cmluZyB3aXRoIHdhcm5pbmdcclxuICAgICAgICB2YXIgd2FybmluZyA9ICcnO1xyXG4gICAgICAgIC8vINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INC/0YDQvtCy0LXRgNC60Lgg0YTQvtGA0LzRiyDQvdCwINCy0LDQu9C40LTQvdC+0YHRgtGMXHJcbiAgICAgICAgaWYgKCF0aGlzLnJlZnNbJ25vbWlkJ10uc3RhdGUudmFsdWUpIHdhcm5pbmcgPSB3YXJuaW5nICsgJyDQutC+0LQg0YPRgdC70YPQs9C4JztcclxuICAgICAgICBpZiAoIXRoaXMucmVmc1sna29ndXMnXS5zdGF0ZS52YWx1ZSkgd2FybmluZyA9IHdhcm5pbmcgKyAnINC60L7Quy3QstC+JztcclxuICAgICAgICBpZiAoIXRoaXMucmVmc1snaGluZCddLnN0YXRlLnZhbHVlKSB3YXJuaW5nID0gd2FybmluZyArICcg0YbQtdC90LAnO1xyXG5cclxuICAgICAgICBpZiAod2FybmluZy5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICAgIC8vINC10YHRgtGMINC/0YDQvtCx0LvQtdC80YtcclxuICAgICAgICAgICAgd2FybmluZyA9ICfQntGC0YHRg9GC0YHQstGD0Y7RgiDQtNCw0L3QvdGL0LU6JyArIHdhcm5pbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NoZWNrZWQ6IHRydWUsIHdhcm5pbmc6IHdhcm5pbmd9KTtcclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBAdG9kbyDQstGL0L3QtdGB0YLQuCDQsiBjc3NcclxuICAgICAgICB2YXIgc3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcclxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgIG1hcmdpbjogJzEwJSAzMCUgMTAlIDMwJScsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6ICcxJyxcclxuICAgICAgICAgICAgdG9wOiAnMTAwcHgnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIHJvdyA9IHRoaXMuc3RhdGUucm93LFxyXG4gICAgICAgICAgICB2YWxpZGF0ZU1lc3NhZ2UgPSB0aGlzLnN0YXRlLndhcm5pbmcsXHJcbiAgICAgICAgICAgIGJ1dHRvbk9rUmVhZE9ubHkgPSB2YWxpZGF0ZU1lc3NhZ2UubGVuZ3RoID4gMCB8fCAhdGhpcy5zdGF0ZS5jaGVja2VkO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZX0+XHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCIubW9kYWxQYWdlXCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxQYWdlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZU5hbWU6IFwiUmVhIGxpc2FtaW5lIC8gcGFyYW5kYW1pbmVcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge3RpdGxlOiBcIlRlZW51c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibm9taWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcIm5vbWVuY2xhdHVyZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvazogXCJBUlZcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5ub21pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHJvdy5rb29kLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJub21pZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlRlZW51c2Uga29vZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7dGl0bGU6IFwiS29ndXMgXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtvZ3VzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LmtvZ3VzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiZmFsc2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrb2d1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlSW5wdXR9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge3RpdGxlOiBcIkhpbmQgXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImhpbmRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cuaGluZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcImZhbHNlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIHJlZjogXCJoaW5kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVJbnB1dH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7dGl0bGU6IFwiU3VtbWEga2JtLXRhOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2JtdGFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cua2JtdGEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwia2JtdGFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHt0aXRsZTogXCJLw6RpYmVtYWtzOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2JtXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LmtibSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcInRydWVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrYm1cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLmhhbmRsZUlucHV0fSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHt0aXRsZTogXCJTdW1tYTogXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LnN1bW1hLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVJbnB1dH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHZhbGlkYXRlTWVzc2FnZSkpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5cclxuLypcclxuIDxkaXY+XHJcbiB7YnV0dG9uT2tSZWFkT25seSA/XHJcbiA8YnV0dG9uIGRpc2FibGVkPiBPayA8L2J1dHRvbj46XHJcbiA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMubW9kYWxQYWdlQ2xpY2suYmluZCh0aGlzLCdPaycpfT4gT2sgPC9idXR0b24+XHJcbiB9XHJcbiA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMubW9kYWxQYWdlQ2xpY2suYmluZCh0aGlzLCdDYW5jZWwnKX0+IENhbmNlbDwvYnV0dG9uPlxyXG4gPC9kaXY+XHJcbiAqL1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXJ2R3JpZFJvdztcclxuXHJcbi8qXHJcbiA8SW5wdXRUZXh0IHRpdGxlPSdLb29kICcgbmFtZT0na29vZCcgdmFsdWU9e3Jvdy5rb29kfSByZWFkT25seT17ZmFsc2V9XHJcbiBkaXNhYmxlZD1cImZhbHNlXCIgcmVmPSdrb29kJyA+PC9JbnB1dFRleHQ+XHJcbiAqL1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYXJ2LWdyaWQtcm93LmpzeFxuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IElucHV0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIklucHV0XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSwgXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5IHx8IGZhbHNlLCBcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdHJ1ZSxcclxuICAgICAgICAgICAgdmFsaWQ6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJpbmREYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICBtaW46LTk5OTk5OTk5OSxcclxuICAgICAgICAgICAgbWF4OiA5OTk5OTk5OTlcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpIHtcclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogMH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZSwgZGlzYWJsZWQ6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkYXRhJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbmV3VmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IGRhdGFbdGhpcy5wcm9wcy5uYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6ZnVuY3Rpb24gKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdC10L3QuNGPINCx0YPQtNGD0YIg0L7RgtGA0LDQttCw0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDRgtCw0LrQuNC1INC10YHRgtGMXHJcbiAgICAgICAgdmFyIHJldHVybnZhbHVlID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSkge1xyXG4gICAgICAgICAgICB2YXIgcmV0dXJudmFsdWUgPSAobmV4dFN0YXRlLnZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlIHx8XHJcbiAgICAgICAgICAgIG5leHRTdGF0ZS5yZWFkT25seSAhPT0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fFxyXG4gICAgICAgICAgICBuZXh0U3RhdGUuZGlzYWJsZWQgIT09IHRoaXMuc3RhdGUuZGlzYWJsZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0dXJudmFsdWU7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTpmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBmaWVsZFZhbHVlID0gTnVtYmVyKGUudGFyZ2V0LnZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKGZpZWxkVmFsdWUgPj0gTnVtYmVyKHRoaXMucHJvcHMubWluKSB8fCBmaWVsZFZhbHVlIDw9IE51bWJlcih0aGlzLnByb3BzLm1heCkpIHtcclxuICAgICAgICAgICAgLy8g0LfQsNC00LDQvdC90L7QtSDQvtCz0YDQsNC90LjRh9C10L3QuNC1INC90LUg0YDQsNCx0L7RgtCw0LXRgiDQv9GA0Lgg0YDRg9GH0L3QvtC8INCy0LLQvtC00LUg0YHRg9C80LwsINC+0YLRgNCw0LHQvtGC0LDQtdC8INC10LPQvlxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYmluZERhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vINC/0YDQuNGP0LLRj9C30LrQsCDQuiDQtNCw0L3QvdGL0LxcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgLy8g0L/QvtC70YPRh9C40YLRjCDQt9C90LDRh9C10L3QuNC1XHJcbiAgICAgICAgICAgICAgICBkYXRhW3RoaXMucHJvcHMubmFtZV0gPSBmaWVsZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0YHQvNC+0YLRgNC40Lwg0Log0YfQtdC80YMg0L/RgNC40LLRj9C30LDQvSDRgdC10LvQtdC60YIg0Lgg0L7RgtC00LDQuNC8INC10LPQviDQvdCw0LLQtdGA0YVcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZSwgdGhpcy5wcm9wcy5uYW1lKTsgLy8g0LIg0YHQu9GD0YfQsNC1INC10YHQu9C4INC30LDQtNCw0L0g0L7QsdGA0LDQsdC+0YLRh9C40Log0L3QsCDQstC10YDRhdC90LXQvCDRg9GA0L7QstC90LUsINC+0YLQtNCw0LTQuNC8INC+0LHRgNCw0LHQvtGC0LrRgyDRgtGD0LTQsFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkJsdXI6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0YLQsNC60L7QuSDQvNC10YLQvtC0INC/0LXRgNC10LTQsNC9INGB0LLQtdGA0YXRgywg0YLQviDQstC10YDQvdC10YIg0LXQs9C+INC+0LHRgNCw0YLQvdC+XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25CbHVyKHRoaXMuc3RhdGUudmFsdWUsIHRoaXMucHJvcHMubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpbnB1dENsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICcnICsgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dERpc2FibGVkID0gdGhpcy5zdGF0ZS5kaXNhYmxlZCB8fCAnZmFsc2UnLFxyXG4gICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLm5hbWUsXHJcbiAgICAgICAgICAgIGlucHV0TWluVmFsdWUgPSB0aGlzLnByb3BzLm1pbiB8fCAtOTk5OTk5OTk5LFxyXG4gICAgICAgICAgICBpbnB1dE1heFZhbHVlID0gdGhpcy5wcm9wcy5tYXggfHwgOTk5OTk5OTk5O1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRSZWFkT25seSkge1xyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IGlucHV0Q2xhc3NOYW1lICsgJyBkb2MtaW5wdXQtcmVhZG9ubHknO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlucHV0RGlzYWJsZWQgPT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7aHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJudW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIlxcXFxkKyhcXFxcLlxcXFxkezJ9KT9cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICApKVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHRoaXMucHJvcHMudGl0bGUpXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcIm51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluOiBpbnB1dE1pblZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiBpbnB1dE1heFZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogXCIwLjAxXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIlxcXFxkKyhcXFxcLlxcXFxkezJ9KT9cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLm9uQmx1cn1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxyXG4gICAgfSxcclxufSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm49e3RoaXMucHJvcHMucGF0dGVybn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1udW1iZXIuanN4XG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyDQstC40LTQttC10YIsINC+0LHRitC10LTQuNC90Y/RjtGJ0LjQuSDRgdC10LvQtdC60YIg0Lgg0YLQtdC60YHRgi4g0LIg0YLQtdC60YHRgtC1INC+0YLRgNCw0LbQsNGO0YLQvNGPINC00LDQvdC90YvQtSwg0YHQstGP0LfQsNC90L3Ri9C1INGBINGB0LXQu9C10LrRgtC+0LxcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIFNlbGVjdCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LXNlbGVjdC5qc3gnKSxcclxuICAgIFRleHQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0YXJlYS5qc3gnKTtcclxuXHJcblxyXG5jb25zdCBTZWxlY3RUZXh0V2lkZ2V0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlNlbGVjdFRleHRXaWRnZXRcIixcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJywgLy8g0L/QvtC50LTQtdGCINCyINGC0LXQutGB0YLQvtCy0YPRjiDQvtCx0LvQsNGB0YLRjFxyXG4gICAgICAgICAgICBsaWJEYXRhIDogW11cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZVNlbGVjdE9uQ2hhbmdlOiBmdW5jdGlvbihlLCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQvtGC0LDQtdC8INGB0L7QsdGL0YLQuNC1INC4INC/0L7QvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUubGliRGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZyA9IHRoaXMuZ2V0RGVzY3JpcHRpb25CeVNlbGVjdFZhbHVlKHRoaXMuc3RhdGUubGliRGF0YSkgfHwgbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IHZhbHVlLCBkZXNjcmlwdGlvbjogc2VsZ30pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1INCx0LjQsdC70LjQvtGC0LXQui5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vINCx0YPQtNC10Lwg0L7RgtGB0LvQtdC20LjQstCw0YLRjCDQvNC+0LzQtdC90YIg0LrQvtCz0LTQsCDRgdC/0YDQsNCy0L7Rh9C90LjQuiDQsdGD0LTQtdGCINC30LDQs9GA0YPQttC10L1cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmxpYnMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgbGV0IHZhc3R1cyA9IEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSksICAvLyB3aWxsIHdhdGNoIGxpYnMgY2hhbmdlIChmcm9tIHNlcnZlcilcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBuZXdWYWx1ZS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gc2VsZi5wcm9wcy5saWJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbGliID0gZGF0YVswXS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgc2VsZyA9IGRhdGFbMF0uZGF0YS5sZW5ndGg/IHNlbGYuZ2V0RGVzY3JpcHRpb25CeVNlbGVjdFZhbHVlKGxpYikudG9TdHJpbmcoKTogJyc7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtsaWJEYXRhOiBsaWIsIGRlc2NyaXB0aW9uOiBzZWxnfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldERlc2NyaXB0aW9uQnlTZWxlY3RWYWx1ZTogZnVuY3Rpb24obGliRGF0YSkge1xyXG4gICAgICAvLyDQvdCw0LnQtNC10Lwg0LIg0YHQv9GA0LDQstC+0YfQvdC40LrQtSDQvtC/0LjRgdCw0L3QuNC1INC4INGD0YHRgtCw0L3QvtCy0LjQvCDQtdCz0L4g0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgbGV0IGxpYlJvdyA9IGxpYkRhdGEuZmlsdGVyKGZ1bmN0aW9uKGxpYikge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsaWIuaWQgPT0gdGhpcy5wcm9wcy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsaWI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSksXHJcbiAgICAgICAgICAgIHNlbGcgPSAnJyxcclxuICAgICAgICAgICAgc2VsZ09iamVjdCA9IGxpYlJvdy5sZW5ndGggPyBsaWJSb3dbMF0uZGV0YWlsczogICcnO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eSBpbiBzZWxnT2JqZWN0ICkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZ09iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcclxuICAgICAgICAgICAgICAgIC8vINC40L3RgtC10YDQtdGB0YPRjtGCINGC0L7Qu9GM0LrQviBcItGB0L7QsdGB0YLQstC10L3QvdGL0LVcIiDRgdCy0L7QudGB0YLQstCwINC+0LHRitC10LrRgtCwXHJcbiAgICAgICAgICAgICAgICBzZWxnID0gc2VsZyArIHByb3BlcnR5ICsgJzonICsgc2VsZ09iamVjdFtwcm9wZXJ0eV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGc7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICBsaWJzOiB0aGlzLnByb3BzLmxpYnMsIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVmOiB0aGlzLnByb3BzLnJlZiwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZVNlbGVjdE9uQ2hhbmdlfVxyXG4gICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICBuYW1lOiBcIm11dWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkRva1Byb3BcIiwgXHJcbiAgICAgICAgICAgICAgICAgIHJlZjogXCJkb2tQcm9wU2VsZ1wiLCBcclxuICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZGVzY3JpcHRpb24sIFxyXG4gICAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAndHJ1ZScsIFxyXG4gICAgICAgICAgICAgICAgICB3aWR0aDogXCI4NSVcIn1cclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RUZXh0V2lkZ2V0O1xyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1zZWxlY3QtdGV4dC5qc3hcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciByZWxhdGVkRG9jdW1lbnRzID0ge1xyXG4gICAgcmVsYXRlZERvY3VtZW50czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XHJcbiAgICAgICAgbGV0IHJlbGF0ZWREb2N1bWVudHMgPSB0aGlzLnN0YXRlLnJlbGF0aW9ucztcclxuICAgICAgICBpZiAocmVsYXRlZERvY3VtZW50cy5sZW5ndGggPiAwICkge1xyXG4gICAgICAgICAgICByZWxhdGVkRG9jdW1lbnRzLmZvckVhY2goZnVuY3Rpb24oZG9jKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9jLmlkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsCDRg9C90LjQutCw0LvRjNC90L7RgdGC0Ywg0YHQv9C40YHQutCwINC00L7QutGD0LzQtdC90YLQvtCyXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlzRXhpc3RzID0gdGhpcy5wYWdlcy5maW5kKGZ1bmN0aW9uKHBhZ2UpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGFnZS5kb2NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhZ2UuZG9jSWQgPT0gZG9jLmlkICYmIHBhZ2UuZG9jVHlwZUlkID09IGRvYy5kb2NfdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINCyINC80LDRgdGB0LjQstC1INC90LXRgiwg0LTQvtCx0LDQstC40Lwg0YHRgdGL0LvQutGDINC90LAg0LTQvtC60YPQvNC10L3RglxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2VzLnB1c2goe2RvY1R5cGVJZDogZG9jLmRvY190eXBlLCBkb2NJZDpkb2MuaWQsIHBhZ2VOYW1lOmRvYy5uYW1lICsgJyBpZDonICsgZG9jLmlkfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlbGF0ZWREb2N1bWVudHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9taXhpbi9yZWxhdGVkRG9jdW1lbnRzLmpzeFxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdmFsaWRhdGVGb3JtID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtKHNlbGYsIHJlcUZpZWxkcykge1xuXG4gICAgLy8g0LLQsNC70LjQtNCw0YbQuNGPINGE0L7RgNC80YtcbiAgICB2YXIgd2FybmluZyA9ICcnLFxuICAgICAgICByZXF1aXJlZEZpZWxkcyA9IHJlcUZpZWxkcyB8fCBbXSxcbiAgICAgICAgbm90UmVxdWlyZWRGaWVsZHMgPSBbXSxcbiAgICAgICAgbm90TWluTWF4UnVsZSA9IFtdO1xuXG4gICAgY29uc29sZS5sb2coJ3ZhbGlkYXRlRm9ybSBzZWxmJywgc2VsZik7XG4gICAgcmVxdWlyZWRGaWVsZHMuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcblxuICAgICAgICB2YXIgY29tcG9uZW50ID0gc2VsZi5yZWZzW2ZpZWxkLm5hbWVdLFxuICAgICAgICAgICAgdmFsdWUgPSBjb21wb25lbnQuc3RhdGUudmFsdWUsXG4gICAgICAgICAgICBwcm9wcyA9IGNvbXBvbmVudC5wcm9wcyxcbiAgICAgICAgICAgIHRpdGxlID0gcHJvcHMudGl0bGU7XG5cbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgbm90UmVxdWlyZWRGaWVsZHMucHVzaCh0aXRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LrQsCDQvdCwINC80LjQvSAuINC80LDQutGBINC30L3QsNGH0LXQvdC40Y9cblxuICAgICAgICAvLyB8fCB2YWx1ZSAmJiB2YWx1ZSA+IHByb3BzLm1heFxuICAgICAgICB2YXIgY2hlY2tWYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIHN3aXRjaCAoZmllbGQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRyb2xsZWRWYWx1ZUQgPSBEYXRlLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoZmllbGQubWluICYmIGNvbnRyb2xsZWRWYWx1ZUQgPCBmaWVsZC5taW4gJiYgZmllbGQubWF4ICYmIGNvbnRyb2xsZWRWYWx1ZUQgPiBmaWVsZC5tYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRyb2xsZWRWYWx1ZU4gPSBOdW1iZXIodmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkLm1pbiAmJiBjb250cm9sbGVkVmFsdWVOID09PSAwIHx8IGZpZWxkLm1pbiAmJiBjb250cm9sbGVkVmFsdWVOIDwgZmllbGQubWluICYmIGZpZWxkLm1heCAmJiBjb250cm9sbGVkVmFsdWVOID4gZmllbGQubWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgY2hlY2tWYWx1ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICovXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoZWNrVmFsdWUpIHtcbiAgICAgICAgICAgIG5vdE1pbk1heFJ1bGUucHVzaCh0aXRsZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChub3RSZXF1aXJlZEZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHdhcm5pbmcgPSAncHV1ZHViIHZhamFsaWt1ZCBhbmRtZWQgKCcgKyBub3RSZXF1aXJlZEZpZWxkcy5qb2luKCcsICcpICsgJykgJztcbiAgICB9XG5cbiAgICBpZiAobm90TWluTWF4UnVsZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHdhcm5pbmcgPSB3YXJuaW5nICsgJyBtaW4vbWF4IG9uIHZhbGUoJyArIG5vdE1pbk1heFJ1bGUuam9pbignLCAnKSArICcpICc7XG4gICAgfVxuXG4gICAgaWYgKHdhcm5pbmcubGVuZ3RoID09IDApIHtcbiAgICAgICAgd2FybmluZyA9ICdPayc7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ3ZhbGlkYXRpb24gd2FybmluZzonLCB3YXJuaW5nKTtcbiAgICByZXR1cm4gd2FybmluZzsgLy8g0LLQtdGA0L3QtdC8INC40LfQstC10YnQtdC90LjQtSDQvtCxINC40YLQvtCz0LDRhSDQstCw0LvQuNC00LDRhtC40Lhcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsaWRhdGVGb3JtO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvbWl4aW4vdmFsaWRhdGVGb3JtLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbnZhciBkb2NTdG9yZSA9IGZsdXguY3JlYXRlU3RvcmUoe1xuICAgIGlkOiAnZG9jU3RvcmUnLFxuICAgIGluaXRpYWxTdGF0ZToge1xuICAgICAgICBncmlkQ2VsbEVkaXRlZDogMCwgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDQsiDQs9GA0LjQtNC1INGA0LXQtNCw0LrRgtC40YDRg9C10LzRg9GOINGP0YfQtdC50LrRg1xuICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgZGV0YWlsczogW10sIC8vINC00LDQvdC90YvQtSDQvdCwINCz0YDQuNC0XG4gICAgICAgIHJlbGF0aW9uczogW10sIC8vINC00LDQvdC90YvQtSDQvdCwINGB0LLRj9C30LDQvdC90YvQtSDQtNC+0LrRg9C80LXQvdGC0YtcbiAgICAgICAgZ3JpZENvbmZpZzogW10sIC8vINC60L7QvdGE0LjQs9GD0YDQsNGG0LjRjyDQs9GA0LjQtNCwXG4gICAgICAgIGdyaWROYW1lOiAnJyxcbiAgICAgICAgZG9jSWQ6IDAsXG4gICAgICAgIGRlbGV0ZWQ6IGZhbHNlLFxuICAgICAgICBlZGl0ZWQ6IGZhbHNlLFxuICAgICAgICBzYXZlZDogdHJ1ZSxcbiAgICAgICAgZ3JpZFJvd0lkOiAwLFxuICAgICAgICBsaWJzOiBbe1xuICAgICAgICAgICAgaWQ6ICdhc3V0dXNlZCcsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW11cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGRhdGE6W3tpZDoxLCBuYW1lOlwiQXN1dHVzIDFcIn0se2lkOjIsIG5hbWU6XCJBc3V0dXMgMlwifSx7aWQ6MywgbmFtZTpcIkFzdXR1cyAzXCJ9IF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICdub21lbmNsYXR1cmUnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAna29udG9kJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ3Byb2plY3QnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAndHVubnVzJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ2FhJyxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgcGFyYW1zOiBbXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ2FydmVkU2lzc2UnLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICBwYXJhbXM6IFtudWxsLCBudWxsXSxcbiAgICAgICAgICAgIGZpZWxkczogWydhc3V0dXNpZCcsICdhcnZpZCddIC8vINC40LQg0LrQvtC90YLRgC3QsNCz0LXQvdGC0LAg0Lgg0L3QvtC80LXRgCDRgdGH0LXRgtCwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnYXJ2ZWRWYWxqYScsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW251bGwsIG51bGxdLFxuICAgICAgICAgICAgZmllbGRzOiBbJ2FzdXR1c2lkJywgJ2FydmlkJ10gLy8g0LjQtCDQutC+0L3RgtGALdCw0LPQtdC90YLQsCDQuCDQvdC+0LzQtdGAINGB0YfQtdGC0LBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICd1c2VycycsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW11cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICdkb2tQcm9wcycsXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIHBhcmFtczogW251bGwsIG51bGxdLFxuICAgICAgICAgICAgZmllbGRzOiBbJ2RvY190eXBlX2lkJywgJ3Jla3ZpZCddIC8vINGC0LjQvyDQtNC+0LrRg9C80LXQvdGC0LAg0Lgg0LjQtCDRg9GH0YDQtdC20LTQtdC90LjRj1xuICAgICAgICB9XSxcbiAgICAgICAgYnBtOiBbXSwgLy8g0LTQsNC90L3Ri9C1INCR0J8g0LTQvtC60YPQvNC10L3RgtCwXG4gICAgICAgIHRhc2s6IHt9IC8vINGC0LXQutGD0YnQsNGPINC30LDQtNCw0YfQsFxuICAgIH0sXG4gICAgYWN0aW9uQ2FsbGJhY2tzOiB7XG4gICAgICAgIHNldExpYnNGaWx0ZXI6IGZ1bmN0aW9uIHNldExpYnNGaWx0ZXIodXBkYXRlciwgbGliTmFtZSwgZmlsdGVyKSB7XG5cbiAgICAgICAgICAgIC8vINC40YnQtdC8INGB0L/RgNCw0LLQvtGH0L3QuNC6XG4gICAgICAgICAgICB2YXIgbGlicyA9IHRoaXMubGlicztcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpYnNbaV0uaWQgPT0gbGliTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaWJzW2ldLmZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2xvYWRMaWJzJywgbGliTmFtZSk7IC8v0L3QvtCy0YvQtSDQtNCw0L3QvdGL0LVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ3JpZFJvd0lkQ2hhbmdlOiBmdW5jdGlvbiBncmlkUm93SWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnZ3JpZFJvd0lkQ2hhbmdlIGNhbGxlZDonICsgdmFsdWUpO1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBncmlkUm93SWQ6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBsb2FkTGliczogZnVuY3Rpb24gbG9hZExpYnModXBkYXRlciwgbGlic1RvVXBkYXRlKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdsb2FkTGlicyBjYWxsZWQ6JyArIEpTT04uc3RyaW5naWZ5KGxpYnNUb1VwZGF0ZSkpO1xuICAgICAgICAgICAgLy8g0LPRgNGD0LfQuNC8INGB0L/RgNCw0LLQvtGH0L3QuNC60LhcbiAgICAgICAgICAgIHZhciBsaWJzID0gdGhpcy5saWJzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmICghbGlic1RvVXBkYXRlIHx8IGl0ZW0uaWQgPT0gbGlic1RvVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8g0LLRi9C30YvQstCw0LXQvCDQvtCx0L3QvtCy0LvQtdC90LjQtSDRgdC/0YDQsNCy0L7Rh9C90LjQutCwINGBINGB0LXRgNCy0LXRgNCwXG4gICAgICAgICAgICBsaWJzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgbGliUGFyYW1zID0gW107XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpYlBhcmFtcyA9IGl0ZW0ucGFyYW1zO1xuICAgICAgICAgICAgICAgICAgICAvLyDRg9GB0YLQsNC90L7QstC40Lwg0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDQt9Cw0L/RgNC+0YHQsFxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpYlBhcmFtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGliUGFyYW1zW2ldID0gdGhpcy5kYXRhW2l0ZW0uZmllbGRzW2ldXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfbG9hZExpYnMoaXRlbS5pZCwgbGliUGFyYW1zKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICBzYXZlRGF0YTogZnVuY3Rpb24gc2F2ZURhdGEodXBkYXRlcikge1xuICAgICAgICAgICAgc2F2ZURvYygpO1xuICAgICAgICB9LFxuICAgICAgICBleGVjdXRlVGFzazogZnVuY3Rpb24gZXhlY3V0ZVRhc2sodXBkYXRlciwgdGFzaykge1xuICAgICAgICAgICAgX2V4ZWN1dGVUYXNrKHRhc2spO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGVEb2M6IGZ1bmN0aW9uIGRlbGV0ZURvYyh1cGRhdGVyKSB7XG4gICAgICAgICAgICBfZGVsZXRlRG9jKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdyaWRDZWxsRWRpdGVkQ2hhbmdlOiBmdW5jdGlvbiBncmlkQ2VsbEVkaXRlZENoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsZWQgZ3JpZENlbGxFZGl0ZWRDaGFuZ2U6JyArIHZhbHVlKTtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZ3JpZENlbGxFZGl0ZWQ6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBkb2NJZENoYW5nZTogZnVuY3Rpb24gZG9jSWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgLy8g0YfQuNGB0YLQuNC8INC00LDQvdC90YvQtSDQs9GA0LjQtNCwXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RvY0lkQ2hhbmdlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZG9jSWQ6IHZhbHVlIH0pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFDaGFuZ2U6IGZ1bmN0aW9uIGRhdGFDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCe0YLRgdC70LXQttC40LLQsNC10YIg0LfQsNCz0YDRg9C30LrRgyDQtNCw0L3QvdGL0YUg0LTQvtC60YPQvNC10L3RgtCwXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YUNoYW5nZScsIHZhbHVlLCBfdHlwZW9mKHZhbHVlLmFydmlkKSk7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRhdGE6IHZhbHVlIH0pO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlLmFydmlkICE9PSAndW5kZWZpbml0ZScpIHtcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQutC+0L3RgtGA0LDQs9C10L3RgiDQvtGC0YHRg9GC0YHQstGD0LXRgiwg0YLQviDQuCDQv9Cw0YDQsNC80LXRgtGAINC60L7QvdGC0YDQsNCz0LXQvdGC0LAg0YLQsNC60LbQtSDQvtCx0L3Rg9C70LjQvFxuICAgICAgICAgICAgICAgIHZhbHVlLmFydmlkID0gdmFsdWUuYXN1dHVzaWQgPyB2YWx1ZS5hcnZpZCA6IG51bGw7XG4gICAgICAgICAgICAgICAgLy8g0LfQsNC00LDQtNC40Lwg0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDRgdC/0YDQsNCy0L7Rh9C90LjQutCwINGB0YfQtdGC0L7QslxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NldExpYnNGaWx0ZXInLCAnYXJ2ZWRTaXNzZScsIFt2YWx1ZS5hc3V0dXNpZCwgdmFsdWUuYXJ2aWRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYnBtQ2hhbmdlOiBmdW5jdGlvbiBicG1DaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCX0LDQs9GA0YPQt9C60LAg0JHQn1xuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZygnYnBtQ2hhbmdlJywgdmFsdWUpO1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBicG06IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZWxhdGlvbnNDaGFuZ2U6IGZ1bmN0aW9uIHJlbGF0aW9uc0NoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQt9Cw0LPRgNGD0LfQutGDINC00LDQvdC90YvRhSDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC10Lkg0LTQvtC60YPQvNC10L3RgtCwXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHJlbGF0aW9uczogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRldGFpbHNDaGFuZ2U6IGZ1bmN0aW9uIGRldGFpbHNDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCe0YLRgdC70LXQttC40LLQsNC10YIg0LfQsNCz0YDRg9C30LrRgyDQtNCw0L3QvdGL0YUg0LPRgNC40LTQsCDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZGV0YWlsczogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdyaWRDb25maWdDaGFuZ2U6IGZ1bmN0aW9uIGdyaWRDb25maWdDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCe0YLRgdC70LXQttC40LLQsNC10YIg0LfQsNCz0YDRg9C30LrRgyDQutC+0L3RhNC40LPRg9GA0LDRhtC40Lgg0LPRgNC40LTQsFxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBncmlkQ29uZmlnOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlZENoYW5nZTogZnVuY3Rpb24gZGVsZXRlZENoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0LHRi9C70LAg0LLRi9C30LLQsNC90LAg0LrQvdC+0L/QutCwIERlbGV0ZVxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkZWxldGVkOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdGVkQ2hhbmdlOiBmdW5jdGlvbiBlZGl0ZWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCc0LXQvdGP0LXRgtGB0Y8g0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsFxuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBlZGl0ZWQ6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzYXZlZENoYW5nZTogZnVuY3Rpb24gc2F2ZWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINCe0YLRgdC70LXQttC40LLQsNC10YIg0LjQt9C80LXQvdC10L3QuNGPINCyINC00LDQvdC90YvRhSDQuCDQuNC3INGB0L7RhdGA0LDQvdC10L3QuNC1XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHNhdmVkOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbGlic0NoYW5nZTogZnVuY3Rpb24gbGlic0NoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8g0J7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YHQv9GA0LDQstC+0YfQvdC40LrQsNGFXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsaWJzQ2hhbmdlIGNhbGxlZCcsIHZhbHVlKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgbGliczogdmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdyaWROYW1lQ2hhbmdlOiBmdW5jdGlvbiBncmlkTmFtZUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBncmlkTmFtZTogdmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZnVuY3Rpb24gX2RlbGV0ZURvYygpIHtcbiAgICAvLyDQstGL0LfRi9Cy0LDQtdGCINC80LXRgtC+0LQg0YPQtNCw0LvQtdC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAvLyDQstC10YDQvdC10LzRgdGPINCyINGA0LXQs9C40YHRgtGAXG4gICAgLy9yZXF1ZXJ5KCdkZWxldGUnLCBudWxsKTtcbiAgICBkb2N1bWVudC5sb2NhdGlvbiA9ICcvZG9jdW1lbnRzJztcbn07XG5cbmZ1bmN0aW9uIF9leGVjdXRlVGFzayh0YXNrKSB7XG4gICAgLypcclxuICAgICAgICDQktGL0L/QvtC70L3QuNGCINC30LDQv9GA0L7RgSDQvdCwINC40YHQv9C+0LvQvdC10L3QuNC1INC30LDQtNCw0YfQuFxyXG4gICAgICovXG5cbiAgICB2YXIgdGFza3NQYXJhbWV0ZXJzID0ge1xuICAgICAgICBkb2NJZDogZG9jU3RvcmUuZGF0YS5pZCxcbiAgICAgICAgdGFza3M6IHRhc2ssXG4gICAgICAgIGRvY190eXBlX2lkOiBkb2NTdG9yZS5kYXRhLmRvY190eXBlX2lkXG4gICAgfTtcblxuICAgIC8vICAgY29uc29sZS5sb2coJ2V4ZWN1dGVUYXNrOicsIHRhc2ssIHRhc2tzUGFyYW1ldGVycyk7XG5cbiAgICByZXF1ZXJ5KCdleGVjdXRlJywgSlNPTi5zdHJpbmdpZnkodGFza3NQYXJhbWV0ZXJzKSwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyIHx8IGRhdGEucmVzdWx0ID09ICdFcnJvcicpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZygnZXhlY3V0ZVRhc2sgYXJyaXZlZCBkb2NTdG9yZS5kYXRhLmlkLCBkb2NTdG9yZS5kb2NJZCwgZGF0YScsZG9jU3RvcmUuZGF0YS5pZCxkb2NTdG9yZS5kb2NJZCwgIGRhdGEpO1xuXG4gICAgICAgICAgICAvLyDQv9GA0Lgg0YPRgdC/0LXRiNC90L7QvCDQstGL0L/QvtC70L3QtdC90LjQuCDQt9Cw0LTQsNGH0LgsINCy0YvQv9C+0LvQvdC40YLRjCDQv9C10YDQtdCz0YDRg9C30LrRgyDQtNC+0LrRg9C80LXQvdGC0LAgKNCy0YDQtdC80LXQvdC90L4pXG4gICAgICAgICAgICAvL0B0b2RvINC/0L7QtNGC0Y/QvdGD0YLRjCDQuNC30LzQtdC90LXQvdC40Y8g0LHQtdC3INC/0LXRgNC10LPRgNGD0LfQutC4INGB0YLRgNCw0L3QuNGG0YtcbiAgICAgICAgICAgIHJlbG9hZERvY3VtZW50KGRvY1N0b3JlLmRhdGEuaWQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBzYXZlRG9jKCkge1xuICAgIC8vINCy0YvQt9GL0LLQsNC10YIg0LzQtdGC0L7QtCDRgdC+0YXRgNCw0L3QtdC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICB2YXIgc2F2ZURhdGEgPSB7XG4gICAgICAgIGlkOiBkb2NTdG9yZS5kYXRhLmlkLFxuICAgICAgICBkb2NfdHlwZV9pZDogZG9jU3RvcmUuZGF0YS5kb2NfdHlwZV9pZCwgLy8g0LLRi9C90LXRgdC10L3QviDQtNC70Y8g0L/QvtC00LPRgNGD0LfQutC4INC80L7QtNC10LvQuFxuICAgICAgICBkYXRhOiBkb2NTdG9yZS5kYXRhLFxuICAgICAgICBkZXRhaWxzOiBkb2NTdG9yZS5kZXRhaWxzXG4gICAgfTtcblxuICAgIHJlcXVlcnkoJ3NhdmUnLCBKU09OLnN0cmluZ2lmeShzYXZlRGF0YSksIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGVycjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIG5ld0lkID0gZGF0YVswXS5pZDtcbiAgICAgICAgICAgIC8vINC+0LHQvdC+0LLQuNC8INC40LRcbiAgICAgICAgICAgIHNhdmVEYXRhLmRhdGEuaWQgPSBuZXdJZDtcblxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIHNhdmVEYXRhLmRhdGEpOyAvL9C90L7QstGL0LUg0LTQsNC90L3Ri9C1XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NJZENoYW5nZScsIG5ld0lkKTsgLy8g0L3QvtCy0L7QtSDQuNC0XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzYXZlZENoYW5nZScsIHRydWUpOyAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDRgNC10LbQuNC8INGB0L7RhdGA0LDQvdC10L1cbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2VkaXRlZENoYW5nZScsIGZhbHNlKTsgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQtdC20LjQvCDRgdC+0YXRgNCw0L3QtdC9XG5cblxuICAgICAgICAgICAgLy8gcmVsb2FkIGRvY3VtZW50XG4gICAgICAgICAgICByZWxvYWREb2N1bWVudChuZXdJZCk7IC8vQHRvZG8g0LLRi9C/0L7Qu9C90LjRgtGMINC/0LXRgNC10LPRgNGD0LfQutGDINC00LDQvdC90YvRhSDQv9C10YDQtdC3INC/0LXRgNC10LPRgNGD0LfQutC4INGB0YLRgNCw0L3QuNGG0YtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLypcclxuICAgIFxyXG4gICAgICAgIHJlcXVlcnkoJ3NhdmVBbmRTZWxlY3QnLCBKU09OLnN0cmluZ2lmeShzYXZlRGF0YSksIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZXJyO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5pZCAhPT0gc2F2ZURhdGEuZGF0YS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINC+0LHQvdC+0LLQuNC8INC40LRcclxuICAgICAgICAgICAgICAgICAgICBzYXZlRGF0YS5kYXRhLmlkID0gZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnZGF0YUNoYW5nZScsIHNhdmVEYXRhLmRhdGEgKTsgLy/QvdC+0LLRi9C1INC00LDQvdC90YvQtVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbiggJ2RvY0lkQ2hhbmdlJywgZGF0YS5pZCApOyAvLyDQvdC+0LLQvtC1INC40LRcclxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oICdzYXZlZENoYW5nZScsIHRydWUgKTsgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQtdC20LjQvCDRgdC+0YXRgNCw0L3QtdC9XHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnZWRpdGVkQ2hhbmdlJywgZmFsc2UgKTsgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YDQtdC20LjQvCDRgdC+0YXRgNCw0L3QtdC9XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAqL1xufTtcblxuZnVuY3Rpb24gcmVsb2FkRG9jdW1lbnQoZG9jSWQpIHtcbiAgICAvLyByZWxvYWQgZG9jdW1lbnRcblxuICAgIGlmIChkb2NJZCkge1xuICAgICAgICB2YXIgdXJsID0gXCIvZG9jdW1lbnQvXCIgKyBkb2NTdG9yZS5kYXRhLmRvY190eXBlX2lkICsgZG9jSWQ7XG4gICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBfbG9hZExpYnMobGlicmFyeU5hbWUsIGxpYlBhcmFtcykge1xuICAgIC8vICAgIGNvbnNvbGUubG9nKCdsb2FkTGliczonLCBsaWJyYXJ5TmFtZSwgbGliUGFyYW1zKTtcbiAgICB0cnkge1xuXG4gICAgICAgIHJlcXVlcnkoJ3NlbGVjdCcsIEpTT04uc3RyaW5naWZ5KHsgZG9jX3R5cGVfaWQ6IGxpYnJhcnlOYW1lLCBpZDogMCwgcGFyYW1zOiBsaWJQYXJhbXMgfSksIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcblxuICAgICAgICAgICAgdmFyIG5ld0xpYnMgPSBkb2NTdG9yZS5saWJzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIC8vINC40YnQtdC8INC00LDQvdC90YvQtSDRgdC/0YDQsNCy0L7Qu9GH0L3QuNC60LAsINC60L7RgtC+0YDRi9C1INC+0LHQvdC+0LLQuNC70LhcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvYWRMaWJzIGl0ZW06JyArIEpTT04uc3RyaW5naWZ5KGl0ZW0pICsgJyBkYXRhOicgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgICAgICAgICAgdmFyIHJldHVybkRhdGEgPSBpdGVtO1xuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT0gbGlicmFyeU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuRGF0YS5kYXRhID0gZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybkRhdGE7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG5ld0xpYnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsaWJzIGxvYWRlZCcsIG5ld0xpYnMpO1xuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2xpYnNDaGFuZ2UnLCBuZXdMaWJzKTsgLy8g0L/QuNGI0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YXRgNCw0L3QuNC70LjRidC1XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlcXVlcnkoYWN0aW9uLCBwYXJhbWV0ZXJzLCBjYWxsYmFjaykge1xuICAgIC8vINC80LXRgtC+0LQg0L7QsdC10YHQv9C10YfQuNGCINC/0L7Qu9GD0YfQtdC90LjQtSDQtNCw0L3QvdGL0YUg0L7RgiDRgdC10YDQstC10YDQsFxuXG4gICAgdmFyIFVSTCA9ICcvYXBpL2RvYyc7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBVUkwsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtZXRlcnNcbiAgICAgICAgfSxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy8g0LTQvtC70LbQvdGLINC/0L7Qu9GD0YfQuNGC0Ywg0L7QsdGK0LXQutGCXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGRhdGEpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1JlcXVlcnkgZXJyb3I6JywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCcvZXJyb3InLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgbnVsbCk7XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkb2NTdG9yZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL3N0b3Jlcy9kb2Nfc3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IEZvcm0gPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2Zvcm0uanMnKSxcclxuICAgIFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGFnZV9sYWJlbCcpLFxyXG4gICAgSW5wdXRUZXh0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dC5qc3gnKSxcclxuICAgIElucHV0RGF0ZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LWRhdGUuanN4JyksXHJcbiAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LW51bWJlci5qc3gnKSxcclxuICAgIFRvb2xiYXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy10b29sYmFyLmpzeCcpLFxyXG4gICAgRG9jQ29tbW9uID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtY29tbW9uLmpzeCcpLFxyXG4gICAgU2VsZWN0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtc2VsZWN0LmpzeCcpLFxyXG4gICAgVGV4dEFyZWEgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0YXJlYS5qc3gnKSxcclxuICAgIERhdGFHcmlkID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtZGF0YS1ncmlkLmpzeCcpLFxyXG4gICAgR3JpZFJvdyA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvam91cm5hbC1ncmlkLXJvdy5qc3gnKSxcclxuICAgIHJlbGF0ZWREb2N1bWVudHMgPSByZXF1aXJlKCcuLi9taXhpbi9yZWxhdGVkRG9jdW1lbnRzLmpzeCcpO1xyXG5cclxudmFyIGRvY1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2RvY19zdG9yZS5qcycpO1xyXG5cclxuY29uc3QgSm91cm5hbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJKb3VybmFsXCIsXHJcbiAgICBwYWdlczogW3twYWdlTmFtZTogJ0pvdXJuYWwnfV0sXHJcblxyXG4vKlxyXG4gICAgbWl4aW5zOiBbcmVsYXRlZERvY3VtZW50c10sIC8vLCB2YWxpZGF0ZUZvcm1cclxuKi9cclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDRg9GB0YLQsNC90L7QstC40Lwg0LjQt9C90LDRh9Cw0LvRjNC90YvQtSDQtNCw0L3QvdGL0LVcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkb2NEYXRhOiB0aGlzLnByb3BzLmRhdGEucm93LFxyXG4gICAgICAgICAgICBlZGl0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93TWVzc2FnZUJveDogJ25vbmUnLFxyXG4gICAgICAgICAgICBncmlkRGF0YTogdGhpcy5wcm9wcy5kYXRhLmRldGFpbHMsXHJcbiAgICAgICAgICAgIHJlbGF0aW9uczogdGhpcy5wcm9wcy5kYXRhLnJlbGF0aW9ucyxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZzogdGhpcy5wcm9wcy5kYXRhLmdyaWRDb25maWcsXHJcbiAgICAgICAgICAgIGdyaWRSb3dFZGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgZ3JpZFJvd0V2ZW50OiBudWxsLFxyXG4gICAgICAgICAgICBncmlkUm93RGF0YTogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIHZhbGlkYXRpb246ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlLFxyXG4gICAgICAgICAgICByZXF1aXJlZEZpZWxkcyA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAna3B2JyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnRCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluOiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgLSAxKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXg6IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSArIDEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge25hbWU6ICdzZWxnJywgdHlwZTogJ0MnfSxcclxuICAgICAgICAgICAgICAgIHtuYW1lOiAnc3VtbWEnLCB0eXBlOiAnTid9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHdhcm5pbmcgPSByZXF1aXJlKCcuLi9taXhpbi92YWxpZGF0ZUZvcm0nKSh0aGlzLCByZXF1aXJlZEZpZWxkcyk7XHJcbiAgICAgICAgcmV0dXJuIHdhcm5pbmc7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XHJcbiAgICAgICAgdGhpcy5yZWxhdGVkRG9jdW1lbnRzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0L/QuNGI0LXQvCDQuNGB0YXQvtC00L3Ri9C1INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LUsINGA0LXQs9C40YHRgtGA0LjRgNGD0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGEsXHJcbiAgICAgICAgICAgIGRldGFpbHMgPSB0aGlzLnN0YXRlLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnID0gdGhpcy5zdGF0ZS5ncmlkQ29uZmlnO1xyXG5cclxuICAgICAgICAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NJZENoYW5nZScsIGRhdGEuaWQpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RldGFpbHNDaGFuZ2UnLCBkZXRhaWxzKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkQ29uZmlnQ2hhbmdlJywgZ3JpZENvbmZpZyk7IC8vINC00LDQvdC90YvQtSDQs9GA0LjQtNCwXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZE5hbWUnLCAnam91cm5hbC1ncmlkLXJvdycpOyAvLyDQt9Cw0LTQsNC10Lwg0LjQvNGPINC60L7QvNC/0L7QvdC10L3RgtCwINGB0YLRgNC+0LrQuCDQs9GA0LjQtNCwICjQtNC70Y8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG5cclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGVkOiBuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINCyINCz0YDQuNC00LVcclxuICAgICAgICAvKlxyXG4gICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRldGFpbHMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50IGRldGFpbHMgY2hhbmdlZCcpO1xyXG4gICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKSAmJiB0eXBlb2YgbmV3VmFsdWUgPT0gJ2FycmF5Jykge1xyXG4gICAgICAgICAvLyDQuNGC0L7Qs9C4XHJcbiAgICAgICAgIGxldCBzdW1tYSA9IG5ld1ZhbHVlLnJlZHVjZSgoc3VtLCByb3cpID0+IHN1bSArIE51bWJlcihyb3cuc3VtbWEpLDApLCAvLyDRgdGD0LzQvNCwINGB0YfQtdGC0LBcclxuICAgICAgICAga2JtID0gbmV3VmFsdWUucmVkdWNlKChzdW0sIHJvdykgPT4gc3VtICsgTnVtYmVyKHJvdy5rYm0pLDApLCAvLyDRgdGD0LzQvNCwINC90LDQu9C+0LPQsFxyXG4gICAgICAgICBkb2NEYXRhID0gc2VsZi5zdGF0ZS5kb2NEYXRhO1xyXG5cclxuICAgICAgICAgZG9jRGF0YS5zdW1tYSA9IHN1bW1hO1xyXG4gICAgICAgICBkb2NEYXRhLmtibSA9IGtibTtcclxuXHJcbiAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2dyaWREYXRhOiBuZXdWYWx1ZSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAvLyDQs9GA0YPQt9C40Lwg0YHQv9GA0LDQstC+0YfQvdC40LrQuFxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2xvYWRMaWJzJywgJycpO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5pZCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2VkaXRlZENoYW5nZScsIHRydWUpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzYXZlZENoYW5nZScsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuc3RhdGUuZG9jRGF0YSxcclxuICAgICAgICAgICAgaXNFZGl0ZU1vZGUgPSB0aGlzLnN0YXRlLmVkaXRlZCxcclxuICAgICAgICAgICAgc2hvd01lc3NhZ2VCb3ggPSB0aGlzLnN0YXRlLnNob3dNZXNzYWdlQm94OyAvLyDQsdGD0LTQtdGCINGD0L/RgNCw0LLQu9GP0YLRjCDQvtC60L3QvtC8INGB0L7QvtCx0YnQtdC90LjQuVxyXG5cclxuICAgICAgICAvLyAgcGF0dGVybj0nW0EtWmEtel17M30nXHJcbi8vY29uc29sZS5sb2coJ2FydmUgcmVuZGVyaW5nOicsIGRhdGEpO1xyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gdGhpcy5zdGF0ZS5ncmlkQ29uZmlnO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIHtwYWdlczogdGhpcy5wYWdlcywgcmVmOiBcImZvcm1cIiwgb25TdWJtaXQ6IHRoaXMub25TdWJtaXQsIHN0eWxlOiB7ZGlzcGxheTogJ3RhYmxlJ319LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9vbGJhciwge3ZhbGlkYXRvcjogdGhpcy52YWxpZGF0aW9ufSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImRpdi1kb2NcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQ29tbW9uLCB7ZGF0YTogZGF0YX0pLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZmllbGRzZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOdW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLm51bWJlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRydWV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dERhdGUsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiS3V1cMOkZXYgXCIsIG5hbWU6IFwia3B2XCIsIHZhbHVlOiBkYXRhLmtwdiwgcmVmOiBcImtwdlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkt1dXDDpGV2XCIsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIlBhcnRuZXJcIiwgbmFtZTogXCJhc3V0dXNpZFwiLCBsaWJzOiBcImFzdXR1c2VkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuYXN1dHVzaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBkYXRhLmFzdXR1cywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJQYXJ0bmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImFzdXR1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJEb2t1bWVudCBcIiwgbmFtZTogXCJkb2tcIiwgdmFsdWU6IGRhdGEuZG9rLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkRva3VtZW50XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImRva1wiLCByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiU2VsZ2l0dXNcIiwgbmFtZTogXCJzZWxnXCIsIHBsYWNlaG9sZGVyOiBcIlNlbGdpdHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwic2VsZ1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuc2VsZywgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgd2lkdGg6IFwiODUlXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YUdyaWQsIHtzb3VyY2U6IFwiZGV0YWlsc1wiLCBncmlkRGF0YTogZ3JpZERhdGEsIGdyaWRDb2x1bW5zOiBncmlkQ29sdW1ucywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUdyaWRSb3c6IHRoaXMuaGFuZGxlR3JpZFJvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHJlZjogXCJEYXRhR3JpZFwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJTdW1tYTogXCIsIG5hbWU6IFwic3VtbWFcIiwgcGxhY2Vob2xkZXI6IFwiU3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwic3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5zdW1tYSwgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFwiXlswLTldKyhcXFxcLlswLTldezEsNH0pPyRcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiDQv9Cw0YLQtdGA0L0g0LTQu9GPINGG0LjRhNGAINGBIDQg0LfQvdCw0LrQsNC80Lgg0L/QvtGB0LvQtSDRgtC+0YfQutC4Ki9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIk3DpHJrdXNlZFwiLCBuYW1lOiBcIm11dWRcIiwgcGxhY2Vob2xkZXI6IFwiTcOkcmt1c2VkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwibXV1ZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEubXV1ZCwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgd2lkdGg6IFwiODUlXCJ9KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmdyaWRSb3dFZGl0ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcmlkUm93LCB7bW9kYWxQYWdlQ2xpY2s6IHRoaXMubW9kYWxQYWdlQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkRXZlbnQ6IHRoaXMuc3RhdGUuZ3JpZFJvd0V2ZW50LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFJvd0RhdGE6IHRoaXMuc3RhdGUuZ3JpZFJvd0RhdGF9KSA6IG51bGxcclxuXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVHcmlkUm93OiBmdW5jdGlvbiAoZ3JpZEV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgLy8g0YPQv9GA0LDQstC70LXQvdC40LUg0LzQvtC00LDQu9GM0L3Ri9C8INC+0LrQvdC+0LxcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtncmlkUm93RWRpdDogdHJ1ZSwgZ3JpZFJvd0V2ZW50OiBncmlkRXZlbnQsIGdyaWRSb3dEYXRhOiBkYXRhfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG1vZGFsUGFnZUNsaWNrOiBmdW5jdGlvbiAoYnRuRXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAvLyDQvtGC0YDQsNCx0L7RgtCw0LXQvCBPayDQuNC3INC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwXHJcbiAgICAgICAgdmFyIGdyaWREYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGV0YWlscyxcclxuICAgICAgICAgICAgZG9jRGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIGdyaWRSb3dJZCA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRSb3dJZCxcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnMgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5ncmlkQ29uZmlnO1xyXG4gICAgICAgIHZhciBncmlkUm93ID0ge307XHJcblxyXG4gICAgICAgIGlmIChncmlkUm93SWQgPj0gMCkge1xyXG4gICAgICAgICAgICBncmlkUm93ID0gZ3JpZERhdGFbZ3JpZFJvd0lkXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ByZXZpb3Mgc3RhdGUgZ3JpZERhdGEsIGRvY0RhdGEnLCBncmlkRGF0YSwgZG9jRGF0YSk7XHJcblxyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgbW9kYWxQYWdlQ2xpY2sgZGF0YSwgZ3JpZFJvd0lkLCBncmlkUm93JywgZGF0YSwgZ3JpZFJvd0lkLCBncmlkUm93KTtcclxuICAgICAgICAgICAgaWYgKGdyaWRSb3dJZCA8IDApIHtcclxuICAgICAgICAgICAgICAgIC8vINC90L7QstCw0Y8g0LfQsNC/0LjRgdGMXHJcbiAgICAgICAgICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0L/Rg9GB0YLRg9GOINGB0YLRgNC+0LrRg1xyXG4vLyAgICAgICAgICAgICAgICBncmlkUm93ID17fTtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbJ2lkJ10gPSAnTkVXJyArIE1hdGgucmFuZG9tKCk7ICAvLyDQs9C10L3QtdGA0LjRgNGD0LXQvCDQvdC+0LLQvtC1INCY0JRcclxuICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oZmllbGQpICB7cmV0dXJuIGdyaWRSb3dbZmllbGRdID0gbnVsbDt9KTsgLy8g0YHQvtC30LTQsNC10Lwg0L/QvtC70Y8g0LIg0L7QsdGK0LXQutGC0LVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSAge1xyXG4gICAgICAgICAgICAgICAgZ3JpZFJvd1tmaWVsZC5uYW1lXSA9IGZpZWxkLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn0YHQvtGF0YDQsNC90LjQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1LCBncmlkUm93JywgZ3JpZFJvdyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g0LfQsNC/0L7Qu9C90LjQvCDQv9C+0LvRjyBrb29kLCBuaW1ldHVzXHJcbiAgICAgICAgICAgIHZhciBsaWJzID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUubGlicztcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgIG5vbUxpYiA9IGxpYnMuZmlsdGVyKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICBpZiAoZGF0YS5pZCA9PSAnbm9tZW5jbGF0dXJlJykge1xyXG4gICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIC8qXHJcblxyXG4gICAgICAgICAgICAgdmFyICAgbm9tUm93ID0gbm9tTGliWzBdLmRhdGEuZmlsdGVyKGZ1bmN0aW9uKHJvdykge1xyXG4gICAgICAgICAgICAgaWYgKHJvdy5pZCA9PSBOdW1iZXIoZ3JpZFJvdy5ub21pZCkpIHtcclxuICAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICBpZiAobm9tUm93KSB7XHJcbiAgICAgICAgICAgICBncmlkUm93Wydrb29kJ10gPSBub21Sb3dbMF0ua29vZDtcclxuICAgICAgICAgICAgIGdyaWRSb3dbJ25pbWV0dXMnXSA9IG5vbVJvd1swXS5uYW1lO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FmdGVyIHN0YXRlIGdyaWREYXRhICVzLCBkb2NEYXRhICVzJywgZ3JpZERhdGEsIGRvY0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGdyaWRSb3dJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YVtncmlkUm93SWRdID0gZ3JpZFJvdztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdyaWREYXRhLnB1c2goZ3JpZFJvdyk7IC8vINC00L7QsdCw0LLQu9GP0LXQvCDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRSb3dJZENoYW5nZScsIGdyaWREYXRhLmxlbmd0aCk7IC8vINC/0L7QvNC10YfQsNC10Lwg0L3QvtCy0YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINGB0YfQuNGC0LDQtdC8INC40YLQvtCz0LhcclxuXHJcbiAgICAgICAgdmFyIGRvY1N1bW1hID0gZ3JpZERhdGEucmVkdWNlKGZ1bmN0aW9uKHN1bSwgcm93KSAge3JldHVybiBzdW0gKyBOdW1iZXIocm93LnN1bW1hKTt9LCAwKTsgLy8g0YHRg9C80LzQsCDRgdGH0LXRgtCwXHJcblxyXG4gICAgICAgIGRvY0RhdGEuc3VtbWEgPSBkb2NTdW1tYTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZzWydEYXRhR3JpZCddLnJlcGxhY2VTdGF0ZSh7Z3JpZERhdGE6IGdyaWREYXRhfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IGZhbHNlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBKb3VybmFsO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2RvY3Mvam91cm5hbC5qc3hcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi9tb2RhbFBhZ2UuanN4JyksXHJcbiAgICBTZWxlY3QgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC1zZWxlY3QuanN4JyksXHJcbiAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgSW5wdXROdW1iZXIgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC1udW1iZXIuanN4Jyk7XHJcblxyXG5cclxudmFyIEpvdXJuYWxHcmlkUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkpvdXJuYWxHcmlkUm93XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdBcnZHcmlkUm93IHByb3BzJywgdGhpcy5wcm9wcyk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcm93OiB0aGlzLnByb3BzLmdyaWRSb3dEYXRhLCBjaGVja2VkOiBmYWxzZSwgd2FybmluZzonJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW9kYWxQYWdlQ2xpY2s6IGZ1bmN0aW9uIChidG5FdmVudCkge1xyXG4gICAgICAgIHZhciBjb21wb25lbnRzID0gWydkZWViZXQnLCAna3JlZWRpdCcsICdzdW1tYScsICd2YWx1dXRhJywgJ2t1dXJzJywgJ3Byb2onLCAndHVubnVzJ10sXHJcbiAgICAgICAgICAgIGRhdGEgPSBbXTtcclxuXHJcblxyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LBcclxuICAgICAgICAgICAgLy8g0YHQvtCx0LjRgNCw0LXQvCDQtNCw0L3QvdGL0LUg0LTQu9GPINC+0YLQv9GA0LDQstC60Lgg0L3QsCDQvtCx0YDQsNCx0L7RgtC60YNcclxuICAgICAgICAgICAgY29tcG9uZW50cy5tYXAoZnVuY3Rpb24oY29tcG9uZW50KSAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMucmVmc1tjb21wb25lbnRdLnN0YXRlJywgdGhpcy5yZWZzW2NvbXBvbmVudF0uc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudFZhbHVlID0gdGhpcy5yZWZzW2NvbXBvbmVudF0uc3RhdGUudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50ID09ICdkZWViZXQnIHx8IGNvbXBvbmVudCA9PSAna3JlZWRpdCcgfHwgY29tcG9uZW50ID09ICdwcm9qJyB8fCBjb21wb25lbnQgPT0gJ3R1bm51cycpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRWYWx1ZSA9IHRoaXMucmVmc1tjb21wb25lbnRdLnN0YXRlLmZpZWxkVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2goe25hbWU6IGNvbXBvbmVudCwgdmFsdWU6IGNvbXBvbmVudFZhbHVlfSk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9wcy5tb2RhbFBhZ2VDbGljayhidG5FdmVudCwgZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUNoYW5nZTogZnVuY3Rpb24gKGUsIG5hbWUpIHtcclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0L3QsCDRhNC+0YDQvNC1XHJcbiAgICAgICAgdmFyIHZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcbi8qXHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnN0YXRlLnJvd1tuYW1lXSAmJiBuYW1lID09ICdub21pZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZzWydrb2d1cyddLnNldFN0YXRlKHt2YWx1ZTogMC4wMDB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZWZzWydoaW5kJ10uc2V0U3RhdGUoe3ZhbHVlOiAwLjAwfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmc1sna2JtJ10uc2V0U3RhdGUoe3ZhbHVlOiAwLjAwfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmc1sna2JtdGEnXS5zZXRTdGF0ZSh7dmFsdWU6IDAuMDB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZWZzWydzdW1tYSddLnNldFN0YXRlKHt2YWx1ZTogMC4wMH0pO1xyXG4gICAgICAgIH1cclxuKi9cclxuICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlQ2hhbmdlJywgdmFsdWUpO1xyXG4gICAgICAgIHRoaXMucmVjYWxjUm93U3VtbSgpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlSW5wdXQ6IGZ1bmN0aW9uICh2YWx1ZSwgbmFtZSkge1xyXG4gICAgICAgIC8vINC/0LXRgNC10YHRh9C10YIg0YHRg9C80LxcclxuICAgICAgICB0aGlzLnJlY2FsY1Jvd1N1bW0oKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlY2FsY1Jvd1N1bW06IGZ1bmN0aW9uKCkge1xyXG5cclxuLypcclxuICAgICAgICB2YXIgc3VtbWEgPSBOdW1iZXIodGhpcy5yZWZzWydzdW1tYSddLnN0YXRlLnZhbHVlKSxcclxuICAgICAgICAgICAga3V1cnMgPSBOdW1iZXIodGhpcy5yZWZzWydrdXVycyddLnN0YXRlLnZhbHVlKSxcclxuICAgICAgICAgICAgdmFsc3VtbWEgPSBzdW1tYSAqIGt1dXJzO1xyXG4gICAgICAgIHRoaXMucmVmc1sndmFsc3VtbWEnXS5zZXRTdGF0ZSh7dmFsdWU6IHZhbHN1bW1hfSk7XHJcbiovXHJcbiAvLyAgICAgICBjb25zb2xlLmxvZygncmVjYWxjUm93U3VtbScpO1xyXG5cclxuLy8gICAgICAgIHRoaXMudmFsaWRhdGVGb3JtKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHZhbGlkYXRlRm9ybTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gd2lsbCBjaGVjayB2YWx1ZXMgb24gdGhlIGZvcm0gYW5kIHJldHVybiBzdHJpbmcgd2l0aCB3YXJuaW5nXHJcbiAgICAgICAgdmFyIHdhcm5pbmcgPSAnJztcclxuICAgICAgICAvLyDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDQv9GA0L7QstC10YDQutC4INGE0L7RgNC80Ysg0L3QsCDQstCw0LvQuNC00L3QvtGB0YLRjFxyXG4vKlxyXG4gICAgICAgIGlmICghdGhpcy5yZWZzWydub21pZCddLnN0YXRlLnZhbHVlKSB3YXJuaW5nID0gIHdhcm5pbmcgKyAnINC60L7QtCDRg9GB0LvRg9Cz0LgnO1xyXG4gICAgICAgIGlmICghdGhpcy5yZWZzWydrb2d1cyddLnN0YXRlLnZhbHVlKSB3YXJuaW5nID0gIHdhcm5pbmcgKyAnINC60L7Quy3QstC+JztcclxuICAgICAgICBpZiAoIXRoaXMucmVmc1snaGluZCddLnN0YXRlLnZhbHVlKSB3YXJuaW5nID0gIHdhcm5pbmcgKyAnINGG0LXQvdCwJztcclxuKi9cclxuXHJcbiAgICAgICAgaWYgKHdhcm5pbmcubGVuZ3RoID4gMiApIHtcclxuICAgICAgICAgICAgLy8g0LXRgdGC0Ywg0L/RgNC+0LHQu9C10LzRi1xyXG4gICAgICAgICAgICB3YXJuaW5nID0gJ9Ce0YLRgdGD0YLRgdCy0YPRjtGCINC00LDQvdC90YvQtTonICsgd2FybmluZztcclxuICAgICAgICB9XHJcbi8vICAgICAgICBjb25zb2xlLmxvZygndmFsaWRhdGVGb3JtJywgd2FybmluZyk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hlY2tlZDogdHJ1ZSwgd2FybmluZzogd2FybmluZ30pO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgcm93ID0gdGhpcy5zdGF0ZS5yb3csXHJcbiAgICAgICAgICAgIHZhbGlkYXRlTWVzc2FnZSA9IHRoaXMuc3RhdGUud2FybmluZyxcclxuICAgICAgICAgICAgYnV0dG9uT2tSZWFkT25seSA9IHZhbGlkYXRlTWVzc2FnZS5sZW5ndGggPiAwIHx8ICF0aGlzLnN0YXRlLmNoZWNrZWQ7XHJcblxyXG4gICAgICAgIGlmICghcm93LnZhbHV1dGEpIHtcclxuICAgICAgICAgICAgcm93LnZhbHV1dGEgPSAnRVVSJztcclxuICAgICAgICAgICAgcm93Lmt1dXJzID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1dHRvbk9rUmVhZE9ubHkgPSBmYWxzZTsgLy8gdG9kbyDQutC+0YHRgtGL0LvRjFxyXG4vLyAgICAgICAgY29uc29sZS5sb2coJ3JvdyByZW5kZXI6Jyx2YWxpZGF0ZU1lc3NhZ2UsIGJ1dHRvbk9rUmVhZE9ubHkgKTtcclxuLypcclxuICAgICAgICA8U2VsZWN0IHRpdGxlPVwiVGVlbnVzXCIgbmFtZT0nbm9taWQnIGxpYnM9XCJub21lbmNsYXR1cmVcIiByZWFkT25seT17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17cm93Lm5vbWlkfSBkZWZhdWx0VmFsdWU9e3Jvdy5rb29kfSByZWY9J25vbWlkJyBwbGFjZWhvbGRlcj0nVGVlbnVzZSBrb29kJ1xyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfS8+XHJcbiovXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcIm1vZGFsUGFnZVwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VOYW1lOiBcIlJlYSBsaXNhbWluZSAvIHBhcmFuZGFtaW5lXCJ9LCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRlZWJldDpcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVlYmV0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcImtvbnRvZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5kZWViZXQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsSWQ6IFwia29vZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImRlZWJldFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiRGVlYmV0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiS3JlZWRpdDpcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrcmVlZGl0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwia29udG9kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5rcmVlZGl0LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsSWQ6IFwia29vZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwia3JlZWRpdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLcmVlZGl0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN1bW1hOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LnN1bW1hLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJmYWxzZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlZhbHV1dGE6IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbHV1dGFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy52YWx1dXRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcImZhbHNlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInZhbHV1dGFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkt1dXJzOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdXVyc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93Lmt1dXJzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJmYWxzZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrdXVyc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlSW5wdXQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUHJvamVrdDpcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcm9qXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwicHJvamVjdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cucHJvaiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImtvb2RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInByb2pcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiUHJvamVrdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJUdW5udXM6XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IFwidHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy50dW5udXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJrb29kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJ0dW5udXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTGF1c2VuZGkgdHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVpLWMyXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB2YWxpZGF0ZU1lc3NhZ2UpKSwgXCI7XCJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG4vKlxyXG48ZGl2PlxyXG4gICAge2J1dHRvbk9rUmVhZE9ubHkgP1xyXG4gICAgICAgIDxidXR0b24gZGlzYWJsZWQ+IE9rIDwvYnV0dG9uPjpcclxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMubW9kYWxQYWdlQ2xpY2suYmluZCh0aGlzLCdPaycpfT4gT2sgPC9idXR0b24+XHJcbiAgICB9XHJcbiAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMubW9kYWxQYWdlQ2xpY2suYmluZCh0aGlzLCdDYW5jZWwnKX0+IENhbmNlbDwvYnV0dG9uPlxyXG48L2Rpdj5cclxuKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSm91cm5hbEdyaWRSb3c7XHJcblxyXG4vKlxyXG5cclxuIDxJbnB1dFRleHQgdGl0bGU9J0tvb2QgJyBuYW1lPSdrb29kJyB2YWx1ZT17cm93Lmtvb2R9IHJlYWRPbmx5PXtmYWxzZX1cclxuIGRpc2FibGVkPVwiZmFsc2VcIiByZWY9J2tvb2QnID48L0lucHV0XHJcbiBUZXh0PlxyXG4gKi9cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2pvdXJuYWwtZ3JpZC1yb3cuanN4XG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3QgRm9ybSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZm9ybS5qcycpLFxyXG4gICAgUGFnZUxhYmVsID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9wYWdlX2xhYmVsJyksXHJcbiAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgSW5wdXREYXRlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtZGF0ZS5qc3gnKSxcclxuICAgIElucHV0TnVtYmVyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtbnVtYmVyLmpzeCcpLFxyXG4gICAgVG9vbGJhciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLXRvb2xiYXIuanN4JyksXHJcbiAgICBEb2NDb21tb24gPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1jb21tb24uanN4JyksXHJcbiAgICBTZWxlY3QgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1zZWxlY3QuanN4JyksXHJcbiAgICBUZXh0QXJlYSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LXRleHRhcmVhLmpzeCcpLFxyXG4gICAgRGF0YUdyaWQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1kYXRhLWdyaWQuanN4JyksXHJcbiAgICBHcmlkUm93ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9zb3JkZXItZ3JpZC1yb3cuanN4Jyk7XHJcblxyXG52YXIgZG9jU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZXMvZG9jX3N0b3JlLmpzJyksXHJcbiAgICByZWxhdGVkRG9jdW1lbnRzID0gcmVxdWlyZSgnLi4vbWl4aW4vcmVsYXRlZERvY3VtZW50cy5qc3gnKSxcclxuICAgIHZhbGlkYXRlRm9ybSA9IHJlcXVpcmUoJy4uL21peGluL3ZhbGlkYXRlRm9ybScpO1xyXG5cclxudmFyIG5vdyA9IG5ldyBEYXRlKCk7XHJcblxyXG5jb25zdCBTb3JkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiU29yZGVyXCIsXHJcbiAgICBwYWdlczogIFt7cGFnZU5hbWU6ICdTaXNzZXR1bGlrdSBrYXNzYW9yZGVyJ31dLFxyXG4gICAgcmVxdWlyZWRGaWVsZHM6ICBbXHJcbiAgICAgICAge25hbWU6ICdrcHYnLCB0eXBlOiAnRCcsIG1pbjogbm93LnNldEZ1bGxZZWFyKG5vdy5nZXRGdWxsWWVhcigpIC0gMSksIG1heDogbm93LnNldEZ1bGxZZWFyKG5vdy5nZXRGdWxsWWVhcigpICsgMSl9LFxyXG4gICAgICAgIHtuYW1lOiAnYXN1dHVzaWQnLCB0eXBlOiAnSSd9LFxyXG4gICAgICAgIHtuYW1lOiAnbmltaScsIHR5cGU6ICdDJ30sXHJcbiAgICAgICAge25hbWU6ICdzdW1tYScsIHR5cGU6ICdOJ31cclxuICAgIF0sXHJcbi8qXHJcbiAgICBtaXhpbnM6IFtyZWxhdGVkRG9jdW1lbnRzLCB2YWxpZGF0ZUZvcm1dLFxyXG4qL1xyXG5cclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINGD0YHRgtCw0L3QvtCy0LjQvCDQuNC30L3QsNGH0LDQu9GM0L3Ri9C1INC00LDQvdC90YvQtVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRvY0RhdGE6IHRoaXMucHJvcHMuZGF0YS5yb3csXHJcbiAgICAgICAgICAgIGVkaXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94OiAnbm9uZScsXHJcbiAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnByb3BzLmRhdGEuZGV0YWlscyxcclxuICAgICAgICAgICAgcmVsYXRpb25zOiB0aGlzLnByb3BzLmRhdGEucmVsYXRpb25zLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnOiB0aGlzLnByb3BzLmRhdGEuZ3JpZENvbmZpZyxcclxuICAgICAgICAgICAgZ3JpZFJvd0VkaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBncmlkUm93RXZlbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIGdyaWRSb3dEYXRhOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0L/QuNGI0LXQvCDQuNGB0YXQvtC00L3Ri9C1INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LUsINGA0LXQs9C40YHRgtGA0LjRgNGD0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICBkYXRhID0gc2VsZi5wcm9wcy5kYXRhLnJvdyxcclxuICAgICAgICAgICAgZGV0YWlscyA9IHNlbGYucHJvcHMuZGF0YS5kZXRhaWxzLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnID0gc2VsZi5wcm9wcy5kYXRhLmdyaWRDb25maWc7XHJcblxyXG4gICAgICAgIC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RvY0lkQ2hhbmdlJywgZGF0YS5pZCk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGRldGFpbHMpOyAvLyDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRDb25maWdDaGFuZ2UnLCBncmlkQ29uZmlnKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkTmFtZScsICdzb3JkZXItZ3JpZC1yb3cnKTsgLy8g0LfQsNC00LDQtdC8INC40LzRjyDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdGC0YDQvtC60Lgg0LPRgNC40LTQsCAo0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRlZDogbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdGCINC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0LIg0LPRgNC40LTQtVxyXG4gICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRldGFpbHMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgIHZhciBpc0NoYW5nZWQgPSBKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50IGRldGFpbHMgY2hhbmdlZCcsIGlzQ2hhbmdlZCwgdHlwZW9mIG5ld1ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICBpZiAoaXNDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgLy8g0LjRgtC+0LPQuFxyXG4gICAgICAgICAgICAgICAgIGxldCBzdW1tYSA9IG5ld1ZhbHVlLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSk7fSwwKSwgLy8g0YHRg9C80LzQsCDQtNC+0LrRg9C80LXQvdGC0LBcclxuICAgICAgICAgICAgICAgICBkb2NEYXRhID0gc2VsZi5zdGF0ZS5kb2NEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICBkb2NEYXRhLnN1bW1hID0gc3VtbWE7XHJcbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgc3VtbWE6Jywgc3VtbWEpO1xyXG4gICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2dyaWREYXRhOiBuZXdWYWx1ZSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XHJcbiAgICAgICAgdGhpcy5yZWxhdGVkRG9jdW1lbnRzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0LPRgNGD0LfQuNC8INGB0L/RgNCw0LLQvtGH0L3QuNC60LhcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdsb2FkTGlicycsICcnKTtcclxuXHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0L3QvtCy0YvQuSDQtNC+0LrRg9C80LXQvdGCIChpZCA9PSAwKVxyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5zdGF0ZS5kb2NEYXRhO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5pZCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlZGl0ZWQgbW9kZSBjb250cm9sJywgZGF0YSk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2VkaXRlZENoYW5nZScsIHRydWUpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzYXZlZENoYW5nZScsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuc3RhdGUuZG9jRGF0YSxcclxuICAgICAgICAgICAgaXNFZGl0ZU1vZGUgPSB0aGlzLnN0YXRlLmVkaXRlZCxcclxuICAgICAgICAgICAgc2hvd01lc3NhZ2VCb3ggPSB0aGlzLnN0YXRlLnNob3dNZXNzYWdlQm94OyAvLyDQsdGD0LTQtdGCINGD0L/RgNCw0LLQu9GP0YLRjCDQvtC60L3QvtC8INGB0L7QvtCx0YnQtdC90LjQuVxyXG5cclxuICAgICAgICAvLyAgcGF0dGVybj0nW0EtWmEtel17M30nXHJcbiAgICAgICAgdmFyIGdyaWREYXRhID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnMgPSB0aGlzLnN0YXRlLmdyaWRDb25maWc7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIHtwYWdlczogdGhpcy5wYWdlcywgcmVmOiBcImZvcm1cIiwgb25TdWJtaXQ6IHRoaXMub25TdWJtaXQsIHN0eWxlOiB7ZGlzcGxheTogJ3RhYmxlJ319LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9vbGJhciwge3ZhbGlkYXRvcjogdGhpcy52YWxpZGF0ZUZvcm19KSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZGl2LWRvY1wifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEb2NDb21tb24sIHtkYXRhOiBkYXRhfSksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmaWVsZHNldFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibnVtYmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEubnVtYmVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcImZhbHNlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRydWV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dERhdGUsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiS3V1cMOkZXYgXCIsIG5hbWU6IFwia3B2XCIsIHZhbHVlOiBkYXRhLmtwdiwgcmVmOiBcImtwdlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkt1dXDDpGV2XCIsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiS2Fzc2FcIiwgbmFtZTogXCJrYXNzYV9pZFwiLCBsaWJzOiBcImFhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEua2Fzc2FfaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBkYXRhLmthc3NhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkthc3NhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImthc3NhX2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiUGFydG5lclwiLCBuYW1lOiBcImFzdXR1c2lkXCIsIGxpYnM6IFwiYXN1dHVzZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hc3V0dXNpZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsSWQ6IFwiaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGRhdGEuYXN1dHVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlBhcnRuZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYXN1dHVzaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQXJ2ZSBuci5cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFydmlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliczogXCJhcnZlZFZhbGphXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuYXJ2aWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBkYXRhLmFydm5yLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkFydmUgbnIuXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImFydmlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnRuRGVsZXRlOiB0cnVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkRva3VtZW50IFwiLCBuYW1lOiBcImRva3VtZW50XCIsIHZhbHVlOiBkYXRhLmRva3VtZW50LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkRva3VtZW50XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImRva3VtZW50XCIsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJOaW1pXCIsIG5hbWU6IFwibmltaVwiLCBwbGFjZWhvbGRlcjogXCJOaW1pXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwibmltaVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuYWFkcmVzcywgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgd2lkdGg6IFwiODUlXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiQWFkcmVzc1wiLCBuYW1lOiBcImFhZHJlc3NcIiwgcGxhY2Vob2xkZXI6IFwiQWFkcmVzc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImFhZHJlc3NcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFhZHJlc3MsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkFsdXNcIiwgbmFtZTogXCJhbHVzXCIsIHBsYWNlaG9sZGVyOiBcIkFsdXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJhbHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hbHVzLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCB3aWR0aDogXCI4NSVcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhR3JpZCwge3NvdXJjZTogXCJkZXRhaWxzXCIsIGdyaWREYXRhOiBncmlkRGF0YSwgZ3JpZENvbHVtbnM6IGdyaWRDb2x1bW5zLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlR3JpZFJvdzogdGhpcy5oYW5kbGVHcmlkUm93LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgcmVmOiBcIkRhdGFHcmlkXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIlN1bW1hOiBcIiwgbmFtZTogXCJzdW1tYVwiLCBwbGFjZWhvbGRlcjogXCJTdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnN1bW1hLCBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCJeWzAtOV0rKFxcXFwuWzAtOV17MSw0fSk/JFwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qINC/0LDRgtC10YDQvSDQtNC70Y8g0YbQuNGE0YAg0YEgNCDQt9C90LDQutCw0LzQuCDQv9C+0YHQu9C1INGC0L7Rh9C60LgqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiTcOkcmt1c2VkXCIsIG5hbWU6IFwibXV1ZFwiLCBwbGFjZWhvbGRlcjogXCJNw6Rya3VzZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJtdXVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5tdXVkLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCB3aWR0aDogXCI4NSVcIn0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZ3JpZFJvd0VkaXQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEdyaWRSb3csIHttb2RhbFBhZ2VDbGljazogdGhpcy5tb2RhbFBhZ2VDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRFdmVudDogdGhpcy5zdGF0ZS5ncmlkUm93RXZlbnQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkUm93RGF0YTogdGhpcy5zdGF0ZS5ncmlkUm93RGF0YX0pIDogbnVsbFxyXG5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUdyaWRSb3c6IGZ1bmN0aW9uIChncmlkRXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAvLyDRg9C/0YDQsNCy0LvQtdC90LjQtSDQvNC+0LTQsNC70YzQvdGL0Lwg0L7QutC90L7QvFxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiB0cnVlLCBncmlkUm93RXZlbnQ6IGdyaWRFdmVudCwgZ3JpZFJvd0RhdGE6IGRhdGF9KTtcclxuICAgIH0sXHJcblxyXG4gICAgbW9kYWxQYWdlQ2xpY2s6IGZ1bmN0aW9uIChidG5FdmVudCwgZGF0YSkge1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQvtGC0LDQtdC8IE9rINC40Lcg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LBcclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzLFxyXG4gICAgICAgICAgICBkb2NEYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgZ3JpZFJvd0lkID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZ3JpZFJvd0lkLFxyXG4gICAgICAgICAgICBncmlkQ29sdW1ucyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRDb25maWc7XHJcbiAgICAgICAgdmFyIGdyaWRSb3cgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGdyaWRSb3dJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGdyaWRSb3cgPSBncmlkRGF0YVtncmlkUm93SWRdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZygncHJldmlvcyBzdGF0ZSBncmlkRGF0YSwgZG9jRGF0YScsIGdyaWREYXRhLCAgZG9jRGF0YSk7XHJcblxyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgbW9kYWxQYWdlQ2xpY2sgZGF0YSwgZ3JpZFJvd0lkLCBncmlkUm93JywgZGF0YSwgZ3JpZFJvd0lkLCBncmlkUm93KTtcclxuICAgICAgICAgICAgaWYgKGdyaWRSb3dJZCA8IDApIHtcclxuICAgICAgICAgICAgICAgIC8vINC90L7QstCw0Y8g0LfQsNC/0LjRgdGMXHJcbiAgICAgICAgICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0L/Rg9GB0YLRg9GOINGB0YLRgNC+0LrRg1xyXG4vLyAgICAgICAgICAgICAgICBncmlkUm93ID17fTtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbJ2lkJ10gPSAnTkVXJyArIE1hdGgucmFuZG9tKCk7ICAvLyDQs9C10L3QtdGA0LjRgNGD0LXQvCDQvdC+0LLQvtC1INCY0JRcclxuICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oZmllbGQpICB7cmV0dXJuIGdyaWRSb3dbZmllbGRdID0gbnVsbDt9KTsgLy8g0YHQvtC30LTQsNC10Lwg0L/QvtC70Y8g0LIg0L7QsdGK0LXQutGC0LVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSAge1xyXG4gICAgICAgICAgICAgICAgZ3JpZFJvd1tmaWVsZC5uYW1lXSA9IGZpZWxkLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn0YHQvtGF0YDQsNC90LjQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1LCBncmlkUm93JywgZ3JpZFJvdyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g0LfQsNC/0L7Qu9C90LjQvCDQv9C+0LvRjyBuaW1ldHVzXHJcbiAgICAgICAgICAgIHZhciBsaWJzID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUubGlicyxcclxuICAgICAgICAgICAgIG5vbUxpYiA9IGxpYnMuZmlsdGVyKGZ1bmN0aW9uKGRhdGEpICB7XHJcbiAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaWQgPT0gJ25vbWVuY2xhdHVyZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgIHZhciAgIG5vbVJvdyA9IG5vbUxpYlswXS5kYXRhLmZpbHRlcihmdW5jdGlvbihyb3cpIHtcclxuICAgICAgICAgICAgICAgICBpZiAocm93LmlkID09IE51bWJlcihncmlkUm93Lm5vbWlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgIGlmIChub21Sb3cpIHtcclxuICAgICAgICAgICAgICAgICBncmlkUm93WyduaW1ldHVzJ10gPSBub21Sb3dbMF0ubmFtZTtcclxuICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhZnRlciBzdGF0ZSBncmlkRGF0YSAlcywgZG9jRGF0YSAlcycsIGdyaWREYXRhLCAgZG9jRGF0YSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZ3JpZFJvd0lkID49IDApIHtcclxuICAgICAgICAgICAgICAgIGdyaWREYXRhW2dyaWRSb3dJZF0gPSBncmlkUm93O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEucHVzaChncmlkUm93KTsgLy8g0LTQvtCx0LDQstC70Y/QtdC8INGB0YLRgNC+0LrRg1xyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZFJvd0lkQ2hhbmdlJywgZ3JpZERhdGEubGVuZ3RoKTsgLy8g0L/QvtC80LXRh9Cw0LXQvCDQvdC+0LLRg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RldGFpbHNDaGFuZ2UnLCBncmlkRGF0YSk7IC8vINC/0LjRiNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0YHRh9C40YLQsNC10Lwg0LjRgtC+0LPQuFxyXG5cclxuICAgICAgICB2YXIgZG9jU3VtbWEgPSBncmlkRGF0YS5yZWR1Y2UoZnVuY3Rpb24oc3VtLCByb3cpICB7cmV0dXJuIHN1bSArIE51bWJlcihyb3cuc3VtbWEpO30sIDApOyAvLyDRgdGD0LzQvNCwINGB0YfQtdGC0LBcclxuXHJcbiAgICAgICAgZG9jRGF0YS5zdW1tYSA9IGRvY1N1bW1hO1xyXG5cclxuICAgICAgICB0aGlzLnJlZnNbJ0RhdGFHcmlkJ10ucmVwbGFjZVN0YXRlKHtncmlkRGF0YTogZ3JpZERhdGF9KTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtncmlkUm93RWRpdDogZmFsc2UsIGRvY0RhdGE6IGRvY0RhdGF9KTtcclxuXHJcbiAgICB9LFxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNvcmRlcjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2NzL3NvcmRlci5qc3hcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi9tb2RhbFBhZ2UuanN4JyksXHJcbiAgICBTZWxlY3QgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC1zZWxlY3QuanN4JyksXHJcbiAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgSW5wdXROdW1iZXIgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC1udW1iZXIuanN4Jyk7XHJcblxyXG52YXIgU29yZGVyR3JpZFJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJTb3JkZXJHcmlkUm93XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdBcnZHcmlkUm93IHByb3BzJywgdGhpcy5wcm9wcyk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcm93OiB0aGlzLnByb3BzLmdyaWRSb3dEYXRhLCBjaGVja2VkOiBmYWxzZSwgd2FybmluZzonJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8g0L/RgNC10LTQstCw0YDQuNGC0LXQu9GM0L3QsNGPINC/0YDQvtCy0LXRgNC60LBcclxuICAgICAgICB0aGlzLnZhbGlkYXRlRm9ybSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBtb2RhbFBhZ2VDbGljazogZnVuY3Rpb24gKGJ0bkV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGNvbXBvbmVudHMgPSBbJ25vbWlkJywgICdzdW1tYScsICdwcm9qJywgJ3R1bm51cyddLFxyXG4gICAgICAgICAgICBkYXRhID0gW107XHJcblxyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LBcclxuXHJcbiAgICAgICAgICAgIC8vINGB0L7QsdC40YDQsNC10Lwg0LTQsNC90L3Ri9C1INC00LvRjyDQvtGC0L/RgNCw0LLQutC4INC90LAg0L7QsdGA0LDQsdC+0YLQutGDXHJcbiAgICAgICAgICAgIGNvbXBvbmVudHMubWFwKGZ1bmN0aW9uKGNvbXBvbmVudCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnRWYWx1ZSA9IHRoaXMucmVmc1tjb21wb25lbnRdLnN0YXRlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudCA9PSAncHJvaicgfHwgY29tcG9uZW50ID09ICd0dW5udXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50VmFsdWUgPSB0aGlzLnJlZnNbY29tcG9uZW50XS5zdGF0ZS5maWVsZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21vZGFsUGFnZUNsaWNrICcsY29tcG9uZW50LCBjb21wb25lbnRWYWx1ZSApXHJcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2goe25hbWU6IGNvbXBvbmVudCwgdmFsdWU6IGNvbXBvbmVudFZhbHVlfSk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9wcy5tb2RhbFBhZ2VDbGljayhidG5FdmVudCwgZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUNoYW5nZTogZnVuY3Rpb24gKGUsIG5hbWUpIHtcclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0L3QsCDRhNC+0YDQvNC1XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3NlbGVjdCBjaGFuZ2VkJyk7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnN0YXRlLnJvd1tuYW1lXSAmJiBuYW1lID09ICdub21pZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZzWydzdW1tYSddLnNldFN0YXRlKHt2YWx1ZTogMC4wMH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZhbGlkYXRlRm9ybSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVJbnB1dDogZnVuY3Rpb24gKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgLy8g0L/QtdGA0LXRgdGH0LXRgiDRgdGD0LzQvFxyXG4gICAgICAgIHRoaXMucmVjYWxjUm93U3VtbSgpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgdmFsaWRhdGVGb3JtOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyB3aWxsIGNoZWNrIHZhbHVlcyBvbiB0aGUgZm9ybSBhbmQgcmV0dXJuIHN0cmluZyB3aXRoIHdhcm5pbmdcclxuICAgICAgICB2YXIgd2FybmluZyA9ICcnO1xyXG4gICAgICAgIC8vINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INC/0YDQvtCy0LXRgNC60Lgg0YTQvtGA0LzRiyDQvdCwINCy0LDQu9C40LTQvdC+0YHRgtGMXHJcbiAgICAgICAgaWYgKCF0aGlzLnJlZnNbJ25vbWlkJ10uc3RhdGUudmFsdWUpIHdhcm5pbmcgPSAgd2FybmluZyArICcg0LrQsNGB0YHQvtCy0LDRjyDQvtC/0LXRgNCw0YbQuNGPJztcclxuXHJcbiAgICAgICAgaWYgKHdhcm5pbmcubGVuZ3RoID4gMiApIHtcclxuICAgICAgICAgICAgLy8g0LXRgdGC0Ywg0L/RgNC+0LHQu9C10LzRi1xyXG4gICAgICAgICAgICB3YXJuaW5nID0gJ9Ce0YLRgdGD0YLRgdCy0YPRjtGCINC00LDQvdC90YvQtTonICsgd2FybmluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ZhbGlkYXRlZCcsIHdhcm5pbmcsIHRoaXMucmVmc1snbm9taWQnXS5zdGF0ZS52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hlY2tlZDogdHJ1ZSwgd2FybmluZzogd2FybmluZ30pO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgcm93ID0gdGhpcy5zdGF0ZS5yb3csXHJcbiAgICAgICAgICAgIHZhbGlkYXRlTWVzc2FnZSA9IHRoaXMuc3RhdGUud2FybmluZyxcclxuICAgICAgICAgICAgYnV0dG9uT2tSZWFkT25seSA9IHZhbGlkYXRlTWVzc2FnZS5sZW5ndGggPiAwIHx8ICF0aGlzLnN0YXRlLmNoZWNrZWQ7XHJcbi8vICAgICAgICBjb25zb2xlLmxvZygncm93IHJlbmRlcjonLHZhbGlkYXRlTWVzc2FnZSwgYnV0dG9uT2tSZWFkT25seSApO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJtb2RhbFBhZ2VcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2UsIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJSZWEgbGlzYW1pbmUgLyBwYXJhbmRhbWluZVwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk9wZXJhdHNpb29uOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJub21pZFwiLCBsaWJzOiBcIm5vbWVuY2xhdHVyZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cubm9taWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogcm93Lmtvb2QsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJub21pZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLYXNzYSBvcGVyYXRzaW9vbmkga29vZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN1bW1hOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlN1bW1hOlwiLCB2YWx1ZTogcm93LnN1bW1hLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcImZhbHNlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCByZWY6IFwic3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlByb2pla3Q6XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJvalwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcInByb2plY3RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LnByb2osIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJrb29kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJwcm9qXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlByb2pla3RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVHVubnVzOlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR1bm51c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcInR1bm51c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cudHVubnVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsSWQ6IFwia29vZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwidHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkxhdXNlbmRpIHR1bm51c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHZhbGlkYXRlTWVzc2FnZSkpLCBcIjtcIlxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbi8qXHJcbjxkaXY+XHJcbiAgICB7YnV0dG9uT2tSZWFkT25seSA/XHJcbiAgICAgICAgPGJ1dHRvbiBkaXNhYmxlZD4gT2sgPC9idXR0b24+OlxyXG4gICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5tb2RhbFBhZ2VDbGljay5iaW5kKHRoaXMsJ09rJyl9PiBPayA8L2J1dHRvbj5cclxuICAgIH1cclxuICAgIDxidXR0b24gb25DbGljaz17dGhpcy5tb2RhbFBhZ2VDbGljay5iaW5kKHRoaXMsJ0NhbmNlbCcpfT4gQ2FuY2VsPC9idXR0b24+XHJcbjwvZGl2PlxyXG4qL1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU29yZGVyR3JpZFJvdztcclxuXHJcbi8qXHJcbiA8SW5wdXRUZXh0IHRpdGxlPSdLb29kICcgbmFtZT0na29vZCcgdmFsdWU9e3Jvdy5rb29kfSByZWFkT25seT17ZmFsc2V9XHJcbiBkaXNhYmxlZD1cImZhbHNlXCIgcmVmPSdrb29kJyA+PC9JbnB1dFRleHQ+XHJcbiAqL1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvc29yZGVyLWdyaWQtcm93LmpzeFxuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IEZvcm0gPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2Zvcm0uanMnKSxcclxuICAgIFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGFnZV9sYWJlbCcpLFxyXG4gICAgSW5wdXRUZXh0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dC5qc3gnKSxcclxuICAgIElucHV0RGF0ZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LWRhdGUuanN4JyksXHJcbiAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LW51bWJlci5qc3gnKSxcclxuICAgIFRvb2xiYXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy10b29sYmFyLmpzeCcpLFxyXG4gICAgRG9jQ29tbW9uID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtY29tbW9uLmpzeCcpLFxyXG4gICAgU2VsZWN0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtc2VsZWN0LmpzeCcpLFxyXG4gICAgVGV4dEFyZWEgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0YXJlYS5qc3gnKSxcclxuICAgIERhdGFHcmlkID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtZGF0YS1ncmlkLmpzeCcpLFxyXG4gICAgR3JpZFJvdyA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvc29yZGVyLWdyaWQtcm93LmpzeCcpO1xyXG5cclxudmFyIGRvY1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2RvY19zdG9yZS5qcycpLFxyXG4gICAgcmVsYXRlZERvY3VtZW50cyA9IHJlcXVpcmUoJy4uL21peGluL3JlbGF0ZWREb2N1bWVudHMuanN4JyksXHJcbiAgICB2YWxpZGF0ZUZvcm0gPSByZXF1aXJlKCcuLi9taXhpbi92YWxpZGF0ZUZvcm0nKTtcclxuXHJcbnZhciBub3cgPSBuZXcgRGF0ZSgpO1xyXG5cclxuY29uc3QgVm9yZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlZvcmRlclwiLFxyXG4gICAgcGFnZXM6ICBbe3BhZ2VOYW1lOiAnVsOkbGphbWFrc2Uga2Fzc2FvcmRlcid9XSxcclxuICAgIHJlcXVpcmVkRmllbGRzOiAgW1xyXG4gICAgICAgIHtuYW1lOiAna3B2JywgdHlwZTogJ0QnLCBtaW46IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSAtIDEpLCBtYXg6IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSArIDEpfSxcclxuICAgICAgICB7bmFtZTogJ2FzdXR1c2lkJywgdHlwZTogJ0knfSxcclxuICAgICAgICB7bmFtZTogJ25pbWknLCB0eXBlOiAnQyd9LFxyXG4gICAgICAgIHtuYW1lOiAnc3VtbWEnLCB0eXBlOiAnTid9XHJcbiAgICBdLFxyXG4vKlxyXG4gICAgbWl4aW5zOiBbcmVsYXRlZERvY3VtZW50cywgdmFsaWRhdGVGb3JtXSxcclxuKi9cclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDRg9GB0YLQsNC90L7QstC40Lwg0LjQt9C90LDRh9Cw0LvRjNC90YvQtSDQtNCw0L3QvdGL0LVcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkb2NEYXRhOiB0aGlzLnByb3BzLmRhdGEucm93LFxyXG4gICAgICAgICAgICBlZGl0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93TWVzc2FnZUJveDogJ25vbmUnLFxyXG4gICAgICAgICAgICBncmlkRGF0YTogdGhpcy5wcm9wcy5kYXRhLmRldGFpbHMsXHJcbiAgICAgICAgICAgIHJlbGF0aW9uczogdGhpcy5wcm9wcy5kYXRhLnJlbGF0aW9ucyxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZzogdGhpcy5wcm9wcy5kYXRhLmdyaWRDb25maWcsXHJcbiAgICAgICAgICAgIGdyaWRSb3dFZGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgZ3JpZFJvd0V2ZW50OiBudWxsLFxyXG4gICAgICAgICAgICBncmlkUm93RGF0YTogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINC/0LjRiNC10Lwg0LjRgdGF0L7QtNC90YvQtSDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1LCDRgNC10LPQuNGB0YLRgNC40YDRg9C10Lwg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgZGF0YSA9IHNlbGYucHJvcHMuZGF0YS5yb3csXHJcbiAgICAgICAgICAgIGRldGFpbHMgPSBzZWxmLnByb3BzLmRhdGEuZGV0YWlscyxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZyA9IHNlbGYucHJvcHMuZGF0YS5ncmlkQ29uZmlnO1xyXG5cclxuICAgICAgICAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NJZENoYW5nZScsIGRhdGEuaWQpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RldGFpbHNDaGFuZ2UnLCBkZXRhaWxzKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkQ29uZmlnQ2hhbmdlJywgZ3JpZENvbmZpZyk7IC8vINC00LDQvdC90YvQtSDQs9GA0LjQtNCwXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZE5hbWUnLCAnc29yZGVyLWdyaWQtcm93Jyk7IC8vINC30LDQtNCw0LXQvCDQuNC80Y8g0LrQvtC80L/QvtC90LXQvdGC0LAg0YHRgtGA0L7QutC4INCz0YDQuNC00LAgKNC00LvRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcblxyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtlZGl0ZWQ6IG5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINCyINCz0YDQuNC00LVcclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRldGFpbHMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGlzQ2hhbmdlZCA9IEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdldmVudCBkZXRhaWxzIGNoYW5nZWQnLCBpc0NoYW5nZWQsIHR5cGVvZiBuZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQuNGC0L7Qs9C4XHJcbiAgICAgICAgICAgICAgICBsZXQgc3VtbWEgPSBuZXdWYWx1ZS5yZWR1Y2UoZnVuY3Rpb24oc3VtLCByb3cpICB7cmV0dXJuIHN1bSArIE51bWJlcihyb3cuc3VtbWEpO30sMCksIC8vINGB0YPQvNC80LAg0LTQvtC60YPQvNC10L3RgtCwXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jRGF0YSA9IHNlbGYuc3RhdGUuZG9jRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2NEYXRhLnN1bW1hID0gc3VtbWE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbmV3IHN1bW1hOicsIHN1bW1hKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2dyaWREYXRhOiBuZXdWYWx1ZSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTpkYXRhJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd2b3JkZXIgb25DaGFuZ2UgJywgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKSkge1xyXG4vLyAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtlZGl0ZWQ6IG5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INC40LfQvNC10L3QtdC90LjRjyDQvdCwINC/0L7Qu9C1IGFzdXR1c2lkINC4INGC0L7Qs9C00LAg0LfQsNC/0YDQvtGBINC90LAg0L3QvtC80LXRgNCwINGB0YfQtdGC0L7QsiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4INCY0JQg0YPRh9GA0LXQttC00LXQvdC40Y8g0Lgg0L3QvtC80LXRgNCwINGB0YfQtdGC0LBcclxuLy8gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3ZvcmRlciBvbkNoYW5nZSAnLCBuZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKCFuZXdWYWx1ZS5hc3V0dXNpZCApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdGC0LjRgNCw0LXQvCDRgdGB0YvQu9C60YMg0L3QsCDRgdGH0LXRglxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYXJ2aWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RvY0RhdGE6IGRhdGF9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vINGD0YHRgtCw0L3QvtCy0LjQvCDQvdC+0LLRi9C5INGE0LjQu9GM0YLRgFxyXG4gICAgICAgICAgICAgICAgdmFyIGFydmVMaWJQYXJhbXMgPSBbZGF0YS5hc3V0dXNpZCwgZGF0YS5hcnZpZF07XHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzZXRMaWJzRmlsdGVyJywgJ2FydmVkJyxhcnZlTGliUGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0LfQsNCy0LjRgdC40LzQvtGB0YLQuFxyXG4gICAgICAgIHRoaXMucmVsYXRlZERvY3VtZW50cygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINCz0YDRg9C30LjQvCDRgdC/0YDQsNCy0L7Rh9C90LjQutC4XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignbG9hZExpYnMnLCAnJyk7XHJcblxyXG4gICAgICAgIC8vINC10YHQu9C4INC90L7QstGL0Lkg0LTQvtC60YPQvNC10L3RgiAoaWQgPT0gMClcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuc3RhdGUuZG9jRGF0YTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuaWQgPT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZWRpdGVkIG1vZGUgY29udHJvbCcsIGRhdGEpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdlZGl0ZWRDaGFuZ2UnLCB0cnVlKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2F2ZWRDaGFuZ2UnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGEsXHJcbiAgICAgICAgICAgIGlzRWRpdGVNb2RlID0gdGhpcy5zdGF0ZS5lZGl0ZWQsXHJcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94ID0gdGhpcy5zdGF0ZS5zaG93TWVzc2FnZUJveDsgLy8g0LHRg9C00LXRgiDRg9C/0YDQsNCy0LvRj9GC0Ywg0L7QutC90L7QvCDRgdC+0L7QsdGJ0LXQvdC40LlcclxuXHJcbiAgICAgICAgLy8gIHBhdHRlcm49J1tBLVphLXpdezN9J1xyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gdGhpcy5zdGF0ZS5ncmlkQ29uZmlnO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygndm9yZGVyIHBhZ2VzJywgdGhpcy5wYWdlcyk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtLCB7cGFnZXM6IHRoaXMucGFnZXMsIHJlZjogXCJmb3JtXCIsIG9uU3VibWl0OiB0aGlzLm9uU3VibWl0LCBzdHlsZToge2Rpc3BsYXk6ICd0YWJsZSd9fSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXIsIHt2YWxpZGF0b3I6IHRoaXMudmFsaWRhdGVGb3JtfSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImRpdi1kb2NcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQ29tbW9uLCB7ZGF0YTogZGF0YX0pLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZmllbGRzZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOdW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLm51bWJlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJmYWxzZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXREYXRlLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkt1dXDDpGV2IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3B2XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEua3B2LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrcHZcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLdXVww6RldlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiS2Fzc2FcIiwgbmFtZTogXCJrYXNzYV9pZFwiLCBsaWJzOiBcImFhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEua2Fzc2FfaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBkYXRhLmthc3NhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkthc3NhXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImthc3NhX2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiUGFydG5lclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYXN1dHVzaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcImFzdXR1c2VkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuYXN1dHVzaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBkYXRhLmFzdXR1cywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJQYXJ0bmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImFzdXR1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBcnZlIG5yLlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYXJ2aWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcImFydmVkU2lzc2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hcnZpZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsSWQ6IFwiaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGRhdGEuYXJ2bnIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiQXJ2ZSBuci5cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYXJ2aWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidG5EZWxldGU6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRva3VtZW50IFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rdW1lbnRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5kb2t1bWVudCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJEb2t1bWVudFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJkb2t1bWVudFwiLCByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5pbWlcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmltaVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTmltaVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcIm5pbWlcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFhZHJlc3MsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBYWRyZXNzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFhZHJlc3NcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkFhZHJlc3NcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJhYWRyZXNzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwidGV4dEFhZHJlc3NcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFhZHJlc3MsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkFsdXNcIiwgbmFtZTogXCJhbHVzXCIsIHBsYWNlaG9sZGVyOiBcIkFsdXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJhbHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwidGV4dEFsdXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFsdXMsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERhdGFHcmlkLCB7c291cmNlOiBcImRldGFpbHNcIiwgZ3JpZERhdGE6IGdyaWREYXRhLCBncmlkQ29sdW1uczogZ3JpZENvbHVtbnMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVHcmlkUm93OiB0aGlzLmhhbmRsZUdyaWRSb3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlLCByZWY6IFwiRGF0YUdyaWRcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiU3VtbWE6IFwiLCBuYW1lOiBcInN1bW1hXCIsIHBsYWNlaG9sZGVyOiBcIlN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuc3VtbWEsIGRpc2FibGVkOiBcInRydWVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIl5bMC05XSsoXFxcXC5bMC05XXsxLDR9KT8kXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyog0L/QsNGC0LXRgNC9INC00LvRjyDRhtC40YTRgCDRgSA0INC30L3QsNC60LDQvNC4INC/0L7RgdC70LUg0YLQvtGH0LrQuCovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJNw6Rya3VzZWRcIiwgbmFtZTogXCJtdXVkXCIsIHBsYWNlaG9sZGVyOiBcIk3DpHJrdXNlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcIm11dWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLm11dWQsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5ncmlkUm93RWRpdCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZFJvdywge21vZGFsUGFnZUNsaWNrOiB0aGlzLm1vZGFsUGFnZUNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZEV2ZW50OiB0aGlzLnN0YXRlLmdyaWRSb3dFdmVudCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRSb3dEYXRhOiB0aGlzLnN0YXRlLmdyaWRSb3dEYXRhfSkgOiBudWxsXHJcblxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlR3JpZFJvdzogZnVuY3Rpb24gKGdyaWRFdmVudCwgZGF0YSkge1xyXG4gICAgICAgIC8vINGD0L/RgNCw0LLQu9C10L3QuNC1INC80L7QtNCw0LvRjNC90YvQvCDQvtC60L3QvtC8XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IHRydWUsIGdyaWRSb3dFdmVudDogZ3JpZEV2ZW50LCBncmlkUm93RGF0YTogZGF0YX0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBtb2RhbFBhZ2VDbGljazogZnVuY3Rpb24gKGJ0bkV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgLy8g0L7RgtGA0LDQsdC+0YLQsNC10LwgT2sg0LjQtyDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsFxyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRldGFpbHMsXHJcbiAgICAgICAgICAgIGRvY0RhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICBncmlkUm93SWQgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5ncmlkUm93SWQsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZ3JpZENvbmZpZztcclxuICAgICAgICB2YXIgZ3JpZFJvdyA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoZ3JpZFJvd0lkID49IDApIHtcclxuICAgICAgICAgICAgZ3JpZFJvdyA9IGdyaWREYXRhW2dyaWRSb3dJZF07XHJcbiAgICAgICAgfVxyXG4vLyAgICAgICAgY29uc29sZS5sb2coJ3ByZXZpb3Mgc3RhdGUgZ3JpZERhdGEsIGRvY0RhdGEnLCBncmlkRGF0YSwgIGRvY0RhdGEpO1xyXG5cclxuICAgICAgICBpZiAoYnRuRXZlbnQgPT0gJ09rJykge1xyXG4vLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgbW9kYWxQYWdlQ2xpY2sgZGF0YSwgZ3JpZFJvd0lkLCBncmlkUm93JywgZGF0YSwgZ3JpZFJvd0lkLCBncmlkUm93KTtcclxuICAgICAgICAgICAgaWYgKGdyaWRSb3dJZCA8IDApIHtcclxuICAgICAgICAgICAgICAgIC8vINC90L7QstCw0Y8g0LfQsNC/0LjRgdGMXHJcbiAgICAgICAgICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0L/Rg9GB0YLRg9GOINGB0YLRgNC+0LrRg1xyXG4vLyAgICAgICAgICAgICAgICBncmlkUm93ID17fTtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbJ2lkJ10gPSAnTkVXJyArIE1hdGgucmFuZG9tKCk7ICAvLyDQs9C10L3QtdGA0LjRgNGD0LXQvCDQvdC+0LLQvtC1INCY0JRcclxuICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zLmZvckVhY2goZnVuY3Rpb24oZmllbGQpICB7cmV0dXJuIGdyaWRSb3dbZmllbGRdID0gbnVsbDt9KTsgLy8g0YHQvtC30LTQsNC10Lwg0L/QvtC70Y8g0LIg0L7QsdGK0LXQutGC0LVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSAge1xyXG4gICAgICAgICAgICAgICAgZ3JpZFJvd1tmaWVsZC5uYW1lXSA9IGZpZWxkLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn0YHQvtGF0YDQsNC90LjQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1LCBncmlkUm93JywgZ3JpZFJvdyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g0LfQsNC/0L7Qu9C90LjQvCDQv9C+0LvRjyBuaW1ldHVzXHJcbiAgICAgICAgICAgIHZhciBsaWJzID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUubGlicyxcclxuICAgICAgICAgICAgICAgIG5vbUxpYiA9IGxpYnMuZmlsdGVyKGZ1bmN0aW9uKGRhdGEpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaWQgPT0gJ25vbWVuY2xhdHVyZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyICAgbm9tUm93ID0gbm9tTGliWzBdLmRhdGEuZmlsdGVyKGZ1bmN0aW9uKHJvdykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdy5pZCA9PSBOdW1iZXIoZ3JpZFJvdy5ub21pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChub21Sb3cpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbJ25pbWV0dXMnXSA9IG5vbVJvd1swXS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWZ0ZXIgc3RhdGUgZ3JpZERhdGEgJXMsIGRvY0RhdGEgJXMnLCBncmlkRGF0YSwgIGRvY0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGdyaWRSb3dJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YVtncmlkUm93SWRdID0gZ3JpZFJvdztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdyaWREYXRhLnB1c2goZ3JpZFJvdyk7IC8vINC00L7QsdCw0LLQu9GP0LXQvCDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRSb3dJZENoYW5nZScsIGdyaWREYXRhLmxlbmd0aCk7IC8vINC/0L7QvNC10YfQsNC10Lwg0L3QvtCy0YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINGB0YfQuNGC0LDQtdC8INC40YLQvtCz0LhcclxuXHJcbiAgICAgICAgdmFyIGRvY1N1bW1hID0gZ3JpZERhdGEucmVkdWNlKGZ1bmN0aW9uKHN1bSwgcm93KSAge3JldHVybiBzdW0gKyBOdW1iZXIocm93LnN1bW1hKTt9LCAwKTsgLy8g0YHRg9C80LzQsCDRgdGH0LXRgtCwXHJcblxyXG4gICAgICAgIGRvY0RhdGEuc3VtbWEgPSBkb2NTdW1tYTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZzWydEYXRhR3JpZCddLnJlcGxhY2VTdGF0ZSh7Z3JpZERhdGE6IGdyaWREYXRhfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IGZhbHNlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBWb3JkZXI7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy92b3JkZXIuanN4XG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5jb25zdCBGb3JtID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9mb3JtLmpzJyk7XHJcbmNvbnN0IFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGFnZV9sYWJlbCcpO1xyXG5cclxudmFyIHBhZ2VzID0gWydQYWdlMScsICdQYWdlMiddO1xyXG5cclxuY29uc3QgUGFsayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJQYWxrXCIsXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybSwge3BhZ2VzOiBwYWdlc30sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCIgUGFsayBcIilcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9fSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBhbGs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2NzL3BhbGtfb3Blci5qc3hcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQy9GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM3SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNyVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25RQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3ZSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdFVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Iiwic291cmNlUm9vdCI6IiJ9
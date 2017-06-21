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

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (docTypeId) {
	    // взависимости от типа документа вернет компонент документа

	    console.log('returnDocComponent:' + docTypeId);
	    var component = {};

	    switch (docTypeId) {
	        case 'SORDER':
	            component = __webpack_require__(66);
	            break;
	        case 'VORDER':
	            component = __webpack_require__(80);
	            break;
	        case 'PALK':
	            component = __webpack_require__(81);
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

/***/ 81:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jLmpzIiwid2VicGFjazovLy8uL21pZGRsZXdhcmUvcmV0dXJuRG9jQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3Mvc29yZGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9wYWdlX2xhYmVsLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWlucHV0LXRleHQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWlucHV0LWRhdGUuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvaW5wdXQtZGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtbnVtYmVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy10b29sYmFyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1idXR0b24uanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWNvbW1vbi5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dGFyZWEuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWRhdGEtZ3JpZC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9teWJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3NvcmRlci1ncmlkLXJvdy5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jcy92b3JkZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvcGFsa19vcGVyLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuLypcclxuICAgIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBkb2NDb21wb25lbnQgPSAnJztcclxuKi9cblxuLy8g0LTQsNC90L3Ri9C1INC00LvRjyDRhdGA0LDQvdC40LvQuNGJ0LBcbmxvY2FsU3RvcmFnZVsnZG9jU3RvcmUnXSA9IHN0b3JlRGF0YTtcbnN0b3JlRGF0YSA9IEpTT04ucGFyc2Uoc3RvcmVEYXRhKTtcblxuLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0LTQsNC90L3RhVxuLypcclxuZG9jU3RvcmUub24oJ2NoYW5nZTpkYXRhJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgIC8vINC00LDQvdC90YvQtSDQuNC30LzQtdC90LjQu9C40YHRjCwg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgIHNlbGYuc2V0U3RhdGUoe2RvY0RhdGE6ZG9jU3RvcmUuZGF0YX0pXHJcbiAgICB9XHJcbn0pXHJcbiovXG5cbi8vINC30LDQv9GA0L7RgdC40Lwg0LrQvtC80L/QvtC90LXQvdGCINC00L7QutGD0LzQtdC90YLQsCDQv9C+INC10LPQviDRgtC40L/Rg1xudmFyIERvYyA9IHJlcXVpcmUoJy4uL21pZGRsZXdhcmUvcmV0dXJuRG9jQ29tcG9uZW50Jykoc3RvcmVEYXRhLmRvY1R5cGVJZCk7XG5cblJlYWN0RE9NLnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KERvYywgeyBkYXRhOiBzdG9yZURhdGEuZGF0YSwgYnBtOiBzdG9yZURhdGEuYnBtIH0pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG9jJykpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9jVHlwZUlkKSB7XG4gICAgLy8g0LLQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+0YIg0YLQuNC/0LAg0LTQvtC60YPQvNC10L3RgtCwINCy0LXRgNC90LXRgiDQutC+0LzQv9C+0L3QtdC90YIg0LTQvtC60YPQvNC10L3RgtCwXG5cbiAgICBjb25zb2xlLmxvZygncmV0dXJuRG9jQ29tcG9uZW50OicgKyBkb2NUeXBlSWQpO1xuICAgIHZhciBjb21wb25lbnQgPSB7fTtcblxuICAgIHN3aXRjaCAoZG9jVHlwZUlkKSB7XG4gICAgICAgIGNhc2UgJ1NPUkRFUic6XG4gICAgICAgICAgICBjb21wb25lbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL3NvcmRlci5qc3gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdWT1JERVInOlxuICAgICAgICAgICAgY29tcG9uZW50ID0gcmVxdWlyZSgnLi4vZnJvbnRlbmQvZG9jcy92b3JkZXIuanN4Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnUEFMSyc6XG4gICAgICAgICAgICBjb21wb25lbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL3BhbGtfb3Blci5qc3gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29tcG9uZW50ID0gcmVxdWlyZSgnLi4vZnJvbnRlbmQvZG9jcy9hcnZlL2FydmUuanN4Jyk7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbWlkZGxld2FyZS9yZXR1cm5Eb2NDb21wb25lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBGb3JtID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9mb3JtLmpzJyksXHJcbiAgICBQYWdlTGFiZWwgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3BhZ2VfbGFiZWwnKSxcclxuICAgIElucHV0VGV4dCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LXRleHQuanN4JyksXHJcbiAgICBJbnB1dERhdGUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRlLmpzeCcpLFxyXG4gICAgSW5wdXROdW1iZXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1udW1iZXIuanN4JyksXHJcbiAgICBUb29sYmFyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtdG9vbGJhci5qc3gnKSxcclxuICAgIERvY0NvbW1vbiA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWNvbW1vbi5qc3gnKSxcclxuICAgIFNlbGVjdCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LXNlbGVjdC5qc3gnKSxcclxuICAgIFRleHRBcmVhID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dGFyZWEuanN4JyksXHJcbiAgICBEYXRhR3JpZCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWRhdGEtZ3JpZC5qc3gnKSxcclxuICAgIEdyaWRSb3cgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3NvcmRlci1ncmlkLXJvdy5qc3gnKTtcclxuXHJcbnZhciBkb2NTdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3Jlcy9kb2Nfc3RvcmUuanMnKSxcclxuICAgIHJlbGF0ZWREb2N1bWVudHMgPSByZXF1aXJlKCcuLi9taXhpbi9yZWxhdGVkRG9jdW1lbnRzLmpzeCcpLFxyXG4gICAgdmFsaWRhdGVGb3JtID0gcmVxdWlyZSgnLi4vbWl4aW4vdmFsaWRhdGVGb3JtJyk7XHJcblxyXG52YXIgbm93ID0gbmV3IERhdGUoKTtcclxuXHJcbmNvbnN0IFNvcmRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJTb3JkZXJcIixcclxuICAgIHBhZ2VzOiAgW3twYWdlTmFtZTogJ1Npc3NldHVsaWt1IGthc3Nhb3JkZXInfV0sXHJcbiAgICByZXF1aXJlZEZpZWxkczogIFtcclxuICAgICAgICB7bmFtZTogJ2twdicsIHR5cGU6ICdEJywgbWluOiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgLSAxKSwgbWF4OiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgKyAxKX0sXHJcbiAgICAgICAge25hbWU6ICdhc3V0dXNpZCcsIHR5cGU6ICdJJ30sXHJcbiAgICAgICAge25hbWU6ICduaW1pJywgdHlwZTogJ0MnfSxcclxuICAgICAgICB7bmFtZTogJ3N1bW1hJywgdHlwZTogJ04nfVxyXG4gICAgXSxcclxuLypcclxuICAgIG1peGluczogW3JlbGF0ZWREb2N1bWVudHMsIHZhbGlkYXRlRm9ybV0sXHJcbiovXHJcbiAgICByZWxhdGVkRG9jdW1lbnRzOiBmdW5jdGlvbigpICB7XHJcbiAgICAgICAgcmV0dXJuIHJlbGF0ZWREb2N1bWVudHModGhpcylcclxuICAgIH0uYmluZCh0aGlzKSxcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDRg9GB0YLQsNC90L7QstC40Lwg0LjQt9C90LDRh9Cw0LvRjNC90YvQtSDQtNCw0L3QvdGL0LVcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkb2NEYXRhOiB0aGlzLnByb3BzLmRhdGEucm93LFxyXG4gICAgICAgICAgICBlZGl0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93TWVzc2FnZUJveDogJ25vbmUnLFxyXG4gICAgICAgICAgICBncmlkRGF0YTogdGhpcy5wcm9wcy5kYXRhLmRldGFpbHMsXHJcbiAgICAgICAgICAgIHJlbGF0aW9uczogdGhpcy5wcm9wcy5kYXRhLnJlbGF0aW9ucyxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZzogdGhpcy5wcm9wcy5kYXRhLmdyaWRDb25maWcsXHJcbiAgICAgICAgICAgIGdyaWRSb3dFZGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgZ3JpZFJvd0V2ZW50OiBudWxsLFxyXG4gICAgICAgICAgICBncmlkUm93RGF0YTogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuLypcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINC/0LjRiNC10Lwg0LjRgdGF0L7QtNC90YvQtSDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1LCDRgNC10LPQuNGB0YLRgNC40YDRg9C10Lwg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgZGF0YSA9IHNlbGYucHJvcHMuZGF0YS5yb3csXHJcbiAgICAgICAgICAgIGRldGFpbHMgPSBzZWxmLnByb3BzLmRhdGEuZGV0YWlscyxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZyA9IHNlbGYucHJvcHMuZGF0YS5ncmlkQ29uZmlnO1xyXG5cclxuICAgICAgICAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NJZENoYW5nZScsIGRhdGEuaWQpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RldGFpbHNDaGFuZ2UnLCBkZXRhaWxzKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkQ29uZmlnQ2hhbmdlJywgZ3JpZENvbmZpZyk7IC8vINC00LDQvdC90YvQtSDQs9GA0LjQtNCwXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZE5hbWUnLCAnc29yZGVyLWdyaWQtcm93Jyk7IC8vINC30LDQtNCw0LXQvCDQuNC80Y8g0LrQvtC80L/QvtC90LXQvdGC0LAg0YHRgtGA0L7QutC4INCz0YDQuNC00LAgKNC00LvRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcblxyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtlZGl0ZWQ6IG5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINCyINCz0YDQuNC00LVcclxuICAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTpkZXRhaWxzJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICB2YXIgaXNDaGFuZ2VkID0gSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKTtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdldmVudCBkZXRhaWxzIGNoYW5nZWQnLCBpc0NoYW5nZWQsIHR5cGVvZiBuZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgaWYgKGlzQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgIC8vINC40YLQvtCz0LhcclxuICAgICAgICAgICAgICAgICBsZXQgc3VtbWEgPSBuZXdWYWx1ZS5yZWR1Y2UoKHN1bSwgcm93KSA9PiBzdW0gKyBOdW1iZXIocm93LnN1bW1hKSwwKSwgLy8g0YHRg9C80LzQsCDQtNC+0LrRg9C80LXQvdGC0LBcclxuICAgICAgICAgICAgICAgICBkb2NEYXRhID0gc2VsZi5zdGF0ZS5kb2NEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICBkb2NEYXRhLnN1bW1hID0gc3VtbWE7XHJcbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgc3VtbWE6Jywgc3VtbWEpO1xyXG4gICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2dyaWREYXRhOiBuZXdWYWx1ZSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XHJcbiAgICAgICAgdGhpcy5yZWxhdGVkRG9jdW1lbnRzKCk7XHJcbiAgICB9LFxyXG4qL1xyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIC8vINC/0LjRiNC10Lwg0LjRgdGF0L7QtNC90YvQtSDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1LCDRgNC10LPQuNGB0YLRgNC40YDRg9C10Lwg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDRgdC+0LHRi9GC0LjQuVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgZGF0YSA9IHNlbGYucHJvcHMuZGF0YS5yb3csXHJcbiAgICAgICAgICAgIGRldGFpbHMgPSBzZWxmLnByb3BzLmRhdGEuZGV0YWlscyxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZyA9IHNlbGYucHJvcHMuZGF0YS5ncmlkQ29uZmlnO1xyXG5cclxuICAgICAgICAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NJZENoYW5nZScsIGRhdGEuaWQpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RldGFpbHNDaGFuZ2UnLCBkZXRhaWxzKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkQ29uZmlnQ2hhbmdlJywgZ3JpZENvbmZpZyk7IC8vINC00LDQvdC90YvQtSDQs9GA0LjQtNCwXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZE5hbWUnLCAnc29yZGVyLWdyaWQtcm93Jyk7IC8vINC30LDQtNCw0LXQvCDQuNC80Y8g0LrQvtC80L/QvtC90LXQvdGC0LAg0YHRgtGA0L7QutC4INCz0YDQuNC00LAgKNC00LvRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcblxyXG4gICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtlZGl0ZWQ6IG5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINCyINCz0YDQuNC00LVcclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRldGFpbHMnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGlzQ2hhbmdlZCA9IEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldmlvdXNWYWx1ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdldmVudCBkZXRhaWxzIGNoYW5nZWQnLCBpc0NoYW5nZWQsIHR5cGVvZiBuZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQuNGC0L7Qs9C4XHJcbiAgICAgICAgICAgICAgICBsZXQgc3VtbWEgPSBuZXdWYWx1ZS5yZWR1Y2UoZnVuY3Rpb24oc3VtLCByb3cpICB7cmV0dXJuIHN1bSArIE51bWJlcihyb3cuc3VtbWEpO30sMCksIC8vINGB0YPQvNC80LAg0LTQvtC60YPQvNC10L3RgtCwXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jRGF0YSA9IHNlbGYuc3RhdGUuZG9jRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2NEYXRhLnN1bW1hID0gc3VtbWE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbmV3IHN1bW1hOicsIHN1bW1hKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2dyaWREYXRhOiBuZXdWYWx1ZSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0LfQsNCy0LjRgdC40LzQvtGB0YLQuFxyXG4gICAgICAgIHRoaXMucmVsYXRlZERvY3VtZW50cygpO1xyXG5cclxuICAgICAgICAvLyDQs9GA0YPQt9C40Lwg0YHQv9GA0LDQstC+0YfQvdC40LrQuFxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2xvYWRMaWJzJywgJycpO1xyXG5cclxuICAgICAgICAvLyDQtdGB0LvQuCDQvdC+0LLRi9C5INC00L7QutGD0LzQtdC90YIgKGlkID09IDApXHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGE7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmlkID09IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2VkaXRlZCBtb2RlIGNvbnRyb2wnLCBkYXRhKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5zdGF0ZS5kb2NEYXRhLFxyXG4gICAgICAgICAgICBpc0VkaXRlTW9kZSA9IHRoaXMuc3RhdGUuZWRpdGVkLFxyXG4gICAgICAgICAgICBzaG93TWVzc2FnZUJveCA9IHRoaXMuc3RhdGUuc2hvd01lc3NhZ2VCb3g7IC8vINCx0YPQtNC10YIg0YPQv9GA0LDQstC70Y/RgtGMINC+0LrQvdC+0Lwg0YHQvtC+0LHRidC10L3QuNC5XHJcblxyXG4gICAgICAgIC8vICBwYXR0ZXJuPSdbQS1aYS16XXszfSdcclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSB0aGlzLnN0YXRlLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBncmlkQ29sdW1ucyA9IHRoaXMuc3RhdGUuZ3JpZENvbmZpZztcclxuXHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybSwge3BhZ2VzOiB0aGlzLnBhZ2VzLCByZWY6IFwiZm9ybVwiLCBvblN1Ym1pdDogdGhpcy5vblN1Ym1pdCwgc3R5bGU6IHtkaXNwbGF5OiAndGFibGUnfX0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyLCB7dmFsaWRhdG9yOiB0aGlzLnZhbGlkYXRlRm9ybX0pLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJkaXYtZG9jXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERvY0NvbW1vbiwge2RhdGE6IGRhdGF9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZpZWxkc2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTnVtYmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJudW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5udW1iZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiZmFsc2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0RGF0ZSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJLdXVww6RldiBcIiwgbmFtZTogXCJrcHZcIiwgdmFsdWU6IGRhdGEua3B2LCByZWY6IFwia3B2XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiS3V1cMOkZXZcIiwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJLYXNzYVwiLCBuYW1lOiBcImthc3NhX2lkXCIsIGxpYnM6IFwiYWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5rYXNzYV9pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsSWQ6IFwiaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGRhdGEua2Fzc2EsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiS2Fzc2FcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwia2Fzc2FfaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJQYXJ0bmVyXCIsIG5hbWU6IFwiYXN1dHVzaWRcIiwgbGliczogXCJhc3V0dXNlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFzdXR1c2lkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZGF0YS5hc3V0dXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiUGFydG5lclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJhc3V0dXNpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBcnZlIG5yLlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYXJ2aWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcImFydmVkVmFsamFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hcnZpZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsSWQ6IFwiaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGRhdGEuYXJ2bnIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiQXJ2ZSBuci5cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYXJ2aWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidG5EZWxldGU6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiRG9rdW1lbnQgXCIsIG5hbWU6IFwiZG9rdW1lbnRcIiwgdmFsdWU6IGRhdGEuZG9rdW1lbnQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiRG9rdW1lbnRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZG9rdW1lbnRcIiwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIk5pbWlcIiwgbmFtZTogXCJuaW1pXCIsIHBsYWNlaG9sZGVyOiBcIk5pbWlcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJuaW1pXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hYWRyZXNzLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCB3aWR0aDogXCI4NSVcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJBYWRyZXNzXCIsIG5hbWU6IFwiYWFkcmVzc1wiLCBwbGFjZWhvbGRlcjogXCJBYWRyZXNzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYWFkcmVzc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuYWFkcmVzcywgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgd2lkdGg6IFwiODUlXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiQWx1c1wiLCBuYW1lOiBcImFsdXNcIiwgcGxhY2Vob2xkZXI6IFwiQWx1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImFsdXNcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFsdXMsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KERhdGFHcmlkLCB7c291cmNlOiBcImRldGFpbHNcIiwgZ3JpZERhdGE6IGdyaWREYXRhLCBncmlkQ29sdW1uczogZ3JpZENvbHVtbnMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVHcmlkUm93OiB0aGlzLmhhbmRsZUdyaWRSb3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlLCByZWY6IFwiRGF0YUdyaWRcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiU3VtbWE6IFwiLCBuYW1lOiBcInN1bW1hXCIsIHBsYWNlaG9sZGVyOiBcIlN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInN1bW1hXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuc3VtbWEsIGRpc2FibGVkOiBcInRydWVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIl5bMC05XSsoXFxcXC5bMC05XXsxLDR9KT8kXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyog0L/QsNGC0LXRgNC9INC00LvRjyDRhtC40YTRgCDRgSA0INC30L3QsNC60LDQvNC4INC/0L7RgdC70LUg0YLQvtGH0LrQuCovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJNw6Rya3VzZWRcIiwgbmFtZTogXCJtdXVkXCIsIHBsYWNlaG9sZGVyOiBcIk3DpHJrdXNlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcIm11dWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLm11dWQsIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsIHdpZHRoOiBcIjg1JVwifSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5ncmlkUm93RWRpdCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZFJvdywge21vZGFsUGFnZUNsaWNrOiB0aGlzLm1vZGFsUGFnZUNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZEV2ZW50OiB0aGlzLnN0YXRlLmdyaWRSb3dFdmVudCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRSb3dEYXRhOiB0aGlzLnN0YXRlLmdyaWRSb3dEYXRhfSkgOiBudWxsXHJcblxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlR3JpZFJvdzogZnVuY3Rpb24gKGdyaWRFdmVudCwgZGF0YSkge1xyXG4gICAgICAgIC8vINGD0L/RgNCw0LLQu9C10L3QuNC1INC80L7QtNCw0LvRjNC90YvQvCDQvtC60L3QvtC8XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZFJvd0VkaXQ6IHRydWUsIGdyaWRSb3dFdmVudDogZ3JpZEV2ZW50LCBncmlkUm93RGF0YTogZGF0YX0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBtb2RhbFBhZ2VDbGljazogZnVuY3Rpb24gKGJ0bkV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgLy8g0L7RgtGA0LDQsdC+0YLQsNC10LwgT2sg0LjQtyDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsFxyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRldGFpbHMsXHJcbiAgICAgICAgICAgIGRvY0RhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICBncmlkUm93SWQgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5ncmlkUm93SWQsXHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZ3JpZENvbmZpZztcclxuICAgICAgICB2YXIgZ3JpZFJvdyA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoZ3JpZFJvd0lkID49IDApIHtcclxuICAgICAgICAgICAgZ3JpZFJvdyA9IGdyaWREYXRhW2dyaWRSb3dJZF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwcmV2aW9zIHN0YXRlIGdyaWREYXRhLCBkb2NEYXRhJywgZ3JpZERhdGEsICBkb2NEYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJyBtb2RhbFBhZ2VDbGljayBkYXRhLCBncmlkUm93SWQsIGdyaWRSb3cnLCBkYXRhLCBncmlkUm93SWQsIGdyaWRSb3cpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZFJvd0lkIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgLy8g0L3QvtCy0LDRjyDQt9Cw0L/QuNGB0YxcclxuICAgICAgICAgICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQv9GD0YHRgtGD0Y4g0YHRgtGA0L7QutGDXHJcbi8vICAgICAgICAgICAgICAgIGdyaWRSb3cgPXt9O1xyXG4gICAgICAgICAgICAgICAgZ3JpZFJvd1snaWQnXSA9ICdORVcnICsgTWF0aC5yYW5kb20oKTsgIC8vINCz0LXQvdC10YDQuNGA0YPQtdC8INC90L7QstC+0LUg0JjQlFxyXG4gICAgICAgICAgICAgICAgZ3JpZENvbHVtbnMuZm9yRWFjaChmdW5jdGlvbihmaWVsZCkgIHtyZXR1cm4gZ3JpZFJvd1tmaWVsZF0gPSBudWxsO30pOyAvLyDRgdC+0LfQtNCw0LXQvCDQv9C+0LvRjyDQsiDQvtCx0YrQtdC60YLQtVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vINGB0L7RhdGA0LDQvdC40Lwg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24oZmllbGQpICB7XHJcbiAgICAgICAgICAgICAgICBncmlkUm93W2ZpZWxkLm5hbWVdID0gZmllbGQudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfRgdC+0YXRgNCw0L3QuNC8INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LUsIGdyaWRSb3cnLCBncmlkUm93KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyDQt9Cw0L/QvtC70L3QuNC8INC/0L7Qu9GPIG5pbWV0dXNcclxuICAgICAgICAgICAgdmFyIGxpYnMgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5saWJzLFxyXG4gICAgICAgICAgICAgbm9tTGliID0gbGlicy5maWx0ZXIoZnVuY3Rpb24oZGF0YSkgIHtcclxuICAgICAgICAgICAgICAgICBpZiAoZGF0YS5pZCA9PSAnbm9tZW5jbGF0dXJlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgdmFyICAgbm9tUm93ID0gbm9tTGliWzBdLmRhdGEuZmlsdGVyKGZ1bmN0aW9uKHJvdykge1xyXG4gICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT0gTnVtYmVyKGdyaWRSb3cubm9taWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgaWYgKG5vbVJvdykge1xyXG4gICAgICAgICAgICAgICAgIGdyaWRSb3dbJ25pbWV0dXMnXSA9IG5vbVJvd1swXS5uYW1lO1xyXG4gICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FmdGVyIHN0YXRlIGdyaWREYXRhICVzLCBkb2NEYXRhICVzJywgZ3JpZERhdGEsICBkb2NEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChncmlkUm93SWQgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGFbZ3JpZFJvd0lkXSA9IGdyaWRSb3c7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YS5wdXNoKGdyaWRSb3cpOyAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkUm93SWRDaGFuZ2UnLCBncmlkRGF0YS5sZW5ndGgpOyAvLyDQv9C+0LzQtdGH0LDQtdC8INC90L7QstGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGdyaWREYXRhKTsgLy8g0L/QuNGI0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDRgdGH0LjRgtCw0LXQvCDQuNGC0L7Qs9C4XHJcblxyXG4gICAgICAgIHZhciBkb2NTdW1tYSA9IGdyaWREYXRhLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSk7fSwgMCk7IC8vINGB0YPQvNC80LAg0YHRh9C10YLQsFxyXG5cclxuICAgICAgICBkb2NEYXRhLnN1bW1hID0gZG9jU3VtbWE7XHJcblxyXG4gICAgICAgIHRoaXMucmVmc1snRGF0YUdyaWQnXS5yZXBsYWNlU3RhdGUoe2dyaWREYXRhOiBncmlkRGF0YX0pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiBmYWxzZSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG5cclxuICAgIH0sXHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU29yZGVyO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2RvY3Mvc29yZGVyLmpzeFxuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbnZhciBQYWdlTGFiZWwgPSByZXF1aXJlKCcuL3BhZ2VfbGFiZWwnKTtcblxudmFyIEZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdGb3JtJyxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICB2YXIgcGFnZXMgPSBbeyBwYWdlTmFtZTogJ1BhZ2UnIH1dO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5wYWdlcykge1xuICAgICAgICAgICAgcGFnZXMgPSB0aGlzLnByb3BzLnBhZ2VzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYWdlczogdGhpcy5wcm9wcy5wYWdlc1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHBhZ2VzID0gdGhpcy5zdGF0ZS5wYWdlcztcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgY2xhc3NOYW1lOiAnY29udGFpbmVyJyB9LCBwYWdlcy5tYXAoZnVuY3Rpb24gKHBhZ2UsIGlkeCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGFnZUxhYmVsLCB7IGtleTogaWR4LCBwYWdlSWR4OiBpZHggfSwgcGFnZSk7XG4gICAgICAgIH0pLCBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGNsYXNzTmFtZTogJ3BhZ2UnIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nLCBudWxsLCB0aGlzLnByb3BzLmNoaWxkcmVuKSkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2Zvcm0uanNcbi8vIG1vZHVsZSBpZCA9IDY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xuXG52YXIgUGFnZUxhYmVsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnUGFnZUxhYmVsJyxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgLy8gICAgICBjb25zb2xlLmxvZygncGFnZSBsYWJlbCBjb21wb25lbnRXaWxsTW91bnQnKVxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7IGRpc2FibGVkOiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbiBoYW5kbGVDbGljayhwYWdlKSB7XG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0YHQvtCx0YvRgtC40LUg0LrQu9C40LosINC/0L7QtNCz0YDRg9C20LDQtdC8INGB0LLRj9C30LDQvdC90YvQuSDQtNC+0LrRg9C80LXQvdGCXG4gICAgICAgIC8vICAgICAgIGFsZXJ0KCdjbGljazonICsgcGFnZU5hbWUpO1xuICAgICAgICAvLyBkb2NUeXBlSWQ6IGRvYy5kb2NfdHlwZSwgZG9jSWQ6ZG9jLmlkLCBwYWdlTmFtZTonTGF1c2VuZCBpZDonICsgZG9jLmlkXG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYWdlIGRpc2FibGVkJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFnZS5kb2NJZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsZUNsaWNrIHBhZ2UuZG9jVHlwZUlkICVzLCBwYWdlLmRvY0lkICVuJyk7XG4gICAgICAgICAgICB2YXIgdXJsID0gXCIvZG9jdW1lbnQvXCIgKyBwYWdlLmRvY1R5cGVJZCArIHBhZ2UuZG9jSWQ7XG4gICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgY2xhc3NOYW1lID0gJ3BhZ2VMYWJlbCc7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeyBjbGFzc05hbWU6IGNsYXNzTmFtZSwgb25DbGljazogdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMsIHRoaXMucHJvcHMuY2hpbGRyZW4pLCBkaXNhYmxlZDogdGhpcy5zdGF0ZS5kaXNhYmxlZCB9LCB0aGlzLnByb3BzLmNoaWxkcmVuLnBhZ2VOYW1lLCAnICcpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VMYWJlbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvcGFnZV9sYWJlbC5qc1xuLy8gbW9kdWxlIGlkID0gNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBJbnB1dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJJbnB1dFwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB0cnVlLFxyXG4gICAgICAgICAgICB2YWxpZDogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogJ2RlZmF1bE5hbWUnLFxyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ2RlZmF1bE5hbWUnLFxyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXHJcbiAgICAgICAgICAgIHBhdHRlcm46ICcnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1IGRvY0lkLiDQldGB0LvQuCDQt9C90LDRh9C10L3QuNC1ID0gMCAo0LTQvtCx0LDQstC70Y/QtdC8INC90L7QstGD0Y4g0LfQsNC/0LjRgdGMLCDRgtC+INC/0YDQvtGB0YLQviDQvtGH0LjRgtC60LAg0L/QvtC70LXQuSwg0LjQvdCw0YfQtSDQv9C+0LTQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFXHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZG9jSWQnLCAgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGB0L7Qt9C00LDQvdC40LUg0L3QvtCy0L7Qs9C+INC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogMH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdvbiBjaGFuZ2U6ZWRpdGVkOicgKyBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkYXRhJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0YHQu9GD0YjRg9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINC00LDQvdC90YvRhTtcclxuLy8gICAgICAgICAgY29uc29sZS5sb2coJ2lucHV0LXRleHQgb24gY2hhbmdlIGRhdGE6JywgbmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gbmV3VmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhW3NlbGYucHJvcHMubmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uIChuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV4dFByb3BzLnZhbHVlfSlcclxuICAgIH0sXHJcblxyXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbiAobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAgICAvLyDQuNC30LzQtdC90LXQvdC40Y8g0LHRg9C00YPRgiDQvtGC0YDQsNC20LDRgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0YHQu9GD0YfQsNC1INC10YHQu9C4INGC0LDQutC40LUg0LXRgdGC0YxcclxuXHJcbiAgICAgICAgbGV0IHJldHVyblZhbHVlID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZSA9IChuZXh0U3RhdGUudmFsdWUgIT09IHRoaXMuc3RhdGUudmFsdWUgfHxcclxuICAgICAgICAgICAgbmV4dFN0YXRlLnJlYWRPbmx5ICE9PSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8XHJcbiAgICAgICAgICAgIG5leHRTdGF0ZS5kaXNhYmxlZCAhPT0gdGhpcy5zdGF0ZS5kaXNhYmxlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIGlzUGF0dGVyVmFsaWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5wYXR0ZXJuICYmIGZpZWxkVmFsdWUuY2hhckF0KGZpZWxkVmFsdWUubGVuZ3RoIC0gMSkgIT09ICcuJykge1xyXG5cclxuICAgICAgICAgICAgLy8g0L/RgNC+0LLQvtC00LjQvCDQv9GA0L7QstC10YDQutGDINC90LAg0YHQvtC+0YLQstC10YLRgdGC0LLQuNC1INGI0LDQsdC70L7QvdGDXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBmaWVsZFZhbHVlLm1hdGNoKHRoaXMucHJvcHMucGF0dGVybiwgJycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGF0dGVybiB2YWxlOicgKyBmaWVsZFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWUgPSBkYXRhW3RoaXMucHJvcHMubmFtZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0YLQvtC70YzQutC+INC10YHQu9C4INGB0L7QvtGC0LLQtdGC0YHRgtCy0YPQtdGCINC/0LDRgtGC0LXRgNC90YNcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdvbkNoYW5nZSBmaWVsZFZhbHVlIGZpbmlzaCcsIHRoaXMucHJvcHMubmFtZSwgdGhpcy5zdGF0ZS52YWx1ZSk7XHJcblxyXG4gICAgICAgIGRhdGFbdGhpcy5wcm9wcy5uYW1lXSA9IGZpZWxkVmFsdWU7XHJcbiAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAgLy8g0L7RgtC00LDQtNC40Lwg0L7QsdGA0LDQsdC+0YLRh9C40LrRgywg0LXRgdC70Lgg0LfQsNC00LDQvVxyXG4gICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAvLyDRgdC80L7RgtGA0LjQvCDQuiDRh9C10LzRgyDQv9GA0LjQstGP0LfQsNC9INGB0LXQu9C10LrRgiDQuCDQvtGC0LTQsNC40Lwg0LXQs9C+INC90LDQstC10YDRhVxyXG4gICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGUsIHRoaXMucHJvcHMubmFtZSk7IC8vINCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDQt9Cw0LTQsNC9INC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0LLQtdGA0YXQvdC10Lwg0YPRgNC+0LLQvdC1LCDQvtGC0LTQsNC00LjQvCDQvtCx0YDQsNCx0L7RgtC60YMg0YLRg9C00LBcclxuICAgICAgICAgfVxyXG4gICAgICAgICAqL1xyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaW5wdXRDbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZSB8fCAnJyArICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBpbnB1dFJlYWRPbmx5ID0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXREaXNhYmxlZCA9IHRoaXMuc3RhdGUuZGlzYWJsZWQsXHJcbiAgICAgICAgICAgIGlucHV0UGxhY2VIb2xkZXIgPSB0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8IHRoaXMucHJvcHMubmFtZSxcclxuICAgICAgICAgICAgbXlTdHlsZSA9IHt3aWR0aDogJ2F1dG8nfTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0UmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgaW5wdXRDbGFzc05hbWUgPSBpbnB1dENsYXNzTmFtZSArICcgZG9jLWlucHV0LXJlYWRvbmx5JztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMud2lkdGgpIHtcclxuICAgICAgICAgICAgbXlTdHlsZS53aWR0aCA9IHRoaXMucHJvcHMud2lkdGhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbnB1dERpc2FibGVkID09ICd0cnVlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwge2h0bWxGb3I6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb3JtLXdpZGdldC1sYWJlbFwiICsgaW5wdXRDbGFzc05hbWV9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJ0ZXh0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogbXlTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogaW5wdXRSZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy5wcm9wcy5wYXR0ZXJuLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcInRleHRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGlucHV0Q2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogaW5wdXRSZWFkT25seSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLnByb3BzLnBhdHRlcm4sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dC5qc3hcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIENvbXBvbmVudElucHV0RGF0ZSA9IHJlcXVpcmUoJy4vaW5wdXQtZGF0ZS5qc3gnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBJbnB1dERhdGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiSW5wdXREYXRlXCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcclxuICAgICAgICAgICAgcmVhZE9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkIHx8IHRydWUsXHJcbiAgICAgICAgICAgIHZhbGlkOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICAgICAgbW9udGggPSBkYXRlLmdldE1vbnRoKCksXHJcbiAgICAgICAgICAgIGRheSA9IGRhdGUuZ2V0RGF0ZSgpLFxyXG4gICAgICAgICAgICBtYXhEYXRlID0gbmV3IERhdGUoeWVhciArIDEsIG1vbnRoLCBkYXkpLFxyXG4gICAgICAgICAgICBtaW5EYXRlID0gbmV3IERhdGUoeWVhciAtIDEsIG1vbnRoLCBkYXkpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBiaW5kRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgbWluOiBtaW5EYXRlLFxyXG4gICAgICAgICAgICBtYXg6IG1heERhdGVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbiAobmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IG5leHRQcm9wcy52YWx1ZX0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINGB0L7QsdGL0YLQuNC1INC90LAg0LjQt9C80LXQvdC10L3QuNC1INGA0LXQttC40LzQsCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkgIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtyZWFkT25seTogIW5ld1ZhbHVlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAvLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSBkb2NJZC4g0JXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSA9IDAgKNC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQv9C40YHRjCwg0YLQviDQv9GA0L7RgdGC0L4g0L7Rh9C40YLQutCwINC/0L7Qu9C10LksINC40L3QsNGH0LUg0L/QvtC00LPRgNGD0LfQutCwINC00LDQvdC90YvRhVxyXG4gICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAvLyAgICAgICAgY29uc29sZS5sb2coJ2NvbXBvbmVudFdpbGxNb3VudCcgKyB0aGlzLnByb3BzLm5hbWUpO1xyXG4gICAgIC8hKlxyXG4gICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZG9jSWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0YHQvtC30LTQsNC90LjQtSDQvdC+0LLQvtCz0L4g0LTQvtC60YPQvNC10L3RgtCwXHJcbiAgICAgLyEqXHJcbiAgICAgdmFyIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgIHZhbHVlID0gZGF0YVtzZWxmLnByb3BzLm5hbWVdO1xyXG5cclxuICAgICBpZiAobmV3VmFsdWUgPT0gMCkge1xyXG4gICAgIC8vINC90L7QstGL0Lkg0LTQvtC60YPQvNC10L3RglxyXG4gICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOjB9KTtcclxuICAgICB9IGVsc2Uge1xyXG4gICAgIHNlbGYuc2V0U3RhdGUoe3ZhbHVlOnZhbHVlfSk7XHJcbiAgICAgfVxyXG4gICAgICohL1xyXG4gICAgIH1cclxuICAgICB9KTtcclxuICAgICAqIS9cclxuXHJcbiAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnb24gY2hhbmdlOmVkaXRlZDonICsgbmV3VmFsdWUpO1xyXG4gICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWV9KTtcclxuICAgICB9XHJcbiAgICAgfSk7XHJcblxyXG4gICAgIC8hKlxyXG4gICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGF0YScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgY29uc29sZS5sb2coJ29uIGNoYW5nZTpkYXRhOicgKyBuZXdWYWx1ZSk7XHJcbiAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcblxyXG4gICAgIHZhciBkYXRhID0gbmV3VmFsdWUsXHJcbiAgICAgZmllbGRWYWx1ZSA9IGRhdGFbc2VsZi5wcm9wcy5uYW1lXTtcclxuXHJcbiAgICAgc2VsZi5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICB9XHJcbiAgICAgfSk7XHJcblxyXG4gICAgICohL1xyXG5cclxuICAgICB9LFxyXG4gICAgICovXHJcbiAgICAvLyDQvtCx0Y/Qt9Cw0YLQtdC70YzQvdGL0LUg0L/QsNGA0LDQvNC10YLRgNGLXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxuICAgICB9LFxyXG5cclxuXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGZpZWxkVmFsdWUpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRhdGE7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGZpZWxkVmFsdWV9KTtcclxuICAgICAgICBkYXRhW3RoaXMucHJvcHMubmFtZV0gPSBmaWVsZFZhbHVlO1xyXG5cclxuICAgICAgICAvLyDQt9Cw0LTQsNGC0Ywg0L3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INC/0L7Qu9GPXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgaW5wdXRDbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZSB8fCAnZG9jLWlucHV0JyxcclxuICAgICAgICAgICAgaW5wdXRSZWFkT25seSA9IHRoaXMuc3RhdGUucmVhZE9ubHkgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIGlucHV0RGlzYWJsZWQgPSB0aGlzLnN0YXRlLmRpc2FibGVkID09ICd0cnVlJyA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRSZWFkT25seSkge1xyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IGlucHV0Q2xhc3NOYW1lICsgJyBkb2MtaW5wdXQtcmVhZG9ubHknO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtodG1sRm9yOiB0aGlzLnByb3BzLm5hbWV9LCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnRpdGxlXHJcbiAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudElucHV0RGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBpbnB1dFJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy5wcm9wcy5wYXR0ZXJuLCBcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZUhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpbnB1dERpc2FibGVkfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApKVxyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXREYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtZGF0ZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG4vLyAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xyXG5cclxuY29uc3QgSW5wdXREYXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIklucHV0RGF0ZVwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RGVmYXVsdFByb3BzOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpLFxyXG4gICAgICAgICAgICBkYXkgPSBkYXRlLmdldERhdGUoKSxcclxuICAgICAgICAgICAgbWF4RGF0ZSA9IG5ldyBEYXRlKHllYXIgKyAxLCBtb250aCwgZGF5KSxcclxuICAgICAgICAgICAgcmVmSWQgPSAnSW5wdXREYXRlJyxcclxuICAgICAgICAgICAgbWluRGF0ZSA9IG5ldyBEYXRlKHllYXIgLSA1LCBtb250aCwgZGF5KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYmluZERhdGE6IHRydWUsXHJcbiAgICAgICAgICAgIG1pbjogbWluRGF0ZSxcclxuICAgICAgICAgICAgbWF4OiBtYXhEYXRlLFxyXG4gICAgICAgICAgICByZWFkT25seTogZmFsc2UsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6ZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IG5leHRQcm9wcy52YWx1ZX0pXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBvbkNoYW5nZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoZmllbGRWYWx1ZSk7XHJcblxyXG4gICAgICAgIGlmIChmaWVsZFZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSDQvdGD0LssINGC0L4g0L/Rg9GB0YLRjCDQsdGD0LTQtdGCIG51bFxyXG4gICAgICAgICAgICB2YWxpZGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWxpZGF0aW9uICkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIC8vINC10YHQu9C4INC30LDQtNCw0L0g0L7QsdGA0LDQsdC+0YLRh9C40LosINCy0LXRgNC90LXQvCDQtdCz0L5cclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZmllbGRWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBpbnB1dENsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICdkb2MtaW5wdXQnLFxyXG4gICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5uYW1lO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IGlucHV0Q2xhc3NOYW1lICsgJyBkb2MtaW5wdXQtcmVhZG9ubHknO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcImRhdGVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGlucHV0Q2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICByZWY6IHRoaXMucHJvcHMucmVmSWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy5wcm9wcy5wYXR0ZXJuLCBcclxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgIG1pbjogdGhpcy5wcm9wcy5taW4sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWF4OiB0aGlzLnByb3BzLm1heCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICApXHJcbiAgICB9LFxyXG5cclxuICAgIHZhbGlkYXRlOmZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LAg0L3QsCDQvNC40L0gLCDQvNCw0YVcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5taW4gJiYgdGhpcy5wcm9wcy5tYXggJiYgdmFsdWUpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGVWYWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKGRhdGVWYWx1ZSA+IHRoaXMucHJvcHMubWluICYmIGRhdGVWYWx1ZSA8IHRoaXMucHJvcHMubWF4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXREYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9pbnB1dC1kYXRlLmpzeFxuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IElucHV0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIklucHV0XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSwgXHJcbiAgICAgICAgICAgIHJlYWRPbmx5OiB0aGlzLnByb3BzLnJlYWRPbmx5IHx8IGZhbHNlLCBcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdHJ1ZSxcclxuICAgICAgICAgICAgdmFsaWQ6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJpbmREYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICBtaW46LTk5OTk5OTk5OSxcclxuICAgICAgICAgICAgbWF4OiA5OTk5OTk5OTlcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpIHtcclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogMH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZSwgZGlzYWJsZWQ6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkYXRhJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbmV3VmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZSA9IGRhdGFbdGhpcy5wcm9wcy5uYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6ZnVuY3Rpb24gKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdC10L3QuNGPINCx0YPQtNGD0YIg0L7RgtGA0LDQttCw0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDRgtCw0LrQuNC1INC10YHRgtGMXHJcbiAgICAgICAgdmFyIHJldHVybnZhbHVlID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSkge1xyXG4gICAgICAgICAgICB2YXIgcmV0dXJudmFsdWUgPSAobmV4dFN0YXRlLnZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlIHx8XHJcbiAgICAgICAgICAgIG5leHRTdGF0ZS5yZWFkT25seSAhPT0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fFxyXG4gICAgICAgICAgICBuZXh0U3RhdGUuZGlzYWJsZWQgIT09IHRoaXMuc3RhdGUuZGlzYWJsZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0dXJudmFsdWU7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTpmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBmaWVsZFZhbHVlID0gTnVtYmVyKGUudGFyZ2V0LnZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKGZpZWxkVmFsdWUgPj0gTnVtYmVyKHRoaXMucHJvcHMubWluKSB8fCBmaWVsZFZhbHVlIDw9IE51bWJlcih0aGlzLnByb3BzLm1heCkpIHtcclxuICAgICAgICAgICAgLy8g0LfQsNC00LDQvdC90L7QtSDQvtCz0YDQsNC90LjRh9C10L3QuNC1INC90LUg0YDQsNCx0L7RgtCw0LXRgiDQv9GA0Lgg0YDRg9GH0L3QvtC8INCy0LLQvtC00LUg0YHRg9C80LwsINC+0YLRgNCw0LHQvtGC0LDQtdC8INC10LPQvlxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYmluZERhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vINC/0YDQuNGP0LLRj9C30LrQsCDQuiDQtNCw0L3QvdGL0LxcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgLy8g0L/QvtC70YPRh9C40YLRjCDQt9C90LDRh9C10L3QuNC1XHJcbiAgICAgICAgICAgICAgICBkYXRhW3RoaXMucHJvcHMubmFtZV0gPSBmaWVsZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0YHQvNC+0YLRgNC40Lwg0Log0YfQtdC80YMg0L/RgNC40LLRj9C30LDQvSDRgdC10LvQtdC60YIg0Lgg0L7RgtC00LDQuNC8INC10LPQviDQvdCw0LLQtdGA0YVcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZSwgdGhpcy5wcm9wcy5uYW1lKTsgLy8g0LIg0YHQu9GD0YfQsNC1INC10YHQu9C4INC30LDQtNCw0L0g0L7QsdGA0LDQsdC+0YLRh9C40Log0L3QsCDQstC10YDRhdC90LXQvCDRg9GA0L7QstC90LUsINC+0YLQtNCw0LTQuNC8INC+0LHRgNCw0LHQvtGC0LrRgyDRgtGD0LTQsFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkJsdXI6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0LXRgdC70Lgg0YLQsNC60L7QuSDQvNC10YLQvtC0INC/0LXRgNC10LTQsNC9INGB0LLQtdGA0YXRgywg0YLQviDQstC10YDQvdC10YIg0LXQs9C+INC+0LHRgNCw0YLQvdC+XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25CbHVyKHRoaXMuc3RhdGUudmFsdWUsIHRoaXMucHJvcHMubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpbnB1dENsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICcnICsgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dERpc2FibGVkID0gdGhpcy5zdGF0ZS5kaXNhYmxlZCB8fCAnZmFsc2UnLFxyXG4gICAgICAgICAgICBpbnB1dFBsYWNlSG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlciB8fCB0aGlzLnByb3BzLm5hbWUsXHJcbiAgICAgICAgICAgIGlucHV0TWluVmFsdWUgPSB0aGlzLnByb3BzLm1pbiB8fCAtOTk5OTk5OTk5LFxyXG4gICAgICAgICAgICBpbnB1dE1heFZhbHVlID0gdGhpcy5wcm9wcy5tYXggfHwgOTk5OTk5OTk5O1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRSZWFkT25seSkge1xyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IGlucHV0Q2xhc3NOYW1lICsgJyBkb2MtaW5wdXQtcmVhZG9ubHknO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlucHV0RGlzYWJsZWQgPT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7aHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJudW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIlxcXFxkKyhcXFxcLlxcXFxkezJ9KT9cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICApKVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmb3JtLXdpZGdldFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHRoaXMucHJvcHMudGl0bGUpXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcIm51bWJlclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBpbnB1dFBsYWNlSG9sZGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluOiBpbnB1dE1pblZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiBpbnB1dE1heFZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogXCIwLjAxXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBcIlxcXFxkKyhcXFxcLlxcXFxkezJ9KT9cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyOiB0aGlzLm9uQmx1cn1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxyXG4gICAgfSxcclxufSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm49e3RoaXMucHJvcHMucGF0dGVybn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5wdXQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1pbnB1dC1udW1iZXIuanN4XG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBET0NVTUVOVF9DTE9TRURfU1RBVFVTID0gMjtcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIERvY0J1dHRvbiA9IHJlcXVpcmUoJy4vZG9jLWJ1dHRvbi5qc3gnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG52YXIgVG9vbGJhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJUb29sYmFyXCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3YXJuaW5nOiBmYWxzZSwgd2FybmluZ01lc3NhZ2U6ICcnLCBlZGl0TW9kZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRhc2tMaXN0OiB0aGlzLnByb3BzLnRhc2tMaXN0ID8gdGhpcy5wcm9wcy50YXNrTGlzdCA6IHRoaXMuZ2V0RGVmYXVsdFRhc2soKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbi8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1IGRvY0lkLiDQldGB0LvQuCDQt9C90LDRh9C10L3QuNC1ID0gMCAo0LTQvtCx0LDQstC70Y/QtdC8INC90L7QstGD0Y4g0LfQsNC/0LjRgdGMLCDRgtC+INC/0YDQvtGB0YLQviDQvtGH0LjRgtC60LAg0L/QvtC70LXQuSwg0LjQvdCw0YfQtSDQv9C+0LTQs9GA0YPQt9C60LAg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOnNhdmVkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0YDQtdC20LjQvCDQuNC30LzQtdC90LjQu9GB0Y8sINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRNb2RlOiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlU2VsZWN0VGFzazogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyDQvNC10YLQvtC0INCy0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQstGL0LHQvtGA0LUg0LfQsNC00LDRh9C4XHJcbiAgICAgICAgdmFyIHRhc2tWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVCdXR0b25UYXNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0LzQtdGC0L7QtCDQstGL0LfRi9Cy0LDQtdGC0YHRjyDQv9GA0Lgg0LLRi9Cx0L7RgNC1INC30LDQtNCw0YfQuFxyXG4gICAgICAgIC8vINC90LDQudC00LXQvCDQsNC60YLRg9Cw0LvRjNC90YPRjiDQt9Cw0LTQsNGH0YNcclxuXHJcbiAgICAgICAgbGV0IGFjdHVhbFRhc2sgPSB0aGlzLnN0YXRlLnRhc2tMaXN0LmZpbHRlcihmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFzay5hY3R1YWxTdGVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhc2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB0YXNrID0gYWN0dWFsVGFzay5tYXAoZnVuY3Rpb24odGFzaykgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0YXNrLmFjdGlvblxyXG4gICAgICAgICAgICB9KTsgLy8g0L7RgdGC0LDQstC40Lwg0YLQvtC70YzQutC+INC90LDQt9Cy0LDQvdC40LUg0L/RgNC+0YbQtdC00YPRgNGLXHJcblxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2V4ZWN1dGVUYXNrJywgdGFzayk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUV2ZW50QnV0dG9uQWRkQ2xpY2s6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LTQu9GPINC60L3QvtC/0LrQuCBBZGRcclxuICAgICAgICAgICAgLy8g0L7RgtC/0YDQsNCy0LjQvCDQuNC30LLQtdGJ0LXQvdC40LUg0L3QsNCy0LXRgNGFXHJcbi8vICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5uYW1lKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbiggJ2RvY0lkQ2hhbmdlJywgMCApO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnZWRpdGVkQ2hhbmdlJywgdHJ1ZSApO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCAnc2F2ZWRDaGFuZ2UnLCBmYWxzZSApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgaGFuZGxlRXZlbnRCdXR0b25FZGl0Q2xpY2s6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LTQu9GPINC60L3QvtC/0LrQuCBFZGl0XHJcbiAgICAgICAgLy8g0L/QtdGA0LXQstC+0LTQuNC8INC00L7QutGD0LzQtdC90YIg0LIg0YDQtdC20LjQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPLCDRgdC+0YXRgNCw0L3QtdC9ID0gZmFsc2VcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCAnZWRpdGVkQ2hhbmdlJywgdHJ1ZSApO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oICdzYXZlZENoYW5nZScsIGZhbHNlICk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVFdmVudEJ1dHRvblNhdmVDbGljazpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQtNC70Y8g0LrQvdC+0L/QutC4IFNhdmVcclxuICAgICAgICAvLyDQstCw0LvQuNC00LDRgtC+0YBcclxuXHJcbiAgICAgICAgbGV0IGlzVmFsaWQgPSAhdGhpcy52YWxpZGF0b3IoKTtcclxuXHJcbiAgICAgICAgaWYgKGlzVmFsaWQpIHtcclxuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/RgNC+0YjQu9C4INCy0LDQu9C40LTQsNGG0LjRjiwg0YLQviDRgdC+0YXRgNCw0L3QtdGP0LxcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbiggJ3NhdmVEYXRhJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZWRpdGVNb2RlID0gdGhpcy5zdGF0ZS5lZGl0TW9kZSxcclxuICAgICAgICAgICAgZG9jdW1lbnRTdGF0dXMgPSB0aGlzLnByb3BzLmRvY3VtZW50U3RhdHVzLFxyXG4gICAgICAgICAgICBpc0Nsb3NlZFN0YXR1cyA9IGRvY3VtZW50U3RhdHVzID09IERPQ1VNRU5UX0NMT1NFRF9TVEFUVVMgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHRhc2tXaWRnZXQgPSB0aGlzLmdlbmVyYXRlVGFza1dpZGdldCgpLFxyXG4gICAgICAgICAgICB0YXNrcyA9IHRoaXMuc3RhdGUudGFza0xpc3QubWFwKGZ1bmN0aW9uKHRhc2spICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFzay5hY3Rpb25cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZG9jLXRvb2xiYXItd2FybmluZ1wifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS53YXJuaW5nID8gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdGhpcy5zdGF0ZS53YXJuaW5nTWVzc2FnZSkgOiBudWxsXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJkb2MtdG9vbGJhclwiLCBzdHlsZToge2Zsb2F0OlwicmlnaHRcIn19LCBcclxuICAgICAgICAgICAgICAgICAgICBpc0Nsb3NlZFN0YXR1cyA/IG51bGwgOiBSZWFjdC5jcmVhdGVFbGVtZW50KERvY0J1dHRvbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJBZGRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJkb2MtdG9vbGJhclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5zdGF0ZS5lZGl0TW9kZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlRXZlbnRCdXR0b25BZGRDbGlja30pLCBcclxuICAgICAgICAgICAgICAgICAgICBpc0Nsb3NlZFN0YXR1cyA/IG51bGwgOiBSZWFjdC5jcmVhdGVFbGVtZW50KERvY0J1dHRvbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJFZGl0XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGlzLnN0YXRlLmVkaXRNb2RlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVFdmVudEJ1dHRvbkVkaXRDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJkb2MtdG9vbGJhclwifSksIFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2xvc2VkU3RhdHVzID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQnV0dG9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZG9jLXRvb2xiYXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJTYXZlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogIXRoaXMuc3RhdGUuZWRpdE1vZGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVFdmVudEJ1dHRvblNhdmVDbGlja30pLCBcclxuICAgICAgICAgICAgICAgICAgICBlZGl0ZU1vZGUgJiYgdGFza3MubGVuZ3RoID4gMCA/IG51bGwgOiB0YXNrV2lkZ2V0XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXREZWZhdWx0VGFzazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBbe3N0ZXA6IDAsIG5hbWU6ICdTdGFydCcsIGFjdGlvbjogJ3N0YXJ0Jywgc3RhdHVzOiAnb3BlbmVkJ31dXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnZW5lcmF0ZVRhc2tXaWRnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDQstC10YDQvdC10YIg0LLQuNC00LbQtdGCINC30LDQtNCw0YdcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnRhc2tMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Rhc2tMaXN0OiB0aGlzLmdldERlZmF1bHRUYXNrKCl9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0YXNrcyA9IHRoaXMuc3RhdGUudGFza0xpc3QuZmlsdGVyKGZ1bmN0aW9uKHRhc2spICB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2suc3RhdHVzID09PSAnb3BlbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXNrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgICAgIHRhc2tXaWRnZXQgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGFza3MubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0YHQv9C40YHQvtC6INC30LDQtNCw0YdcclxuICAgICAgICAgICAgb3B0aW9ucyA9IHRhc2tzLm1hcChmdW5jdGlvbih0YXNrKSAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge3ZhbHVlOiAwLCBrZXk6IE1hdGgucmFuZG9tKCl9LCBcIiBcIiwgdGFzay5uYW1lLCBcIiBcIilcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0YXNrV2lkZ2V0ID0gUmVhY3QuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZVNlbGVjdFRhc2t9LCBvcHRpb25zLCBcIiBcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXNrcy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICB2YXIgdGFza05hbWUgPSB0YXNrc1swXS5uYW1lO1xyXG4gICAgICAgICAgICAvLyDQutC90L7Qv9C60LAg0YEg0LfQsNC00LDRh9C10LlcclxuICAgICAgICAgICAgdGFza1dpZGdldCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJidXR0b25cIiwgY2xhc3NOYW1lOiBcInVpLWMyXCIsIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQnV0dG9uVGFzaywgdmFsdWU6IHRhc2tOYW1lfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhc2tXaWRnZXQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgd2FybmluZyA9ICcnO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy52YWxpZGF0b3IpIHtcclxuICAgICAgICAgICAgbGV0IHdhcm5pbmdNZXNzYWdlID0gdGhpcy5wcm9wcy52YWxpZGF0b3IoKTtcclxuICAgICAgICAgICAgICAgIHdhcm5pbmcgPSB3YXJuaW5nTWVzc2FnZSAhPT0gJ09rJ1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7d2FybmluZ01lc3NhZ2U6IHdhcm5pbmdNZXNzYWdlLCB3YXJuaW5nOiB3YXJuaW5nfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdhcm5pbmc7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUb29sYmFyO1xyXG5cclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtdG9vbGJhci5qc3hcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbmNvbnN0IERvY0J1dHRvbiA9IGZ1bmN0aW9uKHByb3BzKSB7XHJcbiAgICBsZXQgYnRuRW5hYmxlZCA9IHByb3BzLmVuYWJsZWQgPyB0cnVlOiBmYWxzZSwgLy8g0YPRgdGC0LDQvdC+0LLQuNC8INC30L3QsNGH0LXQvdC40LUg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cclxuICAgICAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUgfHwgbnVsbCxcclxuICAgICAgICBzdHlsZSA9IHttYXJnaW46IDV9LFxyXG4gICAgICAgIHJlZklkID0gcHJvcHMucmVmSWQgfHwgJ2RvY0J1dHRvbic7XHJcbi8vICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IHtjbGFzc05hbWV9XHJcblxyXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJidXR0b25cIiwgXHJcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBidG5FbmFibGVkLCBcclxuICAgICAgICAgICAgICAgICAgb25DbGljazogcHJvcHMub25DbGljaywgXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgc3R5bGU6IHtzdHlsZTpzdHlsZX19XHJcbiAgICApXHJcbn07XHJcblxyXG5Eb2NCdXR0b24ucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxufVxyXG4vLyAgICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERvY0J1dHRvblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLWJ1dHRvbi5qc3hcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgSW5wdXRUZXh0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dC5qc3gnKSxcclxuICAgIElucHV0RGF0ZVRpbWUgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1kYXRldGltZS5qc3gnKSxcclxuICAgIERvY0xpc3QgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC1saXN0LmpzeCcpO1xyXG4vLyAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LW51bWJlci5qc3gnKTtcclxuXHJcbnZhciBEb2NDb21tb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiRG9jQ29tbW9uXCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZWFkT25seTogdGhpcy5wcm9wcy5yZWFkT25seVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgLy8g0L/RgNC4INC40LfQvNC10L3QtdC90LjQuCwg0L/QvtC80LXQvdGP0LXRgiDRgdC+0YHRgtC+0Y/QvdC40LUgKNC/0LXRgNC10LTQsNGB0YIg0LTQsNC70YzRiNC1INGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjylcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtyZWFkT25seTpuZXh0UHJvcHMucmVhZE9ubHkgfSlcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnByb3BzLmRhdGEsXHJcbiAgICAgICAgICAgIGJwbSA9IGRhdGEuYnBtIHx8IFtdLFxyXG4gICAgICAgICAgICBhY3R1YWxTdGVwRGF0YSA9IGJwbS5maWx0ZXIoZnVuY3Rpb24oc3RlcCkgIHtcclxuICAgICAgICAgICAgICAgIC8vINGC0LXQutGD0YnQuNC5INGI0LDQsyDQkdCfXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RlcC5hY3R1YWxTdGVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ZXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBleGVjdXRlcnMgPSBhY3R1YWxTdGVwRGF0YS5tYXAoZnVuY3Rpb24oc3RlcERhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vINC90LDQudC00LXQvCDQuNGB0L/QvtC70L3QuNGC0LXQu9C10LlcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGVwRGF0YS5hY3RvcnMgfHwge25hbWU6ICdBVVRIT1InfTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmaWVsZHNldFwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtzdHlsZToge2Rpc3BsYXk6Jy13ZWJraXQtaW5saW5lLWJveCd9fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMiBmb3JtLXdpZGdldC10b29sYmFyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI3NSVcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwge3N0eWxlOiB7ZGlzcGxheTonLXdlYmtpdC1pbmxpbmUtYm94J319LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyIGZvcm0td2lkZ2V0LXRvb2xiYXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkNyZWF0ZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3JlYXRlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuY3JlYXRlZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcInRydWVcIiwgd2lkdGg6IFwiNzUlXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtzdHlsZToge2Rpc3BsYXk6Jy13ZWJraXQtaW5saW5lLWJveCd9fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwge2NsYXNzTmFtZTogXCJ1aS1jMiBmb3JtLXdpZGdldC10b29sYmFyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJVcGRhdGVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxhc3R1cGRhdGVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmxhc3R1cGRhdGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJ0cnVlXCIsIHdpZHRoOiBcIjc1JVwifSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7c3R5bGU6IHtkaXNwbGF5Oictd2Via2l0LWlubGluZS1ib3gnfX0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzIgZm9ybS13aWRnZXQtdG9vbGJhclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhdHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXR1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuc3RhdHVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwidHJ1ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNzUlXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbi8qXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBzdHlsZT17e2Rpc3BsYXk6Jy13ZWJraXQtaW5saW5lLWJveCd9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2NMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT0n0JjRgdC/0L7Qu9C90LjRgtC10LvQuCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9J2V4ZWN1dG9ycydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2V4ZWN1dGVyc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5ID0ge3RoaXMuc3RhdGUucmVhZE9ubHl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuKi9cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRG9jQ29tbW9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtY29tbW9uLmpzeFxuLy8gbW9kdWxlIGlkID0gNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XHJcblxyXG5jb25zdCBJbnB1dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJJbnB1dFwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge3ZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLCByZWFkT25seTogdHJ1ZSwgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdHJ1ZX07XHJcbiAgICB9LFxyXG5cclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdkZWZhdWxOYW1lJyxcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnZG9jLWlucHV0JyxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdkZWZhdWxOYW1lJyxcclxuICAgICAgICAgICAgdGl0bGU6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpIHtcclxuLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUgZG9jSWQuINCV0YHQu9C4INC30L3QsNGH0LXQvdC40LUgPSAwICjQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0L/QuNGB0YwsINGC0L4g0L/RgNC+0YHRgtC+INC+0YfQuNGC0LrQsCDQv9C+0LvQtdC5LCDQuNC90LDRh9C1INC/0L7QtNCz0YDRg9C30LrQsCDQtNCw0L3QvdGL0YVcclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRvY0lkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGB0L7Qt9C00LDQvdC40LUg0L3QvtCy0L7Qs9C+INC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LLRi9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTowfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOnZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZWRpdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZE9ubHk6ICFuZXdWYWx1ZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDRgdC70YPRiNGD0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFO1xyXG4gICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBuZXdWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZFZhbHVlID0gZGF0YVt0aGlzLnByb3BzLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbdGhpcy5wcm9wcy5uYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBmaWVsZFZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOmZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8g0LjQt9C80LXQvdC10L3QuNGPINCx0YPQtNGD0YIg0L7RgtGA0LDQttCw0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINGB0LvRg9GH0LDQtSDQtdGB0LvQuCDRgtCw0LrQuNC1INC10YHRgtGMXHJcbiAgICAgICAgbGV0IHJldHVybnZhbHVlID0gKG5leHRTdGF0ZS52YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSB8fFxyXG4gICAgICAgIG5leHRTdGF0ZS5yZWFkT25seSAhPT0gdGhpcy5zdGF0ZS5yZWFkT25seSB8fFxyXG4gICAgICAgIG5leHRTdGF0ZS5kaXNhYmxlZCAhPT0gdGhpcy5zdGF0ZS5kaXNhYmxlZCk7XHJcbiAgICAgICAgcmV0dXJuIHJldHVybnZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGxldCBmaWVsZFZhbHVlID0gZS50YXJnZXQudmFsdWUsXHJcbiAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZmllbGRWYWx1ZX0pO1xyXG4gICAgICAgIGRhdGFbdGhpcy5wcm9wcy5uYW1lXSA9IGZpZWxkVmFsdWU7XHJcbiAgICAgICAgLy8g0LfQsNC00LDRgtGMINC90L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDQv9C+0LvRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOm5leHRQcm9wcy52YWx1ZSB9KVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBpbnB1dENsYXNzTmFtZSA9dGhpcy5wcm9wcy5jbGFzc05hbWUgfHwgJ2RvYy1pbnB1dCcsXHJcbiAgICAgICAgICAgIGlucHV0UmVhZE9ubHkgPSB0aGlzLnN0YXRlLnJlYWRPbmx5IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnB1dERpc2FibGVkID0gdGhpcy5zdGF0ZS5kaXNhYmxlZCxcclxuICAgICAgICAgICAgaW5wdXRQbGFjZUhvbGRlciA9IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgfHwgdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICBteVN0eWxlID0ge3dpZHRoOidhdXRvJ307O1xyXG5cclxuICAgICAgICBpZiAoaW5wdXRSZWFkT25seSkge1xyXG4gICAgICAgICAgICBpbnB1dENsYXNzTmFtZSA9IGlucHV0Q2xhc3NOYW1lICsgJyBkb2MtaW5wdXQtcmVhZG9ubHknO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy53aWR0aCkge1xyXG4gICAgICAgICAgICBteVN0eWxlLndpZHRoID0gdGhpcy5wcm9wcy53aWR0aFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbnB1dERpc2FibGVkID09ICd0cnVlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtodG1sRm9yOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb3JtLXdpZGdldC1sYWJlbFwifSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgdGhpcy5wcm9wcy50aXRsZSlcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IG15U3R5bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogaW5wdXRDbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnByb3BzLm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBpbnB1dFJlYWRPbmx5LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGlucHV0UGxhY2VIb2xkZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZX1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7aHRtbEZvcjogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCB0aGlzLnByb3BzLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogbXlTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBpbnB1dENsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9wcy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlucHV0UmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZUhvbGRlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXHJcbiAgICB9LFxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dGFyZWEuanN4XG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIEdyaWRCdXR0b24gPSByZXF1aXJlKCcuL215YnV0dG9uJyk7XHJcblxyXG52YXIgTXlDZWxsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIk15Q2VsbFwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUsIGVkaXRhYmxlOiBmYWxzZSwgcmVhZE9ubHk6IHRoaXMucHJvcHMucmVhZE9ubHksIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiB0aGlzLnByb3BzLnZhbHVlfSlcclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6Z3JpZENlbGxFZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDQvNC+0LzQtdC90YIg0L/QtdGA0LXRhdC+0LTQsCDQvdCwINC00YDRg9Cz0YPRjiDRj9GH0LXQudC60YNcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBzZWxmLnByb3BzLmlkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2VsbCA9IHNlbGYucmVmc1snY2VsbC0nICsgc2VsZi5wcm9wcy5pZF07XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRhYmxlOiBmYWxzZX0pOyAvLyDRg9Cx0LjRgNCw0LXQvCDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdGCINGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLFxyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEgPSBldmFsKCdkYXRhLicgKyBzZWxmLnByb3BzLmdyaWREYXRhU291cmNlKTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBwcmV2aW91c1ZhbHVlICYmIGdyaWREYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3JlYWRPbmx5OiAhbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gIXRoaXMuc3RhdGUuZWRpdGFibGU7XHJcbiAgICAgICAgLy8g0L7RgtGA0LDQsdC+0YLQsNC10Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRDZWxsRWRpdGVkQ2hhbmdlJywgdGhpcy5wcm9wcy5pZCk7IC8vINC30LDQutGA0L7QtdC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LUg0LIg0LTRgNGD0LPQuNGFINGP0YfQtdC50LrQsNGFXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGFibGU6IHZhbHVlfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGUsIGJpbmRUb0NlbGwpIHtcclxuICAgICAgICAvLyDQvtGC0YDQsNCx0LDRgtGL0LLQsNC10YIg0LjQt9C80LXQvdC10L3QuNC1INGB0L7RgdGC0L7Rj9C90LjRjyDRj9GH0LXQudC60Lgg0Lgg0L/QuNGI0LXRgiDQsiDRhdGA0LDQvdC40LvRidC1XHJcbiAgICAgICAgdmFyIHZhbHVlID0gZS50YXJnZXQudmFsdWUsXHJcbiAgICAgICAgICAgIGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZSxcclxuICAgICAgICAgICAgZ3JpZERhdGEgPSBldmFsKCdkYXRhLicgKyB0aGlzLnByb3BzLmdyaWREYXRhU291cmNlKSB8fCBbXSxcclxuICAgICAgICAgICAgY2VsbE5hbWUgPSBiaW5kVG9DZWxsID8gYmluZFRvQ2VsbCA6IHRoaXMucHJvcHMuc291cmNlO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuXHJcbiAgICAgICAgLy8g0L/QuNGI0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgaWYgKGdyaWREYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGNlbGxWYWx1ZSA9IGdyaWREYXRhW3RoaXMucHJvcHMucm93SWRdW2NlbGxOYW1lXTtcclxuXHJcbiAgICAgICAgICAgIGdyaWREYXRhW3RoaXMucHJvcHMucm93SWRdW2NlbGxOYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpO1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkQ2VsbEVkaXRlZENoYW5nZScsIHRoaXMucHJvcHMuaWQpOyAvLyDQt9Cw0LrRgNC+0LXQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNC1INCyINC00YDRg9Cz0LjRhSDRj9GH0LXQudC60LDRhVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUtleVByZXNzOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZTtcclxuICAgICAgICBpZiAoa2V5ID09IDEzKSB7XHJcbiAgICAgICAgICAgIC8vINCy0YvRhdC+0LTQuNC8INC40Lcg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0YWJsZTogZmFsc2V9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGlzRWRpdCA9IChmbHV4LnN0b3Jlcy5kb2NTdG9yZS5lZGl0ZWQgJiYgIXRoaXMuc3RhdGUuZGlzYWJsZWQpID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBjZWxsID0gdGhpcy5wcm9wcy5jZWxsLCAvLyDQv9Cw0YDQsNC80LXRgtGA0Ysg0Y/Rh9C10LnQutC4XHJcbiAgICAgICAgICAgIGlzUmVhZE9ubHkgPSAhZmx1eC5zdG9yZXMuZG9jU3RvcmUuZWRpdGVkLFxyXG4vLyAgICAgICAgICAgIGNlbGxUeXBlID0gY2VsbC50eXBlIHx8ICdzcGFuJzsgLy8g0L3QsNGF0L7QtNC40YLRgdGPINC70Lgg0LTQvtC6INCyINGA0LXQttC40LzQtSDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgICAgIGNlbGxUeXBlID0gJ3NwYW4nOyAvLyDQvdCw0YXQvtC00LjRgtGB0Y8g0LvQuCDQtNC+0Log0LIg0YDQtdC20LjQvNC1INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHJcbiAgICAgICAgaXNSZWFkT25seSA9IGNlbGwucmVhZE9ubHkgPyB0cnVlIDogaXNSZWFkT25seTsgLy8g0L/QvtC/0YDQsNCy0LrQsCDQvdCwINGB0LLQvtC50YHRgtCy0L4g0Y/Rh9C10LnQutC4LCDQtNC+0YHRgtGD0L/QvdCwINC70Lgg0L7QvdCwINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y5cclxuLy8gICAgICAgICAgICBjbGFzc05hbWUgPSAnZm9ybS13aWRnZXQnOyAvLysgdCBoaXMuc3RhdGUuZWRpdGFibGU/ICcgZm9jdXNlZCc6ICcnO1xyXG4gICAgICAgIGlzUmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgIHZhciBFZGl0RWxlbWVudCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrLCBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lfSwgdGhpcy5wcm9wcy52YWx1ZSk7XHJcbiAgICAgICAgaWYgKGlzRWRpdCkge1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgc3dpdGNoIChjZWxsVHlwZSkge1xyXG4gICAgICAgICAgICAgY2FzZSAndGV4dCc6XHJcbiAgICAgICAgICAgICBFZGl0RWxlbWVudCA9IDxpbnB1dCB0eXBlPSd0ZXh0JyByZWFkT25seT17aXNSZWFkT25seX0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IHN0eWxlPXt7d2lkdGg6JzEwMCUnfX1cclxuICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSBvbktleVByZXNzPXt0aGlzLmhhbmRsZUtleVByZXNzfS8+XHJcbiAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICBFZGl0RWxlbWVudCA9IDxpbnB1dCB0eXBlPSdudW1iZXInIHJlYWRPbmx5PXtpc1JlYWRPbmx5fSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gc3R5bGU9e3t3aWR0aDonMTAwJSd9fVxyXG4gICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IG9uS2V5UHJlc3M9e3RoaXMuaGFuZGxlS2V5UHJlc3N9Lz5cclxuICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgY2FzZSAnc2VsZWN0JzpcclxuICAgICAgICAgICAgIEVkaXRFbGVtZW50ID0gPFNlbGVjdCAgbmFtZT17Y2VsbC52YWx1ZUZpZWxkTmFtZX0gbGlicz17Y2VsbC5kYXRhU2V0fSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gZGVmYXVsdFZhbHVlID0ge3RoaXMuc3RhdGUudmFsdWV9IGNvbGxJZCA9IHtjZWxsLmlkfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX0vPlxyXG4gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgPHNwYW4+e3RoaXMuc3RhdGUudmFsdWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCB7cmVmOiAnY2VsbC0nICsgdGhpcy5wcm9wcy5pZCwgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZSwgc3R5bGU6IHt3aWR0aDpjZWxsLndpZHRofX0sIFxyXG4gICAgICAgICAgICAgICAgRWRpdEVsZW1lbnRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH1cclxufSlcclxuXHJcbnZhciBEYXRhR3JpZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJEYXRhR3JpZFwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnM6IHRoaXMucHJvcHMuZ3JpZENvbHVtbnMsXHJcbiAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLnByZXBhaXJlR3JpZERhdGEodGhpcy5wcm9wcy5ncmlkRGF0YSksXHJcbiAgICAgICAgICAgIGVkaXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsaWNrZWQ6IDBcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIEdyaWRSb3dFZGl0OiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTpkb2NJZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdGCINGA0LXQttC40Lwg0YHQvtC30LTQsNC90LjRjyDQvdC+0LLQvtCz0L4g0LTQvtC60YPQvNC10L3RgtCwXHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLFxyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEgPSBldmFsKCdkYXRhLicgKyBzZWxmLnByb3BzLnNvdXJjZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YSA9IHNlbGYuZGVsUm93KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGdyaWREYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIExpc3RlbiBncmlkRGF0YSBjaGFuZ2VzIGFuZCB0aGVuIGNhbGxiYWNrcyBmb3Igcm93IGRhdGEgY2hhbmdlc1xyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGV0YWlscycsIGZ1bmN0aW9uIChuZXdEYXRhLCBvbGREYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdEYXRhLmxlbmd0aCA+IDAgJiYgb2xkRGF0YSAhPT0gbmV3RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Z3JpZERhdGE6IG5ld0RhdGF9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlQ2VsbENsaWNrOiBmdW5jdGlvbiAoaWR4KSB7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZFJvd0lkQ2hhbmdlJywgaWR4KTsgLy8g0L7RgtC80LXRgtC40Lwg0LIg0YXRgNCw0L3QuNC70LjRidC1INC90L7QvNC10YAg0YHRgtGA0L7QutC4XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGNsaWNrZWQ6IGlkeFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciByb3dJZCA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRSb3dJZDtcclxuICAgIH0sXHJcblxyXG4gICAgZGVsUm93OiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAvLyDRg9C00LDQu9C40Lwg0YHRgtGA0L7QutGDINC30LDQtNCw0L3QvdGD0Y4g0YHRgtGA0L7QutGDINC40LvQuCDQstGB0LUsINC10YHQu9C4INC40L3QtNC10LrRgSDQvdC1INC30LDQtNCw0L1cclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSB0aGlzLnN0YXRlLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBzdGFydCA9IDEsXHJcbiAgICAgICAgICAgIGZpbmlzaCA9IGdyaWREYXRhLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4IHx8IGluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgc3RhcnQgPSBpbmRleDtcclxuICAgICAgICAgICAgZmluaXNoID0gMTtcclxuICAgICAgICB9XHJcbi8vICAgICAgICBncmlkRGF0YS5zcGxpY2Uoc3RhcnQsIGZpbmlzaCk7XHJcbiAgICAgICAgZ3JpZERhdGEgPSBncmlkRGF0YS5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCBzdGFydCB8fCBpbmRleCA+IChzdGFydCArIGZpbmlzaCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZERhdGE6IGdyaWREYXRhfSk7XHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQuNC30LzQtdC90LXQvdC40Y9cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZ3JpZERhdGEpXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBuZXdSb3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL9Cy0LXRgNC90LXRgiDQvdC+0LLRg9GOINGB0YLRgNC+0LrRgyDQtNC70Y8g0LPRgNC40LTQsCwg0L3QsCDQvtGB0L3QvtCy0LUg0YjQsNCx0LvQvtC90LBcclxuXHJcbiAgICAgICAgdmFyIGdyaWRDb2x1bW5zID0gdGhpcy5wcm9wcy5ncmlkQ29sdW1ucyxcclxuICAgICAgICAgICAgZ3JpZERhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzLFxyXG4gICAgICAgICAgICByb3cgPSBuZXcgT2JqZWN0KCk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JpZENvbHVtbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGZpZWxkID0gZ3JpZENvbHVtbnNbaV0uaWQ7XHJcbiAgICAgICAgICAgIHJvd1tmaWVsZF0gPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJvdztcclxuICAgIH0sXHJcblxyXG4gICAgcHJlcGFpcmVHcmlkRGF0YTogZnVuY3Rpb24gKHNvdXJjZURhdGEpIHtcclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSBbXTtcclxuICAgICAgICBncmlkRGF0YSA9IHNvdXJjZURhdGEubWFwKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgLy8g0L/QvtC70YPRh9Cw0LXQvCDRh9C40YHRgtGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgIHZhciBuZXdSb3cgPSB0aGlzLm5ld1JvdygpO1xyXG4gICAgICAgICAgICAvLyDQv9GA0L7QudC00LXQvCDQv9C+INC90L7QstC+0Lkg0YHRgtGA0L7QutC1INC4INC30LDQv9C+0LvQvdC40Lwg0LXQtSDQv9C+0LvRjyDQt9C90LDRh9C10L3QuNGP0LzQuCDQuNC3INC40YHRgtC+0YfQvdC40LrQsFxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG5ld1Jvdykge1xyXG4gICAgICAgICAgICAgICAgbmV3Um93W2tleV0gPSByb3dba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3Um93OyAvLyDQstC10YDQvdC10Lwg0YHRhNC+0YDQvNC40YDQvtCy0LDQvdC90YPRjiDQvdC+0LLRg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIHJldHVybiBncmlkRGF0YTtcclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlUm93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0YPQtNCw0LvQtdC90LjQtSDRgdGC0YDQvtC60Lgg0LjQtyDQs9GA0LjQtNCwXHJcbiAgICAgICAgdmFyIHJvd0luZGV4ID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZ3JpZFJvd0lkO1xyXG4gICAgICAgIHRoaXMuZGVsUm93KHJvd0luZGV4KTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkUm93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0LTQvtCx0LDQstC40YIg0LIg0YHQvtGB0YLQvtGP0L3QuNC1INC90L7QstGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgdmFyIG5ld1JvdyA9IHRoaXMubmV3Um93KCksXHJcbiAgICAgICAgICAgIGdyaWREYXRhID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZGV0YWlscyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmRldGFpbHM7XHJcblxyXG4gICAgICAgIG5ld1Jvdy5pZCA9ICdORVcnICsgTWF0aC5yYW5kb20oKTsgLy8g0LPQtdC90LXRgNC40Lwg0L3QvtCy0L7QtSDQuNC0XHJcbi8vICAgICAgICBncmlkRGF0YS5wdXNoKG5ld1Jvdyk7XHJcbi8vICAgICAgICB0aGlzLnNldFN0YXRlKHtlZGl0ZWQ6IHRydWUsIGNsaWNrZWQ6IGdyaWREYXRhLmxlbmd0aH0pO1xyXG5cclxuICAgICAgICAvLyDQt9C00LXRgdGMINCy0YHRgtCw0LLQuNGC0Ywg0YHRgtGA0L7QutGDINCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4vLyAgICAgICAgZGV0YWlscy5wdXNoKG5ld1Jvdyk7XHJcbi8vICAgICAgICBmbHV4LmRvQWN0aW9uKCdkZXRhaWxzQ2hhbmdlJywgZGV0YWlscyk7IC8vINC/0LjRiNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRSb3dJZENoYW5nZScsIC0xKTsgLy8g0L7RgtC80LXRgtC40Lwg0LIg0YXRgNCw0L3QuNC70LjRidC1INC90L7QvNC10YAg0YHRgtGA0L7QutC4XHJcblxyXG4gIC8vICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JpZERhdGE6IGdyaWREYXRhfSk7XHJcblxyXG4gICAgICAgIC8vINC+0YLQutGA0L7QtdC8INC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QviDQtNC70Y8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlR3JpZFJvdygnQUREJywgbmV3Um93KTtcclxuICAgIH0sXHJcblxyXG4gICAgZWRpdFJvdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINC00L7QsdCw0LLQuNGCINCyINGB0L7RgdGC0L7Rj9C90LjQtSDQvdC+0LLRg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgIHZhciBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXHJcbiAgICAgICAgICAgIGRldGFpbHMgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzLFxyXG4gICAgICAgICAgICByb3cgPSBkZXRhaWxzW2ZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRSb3dJZF1cclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVHcmlkUm93KCdFRElUJyxyb3cgKTsgLy8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtSDRgdGC0YDQvtC60Lgg0LIg0LzQvtC00LDQu9GM0L3QvtC8INC+0LrQvdC1XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZ3JpZFN0eWxlID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogJzEwMHB4J1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICd0aCc7XHJcbiAgICAgICAgdmFyIGdyaWRSb3dzID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnMgPSB0aGlzLnByb3BzLmdyaWRDb2x1bW5zLFxyXG4gICAgICAgICAgICBjbGlja2VkSXRlbSA9IHRoaXMuc3RhdGUuaW5kZXgsXHJcbiAgICAgICAgICAgIGlzUmVhZE9ubHkgPSB0aGlzLnByb3BzLnJlYWRPbmx5LFxyXG4gICAgICAgICAgICBjZWxsSWQgPSAwLFxyXG4gICAgICAgICAgICBncmlkRGF0YVNvdXJjZSA9IHRoaXMucHJvcHMuc291cmNlO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgIWlzUmVhZE9ubHkgP1xyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEJ1dHRvbiwge29uQ2xpY2s6IHRoaXMuYWRkUm93LCBidXR0b25WYWx1ZTogXCJBZGQgcm93XCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEJ1dHRvbiwge29uQ2xpY2s6IHRoaXMuZWRpdFJvdywgYnV0dG9uVmFsdWU6IFwiRWRpdCByb3dcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcmlkQnV0dG9uLCB7b25DbGljazogdGhpcy5kZWxldGVSb3csIGJ1dHRvblZhbHVlOiBcIkRlbGV0ZSByb3dcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSA6IG51bGwsIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRhYmxlXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8q0LfQsNCz0L7Qu9C+0LLQvtC6Ki9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZENvbHVtbnMubWFwKGZ1bmN0aW9uIChjb2x1bW4sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkU3R5bGUud2lkdGggPSBjb2x1bW4ud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAndGgtJyArIGNvbHVtbi5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW4uc2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINC/0L7QutCw0LfQsNGC0Ywg0LjQuyDRgdC60YDRi9GC0Ywg0LrQvtC70L7QvdC60YNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAnc2hvdyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdoaWRlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwge3N0eWxlOiBncmlkU3R5bGUsIGNsYXNzTmFtZTogY2xhc3NOYW1lLCBrZXk6ICd0aC0nICsgaW5kZXgsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZTogXCJjb2xcIn0sIGNvbHVtbi5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRSb3dzLm1hcChmdW5jdGlvbiAocm93LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXlDbGFzcyA9ICdub3RGb2N1c2VkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0lkID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGlja2VkSXRlbSA9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlDbGFzcyA9ICdmb2N1c2VkJzsgLy8g0L/QvtC00YHQstC10YLQuNC8INCy0YvQsdGA0LDQvdC90YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwge29uQ2xpY2s6IHRoaXMuaGFuZGxlQ2VsbENsaWNrLmJpbmQodGhpcyxpbmRleCksIGNsYXNzTmFtZTogbXlDbGFzcywga2V5OiAndHItJytpbmRleH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zLm1hcChmdW5jdGlvbiAoY2VsbCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFN0eWxlLndpZHRoID0gY2VsbC53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuc2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0L/QvtC60LDQt9Cw0YLRjCDQuNC7INGB0LrRgNGL0YLRjCDQutC+0LvQvtC90LrRgz8g0LjRgdC/0LvQu9C00YzQt9GD0LXQvCDQutC70LDRgdGBLiDQlNC+0LvQttC10L0g0LHRi9GC0Ywg0L/RgNC+0L/QuNGB0LDQvSDQsiBjc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdoaWRlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTXlDZWxsLCB7Y2VsbDogY2VsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogY2VsbC5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93SWQ6IHJvd0lkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZERhdGFTb3VyY2U6IGdyaWREYXRhU291cmNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGlzUmVhZE9ubHksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogZ3JpZFN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvd1tjZWxsLmlkXSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogaW5kZXgsIGlkOiBjZWxsSWQrK30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcylcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXRhR3JpZDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1kYXRhLWdyaWQuanN4XG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBNeUJ1dHRvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ015QnV0dG9uJyxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy5idXR0b25WYWx1ZSxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVCdXR0b25DbGljayB9KTtcbiAgICB9LFxuXG4gICAgaGFuZGxlQnV0dG9uQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUJ1dHRvbkNsaWNrKCkge1xuICAgICAgICAvLyDQstC10YDQvdC10Lwg0LIg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtGB0YLQvtGP0L3QuNC5INGB0L7QsdGL0YLQuNC1INC60LvQuNC6XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljaygpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE15QnV0dG9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9teWJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gNzhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBNb2RhbFBhZ2UgPSByZXF1aXJlKCcuL21vZGFscGFnZS9tb2RhbFBhZ2UuanN4JyksXHJcbiAgICBTZWxlY3QgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC1zZWxlY3QuanN4JyksXHJcbiAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC10ZXh0LmpzeCcpLFxyXG4gICAgSW5wdXROdW1iZXIgPSByZXF1aXJlKCcuL2RvYy1pbnB1dC1udW1iZXIuanN4Jyk7XHJcblxyXG52YXIgU29yZGVyR3JpZFJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJTb3JkZXJHcmlkUm93XCIsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdBcnZHcmlkUm93IHByb3BzJywgdGhpcy5wcm9wcyk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcm93OiB0aGlzLnByb3BzLmdyaWRSb3dEYXRhLCBjaGVja2VkOiBmYWxzZSwgd2FybmluZzonJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8g0L/RgNC10LTQstCw0YDQuNGC0LXQu9GM0L3QsNGPINC/0YDQvtCy0LXRgNC60LBcclxuICAgICAgICB0aGlzLnZhbGlkYXRlRm9ybSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBtb2RhbFBhZ2VDbGljazogZnVuY3Rpb24gKGJ0bkV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGNvbXBvbmVudHMgPSBbJ25vbWlkJywgICdzdW1tYScsICdwcm9qJywgJ3R1bm51cyddLFxyXG4gICAgICAgICAgICBkYXRhID0gW107XHJcblxyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LBcclxuXHJcbiAgICAgICAgICAgIC8vINGB0L7QsdC40YDQsNC10Lwg0LTQsNC90L3Ri9C1INC00LvRjyDQvtGC0L/RgNCw0LLQutC4INC90LAg0L7QsdGA0LDQsdC+0YLQutGDXHJcbiAgICAgICAgICAgIGNvbXBvbmVudHMubWFwKGZ1bmN0aW9uKGNvbXBvbmVudCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnRWYWx1ZSA9IHRoaXMucmVmc1tjb21wb25lbnRdLnN0YXRlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudCA9PSAncHJvaicgfHwgY29tcG9uZW50ID09ICd0dW5udXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50VmFsdWUgPSB0aGlzLnJlZnNbY29tcG9uZW50XS5zdGF0ZS5maWVsZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21vZGFsUGFnZUNsaWNrICcsY29tcG9uZW50LCBjb21wb25lbnRWYWx1ZSApXHJcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2goe25hbWU6IGNvbXBvbmVudCwgdmFsdWU6IGNvbXBvbmVudFZhbHVlfSk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9wcy5tb2RhbFBhZ2VDbGljayhidG5FdmVudCwgZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUNoYW5nZTogZnVuY3Rpb24gKGUsIG5hbWUpIHtcclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0L3QsCDRhNC+0YDQvNC1XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3NlbGVjdCBjaGFuZ2VkJyk7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnN0YXRlLnJvd1tuYW1lXSAmJiBuYW1lID09ICdub21pZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZzWydzdW1tYSddLnNldFN0YXRlKHt2YWx1ZTogMC4wMH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZhbGlkYXRlRm9ybSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVJbnB1dDogZnVuY3Rpb24gKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgLy8g0L/QtdGA0LXRgdGH0LXRgiDRgdGD0LzQvFxyXG4gICAgICAgIHRoaXMucmVjYWxjUm93U3VtbSgpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgdmFsaWRhdGVGb3JtOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyB3aWxsIGNoZWNrIHZhbHVlcyBvbiB0aGUgZm9ybSBhbmQgcmV0dXJuIHN0cmluZyB3aXRoIHdhcm5pbmdcclxuICAgICAgICB2YXIgd2FybmluZyA9ICcnO1xyXG4gICAgICAgIC8vINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INC/0YDQvtCy0LXRgNC60Lgg0YTQvtGA0LzRiyDQvdCwINCy0LDQu9C40LTQvdC+0YHRgtGMXHJcbiAgICAgICAgaWYgKCF0aGlzLnJlZnNbJ25vbWlkJ10uc3RhdGUudmFsdWUpIHdhcm5pbmcgPSAgd2FybmluZyArICcg0LrQsNGB0YHQvtCy0LDRjyDQvtC/0LXRgNCw0YbQuNGPJztcclxuXHJcbiAgICAgICAgaWYgKHdhcm5pbmcubGVuZ3RoID4gMiApIHtcclxuICAgICAgICAgICAgLy8g0LXRgdGC0Ywg0L/RgNC+0LHQu9C10LzRi1xyXG4gICAgICAgICAgICB3YXJuaW5nID0gJ9Ce0YLRgdGD0YLRgdCy0YPRjtGCINC00LDQvdC90YvQtTonICsgd2FybmluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ZhbGlkYXRlZCcsIHdhcm5pbmcsIHRoaXMucmVmc1snbm9taWQnXS5zdGF0ZS52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hlY2tlZDogdHJ1ZSwgd2FybmluZzogd2FybmluZ30pO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgcm93ID0gdGhpcy5zdGF0ZS5yb3csXHJcbiAgICAgICAgICAgIHZhbGlkYXRlTWVzc2FnZSA9IHRoaXMuc3RhdGUud2FybmluZyxcclxuICAgICAgICAgICAgYnV0dG9uT2tSZWFkT25seSA9IHZhbGlkYXRlTWVzc2FnZS5sZW5ndGggPiAwIHx8ICF0aGlzLnN0YXRlLmNoZWNrZWQ7XHJcbi8vICAgICAgICBjb25zb2xlLmxvZygncm93IHJlbmRlcjonLHZhbGlkYXRlTWVzc2FnZSwgYnV0dG9uT2tSZWFkT25seSApO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJtb2RhbFBhZ2VcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2UsIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJSZWEgbGlzYW1pbmUgLyBwYXJhbmRhbWluZVwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk9wZXJhdHNpb29uOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJub21pZFwiLCBsaWJzOiBcIm5vbWVuY2xhdHVyZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cubm9taWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogcm93Lmtvb2QsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJub21pZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLYXNzYSBvcGVyYXRzaW9vbmkga29vZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN1bW1hOiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlN1bW1hOlwiLCB2YWx1ZTogcm93LnN1bW1hLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcImZhbHNlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLCByZWY6IFwic3VtbWFcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlByb2pla3Q6XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJvalwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcInByb2plY3RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LnByb2osIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJrb29kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJwcm9qXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlByb2pla3RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlQ2hhbmdlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVHVubnVzOlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR1bm51c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiBcInR1bm51c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cudHVubnVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsSWQ6IFwia29vZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwidHVubnVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkxhdXNlbmRpIHR1bm51c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHZhbGlkYXRlTWVzc2FnZSkpLCBcIjtcIlxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbi8qXHJcbjxkaXY+XHJcbiAgICB7YnV0dG9uT2tSZWFkT25seSA/XHJcbiAgICAgICAgPGJ1dHRvbiBkaXNhYmxlZD4gT2sgPC9idXR0b24+OlxyXG4gICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5tb2RhbFBhZ2VDbGljay5iaW5kKHRoaXMsJ09rJyl9PiBPayA8L2J1dHRvbj5cclxuICAgIH1cclxuICAgIDxidXR0b24gb25DbGljaz17dGhpcy5tb2RhbFBhZ2VDbGljay5iaW5kKHRoaXMsJ0NhbmNlbCcpfT4gQ2FuY2VsPC9idXR0b24+XHJcbjwvZGl2PlxyXG4qL1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU29yZGVyR3JpZFJvdztcclxuXHJcbi8qXHJcbiA8SW5wdXRUZXh0IHRpdGxlPSdLb29kICcgbmFtZT0na29vZCcgdmFsdWU9e3Jvdy5rb29kfSByZWFkT25seT17ZmFsc2V9XHJcbiBkaXNhYmxlZD1cImZhbHNlXCIgcmVmPSdrb29kJyA+PC9JbnB1dFRleHQ+XHJcbiAqL1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvc29yZGVyLWdyaWQtcm93LmpzeFxuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmNvbnN0IEZvcm0gPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2Zvcm0uanMnKSxcclxuICAgIFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGFnZV9sYWJlbCcpLFxyXG4gICAgSW5wdXRUZXh0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtdGV4dC5qc3gnKSxcclxuICAgIElucHV0RGF0ZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LWRhdGUuanN4JyksXHJcbiAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZG9jLWlucHV0LW51bWJlci5qc3gnKSxcclxuICAgIFRvb2xiYXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy10b29sYmFyLmpzeCcpLFxyXG4gICAgRG9jQ29tbW9uID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtY29tbW9uLmpzeCcpLFxyXG4gICAgU2VsZWN0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtaW5wdXQtc2VsZWN0LmpzeCcpLFxyXG4gICAgVGV4dEFyZWEgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2RvYy1pbnB1dC10ZXh0YXJlYS5qc3gnKSxcclxuICAgIERhdGFHcmlkID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kb2MtZGF0YS1ncmlkLmpzeCcpLFxyXG4gICAgR3JpZFJvdyA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvc29yZGVyLWdyaWQtcm93LmpzeCcpO1xyXG5cclxudmFyIGRvY1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2RvY19zdG9yZS5qcycpLFxyXG4gICAgcmVsYXRlZERvY3VtZW50cyA9IHJlcXVpcmUoJy4uL21peGluL3JlbGF0ZWREb2N1bWVudHMuanN4JyksXHJcbiAgICB2YWxpZGF0ZUZvcm0gPSByZXF1aXJlKCcuLi9taXhpbi92YWxpZGF0ZUZvcm0nKTtcclxuXHJcbnZhciBub3cgPSBuZXcgRGF0ZSgpO1xyXG5cclxuY29uc3QgVm9yZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlZvcmRlclwiLFxyXG4gICAgcGFnZXM6ICBbe3BhZ2VOYW1lOiAnVsOkbGphbWFrc2Uga2Fzc2FvcmRlcid9XSxcclxuICAgIHJlcXVpcmVkRmllbGRzOiAgW1xyXG4gICAgICAgIHtuYW1lOiAna3B2JywgdHlwZTogJ0QnLCBtaW46IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSAtIDEpLCBtYXg6IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSArIDEpfSxcclxuICAgICAgICB7bmFtZTogJ2FzdXR1c2lkJywgdHlwZTogJ0knfSxcclxuICAgICAgICB7bmFtZTogJ25pbWknLCB0eXBlOiAnQyd9LFxyXG4gICAgICAgIHtuYW1lOiAnc3VtbWEnLCB0eXBlOiAnTid9XHJcbiAgICBdLFxyXG4vKlxyXG4gICAgbWl4aW5zOiBbcmVsYXRlZERvY3VtZW50cywgdmFsaWRhdGVGb3JtXSxcclxuKi9cclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDRg9GB0YLQsNC90L7QstC40Lwg0LjQt9C90LDRh9Cw0LvRjNC90YvQtSDQtNCw0L3QvdGL0LVcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkb2NEYXRhOiB0aGlzLnByb3BzLmRhdGEucm93LFxyXG4gICAgICAgICAgICBlZGl0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93TWVzc2FnZUJveDogJ25vbmUnLFxyXG4gICAgICAgICAgICBncmlkRGF0YTogdGhpcy5wcm9wcy5kYXRhLmRldGFpbHMsXHJcbiAgICAgICAgICAgIHJlbGF0aW9uczogdGhpcy5wcm9wcy5kYXRhLnJlbGF0aW9ucyxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZzogdGhpcy5wcm9wcy5kYXRhLmdyaWRDb25maWcsXHJcbiAgICAgICAgICAgIGdyaWRSb3dFZGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgZ3JpZFJvd0V2ZW50OiBudWxsLFxyXG4gICAgICAgICAgICBncmlkUm93RGF0YTogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0L/QuNGI0LXQvCDQuNGB0YXQvtC00L3Ri9C1INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LUsINGA0LXQs9C40YHRgtGA0LjRgNGD0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICBkYXRhID0gc2VsZi5wcm9wcy5kYXRhLnJvdyxcclxuICAgICAgICAgICAgZGV0YWlscyA9IHNlbGYucHJvcHMuZGF0YS5kZXRhaWxzLFxyXG4gICAgICAgICAgICBncmlkQ29uZmlnID0gc2VsZi5wcm9wcy5kYXRhLmdyaWRDb25maWc7XHJcblxyXG4gICAgICAgIC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGRhdGEpO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RvY0lkQ2hhbmdlJywgZGF0YS5pZCk7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGRldGFpbHMpOyAvLyDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRDb25maWdDaGFuZ2UnLCBncmlkQ29uZmlnKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkTmFtZScsICdzb3JkZXItZ3JpZC1yb3cnKTsgLy8g0LfQsNC00LDQtdC8INC40LzRjyDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdGC0YDQvtC60Lgg0LPRgNC40LTQsCAo0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRlZDogbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdGCINC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0LIg0LPRgNC40LTQtVxyXG4gICAgICAgIGRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGV0YWlscycsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgaXNDaGFuZ2VkID0gSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShwcmV2aW91c1ZhbHVlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50IGRldGFpbHMgY2hhbmdlZCcsIGlzQ2hhbmdlZCwgdHlwZW9mIG5ld1ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0NoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vINC40YLQvtCz0LhcclxuICAgICAgICAgICAgICAgIGxldCBzdW1tYSA9IG5ld1ZhbHVlLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSk7fSwwKSwgLy8g0YHRg9C80LzQsCDQtNC+0LrRg9C80LXQvdGC0LBcclxuICAgICAgICAgICAgICAgICAgICBkb2NEYXRhID0gc2VsZi5zdGF0ZS5kb2NEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY0RhdGEuc3VtbWEgPSBzdW1tYTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCduZXcgc3VtbWE6Jywgc3VtbWEpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Z3JpZERhdGE6IG5ld1ZhbHVlLCBkb2NEYXRhOiBkb2NEYXRhfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXQvCDRgNC10LbQuNC8INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBkb2NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3ZvcmRlciBvbkNoYW5nZSAnLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHByZXZpb3VzVmFsdWUpKSB7XHJcbi8vICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2VkaXRlZDogbmV3VmFsdWV9KTtcclxuICAgICAgICAgICAgICAgIC8vINC+0YLRgdC70LXQttC40LLQsNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINC90LAg0L/QvtC70LUgYXN1dHVzaWQg0Lgg0YLQvtCz0LTQsCDQt9Cw0L/RgNC+0YEg0L3QsCDQvdC+0LzQtdGA0LAg0YHRh9C10YLQvtCyINGBINC/0LDRgNCw0LzQtdGC0YDQsNC80Lgg0JjQlCDRg9GH0YDQtdC20LTQtdC90LjRjyDQuCDQvdC+0LzQtdGA0LAg0YHRh9C10YLQsFxyXG4vLyAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndm9yZGVyIG9uQ2hhbmdlICcsIG5ld1ZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG5ld1ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbmV3VmFsdWUuYXN1dHVzaWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0YHRgtC40YDQsNC10Lwg0YHRgdGL0LvQutGDINC90LAg0YHRh9C10YJcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmFydmlkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJyxkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkb2NEYXRhOiBkYXRhfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDRg9GB0YLQsNC90L7QstC40Lwg0L3QvtCy0YvQuSDRhNC40LvRjNGC0YBcclxuICAgICAgICAgICAgICAgIHZhciBhcnZlTGliUGFyYW1zID0gW2RhdGEuYXN1dHVzaWQsIGRhdGEuYXJ2aWRdO1xyXG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc2V0TGlic0ZpbHRlcicsICdhcnZlZCcsYXJ2ZUxpYlBhcmFtcyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XHJcbiAgICAgICAgdGhpcy5yZWxhdGVkRG9jdW1lbnRzKCk7XHJcblxyXG5cclxuICAgICAgICAvLyDQs9GA0YPQt9C40Lwg0YHQv9GA0LDQstC+0YfQvdC40LrQuFxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2xvYWRMaWJzJywgJycpO1xyXG5cclxuICAgICAgICAvLyDQtdGB0LvQuCDQvdC+0LLRi9C5INC00L7QutGD0LzQtdC90YIgKGlkID09IDApXHJcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGE7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmlkID09IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2VkaXRlZCBtb2RlIGNvbnRyb2wnLCBkYXRhKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZWRpdGVkQ2hhbmdlJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5zdGF0ZS5kb2NEYXRhLFxyXG4gICAgICAgICAgICBpc0VkaXRlTW9kZSA9IHRoaXMuc3RhdGUuZWRpdGVkLFxyXG4gICAgICAgICAgICBzaG93TWVzc2FnZUJveCA9IHRoaXMuc3RhdGUuc2hvd01lc3NhZ2VCb3g7IC8vINCx0YPQtNC10YIg0YPQv9GA0LDQstC70Y/RgtGMINC+0LrQvdC+0Lwg0YHQvtC+0LHRidC10L3QuNC5XHJcblxyXG4gICAgICAgIC8vICBwYXR0ZXJuPSdbQS1aYS16XXszfSdcclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSB0aGlzLnN0YXRlLmdyaWREYXRhLFxyXG4gICAgICAgICAgICBncmlkQ29sdW1ucyA9IHRoaXMuc3RhdGUuZ3JpZENvbmZpZztcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ZvcmRlciBwYWdlcycsIHRoaXMucGFnZXMpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybSwge3BhZ2VzOiB0aGlzLnBhZ2VzLCByZWY6IFwiZm9ybVwiLCBvblN1Ym1pdDogdGhpcy5vblN1Ym1pdCwgc3R5bGU6IHtkaXNwbGF5OiAndGFibGUnfX0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyLCB7dmFsaWRhdG9yOiB0aGlzLnZhbGlkYXRlRm9ybX0pLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJkaXYtZG9jXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERvY0NvbW1vbiwge2RhdGE6IGRhdGF9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZpZWxkc2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTnVtYmVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJudW1iZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5udW1iZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiZmFsc2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0RGF0ZSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJLdXVww6RldiBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtwdlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmtwdiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwia3B2XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiS3V1cMOkZXZcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIkthc3NhXCIsIG5hbWU6IFwia2Fzc2FfaWRcIiwgbGliczogXCJhYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmthc3NhX2lkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZGF0YS5rYXNzYSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJLYXNzYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJrYXNzYV9pZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIlBhcnRuZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFzdXR1c2lkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliczogXCJhc3V0dXNlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmFzdXR1c2lkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxJZDogXCJpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZGF0YS5hc3V0dXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiUGFydG5lclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJhc3V0dXNpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQXJ2ZSBuci5cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFydmlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliczogXCJhcnZlZFNpc3NlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuYXJ2aWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbElkOiBcImlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBkYXRhLmFydm5yLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkFydmUgbnIuXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImFydmlkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnRuRGVsZXRlOiB0cnVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJEb2t1bWVudCBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRva3VtZW50XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuZG9rdW1lbnQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiRG9rdW1lbnRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZG9rdW1lbnRcIiwgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOaW1pXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5pbWlcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIk5pbWlcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJuaW1pXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hYWRyZXNzLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCB3aWR0aDogXCI4NSVcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQWFkcmVzc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhYWRyZXNzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJBYWRyZXNzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYWFkcmVzc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcInRleHRBYWRyZXNzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hYWRyZXNzLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCB3aWR0aDogXCI4NSVcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0QXJlYSwge2NsYXNzTmFtZTogXCJ1aS1jMlwiLCB0aXRsZTogXCJBbHVzXCIsIG5hbWU6IFwiYWx1c1wiLCBwbGFjZWhvbGRlcjogXCJBbHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiYWx1c1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcInRleHRBbHVzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5hbHVzLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCB3aWR0aDogXCI4NSVcIn0pKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhR3JpZCwge3NvdXJjZTogXCJkZXRhaWxzXCIsIGdyaWREYXRhOiBncmlkRGF0YSwgZ3JpZENvbHVtbnM6IGdyaWRDb2x1bW5zLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlR3JpZFJvdzogdGhpcy5oYW5kbGVHcmlkUm93LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSwgcmVmOiBcIkRhdGFHcmlkXCJ9KSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7Y2xhc3NOYW1lOiBcInVpLWMyXCIsIHRpdGxlOiBcIlN1bW1hOiBcIiwgbmFtZTogXCJzdW1tYVwiLCBwbGFjZWhvbGRlcjogXCJTdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzdW1tYVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnN1bW1hLCBkaXNhYmxlZDogXCJ0cnVlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogXCJeWzAtOV0rKFxcXFwuWzAtOV17MSw0fSk/JFwifSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qINC/0LDRgtC10YDQvSDQtNC70Y8g0YbQuNGE0YAg0YEgNCDQt9C90LDQutCw0LzQuCDQv9C+0YHQu9C1INGC0L7Rh9C60LgqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dEFyZWEsIHtjbGFzc05hbWU6IFwidWktYzJcIiwgdGl0bGU6IFwiTcOkcmt1c2VkXCIsIG5hbWU6IFwibXV1ZFwiLCBwbGFjZWhvbGRlcjogXCJNw6Rya3VzZWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJtdXVkXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5tdXVkLCByZWFkT25seTogIWlzRWRpdGVNb2RlLCB3aWR0aDogXCI4NSVcIn0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZ3JpZFJvd0VkaXQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEdyaWRSb3csIHttb2RhbFBhZ2VDbGljazogdGhpcy5tb2RhbFBhZ2VDbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRFdmVudDogdGhpcy5zdGF0ZS5ncmlkUm93RXZlbnQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkUm93RGF0YTogdGhpcy5zdGF0ZS5ncmlkUm93RGF0YX0pIDogbnVsbFxyXG5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUdyaWRSb3c6IGZ1bmN0aW9uIChncmlkRXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAvLyDRg9C/0YDQsNCy0LvQtdC90LjQtSDQvNC+0LTQsNC70YzQvdGL0Lwg0L7QutC90L7QvFxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiB0cnVlLCBncmlkUm93RXZlbnQ6IGdyaWRFdmVudCwgZ3JpZFJvd0RhdGE6IGRhdGF9KTtcclxuICAgIH0sXHJcblxyXG4gICAgbW9kYWxQYWdlQ2xpY2s6IGZ1bmN0aW9uIChidG5FdmVudCwgZGF0YSkge1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQvtGC0LDQtdC8IE9rINC40Lcg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LBcclxuICAgICAgICB2YXIgZ3JpZERhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kZXRhaWxzLFxyXG4gICAgICAgICAgICBkb2NEYXRhID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgZ3JpZFJvd0lkID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuZ3JpZFJvd0lkLFxyXG4gICAgICAgICAgICBncmlkQ29sdW1ucyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmdyaWRDb25maWc7XHJcbiAgICAgICAgdmFyIGdyaWRSb3cgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGdyaWRSb3dJZCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGdyaWRSb3cgPSBncmlkRGF0YVtncmlkUm93SWRdO1xyXG4gICAgICAgIH1cclxuLy8gICAgICAgIGNvbnNvbGUubG9nKCdwcmV2aW9zIHN0YXRlIGdyaWREYXRhLCBkb2NEYXRhJywgZ3JpZERhdGEsICBkb2NEYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcclxuLy8gICAgICAgICAgICBjb25zb2xlLmxvZygnIG1vZGFsUGFnZUNsaWNrIGRhdGEsIGdyaWRSb3dJZCwgZ3JpZFJvdycsIGRhdGEsIGdyaWRSb3dJZCwgZ3JpZFJvdyk7XHJcbiAgICAgICAgICAgIGlmIChncmlkUm93SWQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQvdC+0LLQsNGPINC30LDQv9C40YHRjFxyXG4gICAgICAgICAgICAgICAgLy8g0YTQvtGA0LzQuNGA0YPQtdC8INC/0YPRgdGC0YPRjiDRgdGC0YDQvtC60YNcclxuLy8gICAgICAgICAgICAgICAgZ3JpZFJvdyA9e307XHJcbiAgICAgICAgICAgICAgICBncmlkUm93WydpZCddID0gJ05FVycgKyBNYXRoLnJhbmRvbSgpOyAgLy8g0LPQtdC90LXRgNC40YDRg9C10Lwg0L3QvtCy0L7QtSDQmNCUXHJcbiAgICAgICAgICAgICAgICBncmlkQ29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSAge3JldHVybiBncmlkUm93W2ZpZWxkXSA9IG51bGw7fSk7IC8vINGB0L7Qt9C00LDQtdC8INC/0L7Qu9GPINCyINC+0LHRitC10LrRgtC1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbihmaWVsZCkgIHtcclxuICAgICAgICAgICAgICAgIGdyaWRSb3dbZmllbGQubmFtZV0gPSBmaWVsZC52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9GB0L7RhdGA0LDQvdC40Lwg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtSwgZ3JpZFJvdycsIGdyaWRSb3cpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vINC30LDQv9C+0LvQvdC40Lwg0L/QvtC70Y8gbmltZXR1c1xyXG4gICAgICAgICAgICB2YXIgbGlicyA9IGZsdXguc3RvcmVzLmRvY1N0b3JlLmxpYnMsXHJcbiAgICAgICAgICAgICAgICBub21MaWIgPSBsaWJzLmZpbHRlcihmdW5jdGlvbihkYXRhKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmlkID09ICdub21lbmNsYXR1cmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciAgIG5vbVJvdyA9IG5vbUxpYlswXS5kYXRhLmZpbHRlcihmdW5jdGlvbihyb3cpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT0gTnVtYmVyKGdyaWRSb3cubm9taWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvdztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobm9tUm93KSB7XHJcbiAgICAgICAgICAgICAgICBncmlkUm93WyduaW1ldHVzJ10gPSBub21Sb3dbMF0ubmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FmdGVyIHN0YXRlIGdyaWREYXRhICVzLCBkb2NEYXRhICVzJywgZ3JpZERhdGEsICBkb2NEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChncmlkUm93SWQgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGFbZ3JpZFJvd0lkXSA9IGdyaWRSb3c7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YS5wdXNoKGdyaWRSb3cpOyAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkUm93SWRDaGFuZ2UnLCBncmlkRGF0YS5sZW5ndGgpOyAvLyDQv9C+0LzQtdGH0LDQtdC8INC90L7QstGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGdyaWREYXRhKTsgLy8g0L/QuNGI0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDRgdGH0LjRgtCw0LXQvCDQuNGC0L7Qs9C4XHJcblxyXG4gICAgICAgIHZhciBkb2NTdW1tYSA9IGdyaWREYXRhLnJlZHVjZShmdW5jdGlvbihzdW0sIHJvdykgIHtyZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5zdW1tYSk7fSwgMCk7IC8vINGB0YPQvNC80LAg0YHRh9C10YLQsFxyXG5cclxuICAgICAgICBkb2NEYXRhLnN1bW1hID0gZG9jU3VtbWE7XHJcblxyXG4gICAgICAgIHRoaXMucmVmc1snRGF0YUdyaWQnXS5yZXBsYWNlU3RhdGUoe2dyaWREYXRhOiBncmlkRGF0YX0pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRSb3dFZGl0OiBmYWxzZSwgZG9jRGF0YTogZG9jRGF0YX0pO1xyXG5cclxuICAgIH0sXHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVm9yZGVyO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2RvY3Mvdm9yZGVyLmpzeFxuLy8gbW9kdWxlIGlkID0gODBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuY29uc3QgRm9ybSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZm9ybS5qcycpO1xyXG5jb25zdCBQYWdlTGFiZWwgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3BhZ2VfbGFiZWwnKTtcclxuXHJcbnZhciBwYWdlcyA9IFsnUGFnZTEnLCAnUGFnZTInXTtcclxuXHJcbmNvbnN0IFBhbGsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiUGFsa1wiLFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm0sIHtwYWdlczogcGFnZXN9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiIFBhbGsgXCIpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfX0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYWxrO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy9wYWxrX29wZXIuanN4XG4vLyBtb2R1bGUgaWQgPSA4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDclVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDblVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3JVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=
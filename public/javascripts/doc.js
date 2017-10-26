var doc =
webpackJsonp_name_([2],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var ReactDOM = __webpack_require__(1);

	// данные для хранилища
	localStorage['docStore'] = storeData;
	storeData = JSON.parse(storeData);
	userData = JSON.parse(userData);

	// создаем обработчик события на изменение даннх


	// запросим компонент документа по его типу
	var Doc = __webpack_require__(132)(storeData.docTypeId);

	ReactDOM.hydrate(React.createElement(Doc, { data: storeData.data, bpm: storeData.bpm, userData: userData }), document.getElementById('doc'));

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    flux = __webpack_require__(14);

	var Form = __webpack_require__(19),
	    InputText = __webpack_require__(23),
	    InputDate = __webpack_require__(25),
	    InputNumber = __webpack_require__(27),
	    DocCommon = __webpack_require__(29),
	    Select = __webpack_require__(31),

	//    SelectData = require('../../components/select-data/select-data.jsx'),
	TextArea = __webpack_require__(33),
	    DataGrid = __webpack_require__(35),
	    GridButtonAdd = __webpack_require__(102),
	    GridButtonEdit = __webpack_require__(105),
	    GridButtonDelete = __webpack_require__(106),
	    DokProp = __webpack_require__(107),
	    relatedDocuments = __webpack_require__(108),
	    ToolbarContainer = __webpack_require__(109),
	    MenuToolBar = __webpack_require__(111),
	    DocToolBar = __webpack_require__(117),
	    validateForm = __webpack_require__(124),
	    ModalPage = __webpack_require__(125),
	    styles = __webpack_require__(127);

	var LIBDOK = 'ARV',
	    LIBRARIES = ['asutused', 'kontod', 'dokProps', 'users', 'aa', 'tunnus', 'project', 'nomenclature'];

	// Create a store
	var docStore = __webpack_require__(128);

	var now = new Date();

	var Arve = function (_React$PureComponent) {
	    _inherits(Arve, _React$PureComponent);

	    function Arve(props) {
	        _classCallCheck(this, Arve);

	        var _this = _possibleConstructorReturn(this, (Arve.__proto__ || Object.getPrototypeOf(Arve)).call(this, props));

	        _this.state = {
	            docData: _this.props.data.row,
	            bpm: _this.props.bpm,
	            edited: _this.props.data.row.id == 0,
	            showMessageBox: 'none',
	            relations: _this.props.data.relations,
	            gridData: _this.props.data.details,
	            gridConfig: _this.props.data.gridConfig,
	            gridRowEdit: false,
	            gridRowEvent: null,
	            gridRowData: null,
	            libs: _this.createLibs(),
	            checked: false,
	            warning: '',
	            userData: props.userData
	        };

	        _this.pages = [{ pageName: 'Arve' }];
	        _this.requiredFields = [{
	            name: 'kpv',
	            type: 'D',
	            min: now.setFullYear(now.getFullYear() - 1),
	            max: now.setFullYear(now.getFullYear() + 1)
	        }, {
	            name: 'tahtaeg',
	            type: 'D',
	            min: now.setFullYear(now.getFullYear() - 1),
	            max: now.setFullYear(now.getFullYear() + 1)
	        }, { name: 'asutusid', type: 'N', min: null, max: null }, { name: 'summa', type: 'N', min: -9999999, max: 999999 }];
	        _this.handleToolbarEvents = _this.handleToolbarEvents.bind(_this);
	        _this.validation = _this.validation.bind(_this);
	        _this.modalPageClick = _this.modalPageClick.bind(_this);
	        _this.handleGridBtnClick = _this.handleGridBtnClick.bind(_this);
	        _this.addRow = _this.addRow.bind(_this);
	        _this.handleGridRowChange = _this.handleGridRowChange.bind(_this);
	        _this.validateGridRow = _this.validateGridRow.bind(_this);
	        _this.handleGridRowInput = _this.handleGridRowInput.bind(_this);
	        _this.createGridRow = _this.createGridRow.bind(_this);
	        _this.handleInputChange = _this.handleInputChange.bind(_this);
	        return _this;
	    }

	    _createClass(Arve, [{
	        key: 'validation',
	        value: function validation() {
	            if (!this.state.edited) return '';

	            var requiredFields = this.requiredFields;
	            var warning = __webpack_require__(124)(this, requiredFields);
	            return warning;
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            this.relatedDocuments();
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            // пишем исходные данные в хранилище, регистрируем обработчики событий
	            var self = this,
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
	                    var summa = newValue.reduce(function (sum, row) {
	                        return sum + Number(row.summa);
	                    }, 0),
	                        // сумма счета
	                    kbm = newValue.reduce(function (sum, row) {
	                        return sum + Number(row.kbm);
	                    }, 0),
	                        // сумма налога
	                    docData = self.state.docData;

	                    docData.summa = summa;
	                    docData.kbm = kbm;

	                    self.setState({ gridData: newValue, docData: docData });
	                }
	            });

	            // грузим справочники
	            LIBRARIES.forEach(function (lib) {
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
	                    self.setState({ edited: newValue });
	                }
	            });

	            docStore.on('change:libs', function (newValue, previousValue) {
	                var isChanged = false,
	                    libs = newValue,
	                    libsData = _this2.state.libs;

	                if (newValue.length > 0) {

	                    libs.forEach(function (lib) {
	                        if (lib.id === 'dokProps') {
	                            // оставим только данные этого документа

	                        }
	                        if (_this2.state.libs[lib.id] && lib.data.length > 0) {
	                            libsData[lib.id] = lib.data;
	                            isChanged = true;
	                        }
	                    });
	                }

	                if (isChanged) {
	                    self.setState({ libs: libsData });
	                }
	            });
	        }

	        /*
	            shouldComponentUpdate(nextProps, nextState) {
	                // @todo добавить проверку на изменение состояния
	                return true;
	            }
	        */

	    }, {
	        key: 'render',
	        value: function render() {
	            // формируем зависимости
	            relatedDocuments(this);

	            var bpm = this.state.bpm,
	                isEditeMode = this.state.edited,
	                toolbarParams = this.prepaireToolBarParameters(isEditeMode),
	                validationMessage = this.validation(),
	                libs = flux.stores.docStore.libs;

	            var btnParams = {
	                btnStart: {
	                    show: true
	                }
	            };

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(MenuToolBar, { edited: isEditeMode, params: btnParams, userData: this.state.userData })
	                ),
	                React.createElement(
	                    Form,
	                    { pages: this.pages,
	                        ref: 'form',
	                        handlePageClick: this.handlePageClick,
	                        disabled: isEditeMode },
	                    React.createElement(
	                        ToolbarContainer,
	                        { ref: 'toolbar-container' },
	                        React.createElement(
	                            'div',
	                            { className: 'doc-toolbar-warning' },
	                            validationMessage ? React.createElement(
	                                'span',
	                                null,
	                                validationMessage
	                            ) : null
	                        ),
	                        React.createElement(
	                            'div',
	                            null,
	                            React.createElement(DocToolBar, { bpm: bpm,
	                                ref: 'doc-toolbar',
	                                edited: isEditeMode,
	                                docStatus: this.state.docData.doc_status,
	                                validator: this.validation,
	                                eventHandler: this.handleToolbarEvents })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: styles.doc },
	                        React.createElement(
	                            'div',
	                            { style: styles.docRow },
	                            React.createElement(DocCommon, {
	                                ref: 'doc-common',
	                                data: this.state.docData,
	                                readOnly: !isEditeMode })
	                        ),
	                        React.createElement(
	                            'div',
	                            { style: styles.docRow },
	                            React.createElement(
	                                'div',
	                                { style: styles.docColumn },
	                                React.createElement(InputText, { ref: 'input-number',
	                                    title: 'Number',
	                                    name: 'number',
	                                    value: this.state.docData.number,
	                                    readOnly: !isEditeMode,
	                                    onChange: this.handleInputChange }),
	                                React.createElement(InputDate, { title: 'Kuup\xE4ev ',
	                                    name: 'kpv', value: this.state.docData.kpv,
	                                    ref: 'input-kpv',
	                                    readOnly: !isEditeMode,
	                                    onChange: this.handleInputChange }),
	                                React.createElement(InputDate, { title: 'T\xE4htaeg ',
	                                    name: 'tahtaeg',
	                                    value: this.state.docData.tahtaeg,
	                                    ref: 'input-tahtaeg',
	                                    readOnly: !isEditeMode,
	                                    onChange: this.handleInputChange }),
	                                React.createElement(Select, { title: 'Asutus',
	                                    name: 'asutusid',
	                                    libs: 'asutused',
	                                    data: this.state.libs['asutused'],
	                                    value: this.state.docData.asutusid,
	                                    defaultValue: this.state.docData.asutus,
	                                    ref: 'select-asutusid',
	                                    btnDelete: isEditeMode,
	                                    onChange: this.handleInputChange,
	                                    readOnly: !isEditeMode }),
	                                React.createElement(InputText, { title: 'Lisa ',
	                                    name: 'lisa',
	                                    value: this.state.docData.lisa,
	                                    ref: 'input-lisa',
	                                    readOnly: !isEditeMode,
	                                    onChange: this.handleInputChange })
	                            ),
	                            React.createElement(
	                                'div',
	                                { style: styles.docColumn },
	                                React.createElement(DokProp, { title: 'Konteerimine: ',
	                                    name: 'doklausid',
	                                    libs: 'dokProps',
	                                    value: this.state.docData.doklausid,
	                                    defaultValue: this.state.docData.dokprop,
	                                    ref: 'dokprop-doklausid',
	                                    readOnly: !isEditeMode })
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { style: styles.docRow },
	                            React.createElement(TextArea, { title: 'M\xE4rkused',
	                                name: 'muud',
	                                ref: 'textarea-muud',
	                                onChange: this.handleInputChange,
	                                value: this.state.docData.muud,
	                                readOnly: !isEditeMode })
	                        ),
	                        isEditeMode ? React.createElement(
	                            'div',
	                            { style: styles.docRow },
	                            React.createElement(
	                                ToolbarContainer,
	                                {
	                                    ref: 'grid-toolbar-container',
	                                    position: 'left' },
	                                React.createElement(GridButtonAdd, { onClick: this.handleGridBtnClick, ref: 'grid-button-add' }),
	                                React.createElement(GridButtonEdit, { onClick: this.handleGridBtnClick, ref: 'grid-button-edit' }),
	                                React.createElement(GridButtonDelete, { onClick: this.handleGridBtnClick, ref: 'grid-button-delete' })
	                            )
	                        ) : null,
	                        React.createElement(
	                            'div',
	                            { style: styles.docRow },
	                            React.createElement(DataGrid, { source: 'details',
	                                gridData: this.state.gridData,
	                                gridColumns: this.state.gridConfig,
	                                handleGridRow: this.handleGridRow,
	                                readOnly: !isEditeMode,
	                                ref: 'data-grid' })
	                        ),
	                        React.createElement(
	                            'div',
	                            { style: styles.docRow },
	                            React.createElement(InputText, { title: 'Summa ',
	                                name: 'summa',
	                                ref: 'input-summa',
	                                value: this.state.docData.summa,
	                                disabled: true,
	                                onChange: this.handleInputChange,
	                                pattern: '^[0-9]+(\\.[0-9]{1,4})?$' }),
	                            React.createElement(InputText, { title: 'K\xE4ibemaks ',
	                                name: 'kbm',
	                                ref: 'input-kbm',
	                                disabled: true,
	                                value: this.state.docData.kbm,
	                                onChange: this.handleInputChange,
	                                pattern: '^[0-9]+(\\.[0-9]{1,4})?$' })
	                        ),
	                        this.state.gridRowEdit ? this.createGridRow() : null
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'relatedDocuments',
	        value: function relatedDocuments() {
	            var _this3 = this;

	            // формируем зависимости
	            var relatedDocuments = this.state.relations;
	            if (relatedDocuments.length > 0) {
	                relatedDocuments.forEach(function (doc) {
	                    if (doc.id) {
	                        // проверим на уникальность списка документов
	                        var isExists = _this3.pages.find(function (page) {
	                            if (!page.docId) {
	                                return false;
	                            } else {
	                                return page.docId == doc.id && page.docTypeId == doc.doc_type;
	                            }
	                        });

	                        if (!isExists) {
	                            // в массиве нет, добавим ссылку на документ
	                            _this3.pages.push({ docTypeId: doc.doc_type, docId: doc.id, pageName: doc.name + ' id:' + doc.id });
	                        }
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'modalPageClick',
	        value: function modalPageClick(btnEvent, data) {
	            // отработаем Ok из модального окна
	            var gridData = this.state.gridData,
	                docData = this.state.docData,
	                gridColumns = this.state.gridConfig,
	                gridRow = this.state.gridRowData;

	            if (btnEvent == 'Ok') {

	                // ищем по ид строку в данных грида, если нет, то добавим строку
	                if (!gridData.some(function (row) {
	                    if (row.id === gridRow.id) return true;
	                })) {
	                    // вставка новой строки
	                    gridData.splice(0, 0, gridRow);
	                } else {
	                    gridData = gridData.map(function (row) {
	                        if (row.id === gridRow.id) {
	                            // нашли, замещаем
	                            return gridRow;
	                        } else {
	                            return row;
	                        }
	                    });
	                }
	            }

	            docData = this.recalcDocSumma(docData);
	            this.setState({ gridRowEdit: false, gridData: gridData, docData: docData });
	        }
	    }, {
	        key: 'handlePageClick',
	        value: function handlePageClick(page) {
	            if (page.docId) {
	                var url = "/document/" + page.docTypeId + page.docId;
	                document.location.href = url;
	            }
	        }
	    }, {
	        key: 'handleSelectTask',
	        value: function handleSelectTask(e) {
	            // метод вызывается при выборе задачи
	            var taskValue = e.target.value;
	        }
	    }, {
	        key: 'handleToolbarEvents',
	        value: function handleToolbarEvents(event) {
	            // toolbar event handler

	            switch (event) {
	                case 'CANCEL':
	                    var backup = flux.stores.docStore.backup;
	                    this.setState({ docData: backup.row, gridData: backup.details, warning: '' });
	                    break;
	                default:
	                    console.error('handleToolbarEvents, no event handler for ', event);
	            }
	        }
	    }, {
	        key: 'handleInputChange',
	        value: function handleInputChange(inputName, inputValue) {
	            // обработчик изменений
	            console.log('handleInputChange', inputName, inputValue);
	            // изменения допустимы только в режиме редактирования
	            if (!this.state.edited) {
	                console.error('not in edite mode');
	                return false;
	            }

	            var data = this.state.docData;

	            data[inputName] = inputValue;
	            this.setState({ docData: data });
	            /*
	             let data = flux.stores.docStore.data;
	             data[inputName] = inputValue;
	             // задать новое значение поля
	             flux.doAction('dataChange', data);
	             */
	        }
	    }, {
	        key: 'prepaireToolBarParameters',
	        value: function prepaireToolBarParameters(isEditMode) {
	            var toolbarParams = {
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
	    }, {
	        key: 'handleGridBtnClick',
	        value: function handleGridBtnClick(btnName, id) {
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
	        }
	    }, {
	        key: 'deleteRow',
	        value: function deleteRow() {
	            // удалит активную строку
	            var gridData = this.state.gridData,
	                gridActiveRow = this.refs['data-grid'].state.activeRow,
	                docData = this.state.docData;

	            gridData.splice(gridActiveRow, 1);

	            // перерасчет итогов
	            docData = this.recalcDocSumma(docData);

	            // изменим состояние
	            this.setState({ gridData: gridData, docData: docData });
	        }
	    }, {
	        key: 'editRow',
	        value: function editRow() {
	            // откроет активную строку для редактирования
	            var gridData = this.state.gridData,
	                gridActiveRow = this.refs['data-grid'].state.activeRow,
	                gridRow = gridData[gridActiveRow];

	            // откроем модальное окно для редактирования
	            this.setState({ gridRowEdit: true, gridRowEvent: 'edit', gridRowData: gridRow });
	        }
	    }, {
	        key: 'addRow',
	        value: function addRow() {
	            // добавит в состояние новую строку

	            var gridColumns = this.state.gridConfig,
	                gridData = this.state.gridData,
	                newRow = new Object();

	            for (var i = 0; i < gridColumns.length; i++) {
	                var field = gridColumns[i].id;
	                newRow[field] = '';
	            }

	            newRow.id = 'NEW' + Math.random(); // генерим новое ид

	            // откроем модальное окно для редактирования
	            this.setState({ gridRowEdit: true, gridRowEvent: 'add', gridRowData: newRow });
	        }
	    }, {
	        key: 'createGridRow',
	        value: function createGridRow() {
	            var style = styles.gridRow,
	                row = this.state.gridRowData,
	                validateMessage = '',
	                modalObjects = ['btnOk', 'btnCancel'],
	                buttonOkReadOnly = validateMessage.length > 0 || !this.state.checked;

	            if (buttonOkReadOnly) {
	                // уберем кнопку Ок
	                modalObjects.splice(0, 1);
	            }

	            if (!row) return React.createElement('div', null);

	            var nomData = this.state.libs['nomenclature'].filter(function (lib) {
	                if (!lib.dok || lib.dok === LIBDOK) return lib;
	            });

	            return React.createElement(
	                'div',
	                { className: '.modalPage' },
	                React.createElement(
	                    ModalPage,
	                    {
	                        modalObjects: modalObjects,
	                        ref: 'modalpage-grid-row',
	                        show: true,
	                        modalPageBtnClick: this.modalPageClick,
	                        modalPageName: 'Rea lisamine / parandamine' },
	                    React.createElement(
	                        'div',
	                        { ref: 'grid-row-container' },
	                        React.createElement(
	                            'div',
	                            { style: styles.docRow },
	                            React.createElement(Select, { title: 'Teenus',
	                                name: 'nomid',
	                                libs: 'nomenclature',
	                                data: nomData,
	                                readOnly: false,
	                                value: row.nomid,
	                                defaultValue: row.kood,
	                                ref: 'nomid',
	                                placeholder: 'Teenuse kood',
	                                onChange: this.handleGridRowChange })
	                        ),
	                        React.createElement(
	                            'div',
	                            { style: styles.docRow },
	                            React.createElement(InputNumber, { title: 'Kogus ',
	                                name: 'kogus',
	                                value: row.kogus,
	                                readOnly: false,
	                                disabled: false,
	                                bindData: false,
	                                ref: 'kogus',
	                                className: 'ui-c2',
	                                onChange: this.handleGridRowInput })
	                        ),
	                        React.createElement(
	                            'div',
	                            { style: styles.docRow },
	                            React.createElement(InputNumber, { title: 'Hind ',
	                                name: 'hind',
	                                value: row.hind,
	                                readOnly: false,
	                                disabled: false,
	                                bindData: false,
	                                ref: 'hind',
	                                className: 'ui-c2',
	                                onChange: this.handleGridRowInput })
	                        ),
	                        React.createElement(
	                            'div',
	                            { style: styles.docRow },
	                            React.createElement(InputNumber, { title: 'Kbm-ta: ',
	                                name: 'kbmta',
	                                value: row.kbmta,
	                                disabled: true,
	                                bindData: false,
	                                ref: 'kbmta',
	                                className: 'ui-c2',
	                                onChange: this.handleGridRowChange })
	                        ),
	                        React.createElement(
	                            'div',
	                            { style: styles.docRow },
	                            React.createElement(InputNumber, { title: 'Kbm: ',
	                                name: 'kbm',
	                                value: row.kbm,
	                                disabled: true,
	                                bindData: false,
	                                ref: 'kbm',
	                                className: 'ui-c2',
	                                onBlur: this.handleGridRowInput })
	                        ),
	                        React.createElement(
	                            'div',
	                            { style: styles.docRow },
	                            React.createElement(InputNumber, { title: 'Summa: ',
	                                name: 'Summa',
	                                value: row.summa,
	                                disabled: true,
	                                bindData: false,
	                                ref: 'summa',
	                                className: 'ui-c2',
	                                onChange: this.handleGridRowInput })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'span',
	                            null,
	                            validateMessage
	                        )
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'handleGridRowChange',
	        value: function handleGridRowChange(name, value) {
	            // отслеживаем изменения данных на форме
	            var rowData = Object({}, this.state.gridRowData);

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

	            var libData = this.state.libs['nomenclature'];
	            libData.forEach(function (row) {
	                if (row.id == value) {
	                    rowData['kood'] = row.kood;
	                    rowData['nimetus'] = row.name;
	                    return;
	                }
	            });

	            rowData[name] = value;
	            this.setState({ gridRowData: rowData });
	            this.validateGridRow();
	        }
	    }, {
	        key: 'handleGridRowInput',
	        value: function handleGridRowInput(name, value) {
	            // пересчет сумм
	            var rowData = Object.assign({}, this.state.gridRowData);
	            rowData[name] = value;
	            rowData = this.recalcRowSumm(rowData);
	            this.setState({ gridRowData: rowData });
	            this.validateGridRow();
	        }
	    }, {
	        key: 'recalcRowSumm',
	        value: function recalcRowSumm(gridRowData) {
	            // перерасчет суммы строки и расчет налога
	            gridRowData['kogus'] = Number(gridRowData.kogus);
	            gridRowData['hind'] = Number(gridRowData.hind);
	            gridRowData['kbmta'] = Number(gridRowData['kogus']) * Number(gridRowData['hind']);
	            gridRowData['kbm'] = Number(gridRowData['kbmta'] * 0.20); // @todo врменно
	            gridRowData['summa'] = Number(gridRowData['kbmta']) + Number(gridRowData['kbm']);

	            return gridRowData;
	        }
	    }, {
	        key: 'recalcDocSumma',
	        value: function recalcDocSumma(docData) {
	            var gridData = Object.assign([], this.state.gridData);

	            docData['summa'] = 0;
	            docData['kbm'] = 0;
	            gridData.forEach(function (row) {
	                docData['summa'] += Number(row['summa']);
	                docData['kbm'] += Number(row['kbm']);
	            });
	            return docData;
	        }
	    }, {
	        key: 'validateGridRow',
	        value: function validateGridRow() {
	            // will check values on the form and return string with warning
	            var warning = '',
	                gridRowData = this.state.gridRowData;
	            // только после проверки формы на валидность
	            if (!gridRowData['nomid']) warning = warning + ' код услуги';
	            if (!gridRowData['kogus']) warning = warning + ' кол-во';
	            if (!gridRowData['hind']) warning = warning + ' цена';

	            if (warning.length > 2) {
	                // есть проблемы
	                warning = 'Отсутсвуют данные:' + warning;
	            }
	            this.setState({ checked: true, warning: warning });
	        }
	    }, {
	        key: 'createLibs',
	        value: function createLibs() {
	            // вернет объект библиотек документа
	            var libs = {};
	            LIBRARIES.forEach(function (lib) {
	                libs[lib] = [];
	            });
	            return libs;
	        }
	    }]);

	    return Arve;
	}(React.PureComponent);

	Arve.propTypes = {
	    data: PropTypes.object.isRequired,
	    bpm: PropTypes.array,
	    edited: PropTypes.bool,
	    showMessageBox: PropTypes.string,
	    gridData: PropTypes.array,
	    relations: PropTypes.array,
	    gridConfig: PropTypes.array,
	    gridRowEdit: PropTypes.bool,
	    gridRowEvent: PropTypes.string,
	    gridRowData: PropTypes.object,
	    libs: PropTypes.object,
	    checked: PropTypes.bool,
	    warning: PropTypes.string

	    /*
	     Arve.defaultProps = {
	     disabled: false,
	     show: true
	     };
	     */

	};module.exports = Arve;

/***/ }),

/***/ 127:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (docTypeId) {
	    // взависимости от типа документа вернет компонент документа

	    console.log('returnDocComponent:' + docTypeId);
	    var component = {};

	    switch (docTypeId) {
	        case 'PALK':
	            component = __webpack_require__(133);
	            break;
	        default:
	            component = __webpack_require__(2);
	    }
	    return component;
	};

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(13);
	var Form = __webpack_require__(134);
	var PageLabel = __webpack_require__(135);

	var pages = ['Page1', 'Page2'];

	var Palk = React.createClass({
	    displayName: 'Palk',

	    render: function render() {
	        return React.createElement(
	            Form,
	            { pages: pages },
	            React.createElement(
	                'span',
	                null,
	                ' Palk '
	            )
	        );
	    } });

	module.exports = Palk;

/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(13),
	    flux = __webpack_require__(14);

	var PageLabel = __webpack_require__(135);

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

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(13),
	    flux = __webpack_require__(14);

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

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLmpzeD81MjJiIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLnN0eWxlcy5qcz8zYTcwIiwid2VicGFjazovLy8uL21pZGRsZXdhcmUvcmV0dXJuRG9jQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvcGFsa19vcGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9wYWdlX2xhYmVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbi8vINC00LDQvdC90YvQtSDQtNC70Y8g0YXRgNCw0L3QuNC70LjRidCwXG5sb2NhbFN0b3JhZ2VbJ2RvY1N0b3JlJ10gPSBzdG9yZURhdGE7XG5zdG9yZURhdGEgPSBKU09OLnBhcnNlKHN0b3JlRGF0YSk7XG51c2VyRGF0YSA9IEpTT04ucGFyc2UodXNlckRhdGEpO1xuXG4vLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSDQtNCw0L3QvdGFXG5cblxuLy8g0LfQsNC/0YDQvtGB0LjQvCDQutC+0LzQv9C+0L3QtdC90YIg0LTQvtC60YPQvNC10L3RgtCwINC/0L4g0LXQs9C+INGC0LjQv9GDXG52YXIgRG9jID0gcmVxdWlyZSgnLi4vbWlkZGxld2FyZS9yZXR1cm5Eb2NDb21wb25lbnQnKShzdG9yZURhdGEuZG9jVHlwZUlkKTtcblxuUmVhY3RET00uaHlkcmF0ZShSZWFjdC5jcmVhdGVFbGVtZW50KERvYywgeyBkYXRhOiBzdG9yZURhdGEuZGF0YSwgYnBtOiBzdG9yZURhdGEuYnBtLCB1c2VyRGF0YTogdXNlckRhdGEgfSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb2MnKSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2MuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIEZvcm0gPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Zvcm0vZm9ybS5qc3gnKSxcbiAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2lucHV0LXRleHQvaW5wdXQtdGV4dC5qc3gnKSxcbiAgICBJbnB1dERhdGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2lucHV0LWRhdGUvaW5wdXQtZGF0ZS5qc3gnKSxcbiAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvaW5wdXQtbnVtYmVyL2lucHV0LW51bWJlci5qc3gnKSxcbiAgICBEb2NDb21tb24gPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RvYy1jb21tb24vZG9jLWNvbW1vbi5qc3gnKSxcbiAgICBTZWxlY3QgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuanN4JyksXG5cbi8vICAgIFNlbGVjdERhdGEgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3NlbGVjdC1kYXRhL3NlbGVjdC1kYXRhLmpzeCcpLFxuVGV4dEFyZWEgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3RleHQtYXJlYS90ZXh0LWFyZWEuanN4JyksXG4gICAgRGF0YUdyaWQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RhdGEtZ3JpZC9kYXRhLWdyaWQuanN4JyksXG4gICAgR3JpZEJ1dHRvbkFkZCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1hZGQvYnV0dG9uLXJlZ2lzdGVyLWFkZC5qc3gnKSxcbiAgICBHcmlkQnV0dG9uRWRpdCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeCcpLFxuICAgIEdyaWRCdXR0b25EZWxldGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZGVsZXRlL2J1dHRvbi1yZWdpc3Rlci1kZWxldGUuanN4JyksXG4gICAgRG9rUHJvcCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZG9jcHJvcC9kb2Nwcm9wLmpzeCcpLFxuICAgIHJlbGF0ZWREb2N1bWVudHMgPSByZXF1aXJlKCcuLi8uLi9taXhpbi9yZWxhdGVkRG9jdW1lbnRzLmpzeCcpLFxuICAgIFRvb2xiYXJDb250YWluZXIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci1jb250YWluZXIvdG9vbGJhci1jb250YWluZXIuanN4JyksXG4gICAgTWVudVRvb2xCYXIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvbWVudS10b29sYmFyL21lbnUtdG9vbGJhci5qc3gnKSxcbiAgICBEb2NUb29sQmFyID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL2RvYy10b29sYmFyL2RvYy10b29sYmFyLmpzeCcpLFxuICAgIHZhbGlkYXRlRm9ybSA9IHJlcXVpcmUoJy4uLy4uL21peGluL3ZhbGlkYXRlRm9ybScpLFxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxQYWdlLmpzeCcpLFxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vYXJ2ZS5zdHlsZXMnKTtcblxudmFyIExJQkRPSyA9ICdBUlYnLFxuICAgIExJQlJBUklFUyA9IFsnYXN1dHVzZWQnLCAna29udG9kJywgJ2Rva1Byb3BzJywgJ3VzZXJzJywgJ2FhJywgJ3R1bm51cycsICdwcm9qZWN0JywgJ25vbWVuY2xhdHVyZSddO1xuXG4vLyBDcmVhdGUgYSBzdG9yZVxudmFyIGRvY1N0b3JlID0gcmVxdWlyZSgnLi4vLi4vc3RvcmVzL2RvY19zdG9yZS5qcycpO1xuXG52YXIgbm93ID0gbmV3IERhdGUoKTtcblxudmFyIEFydmUgPSBmdW5jdGlvbiAoX1JlYWN0JFB1cmVDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoQXJ2ZSwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gQXJ2ZShwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXJ2ZSk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEFydmUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihBcnZlKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZG9jRGF0YTogX3RoaXMucHJvcHMuZGF0YS5yb3csXG4gICAgICAgICAgICBicG06IF90aGlzLnByb3BzLmJwbSxcbiAgICAgICAgICAgIGVkaXRlZDogX3RoaXMucHJvcHMuZGF0YS5yb3cuaWQgPT0gMCxcbiAgICAgICAgICAgIHNob3dNZXNzYWdlQm94OiAnbm9uZScsXG4gICAgICAgICAgICByZWxhdGlvbnM6IF90aGlzLnByb3BzLmRhdGEucmVsYXRpb25zLFxuICAgICAgICAgICAgZ3JpZERhdGE6IF90aGlzLnByb3BzLmRhdGEuZGV0YWlscyxcbiAgICAgICAgICAgIGdyaWRDb25maWc6IF90aGlzLnByb3BzLmRhdGEuZ3JpZENvbmZpZyxcbiAgICAgICAgICAgIGdyaWRSb3dFZGl0OiBmYWxzZSxcbiAgICAgICAgICAgIGdyaWRSb3dFdmVudDogbnVsbCxcbiAgICAgICAgICAgIGdyaWRSb3dEYXRhOiBudWxsLFxuICAgICAgICAgICAgbGliczogX3RoaXMuY3JlYXRlTGlicygpLFxuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICB3YXJuaW5nOiAnJyxcbiAgICAgICAgICAgIHVzZXJEYXRhOiBwcm9wcy51c2VyRGF0YVxuICAgICAgICB9O1xuXG4gICAgICAgIF90aGlzLnBhZ2VzID0gW3sgcGFnZU5hbWU6ICdBcnZlJyB9XTtcbiAgICAgICAgX3RoaXMucmVxdWlyZWRGaWVsZHMgPSBbe1xuICAgICAgICAgICAgbmFtZTogJ2twdicsXG4gICAgICAgICAgICB0eXBlOiAnRCcsXG4gICAgICAgICAgICBtaW46IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSAtIDEpLFxuICAgICAgICAgICAgbWF4OiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgKyAxKVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAndGFodGFlZycsXG4gICAgICAgICAgICB0eXBlOiAnRCcsXG4gICAgICAgICAgICBtaW46IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSAtIDEpLFxuICAgICAgICAgICAgbWF4OiBub3cuc2V0RnVsbFllYXIobm93LmdldEZ1bGxZZWFyKCkgKyAxKVxuICAgICAgICB9LCB7IG5hbWU6ICdhc3V0dXNpZCcsIHR5cGU6ICdOJywgbWluOiBudWxsLCBtYXg6IG51bGwgfSwgeyBuYW1lOiAnc3VtbWEnLCB0eXBlOiAnTicsIG1pbjogLTk5OTk5OTksIG1heDogOTk5OTk5IH1dO1xuICAgICAgICBfdGhpcy5oYW5kbGVUb29sYmFyRXZlbnRzID0gX3RoaXMuaGFuZGxlVG9vbGJhckV2ZW50cy5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMudmFsaWRhdGlvbiA9IF90aGlzLnZhbGlkYXRpb24uYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLm1vZGFsUGFnZUNsaWNrID0gX3RoaXMubW9kYWxQYWdlQ2xpY2suYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmhhbmRsZUdyaWRCdG5DbGljayA9IF90aGlzLmhhbmRsZUdyaWRCdG5DbGljay5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMuYWRkUm93ID0gX3RoaXMuYWRkUm93LmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5oYW5kbGVHcmlkUm93Q2hhbmdlID0gX3RoaXMuaGFuZGxlR3JpZFJvd0NoYW5nZS5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMudmFsaWRhdGVHcmlkUm93ID0gX3RoaXMudmFsaWRhdGVHcmlkUm93LmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5oYW5kbGVHcmlkUm93SW5wdXQgPSBfdGhpcy5oYW5kbGVHcmlkUm93SW5wdXQuYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmNyZWF0ZUdyaWRSb3cgPSBfdGhpcy5jcmVhdGVHcmlkUm93LmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5oYW5kbGVJbnB1dENoYW5nZSA9IF90aGlzLmhhbmRsZUlucHV0Q2hhbmdlLmJpbmQoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEFydmUsIFt7XG4gICAgICAgIGtleTogJ3ZhbGlkYXRpb24nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsaWRhdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5lZGl0ZWQpIHJldHVybiAnJztcblxuICAgICAgICAgICAgdmFyIHJlcXVpcmVkRmllbGRzID0gdGhpcy5yZXF1aXJlZEZpZWxkcztcbiAgICAgICAgICAgIHZhciB3YXJuaW5nID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vdmFsaWRhdGVGb3JtJykodGhpcywgcmVxdWlyZWRGaWVsZHMpO1xuICAgICAgICAgICAgcmV0dXJuIHdhcm5pbmc7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxNb3VudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgICAgICB0aGlzLnJlbGF0ZWREb2N1bWVudHMoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgLy8g0L/QuNGI0LXQvCDQuNGB0YXQvtC00L3Ri9C1INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LUsINGA0LXQs9C40YHRgtGA0LjRgNGD0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INGB0L7QsdGL0YLQuNC5XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICAgICAgZGF0YSA9IHNlbGYucHJvcHMuZGF0YS5yb3csXG4gICAgICAgICAgICAgICAgZGV0YWlscyA9IHNlbGYucHJvcHMuZGF0YS5kZXRhaWxzLFxuICAgICAgICAgICAgICAgIGdyaWRDb25maWcgPSBzZWxmLnByb3BzLmRhdGEuZ3JpZENvbmZpZztcblxuICAgICAgICAgICAgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC00LDQvdC90YvQtSDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RldGFpbHNDaGFuZ2UnLCBkZXRhaWxzKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2dyaWRDb25maWdDaGFuZ2UnLCBncmlkQ29uZmlnKTsgLy8g0LTQsNC90L3Ri9C1INCz0YDQuNC00LBcbiAgICAgICAgICAgIC8vICAgICAgICBmbHV4LmRvQWN0aW9uKCdncmlkTmFtZUNoYW5nZScsICdhcnYtZ3JpZC1yb3cnKTsgLy8g0LfQsNC00LDQtdC8INC40LzRjyDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdGC0YDQvtC60Lgg0LPRgNC40LTQsCAo0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cblxuICAgICAgICAgICAgLy8g0L7RgtGB0LvQtdC20LjQstCw0LXRgiDQuNC30LzQtdC90LXQvdC40Y8g0LTQsNC90L3Ri9GFINCyINCz0YDQuNC00LVcbiAgICAgICAgICAgIGRvY1N0b3JlLm9uKCdjaGFuZ2U6ZGV0YWlscycsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHByZXZpb3VzVmFsdWUpICYmIHR5cGVvZiBuZXdWYWx1ZSA9PSAnYXJyYXknKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vINC40YLQvtCz0LhcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1bW1hID0gbmV3VmFsdWUucmVkdWNlKGZ1bmN0aW9uIChzdW0sIHJvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1bSArIE51bWJlcihyb3cuc3VtbWEpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINGB0YPQvNC80LAg0YHRh9C10YLQsFxuICAgICAgICAgICAgICAgICAgICBrYm0gPSBuZXdWYWx1ZS5yZWR1Y2UoZnVuY3Rpb24gKHN1bSwgcm93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3VtICsgTnVtYmVyKHJvdy5rYm0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINGB0YPQvNC80LAg0L3QsNC70L7Qs9CwXG4gICAgICAgICAgICAgICAgICAgIGRvY0RhdGEgPSBzZWxmLnN0YXRlLmRvY0RhdGE7XG5cbiAgICAgICAgICAgICAgICAgICAgZG9jRGF0YS5zdW1tYSA9IHN1bW1hO1xuICAgICAgICAgICAgICAgICAgICBkb2NEYXRhLmtibSA9IGtibTtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHsgZ3JpZERhdGE6IG5ld1ZhbHVlLCBkb2NEYXRhOiBkb2NEYXRhIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyDQs9GA0YPQt9C40Lwg0YHQv9GA0LDQstC+0YfQvdC40LrQuFxuICAgICAgICAgICAgTElCUkFSSUVTLmZvckVhY2goZnVuY3Rpb24gKGxpYikge1xuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oXCJsb2FkTGlic1wiLCBsaWIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vINC10YHQu9C4INC90L7QstGL0Lkg0LTQvtC60YPQvNC10L3RgiAoaWQgPT0gMClcblxuICAgICAgICAgICAgaWYgKGRhdGEuaWQgPT0gMCkge1xuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2VkaXRlZENoYW5nZScsIHRydWUpO1xuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xuICAgICAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g0LTQtdC70LDQtdC8INC60L7Qv9C40LhcbiAgICAgICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignYmFja3VwQ2hhbmdlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBPYmplY3QuYXNzaWduKHt9LCBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IE9iamVjdC5hc3NpZ24oW10sIGZsdXguc3RvcmVzLmRvY1N0b3JlLmRldGFpbHMpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHsgZWRpdGVkOiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTpsaWJzJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzQ2hhbmdlZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBsaWJzID0gbmV3VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGxpYnNEYXRhID0gX3RoaXMyLnN0YXRlLmxpYnM7XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGxpYnMuZm9yRWFjaChmdW5jdGlvbiAobGliKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGliLmlkID09PSAnZG9rUHJvcHMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0L7RgdGC0LDQstC40Lwg0YLQvtC70YzQutC+INC00LDQvdC90YvQtSDRjdGC0L7Qs9C+INC00L7QutGD0LzQtdC90YLQsFxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMyLnN0YXRlLmxpYnNbbGliLmlkXSAmJiBsaWIuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlic0RhdGFbbGliLmlkXSA9IGxpYi5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc0NoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7IGxpYnM6IGxpYnNEYXRhIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLypcclxuICAgICAgICAgICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdG9kbyDQtNC+0LHQsNCy0LjRgtGMINC/0YDQvtCy0LXRgNC60YMg0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0YHQvtGB0YLQvtGP0L3QuNGPXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0LfQsNCy0LjRgdC40LzQvtGB0YLQuFxuICAgICAgICAgICAgcmVsYXRlZERvY3VtZW50cyh0aGlzKTtcblxuICAgICAgICAgICAgdmFyIGJwbSA9IHRoaXMuc3RhdGUuYnBtLFxuICAgICAgICAgICAgICAgIGlzRWRpdGVNb2RlID0gdGhpcy5zdGF0ZS5lZGl0ZWQsXG4gICAgICAgICAgICAgICAgdG9vbGJhclBhcmFtcyA9IHRoaXMucHJlcGFpcmVUb29sQmFyUGFyYW1ldGVycyhpc0VkaXRlTW9kZSksXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1lc3NhZ2UgPSB0aGlzLnZhbGlkYXRpb24oKSxcbiAgICAgICAgICAgICAgICBsaWJzID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUubGlicztcblxuICAgICAgICAgICAgdmFyIGJ0blBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBidG5TdGFydDoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNZW51VG9vbEJhciwgeyBlZGl0ZWQ6IGlzRWRpdGVNb2RlLCBwYXJhbXM6IGJ0blBhcmFtcywgdXNlckRhdGE6IHRoaXMuc3RhdGUudXNlckRhdGEgfSlcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIEZvcm0sXG4gICAgICAgICAgICAgICAgICAgIHsgcGFnZXM6IHRoaXMucGFnZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdmb3JtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVBhZ2VDbGljazogdGhpcy5oYW5kbGVQYWdlQ2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogaXNFZGl0ZU1vZGUgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvb2xiYXJDb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJlZjogJ3Rvb2xiYXItY29udGFpbmVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2RvYy10b29sYmFyLXdhcm5pbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1lc3NhZ2UgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25NZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEb2NUb29sQmFyLCB7IGJwbTogYnBtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdkb2MtdG9vbGJhcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRlZDogaXNFZGl0ZU1vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY1N0YXR1czogdGhpcy5zdGF0ZS5kb2NEYXRhLmRvY19zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogdGhpcy52YWxpZGF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXI6IHRoaXMuaGFuZGxlVG9vbGJhckV2ZW50cyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMuZG9jIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5kb2NSb3cgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERvY0NvbW1vbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdkb2MtY29tbW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5zdGF0ZS5kb2NEYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMuZG9jUm93IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5kb2NDb2x1bW4gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHsgcmVmOiAnaW5wdXQtbnVtYmVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnTnVtYmVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZG9jRGF0YS5udW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXREYXRlLCB7IHRpdGxlOiAnS3V1cFxceEU0ZXYgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdrcHYnLCB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLmtwdixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ2lucHV0LWtwdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdGVNb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXREYXRlLCB7IHRpdGxlOiAnVFxceEU0aHRhZWcgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICd0YWh0YWVnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEudGFodGFlZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ2lucHV0LXRhaHRhZWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwgeyB0aXRsZTogJ0FzdXR1cycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnYXN1dHVzaWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliczogJ2FzdXR1c2VkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc3RhdGUubGlic1snYXN1dHVzZWQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEuYXN1dHVzaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHRoaXMuc3RhdGUuZG9jRGF0YS5hc3V0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdzZWxlY3QtYXN1dHVzaWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnRuRGVsZXRlOiBpc0VkaXRlTW9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHsgdGl0bGU6ICdMaXNhICcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnbGlzYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLmxpc2EsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdpbnB1dC1saXNhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0ZU1vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5kb2NDb2x1bW4gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEb2tQcm9wLCB7IHRpdGxlOiAnS29udGVlcmltaW5lOiAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2Rva2xhdXNpZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJzOiAnZG9rUHJvcHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZG9jRGF0YS5kb2tsYXVzaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHRoaXMuc3RhdGUuZG9jRGF0YS5kb2twcm9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAnZG9rcHJvcC1kb2tsYXVzaWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5kb2NSb3cgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7IHRpdGxlOiAnTVxceEU0cmt1c2VkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ211dWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICd0ZXh0YXJlYS1tdXVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmRvY0RhdGEubXV1ZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRWRpdGVNb2RlID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMuZG9jUm93IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVG9vbGJhckNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAnZ3JpZC10b29sYmFyLWNvbnRhaW5lcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2xlZnQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEJ1dHRvbkFkZCwgeyBvbkNsaWNrOiB0aGlzLmhhbmRsZUdyaWRCdG5DbGljaywgcmVmOiAnZ3JpZC1idXR0b24tYWRkJyB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChHcmlkQnV0dG9uRWRpdCwgeyBvbkNsaWNrOiB0aGlzLmhhbmRsZUdyaWRCdG5DbGljaywgcmVmOiAnZ3JpZC1idXR0b24tZWRpdCcgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEJ1dHRvbkRlbGV0ZSwgeyBvbkNsaWNrOiB0aGlzLmhhbmRsZUdyaWRCdG5DbGljaywgcmVmOiAnZ3JpZC1idXR0b24tZGVsZXRlJyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMuZG9jUm93IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhR3JpZCwgeyBzb3VyY2U6ICdkZXRhaWxzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZERhdGE6IHRoaXMuc3RhdGUuZ3JpZERhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zOiB0aGlzLnN0YXRlLmdyaWRDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUdyaWRSb3c6IHRoaXMuaGFuZGxlR3JpZFJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRlTW9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAnZGF0YS1ncmlkJyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmRvY1JvdyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7IHRpdGxlOiAnU3VtbWEgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3N1bW1hJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAnaW5wdXQtc3VtbWEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5kb2NEYXRhLnN1bW1hLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46ICdeWzAtOV0rKFxcXFwuWzAtOV17MSw0fSk/JCcgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHsgdGl0bGU6ICdLXFx4RTRpYmVtYWtzICcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdrYm0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdpbnB1dC1rYm0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZG9jRGF0YS5rYm0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAnXlswLTldKyhcXFxcLlswLTldezEsNH0pPyQnIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5ncmlkUm93RWRpdCA/IHRoaXMuY3JlYXRlR3JpZFJvdygpIDogbnVsbFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVsYXRlZERvY3VtZW50cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWxhdGVkRG9jdW1lbnRzKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vINGE0L7RgNC80LjRgNGD0LXQvCDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XG4gICAgICAgICAgICB2YXIgcmVsYXRlZERvY3VtZW50cyA9IHRoaXMuc3RhdGUucmVsYXRpb25zO1xuICAgICAgICAgICAgaWYgKHJlbGF0ZWREb2N1bWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJlbGF0ZWREb2N1bWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZG9jKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2MuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsCDRg9C90LjQutCw0LvRjNC90L7RgdGC0Ywg0YHQv9C40YHQutCwINC00L7QutGD0LzQtdC90YLQvtCyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNFeGlzdHMgPSBfdGhpczMucGFnZXMuZmluZChmdW5jdGlvbiAocGFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGFnZS5kb2NJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhZ2UuZG9jSWQgPT0gZG9jLmlkICYmIHBhZ2UuZG9jVHlwZUlkID09IGRvYy5kb2NfdHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0V4aXN0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINCyINC80LDRgdGB0LjQstC1INC90LXRgiwg0LTQvtCx0LDQstC40Lwg0YHRgdGL0LvQutGDINC90LAg0LTQvtC60YPQvNC10L3RglxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMy5wYWdlcy5wdXNoKHsgZG9jVHlwZUlkOiBkb2MuZG9jX3R5cGUsIGRvY0lkOiBkb2MuaWQsIHBhZ2VOYW1lOiBkb2MubmFtZSArICcgaWQ6JyArIGRvYy5pZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdtb2RhbFBhZ2VDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBtb2RhbFBhZ2VDbGljayhidG5FdmVudCwgZGF0YSkge1xuICAgICAgICAgICAgLy8g0L7RgtGA0LDQsdC+0YLQsNC10LwgT2sg0LjQtyDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsFxuICAgICAgICAgICAgdmFyIGdyaWREYXRhID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcbiAgICAgICAgICAgICAgICBkb2NEYXRhID0gdGhpcy5zdGF0ZS5kb2NEYXRhLFxuICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zID0gdGhpcy5zdGF0ZS5ncmlkQ29uZmlnLFxuICAgICAgICAgICAgICAgIGdyaWRSb3cgPSB0aGlzLnN0YXRlLmdyaWRSb3dEYXRhO1xuXG4gICAgICAgICAgICBpZiAoYnRuRXZlbnQgPT0gJ09rJykge1xuXG4gICAgICAgICAgICAgICAgLy8g0LjRidC10Lwg0L/QviDQuNC0INGB0YLRgNC+0LrRgyDQsiDQtNCw0L3QvdGL0YUg0LPRgNC40LTQsCwg0LXRgdC70Lgg0L3QtdGCLCDRgtC+INC00L7QsdCw0LLQuNC8INGB0YLRgNC+0LrRg1xuICAgICAgICAgICAgICAgIGlmICghZ3JpZERhdGEuc29tZShmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT09IGdyaWRSb3cuaWQpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vINCy0YHRgtCw0LLQutCwINC90L7QstC+0Lkg0YHRgtGA0L7QutC4XG4gICAgICAgICAgICAgICAgICAgIGdyaWREYXRhLnNwbGljZSgwLCAwLCBncmlkUm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBncmlkRGF0YSA9IGdyaWREYXRhLm1hcChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93LmlkID09PSBncmlkUm93LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0L3QsNGI0LvQuCwg0LfQsNC80LXRidCw0LXQvFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBncmlkUm93O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvY0RhdGEgPSB0aGlzLnJlY2FsY0RvY1N1bW1hKGRvY0RhdGEpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGdyaWRSb3dFZGl0OiBmYWxzZSwgZ3JpZERhdGE6IGdyaWREYXRhLCBkb2NEYXRhOiBkb2NEYXRhIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVQYWdlQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlUGFnZUNsaWNrKHBhZ2UpIHtcbiAgICAgICAgICAgIGlmIChwYWdlLmRvY0lkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IFwiL2RvY3VtZW50L1wiICsgcGFnZS5kb2NUeXBlSWQgKyBwYWdlLmRvY0lkO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZVNlbGVjdFRhc2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlU2VsZWN0VGFzayhlKSB7XG4gICAgICAgICAgICAvLyDQvNC10YLQvtC0INCy0YvQt9GL0LLQsNC10YLRgdGPINC/0YDQuCDQstGL0LHQvtGA0LUg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICB2YXIgdGFza1ZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZVRvb2xiYXJFdmVudHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlVG9vbGJhckV2ZW50cyhldmVudCkge1xuICAgICAgICAgICAgLy8gdG9vbGJhciBldmVudCBoYW5kbGVyXG5cbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdDQU5DRUwnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgYmFja3VwID0gZmx1eC5zdG9yZXMuZG9jU3RvcmUuYmFja3VwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZG9jRGF0YTogYmFja3VwLnJvdywgZ3JpZERhdGE6IGJhY2t1cC5kZXRhaWxzLCB3YXJuaW5nOiAnJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignaGFuZGxlVG9vbGJhckV2ZW50cywgbm8gZXZlbnQgaGFuZGxlciBmb3IgJywgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVJbnB1dENoYW5nZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVJbnB1dENoYW5nZShpbnB1dE5hbWUsIGlucHV0VmFsdWUpIHtcbiAgICAgICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC40LfQvNC10L3QtdC90LjQuVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsZUlucHV0Q2hhbmdlJywgaW5wdXROYW1lLCBpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgIC8vINC40LfQvNC10L3QtdC90LjRjyDQtNC+0L/Rg9GB0YLQuNC80Ysg0YLQvtC70YzQutC+INCyINGA0LXQttC40LzQtSDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGUuZWRpdGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignbm90IGluIGVkaXRlIG1vZGUnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5zdGF0ZS5kb2NEYXRhO1xuXG4gICAgICAgICAgICBkYXRhW2lucHV0TmFtZV0gPSBpbnB1dFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRvY0RhdGE6IGRhdGEgfSk7XG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgbGV0IGRhdGEgPSBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5kYXRhO1xyXG4gICAgICAgICAgICAgZGF0YVtpbnB1dE5hbWVdID0gaW5wdXRWYWx1ZTtcclxuICAgICAgICAgICAgIC8vINC30LDQtNCw0YLRjCDQvdC+0LLQvtC1INC30L3QsNGH0LXQvdC40LUg0L/QvtC70Y9cclxuICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBkYXRhKTtcclxuICAgICAgICAgICAgICovXG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3ByZXBhaXJlVG9vbEJhclBhcmFtZXRlcnMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcHJlcGFpcmVUb29sQmFyUGFyYW1ldGVycyhpc0VkaXRNb2RlKSB7XG4gICAgICAgICAgICB2YXIgdG9vbGJhclBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBidG5BZGQ6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogIWlzRWRpdE1vZGUsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0VkaXRNb2RlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBidG5FZGl0OiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6ICFpc0VkaXRNb2RlLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogaXNFZGl0TW9kZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnRuUHJpbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJ0blNhdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogaXNFZGl0TW9kZSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIHRvb2xiYXJQYXJhbXM7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZUdyaWRCdG5DbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVHcmlkQnRuQ2xpY2soYnRuTmFtZSwgaWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoYnRuTmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FkZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUm93KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VkaXQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRSb3coKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGVSb3coKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2RlbGV0ZVJvdycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkZWxldGVSb3coKSB7XG4gICAgICAgICAgICAvLyDRg9C00LDQu9C40YIg0LDQutGC0LjQstC90YPRjiDRgdGC0YDQvtC60YNcbiAgICAgICAgICAgIHZhciBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXG4gICAgICAgICAgICAgICAgZ3JpZEFjdGl2ZVJvdyA9IHRoaXMucmVmc1snZGF0YS1ncmlkJ10uc3RhdGUuYWN0aXZlUm93LFxuICAgICAgICAgICAgICAgIGRvY0RhdGEgPSB0aGlzLnN0YXRlLmRvY0RhdGE7XG5cbiAgICAgICAgICAgIGdyaWREYXRhLnNwbGljZShncmlkQWN0aXZlUm93LCAxKTtcblxuICAgICAgICAgICAgLy8g0L/QtdGA0LXRgNCw0YHRh9C10YIg0LjRgtC+0LPQvtCyXG4gICAgICAgICAgICBkb2NEYXRhID0gdGhpcy5yZWNhbGNEb2NTdW1tYShkb2NEYXRhKTtcblxuICAgICAgICAgICAgLy8g0LjQt9C80LXQvdC40Lwg0YHQvtGB0YLQvtGP0L3QuNC1XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZ3JpZERhdGE6IGdyaWREYXRhLCBkb2NEYXRhOiBkb2NEYXRhIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdlZGl0Um93JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGVkaXRSb3coKSB7XG4gICAgICAgICAgICAvLyDQvtGC0LrRgNC+0LXRgiDQsNC60YLQuNCy0L3Rg9GOINGB0YLRgNC+0LrRgyDQtNC70Y8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xuICAgICAgICAgICAgdmFyIGdyaWREYXRhID0gdGhpcy5zdGF0ZS5ncmlkRGF0YSxcbiAgICAgICAgICAgICAgICBncmlkQWN0aXZlUm93ID0gdGhpcy5yZWZzWydkYXRhLWdyaWQnXS5zdGF0ZS5hY3RpdmVSb3csXG4gICAgICAgICAgICAgICAgZ3JpZFJvdyA9IGdyaWREYXRhW2dyaWRBY3RpdmVSb3ddO1xuXG4gICAgICAgICAgICAvLyDQvtGC0LrRgNC+0LXQvCDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L4g0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBncmlkUm93RWRpdDogdHJ1ZSwgZ3JpZFJvd0V2ZW50OiAnZWRpdCcsIGdyaWRSb3dEYXRhOiBncmlkUm93IH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdhZGRSb3cnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYWRkUm93KCkge1xuICAgICAgICAgICAgLy8g0LTQvtCx0LDQstC40YIg0LIg0YHQvtGB0YLQvtGP0L3QuNC1INC90L7QstGD0Y4g0YHRgtGA0L7QutGDXG5cbiAgICAgICAgICAgIHZhciBncmlkQ29sdW1ucyA9IHRoaXMuc3RhdGUuZ3JpZENvbmZpZyxcbiAgICAgICAgICAgICAgICBncmlkRGF0YSA9IHRoaXMuc3RhdGUuZ3JpZERhdGEsXG4gICAgICAgICAgICAgICAgbmV3Um93ID0gbmV3IE9iamVjdCgpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyaWRDb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gZ3JpZENvbHVtbnNbaV0uaWQ7XG4gICAgICAgICAgICAgICAgbmV3Um93W2ZpZWxkXSA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXdSb3cuaWQgPSAnTkVXJyArIE1hdGgucmFuZG9tKCk7IC8vINCz0LXQvdC10YDQuNC8INC90L7QstC+0LUg0LjQtFxuXG4gICAgICAgICAgICAvLyDQvtGC0LrRgNC+0LXQvCDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L4g0LTQu9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBncmlkUm93RWRpdDogdHJ1ZSwgZ3JpZFJvd0V2ZW50OiAnYWRkJywgZ3JpZFJvd0RhdGE6IG5ld1JvdyB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY3JlYXRlR3JpZFJvdycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVHcmlkUm93KCkge1xuICAgICAgICAgICAgdmFyIHN0eWxlID0gc3R5bGVzLmdyaWRSb3csXG4gICAgICAgICAgICAgICAgcm93ID0gdGhpcy5zdGF0ZS5ncmlkUm93RGF0YSxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZU1lc3NhZ2UgPSAnJyxcbiAgICAgICAgICAgICAgICBtb2RhbE9iamVjdHMgPSBbJ2J0bk9rJywgJ2J0bkNhbmNlbCddLFxuICAgICAgICAgICAgICAgIGJ1dHRvbk9rUmVhZE9ubHkgPSB2YWxpZGF0ZU1lc3NhZ2UubGVuZ3RoID4gMCB8fCAhdGhpcy5zdGF0ZS5jaGVja2VkO1xuXG4gICAgICAgICAgICBpZiAoYnV0dG9uT2tSZWFkT25seSkge1xuICAgICAgICAgICAgICAgIC8vINGD0LHQtdGA0LXQvCDQutC90L7Qv9C60YMg0J7QulxuICAgICAgICAgICAgICAgIG1vZGFsT2JqZWN0cy5zcGxpY2UoMCwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghcm93KSByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCk7XG5cbiAgICAgICAgICAgIHZhciBub21EYXRhID0gdGhpcy5zdGF0ZS5saWJzWydub21lbmNsYXR1cmUnXS5maWx0ZXIoZnVuY3Rpb24gKGxpYikge1xuICAgICAgICAgICAgICAgIGlmICghbGliLmRvayB8fCBsaWIuZG9rID09PSBMSUJET0spIHJldHVybiBsaWI7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICcubW9kYWxQYWdlJyB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIE1vZGFsUGFnZSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxPYmplY3RzOiBtb2RhbE9iamVjdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdtb2RhbHBhZ2UtZ3JpZC1yb3cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUNsaWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogJ1JlYSBsaXNhbWluZSAvIHBhcmFuZGFtaW5lJyB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJlZjogJ2dyaWQtcm93LWNvbnRhaW5lcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmRvY1JvdyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7IHRpdGxlOiAnVGVlbnVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ25vbWlkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliczogJ25vbWVuY2xhdHVyZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG5vbURhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5ub21pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiByb3cua29vZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAnbm9taWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1RlZW51c2Uga29vZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUdyaWRSb3dDaGFuZ2UgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5kb2NSb3cgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7IHRpdGxlOiAnS29ndXMgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2tvZ3VzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5rb2d1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAna29ndXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1jMicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUdyaWRSb3dJbnB1dCB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmRvY1JvdyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHsgdGl0bGU6ICdIaW5kICcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdoaW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJvdy5oaW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdoaW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktYzInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVHcmlkUm93SW5wdXQgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5kb2NSb3cgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7IHRpdGxlOiAnS2JtLXRhOiAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAna2JtdGEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LmtibXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdrYm10YScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLWMyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlR3JpZFJvd0NoYW5nZSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmRvY1JvdyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHsgdGl0bGU6ICdLYm06ICcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdrYm0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LmtibSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAna2JtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktYzInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlR3JpZFJvd0lucHV0IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMuZG9jUm93IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwgeyB0aXRsZTogJ1N1bW1hOiAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnU3VtbWEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93LnN1bW1hLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdzdW1tYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLWMyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlR3JpZFJvd0lucHV0IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlR3JpZFJvd0NoYW5nZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVHcmlkUm93Q2hhbmdlKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INC40LfQvNC10L3QtdC90LjRjyDQtNCw0L3QvdGL0YUg0L3QsCDRhNC+0YDQvNC1XG4gICAgICAgICAgICB2YXIgcm93RGF0YSA9IE9iamVjdCh7fSwgdGhpcy5zdGF0ZS5ncmlkUm93RGF0YSk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gcm93RGF0YVtuYW1lXSAmJiBuYW1lID09PSAnbm9taWQnKSB7XG4gICAgICAgICAgICAgICAgLy8g0L/RgNC+0LjQt9C+0YjQu9C+INC40LfQvNC10L3QtdC90LjQtSDRg9GB0LvRg9Cz0LgsINC+0LHQvdGD0LvQuNC8INC30L3QsNGH0LXQvdC40Y9cbiAgICAgICAgICAgICAgICByb3dEYXRhWydrb2d1cyddID0gMDtcbiAgICAgICAgICAgICAgICByb3dEYXRhWydoaW5kJ10gPSAwO1xuICAgICAgICAgICAgICAgIHJvd0RhdGFbJ3N1bW1hJ10gPSAwO1xuICAgICAgICAgICAgICAgIHJvd0RhdGFbJ2tibSddID0gMDtcbiAgICAgICAgICAgICAgICByb3dEYXRhWydrYm10YSddID0gMDtcbiAgICAgICAgICAgICAgICByb3dEYXRhWydub21pZCddID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDQuNGJ0LXQvCDQv9C+INGB0L/RgNCw0LLQvtGH0L3QuNC60YMg0L/QvtC70Y8g0LrQvtC0INC4INC90LDQuNC80LXQvdC+0LLQsNC90LjQtVxuXG4gICAgICAgICAgICB2YXIgbGliRGF0YSA9IHRoaXMuc3RhdGUubGlic1snbm9tZW5jbGF0dXJlJ107XG4gICAgICAgICAgICBsaWJEYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93RGF0YVsna29vZCddID0gcm93Lmtvb2Q7XG4gICAgICAgICAgICAgICAgICAgIHJvd0RhdGFbJ25pbWV0dXMnXSA9IHJvdy5uYW1lO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJvd0RhdGFbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBncmlkUm93RGF0YTogcm93RGF0YSB9KTtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVHcmlkUm93KCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZUdyaWRSb3dJbnB1dCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVHcmlkUm93SW5wdXQobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vINC/0LXRgNC10YHRh9C10YIg0YHRg9C80LxcbiAgICAgICAgICAgIHZhciByb3dEYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZS5ncmlkUm93RGF0YSk7XG4gICAgICAgICAgICByb3dEYXRhW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICByb3dEYXRhID0gdGhpcy5yZWNhbGNSb3dTdW1tKHJvd0RhdGEpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGdyaWRSb3dEYXRhOiByb3dEYXRhIH0pO1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUdyaWRSb3coKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVjYWxjUm93U3VtbScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWNhbGNSb3dTdW1tKGdyaWRSb3dEYXRhKSB7XG4gICAgICAgICAgICAvLyDQv9C10YDQtdGA0LDRgdGH0LXRgiDRgdGD0LzQvNGLINGB0YLRgNC+0LrQuCDQuCDRgNCw0YHRh9C10YIg0L3QsNC70L7Qs9CwXG4gICAgICAgICAgICBncmlkUm93RGF0YVsna29ndXMnXSA9IE51bWJlcihncmlkUm93RGF0YS5rb2d1cyk7XG4gICAgICAgICAgICBncmlkUm93RGF0YVsnaGluZCddID0gTnVtYmVyKGdyaWRSb3dEYXRhLmhpbmQpO1xuICAgICAgICAgICAgZ3JpZFJvd0RhdGFbJ2tibXRhJ10gPSBOdW1iZXIoZ3JpZFJvd0RhdGFbJ2tvZ3VzJ10pICogTnVtYmVyKGdyaWRSb3dEYXRhWydoaW5kJ10pO1xuICAgICAgICAgICAgZ3JpZFJvd0RhdGFbJ2tibSddID0gTnVtYmVyKGdyaWRSb3dEYXRhWydrYm10YSddICogMC4yMCk7IC8vIEB0b2RvINCy0YDQvNC10L3QvdC+XG4gICAgICAgICAgICBncmlkUm93RGF0YVsnc3VtbWEnXSA9IE51bWJlcihncmlkUm93RGF0YVsna2JtdGEnXSkgKyBOdW1iZXIoZ3JpZFJvd0RhdGFbJ2tibSddKTtcblxuICAgICAgICAgICAgcmV0dXJuIGdyaWRSb3dEYXRhO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZWNhbGNEb2NTdW1tYScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWNhbGNEb2NTdW1tYShkb2NEYXRhKSB7XG4gICAgICAgICAgICB2YXIgZ3JpZERhdGEgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLnN0YXRlLmdyaWREYXRhKTtcblxuICAgICAgICAgICAgZG9jRGF0YVsnc3VtbWEnXSA9IDA7XG4gICAgICAgICAgICBkb2NEYXRhWydrYm0nXSA9IDA7XG4gICAgICAgICAgICBncmlkRGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICAgICAgICBkb2NEYXRhWydzdW1tYSddICs9IE51bWJlcihyb3dbJ3N1bW1hJ10pO1xuICAgICAgICAgICAgICAgIGRvY0RhdGFbJ2tibSddICs9IE51bWJlcihyb3dbJ2tibSddKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRvY0RhdGE7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3ZhbGlkYXRlR3JpZFJvdycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiB2YWxpZGF0ZUdyaWRSb3coKSB7XG4gICAgICAgICAgICAvLyB3aWxsIGNoZWNrIHZhbHVlcyBvbiB0aGUgZm9ybSBhbmQgcmV0dXJuIHN0cmluZyB3aXRoIHdhcm5pbmdcbiAgICAgICAgICAgIHZhciB3YXJuaW5nID0gJycsXG4gICAgICAgICAgICAgICAgZ3JpZFJvd0RhdGEgPSB0aGlzLnN0YXRlLmdyaWRSb3dEYXRhO1xuICAgICAgICAgICAgLy8g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0L/RgNC+0LLQtdGA0LrQuCDRhNC+0YDQvNGLINC90LAg0LLQsNC70LjQtNC90L7RgdGC0YxcbiAgICAgICAgICAgIGlmICghZ3JpZFJvd0RhdGFbJ25vbWlkJ10pIHdhcm5pbmcgPSB3YXJuaW5nICsgJyDQutC+0LQg0YPRgdC70YPQs9C4JztcbiAgICAgICAgICAgIGlmICghZ3JpZFJvd0RhdGFbJ2tvZ3VzJ10pIHdhcm5pbmcgPSB3YXJuaW5nICsgJyDQutC+0Lst0LLQvic7XG4gICAgICAgICAgICBpZiAoIWdyaWRSb3dEYXRhWydoaW5kJ10pIHdhcm5pbmcgPSB3YXJuaW5nICsgJyDRhtC10L3QsCc7XG5cbiAgICAgICAgICAgIGlmICh3YXJuaW5nLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAvLyDQtdGB0YLRjCDQv9GA0L7QsdC70LXQvNGLXG4gICAgICAgICAgICAgICAgd2FybmluZyA9ICfQntGC0YHRg9GC0YHQstGD0Y7RgiDQtNCw0L3QvdGL0LU6JyArIHdhcm5pbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY2hlY2tlZDogdHJ1ZSwgd2FybmluZzogd2FybmluZyB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY3JlYXRlTGlicycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVMaWJzKCkge1xuICAgICAgICAgICAgLy8g0LLQtdGA0L3QtdGCINC+0LHRitC10LrRgiDQsdC40LHQu9C40L7RgtC10Log0LTQvtC60YPQvNC10L3RgtCwXG4gICAgICAgICAgICB2YXIgbGlicyA9IHt9O1xuICAgICAgICAgICAgTElCUkFSSUVTLmZvckVhY2goZnVuY3Rpb24gKGxpYikge1xuICAgICAgICAgICAgICAgIGxpYnNbbGliXSA9IFtdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbGlicztcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBBcnZlO1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuQXJ2ZS5wcm9wVHlwZXMgPSB7XG4gICAgZGF0YTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGJwbTogUHJvcFR5cGVzLmFycmF5LFxuICAgIGVkaXRlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd01lc3NhZ2VCb3g6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZ3JpZERhdGE6IFByb3BUeXBlcy5hcnJheSxcbiAgICByZWxhdGlvbnM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBncmlkQ29uZmlnOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZ3JpZFJvd0VkaXQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGdyaWRSb3dFdmVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBncmlkUm93RGF0YTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBsaWJzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHdhcm5pbmc6IFByb3BUeXBlcy5zdHJpbmdcblxuICAgIC8qXHJcbiAgICAgQXJ2ZS5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgIHNob3c6IHRydWVcclxuICAgICB9O1xyXG4gICAgICovXG5cbn07bW9kdWxlLmV4cG9ydHMgPSBBcnZlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy9hcnZlL2FydmUuanN4XG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkb2NSb3c6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsdWUnXG4gICAgfSxcbiAgICBkb2NDb2x1bW46IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHllbGxvdycsXG4gICAgICAgIHdpZHRoOiAnNTAlJ1xuICAgIH0sXG4gICAgZG9jOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBicm93bidcbiAgICB9LFxuICAgIGdyaWRSb3c6IHtcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnLFxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgbWFyZ2luOiAnMTAlIDMwJSAxMCUgMzAlJyxcbiAgICAgICAgd2lkdGg6ICdhdXRvJyxcbiAgICAgICAgb3BhY2l0eTogJzEnLFxuICAgICAgICB0b3A6ICcxMDBweCdcbiAgICB9XG5cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2NzL2FydmUvYXJ2ZS5zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDEyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9jVHlwZUlkKSB7XG4gICAgLy8g0LLQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+0YIg0YLQuNC/0LAg0LTQvtC60YPQvNC10L3RgtCwINCy0LXRgNC90LXRgiDQutC+0LzQv9C+0L3QtdC90YIg0LTQvtC60YPQvNC10L3RgtCwXG5cbiAgICBjb25zb2xlLmxvZygncmV0dXJuRG9jQ29tcG9uZW50OicgKyBkb2NUeXBlSWQpO1xuICAgIHZhciBjb21wb25lbnQgPSB7fTtcblxuICAgIHN3aXRjaCAoZG9jVHlwZUlkKSB7XG4gICAgICAgIGNhc2UgJ1BBTEsnOlxuICAgICAgICAgICAgY29tcG9uZW50ID0gcmVxdWlyZSgnLi4vZnJvbnRlbmQvZG9jcy9wYWxrX29wZXIuanN4Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLmpzeCcpO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL21pZGRsZXdhcmUvcmV0dXJuRG9jQ29tcG9uZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEZvcm0gPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2Zvcm0uanMnKTtcbnZhciBQYWdlTGFiZWwgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3BhZ2VfbGFiZWwnKTtcblxudmFyIHBhZ2VzID0gWydQYWdlMScsICdQYWdlMiddO1xuXG52YXIgUGFsayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ1BhbGsnLFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgRm9ybSxcbiAgICAgICAgICAgIHsgcGFnZXM6IHBhZ2VzIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICcgUGFsayAnXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfSB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYWxrO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy9wYWxrX29wZXIuanN4XG4vLyBtb2R1bGUgaWQgPSAxMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbnZhciBQYWdlTGFiZWwgPSByZXF1aXJlKCcuL3BhZ2VfbGFiZWwnKTtcblxudmFyIEZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdGb3JtJyxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICB2YXIgcGFnZXMgPSBbeyBwYWdlTmFtZTogJ1BhZ2UnIH1dO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5wYWdlcykge1xuICAgICAgICAgICAgcGFnZXMgPSB0aGlzLnByb3BzLnBhZ2VzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYWdlczogdGhpcy5wcm9wcy5wYWdlc1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHBhZ2VzID0gdGhpcy5zdGF0ZS5wYWdlcztcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgY2xhc3NOYW1lOiAnY29udGFpbmVyJyB9LCBwYWdlcy5tYXAoZnVuY3Rpb24gKHBhZ2UsIGlkeCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGFnZUxhYmVsLCB7IGtleTogaWR4LCBwYWdlSWR4OiBpZHggfSwgcGFnZSk7XG4gICAgICAgIH0pLCBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGNsYXNzTmFtZTogJ3BhZ2UnIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nLCBudWxsLCB0aGlzLnByb3BzLmNoaWxkcmVuKSkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2Zvcm0uanNcbi8vIG1vZHVsZSBpZCA9IDEzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIFBhZ2VMYWJlbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ1BhZ2VMYWJlbCcsXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vICAgICAgY29uc29sZS5sb2coJ3BhZ2UgbGFiZWwgY29tcG9uZW50V2lsbE1vdW50JylcbiAgICAgICAgZmx1eC5zdG9yZXMuZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoeyBkaXNhYmxlZDogbmV3VmFsdWUgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBoYW5kbGVDbGljazogZnVuY3Rpb24gaGFuZGxlQ2xpY2socGFnZSkge1xuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINGB0L7QsdGL0YLQuNC1INC60LvQuNC6LCDQv9C+0LTQs9GA0YPQttCw0LXQvCDRgdCy0Y/Qt9Cw0L3QvdGL0Lkg0LTQvtC60YPQvNC10L3RglxuICAgICAgICAvLyAgICAgICBhbGVydCgnY2xpY2s6JyArIHBhZ2VOYW1lKTtcbiAgICAgICAgLy8gZG9jVHlwZUlkOiBkb2MuZG9jX3R5cGUsIGRvY0lkOmRvYy5pZCwgcGFnZU5hbWU6J0xhdXNlbmQgaWQ6JyArIGRvYy5pZFxuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGFnZSBkaXNhYmxlZCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhZ2UuZG9jSWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoYW5kbGVDbGljayBwYWdlLmRvY1R5cGVJZCAlcywgcGFnZS5kb2NJZCAlbicpO1xuICAgICAgICAgICAgdmFyIHVybCA9IFwiL2RvY3VtZW50L1wiICsgcGFnZS5kb2NUeXBlSWQgKyBwYWdlLmRvY0lkO1xuICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdwYWdlTGFiZWwnO1xuXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdsYWJlbCcsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCB0aGlzLnByb3BzLmNoaWxkcmVuKSwgZGlzYWJsZWQ6IHRoaXMuc3RhdGUuZGlzYWJsZWQgfSwgdGhpcy5wcm9wcy5jaGlsZHJlbi5wYWdlTmFtZSwgJyAnKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlTGFiZWw7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3BhZ2VfbGFiZWwuanNcbi8vIG1vZHVsZSBpZCA9IDEzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==
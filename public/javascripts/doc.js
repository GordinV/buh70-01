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
	    DocToolBar = __webpack_require__(118),
	    validateForm = __webpack_require__(125),
	    ModalPage = __webpack_require__(126),
	    styles = __webpack_require__(128);

	var LIBDOK = 'ARV',
	    LIBRARIES = ['asutused', 'kontod', 'dokProps', 'users', 'aa', 'tunnus', 'project', 'nomenclature'];

	// Create a store
	var docStore = __webpack_require__(129);

	var now = new Date();

	var Arve = function (_React$PureComponent) {
	    _inherits(Arve, _React$PureComponent);

	    function Arve(props) {
	        _classCallCheck(this, Arve);

	        var _this = _possibleConstructorReturn(this, (Arve.__proto__ || Object.getPrototypeOf(Arve)).call(this, props));

	        _this.state = {
	            edited: _this.props.data.row.id == 0,
	            showMessageBox: 'none',
	            relations: _this.props.data.relations,
	            gridRowEdit: false,
	            gridRowEvent: null,
	            checked: false,
	            warning: ''
	        };

	        _this.docData = _this.props.data.row;
	        _this.gridData = _this.props.data.details;
	        _this.gridConfig = _this.props.data.gridConfig;
	        _this.gridRowData = null;
	        _this.libs = _this.createLibs();

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
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            // пишем исходные данные в хранилище, регистрируем обработчики событий
	            var self = this,
	                data = Object.assign({}, self.props.data.row),
	                details = Object.assign([], self.props.data.details),
	                gridConfig = self.props.data.gridConfig;

	            // сохраняем данные в хранилище
	            flux.doAction('dataChange', data);
	            flux.doAction('docIdChange', data.id);
	            flux.doAction('detailsChange', details); // данные грида
	            flux.doAction('gridConfigChange', gridConfig); // данные грида

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
	                if (newValue !== previousValue) {
	                    self.setState({ edited: newValue });
	                }
	            });

	            docStore.on('change:libs', function (newValue) {
	                var isChanged = false,
	                    libsData = _this2.libs;

	                if (newValue.length > 0) {

	                    newValue.forEach(function (lib) {
	                        if (lib.id === 'dokProps') {
	                            // оставим только данные этого документа

	                        }
	                        if (_this2.libs[lib.id] && lib.data.length > 0) {
	                            libsData[lib.id] = lib.data;
	                            isChanged = true;
	                        }
	                    });
	                }

	                if (isChanged) {
	                    _this2.libs = libsData;
	                    _this2.forceUpdate();
	                }
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            // формируем зависимости
	            relatedDocuments(this);

	            var isEditMode = this.state.edited,
	                validationMessage = this.validation();

	            var btnParams = {
	                btnStart: {
	                    show: true
	                }
	            };

	            return React.createElement(
	                'div',
	                null,
	                MenuToolBar(btnParams, this.props.userData),
	                React.createElement(
	                    Form,
	                    { pages: this.pages,
	                        ref: 'form',
	                        handlePageClick: this.handlePageClick,
	                        disabled: isEditMode },
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
	                            React.createElement(DocToolBar, { bpm: this.props.bpm,
	                                ref: 'doc-toolbar',
	                                edited: isEditMode,
	                                docStatus: this.docData.doc_status,
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
	                                data: this.docData,
	                                readOnly: !isEditMode })
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
	                                    value: this.docData.number,
	                                    readOnly: !isEditMode,
	                                    onChange: this.handleInputChange }),
	                                React.createElement(InputDate, { title: 'Kuup\xE4ev ',
	                                    name: 'kpv', value: this.docData.kpv,
	                                    ref: 'input-kpv',
	                                    readOnly: !isEditMode,
	                                    onChange: this.handleInputChange }),
	                                React.createElement(InputDate, { title: 'T\xE4htaeg ',
	                                    name: 'tahtaeg',
	                                    value: this.docData.tahtaeg,
	                                    ref: 'input-tahtaeg',
	                                    readOnly: !isEditMode,
	                                    onChange: this.handleInputChange }),
	                                React.createElement(Select, { title: 'Asutus',
	                                    name: 'asutusid',
	                                    libs: 'asutused',
	                                    data: this.libs['asutused'],
	                                    value: this.docData.asutusid,
	                                    defaultValue: this.docData.asutus,
	                                    ref: 'select-asutusid',
	                                    btnDelete: isEditMode,
	                                    onChange: this.handleInputChange,
	                                    readOnly: !isEditMode }),
	                                React.createElement(InputText, { title: 'Lisa ',
	                                    name: 'lisa',
	                                    value: this.docData.lisa,
	                                    ref: 'input-lisa',
	                                    readOnly: !isEditMode,
	                                    onChange: this.handleInputChange })
	                            ),
	                            React.createElement(
	                                'div',
	                                { style: styles.docColumn },
	                                React.createElement(DokProp, { title: 'Konteerimine: ',
	                                    name: 'doklausid',
	                                    libs: 'dokProps',
	                                    value: this.docData.doklausid,
	                                    defaultValue: this.docData.dokprop,
	                                    ref: 'dokprop-doklausid',
	                                    readOnly: !isEditMode })
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { style: styles.docRow },
	                            React.createElement(TextArea, { title: 'M\xE4rkused',
	                                name: 'muud',
	                                ref: 'textarea-muud',
	                                onChange: this.handleInputChange,
	                                value: this.docData.muud || '',
	                                readOnly: !isEditMode })
	                        ),
	                        isEditMode ? React.createElement(
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
	                                gridData: this.gridData,
	                                gridColumns: this.gridConfig,
	                                handleGridRow: this.handleGridRow,
	                                readOnly: !isEditMode,
	                                ref: 'data-grid' })
	                        ),
	                        React.createElement(
	                            'div',
	                            { style: styles.docRow },
	                            React.createElement(InputText, { title: 'Summa ',
	                                name: 'summa',
	                                ref: 'input-summa',
	                                value: this.docData.summa,
	                                disabled: true,
	                                onChange: this.handleInputChange,
	                                pattern: '^[0-9]+(\\.[0-9]{1,4})?$' }),
	                            React.createElement(InputText, { title: 'K\xE4ibemaks ',
	                                name: 'kbm',
	                                ref: 'input-kbm',
	                                disabled: true,
	                                value: this.docData.kbm,
	                                onChange: this.handleInputChange,
	                                pattern: '^[0-9]+(\\.[0-9]{1,4})?$' })
	                        ),
	                        this.state.gridRowEdit ? this.createGridRow() : null
	                    )
	                )
	            );
	        }

	        /**
	         * валидация формы
	         */

	    }, {
	        key: 'validation',
	        value: function validation() {
	            if (!this.state.edited) return '';

	            var requiredFields = this.requiredFields;
	            return __webpack_require__(125)(this, requiredFields);
	        }

	        /**
	         * отработаем Ok из модального окна
	         * @param btnEvent
	         */

	    }, {
	        key: 'modalPageClick',
	        value: function modalPageClick(btnEvent) {
	            var _this3 = this;

	            if (btnEvent == 'Ok') {

	                // ищем по ид строку в данных грида, если нет, то добавим строку
	                if (!this.gridData.some(function (row) {
	                    if (row.id === _this3.gridRowData.id) return true;
	                })) {
	                    // вставка новой строки
	                    this.gridData.splice(0, 0, this.gridRowData);
	                } else {
	                    this.gridData = this.gridData.map(function (row) {
	                        if (row.id === _this3.gridRowData.id) {
	                            // нашли, замещаем
	                            return _this3.gridRowData;
	                        } else {
	                            return row;
	                        }
	                    });
	                }
	            }

	            this.recalcDocSumma();
	            this.setState({ gridRowEdit: false });
	        }

	        /**
	         * Обработчик события клик по вкладке
	         * @param page
	         */

	    }, {
	        key: 'handlePageClick',
	        value: function handlePageClick(page) {
	            if (page.docId) {
	                document.location.href = "/document/" + page.docTypeId + page.docId;
	            }
	        }

	        /**
	         * метод вызывается при выборе задачи
	         * @param e
	         */

	    }, {
	        key: 'handleSelectTask',
	        value: function handleSelectTask(e) {
	            return e.target.value;
	        }

	        /**
	         *  toolbar event handler
	         * @param event
	         */

	    }, {
	        key: 'handleToolbarEvents',
	        value: function handleToolbarEvents(event) {
	            switch (event) {
	                case 'CANCEL':
	                    this.docData = JSON.parse(flux.stores.docStore.backup.docData); // восстановим данные
	                    this.gridData = JSON.parse(flux.stores.docStore.backup.gridData);

	                    if (this.state.warning !== '') {
	                        this.setState({ warning: '' });
	                    } else {
	                        this.forceUpdate();
	                    }
	                    break;
	                default:
	                    console.error('handleToolbarEvents, no event handler for ', event);
	            }
	        }

	        /**
	         * Обработчик изменений инпутов
	         * @param inputName
	         * @param inputValue
	         * @returns {boolean}
	         */

	    }, {
	        key: 'handleInputChange',
	        value: function handleInputChange(inputName, inputValue) {

	            // изменения допустимы только в режиме редактирования
	            if (!this.state.edited) {
	                console.error('not in edite mode');
	                return false;
	            }

	            this.docData[inputName] = inputValue;
	            this.forceUpdate();
	        }

	        /**
	         * Подготовка параметров для панели инструментов
	         * @param isEditMode
	         * @returns {{btnAdd: {show: boolean, disabled: *}, btnEdit: {show: boolean, disabled: *}, btnPrint: {show: boolean, disabled: boolean}, btnSave: {show: *, disabled: boolean}}}
	         */

	    }, {
	        key: 'prepaireToolBarParameters',
	        value: function prepaireToolBarParameters(isEditMode) {
	            return {
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
	        }

	        /**
	         * обработчик для событий клик панели инструментов грида
	         * @param btnName
	         */

	    }, {
	        key: 'handleGridBtnClick',
	        value: function handleGridBtnClick(btnName) {
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

	        /**
	         * удалит активную строку
	         */

	    }, {
	        key: 'deleteRow',
	        value: function deleteRow() {
	            var gridActiveRow = this.refs['data-grid'].state.activeRow;

	            this.gridData.splice(gridActiveRow, 1);

	            // перерасчет итогов
	            this.recalcDocSumma();

	            // изменим состояние
	            this.forceUpdate();
	        }

	        /**
	         * откроет активную строку для редактирования
	         */

	    }, {
	        key: 'editRow',
	        value: function editRow() {
	            this.gridRowData = this.gridData[this.refs['data-grid'].state.activeRow];

	            // откроем модальное окно для редактирования
	            this.setState({ gridRowEdit: true, gridRowEvent: 'edit' });
	        }

	        /**
	         * добавит в состояние новую строку
	         */

	    }, {
	        key: 'addRow',
	        value: function addRow() {
	            var newRow = {};

	            for (var i = 0; i < this.gridConfig.length; i++) {
	                var field = this.gridConfig[i].id;
	                newRow[field] = '';
	            }

	            newRow.id = 'NEW' + Math.random(); // генерим новое ид

	            this.gridRowData = newRow;
	            // откроем модальное окно для редактирования
	            this.setState({ gridRowEdit: true, gridRowEvent: 'add' });
	        }

	        /**
	         * Создаст компонет строки грида
	         * @returns {XML}
	         */

	    }, {
	        key: 'createGridRow',
	        value: function createGridRow() {
	            var validateMessage = '',
	                modalObjects = ['btnOk', 'btnCancel'],
	                buttonOkReadOnly = validateMessage.length > 0 || !this.state.checked;

	            if (buttonOkReadOnly) {
	                // уберем кнопку Ок
	                modalObjects.splice(0, 1);
	            }

	            if (!this.gridRowData) return React.createElement('div', null);

	            var nomData = this.libs['nomenclature'].filter(function (lib) {
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
	                                value: this.gridRowData.nomid,
	                                defaultValue: this.gridRowData.kood,
	                                ref: 'nomid',
	                                placeholder: 'Teenuse kood',
	                                onChange: this.handleGridRowChange })
	                        ),
	                        React.createElement(
	                            'div',
	                            { style: styles.docRow },
	                            React.createElement(InputNumber, { title: 'Kogus ',
	                                name: 'kogus',
	                                value: Number(this.gridRowData.kogus),
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
	                                value: Number(this.gridRowData.hind),
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
	                                value: Number(this.gridRowData.kbmta),
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
	                                value: Number(this.gridRowData.kbm),
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
	                                value: Number(this.gridRowData.summa),
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

	        /**
	         * отслеживаем изменения данных на форм
	         * @param name
	         * @param value
	         */

	    }, {
	        key: 'handleGridRowChange',
	        value: function handleGridRowChange(name, value) {
	            var _this4 = this;

	            if (value !== this.gridRowData[name] && name === 'nomid') {
	                // произошло изменение услуги, обнулим значения
	                this.gridRowData['kogus'] = 0;
	                this.gridRowData['hind'] = 0;
	                this.gridRowData['summa'] = 0;
	                this.gridRowData['kbm'] = 0;
	                this.gridRowData['kbmta'] = 0;
	                this.gridRowData['nomid'] = value;
	            }
	            // ищем по справочнику поля код и наименование

	            var libData = this.libs['nomenclature'];
	            libData.forEach(function (row) {
	                if (row.id == value) {
	                    _this4.gridRowData['kood'] = row.kood;
	                    _this4.gridRowData['nimetus'] = row.name;
	                }
	            });

	            this.gridRowData[name] = value;
	            //        this.forceUpdate();
	            this.validateGridRow();
	        }

	        /**
	         * Обработчик для строки грида
	         * @param name
	         * @param value
	         */

	    }, {
	        key: 'handleGridRowInput',
	        value: function handleGridRowInput(name, value) {
	            this.gridRowData[name] = value;

	            // пересчет сумм
	            this.recalcRowSumm();
	            //        this.forceUpdate();
	            this.validateGridRow();
	        }

	        /**
	         * перерасчет суммы строки и расчет налога
	         */

	    }, {
	        key: 'recalcRowSumm',
	        value: function recalcRowSumm() {
	            this.gridRowData['kogus'] = Number(this.gridRowData.kogus);
	            this.gridRowData['hind'] = Number(this.gridRowData.hind);
	            this.gridRowData['kbmta'] = Number(this.gridRowData['kogus']) * Number(this.gridRowData['hind']);
	            this.gridRowData['kbm'] = Number(this.gridRowData['kbmta'] * 0.20); // @todo врменно
	            this.gridRowData['summa'] = Number(this.gridRowData['kbmta']) + Number(this.gridRowData['kbm']);
	        }

	        /**
	         * Перерасчет итоговых сумм документа
	         */

	    }, {
	        key: 'recalcDocSumma',
	        value: function recalcDocSumma() {
	            var _this5 = this;

	            this.docData['summa'] = 0;
	            this.docData['kbm'] = 0;
	            this.gridData.forEach(function (row) {
	                _this5.docData['summa'] += Number(row['summa']);
	                _this5.docData['kbm'] += Number(row['kbm']);
	            });
	        }

	        /**
	         * will check values on the form and return string with warning
	         */

	    }, {
	        key: 'validateGridRow',
	        value: function validateGridRow() {
	            var warning = '';

	            // только после проверки формы на валидность
	            if (!this.gridRowData['nomid']) warning = warning + ' код услуги';
	            if (!this.gridRowData['kogus']) warning = warning + ' кол-во';
	            if (!this.gridRowData['hind']) warning = warning + ' цена';

	            if (warning.length > 2) {
	                // есть проблемы
	                warning = 'Отсутсвуют данные:' + warning;
	            }
	            this.setState({ checked: true, warning: warning });
	        }

	        /**
	         * вернет объект библиотек документа
	         * @returns {{}}
	         */

	    }, {
	        key: 'createLibs',
	        value: function createLibs() {
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

	};

	/*
	 Arve.defaultProps = {
	 disabled: false,
	 show: true
	 };
	 */

	module.exports = Arve;

/***/ }),

/***/ 128:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLmpzeD81MjJiIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLnN0eWxlcy5qcz8zYTcwIiwid2VicGFjazovLy8uL21pZGRsZXdhcmUvcmV0dXJuRG9jQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MvcGFsa19vcGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9wYWdlX2xhYmVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbi8vINC00LDQvdC90YvQtSDQtNC70Y8g0YXRgNCw0L3QuNC70LjRidCwXG5sb2NhbFN0b3JhZ2VbJ2RvY1N0b3JlJ10gPSBzdG9yZURhdGE7XG5zdG9yZURhdGEgPSBKU09OLnBhcnNlKHN0b3JlRGF0YSk7XG51c2VyRGF0YSA9IEpTT04ucGFyc2UodXNlckRhdGEpO1xuXG4vLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSDQtNCw0L3QvdGFXG5cblxuLy8g0LfQsNC/0YDQvtGB0LjQvCDQutC+0LzQv9C+0L3QtdC90YIg0LTQvtC60YPQvNC10L3RgtCwINC/0L4g0LXQs9C+INGC0LjQv9GDXG52YXIgRG9jID0gcmVxdWlyZSgnLi4vbWlkZGxld2FyZS9yZXR1cm5Eb2NDb21wb25lbnQnKShzdG9yZURhdGEuZG9jVHlwZUlkKTtcblxuUmVhY3RET00uaHlkcmF0ZShSZWFjdC5jcmVhdGVFbGVtZW50KERvYywgeyBkYXRhOiBzdG9yZURhdGEuZGF0YSwgYnBtOiBzdG9yZURhdGEuYnBtLCB1c2VyRGF0YTogdXNlckRhdGEgfSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb2MnKSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2MuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIEZvcm0gPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Zvcm0vZm9ybS5qc3gnKSxcbiAgICBJbnB1dFRleHQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2lucHV0LXRleHQvaW5wdXQtdGV4dC5qc3gnKSxcbiAgICBJbnB1dERhdGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2lucHV0LWRhdGUvaW5wdXQtZGF0ZS5qc3gnKSxcbiAgICBJbnB1dE51bWJlciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvaW5wdXQtbnVtYmVyL2lucHV0LW51bWJlci5qc3gnKSxcbiAgICBEb2NDb21tb24gPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RvYy1jb21tb24vZG9jLWNvbW1vbi5qc3gnKSxcbiAgICBTZWxlY3QgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9zZWxlY3QuanN4JyksXG5cbi8vICAgIFNlbGVjdERhdGEgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3NlbGVjdC1kYXRhL3NlbGVjdC1kYXRhLmpzeCcpLFxuVGV4dEFyZWEgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3RleHQtYXJlYS90ZXh0LWFyZWEuanN4JyksXG4gICAgRGF0YUdyaWQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RhdGEtZ3JpZC9kYXRhLWdyaWQuanN4JyksXG4gICAgR3JpZEJ1dHRvbkFkZCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1hZGQvYnV0dG9uLXJlZ2lzdGVyLWFkZC5qc3gnKSxcbiAgICBHcmlkQnV0dG9uRWRpdCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeCcpLFxuICAgIEdyaWRCdXR0b25EZWxldGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZGVsZXRlL2J1dHRvbi1yZWdpc3Rlci1kZWxldGUuanN4JyksXG4gICAgRG9rUHJvcCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZG9jcHJvcC9kb2Nwcm9wLmpzeCcpLFxuICAgIHJlbGF0ZWREb2N1bWVudHMgPSByZXF1aXJlKCcuLi8uLi9taXhpbi9yZWxhdGVkRG9jdW1lbnRzLmpzeCcpLFxuICAgIFRvb2xiYXJDb250YWluZXIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci1jb250YWluZXIvdG9vbGJhci1jb250YWluZXIuanN4JyksXG4gICAgTWVudVRvb2xCYXIgPSByZXF1aXJlKCcuLy4uLy4uL21peGluL21lbnVUb29sQmFyLmpzeCcpLFxuICAgIERvY1Rvb2xCYXIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvZG9jLXRvb2xiYXIvZG9jLXRvb2xiYXIuanN4JyksXG4gICAgdmFsaWRhdGVGb3JtID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vdmFsaWRhdGVGb3JtJyksXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbFBhZ2UuanN4JyksXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9hcnZlLnN0eWxlcycpO1xuXG52YXIgTElCRE9LID0gJ0FSVicsXG4gICAgTElCUkFSSUVTID0gWydhc3V0dXNlZCcsICdrb250b2QnLCAnZG9rUHJvcHMnLCAndXNlcnMnLCAnYWEnLCAndHVubnVzJywgJ3Byb2plY3QnLCAnbm9tZW5jbGF0dXJlJ107XG5cbi8vIENyZWF0ZSBhIHN0b3JlXG52YXIgZG9jU3RvcmUgPSByZXF1aXJlKCcuLi8uLi9zdG9yZXMvZG9jX3N0b3JlLmpzJyk7XG5cbnZhciBub3cgPSBuZXcgRGF0ZSgpO1xuXG52YXIgQXJ2ZSA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhBcnZlLCBfUmVhY3QkUHVyZUNvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBBcnZlKHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBcnZlKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQXJ2ZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEFydmUpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBlZGl0ZWQ6IF90aGlzLnByb3BzLmRhdGEucm93LmlkID09IDAsXG4gICAgICAgICAgICBzaG93TWVzc2FnZUJveDogJ25vbmUnLFxuICAgICAgICAgICAgcmVsYXRpb25zOiBfdGhpcy5wcm9wcy5kYXRhLnJlbGF0aW9ucyxcbiAgICAgICAgICAgIGdyaWRSb3dFZGl0OiBmYWxzZSxcbiAgICAgICAgICAgIGdyaWRSb3dFdmVudDogbnVsbCxcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgd2FybmluZzogJydcbiAgICAgICAgfTtcblxuICAgICAgICBfdGhpcy5kb2NEYXRhID0gX3RoaXMucHJvcHMuZGF0YS5yb3c7XG4gICAgICAgIF90aGlzLmdyaWREYXRhID0gX3RoaXMucHJvcHMuZGF0YS5kZXRhaWxzO1xuICAgICAgICBfdGhpcy5ncmlkQ29uZmlnID0gX3RoaXMucHJvcHMuZGF0YS5ncmlkQ29uZmlnO1xuICAgICAgICBfdGhpcy5ncmlkUm93RGF0YSA9IG51bGw7XG4gICAgICAgIF90aGlzLmxpYnMgPSBfdGhpcy5jcmVhdGVMaWJzKCk7XG5cbiAgICAgICAgX3RoaXMucGFnZXMgPSBbeyBwYWdlTmFtZTogJ0FydmUnIH1dO1xuICAgICAgICBfdGhpcy5yZXF1aXJlZEZpZWxkcyA9IFt7XG4gICAgICAgICAgICBuYW1lOiAna3B2JyxcbiAgICAgICAgICAgIHR5cGU6ICdEJyxcbiAgICAgICAgICAgIG1pbjogbm93LnNldEZ1bGxZZWFyKG5vdy5nZXRGdWxsWWVhcigpIC0gMSksXG4gICAgICAgICAgICBtYXg6IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSArIDEpXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICd0YWh0YWVnJyxcbiAgICAgICAgICAgIHR5cGU6ICdEJyxcbiAgICAgICAgICAgIG1pbjogbm93LnNldEZ1bGxZZWFyKG5vdy5nZXRGdWxsWWVhcigpIC0gMSksXG4gICAgICAgICAgICBtYXg6IG5vdy5zZXRGdWxsWWVhcihub3cuZ2V0RnVsbFllYXIoKSArIDEpXG4gICAgICAgIH0sIHsgbmFtZTogJ2FzdXR1c2lkJywgdHlwZTogJ04nLCBtaW46IG51bGwsIG1heDogbnVsbCB9LCB7IG5hbWU6ICdzdW1tYScsIHR5cGU6ICdOJywgbWluOiAtOTk5OTk5OSwgbWF4OiA5OTk5OTkgfV07XG4gICAgICAgIF90aGlzLmhhbmRsZVRvb2xiYXJFdmVudHMgPSBfdGhpcy5oYW5kbGVUb29sYmFyRXZlbnRzLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy52YWxpZGF0aW9uID0gX3RoaXMudmFsaWRhdGlvbi5iaW5kKF90aGlzKTtcblxuICAgICAgICBfdGhpcy5tb2RhbFBhZ2VDbGljayA9IF90aGlzLm1vZGFsUGFnZUNsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5oYW5kbGVHcmlkQnRuQ2xpY2sgPSBfdGhpcy5oYW5kbGVHcmlkQnRuQ2xpY2suYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmFkZFJvdyA9IF90aGlzLmFkZFJvdy5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMuaGFuZGxlR3JpZFJvd0NoYW5nZSA9IF90aGlzLmhhbmRsZUdyaWRSb3dDaGFuZ2UuYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLnZhbGlkYXRlR3JpZFJvdyA9IF90aGlzLnZhbGlkYXRlR3JpZFJvdy5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMuaGFuZGxlR3JpZFJvd0lucHV0ID0gX3RoaXMuaGFuZGxlR3JpZFJvd0lucHV0LmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5jcmVhdGVHcmlkUm93ID0gX3RoaXMuY3JlYXRlR3JpZFJvdy5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMuaGFuZGxlSW5wdXRDaGFuZ2UgPSBfdGhpcy5oYW5kbGVJbnB1dENoYW5nZS5iaW5kKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhBcnZlLCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyDQv9C40YjQtdC8INC40YHRhdC+0LTQvdGL0LUg0LTQsNC90L3Ri9C1INCyINGF0YDQsNC90LjQu9C40YnQtSwg0YDQtdCz0LjRgdGC0YDQuNGA0YPQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YHQvtCx0YvRgtC40LlcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgICAgICBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc2VsZi5wcm9wcy5kYXRhLnJvdyksXG4gICAgICAgICAgICAgICAgZGV0YWlscyA9IE9iamVjdC5hc3NpZ24oW10sIHNlbGYucHJvcHMuZGF0YS5kZXRhaWxzKSxcbiAgICAgICAgICAgICAgICBncmlkQ29uZmlnID0gc2VsZi5wcm9wcy5kYXRhLmdyaWRDb25maWc7XG5cbiAgICAgICAgICAgIC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQtNCw0L3QvdGL0LUg0LIg0YXRgNCw0L3QuNC70LjRidC1XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgZGF0YSk7XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NJZENoYW5nZScsIGRhdGEuaWQpO1xuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGV0YWlsc0NoYW5nZScsIGRldGFpbHMpOyAvLyDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZ3JpZENvbmZpZ0NoYW5nZScsIGdyaWRDb25maWcpOyAvLyDQtNCw0L3QvdGL0LUg0LPRgNC40LTQsFxuXG4gICAgICAgICAgICAvLyDQs9GA0YPQt9C40Lwg0YHQv9GA0LDQstC+0YfQvdC40LrQuFxuICAgICAgICAgICAgTElCUkFSSUVTLmZvckVhY2goZnVuY3Rpb24gKGxpYikge1xuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oXCJsb2FkTGlic1wiLCBsaWIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vINC10YHQu9C4INC90L7QstGL0Lkg0LTQvtC60YPQvNC10L3RgiAoaWQgPT0gMClcblxuICAgICAgICAgICAgaWYgKGRhdGEuaWQgPT0gMCkge1xuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2VkaXRlZENoYW5nZScsIHRydWUpO1xuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NhdmVkQ2hhbmdlJywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INGA0LXQttC40Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xuICAgICAgICAgICAgZG9jU3RvcmUub24oJ2NoYW5nZTplZGl0ZWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7IGVkaXRlZDogbmV3VmFsdWUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY1N0b3JlLm9uKCdjaGFuZ2U6bGlicycsIGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBpc0NoYW5nZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbGlic0RhdGEgPSBfdGhpczIubGlicztcblxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUuZm9yRWFjaChmdW5jdGlvbiAobGliKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGliLmlkID09PSAnZG9rUHJvcHMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0L7RgdGC0LDQstC40Lwg0YLQvtC70YzQutC+INC00LDQvdC90YvQtSDRjdGC0L7Qs9C+INC00L7QutGD0LzQtdC90YLQsFxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMyLmxpYnNbbGliLmlkXSAmJiBsaWIuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlic0RhdGFbbGliLmlkXSA9IGxpYi5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc0NoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyLmxpYnMgPSBsaWJzRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyLmZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICAvLyDRhNC+0YDQvNC40YDRg9C10Lwg0LfQsNCy0LjRgdC40LzQvtGB0YLQuFxuICAgICAgICAgICAgcmVsYXRlZERvY3VtZW50cyh0aGlzKTtcblxuICAgICAgICAgICAgdmFyIGlzRWRpdE1vZGUgPSB0aGlzLnN0YXRlLmVkaXRlZCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uTWVzc2FnZSA9IHRoaXMudmFsaWRhdGlvbigpO1xuXG4gICAgICAgICAgICB2YXIgYnRuUGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGJ0blN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIE1lbnVUb29sQmFyKGJ0blBhcmFtcywgdGhpcy5wcm9wcy51c2VyRGF0YSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgRm9ybSxcbiAgICAgICAgICAgICAgICAgICAgeyBwYWdlczogdGhpcy5wYWdlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ2Zvcm0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlUGFnZUNsaWNrOiB0aGlzLmhhbmRsZVBhZ2VDbGljayxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0VkaXRNb2RlIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICBUb29sYmFyQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyByZWY6ICd0b29sYmFyLWNvbnRhaW5lcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdkb2MtdG9vbGJhci13YXJuaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25NZXNzYWdlID8gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jVG9vbEJhciwgeyBicG06IHRoaXMucHJvcHMuYnBtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdkb2MtdG9vbGJhcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRlZDogaXNFZGl0TW9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jU3RhdHVzOiB0aGlzLmRvY0RhdGEuZG9jX3N0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiB0aGlzLnZhbGlkYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlcjogdGhpcy5oYW5kbGVUb29sYmFyRXZlbnRzIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5kb2MgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmRvY1JvdyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9jQ29tbW9uLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ2RvYy1jb21tb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmRvY0RhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0TW9kZSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmRvY1JvdyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMuZG9jQ29sdW1uIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7IHJlZjogJ2lucHV0LW51bWJlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ051bWJlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmRvY0RhdGEubnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRNb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXREYXRlLCB7IHRpdGxlOiAnS3V1cFxceEU0ZXYgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdrcHYnLCB2YWx1ZTogdGhpcy5kb2NEYXRhLmtwdixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ2lucHV0LWtwdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdE1vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dERhdGUsIHsgdGl0bGU6ICdUXFx4RTRodGFlZyAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3RhaHRhZWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZG9jRGF0YS50YWh0YWVnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAnaW5wdXQtdGFodGFlZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogIWlzRWRpdE1vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QsIHsgdGl0bGU6ICdBc3V0dXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2FzdXR1c2lkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6ICdhc3V0dXNlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmxpYnNbJ2FzdXR1c2VkJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5kb2NEYXRhLmFzdXR1c2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB0aGlzLmRvY0RhdGEuYXN1dHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAnc2VsZWN0LWFzdXR1c2lkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ0bkRlbGV0ZTogaXNFZGl0TW9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRNb2RlIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0VGV4dCwgeyB0aXRsZTogJ0xpc2EgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdsaXNhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmRvY0RhdGEubGlzYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ2lucHV0LWxpc2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRNb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMuZG9jQ29sdW1uIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRG9rUHJvcCwgeyB0aXRsZTogJ0tvbnRlZXJpbWluZTogJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdkb2tsYXVzaWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliczogJ2Rva1Byb3BzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmRvY0RhdGEuZG9rbGF1c2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB0aGlzLmRvY0RhdGEuZG9rcHJvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ2Rva3Byb3AtZG9rbGF1c2lkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0TW9kZSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5kb2NSb3cgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRBcmVhLCB7IHRpdGxlOiAnTVxceEU0cmt1c2VkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ211dWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICd0ZXh0YXJlYS1tdXVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmRvY0RhdGEubXV1ZCB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6ICFpc0VkaXRNb2RlIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNFZGl0TW9kZSA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmRvY1JvdyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRvb2xiYXJDb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ2dyaWQtdG9vbGJhci1jb250YWluZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdsZWZ0JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEdyaWRCdXR0b25BZGQsIHsgb25DbGljazogdGhpcy5oYW5kbGVHcmlkQnRuQ2xpY2ssIHJlZjogJ2dyaWQtYnV0dG9uLWFkZCcgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEJ1dHRvbkVkaXQsIHsgb25DbGljazogdGhpcy5oYW5kbGVHcmlkQnRuQ2xpY2ssIHJlZjogJ2dyaWQtYnV0dG9uLWVkaXQnIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEdyaWRCdXR0b25EZWxldGUsIHsgb25DbGljazogdGhpcy5oYW5kbGVHcmlkQnRuQ2xpY2ssIHJlZjogJ2dyaWQtYnV0dG9uLWRlbGV0ZScgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmRvY1JvdyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YUdyaWQsIHsgc291cmNlOiAnZGV0YWlscycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWREYXRhOiB0aGlzLmdyaWREYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkQ29sdW1uczogdGhpcy5ncmlkQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVHcmlkUm93OiB0aGlzLmhhbmRsZUdyaWRSb3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiAhaXNFZGl0TW9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAnZGF0YS1ncmlkJyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmRvY1JvdyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRUZXh0LCB7IHRpdGxlOiAnU3VtbWEgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3N1bW1hJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAnaW5wdXQtc3VtbWEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5kb2NEYXRhLnN1bW1hLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46ICdeWzAtOV0rKFxcXFwuWzAtOV17MSw0fSk/JCcgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dFRleHQsIHsgdGl0bGU6ICdLXFx4RTRpYmVtYWtzICcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdrYm0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdpbnB1dC1rYm0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZG9jRGF0YS5rYm0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAnXlswLTldKyhcXFxcLlswLTldezEsNH0pPyQnIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5ncmlkUm93RWRpdCA/IHRoaXMuY3JlYXRlR3JpZFJvdygpIDogbnVsbFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqINCy0LDQu9C40LTQsNGG0LjRjyDRhNC+0YDQvNGLXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3ZhbGlkYXRpb24nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsaWRhdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5lZGl0ZWQpIHJldHVybiAnJztcblxuICAgICAgICAgICAgdmFyIHJlcXVpcmVkRmllbGRzID0gdGhpcy5yZXF1aXJlZEZpZWxkcztcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlKCcuLi8uLi9taXhpbi92YWxpZGF0ZUZvcm0nKSh0aGlzLCByZXF1aXJlZEZpZWxkcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiDQvtGC0YDQsNCx0L7RgtCw0LXQvCBPayDQuNC3INC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwXHJcbiAgICAgICAgICogQHBhcmFtIGJ0bkV2ZW50XHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ21vZGFsUGFnZUNsaWNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1vZGFsUGFnZUNsaWNrKGJ0bkV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcblxuICAgICAgICAgICAgICAgIC8vINC40YnQtdC8INC/0L4g0LjQtCDRgdGC0YDQvtC60YMg0LIg0LTQsNC90L3Ri9GFINCz0YDQuNC00LAsINC10YHQu9C4INC90LXRgiwg0YLQviDQtNC+0LHQsNCy0LjQvCDRgdGC0YDQvtC60YNcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ3JpZERhdGEuc29tZShmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT09IF90aGlzMy5ncmlkUm93RGF0YS5pZCkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g0LLRgdGC0LDQstC60LAg0L3QvtCy0L7QuSDRgdGC0YDQvtC60LhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkRGF0YS5zcGxpY2UoMCwgMCwgdGhpcy5ncmlkUm93RGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkRGF0YSA9IHRoaXMuZ3JpZERhdGEubWFwKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT09IF90aGlzMy5ncmlkUm93RGF0YS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINC90LDRiNC70LgsINC30LDQvNC10YnQsNC10LxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMzLmdyaWRSb3dEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVjYWxjRG9jU3VtbWEoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBncmlkUm93RWRpdDogZmFsc2UgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiDQntCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQutC70LjQuiDQv9C+INCy0LrQu9Cw0LTQutC1XHJcbiAgICAgICAgICogQHBhcmFtIHBhZ2VcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlUGFnZUNsaWNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVBhZ2VDbGljayhwYWdlKSB7XG4gICAgICAgICAgICBpZiAocGFnZS5kb2NJZCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBcIi9kb2N1bWVudC9cIiArIHBhZ2UuZG9jVHlwZUlkICsgcGFnZS5kb2NJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqINC80LXRgtC+0LQg0LLRi9C30YvQstCw0LXRgtGB0Y8g0L/RgNC4INCy0YvQsdC+0YDQtSDQt9Cw0LTQsNGH0LhcclxuICAgICAgICAgKiBAcGFyYW0gZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVTZWxlY3RUYXNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVNlbGVjdFRhc2soZSkge1xuICAgICAgICAgICAgcmV0dXJuIGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIHRvb2xiYXIgZXZlbnQgaGFuZGxlclxyXG4gICAgICAgICAqIEBwYXJhbSBldmVudFxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVUb29sYmFyRXZlbnRzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvb2xiYXJFdmVudHMoZXZlbnQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdDQU5DRUwnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY0RhdGEgPSBKU09OLnBhcnNlKGZsdXguc3RvcmVzLmRvY1N0b3JlLmJhY2t1cC5kb2NEYXRhKTsgLy8g0LLQvtGB0YHRgtCw0L3QvtCy0LjQvCDQtNCw0L3QvdGL0LVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkRGF0YSA9IEpTT04ucGFyc2UoZmx1eC5zdG9yZXMuZG9jU3RvcmUuYmFja3VwLmdyaWREYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS53YXJuaW5nICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHdhcm5pbmc6ICcnIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2hhbmRsZVRvb2xiYXJFdmVudHMsIG5vIGV2ZW50IGhhbmRsZXIgZm9yICcsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqINCe0LHRgNCw0LHQvtGC0YfQuNC6INC40LfQvNC10L3QtdC90LjQuSDQuNC90L/Rg9GC0L7QslxyXG4gICAgICAgICAqIEBwYXJhbSBpbnB1dE5hbWVcclxuICAgICAgICAgKiBAcGFyYW0gaW5wdXRWYWx1ZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVJbnB1dENoYW5nZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVJbnB1dENoYW5nZShpbnB1dE5hbWUsIGlucHV0VmFsdWUpIHtcblxuICAgICAgICAgICAgLy8g0LjQt9C80LXQvdC10L3QuNGPINC00L7Qv9GD0YHRgtC40LzRiyDRgtC+0LvRjNC60L4g0LIg0YDQtdC20LjQvNC1INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5lZGl0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdub3QgaW4gZWRpdGUgbW9kZScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kb2NEYXRhW2lucHV0TmFtZV0gPSBpbnB1dFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog0J/QvtC00LPQvtGC0L7QstC60LAg0L/QsNGA0LDQvNC10YLRgNC+0LIg0LTQu9GPINC/0LDQvdC10LvQuCDQuNC90YHRgtGA0YPQvNC10L3RgtC+0LJcclxuICAgICAgICAgKiBAcGFyYW0gaXNFZGl0TW9kZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt7YnRuQWRkOiB7c2hvdzogYm9vbGVhbiwgZGlzYWJsZWQ6ICp9LCBidG5FZGl0OiB7c2hvdzogYm9vbGVhbiwgZGlzYWJsZWQ6ICp9LCBidG5QcmludDoge3Nob3c6IGJvb2xlYW4sIGRpc2FibGVkOiBib29sZWFufSwgYnRuU2F2ZToge3Nob3c6ICosIGRpc2FibGVkOiBib29sZWFufX19XHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3ByZXBhaXJlVG9vbEJhclBhcmFtZXRlcnMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcHJlcGFpcmVUb29sQmFyUGFyYW1ldGVycyhpc0VkaXRNb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGJ0bkFkZDoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiAhaXNFZGl0TW9kZSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGlzRWRpdE1vZGVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJ0bkVkaXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogIWlzRWRpdE1vZGUsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBpc0VkaXRNb2RlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBidG5QcmludDoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnRuU2F2ZToge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiBpc0VkaXRNb2RlLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog0L7QsdGA0LDQsdC+0YLRh9C40Log0LTQu9GPINGB0L7QsdGL0YLQuNC5INC60LvQuNC6INC/0LDQvdC10LvQuCDQuNC90YHRgtGA0YPQvNC10L3RgtC+0LIg0LPRgNC40LTQsFxyXG4gICAgICAgICAqIEBwYXJhbSBidG5OYW1lXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZUdyaWRCdG5DbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVHcmlkQnRuQ2xpY2soYnRuTmFtZSkge1xuICAgICAgICAgICAgc3dpdGNoIChidG5OYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYWRkJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRSb3coKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZWRpdCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdFJvdygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdkZWxldGUnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVJvdygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqINGD0LTQsNC70LjRgiDQsNC60YLQuNCy0L3Rg9GOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkZWxldGVSb3cnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGVsZXRlUm93KCkge1xuICAgICAgICAgICAgdmFyIGdyaWRBY3RpdmVSb3cgPSB0aGlzLnJlZnNbJ2RhdGEtZ3JpZCddLnN0YXRlLmFjdGl2ZVJvdztcblxuICAgICAgICAgICAgdGhpcy5ncmlkRGF0YS5zcGxpY2UoZ3JpZEFjdGl2ZVJvdywgMSk7XG5cbiAgICAgICAgICAgIC8vINC/0LXRgNC10YDQsNGB0YfQtdGCINC40YLQvtCz0L7QslxuICAgICAgICAgICAgdGhpcy5yZWNhbGNEb2NTdW1tYSgpO1xuXG4gICAgICAgICAgICAvLyDQuNC30LzQtdC90LjQvCDRgdC+0YHRgtC+0Y/QvdC40LVcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqINC+0YLQutGA0L7QtdGCINCw0LrRgtC40LLQvdGD0Y4g0YHRgtGA0L7QutGDINC00LvRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2VkaXRSb3cnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZWRpdFJvdygpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZFJvd0RhdGEgPSB0aGlzLmdyaWREYXRhW3RoaXMucmVmc1snZGF0YS1ncmlkJ10uc3RhdGUuYWN0aXZlUm93XTtcblxuICAgICAgICAgICAgLy8g0L7RgtC60YDQvtC10Lwg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+INC00LvRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZ3JpZFJvd0VkaXQ6IHRydWUsIGdyaWRSb3dFdmVudDogJ2VkaXQnIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog0LTQvtCx0LDQstC40YIg0LIg0YHQvtGB0YLQvtGP0L3QuNC1INC90L7QstGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2FkZFJvdycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRSb3coKSB7XG4gICAgICAgICAgICB2YXIgbmV3Um93ID0ge307XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ncmlkQ29uZmlnLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gdGhpcy5ncmlkQ29uZmlnW2ldLmlkO1xuICAgICAgICAgICAgICAgIG5ld1Jvd1tmaWVsZF0gPSAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3Um93LmlkID0gJ05FVycgKyBNYXRoLnJhbmRvbSgpOyAvLyDQs9C10L3QtdGA0LjQvCDQvdC+0LLQvtC1INC40LRcblxuICAgICAgICAgICAgdGhpcy5ncmlkUm93RGF0YSA9IG5ld1JvdztcbiAgICAgICAgICAgIC8vINC+0YLQutGA0L7QtdC8INC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QviDQtNC70Y8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGdyaWRSb3dFZGl0OiB0cnVlLCBncmlkUm93RXZlbnQ6ICdhZGQnIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog0KHQvtC30LTQsNGB0YIg0LrQvtC80L/QvtC90LXRgiDRgdGC0YDQvtC60Lgg0LPRgNC40LTQsFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtYTUx9XHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NyZWF0ZUdyaWRSb3cnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlR3JpZFJvdygpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZGF0ZU1lc3NhZ2UgPSAnJyxcbiAgICAgICAgICAgICAgICBtb2RhbE9iamVjdHMgPSBbJ2J0bk9rJywgJ2J0bkNhbmNlbCddLFxuICAgICAgICAgICAgICAgIGJ1dHRvbk9rUmVhZE9ubHkgPSB2YWxpZGF0ZU1lc3NhZ2UubGVuZ3RoID4gMCB8fCAhdGhpcy5zdGF0ZS5jaGVja2VkO1xuXG4gICAgICAgICAgICBpZiAoYnV0dG9uT2tSZWFkT25seSkge1xuICAgICAgICAgICAgICAgIC8vINGD0LHQtdGA0LXQvCDQutC90L7Qv9C60YMg0J7QulxuICAgICAgICAgICAgICAgIG1vZGFsT2JqZWN0cy5zcGxpY2UoMCwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5ncmlkUm93RGF0YSkgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIG51bGwpO1xuXG4gICAgICAgICAgICB2YXIgbm9tRGF0YSA9IHRoaXMubGlic1snbm9tZW5jbGF0dXJlJ10uZmlsdGVyKGZ1bmN0aW9uIChsaWIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWxpYi5kb2sgfHwgbGliLmRvayA9PT0gTElCRE9LKSByZXR1cm4gbGliO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnLm1vZGFsUGFnZScgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBNb2RhbFBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsT2JqZWN0czogbW9kYWxPYmplY3RzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAnbW9kYWxwYWdlLWdyaWQtcm93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VDbGljayxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZU5hbWU6ICdSZWEgbGlzYW1pbmUgLyBwYXJhbmRhbWluZScgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyByZWY6ICdncmlkLXJvdy1jb250YWluZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5kb2NSb3cgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwgeyB0aXRsZTogJ1RlZW51cycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdub21pZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6ICdub21lbmNsYXR1cmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBub21EYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmdyaWRSb3dEYXRhLm5vbWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHRoaXMuZ3JpZFJvd0RhdGEua29vZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAnbm9taWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1RlZW51c2Uga29vZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUdyaWRSb3dDaGFuZ2UgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5kb2NSb3cgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7IHRpdGxlOiAnS29ndXMgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2tvZ3VzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IE51bWJlcih0aGlzLmdyaWRSb3dEYXRhLmtvZ3VzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAna29ndXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICd1aS1jMicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUdyaWRSb3dJbnB1dCB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmRvY1JvdyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHsgdGl0bGU6ICdIaW5kICcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdoaW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IE51bWJlcih0aGlzLmdyaWRSb3dEYXRhLmhpbmQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdoaW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktYzInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVHcmlkUm93SW5wdXQgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5kb2NSb3cgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0TnVtYmVyLCB7IHRpdGxlOiAnS2JtLXRhOiAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAna2JtdGEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogTnVtYmVyKHRoaXMuZ3JpZFJvd0RhdGEua2JtdGEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdrYm10YScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLWMyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlR3JpZFJvd0NoYW5nZSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmRvY1JvdyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXROdW1iZXIsIHsgdGl0bGU6ICdLYm06ICcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdrYm0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogTnVtYmVyKHRoaXMuZ3JpZFJvd0RhdGEua2JtKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmREYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAna2JtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAndWktYzInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlR3JpZFJvd0lucHV0IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMuZG9jUm93IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dE51bWJlciwgeyB0aXRsZTogJ1N1bW1hOiAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnU3VtbWEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogTnVtYmVyKHRoaXMuZ3JpZFJvd0RhdGEuc3VtbWEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6ICdzdW1tYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VpLWMyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlR3JpZFJvd0lucHV0IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqINC+0YLRgdC70LXQttC40LLQsNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINC00LDQvdC90YvRhSDQvdCwINGE0L7RgNC8XHJcbiAgICAgICAgICogQHBhcmFtIG5hbWVcclxuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlR3JpZFJvd0NoYW5nZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVHcmlkUm93Q2hhbmdlKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmdyaWRSb3dEYXRhW25hbWVdICYmIG5hbWUgPT09ICdub21pZCcpIHtcbiAgICAgICAgICAgICAgICAvLyDQv9GA0L7QuNC30L7RiNC70L4g0LjQt9C80LXQvdC10L3QuNC1INGD0YHQu9GD0LPQuCwg0L7QsdC90YPQu9C40Lwg0LfQvdCw0YfQtdC90LjRj1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFJvd0RhdGFbJ2tvZ3VzJ10gPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFJvd0RhdGFbJ2hpbmQnXSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkUm93RGF0YVsnc3VtbWEnXSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkUm93RGF0YVsna2JtJ10gPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFJvd0RhdGFbJ2tibXRhJ10gPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFJvd0RhdGFbJ25vbWlkJ10gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vINC40YnQtdC8INC/0L4g0YHQv9GA0LDQstC+0YfQvdC40LrRgyDQv9C+0LvRjyDQutC+0LQg0Lgg0L3QsNC40LzQtdC90L7QstCw0L3QuNC1XG5cbiAgICAgICAgICAgIHZhciBsaWJEYXRhID0gdGhpcy5saWJzWydub21lbmNsYXR1cmUnXTtcbiAgICAgICAgICAgIGxpYkRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvdy5pZCA9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczQuZ3JpZFJvd0RhdGFbJ2tvb2QnXSA9IHJvdy5rb29kO1xuICAgICAgICAgICAgICAgICAgICBfdGhpczQuZ3JpZFJvd0RhdGFbJ25pbWV0dXMnXSA9IHJvdy5uYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmdyaWRSb3dEYXRhW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICAvLyAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUdyaWRSb3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqINCe0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDRgdGC0YDQvtC60Lgg0LPRgNC40LTQsFxyXG4gICAgICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZUdyaWRSb3dJbnB1dCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVHcmlkUm93SW5wdXQobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZFJvd0RhdGFbbmFtZV0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgLy8g0L/QtdGA0LXRgdGH0LXRgiDRgdGD0LzQvFxuICAgICAgICAgICAgdGhpcy5yZWNhbGNSb3dTdW1tKCk7XG4gICAgICAgICAgICAvLyAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUdyaWRSb3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqINC/0LXRgNC10YDQsNGB0YfQtdGCINGB0YPQvNC80Ysg0YHRgtGA0L7QutC4INC4INGA0LDRgdGH0LXRgiDQvdCw0LvQvtCz0LBcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVjYWxjUm93U3VtbScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWNhbGNSb3dTdW1tKCkge1xuICAgICAgICAgICAgdGhpcy5ncmlkUm93RGF0YVsna29ndXMnXSA9IE51bWJlcih0aGlzLmdyaWRSb3dEYXRhLmtvZ3VzKTtcbiAgICAgICAgICAgIHRoaXMuZ3JpZFJvd0RhdGFbJ2hpbmQnXSA9IE51bWJlcih0aGlzLmdyaWRSb3dEYXRhLmhpbmQpO1xuICAgICAgICAgICAgdGhpcy5ncmlkUm93RGF0YVsna2JtdGEnXSA9IE51bWJlcih0aGlzLmdyaWRSb3dEYXRhWydrb2d1cyddKSAqIE51bWJlcih0aGlzLmdyaWRSb3dEYXRhWydoaW5kJ10pO1xuICAgICAgICAgICAgdGhpcy5ncmlkUm93RGF0YVsna2JtJ10gPSBOdW1iZXIodGhpcy5ncmlkUm93RGF0YVsna2JtdGEnXSAqIDAuMjApOyAvLyBAdG9kbyDQstGA0LzQtdC90L3QvlxuICAgICAgICAgICAgdGhpcy5ncmlkUm93RGF0YVsnc3VtbWEnXSA9IE51bWJlcih0aGlzLmdyaWRSb3dEYXRhWydrYm10YSddKSArIE51bWJlcih0aGlzLmdyaWRSb3dEYXRhWydrYm0nXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiDQn9C10YDQtdGA0LDRgdGH0LXRgiDQuNGC0L7Qs9C+0LLRi9GFINGB0YPQvNC8INC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZWNhbGNEb2NTdW1tYScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWNhbGNEb2NTdW1tYSgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLmRvY0RhdGFbJ3N1bW1hJ10gPSAwO1xuICAgICAgICAgICAgdGhpcy5kb2NEYXRhWydrYm0nXSA9IDA7XG4gICAgICAgICAgICB0aGlzLmdyaWREYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgICAgICAgIF90aGlzNS5kb2NEYXRhWydzdW1tYSddICs9IE51bWJlcihyb3dbJ3N1bW1hJ10pO1xuICAgICAgICAgICAgICAgIF90aGlzNS5kb2NEYXRhWydrYm0nXSArPSBOdW1iZXIocm93WydrYm0nXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHdpbGwgY2hlY2sgdmFsdWVzIG9uIHRoZSBmb3JtIGFuZCByZXR1cm4gc3RyaW5nIHdpdGggd2FybmluZ1xyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICd2YWxpZGF0ZUdyaWRSb3cnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsaWRhdGVHcmlkUm93KCkge1xuICAgICAgICAgICAgdmFyIHdhcm5pbmcgPSAnJztcblxuICAgICAgICAgICAgLy8g0YLQvtC70YzQutC+INC/0L7RgdC70LUg0L/RgNC+0LLQtdGA0LrQuCDRhNC+0YDQvNGLINC90LAg0LLQsNC70LjQtNC90L7RgdGC0YxcbiAgICAgICAgICAgIGlmICghdGhpcy5ncmlkUm93RGF0YVsnbm9taWQnXSkgd2FybmluZyA9IHdhcm5pbmcgKyAnINC60L7QtCDRg9GB0LvRg9Cz0LgnO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmdyaWRSb3dEYXRhWydrb2d1cyddKSB3YXJuaW5nID0gd2FybmluZyArICcg0LrQvtC7LdCy0L4nO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmdyaWRSb3dEYXRhWydoaW5kJ10pIHdhcm5pbmcgPSB3YXJuaW5nICsgJyDRhtC10L3QsCc7XG5cbiAgICAgICAgICAgIGlmICh3YXJuaW5nLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAvLyDQtdGB0YLRjCDQv9GA0L7QsdC70LXQvNGLXG4gICAgICAgICAgICAgICAgd2FybmluZyA9ICfQntGC0YHRg9GC0YHQstGD0Y7RgiDQtNCw0L3QvdGL0LU6JyArIHdhcm5pbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgY2hlY2tlZDogdHJ1ZSwgd2FybmluZzogd2FybmluZyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqINCy0LXRgNC90LXRgiDQvtCx0YrQtdC60YIg0LHQuNCx0LvQuNC+0YLQtdC6INC00L7QutGD0LzQtdC90YLQsFxyXG4gICAgICAgICAqIEByZXR1cm5zIHt7fX1cclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY3JlYXRlTGlicycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVMaWJzKCkge1xuICAgICAgICAgICAgdmFyIGxpYnMgPSB7fTtcbiAgICAgICAgICAgIExJQlJBUklFUy5mb3JFYWNoKGZ1bmN0aW9uIChsaWIpIHtcbiAgICAgICAgICAgICAgICBsaWJzW2xpYl0gPSBbXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGxpYnM7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQXJ2ZTtcbn0oUmVhY3QuUHVyZUNvbXBvbmVudCk7XG5cbkFydmUucHJvcFR5cGVzID0ge1xuICAgIGRhdGE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBicG06IFByb3BUeXBlcy5hcnJheSxcbiAgICBlZGl0ZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dNZXNzYWdlQm94OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGdyaWREYXRhOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgcmVsYXRpb25zOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgZ3JpZENvbmZpZzogUHJvcFR5cGVzLmFycmF5LFxuICAgIGdyaWRSb3dFZGl0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBncmlkUm93RXZlbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZ3JpZFJvd0RhdGE6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgbGliczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjaGVja2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB3YXJuaW5nOiBQcm9wVHlwZXMuc3RyaW5nXG5cbn07XG5cbi8qXHJcbiBBcnZlLmRlZmF1bHRQcm9wcyA9IHtcclxuIGRpc2FibGVkOiBmYWxzZSxcclxuIHNob3c6IHRydWVcclxuIH07XHJcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFydmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2NzL2FydmUvYXJ2ZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRvY1Jvdzoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmx1ZSdcbiAgICB9LFxuICAgIGRvY0NvbHVtbjoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgeWVsbG93JyxcbiAgICAgICAgd2lkdGg6ICc1MCUnXG4gICAgfSxcbiAgICBkb2M6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJyb3duJ1xuICAgIH0sXG4gICAgZ3JpZFJvdzoge1xuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICBtYXJnaW46ICcxMCUgMzAlIDEwJSAzMCUnLFxuICAgICAgICB3aWR0aDogJ2F1dG8nLFxuICAgICAgICBvcGFjaXR5OiAnMScsXG4gICAgICAgIHRvcDogJzEwMHB4J1xuICAgIH1cblxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2RvY3MvYXJ2ZS9hcnZlLnN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkb2NUeXBlSWQpIHtcbiAgICAvLyDQstC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDRgtC40L/QsCDQtNC+0LrRg9C80LXQvdGC0LAg0LLQtdGA0L3QtdGCINC60L7QvNC/0L7QvdC10L3RgiDQtNC+0LrRg9C80LXQvdGC0LBcblxuICAgIGNvbnNvbGUubG9nKCdyZXR1cm5Eb2NDb21wb25lbnQ6JyArIGRvY1R5cGVJZCk7XG4gICAgdmFyIGNvbXBvbmVudCA9IHt9O1xuXG4gICAgc3dpdGNoIChkb2NUeXBlSWQpIHtcbiAgICAgICAgY2FzZSAnUEFMSyc6XG4gICAgICAgICAgICBjb21wb25lbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL3BhbGtfb3Blci5qc3gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29tcG9uZW50ID0gcmVxdWlyZSgnLi4vZnJvbnRlbmQvZG9jcy9hcnZlL2FydmUuanN4Jyk7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbWlkZGxld2FyZS9yZXR1cm5Eb2NDb21wb25lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDEzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRm9ybSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZm9ybS5qcycpO1xudmFyIFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGFnZV9sYWJlbCcpO1xuXG52YXIgcGFnZXMgPSBbJ1BhZ2UxJywgJ1BhZ2UyJ107XG5cbnZhciBQYWxrID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnUGFsaycsXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBGb3JtLFxuICAgICAgICAgICAgeyBwYWdlczogcGFnZXMgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ3NwYW4nLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJyBQYWxrICdcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhbGs7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2NzL3BhbGtfb3Blci5qc3hcbi8vIG1vZHVsZSBpZCA9IDEzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIFBhZ2VMYWJlbCA9IHJlcXVpcmUoJy4vcGFnZV9sYWJlbCcpO1xuXG52YXIgRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ0Zvcm0nLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHZhciBwYWdlcyA9IFt7IHBhZ2VOYW1lOiAnUGFnZScgfV07XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnBhZ2VzKSB7XG4gICAgICAgICAgICBwYWdlcyA9IHRoaXMucHJvcHMucGFnZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhZ2VzOiB0aGlzLnByb3BzLnBhZ2VzXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgcGFnZXMgPSB0aGlzLnN0YXRlLnBhZ2VzO1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBjbGFzc05hbWU6ICdjb250YWluZXInIH0sIHBhZ2VzLm1hcChmdW5jdGlvbiAocGFnZSwgaWR4KSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChQYWdlTGFiZWwsIHsga2V5OiBpZHgsIHBhZ2VJZHg6IGlkeCB9LCBwYWdlKTtcbiAgICAgICAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgY2xhc3NOYW1lOiAncGFnZScgfSwgUmVhY3QuY3JlYXRlRWxlbWVudCgnZm9ybScsIG51bGwsIHRoaXMucHJvcHMuY2hpbGRyZW4pKSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gMTM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpO1xuXG52YXIgUGFnZUxhYmVsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnUGFnZUxhYmVsJyxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgLy8gICAgICBjb25zb2xlLmxvZygncGFnZSBsYWJlbCBjb21wb25lbnRXaWxsTW91bnQnKVxuICAgICAgICBmbHV4LnN0b3Jlcy5kb2NTdG9yZS5vbignY2hhbmdlOmVkaXRlZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7IGRpc2FibGVkOiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbiBoYW5kbGVDbGljayhwYWdlKSB7XG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAg0YHQvtCx0YvRgtC40LUg0LrQu9C40LosINC/0L7QtNCz0YDRg9C20LDQtdC8INGB0LLRj9C30LDQvdC90YvQuSDQtNC+0LrRg9C80LXQvdGCXG4gICAgICAgIC8vICAgICAgIGFsZXJ0KCdjbGljazonICsgcGFnZU5hbWUpO1xuICAgICAgICAvLyBkb2NUeXBlSWQ6IGRvYy5kb2NfdHlwZSwgZG9jSWQ6ZG9jLmlkLCBwYWdlTmFtZTonTGF1c2VuZCBpZDonICsgZG9jLmlkXG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYWdlIGRpc2FibGVkJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFnZS5kb2NJZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsZUNsaWNrIHBhZ2UuZG9jVHlwZUlkICVzLCBwYWdlLmRvY0lkICVuJyk7XG4gICAgICAgICAgICB2YXIgdXJsID0gXCIvZG9jdW1lbnQvXCIgKyBwYWdlLmRvY1R5cGVJZCArIHBhZ2UuZG9jSWQ7XG4gICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgY2xhc3NOYW1lID0gJ3BhZ2VMYWJlbCc7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywgeyBjbGFzc05hbWU6IGNsYXNzTmFtZSwgb25DbGljazogdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMsIHRoaXMucHJvcHMuY2hpbGRyZW4pLCBkaXNhYmxlZDogdGhpcy5zdGF0ZS5kaXNhYmxlZCB9LCB0aGlzLnByb3BzLmNoaWxkcmVuLnBhZ2VOYW1lLCAnICcpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VMYWJlbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvcGFnZV9sYWJlbC5qc1xuLy8gbW9kdWxlIGlkID0gMTM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMveUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==
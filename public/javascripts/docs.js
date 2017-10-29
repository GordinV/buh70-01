var docs =
webpackJsonp_name_([3],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Register = __webpack_require__(136);

	// данные для хранилища
	//localStorage['docsStore'] = storeData;
	storeData = JSON.parse(storeData);
	userData = JSON.parse(userData);

	ReactDOM.hydrate(React.createElement(Register, { id: 'grid', components: storeData, userData: userData }, 'Тут будут компоненты'), document.getElementById('grid'));

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// грузим компоненты

	//import PropTypes from 'prop-types';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    flux = __webpack_require__(14),
	    DataGrid = __webpack_require__(35),
	    BtnAdd = __webpack_require__(102),
	    BtnEdit = __webpack_require__(105),
	    BtnDelete = __webpack_require__(106),
	    BtnPrint = __webpack_require__(121),
	    BtnFilter = __webpack_require__(137),
	    ModalPage = __webpack_require__(126),
	    ModalPageDelete = __webpack_require__(138),
	    ModalPageInfo = __webpack_require__(140),
	    TreeList = __webpack_require__(142),
	    Sidebar = __webpack_require__(144),
	    MenuToolBar = __webpack_require__(111),
	    ToolbarContainer = __webpack_require__(109),
	    styles = __webpack_require__(146),
	    GridFilter = __webpack_require__(147);

	// Create a store
	var docsStore = __webpack_require__(149);

	// создаем класс - держатель состояний

	var Register = function (_React$PureComponent) {
	    _inherits(Register, _React$PureComponent);

	    function Register(props) {
	        _classCallCheck(this, Register);

	        var _this = _possibleConstructorReturn(this, (Register.__proto__ || Object.getPrototypeOf(Register)).call(this, props));

	        _this.state = {
	            // у каждого компонента свой объект
	            getFilter: false,
	            getDeleteModalPage: false,
	            showSystemMessage: false,
	            activRowId: 0,
	            filterString: null,
	            isReport: false,
	            treeValue: ''
	        };

	        _this.components = _this.props.components;
	        _this.filterData = []; // массив объектов, куда запишем параметры для фильтрации @todo вынести все в отдельный компонет для фильтрации

	        _this.btnAddClick = _this.btnAddClick.bind(_this);
	        _this.btnEditClick = _this.btnEditClick.bind(_this);
	        _this.btnDeleteClick = _this.btnDeleteClick.bind(_this);
	        _this.btnPrintClick = _this.btnPrintClick.bind(_this);
	        _this.btnFilterClick = _this.btnFilterClick.bind(_this);
	        _this.modalPageBtnClick = _this.modalPageBtnClick.bind(_this);
	        _this.modalPageDelBtnClick = _this.modalPageDelBtnClick.bind(_this);
	        _this.clickHandler = _this.clickHandler.bind(_this);
	        _this.dblClickHandler = _this.dblClickHandler.bind(_this);
	        _this.headerClickHandler = _this.headerClickHandler.bind(_this);
	        _this.isReports = _this.isReports.bind(_this);

	        return _this;
	    }

	    _createClass(Register, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var self = this;

	            // создаем обработчик события на изменение даннх
	            docsStore.on('change:data', function (newValue, previousValue) {
	                // данные изменились, меняем состояние
	                self.setState({ components: docsStore.data });
	            });

	            // создаем обработчик события на изменение строки грида
	            docsStore.on('change:docsGrid', function (newValue, previousValue) {
	                // данные изменились, меняем состояние
	                self.setState({ activRowId: docsStore.docsGrid });
	            });

	            // создаем обработчик события системный извещение
	            docsStore.on('change:systemMessage', function (newValue, previousValue) {
	                // данные изменились, меняем состояние
	                var systemMessageStatus = newValue ? true : false;
	                self.setState({ showSystemMessage: systemMessageStatus });
	            });

	            // покажем данные

	            //        let lastComponent = localStorage['docsList'];
	            flux.doAction('dataChange', this.props.components);
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var componentlist = this.findComponent('docsList'),
	                listValue = componentlist[0].value || '',
	                dataList = componentlist[0].data || [],
	                prepairedGridData = this.findComponent('docsGrid') || [],
	                gridConfig = [],
	                gridData = [],
	                systemMessage = docsStore.systemMessage,
	                filterData = this.getFilterFields();

	            var btnParams = {
	                btnStart: {
	                    show: false
	                },
	                btnLogin: {
	                    show: true
	                }
	            };

	            // проверим наличие данных, если есть пропихнем компонентам
	            if (prepairedGridData.length > 0 && prepairedGridData[0].data.length > 0) {
	                gridConfig = prepairedGridData[0].data[0].columns;
	                gridData = prepairedGridData[0].data[0].data;
	            }

	            return React.createElement(
	                'div',
	                { ref: 'parentDiv' },
	                MenuToolBar(btnParams, this.props.userData),
	                this.renderFilterToolbar(),
	                React.createElement(
	                    'div',
	                    { ref: 'docContainer', style: styles.container },
	                    this.renderDocToolBar(),
	                    React.createElement(
	                        'div',
	                        { style: styles.wrapper },
	                        React.createElement(
	                            Sidebar,
	                            { width: '30%', toolbar: true, ref: 'list-sidebar' },
	                            React.createElement(TreeList, { ref: 'treeList',
	                                data: dataList,
	                                name: 'docsList',
	                                bindDataField: 'kood',
	                                value: listValue,
	                                onClickAction: this.clickHandler,
	                                onChangeAction: 'docsListChange'
	                            })
	                        ),
	                        React.createElement(
	                            'div',
	                            { style: styles.container },
	                            this.renderAruannePage(),
	                            React.createElement(
	                                Sidebar,
	                                { toolbar: false, ref: 'grid-sidebar', height: '400px' },
	                                React.createElement(DataGrid, { ref: 'dataGrid',
	                                    gridData: gridData,
	                                    gridColumns: gridConfig,
	                                    onChangeAction: 'docsGridChange',
	                                    onClick: this.clickHandler,
	                                    onDblClick: this.dblClickHandler,
	                                    onHeaderClick: this.headerClickHandler,
	                                    value: prepairedGridData[0].lastDocId,
	                                    url: 'api' }),
	                                React.createElement(
	                                    ModalPage,
	                                    { ref: 'modalpageFilter',
	                                        modalPageBtnClick: this.modalPageBtnClick,
	                                        modalPageName: 'Filter',
	                                        show: this.state.getFilter },
	                                    React.createElement(GridFilter, { ref: 'gridFilter', gridConfig: gridConfig, data: filterData })
	                                ),
	                                React.createElement(ModalPageDelete, { ref: 'modalpageDelete',
	                                    modalPageBtnClick: this.modalPageDelBtnClick,
	                                    show: this.state.getDeleteModalPage }),
	                                React.createElement(ModalPageInfo, { ref: 'modalpageInfo',
	                                    modalPageBtnClick: this.modalPageInfoBtnClick,
	                                    show: this.state.showSystemMessage,
	                                    systemMessage: systemMessage })
	                            )
	                        )
	                    )
	                )
	            );
	        }

	        /**
	         * Вернет компонент Отчет, если выбранная ветка содержит тип == aruanne
	         * @returns {boolean|XML}
	         */

	    }, {
	        key: 'renderAruannePage',
	        value: function renderAruannePage() {
	            var isReport = this.isReports(this.state.treeValue);
	            var Component = React.createElement(
	                Sidebar,
	                { toolbar: true, ref: 'aruanne-sidebar', height: '100%' },
	                'Aruanne'
	            );
	            return isReport && Component;
	        }

	        /**
	         * Вернет компонет - панель инструментов документа
	         * @returns {XML}
	         */

	    }, {
	        key: 'renderDocToolBar',
	        value: function renderDocToolBar() {
	            var toolbarParams = this.prepareParamsForToolbar(); //параметры для кнопок управления, взависимости от активной строки

	            return React.createElement(
	                ToolbarContainer,
	                { ref: 'toolbarContainer' },
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(BtnAdd, { onClick: this.btnAddClick, show: toolbarParams['btnAdd'].show,
	                        disable: toolbarParams['btnAdd'].disabled }),
	                    React.createElement(BtnEdit, { onClick: this.btnEditClick, show: toolbarParams['btnEdit'].show,
	                        disable: toolbarParams['btnEdit'].disabled }),
	                    React.createElement(BtnDelete, { onClick: this.btnDeleteClick, show: toolbarParams['btnDelete'].show,
	                        disable: toolbarParams['btnDelete'].disabled }),
	                    React.createElement(BtnPrint, { onClick: this.btnPrintClick, show: toolbarParams['btnPrint'].show,
	                        disable: toolbarParams['btnPrint'].disabled }),
	                    React.createElement(BtnFilter, { onClick: this.btnFilterClick })
	                )
	            );
	        }

	        /**
	         * Вернет компонет с данными фильтра
	         * @returns {XML}
	         */

	    }, {
	        key: 'renderFilterToolbar',
	        value: function renderFilterToolbar() {
	            var filterString = this.getFilterString();
	            var component = React.createElement(
	                ToolbarContainer,
	                { ref: 'filterToolbarContainer', position: 'left' },
	                React.createElement(
	                    'span',
	                    null,
	                    'Filter: ',
	                    filterString
	                )
	            );

	            return filterString && component;
	        }

	        /**
	         * Проанализирует свойства выбранного документа и вернет true , если тип == Aruanne
	         * @param document
	         * @returns {boolean}
	         */

	    }, {
	        key: 'isReports',
	        value: function isReports(document) {
	            var data = this.findComponent('docsList')[0].data,
	                documentData = data.filter(function (row) {
	                return row.kood === document && row.props && JSON.parse(row.props).type === 'aruanne';
	            });

	            return !!documentData.length;
	        }
	    }, {
	        key: 'findComponent',
	        value: function findComponent(componentName) {
	            // вернет данные компонента по его названию
	            var componentData = [];

	            if (this.components.length > 0) {
	                componentData = this.components.filter(function (item) {
	                    if (item.name == componentName) {
	                        return item;
	                    }
	                });
	            }
	            return componentData;
	        }
	    }, {
	        key: 'btnFilterClick',
	        value: function btnFilterClick() {
	            // откроет модальное окно с полями для фильтрации
	            this.setState({ getFilter: true });
	        }
	    }, {
	        key: 'btnDeleteClick',
	        value: function btnDeleteClick() {
	            this.setState({ getDeleteModalPage: true });
	        }
	    }, {
	        key: 'btnAddClick',
	        value: function btnAddClick() {
	            // обработчик события клик кнопки "Добавить"
	            // вызовем действия на флаксе
	            flux.doAction('Add');
	        }
	    }, {
	        key: 'btnEditClick',
	        value: function btnEditClick() {
	            // обработчик события клик кнопки "Изменить"
	            // вызовем действия на флаксе
	            flux.doAction('Edit');
	        }
	    }, {
	        key: 'btnPrintClick',
	        value: function btnPrintClick() {
	            // обработчик события клик кнопки "Изменить"
	            // вызовем действия на флаксе
	            flux.doAction('Print');
	        }
	    }, {
	        key: 'clickHandler',
	        value: function clickHandler(action, id) {
	            // сохраним в хранилище
	            if (action && id) {
	                flux.doAction(action, id);
	            }
	            this.setState({ treeValue: id });
	        }
	    }, {
	        key: 'dblClickHandler',
	        value: function dblClickHandler() {
	            // вызовет метод редактирования
	            flux.doAction('Edit');
	        }
	    }, {
	        key: 'headerClickHandler',
	        value: function headerClickHandler(sortBy) {
	            flux.doAction('sortByChange', sortBy);
	        }
	    }, {
	        key: 'modalPageBtnClick',
	        value: function modalPageBtnClick(btnEvent) {
	            // обработчик для кнопки фильтрации
	            var filterString = '';
	            if (btnEvent == 'Ok') {
	                // собираем данные
	                var gridFilter = this.refs['gridFilter'],
	                    filterData = gridFilter.state.data;

	                this.filterData = filterData.map(function (row) {
	                    if (row.value) {
	                        filterString = filterString + (filterString.length > 0 ? " and " : " where ");
	                        switch (row.type) {

	                            case 'text':
	                                filterString = filterString + row.refs + " ilike '%" + row.value + "%'";
	                                break;
	                            case 'string':
	                                filterString = filterString + row.refs + " ilike '" + row.value + "%'";
	                                break;
	                            case 'date':
	                                filterString = filterString + row.refs + " = '" + row.value + "'";
	                                break;
	                            case 'number':
	                                filterString = filterString + row.refs + " = " + row.value;
	                                break;
	                            case 'integer':
	                                filterString = filterString + row.refs + " = " + row.value;
	                                break;
	                        }
	                    }
	                    return row;
	                }, this);
	                // применем фильтр
	                flux.doAction('sqlWhereChange', filterString);
	            }
	            this.setState({ getFilter: false });
	        }
	    }, {
	        key: 'modalPageDelBtnClick',
	        value: function modalPageDelBtnClick(btnEvent) {
	            // обработчик вызова модального окна удаления
	            this.setState({ getDeleteModalPage: false });

	            if (btnEvent == 'Ok') {
	                // вызовем действия на флаксе
	                flux.doAction('Delete');
	            }
	        }
	    }, {
	        key: 'modalPageInfoBtnClick',
	        value: function modalPageInfoBtnClick() {

	            // обработчик вызова модального окна системного сообщения
	            this.setState({ showSystemMessage: false });
	            // вызовем действия на флаксе
	            flux.doAction('systemMessageChange', null);
	        }
	    }, {
	        key: 'getFilterFields',
	        value: function getFilterFields() {
	            var _this2 = this;

	            // создаст из полtй грида компоненты для формирования условий фильтрации
	            var gridComponents = docsStore.data,
	                gridData = [],
	                previosFilter = this.filterData;

	            for (var i = 0; i < gridComponents.length; i++) {
	                if (gridComponents[i]['name'] == 'docsGrid') {
	                    // ищем поле columns
	                    for (var field in gridComponents[i].data[0]) {
	                        if (field == 'columns') {
	                            gridData = gridComponents[i].data[0].columns;
	                            break;
	                        }
	                    }
	                    break;
	                }
	            }

	            if (gridData) {
	                this.filterData = []; // обнулим массив
	                this.filterFields = gridData.map(function (row) {
	                    var componentType = 'text',
	                        componentObjektValue = void 0;

	                    for (var _i = 0; _i < previosFilter.length; _i++) {
	                        // ищем "старое" значение фильтра и если есть, то отдаем его value
	                        if (previosFilter[_i].refs == row.id) {
	                            componentObjektValue = previosFilter[_i].value;
	                            break;
	                        }
	                    }

	                    if (row.type) {
	                        componentType = row.type;
	                    }

	                    // соберем массив объектов
	                    _this2.filterData.push({
	                        name: row.name,
	                        value: componentObjektValue || null,
	                        type: componentType,
	                        refs: row.id
	                    });
	                });
	            }
	            // обновим строку фильтрации
	            this.getFilterString();
	            return this.filterData;
	        }
	    }, {
	        key: 'getFilterString',
	        value: function getFilterString() {
	            // преобразует данные филтра в строку
	            var string = '';

	            this.filterData.map(function (row) {
	                if (row.value) {
	                    string = string + row.name + ':' + row.value + '; ';
	                }
	            });
	            return string;
	        }
	    }, {
	        key: 'prepareParamsForToolbar',
	        value: function prepareParamsForToolbar() {
	            // читаем данные со стора, формируем параметры для кнопок управления, и туда их отдаем
	            //docsGridChange (flux.stores.docsStore.)
	            var grid = this.findComponent('docsGrid') || [],
	                lastRowId = this.state.activRowId,
	                data = [],
	                dataRow = [],
	                toolbarParams = {
	                btnAdd: {
	                    show: true,
	                    disabled: false
	                },
	                btnEdit: {
	                    show: true,
	                    disabled: false
	                },
	                btnDelete: {
	                    show: true,
	                    disabled: false
	                },
	                btnPrint: {
	                    show: true,
	                    disabled: false
	                }
	            };

	            // проверим наличие данных, если есть пропихнем компонентам

	            if (grid.length > 0 && grid[0].data.length > 0) {
	                data = grid[0].data[0].data;
	                dataRow = data.filter(function (row) {
	                    if (row.id === lastRowId) {
	                        return row;
	                    }
	                });
	            } else {
	                return toolbarParams;
	            }

	            if (dataRow.length > 0 && dataRow[0].status == 'Проведен') {
	                // удалять нельзя
	                toolbarParams.btnDelete.show = false;
	            }
	            return toolbarParams;
	        }
	    }]);

	    return Register;
	}(React.PureComponent);

	Register.propTypes = {
	    components: PropTypes.array.isRequired
	};

	module.exports = Register;

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    styles = __webpack_require__(103),
	    Button = __webpack_require__(104),
	    ICON = 'filter';

	var ButtonRegisterFilter = function (_React$PureComponent) {
	    _inherits(ButtonRegisterFilter, _React$PureComponent);

	    // кнопка создания документа в регистрах
	    function ButtonRegisterFilter(props) {
	        _classCallCheck(this, ButtonRegisterFilter);

	        return _possibleConstructorReturn(this, (ButtonRegisterFilter.__proto__ || Object.getPrototypeOf(ButtonRegisterFilter)).call(this, props));
	    }

	    _createClass(ButtonRegisterFilter, [{
	        key: 'handleClick',
	        value: function handleClick(e) {
	            return this.props.onClick();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return React.createElement(
	                Button,
	                {
	                    ref: 'btnFilter',
	                    value: 'Filter',
	                    show: this.props.show,
	                    disabled: this.props.disabled,
	                    onClick: function onClick(e) {
	                        return _this2.handleClick(e);
	                    } },
	                React.createElement('img', { ref: 'image', src: styles.icons[ICON] })
	            );
	        }
	    }]);

	    return ButtonRegisterFilter;
	}(React.PureComponent);

	/*
	ButtonRegisterFilter.propTypes = {
	    onClick: PropTypes.func.isRequired
	}
	*/

	ButtonRegisterFilter.defaultProps = {
	    disabled: false,
	    show: true
	};
	module.exports = ButtonRegisterFilter;

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    ModalPage = __webpack_require__(126),
	    styles = __webpack_require__(139);

	var ModalPageDelete = function (_React$PureComponent) {
	    _inherits(ModalPageDelete, _React$PureComponent);

	    function ModalPageDelete(props) {
	        _classCallCheck(this, ModalPageDelete);

	        var _this = _possibleConstructorReturn(this, (ModalPageDelete.__proto__ || Object.getPrototypeOf(ModalPageDelete)).call(this, props));

	        _this.state = {
	            show: _this.props.show
	        };
	        return _this;
	    }

	    _createClass(ModalPageDelete, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ show: nextProps.show });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var modalObjects = ['btnOk', 'btnCancel'];

	            return React.createElement(
	                ModalPage,
	                { ref: 'modalPage',
	                    modalPageBtnClick: this.props.modalPageBtnClick,
	                    show: this.state.show,
	                    modalPageName: 'Delete document' },
	                React.createElement(
	                    'div',
	                    { ref: 'container' },
	                    React.createElement('img', { ref: 'image', src: styles.icon }),
	                    React.createElement(
	                        'span',
	                        { ref: 'message' },
	                        ' \u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 ? '
	                    )
	                )
	            );
	        }
	    }]);

	    return ModalPageDelete;
	}(React.PureComponent);
	/*
	ModalPageDelete.propTypes = {
	    modalPageBtnClick: PropTypes.func.isRequired
	}
	*/


	module.exports = ModalPageDelete;

/***/ }),

/***/ 139:
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    icon: 'images/icons/delete.png'
	};

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    ModalPage = __webpack_require__(126),
	    styles = __webpack_require__(141);

	var ModalPageInfo = function (_React$PureComponent) {
	    _inherits(ModalPageInfo, _React$PureComponent);

	    function ModalPageInfo(props) {
	        _classCallCheck(this, ModalPageInfo);

	        var _this = _possibleConstructorReturn(this, (ModalPageInfo.__proto__ || Object.getPrototypeOf(ModalPageInfo)).call(this, props));

	        _this.state = {
	            show: _this.props.show
	        };

	        return _this;
	    }

	    _createClass(ModalPageInfo, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ show: nextProps.show });
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var systemMessage = this.props.systemMessage ? this.props.systemMessage : '',
	                modalObjects = ['btnOk'];

	            return React.createElement(
	                ModalPage,
	                { ref: 'modalPage',
	                    modalPageBtnClick: this.props.modalPageBtnClick,
	                    modalPageName: 'Warning!',
	                    modalObjects: modalObjects },
	                React.createElement(
	                    'div',
	                    { ref: 'container' },
	                    React.createElement('img', { ref: 'image', src: styles.icon }),
	                    React.createElement(
	                        'span',
	                        null,
	                        ' ',
	                        systemMessage,
	                        ' '
	                    )
	                )
	            );
	        }
	    }]);

	    return ModalPageInfo;
	}(React.PureComponent);

	ModalPageInfo.propTypes = {
	    systemMessage: PropTypes.string,
	    modalPageBtnClick: PropTypes.func
	};

	module.exports = ModalPageInfo;

/***/ }),

/***/ 141:
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    icon: 'images/icons/info.png'
	};

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    styles = __webpack_require__(143);

	var Tree = function (_React$PureComponent) {
	    _inherits(Tree, _React$PureComponent);

	    function Tree(props) {
	        _classCallCheck(this, Tree);

	        var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props));

	        var idx = 0;

	        if (_this.props.value) {
	            // we got value, we should find index and initilize idx field
	            props.data.forEach(function (row, index) {
	                if (row[props.bindDataField] === props.value) {
	                    // found
	                    idx = index;
	                }
	            });
	        }

	        _this.state = {
	            data: props.data,
	            index: idx,
	            value: props.value
	        };
	        _this.handleLiClick = _this.handleLiClick.bind(_this);
	        return _this;
	    }

	    _createClass(Tree, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { ref: 'tree' },
	                this.getTree('0')
	            );
	        }
	    }, {
	        key: 'handleLiClick',
	        value: function handleLiClick(selectedIndex, selectedId, isNode) {
	            if (!isNode && !isNaN(selectedId)) {
	                // не ноа, а документ
	                var data = this.props.data.filter(function (row, index) {
	                    if (row.id == selectedId) {
	                        //                    selectedIndex = index;
	                        return row;
	                    }
	                }),
	                    value = data[0][this.props.bindDataField];

	                this.setState({
	                    index: selectedIndex,
	                    value: value
	                });

	                if (this.props.onClickAction) {
	                    //@todo избавиться от change
	                    this.props.onClickAction(this.props.name + 'Change', value);
	                }
	            }
	            //ставим метку
	            // сохраняем состояние

	        }
	    }, {
	        key: 'getChildren',
	        value: function getChildren(parentId) {
	            var data = this.state.data;
	            return data.filter(function (row) {
	                if (row.parentid == parentId) {
	                    return row;
	                }
	            });
	        }
	    }, {
	        key: 'getTree',
	        value: function getTree(parentId) {
	            var _this2 = this;

	            var data = this.getChildren(parentId),
	                value = this.state.value;

	            return React.createElement(
	                'ul',
	                { style: styles.ul, ref: 'tree-ul' },
	                data.map(function (subRow, index) {
	                    var style = Object.assign({}, styles.li, value == subRow[_this2.props.bindDataField] && !subRow.is_node ? styles.focused : {}),
	                        refId = 'li-' + index;

	                    return React.createElement(
	                        'li',
	                        { style: style,
	                            onClick: _this2.handleLiClick.bind(_this2, index, subRow.id, subRow.is_node),
	                            key: refId,
	                            ref: refId },
	                        subRow.name,
	                        ' ',
	                        _this2.getTree(subRow.id)
	                    );
	                })
	            );
	        }
	    }]);

	    return Tree;
	}(React.PureComponent);

	Tree.propTypes = {
	    value: PropTypes.string,
	    data: PropTypes.array,
	    bindDataField: PropTypes.string.isRequired
	};

	Tree.defaultProps = {
	    data: [{
	        id: 0,
	        parentId: 0,
	        name: '',
	        kood: '',
	        selected: false
	    }],
	    value: null,
	    bindDataField: 'id'
	};

	module.exports = Tree;

/***/ }),

/***/ 143:
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    ul: {
	        backgroundColor: 'white',
	        marginRight: '20px',
	        paddingLeft: '15px',
	        display: 'list-item'
	    },
	    li: {
	        backgroundColor: 'white',
	        marginRight: '20px'
	    },
	    focused: {
	        backgroundColor: 'lightblue'
	    }
	};

/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var sideBarStyles = __webpack_require__(145),
	    React = __webpack_require__(13);

	var SideBarContainer = function (_React$Component) {
	    _inherits(SideBarContainer, _React$Component);

	    function SideBarContainer(props) {
	        _classCallCheck(this, SideBarContainer);

	        var _this = _possibleConstructorReturn(this, (SideBarContainer.__proto__ || Object.getPrototypeOf(SideBarContainer)).call(this, props));

	        _this.state = {
	            width: props.width,
	            contentWidth: '100%',
	            show: true,
	            toolBar: props.toolbar
	        };

	        _this.btnClickHandler = _this.btnClickHandler.bind(_this);
	        return _this;
	    }

	    _createClass(SideBarContainer, [{
	        key: 'btnClickHandler',
	        value: function btnClickHandler() {
	            var width = this.state.show ? '20px' : this.props.width,
	                contentWidth = this.state.show ? '1px' : '100%',
	                showContent = !this.state.show;

	            this.setState({
	                width: width,
	                contentWidth: contentWidth,
	                show: showContent
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var toolBarSymbol = this.state.show ? '<' : '>'; //@todo move to styles file

	            //prepaire styles
	            var sideBarContainerStyle = Object.assign({}, sideBarStyles.sideBarContainerStyle, { width: this.state.width }, { height: this.props.height }),
	                toolBarStyle = Object.assign({}, sideBarStyles.toolBarStyle, { visibility: this.props.toolbar ? 'visible' : 'hidden' }),
	                contentStyle = Object.assign({}, sideBarStyles.contentStyle, { visibility: this.state.show ? 'visible' : 'hidden' }),
	                buttonStyle = Object.assign({}, sideBarStyles.buttonStyle, {
	                height: this.props.toolbar ? sideBarStyles.buttonStyle.height : '0',
	                visibility: this.props.toolbar ? 'visible' : 'hidden'
	            });

	            return React.createElement(
	                'div',
	                { id: 'toolBarContainer', style: sideBarContainerStyle, ref: 'toolbar' },
	                React.createElement(
	                    'div',
	                    { id: 'btnBar', style: toolBarStyle },
	                    React.createElement('input', { type: 'button',
	                        ref: 'sidebar-button',
	                        style: buttonStyle,
	                        value: toolBarSymbol,
	                        onClick: this.btnClickHandler
	                    })
	                ),
	                React.createElement(
	                    'div',
	                    { id: 'content', style: contentStyle, ref: 'content' },
	                    this.props.children
	                )
	            );
	        }
	    }]);

	    return SideBarContainer;
	}(React.Component);

	SideBarContainer.propTypes = {
	    toolbar: PropTypes.bool,
	    width: PropTypes.string,
	    heigth: PropTypes.string
	};

	SideBarContainer.defaultProps = {
	    toolbar: true,
	    width: '100%',
	    height: '100%'
	};

	module.exports = SideBarContainer;

/***/ }),

/***/ 145:
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    sideBarContainerStyle: {
	        width: '100%',
	        height: '400px',
	        border: '1px solid red',
	        background: 'white'
	    },

	    toolBarStyle: {
	        display: 'flex',
	        height: 'auto',
	        width: '100%',
	        border: '1px solid black',
	        background: 'gray',
	        visibility: 'visible'
	    },
	    contentStyle: {
	        height: 'inherit',
	        width: '100%'
	    },

	    buttonStyle: {
	        position: 'relative',
	        height: '20px',
	        width: '20px'
	    }
	};

/***/ }),

/***/ 146:
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    container: {
	        display: 'flex',
	        flexFlow: 'row wrap',
	        height: '87%',
	        border: '3px solid brown'
	    },
	    wrapper: {
	        display: 'flex',
	        height: '100%',
	        flex: '1 100%',
	        alignItems: 'stretch',
	        flexDirection: 'row'
	    }
	};

/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = __webpack_require__(3);

	var React = __webpack_require__(13),
	    styles = __webpack_require__(148);

	var GridFilter = function (_React$PureComponent) {
	    _inherits(GridFilter, _React$PureComponent);

	    function GridFilter(props) {
	        _classCallCheck(this, GridFilter);

	        var _this = _possibleConstructorReturn(this, (GridFilter.__proto__ || Object.getPrototypeOf(GridFilter)).call(this, props));

	        _this.state = {
	            gridConfig: _this.props.gridConfig, // grid config
	            data: _this.props.data // filter data
	        };
	        _this.handleChange = _this.handleChange.bind(_this);return _this;
	    }

	    _createClass(GridFilter, [{
	        key: 'handleChange',
	        value: function handleChange(e) {
	            var value = e.target.value,
	                id = e.target.name,
	                data = this.state.data,
	                index = void 0;

	            // надо найти элемент массива с данными для этого компонента
	            for (var i = 0; i < data.length; i++) {
	                if (data[i].refs === id) {
	                    index = i;
	                    break;
	                }
	            }

	            if (index) {
	                data[index].value = value;
	                this.setState({ data: data });
	            }
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ gridConfig: nextProps.gridConfig, data: nextProps.data });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            // создаст из полей грида компоненты для формирования условий фильтрации
	            var gridConfig = this.state.gridConfig,
	                data = this.state.data;

	            return React.createElement(
	                'div',
	                { style: styles.fieldset },
	                gridConfig.map(function (row, index) {
	                    var componentType = row.type ? row.type : 'text';

	                    return React.createElement(
	                        'div',
	                        { style: styles.formWidget, key: 'fieldSet-' + row.id },
	                        React.createElement(
	                            'div',
	                            { style: styles.formWidgetLabel },
	                            React.createElement(
	                                'span',
	                                null,
	                                row.name
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { style: styles.formWidgetInput },
	                            React.createElement('input', { style: styles.input,
	                                type: componentType,
	                                title: row.name,
	                                name: row.id,
	                                placeholder: row.name,
	                                ref: row.id,
	                                value: _this2.state.data[row.id],
	                                onChange: _this2.handleChange,
	                                defaultValue: data[row.id]
	                            })
	                        )
	                    );
	                })
	            );
	        }
	    }]);

	    return GridFilter;
	}(React.PureComponent);

	GridFilter.propTypes = {
	    gridConfig: PropTypes.array.isRequired,
	    data: PropTypes.array.isRequired
	};

	module.exports = GridFilter;

/***/ }),

/***/ 148:
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    formWidget: {
	        marginBottom: '5px',
	        display: 'flex',
	        flexDirection: 'row'
	    },
	    formWidgetLabel: {
	        display: 'flex',
	        justifyContent: 'flex-end',
	        width: '40%',
	        marginRight: '10px'
	    },
	    formWidgetInput: {
	        width: '100%',
	        borderRadius: '2px',
	        padding: '3px',
	        border: '0px'
	    },

	    input: {
	        borderRadius: '2px',
	        padding: '5px',
	        display: 'inline-block'

	    },

	    fieldSet: {
	        borderRadius: '2px',
	        margin: '10px'
	    },

	    ui: {
	        borderRadius: '2px',
	        padding: '5px',
	        display: 'inline-block'

	    }

	};

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var flux = __webpack_require__(14),
	    ORDER_BY = [{ column: 'id', direction: 'desc' }];

	var docsStore = flux.createStore({
	    id: 'docsStore',
	    initialState: {
	        docsGrid: 0,
	        docsList: '',
	        name: 'vlad',
	        data: [],
	        sortBy: ORDER_BY,
	        sqlWhere: '',
	        systemMessage: null,
	        userData: {},
	        logedIn: false
	    },
	    actionCallbacks: {
	        systemMessageChange: function systemMessageChange(updater, value) {
	            updater.set({ systemMessage: value });
	        },
	        sqlWhereChange: function sqlWhereChange(updater, value) {
	            updater.set({ sqlWhere: value });
	            requery({ name: 'docsGrid', value: this.docsList });
	        },
	        sortByChange: function sortByChange(updater, value) {
	            updater.set({ sortBy: value });
	            requery({ name: 'docsGrid', value: this.docsList, sortBy: value });
	        },
	        Add: function Add(updater) {
	            add(this.docsList);
	        },
	        Edit: function Edit(updater) {
	            if (this.docsList && this.docsGrid) {
	                edit(this.docsList, this.docsGrid);
	            } else {
	                console.error('Тип документа или документ не выбран');
	            }
	        },
	        Delete: function Delete(updater) {
	            var docTypeId = this.docsList;
	            requeryForAction('delete', function (err, data) {
	                if (err) {
	                    flux.doAction('systemMessageChange', err); // пишем изменения в хранилище
	                } else {
	                    flux.doAction('systemMessageChange', null); // пишем изменения в хранилище
	                    requery({ name: 'docsGrid', value: docTypeId });
	                }
	            });
	        },
	        Print: function Print(updater) {
	            console.log('button Print cliked!');
	        },
	        changeName: function changeName(updater, name) {
	            // Stores updates are only made inside store's action callbacks
	            updater.set({ name: name });
	        },
	        docsGridChange: function docsGridChange(updater, value) {
	            // Stores updates are only made inside store's action callbacks
	            updater.set({ docsGrid: value });
	            localStorage['docsGrid'] = value;
	        },
	        docsListChange: function docsListChange(updater, value) {
	            // Stores updates are only made inside store's action callbacks
	            var lastValue = flux.stores.docsStore.docsList || 'DOK';
	            if (value !== lastValue) {
	                updater.set({ docsList: value });
	                flux.doAction('sortByChange', ORDER_BY);
	            }
	            //            localStorage['docsList'] = value;
	        },
	        dataChange: function dataChange(updater, value) {
	            // Stores updates are only made inside store's action callbacks
	            updater.set({ data: value });
	        },
	        userDataChange: function userDataChange(updater, userDara) {
	            updater.set({ userData: userData });

	            var logedIn = userData ? true : false;
	            updater.set({ logedIn: logedIn });
	        }

	    }
	});

	var edit = function edit(docTypeId, docId) {
	    var url = "/document/" + docTypeId + docId;
	    document.location.href = url;
	};

	var add = function add(docTypeId) {
	    document.location.href = "/document/" + docTypeId + '0';
	};

	var requeryForAction = function requeryForAction(action, callback) {
	    if (!window.jQuery || !$) return; // для тестов

	    // метод обеспечит запрос на выполнение
	    var docId = docsStore.docsGrid,
	        docTypeId = docsStore.docsList;

	    if (!docId || typeof docId == 'string') {
	        docId = 0;
	    }

	    if (!docId) {
	        // doc not selected
	        var data = docsStore.data;
	        data.forEach(function (row) {
	            //@todo Привести в божеский вид
	            if (!docTypeId && row.name == 'docsList') {
	                // не назначен тип документа
	                docTypeId = row['value'];
	                flux.doAction('docsListChange', docTypeId);
	            }

	            if (row.name == 'docsGrid') {
	                docId = row.data[0].data[0].id;
	                flux.doAction('docsGridChange', docId);
	            }
	        });
	    }

	    console.log('docId docTypeId:', docId, docTypeId, docsStore.docsList, docsStore.docsGrid, docsStore.data);

	    var parameters = {
	        docId: docId,
	        doc_type_id: docTypeId
	    };

	    $.ajax({
	        url: '/api/doc',
	        type: "POST",
	        dataType: 'json',
	        data: {
	            action: action,
	            data: JSON.stringify(parameters)
	        },
	        cache: false,
	        success: function success(data) {
	            // должны получить объект - результат
	            var errorMesssage = null;
	            if (data.result == 'Error') {
	                errorMesssage = 'Error, ' + data.message;
	            }

	            callback(errorMesssage, data);
	        },
	        error: function error(xhr, status, err) {
	            console.error('/error', status, err.toString());
	            callback(err, null);
	        }
	    });
	};

	var requery = function requery(component) {
	    if (!window.jQuery) return; // для тестов

	    // метод обеспечит получение данных от сервера
	    // component = this.state.components[name]
	    // если параметры не заданы, грузим все

	    var components = docsStore.data;

	    // фильтруем список компонентов
	    var componentsForUpdate = components.filter(function (item) {
	        // ищем объект по наименованию. или вернем все если параметр не задан
	        //       console.log('component:' + JSON.stringify(component));
	        if (component.name == '' || item.name == component.name) {
	            return item.name;
	        }
	    });

	    // сортировка
	    var sqlSortBy = '',
	        sqlWhere = docsStore.sqlWhere || '',
	        sortByArray = docsStore.sortBy,
	        arrType = typeof sortByArray === 'undefined' ? 'undefined' : _typeof(sortByArray);

	    if (docsStore.sortBy) {
	        for (var i = 0; i < sortByArray.length; i++) {
	            if (i > 0) {
	                sqlSortBy = sqlSortBy + ',';
	            }
	            sqlSortBy = sqlSortBy + sortByArray[i].column + ' ' + sortByArray[i].direction;
	        }
	    }

	    var URL = '/api/docs';
	    $.ajax({
	        url: URL,
	        type: "POST",
	        dataType: 'json',

	        data: {
	            dataType: 'component',
	            docTypeId: 1,
	            components: JSON.stringify(componentsForUpdate), // компоненты для обновления
	            parameter: component.value, // параметры
	            sortBy: sqlSortBy, // сортировка
	            lastDocId: docsStore.docsGrid,
	            sqlWhere: sqlWhere // динамический фильтр грида
	        },
	        cache: false,
	        success: function (data) {
	            // должны получить объект
	            //           console.log('parent arrived data:' + JSON.stringify(data) + 'тип:' + typeof data);

	            data.forEach(function (item) {
	                // find item
	                //console.log('parent Item:' + JSON.stringify(item) );
	                // обновим данные массива компонентов
	                components = components.map(function (component) {
	                    if (component.name == item.name) {
	                        // found
	                        component.data = item.data;
	                    }
	                    return component;
	                });
	            });
	            //            console.log('store data update:' + JSON.stringify(components));
	            flux.doAction('dataChange', components);
	        }.bind(undefined),
	        error: function (xhr, status, err) {
	            console.error('/error', status, err.toString());
	        }.bind(undefined)
	    });
	};

	module.exports = docsStore;

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jcy9kb2MtcmVnaXN0ZXIvZG9jLXJlZ2lzdGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZmlsdGVyL2J1dHRvbi1yZWdpc3Rlci1maWx0ZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1kZWxldGUvbW9kYWxQYWdlLWRlbGV0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWRlbGV0ZS9tb2RhbHBhZ2UtZGVsZXRlLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2UtaW5mby9tb2RhbFBhZ2UtaW5mby5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWluZm8vbW9kYWxwYWdlLWluZm8tc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvdHJlZS90cmVlLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3RyZWUvdHJlZS1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kb2NzL2RvYy1yZWdpc3Rlci9kb2MtcmVnaXN0ZXItc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YS1ncmlkL2dyaWQtZmlsdGVyL2dyaWQtZmlsdGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC9ncmlkLWZpbHRlci9ncmlkLWZpbHRlci1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvc3RvcmVzL2RvY3Nfc3RvcmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVnaXN0ZXIgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL2RvYy1yZWdpc3Rlci9kb2MtcmVnaXN0ZXIuanN4Jyk7XG5cbi8vINC00LDQvdC90YvQtSDQtNC70Y8g0YXRgNCw0L3QuNC70LjRidCwXG4vL2xvY2FsU3RvcmFnZVsnZG9jc1N0b3JlJ10gPSBzdG9yZURhdGE7XG5zdG9yZURhdGEgPSBKU09OLnBhcnNlKHN0b3JlRGF0YSk7XG51c2VyRGF0YSA9IEpTT04ucGFyc2UodXNlckRhdGEpO1xuXG5SZWFjdERPTS5oeWRyYXRlKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVnaXN0ZXIsIHsgaWQ6ICdncmlkJywgY29tcG9uZW50czogc3RvcmVEYXRhLCB1c2VyRGF0YTogdXNlckRhdGEgfSwgJ9Ci0YPRgiDQsdGD0LTRg9GCINC60L7QvNC/0L7QvdC10L3RgtGLJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkJykpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIndXNlIHN0cmljdCc7XG4vLyDQs9GA0YPQt9C40Lwg0LrQvtC80L/QvtC90LXQvdGC0YtcblxuLy9pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcbiAgICBEYXRhR3JpZCA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9kYXRhLWdyaWQvZGF0YS1ncmlkLmpzeCcpLFxuICAgIEJ0bkFkZCA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWFkZC9idXR0b24tcmVnaXN0ZXItYWRkLmpzeCcpLFxuICAgIEJ0bkVkaXQgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeCcpLFxuICAgIEJ0bkRlbGV0ZSA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWRlbGV0ZS9idXR0b24tcmVnaXN0ZXItZGVsZXRlLmpzeCcpLFxuICAgIEJ0blByaW50ID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItcHJpbnQvYnV0dG9uLXJlZ2lzdGVyLXByaW50LmpzeCcpLFxuICAgIEJ0bkZpbHRlciA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWZpbHRlci9idXR0b24tcmVnaXN0ZXItZmlsdGVyLmpzeCcpLFxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxQYWdlLmpzeCcpLFxuICAgIE1vZGFsUGFnZURlbGV0ZSA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWRlbGV0ZS9tb2RhbFBhZ2UtZGVsZXRlLmpzeCcpLFxuICAgIE1vZGFsUGFnZUluZm8gPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1pbmZvL21vZGFsUGFnZS1pbmZvLmpzeCcpLFxuICAgIFRyZWVMaXN0ID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL3RyZWUvdHJlZS5qc3gnKSxcbiAgICBTaWRlYmFyID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci5qc3gnKSxcbiAgICBNZW51VG9vbEJhciA9IHJlcXVpcmUoJy4vLi4vLi4vbWl4aW4vbWVudVRvb2xCYXIuanN4JyksXG4gICAgVG9vbGJhckNvbnRhaW5lciA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy90b29sYmFyLWNvbnRhaW5lci90b29sYmFyLWNvbnRhaW5lci5qc3gnKSxcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2RvYy1yZWdpc3Rlci1zdHlsZXMnKSxcbiAgICBHcmlkRmlsdGVyID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL2RhdGEtZ3JpZC9ncmlkLWZpbHRlci9ncmlkLWZpbHRlci5qc3gnKTtcblxuLy8gQ3JlYXRlIGEgc3RvcmVcbnZhciBkb2NzU3RvcmUgPSByZXF1aXJlKCcuLy4uLy4uL3N0b3Jlcy9kb2NzX3N0b3JlLmpzJyk7XG5cbi8vINGB0L7Qt9C00LDQtdC8INC60LvQsNGB0YEgLSDQtNC10YDQttCw0YLQtdC70Ywg0YHQvtGB0YLQvtGP0L3QuNC5XG5cbnZhciBSZWdpc3RlciA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhSZWdpc3RlciwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gUmVnaXN0ZXIocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlZ2lzdGVyKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoUmVnaXN0ZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihSZWdpc3RlcikpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIC8vINGDINC60LDQttC00L7Qs9C+INC60L7QvNC/0L7QvdC10L3RgtCwINGB0LLQvtC5INC+0LHRitC10LrRglxuICAgICAgICAgICAgZ2V0RmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgIGdldERlbGV0ZU1vZGFsUGFnZTogZmFsc2UsXG4gICAgICAgICAgICBzaG93U3lzdGVtTWVzc2FnZTogZmFsc2UsXG4gICAgICAgICAgICBhY3RpdlJvd0lkOiAwLFxuICAgICAgICAgICAgZmlsdGVyU3RyaW5nOiBudWxsLFxuICAgICAgICAgICAgaXNSZXBvcnQ6IGZhbHNlLFxuICAgICAgICAgICAgdHJlZVZhbHVlOiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIF90aGlzLmNvbXBvbmVudHMgPSBfdGhpcy5wcm9wcy5jb21wb25lbnRzO1xuICAgICAgICBfdGhpcy5maWx0ZXJEYXRhID0gW107IC8vINC80LDRgdGB0LjQsiDQvtCx0YrQtdC60YLQvtCyLCDQutGD0LTQsCDQt9Cw0L/QuNGI0LXQvCDQv9Cw0YDQsNC80LXRgtGA0Ysg0LTQu9GPINGE0LjQu9GM0YLRgNCw0YbQuNC4IEB0b2RvINCy0YvQvdC10YHRgtC4INCy0YHQtSDQsiDQvtGC0LTQtdC70YzQvdGL0Lkg0LrQvtC80L/QvtC90LXRgiDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40LhcblxuICAgICAgICBfdGhpcy5idG5BZGRDbGljayA9IF90aGlzLmJ0bkFkZENsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5idG5FZGl0Q2xpY2sgPSBfdGhpcy5idG5FZGl0Q2xpY2suYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmJ0bkRlbGV0ZUNsaWNrID0gX3RoaXMuYnRuRGVsZXRlQ2xpY2suYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmJ0blByaW50Q2xpY2sgPSBfdGhpcy5idG5QcmludENsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5idG5GaWx0ZXJDbGljayA9IF90aGlzLmJ0bkZpbHRlckNsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5tb2RhbFBhZ2VCdG5DbGljayA9IF90aGlzLm1vZGFsUGFnZUJ0bkNsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5tb2RhbFBhZ2VEZWxCdG5DbGljayA9IF90aGlzLm1vZGFsUGFnZURlbEJ0bkNsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5jbGlja0hhbmRsZXIgPSBfdGhpcy5jbGlja0hhbmRsZXIuYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmRibENsaWNrSGFuZGxlciA9IF90aGlzLmRibENsaWNrSGFuZGxlci5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMuaGVhZGVyQ2xpY2tIYW5kbGVyID0gX3RoaXMuaGVhZGVyQ2xpY2tIYW5kbGVyLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5pc1JlcG9ydHMgPSBfdGhpcy5pc1JlcG9ydHMuYmluZChfdGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhSZWdpc3RlciwgW3tcbiAgICAgICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1INC00LDQvdC90YVcbiAgICAgICAgICAgIGRvY3NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyDQtNCw0L3QvdGL0LUg0LjQt9C80LXQvdC40LvQuNGB0YwsINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHsgY29tcG9uZW50czogZG9jc1N0b3JlLmRhdGEgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0YHRgtGA0L7QutC4INCz0YDQuNC00LBcbiAgICAgICAgICAgIGRvY3NTdG9yZS5vbignY2hhbmdlOmRvY3NHcmlkJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7IGFjdGl2Um93SWQ6IGRvY3NTdG9yZS5kb2NzR3JpZCB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDRgdC40YHRgtC10LzQvdGL0Lkg0LjQt9Cy0LXRidC10L3QuNC1XG4gICAgICAgICAgICBkb2NzU3RvcmUub24oJ2NoYW5nZTpzeXN0ZW1NZXNzYWdlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XG4gICAgICAgICAgICAgICAgdmFyIHN5c3RlbU1lc3NhZ2VTdGF0dXMgPSBuZXdWYWx1ZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHsgc2hvd1N5c3RlbU1lc3NhZ2U6IHN5c3RlbU1lc3NhZ2VTdGF0dXMgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8g0L/QvtC60LDQttC10Lwg0LTQsNC90L3Ri9C1XG5cbiAgICAgICAgICAgIC8vICAgICAgICBsZXQgbGFzdENvbXBvbmVudCA9IGxvY2FsU3RvcmFnZVsnZG9jc0xpc3QnXTtcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCB0aGlzLnByb3BzLmNvbXBvbmVudHMpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuXG4gICAgICAgICAgICB2YXIgY29tcG9uZW50bGlzdCA9IHRoaXMuZmluZENvbXBvbmVudCgnZG9jc0xpc3QnKSxcbiAgICAgICAgICAgICAgICBsaXN0VmFsdWUgPSBjb21wb25lbnRsaXN0WzBdLnZhbHVlIHx8ICcnLFxuICAgICAgICAgICAgICAgIGRhdGFMaXN0ID0gY29tcG9uZW50bGlzdFswXS5kYXRhIHx8IFtdLFxuICAgICAgICAgICAgICAgIHByZXBhaXJlZEdyaWREYXRhID0gdGhpcy5maW5kQ29tcG9uZW50KCdkb2NzR3JpZCcpIHx8IFtdLFxuICAgICAgICAgICAgICAgIGdyaWRDb25maWcgPSBbXSxcbiAgICAgICAgICAgICAgICBncmlkRGF0YSA9IFtdLFxuICAgICAgICAgICAgICAgIHN5c3RlbU1lc3NhZ2UgPSBkb2NzU3RvcmUuc3lzdGVtTWVzc2FnZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJEYXRhID0gdGhpcy5nZXRGaWx0ZXJGaWVsZHMoKTtcblxuICAgICAgICAgICAgdmFyIGJ0blBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBidG5TdGFydDoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnRuTG9naW46IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsNC70LjRh9C40LUg0LTQsNC90L3Ri9GFLCDQtdGB0LvQuCDQtdGB0YLRjCDQv9GA0L7Qv9C40YXQvdC10Lwg0LrQvtC80L/QvtC90LXQvdGC0LDQvFxuICAgICAgICAgICAgaWYgKHByZXBhaXJlZEdyaWREYXRhLmxlbmd0aCA+IDAgJiYgcHJlcGFpcmVkR3JpZERhdGFbMF0uZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZ3JpZENvbmZpZyA9IHByZXBhaXJlZEdyaWREYXRhWzBdLmRhdGFbMF0uY29sdW1ucztcbiAgICAgICAgICAgICAgICBncmlkRGF0YSA9IHByZXBhaXJlZEdyaWREYXRhWzBdLmRhdGFbMF0uZGF0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyByZWY6ICdwYXJlbnREaXYnIH0sXG4gICAgICAgICAgICAgICAgTWVudVRvb2xCYXIoYnRuUGFyYW1zLCB0aGlzLnByb3BzLnVzZXJEYXRhKSxcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckZpbHRlclRvb2xiYXIoKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyByZWY6ICdkb2NDb250YWluZXInLCBzdHlsZTogc3R5bGVzLmNvbnRhaW5lciB9LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckRvY1Rvb2xCYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLndyYXBwZXIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2lkZWJhcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHdpZHRoOiAnMzAlJywgdG9vbGJhcjogdHJ1ZSwgcmVmOiAnbGlzdC1zaWRlYmFyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVHJlZUxpc3QsIHsgcmVmOiAndHJlZUxpc3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhTGlzdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2RvY3NMaXN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGFGaWVsZDogJ2tvb2QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbGlzdFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrQWN0aW9uOiB0aGlzLmNsaWNrSGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2VBY3Rpb246ICdkb2NzTGlzdENoYW5nZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmNvbnRhaW5lciB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQXJ1YW5uZVBhZ2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaWRlYmFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRvb2xiYXI6IGZhbHNlLCByZWY6ICdncmlkLXNpZGViYXInLCBoZWlnaHQ6ICc0MDBweCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhR3JpZCwgeyByZWY6ICdkYXRhR3JpZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkRGF0YTogZ3JpZERhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkQ29sdW1uczogZ3JpZENvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlQWN0aW9uOiAnZG9jc0dyaWRDaGFuZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5jbGlja0hhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRibENsaWNrOiB0aGlzLmRibENsaWNrSGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uSGVhZGVyQ2xpY2s6IHRoaXMuaGVhZGVyQ2xpY2tIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHByZXBhaXJlZEdyaWREYXRhWzBdLmxhc3REb2NJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ2FwaScgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RhbFBhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHJlZjogJ21vZGFscGFnZUZpbHRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlQnRuQ2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogJ0ZpbHRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdGhpcy5zdGF0ZS5nZXRGaWx0ZXIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEZpbHRlciwgeyByZWY6ICdncmlkRmlsdGVyJywgZ3JpZENvbmZpZzogZ3JpZENvbmZpZywgZGF0YTogZmlsdGVyRGF0YSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZURlbGV0ZSwgeyByZWY6ICdtb2RhbHBhZ2VEZWxldGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlRGVsQnRuQ2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0aGlzLnN0YXRlLmdldERlbGV0ZU1vZGFsUGFnZSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2VJbmZvLCB7IHJlZjogJ21vZGFscGFnZUluZm8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlSW5mb0J0bkNsaWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdGhpcy5zdGF0ZS5zaG93U3lzdGVtTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5c3RlbU1lc3NhZ2U6IHN5c3RlbU1lc3NhZ2UgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog0JLQtdGA0L3QtdGCINC60L7QvNC/0L7QvdC10L3RgiDQntGC0YfQtdGCLCDQtdGB0LvQuCDQstGL0LHRgNCw0L3QvdCw0Y8g0LLQtdGC0LrQsCDRgdC+0LTQtdGA0LbQuNGCINGC0LjQvyA9PSBhcnVhbm5lXHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW58WE1MfVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXJBcnVhbm5lUGFnZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJBcnVhbm5lUGFnZSgpIHtcbiAgICAgICAgICAgIHZhciBpc1JlcG9ydCA9IHRoaXMuaXNSZXBvcnRzKHRoaXMuc3RhdGUudHJlZVZhbHVlKTtcbiAgICAgICAgICAgIHZhciBDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIFNpZGViYXIsXG4gICAgICAgICAgICAgICAgeyB0b29sYmFyOiB0cnVlLCByZWY6ICdhcnVhbm5lLXNpZGViYXInLCBoZWlnaHQ6ICcxMDAlJyB9LFxuICAgICAgICAgICAgICAgICdBcnVhbm5lJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBpc1JlcG9ydCAmJiBDb21wb25lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiDQktC10YDQvdC10YIg0LrQvtC80L/QvtC90LXRgiAtINC/0LDQvdC10LvRjCDQuNC90YHRgtGA0YPQvNC10L3RgtC+0LIg0LTQvtC60YPQvNC10L3RgtCwXHJcbiAgICAgICAgICogQHJldHVybnMge1hNTH1cclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyRG9jVG9vbEJhcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJEb2NUb29sQmFyKCkge1xuICAgICAgICAgICAgdmFyIHRvb2xiYXJQYXJhbXMgPSB0aGlzLnByZXBhcmVQYXJhbXNGb3JUb29sYmFyKCk7IC8v0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDQutC90L7Qv9C+0Log0YPQv9GA0LDQstC70LXQvdC40Y8sINCy0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINCw0LrRgtC40LLQvdC+0Lkg0YHRgtGA0L7QutC4XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIFRvb2xiYXJDb250YWluZXIsXG4gICAgICAgICAgICAgICAgeyByZWY6ICd0b29sYmFyQ29udGFpbmVyJyB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ0bkFkZCwgeyBvbkNsaWNrOiB0aGlzLmJ0bkFkZENsaWNrLCBzaG93OiB0b29sYmFyUGFyYW1zWydidG5BZGQnXS5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZTogdG9vbGJhclBhcmFtc1snYnRuQWRkJ10uZGlzYWJsZWQgfSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuRWRpdCwgeyBvbkNsaWNrOiB0aGlzLmJ0bkVkaXRDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuRWRpdCddLnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlOiB0b29sYmFyUGFyYW1zWydidG5FZGl0J10uZGlzYWJsZWQgfSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuRGVsZXRlLCB7IG9uQ2xpY2s6IHRoaXMuYnRuRGVsZXRlQ2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0bkRlbGV0ZSddLnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlOiB0b29sYmFyUGFyYW1zWydidG5EZWxldGUnXS5kaXNhYmxlZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5QcmludCwgeyBvbkNsaWNrOiB0aGlzLmJ0blByaW50Q2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0blByaW50J10uc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGU6IHRvb2xiYXJQYXJhbXNbJ2J0blByaW50J10uZGlzYWJsZWQgfSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuRmlsdGVyLCB7IG9uQ2xpY2s6IHRoaXMuYnRuRmlsdGVyQ2xpY2sgfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog0JLQtdGA0L3QtdGCINC60L7QvNC/0L7QvdC10YIg0YEg0LTQsNC90L3Ri9C80Lgg0YTQuNC70YzRgtGA0LBcclxuICAgICAgICAgKiBAcmV0dXJucyB7WE1MfVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXJGaWx0ZXJUb29sYmFyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckZpbHRlclRvb2xiYXIoKSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVyU3RyaW5nID0gdGhpcy5nZXRGaWx0ZXJTdHJpbmcoKTtcbiAgICAgICAgICAgIHZhciBjb21wb25lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIFRvb2xiYXJDb250YWluZXIsXG4gICAgICAgICAgICAgICAgeyByZWY6ICdmaWx0ZXJUb29sYmFyQ29udGFpbmVyJywgcG9zaXRpb246ICdsZWZ0JyB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgJ0ZpbHRlcjogJyxcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlclN0cmluZyAmJiBjb21wb25lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiDQn9GA0L7QsNC90LDQu9C40LfQuNGA0YPQtdGCINGB0LLQvtC50YHRgtCy0LAg0LLRi9Cx0YDQsNC90L3QvtCz0L4g0LTQvtC60YPQvNC10L3RgtCwINC4INCy0LXRgNC90LXRgiB0cnVlICwg0LXRgdC70Lgg0YLQuNC/ID09IEFydWFubmVcclxuICAgICAgICAgKiBAcGFyYW0gZG9jdW1lbnRcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaXNSZXBvcnRzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGlzUmVwb3J0cyhkb2N1bWVudCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmZpbmRDb21wb25lbnQoJ2RvY3NMaXN0JylbMF0uZGF0YSxcbiAgICAgICAgICAgICAgICBkb2N1bWVudERhdGEgPSBkYXRhLmZpbHRlcihmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvdy5rb29kID09PSBkb2N1bWVudCAmJiByb3cucHJvcHMgJiYgSlNPTi5wYXJzZShyb3cucHJvcHMpLnR5cGUgPT09ICdhcnVhbm5lJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gISFkb2N1bWVudERhdGEubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdmaW5kQ29tcG9uZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGZpbmRDb21wb25lbnQoY29tcG9uZW50TmFtZSkge1xuICAgICAgICAgICAgLy8g0LLQtdGA0L3QtdGCINC00LDQvdC90YvQtSDQutC+0LzQv9C+0L3QtdC90YLQsCDQv9C+INC10LPQviDQvdCw0LfQstCw0L3QuNGOXG4gICAgICAgICAgICB2YXIgY29tcG9uZW50RGF0YSA9IFtdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb21wb25lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnREYXRhID0gdGhpcy5jb21wb25lbnRzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5uYW1lID09IGNvbXBvbmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50RGF0YTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYnRuRmlsdGVyQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnRuRmlsdGVyQ2xpY2soKSB7XG4gICAgICAgICAgICAvLyDQvtGC0LrRgNC+0LXRgiDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L4g0YEg0L/QvtC70Y/QvNC4INC00LvRjyDRhNC40LvRjNGC0YDQsNGG0LjQuFxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGdldEZpbHRlcjogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYnRuRGVsZXRlQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnRuRGVsZXRlQ2xpY2soKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZ2V0RGVsZXRlTW9kYWxQYWdlOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdidG5BZGRDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidG5BZGRDbGljaygpIHtcbiAgICAgICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC60LvQuNC6INC60L3QvtC/0LrQuCBcItCU0L7QsdCw0LLQuNGC0YxcIlxuICAgICAgICAgICAgLy8g0LLRi9C30L7QstC10Lwg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGE0LvQsNC60YHQtVxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignQWRkJyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2J0bkVkaXRDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidG5FZGl0Q2xpY2soKSB7XG4gICAgICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQutC70LjQuiDQutC90L7Qv9C60LggXCLQmNC30LzQtdC90LjRgtGMXCJcbiAgICAgICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ0VkaXQnKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYnRuUHJpbnRDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidG5QcmludENsaWNrKCkge1xuICAgICAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0LrQu9C40Log0LrQvdC+0L/QutC4IFwi0JjQt9C80LXQvdC40YLRjFwiXG4gICAgICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdQcmludCcpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjbGlja0hhbmRsZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY2xpY2tIYW5kbGVyKGFjdGlvbiwgaWQpIHtcbiAgICAgICAgICAgIC8vINGB0L7RhdGA0LDQvdC40Lwg0LIg0YXRgNCw0L3QuNC70LjRidC1XG4gICAgICAgICAgICBpZiAoYWN0aW9uICYmIGlkKSB7XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbihhY3Rpb24sIGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0cmVlVmFsdWU6IGlkIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkYmxDbGlja0hhbmRsZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGJsQ2xpY2tIYW5kbGVyKCkge1xuICAgICAgICAgICAgLy8g0LLRi9C30L7QstC10YIg0LzQtdGC0L7QtCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdFZGl0Jyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hlYWRlckNsaWNrSGFuZGxlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoZWFkZXJDbGlja0hhbmRsZXIoc29ydEJ5KSB7XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzb3J0QnlDaGFuZ2UnLCBzb3J0QnkpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdtb2RhbFBhZ2VCdG5DbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBtb2RhbFBhZ2VCdG5DbGljayhidG5FdmVudCkge1xuICAgICAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LTQu9GPINC60L3QvtC/0LrQuCDRhNC40LvRjNGC0YDQsNGG0LjQuFxuICAgICAgICAgICAgdmFyIGZpbHRlclN0cmluZyA9ICcnO1xuICAgICAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcbiAgICAgICAgICAgICAgICAvLyDRgdC+0LHQuNGA0LDQtdC8INC00LDQvdC90YvQtVxuICAgICAgICAgICAgICAgIHZhciBncmlkRmlsdGVyID0gdGhpcy5yZWZzWydncmlkRmlsdGVyJ10sXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlckRhdGEgPSBncmlkRmlsdGVyLnN0YXRlLmRhdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEgPSBmaWx0ZXJEYXRhLm1hcChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIChmaWx0ZXJTdHJpbmcubGVuZ3RoID4gMCA/IFwiIGFuZCBcIiA6IFwiIHdoZXJlIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocm93LnR5cGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSBmaWx0ZXJTdHJpbmcgKyByb3cucmVmcyArIFwiIGlsaWtlICclXCIgKyByb3cudmFsdWUgKyBcIiUnXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgaWxpa2UgJ1wiICsgcm93LnZhbHVlICsgXCIlJ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgcm93LnJlZnMgKyBcIiA9ICdcIiArIHJvdy52YWx1ZSArIFwiJ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSBmaWx0ZXJTdHJpbmcgKyByb3cucmVmcyArIFwiID0gXCIgKyByb3cudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ludGVnZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSBmaWx0ZXJTdHJpbmcgKyByb3cucmVmcyArIFwiID0gXCIgKyByb3cudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByb3c7XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgLy8g0L/RgNC40LzQtdC90LXQvCDRhNC40LvRjNGC0YBcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzcWxXaGVyZUNoYW5nZScsIGZpbHRlclN0cmluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZ2V0RmlsdGVyOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbW9kYWxQYWdlRGVsQnRuQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbW9kYWxQYWdlRGVsQnRuQ2xpY2soYnRuRXZlbnQpIHtcbiAgICAgICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INCy0YvQt9C+0LLQsCDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsCDRg9C00LDQu9C10L3QuNGPXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZ2V0RGVsZXRlTW9kYWxQYWdlOiBmYWxzZSB9KTtcblxuICAgICAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcbiAgICAgICAgICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignRGVsZXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ21vZGFsUGFnZUluZm9CdG5DbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBtb2RhbFBhZ2VJbmZvQnRuQ2xpY2soKSB7XG5cbiAgICAgICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INCy0YvQt9C+0LLQsCDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsCDRgdC40YHRgtC10LzQvdC+0LPQviDRgdC+0L7QsdGJ0LXQvdC40Y9cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93U3lzdGVtTWVzc2FnZTogZmFsc2UgfSk7XG4gICAgICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzeXN0ZW1NZXNzYWdlQ2hhbmdlJywgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldEZpbHRlckZpZWxkcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRGaWx0ZXJGaWVsZHMoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgLy8g0YHQvtC30LTQsNGB0YIg0LjQtyDQv9C+0Lt00Lkg0LPRgNC40LTQsCDQutC+0LzQv9C+0L3QtdC90YLRiyDQtNC70Y8g0YTQvtGA0LzQuNGA0L7QstCw0L3QuNGPINGD0YHQu9C+0LLQuNC5INGE0LjQu9GM0YLRgNCw0YbQuNC4XG4gICAgICAgICAgICB2YXIgZ3JpZENvbXBvbmVudHMgPSBkb2NzU3RvcmUuZGF0YSxcbiAgICAgICAgICAgICAgICBncmlkRGF0YSA9IFtdLFxuICAgICAgICAgICAgICAgIHByZXZpb3NGaWx0ZXIgPSB0aGlzLmZpbHRlckRhdGE7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JpZENvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZENvbXBvbmVudHNbaV1bJ25hbWUnXSA9PSAnZG9jc0dyaWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vINC40YnQtdC8INC/0L7Qu9C1IGNvbHVtbnNcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZmllbGQgaW4gZ3JpZENvbXBvbmVudHNbaV0uZGF0YVswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkID09ICdjb2x1bW5zJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWREYXRhID0gZ3JpZENvbXBvbmVudHNbaV0uZGF0YVswXS5jb2x1bW5zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdyaWREYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhID0gW107IC8vINC+0LHQvdGD0LvQuNC8INC80LDRgdGB0LjQslxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyRmllbGRzID0gZ3JpZERhdGEubWFwKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudFR5cGUgPSAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRPYmpla3RWYWx1ZSA9IHZvaWQgMDtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgcHJldmlvc0ZpbHRlci5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINC40YnQtdC8IFwi0YHRgtCw0YDQvtC1XCIg0LfQvdCw0YfQtdC90LjQtSDRhNC40LvRjNGC0YDQsCDQuCDQtdGB0LvQuCDQtdGB0YLRjCwg0YLQviDQvtGC0LTQsNC10Lwg0LXQs9C+IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvc0ZpbHRlcltfaV0ucmVmcyA9PSByb3cuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRPYmpla3RWYWx1ZSA9IHByZXZpb3NGaWx0ZXJbX2ldLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlID0gcm93LnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LHQtdGA0LXQvCDQvNCw0YHRgdC40LIg0L7QsdGK0LXQutGC0L7QslxuICAgICAgICAgICAgICAgICAgICBfdGhpczIuZmlsdGVyRGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJvdy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNvbXBvbmVudE9iamVrdFZhbHVlIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBjb21wb25lbnRUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmczogcm93LmlkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g0L7QsdC90L7QstC40Lwg0YHRgtGA0L7QutGDINGE0LjQu9GM0YLRgNCw0YbQuNC4XG4gICAgICAgICAgICB0aGlzLmdldEZpbHRlclN0cmluZygpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyRGF0YTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0RmlsdGVyU3RyaW5nJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEZpbHRlclN0cmluZygpIHtcbiAgICAgICAgICAgIC8vINC/0YDQtdC+0LHRgNCw0LfRg9C10YIg0LTQsNC90L3Ri9C1INGE0LjQu9GC0YDQsCDQsiDRgdGC0YDQvtC60YNcbiAgICAgICAgICAgIHZhciBzdHJpbmcgPSAnJztcblxuICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhLm1hcChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvdy52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmcgKyByb3cubmFtZSArICc6JyArIHJvdy52YWx1ZSArICc7ICc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwcmVwYXJlUGFyYW1zRm9yVG9vbGJhcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVwYXJlUGFyYW1zRm9yVG9vbGJhcigpIHtcbiAgICAgICAgICAgIC8vINGH0LjRgtCw0LXQvCDQtNCw0L3QvdGL0LUg0YHQviDRgdGC0L7RgNCwLCDRhNC+0YDQvNC40YDRg9C10Lwg0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDQutC90L7Qv9C+0Log0YPQv9GA0LDQstC70LXQvdC40Y8sINC4INGC0YPQtNCwINC40YUg0L7RgtC00LDQtdC8XG4gICAgICAgICAgICAvL2RvY3NHcmlkQ2hhbmdlIChmbHV4LnN0b3Jlcy5kb2NzU3RvcmUuKVxuICAgICAgICAgICAgdmFyIGdyaWQgPSB0aGlzLmZpbmRDb21wb25lbnQoJ2RvY3NHcmlkJykgfHwgW10sXG4gICAgICAgICAgICAgICAgbGFzdFJvd0lkID0gdGhpcy5zdGF0ZS5hY3RpdlJvd0lkLFxuICAgICAgICAgICAgICAgIGRhdGEgPSBbXSxcbiAgICAgICAgICAgICAgICBkYXRhUm93ID0gW10sXG4gICAgICAgICAgICAgICAgdG9vbGJhclBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBidG5BZGQ6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBidG5FZGl0OiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnRuRGVsZXRlOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnRuUHJpbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LjQvCDQvdCw0LvQuNGH0LjQtSDQtNCw0L3QvdGL0YUsINC10YHQu9C4INC10YHRgtGMINC/0YDQvtC/0LjRhdC90LXQvCDQutC+0LzQv9C+0L3QtdC90YLQsNC8XG5cbiAgICAgICAgICAgIGlmIChncmlkLmxlbmd0aCA+IDAgJiYgZ3JpZFswXS5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZ3JpZFswXS5kYXRhWzBdLmRhdGE7XG4gICAgICAgICAgICAgICAgZGF0YVJvdyA9IGRhdGEuZmlsdGVyKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5pZCA9PT0gbGFzdFJvd0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b29sYmFyUGFyYW1zO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGF0YVJvdy5sZW5ndGggPiAwICYmIGRhdGFSb3dbMF0uc3RhdHVzID09ICfQn9GA0L7QstC10LTQtdC9Jykge1xuICAgICAgICAgICAgICAgIC8vINGD0LTQsNC70Y/RgtGMINC90LXQu9GM0LfRj1xuICAgICAgICAgICAgICAgIHRvb2xiYXJQYXJhbXMuYnRuRGVsZXRlLnNob3cgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0b29sYmFyUGFyYW1zO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFJlZ2lzdGVyO1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuUmVnaXN0ZXIucHJvcFR5cGVzID0ge1xuICAgIGNvbXBvbmVudHM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZ2lzdGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy9kb2MtcmVnaXN0ZXIvZG9jLXJlZ2lzdGVyLmpzeFxuLy8gbW9kdWxlIGlkID0gMTM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXG4gICAgSUNPTiA9ICdmaWx0ZXInO1xuXG52YXIgQnV0dG9uUmVnaXN0ZXJGaWx0ZXIgPSBmdW5jdGlvbiAoX1JlYWN0JFB1cmVDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoQnV0dG9uUmVnaXN0ZXJGaWx0ZXIsIF9SZWFjdCRQdXJlQ29tcG9uZW50KTtcblxuICAgIC8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcbiAgICBmdW5jdGlvbiBCdXR0b25SZWdpc3RlckZpbHRlcihwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQnV0dG9uUmVnaXN0ZXJGaWx0ZXIpO1xuXG4gICAgICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQnV0dG9uUmVnaXN0ZXJGaWx0ZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihCdXR0b25SZWdpc3RlckZpbHRlcikpLmNhbGwodGhpcywgcHJvcHMpKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQnV0dG9uUmVnaXN0ZXJGaWx0ZXIsIFt7XG4gICAgICAgIGtleTogJ2hhbmRsZUNsaWNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uQ2xpY2soKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBCdXR0b24sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZWY6ICdidG5GaWx0ZXInLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0ZpbHRlcicsXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5oYW5kbGVDbGljayhlKTtcbiAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHsgcmVmOiAnaW1hZ2UnLCBzcmM6IHN0eWxlcy5pY29uc1tJQ09OXSB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBCdXR0b25SZWdpc3RlckZpbHRlcjtcbn0oUmVhY3QuUHVyZUNvbXBvbmVudCk7XG5cbi8qXHJcbkJ1dHRvblJlZ2lzdGVyRmlsdGVyLnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufVxyXG4qL1xuXG5CdXR0b25SZWdpc3RlckZpbHRlci5kZWZhdWx0UHJvcHMgPSB7XG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNob3c6IHRydWVcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblJlZ2lzdGVyRmlsdGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWZpbHRlci9idXR0b24tcmVnaXN0ZXItZmlsdGVyLmpzeFxuLy8gbW9kdWxlIGlkID0gMTM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4uL21vZGFsUGFnZS5qc3gnKSxcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuLi9tb2RhbHBhZ2UtZGVsZXRlL21vZGFscGFnZS1kZWxldGUtc3R5bGVzJyk7XG5cbnZhciBNb2RhbFBhZ2VEZWxldGUgPSBmdW5jdGlvbiAoX1JlYWN0JFB1cmVDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoTW9kYWxQYWdlRGVsZXRlLCBfUmVhY3QkUHVyZUNvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBNb2RhbFBhZ2VEZWxldGUocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1vZGFsUGFnZURlbGV0ZSk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKE1vZGFsUGFnZURlbGV0ZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1vZGFsUGFnZURlbGV0ZSkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNob3c6IF90aGlzLnByb3BzLnNob3dcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhNb2RhbFBhZ2VEZWxldGUsIFt7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93OiBuZXh0UHJvcHMuc2hvdyB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBtb2RhbE9iamVjdHMgPSBbJ2J0bk9rJywgJ2J0bkNhbmNlbCddO1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBNb2RhbFBhZ2UsXG4gICAgICAgICAgICAgICAgeyByZWY6ICdtb2RhbFBhZ2UnLFxuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5wcm9wcy5tb2RhbFBhZ2VCdG5DbGljayxcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdGhpcy5zdGF0ZS5zaG93LFxuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VOYW1lOiAnRGVsZXRlIGRvY3VtZW50JyB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IHJlZjogJ2NvbnRhaW5lcicgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnaW1nJywgeyByZWY6ICdpbWFnZScsIHNyYzogc3R5bGVzLmljb24gfSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHJlZjogJ21lc3NhZ2UnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnIFxcdTA0MjNcXHUwNDM0XFx1MDQzMFxcdTA0M0JcXHUwNDM4XFx1MDQ0MlxcdTA0NEMgXFx1MDQzNFxcdTA0M0VcXHUwNDNBXFx1MDQ0M1xcdTA0M0NcXHUwNDM1XFx1MDQzRFxcdTA0NDIgPyAnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIE1vZGFsUGFnZURlbGV0ZTtcbn0oUmVhY3QuUHVyZUNvbXBvbmVudCk7XG4vKlxyXG5Nb2RhbFBhZ2VEZWxldGUucHJvcFR5cGVzID0ge1xyXG4gICAgbW9kYWxQYWdlQnRuQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufVxyXG4qL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWxQYWdlRGVsZXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWRlbGV0ZS9tb2RhbFBhZ2UtZGVsZXRlLmpzeFxuLy8gbW9kdWxlIGlkID0gMTM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaWNvbjogJ2ltYWdlcy9pY29ucy9kZWxldGUucG5nJ1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1kZWxldGUvbW9kYWxwYWdlLWRlbGV0ZS1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDEzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBNb2RhbFBhZ2UgPSByZXF1aXJlKCcuLi9tb2RhbFBhZ2UuanN4JyksXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi4vbW9kYWxwYWdlLWluZm8vbW9kYWxwYWdlLWluZm8tc3R5bGVzJyk7XG5cbnZhciBNb2RhbFBhZ2VJbmZvID0gZnVuY3Rpb24gKF9SZWFjdCRQdXJlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKE1vZGFsUGFnZUluZm8sIF9SZWFjdCRQdXJlQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIE1vZGFsUGFnZUluZm8ocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1vZGFsUGFnZUluZm8pO1xuXG4gICAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChNb2RhbFBhZ2VJbmZvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTW9kYWxQYWdlSW5mbykpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNob3c6IF90aGlzLnByb3BzLnNob3dcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKE1vZGFsUGFnZUluZm8sIFt7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93OiBuZXh0UHJvcHMuc2hvdyB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblxuICAgICAgICAgICAgdmFyIHN5c3RlbU1lc3NhZ2UgPSB0aGlzLnByb3BzLnN5c3RlbU1lc3NhZ2UgPyB0aGlzLnByb3BzLnN5c3RlbU1lc3NhZ2UgOiAnJyxcbiAgICAgICAgICAgICAgICBtb2RhbE9iamVjdHMgPSBbJ2J0bk9rJ107XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIE1vZGFsUGFnZSxcbiAgICAgICAgICAgICAgICB7IHJlZjogJ21vZGFsUGFnZScsXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLnByb3BzLm1vZGFsUGFnZUJ0bkNsaWNrLFxuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VOYW1lOiAnV2FybmluZyEnLFxuICAgICAgICAgICAgICAgICAgICBtb2RhbE9iamVjdHM6IG1vZGFsT2JqZWN0cyB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IHJlZjogJ2NvbnRhaW5lcicgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnaW1nJywgeyByZWY6ICdpbWFnZScsIHNyYzogc3R5bGVzLmljb24gfSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzdGVtTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICcgJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBNb2RhbFBhZ2VJbmZvO1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuTW9kYWxQYWdlSW5mby5wcm9wVHlwZXMgPSB7XG4gICAgc3lzdGVtTWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtb2RhbFBhZ2VCdG5DbGljazogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWxQYWdlSW5mbztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1pbmZvL21vZGFsUGFnZS1pbmZvLmpzeFxuLy8gbW9kdWxlIGlkID0gMTQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaWNvbjogJ2ltYWdlcy9pY29ucy9pbmZvLnBuZydcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2UtaW5mby9tb2RhbHBhZ2UtaW5mby1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL3RyZWUtc3R5bGVzLmpzJyk7XG5cbnZhciBUcmVlID0gZnVuY3Rpb24gKF9SZWFjdCRQdXJlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKFRyZWUsIF9SZWFjdCRQdXJlQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIFRyZWUocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRyZWUpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChUcmVlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVHJlZSkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICB2YXIgaWR4ID0gMDtcblxuICAgICAgICBpZiAoX3RoaXMucHJvcHMudmFsdWUpIHtcbiAgICAgICAgICAgIC8vIHdlIGdvdCB2YWx1ZSwgd2Ugc2hvdWxkIGZpbmQgaW5kZXggYW5kIGluaXRpbGl6ZSBpZHggZmllbGRcbiAgICAgICAgICAgIHByb3BzLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93LCBpbmRleCkge1xuICAgICAgICAgICAgICAgIGlmIChyb3dbcHJvcHMuYmluZERhdGFGaWVsZF0gPT09IHByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZvdW5kXG4gICAgICAgICAgICAgICAgICAgIGlkeCA9IGluZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBkYXRhOiBwcm9wcy5kYXRhLFxuICAgICAgICAgICAgaW5kZXg6IGlkeCxcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZVxuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5oYW5kbGVMaUNsaWNrID0gX3RoaXMuaGFuZGxlTGlDbGljay5iaW5kKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhUcmVlLCBbe1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyByZWY6ICd0cmVlJyB9LFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VHJlZSgnMCcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVMaUNsaWNrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUxpQ2xpY2soc2VsZWN0ZWRJbmRleCwgc2VsZWN0ZWRJZCwgaXNOb2RlKSB7XG4gICAgICAgICAgICBpZiAoIWlzTm9kZSAmJiAhaXNOYU4oc2VsZWN0ZWRJZCkpIHtcbiAgICAgICAgICAgICAgICAvLyDQvdC1INC90L7QsCwg0LAg0LTQvtC60YPQvNC10L3RglxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5wcm9wcy5kYXRhLmZpbHRlcihmdW5jdGlvbiAocm93LCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocm93LmlkID09IHNlbGVjdGVkSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVswXVt0aGlzLnByb3BzLmJpbmREYXRhRmllbGRdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBzZWxlY3RlZEluZGV4LFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2tBY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgLy9AdG9kbyDQuNC30LHQsNCy0LjRgtGM0YHRjyDQvtGCIGNoYW5nZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2tBY3Rpb24odGhpcy5wcm9wcy5uYW1lICsgJ0NoYW5nZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL9GB0YLQsNCy0LjQvCDQvNC10YLQutGDXG4gICAgICAgICAgICAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XG5cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0Q2hpbGRyZW4nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2hpbGRyZW4ocGFyZW50SWQpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGEuZmlsdGVyKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICAgICAgICBpZiAocm93LnBhcmVudGlkID09IHBhcmVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByb3c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldFRyZWUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VHJlZShwYXJlbnRJZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5nZXRDaGlsZHJlbihwYXJlbnRJZCksXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnN0YXRlLnZhbHVlO1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAndWwnLFxuICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy51bCwgcmVmOiAndHJlZS11bCcgfSxcbiAgICAgICAgICAgICAgICBkYXRhLm1hcChmdW5jdGlvbiAoc3ViUm93LCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMubGksIHZhbHVlID09IHN1YlJvd1tfdGhpczIucHJvcHMuYmluZERhdGFGaWVsZF0gJiYgIXN1YlJvdy5pc19ub2RlID8gc3R5bGVzLmZvY3VzZWQgOiB7fSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZJZCA9ICdsaS0nICsgaW5kZXg7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGknLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogX3RoaXMyLmhhbmRsZUxpQ2xpY2suYmluZChfdGhpczIsIGluZGV4LCBzdWJSb3cuaWQsIHN1YlJvdy5pc19ub2RlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHJlZklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogcmVmSWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YlJvdy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMyLmdldFRyZWUoc3ViUm93LmlkKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFRyZWU7XG59KFJlYWN0LlB1cmVDb21wb25lbnQpO1xuXG5UcmVlLnByb3BUeXBlcyA9IHtcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkYXRhOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgYmluZERhdGFGaWVsZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG59O1xuXG5UcmVlLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBkYXRhOiBbe1xuICAgICAgICBpZDogMCxcbiAgICAgICAgcGFyZW50SWQ6IDAsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBrb29kOiAnJyxcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlXG4gICAgfV0sXG4gICAgdmFsdWU6IG51bGwsXG4gICAgYmluZERhdGFGaWVsZDogJ2lkJ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmVlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy90cmVlL3RyZWUuanN4XG4vLyBtb2R1bGUgaWQgPSAxNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bDoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXG4gICAgICAgIG1hcmdpblJpZ2h0OiAnMjBweCcsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiAnMTVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdsaXN0LWl0ZW0nXG4gICAgfSxcbiAgICBsaToge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXG4gICAgICAgIG1hcmdpblJpZ2h0OiAnMjBweCdcbiAgICB9LFxuICAgIGZvY3VzZWQ6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnbGlnaHRibHVlJ1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3RyZWUvdHJlZS1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIHNpZGVCYXJTdHlsZXMgPSByZXF1aXJlKCcuL3NpZGViYXItc3R5bGVzJyksXG4gICAgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgU2lkZUJhckNvbnRhaW5lciA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKFNpZGVCYXJDb250YWluZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gU2lkZUJhckNvbnRhaW5lcihwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU2lkZUJhckNvbnRhaW5lcik7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFNpZGVCYXJDb250YWluZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTaWRlQmFyQ29udGFpbmVyKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgd2lkdGg6IHByb3BzLndpZHRoLFxuICAgICAgICAgICAgY29udGVudFdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgdG9vbEJhcjogcHJvcHMudG9vbGJhclxuICAgICAgICB9O1xuXG4gICAgICAgIF90aGlzLmJ0bkNsaWNrSGFuZGxlciA9IF90aGlzLmJ0bkNsaWNrSGFuZGxlci5iaW5kKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhTaWRlQmFyQ29udGFpbmVyLCBbe1xuICAgICAgICBrZXk6ICdidG5DbGlja0hhbmRsZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnRuQ2xpY2tIYW5kbGVyKCkge1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5zdGF0ZS5zaG93ID8gJzIwcHgnIDogdGhpcy5wcm9wcy53aWR0aCxcbiAgICAgICAgICAgICAgICBjb250ZW50V2lkdGggPSB0aGlzLnN0YXRlLnNob3cgPyAnMXB4JyA6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICBzaG93Q29udGVudCA9ICF0aGlzLnN0YXRlLnNob3c7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgICAgICBjb250ZW50V2lkdGg6IGNvbnRlbnRXaWR0aCxcbiAgICAgICAgICAgICAgICBzaG93OiBzaG93Q29udGVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgdG9vbEJhclN5bWJvbCA9IHRoaXMuc3RhdGUuc2hvdyA/ICc8JyA6ICc+JzsgLy9AdG9kbyBtb3ZlIHRvIHN0eWxlcyBmaWxlXG5cbiAgICAgICAgICAgIC8vcHJlcGFpcmUgc3R5bGVzXG4gICAgICAgICAgICB2YXIgc2lkZUJhckNvbnRhaW5lclN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc2lkZUJhclN0eWxlcy5zaWRlQmFyQ29udGFpbmVyU3R5bGUsIHsgd2lkdGg6IHRoaXMuc3RhdGUud2lkdGggfSwgeyBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0IH0pLFxuICAgICAgICAgICAgICAgIHRvb2xCYXJTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHNpZGVCYXJTdHlsZXMudG9vbEJhclN0eWxlLCB7IHZpc2liaWxpdHk6IHRoaXMucHJvcHMudG9vbGJhciA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH0pLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHNpZGVCYXJTdHlsZXMuY29udGVudFN0eWxlLCB7IHZpc2liaWxpdHk6IHRoaXMuc3RhdGUuc2hvdyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH0pLFxuICAgICAgICAgICAgICAgIGJ1dHRvblN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc2lkZUJhclN0eWxlcy5idXR0b25TdHlsZSwge1xuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy50b29sYmFyID8gc2lkZUJhclN0eWxlcy5idXR0b25TdHlsZS5oZWlnaHQgOiAnMCcsXG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogdGhpcy5wcm9wcy50b29sYmFyID8gJ3Zpc2libGUnIDogJ2hpZGRlbidcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IGlkOiAndG9vbEJhckNvbnRhaW5lcicsIHN0eWxlOiBzaWRlQmFyQ29udGFpbmVyU3R5bGUsIHJlZjogJ3Rvb2xiYXInIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6ICdidG5CYXInLCBzdHlsZTogdG9vbEJhclN0eWxlIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogJ3NpZGViYXItYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBidXR0b25TdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0b29sQmFyU3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5idG5DbGlja0hhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IGlkOiAnY29udGVudCcsIHN0eWxlOiBjb250ZW50U3R5bGUsIHJlZjogJ2NvbnRlbnQnIH0sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFNpZGVCYXJDb250YWluZXI7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cblNpZGVCYXJDb250YWluZXIucHJvcFR5cGVzID0ge1xuICAgIHRvb2xiYXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHdpZHRoOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhlaWd0aDogUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuU2lkZUJhckNvbnRhaW5lci5kZWZhdWx0UHJvcHMgPSB7XG4gICAgdG9vbGJhcjogdHJ1ZSxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGhlaWdodDogJzEwMCUnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZGVCYXJDb250YWluZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci5qc3hcbi8vIG1vZHVsZSBpZCA9IDE0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHNpZGVCYXJDb250YWluZXJTdHlsZToge1xuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBoZWlnaHQ6ICc0MDBweCcsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCByZWQnLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnXG4gICAgfSxcblxuICAgIHRvb2xCYXJTdHlsZToge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGhlaWdodDogJ2F1dG8nLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnZ3JheScsXG4gICAgICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJ1xuICAgIH0sXG4gICAgY29udGVudFN0eWxlOiB7XG4gICAgICAgIGhlaWdodDogJ2luaGVyaXQnLFxuICAgICAgICB3aWR0aDogJzEwMCUnXG4gICAgfSxcblxuICAgIGJ1dHRvblN0eWxlOiB7XG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICBoZWlnaHQ6ICcyMHB4JyxcbiAgICAgICAgd2lkdGg6ICcyMHB4J1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnRhaW5lcjoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhGbG93OiAncm93IHdyYXAnLFxuICAgICAgICBoZWlnaHQ6ICc4NyUnLFxuICAgICAgICBib3JkZXI6ICczcHggc29saWQgYnJvd24nXG4gICAgfSxcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIGZsZXg6ICcxIDEwMCUnLFxuICAgICAgICBhbGlnbkl0ZW1zOiAnc3RyZXRjaCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnXG4gICAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2RvY3MvZG9jLXJlZ2lzdGVyL2RvYy1yZWdpc3Rlci1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2dyaWQtZmlsdGVyLXN0eWxlcycpO1xuXG52YXIgR3JpZEZpbHRlciA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhHcmlkRmlsdGVyLCBfUmVhY3QkUHVyZUNvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBHcmlkRmlsdGVyKHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBHcmlkRmlsdGVyKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoR3JpZEZpbHRlci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEdyaWRGaWx0ZXIpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBncmlkQ29uZmlnOiBfdGhpcy5wcm9wcy5ncmlkQ29uZmlnLCAvLyBncmlkIGNvbmZpZ1xuICAgICAgICAgICAgZGF0YTogX3RoaXMucHJvcHMuZGF0YSAvLyBmaWx0ZXIgZGF0YVxuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5oYW5kbGVDaGFuZ2UgPSBfdGhpcy5oYW5kbGVDaGFuZ2UuYmluZChfdGhpcyk7cmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhHcmlkRmlsdGVyLCBbe1xuICAgICAgICBrZXk6ICdoYW5kbGVDaGFuZ2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlLFxuICAgICAgICAgICAgICAgIGlkID0gZS50YXJnZXQubmFtZSxcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhLFxuICAgICAgICAgICAgICAgIGluZGV4ID0gdm9pZCAwO1xuXG4gICAgICAgICAgICAvLyDQvdCw0LTQviDQvdCw0LnRgtC4INGN0LvQtdC80LXQvdGCINC80LDRgdGB0LjQstCwINGBINC00LDQvdC90YvQvNC4INC00LvRjyDRjdGC0L7Qs9C+INC60L7QvNC/0L7QvdC10L3RgtCwXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVtpXS5yZWZzID09PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgZGF0YVtpbmRleF0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGF0YTogZGF0YSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGdyaWRDb25maWc6IG5leHRQcm9wcy5ncmlkQ29uZmlnLCBkYXRhOiBuZXh0UHJvcHMuZGF0YSB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyDRgdC+0LfQtNCw0YHRgiDQuNC3INC/0L7Qu9C10Lkg0LPRgNC40LTQsCDQutC+0LzQv9C+0L3QtdC90YLRiyDQtNC70Y8g0YTQvtGA0LzQuNGA0L7QstCw0L3QuNGPINGD0YHQu9C+0LLQuNC5INGE0LjQu9GM0YLRgNCw0YbQuNC4XG4gICAgICAgICAgICB2YXIgZ3JpZENvbmZpZyA9IHRoaXMuc3RhdGUuZ3JpZENvbmZpZyxcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5zdGF0ZS5kYXRhO1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMuZmllbGRzZXQgfSxcbiAgICAgICAgICAgICAgICBncmlkQ29uZmlnLm1hcChmdW5jdGlvbiAocm93LCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29tcG9uZW50VHlwZSA9IHJvdy50eXBlID8gcm93LnR5cGUgOiAndGV4dCc7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5mb3JtV2lkZ2V0LCBrZXk6ICdmaWVsZFNldC0nICsgcm93LmlkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5mb3JtV2lkZ2V0TGFiZWwgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmZvcm1XaWRnZXRJbnB1dCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyBzdHlsZTogc3R5bGVzLmlucHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBjb21wb25lbnRUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcm93Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJvdy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHJvdy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IHJvdy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF90aGlzMi5zdGF0ZS5kYXRhW3Jvdy5pZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlOiBfdGhpczIuaGFuZGxlQ2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGRhdGFbcm93LmlkXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gR3JpZEZpbHRlcjtcbn0oUmVhY3QuUHVyZUNvbXBvbmVudCk7XG5cbkdyaWRGaWx0ZXIucHJvcFR5cGVzID0ge1xuICAgIGdyaWRDb25maWc6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIGRhdGE6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRGaWx0ZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC9ncmlkLWZpbHRlci9ncmlkLWZpbHRlci5qc3hcbi8vIG1vZHVsZSBpZCA9IDE0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZvcm1XaWRnZXQ6IHtcbiAgICAgICAgbWFyZ2luQm90dG9tOiAnNXB4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93J1xuICAgIH0sXG4gICAgZm9ybVdpZGdldExhYmVsOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsXG4gICAgICAgIHdpZHRoOiAnNDAlJyxcbiAgICAgICAgbWFyZ2luUmlnaHQ6ICcxMHB4J1xuICAgIH0sXG4gICAgZm9ybVdpZGdldElucHV0OiB7XG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIGJvcmRlclJhZGl1czogJzJweCcsXG4gICAgICAgIHBhZGRpbmc6ICczcHgnLFxuICAgICAgICBib3JkZXI6ICcwcHgnXG4gICAgfSxcblxuICAgIGlucHV0OiB7XG4gICAgICAgIGJvcmRlclJhZGl1czogJzJweCcsXG4gICAgICAgIHBhZGRpbmc6ICc1cHgnLFxuICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuXG4gICAgfSxcblxuICAgIGZpZWxkU2V0OiB7XG4gICAgICAgIGJvcmRlclJhZGl1czogJzJweCcsXG4gICAgICAgIG1hcmdpbjogJzEwcHgnXG4gICAgfSxcblxuICAgIHVpOiB7XG4gICAgICAgIGJvcmRlclJhZGl1czogJzJweCcsXG4gICAgICAgIHBhZGRpbmc6ICc1cHgnLFxuICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuXG4gICAgfVxuXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhLWdyaWQvZ3JpZC1maWx0ZXIvZ3JpZC1maWx0ZXItc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxuICAgIE9SREVSX0JZID0gW3sgY29sdW1uOiAnaWQnLCBkaXJlY3Rpb246ICdkZXNjJyB9XTtcblxudmFyIGRvY3NTdG9yZSA9IGZsdXguY3JlYXRlU3RvcmUoe1xuICAgIGlkOiAnZG9jc1N0b3JlJyxcbiAgICBpbml0aWFsU3RhdGU6IHtcbiAgICAgICAgZG9jc0dyaWQ6IDAsXG4gICAgICAgIGRvY3NMaXN0OiAnJyxcbiAgICAgICAgbmFtZTogJ3ZsYWQnLFxuICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgc29ydEJ5OiBPUkRFUl9CWSxcbiAgICAgICAgc3FsV2hlcmU6ICcnLFxuICAgICAgICBzeXN0ZW1NZXNzYWdlOiBudWxsLFxuICAgICAgICB1c2VyRGF0YToge30sXG4gICAgICAgIGxvZ2VkSW46IGZhbHNlXG4gICAgfSxcbiAgICBhY3Rpb25DYWxsYmFja3M6IHtcbiAgICAgICAgc3lzdGVtTWVzc2FnZUNoYW5nZTogZnVuY3Rpb24gc3lzdGVtTWVzc2FnZUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBzeXN0ZW1NZXNzYWdlOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc3FsV2hlcmVDaGFuZ2U6IGZ1bmN0aW9uIHNxbFdoZXJlQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHNxbFdoZXJlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIHJlcXVlcnkoeyBuYW1lOiAnZG9jc0dyaWQnLCB2YWx1ZTogdGhpcy5kb2NzTGlzdCB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc29ydEJ5Q2hhbmdlOiBmdW5jdGlvbiBzb3J0QnlDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgc29ydEJ5OiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIHJlcXVlcnkoeyBuYW1lOiAnZG9jc0dyaWQnLCB2YWx1ZTogdGhpcy5kb2NzTGlzdCwgc29ydEJ5OiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgQWRkOiBmdW5jdGlvbiBBZGQodXBkYXRlcikge1xuICAgICAgICAgICAgYWRkKHRoaXMuZG9jc0xpc3QpO1xuICAgICAgICB9LFxuICAgICAgICBFZGl0OiBmdW5jdGlvbiBFZGl0KHVwZGF0ZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRvY3NMaXN0ICYmIHRoaXMuZG9jc0dyaWQpIHtcbiAgICAgICAgICAgICAgICBlZGl0KHRoaXMuZG9jc0xpc3QsIHRoaXMuZG9jc0dyaWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfQotC40L8g0LTQvtC60YPQvNC10L3RgtCwINC40LvQuCDQtNC+0LrRg9C80LXQvdGCINC90LUg0LLRi9Cx0YDQsNC9Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIERlbGV0ZTogZnVuY3Rpb24gRGVsZXRlKHVwZGF0ZXIpIHtcbiAgICAgICAgICAgIHZhciBkb2NUeXBlSWQgPSB0aGlzLmRvY3NMaXN0O1xuICAgICAgICAgICAgcmVxdWVyeUZvckFjdGlvbignZGVsZXRlJywgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc3lzdGVtTWVzc2FnZUNoYW5nZScsIGVycik7IC8vINC/0LjRiNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyINGF0YDQsNC90LjQu9C40YnQtVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3N5c3RlbU1lc3NhZ2VDaGFuZ2UnLCBudWxsKTsgLy8g0L/QuNGI0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YXRgNCw0L3QuNC70LjRidC1XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlcnkoeyBuYW1lOiAnZG9jc0dyaWQnLCB2YWx1ZTogZG9jVHlwZUlkIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBQcmludDogZnVuY3Rpb24gUHJpbnQodXBkYXRlcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J1dHRvbiBQcmludCBjbGlrZWQhJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGNoYW5nZU5hbWU6IGZ1bmN0aW9uIGNoYW5nZU5hbWUodXBkYXRlciwgbmFtZSkge1xuICAgICAgICAgICAgLy8gU3RvcmVzIHVwZGF0ZXMgYXJlIG9ubHkgbWFkZSBpbnNpZGUgc3RvcmUncyBhY3Rpb24gY2FsbGJhY2tzXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IG5hbWU6IG5hbWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRvY3NHcmlkQ2hhbmdlOiBmdW5jdGlvbiBkb2NzR3JpZENoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gU3RvcmVzIHVwZGF0ZXMgYXJlIG9ubHkgbWFkZSBpbnNpZGUgc3RvcmUncyBhY3Rpb24gY2FsbGJhY2tzXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRvY3NHcmlkOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZVsnZG9jc0dyaWQnXSA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkb2NzTGlzdENoYW5nZTogZnVuY3Rpb24gZG9jc0xpc3RDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgdmFyIGxhc3RWYWx1ZSA9IGZsdXguc3RvcmVzLmRvY3NTdG9yZS5kb2NzTGlzdCB8fCAnRE9LJztcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbGFzdFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkb2NzTGlzdDogdmFsdWUgfSk7XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc29ydEJ5Q2hhbmdlJywgT1JERVJfQlkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgICAgICAgICBsb2NhbFN0b3JhZ2VbJ2RvY3NMaXN0J10gPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YUNoYW5nZTogZnVuY3Rpb24gZGF0YUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gU3RvcmVzIHVwZGF0ZXMgYXJlIG9ubHkgbWFkZSBpbnNpZGUgc3RvcmUncyBhY3Rpb24gY2FsbGJhY2tzXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRhdGE6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICB1c2VyRGF0YUNoYW5nZTogZnVuY3Rpb24gdXNlckRhdGFDaGFuZ2UodXBkYXRlciwgdXNlckRhcmEpIHtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgdXNlckRhdGE6IHVzZXJEYXRhIH0pO1xuXG4gICAgICAgICAgICB2YXIgbG9nZWRJbiA9IHVzZXJEYXRhID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBsb2dlZEluOiBsb2dlZEluIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG59KTtcblxudmFyIGVkaXQgPSBmdW5jdGlvbiBlZGl0KGRvY1R5cGVJZCwgZG9jSWQpIHtcbiAgICB2YXIgdXJsID0gXCIvZG9jdW1lbnQvXCIgKyBkb2NUeXBlSWQgKyBkb2NJZDtcbiAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xufTtcblxudmFyIGFkZCA9IGZ1bmN0aW9uIGFkZChkb2NUeXBlSWQpIHtcbiAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gXCIvZG9jdW1lbnQvXCIgKyBkb2NUeXBlSWQgKyAnMCc7XG59O1xuXG52YXIgcmVxdWVyeUZvckFjdGlvbiA9IGZ1bmN0aW9uIHJlcXVlcnlGb3JBY3Rpb24oYWN0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghd2luZG93LmpRdWVyeSB8fCAhJCkgcmV0dXJuOyAvLyDQtNC70Y8g0YLQtdGB0YLQvtCyXG5cbiAgICAvLyDQvNC10YLQvtC0INC+0LHQtdGB0L/QtdGH0LjRgiDQt9Cw0L/RgNC+0YEg0L3QsCDQstGL0L/QvtC70L3QtdC90LjQtVxuICAgIHZhciBkb2NJZCA9IGRvY3NTdG9yZS5kb2NzR3JpZCxcbiAgICAgICAgZG9jVHlwZUlkID0gZG9jc1N0b3JlLmRvY3NMaXN0O1xuXG4gICAgaWYgKCFkb2NJZCB8fCB0eXBlb2YgZG9jSWQgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgZG9jSWQgPSAwO1xuICAgIH1cblxuICAgIGlmICghZG9jSWQpIHtcbiAgICAgICAgLy8gZG9jIG5vdCBzZWxlY3RlZFxuICAgICAgICB2YXIgZGF0YSA9IGRvY3NTdG9yZS5kYXRhO1xuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgICAgLy9AdG9kbyDQn9GA0LjQstC10YHRgtC4INCyINCx0L7QttC10YHQutC40Lkg0LLQuNC0XG4gICAgICAgICAgICBpZiAoIWRvY1R5cGVJZCAmJiByb3cubmFtZSA9PSAnZG9jc0xpc3QnKSB7XG4gICAgICAgICAgICAgICAgLy8g0L3QtSDQvdCw0LfQvdCw0YfQtdC9INGC0LjQvyDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAgICAgICAgICAgICBkb2NUeXBlSWQgPSByb3dbJ3ZhbHVlJ107XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZG9jc0xpc3RDaGFuZ2UnLCBkb2NUeXBlSWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocm93Lm5hbWUgPT0gJ2RvY3NHcmlkJykge1xuICAgICAgICAgICAgICAgIGRvY0lkID0gcm93LmRhdGFbMF0uZGF0YVswXS5pZDtcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NzR3JpZENoYW5nZScsIGRvY0lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ2RvY0lkIGRvY1R5cGVJZDonLCBkb2NJZCwgZG9jVHlwZUlkLCBkb2NzU3RvcmUuZG9jc0xpc3QsIGRvY3NTdG9yZS5kb2NzR3JpZCwgZG9jc1N0b3JlLmRhdGEpO1xuXG4gICAgdmFyIHBhcmFtZXRlcnMgPSB7XG4gICAgICAgIGRvY0lkOiBkb2NJZCxcbiAgICAgICAgZG9jX3R5cGVfaWQ6IGRvY1R5cGVJZFxuICAgIH07XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2RvYycsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBhcmFtZXRlcnMpXG4gICAgICAgIH0sXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgICAgICAvLyDQtNC+0LvQttC90Ysg0L/QvtC70YPRh9C40YLRjCDQvtCx0YrQtdC60YIgLSDRgNC10LfRg9C70YzRgtCw0YJcbiAgICAgICAgICAgIHZhciBlcnJvck1lc3NzYWdlID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCA9PSAnRXJyb3InKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzc2FnZSA9ICdFcnJvciwgJyArIGRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3JNZXNzc2FnZSwgZGF0YSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcih4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCcvZXJyb3InLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbnZhciByZXF1ZXJ5ID0gZnVuY3Rpb24gcmVxdWVyeShjb21wb25lbnQpIHtcbiAgICBpZiAoIXdpbmRvdy5qUXVlcnkpIHJldHVybjsgLy8g0LTQu9GPINGC0LXRgdGC0L7QslxuXG4gICAgLy8g0LzQtdGC0L7QtCDQvtCx0LXRgdC/0LXRh9C40YIg0L/QvtC70YPRh9C10L3QuNC1INC00LDQvdC90YvRhSDQvtGCINGB0LXRgNCy0LXRgNCwXG4gICAgLy8gY29tcG9uZW50ID0gdGhpcy5zdGF0ZS5jb21wb25lbnRzW25hbWVdXG4gICAgLy8g0LXRgdC70Lgg0L/QsNGA0LDQvNC10YLRgNGLINC90LUg0LfQsNC00LDQvdGLLCDQs9GA0YPQt9C40Lwg0LLRgdC1XG5cbiAgICB2YXIgY29tcG9uZW50cyA9IGRvY3NTdG9yZS5kYXRhO1xuXG4gICAgLy8g0YTQuNC70YzRgtGA0YPQtdC8INGB0L/QuNGB0L7QuiDQutC+0LzQv9C+0L3QtdC90YLQvtCyXG4gICAgdmFyIGNvbXBvbmVudHNGb3JVcGRhdGUgPSBjb21wb25lbnRzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAvLyDQuNGJ0LXQvCDQvtCx0YrQtdC60YIg0L/QviDQvdCw0LjQvNC10L3QvtCy0LDQvdC40Y4uINC40LvQuCDQstC10YDQvdC10Lwg0LLRgdC1INC10YHQu9C4INC/0LDRgNCw0LzQtdGC0YAg0L3QtSDQt9Cw0LTQsNC9XG4gICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdjb21wb25lbnQ6JyArIEpTT04uc3RyaW5naWZ5KGNvbXBvbmVudCkpO1xuICAgICAgICBpZiAoY29tcG9uZW50Lm5hbWUgPT0gJycgfHwgaXRlbS5uYW1lID09IGNvbXBvbmVudC5uYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyDRgdC+0YDRgtC40YDQvtCy0LrQsFxuICAgIHZhciBzcWxTb3J0QnkgPSAnJyxcbiAgICAgICAgc3FsV2hlcmUgPSBkb2NzU3RvcmUuc3FsV2hlcmUgfHwgJycsXG4gICAgICAgIHNvcnRCeUFycmF5ID0gZG9jc1N0b3JlLnNvcnRCeSxcbiAgICAgICAgYXJyVHlwZSA9IHR5cGVvZiBzb3J0QnlBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yoc29ydEJ5QXJyYXkpO1xuXG4gICAgaWYgKGRvY3NTdG9yZS5zb3J0QnkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3J0QnlBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgc3FsU29ydEJ5ID0gc3FsU29ydEJ5ICsgJywnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3FsU29ydEJ5ID0gc3FsU29ydEJ5ICsgc29ydEJ5QXJyYXlbaV0uY29sdW1uICsgJyAnICsgc29ydEJ5QXJyYXlbaV0uZGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIFVSTCA9ICcvYXBpL2RvY3MnO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogVVJMLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcblxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBkYXRhVHlwZTogJ2NvbXBvbmVudCcsXG4gICAgICAgICAgICBkb2NUeXBlSWQ6IDEsXG4gICAgICAgICAgICBjb21wb25lbnRzOiBKU09OLnN0cmluZ2lmeShjb21wb25lbnRzRm9yVXBkYXRlKSwgLy8g0LrQvtC80L/QvtC90LXQvdGC0Ysg0LTQu9GPINC+0LHQvdC+0LLQu9C10L3QuNGPXG4gICAgICAgICAgICBwYXJhbWV0ZXI6IGNvbXBvbmVudC52YWx1ZSwgLy8g0L/QsNGA0LDQvNC10YLRgNGLXG4gICAgICAgICAgICBzb3J0Qnk6IHNxbFNvcnRCeSwgLy8g0YHQvtGA0YLQuNGA0L7QstC60LBcbiAgICAgICAgICAgIGxhc3REb2NJZDogZG9jc1N0b3JlLmRvY3NHcmlkLFxuICAgICAgICAgICAgc3FsV2hlcmU6IHNxbFdoZXJlIC8vINC00LjQvdCw0LzQuNGH0LXRgdC60LjQuSDRhNC40LvRjNGC0YAg0LPRgNC40LTQsFxuICAgICAgICB9LFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAvLyDQtNC+0LvQttC90Ysg0L/QvtC70YPRh9C40YLRjCDQvtCx0YrQtdC60YJcbiAgICAgICAgICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygncGFyZW50IGFycml2ZWQgZGF0YTonICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkgKyAn0YLQuNC/OicgKyB0eXBlb2YgZGF0YSk7XG5cbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIC8vIGZpbmQgaXRlbVxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3BhcmVudCBJdGVtOicgKyBKU09OLnN0cmluZ2lmeShpdGVtKSApO1xuICAgICAgICAgICAgICAgIC8vINC+0LHQvdC+0LLQuNC8INC00LDQvdC90YvQtSDQvNCw0YHRgdC40LLQsCDQutC+0LzQv9C+0L3QtdC90YLQvtCyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50cyA9IGNvbXBvbmVudHMubWFwKGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5uYW1lID09IGl0ZW0ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5kYXRhID0gaXRlbS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0b3JlIGRhdGEgdXBkYXRlOicgKyBKU09OLnN0cmluZ2lmeShjb21wb25lbnRzKSk7XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgY29tcG9uZW50cyk7XG4gICAgICAgIH0uYmluZCh1bmRlZmluZWQpLFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJy9lcnJvcicsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgICB9LmJpbmQodW5kZWZpbmVkKVxuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkb2NzU3RvcmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9zdG9yZXMvZG9jc19zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gMTQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==
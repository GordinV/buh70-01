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
	            isReport: false,
	            treeValue: _this.findComponent('docsList')[0].value,
	            gridValue: 0
	        };

	        _this.treeData = {
	            data: _this.findComponent('docsList')[0].data || []
	        };

	        _this.gridData = {
	            data: _this.findComponent('docsGrid')[0].data[0].data,
	            gridConfig: _this.findComponent('docsGrid')[0].data[0].columns
	        };

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
	            var _this2 = this;

	            var self = this;

	            // отслеживаем изменение фильтра
	            docsStore.on('change:sqlWhere', function (newValue) {
	                // данные изменились, обнуляем данные фильтра
	                if (!newValue) {
	                    self.filterData = [];
	                }
	            });

	            // создаем обработчик события на изменение даннх
	            docsStore.on('change:data', function (newValue) {
	                // данные изменились, меняем состояние
	                _this2.gridData = {
	                    data: newValue[1].data[0].data,
	                    gridConfig: newValue[1].data[0].columns
	                };

	                _this2.treeData = {
	                    data: newValue[0].data
	                };

	                self.setState({
	                    gridValue: newValue[1].lastDocId !== 0 ? newValue[1].lastDocId : _this2.gridData[0].id
	                });
	            });

	            // создаем обработчик события на изменение строки грида
	            docsStore.on('change:docsGrid', function (newValue, previousValue) {
	                // данные изменились, меняем состояние
	                self.setState({ gridValue: newValue });
	            });

	            // создаем обработчик события системный извещение
	            docsStore.on('change:systemMessage', function (newValue, previousValue) {
	                // данные изменились, меняем состояние
	                self.setState({ showSystemMessage: !!newValue });
	            });

	            // покажем данные

	            //        let lastComponent = localStorage['docsList'];
	            flux.doAction('dataChange', this.props.components);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var systemMessage = docsStore.systemMessage;

	            this.getFilterFields();

	            var btnParams = {
	                btnStart: {
	                    show: false
	                },
	                btnLogin: {
	                    show: true
	                }
	            };

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
	                                data: this.treeData['data'],
	                                name: 'docsList',
	                                bindDataField: 'kood',
	                                value: this.state.treeValue,
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
	                                    gridData: this.gridData['data'],
	                                    gridColumns: this.gridData['gridConfig'],
	                                    onChangeAction: 'docsGridChange',
	                                    onClick: this.clickHandler,
	                                    onDblClick: this.dblClickHandler,
	                                    onHeaderClick: this.headerClickHandler,
	                                    value: this.state.gridValue,
	                                    url: 'api' }),
	                                React.createElement(
	                                    ModalPage,
	                                    { ref: 'modalpageFilter',
	                                        modalPageBtnClick: this.modalPageBtnClick,
	                                        modalPageName: 'Filter',
	                                        show: this.state.getFilter },
	                                    React.createElement(GridFilter, { ref: 'gridFilter',
	                                        gridConfig: this.gridData['gridConfig'],
	                                        data: this.filterData })
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
	         * Вернет компонет с данными строки фильтрации
	         * @returns {XML}
	         */

	    }, {
	        key: 'renderFilterToolbar',
	        value: function renderFilterToolbar() {
	            return React.createElement(
	                ToolbarContainer,
	                { ref: 'filterToolbarContainer', position: 'left' },
	                React.createElement(
	                    'span',
	                    null,
	                    'Filter: ',
	                    this.getFilterString()
	                )
	            );
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

	            if (this.props.components.length > 0) {
	                componentData = this.props.components.filter(function (item) {
	                    if (item.name == componentName) {
	                        return item;
	                    }
	                });
	            }

	            if (!componentData[0].name == 'docsGrid' && componentData[0].lastDocId == '0' && !flux.stores.docsStore.docsGrid) {
	                componentData[0].lastDocid = componentData[0].data[0].id || 0;
	                // сохраним номер в сторе
	                flux.doAction('docsGridChange', componentData[0].data[0].id || 0);
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
	            if (action == 'docsGridChange') {
	                this.gridData.value = id;
	                this.setState({ gridValue: id });
	            } else {
	                this.treeData.value = id;
	                this.setState({ treeValue: id });
	            }
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

	        /**
	         * создаст из полtй грида компоненты для формирования условий фильтрации
	         * @returns {Array|*}
	         */

	    }, {
	        key: 'getFilterFields',
	        value: function getFilterFields() {
	            var _this3 = this;

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

	                gridData.map(function (row) {
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
	                    _this3.filterData.push({
	                        name: row.name,
	                        value: componentObjektValue || null,
	                        type: componentType,
	                        refs: row.id
	                    });
	                });
	            }
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
	            var _this4 = this;

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
	                    if (row.id === _this4.state.gridValue) {
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

	        _this.state = {
	            index: _this.getIndex(props.value),
	            value: props.value
	        };
	        _this.handleLiClick = _this.handleLiClick.bind(_this);
	        return _this;
	    }

	    _createClass(Tree, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.getIndex(nextProps.value);
	            this.setState({ index: this.getIndex(nextProps.value), value: nextProps.value });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { ref: 'tree' },
	                this.getTree('0')
	            );
	        }

	        /**
	         * Обработчик для клика
	         * @param selectedIndex
	         * @param selectedId
	         * @param isNode
	         */

	    }, {
	        key: 'handleLiClick',
	        value: function handleLiClick(selectedIndex, selectedId, isNode) {
	            if (!isNode && !isNaN(selectedId)) {
	                // не нода, а документ
	                var data = this.props.data.filter(function (row) {
	                    if (row.id == selectedId) {
	                        return row;
	                    }
	                }),
	                    value = data[0][this.props.bindDataField];

	                this.setState({
	                    index: selectedIndex,
	                    value: value
	                });

	                if (this.props.onClickAction) {
	                    this.props.onClickAction(this.props.name + 'Change', value);
	                }
	            }
	        }

	        /**
	         * вернет данные для ноды = parentId
	         * @param parentId
	         */

	    }, {
	        key: 'getChildren',
	        value: function getChildren(parentId) {
	            return this.props.data.filter(function (row) {
	                if (row.parentid == parentId) {
	                    return row;
	                }
	            });
	        }

	        /**
	         * Построет дерево для ноды = parentId
	         * @param parentId
	         * @returns {XML}
	         */

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

	        /**
	         * Вернет индекс строки где заданное поле имеет значение value
	         * @param value
	         * @returns {number}
	         */

	    }, {
	        key: 'getIndex',
	        value: function getIndex(value) {
	            var treeIndex = 0;
	            // we got value, we should find index and initilize idx field
	            for (var i = 0; i++; i < this.props.data[0].length) {
	                if (this.props.data[0].data[i][this.props.bindDataField] === value) {
	                    // found
	                    treeIndex = i;
	                    return;
	                }
	            }
	            return treeIndex;
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

	    /**
	     * Обработчик на изменения инпутов
	     * @param e
	     */


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
	            return React.createElement(
	                'div',
	                { style: styles.fieldset },
	                this.props.gridConfig.map(function (row) {
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
	                                value: _this2.props.data[row.id],
	                                onChange: _this2.handleChange,
	                                defaultValue: _this2.props.data[row.id]
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
	        Add: function Add() {
	            add(this.docsList);
	        },
	        Edit: function Edit() {
	            if (this.docsList && this.docsGrid) {
	                edit(this.docsList, this.docsGrid);
	            } else {
	                console.error('Тип документа или документ не выбран', this.docsList, this.docsGrid);
	            }
	        },
	        Delete: function Delete() {
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
	        Print: function Print() {
	            console.log('button Print cliked!');
	        },
	        changeName: function changeName(updater, name) {
	            // Stores updates are only made inside store's action callbacks
	            updater.set({ name: name });
	        },
	        docsGridChange: function docsGridChange(updater, value) {
	            // Stores updates are only made inside store's action callbacks
	            updater.set({ docsGrid: value });
	        },
	        docsListChange: function docsListChange(updater, value) {
	            // Stores updates are only made inside store's action callbacks
	            var lastValue = flux.stores.docsStore.docsList || 'DOK';
	            if (value !== lastValue) {
	                updater.set({ docsList: value });
	            }
	            flux.doAction('sqlWhereChange', '');
	            flux.doAction('sortByChange', ORDER_BY);

	            //            localStorage['docsList'] = value;
	        },
	        dataChange: function dataChange(updater, value) {
	            // Stores updates are only made inside store's action callbacks
	            updater.set({ data: value });
	            if (!this.docsGrid) {
	                var gridValue = value[1].data[0].data[0].id;
	                flux.doAction('docsGridChange', gridValue);
	            }

	            if (!this.docsList) {
	                var treeValue = value[0].value;
	                flux.doAction('docsListChange', treeValue);
	            }
	        },
	        userDataChange: function userDataChange(updater, value) {
	            updater.set({ userData: value });

	            var logedIn = !!userData;
	            updater.set({ logedIn: logedIn });
	        }

	    }
	});

	var edit = function edit(docTypeId, docId) {
	    document.location.href = "/document/" + docTypeId + docId;
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
	        if (component.name == '' || item.name == component.name) {
	            return item.name;
	        }
	    });

	    // сортировка
	    var sqlSortBy = '',
	        sqlWhere = docsStore.sqlWhere || '',
	        sortByArray = docsStore.sortBy;

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
	            data.forEach(function (item) {
	                // find item
	                // обновим данные массива компонентов
	                components = components.map(function (component) {
	                    if (component.name == item.name) {
	                        // found
	                        component.data = item.data;
	                    }
	                    return component;
	                });
	            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jcy9kb2MtcmVnaXN0ZXIvZG9jLXJlZ2lzdGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZmlsdGVyL2J1dHRvbi1yZWdpc3Rlci1maWx0ZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1kZWxldGUvbW9kYWxQYWdlLWRlbGV0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWRlbGV0ZS9tb2RhbHBhZ2UtZGVsZXRlLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2UtaW5mby9tb2RhbFBhZ2UtaW5mby5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWluZm8vbW9kYWxwYWdlLWluZm8tc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvdHJlZS90cmVlLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3RyZWUvdHJlZS1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kb2NzL2RvYy1yZWdpc3Rlci9kb2MtcmVnaXN0ZXItc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YS1ncmlkL2dyaWQtZmlsdGVyL2dyaWQtZmlsdGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC9ncmlkLWZpbHRlci9ncmlkLWZpbHRlci1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvc3RvcmVzL2RvY3Nfc3RvcmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVnaXN0ZXIgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL2RvYy1yZWdpc3Rlci9kb2MtcmVnaXN0ZXIuanN4Jyk7XG5cbi8vINC00LDQvdC90YvQtSDQtNC70Y8g0YXRgNCw0L3QuNC70LjRidCwXG4vL2xvY2FsU3RvcmFnZVsnZG9jc1N0b3JlJ10gPSBzdG9yZURhdGE7XG5zdG9yZURhdGEgPSBKU09OLnBhcnNlKHN0b3JlRGF0YSk7XG51c2VyRGF0YSA9IEpTT04ucGFyc2UodXNlckRhdGEpO1xuXG5SZWFjdERPTS5oeWRyYXRlKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVnaXN0ZXIsIHsgaWQ6ICdncmlkJywgY29tcG9uZW50czogc3RvcmVEYXRhLCB1c2VyRGF0YTogdXNlckRhdGEgfSwgJ9Ci0YPRgiDQsdGD0LTRg9GCINC60L7QvNC/0L7QvdC10L3RgtGLJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkJykpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIndXNlIHN0cmljdCc7XG4vLyDQs9GA0YPQt9C40Lwg0LrQvtC80L/QvtC90LXQvdGC0YtcblxuLy9pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcbiAgICBEYXRhR3JpZCA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9kYXRhLWdyaWQvZGF0YS1ncmlkLmpzeCcpLFxuICAgIEJ0bkFkZCA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWFkZC9idXR0b24tcmVnaXN0ZXItYWRkLmpzeCcpLFxuICAgIEJ0bkVkaXQgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeCcpLFxuICAgIEJ0bkRlbGV0ZSA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWRlbGV0ZS9idXR0b24tcmVnaXN0ZXItZGVsZXRlLmpzeCcpLFxuICAgIEJ0blByaW50ID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItcHJpbnQvYnV0dG9uLXJlZ2lzdGVyLXByaW50LmpzeCcpLFxuICAgIEJ0bkZpbHRlciA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWZpbHRlci9idXR0b24tcmVnaXN0ZXItZmlsdGVyLmpzeCcpLFxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxQYWdlLmpzeCcpLFxuICAgIE1vZGFsUGFnZURlbGV0ZSA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWRlbGV0ZS9tb2RhbFBhZ2UtZGVsZXRlLmpzeCcpLFxuICAgIE1vZGFsUGFnZUluZm8gPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1pbmZvL21vZGFsUGFnZS1pbmZvLmpzeCcpLFxuICAgIFRyZWVMaXN0ID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL3RyZWUvdHJlZS5qc3gnKSxcbiAgICBTaWRlYmFyID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci5qc3gnKSxcbiAgICBNZW51VG9vbEJhciA9IHJlcXVpcmUoJy4vLi4vLi4vbWl4aW4vbWVudVRvb2xCYXIuanN4JyksXG4gICAgVG9vbGJhckNvbnRhaW5lciA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy90b29sYmFyLWNvbnRhaW5lci90b29sYmFyLWNvbnRhaW5lci5qc3gnKSxcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2RvYy1yZWdpc3Rlci1zdHlsZXMnKSxcbiAgICBHcmlkRmlsdGVyID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL2RhdGEtZ3JpZC9ncmlkLWZpbHRlci9ncmlkLWZpbHRlci5qc3gnKTtcblxuLy8gQ3JlYXRlIGEgc3RvcmVcbnZhciBkb2NzU3RvcmUgPSByZXF1aXJlKCcuLy4uLy4uL3N0b3Jlcy9kb2NzX3N0b3JlLmpzJyk7XG5cbi8vINGB0L7Qt9C00LDQtdC8INC60LvQsNGB0YEgLSDQtNC10YDQttCw0YLQtdC70Ywg0YHQvtGB0YLQvtGP0L3QuNC5XG5cbnZhciBSZWdpc3RlciA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhSZWdpc3RlciwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gUmVnaXN0ZXIocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlZ2lzdGVyKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoUmVnaXN0ZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihSZWdpc3RlcikpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIC8vINGDINC60LDQttC00L7Qs9C+INC60L7QvNC/0L7QvdC10L3RgtCwINGB0LLQvtC5INC+0LHRitC10LrRglxuICAgICAgICAgICAgZ2V0RmlsdGVyOiBmYWxzZSxcbiAgICAgICAgICAgIGdldERlbGV0ZU1vZGFsUGFnZTogZmFsc2UsXG4gICAgICAgICAgICBzaG93U3lzdGVtTWVzc2FnZTogZmFsc2UsXG4gICAgICAgICAgICBhY3RpdlJvd0lkOiAwLFxuICAgICAgICAgICAgaXNSZXBvcnQ6IGZhbHNlLFxuICAgICAgICAgICAgdHJlZVZhbHVlOiBfdGhpcy5maW5kQ29tcG9uZW50KCdkb2NzTGlzdCcpWzBdLnZhbHVlLFxuICAgICAgICAgICAgZ3JpZFZhbHVlOiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgX3RoaXMudHJlZURhdGEgPSB7XG4gICAgICAgICAgICBkYXRhOiBfdGhpcy5maW5kQ29tcG9uZW50KCdkb2NzTGlzdCcpWzBdLmRhdGEgfHwgW11cbiAgICAgICAgfTtcblxuICAgICAgICBfdGhpcy5ncmlkRGF0YSA9IHtcbiAgICAgICAgICAgIGRhdGE6IF90aGlzLmZpbmRDb21wb25lbnQoJ2RvY3NHcmlkJylbMF0uZGF0YVswXS5kYXRhLFxuICAgICAgICAgICAgZ3JpZENvbmZpZzogX3RoaXMuZmluZENvbXBvbmVudCgnZG9jc0dyaWQnKVswXS5kYXRhWzBdLmNvbHVtbnNcbiAgICAgICAgfTtcblxuICAgICAgICBfdGhpcy5maWx0ZXJEYXRhID0gW107IC8vINC80LDRgdGB0LjQsiDQvtCx0YrQtdC60YLQvtCyLCDQutGD0LTQsCDQt9Cw0L/QuNGI0LXQvCDQv9Cw0YDQsNC80LXRgtGA0Ysg0LTQu9GPINGE0LjQu9GM0YLRgNCw0YbQuNC4IEB0b2RvINCy0YvQvdC10YHRgtC4INCy0YHQtSDQsiDQvtGC0LTQtdC70YzQvdGL0Lkg0LrQvtC80L/QvtC90LXRgiDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40LhcblxuICAgICAgICBfdGhpcy5idG5BZGRDbGljayA9IF90aGlzLmJ0bkFkZENsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5idG5FZGl0Q2xpY2sgPSBfdGhpcy5idG5FZGl0Q2xpY2suYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmJ0bkRlbGV0ZUNsaWNrID0gX3RoaXMuYnRuRGVsZXRlQ2xpY2suYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmJ0blByaW50Q2xpY2sgPSBfdGhpcy5idG5QcmludENsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5idG5GaWx0ZXJDbGljayA9IF90aGlzLmJ0bkZpbHRlckNsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5tb2RhbFBhZ2VCdG5DbGljayA9IF90aGlzLm1vZGFsUGFnZUJ0bkNsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5tb2RhbFBhZ2VEZWxCdG5DbGljayA9IF90aGlzLm1vZGFsUGFnZURlbEJ0bkNsaWNrLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5jbGlja0hhbmRsZXIgPSBfdGhpcy5jbGlja0hhbmRsZXIuYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmRibENsaWNrSGFuZGxlciA9IF90aGlzLmRibENsaWNrSGFuZGxlci5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMuaGVhZGVyQ2xpY2tIYW5kbGVyID0gX3RoaXMuaGVhZGVyQ2xpY2tIYW5kbGVyLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5pc1JlcG9ydHMgPSBfdGhpcy5pc1JlcG9ydHMuYmluZChfdGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhSZWdpc3RlciwgW3tcbiAgICAgICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyDQvtGC0YHQu9C10LbQuNCy0LDQtdC8INC40LfQvNC10L3QtdC90LjQtSDRhNC40LvRjNGC0YDQsFxuICAgICAgICAgICAgZG9jc1N0b3JlLm9uKCdjaGFuZ2U6c3FsV2hlcmUnLCBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyDQtNCw0L3QvdGL0LUg0LjQt9C80LXQvdC40LvQuNGB0YwsINC+0LHQvdGD0LvRj9C10Lwg0LTQsNC90L3Ri9C1INGE0LjQu9GM0YLRgNCwXG4gICAgICAgICAgICAgICAgaWYgKCFuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmZpbHRlckRhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0LTQsNC90L3RhVxuICAgICAgICAgICAgZG9jc1N0b3JlLm9uKCdjaGFuZ2U6ZGF0YScsIGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vINC00LDQvdC90YvQtSDQuNC30LzQtdC90LjQu9C40YHRjCwg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxuICAgICAgICAgICAgICAgIF90aGlzMi5ncmlkRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3VmFsdWVbMV0uZGF0YVswXS5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBncmlkQ29uZmlnOiBuZXdWYWx1ZVsxXS5kYXRhWzBdLmNvbHVtbnNcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyLnRyZWVEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXdWYWx1ZVswXS5kYXRhXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBncmlkVmFsdWU6IG5ld1ZhbHVlWzFdLmxhc3REb2NJZCAhPT0gMCA/IG5ld1ZhbHVlWzFdLmxhc3REb2NJZCA6IF90aGlzMi5ncmlkRGF0YVswXS5pZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1INGB0YLRgNC+0LrQuCDQs9GA0LjQtNCwXG4gICAgICAgICAgICBkb2NzU3RvcmUub24oJ2NoYW5nZTpkb2NzR3JpZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vINC00LDQvdC90YvQtSDQuNC30LzQtdC90LjQu9C40YHRjCwg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoeyBncmlkVmFsdWU6IG5ld1ZhbHVlIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINGB0LjRgdGC0LXQvNC90YvQuSDQuNC30LLQtdGJ0LXQvdC40LVcbiAgICAgICAgICAgIGRvY3NTdG9yZS5vbignY2hhbmdlOnN5c3RlbU1lc3NhZ2UnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyDQtNCw0L3QvdGL0LUg0LjQt9C80LXQvdC40LvQuNGB0YwsINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHsgc2hvd1N5c3RlbU1lc3NhZ2U6ICEhbmV3VmFsdWUgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8g0L/QvtC60LDQttC10Lwg0LTQsNC90L3Ri9C1XG5cbiAgICAgICAgICAgIC8vICAgICAgICBsZXQgbGFzdENvbXBvbmVudCA9IGxvY2FsU3RvcmFnZVsnZG9jc0xpc3QnXTtcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCB0aGlzLnByb3BzLmNvbXBvbmVudHMpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIHN5c3RlbU1lc3NhZ2UgPSBkb2NzU3RvcmUuc3lzdGVtTWVzc2FnZTtcblxuICAgICAgICAgICAgdGhpcy5nZXRGaWx0ZXJGaWVsZHMoKTtcblxuICAgICAgICAgICAgdmFyIGJ0blBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBidG5TdGFydDoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnRuTG9naW46IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgcmVmOiAncGFyZW50RGl2JyB9LFxuICAgICAgICAgICAgICAgIE1lbnVUb29sQmFyKGJ0blBhcmFtcywgdGhpcy5wcm9wcy51c2VyRGF0YSksXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJGaWx0ZXJUb29sYmFyKCksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgcmVmOiAnZG9jQ29udGFpbmVyJywgc3R5bGU6IHN0eWxlcy5jb250YWluZXIgfSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJEb2NUb29sQmFyKCksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy53cmFwcGVyIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpZGViYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB3aWR0aDogJzMwJScsIHRvb2xiYXI6IHRydWUsIHJlZjogJ2xpc3Qtc2lkZWJhcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRyZWVMaXN0LCB7IHJlZjogJ3RyZWVMaXN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy50cmVlRGF0YVsnZGF0YSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZG9jc0xpc3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YUZpZWxkOiAna29vZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnRyZWVWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGlja0FjdGlvbjogdGhpcy5jbGlja0hhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlQWN0aW9uOiAnZG9jc0xpc3RDaGFuZ2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5jb250YWluZXIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckFydWFubmVQYWdlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2lkZWJhcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0b29sYmFyOiBmYWxzZSwgcmVmOiAnZ3JpZC1zaWRlYmFyJywgaGVpZ2h0OiAnNDAwcHgnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YUdyaWQsIHsgcmVmOiAnZGF0YUdyaWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZERhdGE6IHRoaXMuZ3JpZERhdGFbJ2RhdGEnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zOiB0aGlzLmdyaWREYXRhWydncmlkQ29uZmlnJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZUFjdGlvbjogJ2RvY3NHcmlkQ2hhbmdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuY2xpY2tIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EYmxDbGljazogdGhpcy5kYmxDbGlja0hhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkhlYWRlckNsaWNrOiB0aGlzLmhlYWRlckNsaWNrSGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmdyaWRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ2FwaScgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RhbFBhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHJlZjogJ21vZGFscGFnZUZpbHRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlQnRuQ2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogJ0ZpbHRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdGhpcy5zdGF0ZS5nZXRGaWx0ZXIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEZpbHRlciwgeyByZWY6ICdncmlkRmlsdGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkQ29uZmlnOiB0aGlzLmdyaWREYXRhWydncmlkQ29uZmlnJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5maWx0ZXJEYXRhIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxQYWdlRGVsZXRlLCB7IHJlZjogJ21vZGFscGFnZURlbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VEZWxCdG5DbGljayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRoaXMuc3RhdGUuZ2V0RGVsZXRlTW9kYWxQYWdlIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZUluZm8sIHsgcmVmOiAnbW9kYWxwYWdlSW5mbycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VJbmZvQnRuQ2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0aGlzLnN0YXRlLnNob3dTeXN0ZW1NZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3lzdGVtTWVzc2FnZTogc3lzdGVtTWVzc2FnZSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiDQktC10YDQvdC10YIg0LrQvtC80L/QvtC90LXQvdGCINCe0YLRh9C10YIsINC10YHQu9C4INCy0YvQsdGA0LDQvdC90LDRjyDQstC10YLQutCwINGB0L7QtNC10YDQttC40YIg0YLQuNC/ID09IGFydWFubmVcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbnxYTUx9XHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlckFydWFubmVQYWdlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckFydWFubmVQYWdlKCkge1xuICAgICAgICAgICAgdmFyIGlzUmVwb3J0ID0gdGhpcy5pc1JlcG9ydHModGhpcy5zdGF0ZS50cmVlVmFsdWUpO1xuICAgICAgICAgICAgdmFyIENvbXBvbmVudCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgU2lkZWJhcixcbiAgICAgICAgICAgICAgICB7IHRvb2xiYXI6IHRydWUsIHJlZjogJ2FydWFubmUtc2lkZWJhcicsIGhlaWdodDogJzEwMCUnIH0sXG4gICAgICAgICAgICAgICAgJ0FydWFubmUnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIGlzUmVwb3J0ICYmIENvbXBvbmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqINCS0LXRgNC90LXRgiDQutC+0LzQv9C+0L3QtdGCIC0g0L/QsNC90LXQu9GMINC40L3RgdGC0YDRg9C80LXQvdGC0L7QsiDQtNC+0LrRg9C80LXQvdGC0LBcclxuICAgICAgICAgKiBAcmV0dXJucyB7WE1MfVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXJEb2NUb29sQmFyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckRvY1Rvb2xCYXIoKSB7XG4gICAgICAgICAgICB2YXIgdG9vbGJhclBhcmFtcyA9IHRoaXMucHJlcGFyZVBhcmFtc0ZvclRvb2xiYXIoKTsgLy/Qv9Cw0YDQsNC80LXRgtGA0Ysg0LTQu9GPINC60L3QvtC/0L7QuiDRg9C/0YDQsNCy0LvQtdC90LjRjywg0LLQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+0YIg0LDQutGC0LjQstC90L7QuSDRgdGC0YDQvtC60LhcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgVG9vbGJhckNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICB7IHJlZjogJ3Rvb2xiYXJDb250YWluZXInIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuQWRkLCB7IG9uQ2xpY2s6IHRoaXMuYnRuQWRkQ2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0bkFkZCddLnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlOiB0b29sYmFyUGFyYW1zWydidG5BZGQnXS5kaXNhYmxlZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5FZGl0LCB7IG9uQ2xpY2s6IHRoaXMuYnRuRWRpdENsaWNrLCBzaG93OiB0b29sYmFyUGFyYW1zWydidG5FZGl0J10uc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGU6IHRvb2xiYXJQYXJhbXNbJ2J0bkVkaXQnXS5kaXNhYmxlZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5EZWxldGUsIHsgb25DbGljazogdGhpcy5idG5EZWxldGVDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuRGVsZXRlJ10uc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGU6IHRvb2xiYXJQYXJhbXNbJ2J0bkRlbGV0ZSddLmRpc2FibGVkIH0pLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ0blByaW50LCB7IG9uQ2xpY2s6IHRoaXMuYnRuUHJpbnRDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuUHJpbnQnXS5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZTogdG9vbGJhclBhcmFtc1snYnRuUHJpbnQnXS5kaXNhYmxlZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5GaWx0ZXIsIHsgb25DbGljazogdGhpcy5idG5GaWx0ZXJDbGljayB9KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiDQktC10YDQvdC10YIg0LrQvtC80L/QvtC90LXRgiDRgSDQtNCw0L3QvdGL0LzQuCDRgdGC0YDQvtC60Lgg0YTQuNC70YzRgtGA0LDRhtC40LhcclxuICAgICAgICAgKiBAcmV0dXJucyB7WE1MfVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXJGaWx0ZXJUb29sYmFyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckZpbHRlclRvb2xiYXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBUb29sYmFyQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgIHsgcmVmOiAnZmlsdGVyVG9vbGJhckNvbnRhaW5lcicsIHBvc2l0aW9uOiAnbGVmdCcgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICdGaWx0ZXI6ICcsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyU3RyaW5nKClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog0J/RgNC+0LDQvdCw0LvQuNC30LjRgNGD0LXRgiDRgdCy0L7QudGB0YLQstCwINCy0YvQsdGA0LDQvdC90L7Qs9C+INC00L7QutGD0LzQtdC90YLQsCDQuCDQstC10YDQvdC10YIgdHJ1ZSAsINC10YHQu9C4INGC0LjQvyA9PSBBcnVhbm5lXHJcbiAgICAgICAgICogQHBhcmFtIGRvY3VtZW50XHJcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2lzUmVwb3J0cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpc1JlcG9ydHMoZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5maW5kQ29tcG9uZW50KCdkb2NzTGlzdCcpWzBdLmRhdGEsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnREYXRhID0gZGF0YS5maWx0ZXIoZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgICAgICAgIHJldHVybiByb3cua29vZCA9PT0gZG9jdW1lbnQgJiYgcm93LnByb3BzICYmIEpTT04ucGFyc2Uocm93LnByb3BzKS50eXBlID09PSAnYXJ1YW5uZSc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuICEhZG9jdW1lbnREYXRhLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZmluZENvbXBvbmVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBmaW5kQ29tcG9uZW50KGNvbXBvbmVudE5hbWUpIHtcbiAgICAgICAgICAgIC8vINCy0LXRgNC90LXRgiDQtNCw0L3QvdGL0LUg0LrQvtC80L/QvtC90LXQvdGC0LAg0L/QviDQtdCz0L4g0L3QsNC30LLQsNC90LjRjlxuICAgICAgICAgICAgdmFyIGNvbXBvbmVudERhdGEgPSBbXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuY29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50RGF0YSA9IHRoaXMucHJvcHMuY29tcG9uZW50cy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSA9PSBjb21wb25lbnROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWNvbXBvbmVudERhdGFbMF0ubmFtZSA9PSAnZG9jc0dyaWQnICYmIGNvbXBvbmVudERhdGFbMF0ubGFzdERvY0lkID09ICcwJyAmJiAhZmx1eC5zdG9yZXMuZG9jc1N0b3JlLmRvY3NHcmlkKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50RGF0YVswXS5sYXN0RG9jaWQgPSBjb21wb25lbnREYXRhWzBdLmRhdGFbMF0uaWQgfHwgMDtcbiAgICAgICAgICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INC90L7QvNC10YAg0LIg0YHRgtC+0YDQtVxuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RvY3NHcmlkQ2hhbmdlJywgY29tcG9uZW50RGF0YVswXS5kYXRhWzBdLmlkIHx8IDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50RGF0YTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYnRuRmlsdGVyQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnRuRmlsdGVyQ2xpY2soKSB7XG4gICAgICAgICAgICAvLyDQvtGC0LrRgNC+0LXRgiDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L4g0YEg0L/QvtC70Y/QvNC4INC00LvRjyDRhNC40LvRjNGC0YDQsNGG0LjQuFxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGdldEZpbHRlcjogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYnRuRGVsZXRlQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnRuRGVsZXRlQ2xpY2soKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZ2V0RGVsZXRlTW9kYWxQYWdlOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdidG5BZGRDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidG5BZGRDbGljaygpIHtcbiAgICAgICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC60LvQuNC6INC60L3QvtC/0LrQuCBcItCU0L7QsdCw0LLQuNGC0YxcIlxuICAgICAgICAgICAgLy8g0LLRi9C30L7QstC10Lwg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGE0LvQsNC60YHQtVxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignQWRkJyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2J0bkVkaXRDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidG5FZGl0Q2xpY2soKSB7XG4gICAgICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQutC70LjQuiDQutC90L7Qv9C60LggXCLQmNC30LzQtdC90LjRgtGMXCJcbiAgICAgICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ0VkaXQnKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYnRuUHJpbnRDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidG5QcmludENsaWNrKCkge1xuICAgICAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0LrQu9C40Log0LrQvdC+0L/QutC4IFwi0JjQt9C80LXQvdC40YLRjFwiXG4gICAgICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdQcmludCcpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjbGlja0hhbmRsZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY2xpY2tIYW5kbGVyKGFjdGlvbiwgaWQpIHtcbiAgICAgICAgICAgIC8vINGB0L7RhdGA0LDQvdC40Lwg0LIg0YXRgNCw0L3QuNC70LjRidC1XG4gICAgICAgICAgICBpZiAoYWN0aW9uICYmIGlkKSB7XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbihhY3Rpb24sIGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gJ2RvY3NHcmlkQ2hhbmdlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZERhdGEudmFsdWUgPSBpZDtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZ3JpZFZhbHVlOiBpZCB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVlRGF0YS52YWx1ZSA9IGlkO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0cmVlVmFsdWU6IGlkIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkYmxDbGlja0hhbmRsZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGJsQ2xpY2tIYW5kbGVyKCkge1xuICAgICAgICAgICAgLy8g0LLRi9C30L7QstC10YIg0LzQtdGC0L7QtCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdFZGl0Jyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hlYWRlckNsaWNrSGFuZGxlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoZWFkZXJDbGlja0hhbmRsZXIoc29ydEJ5KSB7XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzb3J0QnlDaGFuZ2UnLCBzb3J0QnkpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdtb2RhbFBhZ2VCdG5DbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBtb2RhbFBhZ2VCdG5DbGljayhidG5FdmVudCkge1xuICAgICAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LTQu9GPINC60L3QvtC/0LrQuCDRhNC40LvRjNGC0YDQsNGG0LjQuFxuICAgICAgICAgICAgdmFyIGZpbHRlclN0cmluZyA9ICcnO1xuICAgICAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcbiAgICAgICAgICAgICAgICAvLyDRgdC+0LHQuNGA0LDQtdC8INC00LDQvdC90YvQtVxuICAgICAgICAgICAgICAgIHZhciBncmlkRmlsdGVyID0gdGhpcy5yZWZzWydncmlkRmlsdGVyJ10sXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlckRhdGEgPSBncmlkRmlsdGVyLnN0YXRlLmRhdGE7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEgPSBmaWx0ZXJEYXRhLm1hcChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIChmaWx0ZXJTdHJpbmcubGVuZ3RoID4gMCA/IFwiIGFuZCBcIiA6IFwiIHdoZXJlIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocm93LnR5cGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSBmaWx0ZXJTdHJpbmcgKyByb3cucmVmcyArIFwiIGlsaWtlICclXCIgKyByb3cudmFsdWUgKyBcIiUnXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgaWxpa2UgJ1wiICsgcm93LnZhbHVlICsgXCIlJ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgcm93LnJlZnMgKyBcIiA9ICdcIiArIHJvdy52YWx1ZSArIFwiJ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSBmaWx0ZXJTdHJpbmcgKyByb3cucmVmcyArIFwiID0gXCIgKyByb3cudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ludGVnZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSBmaWx0ZXJTdHJpbmcgKyByb3cucmVmcyArIFwiID0gXCIgKyByb3cudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByb3c7XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgLy8g0L/RgNC40LzQtdC90LXQvCDRhNC40LvRjNGC0YBcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzcWxXaGVyZUNoYW5nZScsIGZpbHRlclN0cmluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZ2V0RmlsdGVyOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbW9kYWxQYWdlRGVsQnRuQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbW9kYWxQYWdlRGVsQnRuQ2xpY2soYnRuRXZlbnQpIHtcbiAgICAgICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INCy0YvQt9C+0LLQsCDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsCDRg9C00LDQu9C10L3QuNGPXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZ2V0RGVsZXRlTW9kYWxQYWdlOiBmYWxzZSB9KTtcblxuICAgICAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcbiAgICAgICAgICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignRGVsZXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ21vZGFsUGFnZUluZm9CdG5DbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBtb2RhbFBhZ2VJbmZvQnRuQ2xpY2soKSB7XG5cbiAgICAgICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INCy0YvQt9C+0LLQsCDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsCDRgdC40YHRgtC10LzQvdC+0LPQviDRgdC+0L7QsdGJ0LXQvdC40Y9cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93U3lzdGVtTWVzc2FnZTogZmFsc2UgfSk7XG4gICAgICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzeXN0ZW1NZXNzYWdlQ2hhbmdlJywgbnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiDRgdC+0LfQtNCw0YHRgiDQuNC3INC/0L7Qu3TQuSDQs9GA0LjQtNCwINC60L7QvNC/0L7QvdC10L3RgtGLINC00LvRjyDRhNC+0YDQvNC40YDQvtCy0LDQvdC40Y8g0YPRgdC70L7QstC40Lkg0YTQuNC70YzRgtGA0LDRhtC40LhcclxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl8Kn1cclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0RmlsdGVyRmllbGRzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEZpbHRlckZpZWxkcygpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgZ3JpZENvbXBvbmVudHMgPSBkb2NzU3RvcmUuZGF0YSxcbiAgICAgICAgICAgICAgICBncmlkRGF0YSA9IFtdLFxuICAgICAgICAgICAgICAgIHByZXZpb3NGaWx0ZXIgPSB0aGlzLmZpbHRlckRhdGE7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JpZENvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZENvbXBvbmVudHNbaV1bJ25hbWUnXSA9PSAnZG9jc0dyaWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vINC40YnQtdC8INC/0L7Qu9C1IGNvbHVtbnNcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZmllbGQgaW4gZ3JpZENvbXBvbmVudHNbaV0uZGF0YVswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkID09ICdjb2x1bW5zJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWREYXRhID0gZ3JpZENvbXBvbmVudHNbaV0uZGF0YVswXS5jb2x1bW5zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdyaWREYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhID0gW107IC8vINC+0LHQvdGD0LvQuNC8INC80LDRgdGB0LjQslxuXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEubWFwKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudFR5cGUgPSAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRPYmpla3RWYWx1ZSA9IHZvaWQgMDtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgcHJldmlvc0ZpbHRlci5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINC40YnQtdC8IFwi0YHRgtCw0YDQvtC1XCIg0LfQvdCw0YfQtdC90LjQtSDRhNC40LvRjNGC0YDQsCDQuCDQtdGB0LvQuCDQtdGB0YLRjCwg0YLQviDQvtGC0LTQsNC10Lwg0LXQs9C+IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvc0ZpbHRlcltfaV0ucmVmcyA9PSByb3cuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRPYmpla3RWYWx1ZSA9IHByZXZpb3NGaWx0ZXJbX2ldLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlID0gcm93LnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LHQtdGA0LXQvCDQvNCw0YHRgdC40LIg0L7QsdGK0LXQutGC0L7QslxuICAgICAgICAgICAgICAgICAgICBfdGhpczMuZmlsdGVyRGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJvdy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNvbXBvbmVudE9iamVrdFZhbHVlIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBjb21wb25lbnRUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmczogcm93LmlkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyRGF0YTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0RmlsdGVyU3RyaW5nJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEZpbHRlclN0cmluZygpIHtcbiAgICAgICAgICAgIC8vINC/0YDQtdC+0LHRgNCw0LfRg9C10YIg0LTQsNC90L3Ri9C1INGE0LjQu9GC0YDQsCDQsiDRgdGC0YDQvtC60YNcbiAgICAgICAgICAgIHZhciBzdHJpbmcgPSAnJztcblxuICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhLm1hcChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvdy52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmcgKyByb3cubmFtZSArICc6JyArIHJvdy52YWx1ZSArICc7ICc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwcmVwYXJlUGFyYW1zRm9yVG9vbGJhcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVwYXJlUGFyYW1zRm9yVG9vbGJhcigpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyDRh9C40YLQsNC10Lwg0LTQsNC90L3Ri9C1INGB0L4g0YHRgtC+0YDQsCwg0YTQvtGA0LzQuNGA0YPQtdC8INC/0LDRgNCw0LzQtdGC0YDRiyDQtNC70Y8g0LrQvdC+0L/QvtC6INGD0L/RgNCw0LLQu9C10L3QuNGPLCDQuCDRgtGD0LTQsCDQuNGFINC+0YLQtNCw0LXQvFxuICAgICAgICAgICAgLy9kb2NzR3JpZENoYW5nZSAoZmx1eC5zdG9yZXMuZG9jc1N0b3JlLilcbiAgICAgICAgICAgIHZhciBncmlkID0gdGhpcy5maW5kQ29tcG9uZW50KCdkb2NzR3JpZCcpIHx8IFtdLFxuICAgICAgICAgICAgICAgIGxhc3RSb3dJZCA9IHRoaXMuc3RhdGUuYWN0aXZSb3dJZCxcbiAgICAgICAgICAgICAgICBkYXRhID0gW10sXG4gICAgICAgICAgICAgICAgZGF0YVJvdyA9IFtdLFxuICAgICAgICAgICAgICAgIHRvb2xiYXJQYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgYnRuQWRkOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnRuRWRpdDoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJ0bkRlbGV0ZToge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJ0blByaW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsNC70LjRh9C40LUg0LTQsNC90L3Ri9GFLCDQtdGB0LvQuCDQtdGB0YLRjCDQv9GA0L7Qv9C40YXQvdC10Lwg0LrQvtC80L/QvtC90LXQvdGC0LDQvFxuXG4gICAgICAgICAgICBpZiAoZ3JpZC5sZW5ndGggPiAwICYmIGdyaWRbMF0uZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGdyaWRbMF0uZGF0YVswXS5kYXRhO1xuICAgICAgICAgICAgICAgIGRhdGFSb3cgPSBkYXRhLmZpbHRlcihmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT09IF90aGlzNC5zdGF0ZS5ncmlkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByb3c7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvb2xiYXJQYXJhbXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhUm93Lmxlbmd0aCA+IDAgJiYgZGF0YVJvd1swXS5zdGF0dXMgPT0gJ9Cf0YDQvtCy0LXQtNC10L0nKSB7XG4gICAgICAgICAgICAgICAgLy8g0YPQtNCw0LvRj9GC0Ywg0L3QtdC70YzQt9GPXG4gICAgICAgICAgICAgICAgdG9vbGJhclBhcmFtcy5idG5EZWxldGUuc2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRvb2xiYXJQYXJhbXM7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gUmVnaXN0ZXI7XG59KFJlYWN0LlB1cmVDb21wb25lbnQpO1xuXG5SZWdpc3Rlci5wcm9wVHlwZXMgPSB7XG4gICAgY29tcG9uZW50czogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVnaXN0ZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2NzL2RvYy1yZWdpc3Rlci9kb2MtcmVnaXN0ZXIuanN4XG4vLyBtb2R1bGUgaWQgPSAxMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi4vYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcycpLFxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcbiAgICBJQ09OID0gJ2ZpbHRlcic7XG5cbnZhciBCdXR0b25SZWdpc3RlckZpbHRlciA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhCdXR0b25SZWdpc3RlckZpbHRlciwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxuICAgIGZ1bmN0aW9uIEJ1dHRvblJlZ2lzdGVyRmlsdGVyKHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCdXR0b25SZWdpc3RlckZpbHRlcik7XG5cbiAgICAgICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChCdXR0b25SZWdpc3RlckZpbHRlci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEJ1dHRvblJlZ2lzdGVyRmlsdGVyKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhCdXR0b25SZWdpc3RlckZpbHRlciwgW3tcbiAgICAgICAga2V5OiAnaGFuZGxlQ2xpY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlQ2xpY2soZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DbGljaygpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIEJ1dHRvbixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlZjogJ2J0bkZpbHRlcicsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnRmlsdGVyJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93LFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLmhhbmRsZUNsaWNrKGUpO1xuICAgICAgICAgICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnaW1nJywgeyByZWY6ICdpbWFnZScsIHNyYzogc3R5bGVzLmljb25zW0lDT05dIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEJ1dHRvblJlZ2lzdGVyRmlsdGVyO1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcblxuLypcclxuQnV0dG9uUmVnaXN0ZXJGaWx0ZXIucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcbiovXG5cbkJ1dHRvblJlZ2lzdGVyRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgc2hvdzogdHJ1ZVxufTtcbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uUmVnaXN0ZXJGaWx0ZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZmlsdGVyL2J1dHRvbi1yZWdpc3Rlci1maWx0ZXIuanN4XG4vLyBtb2R1bGUgaWQgPSAxMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi4vbW9kYWxQYWdlLmpzeCcpLFxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL21vZGFscGFnZS1kZWxldGUvbW9kYWxwYWdlLWRlbGV0ZS1zdHlsZXMnKTtcblxudmFyIE1vZGFsUGFnZURlbGV0ZSA9IGZ1bmN0aW9uIChfUmVhY3QkUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhNb2RhbFBhZ2VEZWxldGUsIF9SZWFjdCRQdXJlQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIE1vZGFsUGFnZURlbGV0ZShwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTW9kYWxQYWdlRGVsZXRlKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoTW9kYWxQYWdlRGVsZXRlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTW9kYWxQYWdlRGVsZXRlKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2hvdzogX3RoaXMucHJvcHMuc2hvd1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKE1vZGFsUGFnZURlbGV0ZSwgW3tcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3c6IG5leHRQcm9wcy5zaG93IH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIG1vZGFsT2JqZWN0cyA9IFsnYnRuT2snLCAnYnRuQ2FuY2VsJ107XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIE1vZGFsUGFnZSxcbiAgICAgICAgICAgICAgICB7IHJlZjogJ21vZGFsUGFnZScsXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLnByb3BzLm1vZGFsUGFnZUJ0bkNsaWNrLFxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0aGlzLnN0YXRlLnNob3csXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZU5hbWU6ICdEZWxldGUgZG9jdW1lbnQnIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgcmVmOiAnY29udGFpbmVyJyB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbWcnLCB7IHJlZjogJ2ltYWdlJywgc3JjOiBzdHlsZXMuaWNvbiB9KSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcmVmOiAnbWVzc2FnZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICcgXFx1MDQyM1xcdTA0MzRcXHUwNDMwXFx1MDQzQlxcdTA0MzhcXHUwNDQyXFx1MDQ0QyBcXHUwNDM0XFx1MDQzRVxcdTA0M0FcXHUwNDQzXFx1MDQzQ1xcdTA0MzVcXHUwNDNEXFx1MDQ0MiA/ICdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gTW9kYWxQYWdlRGVsZXRlO1xufShSZWFjdC5QdXJlQ29tcG9uZW50KTtcbi8qXHJcbk1vZGFsUGFnZURlbGV0ZS5wcm9wVHlwZXMgPSB7XHJcbiAgICBtb2RhbFBhZ2VCdG5DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcbiovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFBhZ2VEZWxldGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2UtZGVsZXRlL21vZGFsUGFnZS1kZWxldGUuanN4XG4vLyBtb2R1bGUgaWQgPSAxMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpY29uOiAnaW1hZ2VzL2ljb25zL2RlbGV0ZS5wbmcnXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWRlbGV0ZS9tb2RhbHBhZ2UtZGVsZXRlLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4uL21vZGFsUGFnZS5qc3gnKSxcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuLi9tb2RhbHBhZ2UtaW5mby9tb2RhbHBhZ2UtaW5mby1zdHlsZXMnKTtcblxudmFyIE1vZGFsUGFnZUluZm8gPSBmdW5jdGlvbiAoX1JlYWN0JFB1cmVDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoTW9kYWxQYWdlSW5mbywgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gTW9kYWxQYWdlSW5mbyhwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTW9kYWxQYWdlSW5mbyk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKE1vZGFsUGFnZUluZm8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNb2RhbFBhZ2VJbmZvKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2hvdzogX3RoaXMucHJvcHMuc2hvd1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoTW9kYWxQYWdlSW5mbywgW3tcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3c6IG5leHRQcm9wcy5zaG93IH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuXG4gICAgICAgICAgICB2YXIgc3lzdGVtTWVzc2FnZSA9IHRoaXMucHJvcHMuc3lzdGVtTWVzc2FnZSA/IHRoaXMucHJvcHMuc3lzdGVtTWVzc2FnZSA6ICcnLFxuICAgICAgICAgICAgICAgIG1vZGFsT2JqZWN0cyA9IFsnYnRuT2snXTtcblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgTW9kYWxQYWdlLFxuICAgICAgICAgICAgICAgIHsgcmVmOiAnbW9kYWxQYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMucHJvcHMubW9kYWxQYWdlQnRuQ2xpY2ssXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZU5hbWU6ICdXYXJuaW5nIScsXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsT2JqZWN0czogbW9kYWxPYmplY3RzIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgcmVmOiAnY29udGFpbmVyJyB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbWcnLCB7IHJlZjogJ2ltYWdlJywgc3JjOiBzdHlsZXMuaWNvbiB9KSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAgICAgICAgICAgICBzeXN0ZW1NZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJyAnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIE1vZGFsUGFnZUluZm87XG59KFJlYWN0LlB1cmVDb21wb25lbnQpO1xuXG5Nb2RhbFBhZ2VJbmZvLnByb3BUeXBlcyA9IHtcbiAgICBzeXN0ZW1NZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiBQcm9wVHlwZXMuZnVuY1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFBhZ2VJbmZvO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWluZm8vbW9kYWxQYWdlLWluZm8uanN4XG4vLyBtb2R1bGUgaWQgPSAxNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpY29uOiAnaW1hZ2VzL2ljb25zL2luZm8ucG5nJ1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1pbmZvL21vZGFscGFnZS1pbmZvLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vdHJlZS1zdHlsZXMuanMnKTtcblxudmFyIFRyZWUgPSBmdW5jdGlvbiAoX1JlYWN0JFB1cmVDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoVHJlZSwgX1JlYWN0JFB1cmVDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gVHJlZShwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVHJlZSk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFRyZWUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihUcmVlKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIHZhciBpZHggPSAwO1xuXG4gICAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgaW5kZXg6IF90aGlzLmdldEluZGV4KHByb3BzLnZhbHVlKSxcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZVxuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5oYW5kbGVMaUNsaWNrID0gX3RoaXMuaGFuZGxlTGlDbGljay5iaW5kKF90aGlzKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhUcmVlLCBbe1xuICAgICAgICBrZXk6ICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgICAgICB0aGlzLmdldEluZGV4KG5leHRQcm9wcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaW5kZXg6IHRoaXMuZ2V0SW5kZXgobmV4dFByb3BzLnZhbHVlKSwgdmFsdWU6IG5leHRQcm9wcy52YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgcmVmOiAndHJlZScgfSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRyZWUoJzAnKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqINCe0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQutC70LjQutCwXHJcbiAgICAgICAgICogQHBhcmFtIHNlbGVjdGVkSW5kZXhcclxuICAgICAgICAgKiBAcGFyYW0gc2VsZWN0ZWRJZFxyXG4gICAgICAgICAqIEBwYXJhbSBpc05vZGVcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlTGlDbGljaycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVMaUNsaWNrKHNlbGVjdGVkSW5kZXgsIHNlbGVjdGVkSWQsIGlzTm9kZSkge1xuICAgICAgICAgICAgaWYgKCFpc05vZGUgJiYgIWlzTmFOKHNlbGVjdGVkSWQpKSB7XG4gICAgICAgICAgICAgICAgLy8g0L3QtSDQvdC+0LTQsCwg0LAg0LTQvtC60YPQvNC10L3RglxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5wcm9wcy5kYXRhLmZpbHRlcihmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT0gc2VsZWN0ZWRJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvdztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGFbMF1bdGhpcy5wcm9wcy5iaW5kRGF0YUZpZWxkXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBpbmRleDogc2VsZWN0ZWRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrQWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25DbGlja0FjdGlvbih0aGlzLnByb3BzLm5hbWUgKyAnQ2hhbmdlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqINCy0LXRgNC90LXRgiDQtNCw0L3QvdGL0LUg0LTQu9GPINC90L7QtNGLID0gcGFyZW50SWRcclxuICAgICAgICAgKiBAcGFyYW0gcGFyZW50SWRcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0Q2hpbGRyZW4nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2hpbGRyZW4ocGFyZW50SWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmRhdGEuZmlsdGVyKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICAgICAgICBpZiAocm93LnBhcmVudGlkID09IHBhcmVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByb3c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiDQn9C+0YHRgtGA0L7QtdGCINC00LXRgNC10LLQviDQtNC70Y8g0L3QvtC00YsgPSBwYXJlbnRJZFxyXG4gICAgICAgICAqIEBwYXJhbSBwYXJlbnRJZFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtYTUx9XHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldFRyZWUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VHJlZShwYXJlbnRJZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5nZXRDaGlsZHJlbihwYXJlbnRJZCksXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnN0YXRlLnZhbHVlO1xuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAndWwnLFxuICAgICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy51bCwgcmVmOiAndHJlZS11bCcgfSxcbiAgICAgICAgICAgICAgICBkYXRhLm1hcChmdW5jdGlvbiAoc3ViUm93LCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMubGksIHZhbHVlID09IHN1YlJvd1tfdGhpczIucHJvcHMuYmluZERhdGFGaWVsZF0gJiYgIXN1YlJvdy5pc19ub2RlID8gc3R5bGVzLmZvY3VzZWQgOiB7fSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZJZCA9ICdsaS0nICsgaW5kZXg7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGknLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogX3RoaXMyLmhhbmRsZUxpQ2xpY2suYmluZChfdGhpczIsIGluZGV4LCBzdWJSb3cuaWQsIHN1YlJvdy5pc19ub2RlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHJlZklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogcmVmSWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YlJvdy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMyLmdldFRyZWUoc3ViUm93LmlkKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog0JLQtdGA0L3QtdGCINC40L3QtNC10LrRgSDRgdGC0YDQvtC60Lgg0LPQtNC1INC30LDQtNCw0L3QvdC+0LUg0L/QvtC70LUg0LjQvNC10LXRgiDQt9C90LDRh9C10L3QuNC1IHZhbHVlXHJcbiAgICAgICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0SW5kZXgnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0SW5kZXgodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciB0cmVlSW5kZXggPSAwO1xuICAgICAgICAgICAgLy8gd2UgZ290IHZhbHVlLCB3ZSBzaG91bGQgZmluZCBpbmRleCBhbmQgaW5pdGlsaXplIGlkeCBmaWVsZFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkrKzsgaSA8IHRoaXMucHJvcHMuZGF0YVswXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5kYXRhWzBdLmRhdGFbaV1bdGhpcy5wcm9wcy5iaW5kRGF0YUZpZWxkXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZm91bmRcbiAgICAgICAgICAgICAgICAgICAgdHJlZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cmVlSW5kZXg7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gVHJlZTtcbn0oUmVhY3QuUHVyZUNvbXBvbmVudCk7XG5cblRyZWUucHJvcFR5cGVzID0ge1xuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGE6IFByb3BUeXBlcy5hcnJheSxcbiAgICBiaW5kRGF0YUZpZWxkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbn07XG5cblRyZWUuZGVmYXVsdFByb3BzID0ge1xuICAgIGRhdGE6IFt7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICBwYXJlbnRJZDogMCxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGtvb2Q6ICcnLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2VcbiAgICB9XSxcbiAgICB2YWx1ZTogbnVsbCxcbiAgICBiaW5kRGF0YUZpZWxkOiAnaWQnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyZWU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3RyZWUvdHJlZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDE0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVsOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgbWFyZ2luUmlnaHQ6ICcyMHB4JyxcbiAgICAgICAgcGFkZGluZ0xlZnQ6ICcxNXB4JyxcbiAgICAgICAgZGlzcGxheTogJ2xpc3QtaXRlbSdcbiAgICB9LFxuICAgIGxpOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgbWFyZ2luUmlnaHQ6ICcyMHB4J1xuICAgIH0sXG4gICAgZm9jdXNlZDoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdsaWdodGJsdWUnXG4gICAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvdHJlZS90cmVlLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgc2lkZUJhclN0eWxlcyA9IHJlcXVpcmUoJy4vc2lkZWJhci1zdHlsZXMnKSxcbiAgICBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBTaWRlQmFyQ29udGFpbmVyID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoU2lkZUJhckNvbnRhaW5lciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBTaWRlQmFyQ29udGFpbmVyKHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTaWRlQmFyQ29udGFpbmVyKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoU2lkZUJhckNvbnRhaW5lci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNpZGVCYXJDb250YWluZXIpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB3aWR0aDogcHJvcHMud2lkdGgsXG4gICAgICAgICAgICBjb250ZW50V2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICB0b29sQmFyOiBwcm9wcy50b29sYmFyXG4gICAgICAgIH07XG5cbiAgICAgICAgX3RoaXMuYnRuQ2xpY2tIYW5kbGVyID0gX3RoaXMuYnRuQ2xpY2tIYW5kbGVyLmJpbmQoX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKFNpZGVCYXJDb250YWluZXIsIFt7XG4gICAgICAgIGtleTogJ2J0bkNsaWNrSGFuZGxlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidG5DbGlja0hhbmRsZXIoKSB7XG4gICAgICAgICAgICB2YXIgd2lkdGggPSB0aGlzLnN0YXRlLnNob3cgPyAnMjBweCcgOiB0aGlzLnByb3BzLndpZHRoLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRXaWR0aCA9IHRoaXMuc3RhdGUuc2hvdyA/ICcxcHgnIDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIHNob3dDb250ZW50ID0gIXRoaXMuc3RhdGUuc2hvdztcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRXaWR0aDogY29udGVudFdpZHRoLFxuICAgICAgICAgICAgICAgIHNob3c6IHNob3dDb250ZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciB0b29sQmFyU3ltYm9sID0gdGhpcy5zdGF0ZS5zaG93ID8gJzwnIDogJz4nOyAvL0B0b2RvIG1vdmUgdG8gc3R5bGVzIGZpbGVcblxuICAgICAgICAgICAgLy9wcmVwYWlyZSBzdHlsZXNcbiAgICAgICAgICAgIHZhciBzaWRlQmFyQ29udGFpbmVyU3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzaWRlQmFyU3R5bGVzLnNpZGVCYXJDb250YWluZXJTdHlsZSwgeyB3aWR0aDogdGhpcy5zdGF0ZS53aWR0aCB9LCB7IGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQgfSksXG4gICAgICAgICAgICAgICAgdG9vbEJhclN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc2lkZUJhclN0eWxlcy50b29sQmFyU3R5bGUsIHsgdmlzaWJpbGl0eTogdGhpcy5wcm9wcy50b29sYmFyID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSksXG4gICAgICAgICAgICAgICAgY29udGVudFN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc2lkZUJhclN0eWxlcy5jb250ZW50U3R5bGUsIHsgdmlzaWJpbGl0eTogdGhpcy5zdGF0ZS5zaG93ID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSksXG4gICAgICAgICAgICAgICAgYnV0dG9uU3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzaWRlQmFyU3R5bGVzLmJ1dHRvblN0eWxlLCB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLnRvb2xiYXIgPyBzaWRlQmFyU3R5bGVzLmJ1dHRvblN0eWxlLmhlaWdodCA6ICcwJyxcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiB0aGlzLnByb3BzLnRvb2xiYXIgPyAndmlzaWJsZScgOiAnaGlkZGVuJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgaWQ6ICd0b29sQmFyQ29udGFpbmVyJywgc3R5bGU6IHNpZGVCYXJDb250YWluZXJTdHlsZSwgcmVmOiAndG9vbGJhcicgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogJ2J0bkJhcicsIHN0eWxlOiB0b29sQmFyU3R5bGUgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7IHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiAnc2lkZWJhci1idXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGJ1dHRvblN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRvb2xCYXJTeW1ib2wsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmJ0bkNsaWNrSGFuZGxlclxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6ICdjb250ZW50Jywgc3R5bGU6IGNvbnRlbnRTdHlsZSwgcmVmOiAnY29udGVudCcgfSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gU2lkZUJhckNvbnRhaW5lcjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuU2lkZUJhckNvbnRhaW5lci5wcm9wVHlwZXMgPSB7XG4gICAgdG9vbGJhcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgd2lkdGg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaGVpZ3RoOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5TaWRlQmFyQ29udGFpbmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgICB0b29sYmFyOiB0cnVlLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMTAwJSdcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2lkZUJhckNvbnRhaW5lcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzeFxuLy8gbW9kdWxlIGlkID0gMTQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc2lkZUJhckNvbnRhaW5lclN0eWxlOiB7XG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIGhlaWdodDogJzQwMHB4JyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHJlZCcsXG4gICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZSdcbiAgICB9LFxuXG4gICAgdG9vbEJhclN0eWxlOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgaGVpZ2h0OiAnYXV0bycsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsXG4gICAgICAgIGJhY2tncm91bmQ6ICdncmF5JyxcbiAgICAgICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnXG4gICAgfSxcbiAgICBjb250ZW50U3R5bGU6IHtcbiAgICAgICAgaGVpZ2h0OiAnaW5oZXJpdCcsXG4gICAgICAgIHdpZHRoOiAnMTAwJSdcbiAgICB9LFxuXG4gICAgYnV0dG9uU3R5bGU6IHtcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIGhlaWdodDogJzIwcHgnLFxuICAgICAgICB3aWR0aDogJzIwcHgnXG4gICAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udGFpbmVyOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleEZsb3c6ICdyb3cgd3JhcCcsXG4gICAgICAgIGhlaWdodDogJzg3JScsXG4gICAgICAgIGJvcmRlcjogJzNweCBzb2xpZCBicm93bidcbiAgICB9LFxuICAgIHdyYXBwZXI6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgZmxleDogJzEgMTAwJScsXG4gICAgICAgIGFsaWduSXRlbXM6ICdzdHJldGNoJyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdydcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy9kb2MtcmVnaXN0ZXIvZG9jLXJlZ2lzdGVyLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vZ3JpZC1maWx0ZXItc3R5bGVzJyk7XG5cbnZhciBHcmlkRmlsdGVyID0gZnVuY3Rpb24gKF9SZWFjdCRQdXJlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKEdyaWRGaWx0ZXIsIF9SZWFjdCRQdXJlQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIEdyaWRGaWx0ZXIocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEdyaWRGaWx0ZXIpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChHcmlkRmlsdGVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoR3JpZEZpbHRlcikpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGdyaWRDb25maWc6IF90aGlzLnByb3BzLmdyaWRDb25maWcsIC8vIGdyaWQgY29uZmlnXG4gICAgICAgICAgICBkYXRhOiBfdGhpcy5wcm9wcy5kYXRhIC8vIGZpbHRlciBkYXRhXG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLmhhbmRsZUNoYW5nZSA9IF90aGlzLmhhbmRsZUNoYW5nZS5iaW5kKF90aGlzKTtyZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiDQntCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwINC40LfQvNC10L3QtdC90LjRjyDQuNC90L/Rg9GC0L7QslxyXG4gICAgICogQHBhcmFtIGVcclxuICAgICAqL1xuXG5cbiAgICBfY3JlYXRlQ2xhc3MoR3JpZEZpbHRlciwgW3tcbiAgICAgICAga2V5OiAnaGFuZGxlQ2hhbmdlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUNoYW5nZShlKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcbiAgICAgICAgICAgICAgICBpZCA9IGUudGFyZ2V0Lm5hbWUsXG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuc3RhdGUuZGF0YSxcbiAgICAgICAgICAgICAgICBpbmRleCA9IHZvaWQgMDtcblxuICAgICAgICAgICAgLy8g0L3QsNC00L4g0L3QsNC50YLQuCDRjdC70LXQvNC10L3RgiDQvNCw0YHRgdC40LLQsCDRgSDQtNCw0L3QvdGL0LzQuCDQtNC70Y8g0Y3RgtC+0LPQviDQutC+0LzQv9C+0L3QtdC90YLQsFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbaV0ucmVmcyA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbmRleCkge1xuICAgICAgICAgICAgICAgIGRhdGFbaW5kZXhdLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRhdGE6IGRhdGEgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBncmlkQ29uZmlnOiBuZXh0UHJvcHMuZ3JpZENvbmZpZywgZGF0YTogbmV4dFByb3BzLmRhdGEgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgLy8g0YHQvtC30LTQsNGB0YIg0LjQtyDQv9C+0LvQtdC5INCz0YDQuNC00LAg0LrQvtC80L/QvtC90LXQvdGC0Ysg0LTQu9GPINGE0L7RgNC80LjRgNC+0LLQsNC90LjRjyDRg9GB0LvQvtCy0LjQuSDRhNC40LvRjNGC0YDQsNGG0LjQuFxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmZpZWxkc2V0IH0sXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ncmlkQ29uZmlnLm1hcChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnRUeXBlID0gcm93LnR5cGUgPyByb3cudHlwZSA6ICd0ZXh0JztcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmZvcm1XaWRnZXQsIGtleTogJ2ZpZWxkU2V0LScgKyByb3cuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogc3R5bGVzLmZvcm1XaWRnZXRMYWJlbCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMuZm9ybVdpZGdldElucHV0IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7IHN0eWxlOiBzdHlsZXMuaW5wdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGNvbXBvbmVudFR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiByb3cubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcm93LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogcm93Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogcm93LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3RoaXMyLnByb3BzLmRhdGFbcm93LmlkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IF90aGlzMi5oYW5kbGVDaGFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogX3RoaXMyLnByb3BzLmRhdGFbcm93LmlkXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gR3JpZEZpbHRlcjtcbn0oUmVhY3QuUHVyZUNvbXBvbmVudCk7XG5cbkdyaWRGaWx0ZXIucHJvcFR5cGVzID0ge1xuICAgIGdyaWRDb25maWc6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIGRhdGE6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRGaWx0ZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC9ncmlkLWZpbHRlci9ncmlkLWZpbHRlci5qc3hcbi8vIG1vZHVsZSBpZCA9IDE0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZvcm1XaWRnZXQ6IHtcbiAgICAgICAgbWFyZ2luQm90dG9tOiAnNXB4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93J1xuICAgIH0sXG4gICAgZm9ybVdpZGdldExhYmVsOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsXG4gICAgICAgIHdpZHRoOiAnNDAlJyxcbiAgICAgICAgbWFyZ2luUmlnaHQ6ICcxMHB4J1xuICAgIH0sXG4gICAgZm9ybVdpZGdldElucHV0OiB7XG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIGJvcmRlclJhZGl1czogJzJweCcsXG4gICAgICAgIHBhZGRpbmc6ICczcHgnLFxuICAgICAgICBib3JkZXI6ICcwcHgnXG4gICAgfSxcblxuICAgIGlucHV0OiB7XG4gICAgICAgIGJvcmRlclJhZGl1czogJzJweCcsXG4gICAgICAgIHBhZGRpbmc6ICc1cHgnLFxuICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuXG4gICAgfSxcblxuICAgIGZpZWxkU2V0OiB7XG4gICAgICAgIGJvcmRlclJhZGl1czogJzJweCcsXG4gICAgICAgIG1hcmdpbjogJzEwcHgnXG4gICAgfSxcblxuICAgIHVpOiB7XG4gICAgICAgIGJvcmRlclJhZGl1czogJzJweCcsXG4gICAgICAgIHBhZGRpbmc6ICc1cHgnLFxuICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuXG4gICAgfVxuXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhLWdyaWQvZ3JpZC1maWx0ZXIvZ3JpZC1maWx0ZXItc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcbiAgICBPUkRFUl9CWSA9IFt7IGNvbHVtbjogJ2lkJywgZGlyZWN0aW9uOiAnZGVzYycgfV07XG5cbnZhciBkb2NzU3RvcmUgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgICBpZDogJ2RvY3NTdG9yZScsXG4gICAgaW5pdGlhbFN0YXRlOiB7XG4gICAgICAgIGRvY3NHcmlkOiAwLFxuICAgICAgICBkb2NzTGlzdDogJycsXG4gICAgICAgIG5hbWU6ICd2bGFkJyxcbiAgICAgICAgZGF0YTogW10sXG4gICAgICAgIHNvcnRCeTogT1JERVJfQlksXG4gICAgICAgIHNxbFdoZXJlOiAnJyxcbiAgICAgICAgc3lzdGVtTWVzc2FnZTogbnVsbCxcbiAgICAgICAgdXNlckRhdGE6IHt9LFxuICAgICAgICBsb2dlZEluOiBmYWxzZVxuICAgIH0sXG4gICAgYWN0aW9uQ2FsbGJhY2tzOiB7XG4gICAgICAgIHN5c3RlbU1lc3NhZ2VDaGFuZ2U6IGZ1bmN0aW9uIHN5c3RlbU1lc3NhZ2VDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgc3lzdGVtTWVzc2FnZTogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNxbFdoZXJlQ2hhbmdlOiBmdW5jdGlvbiBzcWxXaGVyZUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBzcWxXaGVyZTogdmFsdWUgfSk7XG4gICAgICAgICAgICByZXF1ZXJ5KHsgbmFtZTogJ2RvY3NHcmlkJywgdmFsdWU6IHRoaXMuZG9jc0xpc3QgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNvcnRCeUNoYW5nZTogZnVuY3Rpb24gc29ydEJ5Q2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHNvcnRCeTogdmFsdWUgfSk7XG4gICAgICAgICAgICByZXF1ZXJ5KHsgbmFtZTogJ2RvY3NHcmlkJywgdmFsdWU6IHRoaXMuZG9jc0xpc3QsIHNvcnRCeTogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIEFkZDogZnVuY3Rpb24gQWRkKCkge1xuICAgICAgICAgICAgYWRkKHRoaXMuZG9jc0xpc3QpO1xuICAgICAgICB9LFxuICAgICAgICBFZGl0OiBmdW5jdGlvbiBFZGl0KCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZG9jc0xpc3QgJiYgdGhpcy5kb2NzR3JpZCkge1xuICAgICAgICAgICAgICAgIGVkaXQodGhpcy5kb2NzTGlzdCwgdGhpcy5kb2NzR3JpZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ9Ci0LjQvyDQtNC+0LrRg9C80LXQvdGC0LAg0LjQu9C4INC00L7QutGD0LzQtdC90YIg0L3QtSDQstGL0LHRgNCw0L0nLCB0aGlzLmRvY3NMaXN0LCB0aGlzLmRvY3NHcmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgRGVsZXRlOiBmdW5jdGlvbiBEZWxldGUoKSB7XG4gICAgICAgICAgICB2YXIgZG9jVHlwZUlkID0gdGhpcy5kb2NzTGlzdDtcbiAgICAgICAgICAgIHJlcXVlcnlGb3JBY3Rpb24oJ2RlbGV0ZScsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3N5c3RlbU1lc3NhZ2VDaGFuZ2UnLCBlcnIpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzeXN0ZW1NZXNzYWdlQ2hhbmdlJywgbnVsbCk7IC8vINC/0LjRiNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyINGF0YDQsNC90LjQu9C40YnQtVxuICAgICAgICAgICAgICAgICAgICByZXF1ZXJ5KHsgbmFtZTogJ2RvY3NHcmlkJywgdmFsdWU6IGRvY1R5cGVJZCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgUHJpbnQ6IGZ1bmN0aW9uIFByaW50KCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J1dHRvbiBQcmludCBjbGlrZWQhJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGNoYW5nZU5hbWU6IGZ1bmN0aW9uIGNoYW5nZU5hbWUodXBkYXRlciwgbmFtZSkge1xuICAgICAgICAgICAgLy8gU3RvcmVzIHVwZGF0ZXMgYXJlIG9ubHkgbWFkZSBpbnNpZGUgc3RvcmUncyBhY3Rpb24gY2FsbGJhY2tzXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IG5hbWU6IG5hbWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRvY3NHcmlkQ2hhbmdlOiBmdW5jdGlvbiBkb2NzR3JpZENoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gU3RvcmVzIHVwZGF0ZXMgYXJlIG9ubHkgbWFkZSBpbnNpZGUgc3RvcmUncyBhY3Rpb24gY2FsbGJhY2tzXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRvY3NHcmlkOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZG9jc0xpc3RDaGFuZ2U6IGZ1bmN0aW9uIGRvY3NMaXN0Q2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIHZhciBsYXN0VmFsdWUgPSBmbHV4LnN0b3Jlcy5kb2NzU3RvcmUuZG9jc0xpc3QgfHwgJ0RPSyc7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IGxhc3RWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZG9jc0xpc3Q6IHZhbHVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc3FsV2hlcmVDaGFuZ2UnLCAnJyk7XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzb3J0QnlDaGFuZ2UnLCBPUkRFUl9CWSk7XG5cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbG9jYWxTdG9yYWdlWydkb2NzTGlzdCddID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFDaGFuZ2U6IGZ1bmN0aW9uIGRhdGFDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkYXRhOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIGlmICghdGhpcy5kb2NzR3JpZCkge1xuICAgICAgICAgICAgICAgIHZhciBncmlkVmFsdWUgPSB2YWx1ZVsxXS5kYXRhWzBdLmRhdGFbMF0uaWQ7XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZG9jc0dyaWRDaGFuZ2UnLCBncmlkVmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZG9jc0xpc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJlZVZhbHVlID0gdmFsdWVbMF0udmFsdWU7XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZG9jc0xpc3RDaGFuZ2UnLCB0cmVlVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB1c2VyRGF0YUNoYW5nZTogZnVuY3Rpb24gdXNlckRhdGFDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgdXNlckRhdGE6IHZhbHVlIH0pO1xuXG4gICAgICAgICAgICB2YXIgbG9nZWRJbiA9ICEhdXNlckRhdGE7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGxvZ2VkSW46IGxvZ2VkSW4gfSk7XG4gICAgICAgIH1cblxuICAgIH1cbn0pO1xuXG52YXIgZWRpdCA9IGZ1bmN0aW9uIGVkaXQoZG9jVHlwZUlkLCBkb2NJZCkge1xuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBcIi9kb2N1bWVudC9cIiArIGRvY1R5cGVJZCArIGRvY0lkO1xufTtcblxudmFyIGFkZCA9IGZ1bmN0aW9uIGFkZChkb2NUeXBlSWQpIHtcbiAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gXCIvZG9jdW1lbnQvXCIgKyBkb2NUeXBlSWQgKyAnMCc7XG59O1xuXG52YXIgcmVxdWVyeUZvckFjdGlvbiA9IGZ1bmN0aW9uIHJlcXVlcnlGb3JBY3Rpb24oYWN0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghd2luZG93LmpRdWVyeSB8fCAhJCkgcmV0dXJuOyAvLyDQtNC70Y8g0YLQtdGB0YLQvtCyXG5cbiAgICAvLyDQvNC10YLQvtC0INC+0LHQtdGB0L/QtdGH0LjRgiDQt9Cw0L/RgNC+0YEg0L3QsCDQstGL0L/QvtC70L3QtdC90LjQtVxuICAgIHZhciBkb2NJZCA9IGRvY3NTdG9yZS5kb2NzR3JpZCxcbiAgICAgICAgZG9jVHlwZUlkID0gZG9jc1N0b3JlLmRvY3NMaXN0O1xuXG4gICAgaWYgKCFkb2NJZCB8fCB0eXBlb2YgZG9jSWQgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgZG9jSWQgPSAwO1xuICAgIH1cblxuICAgIGlmICghZG9jSWQpIHtcbiAgICAgICAgLy8gZG9jIG5vdCBzZWxlY3RlZFxuICAgICAgICB2YXIgZGF0YSA9IGRvY3NTdG9yZS5kYXRhO1xuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgICAgLy9AdG9kbyDQn9GA0LjQstC10YHRgtC4INCyINCx0L7QttC10YHQutC40Lkg0LLQuNC0XG4gICAgICAgICAgICBpZiAoIWRvY1R5cGVJZCAmJiByb3cubmFtZSA9PSAnZG9jc0xpc3QnKSB7XG4gICAgICAgICAgICAgICAgLy8g0L3QtSDQvdCw0LfQvdCw0YfQtdC9INGC0LjQvyDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAgICAgICAgICAgICBkb2NUeXBlSWQgPSByb3dbJ3ZhbHVlJ107XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZG9jc0xpc3RDaGFuZ2UnLCBkb2NUeXBlSWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocm93Lm5hbWUgPT0gJ2RvY3NHcmlkJykge1xuICAgICAgICAgICAgICAgIGRvY0lkID0gcm93LmRhdGFbMF0uZGF0YVswXS5pZDtcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NzR3JpZENoYW5nZScsIGRvY0lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHBhcmFtZXRlcnMgPSB7XG4gICAgICAgIGRvY0lkOiBkb2NJZCxcbiAgICAgICAgZG9jX3R5cGVfaWQ6IGRvY1R5cGVJZFxuICAgIH07XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2RvYycsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBhcmFtZXRlcnMpXG4gICAgICAgIH0sXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgICAgICAvLyDQtNC+0LvQttC90Ysg0L/QvtC70YPRh9C40YLRjCDQvtCx0YrQtdC60YIgLSDRgNC10LfRg9C70YzRgtCw0YJcbiAgICAgICAgICAgIHZhciBlcnJvck1lc3NzYWdlID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCA9PSAnRXJyb3InKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzc2FnZSA9ICdFcnJvciwgJyArIGRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3JNZXNzc2FnZSwgZGF0YSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcih4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCcvZXJyb3InLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbnZhciByZXF1ZXJ5ID0gZnVuY3Rpb24gcmVxdWVyeShjb21wb25lbnQpIHtcbiAgICBpZiAoIXdpbmRvdy5qUXVlcnkpIHJldHVybjsgLy8g0LTQu9GPINGC0LXRgdGC0L7QslxuXG4gICAgLy8g0LzQtdGC0L7QtCDQvtCx0LXRgdC/0LXRh9C40YIg0L/QvtC70YPRh9C10L3QuNC1INC00LDQvdC90YvRhSDQvtGCINGB0LXRgNCy0LXRgNCwXG4gICAgLy8gY29tcG9uZW50ID0gdGhpcy5zdGF0ZS5jb21wb25lbnRzW25hbWVdXG4gICAgLy8g0LXRgdC70Lgg0L/QsNGA0LDQvNC10YLRgNGLINC90LUg0LfQsNC00LDQvdGLLCDQs9GA0YPQt9C40Lwg0LLRgdC1XG5cbiAgICB2YXIgY29tcG9uZW50cyA9IGRvY3NTdG9yZS5kYXRhO1xuXG4gICAgLy8g0YTQuNC70YzRgtGA0YPQtdC8INGB0L/QuNGB0L7QuiDQutC+0LzQv9C+0L3QtdC90YLQvtCyXG4gICAgdmFyIGNvbXBvbmVudHNGb3JVcGRhdGUgPSBjb21wb25lbnRzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAvLyDQuNGJ0LXQvCDQvtCx0YrQtdC60YIg0L/QviDQvdCw0LjQvNC10L3QvtCy0LDQvdC40Y4uINC40LvQuCDQstC10YDQvdC10Lwg0LLRgdC1INC10YHQu9C4INC/0LDRgNCw0LzQtdGC0YAg0L3QtSDQt9Cw0LTQsNC9XG4gICAgICAgIGlmIChjb21wb25lbnQubmFtZSA9PSAnJyB8fCBpdGVtLm5hbWUgPT0gY29tcG9uZW50Lm5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWU7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vINGB0L7RgNGC0LjRgNC+0LLQutCwXG4gICAgdmFyIHNxbFNvcnRCeSA9ICcnLFxuICAgICAgICBzcWxXaGVyZSA9IGRvY3NTdG9yZS5zcWxXaGVyZSB8fCAnJyxcbiAgICAgICAgc29ydEJ5QXJyYXkgPSBkb2NzU3RvcmUuc29ydEJ5O1xuXG4gICAgaWYgKGRvY3NTdG9yZS5zb3J0QnkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3J0QnlBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgc3FsU29ydEJ5ID0gc3FsU29ydEJ5ICsgJywnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3FsU29ydEJ5ID0gc3FsU29ydEJ5ICsgc29ydEJ5QXJyYXlbaV0uY29sdW1uICsgJyAnICsgc29ydEJ5QXJyYXlbaV0uZGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIFVSTCA9ICcvYXBpL2RvY3MnO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogVVJMLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcblxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBkYXRhVHlwZTogJ2NvbXBvbmVudCcsXG4gICAgICAgICAgICBkb2NUeXBlSWQ6IDEsXG4gICAgICAgICAgICBjb21wb25lbnRzOiBKU09OLnN0cmluZ2lmeShjb21wb25lbnRzRm9yVXBkYXRlKSwgLy8g0LrQvtC80L/QvtC90LXQvdGC0Ysg0LTQu9GPINC+0LHQvdC+0LLQu9C10L3QuNGPXG4gICAgICAgICAgICBwYXJhbWV0ZXI6IGNvbXBvbmVudC52YWx1ZSwgLy8g0L/QsNGA0LDQvNC10YLRgNGLXG4gICAgICAgICAgICBzb3J0Qnk6IHNxbFNvcnRCeSwgLy8g0YHQvtGA0YLQuNGA0L7QstC60LBcbiAgICAgICAgICAgIGxhc3REb2NJZDogZG9jc1N0b3JlLmRvY3NHcmlkLFxuICAgICAgICAgICAgc3FsV2hlcmU6IHNxbFdoZXJlIC8vINC00LjQvdCw0LzQuNGH0LXRgdC60LjQuSDRhNC40LvRjNGC0YAg0LPRgNC40LTQsFxuICAgICAgICB9LFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAvLyDQtNC+0LvQttC90Ysg0L/QvtC70YPRh9C40YLRjCDQvtCx0YrQtdC60YJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIC8vIGZpbmQgaXRlbVxuICAgICAgICAgICAgICAgIC8vINC+0LHQvdC+0LLQuNC8INC00LDQvdC90YvQtSDQvNCw0YHRgdC40LLQsCDQutC+0LzQv9C+0L3QtdC90YLQvtCyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50cyA9IGNvbXBvbmVudHMubWFwKGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5uYW1lID09IGl0ZW0ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5kYXRhID0gaXRlbS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBjb21wb25lbnRzKTtcbiAgICAgICAgfS5iaW5kKHVuZGVmaW5lZCksXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignL2Vycm9yJywgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgIH0uYmluZCh1bmRlZmluZWQpXG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRvY3NTdG9yZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL3N0b3Jlcy9kb2NzX3N0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzVLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=
var docs =
webpackJsonp_name_([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Register = __webpack_require__(82);

	// данные для хранилища
	//localStorage['docsStore'] = storeData;
	storeData = JSON.parse(storeData);

	ReactDOM.render(React.createElement(Register, { id: 'grid', components: storeData }, 'Тут будут компоненты'), document.getElementById('grid'));

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// грузим компоненты

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    DataGrid = __webpack_require__(27),
	    BtnAdd = __webpack_require__(43),
	    BtnEdit = __webpack_require__(46),
	    BtnDelete = __webpack_require__(47),
	    BtnPrint = __webpack_require__(56),
	    BtnFilter = __webpack_require__(83),
	    ModalPage = __webpack_require__(61),
	    ModalPageDelete = __webpack_require__(84),
	    ModalPageInfo = __webpack_require__(86),
	    DataList = __webpack_require__(88),
	    Sidebar = __webpack_require__(90),
	    ToolbarContainer = __webpack_require__(51),
	    styles = __webpack_require__(92),
	    GridFilter = __webpack_require__(93);


	// Create a store
	const docsStore = __webpack_require__(95);

	// создаем класс - держатель состояний
	var ____Class0=React.PureComponent;for(var ____Class0____Key in ____Class0){if(____Class0.hasOwnProperty(____Class0____Key)){Register[____Class0____Key]=____Class0[____Class0____Key];}}var ____SuperProtoOf____Class0=____Class0===null?null:____Class0.prototype;Register.prototype=Object.create(____SuperProtoOf____Class0);Register.prototype.constructor=Register;Register.__superConstructor__=____Class0;
	    function Register(props) {
	        ____Class0.call(this,props);
	        this.filterData = [] // массив объектов, куда запишем параметры для фильтрации @todo вынести все в отдельный компонет для фильтрации

	        this.btnAddClick = this.btnAddClick.bind(this);
	        this.btnEditClick = this.btnEditClick.bind(this);
	        this.btnDeleteClick = this.btnDeleteClick.bind(this);
	        this.btnPrintClick = this.btnPrintClick.bind(this);
	        this.btnFilterClick = this.btnFilterClick.bind(this);
	        this.modalPageBtnClick = this.modalPageBtnClick.bind(this);
	        this.modalPageDelBtnClick = this.modalPageDelBtnClick.bind(this);
	        this.clickHandler = this.clickHandler.bind(this);
	        this.dblClickHandler = this.dblClickHandler.bind(this);
	        this.headerClickHandler = this.headerClickHandler.bind(this);

	        this.state = {
	            // у каждого компонента свой объект
	            components: this.props.components,
	            getFilter: false,
	            getDeleteModalPage: false,
	            showSystemMessage: false,
	            activRowId: 0,
	            filterString: null
	        }

	    }

	    Object.defineProperty(Register.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {
	        var self = this;

	        // создаем обработчик события на изменение даннх
	        docsStore.on('change:data', function(newValue, previousValue)  {
	            // данные изменились, меняем состояние
	            self.setState({components: docsStore.data})
	        })

	        // создаем обработчик события на изменение строки грида
	        docsStore.on('change:docsGrid', function (newValue, previousValue) {
	            // данные изменились, меняем состояние
	            self.setState({activRowId: docsStore.docsGrid})
	        })

	        // создаем обработчик события системный извещение
	        docsStore.on('change:systemMessage', function (newValue, previousValue) {
	            // данные изменились, меняем состояние
	            let systemMessageStatus = newValue ? true : false;
	            self.setState({showSystemMessage: systemMessageStatus});
	        })

	        // покажем данные

	//        let lastComponent = localStorage['docsList'];
	        flux.doAction('dataChange', this.props.components);
	    }});

	    Object.defineProperty(Register.prototype,"findComponent",{writable:true,configurable:true,value:function(componentName) {
	        // вернет данные компонента по его названию
	        let components = this.state.components,
	            componentData = [];

	        if (components.length > 0) {
	            componentData = components.filter(function (item) {
	                if (item.name == componentName) {
	                    return item;
	                }
	            });
	        }
	        return componentData;

	    }});

	    Object.defineProperty(Register.prototype,"btnFilterClick",{writable:true,configurable:true,value:function( ) {
	        // откроет модальное окно с полями для фильтрации
	        this.setState({getFilter: true})
	    }});

	    Object.defineProperty(Register.prototype,"btnDeleteClick",{writable:true,configurable:true,value:function() {
	        this.setState({getDeleteModalPage: true})
	    }});

	    Object.defineProperty(Register.prototype,"btnAddClick",{writable:true,configurable:true,value:function() {
	        // обработчик события клик кнопки "Добавить"
	        // вызовем действия на флаксе
	        flux.doAction('Add');
	    }});

	    Object.defineProperty(Register.prototype,"btnEditClick",{writable:true,configurable:true,value:function() {
	        // обработчик события клик кнопки "Изменить"
	        // вызовем действия на флаксе
	        flux.doAction('Edit');
	    }});

	    Object.defineProperty(Register.prototype,"btnPrintClick",{writable:true,configurable:true,value:function() {
	        // обработчик события клик кнопки "Изменить"
	        // вызовем действия на флаксе
	        flux.doAction('Print');
	    }});

	    Object.defineProperty(Register.prototype,"render",{writable:true,configurable:true,value:function() {
	        let componentlist = this.findComponent('docsList'),
	            listValue = componentlist[0].value || '',
	            dataList = componentlist[0].data || [],
	            prepairedGridData = this.findComponent('docsGrid') || [],
	            gridConfig = [],
	            gridData = [],
	            systemMessage = docsStore.systemMessage,
	            toolbarParams = this.prepareParamsForToolbar(), //параметры для кнопок управления, взависимости от активной строки
	            filterData = this.getFilterFields(),
	            filterString = this.getFilterString();

	        // проверим наличие данных, если есть пропихнем компонентам
	        if (prepairedGridData.length > 0 && prepairedGridData[0].data.length > 0) {
	            gridConfig = prepairedGridData[0].data[0].columns;
	            gridData = prepairedGridData[0].data[0].data;
	        }
	        return (React.createElement("div", {ref: "parentDiv"}, 
	                React.createElement("span", null, "Filter: ", filterString), 
	                React.createElement("div", {ref: "docContainer", style: styles.container}, 
	                    React.createElement(ToolbarContainer, {ref: "toolbarContainer"}, 
	                        React.createElement("div", null, 
	                            React.createElement(BtnAdd, {onClick: this.btnAddClick, show: toolbarParams['btnAdd'].show, 
	                                    disable: toolbarParams['btnAdd'].disabled}), 
	                            React.createElement(BtnEdit, {onClick: this.btnEditClick, show: toolbarParams['btnEdit'].show, 
	                                     disable: toolbarParams['btnEdit'].disabled}), 
	                            React.createElement(BtnDelete, {onClick: this.btnDeleteClick, show: toolbarParams['btnDelete'].show, 
	                                       disable: toolbarParams['btnDelete'].disabled}), 
	                            React.createElement(BtnPrint, {onClick: this.btnPrintClick, show: toolbarParams['btnPrint'].show, 
	                                      disable: toolbarParams['btnPrint'].disabled}), 
	                            React.createElement(BtnFilter, {onClick: this.btnFilterClick})
	                        )
	                    ), 

	                    React.createElement("div", {style: styles.wrapper}, 
	                        React.createElement(Sidebar, {width: "30%", toolbar: true, ref: "list-sidebar"}, 
	                            React.createElement(DataList, {ref: "dataList", 
	                                      data: dataList, 
	                                      name: "docsList", 
	                                      bindDataField: "kood", 
	                                      value: listValue, 
	                                      onClickAction: this.clickHandler, 
	                                      onChangeAction: "docsListChange"}
	                            )
	                        ), 
	                        React.createElement(Sidebar, {width: "100%", toolbar: false, ref: "grid-sidebar"}, 
	                            React.createElement("div", null, 
	                                React.createElement(DataGrid, {ref: "dataGrid", 
	                                    gridData: gridData, 
	                                    gridColumns: gridConfig, 
	                                    onChangeAction: "docsGridChange", 
	                                    onClick: this.clickHandler, 
	                                    onDblClick: this.dblClickHandler, 
	                                    onHeaderClick: this.headerClickHandler, 
	                                    value: prepairedGridData[0].lastDocId, 
	                                    url: "api"}), 
	                                React.createElement(ModalPage, {ref: "modalpageFilter", 
	                                    modalPageBtnClick: this.modalPageBtnClick, 
	                                    modalPageName: "Filter", 
	                                    show: this.state.getFilter}, 
	                                    React.createElement(GridFilter, {ref: "gridFilter", gridConfig: gridConfig, data: filterData})
	                                ), 
	                                React.createElement(ModalPageDelete, {ref: "modalpageDelete", 
	                                    modalPageBtnClick: this.modalPageDelBtnClick, 
	                                    show: this.state.getDeleteModalPage}), 
	                                React.createElement(ModalPageInfo, {ref: "modalpageInfo", 
	                                    modalPageBtnClick: this.modalPageInfoBtnClick, 
	                                    show: this.state.showSystemMessage, 
	                                    systemMessage: systemMessage})
	                            )
	                        )
	                    )
	                )
	            )
	        )
	    }});

	    Object.defineProperty(Register.prototype,"clickHandler",{writable:true,configurable:true,value:function(action, id) {
	        // сохраним в хранилище
	        if (action && id) {
	            flux.doAction(action, id);
	        }
	    }});

	    Object.defineProperty(Register.prototype,"dblClickHandler",{writable:true,configurable:true,value:function() {
	        // вызовет метод редактирования
	        flux.doAction('Edit');
	    }});

	    Object.defineProperty(Register.prototype,"headerClickHandler",{writable:true,configurable:true,value:function(sortBy) {
	        flux.doAction('sortByChange', sortBy);
	    }});

	    Object.defineProperty(Register.prototype,"modalPageBtnClick",{writable:true,configurable:true,value:function(btnEvent) {
	        // обработчик для кнопки фильтрации
	        let filterString = '';
	        if (btnEvent == 'Ok') {
	            // собираем данные
	            let gridFilter = this.refs['gridFilter'],
	                filterData = gridFilter.state.data;

	            this.filterData = filterData.map(function(row)  {
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
	        this.setState({getFilter: false})
	    }});

	    Object.defineProperty(Register.prototype,"modalPageDelBtnClick",{writable:true,configurable:true,value:function(btnEvent) {
	        // обработчик вызова модального окна удаления
	        this.setState({getDeleteModalPage: false});

	        if (btnEvent == 'Ok') {
	            // вызовем действия на флаксе
	            flux.doAction('Delete');
	        }

	    }});

	    Object.defineProperty(Register.prototype,"modalPageInfoBtnClick",{writable:true,configurable:true,value:function() {

	        // обработчик вызова модального окна системного сообщения
	        this.setState({showSystemMessage: false});
	        // вызовем действия на флаксе
	        flux.doAction('systemMessageChange', null);

	    }});

	    Object.defineProperty(Register.prototype,"getFilterFields",{writable:true,configurable:true,value:function() {
	        // создаст из полtй грида компоненты для формирования условий фильтрации
	        let gridComponents = docsStore.data,
	            gridData = [],
	            previosFilter = this.filterData,
	            filterFields;

	        for (let i = 0; i < gridComponents.length; i++) {
	            if (gridComponents[i]['name'] == 'docsGrid') {
	                // ищем поле columns
	                for (let field in gridComponents[i].data[0]) {
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
	            filterFields =
	                gridData.map(function(row, index)  {
	                    let componentType = 'text',
	                        componentObjektValue;

	                    for (let i = 0; i < previosFilter.length; i++) {
	                        // ищем "старое" значение фильтра и если есть, то отдаем его value
	                        if (previosFilter[i].refs == row.id) {
	                            componentObjektValue = previosFilter[i].value;
	                            break;
	                        }
	                    }

	                    if (row.type) {
	                        componentType = row.type;
	                    }

	                    // соберем массив объектов
	                    this.filterData.push({
	                        name: row.name,
	                        value: componentObjektValue || null,
	                        type: componentType,
	                        refs: row.id
	                    });

	                }.bind(this))
	        }
	        // обновим строку фильтрации
	        this.getFilterString();
	        return this.filterData;
	    }});

	    Object.defineProperty(Register.prototype,"getFilterString",{writable:true,configurable:true,value:function() {
	        // преобразует данные филтра в строку
	        let string = '';

	        this.filterData.map(function(row)  {
	            if (row.value) {
	                string = string + row.name + ':' + row.value + '; ';
	            }
	        });
	        return string;
	    }});

	    Object.defineProperty(Register.prototype,"prepareParamsForToolbar",{writable:true,configurable:true,value:function() {
	        // читаем данные со стора, формируем параметры для кнопок управления, и туда их отдаем
	//docsGridChange (flux.stores.docsStore.)
	        let grid = this.findComponent('docsGrid') || [],
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
	            dataRow = data.filter(function(row)  {
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

	    }});



	Register.PropTypes = {
	    components: React.PropTypes.object.isRequired
	}

	module.exports = Register;

/***/ },

/***/ 83:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'filter';


	var ____Classf=React.PureComponent;for(var ____Classf____Key in ____Classf){if(____Classf.hasOwnProperty(____Classf____Key)){ButtonRegisterFilter[____Classf____Key]=____Classf[____Classf____Key];}}var ____SuperProtoOf____Classf=____Classf===null?null:____Classf.prototype;ButtonRegisterFilter.prototype=Object.create(____SuperProtoOf____Classf);ButtonRegisterFilter.prototype.constructor=ButtonRegisterFilter;ButtonRegisterFilter.__superConstructor__=____Classf;
	// кнопка создания документа в регистрах
	    function ButtonRegisterFilter(props) {
	        ____Classf.call(this,props);
	    }

	    Object.defineProperty(ButtonRegisterFilter.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick();
	    }});

	    Object.defineProperty(ButtonRegisterFilter.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            ref: "btnFilter", 
	            value: "Filter", 
	            show: this.props.show, 
	            disabled: this.props.disabled, 
	            onClick: function(e)  {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});

	;

	ButtonRegisterFilter.propTypes = {
	    onClick: React.PropTypes.func.isRequired
	}


	ButtonRegisterFilter.defaultProps = {
	    disabled: false,
	    show: true
	};
	module.exports = ButtonRegisterFilter;

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(3),
	    ModalPage = __webpack_require__(61),
	    styles = __webpack_require__(85);

	var ____Class5=React.PureComponent;for(var ____Class5____Key in ____Class5){if(____Class5.hasOwnProperty(____Class5____Key)){ModalPageDelete[____Class5____Key]=____Class5[____Class5____Key];}}var ____SuperProtoOf____Class5=____Class5===null?null:____Class5.prototype;ModalPageDelete.prototype=Object.create(____SuperProtoOf____Class5);ModalPageDelete.prototype.constructor=ModalPageDelete;ModalPageDelete.__superConstructor__=____Class5;
	    function ModalPageDelete(props) {
	        ____Class5.call(this,props)
	        this.state = {
	            show: this.props.show
	        }
	    }

	    Object.defineProperty(ModalPageDelete.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({show: nextProps.show});
	    }});

	    Object.defineProperty(ModalPageDelete.prototype,"render",{writable:true,configurable:true,value:function() {
	        let modalObjects = ['btnOk', 'btnCancel'];

	        return React.createElement(ModalPage, {ref: "modalPage", 
	            modalPageBtnClick: this.props.modalPageBtnClick, 
	            show: this.state.show, 
	            modalPageName: "Delete document"}, 
	            React.createElement("div", {ref: "container"}, 
	                React.createElement("image", {ref: "image", src: styles.icon}), 
	                React.createElement("span", {ref: "message"}, " Удалить документ ? ")
	            )
	        )
	    }});


	ModalPageDelete.propTypes = {
	    modalPageBtnClick: React.PropTypes.func.isRequired
	}

	module.exports = ModalPageDelete;

/***/ },

/***/ 85:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    icon: 'images/icons/delete.png'
	};

/***/ },

/***/ 86:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(3),
	    ModalPage = __webpack_require__(61),
	    styles = __webpack_require__(87);

	var ____Class6=React.PureComponent;for(var ____Class6____Key in ____Class6){if(____Class6.hasOwnProperty(____Class6____Key)){ModalPageInfo[____Class6____Key]=____Class6[____Class6____Key];}}var ____SuperProtoOf____Class6=____Class6===null?null:____Class6.prototype;ModalPageInfo.prototype=Object.create(____SuperProtoOf____Class6);ModalPageInfo.prototype.constructor=ModalPageInfo;ModalPageInfo.__superConstructor__=____Class6;
	    function ModalPageInfo(props) {
	        ____Class6.call(this,props);
	        this.state = {
	            show: this.props.show
	        }

	    }

	    Object.defineProperty(ModalPageInfo.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({show: nextProps.show});
	    }});

	    Object.defineProperty(ModalPageInfo.prototype,"render",{writable:true,configurable:true,value:function() {

	        let systemMessage = this.props.systemMessage ? this.props.systemMessage : '',
	            modalObjects = ['btnOk'];

	        return React.createElement(ModalPage, {ref: "modalPage", 
	            modalPageBtnClick: this.props.modalPageBtnClick, 
	            modalPageName: "Warning!", 
	            modalObjects: modalObjects}, 
	            React.createElement("div", {ref: "container"}, 
	                React.createElement("image", {ref: "image", src: styles.icon}), 
	                React.createElement("span", null, " ", systemMessage, " ")
	            )
	        )
	    }});


	ModalPageInfo.propTypes = {
	    systemMessage: React.PropTypes.string,
	    modalPageBtnClick: React.PropTypes.func
	}

	module.exports = ModalPageInfo;


/***/ },

/***/ 87:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    icon: 'images/icons/info.png'
	};

/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    styles = __webpack_require__(89);

	var ____Class7=React.PureComponent;for(var ____Class7____Key in ____Class7){if(____Class7.hasOwnProperty(____Class7____Key)){DataList[____Class7____Key]=____Class7[____Class7____Key];}}var ____SuperProtoOf____Class7=____Class7===null?null:____Class7.prototype;DataList.prototype=Object.create(____SuperProtoOf____Class7);DataList.prototype.constructor=DataList;DataList.__superConstructor__=____Class7;
	    function DataList(props) {
	        ____Class7.call(this,props);

	        let idx = 0;

	        if (this.props.value) {
	            // we got value, we should find index and initilize idx field
	            props.data.forEach(function(row, index)  {
	                if (row[props.bindDataField] === props.value) {
	                    // found
	                    idx = index;
	                }
	            });
	        }

	        this.state = {
	            data: props.data,
	            index: idx,
	            value: props.value
	        };
	        this.handleLiClick = this.handleLiClick.bind(this);
	    }

	    Object.defineProperty(DataList.prototype,"render",{writable:true,configurable:true,value:function() {
	        let data = this.props.data,
	            clickedItem = this.state.index;

	        return (
	            React.createElement("div", {ref: "datalist"}, 
	                React.createElement("ul", {ref: "datalist-ul"}, 
	                    
	                        data.map(function(item, index)  {
	                            let style = Object.assign({}, styles.docList, clickedItem == index ? styles.focused : {}),
	                                componentId = 'li-' + index;

	                            return (
	                                React.createElement("li", {key: componentId, 
	                                    ref: componentId, 
	                                    onClick: this.handleLiClick.bind(this, index), 
	                                    style: style}, 
	                                    item.name
	                                ))
	                        }.bind(this), this)
	                )
	            )
	        )
	    }});

	    Object.defineProperty(DataList.prototype,"handleLiClick",{writable:true,configurable:true,value:function(idx) {
	        let value = this.props.data[idx][this.props.bindDataField];
	        //ставим метку
	        // сохраняем состояние

	        this.setState({
	            index: idx,
	            value: value
	        });

	        // сохраним в хранилище
	        let changeAction = this.props.name + 'Change'
	        flux.doAction(changeAction, value)
	    }});



	DataList.propTypes = {
	    value: React.PropTypes.string,
	    data: React.PropTypes.array
	};

	DataList.defaultProps = {
	    data: [{
	        id: 0,
	        name: '',
	        kood: ''
	    }],
	    value: null,
	    bindDataField: 'id'
	}

	module.exports = DataList;

/***/ },

/***/ 89:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    docList: {
	        backgroundColor: 'white',
	        padding: '5px',
	        marginRight: '20px'
	    },
	    focused: {
	        backgroundColor: 'lightblue'
	    }
	};

/***/ },

/***/ 90:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const sideBarStyles = __webpack_require__(91),
	    React = __webpack_require__(3);


	var ____Class8=React.Component;for(var ____Class8____Key in ____Class8){if(____Class8.hasOwnProperty(____Class8____Key)){SideBarContainer[____Class8____Key]=____Class8[____Class8____Key];}}var ____SuperProtoOf____Class8=____Class8===null?null:____Class8.prototype;SideBarContainer.prototype=Object.create(____SuperProtoOf____Class8);SideBarContainer.prototype.constructor=SideBarContainer;SideBarContainer.__superConstructor__=____Class8;
	    function SideBarContainer(props) {
	        ____Class8.call(this,props);

	        this.state = {
	            width: props.width,
	            contentWidth: '100%',
	            show: true,
	            toolBar: props.toolbar
	        };

	        this.btnClickHandler = this.btnClickHandler.bind(this);
	    }

	    Object.defineProperty(SideBarContainer.prototype,"btnClickHandler",{writable:true,configurable:true,value:function() {
	        let width = this.state.show ? '20px' : this.props.width,
	            contentWidth = this.state.show ? '1px' : '100%',
	            showContent = !this.state.show;

	        this.setState({
	            width: width,
	            contentWidth: contentWidth,
	            show: showContent
	        });
	    }});

	    Object.defineProperty(SideBarContainer.prototype,"render",{writable:true,configurable:true,value:function() {
	        let toolBarSymbol = this.state.show ? '<' : '>'; //todo move to styles file

	        //prepaire styles
	        let sideBarContainerStyle = Object.assign({}, sideBarStyles.sideBarContainerStyle, {width: this.state.width}),
	            toolBarStyle = Object.assign({},sideBarStyles.toolBarStyle, {visibility: this.props.toolbar ? 'visible': 'hidden'}),
	            contentStyle = Object.assign(({},sideBarStyles.contentStyle, {visibility: this.state.show ? 'visible': 'hidden'})),
	            buttonStyle = Object.assign({},sideBarStyles.buttonStyle, {
	                height: this.props.toolbar ? sideBarStyles.buttonStyle.height: '0',
	                visibility: this.props.toolbar ? 'visible': 'hidden'
	        } )

	        return (
	            React.createElement("div", {id: "toolBarContainer", style: sideBarContainerStyle, ref: "toolbar"}, 
	                React.createElement("div", {id: "btnBar", style: toolBarStyle}, 
	                    React.createElement("input", {type: "button", 
	                           ref: "sidebar-button", 
	                           style: buttonStyle, 
	                           value: toolBarSymbol, 
	                           onClick: this.btnClickHandler}
	                    )
	                ), 
	                React.createElement("div", {id: "content", style: contentStyle, ref: "content"}, 
	                    this.props.children
	                )
	            )
	        );
	    }});




	SideBarContainer.propTypes = {
	    toolbar: React.PropTypes.bool,
	    width: React.PropTypes.string
	};

	SideBarContainer.defaultProps = {
	    toolbar: true,
	    width: '100%'
	};

	module.exports = SideBarContainer;

/***/ },

/***/ 91:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    sideBarContainerStyle: {
	        width: '100%',
	        height: '100%',
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
	        width: '100%',
	        visibility: 'visible'
	    },

	    buttonStyle: {
	        position: 'relative',
	        height: '20px',
	        width: '20px'
	    }
	};

/***/ },

/***/ 92:
/***/ function(module, exports) {

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

/***/ },

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(94);


	var ____Classa=React.PureComponent;for(var ____Classa____Key in ____Classa){if(____Classa.hasOwnProperty(____Classa____Key)){GridFilter[____Classa____Key]=____Classa[____Classa____Key];}}var ____SuperProtoOf____Classa=____Classa===null?null:____Classa.prototype;GridFilter.prototype=Object.create(____SuperProtoOf____Classa);GridFilter.prototype.constructor=GridFilter;GridFilter.__superConstructor__=____Classa;
	    function GridFilter(props) {
	        ____Classa.call(this,props);

	        this.state = {
	            gridConfig: this.props.gridConfig, // grid config
	            data: this.props.data // filter data
	        };
	        this.handleChange = this.handleChange.bind(this)    }

	    Object.defineProperty(GridFilter.prototype,"handleChange",{writable:true,configurable:true,value:function(e) {
	        let value = e.target.value,
	            id = e.target.name,
	            data = this.state.data,
	            index;

	        // надо найти элемент массива с данными для этого компонента
	        for(let i = 0; i < data.length; i++ ) {
	            if (data[i].refs === id) {
	                index = i;
	                break;
	            }
	        }

	        if (index) {
	            data[index].value = value;
	            this.setState({data: data});
	        }
	    }});

	    Object.defineProperty(GridFilter.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({gridConfig: nextProps.gridConfig, data: nextProps.data});
	    }});

	    Object.defineProperty(GridFilter.prototype,"render",{writable:true,configurable:true,value:function() {
	        // создаст из полей грида компоненты для формирования условий фильтрации
	        let gridConfig = this.state.gridConfig,
	            data = this.state.data;

	        return React.createElement("div", {style: styles.fieldset}, 
	            
	                gridConfig.map(function(row, index)  {
	                    let componentType = row.type? row.type: 'text'

	                    return React.createElement("div", {style: styles.formWidget, key: 'fieldSet-' + row.id}, 
	                        React.createElement("div", {style: styles.formWidgetLabel}, 
	                            React.createElement("span", null, row.name)
	                        ), 
	                        React.createElement("div", {style: styles.formWidgetInput}, 
	                            React.createElement("input", {style: styles.input, 
	                                   type: componentType, 
	                                   title: row.name, 
	                                   name: row.id, 
	                                   placeholder: row.name, 
	                                   ref: row.id, 
	                                   value: this.state.data[row.id], 
	                                   onChange: this.handleChange, 
	                                   defaultValue: data[row.id]}
	                            )
	                        )
	                    )
	                }.bind(this))
	            
	        )
	    }});


	GridFilter.propTypes = {
	    gridConfig: React.PropTypes.array.isRequired,
	    data: React.PropTypes.array.isRequired
	}

	module.exports = GridFilter;


/***/ },

/***/ 94:
/***/ function(module, exports) {

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

/***/ },

/***/ 95:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var flux = __webpack_require__(4);

	var docsStore = flux.createStore({
	    id: 'docsStore',
	    initialState: {
	        docsGrid: 0,
	        docsList: '',
	        name: 'vlad',
	        data: [],
	        sortBy: [{ column: 'id', direction: 'desc' }],
	        sqlWhere: '',
	        systemMessage: null
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
	            console.log('docsGridChange', value);
	            updater.set({ docsGrid: value });
	            //            localStorage['docsGrid'] = value;
	        },
	        docsListChange: function docsListChange(updater, value) {
	            // Stores updates are only made inside store's action callbacks
	            updater.set({ docsList: value });
	            requery({ name: 'docsGrid', value: value });
	            //            localStorage['docsList'] = value;
	        },
	        dataChange: function dataChange(updater, value) {
	            // Stores updates are only made inside store's action callbacks
	            //           console.log('dataChange:', value);
	            updater.set({ data: value });
	        }

	    }
	});

	var edit = function edit(docTypeId, docId) {
	    var url = "/document/" + docTypeId + docId;
	    document.location.href = url;
	};

	var add = function add(docTypeId) {
	    var url = "/document/" + docTypeId + '0';
	    document.location.href = url;
	};

	var requeryForAction = function requeryForAction(action, callback) {
	    if (!window.jQuery) return; // для тестов

	    if (!$) return;
	    // метод обеспечит запрос на выполнение
	    var parameters = {
	        docId: docsStore.docsGrid,
	        doc_type_id: docsStore.docsList
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
	        sqlWhere = docsStore.sqlWhere || '';
	    var sortByArray = docsStore.sortBy,
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
	            sqlWhere: sqlWhere },
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
	        }.bind(this),
	        error: function (xhr, status, err) {
	            console.error('/error', status, err.toString());
	        }.bind(this)
	    });
	};

	module.exports = docsStore;

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jcy9kb2MtcmVnaXN0ZXIvZG9jLXJlZ2lzdGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZmlsdGVyL2J1dHRvbi1yZWdpc3Rlci1maWx0ZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1kZWxldGUvbW9kYWxQYWdlLWRlbGV0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWRlbGV0ZS9tb2RhbHBhZ2UtZGVsZXRlLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2UtaW5mby9tb2RhbFBhZ2UtaW5mby5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWluZm8vbW9kYWxwYWdlLWluZm8tc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YWxpc3QvZGF0YWxpc3QuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YWxpc3QvZGF0YWxpc3Qtc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jcy9kb2MtcmVnaXN0ZXIvZG9jLXJlZ2lzdGVyLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC9ncmlkLWZpbHRlci9ncmlkLWZpbHRlci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhLWdyaWQvZ3JpZC1maWx0ZXIvZ3JpZC1maWx0ZXItc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL3N0b3Jlcy9kb2NzX3N0b3JlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIFJlZ2lzdGVyID0gcmVxdWlyZSgnLi4vZnJvbnRlbmQvZG9jcy9kb2MtcmVnaXN0ZXIvZG9jLXJlZ2lzdGVyLmpzeCcpO1xuXG4vLyDQtNCw0L3QvdGL0LUg0LTQu9GPINGF0YDQsNC90LjQu9C40YnQsFxuLy9sb2NhbFN0b3JhZ2VbJ2RvY3NTdG9yZSddID0gc3RvcmVEYXRhO1xuc3RvcmVEYXRhID0gSlNPTi5wYXJzZShzdG9yZURhdGEpO1xuXG5SZWFjdERPTS5yZW5kZXIoUmVhY3QuY3JlYXRlRWxlbWVudChSZWdpc3RlciwgeyBpZDogJ2dyaWQnLCBjb21wb25lbnRzOiBzdG9yZURhdGEgfSwgJ9Ci0YPRgiDQsdGD0LTRg9GCINC60L7QvNC/0L7QvdC10L3RgtGLJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkJykpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XHJcbi8vINCz0YDRg9C30LjQvCDQutC+0LzQv9C+0L3QtdC90YLRi1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIERhdGFHcmlkID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL2RhdGEtZ3JpZC9kYXRhLWdyaWQuanN4JyksXHJcbiAgICBCdG5BZGQgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1hZGQvYnV0dG9uLXJlZ2lzdGVyLWFkZC5qc3gnKSxcclxuICAgIEJ0bkVkaXQgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeCcpLFxyXG4gICAgQnRuRGVsZXRlID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZGVsZXRlL2J1dHRvbi1yZWdpc3Rlci1kZWxldGUuanN4JyksXHJcbiAgICBCdG5QcmludCA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXByaW50L2J1dHRvbi1yZWdpc3Rlci1wcmludC5qc3gnKSxcclxuICAgIEJ0bkZpbHRlciA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWZpbHRlci9idXR0b24tcmVnaXN0ZXItZmlsdGVyLmpzeCcpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbFBhZ2UuanN4JyksXHJcbiAgICBNb2RhbFBhZ2VEZWxldGUgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1kZWxldGUvbW9kYWxQYWdlLWRlbGV0ZS5qc3gnKSxcclxuICAgIE1vZGFsUGFnZUluZm8gPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1pbmZvL21vZGFsUGFnZS1pbmZvLmpzeCcpLFxyXG4gICAgRGF0YUxpc3QgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvZGF0YWxpc3QvZGF0YWxpc3QuanN4JyksXHJcbiAgICBTaWRlYmFyID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci5qc3gnKSxcclxuICAgIFRvb2xiYXJDb250YWluZXIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci1jb250YWluZXIvdG9vbGJhci1jb250YWluZXIuanN4JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2RvYy1yZWdpc3Rlci1zdHlsZXMnKSxcclxuICAgIEdyaWRGaWx0ZXIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvZGF0YS1ncmlkL2dyaWQtZmlsdGVyL2dyaWQtZmlsdGVyLmpzeCcpO1xyXG5cclxuXHJcbi8vIENyZWF0ZSBhIHN0b3JlXHJcbmNvbnN0IGRvY3NTdG9yZSA9IHJlcXVpcmUoJy4vLi4vLi4vc3RvcmVzL2RvY3Nfc3RvcmUuanMnKTtcclxuXHJcbi8vINGB0L7Qt9C00LDQtdC8INC60LvQsNGB0YEgLSDQtNC10YDQttCw0YLQtdC70Ywg0YHQvtGB0YLQvtGP0L3QuNC5XHJcbnZhciBfX19fQ2xhc3MwPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3MwX19fX0tleSBpbiBfX19fQ2xhc3MwKXtpZihfX19fQ2xhc3MwLmhhc093blByb3BlcnR5KF9fX19DbGFzczBfX19fS2V5KSl7UmVnaXN0ZXJbX19fX0NsYXNzMF9fX19LZXldPV9fX19DbGFzczBbX19fX0NsYXNzMF9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3MwPV9fX19DbGFzczA9PT1udWxsP251bGw6X19fX0NsYXNzMC5wcm90b3R5cGU7UmVnaXN0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczApO1JlZ2lzdGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1SZWdpc3RlcjtSZWdpc3Rlci5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3MwO1xyXG4gICAgZnVuY3Rpb24gUmVnaXN0ZXIocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3MwLmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJEYXRhID0gW10gLy8g0LzQsNGB0YHQuNCyINC+0LHRitC10LrRgtC+0LIsINC60YPQtNCwINC30LDQv9C40YjQtdC8INC/0LDRgNCw0LzQtdGC0YDRiyDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40LggQHRvZG8g0LLRi9C90LXRgdGC0Lgg0LLRgdC1INCyINC+0YLQtNC10LvRjNC90YvQuSDQutC+0LzQv9C+0L3QtdGCINC00LvRjyDRhNC40LvRjNGC0YDQsNGG0LjQuFxyXG5cclxuICAgICAgICB0aGlzLmJ0bkFkZENsaWNrID0gdGhpcy5idG5BZGRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuRWRpdENsaWNrID0gdGhpcy5idG5FZGl0Q2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmJ0bkRlbGV0ZUNsaWNrID0gdGhpcy5idG5EZWxldGVDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuUHJpbnRDbGljayA9IHRoaXMuYnRuUHJpbnRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuRmlsdGVyQ2xpY2sgPSB0aGlzLmJ0bkZpbHRlckNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbFBhZ2VCdG5DbGljayA9IHRoaXMubW9kYWxQYWdlQnRuQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm1vZGFsUGFnZURlbEJ0bkNsaWNrID0gdGhpcy5tb2RhbFBhZ2VEZWxCdG5DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmRibENsaWNrSGFuZGxlciA9IHRoaXMuZGJsQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJDbGlja0hhbmRsZXIgPSB0aGlzLmhlYWRlckNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICAvLyDRgyDQutCw0LbQtNC+0LPQviDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdCy0L7QuSDQvtCx0YrQtdC60YJcclxuICAgICAgICAgICAgY29tcG9uZW50czogdGhpcy5wcm9wcy5jb21wb25lbnRzLFxyXG4gICAgICAgICAgICBnZXRGaWx0ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBnZXREZWxldGVNb2RhbFBhZ2U6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93U3lzdGVtTWVzc2FnZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFjdGl2Um93SWQ6IDAsXHJcbiAgICAgICAgICAgIGZpbHRlclN0cmluZzogbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcImNvbXBvbmVudERpZE1vdW50XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSDQtNCw0L3QvdGFXHJcbiAgICAgICAgZG9jc1N0b3JlLm9uKCdjaGFuZ2U6ZGF0YScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSAge1xyXG4gICAgICAgICAgICAvLyDQtNCw0L3QvdGL0LUg0LjQt9C80LXQvdC40LvQuNGB0YwsINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Y29tcG9uZW50czogZG9jc1N0b3JlLmRhdGF9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1INGB0YLRgNC+0LrQuCDQs9GA0LjQtNCwXHJcbiAgICAgICAgZG9jc1N0b3JlLm9uKCdjaGFuZ2U6ZG9jc0dyaWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2FjdGl2Um93SWQ6IGRvY3NTdG9yZS5kb2NzR3JpZH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0YHQuNGB0YLQtdC80L3Ri9C5INC40LfQstC10YnQtdC90LjQtVxyXG4gICAgICAgIGRvY3NTdG9yZS5vbignY2hhbmdlOnN5c3RlbU1lc3NhZ2UnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgIGxldCBzeXN0ZW1NZXNzYWdlU3RhdHVzID0gbmV3VmFsdWUgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3Nob3dTeXN0ZW1NZXNzYWdlOiBzeXN0ZW1NZXNzYWdlU3RhdHVzfSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g0L/QvtC60LDQttC10Lwg0LTQsNC90L3Ri9C1XHJcblxyXG4vLyAgICAgICAgbGV0IGxhc3RDb21wb25lbnQgPSBsb2NhbFN0b3JhZ2VbJ2RvY3NMaXN0J107XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIHRoaXMucHJvcHMuY29tcG9uZW50cyk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcImZpbmRDb21wb25lbnRcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihjb21wb25lbnROYW1lKSB7XHJcbiAgICAgICAgLy8g0LLQtdGA0L3QtdGCINC00LDQvdC90YvQtSDQutC+0LzQv9C+0L3QtdC90YLQsCDQv9C+INC10LPQviDQvdCw0LfQstCw0L3QuNGOXHJcbiAgICAgICAgbGV0IGNvbXBvbmVudHMgPSB0aGlzLnN0YXRlLmNvbXBvbmVudHMsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGEgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGNvbXBvbmVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb21wb25lbnREYXRhID0gY29tcG9uZW50cy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5hbWUgPT0gY29tcG9uZW50TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudERhdGE7XHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3Rlci5wcm90b3R5cGUsXCJidG5GaWx0ZXJDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCApIHtcclxuICAgICAgICAvLyDQvtGC0LrRgNC+0LXRgiDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L4g0YEg0L/QvtC70Y/QvNC4INC00LvRjyDRhNC40LvRjNGC0YDQsNGG0LjQuFxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dldEZpbHRlcjogdHJ1ZX0pXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcImJ0bkRlbGV0ZUNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z2V0RGVsZXRlTW9kYWxQYWdlOiB0cnVlfSlcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwiYnRuQWRkQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQutC70LjQuiDQutC90L7Qv9C60LggXCLQlNC+0LHQsNCy0LjRgtGMXCJcclxuICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignQWRkJyk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcImJ0bkVkaXRDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC60LvQuNC6INC60L3QvtC/0LrQuCBcItCY0LfQvNC10L3QuNGC0YxcIlxyXG4gICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdFZGl0Jyk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcImJ0blByaW50Q2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQutC70LjQuiDQutC90L7Qv9C60LggXCLQmNC30LzQtdC90LjRgtGMXCJcclxuICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignUHJpbnQnKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudGxpc3QgPSB0aGlzLmZpbmRDb21wb25lbnQoJ2RvY3NMaXN0JyksXHJcbiAgICAgICAgICAgIGxpc3RWYWx1ZSA9IGNvbXBvbmVudGxpc3RbMF0udmFsdWUgfHwgJycsXHJcbiAgICAgICAgICAgIGRhdGFMaXN0ID0gY29tcG9uZW50bGlzdFswXS5kYXRhIHx8IFtdLFxyXG4gICAgICAgICAgICBwcmVwYWlyZWRHcmlkRGF0YSA9IHRoaXMuZmluZENvbXBvbmVudCgnZG9jc0dyaWQnKSB8fCBbXSxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZyA9IFtdLFxyXG4gICAgICAgICAgICBncmlkRGF0YSA9IFtdLFxyXG4gICAgICAgICAgICBzeXN0ZW1NZXNzYWdlID0gZG9jc1N0b3JlLnN5c3RlbU1lc3NhZ2UsXHJcbiAgICAgICAgICAgIHRvb2xiYXJQYXJhbXMgPSB0aGlzLnByZXBhcmVQYXJhbXNGb3JUb29sYmFyKCksIC8v0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDQutC90L7Qv9C+0Log0YPQv9GA0LDQstC70LXQvdC40Y8sINCy0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINCw0LrRgtC40LLQvdC+0Lkg0YHRgtGA0L7QutC4XHJcbiAgICAgICAgICAgIGZpbHRlckRhdGEgPSB0aGlzLmdldEZpbHRlckZpZWxkcygpLFxyXG4gICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSB0aGlzLmdldEZpbHRlclN0cmluZygpO1xyXG5cclxuICAgICAgICAvLyDQv9GA0L7QstC10YDQuNC8INC90LDQu9C40YfQuNC1INC00LDQvdC90YvRhSwg0LXRgdC70Lgg0LXRgdGC0Ywg0L/RgNC+0L/QuNGF0L3QtdC8INC60L7QvNC/0L7QvdC10L3RgtCw0LxcclxuICAgICAgICBpZiAocHJlcGFpcmVkR3JpZERhdGEubGVuZ3RoID4gMCAmJiBwcmVwYWlyZWRHcmlkRGF0YVswXS5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZ3JpZENvbmZpZyA9IHByZXBhaXJlZEdyaWREYXRhWzBdLmRhdGFbMF0uY29sdW1ucztcclxuICAgICAgICAgICAgZ3JpZERhdGEgPSBwcmVwYWlyZWRHcmlkRGF0YVswXS5kYXRhWzBdLmRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7cmVmOiBcInBhcmVudERpdlwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkZpbHRlcjogXCIsIGZpbHRlclN0cmluZyksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7cmVmOiBcImRvY0NvbnRhaW5lclwiLCBzdHlsZTogc3R5bGVzLmNvbnRhaW5lcn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9vbGJhckNvbnRhaW5lciwge3JlZjogXCJ0b29sYmFyQ29udGFpbmVyXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuQWRkLCB7b25DbGljazogdGhpcy5idG5BZGRDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuQWRkJ10uc2hvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGU6IHRvb2xiYXJQYXJhbXNbJ2J0bkFkZCddLmRpc2FibGVkfSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5FZGl0LCB7b25DbGljazogdGhpcy5idG5FZGl0Q2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0bkVkaXQnXS5zaG93LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGU6IHRvb2xiYXJQYXJhbXNbJ2J0bkVkaXQnXS5kaXNhYmxlZH0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuRGVsZXRlLCB7b25DbGljazogdGhpcy5idG5EZWxldGVDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuRGVsZXRlJ10uc2hvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGU6IHRvb2xiYXJQYXJhbXNbJ2J0bkRlbGV0ZSddLmRpc2FibGVkfSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5QcmludCwge29uQ2xpY2s6IHRoaXMuYnRuUHJpbnRDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuUHJpbnQnXS5zaG93LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlOiB0b29sYmFyUGFyYW1zWydidG5QcmludCddLmRpc2FibGVkfSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5GaWx0ZXIsIHtvbkNsaWNrOiB0aGlzLmJ0bkZpbHRlckNsaWNrfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLndyYXBwZXJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlYmFyLCB7d2lkdGg6IFwiMzAlXCIsIHRvb2xiYXI6IHRydWUsIHJlZjogXCJsaXN0LXNpZGViYXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhTGlzdCwge3JlZjogXCJkYXRhTGlzdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhTGlzdCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkb2NzTGlzdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YUZpZWxkOiBcImtvb2RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGxpc3RWYWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGlja0FjdGlvbjogdGhpcy5jbGlja0hhbmRsZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlQWN0aW9uOiBcImRvY3NMaXN0Q2hhbmdlXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNpZGViYXIsIHt3aWR0aDogXCIxMDAlXCIsIHRvb2xiYXI6IGZhbHNlLCByZWY6IFwiZ3JpZC1zaWRlYmFyXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhR3JpZCwge3JlZjogXCJkYXRhR3JpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZERhdGE6IGdyaWREYXRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZENvbHVtbnM6IGdyaWRDb25maWcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZUFjdGlvbjogXCJkb2NzR3JpZENoYW5nZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5jbGlja0hhbmRsZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRibENsaWNrOiB0aGlzLmRibENsaWNrSGFuZGxlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uSGVhZGVyQ2xpY2s6IHRoaXMuaGVhZGVyQ2xpY2tIYW5kbGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHByZXBhaXJlZEdyaWREYXRhWzBdLmxhc3REb2NJZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJhcGlcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge3JlZjogXCJtb2RhbHBhZ2VGaWx0ZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUJ0bkNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJGaWx0ZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRoaXMuc3RhdGUuZ2V0RmlsdGVyfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEZpbHRlciwge3JlZjogXCJncmlkRmlsdGVyXCIsIGdyaWRDb25maWc6IGdyaWRDb25maWcsIGRhdGE6IGZpbHRlckRhdGF9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxQYWdlRGVsZXRlLCB7cmVmOiBcIm1vZGFscGFnZURlbGV0ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlRGVsQnRuQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0aGlzLnN0YXRlLmdldERlbGV0ZU1vZGFsUGFnZX0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZUluZm8sIHtyZWY6IFwibW9kYWxwYWdlSW5mb1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlSW5mb0J0bkNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdGhpcy5zdGF0ZS5zaG93U3lzdGVtTWVzc2FnZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5c3RlbU1lc3NhZ2U6IHN5c3RlbU1lc3NhZ2V9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3Rlci5wcm90b3R5cGUsXCJjbGlja0hhbmRsZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihhY3Rpb24sIGlkKSB7XHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICBpZiAoYWN0aW9uICYmIGlkKSB7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oYWN0aW9uLCBpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3Rlci5wcm90b3R5cGUsXCJkYmxDbGlja0hhbmRsZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQstGL0LfQvtCy0LXRgiDQvNC10YLQvtC0INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdFZGl0Jyk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcImhlYWRlckNsaWNrSGFuZGxlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKHNvcnRCeSkge1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ3NvcnRCeUNoYW5nZScsIHNvcnRCeSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcIm1vZGFsUGFnZUJ0bkNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oYnRuRXZlbnQpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQtNC70Y8g0LrQvdC+0L/QutC4INGE0LjQu9GM0YLRgNCw0YbQuNC4XHJcbiAgICAgICAgbGV0IGZpbHRlclN0cmluZyA9ICcnO1xyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIC8vINGB0L7QsdC40YDQsNC10Lwg0LTQsNC90L3Ri9C1XHJcbiAgICAgICAgICAgIGxldCBncmlkRmlsdGVyID0gdGhpcy5yZWZzWydncmlkRmlsdGVyJ10sXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJEYXRhID0gZ3JpZEZpbHRlci5zdGF0ZS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhID0gZmlsdGVyRGF0YS5tYXAoZnVuY3Rpb24ocm93KSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIChmaWx0ZXJTdHJpbmcubGVuZ3RoID4gMCA/IFwiIGFuZCBcIiA6IFwiIHdoZXJlIFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJvdy50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgaWxpa2UgJyVcIiArIHJvdy52YWx1ZSArIFwiJSdcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgcm93LnJlZnMgKyBcIiBpbGlrZSAnXCIgKyByb3cudmFsdWUgKyBcIiUnXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSBmaWx0ZXJTdHJpbmcgKyByb3cucmVmcyArIFwiID0gJ1wiICsgcm93LnZhbHVlICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgPSBcIiArIHJvdy52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnRlZ2VyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgPSBcIiArIHJvdy52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgICAgICAvLyDQv9GA0LjQvNC10L3QtdC8INGE0LjQu9GM0YLRgFxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzcWxXaGVyZUNoYW5nZScsIGZpbHRlclN0cmluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dldEZpbHRlcjogZmFsc2V9KVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3Rlci5wcm90b3R5cGUsXCJtb2RhbFBhZ2VEZWxCdG5DbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGJ0bkV2ZW50KSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LLRi9C30L7QstCwINC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwINGD0LTQsNC70LXQvdC40Y9cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtnZXREZWxldGVNb2RhbFBhZ2U6IGZhbHNlfSk7XHJcblxyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignRGVsZXRlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwibW9kYWxQYWdlSW5mb0J0bkNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INCy0YvQt9C+0LLQsCDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsCDRgdC40YHRgtC10LzQvdC+0LPQviDRgdC+0L7QsdGJ0LXQvdC40Y9cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93U3lzdGVtTWVzc2FnZTogZmFsc2V9KTtcclxuICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignc3lzdGVtTWVzc2FnZUNoYW5nZScsIG51bGwpO1xyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwiZ2V0RmlsdGVyRmllbGRzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0YHQvtC30LTQsNGB0YIg0LjQtyDQv9C+0Lt00Lkg0LPRgNC40LTQsCDQutC+0LzQv9C+0L3QtdC90YLRiyDQtNC70Y8g0YTQvtGA0LzQuNGA0L7QstCw0L3QuNGPINGD0YHQu9C+0LLQuNC5INGE0LjQu9GM0YLRgNCw0YbQuNC4XHJcbiAgICAgICAgbGV0IGdyaWRDb21wb25lbnRzID0gZG9jc1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIGdyaWREYXRhID0gW10sXHJcbiAgICAgICAgICAgIHByZXZpb3NGaWx0ZXIgPSB0aGlzLmZpbHRlckRhdGEsXHJcbiAgICAgICAgICAgIGZpbHRlckZpZWxkcztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkQ29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZ3JpZENvbXBvbmVudHNbaV1bJ25hbWUnXSA9PSAnZG9jc0dyaWQnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQuNGJ0LXQvCDQv9C+0LvQtSBjb2x1bW5zXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZCBpbiBncmlkQ29tcG9uZW50c1tpXS5kYXRhWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkID09ICdjb2x1bW5zJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkRGF0YSA9IGdyaWRDb21wb25lbnRzW2ldLmRhdGFbMF0uY29sdW1ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChncmlkRGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEgPSBbXTsgLy8g0L7QsdC90YPQu9C40Lwg0LzQsNGB0YHQuNCyXHJcbiAgICAgICAgICAgIGZpbHRlckZpZWxkcyA9XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YS5tYXAoZnVuY3Rpb24ocm93LCBpbmRleCkgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50VHlwZSA9ICd0ZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50T2JqZWt0VmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJldmlvc0ZpbHRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQuNGJ0LXQvCBcItGB0YLQsNGA0L7QtVwiINC30L3QsNGH0LXQvdC40LUg0YTQuNC70YzRgtGA0LAg0Lgg0LXRgdC70Lgg0LXRgdGC0YwsINGC0L4g0L7RgtC00LDQtdC8INC10LPQviB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvc0ZpbHRlcltpXS5yZWZzID09IHJvdy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50T2JqZWt0VmFsdWUgPSBwcmV2aW9zRmlsdGVyW2ldLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlID0gcm93LnR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LHQtdGA0LXQvCDQvNCw0YHRgdC40LIg0L7QsdGK0LXQutGC0L7QslxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcm93Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBjb21wb25lbnRPYmpla3RWYWx1ZSB8fCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBjb21wb25lbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZzOiByb3cuaWRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC+0LHQvdC+0LLQuNC8INGB0YLRgNC+0LrRgyDRhNC40LvRjNGC0YDQsNGG0LjQuFxyXG4gICAgICAgIHRoaXMuZ2V0RmlsdGVyU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyRGF0YTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwiZ2V0RmlsdGVyU3RyaW5nXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L/RgNC10L7QsdGA0LDQt9GD0LXRgiDQtNCw0L3QvdGL0LUg0YTQuNC70YLRgNCwINCyINGB0YLRgNC+0LrRg1xyXG4gICAgICAgIGxldCBzdHJpbmcgPSAnJztcclxuXHJcbiAgICAgICAgdGhpcy5maWx0ZXJEYXRhLm1hcChmdW5jdGlvbihyb3cpICB7XHJcbiAgICAgICAgICAgIGlmIChyb3cudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZyArIHJvdy5uYW1lICsgJzonICsgcm93LnZhbHVlICsgJzsgJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzdHJpbmc7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcInByZXBhcmVQYXJhbXNGb3JUb29sYmFyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0YfQuNGC0LDQtdC8INC00LDQvdC90YvQtSDRgdC+INGB0YLQvtGA0LAsINGE0L7RgNC80LjRgNGD0LXQvCDQv9Cw0YDQsNC80LXRgtGA0Ysg0LTQu9GPINC60L3QvtC/0L7QuiDRg9C/0YDQsNCy0LvQtdC90LjRjywg0Lgg0YLRg9C00LAg0LjRhSDQvtGC0LTQsNC10LxcclxuLy9kb2NzR3JpZENoYW5nZSAoZmx1eC5zdG9yZXMuZG9jc1N0b3JlLilcclxuICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZmluZENvbXBvbmVudCgnZG9jc0dyaWQnKSB8fCBbXSxcclxuICAgICAgICAgICAgbGFzdFJvd0lkID0gdGhpcy5zdGF0ZS5hY3RpdlJvd0lkLFxyXG4gICAgICAgICAgICBkYXRhID0gW10sXHJcbiAgICAgICAgICAgIGRhdGFSb3cgPSBbXSxcclxuICAgICAgICAgICAgdG9vbGJhclBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGJ0bkFkZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYnRuRWRpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYnRuRGVsZXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBidG5QcmludDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4vLyDQv9GA0L7QstC10YDQuNC8INC90LDQu9C40YfQuNC1INC00LDQvdC90YvRhSwg0LXRgdC70Lgg0LXRgdGC0Ywg0L/RgNC+0L/QuNGF0L3QtdC8INC60L7QvNC/0L7QvdC10L3RgtCw0LxcclxuXHJcbiAgICAgICAgaWYgKGdyaWQubGVuZ3RoID4gMCAmJiBncmlkWzBdLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBkYXRhID0gZ3JpZFswXS5kYXRhWzBdLmRhdGE7XHJcbiAgICAgICAgICAgIGRhdGFSb3cgPSBkYXRhLmZpbHRlcihmdW5jdGlvbihyb3cpICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocm93LmlkID09PSBsYXN0Um93SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdG9vbGJhclBhcmFtcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhUm93Lmxlbmd0aCA+IDAgJiYgZGF0YVJvd1swXS5zdGF0dXMgPT0gJ9Cf0YDQvtCy0LXQtNC10L0nKSB7XHJcbiAgICAgICAgICAgIC8vINGD0LTQsNC70Y/RgtGMINC90LXQu9GM0LfRj1xyXG4gICAgICAgICAgICB0b29sYmFyUGFyYW1zLmJ0bkRlbGV0ZS5zaG93ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b29sYmFyUGFyYW1zO1xyXG5cclxuICAgIH19KTtcclxuXHJcblxyXG5cclxuUmVnaXN0ZXIuUHJvcFR5cGVzID0ge1xyXG4gICAgY29tcG9uZW50czogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVnaXN0ZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2NzL2RvYy1yZWdpc3Rlci9kb2MtcmVnaXN0ZXIuanN4XG4vLyBtb2R1bGUgaWQgPSA4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyksXHJcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXHJcbiAgICBJQ09OID0gJ2ZpbHRlcic7XHJcblxyXG5cclxudmFyIF9fX19DbGFzc2Y9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc2ZfX19fS2V5IGluIF9fX19DbGFzc2Ype2lmKF9fX19DbGFzc2YuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzZl9fX19LZXkpKXtCdXR0b25SZWdpc3RlckZpbHRlcltfX19fQ2xhc3NmX19fX0tleV09X19fX0NsYXNzZltfX19fQ2xhc3NmX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2Y9X19fX0NsYXNzZj09PW51bGw/bnVsbDpfX19fQ2xhc3NmLnByb3RvdHlwZTtCdXR0b25SZWdpc3RlckZpbHRlci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzZik7QnV0dG9uUmVnaXN0ZXJGaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPUJ1dHRvblJlZ2lzdGVyRmlsdGVyO0J1dHRvblJlZ2lzdGVyRmlsdGVyLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc2Y7XHJcbi8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcclxuICAgIGZ1bmN0aW9uIEJ1dHRvblJlZ2lzdGVyRmlsdGVyKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzZi5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlckZpbHRlci5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyRmlsdGVyLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge1xyXG4gICAgICAgICAgICByZWY6IFwiYnRuRmlsdGVyXCIsIFxyXG4gICAgICAgICAgICB2YWx1ZTogXCJGaWx0ZXJcIiwgXHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdywgXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24oZSkgIHtyZXR1cm4gdGhpcy5oYW5kbGVDbGljayhlKTt9LmJpbmQodGhpcyl9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VcIiwgc3JjOiBzdHlsZXMuaWNvbnNbSUNPTl19KVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuXHJcbjtcclxuXHJcbkJ1dHRvblJlZ2lzdGVyRmlsdGVyLnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufVxyXG5cclxuXHJcbkJ1dHRvblJlZ2lzdGVyRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHNob3c6IHRydWVcclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25SZWdpc3RlckZpbHRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1maWx0ZXIvYnV0dG9uLXJlZ2lzdGVyLWZpbHRlci5qc3hcbi8vIG1vZHVsZSBpZCA9IDgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi4vbW9kYWxQYWdlLmpzeCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi4vbW9kYWxwYWdlLWRlbGV0ZS9tb2RhbHBhZ2UtZGVsZXRlLXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzczU9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzczVfX19fS2V5IGluIF9fX19DbGFzczUpe2lmKF9fX19DbGFzczUuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzNV9fX19LZXkpKXtNb2RhbFBhZ2VEZWxldGVbX19fX0NsYXNzNV9fX19LZXldPV9fX19DbGFzczVbX19fX0NsYXNzNV9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3M1PV9fX19DbGFzczU9PT1udWxsP251bGw6X19fX0NsYXNzNS5wcm90b3R5cGU7TW9kYWxQYWdlRGVsZXRlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3M1KTtNb2RhbFBhZ2VEZWxldGUucHJvdG90eXBlLmNvbnN0cnVjdG9yPU1vZGFsUGFnZURlbGV0ZTtNb2RhbFBhZ2VEZWxldGUuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzNTtcclxuICAgIGZ1bmN0aW9uIE1vZGFsUGFnZURlbGV0ZShwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzczUuY2FsbCh0aGlzLHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvd1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTW9kYWxQYWdlRGVsZXRlLnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93OiBuZXh0UHJvcHMuc2hvd30pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb2RhbFBhZ2VEZWxldGUucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IG1vZGFsT2JqZWN0cyA9IFsnYnRuT2snLCAnYnRuQ2FuY2VsJ107XHJcblxyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge3JlZjogXCJtb2RhbFBhZ2VcIiwgXHJcbiAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLnByb3BzLm1vZGFsUGFnZUJ0bkNsaWNrLCBcclxuICAgICAgICAgICAgc2hvdzogdGhpcy5zdGF0ZS5zaG93LCBcclxuICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJEZWxldGUgZG9jdW1lbnRcIn0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtyZWY6IFwiY29udGFpbmVyXCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWFnZVwiLCB7cmVmOiBcImltYWdlXCIsIHNyYzogc3R5bGVzLmljb259KSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7cmVmOiBcIm1lc3NhZ2VcIn0sIFwiINCj0LTQsNC70LjRgtGMINC00L7QutGD0LzQtdC90YIgPyBcIilcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuXHJcblxyXG5Nb2RhbFBhZ2VEZWxldGUucHJvcFR5cGVzID0ge1xyXG4gICAgbW9kYWxQYWdlQnRuQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFBhZ2VEZWxldGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2UtZGVsZXRlL21vZGFsUGFnZS1kZWxldGUuanN4XG4vLyBtb2R1bGUgaWQgPSA4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGljb246ICdpbWFnZXMvaWNvbnMvZGVsZXRlLnBuZydcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2UtZGVsZXRlL21vZGFscGFnZS1kZWxldGUtc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4uL21vZGFsUGFnZS5qc3gnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL21vZGFscGFnZS1pbmZvL21vZGFscGFnZS1pbmZvLXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzczY9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzczZfX19fS2V5IGluIF9fX19DbGFzczYpe2lmKF9fX19DbGFzczYuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzNl9fX19LZXkpKXtNb2RhbFBhZ2VJbmZvW19fX19DbGFzczZfX19fS2V5XT1fX19fQ2xhc3M2W19fX19DbGFzczZfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzNj1fX19fQ2xhc3M2PT09bnVsbD9udWxsOl9fX19DbGFzczYucHJvdG90eXBlO01vZGFsUGFnZUluZm8ucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczYpO01vZGFsUGFnZUluZm8ucHJvdG90eXBlLmNvbnN0cnVjdG9yPU1vZGFsUGFnZUluZm87TW9kYWxQYWdlSW5mby5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3M2O1xyXG4gICAgZnVuY3Rpb24gTW9kYWxQYWdlSW5mbyhwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzczYuY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnNob3dcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb2RhbFBhZ2VJbmZvLnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93OiBuZXh0UHJvcHMuc2hvd30pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb2RhbFBhZ2VJbmZvLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgc3lzdGVtTWVzc2FnZSA9IHRoaXMucHJvcHMuc3lzdGVtTWVzc2FnZSA/IHRoaXMucHJvcHMuc3lzdGVtTWVzc2FnZSA6ICcnLFxyXG4gICAgICAgICAgICBtb2RhbE9iamVjdHMgPSBbJ2J0bk9rJ107XHJcblxyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge3JlZjogXCJtb2RhbFBhZ2VcIiwgXHJcbiAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLnByb3BzLm1vZGFsUGFnZUJ0bkNsaWNrLCBcclxuICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJXYXJuaW5nIVwiLCBcclxuICAgICAgICAgICAgbW9kYWxPYmplY3RzOiBtb2RhbE9iamVjdHN9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7cmVmOiBcImNvbnRhaW5lclwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIiwge3JlZjogXCJpbWFnZVwiLCBzcmM6IHN0eWxlcy5pY29ufSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCIgXCIsIHN5c3RlbU1lc3NhZ2UsIFwiIFwiKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG5cclxuXHJcbk1vZGFsUGFnZUluZm8ucHJvcFR5cGVzID0ge1xyXG4gICAgc3lzdGVtTWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsUGFnZUluZm87XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWluZm8vbW9kYWxQYWdlLWluZm8uanN4XG4vLyBtb2R1bGUgaWQgPSA4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGljb246ICdpbWFnZXMvaWNvbnMvaW5mby5wbmcnXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWluZm8vbW9kYWxwYWdlLWluZm8tc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9kYXRhbGlzdC1zdHlsZXMnKTtcclxuXHJcbnZhciBfX19fQ2xhc3M3PVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3M3X19fX0tleSBpbiBfX19fQ2xhc3M3KXtpZihfX19fQ2xhc3M3Lmhhc093blByb3BlcnR5KF9fX19DbGFzczdfX19fS2V5KSl7RGF0YUxpc3RbX19fX0NsYXNzN19fX19LZXldPV9fX19DbGFzczdbX19fX0NsYXNzN19fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3M3PV9fX19DbGFzczc9PT1udWxsP251bGw6X19fX0NsYXNzNy5wcm90b3R5cGU7RGF0YUxpc3QucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczcpO0RhdGFMaXN0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1EYXRhTGlzdDtEYXRhTGlzdC5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3M3O1xyXG4gICAgZnVuY3Rpb24gRGF0YUxpc3QocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3M3LmNhbGwodGhpcyxwcm9wcyk7XHJcblxyXG4gICAgICAgIGxldCBpZHggPSAwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy52YWx1ZSkge1xyXG4gICAgICAgICAgICAvLyB3ZSBnb3QgdmFsdWUsIHdlIHNob3VsZCBmaW5kIGluZGV4IGFuZCBpbml0aWxpemUgaWR4IGZpZWxkXHJcbiAgICAgICAgICAgIHByb3BzLmRhdGEuZm9yRWFjaChmdW5jdGlvbihyb3csIGluZGV4KSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvd1twcm9wcy5iaW5kRGF0YUZpZWxkXSA9PT0gcHJvcHMudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3VuZFxyXG4gICAgICAgICAgICAgICAgICAgIGlkeCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGRhdGE6IHByb3BzLmRhdGEsXHJcbiAgICAgICAgICAgIGluZGV4OiBpZHgsXHJcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5oYW5kbGVMaUNsaWNrID0gdGhpcy5oYW5kbGVMaUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFMaXN0LnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5wcm9wcy5kYXRhLFxyXG4gICAgICAgICAgICBjbGlja2VkSXRlbSA9IHRoaXMuc3RhdGUuaW5kZXg7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3JlZjogXCJkYXRhbGlzdFwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwge3JlZjogXCJkYXRhbGlzdC11bFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmRvY0xpc3QsIGNsaWNrZWRJdGVtID09IGluZGV4ID8gc3R5bGVzLmZvY3VzZWQgOiB7fSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50SWQgPSAnbGktJyArIGluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtrZXk6IGNvbXBvbmVudElkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBjb21wb25lbnRJZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlTGlDbGljay5iaW5kKHRoaXMsIGluZGV4KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBzdHlsZX0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFMaXN0LnByb3RvdHlwZSxcImhhbmRsZUxpQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihpZHgpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnByb3BzLmRhdGFbaWR4XVt0aGlzLnByb3BzLmJpbmREYXRhRmllbGRdO1xyXG4gICAgICAgIC8v0YHRgtCw0LLQuNC8INC80LXRgtC60YNcclxuICAgICAgICAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpbmRleDogaWR4LFxyXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICBsZXQgY2hhbmdlQWN0aW9uID0gdGhpcy5wcm9wcy5uYW1lICsgJ0NoYW5nZSdcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKGNoYW5nZUFjdGlvbiwgdmFsdWUpXHJcbiAgICB9fSk7XHJcblxyXG5cclxuXHJcbkRhdGFMaXN0LnByb3BUeXBlcyA9IHtcclxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLmFycmF5XHJcbn07XHJcblxyXG5EYXRhTGlzdC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkYXRhOiBbe1xyXG4gICAgICAgIGlkOiAwLFxyXG4gICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgIGtvb2Q6ICcnXHJcbiAgICB9XSxcclxuICAgIHZhbHVlOiBudWxsLFxyXG4gICAgYmluZERhdGFGaWVsZDogJ2lkJ1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFMaXN0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhbGlzdC9kYXRhbGlzdC5qc3hcbi8vIG1vZHVsZSBpZCA9IDg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZG9jTGlzdDoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXG4gICAgICAgIHBhZGRpbmc6ICc1cHgnLFxuICAgICAgICBtYXJnaW5SaWdodDogJzIwcHgnXG4gICAgfSxcbiAgICBmb2N1c2VkOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Ymx1ZSdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhbGlzdC9kYXRhbGlzdC1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDg5XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IHNpZGVCYXJTdHlsZXMgPSByZXF1aXJlKCcuL3NpZGViYXItc3R5bGVzJyksXHJcbiAgICBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcblxyXG5cclxudmFyIF9fX19DbGFzczg9UmVhY3QuQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzOF9fX19LZXkgaW4gX19fX0NsYXNzOCl7aWYoX19fX0NsYXNzOC5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3M4X19fX0tleSkpe1NpZGVCYXJDb250YWluZXJbX19fX0NsYXNzOF9fX19LZXldPV9fX19DbGFzczhbX19fX0NsYXNzOF9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3M4PV9fX19DbGFzczg9PT1udWxsP251bGw6X19fX0NsYXNzOC5wcm90b3R5cGU7U2lkZUJhckNvbnRhaW5lci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzOCk7U2lkZUJhckNvbnRhaW5lci5wcm90b3R5cGUuY29uc3RydWN0b3I9U2lkZUJhckNvbnRhaW5lcjtTaWRlQmFyQ29udGFpbmVyLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzczg7XHJcbiAgICBmdW5jdGlvbiBTaWRlQmFyQ29udGFpbmVyKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzOC5jYWxsKHRoaXMscHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogcHJvcHMud2lkdGgsXHJcbiAgICAgICAgICAgIGNvbnRlbnRXaWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sQmFyOiBwcm9wcy50b29sYmFyXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5idG5DbGlja0hhbmRsZXIgPSB0aGlzLmJ0bkNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTaWRlQmFyQ29udGFpbmVyLnByb3RvdHlwZSxcImJ0bkNsaWNrSGFuZGxlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuc3RhdGUuc2hvdyA/ICcyMHB4JyA6IHRoaXMucHJvcHMud2lkdGgsXHJcbiAgICAgICAgICAgIGNvbnRlbnRXaWR0aCA9IHRoaXMuc3RhdGUuc2hvdyA/ICcxcHgnIDogJzEwMCUnLFxyXG4gICAgICAgICAgICBzaG93Q29udGVudCA9ICF0aGlzLnN0YXRlLnNob3c7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgIGNvbnRlbnRXaWR0aDogY29udGVudFdpZHRoLFxyXG4gICAgICAgICAgICBzaG93OiBzaG93Q29udGVudFxyXG4gICAgICAgIH0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTaWRlQmFyQ29udGFpbmVyLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCB0b29sQmFyU3ltYm9sID0gdGhpcy5zdGF0ZS5zaG93ID8gJzwnIDogJz4nOyAvL3RvZG8gbW92ZSB0byBzdHlsZXMgZmlsZVxyXG5cclxuICAgICAgICAvL3ByZXBhaXJlIHN0eWxlc1xyXG4gICAgICAgIGxldCBzaWRlQmFyQ29udGFpbmVyU3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzaWRlQmFyU3R5bGVzLnNpZGVCYXJDb250YWluZXJTdHlsZSwge3dpZHRoOiB0aGlzLnN0YXRlLndpZHRofSksXHJcbiAgICAgICAgICAgIHRvb2xCYXJTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sc2lkZUJhclN0eWxlcy50b29sQmFyU3R5bGUsIHt2aXNpYmlsaXR5OiB0aGlzLnByb3BzLnRvb2xiYXIgPyAndmlzaWJsZSc6ICdoaWRkZW4nfSksXHJcbiAgICAgICAgICAgIGNvbnRlbnRTdHlsZSA9IE9iamVjdC5hc3NpZ24oKHt9LHNpZGVCYXJTdHlsZXMuY29udGVudFN0eWxlLCB7dmlzaWJpbGl0eTogdGhpcy5zdGF0ZS5zaG93ID8gJ3Zpc2libGUnOiAnaGlkZGVuJ30pKSxcclxuICAgICAgICAgICAgYnV0dG9uU3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LHNpZGVCYXJTdHlsZXMuYnV0dG9uU3R5bGUsIHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy50b29sYmFyID8gc2lkZUJhclN0eWxlcy5idXR0b25TdHlsZS5oZWlnaHQ6ICcwJyxcclxuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IHRoaXMucHJvcHMudG9vbGJhciA/ICd2aXNpYmxlJzogJ2hpZGRlbidcclxuICAgICAgICB9IClcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwidG9vbEJhckNvbnRhaW5lclwiLCBzdHlsZTogc2lkZUJhckNvbnRhaW5lclN0eWxlLCByZWY6IFwidG9vbGJhclwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJidG5CYXJcIiwgc3R5bGU6IHRvb2xCYXJTdHlsZX0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJidXR0b25cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzaWRlYmFyLWJ1dHRvblwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGJ1dHRvblN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRvb2xCYXJTeW1ib2wsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmJ0bkNsaWNrSGFuZGxlcn1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcImNvbnRlbnRcIiwgc3R5bGU6IGNvbnRlbnRTdHlsZSwgcmVmOiBcImNvbnRlbnRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuXHJcblxyXG5TaWRlQmFyQ29udGFpbmVyLnByb3BUeXBlcyA9IHtcclxuICAgIHRvb2xiYXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcclxufTtcclxuXHJcblNpZGVCYXJDb250YWluZXIuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdG9vbGJhcjogdHJ1ZSxcclxuICAgIHdpZHRoOiAnMTAwJSdcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2lkZUJhckNvbnRhaW5lcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzeFxuLy8gbW9kdWxlIGlkID0gOTBcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzaWRlQmFyQ29udGFpbmVyU3R5bGU6IHtcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCByZWQnLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnXG4gICAgfSxcblxuICAgIHRvb2xCYXJTdHlsZToge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGhlaWdodDogJ2F1dG8nLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnZ3JheScsXG4gICAgICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJ1xuICAgIH0sXG4gICAgY29udGVudFN0eWxlOiB7XG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJ1xuICAgIH0sXG5cbiAgICBidXR0b25TdHlsZToge1xuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgaGVpZ2h0OiAnMjBweCcsXG4gICAgICAgIHdpZHRoOiAnMjBweCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXItc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnRhaW5lcjoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhGbG93OiAncm93IHdyYXAnLFxuICAgICAgICBoZWlnaHQ6ICc4NyUnLFxuICAgICAgICBib3JkZXI6ICczcHggc29saWQgYnJvd24nXG4gICAgfSxcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIGZsZXg6ICcxIDEwMCUnLFxuICAgICAgICBhbGlnbkl0ZW1zOiAnc3RyZXRjaCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnXG4gICAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2RvY3MvZG9jLXJlZ2lzdGVyL2RvYy1yZWdpc3Rlci1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDkyXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vZ3JpZC1maWx0ZXItc3R5bGVzJyk7XHJcblxyXG5cclxudmFyIF9fX19DbGFzc2E9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc2FfX19fS2V5IGluIF9fX19DbGFzc2Epe2lmKF9fX19DbGFzc2EuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzYV9fX19LZXkpKXtHcmlkRmlsdGVyW19fX19DbGFzc2FfX19fS2V5XT1fX19fQ2xhc3NhW19fX19DbGFzc2FfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzYT1fX19fQ2xhc3NhPT09bnVsbD9udWxsOl9fX19DbGFzc2EucHJvdG90eXBlO0dyaWRGaWx0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2EpO0dyaWRGaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPUdyaWRGaWx0ZXI7R3JpZEZpbHRlci5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NhO1xyXG4gICAgZnVuY3Rpb24gR3JpZEZpbHRlcihwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc2EuY2FsbCh0aGlzLHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZ3JpZENvbmZpZzogdGhpcy5wcm9wcy5ncmlkQ29uZmlnLCAvLyBncmlkIGNvbmZpZ1xyXG4gICAgICAgICAgICBkYXRhOiB0aGlzLnByb3BzLmRhdGEgLy8gZmlsdGVyIGRhdGFcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKSAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdyaWRGaWx0ZXIucHJvdG90eXBlLFwiaGFuZGxlQ2hhbmdlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlLFxyXG4gICAgICAgICAgICBpZCA9IGUudGFyZ2V0Lm5hbWUsXHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnN0YXRlLmRhdGEsXHJcbiAgICAgICAgICAgIGluZGV4O1xyXG5cclxuICAgICAgICAvLyDQvdCw0LTQviDQvdCw0LnRgtC4INGN0LvQtdC80LXQvdGCINC80LDRgdGB0LjQstCwINGBINC00LDQvdC90YvQvNC4INC00LvRjyDRjdGC0L7Qs9C+INC60L7QvNC/0L7QvdC10L3RgtCwXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhW2ldLnJlZnMgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGRhdGFbaW5kZXhdLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IGRhdGF9KTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdyaWRGaWx0ZXIucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRDb25maWc6IG5leHRQcm9wcy5ncmlkQ29uZmlnLCBkYXRhOiBuZXh0UHJvcHMuZGF0YX0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHcmlkRmlsdGVyLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINGB0L7Qt9C00LDRgdGCINC40Lcg0L/QvtC70LXQuSDQs9GA0LjQtNCwINC60L7QvNC/0L7QvdC10L3RgtGLINC00LvRjyDRhNC+0YDQvNC40YDQvtCy0LDQvdC40Y8g0YPRgdC70L7QstC40Lkg0YTQuNC70YzRgtGA0LDRhtC40LhcclxuICAgICAgICBsZXQgZ3JpZENvbmZpZyA9IHRoaXMuc3RhdGUuZ3JpZENvbmZpZyxcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuc3RhdGUuZGF0YTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZmllbGRzZXR9LCBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBncmlkQ29uZmlnLm1hcChmdW5jdGlvbihyb3csIGluZGV4KSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnRUeXBlID0gcm93LnR5cGU/IHJvdy50eXBlOiAndGV4dCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZm9ybVdpZGdldCwga2V5OiAnZmllbGRTZXQtJyArIHJvdy5pZH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmZvcm1XaWRnZXRMYWJlbH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgcm93Lm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmZvcm1XaWRnZXRJbnB1dH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtzdHlsZTogc3R5bGVzLmlucHV0LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBjb21wb25lbnRUeXBlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcm93Lm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJvdy5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHJvdy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IHJvdy5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZGF0YVtyb3cuaWRdLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZGF0YVtyb3cuaWRdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcblxyXG5cclxuR3JpZEZpbHRlci5wcm9wVHlwZXMgPSB7XHJcbiAgICBncmlkQ29uZmlnOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR3JpZEZpbHRlcjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC9ncmlkLWZpbHRlci9ncmlkLWZpbHRlci5qc3hcbi8vIG1vZHVsZSBpZCA9IDkzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybVdpZGdldDoge1xuICAgICAgICBtYXJnaW5Cb3R0b206ICc1cHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnXG4gICAgfSxcbiAgICBmb3JtV2lkZ2V0TGFiZWw6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcbiAgICAgICAgd2lkdGg6ICc0MCUnLFxuICAgICAgICBtYXJnaW5SaWdodDogJzEwcHgnXG4gICAgfSxcbiAgICBmb3JtV2lkZ2V0SW5wdXQ6IHtcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgcGFkZGluZzogJzNweCcsXG4gICAgICAgIGJvcmRlcjogJzBweCdcbiAgICB9LFxuXG4gICAgaW5wdXQ6IHtcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgcGFkZGluZzogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG5cbiAgICB9LFxuXG4gICAgZmllbGRTZXQ6IHtcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgbWFyZ2luOiAnMTBweCdcbiAgICB9LFxuXG4gICAgdWk6IHtcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgcGFkZGluZzogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG5cbiAgICB9XG5cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC9ncmlkLWZpbHRlci9ncmlkLWZpbHRlci1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDk0XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIGRvY3NTdG9yZSA9IGZsdXguY3JlYXRlU3RvcmUoe1xuICAgIGlkOiAnZG9jc1N0b3JlJyxcbiAgICBpbml0aWFsU3RhdGU6IHtcbiAgICAgICAgZG9jc0dyaWQ6IDAsXG4gICAgICAgIGRvY3NMaXN0OiAnJyxcbiAgICAgICAgbmFtZTogJ3ZsYWQnLFxuICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgc29ydEJ5OiBbeyBjb2x1bW46ICdpZCcsIGRpcmVjdGlvbjogJ2Rlc2MnIH1dLFxuICAgICAgICBzcWxXaGVyZTogJycsXG4gICAgICAgIHN5c3RlbU1lc3NhZ2U6IG51bGxcbiAgICB9LFxuICAgIGFjdGlvbkNhbGxiYWNrczoge1xuICAgICAgICBzeXN0ZW1NZXNzYWdlQ2hhbmdlOiBmdW5jdGlvbiBzeXN0ZW1NZXNzYWdlQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHN5c3RlbU1lc3NhZ2U6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzcWxXaGVyZUNoYW5nZTogZnVuY3Rpb24gc3FsV2hlcmVDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgc3FsV2hlcmU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgcmVxdWVyeSh7IG5hbWU6ICdkb2NzR3JpZCcsIHZhbHVlOiB0aGlzLmRvY3NMaXN0IH0pO1xuICAgICAgICB9LFxuICAgICAgICBzb3J0QnlDaGFuZ2U6IGZ1bmN0aW9uIHNvcnRCeUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBzb3J0Qnk6IHZhbHVlIH0pO1xuICAgICAgICAgICAgcmVxdWVyeSh7IG5hbWU6ICdkb2NzR3JpZCcsIHZhbHVlOiB0aGlzLmRvY3NMaXN0LCBzb3J0Qnk6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICBBZGQ6IGZ1bmN0aW9uIEFkZCh1cGRhdGVyKSB7XG4gICAgICAgICAgICBhZGQodGhpcy5kb2NzTGlzdCk7XG4gICAgICAgIH0sXG4gICAgICAgIEVkaXQ6IGZ1bmN0aW9uIEVkaXQodXBkYXRlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMuZG9jc0xpc3QgJiYgdGhpcy5kb2NzR3JpZCkge1xuICAgICAgICAgICAgICAgIGVkaXQodGhpcy5kb2NzTGlzdCwgdGhpcy5kb2NzR3JpZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ9Ci0LjQvyDQtNC+0LrRg9C80LXQvdGC0LAg0LjQu9C4INC00L7QutGD0LzQtdC90YIg0L3QtSDQstGL0LHRgNCw0L0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgRGVsZXRlOiBmdW5jdGlvbiBEZWxldGUodXBkYXRlcikge1xuICAgICAgICAgICAgdmFyIGRvY1R5cGVJZCA9IHRoaXMuZG9jc0xpc3Q7XG4gICAgICAgICAgICByZXF1ZXJ5Rm9yQWN0aW9uKCdkZWxldGUnLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzeXN0ZW1NZXNzYWdlQ2hhbmdlJywgZXJyKTsgLy8g0L/QuNGI0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YXRgNCw0L3QuNC70LjRidC1XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc3lzdGVtTWVzc2FnZUNoYW5nZScsIG51bGwpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVyeSh7IG5hbWU6ICdkb2NzR3JpZCcsIHZhbHVlOiBkb2NUeXBlSWQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIFByaW50OiBmdW5jdGlvbiBQcmludCh1cGRhdGVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYnV0dG9uIFByaW50IGNsaWtlZCEnKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2hhbmdlTmFtZTogZnVuY3Rpb24gY2hhbmdlTmFtZSh1cGRhdGVyLCBuYW1lKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgbmFtZTogbmFtZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZG9jc0dyaWRDaGFuZ2U6IGZ1bmN0aW9uIGRvY3NHcmlkQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkb2NzR3JpZENoYW5nZScsIHZhbHVlKTtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZG9jc0dyaWQ6IHZhbHVlIH0pO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICBsb2NhbFN0b3JhZ2VbJ2RvY3NHcmlkJ10gPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZG9jc0xpc3RDaGFuZ2U6IGZ1bmN0aW9uIGRvY3NMaXN0Q2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZG9jc0xpc3Q6IHZhbHVlIH0pO1xuICAgICAgICAgICAgcmVxdWVyeSh7IG5hbWU6ICdkb2NzR3JpZCcsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbG9jYWxTdG9yYWdlWydkb2NzTGlzdCddID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFDaGFuZ2U6IGZ1bmN0aW9uIGRhdGFDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhQ2hhbmdlOicsIHZhbHVlKTtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZGF0YTogdmFsdWUgfSk7XG4gICAgICAgIH1cblxuICAgIH1cbn0pO1xuXG52YXIgZWRpdCA9IGZ1bmN0aW9uIGVkaXQoZG9jVHlwZUlkLCBkb2NJZCkge1xuICAgIHZhciB1cmwgPSBcIi9kb2N1bWVudC9cIiArIGRvY1R5cGVJZCArIGRvY0lkO1xuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG59O1xuXG52YXIgYWRkID0gZnVuY3Rpb24gYWRkKGRvY1R5cGVJZCkge1xuICAgIHZhciB1cmwgPSBcIi9kb2N1bWVudC9cIiArIGRvY1R5cGVJZCArICcwJztcbiAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xufTtcblxudmFyIHJlcXVlcnlGb3JBY3Rpb24gPSBmdW5jdGlvbiByZXF1ZXJ5Rm9yQWN0aW9uKGFjdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIXdpbmRvdy5qUXVlcnkpIHJldHVybjsgLy8g0LTQu9GPINGC0LXRgdGC0L7QslxuXG4gICAgaWYgKCEkKSByZXR1cm47XG4gICAgLy8g0LzQtdGC0L7QtCDQvtCx0LXRgdC/0LXRh9C40YIg0LfQsNC/0YDQvtGBINC90LAg0LLRi9C/0L7Qu9C90LXQvdC40LVcbiAgICB2YXIgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgZG9jSWQ6IGRvY3NTdG9yZS5kb2NzR3JpZCxcbiAgICAgICAgZG9jX3R5cGVfaWQ6IGRvY3NTdG9yZS5kb2NzTGlzdFxuICAgIH07XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2RvYycsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBhcmFtZXRlcnMpXG4gICAgICAgIH0sXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgICAgICAvLyDQtNC+0LvQttC90Ysg0L/QvtC70YPRh9C40YLRjCDQvtCx0YrQtdC60YIgLSDRgNC10LfRg9C70YzRgtCw0YJcbiAgICAgICAgICAgIHZhciBlcnJvck1lc3NzYWdlID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCA9PSAnRXJyb3InKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzc2FnZSA9ICdFcnJvciwgJyArIGRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yTWVzc3NhZ2UsIGRhdGEpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignL2Vycm9yJywgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIG51bGwpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG52YXIgcmVxdWVyeSA9IGZ1bmN0aW9uIHJlcXVlcnkoY29tcG9uZW50KSB7XG4gICAgaWYgKCF3aW5kb3cualF1ZXJ5KSByZXR1cm47IC8vINC00LvRjyDRgtC10YHRgtC+0LJcblxuICAgIC8vINC80LXRgtC+0LQg0L7QsdC10YHQv9C10YfQuNGCINC/0L7Qu9GD0YfQtdC90LjQtSDQtNCw0L3QvdGL0YUg0L7RgiDRgdC10YDQstC10YDQsFxuICAgIC8vIGNvbXBvbmVudCA9IHRoaXMuc3RhdGUuY29tcG9uZW50c1tuYW1lXVxuICAgIC8vINC10YHQu9C4INC/0LDRgNCw0LzQtdGC0YDRiyDQvdC1INC30LDQtNCw0L3Riywg0LPRgNGD0LfQuNC8INCy0YHQtVxuXG4gICAgdmFyIGNvbXBvbmVudHMgPSBkb2NzU3RvcmUuZGF0YTtcblxuICAgIC8vINGE0LjQu9GM0YLRgNGD0LXQvCDRgdC/0LjRgdC+0Log0LrQvtC80L/QvtC90LXQvdGC0L7QslxuICAgIHZhciBjb21wb25lbnRzRm9yVXBkYXRlID0gY29tcG9uZW50cy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgLy8g0LjRidC10Lwg0L7QsdGK0LXQutGCINC/0L4g0L3QsNC40LzQtdC90L7QstCw0L3QuNGOLiDQuNC70Lgg0LLQtdGA0L3QtdC8INCy0YHQtSDQtdGB0LvQuCDQv9Cw0YDQsNC80LXRgtGAINC90LUg0LfQsNC00LDQvVxuICAgICAgICAvLyAgICAgICBjb25zb2xlLmxvZygnY29tcG9uZW50OicgKyBKU09OLnN0cmluZ2lmeShjb21wb25lbnQpKTtcbiAgICAgICAgaWYgKGNvbXBvbmVudC5uYW1lID09ICcnIHx8IGl0ZW0ubmFtZSA9PSBjb21wb25lbnQubmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8g0YHQvtGA0YLQuNGA0L7QstC60LBcbiAgICB2YXIgc3FsU29ydEJ5ID0gJycsXG4gICAgICAgIHNxbFdoZXJlID0gZG9jc1N0b3JlLnNxbFdoZXJlIHx8ICcnO1xuICAgIHZhciBzb3J0QnlBcnJheSA9IGRvY3NTdG9yZS5zb3J0QnksXG4gICAgICAgIGFyclR5cGUgPSB0eXBlb2Ygc29ydEJ5QXJyYXkgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHNvcnRCeUFycmF5KTtcblxuICAgIGlmIChkb2NzU3RvcmUuc29ydEJ5KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc29ydEJ5QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIHNxbFNvcnRCeSA9IHNxbFNvcnRCeSArICcsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNxbFNvcnRCeSA9IHNxbFNvcnRCeSArIHNvcnRCeUFycmF5W2ldLmNvbHVtbiArICcgJyArIHNvcnRCeUFycmF5W2ldLmRpcmVjdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBVUkwgPSAnL2FwaS9kb2NzJztcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFVSTCxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG5cbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZGF0YVR5cGU6ICdjb21wb25lbnQnLFxuICAgICAgICAgICAgZG9jVHlwZUlkOiAxLFxuICAgICAgICAgICAgY29tcG9uZW50czogSlNPTi5zdHJpbmdpZnkoY29tcG9uZW50c0ZvclVwZGF0ZSksIC8vINC60L7QvNC/0L7QvdC10L3RgtGLINC00LvRjyDQvtCx0L3QvtCy0LvQtdC90LjRj1xuICAgICAgICAgICAgcGFyYW1ldGVyOiBjb21wb25lbnQudmFsdWUsIC8vINC/0LDRgNCw0LzQtdGC0YDRi1xuICAgICAgICAgICAgc29ydEJ5OiBzcWxTb3J0QnksIC8vINGB0L7RgNGC0LjRgNC+0LLQutCwXG4gICAgICAgICAgICBsYXN0RG9jSWQ6IGRvY3NTdG9yZS5kb2NzR3JpZCxcbiAgICAgICAgICAgIHNxbFdoZXJlOiBzcWxXaGVyZSB9LFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAvLyDQtNC+0LvQttC90Ysg0L/QvtC70YPRh9C40YLRjCDQvtCx0YrQtdC60YJcbiAgICAgICAgICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygncGFyZW50IGFycml2ZWQgZGF0YTonICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkgKyAn0YLQuNC/OicgKyB0eXBlb2YgZGF0YSk7XG5cbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIC8vIGZpbmQgaXRlbVxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3BhcmVudCBJdGVtOicgKyBKU09OLnN0cmluZ2lmeShpdGVtKSApO1xuICAgICAgICAgICAgICAgIC8vINC+0LHQvdC+0LLQuNC8INC00LDQvdC90YvQtSDQvNCw0YHRgdC40LLQsCDQutC+0LzQv9C+0L3QtdC90YLQvtCyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50cyA9IGNvbXBvbmVudHMubWFwKGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5uYW1lID09IGl0ZW0ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5kYXRhID0gaXRlbS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0b3JlIGRhdGEgdXBkYXRlOicgKyBKU09OLnN0cmluZ2lmeShjb21wb25lbnRzKSk7XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgY29tcG9uZW50cyk7XG4gICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCcvZXJyb3InLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRvY3NTdG9yZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL3N0b3Jlcy9kb2NzX3N0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSA5NVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9
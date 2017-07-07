var docs =
webpackJsonp_name_([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Register = __webpack_require__(71);

	// данные для хранилища
	//localStorage['docsStore'] = storeData;
	storeData = JSON.parse(storeData);

	ReactDOM.render(React.createElement(Register, { id: 'grid', components: storeData }, 'Тут будут компоненты'), document.getElementById('grid'));

/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// грузим компоненты

	const React = __webpack_require__(3),
	    flux = __webpack_require__(4),
	    DataGrid = __webpack_require__(27),
	    BtnAdd = __webpack_require__(49),
	    BtnEdit = __webpack_require__(50),
	    BtnDelete = __webpack_require__(51),
	    BtnPrint = __webpack_require__(60),
	    BtnFilter = __webpack_require__(72),
	    ModalPage = __webpack_require__(45),
	    ModalPageDelete = __webpack_require__(73),
	    ModalPageInfo = __webpack_require__(75),
	    DataList = __webpack_require__(77),
	    Sidebar = __webpack_require__(79),
	    ToolbarContainer = __webpack_require__(55),
	    styles = __webpack_require__(81),
	    GridFilter = __webpack_require__(82);


	// Create a store
	const docsStore = __webpack_require__(84);

	// создаем класс - держатель состояний
	var ____Class1=React.PureComponent;for(var ____Class1____Key in ____Class1){if(____Class1.hasOwnProperty(____Class1____Key)){Register[____Class1____Key]=____Class1[____Class1____Key];}}var ____SuperProtoOf____Class1=____Class1===null?null:____Class1.prototype;Register.prototype=Object.create(____SuperProtoOf____Class1);Register.prototype.constructor=Register;Register.__superConstructor__=____Class1;
	    function Register(props) {
	        ____Class1.call(this,props);
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
	                        React.createElement(Sidebar, {toolbar: false, ref: "grid-sidebar"}, 
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

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(43),
	    ICON = 'filter';


	var ____Classr=React.PureComponent;for(var ____Classr____Key in ____Classr){if(____Classr.hasOwnProperty(____Classr____Key)){ButtonRegisterFilter[____Classr____Key]=____Classr[____Classr____Key];}}var ____SuperProtoOf____Classr=____Classr===null?null:____Classr.prototype;ButtonRegisterFilter.prototype=Object.create(____SuperProtoOf____Classr);ButtonRegisterFilter.prototype.constructor=ButtonRegisterFilter;ButtonRegisterFilter.__superConstructor__=____Classr;
	// кнопка создания документа в регистрах
	    function ButtonRegisterFilter(props) {
	        ____Classr.call(this,props);
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

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(3),
	    ModalPage = __webpack_require__(45),
	    styles = __webpack_require__(74);

	var ____Classl=React.PureComponent;for(var ____Classl____Key in ____Classl){if(____Classl.hasOwnProperty(____Classl____Key)){ModalPageDelete[____Classl____Key]=____Classl[____Classl____Key];}}var ____SuperProtoOf____Classl=____Classl===null?null:____Classl.prototype;ModalPageDelete.prototype=Object.create(____SuperProtoOf____Classl);ModalPageDelete.prototype.constructor=ModalPageDelete;ModalPageDelete.__superConstructor__=____Classl;
	    function ModalPageDelete(props) {
	        ____Classl.call(this,props)
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

/***/ 74:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    icon: 'images/icons/delete.png'
	};

/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(3),
	    ModalPage = __webpack_require__(45),
	    styles = __webpack_require__(76);

	var ____Classm=React.PureComponent;for(var ____Classm____Key in ____Classm){if(____Classm.hasOwnProperty(____Classm____Key)){ModalPageInfo[____Classm____Key]=____Classm[____Classm____Key];}}var ____SuperProtoOf____Classm=____Classm===null?null:____Classm.prototype;ModalPageInfo.prototype=Object.create(____SuperProtoOf____Classm);ModalPageInfo.prototype.constructor=ModalPageInfo;ModalPageInfo.__superConstructor__=____Classm;
	    function ModalPageInfo(props) {
	        ____Classm.call(this,props);
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

/***/ 76:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    icon: 'images/icons/info.png'
	};

/***/ },

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(78);

	var ____Classn=React.PureComponent;for(var ____Classn____Key in ____Classn){if(____Classn.hasOwnProperty(____Classn____Key)){DataList[____Classn____Key]=____Classn[____Classn____Key];}}var ____SuperProtoOf____Classn=____Classn===null?null:____Classn.prototype;DataList.prototype=Object.create(____SuperProtoOf____Classn);DataList.prototype.constructor=DataList;DataList.__superConstructor__=____Classn;
	    function DataList(props) {
	        ____Classn.call(this,props);

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

	        if (this.props.onClickAction) {
	            //@todo избавиться от change
	            this.props.onClickAction(this.props.name + 'Change', value);
	        }
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

/***/ 78:
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

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const sideBarStyles = __webpack_require__(80),
	    React = __webpack_require__(3);


	var ____Classo=React.Component;for(var ____Classo____Key in ____Classo){if(____Classo.hasOwnProperty(____Classo____Key)){SideBarContainer[____Classo____Key]=____Classo[____Classo____Key];}}var ____SuperProtoOf____Classo=____Classo===null?null:____Classo.prototype;SideBarContainer.prototype=Object.create(____SuperProtoOf____Classo);SideBarContainer.prototype.constructor=SideBarContainer;SideBarContainer.__superConstructor__=____Classo;
	    function SideBarContainer(props) {
	        ____Classo.call(this,props);

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
	            contentStyle = Object.assign({},sideBarStyles.contentStyle, {visibility: this.state.show ? 'visible': 'hidden'}),
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

/***/ 80:
/***/ function(module, exports) {

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

/***/ },

/***/ 81:
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

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(83);


	var ____Classp=React.PureComponent;for(var ____Classp____Key in ____Classp){if(____Classp.hasOwnProperty(____Classp____Key)){GridFilter[____Classp____Key]=____Classp[____Classp____Key];}}var ____SuperProtoOf____Classp=____Classp===null?null:____Classp.prototype;GridFilter.prototype=Object.create(____SuperProtoOf____Classp);GridFilter.prototype.constructor=GridFilter;GridFilter.__superConstructor__=____Classp;
	    function GridFilter(props) {
	        ____Classp.call(this,props);

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

/***/ 83:
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

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var flux = __webpack_require__(4),
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
	    if (!window.jQuery || !$) return; // для тестов

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
	        }.bind(undefined),
	        error: function (xhr, status, err) {
	            console.error('/error', status, err.toString());
	        }.bind(undefined)
	    });
	};

	module.exports = docsStore;

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jcy9kb2MtcmVnaXN0ZXIvZG9jLXJlZ2lzdGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZmlsdGVyL2J1dHRvbi1yZWdpc3Rlci1maWx0ZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1kZWxldGUvbW9kYWxQYWdlLWRlbGV0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWRlbGV0ZS9tb2RhbHBhZ2UtZGVsZXRlLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2UtaW5mby9tb2RhbFBhZ2UtaW5mby5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWluZm8vbW9kYWxwYWdlLWluZm8tc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YWxpc3QvZGF0YWxpc3QuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YWxpc3QvZGF0YWxpc3Qtc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jcy9kb2MtcmVnaXN0ZXIvZG9jLXJlZ2lzdGVyLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC9ncmlkLWZpbHRlci9ncmlkLWZpbHRlci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhLWdyaWQvZ3JpZC1maWx0ZXIvZ3JpZC1maWx0ZXItc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL3N0b3Jlcy9kb2NzX3N0b3JlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIFJlZ2lzdGVyID0gcmVxdWlyZSgnLi4vZnJvbnRlbmQvZG9jcy9kb2MtcmVnaXN0ZXIvZG9jLXJlZ2lzdGVyLmpzeCcpO1xuXG4vLyDQtNCw0L3QvdGL0LUg0LTQu9GPINGF0YDQsNC90LjQu9C40YnQsFxuLy9sb2NhbFN0b3JhZ2VbJ2RvY3NTdG9yZSddID0gc3RvcmVEYXRhO1xuc3RvcmVEYXRhID0gSlNPTi5wYXJzZShzdG9yZURhdGEpO1xuXG5SZWFjdERPTS5yZW5kZXIoUmVhY3QuY3JlYXRlRWxlbWVudChSZWdpc3RlciwgeyBpZDogJ2dyaWQnLCBjb21wb25lbnRzOiBzdG9yZURhdGEgfSwgJ9Ci0YPRgiDQsdGD0LTRg9GCINC60L7QvNC/0L7QvdC10L3RgtGLJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkJykpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XHJcbi8vINCz0YDRg9C30LjQvCDQutC+0LzQv9C+0L3QtdC90YLRi1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIERhdGFHcmlkID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL2RhdGEtZ3JpZC9kYXRhLWdyaWQuanN4JyksXHJcbiAgICBCdG5BZGQgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1hZGQvYnV0dG9uLXJlZ2lzdGVyLWFkZC5qc3gnKSxcclxuICAgIEJ0bkVkaXQgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeCcpLFxyXG4gICAgQnRuRGVsZXRlID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZGVsZXRlL2J1dHRvbi1yZWdpc3Rlci1kZWxldGUuanN4JyksXHJcbiAgICBCdG5QcmludCA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXByaW50L2J1dHRvbi1yZWdpc3Rlci1wcmludC5qc3gnKSxcclxuICAgIEJ0bkZpbHRlciA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWZpbHRlci9idXR0b24tcmVnaXN0ZXItZmlsdGVyLmpzeCcpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbFBhZ2UuanN4JyksXHJcbiAgICBNb2RhbFBhZ2VEZWxldGUgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1kZWxldGUvbW9kYWxQYWdlLWRlbGV0ZS5qc3gnKSxcclxuICAgIE1vZGFsUGFnZUluZm8gPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1pbmZvL21vZGFsUGFnZS1pbmZvLmpzeCcpLFxyXG4gICAgRGF0YUxpc3QgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvZGF0YWxpc3QvZGF0YWxpc3QuanN4JyksXHJcbiAgICBTaWRlYmFyID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci5qc3gnKSxcclxuICAgIFRvb2xiYXJDb250YWluZXIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci1jb250YWluZXIvdG9vbGJhci1jb250YWluZXIuanN4JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2RvYy1yZWdpc3Rlci1zdHlsZXMnKSxcclxuICAgIEdyaWRGaWx0ZXIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvZGF0YS1ncmlkL2dyaWQtZmlsdGVyL2dyaWQtZmlsdGVyLmpzeCcpO1xyXG5cclxuXHJcbi8vIENyZWF0ZSBhIHN0b3JlXHJcbmNvbnN0IGRvY3NTdG9yZSA9IHJlcXVpcmUoJy4vLi4vLi4vc3RvcmVzL2RvY3Nfc3RvcmUuanMnKTtcclxuXHJcbi8vINGB0L7Qt9C00LDQtdC8INC60LvQsNGB0YEgLSDQtNC10YDQttCw0YLQtdC70Ywg0YHQvtGB0YLQvtGP0L3QuNC5XHJcbnZhciBfX19fQ2xhc3MxPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3MxX19fX0tleSBpbiBfX19fQ2xhc3MxKXtpZihfX19fQ2xhc3MxLmhhc093blByb3BlcnR5KF9fX19DbGFzczFfX19fS2V5KSl7UmVnaXN0ZXJbX19fX0NsYXNzMV9fX19LZXldPV9fX19DbGFzczFbX19fX0NsYXNzMV9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3MxPV9fX19DbGFzczE9PT1udWxsP251bGw6X19fX0NsYXNzMS5wcm90b3R5cGU7UmVnaXN0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczEpO1JlZ2lzdGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1SZWdpc3RlcjtSZWdpc3Rlci5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3MxO1xyXG4gICAgZnVuY3Rpb24gUmVnaXN0ZXIocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3MxLmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJEYXRhID0gW10gLy8g0LzQsNGB0YHQuNCyINC+0LHRitC10LrRgtC+0LIsINC60YPQtNCwINC30LDQv9C40YjQtdC8INC/0LDRgNCw0LzQtdGC0YDRiyDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40LggQHRvZG8g0LLRi9C90LXRgdGC0Lgg0LLRgdC1INCyINC+0YLQtNC10LvRjNC90YvQuSDQutC+0LzQv9C+0L3QtdGCINC00LvRjyDRhNC40LvRjNGC0YDQsNGG0LjQuFxyXG5cclxuICAgICAgICB0aGlzLmJ0bkFkZENsaWNrID0gdGhpcy5idG5BZGRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuRWRpdENsaWNrID0gdGhpcy5idG5FZGl0Q2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmJ0bkRlbGV0ZUNsaWNrID0gdGhpcy5idG5EZWxldGVDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuUHJpbnRDbGljayA9IHRoaXMuYnRuUHJpbnRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuRmlsdGVyQ2xpY2sgPSB0aGlzLmJ0bkZpbHRlckNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbFBhZ2VCdG5DbGljayA9IHRoaXMubW9kYWxQYWdlQnRuQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm1vZGFsUGFnZURlbEJ0bkNsaWNrID0gdGhpcy5tb2RhbFBhZ2VEZWxCdG5DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmRibENsaWNrSGFuZGxlciA9IHRoaXMuZGJsQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJDbGlja0hhbmRsZXIgPSB0aGlzLmhlYWRlckNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICAvLyDRgyDQutCw0LbQtNC+0LPQviDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdCy0L7QuSDQvtCx0YrQtdC60YJcclxuICAgICAgICAgICAgY29tcG9uZW50czogdGhpcy5wcm9wcy5jb21wb25lbnRzLFxyXG4gICAgICAgICAgICBnZXRGaWx0ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBnZXREZWxldGVNb2RhbFBhZ2U6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93U3lzdGVtTWVzc2FnZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFjdGl2Um93SWQ6IDAsXHJcbiAgICAgICAgICAgIGZpbHRlclN0cmluZzogbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcImNvbXBvbmVudERpZE1vdW50XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSDQtNCw0L3QvdGFXHJcbiAgICAgICAgZG9jc1N0b3JlLm9uKCdjaGFuZ2U6ZGF0YScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSAge1xyXG4gICAgICAgICAgICAvLyDQtNCw0L3QvdGL0LUg0LjQt9C80LXQvdC40LvQuNGB0YwsINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Y29tcG9uZW50czogZG9jc1N0b3JlLmRhdGF9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1INGB0YLRgNC+0LrQuCDQs9GA0LjQtNCwXHJcbiAgICAgICAgZG9jc1N0b3JlLm9uKCdjaGFuZ2U6ZG9jc0dyaWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2FjdGl2Um93SWQ6IGRvY3NTdG9yZS5kb2NzR3JpZH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0YHQuNGB0YLQtdC80L3Ri9C5INC40LfQstC10YnQtdC90LjQtVxyXG4gICAgICAgIGRvY3NTdG9yZS5vbignY2hhbmdlOnN5c3RlbU1lc3NhZ2UnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgIGxldCBzeXN0ZW1NZXNzYWdlU3RhdHVzID0gbmV3VmFsdWUgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3Nob3dTeXN0ZW1NZXNzYWdlOiBzeXN0ZW1NZXNzYWdlU3RhdHVzfSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g0L/QvtC60LDQttC10Lwg0LTQsNC90L3Ri9C1XHJcblxyXG4vLyAgICAgICAgbGV0IGxhc3RDb21wb25lbnQgPSBsb2NhbFN0b3JhZ2VbJ2RvY3NMaXN0J107XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIHRoaXMucHJvcHMuY29tcG9uZW50cyk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjb21wb25lbnRsaXN0ID0gdGhpcy5maW5kQ29tcG9uZW50KCdkb2NzTGlzdCcpLFxyXG4gICAgICAgICAgICBsaXN0VmFsdWUgPSBjb21wb25lbnRsaXN0WzBdLnZhbHVlIHx8ICcnLFxyXG4gICAgICAgICAgICBkYXRhTGlzdCA9IGNvbXBvbmVudGxpc3RbMF0uZGF0YSB8fCBbXSxcclxuICAgICAgICAgICAgcHJlcGFpcmVkR3JpZERhdGEgPSB0aGlzLmZpbmRDb21wb25lbnQoJ2RvY3NHcmlkJykgfHwgW10sXHJcbiAgICAgICAgICAgIGdyaWRDb25maWcgPSBbXSxcclxuICAgICAgICAgICAgZ3JpZERhdGEgPSBbXSxcclxuICAgICAgICAgICAgc3lzdGVtTWVzc2FnZSA9IGRvY3NTdG9yZS5zeXN0ZW1NZXNzYWdlLFxyXG4gICAgICAgICAgICB0b29sYmFyUGFyYW1zID0gdGhpcy5wcmVwYXJlUGFyYW1zRm9yVG9vbGJhcigpLCAvL9C/0LDRgNCw0LzQtdGC0YDRiyDQtNC70Y8g0LrQvdC+0L/QvtC6INGD0L/RgNCw0LLQu9C10L3QuNGPLCDQstC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDQsNC60YLQuNCy0L3QvtC5INGB0YLRgNC+0LrQuFxyXG4gICAgICAgICAgICBmaWx0ZXJEYXRhID0gdGhpcy5nZXRGaWx0ZXJGaWVsZHMoKSxcclxuICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gdGhpcy5nZXRGaWx0ZXJTdHJpbmcoKTtcclxuXHJcbiAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LjQvCDQvdCw0LvQuNGH0LjQtSDQtNCw0L3QvdGL0YUsINC10YHQu9C4INC10YHRgtGMINC/0YDQvtC/0LjRhdC90LXQvCDQutC+0LzQv9C+0L3QtdC90YLQsNC8XHJcbiAgICAgICAgaWYgKHByZXBhaXJlZEdyaWREYXRhLmxlbmd0aCA+IDAgJiYgcHJlcGFpcmVkR3JpZERhdGFbMF0uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGdyaWRDb25maWcgPSBwcmVwYWlyZWRHcmlkRGF0YVswXS5kYXRhWzBdLmNvbHVtbnM7XHJcbiAgICAgICAgICAgIGdyaWREYXRhID0gcHJlcGFpcmVkR3JpZERhdGFbMF0uZGF0YVswXS5kYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3JlZjogXCJwYXJlbnREaXZcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJGaWx0ZXI6IFwiLCBmaWx0ZXJTdHJpbmcpLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3JlZjogXCJkb2NDb250YWluZXJcIiwgc3R5bGU6IHN0eWxlcy5jb250YWluZXJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXJDb250YWluZXIsIHtyZWY6IFwidG9vbGJhckNvbnRhaW5lclwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ0bkFkZCwge29uQ2xpY2s6IHRoaXMuYnRuQWRkQ2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0bkFkZCddLnNob3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlOiB0b29sYmFyUGFyYW1zWydidG5BZGQnXS5kaXNhYmxlZH0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuRWRpdCwge29uQ2xpY2s6IHRoaXMuYnRuRWRpdENsaWNrLCBzaG93OiB0b29sYmFyUGFyYW1zWydidG5FZGl0J10uc2hvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlOiB0b29sYmFyUGFyYW1zWydidG5FZGl0J10uZGlzYWJsZWR9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ0bkRlbGV0ZSwge29uQ2xpY2s6IHRoaXMuYnRuRGVsZXRlQ2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0bkRlbGV0ZSddLnNob3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlOiB0b29sYmFyUGFyYW1zWydidG5EZWxldGUnXS5kaXNhYmxlZH0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuUHJpbnQsIHtvbkNsaWNrOiB0aGlzLmJ0blByaW50Q2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0blByaW50J10uc2hvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZTogdG9vbGJhclBhcmFtc1snYnRuUHJpbnQnXS5kaXNhYmxlZH0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuRmlsdGVyLCB7b25DbGljazogdGhpcy5idG5GaWx0ZXJDbGlja30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy53cmFwcGVyfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2lkZWJhciwge3dpZHRoOiBcIjMwJVwiLCB0b29sYmFyOiB0cnVlLCByZWY6IFwibGlzdC1zaWRlYmFyXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YUxpc3QsIHtyZWY6IFwiZGF0YUxpc3RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YUxpc3QsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9jc0xpc3RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGFGaWVsZDogXCJrb29kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBsaXN0VmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2tBY3Rpb246IHRoaXMuY2xpY2tIYW5kbGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZUFjdGlvbjogXCJkb2NzTGlzdENoYW5nZVwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlYmFyLCB7dG9vbGJhcjogZmFsc2UsIHJlZjogXCJncmlkLXNpZGViYXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YUdyaWQsIHtyZWY6IFwiZGF0YUdyaWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWREYXRhOiBncmlkRGF0YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zOiBncmlkQ29uZmlnLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2VBY3Rpb246IFwiZG9jc0dyaWRDaGFuZ2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuY2xpY2tIYW5kbGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EYmxDbGljazogdGhpcy5kYmxDbGlja0hhbmRsZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkhlYWRlckNsaWNrOiB0aGlzLmhlYWRlckNsaWNrSGFuZGxlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcmVwYWlyZWRHcmlkRGF0YVswXS5sYXN0RG9jSWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiYXBpXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2UsIHtyZWY6IFwibW9kYWxwYWdlRmlsdGVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VCdG5DbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZU5hbWU6IFwiRmlsdGVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0aGlzLnN0YXRlLmdldEZpbHRlcn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEdyaWRGaWx0ZXIsIHtyZWY6IFwiZ3JpZEZpbHRlclwiLCBncmlkQ29uZmlnOiBncmlkQ29uZmlnLCBkYXRhOiBmaWx0ZXJEYXRhfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZURlbGV0ZSwge3JlZjogXCJtb2RhbHBhZ2VEZWxldGVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZURlbEJ0bkNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdGhpcy5zdGF0ZS5nZXREZWxldGVNb2RhbFBhZ2V9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2VJbmZvLCB7cmVmOiBcIm1vZGFscGFnZUluZm9cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUluZm9CdG5DbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRoaXMuc3RhdGUuc2hvd1N5c3RlbU1lc3NhZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeXN0ZW1NZXNzYWdlOiBzeXN0ZW1NZXNzYWdlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwiZmluZENvbXBvbmVudFwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGNvbXBvbmVudE5hbWUpIHtcclxuICAgICAgICAvLyDQstC10YDQvdC10YIg0LTQsNC90L3Ri9C1INC60L7QvNC/0L7QvdC10L3RgtCwINC/0L4g0LXQs9C+INC90LDQt9Cy0LDQvdC40Y5cclxuICAgICAgICBsZXQgY29tcG9uZW50cyA9IHRoaXMuc3RhdGUuY29tcG9uZW50cyxcclxuICAgICAgICAgICAgY29tcG9uZW50RGF0YSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoY29tcG9uZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGEgPSBjb21wb25lbnRzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSA9PSBjb21wb25lbnROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50RGF0YTtcclxuXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcImJ0bkZpbHRlckNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oICkge1xyXG4gICAgICAgIC8vINC+0YLQutGA0L7QtdGCINC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QviDRgSDQv9C+0LvRj9C80Lgg0LTQu9GPINGE0LjQu9GM0YLRgNCw0YbQuNC4XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z2V0RmlsdGVyOiB0cnVlfSlcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwiYnRuRGVsZXRlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtnZXREZWxldGVNb2RhbFBhZ2U6IHRydWV9KVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3Rlci5wcm90b3R5cGUsXCJidG5BZGRDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC60LvQuNC6INC60L3QvtC/0LrQuCBcItCU0L7QsdCw0LLQuNGC0YxcIlxyXG4gICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdBZGQnKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwiYnRuRWRpdENsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0LrQu9C40Log0LrQvdC+0L/QutC4IFwi0JjQt9C80LXQvdC40YLRjFwiXHJcbiAgICAgICAgLy8g0LLRi9C30L7QstC10Lwg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGE0LvQsNC60YHQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ0VkaXQnKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwiYnRuUHJpbnRDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC60LvQuNC6INC60L3QvtC/0LrQuCBcItCY0LfQvNC10L3QuNGC0YxcIlxyXG4gICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdQcmludCcpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3Rlci5wcm90b3R5cGUsXCJjbGlja0hhbmRsZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihhY3Rpb24sIGlkKSB7XHJcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcclxuICAgICAgICBpZiAoYWN0aW9uICYmIGlkKSB7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oYWN0aW9uLCBpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3Rlci5wcm90b3R5cGUsXCJkYmxDbGlja0hhbmRsZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQstGL0LfQvtCy0LXRgiDQvNC10YLQvtC0INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdFZGl0Jyk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcImhlYWRlckNsaWNrSGFuZGxlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKHNvcnRCeSkge1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ3NvcnRCeUNoYW5nZScsIHNvcnRCeSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcIm1vZGFsUGFnZUJ0bkNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oYnRuRXZlbnQpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQtNC70Y8g0LrQvdC+0L/QutC4INGE0LjQu9GM0YLRgNCw0YbQuNC4XHJcbiAgICAgICAgbGV0IGZpbHRlclN0cmluZyA9ICcnO1xyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIC8vINGB0L7QsdC40YDQsNC10Lwg0LTQsNC90L3Ri9C1XHJcbiAgICAgICAgICAgIGxldCBncmlkRmlsdGVyID0gdGhpcy5yZWZzWydncmlkRmlsdGVyJ10sXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJEYXRhID0gZ3JpZEZpbHRlci5zdGF0ZS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhID0gZmlsdGVyRGF0YS5tYXAoZnVuY3Rpb24ocm93KSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIChmaWx0ZXJTdHJpbmcubGVuZ3RoID4gMCA/IFwiIGFuZCBcIiA6IFwiIHdoZXJlIFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJvdy50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgaWxpa2UgJyVcIiArIHJvdy52YWx1ZSArIFwiJSdcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgcm93LnJlZnMgKyBcIiBpbGlrZSAnXCIgKyByb3cudmFsdWUgKyBcIiUnXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSBmaWx0ZXJTdHJpbmcgKyByb3cucmVmcyArIFwiID0gJ1wiICsgcm93LnZhbHVlICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgPSBcIiArIHJvdy52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnRlZ2VyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgPSBcIiArIHJvdy52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgICAgICAvLyDQv9GA0LjQvNC10L3QtdC8INGE0LjQu9GM0YLRgFxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzcWxXaGVyZUNoYW5nZScsIGZpbHRlclN0cmluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dldEZpbHRlcjogZmFsc2V9KVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3Rlci5wcm90b3R5cGUsXCJtb2RhbFBhZ2VEZWxCdG5DbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGJ0bkV2ZW50KSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LLRi9C30L7QstCwINC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwINGD0LTQsNC70LXQvdC40Y9cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtnZXREZWxldGVNb2RhbFBhZ2U6IGZhbHNlfSk7XHJcblxyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignRGVsZXRlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwibW9kYWxQYWdlSW5mb0J0bkNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INCy0YvQt9C+0LLQsCDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsCDRgdC40YHRgtC10LzQvdC+0LPQviDRgdC+0L7QsdGJ0LXQvdC40Y9cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93U3lzdGVtTWVzc2FnZTogZmFsc2V9KTtcclxuICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignc3lzdGVtTWVzc2FnZUNoYW5nZScsIG51bGwpO1xyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwiZ2V0RmlsdGVyRmllbGRzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0YHQvtC30LTQsNGB0YIg0LjQtyDQv9C+0Lt00Lkg0LPRgNC40LTQsCDQutC+0LzQv9C+0L3QtdC90YLRiyDQtNC70Y8g0YTQvtGA0LzQuNGA0L7QstCw0L3QuNGPINGD0YHQu9C+0LLQuNC5INGE0LjQu9GM0YLRgNCw0YbQuNC4XHJcbiAgICAgICAgbGV0IGdyaWRDb21wb25lbnRzID0gZG9jc1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIGdyaWREYXRhID0gW10sXHJcbiAgICAgICAgICAgIHByZXZpb3NGaWx0ZXIgPSB0aGlzLmZpbHRlckRhdGEsXHJcbiAgICAgICAgICAgIGZpbHRlckZpZWxkcztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkQ29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZ3JpZENvbXBvbmVudHNbaV1bJ25hbWUnXSA9PSAnZG9jc0dyaWQnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQuNGJ0LXQvCDQv9C+0LvQtSBjb2x1bW5zXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZCBpbiBncmlkQ29tcG9uZW50c1tpXS5kYXRhWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkID09ICdjb2x1bW5zJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkRGF0YSA9IGdyaWRDb21wb25lbnRzW2ldLmRhdGFbMF0uY29sdW1ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChncmlkRGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEgPSBbXTsgLy8g0L7QsdC90YPQu9C40Lwg0LzQsNGB0YHQuNCyXHJcbiAgICAgICAgICAgIGZpbHRlckZpZWxkcyA9XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YS5tYXAoZnVuY3Rpb24ocm93LCBpbmRleCkgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50VHlwZSA9ICd0ZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50T2JqZWt0VmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJldmlvc0ZpbHRlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQuNGJ0LXQvCBcItGB0YLQsNGA0L7QtVwiINC30L3QsNGH0LXQvdC40LUg0YTQuNC70YzRgtGA0LAg0Lgg0LXRgdC70Lgg0LXRgdGC0YwsINGC0L4g0L7RgtC00LDQtdC8INC10LPQviB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvc0ZpbHRlcltpXS5yZWZzID09IHJvdy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50T2JqZWt0VmFsdWUgPSBwcmV2aW9zRmlsdGVyW2ldLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlID0gcm93LnR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LHQtdGA0LXQvCDQvNCw0YHRgdC40LIg0L7QsdGK0LXQutGC0L7QslxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcm93Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBjb21wb25lbnRPYmpla3RWYWx1ZSB8fCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBjb21wb25lbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZzOiByb3cuaWRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vINC+0LHQvdC+0LLQuNC8INGB0YLRgNC+0LrRgyDRhNC40LvRjNGC0YDQsNGG0LjQuFxyXG4gICAgICAgIHRoaXMuZ2V0RmlsdGVyU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyRGF0YTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwiZ2V0RmlsdGVyU3RyaW5nXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L/RgNC10L7QsdGA0LDQt9GD0LXRgiDQtNCw0L3QvdGL0LUg0YTQuNC70YLRgNCwINCyINGB0YLRgNC+0LrRg1xyXG4gICAgICAgIGxldCBzdHJpbmcgPSAnJztcclxuXHJcbiAgICAgICAgdGhpcy5maWx0ZXJEYXRhLm1hcChmdW5jdGlvbihyb3cpICB7XHJcbiAgICAgICAgICAgIGlmIChyb3cudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZyArIHJvdy5uYW1lICsgJzonICsgcm93LnZhbHVlICsgJzsgJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzdHJpbmc7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcInByZXBhcmVQYXJhbXNGb3JUb29sYmFyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0YfQuNGC0LDQtdC8INC00LDQvdC90YvQtSDRgdC+INGB0YLQvtGA0LAsINGE0L7RgNC80LjRgNGD0LXQvCDQv9Cw0YDQsNC80LXRgtGA0Ysg0LTQu9GPINC60L3QvtC/0L7QuiDRg9C/0YDQsNCy0LvQtdC90LjRjywg0Lgg0YLRg9C00LAg0LjRhSDQvtGC0LTQsNC10LxcclxuLy9kb2NzR3JpZENoYW5nZSAoZmx1eC5zdG9yZXMuZG9jc1N0b3JlLilcclxuICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZmluZENvbXBvbmVudCgnZG9jc0dyaWQnKSB8fCBbXSxcclxuICAgICAgICAgICAgbGFzdFJvd0lkID0gdGhpcy5zdGF0ZS5hY3RpdlJvd0lkLFxyXG4gICAgICAgICAgICBkYXRhID0gW10sXHJcbiAgICAgICAgICAgIGRhdGFSb3cgPSBbXSxcclxuICAgICAgICAgICAgdG9vbGJhclBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGJ0bkFkZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYnRuRWRpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYnRuRGVsZXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBidG5QcmludDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4vLyDQv9GA0L7QstC10YDQuNC8INC90LDQu9C40YfQuNC1INC00LDQvdC90YvRhSwg0LXRgdC70Lgg0LXRgdGC0Ywg0L/RgNC+0L/QuNGF0L3QtdC8INC60L7QvNC/0L7QvdC10L3RgtCw0LxcclxuXHJcbiAgICAgICAgaWYgKGdyaWQubGVuZ3RoID4gMCAmJiBncmlkWzBdLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBkYXRhID0gZ3JpZFswXS5kYXRhWzBdLmRhdGE7XHJcbiAgICAgICAgICAgIGRhdGFSb3cgPSBkYXRhLmZpbHRlcihmdW5jdGlvbihyb3cpICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocm93LmlkID09PSBsYXN0Um93SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdG9vbGJhclBhcmFtcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhUm93Lmxlbmd0aCA+IDAgJiYgZGF0YVJvd1swXS5zdGF0dXMgPT0gJ9Cf0YDQvtCy0LXQtNC10L0nKSB7XHJcbiAgICAgICAgICAgIC8vINGD0LTQsNC70Y/RgtGMINC90LXQu9GM0LfRj1xyXG4gICAgICAgICAgICB0b29sYmFyUGFyYW1zLmJ0bkRlbGV0ZS5zaG93ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b29sYmFyUGFyYW1zO1xyXG5cclxuICAgIH19KTtcclxuXHJcblxyXG5cclxuUmVnaXN0ZXIuUHJvcFR5cGVzID0ge1xyXG4gICAgY29tcG9uZW50czogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVnaXN0ZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2NzL2RvYy1yZWdpc3Rlci9kb2MtcmVnaXN0ZXIuanN4XG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyksXHJcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXHJcbiAgICBJQ09OID0gJ2ZpbHRlcic7XHJcblxyXG5cclxudmFyIF9fX19DbGFzc3I9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc3JfX19fS2V5IGluIF9fX19DbGFzc3Ipe2lmKF9fX19DbGFzc3IuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzcl9fX19LZXkpKXtCdXR0b25SZWdpc3RlckZpbHRlcltfX19fQ2xhc3NyX19fX0tleV09X19fX0NsYXNzcltfX19fQ2xhc3NyX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3I9X19fX0NsYXNzcj09PW51bGw/bnVsbDpfX19fQ2xhc3NyLnByb3RvdHlwZTtCdXR0b25SZWdpc3RlckZpbHRlci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzcik7QnV0dG9uUmVnaXN0ZXJGaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPUJ1dHRvblJlZ2lzdGVyRmlsdGVyO0J1dHRvblJlZ2lzdGVyRmlsdGVyLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc3I7XHJcbi8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcclxuICAgIGZ1bmN0aW9uIEJ1dHRvblJlZ2lzdGVyRmlsdGVyKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzci5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlckZpbHRlci5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyRmlsdGVyLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge1xyXG4gICAgICAgICAgICByZWY6IFwiYnRuRmlsdGVyXCIsIFxyXG4gICAgICAgICAgICB2YWx1ZTogXCJGaWx0ZXJcIiwgXHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdywgXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24oZSkgIHtyZXR1cm4gdGhpcy5oYW5kbGVDbGljayhlKTt9LmJpbmQodGhpcyl9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VcIiwgc3JjOiBzdHlsZXMuaWNvbnNbSUNPTl19KVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuXHJcbjtcclxuXHJcbkJ1dHRvblJlZ2lzdGVyRmlsdGVyLnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufVxyXG5cclxuXHJcbkJ1dHRvblJlZ2lzdGVyRmlsdGVyLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHNob3c6IHRydWVcclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25SZWdpc3RlckZpbHRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1maWx0ZXIvYnV0dG9uLXJlZ2lzdGVyLWZpbHRlci5qc3hcbi8vIG1vZHVsZSBpZCA9IDcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi4vbW9kYWxQYWdlLmpzeCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi4vbW9kYWxwYWdlLWRlbGV0ZS9tb2RhbHBhZ2UtZGVsZXRlLXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzc2w9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc2xfX19fS2V5IGluIF9fX19DbGFzc2wpe2lmKF9fX19DbGFzc2wuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzbF9fX19LZXkpKXtNb2RhbFBhZ2VEZWxldGVbX19fX0NsYXNzbF9fX19LZXldPV9fX19DbGFzc2xbX19fX0NsYXNzbF9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NsPV9fX19DbGFzc2w9PT1udWxsP251bGw6X19fX0NsYXNzbC5wcm90b3R5cGU7TW9kYWxQYWdlRGVsZXRlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NsKTtNb2RhbFBhZ2VEZWxldGUucHJvdG90eXBlLmNvbnN0cnVjdG9yPU1vZGFsUGFnZURlbGV0ZTtNb2RhbFBhZ2VEZWxldGUuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzbDtcclxuICAgIGZ1bmN0aW9uIE1vZGFsUGFnZURlbGV0ZShwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc2wuY2FsbCh0aGlzLHByb3BzKVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvd1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTW9kYWxQYWdlRGVsZXRlLnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93OiBuZXh0UHJvcHMuc2hvd30pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb2RhbFBhZ2VEZWxldGUucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IG1vZGFsT2JqZWN0cyA9IFsnYnRuT2snLCAnYnRuQ2FuY2VsJ107XHJcblxyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge3JlZjogXCJtb2RhbFBhZ2VcIiwgXHJcbiAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLnByb3BzLm1vZGFsUGFnZUJ0bkNsaWNrLCBcclxuICAgICAgICAgICAgc2hvdzogdGhpcy5zdGF0ZS5zaG93LCBcclxuICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJEZWxldGUgZG9jdW1lbnRcIn0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtyZWY6IFwiY29udGFpbmVyXCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWFnZVwiLCB7cmVmOiBcImltYWdlXCIsIHNyYzogc3R5bGVzLmljb259KSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7cmVmOiBcIm1lc3NhZ2VcIn0sIFwiINCj0LTQsNC70LjRgtGMINC00L7QutGD0LzQtdC90YIgPyBcIilcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuXHJcblxyXG5Nb2RhbFBhZ2VEZWxldGUucHJvcFR5cGVzID0ge1xyXG4gICAgbW9kYWxQYWdlQnRuQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFBhZ2VEZWxldGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2UtZGVsZXRlL21vZGFsUGFnZS1kZWxldGUuanN4XG4vLyBtb2R1bGUgaWQgPSA3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGljb246ICdpbWFnZXMvaWNvbnMvZGVsZXRlLnBuZydcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2UtZGVsZXRlL21vZGFscGFnZS1kZWxldGUtc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4uL21vZGFsUGFnZS5qc3gnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL21vZGFscGFnZS1pbmZvL21vZGFscGFnZS1pbmZvLXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzc209UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc21fX19fS2V5IGluIF9fX19DbGFzc20pe2lmKF9fX19DbGFzc20uaGFzT3duUHJvcGVydHkoX19fX0NsYXNzbV9fX19LZXkpKXtNb2RhbFBhZ2VJbmZvW19fX19DbGFzc21fX19fS2V5XT1fX19fQ2xhc3NtW19fX19DbGFzc21fX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzbT1fX19fQ2xhc3NtPT09bnVsbD9udWxsOl9fX19DbGFzc20ucHJvdG90eXBlO01vZGFsUGFnZUluZm8ucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc20pO01vZGFsUGFnZUluZm8ucHJvdG90eXBlLmNvbnN0cnVjdG9yPU1vZGFsUGFnZUluZm87TW9kYWxQYWdlSW5mby5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NtO1xyXG4gICAgZnVuY3Rpb24gTW9kYWxQYWdlSW5mbyhwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc20uY2FsbCh0aGlzLHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnNob3dcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb2RhbFBhZ2VJbmZvLnByb3RvdHlwZSxcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93OiBuZXh0UHJvcHMuc2hvd30pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb2RhbFBhZ2VJbmZvLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgc3lzdGVtTWVzc2FnZSA9IHRoaXMucHJvcHMuc3lzdGVtTWVzc2FnZSA/IHRoaXMucHJvcHMuc3lzdGVtTWVzc2FnZSA6ICcnLFxyXG4gICAgICAgICAgICBtb2RhbE9iamVjdHMgPSBbJ2J0bk9rJ107XHJcblxyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge3JlZjogXCJtb2RhbFBhZ2VcIiwgXHJcbiAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLnByb3BzLm1vZGFsUGFnZUJ0bkNsaWNrLCBcclxuICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJXYXJuaW5nIVwiLCBcclxuICAgICAgICAgICAgbW9kYWxPYmplY3RzOiBtb2RhbE9iamVjdHN9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7cmVmOiBcImNvbnRhaW5lclwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIiwge3JlZjogXCJpbWFnZVwiLCBzcmM6IHN0eWxlcy5pY29ufSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCIgXCIsIHN5c3RlbU1lc3NhZ2UsIFwiIFwiKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG5cclxuXHJcbk1vZGFsUGFnZUluZm8ucHJvcFR5cGVzID0ge1xyXG4gICAgc3lzdGVtTWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsUGFnZUluZm87XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWluZm8vbW9kYWxQYWdlLWluZm8uanN4XG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGljb246ICdpbWFnZXMvaWNvbnMvaW5mby5wbmcnXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWluZm8vbW9kYWxwYWdlLWluZm8tc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2RhdGFsaXN0LXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzc249UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc25fX19fS2V5IGluIF9fX19DbGFzc24pe2lmKF9fX19DbGFzc24uaGFzT3duUHJvcGVydHkoX19fX0NsYXNzbl9fX19LZXkpKXtEYXRhTGlzdFtfX19fQ2xhc3NuX19fX0tleV09X19fX0NsYXNzbltfX19fQ2xhc3NuX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc249X19fX0NsYXNzbj09PW51bGw/bnVsbDpfX19fQ2xhc3NuLnByb3RvdHlwZTtEYXRhTGlzdC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzbik7RGF0YUxpc3QucHJvdG90eXBlLmNvbnN0cnVjdG9yPURhdGFMaXN0O0RhdGFMaXN0Ll9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc247XHJcbiAgICBmdW5jdGlvbiBEYXRhTGlzdChwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc24uY2FsbCh0aGlzLHByb3BzKTtcclxuXHJcbiAgICAgICAgbGV0IGlkeCA9IDA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vIHdlIGdvdCB2YWx1ZSwgd2Ugc2hvdWxkIGZpbmQgaW5kZXggYW5kIGluaXRpbGl6ZSBpZHggZmllbGRcclxuICAgICAgICAgICAgcHJvcHMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHJvdywgaW5kZXgpICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocm93W3Byb3BzLmJpbmREYXRhRmllbGRdID09PSBwcm9wcy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvdW5kXHJcbiAgICAgICAgICAgICAgICAgICAgaWR4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZGF0YTogcHJvcHMuZGF0YSxcclxuICAgICAgICAgICAgaW5kZXg6IGlkeCxcclxuICAgICAgICAgICAgdmFsdWU6IHByb3BzLnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhhbmRsZUxpQ2xpY2sgPSB0aGlzLmhhbmRsZUxpQ2xpY2suYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGF0YUxpc3QucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnByb3BzLmRhdGEsXHJcbiAgICAgICAgICAgIGNsaWNrZWRJdGVtID0gdGhpcy5zdGF0ZS5pbmRleDtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7cmVmOiBcImRhdGFsaXN0XCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7cmVmOiBcImRhdGFsaXN0LXVsXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuZG9jTGlzdCwgY2xpY2tlZEl0ZW0gPT0gaW5kZXggPyBzdHlsZXMuZm9jdXNlZCA6IHt9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRJZCA9ICdsaS0nICsgaW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwge2tleTogY29tcG9uZW50SWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IGNvbXBvbmVudElkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVMaUNsaWNrLmJpbmQodGhpcywgaW5kZXgpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHN0eWxlfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcylcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGF0YUxpc3QucHJvdG90eXBlLFwiaGFuZGxlTGlDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGlkeCkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YVtpZHhdW3RoaXMucHJvcHMuYmluZERhdGFGaWVsZF07XHJcbiAgICAgICAgLy/RgdGC0LDQstC40Lwg0LzQtdGC0LrRg1xyXG4gICAgICAgIC8vINGB0L7RhdGA0LDQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGluZGV4OiBpZHgsXHJcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrQWN0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vQHRvZG8g0LjQt9Cx0LDQstC40YLRjNGB0Y8g0L7RgiBjaGFuZ2VcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrQWN0aW9uKHRoaXMucHJvcHMubmFtZSArICdDaGFuZ2UnLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfX0pO1xyXG5cclxuXHJcblxyXG5EYXRhTGlzdC5wcm9wVHlwZXMgPSB7XHJcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5hcnJheVxyXG59O1xyXG5cclxuRGF0YUxpc3QuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGF0YTogW3tcclxuICAgICAgICBpZDogMCxcclxuICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICBrb29kOiAnJ1xyXG4gICAgfV0sXHJcbiAgICB2YWx1ZTogbnVsbCxcclxuICAgIGJpbmREYXRhRmllbGQ6ICdpZCdcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXRhTGlzdDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGFsaXN0L2RhdGFsaXN0LmpzeFxuLy8gbW9kdWxlIGlkID0gNzdcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkb2NMaXN0OiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgcGFkZGluZzogJzVweCcsXG4gICAgICAgIG1hcmdpblJpZ2h0OiAnMjBweCdcbiAgICB9LFxuICAgIGZvY3VzZWQ6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnbGlnaHRibHVlJ1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGFsaXN0L2RhdGFsaXN0LXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNzhcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3Qgc2lkZUJhclN0eWxlcyA9IHJlcXVpcmUoJy4vc2lkZWJhci1zdHlsZXMnKSxcclxuICAgIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcblxyXG52YXIgX19fX0NsYXNzbz1SZWFjdC5Db21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NvX19fX0tleSBpbiBfX19fQ2xhc3NvKXtpZihfX19fQ2xhc3NvLmhhc093blByb3BlcnR5KF9fX19DbGFzc29fX19fS2V5KSl7U2lkZUJhckNvbnRhaW5lcltfX19fQ2xhc3NvX19fX0tleV09X19fX0NsYXNzb1tfX19fQ2xhc3NvX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc289X19fX0NsYXNzbz09PW51bGw/bnVsbDpfX19fQ2xhc3NvLnByb3RvdHlwZTtTaWRlQmFyQ29udGFpbmVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NvKTtTaWRlQmFyQ29udGFpbmVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1TaWRlQmFyQ29udGFpbmVyO1NpZGVCYXJDb250YWluZXIuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzbztcclxuICAgIGZ1bmN0aW9uIFNpZGVCYXJDb250YWluZXIocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3NvLmNhbGwodGhpcyxwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBwcm9wcy53aWR0aCxcclxuICAgICAgICAgICAgY29udGVudFdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2xCYXI6IHByb3BzLnRvb2xiYXJcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmJ0bkNsaWNrSGFuZGxlciA9IHRoaXMuYnRuQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNpZGVCYXJDb250YWluZXIucHJvdG90eXBlLFwiYnRuQ2xpY2tIYW5kbGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5zdGF0ZS5zaG93ID8gJzIwcHgnIDogdGhpcy5wcm9wcy53aWR0aCxcclxuICAgICAgICAgICAgY29udGVudFdpZHRoID0gdGhpcy5zdGF0ZS5zaG93ID8gJzFweCcgOiAnMTAwJScsXHJcbiAgICAgICAgICAgIHNob3dDb250ZW50ID0gIXRoaXMuc3RhdGUuc2hvdztcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgY29udGVudFdpZHRoOiBjb250ZW50V2lkdGgsXHJcbiAgICAgICAgICAgIHNob3c6IHNob3dDb250ZW50XHJcbiAgICAgICAgfSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNpZGVCYXJDb250YWluZXIucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHRvb2xCYXJTeW1ib2wgPSB0aGlzLnN0YXRlLnNob3cgPyAnPCcgOiAnPic7IC8vdG9kbyBtb3ZlIHRvIHN0eWxlcyBmaWxlXHJcblxyXG4gICAgICAgIC8vcHJlcGFpcmUgc3R5bGVzXHJcbiAgICAgICAgbGV0IHNpZGVCYXJDb250YWluZXJTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHNpZGVCYXJTdHlsZXMuc2lkZUJhckNvbnRhaW5lclN0eWxlLCB7d2lkdGg6IHRoaXMuc3RhdGUud2lkdGh9KSxcclxuICAgICAgICAgICAgdG9vbEJhclN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSxzaWRlQmFyU3R5bGVzLnRvb2xCYXJTdHlsZSwge3Zpc2liaWxpdHk6IHRoaXMucHJvcHMudG9vbGJhciA/ICd2aXNpYmxlJzogJ2hpZGRlbid9KSxcclxuICAgICAgICAgICAgY29udGVudFN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSxzaWRlQmFyU3R5bGVzLmNvbnRlbnRTdHlsZSwge3Zpc2liaWxpdHk6IHRoaXMuc3RhdGUuc2hvdyA/ICd2aXNpYmxlJzogJ2hpZGRlbid9KSxcclxuICAgICAgICAgICAgYnV0dG9uU3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LHNpZGVCYXJTdHlsZXMuYnV0dG9uU3R5bGUsIHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy50b29sYmFyID8gc2lkZUJhclN0eWxlcy5idXR0b25TdHlsZS5oZWlnaHQ6ICcwJyxcclxuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IHRoaXMucHJvcHMudG9vbGJhciA/ICd2aXNpYmxlJzogJ2hpZGRlbidcclxuICAgICAgICB9IClcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwidG9vbEJhckNvbnRhaW5lclwiLCBzdHlsZTogc2lkZUJhckNvbnRhaW5lclN0eWxlLCByZWY6IFwidG9vbGJhclwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJidG5CYXJcIiwgc3R5bGU6IHRvb2xCYXJTdHlsZX0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJidXR0b25cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzaWRlYmFyLWJ1dHRvblwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGJ1dHRvblN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRvb2xCYXJTeW1ib2wsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmJ0bkNsaWNrSGFuZGxlcn1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcImNvbnRlbnRcIiwgc3R5bGU6IGNvbnRlbnRTdHlsZSwgcmVmOiBcImNvbnRlbnRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuXHJcblxyXG5TaWRlQmFyQ29udGFpbmVyLnByb3BUeXBlcyA9IHtcclxuICAgIHRvb2xiYXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcclxufTtcclxuXHJcblNpZGVCYXJDb250YWluZXIuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdG9vbGJhcjogdHJ1ZSxcclxuICAgIHdpZHRoOiAnMTAwJSdcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2lkZUJhckNvbnRhaW5lcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzeFxuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzaWRlQmFyQ29udGFpbmVyU3R5bGU6IHtcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgaGVpZ2h0OiAnNDAwcHgnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgcmVkJyxcbiAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJ1xuICAgIH0sXG5cbiAgICB0b29sQmFyU3R5bGU6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgYmFja2dyb3VuZDogJ2dyYXknLFxuICAgICAgICB2aXNpYmlsaXR5OiAndmlzaWJsZSdcbiAgICB9LFxuICAgIGNvbnRlbnRTdHlsZToge1xuICAgICAgICBoZWlnaHQ6ICdpbmhlcml0JyxcbiAgICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgIH0sXG5cbiAgICBidXR0b25TdHlsZToge1xuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgaGVpZ2h0OiAnMjBweCcsXG4gICAgICAgIHdpZHRoOiAnMjBweCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXItc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnRhaW5lcjoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhGbG93OiAncm93IHdyYXAnLFxuICAgICAgICBoZWlnaHQ6ICc4NyUnLFxuICAgICAgICBib3JkZXI6ICczcHggc29saWQgYnJvd24nXG4gICAgfSxcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIGZsZXg6ICcxIDEwMCUnLFxuICAgICAgICBhbGlnbkl0ZW1zOiAnc3RyZXRjaCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnXG4gICAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2RvY3MvZG9jLXJlZ2lzdGVyL2RvYy1yZWdpc3Rlci1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vZ3JpZC1maWx0ZXItc3R5bGVzJyk7XHJcblxyXG5cclxudmFyIF9fX19DbGFzc3A9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc3BfX19fS2V5IGluIF9fX19DbGFzc3Ape2lmKF9fX19DbGFzc3AuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzcF9fX19LZXkpKXtHcmlkRmlsdGVyW19fX19DbGFzc3BfX19fS2V5XT1fX19fQ2xhc3NwW19fX19DbGFzc3BfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzcD1fX19fQ2xhc3NwPT09bnVsbD9udWxsOl9fX19DbGFzc3AucHJvdG90eXBlO0dyaWRGaWx0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3ApO0dyaWRGaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPUdyaWRGaWx0ZXI7R3JpZEZpbHRlci5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NwO1xyXG4gICAgZnVuY3Rpb24gR3JpZEZpbHRlcihwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc3AuY2FsbCh0aGlzLHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZ3JpZENvbmZpZzogdGhpcy5wcm9wcy5ncmlkQ29uZmlnLCAvLyBncmlkIGNvbmZpZ1xyXG4gICAgICAgICAgICBkYXRhOiB0aGlzLnByb3BzLmRhdGEgLy8gZmlsdGVyIGRhdGFcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKSAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdyaWRGaWx0ZXIucHJvdG90eXBlLFwiaGFuZGxlQ2hhbmdlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlLFxyXG4gICAgICAgICAgICBpZCA9IGUudGFyZ2V0Lm5hbWUsXHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnN0YXRlLmRhdGEsXHJcbiAgICAgICAgICAgIGluZGV4O1xyXG5cclxuICAgICAgICAvLyDQvdCw0LTQviDQvdCw0LnRgtC4INGN0LvQtdC80LXQvdGCINC80LDRgdGB0LjQstCwINGBINC00LDQvdC90YvQvNC4INC00LvRjyDRjdGC0L7Qs9C+INC60L7QvNC/0L7QvdC10L3RgtCwXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhW2ldLnJlZnMgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGRhdGFbaW5kZXhdLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IGRhdGF9KTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdyaWRGaWx0ZXIucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRDb25maWc6IG5leHRQcm9wcy5ncmlkQ29uZmlnLCBkYXRhOiBuZXh0UHJvcHMuZGF0YX0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHcmlkRmlsdGVyLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINGB0L7Qt9C00LDRgdGCINC40Lcg0L/QvtC70LXQuSDQs9GA0LjQtNCwINC60L7QvNC/0L7QvdC10L3RgtGLINC00LvRjyDRhNC+0YDQvNC40YDQvtCy0LDQvdC40Y8g0YPRgdC70L7QstC40Lkg0YTQuNC70YzRgtGA0LDRhtC40LhcclxuICAgICAgICBsZXQgZ3JpZENvbmZpZyA9IHRoaXMuc3RhdGUuZ3JpZENvbmZpZyxcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuc3RhdGUuZGF0YTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZmllbGRzZXR9LCBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBncmlkQ29uZmlnLm1hcChmdW5jdGlvbihyb3csIGluZGV4KSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnRUeXBlID0gcm93LnR5cGU/IHJvdy50eXBlOiAndGV4dCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZm9ybVdpZGdldCwga2V5OiAnZmllbGRTZXQtJyArIHJvdy5pZH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmZvcm1XaWRnZXRMYWJlbH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgcm93Lm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmZvcm1XaWRnZXRJbnB1dH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtzdHlsZTogc3R5bGVzLmlucHV0LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBjb21wb25lbnRUeXBlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcm93Lm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJvdy5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHJvdy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IHJvdy5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZGF0YVtyb3cuaWRdLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZGF0YVtyb3cuaWRdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcblxyXG5cclxuR3JpZEZpbHRlci5wcm9wVHlwZXMgPSB7XHJcbiAgICBncmlkQ29uZmlnOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR3JpZEZpbHRlcjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC9ncmlkLWZpbHRlci9ncmlkLWZpbHRlci5qc3hcbi8vIG1vZHVsZSBpZCA9IDgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybVdpZGdldDoge1xuICAgICAgICBtYXJnaW5Cb3R0b206ICc1cHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnXG4gICAgfSxcbiAgICBmb3JtV2lkZ2V0TGFiZWw6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcbiAgICAgICAgd2lkdGg6ICc0MCUnLFxuICAgICAgICBtYXJnaW5SaWdodDogJzEwcHgnXG4gICAgfSxcbiAgICBmb3JtV2lkZ2V0SW5wdXQ6IHtcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgcGFkZGluZzogJzNweCcsXG4gICAgICAgIGJvcmRlcjogJzBweCdcbiAgICB9LFxuXG4gICAgaW5wdXQ6IHtcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgcGFkZGluZzogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG5cbiAgICB9LFxuXG4gICAgZmllbGRTZXQ6IHtcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgbWFyZ2luOiAnMTBweCdcbiAgICB9LFxuXG4gICAgdWk6IHtcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgcGFkZGluZzogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG5cbiAgICB9XG5cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC9ncmlkLWZpbHRlci9ncmlkLWZpbHRlci1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcbiAgICBPUkRFUl9CWSA9IFt7IGNvbHVtbjogJ2lkJywgZGlyZWN0aW9uOiAnZGVzYycgfV07XG5cbnZhciBkb2NzU3RvcmUgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgICBpZDogJ2RvY3NTdG9yZScsXG4gICAgaW5pdGlhbFN0YXRlOiB7XG4gICAgICAgIGRvY3NHcmlkOiAwLFxuICAgICAgICBkb2NzTGlzdDogJycsXG4gICAgICAgIG5hbWU6ICd2bGFkJyxcbiAgICAgICAgZGF0YTogW10sXG4gICAgICAgIHNvcnRCeTogT1JERVJfQlksXG4gICAgICAgIHNxbFdoZXJlOiAnJyxcbiAgICAgICAgc3lzdGVtTWVzc2FnZTogbnVsbFxuICAgIH0sXG4gICAgYWN0aW9uQ2FsbGJhY2tzOiB7XG4gICAgICAgIHN5c3RlbU1lc3NhZ2VDaGFuZ2U6IGZ1bmN0aW9uIHN5c3RlbU1lc3NhZ2VDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgc3lzdGVtTWVzc2FnZTogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNxbFdoZXJlQ2hhbmdlOiBmdW5jdGlvbiBzcWxXaGVyZUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBzcWxXaGVyZTogdmFsdWUgfSk7XG4gICAgICAgICAgICByZXF1ZXJ5KHsgbmFtZTogJ2RvY3NHcmlkJywgdmFsdWU6IHRoaXMuZG9jc0xpc3QgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNvcnRCeUNoYW5nZTogZnVuY3Rpb24gc29ydEJ5Q2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHNvcnRCeTogdmFsdWUgfSk7XG4gICAgICAgICAgICByZXF1ZXJ5KHsgbmFtZTogJ2RvY3NHcmlkJywgdmFsdWU6IHRoaXMuZG9jc0xpc3QsIHNvcnRCeTogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIEFkZDogZnVuY3Rpb24gQWRkKHVwZGF0ZXIpIHtcbiAgICAgICAgICAgIGFkZCh0aGlzLmRvY3NMaXN0KTtcbiAgICAgICAgfSxcbiAgICAgICAgRWRpdDogZnVuY3Rpb24gRWRpdCh1cGRhdGVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kb2NzTGlzdCAmJiB0aGlzLmRvY3NHcmlkKSB7XG4gICAgICAgICAgICAgICAgZWRpdCh0aGlzLmRvY3NMaXN0LCB0aGlzLmRvY3NHcmlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign0KLQuNC/INC00L7QutGD0LzQtdC90YLQsCDQuNC70Lgg0LTQvtC60YPQvNC10L3RgiDQvdC1INCy0YvQsdGA0LDQvScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBEZWxldGU6IGZ1bmN0aW9uIERlbGV0ZSh1cGRhdGVyKSB7XG4gICAgICAgICAgICB2YXIgZG9jVHlwZUlkID0gdGhpcy5kb2NzTGlzdDtcbiAgICAgICAgICAgIHJlcXVlcnlGb3JBY3Rpb24oJ2RlbGV0ZScsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3N5c3RlbU1lc3NhZ2VDaGFuZ2UnLCBlcnIpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzeXN0ZW1NZXNzYWdlQ2hhbmdlJywgbnVsbCk7IC8vINC/0LjRiNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyINGF0YDQsNC90LjQu9C40YnQtVxuICAgICAgICAgICAgICAgICAgICByZXF1ZXJ5KHsgbmFtZTogJ2RvY3NHcmlkJywgdmFsdWU6IGRvY1R5cGVJZCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgUHJpbnQ6IGZ1bmN0aW9uIFByaW50KHVwZGF0ZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdidXR0b24gUHJpbnQgY2xpa2VkIScpO1xuICAgICAgICB9LFxuICAgICAgICBjaGFuZ2VOYW1lOiBmdW5jdGlvbiBjaGFuZ2VOYW1lKHVwZGF0ZXIsIG5hbWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBuYW1lOiBuYW1lIH0pO1xuICAgICAgICB9LFxuICAgICAgICBkb2NzR3JpZENoYW5nZTogZnVuY3Rpb24gZG9jc0dyaWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RvY3NHcmlkQ2hhbmdlJywgdmFsdWUpO1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkb2NzR3JpZDogdmFsdWUgfSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VbJ2RvY3NHcmlkJ10gPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZG9jc0xpc3RDaGFuZ2U6IGZ1bmN0aW9uIGRvY3NMaXN0Q2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIHZhciBsYXN0VmFsdWUgPSBmbHV4LnN0b3Jlcy5kb2NzU3RvcmUuZG9jc0xpc3QgfHwgJ0RPSyc7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IGxhc3RWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZG9jc0xpc3Q6IHZhbHVlIH0pO1xuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NvcnRCeUNoYW5nZScsIE9SREVSX0JZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbG9jYWxTdG9yYWdlWydkb2NzTGlzdCddID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFDaGFuZ2U6IGZ1bmN0aW9uIGRhdGFDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhQ2hhbmdlOicsIHZhbHVlKTtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZGF0YTogdmFsdWUgfSk7XG4gICAgICAgIH1cblxuICAgIH1cbn0pO1xuXG52YXIgZWRpdCA9IGZ1bmN0aW9uIGVkaXQoZG9jVHlwZUlkLCBkb2NJZCkge1xuICAgIHZhciB1cmwgPSBcIi9kb2N1bWVudC9cIiArIGRvY1R5cGVJZCArIGRvY0lkO1xuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG59O1xuXG52YXIgYWRkID0gZnVuY3Rpb24gYWRkKGRvY1R5cGVJZCkge1xuICAgIHZhciB1cmwgPSBcIi9kb2N1bWVudC9cIiArIGRvY1R5cGVJZCArICcwJztcbiAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xufTtcblxudmFyIHJlcXVlcnlGb3JBY3Rpb24gPSBmdW5jdGlvbiByZXF1ZXJ5Rm9yQWN0aW9uKGFjdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIXdpbmRvdy5qUXVlcnkgfHwgISQpIHJldHVybjsgLy8g0LTQu9GPINGC0LXRgdGC0L7QslxuXG4gICAgLy8g0LzQtdGC0L7QtCDQvtCx0LXRgdC/0LXRh9C40YIg0LfQsNC/0YDQvtGBINC90LAg0LLRi9C/0L7Qu9C90LXQvdC40LVcbiAgICB2YXIgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgZG9jSWQ6IGRvY3NTdG9yZS5kb2NzR3JpZCxcbiAgICAgICAgZG9jX3R5cGVfaWQ6IGRvY3NTdG9yZS5kb2NzTGlzdFxuICAgIH07XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2RvYycsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBhcmFtZXRlcnMpXG4gICAgICAgIH0sXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgICAgICAvLyDQtNC+0LvQttC90Ysg0L/QvtC70YPRh9C40YLRjCDQvtCx0YrQtdC60YIgLSDRgNC10LfRg9C70YzRgtCw0YJcbiAgICAgICAgICAgIHZhciBlcnJvck1lc3NzYWdlID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCA9PSAnRXJyb3InKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzc2FnZSA9ICdFcnJvciwgJyArIGRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yTWVzc3NhZ2UsIGRhdGEpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignL2Vycm9yJywgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIG51bGwpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG52YXIgcmVxdWVyeSA9IGZ1bmN0aW9uIHJlcXVlcnkoY29tcG9uZW50KSB7XG4gICAgaWYgKCF3aW5kb3cualF1ZXJ5KSByZXR1cm47IC8vINC00LvRjyDRgtC10YHRgtC+0LJcblxuICAgIC8vINC80LXRgtC+0LQg0L7QsdC10YHQv9C10YfQuNGCINC/0L7Qu9GD0YfQtdC90LjQtSDQtNCw0L3QvdGL0YUg0L7RgiDRgdC10YDQstC10YDQsFxuICAgIC8vIGNvbXBvbmVudCA9IHRoaXMuc3RhdGUuY29tcG9uZW50c1tuYW1lXVxuICAgIC8vINC10YHQu9C4INC/0LDRgNCw0LzQtdGC0YDRiyDQvdC1INC30LDQtNCw0L3Riywg0LPRgNGD0LfQuNC8INCy0YHQtVxuXG4gICAgdmFyIGNvbXBvbmVudHMgPSBkb2NzU3RvcmUuZGF0YTtcblxuICAgIC8vINGE0LjQu9GM0YLRgNGD0LXQvCDRgdC/0LjRgdC+0Log0LrQvtC80L/QvtC90LXQvdGC0L7QslxuICAgIHZhciBjb21wb25lbnRzRm9yVXBkYXRlID0gY29tcG9uZW50cy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgLy8g0LjRidC10Lwg0L7QsdGK0LXQutGCINC/0L4g0L3QsNC40LzQtdC90L7QstCw0L3QuNGOLiDQuNC70Lgg0LLQtdGA0L3QtdC8INCy0YHQtSDQtdGB0LvQuCDQv9Cw0YDQsNC80LXRgtGAINC90LUg0LfQsNC00LDQvVxuICAgICAgICAvLyAgICAgICBjb25zb2xlLmxvZygnY29tcG9uZW50OicgKyBKU09OLnN0cmluZ2lmeShjb21wb25lbnQpKTtcbiAgICAgICAgaWYgKGNvbXBvbmVudC5uYW1lID09ICcnIHx8IGl0ZW0ubmFtZSA9PSBjb21wb25lbnQubmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8g0YHQvtGA0YLQuNGA0L7QstC60LBcbiAgICB2YXIgc3FsU29ydEJ5ID0gJycsXG4gICAgICAgIHNxbFdoZXJlID0gZG9jc1N0b3JlLnNxbFdoZXJlIHx8ICcnLFxuICAgICAgICBzb3J0QnlBcnJheSA9IGRvY3NTdG9yZS5zb3J0QnksXG4gICAgICAgIGFyclR5cGUgPSB0eXBlb2Ygc29ydEJ5QXJyYXkgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHNvcnRCeUFycmF5KTtcblxuICAgIGlmIChkb2NzU3RvcmUuc29ydEJ5KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc29ydEJ5QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIHNxbFNvcnRCeSA9IHNxbFNvcnRCeSArICcsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNxbFNvcnRCeSA9IHNxbFNvcnRCeSArIHNvcnRCeUFycmF5W2ldLmNvbHVtbiArICcgJyArIHNvcnRCeUFycmF5W2ldLmRpcmVjdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBVUkwgPSAnL2FwaS9kb2NzJztcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFVSTCxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG5cbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZGF0YVR5cGU6ICdjb21wb25lbnQnLFxuICAgICAgICAgICAgZG9jVHlwZUlkOiAxLFxuICAgICAgICAgICAgY29tcG9uZW50czogSlNPTi5zdHJpbmdpZnkoY29tcG9uZW50c0ZvclVwZGF0ZSksIC8vINC60L7QvNC/0L7QvdC10L3RgtGLINC00LvRjyDQvtCx0L3QvtCy0LvQtdC90LjRj1xuICAgICAgICAgICAgcGFyYW1ldGVyOiBjb21wb25lbnQudmFsdWUsIC8vINC/0LDRgNCw0LzQtdGC0YDRi1xuICAgICAgICAgICAgc29ydEJ5OiBzcWxTb3J0QnksIC8vINGB0L7RgNGC0LjRgNC+0LLQutCwXG4gICAgICAgICAgICBsYXN0RG9jSWQ6IGRvY3NTdG9yZS5kb2NzR3JpZCxcbiAgICAgICAgICAgIHNxbFdoZXJlOiBzcWxXaGVyZSB9LFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAvLyDQtNC+0LvQttC90Ysg0L/QvtC70YPRh9C40YLRjCDQvtCx0YrQtdC60YJcbiAgICAgICAgICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygncGFyZW50IGFycml2ZWQgZGF0YTonICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkgKyAn0YLQuNC/OicgKyB0eXBlb2YgZGF0YSk7XG5cbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIC8vIGZpbmQgaXRlbVxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3BhcmVudCBJdGVtOicgKyBKU09OLnN0cmluZ2lmeShpdGVtKSApO1xuICAgICAgICAgICAgICAgIC8vINC+0LHQvdC+0LLQuNC8INC00LDQvdC90YvQtSDQvNCw0YHRgdC40LLQsCDQutC+0LzQv9C+0L3QtdC90YLQvtCyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50cyA9IGNvbXBvbmVudHMubWFwKGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5uYW1lID09IGl0ZW0ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5kYXRhID0gaXRlbS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0b3JlIGRhdGEgdXBkYXRlOicgKyBKU09OLnN0cmluZ2lmeShjb21wb25lbnRzKSk7XG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgY29tcG9uZW50cyk7XG4gICAgICAgIH0uYmluZCh1bmRlZmluZWQpLFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJy9lcnJvcicsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgICB9LmJpbmQodW5kZWZpbmVkKVxuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkb2NzU3RvcmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9zdG9yZXMvZG9jc19zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gODRcbi8vIG1vZHVsZSBjaHVua3MgPSAyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==
var docs =
webpackJsonp_name_([3],{

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
	    BtnAdd = __webpack_require__(43),
	    BtnEdit = __webpack_require__(46),
	    BtnDelete = __webpack_require__(47),
	    BtnPrint = __webpack_require__(56),
	    BtnFilter = __webpack_require__(72),
	    BtnStart = __webpack_require__(105),
	    ModalPage = __webpack_require__(61),
	    ModalPageDelete = __webpack_require__(73),
	    ModalPageInfo = __webpack_require__(75),
	//    DataList = require('./../../components/datalist/datalist.jsx'),
	    TreeList = __webpack_require__(77),
	    Sidebar = __webpack_require__(79),
	    ToolbarContainer = __webpack_require__(51),
	    styles = __webpack_require__(81),
	    GridFilter = __webpack_require__(82);


	// Create a store
	const docsStore = __webpack_require__(84);

	// создаем класс - держатель состояний
	var ____ClassJ=React.PureComponent;for(var ____ClassJ____Key in ____ClassJ){if(____ClassJ.hasOwnProperty(____ClassJ____Key)){Register[____ClassJ____Key]=____ClassJ[____ClassJ____Key];}}var ____SuperProtoOf____ClassJ=____ClassJ===null?null:____ClassJ.prototype;Register.prototype=Object.create(____SuperProtoOf____ClassJ);Register.prototype.constructor=Register;Register.__superConstructor__=____ClassJ;
	    function Register(props) {
	        ____ClassJ.call(this,props);
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
	        const self = this;

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
	                React.createElement(ToolbarContainer, {ref: "toolbar-menu", position: "left"}, 
	                    React.createElement(BtnStart, null)
	                ), 

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
	                            React.createElement(TreeList, {ref: "treeList", 
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
	    Button = __webpack_require__(45),
	    ICON = 'filter';


	var ____Classy=React.PureComponent;for(var ____Classy____Key in ____Classy){if(____Classy.hasOwnProperty(____Classy____Key)){ButtonRegisterFilter[____Classy____Key]=____Classy[____Classy____Key];}}var ____SuperProtoOf____Classy=____Classy===null?null:____Classy.prototype;ButtonRegisterFilter.prototype=Object.create(____SuperProtoOf____Classy);ButtonRegisterFilter.prototype.constructor=ButtonRegisterFilter;ButtonRegisterFilter.__superConstructor__=____Classy;
	// кнопка создания документа в регистрах
	    function ButtonRegisterFilter(props) {
	        ____Classy.call(this,props);
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
	    ModalPage = __webpack_require__(61),
	    styles = __webpack_require__(74);

	var ____Classs=React.PureComponent;for(var ____Classs____Key in ____Classs){if(____Classs.hasOwnProperty(____Classs____Key)){ModalPageDelete[____Classs____Key]=____Classs[____Classs____Key];}}var ____SuperProtoOf____Classs=____Classs===null?null:____Classs.prototype;ModalPageDelete.prototype=Object.create(____SuperProtoOf____Classs);ModalPageDelete.prototype.constructor=ModalPageDelete;ModalPageDelete.__superConstructor__=____Classs;
	    function ModalPageDelete(props) {
	        ____Classs.call(this,props)
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
	    ModalPage = __webpack_require__(61),
	    styles = __webpack_require__(76);

	var ____Classt=React.PureComponent;for(var ____Classt____Key in ____Classt){if(____Classt.hasOwnProperty(____Classt____Key)){ModalPageInfo[____Classt____Key]=____Classt[____Classt____Key];}}var ____SuperProtoOf____Classt=____Classt===null?null:____Classt.prototype;ModalPageInfo.prototype=Object.create(____SuperProtoOf____Classt);ModalPageInfo.prototype.constructor=ModalPageInfo;ModalPageInfo.__superConstructor__=____Classt;
	    function ModalPageInfo(props) {
	        ____Classt.call(this,props);
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

	var ____Classv=React.PureComponent;for(var ____Classv____Key in ____Classv){if(____Classv.hasOwnProperty(____Classv____Key)){Tree[____Classv____Key]=____Classv[____Classv____Key];}}var ____SuperProtoOf____Classv=____Classv===null?null:____Classv.prototype;Tree.prototype=Object.create(____SuperProtoOf____Classv);Tree.prototype.constructor=Tree;Tree.__superConstructor__=____Classv;
	    function Tree(props) {
	        ____Classv.call(this,props);

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

	    Object.defineProperty(Tree.prototype,"render",{writable:true,configurable:true,value:function() {
	        return (
	            React.createElement("div", {ref: "tree"}, 
	                this.getTree('0')
	            )
	        )
	    }});

	    Object.defineProperty(Tree.prototype,"handleLiClick",{writable:true,configurable:true,value:function(selectedIndex, selectedId, isNode) {
	        if (!isNode && !isNaN(selectedId)) {
	            // не ноа, а документ
	            let data = this.props.data.filter(function(row, index)  {
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


	    }});

	    Object.defineProperty(Tree.prototype,"getChildren",{writable:true,configurable:true,value:function(parentId) {
	        let data = this.state.data;
	        return data.filter(function(row)  {
	            if (row.parentid == parentId) {
	                return row;
	            }
	        });
	    }});

	    Object.defineProperty(Tree.prototype,"getTree",{writable:true,configurable:true,value:function(parentId) {
	        let data = this.getChildren(parentId),
	            value = this.state.value;

	        return (React.createElement("ul", {style: styles.ul, ref: "tree-ul"}, 
	            data.map(function(subRow, index)  {
	                let style = Object.assign({}, styles.li, value == subRow[this.props.bindDataField] && !subRow.is_node ? styles.focused : {}),
	                    refId = 'li-' + index;

	                return (
	                    React.createElement("li", {style: style, 
	                        onClick: this.handleLiClick.bind(this, index, subRow.id, subRow.is_node), 
	                        key: refId, 
	                        ref: refId}, 
	                        subRow.name, " ", this.getTree(subRow.id)
	                    ))
	            }.bind(this))
	            

	        ))
	    }});



	Tree.propTypes = {
	    value: React.PropTypes.string,
	    data: React.PropTypes.array,
	    bindDataField: React.PropTypes.string.isRequired
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
	}

	module.exports = Tree;


/***/ },

/***/ 78:
/***/ function(module, exports) {

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

/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const sideBarStyles = __webpack_require__(80),
	    React = __webpack_require__(3);


	var ____Classu=React.Component;for(var ____Classu____Key in ____Classu){if(____Classu.hasOwnProperty(____Classu____Key)){SideBarContainer[____Classu____Key]=____Classu[____Classu____Key];}}var ____SuperProtoOf____Classu=____Classu===null?null:____Classu.prototype;SideBarContainer.prototype=Object.create(____SuperProtoOf____Classu);SideBarContainer.prototype.constructor=SideBarContainer;SideBarContainer.__superConstructor__=____Classu;
	    function SideBarContainer(props) {
	        ____Classu.call(this,props);

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


	var ____Classw=React.PureComponent;for(var ____Classw____Key in ____Classw){if(____Classw.hasOwnProperty(____Classw____Key)){GridFilter[____Classw____Key]=____Classw[____Classw____Key];}}var ____SuperProtoOf____Classw=____Classw===null?null:____Classw.prototype;GridFilter.prototype=Object.create(____SuperProtoOf____Classw);GridFilter.prototype.constructor=GridFilter;GridFilter.__superConstructor__=____Classw;
	    function GridFilter(props) {
	        ____Classw.call(this,props);

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

/***/ },

/***/ 105:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(3),
	    styles = __webpack_require__(44),
	    Button = __webpack_require__(45),
	    ICON = 'start';

	var ____ClassK=React.PureComponent;for(var ____ClassK____Key in ____ClassK){if(____ClassK.hasOwnProperty(____ClassK____Key)){ButtonRegisterStart[____ClassK____Key]=____ClassK[____ClassK____Key];}}var ____SuperProtoOf____ClassK=____ClassK===null?null:____ClassK.prototype;ButtonRegisterStart.prototype=Object.create(____SuperProtoOf____ClassK);ButtonRegisterStart.prototype.constructor=ButtonRegisterStart;ButtonRegisterStart.__superConstructor__=____ClassK;
	// кнопка создания документа в регистрах
	    function ButtonRegisterStart(props) {
	        ____ClassK.call(this,props);
	    }

	    Object.defineProperty(ButtonRegisterStart.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick('start');
	    }});

	    Object.defineProperty(ButtonRegisterStart.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            value: "", 
	            ref: "btnStart", 
	            style: styles.button, 
	            show: this.props.show, 
	            disabled: this.props.disabled, 
	            onClick: function(e)  {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterStart.propTypes = {
	    onClick: React.PropTypes.func.isRequired
	}


	ButtonRegisterStart.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterStart;

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvZG9jcy9kb2MtcmVnaXN0ZXIvZG9jLXJlZ2lzdGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZmlsdGVyL2J1dHRvbi1yZWdpc3Rlci1maWx0ZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1kZWxldGUvbW9kYWxQYWdlLWRlbGV0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWRlbGV0ZS9tb2RhbHBhZ2UtZGVsZXRlLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2UtaW5mby9tb2RhbFBhZ2UtaW5mby5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxwYWdlLWluZm8vbW9kYWxwYWdlLWluZm8tc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvdHJlZS90cmVlLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3RyZWUvdHJlZS1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kb2NzL2RvYy1yZWdpc3Rlci9kb2MtcmVnaXN0ZXItc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YS1ncmlkL2dyaWQtZmlsdGVyL2dyaWQtZmlsdGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC9ncmlkLWZpbHRlci9ncmlkLWZpbHRlci1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvc3RvcmVzL2RvY3Nfc3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXN0YXJ0L2J1dHRvbi1yZWdpc3Rlci1zdGFydC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVnaXN0ZXIgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9kb2NzL2RvYy1yZWdpc3Rlci9kb2MtcmVnaXN0ZXIuanN4Jyk7XG5cbi8vINC00LDQvdC90YvQtSDQtNC70Y8g0YXRgNCw0L3QuNC70LjRidCwXG4vL2xvY2FsU3RvcmFnZVsnZG9jc1N0b3JlJ10gPSBzdG9yZURhdGE7XG5zdG9yZURhdGEgPSBKU09OLnBhcnNlKHN0b3JlRGF0YSk7XG5cblJlYWN0RE9NLnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KFJlZ2lzdGVyLCB7IGlkOiAnZ3JpZCcsIGNvbXBvbmVudHM6IHN0b3JlRGF0YSB9LCAn0KLRg9GCINCx0YPQtNGD0YIg0LrQvtC80L/QvtC90LXQvdGC0YsnKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyaWQnKSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9kb2NzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcclxuLy8g0LPRgNGD0LfQuNC8INC60L7QvNC/0L7QvdC10L3RgtGLXHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgRGF0YUdyaWQgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvZGF0YS1ncmlkL2RhdGEtZ3JpZC5qc3gnKSxcclxuICAgIEJ0bkFkZCA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWFkZC9idXR0b24tcmVnaXN0ZXItYWRkLmpzeCcpLFxyXG4gICAgQnRuRWRpdCA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWVkaXQvYnV0dG9uLXJlZ2lzdGVyLWVkaXQuanN4JyksXHJcbiAgICBCdG5EZWxldGUgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1kZWxldGUvYnV0dG9uLXJlZ2lzdGVyLWRlbGV0ZS5qc3gnKSxcclxuICAgIEJ0blByaW50ID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItcHJpbnQvYnV0dG9uLXJlZ2lzdGVyLXByaW50LmpzeCcpLFxyXG4gICAgQnRuRmlsdGVyID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZmlsdGVyL2J1dHRvbi1yZWdpc3Rlci1maWx0ZXIuanN4JyksXHJcbiAgICBCdG5TdGFydCA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXN0YXJ0L2J1dHRvbi1yZWdpc3Rlci1zdGFydC5qc3gnKSxcclxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxQYWdlLmpzeCcpLFxyXG4gICAgTW9kYWxQYWdlRGVsZXRlID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2UtZGVsZXRlL21vZGFsUGFnZS1kZWxldGUuanN4JyksXHJcbiAgICBNb2RhbFBhZ2VJbmZvID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2UtaW5mby9tb2RhbFBhZ2UtaW5mby5qc3gnKSxcclxuLy8gICAgRGF0YUxpc3QgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvZGF0YWxpc3QvZGF0YWxpc3QuanN4JyksXHJcbiAgICBUcmVlTGlzdCA9IHJlcXVpcmUoJy4vLi4vLi4vY29tcG9uZW50cy90cmVlL3RyZWUuanN4JyksXHJcbiAgICBTaWRlYmFyID0gcmVxdWlyZSgnLi8uLi8uLi9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci5qc3gnKSxcclxuICAgIFRvb2xiYXJDb250YWluZXIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci1jb250YWluZXIvdG9vbGJhci1jb250YWluZXIuanN4JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2RvYy1yZWdpc3Rlci1zdHlsZXMnKSxcclxuICAgIEdyaWRGaWx0ZXIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbXBvbmVudHMvZGF0YS1ncmlkL2dyaWQtZmlsdGVyL2dyaWQtZmlsdGVyLmpzeCcpO1xyXG5cclxuXHJcbi8vIENyZWF0ZSBhIHN0b3JlXHJcbmNvbnN0IGRvY3NTdG9yZSA9IHJlcXVpcmUoJy4vLi4vLi4vc3RvcmVzL2RvY3Nfc3RvcmUuanMnKTtcclxuXHJcbi8vINGB0L7Qt9C00LDQtdC8INC60LvQsNGB0YEgLSDQtNC10YDQttCw0YLQtdC70Ywg0YHQvtGB0YLQvtGP0L3QuNC5XHJcbnZhciBfX19fQ2xhc3NKPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NKX19fX0tleSBpbiBfX19fQ2xhc3NKKXtpZihfX19fQ2xhc3NKLmhhc093blByb3BlcnR5KF9fX19DbGFzc0pfX19fS2V5KSl7UmVnaXN0ZXJbX19fX0NsYXNzSl9fX19LZXldPV9fX19DbGFzc0pbX19fX0NsYXNzSl9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NKPV9fX19DbGFzc0o9PT1udWxsP251bGw6X19fX0NsYXNzSi5wcm90b3R5cGU7UmVnaXN0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc0opO1JlZ2lzdGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1SZWdpc3RlcjtSZWdpc3Rlci5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NKO1xyXG4gICAgZnVuY3Rpb24gUmVnaXN0ZXIocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3NKLmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJEYXRhID0gW10gLy8g0LzQsNGB0YHQuNCyINC+0LHRitC10LrRgtC+0LIsINC60YPQtNCwINC30LDQv9C40YjQtdC8INC/0LDRgNCw0LzQtdGC0YDRiyDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40LggQHRvZG8g0LLRi9C90LXRgdGC0Lgg0LLRgdC1INCyINC+0YLQtNC10LvRjNC90YvQuSDQutC+0LzQv9C+0L3QtdGCINC00LvRjyDRhNC40LvRjNGC0YDQsNGG0LjQuFxyXG5cclxuICAgICAgICB0aGlzLmJ0bkFkZENsaWNrID0gdGhpcy5idG5BZGRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuRWRpdENsaWNrID0gdGhpcy5idG5FZGl0Q2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmJ0bkRlbGV0ZUNsaWNrID0gdGhpcy5idG5EZWxldGVDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuUHJpbnRDbGljayA9IHRoaXMuYnRuUHJpbnRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYnRuRmlsdGVyQ2xpY2sgPSB0aGlzLmJ0bkZpbHRlckNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbFBhZ2VCdG5DbGljayA9IHRoaXMubW9kYWxQYWdlQnRuQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm1vZGFsUGFnZURlbEJ0bkNsaWNrID0gdGhpcy5tb2RhbFBhZ2VEZWxCdG5DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmRibENsaWNrSGFuZGxlciA9IHRoaXMuZGJsQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJDbGlja0hhbmRsZXIgPSB0aGlzLmhlYWRlckNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICAvLyDRgyDQutCw0LbQtNC+0LPQviDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdCy0L7QuSDQvtCx0YrQtdC60YJcclxuICAgICAgICAgICAgY29tcG9uZW50czogdGhpcy5wcm9wcy5jb21wb25lbnRzLFxyXG4gICAgICAgICAgICBnZXRGaWx0ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBnZXREZWxldGVNb2RhbFBhZ2U6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93U3lzdGVtTWVzc2FnZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFjdGl2Um93SWQ6IDAsXHJcbiAgICAgICAgICAgIGZpbHRlclN0cmluZzogbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcImNvbXBvbmVudERpZE1vdW50XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1INC00LDQvdC90YVcclxuICAgICAgICBkb2NzU3RvcmUub24oJ2NoYW5nZTpkYXRhJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpICB7XHJcbiAgICAgICAgICAgIC8vINC00LDQvdC90YvQtSDQuNC30LzQtdC90LjQu9C40YHRjCwg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtjb21wb25lbnRzOiBkb2NzU3RvcmUuZGF0YX0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0YHRgtGA0L7QutC4INCz0YDQuNC00LBcclxuICAgICAgICBkb2NzU3RvcmUub24oJ2NoYW5nZTpkb2NzR3JpZCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDQtNCw0L3QvdGL0LUg0LjQt9C80LXQvdC40LvQuNGB0YwsINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7YWN0aXZSb3dJZDogZG9jc1N0b3JlLmRvY3NHcmlkfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDRgdC40YHRgtC10LzQvdGL0Lkg0LjQt9Cy0LXRidC10L3QuNC1XHJcbiAgICAgICAgZG9jc1N0b3JlLm9uKCdjaGFuZ2U6c3lzdGVtTWVzc2FnZScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDQtNCw0L3QvdGL0LUg0LjQt9C80LXQvdC40LvQuNGB0YwsINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICAgICAgbGV0IHN5c3RlbU1lc3NhZ2VTdGF0dXMgPSBuZXdWYWx1ZSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7c2hvd1N5c3RlbU1lc3NhZ2U6IHN5c3RlbU1lc3NhZ2VTdGF0dXN9KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDQv9C+0LrQsNC20LXQvCDQtNCw0L3QvdGL0LVcclxuXHJcbi8vICAgICAgICBsZXQgbGFzdENvbXBvbmVudCA9IGxvY2FsU3RvcmFnZVsnZG9jc0xpc3QnXTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgdGhpcy5wcm9wcy5jb21wb25lbnRzKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudGxpc3QgPSB0aGlzLmZpbmRDb21wb25lbnQoJ2RvY3NMaXN0JyksXHJcbiAgICAgICAgICAgIGxpc3RWYWx1ZSA9IGNvbXBvbmVudGxpc3RbMF0udmFsdWUgfHwgJycsXHJcbiAgICAgICAgICAgIGRhdGFMaXN0ID0gY29tcG9uZW50bGlzdFswXS5kYXRhIHx8IFtdLFxyXG4gICAgICAgICAgICBwcmVwYWlyZWRHcmlkRGF0YSA9IHRoaXMuZmluZENvbXBvbmVudCgnZG9jc0dyaWQnKSB8fCBbXSxcclxuICAgICAgICAgICAgZ3JpZENvbmZpZyA9IFtdLFxyXG4gICAgICAgICAgICBncmlkRGF0YSA9IFtdLFxyXG4gICAgICAgICAgICBzeXN0ZW1NZXNzYWdlID0gZG9jc1N0b3JlLnN5c3RlbU1lc3NhZ2UsXHJcbiAgICAgICAgICAgIHRvb2xiYXJQYXJhbXMgPSB0aGlzLnByZXBhcmVQYXJhbXNGb3JUb29sYmFyKCksIC8v0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDQutC90L7Qv9C+0Log0YPQv9GA0LDQstC70LXQvdC40Y8sINCy0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINCw0LrRgtC40LLQvdC+0Lkg0YHRgtGA0L7QutC4XHJcbiAgICAgICAgICAgIGZpbHRlckRhdGEgPSB0aGlzLmdldEZpbHRlckZpZWxkcygpLFxyXG4gICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSB0aGlzLmdldEZpbHRlclN0cmluZygpO1xyXG5cclxuICAgICAgICAvLyDQv9GA0L7QstC10YDQuNC8INC90LDQu9C40YfQuNC1INC00LDQvdC90YvRhSwg0LXRgdC70Lgg0LXRgdGC0Ywg0L/RgNC+0L/QuNGF0L3QtdC8INC60L7QvNC/0L7QvdC10L3RgtCw0LxcclxuICAgICAgICBpZiAocHJlcGFpcmVkR3JpZERhdGEubGVuZ3RoID4gMCAmJiBwcmVwYWlyZWRHcmlkRGF0YVswXS5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZ3JpZENvbmZpZyA9IHByZXBhaXJlZEdyaWREYXRhWzBdLmRhdGFbMF0uY29sdW1ucztcclxuICAgICAgICAgICAgZ3JpZERhdGEgPSBwcmVwYWlyZWRHcmlkRGF0YVswXS5kYXRhWzBdLmRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7cmVmOiBcInBhcmVudERpdlwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXJDb250YWluZXIsIHtyZWY6IFwidG9vbGJhci1tZW51XCIsIHBvc2l0aW9uOiBcImxlZnRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuU3RhcnQsIG51bGwpXHJcbiAgICAgICAgICAgICAgICApLCBcclxuXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkZpbHRlcjogXCIsIGZpbHRlclN0cmluZyksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7cmVmOiBcImRvY0NvbnRhaW5lclwiLCBzdHlsZTogc3R5bGVzLmNvbnRhaW5lcn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9vbGJhckNvbnRhaW5lciwge3JlZjogXCJ0b29sYmFyQ29udGFpbmVyXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuQWRkLCB7b25DbGljazogdGhpcy5idG5BZGRDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuQWRkJ10uc2hvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGU6IHRvb2xiYXJQYXJhbXNbJ2J0bkFkZCddLmRpc2FibGVkfSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5FZGl0LCB7b25DbGljazogdGhpcy5idG5FZGl0Q2xpY2ssIHNob3c6IHRvb2xiYXJQYXJhbXNbJ2J0bkVkaXQnXS5zaG93LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGU6IHRvb2xiYXJQYXJhbXNbJ2J0bkVkaXQnXS5kaXNhYmxlZH0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnRuRGVsZXRlLCB7b25DbGljazogdGhpcy5idG5EZWxldGVDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuRGVsZXRlJ10uc2hvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGU6IHRvb2xiYXJQYXJhbXNbJ2J0bkRlbGV0ZSddLmRpc2FibGVkfSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5QcmludCwge29uQ2xpY2s6IHRoaXMuYnRuUHJpbnRDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuUHJpbnQnXS5zaG93LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlOiB0b29sYmFyUGFyYW1zWydidG5QcmludCddLmRpc2FibGVkfSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5GaWx0ZXIsIHtvbkNsaWNrOiB0aGlzLmJ0bkZpbHRlckNsaWNrfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLndyYXBwZXJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlYmFyLCB7d2lkdGg6IFwiMzAlXCIsIHRvb2xiYXI6IHRydWUsIHJlZjogXCJsaXN0LXNpZGViYXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUcmVlTGlzdCwge3JlZjogXCJ0cmVlTGlzdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhTGlzdCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkb2NzTGlzdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRGF0YUZpZWxkOiBcImtvb2RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGxpc3RWYWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGlja0FjdGlvbjogdGhpcy5jbGlja0hhbmRsZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlQWN0aW9uOiBcImRvY3NMaXN0Q2hhbmdlXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNpZGViYXIsIHt0b29sYmFyOiBmYWxzZSwgcmVmOiBcImdyaWQtc2lkZWJhclwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhR3JpZCwge3JlZjogXCJkYXRhR3JpZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZERhdGE6IGdyaWREYXRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZENvbHVtbnM6IGdyaWRDb25maWcsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZUFjdGlvbjogXCJkb2NzR3JpZENoYW5nZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5jbGlja0hhbmRsZXIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRibENsaWNrOiB0aGlzLmRibENsaWNrSGFuZGxlciwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uSGVhZGVyQ2xpY2s6IHRoaXMuaGVhZGVyQ2xpY2tIYW5kbGVyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHByZXBhaXJlZEdyaWREYXRhWzBdLmxhc3REb2NJZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJhcGlcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge3JlZjogXCJtb2RhbHBhZ2VGaWx0ZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUJ0bkNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJGaWx0ZXJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRoaXMuc3RhdGUuZ2V0RmlsdGVyfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JpZEZpbHRlciwge3JlZjogXCJncmlkRmlsdGVyXCIsIGdyaWRDb25maWc6IGdyaWRDb25maWcsIGRhdGE6IGZpbHRlckRhdGF9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxQYWdlRGVsZXRlLCB7cmVmOiBcIm1vZGFscGFnZURlbGV0ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlRGVsQnRuQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0aGlzLnN0YXRlLmdldERlbGV0ZU1vZGFsUGFnZX0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZUluZm8sIHtyZWY6IFwibW9kYWxwYWdlSW5mb1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlSW5mb0J0bkNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdGhpcy5zdGF0ZS5zaG93U3lzdGVtTWVzc2FnZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5c3RlbU1lc3NhZ2U6IHN5c3RlbU1lc3NhZ2V9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3Rlci5wcm90b3R5cGUsXCJmaW5kQ29tcG9uZW50XCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oY29tcG9uZW50TmFtZSkge1xyXG4gICAgICAgIC8vINCy0LXRgNC90LXRgiDQtNCw0L3QvdGL0LUg0LrQvtC80L/QvtC90LXQvdGC0LAg0L/QviDQtdCz0L4g0L3QsNC30LLQsNC90LjRjlxyXG4gICAgICAgIGxldCBjb21wb25lbnRzID0gdGhpcy5zdGF0ZS5jb21wb25lbnRzLFxyXG4gICAgICAgICAgICBjb21wb25lbnREYXRhID0gW107XHJcblxyXG4gICAgICAgIGlmIChjb21wb25lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29tcG9uZW50RGF0YSA9IGNvbXBvbmVudHMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uYW1lID09IGNvbXBvbmVudE5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnREYXRhO1xyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwiYnRuRmlsdGVyQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbiggKSB7XHJcbiAgICAgICAgLy8g0L7RgtC60YDQvtC10YIg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+INGBINC/0L7Qu9GP0LzQuCDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40LhcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtnZXRGaWx0ZXI6IHRydWV9KVxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3Rlci5wcm90b3R5cGUsXCJidG5EZWxldGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dldERlbGV0ZU1vZGFsUGFnZTogdHJ1ZX0pXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcImJ0bkFkZENsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0LrQu9C40Log0LrQvdC+0L/QutC4IFwi0JTQvtCx0LDQstC40YLRjFwiXHJcbiAgICAgICAgLy8g0LLRi9C30L7QstC10Lwg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGE0LvQsNC60YHQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ0FkZCcpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3Rlci5wcm90b3R5cGUsXCJidG5FZGl0Q2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQutC70LjQuiDQutC90L7Qv9C60LggXCLQmNC30LzQtdC90LjRgtGMXCJcclxuICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignRWRpdCcpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3Rlci5wcm90b3R5cGUsXCJidG5QcmludENsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0LrQu9C40Log0LrQvdC+0L/QutC4IFwi0JjQt9C80LXQvdC40YLRjFwiXHJcbiAgICAgICAgLy8g0LLRi9C30L7QstC10Lwg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGE0LvQsNC60YHQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ1ByaW50Jyk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcImNsaWNrSGFuZGxlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGFjdGlvbiwgaWQpIHtcclxuICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgIGlmIChhY3Rpb24gJiYgaWQpIHtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbihhY3Rpb24sIGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcImRibENsaWNrSGFuZGxlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINCy0YvQt9C+0LLQtdGCINC80LXRgtC+0LQg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ0VkaXQnKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwiaGVhZGVyQ2xpY2tIYW5kbGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oc29ydEJ5KSB7XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignc29ydEJ5Q2hhbmdlJywgc29ydEJ5KTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwibW9kYWxQYWdlQnRuQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihidG5FdmVudCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQutC90L7Qv9C60Lgg0YTQuNC70YzRgtGA0LDRhtC40LhcclxuICAgICAgICBsZXQgZmlsdGVyU3RyaW5nID0gJyc7XHJcbiAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcclxuICAgICAgICAgICAgLy8g0YHQvtCx0LjRgNCw0LXQvCDQtNCw0L3QvdGL0LVcclxuICAgICAgICAgICAgbGV0IGdyaWRGaWx0ZXIgPSB0aGlzLnJlZnNbJ2dyaWRGaWx0ZXInXSxcclxuICAgICAgICAgICAgICAgIGZpbHRlckRhdGEgPSBncmlkRmlsdGVyLnN0YXRlLmRhdGE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEgPSBmaWx0ZXJEYXRhLm1hcChmdW5jdGlvbihyb3cpICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocm93LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgKGZpbHRlclN0cmluZy5sZW5ndGggPiAwID8gXCIgYW5kIFwiIDogXCIgd2hlcmUgXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocm93LnR5cGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgcm93LnJlZnMgKyBcIiBpbGlrZSAnJVwiICsgcm93LnZhbHVlICsgXCIlJ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSBmaWx0ZXJTdHJpbmcgKyByb3cucmVmcyArIFwiIGlsaWtlICdcIiArIHJvdy52YWx1ZSArIFwiJSdcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgPSAnXCIgKyByb3cudmFsdWUgKyBcIidcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgcm93LnJlZnMgKyBcIiA9IFwiICsgcm93LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ludGVnZXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgcm93LnJlZnMgKyBcIiA9IFwiICsgcm93LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvdztcclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIC8vINC/0YDQuNC80LXQvdC10Lwg0YTQuNC70YzRgtGAXHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NxbFdoZXJlQ2hhbmdlJywgZmlsdGVyU3RyaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z2V0RmlsdGVyOiBmYWxzZX0pXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlZ2lzdGVyLnByb3RvdHlwZSxcIm1vZGFsUGFnZURlbEJ0bkNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oYnRuRXZlbnQpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQstGL0LfQvtCy0LAg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LAg0YPQtNCw0LvQtdC90LjRj1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dldERlbGV0ZU1vZGFsUGFnZTogZmFsc2V9KTtcclxuXHJcbiAgICAgICAgaWYgKGJ0bkV2ZW50ID09ICdPaycpIHtcclxuICAgICAgICAgICAgLy8g0LLRi9C30L7QstC10Lwg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGE0LvQsNC60YHQtVxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdEZWxldGUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3Rlci5wcm90b3R5cGUsXCJtb2RhbFBhZ2VJbmZvQnRuQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LLRi9C30L7QstCwINC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwINGB0LjRgdGC0LXQvNC90L7Qs9C+INGB0L7QvtCx0YnQtdC90LjRj1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dTeXN0ZW1NZXNzYWdlOiBmYWxzZX0pO1xyXG4gICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdzeXN0ZW1NZXNzYWdlQ2hhbmdlJywgbnVsbCk7XHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3Rlci5wcm90b3R5cGUsXCJnZXRGaWx0ZXJGaWVsZHNcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDRgdC+0LfQtNCw0YHRgiDQuNC3INC/0L7Qu3TQuSDQs9GA0LjQtNCwINC60L7QvNC/0L7QvdC10L3RgtGLINC00LvRjyDRhNC+0YDQvNC40YDQvtCy0LDQvdC40Y8g0YPRgdC70L7QstC40Lkg0YTQuNC70YzRgtGA0LDRhtC40LhcclxuICAgICAgICBsZXQgZ3JpZENvbXBvbmVudHMgPSBkb2NzU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgZ3JpZERhdGEgPSBbXSxcclxuICAgICAgICAgICAgcHJldmlvc0ZpbHRlciA9IHRoaXMuZmlsdGVyRGF0YSxcclxuICAgICAgICAgICAgZmlsdGVyRmllbGRzO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRDb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChncmlkQ29tcG9uZW50c1tpXVsnbmFtZSddID09ICdkb2NzR3JpZCcpIHtcclxuICAgICAgICAgICAgICAgIC8vINC40YnQtdC8INC/0L7Qu9C1IGNvbHVtbnNcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGZpZWxkIGluIGdyaWRDb21wb25lbnRzW2ldLmRhdGFbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGQgPT0gJ2NvbHVtbnMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWREYXRhID0gZ3JpZENvbXBvbmVudHNbaV0uZGF0YVswXS5jb2x1bW5zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGdyaWREYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YSA9IFtdOyAvLyDQvtCx0L3Rg9C70LjQvCDQvNCw0YHRgdC40LJcclxuICAgICAgICAgICAgZmlsdGVyRmllbGRzID1cclxuICAgICAgICAgICAgICAgIGdyaWREYXRhLm1hcChmdW5jdGlvbihyb3csIGluZGV4KSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnRUeXBlID0gJ3RleHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRPYmpla3RWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmV2aW9zRmlsdGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINC40YnQtdC8IFwi0YHRgtCw0YDQvtC1XCIg0LfQvdCw0YfQtdC90LjQtSDRhNC40LvRjNGC0YDQsCDQuCDQtdGB0LvQuCDQtdGB0YLRjCwg0YLQviDQvtGC0LTQsNC10Lwg0LXQs9C+IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW9zRmlsdGVyW2ldLnJlZnMgPT0gcm93LmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRPYmpla3RWYWx1ZSA9IHByZXZpb3NGaWx0ZXJbaV0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFR5cGUgPSByb3cudHlwZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vINGB0L7QsdC10YDQtdC8INC80LDRgdGB0LjQsiDQvtCx0YrQtdC60YLQvtCyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByb3cubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNvbXBvbmVudE9iamVrdFZhbHVlIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGNvbXBvbmVudFR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZnM6IHJvdy5pZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g0L7QsdC90L7QstC40Lwg0YHRgtGA0L7QutGDINGE0LjQu9GM0YLRgNCw0YbQuNC4XHJcbiAgICAgICAgdGhpcy5nZXRGaWx0ZXJTdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJEYXRhO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWdpc3Rlci5wcm90b3R5cGUsXCJnZXRGaWx0ZXJTdHJpbmdcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQv9GA0LXQvtCx0YDQsNC30YPQtdGCINC00LDQvdC90YvQtSDRhNC40LvRgtGA0LAg0LIg0YHRgtGA0L7QutGDXHJcbiAgICAgICAgbGV0IHN0cmluZyA9ICcnO1xyXG5cclxuICAgICAgICB0aGlzLmZpbHRlckRhdGEubWFwKGZ1bmN0aW9uKHJvdykgIHtcclxuICAgICAgICAgICAgaWYgKHJvdy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nID0gc3RyaW5nICsgcm93Lm5hbWUgKyAnOicgKyByb3cudmFsdWUgKyAnOyAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZztcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVnaXN0ZXIucHJvdG90eXBlLFwicHJlcGFyZVBhcmFtc0ZvclRvb2xiYXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDRh9C40YLQsNC10Lwg0LTQsNC90L3Ri9C1INGB0L4g0YHRgtC+0YDQsCwg0YTQvtGA0LzQuNGA0YPQtdC8INC/0LDRgNCw0LzQtdGC0YDRiyDQtNC70Y8g0LrQvdC+0L/QvtC6INGD0L/RgNCw0LLQu9C10L3QuNGPLCDQuCDRgtGD0LTQsCDQuNGFINC+0YLQtNCw0LXQvFxyXG4vL2RvY3NHcmlkQ2hhbmdlIChmbHV4LnN0b3Jlcy5kb2NzU3RvcmUuKVxyXG4gICAgICAgIGxldCBncmlkID0gdGhpcy5maW5kQ29tcG9uZW50KCdkb2NzR3JpZCcpIHx8IFtdLFxyXG4gICAgICAgICAgICBsYXN0Um93SWQgPSB0aGlzLnN0YXRlLmFjdGl2Um93SWQsXHJcbiAgICAgICAgICAgIGRhdGEgPSBbXSxcclxuICAgICAgICAgICAgZGF0YVJvdyA9IFtdLFxyXG4gICAgICAgICAgICB0b29sYmFyUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgYnRuQWRkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBidG5FZGl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBidG5EZWxldGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJ0blByaW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbi8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsNC70LjRh9C40LUg0LTQsNC90L3Ri9GFLCDQtdGB0LvQuCDQtdGB0YLRjCDQv9GA0L7Qv9C40YXQvdC10Lwg0LrQvtC80L/QvtC90LXQvdGC0LDQvFxyXG5cclxuICAgICAgICBpZiAoZ3JpZC5sZW5ndGggPiAwICYmIGdyaWRbMF0uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBncmlkWzBdLmRhdGFbMF0uZGF0YTtcclxuICAgICAgICAgICAgZGF0YVJvdyA9IGRhdGEuZmlsdGVyKGZ1bmN0aW9uKHJvdykgIHtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT09IGxhc3RSb3dJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0b29sYmFyUGFyYW1zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGFSb3cubGVuZ3RoID4gMCAmJiBkYXRhUm93WzBdLnN0YXR1cyA9PSAn0J/RgNC+0LLQtdC00LXQvScpIHtcclxuICAgICAgICAgICAgLy8g0YPQtNCw0LvRj9GC0Ywg0L3QtdC70YzQt9GPXHJcbiAgICAgICAgICAgIHRvb2xiYXJQYXJhbXMuYnRuRGVsZXRlLnNob3cgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRvb2xiYXJQYXJhbXM7XHJcblxyXG4gICAgfX0pO1xyXG5cclxuXHJcblxyXG5SZWdpc3Rlci5Qcm9wVHlwZXMgPSB7XHJcbiAgICBjb21wb25lbnRzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWdpc3RlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2RvY3MvZG9jLXJlZ2lzdGVyL2RvYy1yZWdpc3Rlci5qc3hcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcclxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcclxuICAgIElDT04gPSAnZmlsdGVyJztcclxuXHJcblxyXG52YXIgX19fX0NsYXNzeT1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzeV9fX19LZXkgaW4gX19fX0NsYXNzeSl7aWYoX19fX0NsYXNzeS5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3N5X19fX0tleSkpe0J1dHRvblJlZ2lzdGVyRmlsdGVyW19fX19DbGFzc3lfX19fS2V5XT1fX19fQ2xhc3N5W19fX19DbGFzc3lfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzeT1fX19fQ2xhc3N5PT09bnVsbD9udWxsOl9fX19DbGFzc3kucHJvdG90eXBlO0J1dHRvblJlZ2lzdGVyRmlsdGVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3N5KTtCdXR0b25SZWdpc3RlckZpbHRlci5wcm90b3R5cGUuY29uc3RydWN0b3I9QnV0dG9uUmVnaXN0ZXJGaWx0ZXI7QnV0dG9uUmVnaXN0ZXJGaWx0ZXIuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzeTtcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgZnVuY3Rpb24gQnV0dG9uUmVnaXN0ZXJGaWx0ZXIocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3N5LmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyRmlsdGVyLnByb3RvdHlwZSxcImhhbmRsZUNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uQ2xpY2soKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJGaWx0ZXIucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgIHJlZjogXCJidG5GaWx0ZXJcIiwgXHJcbiAgICAgICAgICAgIHZhbHVlOiBcIkZpbHRlclwiLCBcclxuICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93LCBcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQsIFxyXG4gICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbihlKSAge3JldHVybiB0aGlzLmhhbmRsZUNsaWNrKGUpO30uYmluZCh0aGlzKX0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIiwge3JlZjogXCJpbWFnZVwiLCBzcmM6IHN0eWxlcy5pY29uc1tJQ09OXX0pXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG5cclxuO1xyXG5cclxuQnV0dG9uUmVnaXN0ZXJGaWx0ZXIucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5cclxuQnV0dG9uUmVnaXN0ZXJGaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgc2hvdzogdHJ1ZVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblJlZ2lzdGVyRmlsdGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWZpbHRlci9idXR0b24tcmVnaXN0ZXItZmlsdGVyLmpzeFxuLy8gbW9kdWxlIGlkID0gNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiJ3VzZSBzdHJpY3QnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBNb2RhbFBhZ2UgPSByZXF1aXJlKCcuLi9tb2RhbFBhZ2UuanN4JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuLi9tb2RhbHBhZ2UtZGVsZXRlL21vZGFscGFnZS1kZWxldGUtc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzcz1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzc19fX19LZXkgaW4gX19fX0NsYXNzcyl7aWYoX19fX0NsYXNzcy5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NzX19fX0tleSkpe01vZGFsUGFnZURlbGV0ZVtfX19fQ2xhc3NzX19fX0tleV09X19fX0NsYXNzc1tfX19fQ2xhc3NzX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3M9X19fX0NsYXNzcz09PW51bGw/bnVsbDpfX19fQ2xhc3NzLnByb3RvdHlwZTtNb2RhbFBhZ2VEZWxldGUucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3MpO01vZGFsUGFnZURlbGV0ZS5wcm90b3R5cGUuY29uc3RydWN0b3I9TW9kYWxQYWdlRGVsZXRlO01vZGFsUGFnZURlbGV0ZS5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NzO1xyXG4gICAgZnVuY3Rpb24gTW9kYWxQYWdlRGVsZXRlKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzcy5jYWxsKHRoaXMscHJvcHMpXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb2RhbFBhZ2VEZWxldGUucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3c6IG5leHRQcm9wcy5zaG93fSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1vZGFsUGFnZURlbGV0ZS5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgbW9kYWxPYmplY3RzID0gWydidG5PaycsICdidG5DYW5jZWwnXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxQYWdlLCB7cmVmOiBcIm1vZGFsUGFnZVwiLCBcclxuICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMucHJvcHMubW9kYWxQYWdlQnRuQ2xpY2ssIFxyXG4gICAgICAgICAgICBzaG93OiB0aGlzLnN0YXRlLnNob3csIFxyXG4gICAgICAgICAgICBtb2RhbFBhZ2VOYW1lOiBcIkRlbGV0ZSBkb2N1bWVudFwifSwgXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3JlZjogXCJjb250YWluZXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VcIiwgc3JjOiBzdHlsZXMuaWNvbn0pLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtyZWY6IFwibWVzc2FnZVwifSwgXCIg0KPQtNCw0LvQuNGC0Ywg0LTQvtC60YPQvNC10L3RgiA/IFwiKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG5cclxuXHJcbk1vZGFsUGFnZURlbGV0ZS5wcm9wVHlwZXMgPSB7XHJcbiAgICBtb2RhbFBhZ2VCdG5DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsUGFnZURlbGV0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1kZWxldGUvbW9kYWxQYWdlLWRlbGV0ZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaWNvbjogJ2ltYWdlcy9pY29ucy9kZWxldGUucG5nJ1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxwYWdlL21vZGFscGFnZS1kZWxldGUvbW9kYWxwYWdlLWRlbGV0ZS1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi4vbW9kYWxQYWdlLmpzeCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi4vbW9kYWxwYWdlLWluZm8vbW9kYWxwYWdlLWluZm8tc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzdD1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzdF9fX19LZXkgaW4gX19fX0NsYXNzdCl7aWYoX19fX0NsYXNzdC5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3N0X19fX0tleSkpe01vZGFsUGFnZUluZm9bX19fX0NsYXNzdF9fX19LZXldPV9fX19DbGFzc3RbX19fX0NsYXNzdF9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3N0PV9fX19DbGFzc3Q9PT1udWxsP251bGw6X19fX0NsYXNzdC5wcm90b3R5cGU7TW9kYWxQYWdlSW5mby5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzdCk7TW9kYWxQYWdlSW5mby5wcm90b3R5cGUuY29uc3RydWN0b3I9TW9kYWxQYWdlSW5mbztNb2RhbFBhZ2VJbmZvLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzc3Q7XHJcbiAgICBmdW5jdGlvbiBNb2RhbFBhZ2VJbmZvKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzdC5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvd1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1vZGFsUGFnZUluZm8ucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3c6IG5leHRQcm9wcy5zaG93fSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1vZGFsUGFnZUluZm8ucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBzeXN0ZW1NZXNzYWdlID0gdGhpcy5wcm9wcy5zeXN0ZW1NZXNzYWdlID8gdGhpcy5wcm9wcy5zeXN0ZW1NZXNzYWdlIDogJycsXHJcbiAgICAgICAgICAgIG1vZGFsT2JqZWN0cyA9IFsnYnRuT2snXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxQYWdlLCB7cmVmOiBcIm1vZGFsUGFnZVwiLCBcclxuICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMucHJvcHMubW9kYWxQYWdlQnRuQ2xpY2ssIFxyXG4gICAgICAgICAgICBtb2RhbFBhZ2VOYW1lOiBcIldhcm5pbmchXCIsIFxyXG4gICAgICAgICAgICBtb2RhbE9iamVjdHM6IG1vZGFsT2JqZWN0c30sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtyZWY6IFwiY29udGFpbmVyXCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWFnZVwiLCB7cmVmOiBcImltYWdlXCIsIHNyYzogc3R5bGVzLmljb259KSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIiBcIiwgc3lzdGVtTWVzc2FnZSwgXCIgXCIpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcblxyXG5cclxuTW9kYWxQYWdlSW5mby5wcm9wVHlwZXMgPSB7XHJcbiAgICBzeXN0ZW1NZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbW9kYWxQYWdlQnRuQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW9kYWxQYWdlSW5mbztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2UtaW5mby9tb2RhbFBhZ2UtaW5mby5qc3hcbi8vIG1vZHVsZSBpZCA9IDc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaWNvbjogJ2ltYWdlcy9pY29ucy9pbmZvLnBuZydcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2UtaW5mby9tb2RhbHBhZ2UtaW5mby1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vdHJlZS1zdHlsZXMuanMnKTtcclxuXHJcbnZhciBfX19fQ2xhc3N2PVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3N2X19fX0tleSBpbiBfX19fQ2xhc3N2KXtpZihfX19fQ2xhc3N2Lmhhc093blByb3BlcnR5KF9fX19DbGFzc3ZfX19fS2V5KSl7VHJlZVtfX19fQ2xhc3N2X19fX0tleV09X19fX0NsYXNzdltfX19fQ2xhc3N2X19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3Y9X19fX0NsYXNzdj09PW51bGw/bnVsbDpfX19fQ2xhc3N2LnByb3RvdHlwZTtUcmVlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3N2KTtUcmVlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1UcmVlO1RyZWUuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzdjtcclxuICAgIGZ1bmN0aW9uIFRyZWUocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3N2LmNhbGwodGhpcyxwcm9wcyk7XHJcblxyXG4gICAgICAgIGxldCBpZHggPSAwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy52YWx1ZSkge1xyXG4gICAgICAgICAgICAvLyB3ZSBnb3QgdmFsdWUsIHdlIHNob3VsZCBmaW5kIGluZGV4IGFuZCBpbml0aWxpemUgaWR4IGZpZWxkXHJcbiAgICAgICAgICAgIHByb3BzLmRhdGEuZm9yRWFjaChmdW5jdGlvbihyb3csIGluZGV4KSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvd1twcm9wcy5iaW5kRGF0YUZpZWxkXSA9PT0gcHJvcHMudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3VuZFxyXG4gICAgICAgICAgICAgICAgICAgIGlkeCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGRhdGE6IHByb3BzLmRhdGEsXHJcbiAgICAgICAgICAgIGluZGV4OiBpZHgsXHJcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5oYW5kbGVMaUNsaWNrID0gdGhpcy5oYW5kbGVMaUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRyZWUucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7cmVmOiBcInRyZWVcIn0sIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUcmVlKCcwJylcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVHJlZS5wcm90b3R5cGUsXCJoYW5kbGVMaUNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oc2VsZWN0ZWRJbmRleCwgc2VsZWN0ZWRJZCwgaXNOb2RlKSB7XHJcbiAgICAgICAgaWYgKCFpc05vZGUgJiYgIWlzTmFOKHNlbGVjdGVkSWQpKSB7XHJcbiAgICAgICAgICAgIC8vINC90LUg0L3QvtCwLCDQsCDQtNC+0LrRg9C80LXQvdGCXHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5wcm9wcy5kYXRhLmZpbHRlcihmdW5jdGlvbihyb3csIGluZGV4KSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT0gc2VsZWN0ZWRJZCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhWzBdW3RoaXMucHJvcHMuYmluZERhdGFGaWVsZF07XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGluZGV4OiBzZWxlY3RlZEluZGV4LFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25DbGlja0FjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgLy9AdG9kbyDQuNC30LHQsNCy0LjRgtGM0YHRjyDQvtGCIGNoYW5nZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrQWN0aW9uKHRoaXMucHJvcHMubmFtZSArICdDaGFuZ2UnLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/RgdGC0LDQstC40Lwg0LzQtdGC0LrRg1xyXG4gICAgICAgIC8vINGB0L7RhdGA0LDQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuXHJcblxyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUcmVlLnByb3RvdHlwZSxcImdldENoaWxkcmVuXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24ocGFyZW50SWQpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuc3RhdGUuZGF0YTtcclxuICAgICAgICByZXR1cm4gZGF0YS5maWx0ZXIoZnVuY3Rpb24ocm93KSAge1xyXG4gICAgICAgICAgICBpZiAocm93LnBhcmVudGlkID09IHBhcmVudElkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRyZWUucHJvdG90eXBlLFwiZ2V0VHJlZVwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKHBhcmVudElkKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldENoaWxkcmVuKHBhcmVudElkKSxcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnN0YXRlLnZhbHVlO1xyXG5cclxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7c3R5bGU6IHN0eWxlcy51bCwgcmVmOiBcInRyZWUtdWxcIn0sIFxyXG4gICAgICAgICAgICBkYXRhLm1hcChmdW5jdGlvbihzdWJSb3csIGluZGV4KSAge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmxpLCB2YWx1ZSA9PSBzdWJSb3dbdGhpcy5wcm9wcy5iaW5kRGF0YUZpZWxkXSAmJiAhc3ViUm93LmlzX25vZGUgPyBzdHlsZXMuZm9jdXNlZCA6IHt9KSxcclxuICAgICAgICAgICAgICAgICAgICByZWZJZCA9ICdsaS0nICsgaW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwge3N0eWxlOiBzdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlTGlDbGljay5iaW5kKHRoaXMsIGluZGV4LCBzdWJSb3cuaWQsIHN1YlJvdy5pc19ub2RlKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogcmVmSWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6IHJlZklkfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YlJvdy5uYW1lLCBcIiBcIiwgdGhpcy5nZXRUcmVlKHN1YlJvdy5pZClcclxuICAgICAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICApKVxyXG4gICAgfX0pO1xyXG5cclxuXHJcblxyXG5UcmVlLnByb3BUeXBlcyA9IHtcclxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgYmluZERhdGFGaWVsZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXHJcbn07XHJcblxyXG5UcmVlLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRhdGE6IFt7XHJcbiAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgcGFyZW50SWQ6IDAsXHJcbiAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAga29vZDogJycsXHJcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlXHJcbiAgICB9XSxcclxuICAgIHZhbHVlOiBudWxsLFxyXG4gICAgYmluZERhdGFGaWVsZDogJ2lkJ1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRyZWU7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy90cmVlL3RyZWUuanN4XG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVsOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgbWFyZ2luUmlnaHQ6ICcyMHB4JyxcbiAgICAgICAgcGFkZGluZ0xlZnQ6ICcxNXB4JyxcbiAgICAgICAgZGlzcGxheTogJ2xpc3QtaXRlbSdcbiAgICB9LFxuICAgIGxpOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgbWFyZ2luUmlnaHQ6ICcyMHB4J1xuICAgIH0sXG4gICAgZm9jdXNlZDoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdsaWdodGJsdWUnXG4gICAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvdHJlZS90cmVlLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNzhcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3Qgc2lkZUJhclN0eWxlcyA9IHJlcXVpcmUoJy4vc2lkZWJhci1zdHlsZXMnKSxcclxuICAgIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcblxyXG52YXIgX19fX0NsYXNzdT1SZWFjdC5Db21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3N1X19fX0tleSBpbiBfX19fQ2xhc3N1KXtpZihfX19fQ2xhc3N1Lmhhc093blByb3BlcnR5KF9fX19DbGFzc3VfX19fS2V5KSl7U2lkZUJhckNvbnRhaW5lcltfX19fQ2xhc3N1X19fX0tleV09X19fX0NsYXNzdVtfX19fQ2xhc3N1X19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3U9X19fX0NsYXNzdT09PW51bGw/bnVsbDpfX19fQ2xhc3N1LnByb3RvdHlwZTtTaWRlQmFyQ29udGFpbmVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3N1KTtTaWRlQmFyQ29udGFpbmVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1TaWRlQmFyQ29udGFpbmVyO1NpZGVCYXJDb250YWluZXIuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzdTtcclxuICAgIGZ1bmN0aW9uIFNpZGVCYXJDb250YWluZXIocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3N1LmNhbGwodGhpcyxwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBwcm9wcy53aWR0aCxcclxuICAgICAgICAgICAgY29udGVudFdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2xCYXI6IHByb3BzLnRvb2xiYXJcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmJ0bkNsaWNrSGFuZGxlciA9IHRoaXMuYnRuQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNpZGVCYXJDb250YWluZXIucHJvdG90eXBlLFwiYnRuQ2xpY2tIYW5kbGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5zdGF0ZS5zaG93ID8gJzIwcHgnIDogdGhpcy5wcm9wcy53aWR0aCxcclxuICAgICAgICAgICAgY29udGVudFdpZHRoID0gdGhpcy5zdGF0ZS5zaG93ID8gJzFweCcgOiAnMTAwJScsXHJcbiAgICAgICAgICAgIHNob3dDb250ZW50ID0gIXRoaXMuc3RhdGUuc2hvdztcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgY29udGVudFdpZHRoOiBjb250ZW50V2lkdGgsXHJcbiAgICAgICAgICAgIHNob3c6IHNob3dDb250ZW50XHJcbiAgICAgICAgfSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNpZGVCYXJDb250YWluZXIucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHRvb2xCYXJTeW1ib2wgPSB0aGlzLnN0YXRlLnNob3cgPyAnPCcgOiAnPic7IC8vdG9kbyBtb3ZlIHRvIHN0eWxlcyBmaWxlXHJcblxyXG4gICAgICAgIC8vcHJlcGFpcmUgc3R5bGVzXHJcbiAgICAgICAgbGV0IHNpZGVCYXJDb250YWluZXJTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHNpZGVCYXJTdHlsZXMuc2lkZUJhckNvbnRhaW5lclN0eWxlLCB7d2lkdGg6IHRoaXMuc3RhdGUud2lkdGh9KSxcclxuICAgICAgICAgICAgdG9vbEJhclN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSxzaWRlQmFyU3R5bGVzLnRvb2xCYXJTdHlsZSwge3Zpc2liaWxpdHk6IHRoaXMucHJvcHMudG9vbGJhciA/ICd2aXNpYmxlJzogJ2hpZGRlbid9KSxcclxuICAgICAgICAgICAgY29udGVudFN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSxzaWRlQmFyU3R5bGVzLmNvbnRlbnRTdHlsZSwge3Zpc2liaWxpdHk6IHRoaXMuc3RhdGUuc2hvdyA/ICd2aXNpYmxlJzogJ2hpZGRlbid9KSxcclxuICAgICAgICAgICAgYnV0dG9uU3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LHNpZGVCYXJTdHlsZXMuYnV0dG9uU3R5bGUsIHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy50b29sYmFyID8gc2lkZUJhclN0eWxlcy5idXR0b25TdHlsZS5oZWlnaHQ6ICcwJyxcclxuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IHRoaXMucHJvcHMudG9vbGJhciA/ICd2aXNpYmxlJzogJ2hpZGRlbidcclxuICAgICAgICB9IClcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwidG9vbEJhckNvbnRhaW5lclwiLCBzdHlsZTogc2lkZUJhckNvbnRhaW5lclN0eWxlLCByZWY6IFwidG9vbGJhclwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJidG5CYXJcIiwgc3R5bGU6IHRvb2xCYXJTdHlsZX0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJidXR0b25cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzaWRlYmFyLWJ1dHRvblwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGJ1dHRvblN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRvb2xCYXJTeW1ib2wsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmJ0bkNsaWNrSGFuZGxlcn1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcImNvbnRlbnRcIiwgc3R5bGU6IGNvbnRlbnRTdHlsZSwgcmVmOiBcImNvbnRlbnRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuXHJcblxyXG5TaWRlQmFyQ29udGFpbmVyLnByb3BUeXBlcyA9IHtcclxuICAgIHRvb2xiYXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcclxufTtcclxuXHJcblNpZGVCYXJDb250YWluZXIuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdG9vbGJhcjogdHJ1ZSxcclxuICAgIHdpZHRoOiAnMTAwJSdcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2lkZUJhckNvbnRhaW5lcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzeFxuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzaWRlQmFyQ29udGFpbmVyU3R5bGU6IHtcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgaGVpZ2h0OiAnNDAwcHgnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgcmVkJyxcbiAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJ1xuICAgIH0sXG5cbiAgICB0b29sQmFyU3R5bGU6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgYmFja2dyb3VuZDogJ2dyYXknLFxuICAgICAgICB2aXNpYmlsaXR5OiAndmlzaWJsZSdcbiAgICB9LFxuICAgIGNvbnRlbnRTdHlsZToge1xuICAgICAgICBoZWlnaHQ6ICdpbmhlcml0JyxcbiAgICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgIH0sXG5cbiAgICBidXR0b25TdHlsZToge1xuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgaGVpZ2h0OiAnMjBweCcsXG4gICAgICAgIHdpZHRoOiAnMjBweCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXItc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnRhaW5lcjoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhGbG93OiAncm93IHdyYXAnLFxuICAgICAgICBoZWlnaHQ6ICc4NyUnLFxuICAgICAgICBib3JkZXI6ICczcHggc29saWQgYnJvd24nXG4gICAgfSxcbiAgICB3cmFwcGVyOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIGZsZXg6ICcxIDEwMCUnLFxuICAgICAgICBhbGlnbkl0ZW1zOiAnc3RyZXRjaCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnXG4gICAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2RvY3MvZG9jLXJlZ2lzdGVyL2RvYy1yZWdpc3Rlci1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vZ3JpZC1maWx0ZXItc3R5bGVzJyk7XHJcblxyXG5cclxudmFyIF9fX19DbGFzc3c9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzc3dfX19fS2V5IGluIF9fX19DbGFzc3cpe2lmKF9fX19DbGFzc3cuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzd19fX19LZXkpKXtHcmlkRmlsdGVyW19fX19DbGFzc3dfX19fS2V5XT1fX19fQ2xhc3N3W19fX19DbGFzc3dfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzdz1fX19fQ2xhc3N3PT09bnVsbD9udWxsOl9fX19DbGFzc3cucHJvdG90eXBlO0dyaWRGaWx0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3cpO0dyaWRGaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPUdyaWRGaWx0ZXI7R3JpZEZpbHRlci5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3N3O1xyXG4gICAgZnVuY3Rpb24gR3JpZEZpbHRlcihwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc3cuY2FsbCh0aGlzLHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZ3JpZENvbmZpZzogdGhpcy5wcm9wcy5ncmlkQ29uZmlnLCAvLyBncmlkIGNvbmZpZ1xyXG4gICAgICAgICAgICBkYXRhOiB0aGlzLnByb3BzLmRhdGEgLy8gZmlsdGVyIGRhdGFcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKSAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdyaWRGaWx0ZXIucHJvdG90eXBlLFwiaGFuZGxlQ2hhbmdlXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlLFxyXG4gICAgICAgICAgICBpZCA9IGUudGFyZ2V0Lm5hbWUsXHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnN0YXRlLmRhdGEsXHJcbiAgICAgICAgICAgIGluZGV4O1xyXG5cclxuICAgICAgICAvLyDQvdCw0LTQviDQvdCw0LnRgtC4INGN0LvQtdC80LXQvdGCINC80LDRgdGB0LjQstCwINGBINC00LDQvdC90YvQvNC4INC00LvRjyDRjdGC0L7Qs9C+INC60L7QvNC/0L7QvdC10L3RgtCwXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhW2ldLnJlZnMgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGRhdGFbaW5kZXhdLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IGRhdGF9KTtcclxuICAgICAgICB9XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdyaWRGaWx0ZXIucHJvdG90eXBlLFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyaWRDb25maWc6IG5leHRQcm9wcy5ncmlkQ29uZmlnLCBkYXRhOiBuZXh0UHJvcHMuZGF0YX0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHcmlkRmlsdGVyLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINGB0L7Qt9C00LDRgdGCINC40Lcg0L/QvtC70LXQuSDQs9GA0LjQtNCwINC60L7QvNC/0L7QvdC10L3RgtGLINC00LvRjyDRhNC+0YDQvNC40YDQvtCy0LDQvdC40Y8g0YPRgdC70L7QstC40Lkg0YTQuNC70YzRgtGA0LDRhtC40LhcclxuICAgICAgICBsZXQgZ3JpZENvbmZpZyA9IHRoaXMuc3RhdGUuZ3JpZENvbmZpZyxcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuc3RhdGUuZGF0YTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZmllbGRzZXR9LCBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBncmlkQ29uZmlnLm1hcChmdW5jdGlvbihyb3csIGluZGV4KSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnRUeXBlID0gcm93LnR5cGU/IHJvdy50eXBlOiAndGV4dCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuZm9ybVdpZGdldCwga2V5OiAnZmllbGRTZXQtJyArIHJvdy5pZH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmZvcm1XaWRnZXRMYWJlbH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgcm93Lm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLmZvcm1XaWRnZXRJbnB1dH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtzdHlsZTogc3R5bGVzLmlucHV0LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBjb21wb25lbnRUeXBlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcm93Lm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJvdy5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHJvdy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IHJvdy5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZGF0YVtyb3cuaWRdLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZGF0YVtyb3cuaWRdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcblxyXG5cclxuR3JpZEZpbHRlci5wcm9wVHlwZXMgPSB7XHJcbiAgICBncmlkQ29uZmlnOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR3JpZEZpbHRlcjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC9ncmlkLWZpbHRlci9ncmlkLWZpbHRlci5qc3hcbi8vIG1vZHVsZSBpZCA9IDgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybVdpZGdldDoge1xuICAgICAgICBtYXJnaW5Cb3R0b206ICc1cHgnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnXG4gICAgfSxcbiAgICBmb3JtV2lkZ2V0TGFiZWw6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcbiAgICAgICAgd2lkdGg6ICc0MCUnLFxuICAgICAgICBtYXJnaW5SaWdodDogJzEwcHgnXG4gICAgfSxcbiAgICBmb3JtV2lkZ2V0SW5wdXQ6IHtcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgcGFkZGluZzogJzNweCcsXG4gICAgICAgIGJvcmRlcjogJzBweCdcbiAgICB9LFxuXG4gICAgaW5wdXQ6IHtcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgcGFkZGluZzogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG5cbiAgICB9LFxuXG4gICAgZmllbGRTZXQ6IHtcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgbWFyZ2luOiAnMTBweCdcbiAgICB9LFxuXG4gICAgdWk6IHtcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgcGFkZGluZzogJzVweCcsXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG5cbiAgICB9XG5cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC9ncmlkLWZpbHRlci9ncmlkLWZpbHRlci1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcbiAgICBPUkRFUl9CWSA9IFt7IGNvbHVtbjogJ2lkJywgZGlyZWN0aW9uOiAnZGVzYycgfV07XG5cbnZhciBkb2NzU3RvcmUgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgICBpZDogJ2RvY3NTdG9yZScsXG4gICAgaW5pdGlhbFN0YXRlOiB7XG4gICAgICAgIGRvY3NHcmlkOiAwLFxuICAgICAgICBkb2NzTGlzdDogJycsXG4gICAgICAgIG5hbWU6ICd2bGFkJyxcbiAgICAgICAgZGF0YTogW10sXG4gICAgICAgIHNvcnRCeTogT1JERVJfQlksXG4gICAgICAgIHNxbFdoZXJlOiAnJyxcbiAgICAgICAgc3lzdGVtTWVzc2FnZTogbnVsbFxuICAgIH0sXG4gICAgYWN0aW9uQ2FsbGJhY2tzOiB7XG4gICAgICAgIHN5c3RlbU1lc3NhZ2VDaGFuZ2U6IGZ1bmN0aW9uIHN5c3RlbU1lc3NhZ2VDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgc3lzdGVtTWVzc2FnZTogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNxbFdoZXJlQ2hhbmdlOiBmdW5jdGlvbiBzcWxXaGVyZUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBzcWxXaGVyZTogdmFsdWUgfSk7XG4gICAgICAgICAgICByZXF1ZXJ5KHsgbmFtZTogJ2RvY3NHcmlkJywgdmFsdWU6IHRoaXMuZG9jc0xpc3QgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNvcnRCeUNoYW5nZTogZnVuY3Rpb24gc29ydEJ5Q2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHNvcnRCeTogdmFsdWUgfSk7XG4gICAgICAgICAgICByZXF1ZXJ5KHsgbmFtZTogJ2RvY3NHcmlkJywgdmFsdWU6IHRoaXMuZG9jc0xpc3QsIHNvcnRCeTogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIEFkZDogZnVuY3Rpb24gQWRkKHVwZGF0ZXIpIHtcbiAgICAgICAgICAgIGFkZCh0aGlzLmRvY3NMaXN0KTtcbiAgICAgICAgfSxcbiAgICAgICAgRWRpdDogZnVuY3Rpb24gRWRpdCh1cGRhdGVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kb2NzTGlzdCAmJiB0aGlzLmRvY3NHcmlkKSB7XG4gICAgICAgICAgICAgICAgZWRpdCh0aGlzLmRvY3NMaXN0LCB0aGlzLmRvY3NHcmlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign0KLQuNC/INC00L7QutGD0LzQtdC90YLQsCDQuNC70Lgg0LTQvtC60YPQvNC10L3RgiDQvdC1INCy0YvQsdGA0LDQvScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBEZWxldGU6IGZ1bmN0aW9uIERlbGV0ZSh1cGRhdGVyKSB7XG4gICAgICAgICAgICB2YXIgZG9jVHlwZUlkID0gdGhpcy5kb2NzTGlzdDtcbiAgICAgICAgICAgIHJlcXVlcnlGb3JBY3Rpb24oJ2RlbGV0ZScsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3N5c3RlbU1lc3NhZ2VDaGFuZ2UnLCBlcnIpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzeXN0ZW1NZXNzYWdlQ2hhbmdlJywgbnVsbCk7IC8vINC/0LjRiNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyINGF0YDQsNC90LjQu9C40YnQtVxuICAgICAgICAgICAgICAgICAgICByZXF1ZXJ5KHsgbmFtZTogJ2RvY3NHcmlkJywgdmFsdWU6IGRvY1R5cGVJZCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgUHJpbnQ6IGZ1bmN0aW9uIFByaW50KHVwZGF0ZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdidXR0b24gUHJpbnQgY2xpa2VkIScpO1xuICAgICAgICB9LFxuICAgICAgICBjaGFuZ2VOYW1lOiBmdW5jdGlvbiBjaGFuZ2VOYW1lKHVwZGF0ZXIsIG5hbWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBuYW1lOiBuYW1lIH0pO1xuICAgICAgICB9LFxuICAgICAgICBkb2NzR3JpZENoYW5nZTogZnVuY3Rpb24gZG9jc0dyaWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkb2NzR3JpZDogdmFsdWUgfSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VbJ2RvY3NHcmlkJ10gPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZG9jc0xpc3RDaGFuZ2U6IGZ1bmN0aW9uIGRvY3NMaXN0Q2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIHZhciBsYXN0VmFsdWUgPSBmbHV4LnN0b3Jlcy5kb2NzU3RvcmUuZG9jc0xpc3QgfHwgJ0RPSyc7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IGxhc3RWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZG9jc0xpc3Q6IHZhbHVlIH0pO1xuICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NvcnRCeUNoYW5nZScsIE9SREVSX0JZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbG9jYWxTdG9yYWdlWydkb2NzTGlzdCddID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFDaGFuZ2U6IGZ1bmN0aW9uIGRhdGFDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkYXRhOiB2YWx1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxufSk7XG5cbnZhciBlZGl0ID0gZnVuY3Rpb24gZWRpdChkb2NUeXBlSWQsIGRvY0lkKSB7XG4gICAgdmFyIHVybCA9IFwiL2RvY3VtZW50L1wiICsgZG9jVHlwZUlkICsgZG9jSWQ7XG4gICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcbn07XG5cbnZhciBhZGQgPSBmdW5jdGlvbiBhZGQoZG9jVHlwZUlkKSB7XG4gICAgdmFyIHVybCA9IFwiL2RvY3VtZW50L1wiICsgZG9jVHlwZUlkICsgJzAnO1xuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG59O1xuXG52YXIgcmVxdWVyeUZvckFjdGlvbiA9IGZ1bmN0aW9uIHJlcXVlcnlGb3JBY3Rpb24oYWN0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghd2luZG93LmpRdWVyeSB8fCAhJCkgcmV0dXJuOyAvLyDQtNC70Y8g0YLQtdGB0YLQvtCyXG5cbiAgICAvLyDQvNC10YLQvtC0INC+0LHQtdGB0L/QtdGH0LjRgiDQt9Cw0L/RgNC+0YEg0L3QsCDQstGL0L/QvtC70L3QtdC90LjQtVxuICAgIHZhciBkb2NJZCA9IGRvY3NTdG9yZS5kb2NzR3JpZCxcbiAgICAgICAgZG9jVHlwZUlkID0gZG9jc1N0b3JlLmRvY3NMaXN0O1xuXG4gICAgaWYgKCFkb2NJZCB8fCB0eXBlb2YgZG9jSWQgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgZG9jSWQgPSAwO1xuICAgIH1cblxuICAgIGlmICghZG9jSWQpIHtcbiAgICAgICAgLy8gZG9jIG5vdCBzZWxlY3RlZFxuICAgICAgICB2YXIgZGF0YSA9IGRvY3NTdG9yZS5kYXRhO1xuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgICAgLy9AdG9kbyDQn9GA0LjQstC10YHRgtC4INCyINCx0L7QttC10YHQutC40Lkg0LLQuNC0XG4gICAgICAgICAgICBpZiAoIWRvY1R5cGVJZCAmJiByb3cubmFtZSA9PSAnZG9jc0xpc3QnKSB7XG4gICAgICAgICAgICAgICAgLy8g0L3QtSDQvdCw0LfQvdCw0YfQtdC9INGC0LjQvyDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICAgICAgICAgICAgICBkb2NUeXBlSWQgPSByb3dbJ3ZhbHVlJ107XG4gICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZG9jc0xpc3RDaGFuZ2UnLCBkb2NUeXBlSWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocm93Lm5hbWUgPT0gJ2RvY3NHcmlkJykge1xuICAgICAgICAgICAgICAgIGRvY0lkID0gcm93LmRhdGFbMF0uZGF0YVswXS5pZDtcbiAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NzR3JpZENoYW5nZScsIGRvY0lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ2RvY0lkIGRvY1R5cGVJZDonLCBkb2NJZCwgZG9jVHlwZUlkLCBkb2NzU3RvcmUuZG9jc0xpc3QsIGRvY3NTdG9yZS5kb2NzR3JpZCwgZG9jc1N0b3JlLmRhdGEpO1xuXG4gICAgdmFyIHBhcmFtZXRlcnMgPSB7XG4gICAgICAgIGRvY0lkOiBkb2NJZCxcbiAgICAgICAgZG9jX3R5cGVfaWQ6IGRvY1R5cGVJZFxuICAgIH07XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2RvYycsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBhcmFtZXRlcnMpXG4gICAgICAgIH0sXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgICAgICAvLyDQtNC+0LvQttC90Ysg0L/QvtC70YPRh9C40YLRjCDQvtCx0YrQtdC60YIgLSDRgNC10LfRg9C70YzRgtCw0YJcbiAgICAgICAgICAgIHZhciBlcnJvck1lc3NzYWdlID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCA9PSAnRXJyb3InKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzc2FnZSA9ICdFcnJvciwgJyArIGRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3JNZXNzc2FnZSwgZGF0YSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcih4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCcvZXJyb3InLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbnZhciByZXF1ZXJ5ID0gZnVuY3Rpb24gcmVxdWVyeShjb21wb25lbnQpIHtcbiAgICBpZiAoIXdpbmRvdy5qUXVlcnkpIHJldHVybjsgLy8g0LTQu9GPINGC0LXRgdGC0L7QslxuXG4gICAgLy8g0LzQtdGC0L7QtCDQvtCx0LXRgdC/0LXRh9C40YIg0L/QvtC70YPRh9C10L3QuNC1INC00LDQvdC90YvRhSDQvtGCINGB0LXRgNCy0LXRgNCwXG4gICAgLy8gY29tcG9uZW50ID0gdGhpcy5zdGF0ZS5jb21wb25lbnRzW25hbWVdXG4gICAgLy8g0LXRgdC70Lgg0L/QsNGA0LDQvNC10YLRgNGLINC90LUg0LfQsNC00LDQvdGLLCDQs9GA0YPQt9C40Lwg0LLRgdC1XG5cbiAgICB2YXIgY29tcG9uZW50cyA9IGRvY3NTdG9yZS5kYXRhO1xuXG4gICAgLy8g0YTQuNC70YzRgtGA0YPQtdC8INGB0L/QuNGB0L7QuiDQutC+0LzQv9C+0L3QtdC90YLQvtCyXG4gICAgdmFyIGNvbXBvbmVudHNGb3JVcGRhdGUgPSBjb21wb25lbnRzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAvLyDQuNGJ0LXQvCDQvtCx0YrQtdC60YIg0L/QviDQvdCw0LjQvNC10L3QvtCy0LDQvdC40Y4uINC40LvQuCDQstC10YDQvdC10Lwg0LLRgdC1INC10YHQu9C4INC/0LDRgNCw0LzQtdGC0YAg0L3QtSDQt9Cw0LTQsNC9XG4gICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdjb21wb25lbnQ6JyArIEpTT04uc3RyaW5naWZ5KGNvbXBvbmVudCkpO1xuICAgICAgICBpZiAoY29tcG9uZW50Lm5hbWUgPT0gJycgfHwgaXRlbS5uYW1lID09IGNvbXBvbmVudC5uYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyDRgdC+0YDRgtC40YDQvtCy0LrQsFxuICAgIHZhciBzcWxTb3J0QnkgPSAnJyxcbiAgICAgICAgc3FsV2hlcmUgPSBkb2NzU3RvcmUuc3FsV2hlcmUgfHwgJycsXG4gICAgICAgIHNvcnRCeUFycmF5ID0gZG9jc1N0b3JlLnNvcnRCeSxcbiAgICAgICAgYXJyVHlwZSA9IHR5cGVvZiBzb3J0QnlBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yoc29ydEJ5QXJyYXkpO1xuXG4gICAgaWYgKGRvY3NTdG9yZS5zb3J0QnkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3J0QnlBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgc3FsU29ydEJ5ID0gc3FsU29ydEJ5ICsgJywnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3FsU29ydEJ5ID0gc3FsU29ydEJ5ICsgc29ydEJ5QXJyYXlbaV0uY29sdW1uICsgJyAnICsgc29ydEJ5QXJyYXlbaV0uZGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIFVSTCA9ICcvYXBpL2RvY3MnO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogVVJMLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcblxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBkYXRhVHlwZTogJ2NvbXBvbmVudCcsXG4gICAgICAgICAgICBkb2NUeXBlSWQ6IDEsXG4gICAgICAgICAgICBjb21wb25lbnRzOiBKU09OLnN0cmluZ2lmeShjb21wb25lbnRzRm9yVXBkYXRlKSwgLy8g0LrQvtC80L/QvtC90LXQvdGC0Ysg0LTQu9GPINC+0LHQvdC+0LLQu9C10L3QuNGPXG4gICAgICAgICAgICBwYXJhbWV0ZXI6IGNvbXBvbmVudC52YWx1ZSwgLy8g0L/QsNGA0LDQvNC10YLRgNGLXG4gICAgICAgICAgICBzb3J0Qnk6IHNxbFNvcnRCeSwgLy8g0YHQvtGA0YLQuNGA0L7QstC60LBcbiAgICAgICAgICAgIGxhc3REb2NJZDogZG9jc1N0b3JlLmRvY3NHcmlkLFxuICAgICAgICAgICAgc3FsV2hlcmU6IHNxbFdoZXJlIH0sXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIC8vINC00L7Qu9C20L3RiyDQv9C+0LvRg9GH0LjRgtGMINC+0LHRitC10LrRglxuICAgICAgICAgICAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXJlbnQgYXJyaXZlZCBkYXRhOicgKyBKU09OLnN0cmluZ2lmeShkYXRhKSArICfRgtC40L86JyArIHR5cGVvZiBkYXRhKTtcblxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgLy8gZmluZCBpdGVtXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncGFyZW50IEl0ZW06JyArIEpTT04uc3RyaW5naWZ5KGl0ZW0pICk7XG4gICAgICAgICAgICAgICAgLy8g0L7QsdC90L7QstC40Lwg0LTQsNC90L3Ri9C1INC80LDRgdGB0LjQstCwINC60L7QvNC/0L7QvdC10L3RgtC+0LJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzID0gY29tcG9uZW50cy5tYXAoZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50Lm5hbWUgPT0gaXRlbS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LmRhdGEgPSBpdGVtLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZygnc3RvcmUgZGF0YSB1cGRhdGU6JyArIEpTT04uc3RyaW5naWZ5KGNvbXBvbmVudHMpKTtcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCBjb21wb25lbnRzKTtcbiAgICAgICAgfS5iaW5kKHVuZGVmaW5lZCksXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignL2Vycm9yJywgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgIH0uYmluZCh1bmRlZmluZWQpXG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRvY3NTdG9yZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL3N0b3Jlcy9kb2NzX3N0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSA4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDMiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyksXHJcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXHJcbiAgICBJQ09OID0gJ3N0YXJ0JztcclxuXHJcbnZhciBfX19fQ2xhc3NLPVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NLX19fX0tleSBpbiBfX19fQ2xhc3NLKXtpZihfX19fQ2xhc3NLLmhhc093blByb3BlcnR5KF9fX19DbGFzc0tfX19fS2V5KSl7QnV0dG9uUmVnaXN0ZXJTdGFydFtfX19fQ2xhc3NLX19fX0tleV09X19fX0NsYXNzS1tfX19fQ2xhc3NLX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc0s9X19fX0NsYXNzSz09PW51bGw/bnVsbDpfX19fQ2xhc3NLLnByb3RvdHlwZTtCdXR0b25SZWdpc3RlclN0YXJ0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NLKTtCdXR0b25SZWdpc3RlclN0YXJ0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1CdXR0b25SZWdpc3RlclN0YXJ0O0J1dHRvblJlZ2lzdGVyU3RhcnQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzSztcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgZnVuY3Rpb24gQnV0dG9uUmVnaXN0ZXJTdGFydChwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzc0suY2FsbCh0aGlzLHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJTdGFydC5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCdzdGFydCcpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlclN0YXJ0LnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge1xyXG4gICAgICAgICAgICB2YWx1ZTogXCJcIiwgXHJcbiAgICAgICAgICAgIHJlZjogXCJidG5TdGFydFwiLCBcclxuICAgICAgICAgICAgc3R5bGU6IHN0eWxlcy5idXR0b24sIFxyXG4gICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnNob3csIFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCwgXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKGUpICB7cmV0dXJuIHRoaXMuaGFuZGxlQ2xpY2soZSk7fS5iaW5kKHRoaXMpfSwgXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWFnZVwiLCB7cmVmOiBcImltYWdlXCIsIHNyYzogc3R5bGVzLmljb25zW0lDT05dfSlcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcbjtcclxuXHJcbkJ1dHRvblJlZ2lzdGVyU3RhcnQucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5cclxuQnV0dG9uUmVnaXN0ZXJTdGFydC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBzaG93OiB0cnVlXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblJlZ2lzdGVyU3RhcnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItc3RhcnQvYnV0dG9uLXJlZ2lzdGVyLXN0YXJ0LmpzeFxuLy8gbW9kdWxlIGlkID0gMTA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDOVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9
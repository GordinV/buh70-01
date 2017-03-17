var docs =
webpackJsonp_name_([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// нрузим компоненты

	//var ReactDOM = require('react-dom');
	// создаем окласс - держатель состояний

	var Parent = __webpack_require__(37);

	// данные для хранилища
	localStorage['docsStore'] = storeData;
	storeData = JSON.parse(storeData);
	//console.log('storeData from docs', storeData);
	ReactDOM.render(React.createElement(Parent, { id: 'grid', components: storeData }, 'Тут будут компоненты'), document.getElementById('grid'));

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// грузим компоненты

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    DataGrid = __webpack_require__(38),
	    BtnAdd = __webpack_require__(54),
	    BtnEdit = __webpack_require__(57),
	    BtnDelete = __webpack_require__(58),
	    BtnPrint = __webpack_require__(59),
	    BtnFilter = __webpack_require__(60),
	    ModalPage = __webpack_require__(61),
	    ModalPageDelete = __webpack_require__(63),
	    ModalPageInfo = __webpack_require__(64),
	    DataList = __webpack_require__(65),
	    Sidebar = __webpack_require__(67),
	    ToolbarContainer = __webpack_require__(69)

	let myComponents = [];

	if (!typeof window === 'undefined') {
	    // берем данные с локального хранилища
	    myComponents = JSON.parse(localStorage['docsStore']);
	}

	// Create a store
	var docsStore = __webpack_require__(71);

	// создаем класс - держатель состояний
	var Parent = React.createClass({
	    displayName: 'Parent',

	    filterData: ['btnOk', 'btnCancel'], // массив объектов, куда запишем параметры для фильтрации @todo вынести все в отдельный компонет для фильтрации

	    getInitialState: function getInitialState() {
	        return {
	            // у каждого компонента свой объект
	            components: this.props.components, // @todo вынести в отдельный файл компонента
	            getFilter: false,
	            getDeleteModalPage: false,
	            showSystemMessage: false,
	            activRowId: 0

	        };
	    },

	    componentDidMount: function () {
	        var self = this;

	        // создаем обработчик события на изменение даннх
	        docsStore.on('change:data', function (newValue, previousValue) {
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

	        let lastComponent = localStorage['docsList'];
	        flux.doAction('dataChange', this.props.components);
	        if (lastComponent) {
	            flux.doAction('docsListChange', lastComponent);
	        }
	    },

	    findComponent: function (componentName) {
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

	    },

	    btnFilterClick: function () {
	        // откроет модальное окно с полями для фильтрации
	        this.setState({getFilter: true})
	    },

	    btnDeleteClick:function() {
	        this.setState({getDeleteModalPage: true})
	    },

	    btnAddClick:function() {
	        // обработчик события клик кнопки "Добавить"
	        // вызовем действия на флаксе
	        flux.doAction('Add');
	    },

	    btnEditClick:function() {
	        // обработчик события клик кнопки "Изменить"
	        // вызовем действия на флаксе
	        flux.doAction('Edit');
	    },

	    btnPrintClick:function() {
	        // обработчик события клик кнопки "Изменить"
	        // вызовем действия на флаксе
	        flux.doAction('Print');
	    },

	    render: function render() {
	        let myListValue = '',
	            myListData = this.findComponent('docsList') || [];

	        if (myListData.length > 0) {
	            myListValue = myListData[0].value;
	        }

	        var filterComponent;
	        if (this.state.getFilter) {
	            filterComponent = this.getFilterFields();
	        }

	        if (myListData.length > 0 && myListData[0].data.length > 0) {
	            myListData = myListData[0].data;
	        }

	        let docContainerStyle = {
	                display: 'flex',
	                flexFlow: 'row wrap',
	                height: '87%',
	                border: '3px solid brown'
	            },
	            docWrapperStyle = {
	                display: 'flex',
	                height: '100%',
	                flex: '1 100%',
	                alignItems: 'stretch',
	                flexDirection: 'row'
	            };

	        let myGrid = this.findComponent('docsGrid') || [],
	            myGridColums = [],
	            myGridData = [],
	            systemMessage = flux.stores.docsStore.systemMessage;

	        // проверим наличие данных, если есть пропихнем компонентам
	        if (myGrid.length > 0 && myGrid[0].data.length > 0) {
	            myGridColums = myGrid[0].data[0].columns;
	            myGridData = myGrid[0].data[0].data;
	        }

	        // получим параметры для кнопок управления, взависимости от активной строки
	        let toolbarParams = this.prepareParamsForToolbar();
	        return (React.createElement("div", {id: "parentDiv"}, 

	                React.createElement("div", {id: "docContainer", style: docContainerStyle}, 
	                    React.createElement(ToolbarContainer, null, 
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

	                    React.createElement("div", {style: docWrapperStyle}, 
	                        React.createElement(Sidebar, {width: "30%", toolbar: true, ref: "list-sidebar"}, 
	                            React.createElement(DataList, {data: myListData, 
	                                      name: "docsList", 
	                                      bindDataField: "kood", 
	                                      value: myListValue, 
	                                      onChangeAction: "docsListChange"}
	                            )
	                        ), 
	                        React.createElement(Sidebar, {width: "100%", toolbar: false, ref: "grid-sidebar"}, 
	                            React.createElement("div", null, 
	                                React.createElement(DataGrid, {
	                                    gridData: myGridData, 
	                                    gridColumns: myGridColums, 
	                                    onChangeAction: "docsGridChange", 
	                                    url: "api"}), 
	                                "(", React.createElement(ModalPage, {
	                                    modalPageBtnClick: this.modalPageBtnClick, 
	                                    modalPageName: "Filter", 
	                                    show: this.state.getFilter}, 
	                                    filterComponent
	                                ), ")", 
	                                this.state.getDeleteModalPage ?
	                                    (React.createElement(ModalPageDelete, {
	                                        modalPageBtnClick: this.modalPageDelBtnClick}
	                                    )) : null, 
	                                
	                                
	                                    this.state.showSystemMessage ?
	                                        (React.createElement(ModalPageInfo, {
	                                            modalPageBtnClick: this.modalPageInfoBtnClick, 
	                                            systemMessage: systemMessage}
	                                        )) : null
	                                
	                            )
	                        )
	                    )
	                )
	            )
	        )
	    },

	    getGridComponent: function()  {
	        let myGrid = this.findComponent('docsGrid') || [],
	            myGridColums = [],
	            myGridData = [],
	            systemMessage = flux.stores.docsStore.systemMessage;

	        // проверим наличие данных, если есть пропихнем компонентам
	        if (myGrid.length > 0 && myGrid[0].data.length > 0) {
	            myGridColums = myGrid[0].data[0].columns;
	            myGridData = myGrid[0].data[0].data;
	        }


	        return (
	            React.createElement("div", null, 
	                React.createElement("div", {id: "gridTable"}, 
	                    React.createElement(DataGrid, {
	                        gridData: myGridData, 
	                        gridColumns: myGridColums, 
	                        onChangeAction: "docsGridChange", 
	                        url: "api"})
	                ), 
	                this.state.getFilter ?
	                    (React.createElement(ModalPage, {
	                        modalPageBtnClick: this.modalPageBtnClick, 
	                        modalPageName: "Filter"
	                    }, " ", filterComponent, " "))
	                    : null, 
	                
	                
	                    this.state.getDeleteModalPage ?
	                        (React.createElement(ModalPageDelete, {
	                            modalPageBtnClick: this.modalPageDelBtnClick}
	                        )) : null, 
	                
	                
	                    this.state.showSystemMessage ?
	                        (React.createElement(ModalPageInfo, {
	                            modalPageBtnClick: this.modalPageInfoBtnClick, 
	                            systemMessage: systemMessage}
	                        )) : null
	                
	            )
	        )
	    }.bind(this),

	    modalPageBtnClick: function (btnEvent) {
	        // обработчик для кнопки фильтрации
	        let filterString = '';
	        if (btnEvent == 'Ok') {
	            // собирем данные в объект и вернем на форму
	            this.filterData = this.filterData.map(function(row)  {
	                row.value = this.refs[row.refs].value;

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
	            }.bind(this), this);
	            flux.doAction('sqlWhereChange', filterString);
	        }
	        this.setState({getFilter: false})
	    },

	    modalPageDelBtnClick:function(btnEvent) {
	        // обработчик вызова модального окна удаления
	        this.setState({getDeleteModalPage: false});

	        if (btnEvent == 'Ok') {
	            // вызовем действия на флаксе
	            flux.doAction('Delete');
	        }

	    },

	    modalPageInfoBtnClick:function() {

	        // обработчик вызова модального окна системного сообщения
	        this.setState({showSystemMessage: false});
	        // вызовем действия на флаксе
	        flux.doAction('systemMessageChange', null);

	    },

	    getFilterFields: function () {
	        // @todo вынести в отдельный модуль
	        // создаст из полкй грида компоненты для формирования условий фильтрации
	        var gridComponents = docsStore.data,
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
	                    var componentType = 'text',
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

	                    return React.createElement("li", {key: index}, 
	                        React.createElement("div", {className: "form-widget"}, 
	                            React.createElement("label", {className: "form-widget-label"}, React.createElement("span", null, row.name), 
	                                React.createElement("input", {
	                                    type: componentType, 
	                                    className: "ui-c2", 
	                                    title: row.name, 
	                                    name: row.name, 
	                                    placeholder: row.name, 
	                                    ref: row.id, 
	                                    defaultValue: componentObjektValue || null}
	                                )
	                            )
	                        )
	                    )
	                }.bind(this))
	            filterFields = React.createElement("div", {className: "fieldset"}, 
	                React.createElement("ul", null, filterFields)
	            )
	        }

	        return filterFields;
	    },

	    prepareParamsForToolbar: function () {
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

	    }

	});

	module.exports = Parent;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    styles = __webpack_require__(39),
	    keydown = __webpack_require__(40),
	    KEYS = [ 38, 40]; // мониторим только стрелки вверх и внизх

	const isExists = function(object, prop)  {
	    let result = false;
	    if (prop in object) {
	        result = true;
	    }
	    return result;
	}


	//@keydown @todo
	var ____Class1=React.PureComponent;for(var ____Class1____Key in ____Class1){if(____Class1.hasOwnProperty(____Class1____Key)){DataGrid[____Class1____Key]=____Class1[____Class1____Key];}}var ____SuperProtoOf____Class1=____Class1===null?null:____Class1.prototype;DataGrid.prototype=Object.create(____SuperProtoOf____Class1);DataGrid.prototype.constructor=DataGrid;DataGrid.__superConstructor__=____Class1;
	    function DataGrid(props) {
	        ____Class1.call(this,props);
	        this.state = {
	            gridColumns: this.props.gridColumns,
	            gridData: this.props.gridData,
	            activeRow: 0,
	            activeColumn: '',
	            sort: {
	                name: null,
	                direction: null
	            }
	        }
	        this.handleGridHeaderClick.bind(this);
	        this.handleCellDblClick.bind(this);
	        this.handleKeyDown.bind(this);
	    }

	    Object.defineProperty(DataGrid.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {
	        const self = this;
	        // повесим обработчики
	   }});

	    Object.defineProperty(DataGrid.prototype,"getGridRowIndexById",{writable:true,configurable:true,value:function(docId) {
	        // ищем индех в массиве данных
	        let index = 0,
	            data = this.props.gridData;

	        if (docId) {
	            for (let i = 0; i < data.length; i++) {
	                let row = data[i];
	                if (row && data[i]['id'] == docId) {
	                    index = i;
	                    break;
	                }
	            }
	        }
	        return index;
	    }});

	    Object.defineProperty(DataGrid.prototype,"handleCellClick",{writable:true,configurable:true,value:function(idx) {
	        // отрабатывает событи клика по ячейке
	        this.setState({
	            activeRow: idx
	        });

	        if (this.props.gridData.length > 0) {
	            var docId = this.props.gridData[idx].id;

	            // сохраним в хранилище
	            flux.doAction(this.props.onChangeAction, docId);
	        }
	    }});

	    Object.defineProperty(DataGrid.prototype,"handleCellDblClick",{writable:true,configurable:true,value:function(idx) {
	        // отметим активную строку и вызовен редактирование
	        this.handleCellClick(idx)
	        // вызовет метод редактирования
	        flux.doAction('Edit');
	    }});

	    Object.defineProperty(DataGrid.prototype,"handleGridHeaderClick",{writable:true,configurable:true,value:function(name) {
	        let  sort = this.state.sort;
	        if (sort.name === name) {
	            sort.direction = sort.direction === 'asc' ? 'desc': 'asc';
	        } else {
	            sort = {
	                name: name,
	                direction: 'asc'
	            }
	        }

	        let sortBy = [{column: sort.name, direction: sort.direction}];

	        this.setState({
	            activeColumn:name,
	            sort: sort
	        });

	        flux.doAction('sortByChange', sortBy);
	    }});

	    Object.defineProperty(DataGrid.prototype,"handleKeyDown",{writable:true,configurable:true,value:function(e) {
	        // реакция на клавиатуру
	        let rowIndex = this.state.activeRow;
	        switch (e.which) {
	            case 40:
	                // вниз, увеличим активную строку на + 1
	                rowIndex++;

	                if (this.state.gridData.length < rowIndex) {
	                    // вернем прежнее значение
	                    rowIndex = this.state.activeRow
	                }
	                break;
	            case 38:
	                // вниз, увеличим активную строку на - 1
	                rowIndex--;
	                rowIndex = rowIndex < 0 ? 0: rowIndex;
	                break;
	        }
	         this.setState({
	             activeRow: rowIndex
	         });
	    }});

	    Object.defineProperty(DataGrid.prototype,"render",{writable:true,configurable:true,value:function() {
	        let className = 'th';
	        /*
	         self = this;
	         onKeyDown: this.handleKeyPress('Down'),
	         onDoubleClick: this.handleCellDblClick(),
	         */
	        return (React.createElement("table", {ref: "dataGridTable"}, 
	                React.createElement("tbody", null, 
	                    React.createElement("tr", null, 
	                        this.prepareTableHeader()
	                    )
	                ), 
	                React.createElement("tbody", null, 
	                    this.prepareTableRow()
	                )
	            )
	        );

	    }}); // render

	    Object.defineProperty(DataGrid.prototype,"prepareTableRow",{writable:true,configurable:true,value:function() {
	        let data = this.props.gridData,
	            gridColumns = this.props.gridColumns;

	        return data.map(function(row, rowIndex)  {
	            let setRowActive = {},
	                objectIndex = 'tr-' + rowIndex,
	                activeRow = this.state.activeRow;

	            return (React.createElement("tr", {
	                ref: objectIndex, 
	                onClick: this.handleCellClick.bind(this, rowIndex), 
	                onDoubleClick: this.handleCellDblClick.bind(this, rowIndex), 
	                onKeyDown: this.handleKeyDown.bind(this), 
	                style: Object.assign({}, styles.tr, activeRow === rowIndex ? styles.focused: {}), 
	                key: objectIndex}, 
	                
	                    gridColumns.map(function(column, columnIndex)  {
	                        let cellIndex = 'td-' + rowIndex + '-' + columnIndex;

	                        let display = (isExists(column, 'show') ? column.show: true) ? true: false,
	                            width = isExists(column, 'width') ? column.width: '100%',
	                            style = Object.assign({}, styles.td, !display ? {display: 'none'} : {}, {width: width});

	                        return (
	                            React.createElement("td", {style: style, ref: cellIndex, key: cellIndex}, 
	                                row[column.id]
	                            )
	                        )
	                    })
	                

	            ))
	        }.bind(this), this)


	    }});

	    Object.defineProperty(DataGrid.prototype,"prepareTableHeader",{writable:true,configurable:true,value:function() {
	        let gridColumns = this.props.gridColumns,
	            className = 'th';

	        return gridColumns.map(function(column, index)  {
	            let headerIndex = 'th-' + index;

	             let display = (isExists(column, 'show') ? column.show: true) ? true: false,
	                 width = isExists(column, 'width') ? column.width: '100%',
	                 style = Object.assign({}, styles.th, !display ? {display: 'none'} : {}, {width: width}),
	                 activeColumn = this.state.activeColumn,
	                 iconType = this.state.sort.direction,
	                 imageStyleAsc = Object.assign({},styles.image, (activeColumn == column.id && iconType == 'asc' )  ? {}: {display: 'none'}),
	                 imageStyleDesc = Object.assign({},styles.image, (activeColumn == column.id && iconType == 'desc' )  ? {}: {display: 'none'})

	            // установить видимость
	            return React.createElement("th", {
	                style: style, 
	                ref: headerIndex, 
	                key: headerIndex, 
	                onClick: this.handleGridHeaderClick.bind(this, column.id)}, 
	                React.createElement("span", null, column.name), 
	                React.createElement("image", {ref: "imageAsc", style: imageStyleAsc, src: styles.icons['asc']}), 
	                React.createElement("image", {ref: "imageDesc", style: imageStyleDesc, src: styles.icons['desc']})
	            )
	        }.bind(this), this);
	    }});


	DataGrid.propTypes = {
	    gridColumns: React.PropTypes.array.isRequired,
	    gridData: React.PropTypes.array.isRequired
	}


	DataGrid.defaultProps = {
	    gridColumns: [],
	    gridData: []
	};

	module.exports = DataGrid;


/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    th: {
	        borderBottom: '1px solid black',
	        backgroundColor: 'grey',
	        height: '50px',
	        border: '1px solid lightgray'
	    },

	    tr: {
	        backgroundColor: 'white'
	    },

	    focused: {
	        backgroundColor: 'lightblue'
	    },

	    td: {
	        border: '1px solid lightgray'
	    },

	    icons: {
	        asc: 'images/icons/sort-alpha-asc.png',
	        desc: 'images/icons/sort-alpha-desc.png'
	    },

	    image: {
	        margin: '1px'
	    }

	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// polyfill array.from (mainly for IE)
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequire(obj) {
	  return obj && obj.__esModule ? obj['default'] : obj;
	}

	__webpack_require__(41);

	// @keydown and @keydownScoped

	var _decorators = __webpack_require__(42);

	exports['default'] = _interopRequire(_decorators);
	Object.defineProperty(exports, 'keydownScoped', {
	  enumerable: true,
	  get: function get() {
	    return _decorators.keydownScoped;
	  }
	});

	// setBinding - only useful if you're not going to use decorators

	var _store = __webpack_require__(44);

	Object.defineProperty(exports, 'setBinding', {
	  enumerable: true,
	  get: function get() {
	    return _store.setBinding;
	  }
	});

	// Keys - use this to find key codes for strings. for example: Keys.j, Keys.enter

	var _libKeys = __webpack_require__(45);

	exports.Keys = _interopRequire(_libKeys);

/***/ },
/* 41 */
/***/ function(module, exports) {

	// Production steps of ECMA-262, Edition 6, 22.1.2.1
	// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
	'use strict';

	if (!Array.from) {
	  Array.from = function () {
	    var toStr = Object.prototype.toString;
	    var isCallable = function isCallable(fn) {
	      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
	    };
	    var toInteger = function toInteger(value) {
	      var number = Number(value);
	      if (isNaN(number)) {
	        return 0;
	      }
	      if (number === 0 || !isFinite(number)) {
	        return number;
	      }
	      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
	    };
	    var maxSafeInteger = Math.pow(2, 53) - 1;
	    var toLength = function toLength(value) {
	      var len = toInteger(value);
	      return Math.min(Math.max(len, 0), maxSafeInteger);
	    };

	    // The length property of the from method is 1.
	    return function from(arrayLike /*, mapFn, thisArg */) {
	      // 1. Let C be the this value.
	      var C = this;

	      // 2. Let items be ToObject(arrayLike).
	      var items = Object(arrayLike);

	      // 3. ReturnIfAbrupt(items).
	      if (arrayLike == null) {
	        throw new TypeError("Array.from requires an array-like object - not null or undefined");
	      }

	      // 4. If mapfn is undefined, then let mapping be false.
	      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
	      var T;
	      if (typeof mapFn !== 'undefined') {
	        // 5. else
	        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
	        if (!isCallable(mapFn)) {
	          throw new TypeError('Array.from: when provided, the second argument must be a function');
	        }

	        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
	        if (arguments.length > 2) {
	          T = arguments[2];
	        }
	      }

	      // 10. Let lenValue be Get(items, "length").
	      // 11. Let len be ToLength(lenValue).
	      var len = toLength(items.length);

	      // 13. If IsConstructor(C) is true, then
	      // 13. a. Let A be the result of calling the [[Construct]] internal method
	      // of C with an argument list containing the single item len.
	      // 14. a. Else, Let A be ArrayCreate(len).
	      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

	      // 16. Let k be 0.
	      var k = 0;
	      // 17. Repeat, while k < len… (also steps a - h)
	      var kValue;
	      while (k < len) {
	        kValue = items[k];
	        if (mapFn) {
	          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
	        } else {
	          A[k] = kValue;
	        }
	        k += 1;
	      }
	      // 18. Let putStatus be Put(A, "length", len, true).
	      A.length = len;
	      // 20. Return A.
	      return A;
	    };
	  }();
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module decorators
	 *
	 */
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _class_decorator = __webpack_require__(43);

	var _class_decorator2 = _interopRequireDefault(_class_decorator);

	var _method_decorator = __webpack_require__(52);

	var _method_decorator2 = _interopRequireDefault(_method_decorator);

	var _method_decorator_scoped = __webpack_require__(53);

	var _method_decorator_scoped2 = _interopRequireDefault(_method_decorator_scoped);

	/**
	 * _decorator
	 *
	 * @access private
	 * @param {Function} methodFn The method wrapper to delegate to, based on whether user has specified a scoped decorator or not
	 * @param {Array} ...args Remainder of arguments passed in
	 * @return {Function} The decorated class or method
	 */
	function _decorator(methodFn) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  // check the first argument to see if it's a user-supplied keycode or array
	  // of keycodes, or if it's the wrapped class or method
	  var testArg = args[0];
	  var isArray = Array.isArray(testArg);

	  // if the test argument is not an object or function, it is user-supplied
	  // keycodes. else there are no arguments and it's just the wrapped class
	  // (method decorators must have keycode arguments).
	  if (isArray || ~['string', 'number'].indexOf(typeof testArg === 'undefined' ? 'undefined' : _typeof(testArg))) {
	    var _ret = function () {
	      var keys = isArray ? testArg : args;

	      // return the decorator function, which on the next call will look for
	      // the presence of a method name to determine if this is a wrapped method
	      // or component
	      return {
	        v: function v(target, methodName, descriptor) {
	          return methodName ? methodFn({ target: target, descriptor: descriptor, keys: keys }) : (0, _class_decorator2['default'])(target, keys);
	        }
	      };
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === 'object') return _ret.v;
	  } else {
	    var methodName = args[1];

	    // method decorators without keycode (which) arguments are not allowed.
	    if (!methodName) {
	      return _class_decorator2['default'].apply(undefined, args);
	    } else {
	      console.warn(methodName + ': Method decorators must have keycode arguments, so the decorator for this method will not do anything');
	    }
	  }
	}

	/**
	 * keydownScoped
	 *
	 * Method decorator that will look for changes to its targeted component's
	 * `keydown` props to decide when to trigger, rather than responding directly
	 * to keydown events. This lets you specify a @keydown decorated class higher
	 * up in the view hierarchy for larger scoping of keydown events, or for
	 * programmatically sending keydown events as props into the components in order
	 * to trigger decorated methods with matching keys.
	 *
	 * @access public
	 * @param {Array} ...args  All (or no) arguments passed in from decoration
	 * @return {Function} The decorated class or method
	 */
	function keydownScoped() {
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }

	  return _decorator.apply(undefined, [_method_decorator_scoped2['default']].concat(args));
	}

	/**
	 * keydown
	 *
	 * The main decorator and default export, handles both classes and methods.
	 *
	 * @access public
	 * @param {Array} ...args  All (or no) arguments passed in from decoration
	 * @return {Function} The decorated class or method
	 */
	function keydown() {
	  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    args[_key3] = arguments[_key3];
	  }

	  return _decorator.apply(undefined, [_method_decorator2['default']].concat(args));
	}

	exports['default'] = keydown;
	exports.keydownScoped = keydownScoped;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module componentWrapper
	 *
	 */
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x2, _x3, _x4) {
	  var _again = true;_function: while (_again) {
	    var object = _x2,
	        property = _x3,
	        receiver = _x4;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x2 = parent;_x3 = property;_x4 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _store = __webpack_require__(44);

	var _store2 = _interopRequireDefault(_store);

	var _event_handlers = __webpack_require__(49);

	/**
	 * componentWrapper
	 *
	 * @access public
	 * @param {object} WrappedComponent React component class to be wrapped
	 * @param {array} [keys] The key(s) bound to the class
	 * @return {object} The higher-order function that wraps the decorated class
	 */
	function componentWrapper(WrappedComponent) {
	  var keys = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	  var KeyBoardHelper = function (_React$Component) {
	    _inherits(KeyBoardHelper, _React$Component);

	    function KeyBoardHelper(props) {
	      _classCallCheck(this, KeyBoardHelper);

	      _get(Object.getPrototypeOf(KeyBoardHelper.prototype), 'constructor', this).call(this, props);
	      this.state = {
	        event: null
	      };
	    }

	    _createClass(KeyBoardHelper, [{
	      key: 'componentDidMount',
	      value: function componentDidMount() {
	        (0, _event_handlers.onMount)(this);
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        (0, _event_handlers.onUnmount)(this);
	      }
	    }, {
	      key: 'handleKeyDown',
	      value: function handleKeyDown(event) {
	        var _this = this;

	        // to simulate a keypress, set the event and then clear it in the callback
	        this.setState({ event: event }, function () {
	          return _this.setState({ event: null });
	        });
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return _react2['default'].createElement(WrappedComponent, _extends({}, this.props, { keydown: this.state }));
	      }
	    }]);

	    return KeyBoardHelper;
	  }(_react2['default'].Component);

	  _store2['default'].setBinding({ keys: keys, fn: KeyBoardHelper.prototype.handleKeyDown, target: KeyBoardHelper.prototype });

	  return KeyBoardHelper;
	}

	exports['default'] = componentWrapper;
	module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module store
	 *
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;_e = err;
	    } finally {
	      try {
	        if (!_n && _i['return']) _i['return']();
	      } finally {
	        if (_d) throw _e;
	      }
	    }return _arr;
	  }return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError('Invalid attempt to destructure non-iterable instance');
	    }
	  };
	}();

	exports._resetStore = _resetStore;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	var _libKeys = __webpack_require__(45);

	var _libMatch_keys = __webpack_require__(46);

	var _libMatch_keys2 = _interopRequireDefault(_libMatch_keys);

	var _libParse_keys = __webpack_require__(47);

	var _libParse_keys2 = _interopRequireDefault(_libParse_keys);

	var _libUuid = __webpack_require__(48);

	var _libUuid2 = _interopRequireDefault(_libUuid);

	/**
	 * private
	 * 
	 */

	// dict for class prototypes => bindings
	var _handlers = new Map();

	// all mounted instances that have keybindings
	var _instances = new Set();

	// for testing

	function _resetStore() {
	  _handlers.clear();
	  _instances.clear();
	}

	/**
	 * public
	 *
	 */

	var Store = {

	  /**
	   * activate
	   *
	   * @access public
	   * @param {object} instance Instantiated class that extended React.Component, to be focused to receive keydown events
	   */
	  activate: function activate(instances) {
	    var instancesArray = [].concat(instances);

	    // if no components were found as ancestors of the event target,
	    // effectively deactivate keydown handling by capping the set of instances
	    // with `null`.
	    if (!instancesArray.length) {
	      _instances.add(null);
	    } else {
	      _instances['delete'](null);

	      // deleting and then adding the instance(s) has the effect of sorting the set
	      // according to instance activation (ascending)
	      instancesArray.forEach(function (instance) {
	        _instances['delete'](instance);
	        _instances.add(instance);
	      });
	    }
	  },

	  /**
	   * deleteInstance
	   *
	   * @access public
	   * @param {object} target Instantiated class that extended React.Component
	   * @return {boolean} The value set.has( target ) would have returned prior to deletion
	   */
	  deleteInstance: function deleteInstance(target) {
	    _instances['delete'](target);
	  },

	  findBindingForEvent: function findBindingForEvent(event) {
	    if (!_instances.has(null)) {
	      var keyMatchesEvent = function keyMatchesEvent(keySet) {
	        return (0, _libMatch_keys2['default'])({ keySet: keySet, event: event });
	      };

	      // loop through instances in reverse activation order so that most
	      // recently activated instance gets first dibs on event
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = [].concat(_toConsumableArray(_instances)).reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var instance = _step.value;

	          var bindings = this.getBinding(instance.constructor.prototype);
	          var _iteratorNormalCompletion2 = true;
	          var _didIteratorError2 = false;
	          var _iteratorError2 = undefined;

	          try {
	            for (var _iterator2 = bindings[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	              var _step2$value = _slicedToArray(_step2.value, 2);

	              var keySets = _step2$value[0];
	              var fn = _step2$value[1];

	              if ((0, _libKeys.allKeys)(keySets) || keySets.some(keyMatchesEvent)) {
	                // return when matching keybinding is found - i.e. only one
	                // keybound component can respond to a given key code. to get around this,
	                // scope a common ancestor component class with @keydown and use
	                // @keydownScoped to bind the duplicate keys in your child components
	                // (or just inspect nextProps.keydown.event).
	                return { fn: fn, instance: instance };
	              }
	            }
	          } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion2 && _iterator2['return']) {
	                _iterator2['return']();
	              }
	            } finally {
	              if (_didIteratorError2) {
	                throw _iteratorError2;
	              }
	            }
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator['return']) {
	            _iterator['return']();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	    return null;
	  },

	  /**
	   * getBinding
	   *
	   * @access public
	   * @param {object} target Class used as key in dict of key bindings
	   * @return {object} The object containing bindings for the given class
	   */
	  getBinding: function getBinding(_ref) {
	    var __reactKeydownUUID = _ref.__reactKeydownUUID;

	    return _handlers.get(__reactKeydownUUID);
	  },

	  /**
	   * getInstances
	   *
	   * @access public
	   * @return {set} All stored instances (all mounted component instances with keybindings)
	   */
	  getInstances: function getInstances() {
	    return _instances;
	  },

	  /**
	   * isEmpty
	   *
	   * @access public
	   * @return {number} Size of the set of all stored instances
	   */
	  isEmpty: function isEmpty() {
	    return !_instances.size;
	  },

	  /**
	   * setBinding
	   *
	   * @access public
	   * @param {object} args All arguments necessary to set the binding
	   * @param {array} args.keys Key codes that should trigger the fn
	   * @param {function} args.fn The callback to be triggered when given keys are pressed
	   * @param {object} args.target The decorated class
	   */
	  setBinding: function setBinding(_ref2) {
	    var keys = _ref2.keys;
	    var fn = _ref2.fn;
	    var target = _ref2.target;

	    var keySets = keys ? (0, _libParse_keys2['default'])(keys) : (0, _libKeys.allKeys)();
	    var __reactKeydownUUID = target.__reactKeydownUUID;

	    if (!__reactKeydownUUID) {
	      target.__reactKeydownUUID = (0, _libUuid2['default'])();
	      _handlers.set(target.__reactKeydownUUID, new Map([[keySets, fn]]));
	    } else {
	      _handlers.get(__reactKeydownUUID).set(keySets, fn);
	    }
	  }
	};

	exports['default'] = Store;

/***/ },
/* 45 */
/***/ function(module, exports) {

	// TODO: Need better, more complete, and more methodical key definitions

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.allKeys = allKeys;
	var Keys = {
	  backspace: 8,
	  del: 46,
	  'delete': 46,
	  tab: 9,
	  enter: 13,
	  'return': 13,
	  esc: 27,
	  space: 32,
	  left: 37,
	  up: 38,
	  right: 39,
	  down: 40,
	  ';': 186,
	  '=': 187,
	  ',': 188,
	  '-': 189,
	  '.': 190,
	  '/': 191,
	  '`': 192,
	  '[': 219,
	  '\\': 220,
	  ']': 221
	};

	// Add uppercase versions of keys above for backwards compatibility
	Object.keys(Keys).forEach(function (key) {
	  return Keys[key.toUpperCase()] = Keys[key];
	});

	'0123456789'.split('').forEach(function (num, index) {
	  return Keys[num] = index + 48;
	});

	'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function (letter, index) {
	  Keys[letter] = index + 65;
	  Keys[letter.toLowerCase()] = index + 65;
	});

	// fn keys
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(function (item, index) {
	  return Keys['f' + index] = 111 + index;
	});

	var modifiers = {
	  control: 'ctrl',
	  ctrl: 'ctrl',
	  shift: 'shift',
	  meta: 'meta',
	  cmd: 'meta',
	  command: 'meta',
	  option: 'alt',
	  alt: 'alt'
	};

	exports.modifiers = modifiers;

	function allKeys(arg) {
	  return arg ? arg.constructor === Symbol || (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'symbol' : Symbol('allKeys');
	}

	exports['default'] = Keys;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _keys = __webpack_require__(45);

	var modKeys = Object.keys(_keys.modifiers);

	function matchKeys(_ref) {
	  var _ref$keySet = _ref.keySet;
	  var key = _ref$keySet.key;
	  var _ref$keySet$modifiers = _ref$keySet.modifiers;
	  var modifiers = _ref$keySet$modifiers === undefined ? [] : _ref$keySet$modifiers;
	  var event = _ref.event;

	  var keysMatch = false;
	  if (key === event.which) {
	    (function () {
	      var evtModKeys = modKeys.filter(function (modKey) {
	        return event[modKey + 'Key'];
	      }).sort();
	      keysMatch = modifiers.length === evtModKeys.length && modifiers.every(function (modKey, index) {
	        return evtModKeys[index] === modKey;
	      });
	    })();
	  }
	  return keysMatch;
	}

	exports['default'] = matchKeys;
	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _keys = __webpack_require__(45);

	var _keys2 = _interopRequireDefault(_keys);

	function parseKeys(keysArray) {
	  return keysArray.map(function (key) {
	    var keySet = { key: key };
	    if (typeof key === 'string') {
	      var keyString = key.toLowerCase().trim();
	      var matches = keyString.split(/\s?\+\s?/);
	      keySet = matches.length === 1 ? { key: _keys2['default'][keyString] } : {
	        key: _keys2['default'][matches.pop()],
	        modifiers: matches.map(function (modKey) {
	          return _keys.modifiers[modKey];
	        }).sort()
	      };
	    }
	    return keySet;
	  });
	}

	exports['default'] = parseKeys;
	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports) {

	// Counter being incremented. JS is single-threaded, so it'll Just Work™.
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = uuid;
	var __counter = 1;

	/**
	 * Returns a process-wide unique identifier.
	 */

	function uuid() {
	  return "uid-" + __counter++;
	}

	module.exports = exports["default"];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable no-use-before-define */
	/**
	 * @module eventHandlers
	 *
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports._onClick = _onClick;
	exports._onKeyDown = _onKeyDown;
	exports._shouldConsider = _shouldConsider;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	var _libDom_helpers = __webpack_require__(50);

	var _libDom_helpers2 = _interopRequireDefault(_libDom_helpers);

	var _libListeners = __webpack_require__(51);

	var _libListeners2 = _interopRequireDefault(_libListeners);

	var _store = __webpack_require__(44);

	var _store2 = _interopRequireDefault(_store);

	/**
	 * private
	 *
	 */

	/**
	 * _onClick
	 *
	 * @access private
	 * @param {object} event The click event object
	 * @param {object} event.target The DOM node from the click event
	 */

	function _onClick(_ref) {
	  var target = _ref.target;

	  _store2['default'].activate([].concat(_toConsumableArray(_store2['default'].getInstances())).reduce(_libDom_helpers2['default'].findContainerNodes(target), []).sort(_libDom_helpers2['default'].sortByDOMPosition).map(function (item) {
	    return item.instance;
	  }));
	}

	/**
	 * _onKeyDown: The keydown event callback
	 *
	 * @access private
	 * @param {object} event The keydown event object
	 * @param {number} event.which The key code (which) received from the keydown event
	 */

	function _onKeyDown(event) {
	  var forceConsider = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	  if (forceConsider || _shouldConsider(event)) {
	    var _ref2 = _store2['default'].findBindingForEvent(event) || {};

	    var fn = _ref2.fn;
	    var instance = _ref2.instance;

	    if (fn) {
	      fn.call(instance, event);
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * _shouldConsider: Conditions for proceeding with key event handling
	 *
	 * @access private
	 * @param {object} event The keydown event object
	 * @param {object} event.target The node origin of the event
	 * @param {string} event.target.tagName The name of the element tag
	 * @param {number} event.target.which The key pressed
	 * @return {boolean} Whether to continue procesing the keydown event
	 */

	function _shouldConsider(_ref3) {
	  var ctrlKey = _ref3.ctrlKey;
	  var tagName = _ref3.target.tagName;

	  return !~['INPUT', 'SELECT', 'TEXTAREA'].indexOf(tagName) || ctrlKey;
	}

	/**
	 * public
	 *
	 */

	/**
	 * onMount
	 *
	 * @access public
	 */
	function onMount(instance) {
	  // have to bump this to next event loop because component mounting routinely
	  // preceeds the dom click event that triggered the mount (wtf?)
	  setTimeout(function () {
	    return _store2['default'].activate(instance);
	  }, 0);
	  _libListeners2['default'].bindKeys(_onKeyDown);
	  _libListeners2['default'].bindClicks(_onClick);
	  _libDom_helpers2['default'].bindFocusables(instance, _store2['default'].activate);
	}

	/**
	 * onUnmount
	 *
	 * @access public
	 */
	function onUnmount(instance) {
	  _store2['default'].deleteInstance(instance);
	  if (_store2['default'].isEmpty()) {
	    _libListeners2['default'].unbindClicks(_onClick);
	    _libListeners2['default'].unbindKeys(_onKeyDown);
	  }
	}

	exports.onMount = onMount;
	exports.onUnmount = onUnmount;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module domHelpers
	 *
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _reactDom = __webpack_require__(1);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var focusableSelector = 'a[href], button, input, object, select, textarea, [tabindex]';

	/**
	 * bindFocusables: Find any focusable child elements of the component instance and
	 * add an onFocus handler to focus our keydown handlers on the parent component
	 * when user keys applies focus to the element.
	 *
	 * NOTE: One limitation of this right now is that if you tab out of the
	 * component, _focusedInstance will still be set until next click or mount or
	 * controlled focus.
	 *
	 * @access public
	 * @param {object} instance The key-bound component instance
	 * @param {callback} activateOnFocus The fn to fire when element is focused
	 */
	function bindFocusables(instance, activateOnFocus) {
	  if (document.querySelectorAll) {
	    var node = _reactDom2['default'].findDOMNode(instance);
	    if (node) {
	      var focusables = node.querySelectorAll(focusableSelector);
	      if (focusables.length) {
	        (function () {
	          var onFocus = function onFocus(element) {
	            var onFocusPrev = element.onfocus;
	            return function (event) {
	              activateOnFocus(instance);
	              if (onFocusPrev) onFocusPrev.call(element, event);
	            };
	          };
	          Array.prototype.slice.call(focusables).forEach(function (element) {
	            return element.onfocus = onFocus(element);
	          });
	        })();
	      }
	    }
	  }
	}

	/**
	 * findContainerNodes: Called by our click handler to find instances with nodes
	 * that are equal to or that contain the click target. Any that pass this test
	 * will be recipients of the next keydown event.
	 *
	 * @access public
	 * @param {object} target The click event.target DOM element
	 * @return {function} Reducer function
	 */
	function findContainerNodes(target) {
	  return function (memo, instance) {
	    try {
	      var node = _reactDom2['default'].findDOMNode(instance);
	      if (node && (node === target || node.contains(target))) {
	        memo.push({ instance: instance, node: node });
	      }
	    } finally {
	      return memo;
	    }
	  };
	}

	/**
	 * sortByDOMPosition: Called by our click handler to sort a list of instances
	 * according to least -> most nested. This is so that if multiple keybound
	 * instances have nodes that are ancestors of the click target, they will be
	 * sorted to let the instance closest to the click target get first dibs on the
	 * next key down event.
	 */
	function sortByDOMPosition(a, b) {
	  return a.node.compareDocumentPosition(b.node) === 10 ? 1 : -1;
	}

	exports['default'] = { bindFocusables: bindFocusables, findContainerNodes: findContainerNodes, sortByDOMPosition: sortByDOMPosition };
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports) {

	/**
	 * @module Listeners
	 *
	 */

	// flag for whether click listener has been bound to document
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var _clicksBound = false;

	// flag for whether keydown listener has been bound to document
	var _keysBound = false;

	var Listeners = {
	  /**
	   * _bindKeys
	   *
	   * @access public
	   */
	  bindKeys: function bindKeys(callback) {
	    if (!_keysBound) {
	      document.addEventListener('keydown', callback);
	      _keysBound = true;
	    }
	  },

	  /**
	   * unbindKeys
	   *
	   * @access public
	   */
	  unbindKeys: function unbindKeys(callback) {
	    if (_keysBound) {
	      document.removeEventListener('keydown', callback);
	      _keysBound = false;
	    }
	  },

	  /**
	   * bindClicks
	   *
	   * @access public
	   */
	  bindClicks: function bindClicks(callback) {
	    if (!_clicksBound) {
	      document.addEventListener('click', callback);
	      _clicksBound = true;
	    }
	  },

	  /**
	   * unbindClicks
	   *
	   * @access public
	   */
	  unbindClicks: function unbindClicks(callback) {
	    if (_clicksBound) {
	      document.removeEventListener('click', callback);
	      _clicksBound = false;
	    }
	  }
	};

	exports['default'] = Listeners;
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module methodWrapper
	 *
	 */
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _store = __webpack_require__(44);

	var _store2 = _interopRequireDefault(_store);

	var _event_handlers = __webpack_require__(49);

	/**
	 * _isReactKeyDown
	 *
	 * @access private
	 * @param {object} event The possibly synthetic event passed as an argument with
	 * the method invocation.
	 * @return {boolean}
	 */
	function _isReactKeyDown(event) {
	  return event && (typeof event === 'undefined' ? 'undefined' : _typeof(event)) === 'object' && event.nativeEvent instanceof window.KeyboardEvent && event.type === 'keydown';
	}

	/**
	 * methodWrapper
	 *
	 * @access public
	 * @param {object} args All arguments necessary for wrapping method
	 * @param {object} args.target The decorated class
	 * @param {object} args.descriptor Method descriptor
	 * @param {array} args.keys The array of keys bound to the given method
	 * @return {object} The method descriptor
	 */
	function methodWrapper(_ref) {
	  var target = _ref.target;
	  var descriptor = _ref.descriptor;
	  var keys = _ref.keys;

	  var fn = descriptor.value;

	  // if we haven't already created a binding for this class (via another
	  // decorated method), wrap these lifecycle methods.
	  if (!_store2['default'].getBinding(target)) {
	    (function () {
	      var componentDidMount = target.componentDidMount;
	      var componentWillUnmount = target.componentWillUnmount;

	      target.componentDidMount = function () {
	        (0, _event_handlers.onMount)(this);
	        if (componentDidMount) return componentDidMount.call(this);
	      };

	      target.componentWillUnmount = function () {
	        (0, _event_handlers.onUnmount)(this);
	        if (componentWillUnmount) return componentWillUnmount.call(this);
	      };
	    })();
	  }

	  // add this binding of keys and method to the target's bindings
	  _store2['default'].setBinding({ keys: keys, target: target, fn: fn });

	  descriptor.value = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var maybeEvent = args[0];

	    if (_isReactKeyDown(maybeEvent)) {
	      // proxy method in order to use @keydown as filter for keydown events coming
	      // from an actual onKeyDown binding (as identified by react's addition of
	      // 'nativeEvent' + type === 'keydown')
	      if (!maybeEvent.ctrlKey) {
	        // we already whitelist shortcuts with ctrl modifiers so if we were to
	        // fire it again here the method would trigger twice. see https://github.com/glortho/react-keydown/issues/38
	        return (0, _event_handlers._onKeyDown)(maybeEvent, true);
	      }
	    } else if (!maybeEvent || !(maybeEvent instanceof window.KeyboardEvent) || maybeEvent.type !== 'keydown') {
	      // if our first argument is a keydown event it is being handled by our
	      // binding system. if it's anything else, just pass through.
	      return fn.call.apply(fn, [this].concat(args));
	    }
	  };

	  return descriptor;
	}

	exports['default'] = methodWrapper;
	module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @module methodWrapperScoped
	 *
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _libMatch_keys = __webpack_require__(46);

	var _libMatch_keys2 = _interopRequireDefault(_libMatch_keys);

	var _libParse_keys = __webpack_require__(47);

	var _libParse_keys2 = _interopRequireDefault(_libParse_keys);

	/**
	 * _shouldTrigger
	 *
	 * @access private
	 * @param {object} thisProps Exsting props from the wrapped component
	 * @param {object} thisProps.keydown The namespaced state from the higher-order
	 * component (class_decorator)
	 * @param {object} nextProps The incoming props from the wrapped component
	 * @param {object} nextProps.keydown The namescaped state from the higher-order
	 * component (class_decorator)
	 * @param {array} keys The keys bound to the decorated method
	 * @return {boolean} Whether all tests have passed
	 */
	function _shouldTrigger(_ref, keydownNext) {
	  var keydownThis = _ref.keydown;

	  return keydownNext && keydownNext.event && !keydownThis.event;
	}

	/**
	 * methodWrapperScoped
	 *
	 * @access public
	 * @param {object} args All args necessary for decorating the method
	 * @param {object} args.target The decorated method's class object
	 * @param {object} args.descriptor The method's descriptor object
	 * @param {array} args.keys The key codes bound to the decorated method
	 * @return {object} The method's descriptor object
	 */
	function methodWrapperScoped(_ref2) {
	  var target = _ref2.target;
	  var descriptor = _ref2.descriptor;
	  var keys = _ref2.keys;
	  var componentWillReceiveProps = target.componentWillReceiveProps;

	  var fn = descriptor.value;
	  if (!keys) {
	    console.warn(fn + ': keydownScoped requires one or more keys');
	  } else {
	    (function () {
	      var keySets = (0, _libParse_keys2['default'])(keys);

	      // wrap the component's lifecycle method to intercept key codes coming down
	      // from the wrapped/scoped component up the view hierarchy. if new keydown
	      // event has arrived and the key codes match what was specified in the
	      // decorator, call the wrapped method.
	      target.componentWillReceiveProps = function (nextProps) {
	        var keydown = nextProps.keydown;

	        if (_shouldTrigger(this.props, keydown)) {
	          if (keySets.some(function (keySet) {
	            return (0, _libMatch_keys2['default'])({ keySet: keySet, event: keydown.event });
	          })) {
	            return fn.call(this, keydown.event);
	          }
	        }

	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        if (componentWillReceiveProps) return componentWillReceiveProps.call.apply(componentWillReceiveProps, [this, nextProps].concat(args));
	      };
	    })();
	  }

	  return descriptor;
	}

	exports['default'] = methodWrapperScoped;
	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    styles = __webpack_require__(55),
	    Button = __webpack_require__(56),
	    ICON = 'add';


	var ____Class6=React.PureComponent;for(var ____Class6____Key in ____Class6){if(____Class6.hasOwnProperty(____Class6____Key)){ButtonRegisterAdd[____Class6____Key]=____Class6[____Class6____Key];}}var ____SuperProtoOf____Class6=____Class6===null?null:____Class6.prototype;ButtonRegisterAdd.prototype=Object.create(____SuperProtoOf____Class6);ButtonRegisterAdd.prototype.constructor=ButtonRegisterAdd;ButtonRegisterAdd.__superConstructor__=____Class6;
	// кнопка создания документа в регистрах
	    function ButtonRegisterAdd(props) {
	        ____Class6.call(this,props);
	    }

	    Object.defineProperty(ButtonRegisterAdd.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick();
	    }});

	    Object.defineProperty(ButtonRegisterAdd.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            value: "Add", 
	            ref: "btnAdd", 
	            style: styles.button, 
	            show: this.props.show, 
	            disabled: this.props.disabled, 
	            onClick: function(e)  {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterAdd.propTypes = {
	    onClick: React.PropTypes.func.isRequired
	}


	ButtonRegisterAdd.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterAdd;

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    button: {
	        background: 'white',
	        margin: '2px'
	    },
	    icons: {
	        add: 'images/icons/add.png',
	        edit: 'images/icons/edit.png',
	        delete: 'images/icons/delete.png',
	        filter: 'images/icons/filter.png',
	        print: 'images/icons/print.png'
	    }
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    styles = __webpack_require__(55);


	var ____Classk=React.PureComponent;for(var ____Classk____Key in ____Classk){if(____Classk.hasOwnProperty(____Classk____Key)){Button[____Classk____Key]=____Classk[____Classk____Key];}}var ____SuperProtoOf____Classk=____Classk===null?null:____Classk.prototype;Button.prototype=Object.create(____SuperProtoOf____Classk);Button.prototype.constructor=Button;Button.__superConstructor__=____Classk;
	// кнопка создания документа в регистрах
	    function Button(props) {
	        ____Classk.call(this,props);
	        this.handleClick.bind(this);
	        this.state = {
	            disabled: this.props.disabled
	        }
	    }

	    Object.defineProperty(Button.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick();
	    }});

	    Object.defineProperty(Button.prototype,"render",{writable:true,configurable:true,value:function() {
	        // visibility
	        let propStyle  = ('style' in this.props)? this.props.style: {},
	            style = Object.assign({}, styles.button, {display: this.props.show ? 'inline' : 'none'}, propStyle)

	        return React.createElement("button", {
	            disabled: this.state.disabled, 
	            ref: "button", 
	            style: style, 
	            onClick: function(e)  {return this.handleClick(e);}.bind(this)}, 
	            this.props.children, 
	            this.props.value
	        )
	    }});

	;

	Button.propTypes = {
	    onClick: React.PropTypes.func.isRequired,
	    value: React.PropTypes.string.isRequired,
	    style: React.PropTypes.object
	}


	Button.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = Button;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    styles = __webpack_require__(55),
	    Button = __webpack_require__(56),
	    ICON = 'edit';


	var ____Class5=React.PureComponent;for(var ____Class5____Key in ____Class5){if(____Class5.hasOwnProperty(____Class5____Key)){ButtonRegisterEdit[____Class5____Key]=____Class5[____Class5____Key];}}var ____SuperProtoOf____Class5=____Class5===null?null:____Class5.prototype;ButtonRegisterEdit.prototype=Object.create(____SuperProtoOf____Class5);ButtonRegisterEdit.prototype.constructor=ButtonRegisterEdit;ButtonRegisterEdit.__superConstructor__=____Class5;
	// кнопка создания документа в регистрах
	    function ButtonRegisterEdit(props) {
	        ____Class5.call(this,props);
	    }

	    Object.defineProperty(ButtonRegisterEdit.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick();
	    }});

	    Object.defineProperty(ButtonRegisterEdit.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            value: "Edit", 
	            ref: "btnEdit", 
	            show: this.props.show, 
	            disabled: this.props.disabled, 
	            onClick: function(e)  {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterEdit.propTypes = {
	    onClick: React.PropTypes.func.isRequired,
	}


	ButtonRegisterEdit.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterEdit;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    styles = __webpack_require__(55),
	    Button = __webpack_require__(56),
	    ICON = 'delete';


	var ____Class7=React.PureComponent;for(var ____Class7____Key in ____Class7){if(____Class7.hasOwnProperty(____Class7____Key)){ButtonRegisterDelete[____Class7____Key]=____Class7[____Class7____Key];}}var ____SuperProtoOf____Class7=____Class7===null?null:____Class7.prototype;ButtonRegisterDelete.prototype=Object.create(____SuperProtoOf____Class7);ButtonRegisterDelete.prototype.constructor=ButtonRegisterDelete;ButtonRegisterDelete.__superConstructor__=____Class7;
	// кнопка создания документа в регистрах
	    function ButtonRegisterDelete(props) {
	        ____Class7.call(this,props);
	    }

	    Object.defineProperty(ButtonRegisterDelete.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick();
	    }});

	    Object.defineProperty(ButtonRegisterDelete.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            value: "Delete", 
	            ref: "btnDelete", 
	            show: this.props.show, 
	            disabled: this.props.disabled, 
	            onClick: function(e)  {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterDelete.propTypes = {
	    onClick: React.PropTypes.func.isRequired
	}


	ButtonRegisterDelete.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterDelete;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    styles = __webpack_require__(55),
	    Button = __webpack_require__(56),
	    ICON = 'print';


	var ____Class8=React.PureComponent;for(var ____Class8____Key in ____Class8){if(____Class8.hasOwnProperty(____Class8____Key)){ButtonRegisterPrint[____Class8____Key]=____Class8[____Class8____Key];}}var ____SuperProtoOf____Class8=____Class8===null?null:____Class8.prototype;ButtonRegisterPrint.prototype=Object.create(____SuperProtoOf____Class8);ButtonRegisterPrint.prototype.constructor=ButtonRegisterPrint;ButtonRegisterPrint.__superConstructor__=____Class8;
	// кнопка создания документа в регистрах
	    function ButtonRegisterPrint(props) {
	        ____Class8.call(this,props);
	    }

	    Object.defineProperty(ButtonRegisterPrint.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {
	        return this.props.onClick();
	    }});

	    Object.defineProperty(ButtonRegisterPrint.prototype,"render",{writable:true,configurable:true,value:function() {
	        return React.createElement(Button, {
	            ref: "btnPrint", 
	            value: "Print", 
	            show: this.props.show, 
	            disabled: this.props.disabled, 
	            onClick: function(e) {return this.handleClick(e);}.bind(this)}, 
	            React.createElement("image", {ref: "image", src: styles.icons[ICON]})
	        )
	    }});
	;

	ButtonRegisterPrint.propTypes = {
	    onClick: React.PropTypes.func.isRequired
	}


	ButtonRegisterPrint.defaultProps = {
	    disabled: false,
	    show: true
	};

	module.exports = ButtonRegisterPrint;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    styles = __webpack_require__(55),
	    Button = __webpack_require__(56),
	    ICON = 'filter';


	var ____Class9=React.PureComponent;for(var ____Class9____Key in ____Class9){if(____Class9.hasOwnProperty(____Class9____Key)){ButtonRegisterFilter[____Class9____Key]=____Class9[____Class9____Key];}}var ____SuperProtoOf____Class9=____Class9===null?null:____Class9.prototype;ButtonRegisterFilter.prototype=Object.create(____SuperProtoOf____Class9);ButtonRegisterFilter.prototype.constructor=ButtonRegisterFilter;ButtonRegisterFilter.__superConstructor__=____Class9;
	// кнопка создания документа в регистрах
	    function ButtonRegisterFilter(props) {
	        ____Class9.call(this,props);
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(4),
	    Button = __webpack_require__(56),
	    styles = __webpack_require__(62);

	var ____Classs=React.PureComponent;for(var ____Classs____Key in ____Classs){if(____Classs.hasOwnProperty(____Classs____Key)){ModalPage[____Classs____Key]=____Classs[____Classs____Key];}}var ____SuperProtoOf____Classs=____Classs===null?null:____Classs.prototype;ModalPage.prototype=Object.create(____SuperProtoOf____Classs);ModalPage.prototype.constructor=ModalPage;ModalPage.__superConstructor__=____Classs;
	    function ModalPage(props) {
	        ____Classs.call(this,props);
	        this.handleBtnClick.bind(this);
	        this.closeModalPage.bind(this);
	        this.state = {
	            show: this.props.show
	        }
	    }

	    Object.defineProperty(ModalPage.prototype,"closeModalPage",{writable:true,configurable:true,value:function() {
	        this.setState({show:false});
	    }});

	    Object.defineProperty(ModalPage.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	        this.setState({show: nextProps.show});
	    }});

	    Object.defineProperty(ModalPage.prototype,"handleBtnClick",{writable:true,configurable:true,value:function(btnEvent) {
	        this.props.modalPageBtnClick(btnEvent);
	    }});

	    Object.defineProperty(ModalPage.prototype,"render",{writable:true,configurable:true,value:function() {
	        // если передан атрибу modalObjects = ['btnOk','btnCancel']
	        let hideBtnOk = this.props.modalObjects.indexOf('btnOk') == -1 ? false : true, // управление кнопкой Ок
	            hideBtnCancel = this.props.modalObjects.indexOf('btnCancel') == -1 ? false : true, // управление кнопкой Cancel
	            displayModal = this.state.show ? 'flex': 'none' ,
	            containerStyle = Object.assign({}, styles.container, {display: displayModal});

	        return (
	            React.createElement("div", {ref: "container", style: containerStyle}, 
	                React.createElement("div", {style: styles.modalPage, ref: "modalPageContainer"}, 
	                    React.createElement("div", {style: styles.header, ref: "modalPageHeader"}, 
	                        React.createElement("span", {ref: "headerName", style: styles.headerName}, " ", this.props.modalPageName, " "), 
	                        React.createElement(Button, {style: styles.buttonClose, ref: "btnClose", onClick: this.closeModalPage.bind(this), value: "x"})
	                    ), 
	                    React.createElement("div", {style: styles.modalPageContent, ref: "modalPageContent"}, 
	                        this.props.children
	                    ), 

	                    React.createElement("div", {style: styles.modalFooter, ref: "modalPageButtons"}, 
	                        hideBtnOk ?
	                            React.createElement(Button, {
	                                ref: "btnOk", 
	                                value: "Ok", 
	                                style: styles.modalPageButtons, 
	                                width: ('width' in styles.modalPageButtons)? styles.modalPageButtons.width: null, 
	                                height: ('height' in styles.modalPageButtons)? styles.modalPageButtons.height: null, 
	                                onClick: this.handleBtnClick.bind(this, 'Ok'), 
	                                id: "btnOk"}
	                            ) : null, 
	                        
	                        React.createElement("div", {style: styles.buttonsSeparator}), 
	                        hideBtnCancel ?
	                            React.createElement(Button, {
	                                ref: "btnCancel", 
	                                value: "Cancel", 
	                                width: ('width' in styles.modalPageButtons)? styles.modalPageButtons.width: null, 
	                                height: ('height' in styles.modalPageButtons)? styles.modalPageButtons.height: null, 
	                                onClick: this.handleBtnClick.bind(this, 'Cancel'), 
	                                className: "modalPageButtons", 
	                                id: "btnCancel"}
	                            ) : null
	                        
	                    )
	                )
	            )
	        )
	    }});


	ModalPage.propTypes = {
	    modalPageName: React.PropTypes.string.isRequired,
	    modalPageBtnClick: React.PropTypes.func.isRequired,
	    show: React.PropTypes.bool.isRequired
	}


	ModalPage.defaultProps = {
	    modalPageName: 'defaulName',
	    modalObjects: ['btnOk', 'btnCancel']
	}

	module.exports = ModalPage;

/***/ },
/* 62 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    container: {
	        position: 'fixed',
	        top: '0',
	        left: 0,
	        right: 0,
	        bottom: 0,
	        backgroundColor: 'rgba(255, 255, 255, 0.25)'
	    },
	    modalPage: {
	        position: 'absolute',
	        border: '1px solid black',
	        width: '50%',
	        height: 'auto',
	        left: '10%',
	        top: '0',
	        background: 'white',
	        margin: '8px',
	        overflow: 'auto',
	        borderRadius: '4px',
	        outline: 'none',
	        display: 'flex',
	        flexDirection: 'column'
	    },
	    modalPageContent: {
	        padding: '10px',
	        margin: '10px'
	    },
	    header: {
	        height: '30px',
	        width: '100%',
	        border: '1px solid darkgray',
	        background: 'blue',
	        display: 'flex',
	        justifyContent: 'space-between'
	    },

	    headerName: {
	        color: 'white',
	        alignSelf: 'center',
	        marginLeft: '10px'
	    },

	    modalFooter: {
	        alignSelf: 'center',
	        display: 'flex'
	    },

	    modalPageButtons: {
	        height: '30px',
	        width: '100px'
	    },

	    buttonsSeparator: {
	        width: '10px'
	    },

	    buttonClose: {
	        borderRadius: '50%'
	    }

	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(4),
	    ModalPage = __webpack_require__(25);

	const ModalPageDelete  = function(props) {
	    let modalObjects = ['btnOk', 'btnCancel'];

	    return React.createElement(ModalPage, {
	        modalPageBtnClick: props.modalPageBtnClick, 
	        modalPageName: "Delete document"
	    }, 
	        React.createElement("div", {style: {padding:50}}, 
	            React.createElement("span", null, " Удалить документ ? ")
	        )
	        )
	}

	module.exports = ModalPageDelete ;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(4),
	    ModalPage = __webpack_require__(25);

	const ModalPageDelete  = function(props) {
	    let systemMessage = props.systemMessage ? props.systemMessage: '',
	        modalObjects = ['btnOk'];

	    return React.createElement(ModalPage, {
	        modalPageBtnClick: props.modalPageBtnClick, 
	        modalPageName: "Warning!", 
	        modalObjects: modalObjects

	    }, 
	        React.createElement("div", {style: {padding:50}}, 
	            React.createElement("span", null, " ", systemMessage, " ")
	        )
	    )
	}

	module.exports = ModalPageDelete ;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    styles = __webpack_require__(66);

	var ____Class2=React.PureComponent;for(var ____Class2____Key in ____Class2){if(____Class2.hasOwnProperty(____Class2____Key)){DataList[____Class2____Key]=____Class2[____Class2____Key];}}var ____SuperProtoOf____Class2=____Class2===null?null:____Class2.prototype;DataList.prototype=Object.create(____SuperProtoOf____Class2);DataList.prototype.constructor=DataList;DataList.__superConstructor__=____Class2;
	    function DataList(props) {
	        ____Class2.call(this,props);

	        let idx = 0;

	        if (props.value) {
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
	            clicked: idx,
	            value: props.value
	        };
	    }

	    Object.defineProperty(DataList.prototype,"render",{writable:true,configurable:true,value:function() {
	        let data = this.props.data,
	            clickedItem = this.state.clicked;

	        return (
	            React.createElement("div", {ref: "datalist"}, 
	                React.createElement("ul", {ref: "datalist-ul"}, 
	                    
	                        data.map(function(item, index)  {
	                            let style = {};

	                            if (clickedItem == index) {
	                                style = Object.assign({}, styles.docList, styles.focused)
	                            } else {
	                                style = Object.assign({}, styles.docList);
	                            }

	                            let componentId = 'li-' + index;

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
	            clicked: idx,
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
	    value: '',
	    bindDataField: 'id'
	}

	module.exports = DataList;

/***/ },
/* 66 */
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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const sideBarStyles = __webpack_require__(68),
	    React = __webpack_require__(4);


	var ____Class4=React.Component;for(var ____Class4____Key in ____Class4){if(____Class4.hasOwnProperty(____Class4____Key)){SideBarContainer[____Class4____Key]=____Class4[____Class4____Key];}}var ____SuperProtoOf____Class4=____Class4===null?null:____Class4.prototype;SideBarContainer.prototype=Object.create(____SuperProtoOf____Class4);SideBarContainer.prototype.constructor=SideBarContainer;SideBarContainer.__superConstructor__=____Class4;
	    function SideBarContainer(props) {
	        ____Class4.call(this,props);

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
/* 68 */
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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const styles = __webpack_require__(70),
	    React = __webpack_require__(4);

	var ____Class3=React.Component;for(var ____Class3____Key in ____Class3){if(____Class3.hasOwnProperty(____Class3____Key)){ToolBarContainer[____Class3____Key]=____Class3[____Class3____Key];}}var ____SuperProtoOf____Class3=____Class3===null?null:____Class3.prototype;ToolBarContainer.prototype=Object.create(____SuperProtoOf____Class3);ToolBarContainer.prototype.constructor=ToolBarContainer;ToolBarContainer.__superConstructor__=____Class3;
	    function ToolBarContainer(props) {
	        ____Class3.call(this,props);
	    }

	    Object.defineProperty(ToolBarContainer.prototype,"render",{writable:true,configurable:true,value:function() {
	        return (
	            React.createElement("div", {id: "toolBarContainer", style: styles.toolBarContainerStyle}, 
	                    this.props.children
	            )
	        );
	    }});


	module.exports = ToolBarContainer;

/***/ },
/* 70 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    toolBarContainerStyle: {
	        display: 'flex',
	        width: '100%',
	        height: '30px',
	        border: '1px solid black',
	        justifyContent: 'flex-end',
	        marginRight: '5px'
	    }
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var flux = __webpack_require__(5);

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
	            console.log('button Lisa cliked new! ' + this.docsGrid);
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
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtcmVnaXN0ZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YS1ncmlkL2RhdGEtZ3JpZC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhLWdyaWQvZGF0YS1ncmlkLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvYXJyYXkuZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9kZWNvcmF0b3JzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2RlY29yYXRvcnMvY2xhc3NfZGVjb3JhdG9yLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L3N0b3JlLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9rZXlzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9tYXRjaF9rZXlzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9wYXJzZV9rZXlzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi91dWlkLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2V2ZW50X2hhbmRsZXJzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9kb21faGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvbGlzdGVuZXJzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qta2V5ZG93bi9kaXN0L2RlY29yYXRvcnMvbWV0aG9kX2RlY29yYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWtleWRvd24vZGlzdC9kZWNvcmF0b3JzL21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1hZGQvYnV0dG9uLXJlZ2lzdGVyLWFkZC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItZGVsZXRlL2J1dHRvbi1yZWdpc3Rlci1kZWxldGUuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1wcmludC9idXR0b24tcmVnaXN0ZXItcHJpbnQuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1maWx0ZXIvYnV0dG9uLXJlZ2lzdGVyLWZpbHRlci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxQYWdlLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2Utc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxQYWdlRGVsZXRlLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFsUGFnZUluZm8uanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YWxpc3QvZGF0YWxpc3QuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YWxpc3QvZGF0YWxpc3Qtc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy90b29sYmFyLWNvbnRhaW5lci90b29sYmFyLWNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy90b29sYmFyLWNvbnRhaW5lci90b29sYmFyLWNvbnRhaW5lci1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvc3RvcmVzL2RvY3Nfc3RvcmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLy8g0L3RgNGD0LfQuNC8INC60L7QvNC/0L7QvdC10L3RgtGLXG5cbi8vdmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG4vLyDRgdC+0LfQtNCw0LXQvCDQvtC60LvQsNGB0YEgLSDQtNC10YDQttCw0YLQtdC70Ywg0YHQvtGB0YLQvtGP0L3QuNC5XG5cbnZhciBQYXJlbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1yZWdpc3Rlci5qc3gnKTtcblxuLy8g0LTQsNC90L3Ri9C1INC00LvRjyDRhdGA0LDQvdC40LvQuNGJ0LBcbmxvY2FsU3RvcmFnZVsnZG9jc1N0b3JlJ10gPSBzdG9yZURhdGE7XG5zdG9yZURhdGEgPSBKU09OLnBhcnNlKHN0b3JlRGF0YSk7XG4vL2NvbnNvbGUubG9nKCdzdG9yZURhdGEgZnJvbSBkb2NzJywgc3RvcmVEYXRhKTtcblJlYWN0RE9NLnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KFBhcmVudCwgeyBpZDogJ2dyaWQnLCBjb21wb25lbnRzOiBzdG9yZURhdGEgfSwgJ9Ci0YPRgiDQsdGD0LTRg9GCINC60L7QvNC/0L7QvdC10L3RgtGLJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkJykpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvZG9jcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XHJcbi8vINCz0YDRg9C30LjQvCDQutC+0LzQv9C+0L3QtdC90YLRi1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIERhdGFHcmlkID0gcmVxdWlyZSgnLi9kYXRhLWdyaWQvZGF0YS1ncmlkLmpzeCcpLFxyXG4gICAgQnRuQWRkID0gcmVxdWlyZSgnLi9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWFkZC9idXR0b24tcmVnaXN0ZXItYWRkLmpzeCcpLFxyXG4gICAgQnRuRWRpdCA9IHJlcXVpcmUoJy4vYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1lZGl0L2J1dHRvbi1yZWdpc3Rlci1lZGl0LmpzeCcpLFxyXG4gICAgQnRuRGVsZXRlID0gcmVxdWlyZSgnLi9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWRlbGV0ZS9idXR0b24tcmVnaXN0ZXItZGVsZXRlLmpzeCcpLFxyXG4gICAgQnRuUHJpbnQgPSByZXF1aXJlKCcuL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItcHJpbnQvYnV0dG9uLXJlZ2lzdGVyLXByaW50LmpzeCcpLFxyXG4gICAgQnRuRmlsdGVyID0gcmVxdWlyZSgnLi9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWZpbHRlci9idXR0b24tcmVnaXN0ZXItZmlsdGVyLmpzeCcpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi9tb2RhbHBhZ2UvbW9kYWxQYWdlLmpzeCcpLFxyXG4gICAgTW9kYWxQYWdlRGVsZXRlID0gcmVxdWlyZSgnLi9tb2RhbFBhZ2VEZWxldGUuanN4JyksXHJcbiAgICBNb2RhbFBhZ2VJbmZvID0gcmVxdWlyZSgnLi9tb2RhbFBhZ2VJbmZvLmpzeCcpLFxyXG4gICAgRGF0YUxpc3QgPSByZXF1aXJlKCcuL2RhdGFsaXN0L2RhdGFsaXN0LmpzeCcpLFxyXG4gICAgU2lkZWJhciA9IHJlcXVpcmUoJy4vc2lkZWJhci9zaWRlYmFyLmpzeCcpLFxyXG4gICAgVG9vbGJhckNvbnRhaW5lciA9IHJlcXVpcmUoJy4vdG9vbGJhci1jb250YWluZXIvdG9vbGJhci1jb250YWluZXIuanN4JylcclxuXHJcbmxldCBteUNvbXBvbmVudHMgPSBbXTtcclxuXHJcbmlmICghdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIC8vINCx0LXRgNC10Lwg0LTQsNC90L3Ri9C1INGBINC70L7QutCw0LvRjNC90L7Qs9C+INGF0YDQsNC90LjQu9C40YnQsFxyXG4gICAgbXlDb21wb25lbnRzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbJ2RvY3NTdG9yZSddKTtcclxufVxyXG5cclxuLy8gQ3JlYXRlIGEgc3RvcmVcclxudmFyIGRvY3NTdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3Jlcy9kb2NzX3N0b3JlLmpzJyk7XHJcblxyXG4vLyDRgdC+0LfQtNCw0LXQvCDQutC70LDRgdGBIC0g0LTQtdGA0LbQsNGC0LXQu9GMINGB0L7RgdGC0L7Rj9C90LjQuVxyXG52YXIgUGFyZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZGlzcGxheU5hbWU6ICdQYXJlbnQnLFxyXG5cclxuICAgIGZpbHRlckRhdGE6IFsnYnRuT2snLCAnYnRuQ2FuY2VsJ10sIC8vINC80LDRgdGB0LjQsiDQvtCx0YrQtdC60YLQvtCyLCDQutGD0LTQsCDQt9Cw0L/QuNGI0LXQvCDQv9Cw0YDQsNC80LXRgtGA0Ysg0LTQu9GPINGE0LjQu9GM0YLRgNCw0YbQuNC4IEB0b2RvINCy0YvQvdC10YHRgtC4INCy0YHQtSDQsiDQvtGC0LTQtdC70YzQvdGL0Lkg0LrQvtC80L/QvtC90LXRgiDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40LhcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAvLyDRgyDQutCw0LbQtNC+0LPQviDQutC+0LzQv9C+0L3QtdC90YLQsCDRgdCy0L7QuSDQvtCx0YrQtdC60YJcclxuICAgICAgICAgICAgY29tcG9uZW50czogdGhpcy5wcm9wcy5jb21wb25lbnRzLCAvLyBAdG9kbyDQstGL0L3QtdGB0YLQuCDQsiDQvtGC0LTQtdC70YzQvdGL0Lkg0YTQsNC50Lsg0LrQvtC80L/QvtC90LXQvdGC0LBcclxuICAgICAgICAgICAgZ2V0RmlsdGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgZ2V0RGVsZXRlTW9kYWxQYWdlOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd1N5c3RlbU1lc3NhZ2U6IGZhbHNlLFxyXG4gICAgICAgICAgICBhY3RpdlJvd0lkOiAwXHJcblxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyDRgdC+0LfQtNCw0LXQvCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQvdCwINC40LfQvNC10L3QtdC90LjQtSDQtNCw0L3QvdGFXHJcbiAgICAgICAgZG9jc1N0b3JlLm9uKCdjaGFuZ2U6ZGF0YScsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDQtNCw0L3QvdGL0LUg0LjQt9C80LXQvdC40LvQuNGB0YwsINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Y29tcG9uZW50czogZG9jc1N0b3JlLmRhdGF9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1INGB0YLRgNC+0LrQuCDQs9GA0LjQtNCwXHJcbiAgICAgICAgZG9jc1N0b3JlLm9uKCdjaGFuZ2U6ZG9jc0dyaWQnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2FjdGl2Um93SWQ6IGRvY3NTdG9yZS5kb2NzR3JpZH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0YHQuNGB0YLQtdC80L3Ri9C5INC40LfQstC10YnQtdC90LjQtVxyXG4gICAgICAgIGRvY3NTdG9yZS5vbignY2hhbmdlOnN5c3RlbU1lc3NhZ2UnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgIGxldCBzeXN0ZW1NZXNzYWdlU3RhdHVzID0gbmV3VmFsdWUgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3Nob3dTeXN0ZW1NZXNzYWdlOiBzeXN0ZW1NZXNzYWdlU3RhdHVzfSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g0L/QvtC60LDQttC10Lwg0LTQsNC90L3Ri9C1XHJcblxyXG4gICAgICAgIGxldCBsYXN0Q29tcG9uZW50ID0gbG9jYWxTdG9yYWdlWydkb2NzTGlzdCddO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ2RhdGFDaGFuZ2UnLCB0aGlzLnByb3BzLmNvbXBvbmVudHMpO1xyXG4gICAgICAgIGlmIChsYXN0Q29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ2RvY3NMaXN0Q2hhbmdlJywgbGFzdENvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmaW5kQ29tcG9uZW50OiBmdW5jdGlvbiAoY29tcG9uZW50TmFtZSkge1xyXG4gICAgICAgIC8vINCy0LXRgNC90LXRgiDQtNCw0L3QvdGL0LUg0LrQvtC80L/QvtC90LXQvdGC0LAg0L/QviDQtdCz0L4g0L3QsNC30LLQsNC90LjRjlxyXG4gICAgICAgIGxldCBjb21wb25lbnRzID0gdGhpcy5zdGF0ZS5jb21wb25lbnRzLFxyXG4gICAgICAgICAgICBjb21wb25lbnREYXRhID0gW107XHJcblxyXG4gICAgICAgIGlmIChjb21wb25lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29tcG9uZW50RGF0YSA9IGNvbXBvbmVudHMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uYW1lID09IGNvbXBvbmVudE5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnREYXRhO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnRuRmlsdGVyQ2xpY2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDQvtGC0LrRgNC+0LXRgiDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L4g0YEg0L/QvtC70Y/QvNC4INC00LvRjyDRhNC40LvRjNGC0YDQsNGG0LjQuFxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dldEZpbHRlcjogdHJ1ZX0pXHJcbiAgICB9LFxyXG5cclxuICAgIGJ0bkRlbGV0ZUNsaWNrOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dldERlbGV0ZU1vZGFsUGFnZTogdHJ1ZX0pXHJcbiAgICB9LFxyXG5cclxuICAgIGJ0bkFkZENsaWNrOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC60LvQuNC6INC60L3QvtC/0LrQuCBcItCU0L7QsdCw0LLQuNGC0YxcIlxyXG4gICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdBZGQnKTtcclxuICAgIH0sXHJcblxyXG4gICAgYnRuRWRpdENsaWNrOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC60LvQuNC6INC60L3QvtC/0LrQuCBcItCY0LfQvNC10L3QuNGC0YxcIlxyXG4gICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdFZGl0Jyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGJ0blByaW50Q2xpY2s6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0LrQu9C40Log0LrQvdC+0L/QutC4IFwi0JjQt9C80LXQvdC40YLRjFwiXHJcbiAgICAgICAgLy8g0LLRi9C30L7QstC10Lwg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGE0LvQsNC60YHQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ1ByaW50Jyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBteUxpc3RWYWx1ZSA9ICcnLFxyXG4gICAgICAgICAgICBteUxpc3REYXRhID0gdGhpcy5maW5kQ29tcG9uZW50KCdkb2NzTGlzdCcpIHx8IFtdO1xyXG5cclxuICAgICAgICBpZiAobXlMaXN0RGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG15TGlzdFZhbHVlID0gbXlMaXN0RGF0YVswXS52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBmaWx0ZXJDb21wb25lbnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZ2V0RmlsdGVyKSB7XHJcbiAgICAgICAgICAgIGZpbHRlckNvbXBvbmVudCA9IHRoaXMuZ2V0RmlsdGVyRmllbGRzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobXlMaXN0RGF0YS5sZW5ndGggPiAwICYmIG15TGlzdERhdGFbMF0uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG15TGlzdERhdGEgPSBteUxpc3REYXRhWzBdLmRhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZG9jQ29udGFpbmVyU3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICBmbGV4RmxvdzogJ3JvdyB3cmFwJyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJzg3JScsXHJcbiAgICAgICAgICAgICAgICBib3JkZXI6ICczcHggc29saWQgYnJvd24nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRvY1dyYXBwZXJTdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgZmxleDogJzEgMTAwJScsXHJcbiAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnc3RyZXRjaCcsXHJcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93J1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgbXlHcmlkID0gdGhpcy5maW5kQ29tcG9uZW50KCdkb2NzR3JpZCcpIHx8IFtdLFxyXG4gICAgICAgICAgICBteUdyaWRDb2x1bXMgPSBbXSxcclxuICAgICAgICAgICAgbXlHcmlkRGF0YSA9IFtdLFxyXG4gICAgICAgICAgICBzeXN0ZW1NZXNzYWdlID0gZmx1eC5zdG9yZXMuZG9jc1N0b3JlLnN5c3RlbU1lc3NhZ2U7XHJcblxyXG4gICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsNC70LjRh9C40LUg0LTQsNC90L3Ri9GFLCDQtdGB0LvQuCDQtdGB0YLRjCDQv9GA0L7Qv9C40YXQvdC10Lwg0LrQvtC80L/QvtC90LXQvdGC0LDQvFxyXG4gICAgICAgIGlmIChteUdyaWQubGVuZ3RoID4gMCAmJiBteUdyaWRbMF0uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG15R3JpZENvbHVtcyA9IG15R3JpZFswXS5kYXRhWzBdLmNvbHVtbnM7XHJcbiAgICAgICAgICAgIG15R3JpZERhdGEgPSBteUdyaWRbMF0uZGF0YVswXS5kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0L/QvtC70YPRh9C40Lwg0L/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDQutC90L7Qv9C+0Log0YPQv9GA0LDQstC70LXQvdC40Y8sINCy0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINCw0LrRgtC40LLQvdC+0Lkg0YHRgtGA0L7QutC4XHJcbiAgICAgICAgbGV0IHRvb2xiYXJQYXJhbXMgPSB0aGlzLnByZXBhcmVQYXJhbXNGb3JUb29sYmFyKCk7XHJcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJwYXJlbnREaXZcIn0sIFxyXG5cclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcImRvY0NvbnRhaW5lclwiLCBzdHlsZTogZG9jQ29udGFpbmVyU3R5bGV9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXJDb250YWluZXIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5BZGQsIHtvbkNsaWNrOiB0aGlzLmJ0bkFkZENsaWNrLCBzaG93OiB0b29sYmFyUGFyYW1zWydidG5BZGQnXS5zaG93LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZTogdG9vbGJhclBhcmFtc1snYnRuQWRkJ10uZGlzYWJsZWR9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ0bkVkaXQsIHtvbkNsaWNrOiB0aGlzLmJ0bkVkaXRDbGljaywgc2hvdzogdG9vbGJhclBhcmFtc1snYnRuRWRpdCddLnNob3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZTogdG9vbGJhclBhcmFtc1snYnRuRWRpdCddLmRpc2FibGVkfSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdG5EZWxldGUsIHtvbkNsaWNrOiB0aGlzLmJ0bkRlbGV0ZUNsaWNrLCBzaG93OiB0b29sYmFyUGFyYW1zWydidG5EZWxldGUnXS5zaG93LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZTogdG9vbGJhclBhcmFtc1snYnRuRGVsZXRlJ10uZGlzYWJsZWR9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ0blByaW50LCB7b25DbGljazogdGhpcy5idG5QcmludENsaWNrLCBzaG93OiB0b29sYmFyUGFyYW1zWydidG5QcmludCddLnNob3csIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGU6IHRvb2xiYXJQYXJhbXNbJ2J0blByaW50J10uZGlzYWJsZWR9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ0bkZpbHRlciwge29uQ2xpY2s6IHRoaXMuYnRuRmlsdGVyQ2xpY2t9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBkb2NXcmFwcGVyU3R5bGV9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlYmFyLCB7d2lkdGg6IFwiMzAlXCIsIHRvb2xiYXI6IHRydWUsIHJlZjogXCJsaXN0LXNpZGViYXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhTGlzdCwge2RhdGE6IG15TGlzdERhdGEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9jc0xpc3RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGFGaWVsZDogXCJrb29kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBteUxpc3RWYWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2VBY3Rpb246IFwiZG9jc0xpc3RDaGFuZ2VcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2lkZWJhciwge3dpZHRoOiBcIjEwMCVcIiwgdG9vbGJhcjogZmFsc2UsIHJlZjogXCJncmlkLXNpZGViYXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERhdGFHcmlkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWREYXRhOiBteUdyaWREYXRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZENvbHVtbnM6IG15R3JpZENvbHVtcywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlQWN0aW9uOiBcImRvY3NHcmlkQ2hhbmdlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiYXBpXCJ9KSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiKFwiLCBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VCdG5DbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZU5hbWU6IFwiRmlsdGVyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0aGlzLnN0YXRlLmdldEZpbHRlcn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJDb21wb25lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLCBcIilcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZ2V0RGVsZXRlTW9kYWxQYWdlID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxQYWdlRGVsZXRlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VEZWxCdG5DbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSkgOiBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zaG93U3lzdGVtTWVzc2FnZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2VJbmZvLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlSW5mb0J0bkNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeXN0ZW1NZXNzYWdlOiBzeXN0ZW1NZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSkgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEdyaWRDb21wb25lbnQ6IGZ1bmN0aW9uKCkgIHtcclxuICAgICAgICBsZXQgbXlHcmlkID0gdGhpcy5maW5kQ29tcG9uZW50KCdkb2NzR3JpZCcpIHx8IFtdLFxyXG4gICAgICAgICAgICBteUdyaWRDb2x1bXMgPSBbXSxcclxuICAgICAgICAgICAgbXlHcmlkRGF0YSA9IFtdLFxyXG4gICAgICAgICAgICBzeXN0ZW1NZXNzYWdlID0gZmx1eC5zdG9yZXMuZG9jc1N0b3JlLnN5c3RlbU1lc3NhZ2U7XHJcblxyXG4gICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsNC70LjRh9C40LUg0LTQsNC90L3Ri9GFLCDQtdGB0LvQuCDQtdGB0YLRjCDQv9GA0L7Qv9C40YXQvdC10Lwg0LrQvtC80L/QvtC90LXQvdGC0LDQvFxyXG4gICAgICAgIGlmIChteUdyaWQubGVuZ3RoID4gMCAmJiBteUdyaWRbMF0uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG15R3JpZENvbHVtcyA9IG15R3JpZFswXS5kYXRhWzBdLmNvbHVtbnM7XHJcbiAgICAgICAgICAgIG15R3JpZERhdGEgPSBteUdyaWRbMF0uZGF0YVswXS5kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJncmlkVGFibGVcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YUdyaWQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZERhdGE6IG15R3JpZERhdGEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkQ29sdW1uczogbXlHcmlkQ29sdW1zLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2VBY3Rpb246IFwiZG9jc0dyaWRDaGFuZ2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJhcGlcIn0pXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZ2V0RmlsdGVyID9cclxuICAgICAgICAgICAgICAgICAgICAoUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2UsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlQnRuQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VOYW1lOiBcIkZpbHRlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgXCIgXCIsIGZpbHRlckNvbXBvbmVudCwgXCIgXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbCwgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZ2V0RGVsZXRlTW9kYWxQYWdlID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxQYWdlRGVsZXRlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VEZWxCdG5DbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSkgOiBudWxsLCBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zaG93U3lzdGVtTWVzc2FnZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZUluZm8sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUluZm9CdG5DbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeXN0ZW1NZXNzYWdlOiBzeXN0ZW1NZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApKSA6IG51bGxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgfS5iaW5kKHRoaXMpLFxyXG5cclxuICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiBmdW5jdGlvbiAoYnRuRXZlbnQpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQtNC70Y8g0LrQvdC+0L/QutC4INGE0LjQu9GM0YLRgNCw0YbQuNC4XHJcbiAgICAgICAgbGV0IGZpbHRlclN0cmluZyA9ICcnO1xyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIC8vINGB0L7QsdC40YDQtdC8INC00LDQvdC90YvQtSDQsiDQvtCx0YrQtdC60YIg0Lgg0LLQtdGA0L3QtdC8INC90LAg0YTQvtGA0LzRg1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEgPSB0aGlzLmZpbHRlckRhdGEubWFwKGZ1bmN0aW9uKHJvdykgIHtcclxuICAgICAgICAgICAgICAgIHJvdy52YWx1ZSA9IHRoaXMucmVmc1tyb3cucmVmc10udmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJvdy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIChmaWx0ZXJTdHJpbmcubGVuZ3RoID4gMCA/IFwiIGFuZCBcIiA6IFwiIHdoZXJlIFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJvdy50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgaWxpa2UgJyVcIiArIHJvdy52YWx1ZSArIFwiJSdcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgcm93LnJlZnMgKyBcIiBpbGlrZSAnXCIgKyByb3cudmFsdWUgKyBcIiUnXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSBmaWx0ZXJTdHJpbmcgKyByb3cucmVmcyArIFwiID0gJ1wiICsgcm93LnZhbHVlICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgPSBcIiArIHJvdy52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnRlZ2VyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgPSBcIiArIHJvdy52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NxbFdoZXJlQ2hhbmdlJywgZmlsdGVyU3RyaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z2V0RmlsdGVyOiBmYWxzZX0pXHJcbiAgICB9LFxyXG5cclxuICAgIG1vZGFsUGFnZURlbEJ0bkNsaWNrOmZ1bmN0aW9uKGJ0bkV2ZW50KSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LLRi9C30L7QstCwINC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwINGD0LTQsNC70LXQvdC40Y9cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtnZXREZWxldGVNb2RhbFBhZ2U6IGZhbHNlfSk7XHJcblxyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignRGVsZXRlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgbW9kYWxQYWdlSW5mb0J0bkNsaWNrOmZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQstGL0LfQvtCy0LAg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LAg0YHQuNGB0YLQtdC80L3QvtCz0L4g0YHQvtC+0LHRidC10L3QuNGPXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd1N5c3RlbU1lc3NhZ2U6IGZhbHNlfSk7XHJcbiAgICAgICAgLy8g0LLRi9C30L7QstC10Lwg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGE0LvQsNC60YHQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ3N5c3RlbU1lc3NhZ2VDaGFuZ2UnLCBudWxsKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEZpbHRlckZpZWxkczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIEB0b2RvINCy0YvQvdC10YHRgtC4INCyINC+0YLQtNC10LvRjNC90YvQuSDQvNC+0LTRg9C70YxcclxuICAgICAgICAvLyDRgdC+0LfQtNCw0YHRgiDQuNC3INC/0L7Qu9C60Lkg0LPRgNC40LTQsCDQutC+0LzQv9C+0L3QtdC90YLRiyDQtNC70Y8g0YTQvtGA0LzQuNGA0L7QstCw0L3QuNGPINGD0YHQu9C+0LLQuNC5INGE0LjQu9GM0YLRgNCw0YbQuNC4XHJcbiAgICAgICAgdmFyIGdyaWRDb21wb25lbnRzID0gZG9jc1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIGdyaWREYXRhID0gW10sXHJcbiAgICAgICAgICAgIHByZXZpb3NGaWx0ZXIgPSB0aGlzLmZpbHRlckRhdGEsXHJcbiAgICAgICAgICAgIGZpbHRlckZpZWxkcztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkQ29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZ3JpZENvbXBvbmVudHNbaV1bJ25hbWUnXSA9PSAnZG9jc0dyaWQnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQuNGJ0LXQvCDQv9C+0LvQtSBjb2x1bW5zXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZCBpbiBncmlkQ29tcG9uZW50c1tpXS5kYXRhWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkID09ICdjb2x1bW5zJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkRGF0YSA9IGdyaWRDb21wb25lbnRzW2ldLmRhdGFbMF0uY29sdW1ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoZ3JpZERhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhID0gW107IC8vINC+0LHQvdGD0LvQuNC8INC80LDRgdGB0LjQslxyXG4gICAgICAgICAgICBmaWx0ZXJGaWVsZHMgPVxyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEubWFwKGZ1bmN0aW9uKHJvdywgaW5kZXgpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudFR5cGUgPSAndGV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudE9iamVrdFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXZpb3NGaWx0ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LjRidC10LwgXCLRgdGC0LDRgNC+0LVcIiDQt9C90LDRh9C10L3QuNC1INGE0LjQu9GM0YLRgNCwINC4INC10YHQu9C4INC10YHRgtGMLCDRgtC+INC+0YLQtNCw0LXQvCDQtdCz0L4gdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3NGaWx0ZXJbaV0ucmVmcyA9PSByb3cuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudE9iamVrdFZhbHVlID0gcHJldmlvc0ZpbHRlcltpXS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93LnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50VHlwZSA9IHJvdy50eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0YHQvtCx0LXRgNC10Lwg0LzQsNGB0YHQuNCyINC+0LHRitC10LrRgtC+0LJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJvdy5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY29tcG9uZW50T2JqZWt0VmFsdWUgfHwgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogY29tcG9uZW50VHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmczogcm93LmlkXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwge2tleTogaW5kZXh9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7Y2xhc3NOYW1lOiBcImZvcm0td2lkZ2V0LWxhYmVsXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCByb3cubmFtZSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGNvbXBvbmVudFR5cGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidWktYzJcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiByb3cubmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJvdy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHJvdy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiByb3cuaWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGNvbXBvbmVudE9iamVrdFZhbHVlIHx8IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICBmaWx0ZXJGaWVsZHMgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZmllbGRzZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIGZpbHRlckZpZWxkcylcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZpbHRlckZpZWxkcztcclxuICAgIH0sXHJcblxyXG4gICAgcHJlcGFyZVBhcmFtc0ZvclRvb2xiYXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyDRh9C40YLQsNC10Lwg0LTQsNC90L3Ri9C1INGB0L4g0YHRgtC+0YDQsCwg0YTQvtGA0LzQuNGA0YPQtdC8INC/0LDRgNCw0LzQtdGC0YDRiyDQtNC70Y8g0LrQvdC+0L/QvtC6INGD0L/RgNCw0LLQu9C10L3QuNGPLCDQuCDRgtGD0LTQsCDQuNGFINC+0YLQtNCw0LXQvFxyXG4vL2RvY3NHcmlkQ2hhbmdlIChmbHV4LnN0b3Jlcy5kb2NzU3RvcmUuKVxyXG4gICAgICAgIGxldCBncmlkID0gdGhpcy5maW5kQ29tcG9uZW50KCdkb2NzR3JpZCcpIHx8IFtdLFxyXG4gICAgICAgICAgICBsYXN0Um93SWQgPSB0aGlzLnN0YXRlLmFjdGl2Um93SWQsXHJcbiAgICAgICAgICAgIGRhdGEgPSBbXSxcclxuICAgICAgICAgICAgZGF0YVJvdyA9IFtdLFxyXG4gICAgICAgICAgICB0b29sYmFyUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgYnRuQWRkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBidG5FZGl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBidG5EZWxldGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJ0blByaW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbi8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsNC70LjRh9C40LUg0LTQsNC90L3Ri9GFLCDQtdGB0LvQuCDQtdGB0YLRjCDQv9GA0L7Qv9C40YXQvdC10Lwg0LrQvtC80L/QvtC90LXQvdGC0LDQvFxyXG5cclxuICAgICAgICBpZiAoZ3JpZC5sZW5ndGggPiAwICYmIGdyaWRbMF0uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBncmlkWzBdLmRhdGFbMF0uZGF0YTtcclxuICAgICAgICAgICAgZGF0YVJvdyA9IGRhdGEuZmlsdGVyKGZ1bmN0aW9uKHJvdykgIHtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cuaWQgPT09IGxhc3RSb3dJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0b29sYmFyUGFyYW1zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGFSb3cubGVuZ3RoID4gMCAmJiBkYXRhUm93WzBdLnN0YXR1cyA9PSAn0J/RgNC+0LLQtdC00LXQvScpIHtcclxuICAgICAgICAgICAgLy8g0YPQtNCw0LvRj9GC0Ywg0L3QtdC70YzQt9GPXHJcbiAgICAgICAgICAgIHRvb2xiYXJQYXJhbXMuYnRuRGVsZXRlLnNob3cgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRvb2xiYXJQYXJhbXM7XHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBhcmVudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZG9jLXJlZ2lzdGVyLmpzeFxuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vZGF0YS1ncmlkLXN0eWxlcycpLFxyXG4gICAga2V5ZG93biA9IHJlcXVpcmUoJ3JlYWN0LWtleWRvd24nKSxcclxuICAgIEtFWVMgPSBbIDM4LCA0MF07IC8vINC80L7QvdC40YLQvtGA0LjQvCDRgtC+0LvRjNC60L4g0YHRgtGA0LXQu9C60Lgg0LLQstC10YDRhSDQuCDQstC90LjQt9GFXHJcblxyXG5jb25zdCBpc0V4aXN0cyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcCkgIHtcclxuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICAgIGlmIChwcm9wIGluIG9iamVjdCkge1xyXG4gICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5cclxuLy9Aa2V5ZG93biBAdG9kb1xyXG52YXIgX19fX0NsYXNzMT1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzMV9fX19LZXkgaW4gX19fX0NsYXNzMSl7aWYoX19fX0NsYXNzMS5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3MxX19fX0tleSkpe0RhdGFHcmlkW19fX19DbGFzczFfX19fS2V5XT1fX19fQ2xhc3MxW19fX19DbGFzczFfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzMT1fX19fQ2xhc3MxPT09bnVsbD9udWxsOl9fX19DbGFzczEucHJvdG90eXBlO0RhdGFHcmlkLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3MxKTtEYXRhR3JpZC5wcm90b3R5cGUuY29uc3RydWN0b3I9RGF0YUdyaWQ7RGF0YUdyaWQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzMTtcclxuICAgIGZ1bmN0aW9uIERhdGFHcmlkKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzMS5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zOiB0aGlzLnByb3BzLmdyaWRDb2x1bW5zLFxyXG4gICAgICAgICAgICBncmlkRGF0YTogdGhpcy5wcm9wcy5ncmlkRGF0YSxcclxuICAgICAgICAgICAgYWN0aXZlUm93OiAwLFxyXG4gICAgICAgICAgICBhY3RpdmVDb2x1bW46ICcnLFxyXG4gICAgICAgICAgICBzb3J0OiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oYW5kbGVHcmlkSGVhZGVyQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUNlbGxEYmxDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEYXRhR3JpZC5wcm90b3R5cGUsXCJjb21wb25lbnREaWRNb3VudFwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vINC/0L7QstC10YHQuNC8INC+0LHRgNCw0LHQvtGC0YfQuNC60LhcclxuICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEYXRhR3JpZC5wcm90b3R5cGUsXCJnZXRHcmlkUm93SW5kZXhCeUlkXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZG9jSWQpIHtcclxuICAgICAgICAvLyDQuNGJ0LXQvCDQuNC90LTQtdGFINCyINC80LDRgdGB0LjQstC1INC00LDQvdC90YvRhVxyXG4gICAgICAgIGxldCBpbmRleCA9IDAsXHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnByb3BzLmdyaWREYXRhO1xyXG5cclxuICAgICAgICBpZiAoZG9jSWQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcm93ID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cgJiYgZGF0YVtpXVsnaWQnXSA9PSBkb2NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFHcmlkLnByb3RvdHlwZSxcImhhbmRsZUNlbGxDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGlkeCkge1xyXG4gICAgICAgIC8vINC+0YLRgNCw0LHQsNGC0YvQstCw0LXRgiDRgdC+0LHRi9GC0Lgg0LrQu9C40LrQsCDQv9C+INGP0YfQtdC50LrQtVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBhY3RpdmVSb3c6IGlkeFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5ncmlkRGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBkb2NJZCA9IHRoaXMucHJvcHMuZ3JpZERhdGFbaWR4XS5pZDtcclxuXHJcbiAgICAgICAgICAgIC8vINGB0L7RhdGA0LDQvdC40Lwg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24odGhpcy5wcm9wcy5vbkNoYW5nZUFjdGlvbiwgZG9jSWQpO1xyXG4gICAgICAgIH1cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGF0YUdyaWQucHJvdG90eXBlLFwiaGFuZGxlQ2VsbERibENsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oaWR4KSB7XHJcbiAgICAgICAgLy8g0L7RgtC80LXRgtC40Lwg0LDQutGC0LjQstC90YPRjiDRgdGC0YDQvtC60YMg0Lgg0LLRi9C30L7QstC10L0g0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtVxyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2VsbENsaWNrKGlkeClcclxuICAgICAgICAvLyDQstGL0LfQvtCy0LXRgiDQvNC10YLQvtC0INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y9cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdFZGl0Jyk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFHcmlkLnByb3RvdHlwZSxcImhhbmRsZUdyaWRIZWFkZXJDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICBsZXQgIHNvcnQgPSB0aGlzLnN0YXRlLnNvcnQ7XHJcbiAgICAgICAgaWYgKHNvcnQubmFtZSA9PT0gbmFtZSkge1xyXG4gICAgICAgICAgICBzb3J0LmRpcmVjdGlvbiA9IHNvcnQuZGlyZWN0aW9uID09PSAnYXNjJyA/ICdkZXNjJzogJ2FzYyc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc29ydCA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICdhc2MnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzb3J0QnkgPSBbe2NvbHVtbjogc29ydC5uYW1lLCBkaXJlY3Rpb246IHNvcnQuZGlyZWN0aW9ufV07XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBhY3RpdmVDb2x1bW46bmFtZSxcclxuICAgICAgICAgICAgc29ydDogc29ydFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdzb3J0QnlDaGFuZ2UnLCBzb3J0QnkpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEYXRhR3JpZC5wcm90b3R5cGUsXCJoYW5kbGVLZXlEb3duXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIC8vINGA0LXQsNC60YbQuNGPINC90LAg0LrQu9Cw0LLQuNCw0YLRg9GA0YNcclxuICAgICAgICBsZXQgcm93SW5kZXggPSB0aGlzLnN0YXRlLmFjdGl2ZVJvdztcclxuICAgICAgICBzd2l0Y2ggKGUud2hpY2gpIHtcclxuICAgICAgICAgICAgY2FzZSA0MDpcclxuICAgICAgICAgICAgICAgIC8vINCy0L3QuNC3LCDRg9Cy0LXQu9C40YfQuNC8INCw0LrRgtC40LLQvdGD0Y4g0YHRgtGA0L7QutGDINC90LAgKyAxXHJcbiAgICAgICAgICAgICAgICByb3dJbmRleCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmdyaWREYXRhLmxlbmd0aCA8IHJvd0luZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0LLQtdGA0L3QtdC8INC/0YDQtdC20L3QtdC1INC30L3QsNGH0LXQvdC40LVcclxuICAgICAgICAgICAgICAgICAgICByb3dJbmRleCA9IHRoaXMuc3RhdGUuYWN0aXZlUm93XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgICAgIC8vINCy0L3QuNC3LCDRg9Cy0LXQu9C40YfQuNC8INCw0LrRgtC40LLQvdGD0Y4g0YHRgtGA0L7QutGDINC90LAgLSAxXHJcbiAgICAgICAgICAgICAgICByb3dJbmRleC0tO1xyXG4gICAgICAgICAgICAgICAgcm93SW5kZXggPSByb3dJbmRleCA8IDAgPyAwOiByb3dJbmRleDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICBhY3RpdmVSb3c6IHJvd0luZGV4XHJcbiAgICAgICAgIH0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEYXRhR3JpZC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgY2xhc3NOYW1lID0gJ3RoJztcclxuICAgICAgICAvKlxyXG4gICAgICAgICBzZWxmID0gdGhpcztcclxuICAgICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleVByZXNzKCdEb3duJyksXHJcbiAgICAgICAgIG9uRG91YmxlQ2xpY2s6IHRoaXMuaGFuZGxlQ2VsbERibENsaWNrKCksXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwge3JlZjogXCJkYXRhR3JpZFRhYmxlXCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZVRhYmxlSGVhZGVyKClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVUYWJsZVJvdygpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgIH19KTsgLy8gcmVuZGVyXHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFHcmlkLnByb3RvdHlwZSxcInByZXBhcmVUYWJsZVJvd1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5wcm9wcy5ncmlkRGF0YSxcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnMgPSB0aGlzLnByb3BzLmdyaWRDb2x1bW5zO1xyXG5cclxuICAgICAgICByZXR1cm4gZGF0YS5tYXAoZnVuY3Rpb24ocm93LCByb3dJbmRleCkgIHtcclxuICAgICAgICAgICAgbGV0IHNldFJvd0FjdGl2ZSA9IHt9LFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0SW5kZXggPSAndHItJyArIHJvd0luZGV4LFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlUm93ID0gdGhpcy5zdGF0ZS5hY3RpdmVSb3c7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCB7XHJcbiAgICAgICAgICAgICAgICByZWY6IG9iamVjdEluZGV4LCBcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2VsbENsaWNrLmJpbmQodGhpcywgcm93SW5kZXgpLCBcclxuICAgICAgICAgICAgICAgIG9uRG91YmxlQ2xpY2s6IHRoaXMuaGFuZGxlQ2VsbERibENsaWNrLmJpbmQodGhpcywgcm93SW5kZXgpLCBcclxuICAgICAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyksIFxyXG4gICAgICAgICAgICAgICAgc3R5bGU6IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy50ciwgYWN0aXZlUm93ID09PSByb3dJbmRleCA/IHN0eWxlcy5mb2N1c2VkOiB7fSksIFxyXG4gICAgICAgICAgICAgICAga2V5OiBvYmplY3RJbmRleH0sIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZENvbHVtbnMubWFwKGZ1bmN0aW9uKGNvbHVtbiwgY29sdW1uSW5kZXgpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjZWxsSW5kZXggPSAndGQtJyArIHJvd0luZGV4ICsgJy0nICsgY29sdW1uSW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzcGxheSA9IChpc0V4aXN0cyhjb2x1bW4sICdzaG93JykgPyBjb2x1bW4uc2hvdzogdHJ1ZSkgPyB0cnVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoID0gaXNFeGlzdHMoY29sdW1uLCAnd2lkdGgnKSA/IGNvbHVtbi53aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMudGQsICFkaXNwbGF5ID8ge2Rpc3BsYXk6ICdub25lJ30gOiB7fSwge3dpZHRoOiB3aWR0aH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCB7c3R5bGU6IHN0eWxlLCByZWY6IGNlbGxJbmRleCwga2V5OiBjZWxsSW5kZXh9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dbY29sdW1uLmlkXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgKSlcclxuICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMpXHJcblxyXG5cclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGF0YUdyaWQucHJvdG90eXBlLFwicHJlcGFyZVRhYmxlSGVhZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGdyaWRDb2x1bW5zID0gdGhpcy5wcm9wcy5ncmlkQ29sdW1ucyxcclxuICAgICAgICAgICAgY2xhc3NOYW1lID0gJ3RoJztcclxuXHJcbiAgICAgICAgcmV0dXJuIGdyaWRDb2x1bW5zLm1hcChmdW5jdGlvbihjb2x1bW4sIGluZGV4KSAge1xyXG4gICAgICAgICAgICBsZXQgaGVhZGVySW5kZXggPSAndGgtJyArIGluZGV4O1xyXG5cclxuICAgICAgICAgICAgIGxldCBkaXNwbGF5ID0gKGlzRXhpc3RzKGNvbHVtbiwgJ3Nob3cnKSA/IGNvbHVtbi5zaG93OiB0cnVlKSA/IHRydWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgIHdpZHRoID0gaXNFeGlzdHMoY29sdW1uLCAnd2lkdGgnKSA/IGNvbHVtbi53aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgIHN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLnRoLCAhZGlzcGxheSA/IHtkaXNwbGF5OiAnbm9uZSd9IDoge30sIHt3aWR0aDogd2lkdGh9KSxcclxuICAgICAgICAgICAgICAgICBhY3RpdmVDb2x1bW4gPSB0aGlzLnN0YXRlLmFjdGl2ZUNvbHVtbixcclxuICAgICAgICAgICAgICAgICBpY29uVHlwZSA9IHRoaXMuc3RhdGUuc29ydC5kaXJlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgaW1hZ2VTdHlsZUFzYyA9IE9iamVjdC5hc3NpZ24oe30sc3R5bGVzLmltYWdlLCAoYWN0aXZlQ29sdW1uID09IGNvbHVtbi5pZCAmJiBpY29uVHlwZSA9PSAnYXNjJyApICA/IHt9OiB7ZGlzcGxheTogJ25vbmUnfSksXHJcbiAgICAgICAgICAgICAgICAgaW1hZ2VTdHlsZURlc2MgPSBPYmplY3QuYXNzaWduKHt9LHN0eWxlcy5pbWFnZSwgKGFjdGl2ZUNvbHVtbiA9PSBjb2x1bW4uaWQgJiYgaWNvblR5cGUgPT0gJ2Rlc2MnICkgID8ge306IHtkaXNwbGF5OiAnbm9uZSd9KVxyXG5cclxuICAgICAgICAgICAgLy8g0YPRgdGC0LDQvdC+0LLQuNGC0Ywg0LLQuNC00LjQvNC+0YHRgtGMXHJcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHN0eWxlLCBcclxuICAgICAgICAgICAgICAgIHJlZjogaGVhZGVySW5kZXgsIFxyXG4gICAgICAgICAgICAgICAga2V5OiBoZWFkZXJJbmRleCwgXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUdyaWRIZWFkZXJDbGljay5iaW5kKHRoaXMsIGNvbHVtbi5pZCl9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIGNvbHVtbi5uYW1lKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIiwge3JlZjogXCJpbWFnZUFzY1wiLCBzdHlsZTogaW1hZ2VTdHlsZUFzYywgc3JjOiBzdHlsZXMuaWNvbnNbJ2FzYyddfSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VEZXNjXCIsIHN0eWxlOiBpbWFnZVN0eWxlRGVzYywgc3JjOiBzdHlsZXMuaWNvbnNbJ2Rlc2MnXX0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMpO1xyXG4gICAgfX0pO1xyXG5cclxuXHJcbkRhdGFHcmlkLnByb3BUeXBlcyA9IHtcclxuICAgIGdyaWRDb2x1bW5zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgIGdyaWREYXRhOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5cclxuRGF0YUdyaWQuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZ3JpZENvbHVtbnM6IFtdLFxyXG4gICAgZ3JpZERhdGE6IFtdXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFHcmlkO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YS1ncmlkL2RhdGEtZ3JpZC5qc3hcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdGg6IHtcbiAgICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnZ3JleScsXG4gICAgICAgIGhlaWdodDogJzUwcHgnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgbGlnaHRncmF5J1xuICAgIH0sXG5cbiAgICB0cjoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZSdcbiAgICB9LFxuXG4gICAgZm9jdXNlZDoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdsaWdodGJsdWUnXG4gICAgfSxcblxuICAgIHRkOiB7XG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBsaWdodGdyYXknXG4gICAgfSxcblxuICAgIGljb25zOiB7XG4gICAgICAgIGFzYzogJ2ltYWdlcy9pY29ucy9zb3J0LWFscGhhLWFzYy5wbmcnLFxuICAgICAgICBkZXNjOiAnaW1hZ2VzL2ljb25zL3NvcnQtYWxwaGEtZGVzYy5wbmcnXG4gICAgfSxcblxuICAgIGltYWdlOiB7XG4gICAgICAgIG1hcmdpbjogJzFweCdcbiAgICB9XG5cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC9kYXRhLWdyaWQtc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBwb2x5ZmlsbCBhcnJheS5mcm9tIChtYWlubHkgZm9yIElFKVxuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlKG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqWydkZWZhdWx0J10gOiBvYmo7XG59XG5cbnJlcXVpcmUoJy4vbGliL2FycmF5LmZyb20nKTtcblxuLy8gQGtleWRvd24gYW5kIEBrZXlkb3duU2NvcGVkXG5cbnZhciBfZGVjb3JhdG9ycyA9IHJlcXVpcmUoJy4vZGVjb3JhdG9ycycpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBfaW50ZXJvcFJlcXVpcmUoX2RlY29yYXRvcnMpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdrZXlkb3duU2NvcGVkJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2RlY29yYXRvcnMua2V5ZG93blNjb3BlZDtcbiAgfVxufSk7XG5cbi8vIHNldEJpbmRpbmcgLSBvbmx5IHVzZWZ1bCBpZiB5b3UncmUgbm90IGdvaW5nIHRvIHVzZSBkZWNvcmF0b3JzXG5cbnZhciBfc3RvcmUgPSByZXF1aXJlKCcuL3N0b3JlJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnc2V0QmluZGluZycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9zdG9yZS5zZXRCaW5kaW5nO1xuICB9XG59KTtcblxuLy8gS2V5cyAtIHVzZSB0aGlzIHRvIGZpbmQga2V5IGNvZGVzIGZvciBzdHJpbmdzLiBmb3IgZXhhbXBsZTogS2V5cy5qLCBLZXlzLmVudGVyXG5cbnZhciBfbGliS2V5cyA9IHJlcXVpcmUoJy4vbGliL2tleXMnKTtcblxuZXhwb3J0cy5LZXlzID0gX2ludGVyb3BSZXF1aXJlKF9saWJLZXlzKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBQcm9kdWN0aW9uIHN0ZXBzIG9mIEVDTUEtMjYyLCBFZGl0aW9uIDYsIDIyLjEuMi4xXG4vLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZnJvbVxuJ3VzZSBzdHJpY3QnO1xuXG5pZiAoIUFycmF5LmZyb20pIHtcbiAgQXJyYXkuZnJvbSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICAgIHZhciBpc0NhbGxhYmxlID0gZnVuY3Rpb24gaXNDYWxsYWJsZShmbikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyB8fCB0b1N0ci5jYWxsKGZuKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgICB9O1xuICAgIHZhciB0b0ludGVnZXIgPSBmdW5jdGlvbiB0b0ludGVnZXIodmFsdWUpIHtcbiAgICAgIHZhciBudW1iZXIgPSBOdW1iZXIodmFsdWUpO1xuICAgICAgaWYgKGlzTmFOKG51bWJlcikpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICBpZiAobnVtYmVyID09PSAwIHx8ICFpc0Zpbml0ZShudW1iZXIpKSB7XG4gICAgICAgIHJldHVybiBudW1iZXI7XG4gICAgICB9XG4gICAgICByZXR1cm4gKG51bWJlciA+IDAgPyAxIDogLTEpICogTWF0aC5mbG9vcihNYXRoLmFicyhudW1iZXIpKTtcbiAgICB9O1xuICAgIHZhciBtYXhTYWZlSW50ZWdlciA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG4gICAgdmFyIHRvTGVuZ3RoID0gZnVuY3Rpb24gdG9MZW5ndGgodmFsdWUpIHtcbiAgICAgIHZhciBsZW4gPSB0b0ludGVnZXIodmFsdWUpO1xuICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KGxlbiwgMCksIG1heFNhZmVJbnRlZ2VyKTtcbiAgICB9O1xuXG4gICAgLy8gVGhlIGxlbmd0aCBwcm9wZXJ0eSBvZiB0aGUgZnJvbSBtZXRob2QgaXMgMS5cbiAgICByZXR1cm4gZnVuY3Rpb24gZnJvbShhcnJheUxpa2UgLyosIG1hcEZuLCB0aGlzQXJnICovKSB7XG4gICAgICAvLyAxLiBMZXQgQyBiZSB0aGUgdGhpcyB2YWx1ZS5cbiAgICAgIHZhciBDID0gdGhpcztcblxuICAgICAgLy8gMi4gTGV0IGl0ZW1zIGJlIFRvT2JqZWN0KGFycmF5TGlrZSkuXG4gICAgICB2YXIgaXRlbXMgPSBPYmplY3QoYXJyYXlMaWtlKTtcblxuICAgICAgLy8gMy4gUmV0dXJuSWZBYnJ1cHQoaXRlbXMpLlxuICAgICAgaWYgKGFycmF5TGlrZSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBcnJheS5mcm9tIHJlcXVpcmVzIGFuIGFycmF5LWxpa2Ugb2JqZWN0IC0gbm90IG51bGwgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyA0LiBJZiBtYXBmbiBpcyB1bmRlZmluZWQsIHRoZW4gbGV0IG1hcHBpbmcgYmUgZmFsc2UuXG4gICAgICB2YXIgbWFwRm4gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHZvaWQgdW5kZWZpbmVkO1xuICAgICAgdmFyIFQ7XG4gICAgICBpZiAodHlwZW9mIG1hcEZuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyA1LiBlbHNlXG4gICAgICAgIC8vIDUuIGEgSWYgSXNDYWxsYWJsZShtYXBmbikgaXMgZmFsc2UsIHRocm93IGEgVHlwZUVycm9yIGV4Y2VwdGlvbi5cbiAgICAgICAgaWYgKCFpc0NhbGxhYmxlKG1hcEZuKSkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LmZyb206IHdoZW4gcHJvdmlkZWQsIHRoZSBzZWNvbmQgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyA1LiBiLiBJZiB0aGlzQXJnIHdhcyBzdXBwbGllZCwgbGV0IFQgYmUgdGhpc0FyZzsgZWxzZSBsZXQgVCBiZSB1bmRlZmluZWQuXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMikge1xuICAgICAgICAgIFQgPSBhcmd1bWVudHNbMl07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gMTAuIExldCBsZW5WYWx1ZSBiZSBHZXQoaXRlbXMsIFwibGVuZ3RoXCIpLlxuICAgICAgLy8gMTEuIExldCBsZW4gYmUgVG9MZW5ndGgobGVuVmFsdWUpLlxuICAgICAgdmFyIGxlbiA9IHRvTGVuZ3RoKGl0ZW1zLmxlbmd0aCk7XG5cbiAgICAgIC8vIDEzLiBJZiBJc0NvbnN0cnVjdG9yKEMpIGlzIHRydWUsIHRoZW5cbiAgICAgIC8vIDEzLiBhLiBMZXQgQSBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIFtbQ29uc3RydWN0XV0gaW50ZXJuYWwgbWV0aG9kXG4gICAgICAvLyBvZiBDIHdpdGggYW4gYXJndW1lbnQgbGlzdCBjb250YWluaW5nIHRoZSBzaW5nbGUgaXRlbSBsZW4uXG4gICAgICAvLyAxNC4gYS4gRWxzZSwgTGV0IEEgYmUgQXJyYXlDcmVhdGUobGVuKS5cbiAgICAgIHZhciBBID0gaXNDYWxsYWJsZShDKSA/IE9iamVjdChuZXcgQyhsZW4pKSA6IG5ldyBBcnJheShsZW4pO1xuXG4gICAgICAvLyAxNi4gTGV0IGsgYmUgMC5cbiAgICAgIHZhciBrID0gMDtcbiAgICAgIC8vIDE3LiBSZXBlYXQsIHdoaWxlIGsgPCBsZW7igKYgKGFsc28gc3RlcHMgYSAtIGgpXG4gICAgICB2YXIga1ZhbHVlO1xuICAgICAgd2hpbGUgKGsgPCBsZW4pIHtcbiAgICAgICAga1ZhbHVlID0gaXRlbXNba107XG4gICAgICAgIGlmIChtYXBGbikge1xuICAgICAgICAgIEFba10gPSB0eXBlb2YgVCA9PT0gJ3VuZGVmaW5lZCcgPyBtYXBGbihrVmFsdWUsIGspIDogbWFwRm4uY2FsbChULCBrVmFsdWUsIGspO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIEFba10gPSBrVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgayArPSAxO1xuICAgICAgfVxuICAgICAgLy8gMTguIExldCBwdXRTdGF0dXMgYmUgUHV0KEEsIFwibGVuZ3RoXCIsIGxlbiwgdHJ1ZSkuXG4gICAgICBBLmxlbmd0aCA9IGxlbjtcbiAgICAgIC8vIDIwLiBSZXR1cm4gQS5cbiAgICAgIHJldHVybiBBO1xuICAgIH07XG4gIH0oKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9hcnJheS5mcm9tLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIEBtb2R1bGUgZGVjb3JhdG9yc1xuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9O1xufVxuXG52YXIgX2NsYXNzX2RlY29yYXRvciA9IHJlcXVpcmUoJy4vY2xhc3NfZGVjb3JhdG9yJyk7XG5cbnZhciBfY2xhc3NfZGVjb3JhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzX2RlY29yYXRvcik7XG5cbnZhciBfbWV0aG9kX2RlY29yYXRvciA9IHJlcXVpcmUoJy4vbWV0aG9kX2RlY29yYXRvcicpO1xuXG52YXIgX21ldGhvZF9kZWNvcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWV0aG9kX2RlY29yYXRvcik7XG5cbnZhciBfbWV0aG9kX2RlY29yYXRvcl9zY29wZWQgPSByZXF1aXJlKCcuL21ldGhvZF9kZWNvcmF0b3Jfc2NvcGVkJyk7XG5cbnZhciBfbWV0aG9kX2RlY29yYXRvcl9zY29wZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWV0aG9kX2RlY29yYXRvcl9zY29wZWQpO1xuXG4vKipcbiAqIF9kZWNvcmF0b3JcbiAqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZEZuIFRoZSBtZXRob2Qgd3JhcHBlciB0byBkZWxlZ2F0ZSB0bywgYmFzZWQgb24gd2hldGhlciB1c2VyIGhhcyBzcGVjaWZpZWQgYSBzY29wZWQgZGVjb3JhdG9yIG9yIG5vdFxuICogQHBhcmFtIHtBcnJheX0gLi4uYXJncyBSZW1haW5kZXIgb2YgYXJndW1lbnRzIHBhc3NlZCBpblxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBkZWNvcmF0ZWQgY2xhc3Mgb3IgbWV0aG9kXG4gKi9cbmZ1bmN0aW9uIF9kZWNvcmF0b3IobWV0aG9kRm4pIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICAvLyBjaGVjayB0aGUgZmlyc3QgYXJndW1lbnQgdG8gc2VlIGlmIGl0J3MgYSB1c2VyLXN1cHBsaWVkIGtleWNvZGUgb3IgYXJyYXlcbiAgLy8gb2Yga2V5Y29kZXMsIG9yIGlmIGl0J3MgdGhlIHdyYXBwZWQgY2xhc3Mgb3IgbWV0aG9kXG4gIHZhciB0ZXN0QXJnID0gYXJnc1swXTtcbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KHRlc3RBcmcpO1xuXG4gIC8vIGlmIHRoZSB0ZXN0IGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3Qgb3IgZnVuY3Rpb24sIGl0IGlzIHVzZXItc3VwcGxpZWRcbiAgLy8ga2V5Y29kZXMuIGVsc2UgdGhlcmUgYXJlIG5vIGFyZ3VtZW50cyBhbmQgaXQncyBqdXN0IHRoZSB3cmFwcGVkIGNsYXNzXG4gIC8vIChtZXRob2QgZGVjb3JhdG9ycyBtdXN0IGhhdmUga2V5Y29kZSBhcmd1bWVudHMpLlxuICBpZiAoaXNBcnJheSB8fCB+WydzdHJpbmcnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2YgdGVzdEFyZyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodGVzdEFyZykpKSB7XG4gICAgdmFyIF9yZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIga2V5cyA9IGlzQXJyYXkgPyB0ZXN0QXJnIDogYXJncztcblxuICAgICAgLy8gcmV0dXJuIHRoZSBkZWNvcmF0b3IgZnVuY3Rpb24sIHdoaWNoIG9uIHRoZSBuZXh0IGNhbGwgd2lsbCBsb29rIGZvclxuICAgICAgLy8gdGhlIHByZXNlbmNlIG9mIGEgbWV0aG9kIG5hbWUgdG8gZGV0ZXJtaW5lIGlmIHRoaXMgaXMgYSB3cmFwcGVkIG1ldGhvZFxuICAgICAgLy8gb3IgY29tcG9uZW50XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2OiBmdW5jdGlvbiB2KHRhcmdldCwgbWV0aG9kTmFtZSwgZGVzY3JpcHRvcikge1xuICAgICAgICAgIHJldHVybiBtZXRob2ROYW1lID8gbWV0aG9kRm4oeyB0YXJnZXQ6IHRhcmdldCwgZGVzY3JpcHRvcjogZGVzY3JpcHRvciwga2V5czoga2V5cyB9KSA6ICgwLCBfY2xhc3NfZGVjb3JhdG9yMlsnZGVmYXVsdCddKSh0YXJnZXQsIGtleXMpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0oKTtcblxuICAgIGlmICgodHlwZW9mIF9yZXQgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKF9yZXQpKSA9PT0gJ29iamVjdCcpIHJldHVybiBfcmV0LnY7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG1ldGhvZE5hbWUgPSBhcmdzWzFdO1xuXG4gICAgLy8gbWV0aG9kIGRlY29yYXRvcnMgd2l0aG91dCBrZXljb2RlICh3aGljaCkgYXJndW1lbnRzIGFyZSBub3QgYWxsb3dlZC5cbiAgICBpZiAoIW1ldGhvZE5hbWUpIHtcbiAgICAgIHJldHVybiBfY2xhc3NfZGVjb3JhdG9yMlsnZGVmYXVsdCddLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXRob2ROYW1lICsgJzogTWV0aG9kIGRlY29yYXRvcnMgbXVzdCBoYXZlIGtleWNvZGUgYXJndW1lbnRzLCBzbyB0aGUgZGVjb3JhdG9yIGZvciB0aGlzIG1ldGhvZCB3aWxsIG5vdCBkbyBhbnl0aGluZycpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGtleWRvd25TY29wZWRcbiAqXG4gKiBNZXRob2QgZGVjb3JhdG9yIHRoYXQgd2lsbCBsb29rIGZvciBjaGFuZ2VzIHRvIGl0cyB0YXJnZXRlZCBjb21wb25lbnQnc1xuICogYGtleWRvd25gIHByb3BzIHRvIGRlY2lkZSB3aGVuIHRvIHRyaWdnZXIsIHJhdGhlciB0aGFuIHJlc3BvbmRpbmcgZGlyZWN0bHlcbiAqIHRvIGtleWRvd24gZXZlbnRzLiBUaGlzIGxldHMgeW91IHNwZWNpZnkgYSBAa2V5ZG93biBkZWNvcmF0ZWQgY2xhc3MgaGlnaGVyXG4gKiB1cCBpbiB0aGUgdmlldyBoaWVyYXJjaHkgZm9yIGxhcmdlciBzY29waW5nIG9mIGtleWRvd24gZXZlbnRzLCBvciBmb3JcbiAqIHByb2dyYW1tYXRpY2FsbHkgc2VuZGluZyBrZXlkb3duIGV2ZW50cyBhcyBwcm9wcyBpbnRvIHRoZSBjb21wb25lbnRzIGluIG9yZGVyXG4gKiB0byB0cmlnZ2VyIGRlY29yYXRlZCBtZXRob2RzIHdpdGggbWF0Y2hpbmcga2V5cy5cbiAqXG4gKiBAYWNjZXNzIHB1YmxpY1xuICogQHBhcmFtIHtBcnJheX0gLi4uYXJncyAgQWxsIChvciBubykgYXJndW1lbnRzIHBhc3NlZCBpbiBmcm9tIGRlY29yYXRpb25cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgZGVjb3JhdGVkIGNsYXNzIG9yIG1ldGhvZFxuICovXG5mdW5jdGlvbiBrZXlkb3duU2NvcGVkKCkge1xuICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgfVxuXG4gIHJldHVybiBfZGVjb3JhdG9yLmFwcGx5KHVuZGVmaW5lZCwgW19tZXRob2RfZGVjb3JhdG9yX3Njb3BlZDJbJ2RlZmF1bHQnXV0uY29uY2F0KGFyZ3MpKTtcbn1cblxuLyoqXG4gKiBrZXlkb3duXG4gKlxuICogVGhlIG1haW4gZGVjb3JhdG9yIGFuZCBkZWZhdWx0IGV4cG9ydCwgaGFuZGxlcyBib3RoIGNsYXNzZXMgYW5kIG1ldGhvZHMuXG4gKlxuICogQGFjY2VzcyBwdWJsaWNcbiAqIEBwYXJhbSB7QXJyYXl9IC4uLmFyZ3MgIEFsbCAob3Igbm8pIGFyZ3VtZW50cyBwYXNzZWQgaW4gZnJvbSBkZWNvcmF0aW9uXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGRlY29yYXRlZCBjbGFzcyBvciBtZXRob2RcbiAqL1xuZnVuY3Rpb24ga2V5ZG93bigpIHtcbiAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICBhcmdzW19rZXkzXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gIH1cblxuICByZXR1cm4gX2RlY29yYXRvci5hcHBseSh1bmRlZmluZWQsIFtfbWV0aG9kX2RlY29yYXRvcjJbJ2RlZmF1bHQnXV0uY29uY2F0KGFyZ3MpKTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0ga2V5ZG93bjtcbmV4cG9ydHMua2V5ZG93blNjb3BlZCA9IGtleWRvd25TY29wZWQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9kZWNvcmF0b3JzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIEBtb2R1bGUgY29tcG9uZW50V3JhcHBlclxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO2ZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9cmV0dXJuIHRhcmdldDtcbn07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07ZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO2Rlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9cmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO2lmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO3JldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gyLCBfeDMsIF94NCkge1xuICB2YXIgX2FnYWluID0gdHJ1ZTtfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHtcbiAgICB2YXIgb2JqZWN0ID0gX3gyLFxuICAgICAgICBwcm9wZXJ0eSA9IF94MyxcbiAgICAgICAgcmVjZWl2ZXIgPSBfeDQ7X2FnYWluID0gZmFsc2U7aWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlO3ZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTtpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7aWYgKHBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3gyID0gcGFyZW50O194MyA9IHByb3BlcnR5O194NCA9IHJlY2VpdmVyO19hZ2FpbiA9IHRydWU7ZGVzYyA9IHBhcmVudCA9IHVuZGVmaW5lZDtjb250aW51ZSBfZnVuY3Rpb247XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHtcbiAgICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7aWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9cmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTtcbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07XG59XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyAodHlwZW9mIHN1cGVyQ2xhc3MgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHN1cGVyQ2xhc3MpKSk7XG4gIH1zdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pO2lmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn1cblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmUnKTtcblxudmFyIF9zdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdG9yZSk7XG5cbnZhciBfZXZlbnRfaGFuZGxlcnMgPSByZXF1aXJlKCcuLi9ldmVudF9oYW5kbGVycycpO1xuXG4vKipcbiAqIGNvbXBvbmVudFdyYXBwZXJcbiAqXG4gKiBAYWNjZXNzIHB1YmxpY1xuICogQHBhcmFtIHtvYmplY3R9IFdyYXBwZWRDb21wb25lbnQgUmVhY3QgY29tcG9uZW50IGNsYXNzIHRvIGJlIHdyYXBwZWRcbiAqIEBwYXJhbSB7YXJyYXl9IFtrZXlzXSBUaGUga2V5KHMpIGJvdW5kIHRvIHRoZSBjbGFzc1xuICogQHJldHVybiB7b2JqZWN0fSBUaGUgaGlnaGVyLW9yZGVyIGZ1bmN0aW9uIHRoYXQgd3JhcHMgdGhlIGRlY29yYXRlZCBjbGFzc1xuICovXG5mdW5jdGlvbiBjb21wb25lbnRXcmFwcGVyKFdyYXBwZWRDb21wb25lbnQpIHtcbiAgdmFyIGtleXMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBudWxsIDogYXJndW1lbnRzWzFdO1xuXG4gIHZhciBLZXlCb2FyZEhlbHBlciA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKEtleUJvYXJkSGVscGVyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIEtleUJvYXJkSGVscGVyKHByb3BzKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgS2V5Qm9hcmRIZWxwZXIpO1xuXG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihLZXlCb2FyZEhlbHBlci5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIHByb3BzKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIGV2ZW50OiBudWxsXG4gICAgICB9O1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhLZXlCb2FyZEhlbHBlciwgW3tcbiAgICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgKDAsIF9ldmVudF9oYW5kbGVycy5vbk1vdW50KSh0aGlzKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgICgwLCBfZXZlbnRfaGFuZGxlcnMub25Vbm1vdW50KSh0aGlzKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdoYW5kbGVLZXlEb3duJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgLy8gdG8gc2ltdWxhdGUgYSBrZXlwcmVzcywgc2V0IHRoZSBldmVudCBhbmQgdGhlbiBjbGVhciBpdCBpbiB0aGUgY2FsbGJhY2tcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGV2ZW50OiBldmVudCB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnNldFN0YXRlKHsgZXZlbnQ6IG51bGwgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoV3JhcHBlZENvbXBvbmVudCwgX2V4dGVuZHMoe30sIHRoaXMucHJvcHMsIHsga2V5ZG93bjogdGhpcy5zdGF0ZSB9KSk7XG4gICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEtleUJvYXJkSGVscGVyO1xuICB9KF9yZWFjdDJbJ2RlZmF1bHQnXS5Db21wb25lbnQpO1xuXG4gIF9zdG9yZTJbJ2RlZmF1bHQnXS5zZXRCaW5kaW5nKHsga2V5czoga2V5cywgZm46IEtleUJvYXJkSGVscGVyLnByb3RvdHlwZS5oYW5kbGVLZXlEb3duLCB0YXJnZXQ6IEtleUJvYXJkSGVscGVyLnByb3RvdHlwZSB9KTtcblxuICByZXR1cm4gS2V5Qm9hcmRIZWxwZXI7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNvbXBvbmVudFdyYXBwZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2RlY29yYXRvcnMvY2xhc3NfZGVjb3JhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIEBtb2R1bGUgc3RvcmVcbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO3ZhciBfbiA9IHRydWU7dmFyIF9kID0gZmFsc2U7dmFyIF9lID0gdW5kZWZpbmVkO3RyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7aWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO19lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pWydyZXR1cm4nXSkgX2lbJ3JldHVybiddKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1yZXR1cm4gX2FycjtcbiAgfXJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZScpO1xuICAgIH1cbiAgfTtcbn0oKTtcblxuZXhwb3J0cy5fcmVzZXRTdG9yZSA9IF9yZXNldFN0b3JlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9O1xufVxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1yZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhcnIpO1xuICB9XG59XG5cbnZhciBfbGliS2V5cyA9IHJlcXVpcmUoJy4vbGliL2tleXMnKTtcblxudmFyIF9saWJNYXRjaF9rZXlzID0gcmVxdWlyZSgnLi9saWIvbWF0Y2hfa2V5cycpO1xuXG52YXIgX2xpYk1hdGNoX2tleXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGliTWF0Y2hfa2V5cyk7XG5cbnZhciBfbGliUGFyc2Vfa2V5cyA9IHJlcXVpcmUoJy4vbGliL3BhcnNlX2tleXMnKTtcblxudmFyIF9saWJQYXJzZV9rZXlzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xpYlBhcnNlX2tleXMpO1xuXG52YXIgX2xpYlV1aWQgPSByZXF1aXJlKCcuL2xpYi91dWlkJyk7XG5cbnZhciBfbGliVXVpZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9saWJVdWlkKTtcblxuLyoqXG4gKiBwcml2YXRlXG4gKiBcbiAqL1xuXG4vLyBkaWN0IGZvciBjbGFzcyBwcm90b3R5cGVzID0+IGJpbmRpbmdzXG52YXIgX2hhbmRsZXJzID0gbmV3IE1hcCgpO1xuXG4vLyBhbGwgbW91bnRlZCBpbnN0YW5jZXMgdGhhdCBoYXZlIGtleWJpbmRpbmdzXG52YXIgX2luc3RhbmNlcyA9IG5ldyBTZXQoKTtcblxuLy8gZm9yIHRlc3RpbmdcblxuZnVuY3Rpb24gX3Jlc2V0U3RvcmUoKSB7XG4gIF9oYW5kbGVycy5jbGVhcigpO1xuICBfaW5zdGFuY2VzLmNsZWFyKCk7XG59XG5cbi8qKlxuICogcHVibGljXG4gKlxuICovXG5cbnZhciBTdG9yZSA9IHtcblxuICAvKipcbiAgICogYWN0aXZhdGVcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICogQHBhcmFtIHtvYmplY3R9IGluc3RhbmNlIEluc3RhbnRpYXRlZCBjbGFzcyB0aGF0IGV4dGVuZGVkIFJlYWN0LkNvbXBvbmVudCwgdG8gYmUgZm9jdXNlZCB0byByZWNlaXZlIGtleWRvd24gZXZlbnRzXG4gICAqL1xuICBhY3RpdmF0ZTogZnVuY3Rpb24gYWN0aXZhdGUoaW5zdGFuY2VzKSB7XG4gICAgdmFyIGluc3RhbmNlc0FycmF5ID0gW10uY29uY2F0KGluc3RhbmNlcyk7XG5cbiAgICAvLyBpZiBubyBjb21wb25lbnRzIHdlcmUgZm91bmQgYXMgYW5jZXN0b3JzIG9mIHRoZSBldmVudCB0YXJnZXQsXG4gICAgLy8gZWZmZWN0aXZlbHkgZGVhY3RpdmF0ZSBrZXlkb3duIGhhbmRsaW5nIGJ5IGNhcHBpbmcgdGhlIHNldCBvZiBpbnN0YW5jZXNcbiAgICAvLyB3aXRoIGBudWxsYC5cbiAgICBpZiAoIWluc3RhbmNlc0FycmF5Lmxlbmd0aCkge1xuICAgICAgX2luc3RhbmNlcy5hZGQobnVsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9pbnN0YW5jZXNbJ2RlbGV0ZSddKG51bGwpO1xuXG4gICAgICAvLyBkZWxldGluZyBhbmQgdGhlbiBhZGRpbmcgdGhlIGluc3RhbmNlKHMpIGhhcyB0aGUgZWZmZWN0IG9mIHNvcnRpbmcgdGhlIHNldFxuICAgICAgLy8gYWNjb3JkaW5nIHRvIGluc3RhbmNlIGFjdGl2YXRpb24gKGFzY2VuZGluZylcbiAgICAgIGluc3RhbmNlc0FycmF5LmZvckVhY2goZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgIF9pbnN0YW5jZXNbJ2RlbGV0ZSddKGluc3RhbmNlKTtcbiAgICAgICAgX2luc3RhbmNlcy5hZGQoaW5zdGFuY2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBkZWxldGVJbnN0YW5jZVxuICAgKlxuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IEluc3RhbnRpYXRlZCBjbGFzcyB0aGF0IGV4dGVuZGVkIFJlYWN0LkNvbXBvbmVudFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUaGUgdmFsdWUgc2V0LmhhcyggdGFyZ2V0ICkgd291bGQgaGF2ZSByZXR1cm5lZCBwcmlvciB0byBkZWxldGlvblxuICAgKi9cbiAgZGVsZXRlSW5zdGFuY2U6IGZ1bmN0aW9uIGRlbGV0ZUluc3RhbmNlKHRhcmdldCkge1xuICAgIF9pbnN0YW5jZXNbJ2RlbGV0ZSddKHRhcmdldCk7XG4gIH0sXG5cbiAgZmluZEJpbmRpbmdGb3JFdmVudDogZnVuY3Rpb24gZmluZEJpbmRpbmdGb3JFdmVudChldmVudCkge1xuICAgIGlmICghX2luc3RhbmNlcy5oYXMobnVsbCkpIHtcbiAgICAgIHZhciBrZXlNYXRjaGVzRXZlbnQgPSBmdW5jdGlvbiBrZXlNYXRjaGVzRXZlbnQoa2V5U2V0KSB7XG4gICAgICAgIHJldHVybiAoMCwgX2xpYk1hdGNoX2tleXMyWydkZWZhdWx0J10pKHsga2V5U2V0OiBrZXlTZXQsIGV2ZW50OiBldmVudCB9KTtcbiAgICAgIH07XG5cbiAgICAgIC8vIGxvb3AgdGhyb3VnaCBpbnN0YW5jZXMgaW4gcmV2ZXJzZSBhY3RpdmF0aW9uIG9yZGVyIHNvIHRoYXQgbW9zdFxuICAgICAgLy8gcmVjZW50bHkgYWN0aXZhdGVkIGluc3RhbmNlIGdldHMgZmlyc3QgZGlicyBvbiBldmVudFxuICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoX2luc3RhbmNlcykpLnJldmVyc2UoKVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgIHZhciBiaW5kaW5ncyA9IHRoaXMuZ2V0QmluZGluZyhpbnN0YW5jZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGJpbmRpbmdzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgICAgICAgIHZhciBfc3RlcDIkdmFsdWUgPSBfc2xpY2VkVG9BcnJheShfc3RlcDIudmFsdWUsIDIpO1xuXG4gICAgICAgICAgICAgIHZhciBrZXlTZXRzID0gX3N0ZXAyJHZhbHVlWzBdO1xuICAgICAgICAgICAgICB2YXIgZm4gPSBfc3RlcDIkdmFsdWVbMV07XG5cbiAgICAgICAgICAgICAgaWYgKCgwLCBfbGliS2V5cy5hbGxLZXlzKShrZXlTZXRzKSB8fCBrZXlTZXRzLnNvbWUoa2V5TWF0Y2hlc0V2ZW50KSkge1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiB3aGVuIG1hdGNoaW5nIGtleWJpbmRpbmcgaXMgZm91bmQgLSBpLmUuIG9ubHkgb25lXG4gICAgICAgICAgICAgICAgLy8ga2V5Ym91bmQgY29tcG9uZW50IGNhbiByZXNwb25kIHRvIGEgZ2l2ZW4ga2V5IGNvZGUuIHRvIGdldCBhcm91bmQgdGhpcyxcbiAgICAgICAgICAgICAgICAvLyBzY29wZSBhIGNvbW1vbiBhbmNlc3RvciBjb21wb25lbnQgY2xhc3Mgd2l0aCBAa2V5ZG93biBhbmQgdXNlXG4gICAgICAgICAgICAgICAgLy8gQGtleWRvd25TY29wZWQgdG8gYmluZCB0aGUgZHVwbGljYXRlIGtleXMgaW4geW91ciBjaGlsZCBjb21wb25lbnRzXG4gICAgICAgICAgICAgICAgLy8gKG9yIGp1c3QgaW5zcGVjdCBuZXh0UHJvcHMua2V5ZG93bi5ldmVudCkuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZm46IGZuLCBpbnN0YW5jZTogaW5zdGFuY2UgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyWydyZXR1cm4nXSkge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjJbJ3JldHVybiddKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yWydyZXR1cm4nXSkge1xuICAgICAgICAgICAgX2l0ZXJhdG9yWydyZXR1cm4nXSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcblxuICAvKipcbiAgICogZ2V0QmluZGluZ1xuICAgKlxuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IENsYXNzIHVzZWQgYXMga2V5IGluIGRpY3Qgb2Yga2V5IGJpbmRpbmdzXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhlIG9iamVjdCBjb250YWluaW5nIGJpbmRpbmdzIGZvciB0aGUgZ2l2ZW4gY2xhc3NcbiAgICovXG4gIGdldEJpbmRpbmc6IGZ1bmN0aW9uIGdldEJpbmRpbmcoX3JlZikge1xuICAgIHZhciBfX3JlYWN0S2V5ZG93blVVSUQgPSBfcmVmLl9fcmVhY3RLZXlkb3duVVVJRDtcblxuICAgIHJldHVybiBfaGFuZGxlcnMuZ2V0KF9fcmVhY3RLZXlkb3duVVVJRCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGdldEluc3RhbmNlc1xuICAgKlxuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKiBAcmV0dXJuIHtzZXR9IEFsbCBzdG9yZWQgaW5zdGFuY2VzIChhbGwgbW91bnRlZCBjb21wb25lbnQgaW5zdGFuY2VzIHdpdGgga2V5YmluZGluZ3MpXG4gICAqL1xuICBnZXRJbnN0YW5jZXM6IGZ1bmN0aW9uIGdldEluc3RhbmNlcygpIHtcbiAgICByZXR1cm4gX2luc3RhbmNlcztcbiAgfSxcblxuICAvKipcbiAgICogaXNFbXB0eVxuICAgKlxuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFNpemUgb2YgdGhlIHNldCBvZiBhbGwgc3RvcmVkIGluc3RhbmNlc1xuICAgKi9cbiAgaXNFbXB0eTogZnVuY3Rpb24gaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gIV9pbnN0YW5jZXMuc2l6ZTtcbiAgfSxcblxuICAvKipcbiAgICogc2V0QmluZGluZ1xuICAgKlxuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKiBAcGFyYW0ge29iamVjdH0gYXJncyBBbGwgYXJndW1lbnRzIG5lY2Vzc2FyeSB0byBzZXQgdGhlIGJpbmRpbmdcbiAgICogQHBhcmFtIHthcnJheX0gYXJncy5rZXlzIEtleSBjb2RlcyB0aGF0IHNob3VsZCB0cmlnZ2VyIHRoZSBmblxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBhcmdzLmZuIFRoZSBjYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiBnaXZlbiBrZXlzIGFyZSBwcmVzc2VkXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzLnRhcmdldCBUaGUgZGVjb3JhdGVkIGNsYXNzXG4gICAqL1xuICBzZXRCaW5kaW5nOiBmdW5jdGlvbiBzZXRCaW5kaW5nKF9yZWYyKSB7XG4gICAgdmFyIGtleXMgPSBfcmVmMi5rZXlzO1xuICAgIHZhciBmbiA9IF9yZWYyLmZuO1xuICAgIHZhciB0YXJnZXQgPSBfcmVmMi50YXJnZXQ7XG5cbiAgICB2YXIga2V5U2V0cyA9IGtleXMgPyAoMCwgX2xpYlBhcnNlX2tleXMyWydkZWZhdWx0J10pKGtleXMpIDogKDAsIF9saWJLZXlzLmFsbEtleXMpKCk7XG4gICAgdmFyIF9fcmVhY3RLZXlkb3duVVVJRCA9IHRhcmdldC5fX3JlYWN0S2V5ZG93blVVSUQ7XG5cbiAgICBpZiAoIV9fcmVhY3RLZXlkb3duVVVJRCkge1xuICAgICAgdGFyZ2V0Ll9fcmVhY3RLZXlkb3duVVVJRCA9ICgwLCBfbGliVXVpZDJbJ2RlZmF1bHQnXSkoKTtcbiAgICAgIF9oYW5kbGVycy5zZXQodGFyZ2V0Ll9fcmVhY3RLZXlkb3duVVVJRCwgbmV3IE1hcChbW2tleVNldHMsIGZuXV0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX2hhbmRsZXJzLmdldChfX3JlYWN0S2V5ZG93blVVSUQpLnNldChrZXlTZXRzLCBmbik7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBTdG9yZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L3N0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBUT0RPOiBOZWVkIGJldHRlciwgbW9yZSBjb21wbGV0ZSwgYW5kIG1vcmUgbWV0aG9kaWNhbCBrZXkgZGVmaW5pdGlvbnNcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5hbGxLZXlzID0gYWxsS2V5cztcbnZhciBLZXlzID0ge1xuICBiYWNrc3BhY2U6IDgsXG4gIGRlbDogNDYsXG4gICdkZWxldGUnOiA0NixcbiAgdGFiOiA5LFxuICBlbnRlcjogMTMsXG4gICdyZXR1cm4nOiAxMyxcbiAgZXNjOiAyNyxcbiAgc3BhY2U6IDMyLFxuICBsZWZ0OiAzNyxcbiAgdXA6IDM4LFxuICByaWdodDogMzksXG4gIGRvd246IDQwLFxuICAnOyc6IDE4NixcbiAgJz0nOiAxODcsXG4gICcsJzogMTg4LFxuICAnLSc6IDE4OSxcbiAgJy4nOiAxOTAsXG4gICcvJzogMTkxLFxuICAnYCc6IDE5MixcbiAgJ1snOiAyMTksXG4gICdcXFxcJzogMjIwLFxuICAnXSc6IDIyMVxufTtcblxuLy8gQWRkIHVwcGVyY2FzZSB2ZXJzaW9ucyBvZiBrZXlzIGFib3ZlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuT2JqZWN0LmtleXMoS2V5cykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBLZXlzW2tleS50b1VwcGVyQ2FzZSgpXSA9IEtleXNba2V5XTtcbn0pO1xuXG4nMDEyMzQ1Njc4OScuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKG51bSwgaW5kZXgpIHtcbiAgcmV0dXJuIEtleXNbbnVtXSA9IGluZGV4ICsgNDg7XG59KTtcblxuJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyLCBpbmRleCkge1xuICBLZXlzW2xldHRlcl0gPSBpbmRleCArIDY1O1xuICBLZXlzW2xldHRlci50b0xvd2VyQ2FzZSgpXSA9IGluZGV4ICsgNjU7XG59KTtcblxuLy8gZm4ga2V5c1xuWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gIHJldHVybiBLZXlzWydmJyArIGluZGV4XSA9IDExMSArIGluZGV4O1xufSk7XG5cbnZhciBtb2RpZmllcnMgPSB7XG4gIGNvbnRyb2w6ICdjdHJsJyxcbiAgY3RybDogJ2N0cmwnLFxuICBzaGlmdDogJ3NoaWZ0JyxcbiAgbWV0YTogJ21ldGEnLFxuICBjbWQ6ICdtZXRhJyxcbiAgY29tbWFuZDogJ21ldGEnLFxuICBvcHRpb246ICdhbHQnLFxuICBhbHQ6ICdhbHQnXG59O1xuXG5leHBvcnRzLm1vZGlmaWVycyA9IG1vZGlmaWVycztcblxuZnVuY3Rpb24gYWxsS2V5cyhhcmcpIHtcbiAgcmV0dXJuIGFyZyA/IGFyZy5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sIHx8ICh0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihhcmcpKSA9PT0gJ3N5bWJvbCcgOiBTeW1ib2woJ2FsbEtleXMnKTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gS2V5cztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2tleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxudmFyIG1vZEtleXMgPSBPYmplY3Qua2V5cyhfa2V5cy5tb2RpZmllcnMpO1xuXG5mdW5jdGlvbiBtYXRjaEtleXMoX3JlZikge1xuICB2YXIgX3JlZiRrZXlTZXQgPSBfcmVmLmtleVNldDtcbiAgdmFyIGtleSA9IF9yZWYka2V5U2V0LmtleTtcbiAgdmFyIF9yZWYka2V5U2V0JG1vZGlmaWVycyA9IF9yZWYka2V5U2V0Lm1vZGlmaWVycztcbiAgdmFyIG1vZGlmaWVycyA9IF9yZWYka2V5U2V0JG1vZGlmaWVycyA9PT0gdW5kZWZpbmVkID8gW10gOiBfcmVmJGtleVNldCRtb2RpZmllcnM7XG4gIHZhciBldmVudCA9IF9yZWYuZXZlbnQ7XG5cbiAgdmFyIGtleXNNYXRjaCA9IGZhbHNlO1xuICBpZiAoa2V5ID09PSBldmVudC53aGljaCkge1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZXZ0TW9kS2V5cyA9IG1vZEtleXMuZmlsdGVyKGZ1bmN0aW9uIChtb2RLZXkpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50W21vZEtleSArICdLZXknXTtcbiAgICAgIH0pLnNvcnQoKTtcbiAgICAgIGtleXNNYXRjaCA9IG1vZGlmaWVycy5sZW5ndGggPT09IGV2dE1vZEtleXMubGVuZ3RoICYmIG1vZGlmaWVycy5ldmVyeShmdW5jdGlvbiAobW9kS2V5LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gZXZ0TW9kS2V5c1tpbmRleF0gPT09IG1vZEtleTtcbiAgICAgIH0pO1xuICAgIH0pKCk7XG4gIH1cbiAgcmV0dXJuIGtleXNNYXRjaDtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gbWF0Y2hLZXlzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWtleWRvd24vZGlzdC9saWIvbWF0Y2hfa2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTtcbn1cblxudmFyIF9rZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cbnZhciBfa2V5czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9rZXlzKTtcblxuZnVuY3Rpb24gcGFyc2VLZXlzKGtleXNBcnJheSkge1xuICByZXR1cm4ga2V5c0FycmF5Lm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGtleVNldCA9IHsga2V5OiBrZXkgfTtcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciBrZXlTdHJpbmcgPSBrZXkudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgICB2YXIgbWF0Y2hlcyA9IGtleVN0cmluZy5zcGxpdCgvXFxzP1xcK1xccz8vKTtcbiAgICAgIGtleVNldCA9IG1hdGNoZXMubGVuZ3RoID09PSAxID8geyBrZXk6IF9rZXlzMlsnZGVmYXVsdCddW2tleVN0cmluZ10gfSA6IHtcbiAgICAgICAga2V5OiBfa2V5czJbJ2RlZmF1bHQnXVttYXRjaGVzLnBvcCgpXSxcbiAgICAgICAgbW9kaWZpZXJzOiBtYXRjaGVzLm1hcChmdW5jdGlvbiAobW9kS2V5KSB7XG4gICAgICAgICAgcmV0dXJuIF9rZXlzLm1vZGlmaWVyc1ttb2RLZXldO1xuICAgICAgICB9KS5zb3J0KClcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBrZXlTZXQ7XG4gIH0pO1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBwYXJzZUtleXM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9wYXJzZV9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBDb3VudGVyIGJlaW5nIGluY3JlbWVudGVkLiBKUyBpcyBzaW5nbGUtdGhyZWFkZWQsIHNvIGl0J2xsIEp1c3QgV29ya+KEoi5cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB1dWlkO1xudmFyIF9fY291bnRlciA9IDE7XG5cbi8qKlxuICogUmV0dXJucyBhIHByb2Nlc3Mtd2lkZSB1bmlxdWUgaWRlbnRpZmllci5cbiAqL1xuXG5mdW5jdGlvbiB1dWlkKCkge1xuICByZXR1cm4gXCJ1aWQtXCIgKyBfX2NvdW50ZXIrKztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi91dWlkLmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyoqXG4gKiBAbW9kdWxlIGV2ZW50SGFuZGxlcnNcbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLl9vbkNsaWNrID0gX29uQ2xpY2s7XG5leHBvcnRzLl9vbktleURvd24gPSBfb25LZXlEb3duO1xuZXhwb3J0cy5fc2hvdWxkQ29uc2lkZXIgPSBfc2hvdWxkQ29uc2lkZXI7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07XG59XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfXJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGFycik7XG4gIH1cbn1cblxudmFyIF9saWJEb21faGVscGVycyA9IHJlcXVpcmUoJy4vbGliL2RvbV9oZWxwZXJzJyk7XG5cbnZhciBfbGliRG9tX2hlbHBlcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGliRG9tX2hlbHBlcnMpO1xuXG52YXIgX2xpYkxpc3RlbmVycyA9IHJlcXVpcmUoJy4vbGliL2xpc3RlbmVycycpO1xuXG52YXIgX2xpYkxpc3RlbmVyczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9saWJMaXN0ZW5lcnMpO1xuXG52YXIgX3N0b3JlID0gcmVxdWlyZSgnLi9zdG9yZScpO1xuXG52YXIgX3N0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0b3JlKTtcblxuLyoqXG4gKiBwcml2YXRlXG4gKlxuICovXG5cbi8qKlxuICogX29uQ2xpY2tcbiAqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCBUaGUgY2xpY2sgZXZlbnQgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gZXZlbnQudGFyZ2V0IFRoZSBET00gbm9kZSBmcm9tIHRoZSBjbGljayBldmVudFxuICovXG5cbmZ1bmN0aW9uIF9vbkNsaWNrKF9yZWYpIHtcbiAgdmFyIHRhcmdldCA9IF9yZWYudGFyZ2V0O1xuXG4gIF9zdG9yZTJbJ2RlZmF1bHQnXS5hY3RpdmF0ZShbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KF9zdG9yZTJbJ2RlZmF1bHQnXS5nZXRJbnN0YW5jZXMoKSkpLnJlZHVjZShfbGliRG9tX2hlbHBlcnMyWydkZWZhdWx0J10uZmluZENvbnRhaW5lck5vZGVzKHRhcmdldCksIFtdKS5zb3J0KF9saWJEb21faGVscGVyczJbJ2RlZmF1bHQnXS5zb3J0QnlET01Qb3NpdGlvbikubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW0uaW5zdGFuY2U7XG4gIH0pKTtcbn1cblxuLyoqXG4gKiBfb25LZXlEb3duOiBUaGUga2V5ZG93biBldmVudCBjYWxsYmFja1xuICpcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IFRoZSBrZXlkb3duIGV2ZW50IG9iamVjdFxuICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50LndoaWNoIFRoZSBrZXkgY29kZSAod2hpY2gpIHJlY2VpdmVkIGZyb20gdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuXG5mdW5jdGlvbiBfb25LZXlEb3duKGV2ZW50KSB7XG4gIHZhciBmb3JjZUNvbnNpZGVyID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBhcmd1bWVudHNbMV07XG5cbiAgaWYgKGZvcmNlQ29uc2lkZXIgfHwgX3Nob3VsZENvbnNpZGVyKGV2ZW50KSkge1xuICAgIHZhciBfcmVmMiA9IF9zdG9yZTJbJ2RlZmF1bHQnXS5maW5kQmluZGluZ0ZvckV2ZW50KGV2ZW50KSB8fCB7fTtcblxuICAgIHZhciBmbiA9IF9yZWYyLmZuO1xuICAgIHZhciBpbnN0YW5jZSA9IF9yZWYyLmluc3RhbmNlO1xuXG4gICAgaWYgKGZuKSB7XG4gICAgICBmbi5jYWxsKGluc3RhbmNlLCBldmVudCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIF9zaG91bGRDb25zaWRlcjogQ29uZGl0aW9ucyBmb3IgcHJvY2VlZGluZyB3aXRoIGtleSBldmVudCBoYW5kbGluZ1xuICpcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IFRoZSBrZXlkb3duIGV2ZW50IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IGV2ZW50LnRhcmdldCBUaGUgbm9kZSBvcmlnaW4gb2YgdGhlIGV2ZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQudGFyZ2V0LnRhZ05hbWUgVGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQgdGFnXG4gKiBAcGFyYW0ge251bWJlcn0gZXZlbnQudGFyZ2V0LndoaWNoIFRoZSBrZXkgcHJlc3NlZFxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciB0byBjb250aW51ZSBwcm9jZXNpbmcgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuXG5mdW5jdGlvbiBfc2hvdWxkQ29uc2lkZXIoX3JlZjMpIHtcbiAgdmFyIGN0cmxLZXkgPSBfcmVmMy5jdHJsS2V5O1xuICB2YXIgdGFnTmFtZSA9IF9yZWYzLnRhcmdldC50YWdOYW1lO1xuXG4gIHJldHVybiAhflsnSU5QVVQnLCAnU0VMRUNUJywgJ1RFWFRBUkVBJ10uaW5kZXhPZih0YWdOYW1lKSB8fCBjdHJsS2V5O1xufVxuXG4vKipcbiAqIHB1YmxpY1xuICpcbiAqL1xuXG4vKipcbiAqIG9uTW91bnRcbiAqXG4gKiBAYWNjZXNzIHB1YmxpY1xuICovXG5mdW5jdGlvbiBvbk1vdW50KGluc3RhbmNlKSB7XG4gIC8vIGhhdmUgdG8gYnVtcCB0aGlzIHRvIG5leHQgZXZlbnQgbG9vcCBiZWNhdXNlIGNvbXBvbmVudCBtb3VudGluZyByb3V0aW5lbHlcbiAgLy8gcHJlY2VlZHMgdGhlIGRvbSBjbGljayBldmVudCB0aGF0IHRyaWdnZXJlZCB0aGUgbW91bnQgKHd0Zj8pXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfc3RvcmUyWydkZWZhdWx0J10uYWN0aXZhdGUoaW5zdGFuY2UpO1xuICB9LCAwKTtcbiAgX2xpYkxpc3RlbmVyczJbJ2RlZmF1bHQnXS5iaW5kS2V5cyhfb25LZXlEb3duKTtcbiAgX2xpYkxpc3RlbmVyczJbJ2RlZmF1bHQnXS5iaW5kQ2xpY2tzKF9vbkNsaWNrKTtcbiAgX2xpYkRvbV9oZWxwZXJzMlsnZGVmYXVsdCddLmJpbmRGb2N1c2FibGVzKGluc3RhbmNlLCBfc3RvcmUyWydkZWZhdWx0J10uYWN0aXZhdGUpO1xufVxuXG4vKipcbiAqIG9uVW5tb3VudFxuICpcbiAqIEBhY2Nlc3MgcHVibGljXG4gKi9cbmZ1bmN0aW9uIG9uVW5tb3VudChpbnN0YW5jZSkge1xuICBfc3RvcmUyWydkZWZhdWx0J10uZGVsZXRlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICBpZiAoX3N0b3JlMlsnZGVmYXVsdCddLmlzRW1wdHkoKSkge1xuICAgIF9saWJMaXN0ZW5lcnMyWydkZWZhdWx0J10udW5iaW5kQ2xpY2tzKF9vbkNsaWNrKTtcbiAgICBfbGliTGlzdGVuZXJzMlsnZGVmYXVsdCddLnVuYmluZEtleXMoX29uS2V5RG93bik7XG4gIH1cbn1cblxuZXhwb3J0cy5vbk1vdW50ID0gb25Nb3VudDtcbmV4cG9ydHMub25Vbm1vdW50ID0gb25Vbm1vdW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1rZXlkb3duL2Rpc3QvZXZlbnRfaGFuZGxlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQG1vZHVsZSBkb21IZWxwZXJzXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9O1xufVxuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbnZhciBfcmVhY3REb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3REb20pO1xuXG52YXIgZm9jdXNhYmxlU2VsZWN0b3IgPSAnYVtocmVmXSwgYnV0dG9uLCBpbnB1dCwgb2JqZWN0LCBzZWxlY3QsIHRleHRhcmVhLCBbdGFiaW5kZXhdJztcblxuLyoqXG4gKiBiaW5kRm9jdXNhYmxlczogRmluZCBhbnkgZm9jdXNhYmxlIGNoaWxkIGVsZW1lbnRzIG9mIHRoZSBjb21wb25lbnQgaW5zdGFuY2UgYW5kXG4gKiBhZGQgYW4gb25Gb2N1cyBoYW5kbGVyIHRvIGZvY3VzIG91ciBrZXlkb3duIGhhbmRsZXJzIG9uIHRoZSBwYXJlbnQgY29tcG9uZW50XG4gKiB3aGVuIHVzZXIga2V5cyBhcHBsaWVzIGZvY3VzIHRvIHRoZSBlbGVtZW50LlxuICpcbiAqIE5PVEU6IE9uZSBsaW1pdGF0aW9uIG9mIHRoaXMgcmlnaHQgbm93IGlzIHRoYXQgaWYgeW91IHRhYiBvdXQgb2YgdGhlXG4gKiBjb21wb25lbnQsIF9mb2N1c2VkSW5zdGFuY2Ugd2lsbCBzdGlsbCBiZSBzZXQgdW50aWwgbmV4dCBjbGljayBvciBtb3VudCBvclxuICogY29udHJvbGxlZCBmb2N1cy5cbiAqXG4gKiBAYWNjZXNzIHB1YmxpY1xuICogQHBhcmFtIHtvYmplY3R9IGluc3RhbmNlIFRoZSBrZXktYm91bmQgY29tcG9uZW50IGluc3RhbmNlXG4gKiBAcGFyYW0ge2NhbGxiYWNrfSBhY3RpdmF0ZU9uRm9jdXMgVGhlIGZuIHRvIGZpcmUgd2hlbiBlbGVtZW50IGlzIGZvY3VzZWRcbiAqL1xuZnVuY3Rpb24gYmluZEZvY3VzYWJsZXMoaW5zdGFuY2UsIGFjdGl2YXRlT25Gb2N1cykge1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCkge1xuICAgIHZhciBub2RlID0gX3JlYWN0RG9tMlsnZGVmYXVsdCddLmZpbmRET01Ob2RlKGluc3RhbmNlKTtcbiAgICBpZiAobm9kZSkge1xuICAgICAgdmFyIGZvY3VzYWJsZXMgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoZm9jdXNhYmxlU2VsZWN0b3IpO1xuICAgICAgaWYgKGZvY3VzYWJsZXMubGVuZ3RoKSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIG9uRm9jdXMgPSBmdW5jdGlvbiBvbkZvY3VzKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBvbkZvY3VzUHJldiA9IGVsZW1lbnQub25mb2N1cztcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgYWN0aXZhdGVPbkZvY3VzKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgaWYgKG9uRm9jdXNQcmV2KSBvbkZvY3VzUHJldi5jYWxsKGVsZW1lbnQsIGV2ZW50KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfTtcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmb2N1c2FibGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5vbmZvY3VzID0gb25Gb2N1cyhlbGVtZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBmaW5kQ29udGFpbmVyTm9kZXM6IENhbGxlZCBieSBvdXIgY2xpY2sgaGFuZGxlciB0byBmaW5kIGluc3RhbmNlcyB3aXRoIG5vZGVzXG4gKiB0aGF0IGFyZSBlcXVhbCB0byBvciB0aGF0IGNvbnRhaW4gdGhlIGNsaWNrIHRhcmdldC4gQW55IHRoYXQgcGFzcyB0aGlzIHRlc3RcbiAqIHdpbGwgYmUgcmVjaXBpZW50cyBvZiB0aGUgbmV4dCBrZXlkb3duIGV2ZW50LlxuICpcbiAqIEBhY2Nlc3MgcHVibGljXG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRoZSBjbGljayBldmVudC50YXJnZXQgRE9NIGVsZW1lbnRcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBSZWR1Y2VyIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGZpbmRDb250YWluZXJOb2Rlcyh0YXJnZXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChtZW1vLCBpbnN0YW5jZSkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgbm9kZSA9IF9yZWFjdERvbTJbJ2RlZmF1bHQnXS5maW5kRE9NTm9kZShpbnN0YW5jZSk7XG4gICAgICBpZiAobm9kZSAmJiAobm9kZSA9PT0gdGFyZ2V0IHx8IG5vZGUuY29udGFpbnModGFyZ2V0KSkpIHtcbiAgICAgICAgbWVtby5wdXNoKHsgaW5zdGFuY2U6IGluc3RhbmNlLCBub2RlOiBub2RlIH0pO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogc29ydEJ5RE9NUG9zaXRpb246IENhbGxlZCBieSBvdXIgY2xpY2sgaGFuZGxlciB0byBzb3J0IGEgbGlzdCBvZiBpbnN0YW5jZXNcbiAqIGFjY29yZGluZyB0byBsZWFzdCAtPiBtb3N0IG5lc3RlZC4gVGhpcyBpcyBzbyB0aGF0IGlmIG11bHRpcGxlIGtleWJvdW5kXG4gKiBpbnN0YW5jZXMgaGF2ZSBub2RlcyB0aGF0IGFyZSBhbmNlc3RvcnMgb2YgdGhlIGNsaWNrIHRhcmdldCwgdGhleSB3aWxsIGJlXG4gKiBzb3J0ZWQgdG8gbGV0IHRoZSBpbnN0YW5jZSBjbG9zZXN0IHRvIHRoZSBjbGljayB0YXJnZXQgZ2V0IGZpcnN0IGRpYnMgb24gdGhlXG4gKiBuZXh0IGtleSBkb3duIGV2ZW50LlxuICovXG5mdW5jdGlvbiBzb3J0QnlET01Qb3NpdGlvbihhLCBiKSB7XG4gIHJldHVybiBhLm5vZGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24oYi5ub2RlKSA9PT0gMTAgPyAxIDogLTE7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHsgYmluZEZvY3VzYWJsZXM6IGJpbmRGb2N1c2FibGVzLCBmaW5kQ29udGFpbmVyTm9kZXM6IGZpbmRDb250YWluZXJOb2Rlcywgc29ydEJ5RE9NUG9zaXRpb246IHNvcnRCeURPTVBvc2l0aW9uIH07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2xpYi9kb21faGVscGVycy5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBAbW9kdWxlIExpc3RlbmVyc1xuICpcbiAqL1xuXG4vLyBmbGFnIGZvciB3aGV0aGVyIGNsaWNrIGxpc3RlbmVyIGhhcyBiZWVuIGJvdW5kIHRvIGRvY3VtZW50XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIF9jbGlja3NCb3VuZCA9IGZhbHNlO1xuXG4vLyBmbGFnIGZvciB3aGV0aGVyIGtleWRvd24gbGlzdGVuZXIgaGFzIGJlZW4gYm91bmQgdG8gZG9jdW1lbnRcbnZhciBfa2V5c0JvdW5kID0gZmFsc2U7XG5cbnZhciBMaXN0ZW5lcnMgPSB7XG4gIC8qKlxuICAgKiBfYmluZEtleXNcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICovXG4gIGJpbmRLZXlzOiBmdW5jdGlvbiBiaW5kS2V5cyhjYWxsYmFjaykge1xuICAgIGlmICghX2tleXNCb3VuZCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGNhbGxiYWNrKTtcbiAgICAgIF9rZXlzQm91bmQgPSB0cnVlO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogdW5iaW5kS2V5c1xuICAgKlxuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKi9cbiAgdW5iaW5kS2V5czogZnVuY3Rpb24gdW5iaW5kS2V5cyhjYWxsYmFjaykge1xuICAgIGlmIChfa2V5c0JvdW5kKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgY2FsbGJhY2spO1xuICAgICAgX2tleXNCb3VuZCA9IGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogYmluZENsaWNrc1xuICAgKlxuICAgKiBAYWNjZXNzIHB1YmxpY1xuICAgKi9cbiAgYmluZENsaWNrczogZnVuY3Rpb24gYmluZENsaWNrcyhjYWxsYmFjaykge1xuICAgIGlmICghX2NsaWNrc0JvdW5kKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNhbGxiYWNrKTtcbiAgICAgIF9jbGlja3NCb3VuZCA9IHRydWU7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiB1bmJpbmRDbGlja3NcbiAgICpcbiAgICogQGFjY2VzcyBwdWJsaWNcbiAgICovXG4gIHVuYmluZENsaWNrczogZnVuY3Rpb24gdW5iaW5kQ2xpY2tzKGNhbGxiYWNrKSB7XG4gICAgaWYgKF9jbGlja3NCb3VuZCkge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYWxsYmFjayk7XG4gICAgICBfY2xpY2tzQm91bmQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IExpc3RlbmVycztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1rZXlkb3duL2Rpc3QvbGliL2xpc3RlbmVycy5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBAbW9kdWxlIG1ldGhvZFdyYXBwZXJcbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTtcbn1cblxudmFyIF9zdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3JlJyk7XG5cbnZhciBfc3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3RvcmUpO1xuXG52YXIgX2V2ZW50X2hhbmRsZXJzID0gcmVxdWlyZSgnLi4vZXZlbnRfaGFuZGxlcnMnKTtcblxuLyoqXG4gKiBfaXNSZWFjdEtleURvd25cbiAqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCBUaGUgcG9zc2libHkgc3ludGhldGljIGV2ZW50IHBhc3NlZCBhcyBhbiBhcmd1bWVudCB3aXRoXG4gKiB0aGUgbWV0aG9kIGludm9jYXRpb24uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBfaXNSZWFjdEtleURvd24oZXZlbnQpIHtcbiAgcmV0dXJuIGV2ZW50ICYmICh0eXBlb2YgZXZlbnQgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGV2ZW50KSkgPT09ICdvYmplY3QnICYmIGV2ZW50Lm5hdGl2ZUV2ZW50IGluc3RhbmNlb2Ygd2luZG93LktleWJvYXJkRXZlbnQgJiYgZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nO1xufVxuXG4vKipcbiAqIG1ldGhvZFdyYXBwZXJcbiAqXG4gKiBAYWNjZXNzIHB1YmxpY1xuICogQHBhcmFtIHtvYmplY3R9IGFyZ3MgQWxsIGFyZ3VtZW50cyBuZWNlc3NhcnkgZm9yIHdyYXBwaW5nIG1ldGhvZFxuICogQHBhcmFtIHtvYmplY3R9IGFyZ3MudGFyZ2V0IFRoZSBkZWNvcmF0ZWQgY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzLmRlc2NyaXB0b3IgTWV0aG9kIGRlc2NyaXB0b3JcbiAqIEBwYXJhbSB7YXJyYXl9IGFyZ3Mua2V5cyBUaGUgYXJyYXkgb2Yga2V5cyBib3VuZCB0byB0aGUgZ2l2ZW4gbWV0aG9kXG4gKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBtZXRob2QgZGVzY3JpcHRvclxuICovXG5mdW5jdGlvbiBtZXRob2RXcmFwcGVyKF9yZWYpIHtcbiAgdmFyIHRhcmdldCA9IF9yZWYudGFyZ2V0O1xuICB2YXIgZGVzY3JpcHRvciA9IF9yZWYuZGVzY3JpcHRvcjtcbiAgdmFyIGtleXMgPSBfcmVmLmtleXM7XG5cbiAgdmFyIGZuID0gZGVzY3JpcHRvci52YWx1ZTtcblxuICAvLyBpZiB3ZSBoYXZlbid0IGFscmVhZHkgY3JlYXRlZCBhIGJpbmRpbmcgZm9yIHRoaXMgY2xhc3MgKHZpYSBhbm90aGVyXG4gIC8vIGRlY29yYXRlZCBtZXRob2QpLCB3cmFwIHRoZXNlIGxpZmVjeWNsZSBtZXRob2RzLlxuICBpZiAoIV9zdG9yZTJbJ2RlZmF1bHQnXS5nZXRCaW5kaW5nKHRhcmdldCkpIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbXBvbmVudERpZE1vdW50ID0gdGFyZ2V0LmNvbXBvbmVudERpZE1vdW50O1xuICAgICAgdmFyIGNvbXBvbmVudFdpbGxVbm1vdW50ID0gdGFyZ2V0LmNvbXBvbmVudFdpbGxVbm1vdW50O1xuXG4gICAgICB0YXJnZXQuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgwLCBfZXZlbnRfaGFuZGxlcnMub25Nb3VudCkodGhpcyk7XG4gICAgICAgIGlmIChjb21wb25lbnREaWRNb3VudCkgcmV0dXJuIGNvbXBvbmVudERpZE1vdW50LmNhbGwodGhpcyk7XG4gICAgICB9O1xuXG4gICAgICB0YXJnZXQuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgwLCBfZXZlbnRfaGFuZGxlcnMub25Vbm1vdW50KSh0aGlzKTtcbiAgICAgICAgaWYgKGNvbXBvbmVudFdpbGxVbm1vdW50KSByZXR1cm4gY29tcG9uZW50V2lsbFVubW91bnQuY2FsbCh0aGlzKTtcbiAgICAgIH07XG4gICAgfSkoKTtcbiAgfVxuXG4gIC8vIGFkZCB0aGlzIGJpbmRpbmcgb2Yga2V5cyBhbmQgbWV0aG9kIHRvIHRoZSB0YXJnZXQncyBiaW5kaW5nc1xuICBfc3RvcmUyWydkZWZhdWx0J10uc2V0QmluZGluZyh7IGtleXM6IGtleXMsIHRhcmdldDogdGFyZ2V0LCBmbjogZm4gfSk7XG5cbiAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgbWF5YmVFdmVudCA9IGFyZ3NbMF07XG5cbiAgICBpZiAoX2lzUmVhY3RLZXlEb3duKG1heWJlRXZlbnQpKSB7XG4gICAgICAvLyBwcm94eSBtZXRob2QgaW4gb3JkZXIgdG8gdXNlIEBrZXlkb3duIGFzIGZpbHRlciBmb3Iga2V5ZG93biBldmVudHMgY29taW5nXG4gICAgICAvLyBmcm9tIGFuIGFjdHVhbCBvbktleURvd24gYmluZGluZyAoYXMgaWRlbnRpZmllZCBieSByZWFjdCdzIGFkZGl0aW9uIG9mXG4gICAgICAvLyAnbmF0aXZlRXZlbnQnICsgdHlwZSA9PT0gJ2tleWRvd24nKVxuICAgICAgaWYgKCFtYXliZUV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgLy8gd2UgYWxyZWFkeSB3aGl0ZWxpc3Qgc2hvcnRjdXRzIHdpdGggY3RybCBtb2RpZmllcnMgc28gaWYgd2Ugd2VyZSB0b1xuICAgICAgICAvLyBmaXJlIGl0IGFnYWluIGhlcmUgdGhlIG1ldGhvZCB3b3VsZCB0cmlnZ2VyIHR3aWNlLiBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2dsb3J0aG8vcmVhY3Qta2V5ZG93bi9pc3N1ZXMvMzhcbiAgICAgICAgcmV0dXJuICgwLCBfZXZlbnRfaGFuZGxlcnMuX29uS2V5RG93bikobWF5YmVFdmVudCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghbWF5YmVFdmVudCB8fCAhKG1heWJlRXZlbnQgaW5zdGFuY2VvZiB3aW5kb3cuS2V5Ym9hcmRFdmVudCkgfHwgbWF5YmVFdmVudC50eXBlICE9PSAna2V5ZG93bicpIHtcbiAgICAgIC8vIGlmIG91ciBmaXJzdCBhcmd1bWVudCBpcyBhIGtleWRvd24gZXZlbnQgaXQgaXMgYmVpbmcgaGFuZGxlZCBieSBvdXJcbiAgICAgIC8vIGJpbmRpbmcgc3lzdGVtLiBpZiBpdCdzIGFueXRoaW5nIGVsc2UsIGp1c3QgcGFzcyB0aHJvdWdoLlxuICAgICAgcmV0dXJuIGZuLmNhbGwuYXBwbHkoZm4sIFt0aGlzXS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gZGVzY3JpcHRvcjtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gbWV0aG9kV3JhcHBlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1rZXlkb3duL2Rpc3QvZGVjb3JhdG9ycy9tZXRob2RfZGVjb3JhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIEBtb2R1bGUgbWV0aG9kV3JhcHBlclNjb3BlZFxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTtcbn1cblxudmFyIF9saWJNYXRjaF9rZXlzID0gcmVxdWlyZSgnLi4vbGliL21hdGNoX2tleXMnKTtcblxudmFyIF9saWJNYXRjaF9rZXlzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xpYk1hdGNoX2tleXMpO1xuXG52YXIgX2xpYlBhcnNlX2tleXMgPSByZXF1aXJlKCcuLi9saWIvcGFyc2Vfa2V5cycpO1xuXG52YXIgX2xpYlBhcnNlX2tleXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGliUGFyc2Vfa2V5cyk7XG5cbi8qKlxuICogX3Nob3VsZFRyaWdnZXJcbiAqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB0aGlzUHJvcHMgRXhzdGluZyBwcm9wcyBmcm9tIHRoZSB3cmFwcGVkIGNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9IHRoaXNQcm9wcy5rZXlkb3duIFRoZSBuYW1lc3BhY2VkIHN0YXRlIGZyb20gdGhlIGhpZ2hlci1vcmRlclxuICogY29tcG9uZW50IChjbGFzc19kZWNvcmF0b3IpXG4gKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzIFRoZSBpbmNvbWluZyBwcm9wcyBmcm9tIHRoZSB3cmFwcGVkIGNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wcy5rZXlkb3duIFRoZSBuYW1lc2NhcGVkIHN0YXRlIGZyb20gdGhlIGhpZ2hlci1vcmRlclxuICogY29tcG9uZW50IChjbGFzc19kZWNvcmF0b3IpXG4gKiBAcGFyYW0ge2FycmF5fSBrZXlzIFRoZSBrZXlzIGJvdW5kIHRvIHRoZSBkZWNvcmF0ZWQgbWV0aG9kXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIGFsbCB0ZXN0cyBoYXZlIHBhc3NlZFxuICovXG5mdW5jdGlvbiBfc2hvdWxkVHJpZ2dlcihfcmVmLCBrZXlkb3duTmV4dCkge1xuICB2YXIga2V5ZG93blRoaXMgPSBfcmVmLmtleWRvd247XG5cbiAgcmV0dXJuIGtleWRvd25OZXh0ICYmIGtleWRvd25OZXh0LmV2ZW50ICYmICFrZXlkb3duVGhpcy5ldmVudDtcbn1cblxuLyoqXG4gKiBtZXRob2RXcmFwcGVyU2NvcGVkXG4gKlxuICogQGFjY2VzcyBwdWJsaWNcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzIEFsbCBhcmdzIG5lY2Vzc2FyeSBmb3IgZGVjb3JhdGluZyB0aGUgbWV0aG9kXG4gKiBAcGFyYW0ge29iamVjdH0gYXJncy50YXJnZXQgVGhlIGRlY29yYXRlZCBtZXRob2QncyBjbGFzcyBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzLmRlc2NyaXB0b3IgVGhlIG1ldGhvZCdzIGRlc2NyaXB0b3Igb2JqZWN0XG4gKiBAcGFyYW0ge2FycmF5fSBhcmdzLmtleXMgVGhlIGtleSBjb2RlcyBib3VuZCB0byB0aGUgZGVjb3JhdGVkIG1ldGhvZFxuICogQHJldHVybiB7b2JqZWN0fSBUaGUgbWV0aG9kJ3MgZGVzY3JpcHRvciBvYmplY3RcbiAqL1xuZnVuY3Rpb24gbWV0aG9kV3JhcHBlclNjb3BlZChfcmVmMikge1xuICB2YXIgdGFyZ2V0ID0gX3JlZjIudGFyZ2V0O1xuICB2YXIgZGVzY3JpcHRvciA9IF9yZWYyLmRlc2NyaXB0b3I7XG4gIHZhciBrZXlzID0gX3JlZjIua2V5cztcbiAgdmFyIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSB0YXJnZXQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcztcblxuICB2YXIgZm4gPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBpZiAoIWtleXMpIHtcbiAgICBjb25zb2xlLndhcm4oZm4gKyAnOiBrZXlkb3duU2NvcGVkIHJlcXVpcmVzIG9uZSBvciBtb3JlIGtleXMnKTtcbiAgfSBlbHNlIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGtleVNldHMgPSAoMCwgX2xpYlBhcnNlX2tleXMyWydkZWZhdWx0J10pKGtleXMpO1xuXG4gICAgICAvLyB3cmFwIHRoZSBjb21wb25lbnQncyBsaWZlY3ljbGUgbWV0aG9kIHRvIGludGVyY2VwdCBrZXkgY29kZXMgY29taW5nIGRvd25cbiAgICAgIC8vIGZyb20gdGhlIHdyYXBwZWQvc2NvcGVkIGNvbXBvbmVudCB1cCB0aGUgdmlldyBoaWVyYXJjaHkuIGlmIG5ldyBrZXlkb3duXG4gICAgICAvLyBldmVudCBoYXMgYXJyaXZlZCBhbmQgdGhlIGtleSBjb2RlcyBtYXRjaCB3aGF0IHdhcyBzcGVjaWZpZWQgaW4gdGhlXG4gICAgICAvLyBkZWNvcmF0b3IsIGNhbGwgdGhlIHdyYXBwZWQgbWV0aG9kLlxuICAgICAgdGFyZ2V0LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiAobmV4dFByb3BzKSB7XG4gICAgICAgIHZhciBrZXlkb3duID0gbmV4dFByb3BzLmtleWRvd247XG5cbiAgICAgICAgaWYgKF9zaG91bGRUcmlnZ2VyKHRoaXMucHJvcHMsIGtleWRvd24pKSB7XG4gICAgICAgICAgaWYgKGtleVNldHMuc29tZShmdW5jdGlvbiAoa2V5U2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gKDAsIF9saWJNYXRjaF9rZXlzMlsnZGVmYXVsdCddKSh7IGtleVNldDoga2V5U2V0LCBldmVudDoga2V5ZG93bi5ldmVudCB9KTtcbiAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywga2V5ZG93bi5ldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcykgcmV0dXJuIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMuY2FsbC5hcHBseShjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzLCBbdGhpcywgbmV4dFByb3BzXS5jb25jYXQoYXJncykpO1xuICAgICAgfTtcbiAgICB9KSgpO1xuICB9XG5cbiAgcmV0dXJuIGRlc2NyaXB0b3I7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IG1ldGhvZFdyYXBwZXJTY29wZWQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3Qta2V5ZG93bi9kaXN0L2RlY29yYXRvcnMvbWV0aG9kX2RlY29yYXRvcl9zY29wZWQuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcclxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcclxuICAgIElDT04gPSAnYWRkJztcclxuXHJcblxyXG52YXIgX19fX0NsYXNzNj1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzNl9fX19LZXkgaW4gX19fX0NsYXNzNil7aWYoX19fX0NsYXNzNi5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3M2X19fX0tleSkpe0J1dHRvblJlZ2lzdGVyQWRkW19fX19DbGFzczZfX19fS2V5XT1fX19fQ2xhc3M2W19fX19DbGFzczZfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzNj1fX19fQ2xhc3M2PT09bnVsbD9udWxsOl9fX19DbGFzczYucHJvdG90eXBlO0J1dHRvblJlZ2lzdGVyQWRkLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3M2KTtCdXR0b25SZWdpc3RlckFkZC5wcm90b3R5cGUuY29uc3RydWN0b3I9QnV0dG9uUmVnaXN0ZXJBZGQ7QnV0dG9uUmVnaXN0ZXJBZGQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzNjtcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgZnVuY3Rpb24gQnV0dG9uUmVnaXN0ZXJBZGQocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3M2LmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyQWRkLnByb3RvdHlwZSxcImhhbmRsZUNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uQ2xpY2soKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJBZGQucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcIkFkZFwiLCBcclxuICAgICAgICAgICAgcmVmOiBcImJ0bkFkZFwiLCBcclxuICAgICAgICAgICAgc3R5bGU6IHN0eWxlcy5idXR0b24sIFxyXG4gICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnNob3csIFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCwgXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKGUpICB7cmV0dXJuIHRoaXMuaGFuZGxlQ2xpY2soZSk7fS5iaW5kKHRoaXMpfSwgXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWFnZVwiLCB7cmVmOiBcImltYWdlXCIsIHNyYzogc3R5bGVzLmljb25zW0lDT05dfSlcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcbjtcclxuXHJcbkJ1dHRvblJlZ2lzdGVyQWRkLnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufVxyXG5cclxuXHJcbkJ1dHRvblJlZ2lzdGVyQWRkLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHNob3c6IHRydWVcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uUmVnaXN0ZXJBZGQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItYWRkL2J1dHRvbi1yZWdpc3Rlci1hZGQuanN4XG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGJ1dHRvbjoge1xuICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICBtYXJnaW46ICcycHgnXG4gICAgfSxcbiAgICBpY29uczoge1xuICAgICAgICBhZGQ6ICdpbWFnZXMvaWNvbnMvYWRkLnBuZycsXG4gICAgICAgIGVkaXQ6ICdpbWFnZXMvaWNvbnMvZWRpdC5wbmcnLFxuICAgICAgICBkZWxldGU6ICdpbWFnZXMvaWNvbnMvZGVsZXRlLnBuZycsXG4gICAgICAgIGZpbHRlcjogJ2ltYWdlcy9pY29ucy9maWx0ZXIucG5nJyxcbiAgICAgICAgcHJpbnQ6ICdpbWFnZXMvaWNvbnMvcHJpbnQucG5nJ1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci9idXR0b24tcmVnaXN0ZXItc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKTtcclxuXHJcblxyXG52YXIgX19fX0NsYXNzaz1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNza19fX19LZXkgaW4gX19fX0NsYXNzayl7aWYoX19fX0NsYXNzay5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NrX19fX0tleSkpe0J1dHRvbltfX19fQ2xhc3NrX19fX0tleV09X19fX0NsYXNza1tfX19fQ2xhc3NrX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2s9X19fX0NsYXNzaz09PW51bGw/bnVsbDpfX19fQ2xhc3NrLnByb3RvdHlwZTtCdXR0b24ucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2spO0J1dHRvbi5wcm90b3R5cGUuY29uc3RydWN0b3I9QnV0dG9uO0J1dHRvbi5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NrO1xyXG4vLyDQutC90L7Qv9C60LAg0YHQvtC30LTQsNC90LjRjyDQtNC+0LrRg9C80LXQvdGC0LAg0LIg0YDQtdCz0LjRgdGC0YDQsNGFXHJcbiAgICBmdW5jdGlvbiBCdXR0b24ocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3NrLmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b24ucHJvdG90eXBlLFwiaGFuZGxlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DbGljaygpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b24ucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gdmlzaWJpbGl0eVxyXG4gICAgICAgIGxldCBwcm9wU3R5bGUgID0gKCdzdHlsZScgaW4gdGhpcy5wcm9wcyk/IHRoaXMucHJvcHMuc3R5bGU6IHt9LFxyXG4gICAgICAgICAgICBzdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5idXR0b24sIHtkaXNwbGF5OiB0aGlzLnByb3BzLnNob3cgPyAnaW5saW5lJyA6ICdub25lJ30sIHByb3BTdHlsZSlcclxuXHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5zdGF0ZS5kaXNhYmxlZCwgXHJcbiAgICAgICAgICAgIHJlZjogXCJidXR0b25cIiwgXHJcbiAgICAgICAgICAgIHN0eWxlOiBzdHlsZSwgXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKGUpICB7cmV0dXJuIHRoaXMuaGFuZGxlQ2xpY2soZSk7fS5iaW5kKHRoaXMpfSwgXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW4sIFxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG5cclxuO1xyXG5cclxuQnV0dG9uLnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RcclxufVxyXG5cclxuXHJcbkJ1dHRvbi5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBzaG93OiB0cnVlXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci5qc3hcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcclxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcclxuICAgIElDT04gPSAnZWRpdCc7XHJcblxyXG5cclxudmFyIF9fX19DbGFzczU9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzczVfX19fS2V5IGluIF9fX19DbGFzczUpe2lmKF9fX19DbGFzczUuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzNV9fX19LZXkpKXtCdXR0b25SZWdpc3RlckVkaXRbX19fX0NsYXNzNV9fX19LZXldPV9fX19DbGFzczVbX19fX0NsYXNzNV9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3M1PV9fX19DbGFzczU9PT1udWxsP251bGw6X19fX0NsYXNzNS5wcm90b3R5cGU7QnV0dG9uUmVnaXN0ZXJFZGl0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3M1KTtCdXR0b25SZWdpc3RlckVkaXQucHJvdG90eXBlLmNvbnN0cnVjdG9yPUJ1dHRvblJlZ2lzdGVyRWRpdDtCdXR0b25SZWdpc3RlckVkaXQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzNTtcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgZnVuY3Rpb24gQnV0dG9uUmVnaXN0ZXJFZGl0KHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzNS5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlckVkaXQucHJvdG90eXBlLFwiaGFuZGxlQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DbGljaygpO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlckVkaXQucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcIkVkaXRcIiwgXHJcbiAgICAgICAgICAgIHJlZjogXCJidG5FZGl0XCIsIFxyXG4gICAgICAgICAgICBzaG93OiB0aGlzLnByb3BzLnNob3csIFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCwgXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKGUpICB7cmV0dXJuIHRoaXMuaGFuZGxlQ2xpY2soZSk7fS5iaW5kKHRoaXMpfSwgXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWFnZVwiLCB7cmVmOiBcImltYWdlXCIsIHNyYzogc3R5bGVzLmljb25zW0lDT05dfSlcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcbjtcclxuXHJcbkJ1dHRvblJlZ2lzdGVyRWRpdC5wcm9wVHlwZXMgPSB7XHJcbiAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG59XHJcblxyXG5cclxuQnV0dG9uUmVnaXN0ZXJFZGl0LmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHNob3c6IHRydWVcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uUmVnaXN0ZXJFZGl0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWVkaXQvYnV0dG9uLXJlZ2lzdGVyLWVkaXQuanN4XG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXItc3R5bGVzJyksXHJcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIuanN4JyksXHJcbiAgICBJQ09OID0gJ2RlbGV0ZSc7XHJcblxyXG5cclxudmFyIF9fX19DbGFzczc9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzczdfX19fS2V5IGluIF9fX19DbGFzczcpe2lmKF9fX19DbGFzczcuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzN19fX19LZXkpKXtCdXR0b25SZWdpc3RlckRlbGV0ZVtfX19fQ2xhc3M3X19fX0tleV09X19fX0NsYXNzN1tfX19fQ2xhc3M3X19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczc9X19fX0NsYXNzNz09PW51bGw/bnVsbDpfX19fQ2xhc3M3LnByb3RvdHlwZTtCdXR0b25SZWdpc3RlckRlbGV0ZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzNyk7QnV0dG9uUmVnaXN0ZXJEZWxldGUucHJvdG90eXBlLmNvbnN0cnVjdG9yPUJ1dHRvblJlZ2lzdGVyRGVsZXRlO0J1dHRvblJlZ2lzdGVyRGVsZXRlLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzczc7XHJcbi8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcclxuICAgIGZ1bmN0aW9uIEJ1dHRvblJlZ2lzdGVyRGVsZXRlKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzNy5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdXR0b25SZWdpc3RlckRlbGV0ZS5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyRGVsZXRlLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge1xyXG4gICAgICAgICAgICB2YWx1ZTogXCJEZWxldGVcIiwgXHJcbiAgICAgICAgICAgIHJlZjogXCJidG5EZWxldGVcIiwgXHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdywgXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24oZSkgIHtyZXR1cm4gdGhpcy5oYW5kbGVDbGljayhlKTt9LmJpbmQodGhpcyl9LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltYWdlXCIsIHtyZWY6IFwiaW1hZ2VcIiwgc3JjOiBzdHlsZXMuaWNvbnNbSUNPTl19KVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuO1xyXG5cclxuQnV0dG9uUmVnaXN0ZXJEZWxldGUucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5cclxuQnV0dG9uUmVnaXN0ZXJEZWxldGUuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgc2hvdzogdHJ1ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25SZWdpc3RlckRlbGV0ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvYnV0dG9uLXJlZ2lzdGVyL2J1dHRvbi1yZWdpc3Rlci1kZWxldGUvYnV0dG9uLXJlZ2lzdGVyLWRlbGV0ZS5qc3hcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcclxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcclxuICAgIElDT04gPSAncHJpbnQnO1xyXG5cclxuXHJcbnZhciBfX19fQ2xhc3M4PVJlYWN0LlB1cmVDb21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3M4X19fX0tleSBpbiBfX19fQ2xhc3M4KXtpZihfX19fQ2xhc3M4Lmhhc093blByb3BlcnR5KF9fX19DbGFzczhfX19fS2V5KSl7QnV0dG9uUmVnaXN0ZXJQcmludFtfX19fQ2xhc3M4X19fX0tleV09X19fX0NsYXNzOFtfX19fQ2xhc3M4X19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczg9X19fX0NsYXNzOD09PW51bGw/bnVsbDpfX19fQ2xhc3M4LnByb3RvdHlwZTtCdXR0b25SZWdpc3RlclByaW50LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3M4KTtCdXR0b25SZWdpc3RlclByaW50LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1CdXR0b25SZWdpc3RlclByaW50O0J1dHRvblJlZ2lzdGVyUHJpbnQuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzODtcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgZnVuY3Rpb24gQnV0dG9uUmVnaXN0ZXJQcmludChwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzczguY2FsbCh0aGlzLHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJQcmludC5wcm90b3R5cGUsXCJoYW5kbGVDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrKCk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyUHJpbnQucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgIHJlZjogXCJidG5QcmludFwiLCBcclxuICAgICAgICAgICAgdmFsdWU6IFwiUHJpbnRcIiwgXHJcbiAgICAgICAgICAgIHNob3c6IHRoaXMucHJvcHMuc2hvdywgXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLCBcclxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24oZSkge3JldHVybiB0aGlzLmhhbmRsZUNsaWNrKGUpO30uYmluZCh0aGlzKX0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIiwge3JlZjogXCJpbWFnZVwiLCBzcmM6IHN0eWxlcy5pY29uc1tJQ09OXX0pXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG47XHJcblxyXG5CdXR0b25SZWdpc3RlclByaW50LnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufVxyXG5cclxuXHJcbkJ1dHRvblJlZ2lzdGVyUHJpbnQuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgc2hvdzogdHJ1ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25SZWdpc3RlclByaW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLXByaW50L2J1dHRvbi1yZWdpc3Rlci1wcmludC5qc3hcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci1zdHlsZXMnKSxcclxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4uL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcclxuICAgIElDT04gPSAnZmlsdGVyJztcclxuXHJcblxyXG52YXIgX19fX0NsYXNzOT1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzOV9fX19LZXkgaW4gX19fX0NsYXNzOSl7aWYoX19fX0NsYXNzOS5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3M5X19fX0tleSkpe0J1dHRvblJlZ2lzdGVyRmlsdGVyW19fX19DbGFzczlfX19fS2V5XT1fX19fQ2xhc3M5W19fX19DbGFzczlfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzOT1fX19fQ2xhc3M5PT09bnVsbD9udWxsOl9fX19DbGFzczkucHJvdG90eXBlO0J1dHRvblJlZ2lzdGVyRmlsdGVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3M5KTtCdXR0b25SZWdpc3RlckZpbHRlci5wcm90b3R5cGUuY29uc3RydWN0b3I9QnV0dG9uUmVnaXN0ZXJGaWx0ZXI7QnV0dG9uUmVnaXN0ZXJGaWx0ZXIuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzOTtcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgZnVuY3Rpb24gQnV0dG9uUmVnaXN0ZXJGaWx0ZXIocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3M5LmNhbGwodGhpcyxwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1dHRvblJlZ2lzdGVyRmlsdGVyLnByb3RvdHlwZSxcImhhbmRsZUNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uQ2xpY2soKTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnV0dG9uUmVnaXN0ZXJGaWx0ZXIucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgIHJlZjogXCJidG5GaWx0ZXJcIiwgXHJcbiAgICAgICAgICAgIHZhbHVlOiBcIkZpbHRlclwiLCBcclxuICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93LCBcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQsIFxyXG4gICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbihlKSAge3JldHVybiB0aGlzLmhhbmRsZUNsaWNrKGUpO30uYmluZCh0aGlzKX0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1hZ2VcIiwge3JlZjogXCJpbWFnZVwiLCBzcmM6IHN0eWxlcy5pY29uc1tJQ09OXX0pXHJcbiAgICAgICAgKVxyXG4gICAgfX0pO1xyXG5cclxuO1xyXG5cclxuQnV0dG9uUmVnaXN0ZXJGaWx0ZXIucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG59XHJcblxyXG5cclxuQnV0dG9uUmVnaXN0ZXJGaWx0ZXIuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgc2hvdzogdHJ1ZVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblJlZ2lzdGVyRmlsdGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLWZpbHRlci9idXR0b24tcmVnaXN0ZXItZmlsdGVyLmpzeFxuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBCdXR0b24gPSByZXF1aXJlKCcuLi9idXR0b24tcmVnaXN0ZXIvYnV0dG9uLXJlZ2lzdGVyLmpzeCcpLFxyXG4gICAgc3R5bGVzID0gcmVxdWlyZSgnLi9tb2RhbHBhZ2Utc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzcz1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzc19fX19LZXkgaW4gX19fX0NsYXNzcyl7aWYoX19fX0NsYXNzcy5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NzX19fX0tleSkpe01vZGFsUGFnZVtfX19fQ2xhc3NzX19fX0tleV09X19fX0NsYXNzc1tfX19fQ2xhc3NzX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3M9X19fX0NsYXNzcz09PW51bGw/bnVsbDpfX19fQ2xhc3NzLnByb3RvdHlwZTtNb2RhbFBhZ2UucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc3MpO01vZGFsUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3I9TW9kYWxQYWdlO01vZGFsUGFnZS5fX3N1cGVyQ29uc3RydWN0b3JfXz1fX19fQ2xhc3NzO1xyXG4gICAgZnVuY3Rpb24gTW9kYWxQYWdlKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzcy5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQnRuQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNsb3NlTW9kYWxQYWdlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgc2hvdzogdGhpcy5wcm9wcy5zaG93XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb2RhbFBhZ2UucHJvdG90eXBlLFwiY2xvc2VNb2RhbFBhZ2VcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93OmZhbHNlfSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1vZGFsUGFnZS5wcm90b3R5cGUsXCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvdzogbmV4dFByb3BzLnNob3d9KTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTW9kYWxQYWdlLnByb3RvdHlwZSxcImhhbmRsZUJ0bkNsaWNrXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oYnRuRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnByb3BzLm1vZGFsUGFnZUJ0bkNsaWNrKGJ0bkV2ZW50KTtcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTW9kYWxQYWdlLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC10YHQu9C4INC/0LXRgNC10LTQsNC9INCw0YLRgNC40LHRgyBtb2RhbE9iamVjdHMgPSBbJ2J0bk9rJywnYnRuQ2FuY2VsJ11cclxuICAgICAgICBsZXQgaGlkZUJ0bk9rID0gdGhpcy5wcm9wcy5tb2RhbE9iamVjdHMuaW5kZXhPZignYnRuT2snKSA9PSAtMSA/IGZhbHNlIDogdHJ1ZSwgLy8g0YPQv9GA0LDQstC70LXQvdC40LUg0LrQvdC+0L/QutC+0Lkg0J7QulxyXG4gICAgICAgICAgICBoaWRlQnRuQ2FuY2VsID0gdGhpcy5wcm9wcy5tb2RhbE9iamVjdHMuaW5kZXhPZignYnRuQ2FuY2VsJykgPT0gLTEgPyBmYWxzZSA6IHRydWUsIC8vINGD0L/RgNCw0LLQu9C10L3QuNC1INC60L3QvtC/0LrQvtC5IENhbmNlbFxyXG4gICAgICAgICAgICBkaXNwbGF5TW9kYWwgPSB0aGlzLnN0YXRlLnNob3cgPyAnZmxleCc6ICdub25lJyAsXHJcbiAgICAgICAgICAgIGNvbnRhaW5lclN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmNvbnRhaW5lciwge2Rpc3BsYXk6IGRpc3BsYXlNb2RhbH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtyZWY6IFwiY29udGFpbmVyXCIsIHN0eWxlOiBjb250YWluZXJTdHlsZX0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5tb2RhbFBhZ2UsIHJlZjogXCJtb2RhbFBhZ2VDb250YWluZXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBzdHlsZXMuaGVhZGVyLCByZWY6IFwibW9kYWxQYWdlSGVhZGVyXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge3JlZjogXCJoZWFkZXJOYW1lXCIsIHN0eWxlOiBzdHlsZXMuaGVhZGVyTmFtZX0sIFwiIFwiLCB0aGlzLnByb3BzLm1vZGFsUGFnZU5hbWUsIFwiIFwiKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7c3R5bGU6IHN0eWxlcy5idXR0b25DbG9zZSwgcmVmOiBcImJ0bkNsb3NlXCIsIG9uQ2xpY2s6IHRoaXMuY2xvc2VNb2RhbFBhZ2UuYmluZCh0aGlzKSwgdmFsdWU6IFwieFwifSlcclxuICAgICAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLm1vZGFsUGFnZUNvbnRlbnQsIHJlZjogXCJtb2RhbFBhZ2VDb250ZW50XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogc3R5bGVzLm1vZGFsRm9vdGVyLCByZWY6IFwibW9kYWxQYWdlQnV0dG9uc1wifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVCdG5PayA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJidG5Pa1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJPa1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogc3R5bGVzLm1vZGFsUGFnZUJ1dHRvbnMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAoJ3dpZHRoJyBpbiBzdHlsZXMubW9kYWxQYWdlQnV0dG9ucyk/IHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zLndpZHRoOiBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICgnaGVpZ2h0JyBpbiBzdHlsZXMubW9kYWxQYWdlQnV0dG9ucyk/IHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zLmhlaWdodDogbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVCdG5DbGljay5iaW5kKHRoaXMsICdPaycpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJidG5Pa1wifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHN0eWxlcy5idXR0b25zU2VwYXJhdG9yfSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRlQnRuQ2FuY2VsID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImJ0bkNhbmNlbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJDYW5jZWxcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICgnd2lkdGgnIGluIHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zKT8gc3R5bGVzLm1vZGFsUGFnZUJ1dHRvbnMud2lkdGg6IG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogKCdoZWlnaHQnIGluIHN0eWxlcy5tb2RhbFBhZ2VCdXR0b25zKT8gc3R5bGVzLm1vZGFsUGFnZUJ1dHRvbnMuaGVpZ2h0OiBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUJ0bkNsaWNrLmJpbmQodGhpcywgJ0NhbmNlbCcpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwibW9kYWxQYWdlQnV0dG9uc1wiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJidG5DYW5jZWxcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuXHJcblxyXG5Nb2RhbFBhZ2UucHJvcFR5cGVzID0ge1xyXG4gICAgbW9kYWxQYWdlTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgbW9kYWxQYWdlQnRuQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBzaG93OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXHJcbn1cclxuXHJcblxyXG5Nb2RhbFBhZ2UuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgbW9kYWxQYWdlTmFtZTogJ2RlZmF1bE5hbWUnLFxyXG4gICAgbW9kYWxPYmplY3RzOiBbJ2J0bk9rJywgJ2J0bkNhbmNlbCddXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW9kYWxQYWdlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbHBhZ2UvbW9kYWxQYWdlLmpzeFxuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb250YWluZXI6IHtcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgIHRvcDogJzAnLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpJ1xuICAgIH0sXG4gICAgbW9kYWxQYWdlOiB7XG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICB3aWR0aDogJzUwJScsXG4gICAgICAgIGhlaWdodDogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnMTAlJyxcbiAgICAgICAgdG9wOiAnMCcsXG4gICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICAgIG1hcmdpbjogJzhweCcsXG4gICAgICAgIG92ZXJmbG93OiAnYXV0bycsXG4gICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgICAgIG91dGxpbmU6ICdub25lJyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJ1xuICAgIH0sXG4gICAgbW9kYWxQYWdlQ29udGVudDoge1xuICAgICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICAgIG1hcmdpbjogJzEwcHgnXG4gICAgfSxcbiAgICBoZWFkZXI6IHtcbiAgICAgICAgaGVpZ2h0OiAnMzBweCcsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBkYXJrZ3JheScsXG4gICAgICAgIGJhY2tncm91bmQ6ICdibHVlJyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nXG4gICAgfSxcblxuICAgIGhlYWRlck5hbWU6IHtcbiAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGFsaWduU2VsZjogJ2NlbnRlcicsXG4gICAgICAgIG1hcmdpbkxlZnQ6ICcxMHB4J1xuICAgIH0sXG5cbiAgICBtb2RhbEZvb3Rlcjoge1xuICAgICAgICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCdcbiAgICB9LFxuXG4gICAgbW9kYWxQYWdlQnV0dG9uczoge1xuICAgICAgICBoZWlnaHQ6ICczMHB4JyxcbiAgICAgICAgd2lkdGg6ICcxMDBweCdcbiAgICB9LFxuXG4gICAgYnV0dG9uc1NlcGFyYXRvcjoge1xuICAgICAgICB3aWR0aDogJzEwcHgnXG4gICAgfSxcblxuICAgIGJ1dHRvbkNsb3NlOiB7XG4gICAgICAgIGJvcmRlclJhZGl1czogJzUwJSdcbiAgICB9XG5cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFscGFnZS9tb2RhbHBhZ2Utc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvbW9kYWxQYWdlLmpzeCcpO1xyXG5cclxuY29uc3QgTW9kYWxQYWdlRGVsZXRlICA9IGZ1bmN0aW9uKHByb3BzKSB7XHJcbiAgICBsZXQgbW9kYWxPYmplY3RzID0gWydidG5PaycsICdidG5DYW5jZWwnXTtcclxuXHJcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2UsIHtcclxuICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogcHJvcHMubW9kYWxQYWdlQnRuQ2xpY2ssIFxyXG4gICAgICAgIG1vZGFsUGFnZU5hbWU6IFwiRGVsZXRlIGRvY3VtZW50XCJcclxuICAgIH0sIFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB7cGFkZGluZzo1MH19LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCIg0KPQtNCw0LvQuNGC0Ywg0LTQvtC60YPQvNC10L3RgiA/IFwiKVxyXG4gICAgICAgIClcclxuICAgICAgICApXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW9kYWxQYWdlRGVsZXRlIDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxQYWdlRGVsZXRlLmpzeFxuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBNb2RhbFBhZ2UgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL21vZGFsUGFnZS5qc3gnKTtcclxuXHJcbmNvbnN0IE1vZGFsUGFnZURlbGV0ZSAgPSBmdW5jdGlvbihwcm9wcykge1xyXG4gICAgbGV0IHN5c3RlbU1lc3NhZ2UgPSBwcm9wcy5zeXN0ZW1NZXNzYWdlID8gcHJvcHMuc3lzdGVtTWVzc2FnZTogJycsXHJcbiAgICAgICAgbW9kYWxPYmplY3RzID0gWydidG5PayddO1xyXG5cclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge1xyXG4gICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiBwcm9wcy5tb2RhbFBhZ2VCdG5DbGljaywgXHJcbiAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJXYXJuaW5nIVwiLCBcclxuICAgICAgICBtb2RhbE9iamVjdHM6IG1vZGFsT2JqZWN0c1xyXG5cclxuICAgIH0sIFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB7cGFkZGluZzo1MH19LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCIgXCIsIHN5c3RlbU1lc3NhZ2UsIFwiIFwiKVxyXG4gICAgICAgIClcclxuICAgIClcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFBhZ2VEZWxldGUgO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxQYWdlSW5mby5qc3hcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5JyksXHJcbiAgICBzdHlsZXMgPSByZXF1aXJlKCcuL2RhdGFsaXN0LXN0eWxlcycpO1xyXG5cclxudmFyIF9fX19DbGFzczI9UmVhY3QuUHVyZUNvbXBvbmVudDtmb3IodmFyIF9fX19DbGFzczJfX19fS2V5IGluIF9fX19DbGFzczIpe2lmKF9fX19DbGFzczIuaGFzT3duUHJvcGVydHkoX19fX0NsYXNzMl9fX19LZXkpKXtEYXRhTGlzdFtfX19fQ2xhc3MyX19fX0tleV09X19fX0NsYXNzMltfX19fQ2xhc3MyX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzczI9X19fX0NsYXNzMj09PW51bGw/bnVsbDpfX19fQ2xhc3MyLnByb3RvdHlwZTtEYXRhTGlzdC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzMik7RGF0YUxpc3QucHJvdG90eXBlLmNvbnN0cnVjdG9yPURhdGFMaXN0O0RhdGFMaXN0Ll9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzczI7XHJcbiAgICBmdW5jdGlvbiBEYXRhTGlzdChwcm9wcykge1xyXG4gICAgICAgIF9fX19DbGFzczIuY2FsbCh0aGlzLHByb3BzKTtcclxuXHJcbiAgICAgICAgbGV0IGlkeCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChwcm9wcy52YWx1ZSkge1xyXG4gICAgICAgICAgICAvLyB3ZSBnb3QgdmFsdWUsIHdlIHNob3VsZCBmaW5kIGluZGV4IGFuZCBpbml0aWxpemUgaWR4IGZpZWxkXHJcbiAgICAgICAgICAgIHByb3BzLmRhdGEuZm9yRWFjaChmdW5jdGlvbihyb3csIGluZGV4KSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvd1twcm9wcy5iaW5kRGF0YUZpZWxkXSA9PT0gcHJvcHMudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3VuZFxyXG4gICAgICAgICAgICAgICAgICAgIGlkeCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGRhdGE6IHByb3BzLmRhdGEsXHJcbiAgICAgICAgICAgIGNsaWNrZWQ6IGlkeCxcclxuICAgICAgICAgICAgdmFsdWU6IHByb3BzLnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGF0YUxpc3QucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnByb3BzLmRhdGEsXHJcbiAgICAgICAgICAgIGNsaWNrZWRJdGVtID0gdGhpcy5zdGF0ZS5jbGlja2VkO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtyZWY6IFwiZGF0YWxpc3RcIn0sIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHtyZWY6IFwiZGF0YWxpc3QtdWxcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCkgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGlja2VkSXRlbSA9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmRvY0xpc3QsIHN0eWxlcy5mb2N1c2VkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5kb2NMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50SWQgPSAnbGktJyArIGluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHtrZXk6IGNvbXBvbmVudElkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBjb21wb25lbnRJZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlTGlDbGljay5iaW5kKHRoaXMsIGluZGV4KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBzdHlsZX0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIHRoaXMpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERhdGFMaXN0LnByb3RvdHlwZSxcImhhbmRsZUxpQ2xpY2tcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbihpZHgpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnByb3BzLmRhdGFbaWR4XVt0aGlzLnByb3BzLmJpbmREYXRhRmllbGRdO1xyXG4gICAgICAgIC8v0YHRgtCw0LLQuNC8INC80LXRgtC60YNcclxuICAgICAgICAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBjbGlja2VkOiBpZHgsXHJcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgIGxldCBjaGFuZ2VBY3Rpb24gPSB0aGlzLnByb3BzLm5hbWUgKyAnQ2hhbmdlJ1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oY2hhbmdlQWN0aW9uLCB2YWx1ZSlcclxuICAgIH19KTtcclxuXHJcblxyXG5cclxuRGF0YUxpc3QucHJvcFR5cGVzID0ge1xyXG4gICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBkYXRhOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlcclxufTtcclxuXHJcbkRhdGFMaXN0LmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRhdGE6IFt7XHJcbiAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAga29vZDogJydcclxuICAgIH1dLFxyXG4gICAgdmFsdWU6ICcnLFxyXG4gICAgYmluZERhdGFGaWVsZDogJ2lkJ1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFMaXN0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhbGlzdC9kYXRhbGlzdC5qc3hcbi8vIG1vZHVsZSBpZCA9IDY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZG9jTGlzdDoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXG4gICAgICAgIHBhZGRpbmc6ICc1cHgnLFxuICAgICAgICBtYXJnaW5SaWdodDogJzIwcHgnXG4gICAgfSxcbiAgICBmb2N1c2VkOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Ymx1ZSdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhbGlzdC9kYXRhbGlzdC1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IHNpZGVCYXJTdHlsZXMgPSByZXF1aXJlKCcuL3NpZGViYXItc3R5bGVzJyksXHJcbiAgICBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcblxyXG5cclxudmFyIF9fX19DbGFzczQ9UmVhY3QuQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzNF9fX19LZXkgaW4gX19fX0NsYXNzNCl7aWYoX19fX0NsYXNzNC5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3M0X19fX0tleSkpe1NpZGVCYXJDb250YWluZXJbX19fX0NsYXNzNF9fX19LZXldPV9fX19DbGFzczRbX19fX0NsYXNzNF9fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3M0PV9fX19DbGFzczQ9PT1udWxsP251bGw6X19fX0NsYXNzNC5wcm90b3R5cGU7U2lkZUJhckNvbnRhaW5lci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzNCk7U2lkZUJhckNvbnRhaW5lci5wcm90b3R5cGUuY29uc3RydWN0b3I9U2lkZUJhckNvbnRhaW5lcjtTaWRlQmFyQ29udGFpbmVyLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzczQ7XHJcbiAgICBmdW5jdGlvbiBTaWRlQmFyQ29udGFpbmVyKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzNC5jYWxsKHRoaXMscHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogcHJvcHMud2lkdGgsXHJcbiAgICAgICAgICAgIGNvbnRlbnRXaWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sQmFyOiBwcm9wcy50b29sYmFyXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5idG5DbGlja0hhbmRsZXIgPSB0aGlzLmJ0bkNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTaWRlQmFyQ29udGFpbmVyLnByb3RvdHlwZSxcImJ0bkNsaWNrSGFuZGxlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuc3RhdGUuc2hvdyA/ICcyMHB4JyA6IHRoaXMucHJvcHMud2lkdGgsXHJcbiAgICAgICAgICAgIGNvbnRlbnRXaWR0aCA9IHRoaXMuc3RhdGUuc2hvdyA/ICcxcHgnIDogJzEwMCUnLFxyXG4gICAgICAgICAgICBzaG93Q29udGVudCA9ICF0aGlzLnN0YXRlLnNob3c7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgIGNvbnRlbnRXaWR0aDogY29udGVudFdpZHRoLFxyXG4gICAgICAgICAgICBzaG93OiBzaG93Q29udGVudFxyXG4gICAgICAgIH0pO1xyXG4gICAgfX0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTaWRlQmFyQ29udGFpbmVyLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCB0b29sQmFyU3ltYm9sID0gdGhpcy5zdGF0ZS5zaG93ID8gJzwnIDogJz4nOyAvL3RvZG8gbW92ZSB0byBzdHlsZXMgZmlsZVxyXG5cclxuICAgICAgICAvL3ByZXBhaXJlIHN0eWxlc1xyXG4gICAgICAgIGxldCBzaWRlQmFyQ29udGFpbmVyU3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzaWRlQmFyU3R5bGVzLnNpZGVCYXJDb250YWluZXJTdHlsZSwge3dpZHRoOiB0aGlzLnN0YXRlLndpZHRofSksXHJcbiAgICAgICAgICAgIHRvb2xCYXJTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sc2lkZUJhclN0eWxlcy50b29sQmFyU3R5bGUsIHt2aXNpYmlsaXR5OiB0aGlzLnByb3BzLnRvb2xiYXIgPyAndmlzaWJsZSc6ICdoaWRkZW4nfSksXHJcbiAgICAgICAgICAgIGNvbnRlbnRTdHlsZSA9IE9iamVjdC5hc3NpZ24oKHt9LHNpZGVCYXJTdHlsZXMuY29udGVudFN0eWxlLCB7dmlzaWJpbGl0eTogdGhpcy5zdGF0ZS5zaG93ID8gJ3Zpc2libGUnOiAnaGlkZGVuJ30pKSxcclxuICAgICAgICAgICAgYnV0dG9uU3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LHNpZGVCYXJTdHlsZXMuYnV0dG9uU3R5bGUsIHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy50b29sYmFyID8gc2lkZUJhclN0eWxlcy5idXR0b25TdHlsZS5oZWlnaHQ6ICcwJyxcclxuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IHRoaXMucHJvcHMudG9vbGJhciA/ICd2aXNpYmxlJzogJ2hpZGRlbidcclxuICAgICAgICB9IClcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwidG9vbEJhckNvbnRhaW5lclwiLCBzdHlsZTogc2lkZUJhckNvbnRhaW5lclN0eWxlLCByZWY6IFwidG9vbGJhclwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJidG5CYXJcIiwgc3R5bGU6IHRvb2xCYXJTdHlsZX0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7dHlwZTogXCJidXR0b25cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJzaWRlYmFyLWJ1dHRvblwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGJ1dHRvblN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRvb2xCYXJTeW1ib2wsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmJ0bkNsaWNrSGFuZGxlcn1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcImNvbnRlbnRcIiwgc3R5bGU6IGNvbnRlbnRTdHlsZSwgcmVmOiBcImNvbnRlbnRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9fSk7XHJcblxyXG5cclxuXHJcblxyXG5TaWRlQmFyQ29udGFpbmVyLnByb3BUeXBlcyA9IHtcclxuICAgIHRvb2xiYXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcclxufTtcclxuXHJcblNpZGVCYXJDb250YWluZXIuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdG9vbGJhcjogdHJ1ZSxcclxuICAgIHdpZHRoOiAnMTAwJSdcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2lkZUJhckNvbnRhaW5lcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzeFxuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzaWRlQmFyQ29udGFpbmVyU3R5bGU6IHtcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCByZWQnLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnXG4gICAgfSxcblxuICAgIHRvb2xCYXJTdHlsZToge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGhlaWdodDogJ2F1dG8nLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnZ3JheScsXG4gICAgICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJ1xuICAgIH0sXG4gICAgY29udGVudFN0eWxlOiB7XG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJ1xuICAgIH0sXG5cbiAgICBidXR0b25TdHlsZToge1xuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgaGVpZ2h0OiAnMjBweCcsXG4gICAgICAgIHdpZHRoOiAnMjBweCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXItc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBzdHlsZXMgPSByZXF1aXJlKCcuL3Rvb2xiYXItY29udGFpbmVyLXN0eWxlcycpLFxyXG4gICAgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5cclxudmFyIF9fX19DbGFzczM9UmVhY3QuQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzM19fX19LZXkgaW4gX19fX0NsYXNzMyl7aWYoX19fX0NsYXNzMy5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3MzX19fX0tleSkpe1Rvb2xCYXJDb250YWluZXJbX19fX0NsYXNzM19fX19LZXldPV9fX19DbGFzczNbX19fX0NsYXNzM19fX19LZXldO319dmFyIF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3MzPV9fX19DbGFzczM9PT1udWxsP251bGw6X19fX0NsYXNzMy5wcm90b3R5cGU7VG9vbEJhckNvbnRhaW5lci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShfX19fU3VwZXJQcm90b09mX19fX0NsYXNzMyk7VG9vbEJhckNvbnRhaW5lci5wcm90b3R5cGUuY29uc3RydWN0b3I9VG9vbEJhckNvbnRhaW5lcjtUb29sQmFyQ29udGFpbmVyLl9fc3VwZXJDb25zdHJ1Y3Rvcl9fPV9fX19DbGFzczM7XHJcbiAgICBmdW5jdGlvbiBUb29sQmFyQ29udGFpbmVyKHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzMy5jYWxsKHRoaXMscHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUb29sQmFyQ29udGFpbmVyLnByb3RvdHlwZSxcInJlbmRlclwiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcInRvb2xCYXJDb250YWluZXJcIiwgc3R5bGU6IHN0eWxlcy50b29sQmFyQ29udGFpbmVyU3R5bGV9LCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfX0pO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVG9vbEJhckNvbnRhaW5lcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvdG9vbGJhci1jb250YWluZXIvdG9vbGJhci1jb250YWluZXIuanN4XG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHRvb2xCYXJDb250YWluZXJTdHlsZToge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIGhlaWdodDogJzMwcHgnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcbiAgICAgICAgbWFyZ2luUmlnaHQ6ICc1cHgnXG4gICAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvdG9vbGJhci1jb250YWluZXIvdG9vbGJhci1jb250YWluZXItc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbnZhciBkb2NzU3RvcmUgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgICBpZDogJ2RvY3NTdG9yZScsXG4gICAgaW5pdGlhbFN0YXRlOiB7XG4gICAgICAgIGRvY3NHcmlkOiAwLFxuICAgICAgICBkb2NzTGlzdDogJycsXG4gICAgICAgIG5hbWU6ICd2bGFkJyxcbiAgICAgICAgZGF0YTogW10sXG4gICAgICAgIHNvcnRCeTogW3sgY29sdW1uOiAnaWQnLCBkaXJlY3Rpb246ICdkZXNjJyB9XSxcbiAgICAgICAgc3FsV2hlcmU6ICcnLFxuICAgICAgICBzeXN0ZW1NZXNzYWdlOiBudWxsXG4gICAgfSxcbiAgICBhY3Rpb25DYWxsYmFja3M6IHtcbiAgICAgICAgc3lzdGVtTWVzc2FnZUNoYW5nZTogZnVuY3Rpb24gc3lzdGVtTWVzc2FnZUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBzeXN0ZW1NZXNzYWdlOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc3FsV2hlcmVDaGFuZ2U6IGZ1bmN0aW9uIHNxbFdoZXJlQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHNxbFdoZXJlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIHJlcXVlcnkoeyBuYW1lOiAnZG9jc0dyaWQnLCB2YWx1ZTogdGhpcy5kb2NzTGlzdCB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc29ydEJ5Q2hhbmdlOiBmdW5jdGlvbiBzb3J0QnlDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgc29ydEJ5OiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIHJlcXVlcnkoeyBuYW1lOiAnZG9jc0dyaWQnLCB2YWx1ZTogdGhpcy5kb2NzTGlzdCwgc29ydEJ5OiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgQWRkOiBmdW5jdGlvbiBBZGQodXBkYXRlcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J1dHRvbiBMaXNhIGNsaWtlZCBuZXchICcgKyB0aGlzLmRvY3NHcmlkKTtcbiAgICAgICAgICAgIGFkZCh0aGlzLmRvY3NMaXN0KTtcbiAgICAgICAgfSxcbiAgICAgICAgRWRpdDogZnVuY3Rpb24gRWRpdCh1cGRhdGVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kb2NzTGlzdCAmJiB0aGlzLmRvY3NHcmlkKSB7XG4gICAgICAgICAgICAgICAgZWRpdCh0aGlzLmRvY3NMaXN0LCB0aGlzLmRvY3NHcmlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign0KLQuNC/INC00L7QutGD0LzQtdC90YLQsCDQuNC70Lgg0LTQvtC60YPQvNC10L3RgiDQvdC1INCy0YvQsdGA0LDQvScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBEZWxldGU6IGZ1bmN0aW9uIERlbGV0ZSh1cGRhdGVyKSB7XG4gICAgICAgICAgICB2YXIgZG9jVHlwZUlkID0gdGhpcy5kb2NzTGlzdDtcbiAgICAgICAgICAgIHJlcXVlcnlGb3JBY3Rpb24oJ2RlbGV0ZScsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3N5c3RlbU1lc3NhZ2VDaGFuZ2UnLCBlcnIpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzeXN0ZW1NZXNzYWdlQ2hhbmdlJywgbnVsbCk7IC8vINC/0LjRiNC10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyINGF0YDQsNC90LjQu9C40YnQtVxuICAgICAgICAgICAgICAgICAgICByZXF1ZXJ5KHsgbmFtZTogJ2RvY3NHcmlkJywgdmFsdWU6IGRvY1R5cGVJZCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgUHJpbnQ6IGZ1bmN0aW9uIFByaW50KHVwZGF0ZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdidXR0b24gUHJpbnQgY2xpa2VkIScpO1xuICAgICAgICB9LFxuICAgICAgICBjaGFuZ2VOYW1lOiBmdW5jdGlvbiBjaGFuZ2VOYW1lKHVwZGF0ZXIsIG5hbWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBuYW1lOiBuYW1lIH0pO1xuICAgICAgICB9LFxuICAgICAgICBkb2NzR3JpZENoYW5nZTogZnVuY3Rpb24gZG9jc0dyaWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkb2NzR3JpZDogdmFsdWUgfSk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGxvY2FsU3RvcmFnZVsnZG9jc0dyaWQnXSA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkb2NzTGlzdENoYW5nZTogZnVuY3Rpb24gZG9jc0xpc3RDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkb2NzTGlzdDogdmFsdWUgfSk7XG4gICAgICAgICAgICByZXF1ZXJ5KHsgbmFtZTogJ2RvY3NHcmlkJywgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICBsb2NhbFN0b3JhZ2VbJ2RvY3NMaXN0J10gPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YUNoYW5nZTogZnVuY3Rpb24gZGF0YUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gU3RvcmVzIHVwZGF0ZXMgYXJlIG9ubHkgbWFkZSBpbnNpZGUgc3RvcmUncyBhY3Rpb24gY2FsbGJhY2tzXG4gICAgICAgICAgICAvLyAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGFDaGFuZ2U6JywgdmFsdWUpO1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkYXRhOiB2YWx1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxufSk7XG5cbnZhciBlZGl0ID0gZnVuY3Rpb24gZWRpdChkb2NUeXBlSWQsIGRvY0lkKSB7XG4gICAgdmFyIHVybCA9IFwiL2RvY3VtZW50L1wiICsgZG9jVHlwZUlkICsgZG9jSWQ7XG4gICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcbn07XG5cbnZhciBhZGQgPSBmdW5jdGlvbiBhZGQoZG9jVHlwZUlkKSB7XG4gICAgdmFyIHVybCA9IFwiL2RvY3VtZW50L1wiICsgZG9jVHlwZUlkICsgJzAnO1xuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG59O1xuXG52YXIgcmVxdWVyeUZvckFjdGlvbiA9IGZ1bmN0aW9uIHJlcXVlcnlGb3JBY3Rpb24oYWN0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghd2luZG93LmpRdWVyeSkgcmV0dXJuOyAvLyDQtNC70Y8g0YLQtdGB0YLQvtCyXG5cbiAgICBpZiAoISQpIHJldHVybjtcbiAgICAvLyDQvNC10YLQvtC0INC+0LHQtdGB0L/QtdGH0LjRgiDQt9Cw0L/RgNC+0YEg0L3QsCDQstGL0L/QvtC70L3QtdC90LjQtVxuICAgIHZhciBwYXJhbWV0ZXJzID0ge1xuICAgICAgICBkb2NJZDogZG9jc1N0b3JlLmRvY3NHcmlkLFxuICAgICAgICBkb2NfdHlwZV9pZDogZG9jc1N0b3JlLmRvY3NMaXN0XG4gICAgfTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvZG9jJyxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocGFyYW1ldGVycylcbiAgICAgICAgfSxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKGRhdGEpIHtcbiAgICAgICAgICAgIC8vINC00L7Qu9C20L3RiyDQv9C+0LvRg9GH0LjRgtGMINC+0LHRitC10LrRgiAtINGA0LXQt9GD0LvRjNGC0LDRglxuICAgICAgICAgICAgdmFyIGVycm9yTWVzc3NhZ2UgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGRhdGEucmVzdWx0ID09ICdFcnJvcicpIHtcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NzYWdlID0gJ0Vycm9yLCAnICsgZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3JNZXNzc2FnZSwgZGF0YSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcih4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCcvZXJyb3InLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbnZhciByZXF1ZXJ5ID0gZnVuY3Rpb24gcmVxdWVyeShjb21wb25lbnQpIHtcbiAgICBpZiAoIXdpbmRvdy5qUXVlcnkpIHJldHVybjsgLy8g0LTQu9GPINGC0LXRgdGC0L7QslxuXG4gICAgLy8g0LzQtdGC0L7QtCDQvtCx0LXRgdC/0LXRh9C40YIg0L/QvtC70YPRh9C10L3QuNC1INC00LDQvdC90YvRhSDQvtGCINGB0LXRgNCy0LXRgNCwXG4gICAgLy8gY29tcG9uZW50ID0gdGhpcy5zdGF0ZS5jb21wb25lbnRzW25hbWVdXG4gICAgLy8g0LXRgdC70Lgg0L/QsNGA0LDQvNC10YLRgNGLINC90LUg0LfQsNC00LDQvdGLLCDQs9GA0YPQt9C40Lwg0LLRgdC1XG5cbiAgICB2YXIgY29tcG9uZW50cyA9IGRvY3NTdG9yZS5kYXRhO1xuXG4gICAgLy8g0YTQuNC70YzRgtGA0YPQtdC8INGB0L/QuNGB0L7QuiDQutC+0LzQv9C+0L3QtdC90YLQvtCyXG4gICAgdmFyIGNvbXBvbmVudHNGb3JVcGRhdGUgPSBjb21wb25lbnRzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAvLyDQuNGJ0LXQvCDQvtCx0YrQtdC60YIg0L/QviDQvdCw0LjQvNC10L3QvtCy0LDQvdC40Y4uINC40LvQuCDQstC10YDQvdC10Lwg0LLRgdC1INC10YHQu9C4INC/0LDRgNCw0LzQtdGC0YAg0L3QtSDQt9Cw0LTQsNC9XG4gICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdjb21wb25lbnQ6JyArIEpTT04uc3RyaW5naWZ5KGNvbXBvbmVudCkpO1xuICAgICAgICBpZiAoY29tcG9uZW50Lm5hbWUgPT0gJycgfHwgaXRlbS5uYW1lID09IGNvbXBvbmVudC5uYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyDRgdC+0YDRgtC40YDQvtCy0LrQsFxuICAgIHZhciBzcWxTb3J0QnkgPSAnJyxcbiAgICAgICAgc3FsV2hlcmUgPSBkb2NzU3RvcmUuc3FsV2hlcmUgfHwgJyc7XG4gICAgdmFyIHNvcnRCeUFycmF5ID0gZG9jc1N0b3JlLnNvcnRCeSxcbiAgICAgICAgYXJyVHlwZSA9IHR5cGVvZiBzb3J0QnlBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yoc29ydEJ5QXJyYXkpO1xuICAgIGlmIChkb2NzU3RvcmUuc29ydEJ5KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc29ydEJ5QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIHNxbFNvcnRCeSA9IHNxbFNvcnRCeSArICcsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNxbFNvcnRCeSA9IHNxbFNvcnRCeSArIHNvcnRCeUFycmF5W2ldLmNvbHVtbiArICcgJyArIHNvcnRCeUFycmF5W2ldLmRpcmVjdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBVUkwgPSAnL2FwaS9kb2NzJztcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFVSTCxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG5cbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZGF0YVR5cGU6ICdjb21wb25lbnQnLFxuICAgICAgICAgICAgZG9jVHlwZUlkOiAxLFxuICAgICAgICAgICAgY29tcG9uZW50czogSlNPTi5zdHJpbmdpZnkoY29tcG9uZW50c0ZvclVwZGF0ZSksIC8vINC60L7QvNC/0L7QvdC10L3RgtGLINC00LvRjyDQvtCx0L3QvtCy0LvQtdC90LjRj1xuICAgICAgICAgICAgcGFyYW1ldGVyOiBjb21wb25lbnQudmFsdWUsIC8vINC/0LDRgNCw0LzQtdGC0YDRi1xuICAgICAgICAgICAgc29ydEJ5OiBzcWxTb3J0QnksIC8vINGB0L7RgNGC0LjRgNC+0LLQutCwXG4gICAgICAgICAgICBzcWxXaGVyZTogc3FsV2hlcmUgfSxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy8g0LTQvtC70LbQvdGLINC/0L7Qu9GD0YfQuNGC0Ywg0L7QsdGK0LXQutGCXG4gICAgICAgICAgICAvLyAgICAgICAgICAgY29uc29sZS5sb2coJ3BhcmVudCBhcnJpdmVkIGRhdGE6JyArIEpTT04uc3RyaW5naWZ5KGRhdGEpICsgJ9GC0LjQvzonICsgdHlwZW9mIGRhdGEpO1xuXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAvLyBmaW5kIGl0ZW1cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwYXJlbnQgSXRlbTonICsgSlNPTi5zdHJpbmdpZnkoaXRlbSkgKTtcbiAgICAgICAgICAgICAgICAvLyDQvtCx0L3QvtCy0LjQvCDQtNCw0L3QvdGL0LUg0LzQsNGB0YHQuNCy0LAg0LrQvtC80L/QvtC90LXQvdGC0L7QslxuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMgPSBjb21wb25lbnRzLm1hcChmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQubmFtZSA9PSBpdGVtLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuZGF0YSA9IGl0ZW0uZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdG9yZSBkYXRhIHVwZGF0ZTonICsgSlNPTi5zdHJpbmdpZnkoY29tcG9uZW50cykpO1xuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGNvbXBvbmVudHMpO1xuICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignL2Vycm9yJywgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkb2NzU3RvcmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9zdG9yZXMvZG9jc19zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDL2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDalFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzNJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OzsiLCJzb3VyY2VSb290IjoiIn0=
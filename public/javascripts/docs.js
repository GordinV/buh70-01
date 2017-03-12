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
	    DataGrid = __webpack_require__(38),
	    ButtonRegister = __webpack_require__(39),
	    ModalPage = __webpack_require__(25),
	    ModalPageDelete = __webpack_require__(40),
	    ModalPageInfo = __webpack_require__(41),
	    flux = __webpack_require__(5),
	    DataList = __webpack_require__(42),
	    Sidebar = __webpack_require__(44),
	    Toolbar = __webpack_require__(46);

	let myComponents = [];

	if (!typeof window === 'undefined') {
	    // берем данные с локального хранилища
	    myComponents = JSON.parse(localStorage['docsStore']);
	}

	// Create a store
	var docsStore = __webpack_require__(48);

	// создаем класс - держатель состояний
	var Parent = React.createClass({
	    displayName: 'Parent',

	    filterData: ['btnOk', 'btnCancel'], // массив объектов, куда запишем параметры для фильтрации @todo вынести все в отдельный компонет для фильтрации

	    getInitialState: function getInitialState() {
	        return {
	            // у каждого компонента свой объект
	            components: this.props.components, // @todo вынести в отдельный файл компонента
	            gridLeft: '13%',
	            gridWidth: '90%',
	            getFilter: false,
	            getDeleteModalPage: false,
	            showSystemMessage: false

	        };
	    },

	    componentWillMount: function () {
	        var self = this;

	        // создаем обработчик события на изменение даннх
	        docsStore.on('change:data', function (newValue, previousValue) {
	            // данные изменились, меняем состояние
	            self.setState({components: docsStore.data})
	        })

	        // создаем обработчик события на сворачивание панелей
	        docsStore.on('change:tooglePanel', function (newValue, previousValue) {
	            var toogleData = flux.stores.docsStore.tooglePanelData;
	            // данные изменились, меняем состояние
	            self.setState({gridLeft: toogleData.left, gridWidth: toogleData.width})
	        })

	        // создаем обработчик события системный извещение
	        docsStore.on('change:systemMessage', function (newValue, previousValue) {
	            // данные изменились, меняем состояние
	            let systemMessageStatus = newValue ? true : false;
	            self.setState({showSystemMessage: systemMessageStatus});
	        })

	    },

	    componentDidMount: function () {
	        // покажем данные

	        let lastComponent = localStorage['docsList'];
	        flux.doAction('dataChange', this.props.components);
	        if (lastComponent) {
	            flux.doAction('docsListChange', lastComponent);
	        }
	    },
	    /*
	     shouldComponentUpdate: function(nextProps, nextState) {
	     // изменения будут отражаться только в случае если такие есть
	     console.log(JSON.stringify(nextState) + ' VS ' + JSON.stringify(this.state));
	     var returnValue = (JSON.stringify(nextState) !== JSON.stringify(this.state) );
	     return returnValue;
	     },

	     */
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

	        return (React.createElement("div", {id: "parentDiv"}, 

	                React.createElement("div", {id: "docContainer", style: docContainerStyle}, 
	                    React.createElement(Toolbar, null, 
	                        React.createElement("div", null, 
	                            React.createElement(ButtonRegister, {onClick: this.btnAddClick, value: " Add "}), 
	                            React.createElement(ButtonRegister, {onClick: this.btnEditClick, value: " Edit "}), 
	                            React.createElement(ButtonRegister, {onClick: this.btnDeleteClick, value: " Delete "}), 
	                            React.createElement(ButtonRegister, {onClick: this.btnPrintClick, value: " Print "}), 
	                            React.createElement("button", {
	                                className: "gridToolbar", 
	                                onClick: this.btnFilterClick
	                            }, " Filter"
	                            )
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
	                    )

	                    /*
	                     <Sidebar width="100%" toolbar={false}>
	                     {this.getGridComponent()}
	                     </Sidebar>
	                     */


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

	//                    console.log('componentObjekt:', componentObjektValue);
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
	    }
	});

	module.exports = Parent;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	var DataGrid = React.createClass({
	    displayName: 'DataGrid',
	    getInitialState: function getInitialState() {

	        return {
	            gridColumns: this.props.gridColumns,
	            gridData: this.props.gridData,
	            clicked: 0
	        };
	    },
	    componentWillReceiveProps: function (nextProps) {
	        /*
	         if (nextProps.gridData) {
	         var docId =  localStorage['docsGrid'],
	         index = this.getGridRowIndexById(docId);

	         console.log('componentWillReceiveProps', index, docId);
	         this.handleCellClick(index);
	         }
	         */
	    },

	    /*

	     shouldComponentUpdate: function(nextProps, nextState) {
	     // изменения будут отражаться только в случае если такие есть
	     var returnValue = (JSON.stringify(nextState) !== JSON.stringify(this.state) );
	     return returnValue;
	     },
	     */
	    componentDidMount: function () {

	/*
	         console.log('grid componentDidMount',localStorage['docsGrid'] );

	         // ищем последнюю строку
	         if (this.state.clicked == 0) {
	         // отметим последний отмеченный документ
	         var docId =  localStorage['docsGrid'],
	         index = this.getGridRowIndexById(docId);

	         console.log('grid componentDidMount',docId,index );

	         this.setState({clicked: index});
	         }
	*/

	    },

	    componentWillMount: function () {

	        var self = this;
	        // повесим обработчики


	        flux.stores.docsStore.on('change:data', function (newValue, previousValue) {
	            // данные изменились, меняем состояние
	            // ищем последнюю строку
	            // отметим последний отмеченный документ

	 //           console.log('my grid on change list ', newValue, previousValue)

	            if (newValue !== []) {
	                var docId = localStorage['docsGrid'],
	                    index = self.getGridRowIndexById(docId);

	                self.setState({clicked: index});
	            }

	        })

	    },

	    getGridRowIndexById: function (docId) {
	        // ищем индех в массиве данных
	        var index = 0,
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
	    },

	    handleCellClick: function handleCellClick(idx) {
	        // отрабатывает событи клика по ячейке
	        this.setState({
	            clicked: idx
	        });

	        if (this.props.gridData.length > 0) {
	            var docId = this.props.gridData[idx].id;
	 //           console.log('myGrid handleCellClick:', idx, docId, this.props.gridData);
	            // сохраним в хранилище
	            flux.doAction(this.props.onChangeAction, docId);
	        }
	    },

	    handleCellDblClick: function () {
	        // вызовет метод редактирования
	        flux.doAction('Edit');
	    },

	    handleGridHeaderClick: function (name) {
	        var sortBy = [{column: name, direction: 'asc'}];
	        flux.doAction('sortByChange', sortBy);
	    },

	    handleKeyDown: function (e) {
	        // реакция на клавиатуру
	        console.log('handleKeyPress ', e);
	        /*
	         if (keyDirection == 'Down') {
	         this.setState({
	         clicked: (this.state.clicked + 1)
	         });
	         }
	         */

	    },
	    render: function render() {
	        var gridRows = this.props.gridData; // статичны и приходят только из верхнего компонента
	        var gridColumns = this.props.gridColumns;
	        var clickedItem = this.state.clicked;

	        var className = 'th',
	            self = this;
	        /*       onKeyDown: this.handleKeyPress('Down'),
	         onDoubleClick: this.handleCellDblClick(),
	         */
	        return (React.createElement("table", {ref: "myGridRef"}, 
	                    React.createElement("tbody", null, 
	                    React.createElement("tr", null, 
	                        
	                            gridColumns.map(function (column, index) {
	                                var gridStyle = {
	                                    width: column.width
	                                };
	                                className = 'th-' + column.id;
	                                return React.createElement("th", {
	                                            style: gridStyle, 
	                                            className: className, 
	                                            key: 'th-' + index, 
	                                            onClick: this.handleGridHeaderClick.bind(this, column.id)
	                                        }, 
	                                            column.name
	                                        )
	                            }, this)

	                    )
	                    ), 
	                    React.createElement("tbody", null, 
	                    
	                        gridRows.map(function (row, index) {
	                            var myClass = 'notFocused';
	                            if (clickedItem == index) {
	                                myClass = 'focused'; // подсветим выбранную строку
	                            }
	                            ;
	                            return (React.createElement("tr", {
	                                onClick: this.handleCellClick.bind(this, index), 
	                                className: myClass, 
	                                key: 'doc-' + index}, 
	                                
	                                    gridColumns.map(function (cell, index) {
	                                           return (React.createElement("td", {key: 'td' + index}, 
	                                                   row[cell.id]
	                                           ))
	                                        })
	                                

	                            ))
	                        }, this)
	                    
	                    )
	                )
	        );

	    }
	});

	module.exports = DataGrid;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4);

	const ButtonRegister = function(props)  {
	// кнопка создания документа в регистрах
	        return React.createElement("input", {type: "button", 
	                      className: "gridToolbar", 
	                      value: props.value, 
	                      onClick: props.onClick})
	};

	ButtonRegister.propTypes = {
	    onClick: React.PropTypes.func.isRequired,
	    value: React.PropTypes.string.isRequired
	}

	module.exports = ButtonRegister;

/***/ },
/* 40 */
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
/* 41 */
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const React = __webpack_require__(4),
	    flux = __webpack_require__(5),
	    styles = __webpack_require__(43);

	var ____Classj=React.PureComponent;for(var ____Classj____Key in ____Classj){if(____Classj.hasOwnProperty(____Classj____Key)){DataList[____Classj____Key]=____Classj[____Classj____Key];}}var ____SuperProtoOf____Classj=____Classj===null?null:____Classj.prototype;DataList.prototype=Object.create(____SuperProtoOf____Classj);DataList.prototype.constructor=DataList;DataList.__superConstructor__=____Classj;
	    function DataList(props) {
	        ____Classj.call(this,props);

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
/* 43 */
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const sideBarStyles = __webpack_require__(45),
	    React = __webpack_require__(4);


	var ____Classk=React.Component;for(var ____Classk____Key in ____Classk){if(____Classk.hasOwnProperty(____Classk____Key)){SideBarContainer[____Classk____Key]=____Classk[____Classk____Key];}}var ____SuperProtoOf____Classk=____Classk===null?null:____Classk.prototype;SideBarContainer.prototype=Object.create(____SuperProtoOf____Classk);SideBarContainer.prototype.constructor=SideBarContainer;SideBarContainer.__superConstructor__=____Classk;
	    function SideBarContainer(props) {
	        ____Classk.call(this,props);

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
	                React.createElement("div", {id: "content", style: contentStyle}, 
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
/* 45 */
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const styles = __webpack_require__(47),
	    React = __webpack_require__(4);

	const ToolBar = React.createClass({displayName: "ToolBar",
	    getInitialState: function() {
	        return {
	            show: true
	        }
	    },

	    render: function() {
	        return (
	            React.createElement("div", {id: "toolBarContainer", style: styles.toolBarContainerStyle}, 
	                    this.props.children
	            )
	        );
	    }
	});

	module.exports = ToolBar;

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    toolBarContainerStyle: {
	        display: 'flex',
	        width: '100%',
	        height: '30px',
	        border: '1px solid black',
	        justifyContent: 'flex-end'
	    }
	};

/***/ },
/* 48 */
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
	        tooglePanel: true, // opened
	        tooglePanelData: { tree: '10%', grid: '90%', left: '13%' }, // opened,
	        systemMessage: null
	    },
	    actionCallbacks: {
	        systemMessageChange: function systemMessageChange(updater, value) {
	            console.log('systemMessageChange called', value);
	            updater.set({ systemMessage: value });
	        },
	        sqlWhereChange: function sqlWhereChange(updater, value) {
	            console.log('sqlWhereChange called', value);
	            updater.set({ sqlWhere: value });
	            requery({ name: 'docsGrid', value: this.docsList });
	        },
	        sortByChange: function sortByChange(updater, value) {
	            updater.set({ sortBy: value });
	            requery({ name: 'docsGrid', value: this.docsList, sortBy: value });
	        },
	        tooglePanelChange: function tooglePanelChange(updater, value, data) {
	            updater.set({ tooglePanel: value, tooglePanelData: data });
	        },
	        Add: function Add(updater) {
	            console.log('button Lisa cliked new! ' + this.docsGrid);
	            add(this.docsList);
	        },
	        Edit: function Edit(updater) {
	            console.log('button Muuda cliked!');
	            if (this.docsList && this.docsGrid) {
	                edit(this.docsList, this.docsGrid);
	            } else {
	                console.log('Тип документа или документ не выбран');
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
	            updater.set({ docsList: value });
	            requery({ name: 'docsGrid', value: value });
	            localStorage['docsList'] = value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtcmVnaXN0ZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YS1ncmlkLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbFBhZ2VEZWxldGUuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxQYWdlSW5mby5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhbGlzdC9kYXRhbGlzdC5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kYXRhbGlzdC9kYXRhbGlzdC1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLXN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL3Rvb2xiYXIvdG9vbGJhci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy90b29sYmFyL3Rvb2xiYXItc3R5bGVzLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL3N0b3Jlcy9kb2NzX3N0b3JlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8vINC90YDRg9C30LjQvCDQutC+0LzQv9C+0L3QtdC90YLRi1xuXG4vL3ZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuLy8g0YHQvtC30LTQsNC10Lwg0L7QutC70LDRgdGBIC0g0LTQtdGA0LbQsNGC0LXQu9GMINGB0L7RgdGC0L7Rj9C90LjQuVxuXG52YXIgUGFyZW50ID0gcmVxdWlyZSgnLi4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtcmVnaXN0ZXIuanN4Jyk7XG5cbi8vINC00LDQvdC90YvQtSDQtNC70Y8g0YXRgNCw0L3QuNC70LjRidCwXG5sb2NhbFN0b3JhZ2VbJ2RvY3NTdG9yZSddID0gc3RvcmVEYXRhO1xuc3RvcmVEYXRhID0gSlNPTi5wYXJzZShzdG9yZURhdGEpO1xuLy9jb25zb2xlLmxvZygnc3RvcmVEYXRhIGZyb20gZG9jcycsIHN0b3JlRGF0YSk7XG5SZWFjdERPTS5yZW5kZXIoUmVhY3QuY3JlYXRlRWxlbWVudChQYXJlbnQsIHsgaWQ6ICdncmlkJywgY29tcG9uZW50czogc3RvcmVEYXRhIH0sICfQotGD0YIg0LHRg9C00YPRgiDQutC+0LzQv9C+0L3QtdC90YLRiycpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZCcpKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2RvY3MuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xyXG4vLyDQs9GA0YPQt9C40Lwg0LrQvtC80L/QvtC90LXQvdGC0YtcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIERhdGFHcmlkID0gcmVxdWlyZSgnLi9kYXRhLWdyaWQuanN4JyksXHJcbiAgICBCdXR0b25SZWdpc3RlciA9IHJlcXVpcmUoJy4vYnV0dG9uLXJlZ2lzdGVyLmpzeCcpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi9tb2RhbFBhZ2UuanN4JyksXHJcbiAgICBNb2RhbFBhZ2VEZWxldGUgPSByZXF1aXJlKCcuL21vZGFsUGFnZURlbGV0ZS5qc3gnKSxcclxuICAgIE1vZGFsUGFnZUluZm8gPSByZXF1aXJlKCcuL21vZGFsUGFnZUluZm8uanN4JyksXHJcbiAgICBmbHV4ID0gcmVxdWlyZSgnZmx1eGlmeScpLFxyXG4gICAgRGF0YUxpc3QgPSByZXF1aXJlKCcuL2RhdGFsaXN0L2RhdGFsaXN0LmpzeCcpLFxyXG4gICAgU2lkZWJhciA9IHJlcXVpcmUoJy4vc2lkZWJhci9zaWRlYmFyLmpzeCcpLFxyXG4gICAgVG9vbGJhciA9IHJlcXVpcmUoJy4vdG9vbGJhci90b29sYmFyLmpzeCcpO1xyXG5cclxubGV0IG15Q29tcG9uZW50cyA9IFtdO1xyXG5cclxuaWYgKCF0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgLy8g0LHQtdGA0LXQvCDQtNCw0L3QvdGL0LUg0YEg0LvQvtC60LDQu9GM0L3QvtCz0L4g0YXRgNCw0L3QuNC70LjRidCwXHJcbiAgICBteUNvbXBvbmVudHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVsnZG9jc1N0b3JlJ10pO1xyXG59XHJcblxyXG4vLyBDcmVhdGUgYSBzdG9yZVxyXG52YXIgZG9jc1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2RvY3Nfc3RvcmUuanMnKTtcclxuXHJcbi8vINGB0L7Qt9C00LDQtdC8INC60LvQsNGB0YEgLSDQtNC10YDQttCw0YLQtdC70Ywg0YHQvtGB0YLQvtGP0L3QuNC5XHJcbnZhciBQYXJlbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBkaXNwbGF5TmFtZTogJ1BhcmVudCcsXHJcblxyXG4gICAgZmlsdGVyRGF0YTogWydidG5PaycsICdidG5DYW5jZWwnXSwgLy8g0LzQsNGB0YHQuNCyINC+0LHRitC10LrRgtC+0LIsINC60YPQtNCwINC30LDQv9C40YjQtdC8INC/0LDRgNCw0LzQtdGC0YDRiyDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40LggQHRvZG8g0LLRi9C90LXRgdGC0Lgg0LLRgdC1INCyINC+0YLQtNC10LvRjNC90YvQuSDQutC+0LzQv9C+0L3QtdGCINC00LvRjyDRhNC40LvRjNGC0YDQsNGG0LjQuFxyXG5cclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC8vINGDINC60LDQttC00L7Qs9C+INC60L7QvNC/0L7QvdC10L3RgtCwINGB0LLQvtC5INC+0LHRitC10LrRglxyXG4gICAgICAgICAgICBjb21wb25lbnRzOiB0aGlzLnByb3BzLmNvbXBvbmVudHMsIC8vIEB0b2RvINCy0YvQvdC10YHRgtC4INCyINC+0YLQtNC10LvRjNC90YvQuSDRhNCw0LnQuyDQutC+0LzQv9C+0L3QtdC90YLQsFxyXG4gICAgICAgICAgICBncmlkTGVmdDogJzEzJScsXHJcbiAgICAgICAgICAgIGdyaWRXaWR0aDogJzkwJScsXHJcbiAgICAgICAgICAgIGdldEZpbHRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgIGdldERlbGV0ZU1vZGFsUGFnZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dTeXN0ZW1NZXNzYWdlOiBmYWxzZVxyXG5cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC90LAg0LjQt9C80LXQvdC10L3QuNC1INC00LDQvdC90YVcclxuICAgICAgICBkb2NzU3RvcmUub24oJ2NoYW5nZTpkYXRhJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vINC00LDQvdC90YvQtSDQuNC30LzQtdC90LjQu9C40YHRjCwg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtjb21wb25lbnRzOiBkb2NzU3RvcmUuZGF0YX0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDRgdCy0L7RgNCw0YfQuNCy0LDQvdC40LUg0L/QsNC90LXQu9C10LlcclxuICAgICAgICBkb2NzU3RvcmUub24oJ2NoYW5nZTp0b29nbGVQYW5lbCcsIGZ1bmN0aW9uIChuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgdG9vZ2xlRGF0YSA9IGZsdXguc3RvcmVzLmRvY3NTdG9yZS50b29nbGVQYW5lbERhdGE7XHJcbiAgICAgICAgICAgIC8vINC00LDQvdC90YvQtSDQuNC30LzQtdC90LjQu9C40YHRjCwg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtncmlkTGVmdDogdG9vZ2xlRGF0YS5sZWZ0LCBncmlkV2lkdGg6IHRvb2dsZURhdGEud2lkdGh9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINGB0LjRgdGC0LXQvNC90YvQuSDQuNC30LLQtdGJ0LXQvdC40LVcclxuICAgICAgICBkb2NzU3RvcmUub24oJ2NoYW5nZTpzeXN0ZW1NZXNzYWdlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vINC00LDQvdC90YvQtSDQuNC30LzQtdC90LjQu9C40YHRjCwg0LzQtdC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgICAgICBsZXQgc3lzdGVtTWVzc2FnZVN0YXR1cyA9IG5ld1ZhbHVlID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHtzaG93U3lzdGVtTWVzc2FnZTogc3lzdGVtTWVzc2FnZVN0YXR1c30pO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINC/0L7QutCw0LbQtdC8INC00LDQvdC90YvQtVxyXG5cclxuICAgICAgICBsZXQgbGFzdENvbXBvbmVudCA9IGxvY2FsU3RvcmFnZVsnZG9jc0xpc3QnXTtcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdkYXRhQ2hhbmdlJywgdGhpcy5wcm9wcy5jb21wb25lbnRzKTtcclxuICAgICAgICBpZiAobGFzdENvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NzTGlzdENoYW5nZScsIGxhc3RDb21wb25lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKlxyXG4gICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcclxuICAgICAvLyDQuNC30LzQtdC90LXQvdC40Y8g0LHRg9C00YPRgiDQvtGC0YDQsNC20LDRgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0YHQu9GD0YfQsNC1INC10YHQu9C4INGC0LDQutC40LUg0LXRgdGC0YxcclxuICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShuZXh0U3RhdGUpICsgJyBWUyAnICsgSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSkpO1xyXG4gICAgIHZhciByZXR1cm5WYWx1ZSA9IChKU09OLnN0cmluZ2lmeShuZXh0U3RhdGUpICE9PSBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSApO1xyXG4gICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgICB9LFxyXG5cclxuICAgICAqL1xyXG4gICAgZmluZENvbXBvbmVudDogZnVuY3Rpb24gKGNvbXBvbmVudE5hbWUpIHtcclxuICAgICAgICAvLyDQstC10YDQvdC10YIg0LTQsNC90L3Ri9C1INC60L7QvNC/0L7QvdC10L3RgtCwINC/0L4g0LXQs9C+INC90LDQt9Cy0LDQvdC40Y5cclxuICAgICAgICBsZXQgY29tcG9uZW50cyA9IHRoaXMuc3RhdGUuY29tcG9uZW50cyxcclxuICAgICAgICAgICAgY29tcG9uZW50RGF0YSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoY29tcG9uZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGEgPSBjb21wb25lbnRzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSA9PSBjb21wb25lbnROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tcG9uZW50RGF0YTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJ0bkZpbHRlckNsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0L7RgtC60YDQvtC10YIg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+INGBINC/0L7Qu9GP0LzQuCDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40LhcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtnZXRGaWx0ZXI6IHRydWV9KVxyXG4gICAgfSxcclxuXHJcbiAgICBidG5EZWxldGVDbGljazpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtnZXREZWxldGVNb2RhbFBhZ2U6IHRydWV9KVxyXG4gICAgfSxcclxuXHJcbiAgICBidG5BZGRDbGljazpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQutC70LjQuiDQutC90L7Qv9C60LggXCLQlNC+0LHQsNCy0LjRgtGMXCJcclxuICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignQWRkJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGJ0bkVkaXRDbGljazpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQutC70LjQuiDQutC90L7Qv9C60LggXCLQmNC30LzQtdC90LjRgtGMXCJcclxuICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbignRWRpdCcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBidG5QcmludENsaWNrOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC60LvQuNC6INC60L3QvtC/0LrQuCBcItCY0LfQvNC10L3QuNGC0YxcIlxyXG4gICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdQcmludCcpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgbXlMaXN0VmFsdWUgPSAnJyxcclxuICAgICAgICAgICAgbXlMaXN0RGF0YSA9IHRoaXMuZmluZENvbXBvbmVudCgnZG9jc0xpc3QnKSB8fCBbXTtcclxuXHJcbiAgICAgICAgaWYgKG15TGlzdERhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBteUxpc3RWYWx1ZSA9IG15TGlzdERhdGFbMF0udmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZmlsdGVyQ29tcG9uZW50O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmdldEZpbHRlcikge1xyXG4gICAgICAgICAgICBmaWx0ZXJDb21wb25lbnQgPSB0aGlzLmdldEZpbHRlckZpZWxkcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG15TGlzdERhdGEubGVuZ3RoID4gMCAmJiBteUxpc3REYXRhWzBdLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBteUxpc3REYXRhID0gbXlMaXN0RGF0YVswXS5kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRvY0NvbnRhaW5lclN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgZmxleEZsb3c6ICdyb3cgd3JhcCcsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICc4NyUnLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyOiAnM3B4IHNvbGlkIGJyb3duJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkb2NXcmFwcGVyU3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIGZsZXg6ICcxIDEwMCUnLFxyXG4gICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ3N0cmV0Y2gnLFxyXG4gICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdydcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IG15R3JpZCA9IHRoaXMuZmluZENvbXBvbmVudCgnZG9jc0dyaWQnKSB8fCBbXSxcclxuICAgICAgICAgICAgbXlHcmlkQ29sdW1zID0gW10sXHJcbiAgICAgICAgICAgIG15R3JpZERhdGEgPSBbXSxcclxuICAgICAgICAgICAgc3lzdGVtTWVzc2FnZSA9IGZsdXguc3RvcmVzLmRvY3NTdG9yZS5zeXN0ZW1NZXNzYWdlO1xyXG5cclxuICAgICAgICAvLyDQv9GA0L7QstC10YDQuNC8INC90LDQu9C40YfQuNC1INC00LDQvdC90YvRhSwg0LXRgdC70Lgg0LXRgdGC0Ywg0L/RgNC+0L/QuNGF0L3QtdC8INC60L7QvNC/0L7QvdC10L3RgtCw0LxcclxuICAgICAgICBpZiAobXlHcmlkLmxlbmd0aCA+IDAgJiYgbXlHcmlkWzBdLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBteUdyaWRDb2x1bXMgPSBteUdyaWRbMF0uZGF0YVswXS5jb2x1bW5zO1xyXG4gICAgICAgICAgICBteUdyaWREYXRhID0gbXlHcmlkWzBdLmRhdGFbMF0uZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwicGFyZW50RGl2XCJ9LCBcclxuXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJkb2NDb250YWluZXJcIiwgc3R5bGU6IGRvY0NvbnRhaW5lclN0eWxlfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uUmVnaXN0ZXIsIHtvbkNsaWNrOiB0aGlzLmJ0bkFkZENsaWNrLCB2YWx1ZTogXCIgQWRkIFwifSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b25SZWdpc3Rlciwge29uQ2xpY2s6IHRoaXMuYnRuRWRpdENsaWNrLCB2YWx1ZTogXCIgRWRpdCBcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uUmVnaXN0ZXIsIHtvbkNsaWNrOiB0aGlzLmJ0bkRlbGV0ZUNsaWNrLCB2YWx1ZTogXCIgRGVsZXRlIFwifSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b25SZWdpc3Rlciwge29uQ2xpY2s6IHRoaXMuYnRuUHJpbnRDbGljaywgdmFsdWU6IFwiIFByaW50IFwifSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImdyaWRUb29sYmFyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuYnRuRmlsdGVyQ2xpY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFwiIEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBkb2NXcmFwcGVyU3R5bGV9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlYmFyLCB7d2lkdGg6IFwiMzAlXCIsIHRvb2xiYXI6IHRydWUsIHJlZjogXCJsaXN0LXNpZGViYXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhTGlzdCwge2RhdGE6IG15TGlzdERhdGEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9jc0xpc3RcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZERhdGFGaWVsZDogXCJrb29kXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBteUxpc3RWYWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2VBY3Rpb246IFwiZG9jc0xpc3RDaGFuZ2VcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2lkZWJhciwge3dpZHRoOiBcIjEwMCVcIiwgdG9vbGJhcjogZmFsc2UsIHJlZjogXCJncmlkLXNpZGViYXJcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERhdGFHcmlkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWREYXRhOiBteUdyaWREYXRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZENvbHVtbnM6IG15R3JpZENvbHVtcywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlQWN0aW9uOiBcImRvY3NHcmlkQ2hhbmdlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiYXBpXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5nZXRGaWx0ZXIgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2UsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUJ0bkNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZU5hbWU6IFwiRmlsdGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgXCIgXCIsIGZpbHRlckNvbXBvbmVudCwgXCIgXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmdldERlbGV0ZU1vZGFsUGFnZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2VEZWxldGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VEZWxCdG5DbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpIDogbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2hvd1N5c3RlbU1lc3NhZ2UgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxQYWdlSW5mbywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUluZm9CdG5DbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3lzdGVtTWVzc2FnZTogc3lzdGVtTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpIDogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgICA8U2lkZWJhciB3aWR0aD1cIjEwMCVcIiB0b29sYmFyPXtmYWxzZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldEdyaWRDb21wb25lbnQoKX1cclxuICAgICAgICAgICAgICAgICAgICAgPC9TaWRlYmFyPlxyXG4gICAgICAgICAgICAgICAgICAgICAqL1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEdyaWRDb21wb25lbnQ6IGZ1bmN0aW9uKCkgIHtcclxuICAgICAgICBsZXQgbXlHcmlkID0gdGhpcy5maW5kQ29tcG9uZW50KCdkb2NzR3JpZCcpIHx8IFtdLFxyXG4gICAgICAgICAgICBteUdyaWRDb2x1bXMgPSBbXSxcclxuICAgICAgICAgICAgbXlHcmlkRGF0YSA9IFtdLFxyXG4gICAgICAgICAgICBzeXN0ZW1NZXNzYWdlID0gZmx1eC5zdG9yZXMuZG9jc1N0b3JlLnN5c3RlbU1lc3NhZ2U7XHJcblxyXG4gICAgICAgIC8vINC/0YDQvtCy0LXRgNC40Lwg0L3QsNC70LjRh9C40LUg0LTQsNC90L3Ri9GFLCDQtdGB0LvQuCDQtdGB0YLRjCDQv9GA0L7Qv9C40YXQvdC10Lwg0LrQvtC80L/QvtC90LXQvdGC0LDQvFxyXG4gICAgICAgIGlmIChteUdyaWQubGVuZ3RoID4gMCAmJiBteUdyaWRbMF0uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG15R3JpZENvbHVtcyA9IG15R3JpZFswXS5kYXRhWzBdLmNvbHVtbnM7XHJcbiAgICAgICAgICAgIG15R3JpZERhdGEgPSBteUdyaWRbMF0uZGF0YVswXS5kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJncmlkVGFibGVcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YUdyaWQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZERhdGE6IG15R3JpZERhdGEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkQ29sdW1uczogbXlHcmlkQ29sdW1zLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2VBY3Rpb246IFwiZG9jc0dyaWRDaGFuZ2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJhcGlcIn0pXHJcbiAgICAgICAgICAgICAgICApLCBcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZ2V0RmlsdGVyID9cclxuICAgICAgICAgICAgICAgICAgICAoUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbFBhZ2UsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHRoaXMubW9kYWxQYWdlQnRuQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VOYW1lOiBcIkZpbHRlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgXCIgXCIsIGZpbHRlckNvbXBvbmVudCwgXCIgXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbCwgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZ2V0RGVsZXRlTW9kYWxQYWdlID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxQYWdlRGVsZXRlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VEZWxCdG5DbGlja31cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSkgOiBudWxsLCBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zaG93U3lzdGVtTWVzc2FnZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZUluZm8sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUluZm9CdG5DbGljaywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeXN0ZW1NZXNzYWdlOiBzeXN0ZW1NZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApKSA6IG51bGxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgfS5iaW5kKHRoaXMpLFxyXG5cclxuICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiBmdW5jdGlvbiAoYnRuRXZlbnQpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQtNC70Y8g0LrQvdC+0L/QutC4INGE0LjQu9GM0YLRgNCw0YbQuNC4XHJcbiAgICAgICAgbGV0IGZpbHRlclN0cmluZyA9ICcnO1xyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIC8vINGB0L7QsdC40YDQtdC8INC00LDQvdC90YvQtSDQsiDQvtCx0YrQtdC60YIg0Lgg0LLQtdGA0L3QtdC8INC90LAg0YTQvtGA0LzRg1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEgPSB0aGlzLmZpbHRlckRhdGEubWFwKGZ1bmN0aW9uKHJvdykgIHtcclxuICAgICAgICAgICAgICAgIHJvdy52YWx1ZSA9IHRoaXMucmVmc1tyb3cucmVmc10udmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJvdy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIChmaWx0ZXJTdHJpbmcubGVuZ3RoID4gMCA/IFwiIGFuZCBcIiA6IFwiIHdoZXJlIFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJvdy50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgaWxpa2UgJyVcIiArIHJvdy52YWx1ZSArIFwiJSdcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgcm93LnJlZnMgKyBcIiBpbGlrZSAnXCIgKyByb3cudmFsdWUgKyBcIiUnXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSBmaWx0ZXJTdHJpbmcgKyByb3cucmVmcyArIFwiID0gJ1wiICsgcm93LnZhbHVlICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgPSBcIiArIHJvdy52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnRlZ2VyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgPSBcIiArIHJvdy52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3NxbFdoZXJlQ2hhbmdlJywgZmlsdGVyU3RyaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z2V0RmlsdGVyOiBmYWxzZX0pXHJcbiAgICB9LFxyXG5cclxuICAgIG1vZGFsUGFnZURlbEJ0bkNsaWNrOmZ1bmN0aW9uKGJ0bkV2ZW50KSB7XHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LLRi9C30L7QstCwINC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwINGD0LTQsNC70LXQvdC40Y9cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtnZXREZWxldGVNb2RhbFBhZ2U6IGZhbHNlfSk7XHJcblxyXG4gICAgICAgIGlmIChidG5FdmVudCA9PSAnT2snKSB7XHJcbiAgICAgICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignRGVsZXRlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgbW9kYWxQYWdlSW5mb0J0bkNsaWNrOmZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQstGL0LfQvtCy0LAg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LAg0YHQuNGB0YLQtdC80L3QvtCz0L4g0YHQvtC+0LHRidC10L3QuNGPXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd1N5c3RlbU1lc3NhZ2U6IGZhbHNlfSk7XHJcbiAgICAgICAgLy8g0LLRi9C30L7QstC10Lwg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGE0LvQsNC60YHQtVxyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ3N5c3RlbU1lc3NhZ2VDaGFuZ2UnLCBudWxsKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEZpbHRlckZpZWxkczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIEB0b2RvINCy0YvQvdC10YHRgtC4INCyINC+0YLQtNC10LvRjNC90YvQuSDQvNC+0LTRg9C70YxcclxuICAgICAgICAvLyDRgdC+0LfQtNCw0YHRgiDQuNC3INC/0L7Qu9C60Lkg0LPRgNC40LTQsCDQutC+0LzQv9C+0L3QtdC90YLRiyDQtNC70Y8g0YTQvtGA0LzQuNGA0L7QstCw0L3QuNGPINGD0YHQu9C+0LLQuNC5INGE0LjQu9GM0YLRgNCw0YbQuNC4XHJcbiAgICAgICAgdmFyIGdyaWRDb21wb25lbnRzID0gZG9jc1N0b3JlLmRhdGEsXHJcbiAgICAgICAgICAgIGdyaWREYXRhID0gW10sXHJcbiAgICAgICAgICAgIHByZXZpb3NGaWx0ZXIgPSB0aGlzLmZpbHRlckRhdGEsXHJcbiAgICAgICAgICAgIGZpbHRlckZpZWxkcztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkQ29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZ3JpZENvbXBvbmVudHNbaV1bJ25hbWUnXSA9PSAnZG9jc0dyaWQnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQuNGJ0LXQvCDQv9C+0LvQtSBjb2x1bW5zXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZCBpbiBncmlkQ29tcG9uZW50c1tpXS5kYXRhWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkID09ICdjb2x1bW5zJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkRGF0YSA9IGdyaWRDb21wb25lbnRzW2ldLmRhdGFbMF0uY29sdW1ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoZ3JpZERhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhID0gW107IC8vINC+0LHQvdGD0LvQuNC8INC80LDRgdGB0LjQslxyXG4gICAgICAgICAgICBmaWx0ZXJGaWVsZHMgPVxyXG4gICAgICAgICAgICAgICAgZ3JpZERhdGEubWFwKGZ1bmN0aW9uKHJvdywgaW5kZXgpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudFR5cGUgPSAndGV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudE9iamVrdFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXZpb3NGaWx0ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LjRidC10LwgXCLRgdGC0LDRgNC+0LVcIiDQt9C90LDRh9C10L3QuNC1INGE0LjQu9GM0YLRgNCwINC4INC10YHQu9C4INC10YHRgtGMLCDRgtC+INC+0YLQtNCw0LXQvCDQtdCz0L4gdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3NGaWx0ZXJbaV0ucmVmcyA9PSByb3cuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudE9iamVrdFZhbHVlID0gcHJldmlvc0ZpbHRlcltpXS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb21wb25lbnRPYmpla3Q6JywgY29tcG9uZW50T2JqZWt0VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlID0gcm93LnR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LHQtdGA0LXQvCDQvNCw0YHRgdC40LIg0L7QsdGK0LXQutGC0L7QslxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcm93Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBjb21wb25lbnRPYmpla3RWYWx1ZSB8fCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBjb21wb25lbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZzOiByb3cuaWRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7a2V5OiBpbmRleH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXQtbGFiZWxcIn0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHJvdy5uYW1lKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogY29tcG9uZW50VHlwZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHJvdy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcm93Lm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogcm93Lm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IHJvdy5pZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogY29tcG9uZW50T2JqZWt0VmFsdWUgfHwgbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIGZpbHRlckZpZWxkcyA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmaWVsZHNldFwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgbnVsbCwgZmlsdGVyRmllbGRzKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmlsdGVyRmllbGRzO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFyZW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtcmVnaXN0ZXIuanN4XG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbnZhciBEYXRhR3JpZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnRGF0YUdyaWQnLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zOiB0aGlzLnByb3BzLmdyaWRDb2x1bW5zLFxyXG4gICAgICAgICAgICBncmlkRGF0YTogdGhpcy5wcm9wcy5ncmlkRGF0YSxcclxuICAgICAgICAgICAgY2xpY2tlZDogMFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKG5leHRQcm9wcykge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIGlmIChuZXh0UHJvcHMuZ3JpZERhdGEpIHtcclxuICAgICAgICAgdmFyIGRvY0lkID0gIGxvY2FsU3RvcmFnZVsnZG9jc0dyaWQnXSxcclxuICAgICAgICAgaW5kZXggPSB0aGlzLmdldEdyaWRSb3dJbmRleEJ5SWQoZG9jSWQpO1xyXG5cclxuICAgICAgICAgY29uc29sZS5sb2coJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLCBpbmRleCwgZG9jSWQpO1xyXG4gICAgICAgICB0aGlzLmhhbmRsZUNlbGxDbGljayhpbmRleCk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgKi9cclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuXHJcbiAgICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgIC8vINC40LfQvNC10L3QtdC90LjRjyDQsdGD0LTRg9GCINC+0YLRgNCw0LbQsNGC0YzRgdGPINGC0L7Qu9GM0LrQviDQsiDRgdC70YPRh9Cw0LUg0LXRgdC70Lgg0YLQsNC60LjQtSDQtdGB0YLRjFxyXG4gICAgIHZhciByZXR1cm5WYWx1ZSA9IChKU09OLnN0cmluZ2lmeShuZXh0U3RhdGUpICE9PSBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSApO1xyXG4gICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgICB9LFxyXG4gICAgICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xyXG5cclxuLypcclxuICAgICAgICAgY29uc29sZS5sb2coJ2dyaWQgY29tcG9uZW50RGlkTW91bnQnLGxvY2FsU3RvcmFnZVsnZG9jc0dyaWQnXSApO1xyXG5cclxuICAgICAgICAgLy8g0LjRidC10Lwg0L/QvtGB0LvQtdC00L3RjtGOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgICBpZiAodGhpcy5zdGF0ZS5jbGlja2VkID09IDApIHtcclxuICAgICAgICAgLy8g0L7RgtC80LXRgtC40Lwg0L/QvtGB0LvQtdC00L3QuNC5INC+0YLQvNC10YfQtdC90L3Ri9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgdmFyIGRvY0lkID0gIGxvY2FsU3RvcmFnZVsnZG9jc0dyaWQnXSxcclxuICAgICAgICAgaW5kZXggPSB0aGlzLmdldEdyaWRSb3dJbmRleEJ5SWQoZG9jSWQpO1xyXG5cclxuICAgICAgICAgY29uc29sZS5sb2coJ2dyaWQgY29tcG9uZW50RGlkTW91bnQnLGRvY0lkLGluZGV4ICk7XHJcblxyXG4gICAgICAgICB0aGlzLnNldFN0YXRlKHtjbGlja2VkOiBpbmRleH0pO1xyXG4gICAgICAgICB9XHJcbiovXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vINC/0L7QstC10YHQuNC8INC+0LHRgNCw0LHQvtGC0YfQuNC60LhcclxuXHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY3NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgIC8vINC40YnQtdC8INC/0L7RgdC70LXQtNC90Y7RjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgLy8g0L7RgtC80LXRgtC40Lwg0L/QvtGB0LvQtdC00L3QuNC5INC+0YLQvNC10YfQtdC90L3Ri9C5INC00L7QutGD0LzQtdC90YJcclxuXHJcbiAvLyAgICAgICAgICAgY29uc29sZS5sb2coJ215IGdyaWQgb24gY2hhbmdlIGxpc3QgJywgbmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpXHJcblxyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IFtdKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZG9jSWQgPSBsb2NhbFN0b3JhZ2VbJ2RvY3NHcmlkJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBzZWxmLmdldEdyaWRSb3dJbmRleEJ5SWQoZG9jSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2NsaWNrZWQ6IGluZGV4fSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEdyaWRSb3dJbmRleEJ5SWQ6IGZ1bmN0aW9uIChkb2NJZCkge1xyXG4gICAgICAgIC8vINC40YnQtdC8INC40L3QtNC10YUg0LIg0LzQsNGB0YHQuNCy0LUg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgdmFyIGluZGV4ID0gMCxcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMucHJvcHMuZ3JpZERhdGE7XHJcbiAgICAgICAgaWYgKGRvY0lkKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAocm93ICYmIGRhdGFbaV1bJ2lkJ10gPT0gZG9jSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVDZWxsQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUNlbGxDbGljayhpZHgpIHtcclxuICAgICAgICAvLyDQvtGC0YDQsNCx0LDRgtGL0LLQsNC10YIg0YHQvtCx0YvRgtC4INC60LvQuNC60LAg0L/QviDRj9GH0LXQudC60LVcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgY2xpY2tlZDogaWR4XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmdyaWREYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGRvY0lkID0gdGhpcy5wcm9wcy5ncmlkRGF0YVtpZHhdLmlkO1xyXG4gLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdteUdyaWQgaGFuZGxlQ2VsbENsaWNrOicsIGlkeCwgZG9jSWQsIHRoaXMucHJvcHMuZ3JpZERhdGEpO1xyXG4gICAgICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKHRoaXMucHJvcHMub25DaGFuZ2VBY3Rpb24sIGRvY0lkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUNlbGxEYmxDbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINCy0YvQt9C+0LLQtdGCINC80LXRgtC+0LQg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ0VkaXQnKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlR3JpZEhlYWRlckNsaWNrOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciBzb3J0QnkgPSBbe2NvbHVtbjogbmFtZSwgZGlyZWN0aW9uOiAnYXNjJ31dO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ3NvcnRCeUNoYW5nZScsIHNvcnRCeSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUtleURvd246IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgLy8g0YDQtdCw0LrRhtC40Y8g0L3QsCDQutC70LDQstC40LDRgtGD0YDRg1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdoYW5kbGVLZXlQcmVzcyAnLCBlKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgICBpZiAoa2V5RGlyZWN0aW9uID09ICdEb3duJykge1xyXG4gICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgY2xpY2tlZDogKHRoaXMuc3RhdGUuY2xpY2tlZCArIDEpXHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgICovXHJcblxyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gICAgICAgIHZhciBncmlkUm93cyA9IHRoaXMucHJvcHMuZ3JpZERhdGE7IC8vINGB0YLQsNGC0LjRh9C90Ysg0Lgg0L/RgNC40YXQvtC00Y/RgiDRgtC+0LvRjNC60L4g0LjQtyDQstC10YDRhdC90LXQs9C+INC60L7QvNC/0L7QvdC10L3RgtCwXHJcbiAgICAgICAgdmFyIGdyaWRDb2x1bW5zID0gdGhpcy5wcm9wcy5ncmlkQ29sdW1ucztcclxuICAgICAgICB2YXIgY2xpY2tlZEl0ZW0gPSB0aGlzLnN0YXRlLmNsaWNrZWQ7XHJcblxyXG4gICAgICAgIHZhciBjbGFzc05hbWUgPSAndGgnLFxyXG4gICAgICAgICAgICBzZWxmID0gdGhpcztcclxuICAgICAgICAvKiAgICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5UHJlc3MoJ0Rvd24nKSxcclxuICAgICAgICAgb25Eb3VibGVDbGljazogdGhpcy5oYW5kbGVDZWxsRGJsQ2xpY2soKSxcclxuICAgICAgICAgKi9cclxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiLCB7cmVmOiBcIm15R3JpZFJlZlwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRib2R5XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkQ29sdW1ucy5tYXAoZnVuY3Rpb24gKGNvbHVtbiwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JpZFN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogY29sdW1uLndpZHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAndGgtJyArIGNvbHVtbi5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInRoXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogZ3JpZFN0eWxlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAndGgtJyArIGluZGV4LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUdyaWRIZWFkZXJDbGljay5iaW5kKHRoaXMsIGNvbHVtbi5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbi5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRib2R5XCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkUm93cy5tYXAoZnVuY3Rpb24gKHJvdywgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBteUNsYXNzID0gJ25vdEZvY3VzZWQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWNrZWRJdGVtID09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlDbGFzcyA9ICdmb2N1c2VkJzsgLy8g0L/QvtC00YHQstC10YLQuNC8INCy0YvQsdGA0LDQvdC90YPRjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNlbGxDbGljay5iaW5kKHRoaXMsIGluZGV4KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBteUNsYXNzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdkb2MtJyArIGluZGV4fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRDb2x1bW5zLm1hcChmdW5jdGlvbiAoY2VsbCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIHtrZXk6ICd0ZCcgKyBpbmRleH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dbY2VsbC5pZF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGF0YUdyaWQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC5qc3hcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbmNvbnN0IEJ1dHRvblJlZ2lzdGVyID0gZnVuY3Rpb24ocHJvcHMpICB7XHJcbi8vINC60L3QvtC/0LrQsCDRgdC+0LfQtNCw0L3QuNGPINC00L7QutGD0LzQtdC90YLQsCDQsiDRgNC10LPQuNGB0YLRgNCw0YVcclxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcImJ1dHRvblwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJncmlkVG9vbGJhclwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5vbkNsaWNrfSlcclxufTtcclxuXHJcbkJ1dHRvblJlZ2lzdGVyLnByb3BUeXBlcyA9IHtcclxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uUmVnaXN0ZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci5qc3hcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9tb2RhbFBhZ2UuanN4Jyk7XHJcblxyXG5jb25zdCBNb2RhbFBhZ2VEZWxldGUgID0gZnVuY3Rpb24ocHJvcHMpIHtcclxuICAgIGxldCBtb2RhbE9iamVjdHMgPSBbJ2J0bk9rJywgJ2J0bkNhbmNlbCddO1xyXG5cclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge1xyXG4gICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiBwcm9wcy5tb2RhbFBhZ2VCdG5DbGljaywgXHJcbiAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJEZWxldGUgZG9jdW1lbnRcIlxyXG4gICAgfSwgXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHtwYWRkaW5nOjUwfX0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIiDQo9C00LDQu9C40YLRjCDQtNC+0LrRg9C80LXQvdGCID8gXCIpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIClcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFBhZ2VEZWxldGUgO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbFBhZ2VEZWxldGUuanN4XG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvbW9kYWxQYWdlLmpzeCcpO1xyXG5cclxuY29uc3QgTW9kYWxQYWdlRGVsZXRlICA9IGZ1bmN0aW9uKHByb3BzKSB7XHJcbiAgICBsZXQgc3lzdGVtTWVzc2FnZSA9IHByb3BzLnN5c3RlbU1lc3NhZ2UgPyBwcm9wcy5zeXN0ZW1NZXNzYWdlOiAnJyxcclxuICAgICAgICBtb2RhbE9iamVjdHMgPSBbJ2J0bk9rJ107XHJcblxyXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxQYWdlLCB7XHJcbiAgICAgICAgbW9kYWxQYWdlQnRuQ2xpY2s6IHByb3BzLm1vZGFsUGFnZUJ0bkNsaWNrLCBcclxuICAgICAgICBtb2RhbFBhZ2VOYW1lOiBcIldhcm5pbmchXCIsIFxyXG4gICAgICAgIG1vZGFsT2JqZWN0czogbW9kYWxPYmplY3RzXHJcblxyXG4gICAgfSwgXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHtwYWRkaW5nOjUwfX0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIiBcIiwgc3lzdGVtTWVzc2FnZSwgXCIgXCIpXHJcbiAgICAgICAgKVxyXG4gICAgKVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsUGFnZURlbGV0ZSA7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbFBhZ2VJbmZvLmpzeFxuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKSxcclxuICAgIHN0eWxlcyA9IHJlcXVpcmUoJy4vZGF0YWxpc3Qtc3R5bGVzJyk7XHJcblxyXG52YXIgX19fX0NsYXNzaj1SZWFjdC5QdXJlQ29tcG9uZW50O2Zvcih2YXIgX19fX0NsYXNzal9fX19LZXkgaW4gX19fX0NsYXNzail7aWYoX19fX0NsYXNzai5oYXNPd25Qcm9wZXJ0eShfX19fQ2xhc3NqX19fX0tleSkpe0RhdGFMaXN0W19fX19DbGFzc2pfX19fS2V5XT1fX19fQ2xhc3NqW19fX19DbGFzc2pfX19fS2V5XTt9fXZhciBfX19fU3VwZXJQcm90b09mX19fX0NsYXNzaj1fX19fQ2xhc3NqPT09bnVsbD9udWxsOl9fX19DbGFzc2oucHJvdG90eXBlO0RhdGFMaXN0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NqKTtEYXRhTGlzdC5wcm90b3R5cGUuY29uc3RydWN0b3I9RGF0YUxpc3Q7RGF0YUxpc3QuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzajtcclxuICAgIGZ1bmN0aW9uIERhdGFMaXN0KHByb3BzKSB7XHJcbiAgICAgICAgX19fX0NsYXNzai5jYWxsKHRoaXMscHJvcHMpO1xyXG5cclxuICAgICAgICBsZXQgaWR4ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHByb3BzLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vIHdlIGdvdCB2YWx1ZSwgd2Ugc2hvdWxkIGZpbmQgaW5kZXggYW5kIGluaXRpbGl6ZSBpZHggZmllbGRcclxuICAgICAgICAgICAgcHJvcHMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHJvdywgaW5kZXgpICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocm93W3Byb3BzLmJpbmREYXRhRmllbGRdID09PSBwcm9wcy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvdW5kXHJcbiAgICAgICAgICAgICAgICAgICAgaWR4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZGF0YTogcHJvcHMuZGF0YSxcclxuICAgICAgICAgICAgY2xpY2tlZDogaWR4LFxyXG4gICAgICAgICAgICB2YWx1ZTogcHJvcHMudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEYXRhTGlzdC5wcm90b3R5cGUsXCJyZW5kZXJcIix7d3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx2YWx1ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMucHJvcHMuZGF0YSxcclxuICAgICAgICAgICAgY2xpY2tlZEl0ZW0gPSB0aGlzLnN0YXRlLmNsaWNrZWQ7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3JlZjogXCJkYXRhbGlzdFwifSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwge3JlZjogXCJkYXRhbGlzdC11bFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWNrZWRJdGVtID09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuZG9jTGlzdCwgc3R5bGVzLmZvY3VzZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmRvY0xpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnRJZCA9ICdsaS0nICsgaW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwge2tleTogY29tcG9uZW50SWQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IGNvbXBvbmVudElkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVMaUNsaWNrLmJpbmQodGhpcywgaW5kZXgpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHN0eWxlfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcylcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgIH19KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGF0YUxpc3QucHJvdG90eXBlLFwiaGFuZGxlTGlDbGlja1wiLHt3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlLHZhbHVlOmZ1bmN0aW9uKGlkeCkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMucHJvcHMuZGF0YVtpZHhdW3RoaXMucHJvcHMuYmluZERhdGFGaWVsZF07XHJcbiAgICAgICAgLy/RgdGC0LDQstC40Lwg0LzQtdGC0LrRg1xyXG4gICAgICAgIC8vINGB0L7RhdGA0LDQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGNsaWNrZWQ6IGlkeCxcclxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINGB0L7RhdGA0LDQvdC40Lwg0LIg0YXRgNCw0L3QuNC70LjRidC1XHJcbiAgICAgICAgbGV0IGNoYW5nZUFjdGlvbiA9IHRoaXMucHJvcHMubmFtZSArICdDaGFuZ2UnXHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbihjaGFuZ2VBY3Rpb24sIHZhbHVlKVxyXG4gICAgfX0pO1xyXG5cclxuXHJcblxyXG5EYXRhTGlzdC5wcm9wVHlwZXMgPSB7XHJcbiAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5hcnJheVxyXG59O1xyXG5cclxuRGF0YUxpc3QuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGF0YTogW3tcclxuICAgICAgICBpZDogMCxcclxuICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICBrb29kOiAnJ1xyXG4gICAgfV0sXHJcbiAgICB2YWx1ZTogJycsXHJcbiAgICBiaW5kRGF0YUZpZWxkOiAnaWQnXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGF0YUxpc3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGFsaXN0L2RhdGFsaXN0LmpzeFxuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkb2NMaXN0OiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgcGFkZGluZzogJzVweCcsXG4gICAgICAgIG1hcmdpblJpZ2h0OiAnMjBweCdcbiAgICB9LFxuICAgIGZvY3VzZWQ6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnbGlnaHRibHVlJ1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGFsaXN0L2RhdGFsaXN0LXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3Qgc2lkZUJhclN0eWxlcyA9IHJlcXVpcmUoJy4vc2lkZWJhci1zdHlsZXMnKSxcclxuICAgIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcblxyXG52YXIgX19fX0NsYXNzaz1SZWFjdC5Db21wb25lbnQ7Zm9yKHZhciBfX19fQ2xhc3NrX19fX0tleSBpbiBfX19fQ2xhc3NrKXtpZihfX19fQ2xhc3NrLmhhc093blByb3BlcnR5KF9fX19DbGFzc2tfX19fS2V5KSl7U2lkZUJhckNvbnRhaW5lcltfX19fQ2xhc3NrX19fX0tleV09X19fX0NsYXNza1tfX19fQ2xhc3NrX19fX0tleV07fX12YXIgX19fX1N1cGVyUHJvdG9PZl9fX19DbGFzc2s9X19fX0NsYXNzaz09PW51bGw/bnVsbDpfX19fQ2xhc3NrLnByb3RvdHlwZTtTaWRlQmFyQ29udGFpbmVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKF9fX19TdXBlclByb3RvT2ZfX19fQ2xhc3NrKTtTaWRlQmFyQ29udGFpbmVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1TaWRlQmFyQ29udGFpbmVyO1NpZGVCYXJDb250YWluZXIuX19zdXBlckNvbnN0cnVjdG9yX189X19fX0NsYXNzaztcclxuICAgIGZ1bmN0aW9uIFNpZGVCYXJDb250YWluZXIocHJvcHMpIHtcclxuICAgICAgICBfX19fQ2xhc3NrLmNhbGwodGhpcyxwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBwcm9wcy53aWR0aCxcclxuICAgICAgICAgICAgY29udGVudFdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2xCYXI6IHByb3BzLnRvb2xiYXJcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmJ0bkNsaWNrSGFuZGxlciA9IHRoaXMuYnRuQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNpZGVCYXJDb250YWluZXIucHJvdG90eXBlLFwiYnRuQ2xpY2tIYW5kbGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5zdGF0ZS5zaG93ID8gJzIwcHgnIDogdGhpcy5wcm9wcy53aWR0aCxcclxuICAgICAgICAgICAgY29udGVudFdpZHRoID0gdGhpcy5zdGF0ZS5zaG93ID8gJzFweCcgOiAnMTAwJScsXHJcbiAgICAgICAgICAgIHNob3dDb250ZW50ID0gIXRoaXMuc3RhdGUuc2hvdztcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgY29udGVudFdpZHRoOiBjb250ZW50V2lkdGgsXHJcbiAgICAgICAgICAgIHNob3c6IHNob3dDb250ZW50XHJcbiAgICAgICAgfSk7XHJcbiAgICB9fSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNpZGVCYXJDb250YWluZXIucHJvdG90eXBlLFwicmVuZGVyXCIse3dyaXRhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsdmFsdWU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHRvb2xCYXJTeW1ib2wgPSB0aGlzLnN0YXRlLnNob3cgPyAnPCcgOiAnPic7IC8vdG9kbyBtb3ZlIHRvIHN0eWxlcyBmaWxlXHJcblxyXG4gICAgICAgIC8vcHJlcGFpcmUgc3R5bGVzXHJcbiAgICAgICAgbGV0IHNpZGVCYXJDb250YWluZXJTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHNpZGVCYXJTdHlsZXMuc2lkZUJhckNvbnRhaW5lclN0eWxlLCB7d2lkdGg6IHRoaXMuc3RhdGUud2lkdGh9KSxcclxuICAgICAgICAgICAgdG9vbEJhclN0eWxlID0gT2JqZWN0LmFzc2lnbih7fSxzaWRlQmFyU3R5bGVzLnRvb2xCYXJTdHlsZSwge3Zpc2liaWxpdHk6IHRoaXMucHJvcHMudG9vbGJhciA/ICd2aXNpYmxlJzogJ2hpZGRlbid9KSxcclxuICAgICAgICAgICAgY29udGVudFN0eWxlID0gT2JqZWN0LmFzc2lnbigoe30sc2lkZUJhclN0eWxlcy5jb250ZW50U3R5bGUsIHt2aXNpYmlsaXR5OiB0aGlzLnN0YXRlLnNob3cgPyAndmlzaWJsZSc6ICdoaWRkZW4nfSkpLFxyXG4gICAgICAgICAgICBidXR0b25TdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sc2lkZUJhclN0eWxlcy5idXR0b25TdHlsZSwge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLnRvb2xiYXIgPyBzaWRlQmFyU3R5bGVzLmJ1dHRvblN0eWxlLmhlaWdodDogJzAnLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogdGhpcy5wcm9wcy50b29sYmFyID8gJ3Zpc2libGUnOiAnaGlkZGVuJ1xyXG4gICAgICAgIH0gKVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJ0b29sQmFyQ29udGFpbmVyXCIsIHN0eWxlOiBzaWRlQmFyQ29udGFpbmVyU3R5bGUsIHJlZjogXCJ0b29sYmFyXCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcImJ0bkJhclwiLCBzdHlsZTogdG9vbEJhclN0eWxlfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHt0eXBlOiBcImJ1dHRvblwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInNpZGViYXItYnV0dG9uXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogYnV0dG9uU3R5bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdG9vbEJhclN5bWJvbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuYnRuQ2xpY2tIYW5kbGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwiY29udGVudFwiLCBzdHlsZTogY29udGVudFN0eWxlfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH19KTtcclxuXHJcblxyXG5cclxuXHJcblNpZGVCYXJDb250YWluZXIucHJvcFR5cGVzID0ge1xyXG4gICAgdG9vbGJhcjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xyXG59O1xyXG5cclxuU2lkZUJhckNvbnRhaW5lci5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB0b29sYmFyOiB0cnVlLFxyXG4gICAgd2lkdGg6ICcxMDAlJ1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTaWRlQmFyQ29udGFpbmVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXIuanN4XG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHNpZGVCYXJDb250YWluZXJTdHlsZToge1xuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHJlZCcsXG4gICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZSdcbiAgICB9LFxuXG4gICAgdG9vbEJhclN0eWxlOiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgaGVpZ2h0OiAnYXV0bycsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsXG4gICAgICAgIGJhY2tncm91bmQ6ICdncmF5JyxcbiAgICAgICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnXG4gICAgfSxcbiAgICBjb250ZW50U3R5bGU6IHtcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnXG4gICAgfSxcblxuICAgIGJ1dHRvblN0eWxlOiB7XG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICBoZWlnaHQ6ICcyMHB4JyxcbiAgICAgICAgd2lkdGg6ICcyMHB4J1xuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vdG9vbGJhci1zdHlsZXMnKSxcclxuICAgIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbmNvbnN0IFRvb2xCYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiVG9vbEJhclwiLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2lkOiBcInRvb2xCYXJDb250YWluZXJcIiwgc3R5bGU6IHN0eWxlcy50b29sQmFyQ29udGFpbmVyU3R5bGV9LCBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVG9vbEJhcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zyb250ZW5kL2NvbXBvbmVudHMvdG9vbGJhci90b29sYmFyLmpzeFxuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB0b29sQmFyQ29udGFpbmVyU3R5bGU6IHtcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBoZWlnaHQ6ICczMHB4JyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCdcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnJvbnRlbmQvY29tcG9uZW50cy90b29sYmFyL3Rvb2xiYXItc3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIGZsdXggPSByZXF1aXJlKCdmbHV4aWZ5Jyk7XG5cbnZhciBkb2NzU3RvcmUgPSBmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgICBpZDogJ2RvY3NTdG9yZScsXG4gICAgaW5pdGlhbFN0YXRlOiB7XG4gICAgICAgIGRvY3NHcmlkOiAwLFxuICAgICAgICBkb2NzTGlzdDogJycsXG4gICAgICAgIG5hbWU6ICd2bGFkJyxcbiAgICAgICAgZGF0YTogW10sXG4gICAgICAgIHNvcnRCeTogW3sgY29sdW1uOiAnaWQnLCBkaXJlY3Rpb246ICdkZXNjJyB9XSxcbiAgICAgICAgc3FsV2hlcmU6ICcnLFxuICAgICAgICB0b29nbGVQYW5lbDogdHJ1ZSwgLy8gb3BlbmVkXG4gICAgICAgIHRvb2dsZVBhbmVsRGF0YTogeyB0cmVlOiAnMTAlJywgZ3JpZDogJzkwJScsIGxlZnQ6ICcxMyUnIH0sIC8vIG9wZW5lZCxcbiAgICAgICAgc3lzdGVtTWVzc2FnZTogbnVsbFxuICAgIH0sXG4gICAgYWN0aW9uQ2FsbGJhY2tzOiB7XG4gICAgICAgIHN5c3RlbU1lc3NhZ2VDaGFuZ2U6IGZ1bmN0aW9uIHN5c3RlbU1lc3NhZ2VDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzeXN0ZW1NZXNzYWdlQ2hhbmdlIGNhbGxlZCcsIHZhbHVlKTtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgc3lzdGVtTWVzc2FnZTogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNxbFdoZXJlQ2hhbmdlOiBmdW5jdGlvbiBzcWxXaGVyZUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NxbFdoZXJlQ2hhbmdlIGNhbGxlZCcsIHZhbHVlKTtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgc3FsV2hlcmU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgcmVxdWVyeSh7IG5hbWU6ICdkb2NzR3JpZCcsIHZhbHVlOiB0aGlzLmRvY3NMaXN0IH0pO1xuICAgICAgICB9LFxuICAgICAgICBzb3J0QnlDaGFuZ2U6IGZ1bmN0aW9uIHNvcnRCeUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBzb3J0Qnk6IHZhbHVlIH0pO1xuICAgICAgICAgICAgcmVxdWVyeSh7IG5hbWU6ICdkb2NzR3JpZCcsIHZhbHVlOiB0aGlzLmRvY3NMaXN0LCBzb3J0Qnk6IHZhbHVlIH0pO1xuICAgICAgICB9LFxuICAgICAgICB0b29nbGVQYW5lbENoYW5nZTogZnVuY3Rpb24gdG9vZ2xlUGFuZWxDaGFuZ2UodXBkYXRlciwgdmFsdWUsIGRhdGEpIHtcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgdG9vZ2xlUGFuZWw6IHZhbHVlLCB0b29nbGVQYW5lbERhdGE6IGRhdGEgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIEFkZDogZnVuY3Rpb24gQWRkKHVwZGF0ZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdidXR0b24gTGlzYSBjbGlrZWQgbmV3ISAnICsgdGhpcy5kb2NzR3JpZCk7XG4gICAgICAgICAgICBhZGQodGhpcy5kb2NzTGlzdCk7XG4gICAgICAgIH0sXG4gICAgICAgIEVkaXQ6IGZ1bmN0aW9uIEVkaXQodXBkYXRlcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J1dHRvbiBNdXVkYSBjbGlrZWQhJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5kb2NzTGlzdCAmJiB0aGlzLmRvY3NHcmlkKSB7XG4gICAgICAgICAgICAgICAgZWRpdCh0aGlzLmRvY3NMaXN0LCB0aGlzLmRvY3NHcmlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9Ci0LjQvyDQtNC+0LrRg9C80LXQvdGC0LAg0LjQu9C4INC00L7QutGD0LzQtdC90YIg0L3QtSDQstGL0LHRgNCw0L0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgRGVsZXRlOiBmdW5jdGlvbiBEZWxldGUodXBkYXRlcikge1xuICAgICAgICAgICAgdmFyIGRvY1R5cGVJZCA9IHRoaXMuZG9jc0xpc3Q7XG4gICAgICAgICAgICByZXF1ZXJ5Rm9yQWN0aW9uKCdkZWxldGUnLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdzeXN0ZW1NZXNzYWdlQ2hhbmdlJywgZXJyKTsgLy8g0L/QuNGI0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIg0YXRgNCw0L3QuNC70LjRidC1XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc3lzdGVtTWVzc2FnZUNoYW5nZScsIG51bGwpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVyeSh7IG5hbWU6ICdkb2NzR3JpZCcsIHZhbHVlOiBkb2NUeXBlSWQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIFByaW50OiBmdW5jdGlvbiBQcmludCh1cGRhdGVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYnV0dG9uIFByaW50IGNsaWtlZCEnKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2hhbmdlTmFtZTogZnVuY3Rpb24gY2hhbmdlTmFtZSh1cGRhdGVyLCBuYW1lKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgbmFtZTogbmFtZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZG9jc0dyaWRDaGFuZ2U6IGZ1bmN0aW9uIGRvY3NHcmlkQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZG9jc0dyaWQ6IHZhbHVlIH0pO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlWydkb2NzR3JpZCddID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRvY3NMaXN0Q2hhbmdlOiBmdW5jdGlvbiBkb2NzTGlzdENoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gU3RvcmVzIHVwZGF0ZXMgYXJlIG9ubHkgbWFkZSBpbnNpZGUgc3RvcmUncyBhY3Rpb24gY2FsbGJhY2tzXG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRvY3NMaXN0OiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIHJlcXVlcnkoeyBuYW1lOiAnZG9jc0dyaWQnLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VbJ2RvY3NMaXN0J10gPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YUNoYW5nZTogZnVuY3Rpb24gZGF0YUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gU3RvcmVzIHVwZGF0ZXMgYXJlIG9ubHkgbWFkZSBpbnNpZGUgc3RvcmUncyBhY3Rpb24gY2FsbGJhY2tzXG4gICAgICAgICAgICAvLyAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGFDaGFuZ2U6JywgdmFsdWUpO1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkYXRhOiB2YWx1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxufSk7XG5cbnZhciBlZGl0ID0gZnVuY3Rpb24gZWRpdChkb2NUeXBlSWQsIGRvY0lkKSB7XG4gICAgdmFyIHVybCA9IFwiL2RvY3VtZW50L1wiICsgZG9jVHlwZUlkICsgZG9jSWQ7XG4gICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcbn07XG5cbnZhciBhZGQgPSBmdW5jdGlvbiBhZGQoZG9jVHlwZUlkKSB7XG4gICAgdmFyIHVybCA9IFwiL2RvY3VtZW50L1wiICsgZG9jVHlwZUlkICsgJzAnO1xuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG59O1xuXG52YXIgcmVxdWVyeUZvckFjdGlvbiA9IGZ1bmN0aW9uIHJlcXVlcnlGb3JBY3Rpb24oYWN0aW9uLCBjYWxsYmFjaykge1xuXG4gICAgLy8g0LzQtdGC0L7QtCDQvtCx0LXRgdC/0LXRh9C40YIg0LfQsNC/0YDQvtGBINC90LAg0LLRi9C/0L7Qu9C90LXQvdC40LVcbiAgICB2YXIgcGFyYW1ldGVycyA9IHtcbiAgICAgICAgZG9jSWQ6IGRvY3NTdG9yZS5kb2NzR3JpZCxcbiAgICAgICAgZG9jX3R5cGVfaWQ6IGRvY3NTdG9yZS5kb2NzTGlzdFxuICAgIH07XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2RvYycsXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBhcmFtZXRlcnMpXG4gICAgICAgIH0sXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgICAgICAvLyDQtNC+0LvQttC90Ysg0L/QvtC70YPRh9C40YLRjCDQvtCx0YrQtdC60YIgLSDRgNC10LfRg9C70YzRgtCw0YJcbiAgICAgICAgICAgIHZhciBlcnJvck1lc3NzYWdlID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCA9PSAnRXJyb3InKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzc2FnZSA9ICdFcnJvciwgJyArIGRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yTWVzc3NhZ2UsIGRhdGEpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignL2Vycm9yJywgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIG51bGwpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG52YXIgcmVxdWVyeSA9IGZ1bmN0aW9uIHJlcXVlcnkoY29tcG9uZW50KSB7XG4gICAgLy8g0LzQtdGC0L7QtCDQvtCx0LXRgdC/0LXRh9C40YIg0L/QvtC70YPRh9C10L3QuNC1INC00LDQvdC90YvRhSDQvtGCINGB0LXRgNCy0LXRgNCwXG4gICAgLy8gY29tcG9uZW50ID0gdGhpcy5zdGF0ZS5jb21wb25lbnRzW25hbWVdXG4gICAgLy8g0LXRgdC70Lgg0L/QsNGA0LDQvNC10YLRgNGLINC90LUg0LfQsNC00LDQvdGLLCDQs9GA0YPQt9C40Lwg0LLRgdC1XG5cbiAgICB2YXIgY29tcG9uZW50cyA9IGRvY3NTdG9yZS5kYXRhO1xuXG4gICAgLy8g0YTQuNC70YzRgtGA0YPQtdC8INGB0L/QuNGB0L7QuiDQutC+0LzQv9C+0L3QtdC90YLQvtCyXG4gICAgdmFyIGNvbXBvbmVudHNGb3JVcGRhdGUgPSBjb21wb25lbnRzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAvLyDQuNGJ0LXQvCDQvtCx0YrQtdC60YIg0L/QviDQvdCw0LjQvNC10L3QvtCy0LDQvdC40Y4uINC40LvQuCDQstC10YDQvdC10Lwg0LLRgdC1INC10YHQu9C4INC/0LDRgNCw0LzQtdGC0YAg0L3QtSDQt9Cw0LTQsNC9XG4gICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdjb21wb25lbnQ6JyArIEpTT04uc3RyaW5naWZ5KGNvbXBvbmVudCkpO1xuICAgICAgICBpZiAoY29tcG9uZW50Lm5hbWUgPT0gJycgfHwgaXRlbS5uYW1lID09IGNvbXBvbmVudC5uYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyDRgdC+0YDRgtC40YDQvtCy0LrQsFxuICAgIHZhciBzcWxTb3J0QnkgPSAnJyxcbiAgICAgICAgc3FsV2hlcmUgPSBkb2NzU3RvcmUuc3FsV2hlcmUgfHwgJyc7XG4gICAgdmFyIHNvcnRCeUFycmF5ID0gZG9jc1N0b3JlLnNvcnRCeSxcbiAgICAgICAgYXJyVHlwZSA9IHR5cGVvZiBzb3J0QnlBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yoc29ydEJ5QXJyYXkpO1xuICAgIGlmIChkb2NzU3RvcmUuc29ydEJ5KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc29ydEJ5QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIHNxbFNvcnRCeSA9IHNxbFNvcnRCeSArICcsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNxbFNvcnRCeSA9IHNxbFNvcnRCeSArIHNvcnRCeUFycmF5W2ldLmNvbHVtbiArICcgJyArIHNvcnRCeUFycmF5W2ldLmRpcmVjdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBVUkwgPSAnL2FwaS9kb2NzJztcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFVSTCxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG5cbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZGF0YVR5cGU6ICdjb21wb25lbnQnLFxuICAgICAgICAgICAgZG9jVHlwZUlkOiAxLFxuICAgICAgICAgICAgY29tcG9uZW50czogSlNPTi5zdHJpbmdpZnkoY29tcG9uZW50c0ZvclVwZGF0ZSksIC8vINC60L7QvNC/0L7QvdC10L3RgtGLINC00LvRjyDQvtCx0L3QvtCy0LvQtdC90LjRj1xuICAgICAgICAgICAgcGFyYW1ldGVyOiBjb21wb25lbnQudmFsdWUsIC8vINC/0LDRgNCw0LzQtdGC0YDRi1xuICAgICAgICAgICAgc29ydEJ5OiBzcWxTb3J0QnksIC8vINGB0L7RgNGC0LjRgNC+0LLQutCwXG4gICAgICAgICAgICBzcWxXaGVyZTogc3FsV2hlcmUgfSxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy8g0LTQvtC70LbQvdGLINC/0L7Qu9GD0YfQuNGC0Ywg0L7QsdGK0LXQutGCXG4gICAgICAgICAgICAvLyAgICAgICAgICAgY29uc29sZS5sb2coJ3BhcmVudCBhcnJpdmVkIGRhdGE6JyArIEpTT04uc3RyaW5naWZ5KGRhdGEpICsgJ9GC0LjQvzonICsgdHlwZW9mIGRhdGEpO1xuXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAvLyBmaW5kIGl0ZW1cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwYXJlbnQgSXRlbTonICsgSlNPTi5zdHJpbmdpZnkoaXRlbSkgKTtcbiAgICAgICAgICAgICAgICAvLyDQvtCx0L3QvtCy0LjQvCDQtNCw0L3QvdGL0LUg0LzQsNGB0YHQuNCy0LAg0LrQvtC80L/QvtC90LXQvdGC0L7QslxuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMgPSBjb21wb25lbnRzLm1hcChmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQubmFtZSA9PSBpdGVtLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuZGF0YSA9IGl0ZW0uZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdG9yZSBkYXRhIHVwZGF0ZTonICsgSlNPTi5zdHJpbmdpZnkoY29tcG9uZW50cykpO1xuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGNvbXBvbmVudHMpO1xuICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignL2Vycm9yJywgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkb2NzU3RvcmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9mcm9udGVuZC9zdG9yZXMvZG9jc19zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDamFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDL0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Iiwic291cmNlUm9vdCI6IiJ9
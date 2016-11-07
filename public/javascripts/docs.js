var docs =
webpackJsonp_name_([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// нрузим компоненты

	//var ReactDOM = require('react-dom');
	// создаем окласс - держатель состояний

	var Parent = __webpack_require__(36);

	// данные для хранилища
	localStorage['docsStore'] = storeData;
	storeData = JSON.parse(storeData);
	//console.log('storeData from docs', storeData);
	ReactDOM.render(React.createElement(Parent, { id: 'grid', components: storeData }, 'Тут будут компоненты'), document.getElementById('grid'));

/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// грузим компоненты

	const React = __webpack_require__(4),
	    MyTree = __webpack_require__(37),
	    DataGrid = __webpack_require__(39),
	    ButtonRegister = __webpack_require__(40),
	    ModalPage = __webpack_require__(24),
	    ModalPageDelete = __webpack_require__(41),
	    ModalPageInfo = __webpack_require__(42),
	    flux = __webpack_require__(5);

	let  myComponents = [];

	if (!typeof window === 'undefined') {
	    // берем данные с локального хранилища
	    myComponents = JSON.parse(localStorage['docsStore']);
	}

	// Create a store
	var docsStore = __webpack_require__(43);

	// создаем окласс - держатель состояний
	var Parent = React.createClass({
	    displayName: 'Parent',

	    filterData:['btnOk', 'btnCancel'], // массив объектов, куда запишем параметры для фильтрации @todo вынести все в отдельный компонет для фильтрации

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

	    componentWillMount: function() {
	        var self = this;

	        // создаем обработчик события на изменение даннх
	        docsStore.on('change:data', function(newValue, previousValue) {
	            // данные изменились, меняем состояние
	            self.setState({components:docsStore.data})
	        })

	        // создаем обработчик события на сворачивание панелей
	        docsStore.on('change:tooglePanel', function(newValue, previousValue) {
	            var toogleData = flux.stores.docsStore.tooglePanelData;
	            // данные изменились, меняем состояние
	            self.setState({gridLeft:toogleData.left,gridWidth:toogleData.width })
	        })

	        // создаем обработчик события системный извещение
	        docsStore.on('change:systemMessage', function(newValue, previousValue) {
	            // данные изменились, меняем состояние
	            let systemMessageStatus = newValue ? true : false;
	            self.setState({showSystemMessage:systemMessageStatus });
	        })

	    },

	    componentDidMount: function() {
	        // покажем данные

	        let lastComponent = localStorage['docsList'];
	        flux.doAction( 'dataChange', this.props.components );
	        if (lastComponent) {
	            flux.doAction('docsListChange',lastComponent);
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
	    findComponent: function(componentName) {
	        // вернет данные компонента по его названию
	        let components = this.state.components,
	            componentData = [];

	        if (components.length > 0 ) {
	            componentData = components.filter(function(item) {
	                if (item.name == componentName) {
	                    return item;
	                }
	            });
	        }
	        return componentData;

	    },

	    btnFilterClick: function() {
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
	        let  myListValue = '',
	            myListData = this.findComponent('docsList') || [],
	            myGrid = this.findComponent('docsGrid') || [],
	            myGridColums = [],
	            myGridData = [],
	            tooglePaneelData = flux.stores.docsStore.tooglePanelData,
	            systemMessage = flux.stores.docsStore.systemMessage,
	            gridLeft = '13%'; // @todo вынести в отдельную переменную

	        if (myListData.length > 0 ) {
	            myListValue = myListData[0].value;
	        }
	        
	        // проверим наличие данных, если есть пропихнем компонентам
	        if (myGrid.length > 0 && myGrid[0].data.length > 0) {
	            myGridColums = myGrid[0].data[0].columns;
	            myGridData = myGrid[0].data[0].data;
	        }

	        var filterComponent;
	         if (this.state.getFilter)  {
	             filterComponent =  this.getFilterFields();
	         }

	        if (myListData.length > 0 &&  myListData[0].data.length > 0) {
	            myListData =  myListData[0].data;
	        }

	        return (React.createElement("div", {id: "parentDiv"}, 
	                React.createElement(MyTree, {
	                    componentName: "docsList", 
	                    data: myListData, 
	                    value: myListValue, 
	                    onChangeAction: "docsListChange"}), 
	                React.createElement("div", {id: "gridToolBar"}, "Toolbar", 
	                    React.createElement(ButtonRegister, {onClick: this.btnAddClick, value: " Add "}), 
	                    React.createElement(ButtonRegister, {onClick: this.btnEditClick, value: " Edit "}), 
	                    React.createElement(ButtonRegister, {onClick: this.btnDeleteClick, value: " Delete "}), 
	                    React.createElement(ButtonRegister, {onClick: this.btnPrintClick, value: " Print "}), 
	                    React.createElement("button", {
	                        className: "gridToolbar", 
	                        onClick: this.btnFilterClick
	                    }, " Filter ")
	                ), 
	                React.createElement("div", {id: "gridTable", 
	                     style: {width:tooglePaneelData.grid, left: tooglePaneelData.left}
	                }, 
	                    React.createElement(DataGrid, {
	                        gridData: myGridData, 
	                        gridColumns: myGridColums, 
	                        onChangeAction: "docsGridChange", 
	                        url: "api"}
	                    )
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
	    },

	    modalPageBtnClick: function(btnEvent) {
	        // обработчик для кнопки фильтрации
	        var filterString = '';
	        if (btnEvent = 'Ok') {
	                // собирем данные в объект и вернем на форму
	            this.filterData = this.filterData.map(function(row)  {
	                    row.value = this.refs[row.refs].value;

	                    if (row.value) {
	                        filterString = filterString + (filterString.length > 0 ? " and ": " where ");
	                        switch (row.type) {

	                            case 'text':
	                                filterString = filterString + row.refs + " ilike '%" + row.value + "%'";
	                                break;
	                            case 'string':
	                                filterString = filterString + row.refs + " ilike '" + row.value + "%'";
	                                break;
	                            case 'date':
	                                filterString = filterString + row.refs + " = '" + row.value + "'" ;
	                                break;
	                            case 'number':
	                                filterString = filterString + row.refs + " = " + row.value ;
	                                break;
	                            case 'integer':
	                                filterString = filterString + row.refs + " = " + row.value ;
	                                break;
	                        }
	//                        console.log('modalPageBtnClick, filterString ', filterString);

	                    }
	                return row;
	                }.bind(this), this);
	            flux.doAction( 'sqlWhereChange', filterString );
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
	        flux.doAction('systemMessageChange', null );

	    },

	    getFilterFields: function() {
	        // @todo вынести в отдельный модуль
	        // создаст из полкй грида компоненты для формирования условий фильтрации
	        var gridComponents =  docsStore.data,
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

	                    for (let i = 0; i < previosFilter.length; i++ ) {
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
	                    this.filterData.push({name:row.name, value: componentObjektValue || null, type:componentType, refs: row.id});

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
	            filterFields = React.createElement("div", {className: "fieldset"}, React.createElement("ul", null, filterFields))
	        }

	        return filterFields;
	    }
	});

	module.exports = Parent;

/***/ },

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    MyList = __webpack_require__(38);

	var MyTree = React.createClass({
	    displayName: 'MyTree',

	    render: function render() {
	        console.log('my tree render');
	        return React.createElement('div', { id: 'tree' }, React.createElement(MyList, {
	            sourceArray: this.props.data,
	            value: this.props.value,
	            onChangeAction: this.props.onChangeAction }));
	    }
	});

	module.exports = MyTree;

/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    flux = __webpack_require__(5);

	var TOOGLEPANELOPENED = { tree: '10%', grid: '90%', left: '13%' },
	    TOOGLEPANELCLOSED = { tree: '1%', grid: '100%', left: '0' };

	var MyList = React.createClass({
	    displayName: 'MyList',

	    getInitialState: function getInitialState() {
	        return {
	            sourceArray: this.props.sourceArray,
	            isChecked: false,
	            clicked: 99999999,
	            //            clicked: this.getIndexByComponent(this.props.value),
	            choosenDocTypeId: this.props.value || ''
	        };
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            clicked: 99999999,
	            choosenDocTypeId: ''
	        };
	    },

	    getIndexByComponent: function getIndexByComponent(component) {
	        // вернет индекс компонента по его коду   
	        var index = 0,
	            componentArray = this.props.sourceArray;

	        if (component) {
	            for (var i = 0; i < componentArray.length; i++) {
	                if (componentArray[i]['kood'] == component) {
	                    index = i;
	                    break;
	                }
	            }
	            componentArray.forEach(function (row) {
	                if (row.kood == 'component') {
	                    index = row.id;
	                    console.log('getIndexByComponent index', index);
	                }
	            });
	        }
	        return index;
	    },

	    componentWillMount: function componentWillMount() {
	        flux.stores.docsStore.on('change:docsList', function (newValue, previousValue) {
	            console.log(' flux.stores.docsStore.on(change:docsList)', newValue, previousValue, localStorage['docsGrid']);
	            if (newValue !== previousValue && previousValue !== '') {
	                // данные изменились, удаляем метку индекса строки грида
	                console.log('документ изменился');
	                localStorage['docsGrid'] = 0;
	            }
	        });
	    },
	    componentDidMount: function componentDidMount() {
	        if (this.state.clicked == 99999999) {
	            // не установлен ещеб отметим последнй выбор
	            var lastComponent = localStorage['docsList'],
	                index = this.getIndexByComponent(lastComponent);

	            this.handleLiClick(index);
	        }
	    },

	    handleLiClick: function handleLiClick(idx) {
	        var myArray = this.props.sourceArray,
	            choosenDocType = this.props.sourceArray[idx]["id"],
	            choosenCode = this.props.sourceArray[idx]["kood"];
	        //ставим метку
	        // сохраняем состояние

	        this.setState({
	            clicked: idx,
	            choosenDocTypeId: choosenDocType
	        });

	        // сохраним в хранилище
	        flux.doAction(this.props.onChangeAction, choosenCode);
	    },

	    handleButtonClick: function handleButtonClick() {
	        var gridToogleWidth = flux.stores.docsStore.tooglePanelData;
	        // при клике показываем или скрывает компонент
	        this.setState({
	            isChecked: !this.state.isChecked
	        });

	        gridToogleWidth = this.state.isChecked ? TOOGLEPANELOPENED : TOOGLEPANELCLOSED;
	        flux.doAction('tooglePanelChange', this.state.isChecked, gridToogleWidth);
	    },

	    render: function render() {
	        var myArray = this.props.sourceArray;
	        var myStyle = this.state.isChecked ? 'none' : 'block'; // прячет список
	        var myGridStyle = 'block';
	        var clickedItem = this.state.clicked;

	        //       console.log('myList render state', this.state, this.props);

	        if (myArray.length == 0) {
	            // добавим пустую строку
	            myArray.push({
	                id: 0,
	                name: '',
	                kood: ''
	            });
	        }

	        myArray = myArray.map(function (item, index) {
	            var myClass = 'liDocLibs';

	            var lib = item;

	            if (clickedItem == index) {
	                myClass = myClass + ' focused'; // подсветим выбранную строку
	            };

	            return React.createElement('li', {
	                key: 'lib-' + index,
	                className: myClass,
	                style: { display: myStyle },
	                onClick: this.handleLiClick.bind(this, index)
	            }, lib.name);
	        }, this);

	        var root = React.createElement('ul', { onEvent: this.onEvent }, myArray);
	        var docLibsDiv = React.createElement('div', { className: 'treeDocs', style: { display: myStyle }, id: 'treeDocs' }, root);
	        var buttonValue = this.state.isChecked ? '+' : '-';
	        return React.createElement('div', null, React.createElement('div', { id: 'treeToolBar' }, React.createElement('input', {
	            type: 'button',
	            value: buttonValue,
	            onClick: this.handleButtonClick
	        })), docLibsDiv);
	    }
	});

	module.exports = MyList;

/***/ },

/***/ 39:
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
	        console.log('grid render called');
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

/***/ 40:
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

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(4),
	    ModalPage = __webpack_require__(24);

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

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const React = __webpack_require__(4),
	    ModalPage = __webpack_require__(24);

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

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	        // динамический фильтр грида
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Zyb250ZW5kL2RvY3MuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9kb2MtcmVnaXN0ZXIuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvbXl0cmVlLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvbXlsaXN0LmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvZGF0YS1ncmlkLmpzeCIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL2J1dHRvbi1yZWdpc3Rlci5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbFBhZ2VEZWxldGUuanN4Iiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvbXBvbmVudHMvbW9kYWxQYWdlSW5mby5qc3giLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvc3RvcmVzL2RvY3Nfc3RvcmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLy8g0L3RgNGD0LfQuNC8INC60L7QvNC/0L7QvdC10L3RgtGLXG5cbi8vdmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG4vLyDRgdC+0LfQtNCw0LXQvCDQvtC60LvQsNGB0YEgLSDQtNC10YDQttCw0YLQtdC70Ywg0YHQvtGB0YLQvtGP0L3QuNC5XG5cbnZhciBQYXJlbnQgPSByZXF1aXJlKCcuLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1yZWdpc3Rlci5qc3gnKTtcblxuLy8g0LTQsNC90L3Ri9C1INC00LvRjyDRhdGA0LDQvdC40LvQuNGJ0LBcbmxvY2FsU3RvcmFnZVsnZG9jc1N0b3JlJ10gPSBzdG9yZURhdGE7XG5zdG9yZURhdGEgPSBKU09OLnBhcnNlKHN0b3JlRGF0YSk7XG4vL2NvbnNvbGUubG9nKCdzdG9yZURhdGEgZnJvbSBkb2NzJywgc3RvcmVEYXRhKTtcblJlYWN0RE9NLnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KFBhcmVudCwgeyBpZDogJ2dyaWQnLCBjb21wb25lbnRzOiBzdG9yZURhdGEgfSwgJ9Ci0YPRgiDQsdGD0LTRg9GCINC60L7QvNC/0L7QvdC10L3RgtGLJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkJykpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9kb2NzLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG4vLyDQs9GA0YPQt9C40Lwg0LrQvtC80L/QvtC90LXQvdGC0YtcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcclxuICAgIE15VHJlZSA9IHJlcXVpcmUoJy4vbXl0cmVlJyksXHJcbiAgICBEYXRhR3JpZCA9IHJlcXVpcmUoJy4vZGF0YS1ncmlkLmpzeCcpLFxyXG4gICAgQnV0dG9uUmVnaXN0ZXIgPSByZXF1aXJlKCcuL2J1dHRvbi1yZWdpc3Rlci5qc3gnKSxcclxuICAgIE1vZGFsUGFnZSA9IHJlcXVpcmUoJy4vbW9kYWxQYWdlLmpzeCcpLFxyXG4gICAgTW9kYWxQYWdlRGVsZXRlID0gcmVxdWlyZSgnLi9tb2RhbFBhZ2VEZWxldGUuanN4JyksXHJcbiAgICBNb2RhbFBhZ2VJbmZvID0gcmVxdWlyZSgnLi9tb2RhbFBhZ2VJbmZvLmpzeCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbmxldCAgbXlDb21wb25lbnRzID0gW107XHJcblxyXG5pZiAoIXR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAvLyDQsdC10YDQtdC8INC00LDQvdC90YvQtSDRgSDQu9C+0LrQsNC70YzQvdC+0LPQviDRhdGA0LDQvdC40LvQuNGJ0LBcclxuICAgIG15Q29tcG9uZW50cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlWydkb2NzU3RvcmUnXSk7XHJcbn1cclxuXHJcbi8vIENyZWF0ZSBhIHN0b3JlXHJcbnZhciBkb2NzU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZXMvZG9jc19zdG9yZS5qcycpO1xyXG5cclxuLy8g0YHQvtC30LTQsNC10Lwg0L7QutC70LDRgdGBIC0g0LTQtdGA0LbQsNGC0LXQu9GMINGB0L7RgdGC0L7Rj9C90LjQuVxyXG52YXIgUGFyZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZGlzcGxheU5hbWU6ICdQYXJlbnQnLFxyXG5cclxuICAgIGZpbHRlckRhdGE6WydidG5PaycsICdidG5DYW5jZWwnXSwgLy8g0LzQsNGB0YHQuNCyINC+0LHRitC10LrRgtC+0LIsINC60YPQtNCwINC30LDQv9C40YjQtdC8INC/0LDRgNCw0LzQtdGC0YDRiyDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40LggQHRvZG8g0LLRi9C90LXRgdGC0Lgg0LLRgdC1INCyINC+0YLQtNC10LvRjNC90YvQuSDQutC+0LzQv9C+0L3QtdGCINC00LvRjyDRhNC40LvRjNGC0YDQsNGG0LjQuFxyXG5cclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC8vINGDINC60LDQttC00L7Qs9C+INC60L7QvNC/0L7QvdC10L3RgtCwINGB0LLQvtC5INC+0LHRitC10LrRglxyXG4gICAgICAgICAgICBjb21wb25lbnRzOiB0aGlzLnByb3BzLmNvbXBvbmVudHMsIC8vIEB0b2RvINCy0YvQvdC10YHRgtC4INCyINC+0YLQtNC10LvRjNC90YvQuSDRhNCw0LnQuyDQutC+0LzQv9C+0L3QtdC90YLQsFxyXG4gICAgICAgICAgICBncmlkTGVmdDogJzEzJScsXHJcbiAgICAgICAgICAgIGdyaWRXaWR0aDogJzkwJScsXHJcbiAgICAgICAgICAgIGdldEZpbHRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgIGdldERlbGV0ZU1vZGFsUGFnZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dTeXN0ZW1NZXNzYWdlOiBmYWxzZVxyXG5cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDQuNC30LzQtdC90LXQvdC40LUg0LTQsNC90L3RhVxyXG4gICAgICAgIGRvY3NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbihuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyDQtNCw0L3QvdGL0LUg0LjQt9C80LXQvdC40LvQuNGB0YwsINC80LXQvdGP0LXQvCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7Y29tcG9uZW50czpkb2NzU3RvcmUuZGF0YX0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40Log0YHQvtCx0YvRgtC40Y8g0L3QsCDRgdCy0L7RgNCw0YfQuNCy0LDQvdC40LUg0L/QsNC90LXQu9C10LlcclxuICAgICAgICBkb2NzU3RvcmUub24oJ2NoYW5nZTp0b29nbGVQYW5lbCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciB0b29nbGVEYXRhID0gZmx1eC5zdG9yZXMuZG9jc1N0b3JlLnRvb2dsZVBhbmVsRGF0YTtcclxuICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2dyaWRMZWZ0OnRvb2dsZURhdGEubGVmdCxncmlkV2lkdGg6dG9vZ2xlRGF0YS53aWR0aCB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINGB0LjRgdGC0LXQvNC90YvQuSDQuNC30LLQtdGJ0LXQvdC40LVcclxuICAgICAgICBkb2NzU3RvcmUub24oJ2NoYW5nZTpzeXN0ZW1NZXNzYWdlJywgZnVuY3Rpb24obmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgIGxldCBzeXN0ZW1NZXNzYWdlU3RhdHVzID0gbmV3VmFsdWUgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe3Nob3dTeXN0ZW1NZXNzYWdlOnN5c3RlbU1lc3NhZ2VTdGF0dXMgfSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQv9C+0LrQsNC20LXQvCDQtNCw0L3QvdGL0LVcclxuXHJcbiAgICAgICAgbGV0IGxhc3RDb21wb25lbnQgPSBsb2NhbFN0b3JhZ2VbJ2RvY3NMaXN0J107XHJcbiAgICAgICAgZmx1eC5kb0FjdGlvbiggJ2RhdGFDaGFuZ2UnLCB0aGlzLnByb3BzLmNvbXBvbmVudHMgKTtcclxuICAgICAgICBpZiAobGFzdENvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdkb2NzTGlzdENoYW5nZScsbGFzdENvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgIC8vINC40LfQvNC10L3QtdC90LjRjyDQsdGD0LTRg9GCINC+0YLRgNCw0LbQsNGC0YzRgdGPINGC0L7Qu9GM0LrQviDQsiDRgdC70YPRh9Cw0LUg0LXRgdC70Lgg0YLQsNC60LjQtSDQtdGB0YLRjFxyXG4gICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG5leHRTdGF0ZSkgKyAnIFZTICcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSk7XHJcbiAgICAgdmFyIHJldHVyblZhbHVlID0gKEpTT04uc3RyaW5naWZ5KG5leHRTdGF0ZSkgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUpICk7XHJcbiAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgIH0sXHJcblxyXG4gICAgICovXHJcbiAgICBmaW5kQ29tcG9uZW50OiBmdW5jdGlvbihjb21wb25lbnROYW1lKSB7XHJcbiAgICAgICAgLy8g0LLQtdGA0L3QtdGCINC00LDQvdC90YvQtSDQutC+0LzQv9C+0L3QtdC90YLQsCDQv9C+INC10LPQviDQvdCw0LfQstCw0L3QuNGOXHJcbiAgICAgICAgbGV0IGNvbXBvbmVudHMgPSB0aGlzLnN0YXRlLmNvbXBvbmVudHMsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudERhdGEgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGNvbXBvbmVudHMubGVuZ3RoID4gMCApIHtcclxuICAgICAgICAgICAgY29tcG9uZW50RGF0YSA9IGNvbXBvbmVudHMuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5hbWUgPT0gY29tcG9uZW50TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudERhdGE7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBidG5GaWx0ZXJDbGljazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0L7RgtC60YDQvtC10YIg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+INGBINC/0L7Qu9GP0LzQuCDQtNC70Y8g0YTQuNC70YzRgtGA0LDRhtC40LhcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtnZXRGaWx0ZXI6IHRydWV9KVxyXG4gICAgfSxcclxuXHJcbiAgICBidG5EZWxldGVDbGljazpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtnZXREZWxldGVNb2RhbFBhZ2U6IHRydWV9KVxyXG4gICAgfSxcclxuXHJcbiAgICBidG5BZGRDbGljazpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQutC70LjQuiDQutC90L7Qv9C60LggXCLQlNC+0LHQsNCy0LjRgtGMXCJcclxuICAgICAgICAgICAgLy8g0LLRi9C30L7QstC10Lwg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGE0LvQsNC60YHQtVxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdBZGQnKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgIGJ0bkVkaXRDbGljazpmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDRgdC+0LHRi9GC0LjRjyDQutC70LjQuiDQutC90L7Qv9C60LggXCLQmNC30LzQtdC90LjRgtGMXCJcclxuICAgICAgICAgICAgLy8g0LLRi9C30L7QstC10Lwg0LTQtdC50YHRgtCy0LjRjyDQvdCwINGE0LvQsNC60YHQtVxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKCdFZGl0Jyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICBidG5QcmludENsaWNrOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INGB0L7QsdGL0YLQuNGPINC60LvQuNC6INC60L3QvtC/0LrQuCBcItCY0LfQvNC10L3QuNGC0YxcIlxyXG4gICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdQcmludCcpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgIG15TGlzdFZhbHVlID0gJycsXHJcbiAgICAgICAgICAgIG15TGlzdERhdGEgPSB0aGlzLmZpbmRDb21wb25lbnQoJ2RvY3NMaXN0JykgfHwgW10sXHJcbiAgICAgICAgICAgIG15R3JpZCA9IHRoaXMuZmluZENvbXBvbmVudCgnZG9jc0dyaWQnKSB8fCBbXSxcclxuICAgICAgICAgICAgbXlHcmlkQ29sdW1zID0gW10sXHJcbiAgICAgICAgICAgIG15R3JpZERhdGEgPSBbXSxcclxuICAgICAgICAgICAgdG9vZ2xlUGFuZWVsRGF0YSA9IGZsdXguc3RvcmVzLmRvY3NTdG9yZS50b29nbGVQYW5lbERhdGEsXHJcbiAgICAgICAgICAgIHN5c3RlbU1lc3NhZ2UgPSBmbHV4LnN0b3Jlcy5kb2NzU3RvcmUuc3lzdGVtTWVzc2FnZSxcclxuICAgICAgICAgICAgZ3JpZExlZnQgPSAnMTMlJzsgLy8gQHRvZG8g0LLRi9C90LXRgdGC0Lgg0LIg0L7RgtC00LXQu9GM0L3Rg9GOINC/0LXRgNC10LzQtdC90L3Rg9GOXHJcblxyXG4gICAgICAgIGlmIChteUxpc3REYXRhLmxlbmd0aCA+IDAgKSB7XHJcbiAgICAgICAgICAgIG15TGlzdFZhbHVlID0gbXlMaXN0RGF0YVswXS52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g0L/RgNC+0LLQtdGA0LjQvCDQvdCw0LvQuNGH0LjQtSDQtNCw0L3QvdGL0YUsINC10YHQu9C4INC10YHRgtGMINC/0YDQvtC/0LjRhdC90LXQvCDQutC+0LzQv9C+0L3QtdC90YLQsNC8XHJcbiAgICAgICAgaWYgKG15R3JpZC5sZW5ndGggPiAwICYmIG15R3JpZFswXS5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbXlHcmlkQ29sdW1zID0gbXlHcmlkWzBdLmRhdGFbMF0uY29sdW1ucztcclxuICAgICAgICAgICAgbXlHcmlkRGF0YSA9IG15R3JpZFswXS5kYXRhWzBdLmRhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZmlsdGVyQ29tcG9uZW50O1xyXG4gICAgICAgICBpZiAodGhpcy5zdGF0ZS5nZXRGaWx0ZXIpICB7XHJcbiAgICAgICAgICAgICBmaWx0ZXJDb21wb25lbnQgPSAgdGhpcy5nZXRGaWx0ZXJGaWVsZHMoKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobXlMaXN0RGF0YS5sZW5ndGggPiAwICYmICBteUxpc3REYXRhWzBdLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBteUxpc3REYXRhID0gIG15TGlzdERhdGFbMF0uZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7aWQ6IFwicGFyZW50RGl2XCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTXlUcmVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50TmFtZTogXCJkb2NzTGlzdFwiLCBcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBteUxpc3REYXRhLCBcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbXlMaXN0VmFsdWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlQWN0aW9uOiBcImRvY3NMaXN0Q2hhbmdlXCJ9KSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJncmlkVG9vbEJhclwifSwgXCJUb29sYmFyXCIsIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvblJlZ2lzdGVyLCB7b25DbGljazogdGhpcy5idG5BZGRDbGljaywgdmFsdWU6IFwiIEFkZCBcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvblJlZ2lzdGVyLCB7b25DbGljazogdGhpcy5idG5FZGl0Q2xpY2ssIHZhbHVlOiBcIiBFZGl0IFwifSksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uUmVnaXN0ZXIsIHtvbkNsaWNrOiB0aGlzLmJ0bkRlbGV0ZUNsaWNrLCB2YWx1ZTogXCIgRGVsZXRlIFwifSksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uUmVnaXN0ZXIsIHtvbkNsaWNrOiB0aGlzLmJ0blByaW50Q2xpY2ssIHZhbHVlOiBcIiBQcmludCBcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImdyaWRUb29sYmFyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmJ0bkZpbHRlckNsaWNrXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgXCIgRmlsdGVyIFwiKVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJncmlkVGFibGVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7d2lkdGg6dG9vZ2xlUGFuZWVsRGF0YS5ncmlkLCBsZWZ0OiB0b29nbGVQYW5lZWxEYXRhLmxlZnR9XHJcbiAgICAgICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERhdGFHcmlkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWREYXRhOiBteUdyaWREYXRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZENvbHVtbnM6IG15R3JpZENvbHVtcywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlQWN0aW9uOiBcImRvY3NHcmlkQ2hhbmdlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiYXBpXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmdldEZpbHRlciA/XHJcbiAgICAgICAgICAgICAgICAgICAgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxQYWdlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiB0aGlzLm1vZGFsUGFnZUJ0bkNsaWNrLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJGaWx0ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sIFwiIFwiLCBmaWx0ZXJDb21wb25lbnQsIFwiIFwiKSlcclxuICAgICAgICAgICAgICAgICAgICA6IG51bGwsIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5nZXREZWxldGVNb2RhbFBhZ2UgP1xyXG4gICAgICAgICAgICAgICAgICAgIChSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZURlbGV0ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VEZWxCdG5DbGlja31cclxuICAgICAgICAgICAgICAgICAgICApKSA6IG51bGwsIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zaG93U3lzdGVtTWVzc2FnZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxQYWdlSW5mbywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RhbFBhZ2VCdG5DbGljazogdGhpcy5tb2RhbFBhZ2VJbmZvQnRuQ2xpY2ssIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzeXN0ZW1NZXNzYWdlOiBzeXN0ZW1NZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgICAgICkpIDogbnVsbFxyXG5cclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICApXHJcbiAgICB9LFxyXG5cclxuICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiBmdW5jdGlvbihidG5FdmVudCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQutC90L7Qv9C60Lgg0YTQuNC70YzRgtGA0LDRhtC40LhcclxuICAgICAgICB2YXIgZmlsdGVyU3RyaW5nID0gJyc7XHJcbiAgICAgICAgaWYgKGJ0bkV2ZW50ID0gJ09rJykge1xyXG4gICAgICAgICAgICAgICAgLy8g0YHQvtCx0LjRgNC10Lwg0LTQsNC90L3Ri9C1INCyINC+0LHRitC10LrRgiDQuCDQstC10YDQvdC10Lwg0L3QsCDRhNC+0YDQvNGDXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YSA9IHRoaXMuZmlsdGVyRGF0YS5tYXAoZnVuY3Rpb24ocm93KSAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdy52YWx1ZSA9IHRoaXMucmVmc1tyb3cucmVmc10udmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgKGZpbHRlclN0cmluZy5sZW5ndGggPiAwID8gXCIgYW5kIFwiOiBcIiB3aGVyZSBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocm93LnR5cGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJpbmcgPSBmaWx0ZXJTdHJpbmcgKyByb3cucmVmcyArIFwiIGlsaWtlICclXCIgKyByb3cudmFsdWUgKyBcIiUnXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgaWxpa2UgJ1wiICsgcm93LnZhbHVlICsgXCIlJ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgcm93LnJlZnMgKyBcIiA9ICdcIiArIHJvdy52YWx1ZSArIFwiJ1wiIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyaW5nID0gZmlsdGVyU3RyaW5nICsgcm93LnJlZnMgKyBcIiA9IFwiICsgcm93LnZhbHVlIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ludGVnZXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZyA9IGZpbHRlclN0cmluZyArIHJvdy5yZWZzICsgXCIgPSBcIiArIHJvdy52YWx1ZSA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW9kYWxQYWdlQnRuQ2xpY2ssIGZpbHRlclN0cmluZyAnLCBmaWx0ZXJTdHJpbmcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCB0aGlzKTtcclxuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbiggJ3NxbFdoZXJlQ2hhbmdlJywgZmlsdGVyU3RyaW5nICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2dldEZpbHRlcjogZmFsc2V9KVxyXG4gICAgfSxcclxuXHJcbiAgICBtb2RhbFBhZ2VEZWxCdG5DbGljazpmdW5jdGlvbihidG5FdmVudCkge1xyXG4gICAgICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INCy0YvQt9C+0LLQsCDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsCDRg9C00LDQu9C10L3QuNGPXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z2V0RGVsZXRlTW9kYWxQYWdlOiBmYWxzZX0pO1xyXG5cclxuICAgICAgICBpZiAoYnRuRXZlbnQgPT0gJ09rJykge1xyXG4gICAgICAgICAgICAvLyDQstGL0LfQvtCy0LXQvCDQtNC10LnRgdGC0LLQuNGPINC90LAg0YTQu9Cw0LrRgdC1XHJcbiAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ0RlbGV0ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG1vZGFsUGFnZUluZm9CdG5DbGljazpmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40Log0LLRi9C30L7QstCwINC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwINGB0LjRgdGC0LXQvNC90L7Qs9C+INGB0L7QvtCx0YnQtdC90LjRj1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dTeXN0ZW1NZXNzYWdlOiBmYWxzZX0pO1xyXG4gICAgICAgIC8vINCy0YvQt9C+0LLQtdC8INC00LXQudGB0YLQstC40Y8g0L3QsCDRhNC70LDQutGB0LVcclxuICAgICAgICBmbHV4LmRvQWN0aW9uKCdzeXN0ZW1NZXNzYWdlQ2hhbmdlJywgbnVsbCApO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RmlsdGVyRmllbGRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBAdG9kbyDQstGL0L3QtdGB0YLQuCDQsiDQvtGC0LTQtdC70YzQvdGL0Lkg0LzQvtC00YPQu9GMXHJcbiAgICAgICAgLy8g0YHQvtC30LTQsNGB0YIg0LjQtyDQv9C+0LvQutC5INCz0YDQuNC00LAg0LrQvtC80L/QvtC90LXQvdGC0Ysg0LTQu9GPINGE0L7RgNC80LjRgNC+0LLQsNC90LjRjyDRg9GB0LvQvtCy0LjQuSDRhNC40LvRjNGC0YDQsNGG0LjQuFxyXG4gICAgICAgIHZhciBncmlkQ29tcG9uZW50cyA9ICBkb2NzU3RvcmUuZGF0YSxcclxuICAgICAgICAgICAgZ3JpZERhdGEgPSBbXSxcclxuICAgICAgICAgICAgcHJldmlvc0ZpbHRlciA9IHRoaXMuZmlsdGVyRGF0YSxcclxuICAgICAgICAgICAgZmlsdGVyRmllbGRzO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRDb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChncmlkQ29tcG9uZW50c1tpXVsnbmFtZSddID09ICdkb2NzR3JpZCcpIHtcclxuICAgICAgICAgICAgICAgIC8vINC40YnQtdC8INC/0L7Qu9C1IGNvbHVtbnNcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGZpZWxkIGluIGdyaWRDb21wb25lbnRzW2ldLmRhdGFbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGQgPT0gJ2NvbHVtbnMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWREYXRhID0gZ3JpZENvbXBvbmVudHNbaV0uZGF0YVswXS5jb2x1bW5zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmIChncmlkRGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEgPSBbXTsgLy8g0L7QsdC90YPQu9C40Lwg0LzQsNGB0YHQuNCyXHJcbiAgICAgICAgICAgIGZpbHRlckZpZWxkcyA9XHJcbiAgICAgICAgICAgICAgICBncmlkRGF0YS5tYXAoZnVuY3Rpb24ocm93LCBpbmRleCkgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tcG9uZW50VHlwZSA9ICd0ZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50T2JqZWt0VmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJldmlvc0ZpbHRlci5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LjRidC10LwgXCLRgdGC0LDRgNC+0LVcIiDQt9C90LDRh9C10L3QuNC1INGE0LjQu9GM0YLRgNCwINC4INC10YHQu9C4INC10YHRgtGMLCDRgtC+INC+0YLQtNCw0LXQvCDQtdCz0L4gdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3NGaWx0ZXJbaV0ucmVmcyA9PSByb3cuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudE9iamVrdFZhbHVlID0gcHJldmlvc0ZpbHRlcltpXS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb21wb25lbnRPYmpla3Q6JywgY29tcG9uZW50T2JqZWt0VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlID0gcm93LnR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDRgdC+0LHQtdGA0LXQvCDQvNCw0YHRgdC40LIg0L7QsdGK0LXQutGC0L7QslxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YS5wdXNoKHtuYW1lOnJvdy5uYW1lLCB2YWx1ZTogY29tcG9uZW50T2JqZWt0VmFsdWUgfHwgbnVsbCwgdHlwZTpjb21wb25lbnRUeXBlLCByZWZzOiByb3cuaWR9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7a2V5OiBpbmRleH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtjbGFzc05hbWU6IFwiZm9ybS13aWRnZXQtbGFiZWxcIn0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHJvdy5uYW1lKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGNvbXBvbmVudFR5cGUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ1aS1jMlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcm93Lm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJvdy5uYW1lLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogcm93Lm5hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogcm93LmlkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGNvbXBvbmVudE9iamVrdFZhbHVlIHx8IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIGZpbHRlckZpZWxkcyA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJmaWVsZHNldFwifSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIGZpbHRlckZpZWxkcykpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmlsdGVyRmllbGRzO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFyZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL2RvYy1yZWdpc3Rlci5qc3hcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxuICAgIE15TGlzdCA9IHJlcXVpcmUoJy4vbXlsaXN0LmpzJyk7XG5cbnZhciBNeVRyZWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdNeVRyZWUnLFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdteSB0cmVlIHJlbmRlcicpO1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBpZDogJ3RyZWUnIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTXlMaXN0LCB7XG4gICAgICAgICAgICBzb3VyY2VBcnJheTogdGhpcy5wcm9wcy5kYXRhLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXG4gICAgICAgICAgICBvbkNoYW5nZUFjdGlvbjogdGhpcy5wcm9wcy5vbkNoYW5nZUFjdGlvbiB9KSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTXlUcmVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL215dHJlZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIFRPT0dMRVBBTkVMT1BFTkVEID0geyB0cmVlOiAnMTAlJywgZ3JpZDogJzkwJScsIGxlZnQ6ICcxMyUnIH0sXG4gICAgVE9PR0xFUEFORUxDTE9TRUQgPSB7IHRyZWU6ICcxJScsIGdyaWQ6ICcxMDAlJywgbGVmdDogJzAnIH07XG5cbnZhciBNeUxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdNeUxpc3QnLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzb3VyY2VBcnJheTogdGhpcy5wcm9wcy5zb3VyY2VBcnJheSxcbiAgICAgICAgICAgIGlzQ2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICBjbGlja2VkOiA5OTk5OTk5OSxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY2xpY2tlZDogdGhpcy5nZXRJbmRleEJ5Q29tcG9uZW50KHRoaXMucHJvcHMudmFsdWUpLFxuICAgICAgICAgICAgY2hvb3NlbkRvY1R5cGVJZDogdGhpcy5wcm9wcy52YWx1ZSB8fCAnJ1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNsaWNrZWQ6IDk5OTk5OTk5LFxuICAgICAgICAgICAgY2hvb3NlbkRvY1R5cGVJZDogJydcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgZ2V0SW5kZXhCeUNvbXBvbmVudDogZnVuY3Rpb24gZ2V0SW5kZXhCeUNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgLy8g0LLQtdGA0L3QtdGCINC40L3QtNC10LrRgSDQutC+0LzQv9C+0L3QtdC90YLQsCDQv9C+INC10LPQviDQutC+0LTRgyAgIFxuICAgICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgICAgY29tcG9uZW50QXJyYXkgPSB0aGlzLnByb3BzLnNvdXJjZUFycmF5O1xuXG4gICAgICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29tcG9uZW50QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50QXJyYXlbaV1bJ2tvb2QnXSA9PSBjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21wb25lbnRBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICAgICAgICBpZiAocm93Lmtvb2QgPT0gJ2NvbXBvbmVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSByb3cuaWQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRJbmRleEJ5Q29tcG9uZW50IGluZGV4JywgaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIGZsdXguc3RvcmVzLmRvY3NTdG9yZS5vbignY2hhbmdlOmRvY3NMaXN0JywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnIGZsdXguc3RvcmVzLmRvY3NTdG9yZS5vbihjaGFuZ2U6ZG9jc0xpc3QpJywgbmV3VmFsdWUsIHByZXZpb3VzVmFsdWUsIGxvY2FsU3RvcmFnZVsnZG9jc0dyaWQnXSk7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHByZXZpb3VzVmFsdWUgJiYgcHJldmlvdXNWYWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAvLyDQtNCw0L3QvdGL0LUg0LjQt9C80LXQvdC40LvQuNGB0YwsINGD0LTQsNC70Y/QtdC8INC80LXRgtC60YMg0LjQvdC00LXQutGB0LAg0YHRgtGA0L7QutC4INCz0YDQuNC00LBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn0LTQvtC60YPQvNC10L3RgiDQuNC30LzQtdC90LjQu9GB0Y8nKTtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2VbJ2RvY3NHcmlkJ10gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY2xpY2tlZCA9PSA5OTk5OTk5OSkge1xuICAgICAgICAgICAgLy8g0L3QtSDRg9GB0YLQsNC90L7QstC70LXQvSDQtdGJ0LXQsSDQvtGC0LzQtdGC0LjQvCDQv9C+0YHQu9C10LTQvdC5INCy0YvQsdC+0YBcbiAgICAgICAgICAgIHZhciBsYXN0Q29tcG9uZW50ID0gbG9jYWxTdG9yYWdlWydkb2NzTGlzdCddLFxuICAgICAgICAgICAgICAgIGluZGV4ID0gdGhpcy5nZXRJbmRleEJ5Q29tcG9uZW50KGxhc3RDb21wb25lbnQpO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUxpQ2xpY2soaW5kZXgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhbmRsZUxpQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUxpQ2xpY2soaWR4KSB7XG4gICAgICAgIHZhciBteUFycmF5ID0gdGhpcy5wcm9wcy5zb3VyY2VBcnJheSxcbiAgICAgICAgICAgIGNob29zZW5Eb2NUeXBlID0gdGhpcy5wcm9wcy5zb3VyY2VBcnJheVtpZHhdW1wiaWRcIl0sXG4gICAgICAgICAgICBjaG9vc2VuQ29kZSA9IHRoaXMucHJvcHMuc291cmNlQXJyYXlbaWR4XVtcImtvb2RcIl07XG4gICAgICAgIC8v0YHRgtCw0LLQuNC8INC80LXRgtC60YNcbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INGB0L7RgdGC0L7Rj9C90LjQtVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2xpY2tlZDogaWR4LFxuICAgICAgICAgICAgY2hvb3NlbkRvY1R5cGVJZDogY2hvb3NlbkRvY1R5cGVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8g0YHQvtGF0YDQsNC90LjQvCDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcbiAgICAgICAgZmx1eC5kb0FjdGlvbih0aGlzLnByb3BzLm9uQ2hhbmdlQWN0aW9uLCBjaG9vc2VuQ29kZSk7XG4gICAgfSxcblxuICAgIGhhbmRsZUJ1dHRvbkNsaWNrOiBmdW5jdGlvbiBoYW5kbGVCdXR0b25DbGljaygpIHtcbiAgICAgICAgdmFyIGdyaWRUb29nbGVXaWR0aCA9IGZsdXguc3RvcmVzLmRvY3NTdG9yZS50b29nbGVQYW5lbERhdGE7XG4gICAgICAgIC8vINC/0YDQuCDQutC70LjQutC1INC/0L7QutCw0LfRi9Cy0LDQtdC8INC40LvQuCDRgdC60YDRi9Cy0LDQtdGCINC60L7QvNC/0L7QvdC10L3RglxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGlzQ2hlY2tlZDogIXRoaXMuc3RhdGUuaXNDaGVja2VkXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdyaWRUb29nbGVXaWR0aCA9IHRoaXMuc3RhdGUuaXNDaGVja2VkID8gVE9PR0xFUEFORUxPUEVORUQgOiBUT09HTEVQQU5FTENMT1NFRDtcbiAgICAgICAgZmx1eC5kb0FjdGlvbigndG9vZ2xlUGFuZWxDaGFuZ2UnLCB0aGlzLnN0YXRlLmlzQ2hlY2tlZCwgZ3JpZFRvb2dsZVdpZHRoKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBteUFycmF5ID0gdGhpcy5wcm9wcy5zb3VyY2VBcnJheTtcbiAgICAgICAgdmFyIG15U3R5bGUgPSB0aGlzLnN0YXRlLmlzQ2hlY2tlZCA/ICdub25lJyA6ICdibG9jayc7IC8vINC/0YDRj9GH0LXRgiDRgdC/0LjRgdC+0LpcbiAgICAgICAgdmFyIG15R3JpZFN0eWxlID0gJ2Jsb2NrJztcbiAgICAgICAgdmFyIGNsaWNrZWRJdGVtID0gdGhpcy5zdGF0ZS5jbGlja2VkO1xuXG4gICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdteUxpc3QgcmVuZGVyIHN0YXRlJywgdGhpcy5zdGF0ZSwgdGhpcy5wcm9wcyk7XG5cbiAgICAgICAgaWYgKG15QXJyYXkubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIC8vINC00L7QsdCw0LLQuNC8INC/0YPRgdGC0YPRjiDRgdGC0YDQvtC60YNcbiAgICAgICAgICAgIG15QXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAga29vZDogJydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbXlBcnJheSA9IG15QXJyYXkubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIG15Q2xhc3MgPSAnbGlEb2NMaWJzJztcblxuICAgICAgICAgICAgdmFyIGxpYiA9IGl0ZW07XG5cbiAgICAgICAgICAgIGlmIChjbGlja2VkSXRlbSA9PSBpbmRleCkge1xuICAgICAgICAgICAgICAgIG15Q2xhc3MgPSBteUNsYXNzICsgJyBmb2N1c2VkJzsgLy8g0L/QvtC00YHQstC10YLQuNC8INCy0YvQsdGA0LDQvdC90YPRjiDRgdGC0YDQvtC60YNcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdsaScsIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdsaWItJyArIGluZGV4LFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbXlDbGFzcyxcbiAgICAgICAgICAgICAgICBzdHlsZTogeyBkaXNwbGF5OiBteVN0eWxlIH0sXG4gICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVMaUNsaWNrLmJpbmQodGhpcywgaW5kZXgpXG4gICAgICAgICAgICB9LCBsaWIubmFtZSk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHZhciByb290ID0gUmVhY3QuY3JlYXRlRWxlbWVudCgndWwnLCB7IG9uRXZlbnQ6IHRoaXMub25FdmVudCB9LCBteUFycmF5KTtcbiAgICAgICAgdmFyIGRvY0xpYnNEaXYgPSBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGNsYXNzTmFtZTogJ3RyZWVEb2NzJywgc3R5bGU6IHsgZGlzcGxheTogbXlTdHlsZSB9LCBpZDogJ3RyZWVEb2NzJyB9LCByb290KTtcbiAgICAgICAgdmFyIGJ1dHRvblZhbHVlID0gdGhpcy5zdGF0ZS5pc0NoZWNrZWQgPyAnKycgOiAnLSc7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGlkOiAndHJlZVRvb2xCYXInIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge1xuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB2YWx1ZTogYnV0dG9uVmFsdWUsXG4gICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUJ1dHRvbkNsaWNrXG4gICAgICAgIH0pKSwgZG9jTGlic0Rpdik7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTXlMaXN0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL215bGlzdC5qc1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcclxuXHJcbnZhciBEYXRhR3JpZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnRGF0YUdyaWQnLFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdyaWRDb2x1bW5zOiB0aGlzLnByb3BzLmdyaWRDb2x1bW5zLFxyXG4gICAgICAgICAgICBncmlkRGF0YTogdGhpcy5wcm9wcy5ncmlkRGF0YSxcclxuICAgICAgICAgICAgY2xpY2tlZDogMFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKG5leHRQcm9wcykge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgIGlmIChuZXh0UHJvcHMuZ3JpZERhdGEpIHtcclxuICAgICAgICAgdmFyIGRvY0lkID0gIGxvY2FsU3RvcmFnZVsnZG9jc0dyaWQnXSxcclxuICAgICAgICAgaW5kZXggPSB0aGlzLmdldEdyaWRSb3dJbmRleEJ5SWQoZG9jSWQpO1xyXG5cclxuICAgICAgICAgY29uc29sZS5sb2coJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLCBpbmRleCwgZG9jSWQpO1xyXG4gICAgICAgICB0aGlzLmhhbmRsZUNlbGxDbGljayhpbmRleCk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgKi9cclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuXHJcbiAgICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgIC8vINC40LfQvNC10L3QtdC90LjRjyDQsdGD0LTRg9GCINC+0YLRgNCw0LbQsNGC0YzRgdGPINGC0L7Qu9GM0LrQviDQsiDRgdC70YPRh9Cw0LUg0LXRgdC70Lgg0YLQsNC60LjQtSDQtdGB0YLRjFxyXG4gICAgIHZhciByZXR1cm5WYWx1ZSA9IChKU09OLnN0cmluZ2lmeShuZXh0U3RhdGUpICE9PSBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSApO1xyXG4gICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgICB9LFxyXG4gICAgICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xyXG5cclxuLypcclxuICAgICAgICAgY29uc29sZS5sb2coJ2dyaWQgY29tcG9uZW50RGlkTW91bnQnLGxvY2FsU3RvcmFnZVsnZG9jc0dyaWQnXSApO1xyXG5cclxuICAgICAgICAgLy8g0LjRidC10Lwg0L/QvtGB0LvQtdC00L3RjtGOINGB0YLRgNC+0LrRg1xyXG4gICAgICAgICBpZiAodGhpcy5zdGF0ZS5jbGlja2VkID09IDApIHtcclxuICAgICAgICAgLy8g0L7RgtC80LXRgtC40Lwg0L/QvtGB0LvQtdC00L3QuNC5INC+0YLQvNC10YfQtdC90L3Ri9C5INC00L7QutGD0LzQtdC90YJcclxuICAgICAgICAgdmFyIGRvY0lkID0gIGxvY2FsU3RvcmFnZVsnZG9jc0dyaWQnXSxcclxuICAgICAgICAgaW5kZXggPSB0aGlzLmdldEdyaWRSb3dJbmRleEJ5SWQoZG9jSWQpO1xyXG5cclxuICAgICAgICAgY29uc29sZS5sb2coJ2dyaWQgY29tcG9uZW50RGlkTW91bnQnLGRvY0lkLGluZGV4ICk7XHJcblxyXG4gICAgICAgICB0aGlzLnNldFN0YXRlKHtjbGlja2VkOiBpbmRleH0pO1xyXG4gICAgICAgICB9XHJcbiovXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vINC/0L7QstC10YHQuNC8INC+0LHRgNCw0LHQvtGC0YfQuNC60LhcclxuXHJcblxyXG4gICAgICAgIGZsdXguc3RvcmVzLmRvY3NTdG9yZS5vbignY2hhbmdlOmRhdGEnLCBmdW5jdGlvbiAobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8g0LTQsNC90L3Ri9C1INC40LfQvNC10L3QuNC70LjRgdGMLCDQvNC10L3Rj9C10Lwg0YHQvtGB0YLQvtGP0L3QuNC1XHJcbiAgICAgICAgICAgIC8vINC40YnQtdC8INC/0L7RgdC70LXQtNC90Y7RjiDRgdGC0YDQvtC60YNcclxuICAgICAgICAgICAgLy8g0L7RgtC80LXRgtC40Lwg0L/QvtGB0LvQtdC00L3QuNC5INC+0YLQvNC10YfQtdC90L3Ri9C5INC00L7QutGD0LzQtdC90YJcclxuXHJcbiAvLyAgICAgICAgICAgY29uc29sZS5sb2coJ215IGdyaWQgb24gY2hhbmdlIGxpc3QgJywgbmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpXHJcblxyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IFtdKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZG9jSWQgPSBsb2NhbFN0b3JhZ2VbJ2RvY3NHcmlkJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBzZWxmLmdldEdyaWRSb3dJbmRleEJ5SWQoZG9jSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoe2NsaWNrZWQ6IGluZGV4fSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEdyaWRSb3dJbmRleEJ5SWQ6IGZ1bmN0aW9uIChkb2NJZCkge1xyXG4gICAgICAgIC8vINC40YnQtdC8INC40L3QtNC10YUg0LIg0LzQsNGB0YHQuNCy0LUg0LTQsNC90L3Ri9GFXHJcbiAgICAgICAgdmFyIGluZGV4ID0gMCxcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMucHJvcHMuZ3JpZERhdGE7XHJcbiAgICAgICAgaWYgKGRvY0lkKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAocm93ICYmIGRhdGFbaV1bJ2lkJ10gPT0gZG9jSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVDZWxsQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUNlbGxDbGljayhpZHgpIHtcclxuICAgICAgICAvLyDQvtGC0YDQsNCx0LDRgtGL0LLQsNC10YIg0YHQvtCx0YvRgtC4INC60LvQuNC60LAg0L/QviDRj9GH0LXQudC60LVcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgY2xpY2tlZDogaWR4XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmdyaWREYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGRvY0lkID0gdGhpcy5wcm9wcy5ncmlkRGF0YVtpZHhdLmlkO1xyXG4gLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdteUdyaWQgaGFuZGxlQ2VsbENsaWNrOicsIGlkeCwgZG9jSWQsIHRoaXMucHJvcHMuZ3JpZERhdGEpO1xyXG4gICAgICAgICAgICAvLyDRgdC+0YXRgNCw0L3QuNC8INCyINGF0YDQsNC90LjQu9C40YnQtVxyXG4gICAgICAgICAgICBmbHV4LmRvQWN0aW9uKHRoaXMucHJvcHMub25DaGFuZ2VBY3Rpb24sIGRvY0lkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUNlbGxEYmxDbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vINCy0YvQt9C+0LLQtdGCINC80LXRgtC+0LQg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ0VkaXQnKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlR3JpZEhlYWRlckNsaWNrOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciBzb3J0QnkgPSBbe2NvbHVtbjogbmFtZSwgZGlyZWN0aW9uOiAnYXNjJ31dO1xyXG4gICAgICAgIGZsdXguZG9BY3Rpb24oJ3NvcnRCeUNoYW5nZScsIHNvcnRCeSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZUtleURvd246IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgLy8g0YDQtdCw0LrRhtC40Y8g0L3QsCDQutC70LDQstC40LDRgtGD0YDRg1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdoYW5kbGVLZXlQcmVzcyAnLCBlKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgICBpZiAoa2V5RGlyZWN0aW9uID09ICdEb3duJykge1xyXG4gICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgY2xpY2tlZDogKHRoaXMuc3RhdGUuY2xpY2tlZCArIDEpXHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgICovXHJcblxyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdncmlkIHJlbmRlciBjYWxsZWQnKTtcclxuICAgICAgICB2YXIgZ3JpZFJvd3MgPSB0aGlzLnByb3BzLmdyaWREYXRhOyAvLyDRgdGC0LDRgtC40YfQvdGLINC4INC/0YDQuNGF0L7QtNGP0YIg0YLQvtC70YzQutC+INC40Lcg0LLQtdGA0YXQvdC10LPQviDQutC+0LzQv9C+0L3QtdC90YLQsFxyXG4gICAgICAgIHZhciBncmlkQ29sdW1ucyA9IHRoaXMucHJvcHMuZ3JpZENvbHVtbnM7XHJcbiAgICAgICAgdmFyIGNsaWNrZWRJdGVtID0gdGhpcy5zdGF0ZS5jbGlja2VkO1xyXG5cclxuICAgICAgICB2YXIgY2xhc3NOYW1lID0gJ3RoJyxcclxuICAgICAgICAgICAgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLyogICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleVByZXNzKCdEb3duJyksXHJcbiAgICAgICAgIG9uRG91YmxlQ2xpY2s6IHRoaXMuaGFuZGxlQ2VsbERibENsaWNrKCksXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwge3JlZjogXCJteUdyaWRSZWZcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZENvbHVtbnMubWFwKGZ1bmN0aW9uIChjb2x1bW4sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyaWRTdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGNvbHVtbi53aWR0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ3RoLScgKyBjb2x1bW4uaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGdyaWRTdHlsZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ3RoLScgKyBpbmRleCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVHcmlkSGVhZGVyQ2xpY2suYmluZCh0aGlzLCBjb2x1bW4uaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiLCBudWxsLCBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFJvd3MubWFwKGZ1bmN0aW9uIChyb3csIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXlDbGFzcyA9ICdub3RGb2N1c2VkJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGlja2VkSXRlbSA9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15Q2xhc3MgPSAnZm9jdXNlZCc7IC8vINC/0L7QtNGB0LLQtdGC0LjQvCDQstGL0LHRgNCw0L3QvdGD0Y4g0YHRgtGA0L7QutGDXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDZWxsQ2xpY2suYmluZCh0aGlzLCBpbmRleCksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogbXlDbGFzcywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnZG9jLScgKyBpbmRleH0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkQ29sdW1ucy5tYXAoZnVuY3Rpb24gKGNlbGwsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCB7a2V5OiAndGQnICsgaW5kZXh9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93W2NlbGwuaWRdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFHcmlkO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL2RhdGEtZ3JpZC5qc3hcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5cclxuY29uc3QgQnV0dG9uUmVnaXN0ZXIgPSBmdW5jdGlvbihwcm9wcykgIHtcclxuLy8g0LrQvdC+0L/QutCwINGB0L7Qt9C00LDQvdC40Y8g0LTQvtC60YPQvNC10L3RgtCwINCyINGA0LXQs9C40YHRgtGA0LDRhVxyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwiYnV0dG9uXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImdyaWRUb29sYmFyXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHByb3BzLnZhbHVlLCBcclxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ2xpY2t9KVxyXG59O1xyXG5cclxuQnV0dG9uUmVnaXN0ZXIucHJvcFR5cGVzID0ge1xyXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25SZWdpc3RlcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvY29tcG9uZW50cy9idXR0b24tcmVnaXN0ZXIuanN4XG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpLFxyXG4gICAgTW9kYWxQYWdlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9tb2RhbFBhZ2UuanN4Jyk7XHJcblxyXG5jb25zdCBNb2RhbFBhZ2VEZWxldGUgID0gZnVuY3Rpb24ocHJvcHMpIHtcclxuICAgIGxldCBtb2RhbE9iamVjdHMgPSBbJ2J0bk9rJywgJ2J0bkNhbmNlbCddO1xyXG5cclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge1xyXG4gICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiBwcm9wcy5tb2RhbFBhZ2VCdG5DbGljaywgXHJcbiAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJEZWxldGUgZG9jdW1lbnRcIlxyXG4gICAgfSwgXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHtwYWRkaW5nOjUwfX0sIFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIiDQo9C00LDQu9C40YLRjCDQtNC+0LrRg9C80LXQvdGCID8gXCIpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIClcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFBhZ2VEZWxldGUgO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mcm9udGVuZC9jb21wb25lbnRzL21vZGFsUGFnZURlbGV0ZS5qc3hcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXHJcbiAgICBNb2RhbFBhZ2UgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL21vZGFsUGFnZS5qc3gnKTtcclxuXHJcbmNvbnN0IE1vZGFsUGFnZURlbGV0ZSAgPSBmdW5jdGlvbihwcm9wcykge1xyXG4gICAgbGV0IHN5c3RlbU1lc3NhZ2UgPSBwcm9wcy5zeXN0ZW1NZXNzYWdlID8gcHJvcHMuc3lzdGVtTWVzc2FnZTogJycsXHJcbiAgICAgICAgbW9kYWxPYmplY3RzID0gWydidG5PayddO1xyXG5cclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsUGFnZSwge1xyXG4gICAgICAgIG1vZGFsUGFnZUJ0bkNsaWNrOiBwcm9wcy5tb2RhbFBhZ2VCdG5DbGljaywgXHJcbiAgICAgICAgbW9kYWxQYWdlTmFtZTogXCJXYXJuaW5nIVwiLCBcclxuICAgICAgICBtb2RhbE9iamVjdHM6IG1vZGFsT2JqZWN0c1xyXG5cclxuICAgIH0sIFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB7cGFkZGluZzo1MH19LCBcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCIgXCIsIHN5c3RlbU1lc3NhZ2UsIFwiIFwiKVxyXG4gICAgICAgIClcclxuICAgIClcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbFBhZ2VEZWxldGUgO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZnJvbnRlbmQvY29tcG9uZW50cy9tb2RhbFBhZ2VJbmZvLmpzeFxuICoqIG1vZHVsZSBpZCA9IDQyXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXhpZnknKTtcblxudmFyIGRvY3NTdG9yZSA9IGZsdXguY3JlYXRlU3RvcmUoe1xuICAgIGlkOiAnZG9jc1N0b3JlJyxcbiAgICBpbml0aWFsU3RhdGU6IHtcbiAgICAgICAgZG9jc0dyaWQ6IDAsXG4gICAgICAgIGRvY3NMaXN0OiAnJyxcbiAgICAgICAgbmFtZTogJ3ZsYWQnLFxuICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgc29ydEJ5OiBbeyBjb2x1bW46ICdpZCcsIGRpcmVjdGlvbjogJ2Rlc2MnIH1dLFxuICAgICAgICBzcWxXaGVyZTogJycsXG4gICAgICAgIHRvb2dsZVBhbmVsOiB0cnVlLCAvLyBvcGVuZWRcbiAgICAgICAgdG9vZ2xlUGFuZWxEYXRhOiB7IHRyZWU6ICcxMCUnLCBncmlkOiAnOTAlJywgbGVmdDogJzEzJScgfSwgLy8gb3BlbmVkLFxuICAgICAgICBzeXN0ZW1NZXNzYWdlOiBudWxsXG4gICAgfSxcbiAgICBhY3Rpb25DYWxsYmFja3M6IHtcbiAgICAgICAgc3lzdGVtTWVzc2FnZUNoYW5nZTogZnVuY3Rpb24gc3lzdGVtTWVzc2FnZUNoYW5nZSh1cGRhdGVyLCB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N5c3RlbU1lc3NhZ2VDaGFuZ2UgY2FsbGVkJywgdmFsdWUpO1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBzeXN0ZW1NZXNzYWdlOiB2YWx1ZSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc3FsV2hlcmVDaGFuZ2U6IGZ1bmN0aW9uIHNxbFdoZXJlQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3FsV2hlcmVDaGFuZ2UgY2FsbGVkJywgdmFsdWUpO1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBzcWxXaGVyZTogdmFsdWUgfSk7XG4gICAgICAgICAgICByZXF1ZXJ5KHsgbmFtZTogJ2RvY3NHcmlkJywgdmFsdWU6IHRoaXMuZG9jc0xpc3QgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNvcnRCeUNoYW5nZTogZnVuY3Rpb24gc29ydEJ5Q2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IHNvcnRCeTogdmFsdWUgfSk7XG4gICAgICAgICAgICByZXF1ZXJ5KHsgbmFtZTogJ2RvY3NHcmlkJywgdmFsdWU6IHRoaXMuZG9jc0xpc3QsIHNvcnRCeTogdmFsdWUgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvb2dsZVBhbmVsQ2hhbmdlOiBmdW5jdGlvbiB0b29nbGVQYW5lbENoYW5nZSh1cGRhdGVyLCB2YWx1ZSwgZGF0YSkge1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyB0b29nbGVQYW5lbDogdmFsdWUsIHRvb2dsZVBhbmVsRGF0YTogZGF0YSB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgQWRkOiBmdW5jdGlvbiBBZGQodXBkYXRlcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J1dHRvbiBMaXNhIGNsaWtlZCBuZXchICcgKyB0aGlzLmRvY3NHcmlkKTtcbiAgICAgICAgICAgIGFkZCh0aGlzLmRvY3NMaXN0KTtcbiAgICAgICAgfSxcbiAgICAgICAgRWRpdDogZnVuY3Rpb24gRWRpdCh1cGRhdGVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYnV0dG9uIE11dWRhIGNsaWtlZCEnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRvY3NMaXN0ICYmIHRoaXMuZG9jc0dyaWQpIHtcbiAgICAgICAgICAgICAgICBlZGl0KHRoaXMuZG9jc0xpc3QsIHRoaXMuZG9jc0dyaWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn0KLQuNC/INC00L7QutGD0LzQtdC90YLQsCDQuNC70Lgg0LTQvtC60YPQvNC10L3RgiDQvdC1INCy0YvQsdGA0LDQvScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBEZWxldGU6IGZ1bmN0aW9uIERlbGV0ZSh1cGRhdGVyKSB7XG4gICAgICAgICAgICB2YXIgZG9jVHlwZUlkID0gdGhpcy5kb2NzTGlzdDtcbiAgICAgICAgICAgIHJlcXVlcnlGb3JBY3Rpb24oJ2RlbGV0ZScsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGZsdXguZG9BY3Rpb24oJ3N5c3RlbU1lc3NhZ2VDaGFuZ2UnLCBlcnIpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignc3lzdGVtTWVzc2FnZUNoYW5nZScsIG51bGwpOyAvLyDQv9C40YjQtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiDRhdGA0LDQvdC40LvQuNGJ0LVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlcnkoeyBuYW1lOiAnZG9jc0dyaWQnLCB2YWx1ZTogZG9jVHlwZUlkIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgUHJpbnQ6IGZ1bmN0aW9uIFByaW50KHVwZGF0ZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdidXR0b24gUHJpbnQgY2xpa2VkIScpO1xuICAgICAgICB9LFxuICAgICAgICBjaGFuZ2VOYW1lOiBmdW5jdGlvbiBjaGFuZ2VOYW1lKHVwZGF0ZXIsIG5hbWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBuYW1lOiBuYW1lIH0pO1xuICAgICAgICB9LFxuICAgICAgICBkb2NzR3JpZENoYW5nZTogZnVuY3Rpb24gZG9jc0dyaWRDaGFuZ2UodXBkYXRlciwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyB1cGRhdGVzIGFyZSBvbmx5IG1hZGUgaW5zaWRlIHN0b3JlJ3MgYWN0aW9uIGNhbGxiYWNrc1xuICAgICAgICAgICAgdXBkYXRlci5zZXQoeyBkb2NzR3JpZDogdmFsdWUgfSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VbJ2RvY3NHcmlkJ10gPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZG9jc0xpc3RDaGFuZ2U6IGZ1bmN0aW9uIGRvY3NMaXN0Q2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIHVwZGF0ZXIuc2V0KHsgZG9jc0xpc3Q6IHZhbHVlIH0pO1xuICAgICAgICAgICAgcmVxdWVyeSh7IG5hbWU6ICdkb2NzR3JpZCcsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZVsnZG9jc0xpc3QnXSA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBkYXRhQ2hhbmdlOiBmdW5jdGlvbiBkYXRhQ2hhbmdlKHVwZGF0ZXIsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTdG9yZXMgdXBkYXRlcyBhcmUgb25seSBtYWRlIGluc2lkZSBzdG9yZSdzIGFjdGlvbiBjYWxsYmFja3NcbiAgICAgICAgICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YUNoYW5nZTonLCB2YWx1ZSk7XG4gICAgICAgICAgICB1cGRhdGVyLnNldCh7IGRhdGE6IHZhbHVlIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG59KTtcblxudmFyIGVkaXQgPSBmdW5jdGlvbiBlZGl0KGRvY1R5cGVJZCwgZG9jSWQpIHtcbiAgICB2YXIgdXJsID0gXCIvZG9jdW1lbnQvXCIgKyBkb2NUeXBlSWQgKyBkb2NJZDtcbiAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xufTtcblxudmFyIGFkZCA9IGZ1bmN0aW9uIGFkZChkb2NUeXBlSWQpIHtcbiAgICB2YXIgdXJsID0gXCIvZG9jdW1lbnQvXCIgKyBkb2NUeXBlSWQgKyAnMCc7XG4gICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcbn07XG5cbnZhciByZXF1ZXJ5Rm9yQWN0aW9uID0gZnVuY3Rpb24gcmVxdWVyeUZvckFjdGlvbihhY3Rpb24sIGNhbGxiYWNrKSB7XG5cbiAgICAvLyDQvNC10YLQvtC0INC+0LHQtdGB0L/QtdGH0LjRgiDQt9Cw0L/RgNC+0YEg0L3QsCDQstGL0L/QvtC70L3QtdC90LjQtVxuICAgIHZhciBwYXJhbWV0ZXJzID0ge1xuICAgICAgICBkb2NJZDogZG9jc1N0b3JlLmRvY3NHcmlkLFxuICAgICAgICBkb2NfdHlwZV9pZDogZG9jc1N0b3JlLmRvY3NMaXN0XG4gICAgfTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvZG9jJyxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocGFyYW1ldGVycylcbiAgICAgICAgfSxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKGRhdGEpIHtcbiAgICAgICAgICAgIC8vINC00L7Qu9C20L3RiyDQv9C+0LvRg9GH0LjRgtGMINC+0LHRitC10LrRgiAtINGA0LXQt9GD0LvRjNGC0LDRglxuICAgICAgICAgICAgdmFyIGVycm9yTWVzc3NhZ2UgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGRhdGEucmVzdWx0ID09ICdFcnJvcicpIHtcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NzYWdlID0gJ0Vycm9yLCAnICsgZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3JNZXNzc2FnZSwgZGF0YSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcih4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCcvZXJyb3InLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbnZhciByZXF1ZXJ5ID0gZnVuY3Rpb24gcmVxdWVyeShjb21wb25lbnQpIHtcbiAgICAvLyDQvNC10YLQvtC0INC+0LHQtdGB0L/QtdGH0LjRgiDQv9C+0LvRg9GH0LXQvdC40LUg0LTQsNC90L3Ri9GFINC+0YIg0YHQtdGA0LLQtdGA0LBcbiAgICAvLyBjb21wb25lbnQgPSB0aGlzLnN0YXRlLmNvbXBvbmVudHNbbmFtZV1cbiAgICAvLyDQtdGB0LvQuCDQv9Cw0YDQsNC80LXRgtGA0Ysg0L3QtSDQt9Cw0LTQsNC90YssINCz0YDRg9C30LjQvCDQstGB0LVcblxuICAgIHZhciBjb21wb25lbnRzID0gZG9jc1N0b3JlLmRhdGE7XG5cbiAgICAvLyDRhNC40LvRjNGC0YDRg9C10Lwg0YHQv9C40YHQvtC6INC60L7QvNC/0L7QvdC10L3RgtC+0LJcbiAgICB2YXIgY29tcG9uZW50c0ZvclVwZGF0ZSA9IGNvbXBvbmVudHMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIC8vINC40YnQtdC8INC+0LHRitC10LrRgiDQv9C+INC90LDQuNC80LXQvdC+0LLQsNC90LjRji4g0LjQu9C4INCy0LXRgNC90LXQvCDQstGB0LUg0LXRgdC70Lgg0L/QsNGA0LDQvNC10YLRgCDQvdC1INC30LDQtNCw0L1cbiAgICAgICAgLy8gICAgICAgY29uc29sZS5sb2coJ2NvbXBvbmVudDonICsgSlNPTi5zdHJpbmdpZnkoY29tcG9uZW50KSk7XG4gICAgICAgIGlmIChjb21wb25lbnQubmFtZSA9PSAnJyB8fCBpdGVtLm5hbWUgPT0gY29tcG9uZW50Lm5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWU7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vINGB0L7RgNGC0LjRgNC+0LLQutCwXG4gICAgdmFyIHNxbFNvcnRCeSA9ICcnLFxuICAgICAgICBzcWxXaGVyZSA9IGRvY3NTdG9yZS5zcWxXaGVyZSB8fCAnJztcbiAgICB2YXIgc29ydEJ5QXJyYXkgPSBkb2NzU3RvcmUuc29ydEJ5LFxuICAgICAgICBhcnJUeXBlID0gdHlwZW9mIHNvcnRCeUFycmF5ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihzb3J0QnlBcnJheSk7XG4gICAgaWYgKGRvY3NTdG9yZS5zb3J0QnkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3J0QnlBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgc3FsU29ydEJ5ID0gc3FsU29ydEJ5ICsgJywnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3FsU29ydEJ5ID0gc3FsU29ydEJ5ICsgc29ydEJ5QXJyYXlbaV0uY29sdW1uICsgJyAnICsgc29ydEJ5QXJyYXlbaV0uZGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIFVSTCA9ICcvYXBpL2RvY3MnO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogVVJMLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcblxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBkYXRhVHlwZTogJ2NvbXBvbmVudCcsXG4gICAgICAgICAgICBkb2NUeXBlSWQ6IDEsXG4gICAgICAgICAgICBjb21wb25lbnRzOiBKU09OLnN0cmluZ2lmeShjb21wb25lbnRzRm9yVXBkYXRlKSwgLy8g0LrQvtC80L/QvtC90LXQvdGC0Ysg0LTQu9GPINC+0LHQvdC+0LLQu9C10L3QuNGPXG4gICAgICAgICAgICBwYXJhbWV0ZXI6IGNvbXBvbmVudC52YWx1ZSwgLy8g0L/QsNGA0LDQvNC10YLRgNGLXG4gICAgICAgICAgICBzb3J0Qnk6IHNxbFNvcnRCeSwgLy8g0YHQvtGA0YLQuNGA0L7QstC60LBcbiAgICAgICAgICAgIHNxbFdoZXJlOiBzcWxXaGVyZSB9LFxuICAgICAgICAvLyDQtNC40L3QsNC80LjRh9C10YHQutC40Lkg0YTQuNC70YzRgtGAINCz0YDQuNC00LBcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy8g0LTQvtC70LbQvdGLINC/0L7Qu9GD0YfQuNGC0Ywg0L7QsdGK0LXQutGCXG4gICAgICAgICAgICAvLyAgICAgICAgICAgY29uc29sZS5sb2coJ3BhcmVudCBhcnJpdmVkIGRhdGE6JyArIEpTT04uc3RyaW5naWZ5KGRhdGEpICsgJ9GC0LjQvzonICsgdHlwZW9mIGRhdGEpO1xuXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAvLyBmaW5kIGl0ZW1cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwYXJlbnQgSXRlbTonICsgSlNPTi5zdHJpbmdpZnkoaXRlbSkgKTtcbiAgICAgICAgICAgICAgICAvLyDQvtCx0L3QvtCy0LjQvCDQtNCw0L3QvdGL0LUg0LzQsNGB0YHQuNCy0LAg0LrQvtC80L/QvtC90LXQvdGC0L7QslxuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMgPSBjb21wb25lbnRzLm1hcChmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQubmFtZSA9PSBpdGVtLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuZGF0YSA9IGl0ZW0uZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdG9yZSBkYXRhIHVwZGF0ZTonICsgSlNPTi5zdHJpbmdpZnkoY29tcG9uZW50cykpO1xuICAgICAgICAgICAgZmx1eC5kb0FjdGlvbignZGF0YUNoYW5nZScsIGNvbXBvbmVudHMpO1xuICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignL2Vycm9yJywgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkb2NzU3RvcmU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Zyb250ZW5kL3N0b3Jlcy9kb2NzX3N0b3JlLmpzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6VUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==
'use strict';
// грузим компоненты

const React = require('react'),
    DataGrid = require('./data-grid.jsx'),
    ButtonRegister = require('./button-register.jsx'),
    ModalPage = require('./modalPage.jsx'),
    ModalPageDelete = require('./modalPageDelete.jsx'),
    ModalPageInfo = require('./modalPageInfo.jsx'),
    flux = require('fluxify'),
    DataList = require('./datalist/datalist.jsx'),
    Sidebar = require('./sidebar/sidebar.jsx'),
    Toolbar = require('./toolbar/toolbar.jsx');

let myComponents = [];

if (!typeof window === 'undefined') {
    // берем данные с локального хранилища
    myComponents = JSON.parse(localStorage['docsStore']);
}

// Create a store
var docsStore = require('../stores/docs_store.js');

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

    btnDeleteClick() {
        this.setState({getDeleteModalPage: true})
    },

    btnAddClick() {
        // обработчик события клик кнопки "Добавить"
        // вызовем действия на флаксе
        flux.doAction('Add');
    },

    btnEditClick() {
        // обработчик события клик кнопки "Изменить"
        // вызовем действия на флаксе
        flux.doAction('Edit');
    },

    btnPrintClick() {
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

        return (<div id="parentDiv">

                <div id="docContainer" style={docContainerStyle}>
                    <Toolbar>
                        <div>
                            <ButtonRegister onClick={this.btnAddClick} value=" Add "/>
                            <ButtonRegister onClick={this.btnEditClick} value=" Edit "/>
                            <ButtonRegister onClick={this.btnDeleteClick} value=" Delete "/>
                            <ButtonRegister onClick={this.btnPrintClick} value=" Print "/>
                            <button
                                className="gridToolbar"
                                onClick={this.btnFilterClick}
                            > Filter
                            </button>
                        </div>
                    </Toolbar>

                    <div style={docWrapperStyle}>
                        <Sidebar width="30%" toolbar={true} ref="list-sidebar">
                            <DataList data={myListData}
                                      name="docsList"
                                      bindDataField = "kood"
                                      value={myListValue}
                                      onChangeAction='docsListChange'
                            />
                        </Sidebar>
                        <Sidebar width="100%" toolbar={false} ref="grid-sidebar">
                            <div>
                                <DataGrid
                                    gridData={myGridData}
                                    gridColumns={myGridColums}
                                    onChangeAction='docsGridChange'
                                    url='api'/>
                                {this.state.getFilter ?
                                    (<ModalPage
                                        modalPageBtnClick={this.modalPageBtnClick}
                                        modalPageName='Filter'
                                    > {filterComponent} </ModalPage>)
                                    : null
                                }
                                {
                                    this.state.getDeleteModalPage ?
                                        (<ModalPageDelete
                                            modalPageBtnClick={this.modalPageDelBtnClick}
                                        />) : null
                                }
                                {
                                    this.state.showSystemMessage ?
                                        (<ModalPageInfo
                                            modalPageBtnClick={this.modalPageInfoBtnClick}
                                            systemMessage={systemMessage}
                                        />) : null
                                }
                            </div>
                        </Sidebar>
                    </div>

                    {/*
                     <Sidebar width="100%" toolbar={false}>
                     {this.getGridComponent()}
                     </Sidebar>
                     */}


                </div>
            </div>
        )
    },

    getGridComponent: () => {
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
            <div>
                <div id="gridTable">
                    <DataGrid
                        gridData={myGridData}
                        gridColumns={myGridColums}
                        onChangeAction='docsGridChange'
                        url='api'/>
                </div>
                {this.state.getFilter ?
                    (<ModalPage
                        modalPageBtnClick={this.modalPageBtnClick}
                        modalPageName='Filter'
                    > {filterComponent} </ModalPage>)
                    : null
                }
                {
                    this.state.getDeleteModalPage ?
                        (<ModalPageDelete
                            modalPageBtnClick={this.modalPageDelBtnClick}
                        />) : null
                }
                {
                    this.state.showSystemMessage ?
                        (<ModalPageInfo
                            modalPageBtnClick={this.modalPageInfoBtnClick}
                            systemMessage={systemMessage}
                        />) : null
                }
            </div>
        )
    },

    modalPageBtnClick: function (btnEvent) {
        // обработчик для кнопки фильтрации
        let filterString = '';
        if (btnEvent == 'Ok') {
            // собирем данные в объект и вернем на форму
            this.filterData = this.filterData.map((row) => {
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
            }, this);
            flux.doAction('sqlWhereChange', filterString);
        }
        this.setState({getFilter: false})
    },

    modalPageDelBtnClick(btnEvent) {
        // обработчик вызова модального окна удаления
        this.setState({getDeleteModalPage: false});

        if (btnEvent == 'Ok') {
            // вызовем действия на флаксе
            flux.doAction('Delete');
        }

    },

    modalPageInfoBtnClick() {

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
                gridData.map((row, index) => {
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

                    return <li key={index}>
                        <div className="form-widget">
                            <label className="form-widget-label"><span>{row.name}</span>
                                <input
                                    type={componentType}
                                    className='ui-c2'
                                    title={row.name}
                                    name={row.name}
                                    placeholder={row.name}
                                    ref={row.id}
                                    defaultValue={componentObjektValue || null}
                                />
                            </label>
                        </div>
                    </li>
                })
            filterFields = <div className="fieldset">
                <ul>{filterFields}</ul>
            </div>
        }

        return filterFields;
    }
});

module.exports = Parent;
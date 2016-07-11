'use strict';
// нрузим компоненты

var React = require('react');

const MyTree = require('./mytree'),
    DataGrid = require('./data-grid.jsx'),
    ButtonAdd = require('./buttonadd'),
    ButtonEdit = require('./buttonedit'),
    ButtonDelete = require('./buttondelete'),
    ButtonPrint = require('./buttonprint'),
    InputText = require('../components/doc-input-text.jsx'),
    ModalPage = require('./modalPage.jsx');

var flux = require('fluxify'),
    myComponents = [];

if (!typeof window === 'undefined') {
    // берем данные с локального хранилища
    myComponents = JSON.parse(localStorage['docsStore']);
}

// Create a store
var docsStore = require('../stores/docs_store.js');

// создаем окласс - держатель состояний
var Parent = React.createClass({
    displayName: 'Parent',

    filterData:[], // массив объектов, куда запишем параметры для фильтрации

    getInitialState: function getInitialState() {
        return {
            // у каждого компонента свой объект
            components: this.props.components,
            gridLeft: '13%',
            gridWidth: '90%',
            getFilter: false
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

    },

    componentDidMount: function() {
        // покажем данные
//        console.log('parent componentDidMount state components',this.state.components);

        var lastComponent = localStorage['docsList'];
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
        var components = this.state.components,
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
    render: function render() {
        var  myListValue = '',
            myListData = this.findComponent('docsList') || [],
            myGrid = this.findComponent('docsGrid') || [],
            myGridColums = [],
            myGridData = [],
            tooglePaneelData = flux.stores.docsStore.tooglePanelData,
            gridLeft = '13%';

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

        return (<div id="parentDiv">
                <MyTree 
                    componentName='docsList' 
                    data={myListData} 
                    value={myListValue}
                    onChangeAction= 'docsListChange'/>
                <div id="gridToolBar">Toolbar
                    <ButtonAdd className="gridToolbar"/>
                    <ButtonEdit className="gridToolbar"/>
                    <ButtonDelete className="gridToolbar"/>
                    <ButtonPrint className="gridToolbar"/>
                    <button
                        className="gridToolbar"
                        onClick={this.btnFilterClick}
                    > Filter </button>
                </div>
                <div id="gridTable"
                     style = {{width:tooglePaneelData.grid, left: tooglePaneelData.left}}
                >
                    <DataGrid
                        gridData = {myGridData}
                        gridColumns = {myGridColums}
                        onChangeAction = 'docsGridChange'
                        url = 'api'
                    />
                </div>
                {this.state.getFilter ?
                    (<ModalPage 
                        modalPageBtnClick = {this.modalPageBtnClick}
                        modalPageName = 'Filter'
                        modalObjects = {this.filterData}
                    > {filterComponent} </ModalPage>)
                    : null}

            </div>
            
        )
    },

    modalPageBtnClick: function(btnEvent) {
        var filterString = '';
        if (btnEvent = 'Ok') {
                // собирем данные в объект и вернем на форму
            this.filterData = this.filterData.map((row) => {
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
                }, this);
            flux.doAction( 'sqlWhereChange', filterString );
        }
        this.setState({getFilter: false})
    },

    getFilterFields: function() {
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
                gridData.map((row, index) => {
                    var componentType = 'text',
                        componentObjektValue;

                    for (let i = 0; i < previosFilter.length; i++ ) {
                        // ищем "старое" значение фильтра и если есть, то отдаем его value
                        if (previosFilter[i].refs == row.id) {
                            componentObjektValue = previosFilter[i].value;
                            break;
                        }
                    }

                    console.log('componentObjekt:', componentObjektValue);
                    if (row.type) {
                        componentType = row.type;
                    }

                    // соберем массив объектов
                    this.filterData.push({name:row.name, value: componentObjektValue || null, type:componentType, refs: row.id});

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
                                defaultValue = {componentObjektValue || null}
                            />
                            </label>
                           </div>
                        </li>
            })
            filterFields = <div className="fieldset"><ul>{filterFields}</ul></div>
        }

        return filterFields;
    }
});

module.exports = Parent;
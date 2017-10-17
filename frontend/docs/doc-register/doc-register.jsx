'use strict';
// грузим компоненты

//import PropTypes from 'prop-types';
const PropTypes = require('prop-types');

const React = require('react'),
    flux = require('fluxify'),
    DataGrid = require('./../../components/data-grid/data-grid.jsx'),
    BtnAdd = require('./../../components/button-register/button-register-add/button-register-add.jsx'),
    BtnEdit = require('./../../components/button-register/button-register-edit/button-register-edit.jsx'),
    BtnDelete = require('./../../components/button-register/button-register-delete/button-register-delete.jsx'),
    BtnPrint = require('./../../components/button-register/button-register-print/button-register-print.jsx'),
    BtnFilter = require('./../../components/button-register/button-register-filter/button-register-filter.jsx'),
    ModalPage = require('./../../components/modalpage/modalPage.jsx'),
    ModalPageDelete = require('./../../components/modalpage/modalpage-delete/modalPage-delete.jsx'),
    ModalPageInfo = require('./../../components/modalpage/modalpage-info/modalPage-info.jsx'),
//    DataList = require('./../../components/datalist/datalist.jsx'),
    TreeList = require('./../../components/tree/tree.jsx'),
    Sidebar = require('./../../components/sidebar/sidebar.jsx'),
    MenuToolBar = require('./../../components/menu-toolbar/menu-toolbar.jsx'),
    ToolbarContainer = require('./../../components/toolbar-container/toolbar-container.jsx'),
    styles = require('./doc-register-styles'),
    GridFilter = require('./../../components/data-grid/grid-filter/grid-filter.jsx');


// Create a store
const docsStore = require('./../../stores/docs_store.js');

// создаем класс - держатель состояний
class Register extends React.PureComponent {
    constructor(props) {
        super(props);
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
            filterString: null,
            userData: this.props.userData
        }

    }

    componentDidMount() {
        const self = this;

        // создаем обработчик события на изменение даннх
        docsStore.on('change:data', (newValue, previousValue) => {
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
    }

    render() {

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

        const btnParams = {
            btnStart: {
                show: false
            },
            btnLogin: {
                show: true
            }
        };

        return (<div ref="parentDiv">
                <div>
                    <MenuToolBar edited={false} params={btnParams} userData={this.state.userData}/>
                </div>

                <ToolbarContainer ref='filterToolbarContainer' position="left">
                    <span>Filter: {filterString}</span>
                </ToolbarContainer>
                <div ref="docContainer" style={styles.container}>
                    <ToolbarContainer ref='toolbarContainer'>
                        <div>
                            <BtnAdd onClick={this.btnAddClick} show={toolbarParams['btnAdd'].show}
                                    disable={toolbarParams['btnAdd'].disabled}/>
                            <BtnEdit onClick={this.btnEditClick} show={toolbarParams['btnEdit'].show}
                                     disable={toolbarParams['btnEdit'].disabled}/>
                            <BtnDelete onClick={this.btnDeleteClick} show={toolbarParams['btnDelete'].show}
                                       disable={toolbarParams['btnDelete'].disabled}/>
                            <BtnPrint onClick={this.btnPrintClick} show={toolbarParams['btnPrint'].show}
                                      disable={toolbarParams['btnPrint'].disabled}/>
                            <BtnFilter onClick={this.btnFilterClick}/>
                        </div>
                    </ToolbarContainer>

                    <div style={styles.wrapper}>
                        <Sidebar width="30%" toolbar={true} ref="list-sidebar">
                            <TreeList ref='treeList'
                                      data={dataList}
                                      name="docsList"
                                      bindDataField="kood"
                                      value={listValue}
                                      onClickAction={this.clickHandler}
                                      onChangeAction='docsListChange'
                            />
                        </Sidebar>
                        <Sidebar toolbar={false} ref="grid-sidebar">
                            <DataGrid ref='dataGrid'
                                      gridData={gridData}
                                      gridColumns={gridConfig}
                                      onChangeAction='docsGridChange'
                                      onClick={this.clickHandler}
                                      onDblClick={this.dblClickHandler}
                                      onHeaderClick={this.headerClickHandler}
                                      value={prepairedGridData[0].lastDocId}
                                      url='api'/>
                            <ModalPage ref='modalpageFilter'
                                       modalPageBtnClick={this.modalPageBtnClick}
                                       modalPageName='Filter'
                                       show={this.state.getFilter}>
                                <GridFilter ref='gridFilter' gridConfig={gridConfig} data={filterData}/>
                            </ModalPage>
                            <ModalPageDelete ref="modalpageDelete"
                                             modalPageBtnClick={this.modalPageDelBtnClick}
                                             show={this.state.getDeleteModalPage}/>
                            <ModalPageInfo ref="modalpageInfo"
                                           modalPageBtnClick={this.modalPageInfoBtnClick}
                                           show={this.state.showSystemMessage}
                                           systemMessage={systemMessage}/>
                        </Sidebar>
                    </div>
                </div>
            </div>
        )
    }

    findComponent(componentName) {
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

    }

    btnFilterClick() {
        // откроет модальное окно с полями для фильтрации
        this.setState({getFilter: true})
    }

    btnDeleteClick() {
        this.setState({getDeleteModalPage: true})
    }

    btnAddClick() {
        // обработчик события клик кнопки "Добавить"
        // вызовем действия на флаксе
        flux.doAction('Add');
    }

    btnEditClick() {
        // обработчик события клик кнопки "Изменить"
        // вызовем действия на флаксе
        flux.doAction('Edit');
    }

    btnPrintClick() {
        // обработчик события клик кнопки "Изменить"
        // вызовем действия на флаксе
        flux.doAction('Print');
    }

    clickHandler(action, id) {
        // сохраним в хранилище
        if (action && id) {
            flux.doAction(action, id);
        }
    }

    dblClickHandler() {
        // вызовет метод редактирования
        flux.doAction('Edit');
    }

    headerClickHandler(sortBy) {
        flux.doAction('sortByChange', sortBy);
    }

    modalPageBtnClick(btnEvent) {
        // обработчик для кнопки фильтрации
        let filterString = '';
        if (btnEvent == 'Ok') {
            // собираем данные
            let gridFilter = this.refs['gridFilter'],
                filterData = gridFilter.state.data;

            this.filterData = filterData.map((row) => {
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
    }

    modalPageDelBtnClick(btnEvent) {
        // обработчик вызова модального окна удаления
        this.setState({getDeleteModalPage: false});

        if (btnEvent == 'Ok') {
            // вызовем действия на флаксе
            flux.doAction('Delete');
        }

    }

    modalPageInfoBtnClick() {

        // обработчик вызова модального окна системного сообщения
        this.setState({showSystemMessage: false});
        // вызовем действия на флаксе
        flux.doAction('systemMessageChange', null);

    }

    getFilterFields() {
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
                gridData.map((row, index) => {
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

                })
        }
        // обновим строку фильтрации
        this.getFilterString();
        return this.filterData;
    }

    getFilterString() {
        // преобразует данные филтра в строку
        let string = '';

        this.filterData.map(row => {
            if (row.value) {
                string = string + row.name + ':' + row.value + '; ';
            }
        });
        return string;
    }

    prepareParamsForToolbar() {
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
            dataRow = data.filter(row => {
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

}

/*
 Register.propTypes = {
 components: PropTypes.object.isRequired
 }
 */
module.exports = Register;
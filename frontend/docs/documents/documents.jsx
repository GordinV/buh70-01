'use strict';

const PropTypes = require('prop-types');

const React = require('react'),
    axios = require('axios'),
    flux = require('fluxify');

const
    InputText = require('../../components/input-text/input-text.jsx'),
    TextArea = require('../../components/text-area/text-area.jsx'),
    ToolbarContainer = require('./../../components/toolbar-container/toolbar-container.jsx'),
    DocToolBar = require('./../../components/doc-toolbar/doc-toolbar.jsx'),
    DataGrid = require('./../../components/data-grid/data-grid.jsx'),
    MenuToolBar = require('./../../mixin/menuToolBar.jsx'),
    styles = require('./documents-styles');

// Create a store
const docStore = require('../../stores/doc_store.js');

/**
 * Класс реализует документ справочника признаков.
 */
class Documents extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            documentName: 'No docs',
            value: 0
        };

        this.userData = {
            userLibraryList: props.userLibraryLis,
            userAccessList: props.userAccessList,
            asutus: props.asutus,
            userName: props.userName
        };
        this.gridData = props.initialData.result.data || [];
        this.gridConfig = props.initialData.gridConfig || [];


        /*
                this.handleToolbarEvents = this.handleToolbarEvents.bind(this);
                this.validation = this.validation.bind(this);
                this.handleInputChange = this.handleInputChange.bind(this);
        */
    }

    /**
     * пишем делаем запрос по итогу загрузки
     */

    componentDidMount() {
        if (!this.gridData.length) {
            this.executePostRequest();
        }
    }

    render() {
        const btnParams = {
            btnStart: {
                show: false
            }
        };
        return (
            <div>
                <span>Documents</span>
                {MenuToolBar(btnParams, this.userData)}
                <div style={styles.gridContainer}>

                    <DataGrid ref='dataGrid'
                              style={styles.grid.mainTable}
                              gridData={this.gridData}
                              gridColumns={this.gridConfig}
                              onChangeAction='docsGridChange'
                              onClick={this.clickHandler}
                              onDblClick={this.dblClickHandler}
                              onHeaderClick={this.headerClickHandler}
                              value={this.state.value}
                              url='api'/>
                </div>
            </div>
        );
    }

    executePostRequest() {
        const URL = '/newApi';
        // сортировка
        let sqlSortBy = '',
            sqlWhere = '';

        const params = {
            parameter: 'TUNNUS', // параметры
            sortBy: sqlSortBy, // сортировка
            lastDocId: null,
            sqlWhere: sqlWhere, // динамический фильтр грида
        };

        axios.post(URL, params)
            .then((response) => {
                this.gridData = response.data.result.data;
                this.gridConfig = response.data.gridConfig;
                this.forceUpdate();
            })
            .catch((error) => {
                console.error(error);
            });
    }

}

/*
Tunnused.propTypes = {
};
*/

module.exports = Documents;



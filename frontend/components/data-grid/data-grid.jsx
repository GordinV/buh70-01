'use strict';

const React = require('react'),
    flux = require('fluxify'),
    styles = require('./data-grid-styles'),
    keydown = require('react-keydown'),
    KEYS = [ 38, 40]; // мониторим только стрелки вверх и внизх

const isExists = (object, prop) => {
    let result = false;
    if (prop in object) {
        result = true;
    }
    return result;
}


//@keydown @todo
class DataGrid extends React.PureComponent {
    constructor(props) {
        super(props);
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


    componentDidMount() {
        // надем по по props.value индекс активной строки
        if (this.props.value) {
           let index = this.getGridRowIndexById(this.props.value);
           this.setState({activeRow: index});
        }
   }


    getGridRowIndexById(docId) {
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
    }

    handleCellClick(idx) {
        // отрабатывает событи клика по ячейке
        this.setState({
            activeRow: idx
        });

        if (this.props.gridData.length > 0 && this.props.onChangeAction) {
            let docId = this.props.gridData[idx].id;

            // сохраним в хранилище
            flux.doAction(this.props.onChangeAction, docId);
        }
    }

    handleCellDblClick(idx) {
        // отметим активную строку и вызовен редактирование
        this.handleCellClick(idx)
        // вызовет метод редактирования
        flux.doAction('Edit');
    }

    handleGridHeaderClick(name) {
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
    }

    handleKeyDown(e) {
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
    }

    render() {
        let className = 'th';
        /*
         self = this;
         onKeyDown: this.handleKeyPress('Down'),
         onDoubleClick: this.handleCellDblClick(),
         */

        return (<table ref="dataGridTable">
                <tbody>
                    <tr>
                        {this.prepareTableHeader()}
                    </tr>
                </tbody>
                <tbody>
                    {this.prepareTableRow()}
                </tbody>
            </table>
        );

    } // render

    prepareTableRow() {
        let data = this.props.gridData,
            gridColumns = this.props.gridColumns;

        return data.map((row, rowIndex) => {
            let setRowActive = {},
                objectIndex = 'tr-' + rowIndex,
                activeRow = this.state.activeRow;

            return (<tr
                ref={objectIndex}
                onClick={this.handleCellClick.bind(this, rowIndex)}
                onDoubleClick = {this.handleCellDblClick.bind(this, rowIndex)}
                onKeyDown = {this.handleKeyDown.bind(this)}
                style= {Object.assign({}, styles.tr, activeRow === rowIndex ? styles.focused: {})}
                key={objectIndex}>
                {
                    gridColumns.map((column, columnIndex) => {
                        let cellIndex = 'td-' + rowIndex + '-' + columnIndex;

                        let display = (isExists(column, 'show') ? column.show: true) ? true: false,
                            width = isExists(column, 'width') ? column.width: '100%',
                            style = Object.assign({}, styles.td, !display ? {display: 'none'} : {}, {width: width});
                        return (
                            <td style={style} ref= {cellIndex} key={cellIndex}>
                                {row[column.id]}
                            </td>
                        );
                    })
                }

            </tr>)
        }, this);
    }

    prepareTableHeader() {
        let gridColumns = this.props.gridColumns,
            className = 'th';

        return gridColumns.map((column, index) => {
            let headerIndex = 'th-' + index;

             let display = (isExists(column, 'show') ? column.show: true) ? true: false,
                 width = isExists(column, 'width') ? column.width: '100%',
                 style = Object.assign({}, styles.th, !display ? {display: 'none'} : {}, {width: width}),
                 activeColumn = this.state.activeColumn,
                 iconType = this.state.sort.direction,
                 imageStyleAsc = Object.assign({},styles.image, (activeColumn == column.id && iconType == 'asc' )  ? {}: {display: 'none'}),
                 imageStyleDesc = Object.assign({},styles.image, (activeColumn == column.id && iconType == 'desc' )  ? {}: {display: 'none'})

            // установить видимость
            return <th
                style={style}
                ref={headerIndex}
                key={headerIndex}
                onClick={this.handleGridHeaderClick.bind(this, column.id)}>
                <span>{column.name}</span>
                <image ref="imageAsc" style = {imageStyleAsc} src={styles.icons['asc']}/>
                <image ref="imageDesc" style = {imageStyleDesc} src={styles.icons['desc']}/>
            </th>
        }, this);
    }
}

DataGrid.propTypes = {
    gridColumns: React.PropTypes.array.isRequired,
    gridData: React.PropTypes.array.isRequired,
    onChangeAction: React.PropTypes.string
}


DataGrid.defaultProps = {
    gridColumns: [],
    gridData: []
};

module.exports = DataGrid;

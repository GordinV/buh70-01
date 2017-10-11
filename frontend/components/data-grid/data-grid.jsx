'use strict';

import PropTypes from 'prop-types';

const React = require('react'),
    styles = require('./data-grid-styles'),
    keydown = require('react-keydown'),
    KEYS = [38, 40]; // мониторим только стрелки вверх и внизх

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
        this.prepareTableRow = this.prepareTableRow.bind(this);

    }

    componentDidMount() {
        // надем по по props.value индекс активной строки
        if (this.props.value) {
            let index = this.getGridRowIndexById(this.props.value);
            this.setState({activeRow: index});
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({gridColumns: nextProps.gridColumns, gridData: nextProps.gridData})
    }

/*
    shouldComponentUpdate(nextProps, nextState) {
        // @todo добавить проверку на изменение состояния
        return true;
    }
*/

    render() {
        let className = 'th';
        /*
         self = this;
         onKeyDown: this.handleKeyPress('Down'),
         onDoubleClick: this.handleCellDblClick(),
         */

        return (
            <div style={{height: 'inherit'}}>
                <div style={styles.header}>
                    <table ref="dataGridTable" style={styles.headerTable}>
                        <tbody>
                        <tr>
                            {this.prepareTableHeader()}
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div style={styles.wrapper}>
                    <table style={styles.mainTable}>
                        <tbody>
                        <tr style={{visibility:'collapse'}}>
                            {this.prepareTableHeader(true)}
                        </tr>
                        {this.prepareTableRow()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
            ;

    } // render


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

        let action = this.props.onChangeAction || null;

        if (this.props.gridData.length > 0) {
            let docId = this.props.gridData[idx].id;

            if (this.props.onClick) {
                this.props.onClick(action, docId, idx);
            }

        }

    }

    handleCellDblClick(idx) {
        // отметим активную строку и вызовен обработчик события dblClick
        this.handleCellClick(idx)
        if (this.props.onDblClick) {
            this.props.onDblClick();
        }
    }

    handleGridHeaderClick(name) {
        let sort = this.state.sort;
        if (sort.name === name) {
            sort.direction = sort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            sort = {
                name: name,
                direction: 'asc'
            }
        }

        let sortBy = [{column: sort.name, direction: sort.direction}];

        this.setState({
            activeColumn: name,
            sort: sort
        });

        if (this.props.onHeaderClick) {
            this.props.onHeaderClick(sortBy);
        }

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
                rowIndex = rowIndex < 0 ? 0 : rowIndex;
                break;
        }
        this.setState({
            activeRow: rowIndex
        });
    }

    prepareTableRow() {
        return this.state.gridData.map((row, rowIndex) => {
            let setRowActive = {},
                objectIndex = 'tr-' + rowIndex,
                activeRow = this.state.activeRow;

            let rowObject = (<tr
                ref={objectIndex}
                onClick={this.handleCellClick.bind(this, rowIndex)}
                onDoubleClick={this.handleCellDblClick.bind(this, rowIndex)}
                onKeyDown={this.handleKeyDown.bind(this)}
                style={Object.assign({}, styles.tr, activeRow === rowIndex ? styles.focused : {})}
                key={objectIndex}>
                {
                    this.state.gridColumns.map((column, columnIndex) => {
                        let cellIndex = 'td-' + rowIndex + '-' + columnIndex;

                        let display = (isExists(column, 'show') ? column.show : true) ? true : false,
                            width = isExists(column, 'width') ? column.width : '100%',
                            style = Object.assign({}, styles.td, !display ? {display: 'none'} : {}, {width: width});

                        return (
                            <td style={style} ref={cellIndex} key={cellIndex}>
                                {row[column.id]}
                            </td>
                        );
                    })
                }

            </tr>);
            return rowObject;
        }, this);
    }

    prepareTableHeader(isHidden) {
        let gridColumns = this.props.gridColumns,
            className = 'th';

        return gridColumns.map((column, index) => {
            let headerIndex = 'th-' + index;

            let headerStyle = 'th';
            if (isHidden) {
                headerStyle = 'thHidden';
            }

            let display = (isExists(column, 'show') ? column.show : true) ? true : false,
                width = isExists(column, 'width') ? column.width : '100%',
                style = Object.assign({}, styles[headerStyle], !display ? {display: 'none'} : {}, {width: width}),
                activeColumn = this.state.activeColumn,
                iconType = this.state.sort.direction,
                imageStyleAsc = Object.assign({}, styles.image, (activeColumn == column.id && iconType == 'asc' ) ? {} : {display: 'none'}),
                imageStyleDesc = Object.assign({}, styles.image, (activeColumn == column.id && iconType == 'desc' ) ? {} : {display: 'none'})

            // установить видимость
            return (<th
                style={style}
                ref={headerIndex}
                key={headerIndex}
                onClick={this.handleGridHeaderClick.bind(this, column.id)}>
                <span>{column.name}</span>
                {isHidden ? <image ref="imageAsc" style={imageStyleAsc} src={styles.icons['asc']}/> : null}
                {isHidden ? <image ref="imageDesc" style={imageStyleDesc} src={styles.icons['desc']}/> : null}
            </th>)
        }, this);
    }
}

DataGrid.propTypes = {
    gridColumns: PropTypes.array.isRequired,
    gridData: PropTypes.array.isRequired,
    onChangeAction: PropTypes.string,
    onClick: PropTypes.func,
    onDblClick: PropTypes.func,
    onHeaderClick: PropTypes.func,
    activeRow: PropTypes.number
}


DataGrid.defaultProps = {
    gridColumns: [],
    gridData: []
};

module.exports = DataGrid;

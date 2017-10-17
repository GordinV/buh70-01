'use strict';

const PropTypes = require('prop-types');

const React = require('react'),
    styles = require('./tree-styles.js');

class Tree extends React.PureComponent {
    constructor(props) {
        super(props);

        let idx = 0;

        if (this.props.value) {
            // we got value, we should find index and initilize idx field
            props.data.forEach((row, index) => {
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

    render() {
        return (
            <div ref="tree">
                {this.getTree('0')}
            </div>
        )
    }

    handleLiClick(selectedIndex, selectedId, isNode) {
        if (!isNode && !isNaN(selectedId)) {
            // не ноа, а документ
            let data = this.props.data.filter((row, index) => {
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


    }

    getChildren(parentId) {
        let data = this.state.data;
        return data.filter((row) => {
            if (row.parentid == parentId) {
                return row;
            }
        });
    }

    getTree(parentId) {
        let data = this.getChildren(parentId),
            value = this.state.value;

        return (<ul style={styles.ul} ref='tree-ul'>
            {data.map((subRow, index) => {
                let style = Object.assign({}, styles.li, value == subRow[this.props.bindDataField] && !subRow.is_node ? styles.focused : {}),
                    refId = 'li-' + index;

                return (
                    <li style={style}
                        onClick={this.handleLiClick.bind(this, index, subRow.id, subRow.is_node)}
                        key={refId}
                        ref={refId}>
                        {subRow.name} {this.getTree(subRow.id)}
                    </li>)
            })
            }

        </ul>)
    }

}

Tree.propTypes = {
    value: PropTypes.string,
    data: PropTypes.array,
    bindDataField: PropTypes.string.isRequired
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

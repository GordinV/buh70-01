'use strict';

const React = require('react'),
    styles = require('./grid-filter-styles');


class GridFilter extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            gridConfig: this.props.gridConfig, // grid config
            data: this.props.data // filter data
        };
        this.handleChange = this.handleChange.bind(this)    }

    handleChange(e) {
        let value = e.target.value,
            id = e.target.name,
            data = this.state.data,
            index;

        // надо найти элемент массива с данными для этого компонента
        for(let i = 0; i < data.length; i++ ) {
            if (data[i].refs === id) {
                index = i;
                break;
            }
        }

        if (index) {
            data[index].value = value;
            this.setState({data: data});
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({gridConfig: nextProps.gridConfig, data: nextProps.data});
    }

    render() {
        // создаст из полей грида компоненты для формирования условий фильтрации
        let gridConfig = this.state.gridConfig,
            data = this.state.data;

        return <div style={styles.fieldset}>
            {
                gridConfig.map((row, index) => {
                    let componentType = row.type? row.type: 'text'

                    return <div style={styles.formWidget} key={'fieldSet-' + row.id}>
                        <div style={styles.formWidgetLabel}>
                            <span>{row.name}</span>
                        </div>
                        <div style={styles.formWidgetInput}>
                            <input style={styles.input}
                                   type={componentType}
                                   title={row.name}
                                   name={row.id}
                                   placeholder={row.name}
                                   ref={row.id}
                                   value = {this.state.data[row.id]}
                                   onChange={this.handleChange}
                                   defaultValue={data[row.id]}
                            />
                        </div>
                    </div>
                })
            }
        </div>
    }
}

GridFilter.propTypes = {
    gridConfig: React.PropTypes.array.isRequired,
    data: React.PropTypes.array.isRequired
}

module.exports = GridFilter;

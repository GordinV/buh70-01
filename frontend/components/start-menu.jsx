'use strict';

const PropTypes = require('prop-types');

const React = require('react');

const styles = require('./start-menu.styles'),
    fetchData = require('./../../../libs/fetchData'),
    TreeList = require('./../tree/tree.jsx');

const URL = '/newApi/startMenu';

class StartMenu extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };

        this.treeData = props.data;
        this.clickHandler = this.clickHandler.bind(this);
    }

    /**
     * пишем делаем запрос по итогу загрузки
     */
    componentDidMount() {
        if (!this.treeData.length) {
            //делаем запрос на получение данных
            this.fetchData();
        }
    }

    render() {
        return (
            <div style={styles.container}>
                <TreeList ref='treeList'
                          data={this.treeData}
                          bindDataField="kood"
                          value={this.state.value}
                          onClickAction={this.clickHandler}
                />
            </div>
        );
    }

    clickHandler(action, value) {
        if (this.props.clickHandler) {
            return this.props.clickHandler(value);
        }
    }

    /**
     * Выполнит запросы
     */
    fetchData() {
        try {
            fetchData.fetchDataPost(URL)
                .then(response => {
                    if (response) {
                        this.treeData = response.data.data;
                        this.forceUpdate();
                    }
                })
                .catch(error => console.error('received error-> ', error));

        } catch (e) {
            console.error(e);
        }
    }

}


StartMenu.propTypes = {
    data: PropTypes.array
};

StartMenu.defaultProps = {
    data: []
};


module.exports = StartMenu;
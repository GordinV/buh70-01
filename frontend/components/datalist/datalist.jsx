'use strict';

const React = require('react'),
    flux = require('fluxify'),
    styles = require('./datalist-styles');

class DataList extends React.PureComponent {
    constructor(props) {
        super(props);

        let idx = 0;

        if (props.value) {
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
            clicked: idx,
            value: props.value
        };
    }

    render() {
        let data = this.props.data,
            clickedItem = this.state.clicked;

        return (
            <div ref="datalist">
                <ul ref="datalist-ul">
                    {
                        data.map((item, index) => {
                            let style = {};

                            if (clickedItem == index) {
                                style = Object.assign({}, styles.docList, styles.focused)
                            } else {
                                style = Object.assign({}, styles.docList);
                            }

                            let componentId = 'li-' + index;

                            return (
                                <li key={componentId}
                                    ref={componentId}
                                    onClick={this.handleLiClick.bind(this, index)}
                                    style={style}>
                                    {item.name}
                                </li>)
                        }, this)}
                </ul>
            </div>
        )
    }

    handleLiClick(idx) {
        let value = this.props.data[idx][this.props.bindDataField];
        //ставим метку
        // сохраняем состояние

        this.setState({
            clicked: idx,
            value: value
        });

        // сохраним в хранилище
        let changeAction = this.props.name + 'Change'
        flux.doAction(changeAction, value)
    }

}

DataList.propTypes = {
    value: React.PropTypes.string,
    data: React.PropTypes.array
};

DataList.defaultProps = {
    data: [{
        id: 0,
        name: '',
        kood: ''
    }],
    value: '',
    bindDataField: 'id'
}

module.exports = DataList;
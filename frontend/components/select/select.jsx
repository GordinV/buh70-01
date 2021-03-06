'use strict';

const PropTypes = require('prop-types');

const React = require('react'),
    styles = require('./select-styles');

class Select extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value/* здесь по значению ИД */,
            readOnly: props.readOnly,
            disabled: props.disabled,
            data: props.data,
            fieldValue: props.value /*здесь по значени поля collId */,
            btnDelete: props.btnDelete /* если истину, то рисуем рядом кнопку для очистки значения*/
        };
        this.onChange = this.onChange.bind(this);
        this.btnDelClick = this.btnDelClick.bind(this);

    }

    findFieldValue(data, collId, value) {
        // привяжет к значеню поля
        // надо привязать данные
        data.forEach((row) => {
            if (row[collId] == value) {
                this.setState({value: row[collId], fieldValue: row[collId]});
            }
        }, this);

    }

    getValueById(collId, rowId) {
        // вернет значения поля по выбранному ИД

        let fieldValue,
            data = this.props.data;

        data.forEach((row) => {
            if (row[collId] == rowId) {
                fieldValue = row[collId];
                this.setState({fieldValue: fieldValue});
            }
        }, this);

        return fieldValue;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
            readOnly: nextProps.readOnly, data: nextProps.data
        });
    }

    componentDidMount() {
        if (this.props.collId && this.props.collId !== 'id') {
            // ищем ИД по значению поля
            this.findFieldValue(this.props.data, this.props.collId, this.props.value);
        }
    }

    onChange(e) {
        let fieldValue = e.target.value;

        if (fieldValue == '') {
            fieldValue = null;
        }

        if (this.props.collId) {
            // найдем по ид значение поля в collId
            fieldValue = this.getValueById(this.props.collId, fieldValue);
        }
        // сохраним ид как value
        this.setState({value: e.target.value, fieldValue: fieldValue});

        if (this.props.onChange) {
            // смотрим к чему привязан селект и отдаим его наверх
            this.props.onChange(this.props.name, fieldValue); // в случае если задан обработчик на верхнем уровне, отдадим обработку туда
        }
    }

    render() {
        let dataOptions = this.props.data || [],
            inputReadOnly = this.state.readOnly || false,
            Options = null,
            inputDefaultValue = this.props.defaultValue; // Дадим дефолтное значение для виджета, чтоб покать его сразу, до подгрузки библиотеки

        if (!this.state.value) { // добавим пустую строку в массив
            // проверим наличие пустой строки в массиве

            let emptyObj = dataOptions.filter((obj) => {
                if (obj.id === 0) {
                    return obj;
                }
            });

            if (!emptyObj || emptyObj.length == 0) {
                dataOptions.splice(0, 0, {id: 0, kood: '', name: ''});
            }
        }


        let dataValue = dataOptions.filter((item) => {
            if (item[this.props.collId] === this.state.value) {
                return item;
            }
        }, this);

        if (dataOptions.length) {
            Options = dataOptions.map((item, index) => {
                let key = 'option-' + index;
                return <option value={item[this.props.collId]} key={key} ref={key}> {item.name} </option>
            }, this);
            inputDefaultValue = dataValue.length > 0 ? dataValue[0].name : this.props.defaultValue;
        } else {
            Options = <option value={0} key={Math.random()}> Empty </option>
        }

        let inputStyle = Object.assign({}, styles.input, inputReadOnly ? {} : styles.hide,
            inputReadOnly ? styles.readOnly: {}),
            selectStyle = Object.assign({}, styles.select, inputReadOnly ? styles.hide : {}, inputReadOnly ? styles.readOnly: {}),
            buttonStyle = Object.assign({}, styles.button, this.props.btnDelete ? {} : styles.hide);

        return (
            <div style={styles.wrapper} ref="wrapper">
            <label ref="label" style={styles.label}
                   htmlFor={this.props.name}>{this.props.title}
            </label>

            <input type="text" id={this.props.name}
                   style={inputStyle}
                   ref="input"
                   value={inputDefaultValue}
                   readOnly={true}/>

            <select ref="select"
                    style={selectStyle}
                    value={this.state.value}
                    id={this.props.name}
                    onChange={this.onChange}>{Options}
            </select>
            <button ref="button"
                    style={buttonStyle}
                    onClick={this.btnDelClick}>
                Delete
            </button>
        </div>)
    }

    btnDelClick(event) {
        // по вызову кнопку удалить, обнуляет значение
        this.setState({value: ''});
        this.onChange(event);
    }
}

Select.propTypes = {
    data: PropTypes.array,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    btnDelete: PropTypes.bool,
    libs: PropTypes.string,
    collId: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string
};

Select.defaultProps = {
    readOnly: false,
    disabled: false,
    valid: true,
    btnDelete: false,
    value: 0,
    collId: 'id',
    title: '',
    defaultValue: ''
};

module.exports = Select;

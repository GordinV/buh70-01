// виджет, объединяющий селект и текст. в тексте отражаютмя данные, связанные с селектом
'use strict';

const React = require('react'),
    flux = require('fluxify'),
    Select = require('../doc-input-select.jsx'),
    Text = require('../text-area/text-area.jsx');


class SelectTextWidget extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            description: '', // пойдет в текстовую область
            libData: []
        };
        this.handleSelectOnChange = this.handleSelectOnChange.bind(this);
    }


    handleSelectOnChange(e, name, value) {
        // отработаем событие и поменяем состояние
        if (this.state.libData) {
            let selg = this.getDescriptionBySelectValue(this.state.libData) || null;
            this.setState({value: value, description: selg});
        }
    }

    componentDidMount() {
// создаем обработчик события на изменение библиотек.
    const self = this;
        // будем отслеживать момент когда справочник будет загружен
        flux.stores.docStore.on('change:libs', function (newValue, previousValue) {
            let vastus = JSON.stringify(newValue) !== JSON.stringify(previousValue),  // will watch libs change (from server)
                data = newValue.filter((item) => {
                    if (item.id === self.props.libs) {
                        return item;
                    }
                }),
                lib = data[0].data,
                selg = data[0].data.length ? self.getDescriptionBySelectValue(lib).toString() : '';
            self.setState({libData: lib, description: selg});
        });
    }

    getDescriptionBySelectValue(libData) {
        // найдем в справочнике описание и установим его состояние
        let libRow = libData.filter((lib) => {

                if (lib.id == this.props.value) {
                    return lib;
                }
            }),
            selg = '',
            selgObject = libRow.length ? libRow[0].details : '';

        for (let property in selgObject) {
            if (selgObject.hasOwnProperty(property)) {
                // интересуют только "собственные" свойства объекта
                selg = selg + property + ':' + selgObject[property];
            }
        }
        return selg;
    }

    render() {
        return (
            <div>
                <Select className={this.props.className}
                        ref = "select"
                        title={this.props.title}
                        name={this.props.name}
                        libs={this.props.libs}
                        value={this.props.value}
                        defaultValue={this.props.defaultValue}
                        placeholder={this.props.placeholder}
                        readOnly={this.props.readOnly}
                        onChange={this.handleSelectOnChange}
                />
                <Text ref = "text"
                      name='muud'
                      placeholder='DokProp'
                      value={this.state.description}
                      readOnly={true}
                      disabled={'true'}
                />

            </div>
        );
    }
}

SelectTextWidget.PropTypes = {
    value: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    libs: React.PropTypes.array,
    defaultValue: React.PropTypes.string,
    readOnly: React.PropTypes.bool
}


SelectTextWidget.defaultProps = {
    readOnly: false,
}

module.exports = SelectTextWidget;


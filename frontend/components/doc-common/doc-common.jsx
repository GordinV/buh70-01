
import PropTypes from 'prop-types';

const React = require('react'),
    flux = require('fluxify'),
    InputText = require('./../input-text/input-text.jsx'),
    styles = require('./doc-common-styles');

class DocCommon extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            readOnly: props.readOnly,
            data: this.props.data
        }
    }

    componentWillReceiveProps(nextProps) {
        // при изменении, поменяет состояние (передаст дальше режим редактирования)
        this.setState({readOnly:nextProps.readOnly })
    }

    render() {
/*
        var data = this.props.data,
            bpm = data.bpm || [],
            actualStepData = bpm.filter((step) => {
                // текущий шаг БП
                if (step.actualStep) {
                    return step;
                }
            }),
            executers = actualStepData.map((stepData)=> {
                // найдем исполнителей
                return stepData.actors || {name: 'AUTHOR'};
            });
*/
        let data = this.state.data;

        return (
            <div ref='wrapper' style = {styles.wrapper}>
                            <InputText ref="id"
                                       title='Id'
                                       name='id'
                                       value={data.id}
                                       disabled='true'
                                       width="75%"/>
                            <InputText ref="created"
                                       title='Created'
                                       name='created'
                                       value={data.created}
                                       disabled="true" width="75%"/>
                            <InputText ref="lastupdate"
                                       title='Updated'
                                       name='lastupdate'
                                       value={data.lastupdate}
                                       disabled="true" width="75%"/>
                            <InputText ref="status"
                                       title='Status'
                                       name='status'
                                       value={data.status}
                                       disabled="true"
                                       width="75%"/>
            </div>
        );
    }

    onChangeHandler(inputName, inputValue) {
        // обработчик изменений
        let data = flux.stores.docStore.data;
        data[inputName] = inputValue;
        // задать новое значение поля
        flux.doAction('dataChange', data);
    }
}

DocCommon.PropTypes = {
    readOnly: PropTypes.bool,
    data: PropTypes.object.isRequired
}

DocCommon.defaultProps = {
    readOnly: true
}

module.exports = DocCommon;
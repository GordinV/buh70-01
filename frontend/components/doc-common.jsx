var React = require('react'),
    flux = require('fluxify'),
    InputText = require('../components/doc-input-text.jsx'),
    InputDateTime = require('../components/doc-input-datetime.jsx'),
    DocList = require('../components/doc-input-list.jsx');
//    InputNumber = require('../components/doc-input-number.jsx');

var DocCommon = React.createClass({
    getInitialState: function()
    {
        return {
            readOnly: this.props.readOnly
        }
    },

    componentWillReceiveProps: function(nextProps) {
        // при изменении, поменяет состояние (передаст дальше режим редактирования)
        this.setState({readOnly:nextProps.readOnly })
    },

    render: function () {
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

        return (
            <div className="fieldset">
                <div >
                    <ul>
                        <li style={{display:'-webkit-inline-box'}}>
                            <InputText className='ui-c2 form-widget-toolbar'
                                       title='Id'
                                       name='id'
                                       value={data.id}
                                       disabled='true'
                                       width="75%"/>
                        </li>
                        <li style={{display:'-webkit-inline-box'}}>
                            <InputText className='ui-c2 form-widget-toolbar'
                                       title='Created'
                                       name='created'
                                       value={data.created}
                                       disabled="true" width="75%"/>
                        </li>
                        <li style={{display:'-webkit-inline-box'}}>
                            <InputText className='ui-c2 form-widget-toolbar'
                                       title='Updated'
                                       name='lastupdate'
                                       value={data.lastupdate}
                                       disabled="true" width="75%"/>
                        </li>
                        <li style={{display:'-webkit-inline-box'}}>
                            <InputText className='ui-c2 form-widget-toolbar'
                                       title='Status'
                                       name='status'
                                       value={data.status}
                                       disabled="true"
                                       width="75%"/>
                        </li>
{/*
                        <li style={{display:'-webkit-inline-box'}}>
                            <DocList
                                     title='Исполнители'
                                     name='executors'
                                     data={executers}
                                     readOnly = {this.state.readOnly}
                            />

                        </li>
*/}
                    </ul>
                </div>
            </div>

        );
    }
})

module.exports = DocCommon;
var React = require('react'),
    flux = require('fluxify'),
    InputText = require('../components/doc-input-text.jsx'),
    InputDateTime = require('../components/doc-input-datetime.jsx');
//    InputNumber = require('../components/doc-input-number.jsx');

var DocCommon = React.createClass({
    render: function () {
        var data = this.props.data;

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
                    </ul>
                </div>
            </div>

        );
    }
})

module.exports = DocCommon;
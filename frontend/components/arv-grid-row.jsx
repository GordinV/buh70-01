'use strict';

const React = require('react'),
    flux = require('fluxify'),
    ModalPage = require('./modalpage/modalPage.jsx'),
    Select = require('./doc-input-select.jsx'),
    InputText = require('./doc-input-text.jsx'),
    InputNumber = require('./doc-input-number.jsx');


var ArvGridRow = React.createClass({
    getInitialState: function () {
        return {
            row: this.props.gridRowData, checked: false, warning: ''
        }
    },

    modalPageClick: function (btnEvent) {
        // отработает событие клик
        var components = ['nomid', 'kogus', 'hind', 'kbm', 'kbmta', 'summa'],
            data = [];

        if (btnEvent == 'Ok') {
            // проверка

            // собираем данные для отправки на обработку
            components.map((component) => {
                data.push({name: component, value: this.refs[component].state.value});
            })
        }
        this.props.modalPageClick(btnEvent, data);
    },

    handleChange: function (e, name) {
        // отслеживаем изменения данных на форме
        var value = e.target.value;
        if (value !== this.state.row[name] && name == 'nomid') {
            this.refs['kogus'].setState({value: 0.000});
            this.refs['hind'].setState({value: 0.00});
            this.refs['kbm'].setState({value: 0.00});
            this.refs['kbmta'].setState({value: 0.00});
            this.refs['summa'].setState({value: 0.00});
        }
        this.recalcRowSumm();

    },

    handleInput: function (value, name) {
        // пересчет сумм
        this.recalcRowSumm();

    },

    recalcRowSumm: function () {
        var kogus = Number(this.refs['kogus'].state.value),
            hind = Number(this.refs['hind'].state.value),
            kbmta = kogus * hind,
            kbm = kogus * hind * 0.20, // врменно
            summa = kbmta + kbm;
        this.refs['kbm'].setState({value: kbm});
        this.refs['kbmta'].setState({value: kbmta});
        this.refs['summa'].setState({value: summa});
        this.validateForm();
    },

    validateForm: function () {
        // will check values on the form and return string with warning
        var warning = '';
        // только после проверки формы на валидность
        if (!this.refs['nomid'].state.value) warning = warning + ' код услуги';
        if (!this.refs['kogus'].state.value) warning = warning + ' кол-во';
        if (!this.refs['hind'].state.value) warning = warning + ' цена';

        if (warning.length > 2) {
            // есть проблемы
            warning = 'Отсутсвуют данные:' + warning;
        }
        this.setState({checked: true, warning: warning});
    },
    render: function () {
        // @todo вынести в css
        var style = {
            border: '1px solid black',
            backgroundColor: 'white',
            position: 'relative',
            margin: '10% 30% 10% 30%',
            width: 'auto',
            opacity: '1',
            top: '100px'
        };

        var row = this.state.row,
            validateMessage = this.state.warning,
            buttonOkReadOnly = validateMessage.length > 0 || !this.state.checked;

        /*
         <div style={style}>
         */

        return (
            <div className='.modalPage'>
                <ModalPage
                    modalPageBtnClick={this.modalPageClick}
                    modalPageName='Rea lisamine / parandamine'>
                    <div>
                        <ul>
                            <li>
                                <Select title="Teenus"
                                        name='nomid'
                                        libs="nomenclature"
                                        dok="ARV"
                                        readOnly={false}
                                        value={row.nomid}
                                        defaultValue={row.kood}
                                        ref='nomid'
                                        placeholder='Teenuse kood'
                                        className='ui-c2'
                                        onChange={this.handleChange}/>
                            </li>
                            <li>
                                <InputNumber title='Kogus '
                                             name='kogus'
                                             value={row.kogus}
                                             readOnly={false}
                                             disabled="false"
                                             bindData={false}
                                             ref='kogus'
                                             className='ui-c2'
                                             onBlur={this.handleInput}/>
                            </li>
                            <li>
                                <InputNumber title='Hind '
                                             name='hind'
                                             value={row.hind}
                                             readOnly={false}
                                             disabled="false"
                                             bindData={false} ref='hind'
                                             className='ui-c2'
                                             onBlur={this.handleInput}/>
                            </li>
                            <li>
                                <InputNumber title='Summa kbm-ta: '
                                             name='kbmta'
                                             value={row.kbmta}
                                             disabled="true"
                                             bindData={false}
                                             ref='kbmta'
                                             className='ui-c2'
                                             onChange={this.handleChange}/>
                            </li>
                            <li>
                                <InputNumber title='Käibemaks: '
                                             name='kbm'
                                             value={row.kbm}
                                             disabled="true"
                                             bindData={false}
                                             ref='kbm'
                                             className='ui-c2'
                                             onBlur={this.handleInput}/>
                            </li>
                            <li>
                                <InputNumber title='Summa: '
                                             name='Summa'
                                             value={row.summa}
                                             disabled="true"
                                             bindData={false}
                                             ref='summa'
                                             className='ui-c2'
                                             onBlur={this.handleInput}/>
                            </li>
                        </ul>
                    </div>
                    <div><span>{validateMessage}</span></div>
                </ModalPage>
            </div>
        );
    }

});


/*
 <div>
 {buttonOkReadOnly ?
 <button disabled> Ok </button>:
 <button onClick={this.modalPageClick.bind(this,'Ok')}> Ok </button>
 }
 <button onClick={this.modalPageClick.bind(this,'Cancel')}> Cancel</button>
 </div>
 */


module.exports = ArvGridRow;

/*
 <InputText title='Kood ' name='kood' value={row.kood} readOnly={false}
 disabled="false" ref='kood' ></InputText>
 */

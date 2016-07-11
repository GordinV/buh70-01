var React = require('react'),
    flux = require('fluxify'),
    ModalPage = require('./modalPage.jsx'),
    Select = require('./doc-input-select.jsx'),
    InputText = require('./doc-input-text.jsx'),
    InputNumber = require('./doc-input-number.jsx');


var JournalGridRow = React.createClass({
    getInitialState: function () {
//        console.log('ArvGridRow props', this.props);
        return {
            row: this.props.gridRowData, checked: false, warning:''
        }
    },

    modalPageClick: function (btnEvent) {
        var components = ['deebet', 'kreedit', 'summa', 'valuuta', 'kuurs', 'proj', 'tunnus'],
            data = [];


        if (btnEvent == 'Ok') {
            // проверка
            // собираем данные для отправки на обработку
            components.map((component) => {
                console.log('this.refs[component].state', this.refs[component].state);
                var componentValue = this.refs[component].state.value;
                if (component == 'deebet' || component == 'kreedit' || component == 'proj' || component == 'tunnus') {
                    componentValue = this.refs[component].state.fieldValue;
                }
                data.push({name: component, value: componentValue});
            })
        }
        this.props.modalPageClick(btnEvent, data);
    },

    handleChange: function (e, name) {
        // отслеживаем изменения данных на форме
        var value = e.target.value;
/*
        if (value !== this.state.row[name] && name == 'nomid') {
            this.refs['kogus'].setState({value: 0.000});
            this.refs['hind'].setState({value: 0.00});
            this.refs['kbm'].setState({value: 0.00});
            this.refs['kbmta'].setState({value: 0.00});
            this.refs['summa'].setState({value: 0.00});
        }
*/
        console.log('handleChange', value);
        this.recalcRowSumm();

    },

    handleInput: function (value, name) {
        // пересчет сумм
        this.recalcRowSumm();

    },

    recalcRowSumm: function() {

/*
        var summa = Number(this.refs['summa'].state.value),
            kuurs = Number(this.refs['kuurs'].state.value),
            valsumma = summa * kuurs;
        this.refs['valsumma'].setState({value: valsumma});
*/
 //       console.log('recalcRowSumm');

//        this.validateForm();
    },

    validateForm: function() {
        // will check values on the form and return string with warning
        var warning = '';
        // только после проверки формы на валидность
/*
        if (!this.refs['nomid'].state.value) warning =  warning + ' код услуги';
        if (!this.refs['kogus'].state.value) warning =  warning + ' кол-во';
        if (!this.refs['hind'].state.value) warning =  warning + ' цена';
*/

        if (warning.length > 2 ) {
            // есть проблемы
            warning = 'Отсутсвуют данные:' + warning;
        }
//        console.log('validateForm', warning);
        this.setState({checked: true, warning: warning});
    },
    render: function () {

        var row = this.state.row,
            validateMessage = this.state.warning,
            buttonOkReadOnly = validateMessage.length > 0 || !this.state.checked;

        if (!row.valuuta) {
            row.valuuta = 'EUR';
            row.kuurs = 1;
        }

        buttonOkReadOnly = false; // todo костыль
//        console.log('row render:',validateMessage, buttonOkReadOnly );
/*
        <Select title="Teenus" name='nomid' libs="nomenclature" readOnly={false}
                value={row.nomid} defaultValue={row.kood} ref='nomid' placeholder='Teenuse kood'
                onChange={this.handleChange}/>
*/
        return (
            <div className='modalPage'>
                <ModalPage
                    modalPageBtnClick={this.modalPageClick}
                    modalPageName='Rea lisamine / parandamine'>

                    <div>
                        <ul>
                            <li><Select
                                    title="Deebet:"
                                    name='deebet'
                                    libs="kontod"
                                    readOnly={false}
                                    value={row.deebet}
                                    collId = 'kood'
                                    ref='deebet'
                                    placeholder='Deebet'
                                    onChange={this.handleChange}
                                    className='ui-c2'
                            />
                            </li>
                            <li><Select
                                title="Kreedit:"
                                name='kreedit'
                                libs="kontod"
                                readOnly={false}
                                value={row.kreedit}
                                collId = 'kood'
                                ref='kreedit'
                                placeholder='Kreedit'
                                onChange={this.handleChange}
                                className='ui-c2'
                            /></li>
                            <li><InputNumber
                                title='Summa: '
                                name='summa'
                                value={row.summa}
                                disabled="false"
                                bindData={false}
                                ref='summa'
                                onChange={this.handleChange}
                                className='ui-c2'
                            /></li>

                            <li><InputText
                                title='Valuuta: '
                                name='valuuta'
                                value={row.valuuta}
                                readOnly={false}
                                disabled="false"
                                bindData={false}
                                ref='valuuta'
                                className='ui-c2'
                            /></li>
                            <li><InputNumber
                                title='Kuurs: '
                                name='kuurs'
                                value={row.kuurs}
                                disabled="false"
                                bindData={false}
                                ref='kuurs'
                                onBlur={this.handleInput}
                                className='ui-c2'
                            /></li>
                            <li>
                                <Select
                                title="Projekt:"
                                name='proj'
                                libs="project"
                                readOnly={false}
                                value={row.proj}
                                collId = 'kood'
                                ref='proj'
                                placeholder='Projekt'
                                onChange={this.handleChange}
                                className='ui-c2'
                            />
                            </li>
                            <li><Select
                                title="Tunnus:"
                                name='tunnus'
                                libs="tunnus"
                                readOnly={false}
                                value={row.tunnus}
                                collId = 'kood'
                                ref='tunnus'
                                placeholder='Lausendi tunnus'
                                onChange={this.handleChange}
                                className='ui-c2'
                            />
                            </li>
                            </ul>
                    </div>
                    <div><span>{validateMessage}</span></div>;
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

module.exports = JournalGridRow;

/*

 <InputText title='Kood ' name='kood' value={row.kood} readOnly={false}
 disabled="false" ref='kood' ></Input
 Text>
 */

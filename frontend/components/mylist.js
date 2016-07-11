'use strict';

var React = require('react'),
    flux = require('fluxify');

const TOOGLEPANELOPENED = {tree: '10%', grid: '90%', left:'13%'},
    TOOGLEPANELCLOSED = {tree: '1%', grid: '100%', left:'0'};

var MyList = React.createClass({
    displayName: 'MyList',

    getInitialState: function getInitialState() {
        return {
            sourceArray: this.props.sourceArray,
            isChecked: false,
            clicked: 99999999,
//            clicked: this.getIndexByComponent(this.props.value),
            choosenDocTypeId: this.props.value || ''
        };
    },

    getDefaultProps: function () {
        return {
            clicked: 99999999,
            choosenDocTypeId: ''
        };
    },

    getIndexByComponent: function(component) {
        // вернет индекс компонента по его коду    
        var index = 0,
            componentArray = this.props.sourceArray;

        if (component) {
            for (let i=0; i < componentArray.length; i++) {
                if (componentArray[i]['kood'] ==  component) {
                    index = i;
                    break;
                }
            }
            componentArray.forEach((row) => {
                if (row.kood == 'component') {
                    index = row.id;
                    console.log('getIndexByComponent index',index);
                }
            });
        }
        return index;
    },

    componentWillMount: function() {
        flux.stores.docsStore.on('change:docsList', function(newValue, previousValue) {
            console.log(' flux.stores.docsStore.on(change:docsList)',newValue, previousValue, localStorage['docsGrid']);
            if (newValue !== previousValue && previousValue !== '') {
                // данные изменились, удаляем метку индекса строки грида
                console.log('документ изменился');
                localStorage['docsGrid'] = 0;
            }
        })

    },
    componentDidMount: function() {
        if (this.state.clicked == 99999999 )  {
            // не установлен ещеб отметим последнй выбор
            var lastComponent = localStorage['docsList'],
                index = this.getIndexByComponent(lastComponent);

            this.handleLiClick(index);

        }
    },
    
    handleLiClick: function handleLiClick(idx) {
        var myArray = this.props.sourceArray,
            choosenDocType = this.props.sourceArray[idx]["id"],
            choosenCode = this.props.sourceArray[idx]["kood"];
        //ставим метку
        // сохраняем состояние

        this.setState({
            clicked: idx,
            choosenDocTypeId: choosenDocType
        });

        // сохраним в хранилище
        flux.doAction(this.props.onChangeAction, choosenCode)
    },

    handleButtonClick: function handleButtonClick() {
        var gridToogleWidth = flux.stores.docsStore.tooglePanelData;
        // при клике показываем или скрывает компонент
        this.setState({
            isChecked: !this.state.isChecked
        });

        gridToogleWidth = this.state.isChecked ? TOOGLEPANELOPENED: TOOGLEPANELCLOSED;
        flux.doAction('tooglePanelChange',this.state.isChecked, gridToogleWidth);

    },

    render: function render() {
        var myArray = this.props.sourceArray;
        var myStyle = this.state.isChecked ? 'none' : 'block'; // прячет список
        var myGridStyle = 'block';
        var clickedItem = this.state.clicked;

 //       console.log('myList render state', this.state, this.props);

        if (myArray.length == 0) {
            // добавим пустую строку
            myArray.push({
                id:0,
                name:'',
                kood:''
            })
        }

        myArray = myArray.map(function (item, index) {
            var myClass = 'liDocLibs';

            var lib = item;

            if (clickedItem == index) {
                myClass = myClass + ' focused'; // подсветим выбранную строку
            };

            return React.createElement('li', {
                key: 'lib-' + index,
                className: myClass,
                style: { display: myStyle },
                onClick: this.handleLiClick.bind(this, index)
            }, lib.name);
        }, this);

        var root = React.createElement('ul', {onEvent:this.onEvent}, myArray);
        var docLibsDiv = React.createElement('div', { className: 'treeDocs', style: { display: myStyle }, id: 'treeDocs' }, root);
        var buttonValue = this.state.isChecked ? '+' : '-';
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { id: 'treeToolBar' },
                React.createElement('input', {
                    type: 'button',
                    value: buttonValue,
                    onClick: this.handleButtonClick
                })
            ),
            docLibsDiv
        );
    }
});

module.exports = MyList;
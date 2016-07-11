'use strict';
// нрузим компоненты

//var ReactDOM = require('react-dom');
// создаем окласс - держатель состояний
const Parent = require('../frontend/components/doc-register.jsx');

// данные для хранилища
localStorage['docsStore'] = storeData;
storeData = JSON.parse(storeData);
//console.log('storeData from docs', storeData);
ReactDOM.render(React.createElement(
    Parent,
    { id: 'grid', components: storeData}, 'Тут будут компоненты'
), document.getElementById('grid'));
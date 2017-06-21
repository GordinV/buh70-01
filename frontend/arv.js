
var ReactDOM = require('react-dom');
/*
 React = require('react'),
 flux = require('fluxify'),
 docComponent = '';
 */

// данные для хранилища
localStorage['docStore'] = storeData;
storeData = JSON.parse(storeData);


// запросим компонент документа по его типу
//const Doc = require('../middleware/returnDocComponent')('arv');
const Doc = require('../frontend/docs/arve/arve.jsx');

ReactDOM.render(
    <Doc data={storeData.data} bpm = {storeData.bpm}/>
    , document.getElementById('doc')
);


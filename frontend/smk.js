
const ReactDOM = require('react-dom');

// данные для хранилища
localStorage['docStore'] = storeData;
storeData = JSON.parse(storeData);


// запросим компонент документа по его типу
const Doc = require('../frontend/docs/smk/smk.jsx');

ReactDOM.render(
    <Doc data={storeData.data} bpm = {storeData.bpm}/>
    , document.getElementById('doc')
);


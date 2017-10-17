
const ReactDOM = require('react-dom');

// данные для хранилища
localStorage['docStore'] = storeData;
storeData = JSON.parse(storeData);


// запросим компонент документа по его типу 1
const Doc = require('../frontend/docs/document/document.jsx');

ReactDOM.hydrate(
    <Doc data={storeData.data}/>
    , document.getElementById('doc')
);


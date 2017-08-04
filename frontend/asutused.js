
const ReactDOM = require('react-dom');

// данные для хранилища
localStorage['docStore'] = storeData;
storeData = JSON.parse(storeData);


// запросим компонент документа по его типу
const Doc = require('../frontend/docs/asutused/asutused.jsx');

ReactDOM.render(
    <Doc data={storeData.data}/>
    , document.getElementById('doc')
);


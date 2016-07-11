
var ReactDOM = require('react-dom');
/*
    React = require('react'),
    flux = require('fluxify'),
    docComponent = '';
*/

// данные для хранилища
localStorage['docStore'] = storeData;
storeData = JSON.parse(storeData);

// создаем обработчик события на изменение даннх
/*
docStore.on('change:data', function(newValue, previousValue) {
    if (newValue !== previousValue) {
        // данные изменились, меняем состояние
        self.setState({docData:docStore.data})
    }
})
*/


// запросим компонент документа по его типу
const Doc = require('../middleware/returnDocComponent')(storeData.docTypeId);
console.log('storeData: Doc', Doc);


ReactDOM.render(
    <Doc data={storeData.data} bpm = {storeData.bpm}/>
    , document.getElementById('doc')
);


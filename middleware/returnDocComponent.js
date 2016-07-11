module.exports = function(docTypeId) {
    // взависимости от типа документа вернет компонент документа

    console.log('returnDocComponent:' +docTypeId );
    var component = {};

    switch(docTypeId) {
        case 'ARV':
            component = require('../frontend/docs/arve.jsx');
            break;
        case 'JOURNAL':
            component = require('../frontend/docs/journal.jsx');
            break;
        case 'SORDER':
            component = require('../frontend/docs/sorder.jsx');
            break;
        case 'VORDER':
            component = require('../frontend/docs/vorder.jsx');
            break;
        case 'PALK':
            component = require('../frontend/docs/palk_oper.jsx');
            break;
        default:
            component = require('../frontend/docs/arve.jsx');
    }
    return component;

}

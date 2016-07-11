'use strict';
exports.get = function(req, res, params) {
    var user = require('../middleware/userData')(req),
        React = require('react'),
        ReactServer = require('react-dom/server');
    // check for userid in session
    var parameter = req.params.id,
        docTypePattern = /[0-9]/gi,
        docIdPattern = /[^0-9]/gi,
        docId = parameter.replace(docIdPattern, '').trim(),
        docTypeId = parameter.replace( docTypePattern, '').trim(),
        docComponent = require('../middleware/returnDocComponent')(docTypeId), // вернет компонент по типу тип документа
        results = [] , // {} сюда будем писать результат выборки
        DocDataObject = require('../models/documents'), // погружаем модель
        docInitData = {
            docTypeId: docTypeId,
            data: [],
            bpm:[]
        };
//        localStorage = require('../middleware/local_storage')(req);

//   console.log('doc-api: docTypeId/docid,parameter', docTypeId , docId , parameter );

    // пишем в сессию выбранный документ    
    if (req.session.docs) {
//        console.log('routes documents session docs found', req.session.docs);
        // ищем в сессии наш компонент
        for (let i = 0; i < req.session.docs.length; i++) {
            if (req.session.docs[i]['component'] == docTypeId) {
                // нашли, сохраняем выбор
                req.session.docs[i].docId = docId;
                break;
            }
        }

    }


    //var Doc = React.createFactory(require('../frontend/docs/arve'));
    var Doc = React.createFactory(docComponent),
        now = new Date();

//    console.log('calling for document select: docTypeId' + docTypeId + 'docId:' + docId);

    DocDataObject.selectDoc(docTypeId, [docId], function(err, data, bpm) {
        if (err) next(err);

        docInitData.data = data;
        if (bpm) {
            docInitData.bpm = bpm;
        }

        var html = ReactServer.renderToString(Doc(docInitData));
        // заглушка

        res.render('document', {"user": user, react:html, store: JSON.stringify(docInitData)});

    }, results);
};

if (!Date.prototype.toLocalISOString) {
    (function() {

        function pad(number) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }

        Date.prototype.toLocalISOString = function() {
            return this.getFullYear() +
                '-' + pad(this.getMonth() + 1) +
                '-' + pad(this.getDate()) +
                'T' + pad(this.getHours()) +
                ':' + pad(this.getMinutes()) +
                ':' + pad(this.getSeconds()) ;
//                '.' + (this.getMilliseconds() / 1000).toFixed(3).slice(2, 5) ;
        };

    }());
}

function getDateTime(dt) {
    if (!dt) {
        dt = new Date();
    }

    //dt.getTimezoneOffset();
    return  dt.toLocalISOString();
}


// обработка пост запросов для документа
var co = require('co');

exports.post = function(req, res) {
    var user = require('../middleware/userData')(req),
        React = require('react'),
        ReactServer = require('react-dom/server');

     var data = JSON.parse(req.body.data),
         action = req.body.action,
         DocDataObject = require('../models/documents'), // подключим модель
         docId = data.docId,
         docTypeId = data.doc_type_id,
         results = {},
         localStorage = require('../middleware/local_storage');


    switch(action) {
        case 'save':
            var params = [data, user.userId, 1];
            try {
                // тут вызов метода сохранение
                // выборка сохраненных данных
                DocDataObject.saveDocPromise(docTypeId, params)
                    .then((data) => {
                        res.send(data)
                    }),
                    ((err) => {
                        console.error('viga:', err);
                        res.send({result: 'Error'});
                    });
            } catch (err) {
                console.error('error:', err); // @todo Обработка ошибок
                res.send({result:'Error'});

            }
            break;
        case 'execute':
            /*
            обработка запросов на исполнение задач.
             */
            console.log('execute:', data);
            var params = {params:data, userId: user.userId, rekvId:1}, //@todo из сессии вытащить rekvId
                result,
                docData;

            DocDataObject.executeTaskPromise(docTypeId, params)
                .then(docData => {
                    res.send({result:'Ok', data:docData});
                }),
                (err => {
                    console.error('co catched error', err);
                    res.send({result: 'Error'});
                });

            break;
        case 'select':
            params = [];
            if (data.params.length > 0) {
                params = data.params;
            }

            // ищем данные в кеше
            /*
             localStorage.libs = req.session.libs || []; // отдадим сессию
             var results = localStorage.getLib(docTypeId);
             console.log('данные из кеша:' + JSON.stringify(results));
             if (results) {
             res.send(data[0]);
             }
             */

            DocDataObject.selectDocPromise(docTypeId, params)
                .then((data) => {
                    res.send(data)
                }),
                ((err) => {
                    console.error('viga:', err);
                    res.send({result: 'Error'});
                });
            break;
        case 'saveAndSelect':
            params = [];
            var results = {};
            async.waterfall([
                function(callback) {
                    DocDataObject.saveDoc(docTypeId, params, callback); // сохраняем документ
                },
                function(savedResult, callback) {
                    results = result.rows[0]; // результат сохранения
                    DocDataObject.selectDoc(docTypeId, params, callback); // выборка документов
                },
                function(selectResult, callback) {
                    results.data = selectResult; // результат выборки
                    callback(null, selectResult);
                }
            ],
                function (err, result) {
                    if (err) {
                        console.error ('SQL error');
                        throw err;
                    }
                    res.send(result.rows[0] || {});
                });

            // ищем данные в кеше
/*
            localStorage.libs = req.session.libs || []; // отдадим сессию
            var results = localStorage.getLib(docTypeId);
            console.log('данные из кеша:' + JSON.stringify(results));
            if (results) {
                res.send(data[0]);
            }
*/
 //   if (!results) {
        DocDataObject.selectDoc(docTypeId, params, function(err, data) {
            if (err) {
                console.error('selectDoc error:' + JSON.stringify(err));
                throw err;
            }
            // сохраним данные в кеше
//            localStorage.setLib(docTypeId, data, req);
            res.send(data);
        }, results);
//    }
            break;
    } // case

    function getDocumentData(docTypeId,params ) {
        // Promise around callback
        return new Promise((resolved, reject) => {
            DocDataObject.selectDoc(docTypeId, params, function(err, data) {
                if (err) {
                    console.error('selectDoc error:' + JSON.stringify(err));
                    reject(err);
                } else {
                    resolved(data);
                }
            });
        });
    }

    function executeDocumentTask(docTypeId, params) {
        // Promise around callback
        return new Promise((resolved, reject) => {
            DocDataObject.executeTask(docTypeId, params, function(err, result) {
                if (err) {
                    reject(err);
                }  else {
                    resolved(result);
                }
            });
        })
    }


}; //function post

function returnData(data) {
    data.id = data.id + 1;
    data.summa = data.summa + 10;
    return data;

}


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


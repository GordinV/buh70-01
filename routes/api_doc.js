// обработка пост запросов для документа
'use strict';

exports.post = function(req, res) {
    const React = require('react');

     let user = require('../middleware/userData')(req),
         data = JSON.parse(req.body.data),
         action = req.body.action,
         DocDataObject = require('../models/documents'), // подключим модель
         docId = data.docId,
         docTypeId = data.doc_type_id,
         results = {},
         params = [];

     if (docId) {
/*
         req.session.docs.push(
             {  component:'doc',
                 parameter: docTypeId,
                 sortBy:null,
                 sqlWhere:null,
                 docId: docId,
                 action: action
             });
*/
         let docs = req.session.docs,
             lastInxex = docs.length - 1;

         req.session.docs[lastInxex].docId = docId;

     }

    switch(action) {
        case 'delete':
            params = [user.userId, docId];

            try {
                // тут вызов метода сохранение
                DocDataObject.deleteDocPromise(docTypeId, params)
                    .then(data => {
                        res.send(data)
                    },
                    err => {
                        console.error('viga:', err);
                        res.send({result: 'Error'});
                    });
            } catch (err) {
                console.error('error:', err); // @todo Обработка ошибок
                res.send({result:'Error'});

            }
            break;
        case 'save':
            params = [data, user.userId, user.asutusId];
            try {
                // тут вызов метода сохранение
                // выборка сохраненных данных
                DocDataObject.saveDocPromise(docTypeId, params)
                    .then(data => {
                        res.send(data)
                    },
                    err => {
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
            params = {params:data, userId: user.userId, rekvId:user.asutusId, userName: user.userName};


            DocDataObject.executeTaskPromise(docTypeId, params)
                .then(docData => {
                    res.send({result:'Ok', data:docData});
                },
                err => {
                    console.error('catched error', err);
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
            try {
                DocDataObject.selectDocPromise(docTypeId, params, action)
                    .then(data => {
                        res.send(data)
                    },
                    err => {
                        console.error('viga:', err);
                        res.send({result: 'Error'});
                    });
            } catch(err) {
                console.error('error:', err); // @todo Обработка ошибок
                res.send({result:'Error'});
            }
            break;
        case 'selectAsLibs':
            //@todo Убрать повоторяющийся код
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
            try {

                DocDataObject.selectDocPromise(docTypeId, params, action)
                    .then(data => {
                        res.send(data)
                    },
                    err => {
                        console.error('viga:', err);
                        res.send({result: 'Error'});
                    });
            } catch(err) {
                console.error('error:', err); // @todo Обработка ошибок
                res.send({result:'Error'});
            }
            break;
        case 'saveAndSelect':
            params = [];
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


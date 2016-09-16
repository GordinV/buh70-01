// обработка пост запросов для документа
var co = require('co');

exports.post = function(req, res) {
    console.log('doc post:' + JSON.stringify(req.body));
    var user = require('../middleware/userData')(req),
        React = require('react'),
        ReactServer = require('react-dom/server');

     var data = JSON.parse(req.body.data),
         action = req.body.action,
         DocDataObject = require('../models/documents'), // подключим модель
         docId = data.id,
         docTypeId = data.doc_type_id,
         results = {},
         localStorage = require('../middleware/local_storage');

    console.log('api-doc action:', action, docId, docTypeId, data);


    switch(action) {
        case 'save':
 //           console.log('saving data:' + JSON.stringify(data));
            var params = [data, user.userId, 1];
            try {
                // тут вызов метода сохранение
                // выборка сохраненных данных
                DocDataObject.saveDoc(docTypeId, params, function(err, result) {
                    if (err) {
                        if (err) {
                            console.error ('SQL error');
                            new Error(500,'Päringu viga');
                            res.send({result:'Error'});
                        }
                    }
//                console.log('save result:' + JSON.stringify(result));
                    if (results) {
                        res.send(result.rows[0] || {});
                    }

                });
            } catch (err) {
                console.log('error:', err); // @todo Обработка ошибок
                new Error(500,'Päringu viga');

                res.send({result:'Error'});

            }
            break;
        case 'execute':
            /*
            обработка запросов на исполнение задач.
             */
            console.log('execute:', data);
            var params = {params:data, userId: user.userId, rekvId:1},
                result,
                docData;

            co(function*() {
                // выполнить задачу
                result = yield executeDocumentTask(docTypeId, params);
                // обновить данные документа
                docData = yield getDocumentData(docTypeId,params );
                // вернуть результат
                console.log('ready return results:', docData);
                res.send({result:'Ok', data:docData});
            }).catch(function (err) {
                console.log('co catched error', err);
                res.send({result: 'Error'});
            });
/*
            try {
                DocDataObject.executeTask(docTypeId, params, function(err, result) {
                    if (err) {
                        console.log('Tekkimis viga:', err);
                        res.send({result:'Error'});
                    } else {
                        res.send({result:result});
                    }
                });

            } catch (err) {
                console.log('error:', err);
                new Error(500,'Päringu viga');

                res.send({result:'Error'});

                }


*/
            /*
                        DocDataObject.saveDoc(docTypeId, params, function(err, result) {
                            if (err) {
                                if (err) {
                                    console.error ('SQL error');
                                    throw err;
                                }
                            }
            //                console.log('save result:' + JSON.stringify(result));
                            if (results) {
                                res.send(result.rows[0] || {});
                            }

                        });
            */
            // тут вызов метода сохранение
            // выборка сохраненных данных
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
            //   if (!results) {
 //           console.log('calling select for api: docTypeId' + docTypeId + 'params:' + params);
            DocDataObject.selectDoc(docTypeId, params, function(err, data) {
                if (err) {
                    console.log('selectDoc error:' + JSON.stringify(err));
                    throw err;
                }
//                console.log('results ', data);
                // сохраним данные в кеше
//            localStorage.setLib(docTypeId, data, req);
//                console.log('api_doc data:' + JSON.stringify(data) + ' results:' + JSON.stringify(results));
                res.send(data);
            }, results);
//    }
            break;
        case 'saveAndSelect':
            params = [];
            var results = {};
            async.waterfall([
                function(callback) {
                    console.log('savig');
                    DocDataObject.saveDoc(docTypeId, params, callback); // сохраняем документ
                },
                function(savedResult, callback) {
                    console.log('selecting', savedResult);
                    results = result.rows[0]; // результат сохранения
                    DocDataObject.selectDoc(docTypeId, params, callback); // выборка документов
                },
                function(selectResult, callback) {
                    console.log('Получен ответ', selectResult, results);
                    results.data = selectResult; // результат выборки
                    callback(null, selectResult);
                }
            ],
                function (err, result) {
                    if (err) {
                        console.error ('SQL error');
                        throw err;
                    }
                    console.log('вернули результаты',result);
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
        console.log('calling select for api: docTypeId' + docTypeId + 'params:' + params);
        DocDataObject.selectDoc(docTypeId, params, function(err, data) {
            if (err) {
                console.log('selectDoc error:' + JSON.stringify(err));
                throw err;
            }
            // сохраним данные в кеше
//            localStorage.setLib(docTypeId, data, req);
            console.log('api_doc data:' + JSON.stringify(data) + ' results:' + JSON.stringify(results));
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
                    console.log('selectDoc error:' + JSON.stringify(err));
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


'use strict';

const Doc = {
    tasks: [], // задачи
    connectDb: function () {
        var pg = require('pg'),
            config = require('../config/config'),
            db = new pg.Client(config.pg.connection);
        return db;

    },

    executeSqlQueryPromise: (sqlString, sqlParams) => {
        // обертка над колбеком
        return new Promise((resolved, rejected) => {
            var pg = require('pg'),
                config = require('../config/config'),
                db = new pg.Client(config.pg.connection);
            try {
                db.connect((err) => {
                    if (err) {
                        console.error('could not connect to postgres', err);
                        rejected(err);
                    }

                    db.query(sqlString, sqlParams, ((err, result) => {
                        if (err) {
                            console.error('sql error:',(err));
                            rejected(err);
                        };
                        db.end();
                        resolved(result.rows);
                    }));
                });
            } catch (err) {
                console.error('sql error:',(err));
                rejected(err);
            }
        })
    },

    executeSqlQueriesPromise: (sqls, params, returnData) => {
        // обертка над executeSqlQueries
        // выполнит запрос, вернет callback и данные
        // sqls массив запрсов, структура [{sql:'', sqlAsNew:'', alias: 'row'}]
        return new Promise((resolved, rejected) => {
            var pg = require('pg'),
                config = require('../config/config'),
                db = new pg.Client(config.pg.connection);

            var    dataRow,
                sqlAsNew,
                sqlParameter,
                sqlCount = sqls.length;

            for (var i = 0; i < sqlCount; i++) {
                dataRow = sqls[i];
                sqlAsNew = dataRow.sqlAsNew || null;
                sqlParameter = params[0] == 0 && sqlAsNew !== null ? sqlAsNew : dataRow.sql;

                dataRow.query = db.query(sqlParameter, params); // ставим в очередь

                dataRow.query.on('row', (row, result)=> {
                    result.addRow(row);
                });
            }

            db.on('error', (err)=> {
                console.error('db error:' ,err);
                rejected(new Error(err));
            });

            db.on('drain', () => {
                db.end();

                var dataObj = {};

                sqls.forEach((row) => {
                    var myRow = row.query._result.rows, // массив результатов
                        myData = row.multiple ? myRow : myRow[0];
                    returnData[row.alias] = myData;
                });
                resolved(returnData);
            });

            db.connect();
        });
    },

    executeSqlQuery: function (sqlString, sqlParams, callback) {
        // выполнит запрос, вернет callback и данные
        var db = this.connectDb();

        db.connect(function (err) {
            if (err) {
                console.error('could not connect to postgres', err);
                callback(err, null);
            }

            db.query(sqlString, sqlParams, function (err, result) {
                if (err) {
                    console.error('sql error:',err);
                }
                db.end();
//               console.log('result:' + JSON.stringify(result));
                callback(err, result);
            });
        });
    },
    
    executeSqlQueries: function (sqls, params, returnData, callback) {
        // выполнит запрос, вернет callback и данные

        let db = this.connectDb(),
            dataRow,
            sqlAsNew,
            sqlParameter = [],
            sqlCount = sqls.length;

        for (let i = 0; i < sqlCount; i++) {
            dataRow = sqls[i];
            sqlAsNew = dataRow.sqlAsNew || null;

            sqlParameter = dataRow.sql;
            if (params && params[0] == 0 && sqlAsNew) {
                // взависимости от параметра идет запрос на новый док или уже существующий
                sqlParameter = sqlAsNew;
            }

            dataRow.query = db.query(sqlParameter, params); // ставим в очередь

            dataRow.query.on('row', (row, result)=> {
                result.addRow(row);
            });
        }

        db.on('error', (err)=> {
            console.error('db error:',err);
            callback(err, []);
        });

        db.on('drain', ()=> {
            db.end;
            let dataObj = {};

            sqls.forEach((row) => {

                let resultRow = row.query._result.rows, // массив результатов
                    data = row.multiple ? resultRow : resultRow[0];
                returnData[row.alias] = data;
            });
            callback(null, returnData);
        });

        try {
            db.connect(); // выполнить запрос
        } catch(err) {
            console.error('SQL execution error:', err);
        }

    },

    selectDoc: function (docTypeId, params, callback) {
        // вернет данные модели

        let doc = require('./' + docTypeId),
            sql = doc.select,
            docBpm = [], // БП документа
            returnData = doc.returnData;

        if  (doc.bpm) {
            docBpm = doc.bpm;
        }

        // выполним запрос
        if (typeof sql == 'object') {

                Doc.executeSqlQueries(sql, params, returnData, (err, data) => {

                    if (err) {
                        console.error(err);
                    }
//                    console.log('Doc.executeSqlQueries', data, docBpm);
                    callback(err, data, docBpm);
                });
        } else {

            Doc.executeSqlQuery(sql, params,  (err, data)=> {
                callback(err, data.rows, docBpm);
            });
        }
    },

    selectDocPromise: (docTypeId, params) => {
        // обертка в промис функции selectDoc
        const doc = require('../models/' + docTypeId),
            sql = doc.select;

        var docBpm = [], // БП документа
            returnData = doc.returnData;

        if  (doc.bpm) {
            docBpm = doc.bpm;
        }

        // выполним запрос
        if (typeof sql === 'object') {
            return Doc.executeSqlQueriesPromise(sql, params, returnData);
        } else {
            return Doc.executeSqlQueryPromise(sql, params, returnData);
        }
    },

    saveDoc: function (docTypeId, params, callback) {
        // вызов метода сохранения документа
        var doc = require('./' + docTypeId),
            sql = doc.saveDoc;
        
        Doc.executeSqlQuery(sql, params, callback);

    },

    saveDocPromise: (docTypeId, params)=> {
        // промисификация для функции saveDoc

        let doc = require('./' + docTypeId),
            sql = doc.saveDoc,
            docStatus = params[0].data['doc_status'] || 0,
            docBpm =  params[0].data['bpm'];

/*
        if (!docStatus && docBpm.length == 0) {
            // if doc has status = 0 and no bpm then we will add empty bpm to the doc
            doc.bpm[0].status = 'opened';
            params[0].data.bpm = doc.bpm;
        }
*/

        return Doc.executeSqlQueryPromise(sql, params);
    },

    executeTask: function(docTypeId, params, callback) {
        // запустит переданные методы в моделе
        var doc = require('./' + docTypeId),
            tasks = params.params.tasks,
            docId = params.params.docId,
            userId = params.userId;
        
        doc.executeTask(tasks, docId, userId, callback);
//        callback(null,'Ok');
    },

    executeAutomateTask: function(docTypeId, params) {
 //       console.log('executeAutomateTask', docTypeId, params);
        let doc = require('./' + docTypeId),
            tasks = params.params.tasks,
            docId = params.params.docId,
            userId = params.userId,
            bpm = doc.bpm,            // 1. получаем список задач (массив)
            chain = Promise.resolve(),
            results = [];

        tasks = tasks.filter((task)=> {
//            console.log('executeTaskPromise:', task);
//                if (task == '') {
            // задача не должна быть выполненой, и до первой "ручной" задачи
            return task;
            //               }

        }) // оставим только "актуальные" задачи

        // 2. формруем из него массив вызовов функций


        tasks = bpm.map((task)=> {
            return task.action;
        });

//        console.log('documents executeTaskPromise', tasks);

// в цикле добавляем задачи в цепочку
        tasks.forEach((task)=> {
            chain = chain
                .then(() => {
 //                   console.log('then task', task);
                    return executePromise(task);
                })
                .then((result) => {
 //                   console.log('then resuts:', results);
                    results.push(result);
                });
        });

        // 3. п последовательно вызываем цкпочку

        let executePromise = ((task) => {
//            console.log('task:', task, docId, userId);
            return eval('doc.executeTask([task],docId, userId)');
        })

        // в конце — выводим результаты
        chain.then(() => {
//            console.log('results:', results);
            return results;
        });

//        return doc.executeTask(tasks, docId, userId);
//        callback(null,'Ok');

    },

    executeTaskPromise: function(docTypeId, params) {
        // обертка над методом executeTask

//        console.log('executeTaskPromise 1', docTypeId, params);
        let doc = require('./' + docTypeId),
            tasks = params.params.tasks,
            docId = params.params.docId,
            userId = params.userId;

//            console.log('task:', tasks, docId, userId);

        return doc.executeTask(tasks, docId, userId);
    },

    config: function () {
        var config = require('./docs_grid_config.js');
        return config;
    },
    // грид документов
    docsGrid: {
        getGridQuery: function (docType) {
            var config = require('./docs_grid_config.js');
            return config[docType].sqlString;
        },
        getGridConfiguration: function (docType) {
            var config = require('./docs_grid_config.js');
            return config[docType].gridConfiguration;
        },
        getGridParams: function (docType) {
            var config = require('./docs_grid_config.js');
            return config[docType].params;
        },

        requery: function (docTypeId, callback, results, sortBy, dynamicWhere, user) {
            // возвращаем данные для заданного типа
            var returnData = [],
                docs = this.docs,
                configuration = null,
                gridConfig = null,
                sqlSelect = '',
                sqlSortBy = (!!sortBy) ? ' order by ' + sortBy: '',
                sqlWhere = (!!dynamicWhere) ? dynamicWhere: '',
                sqlParams = '',
                data = [];

            if (!docTypeId || docTypeId == 0) {
                // выборка из документов
                docTypeId = 'DOK'
            }


            //       if (docTypeId == 'DOK' || docTypeId == 'ARV' || docTypeId == 'PALK' || docTypeId == 'TAABEL' || docTypeId == 'PVKAART' || docTypeId == 'PVOPER' ) {

            gridConfig = this.getGridConfiguration(docTypeId);
            sqlSelect = 'select * from (' + this.getGridQuery(docTypeId) + ') as qry ' + sqlWhere + sqlSortBy;
            //sqlParams = this.getGridParams(docTypeId);
            sqlParams = [user.asutusId, user.userId];

            Doc.executeSqlQuery(sqlSelect, sqlParams, function (err, data) {

                if (err) {
                    console.error('sqlError sqlSelect sqlParams', err, sqlSelect, sqlParams);
                    callback(err, null);
                } else {
                    results.docsGrid = {
                        data: [{
                            id: docTypeId,
                            columns: gridConfig,
                            data: data.rows
                        }]
                    }
//                    console.log('data:', data);
                    callback(err, data.rows);

                }
            });
            //       }
        },

    }, // объект docsGrid
    docsList: {
        sqlString: 'select l.id, trim(l.nimetus)::text as name, ltrim(rtrim(kood))::text as kood from libs.library l where ($1 = 0 or l.rekvid = $1) and l.library = $2 order by l.kood;',
        params: [1, 'DOK'],
        data: [],
        requery: function (parameter, callback, results) {
            Doc.executeSqlQuery(this.sqlString, this.params, function (err, data) {
                if (err) {
                    console.error('sql error:', err);
                    results.docsList = {
                        data: []
                    }
                }
                results.docsList = {
                    data: data.rows
                }
                callback(err, data.rows);

            });
        },

        docs: [{id: 1, name: 'Arved'}, {id: 2, name: 'Palk'}]
    }  // объект docsList

};

module.exports = Doc;
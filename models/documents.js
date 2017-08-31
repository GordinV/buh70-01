'use strict';

const getRekvIdFromSession = () => {
    return global.rekvId; //@todo доделать, убрать из глобальной видимости
}

const getModule = require('./../libs/getModule');


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
            db.connect((err) => {
                if (err) {
                    console.error('could not connect to postgres', err);
                    return rejected(err);
                }
                try {

                    db.query(sqlString, sqlParams, ((err, result) => {
                        if (err) {
                            console.error('sql error:', (err));
                            return rejected(err);
                        }

                        db.end();

                        let results = result ? result.rows : [];
                        resolved(results);
                    }));
                } catch (err) {
                    console.error('sql error:', (err));
                    return rejected(err);
                }

            });
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

            var dataRow,
                sqlAsNew,
                sqlParameter,
                sqlCount = sqls.length;

            for (var i = 0; i < sqlCount; i++) {
                dataRow = sqls[i];
                sqlAsNew = dataRow.sqlAsNew || null;
                sqlParameter = params[0] == 0 && sqlAsNew !== null ? sqlAsNew : dataRow.sql;

                dataRow.query = db.query(sqlParameter, params); // ставим в очередь

                dataRow.query.on('row', (row, result) => {
                    result.addRow(row);
                });
            }

            db.on('error', (err) => {
                console.error('db error:', err);
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

        db.connect(err => {
            if (err) {
                console.error('could not connect to postgres', err);
                return callback(err, null);
            }
        });

        try {
            db.query(sqlString, sqlParams, (err, result) => {
                if (err) {
                    console.error('sql error:', err);
                    return callback(err, null);
                }
                db.end();
                return callback(err, result);
            });
        } catch (err) {
            console.error(err);
            return callback(err);
        }

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
            try {
                dataRow.query = db.query(sqlParameter, params); // ставим в очередь
            } catch (err) {
                console.error('catched db error:', err);
                return callback(err, []);

            }

            dataRow.query.on('row', (row, result) => {
                result.addRow(row);
            });
        }

        db.on('error', (err) => {
            console.error('db error:', err);
            return callback(err, []);
        });

        db.on('drain', () => {
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
        } catch (err) {
            console.error('SQL execution error:', err);
            return callback(err);
        }

    },

    selectDoc: function (docTypeId, params, callback) {
        // вернет данные модели

        let doc = getModule(docTypeId, null, __dirname),
            sql = doc.select,
            docBpm = [], // БП документа
            returnData = doc.returnData;

        if (doc.bpm) {
            docBpm = doc.bpm;
        }

        // выполним запрос
        if (typeof sql == 'object') {
            try {
                Doc.executeSqlQueries(sql, params, returnData, (err, data) => {

                    if (err) {
                        console.error('got error', err);
                        return callback(err, null);
                    }
                    callback(err, data, docBpm);
                });

            } catch (err) {
                console.error('catched error', err);
                return callback(err);

            }
        } else {
            try {
                Doc.executeSqlQuery(sql, params, (err, data) => {
                    if (err) {
                        return callback(err);
                    }
                    callback(err, data.rows, docBpm);
                });

            } catch (err) {
                console.error('error catched', err);
                return callback(err);
            }
        }
    },

    selectDocPromise: (docTypeId, params, sqlSelect) => {
        // обертка в промис функции selectDoc
        console.log('selectDocPromise',docTypeId, __dirname );
        let doc = getModule(docTypeId, null, __dirname);

        let sql;
        if (sqlSelect) {
            sql = doc[sqlSelect];
        } else {
            sql = doc['select'];
        }

        let docBpm = [], // БП документа
            returnData = doc.returnData;

        if (doc.bpm) {
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

        let doc = getModule(docTypeId, null, __dirname);

        let sql = doc.saveDoc;

        try {
            Doc.executeSqlQuery(sql, params, callback);
        } catch (err) {
            console.error('error', err);
            return callback(err, null);

        }

    },

    saveDocPromise: (docTypeId, params) => {

        let doc = getModule(docTypeId, null, __dirname);

        // промисификация для функции saveDoc
        let sql = doc.saveDoc
        console.log('saveDocPromise', sql);
        return Doc.executeSqlQueryPromise(sql, params);
    },

    deleteDoc: function (docTypeId, params, callback) {
        // вызов метода удаления документа

        let doc = getModule(docTypeId, null, __dirname);

        let sql = doc.deleteDoc;

        try {
            Doc.executeSqlQuery(sql, params, callback);
        } catch (err) {
            console.error('error', err);
            return callback(err, null);

        }

    },

    deleteDocPromise: (docTypeId, params) => {

        let doc = getModule(docTypeId, null, __dirname);

        // промисификация для функции deleteDoc
        let sql = doc.deleteDoc

        return Doc.executeSqlQueryPromise(sql, params);
    },

    executeTask: function (docTypeId, params, callback) {
        // запустит переданные методы в моделе
        let doc = getModule(docTypeId, null, __dirname);

        let tasks = params.params.tasks,
            docId = params.params.docId,
            userId = params.userId;

        doc.executeTask(tasks, docId, userId, callback);
//        callback(null,'Ok');
    },

    executeAutomateTask: function (docTypeId, params) {
        let doc = getModule(docTypeId, null, __dirname);

        let tasks = params.params.tasks,
            docId = params.params.docId,
            userId = params.userId,
            bpm = doc.bpm,            // 1. получаем список задач (массив)
            chain = Promise.resolve(),
            results = [];

        tasks = tasks.filter((task) => {
//                if (task == '') {
            // задача не должна быть выполненой, и до первой "ручной" задачи
            return task;
            //               }

        }) // оставим только "актуальные" задачи

        // 2. формруем из него массив вызовов функций


        tasks = bpm.map((task) => {
            return task.action;
        });


// в цикле добавляем задачи в цепочку
        tasks.forEach((task) => {
            chain = chain
                .then(() => {
                    return executePromise(task);
                })
                .then((result) => {
                    results.push(result);
                });
        });

        // 3. п последовательно вызываем цкпочку

        let executePromise = ((task) => {
            return eval('doc.executeTask([task],docId, userId)');
        })

        // в конце — выводим результаты
        chain.then(() => {
            return results;
        });

    },

    executeTaskPromise: function (docTypeId, params) {
        // обертка над методом executeTask

        let doc = getModule(docTypeId, null,__dirname);

        let tasks = params.params.tasks,
            docId = params.params.docId,
            userId = params.userId;

        return doc.executeTask(tasks, docId, userId);
    },

    config: function () {
        let config = require('./docs_grid_config.js');
        return config;
    },
    // грид документов
    docsGrid: {
        getGridQuery: function (docType) {
            let config = getModule(docType, null,__dirname);
            return config['grid'].sqlString
        },
        getGridConfiguration: function (docType) {
            let config = getModule(docType,null,__dirname);
            return config['grid'].gridConfiguration;
        },
        getGridParams: function (docType) {
            var config = require('./docs_grid_config.js');
            return config[docType].params;
        },

        requery: function (docTypeId, callback, results, sortBy, dynamicWhere, user) {
            // возвращаем данные для заданного типа
            let returnData = [],
                docs = this.docs,
                configuration = null,
                gridConfig = null,
                sqlSelect = '',
                sqlSortBy = ' order by ' + (!sortBy ? ' id desc ' : sortBy),
                sqlWhere = (!!dynamicWhere) ? dynamicWhere : '',
                sqlParams = '',
                data = [];

            if (!docTypeId || docTypeId == 0) {
                // выборка из документов
                docTypeId = 'DOK'
            }
            gridConfig = this.getGridConfiguration(docTypeId);
            sqlSelect = 'select * from (' + this.getGridQuery(docTypeId) + ') as qry ' + sqlWhere + sqlSortBy;
            //sqlParams = this.getGridParams(docTypeId);
            sqlParams = [user.asutusId, user.userId];

            Doc.executeSqlQuery(sqlSelect, sqlParams, (err, data) => {

                if (err) {
                    console.error('grid, sqlError sqlSelect sqlParams', err, sqlSelect, sqlParams);
                    return callback(err, null);
                }

                results.docsGrid = {
                    data: [{
                        id: docTypeId,
                        columns: gridConfig,
                        data: data.rows
                    }]
                }
                callback(err, data.rows);

            });
        },

    }, // объект docsGrid
    docsList: {
        sqlString: `select module::text as id, '0' as parentId, trim(both '"' from module::text) as kood, trim(both '"' from module::text) as name, null::text as props, true as is_node
                        from (select distinct  jsonb_array_elements((properties::jsonb -> 'module')) as module
                                from libs.library l 
                                where ($1 = 0 or l.rekvid = $1) 
                                and l.library = $2) modules
                    union all            
                    select l.id::text , modules.module::text as parentId, ltrim(rtrim(kood))::text as kood, trim(l.nimetus)::text as name, 
                        properties::text as props, false as is_node
                        from libs.library l 
                        left outer join (select distinct  jsonb_array_elements((properties::jsonb -> 'module')) as module
                                from libs.library l 
                                where ($1 = 0 or l.rekvid = $1) 
                                and l.library = $2
                                ) modules on (properties::jsonb -> 'module')::jsonb @> modules.module
                        where ($1 = 0 or l.rekvid = $1) and l.library = $2`,
        params: [getRekvIdFromSession(), 'DOK'],
        data: [],
        requery: function (parameter, callback, results) {
            let sql = this.sqlString,
                params = this.params;

            Doc.executeSqlQuery(this.sqlString, this.params, function (err, data) {
                if (err) {
                    console.error('docsList, sql error:', err, sql, params);
                    results.docsList = {
                        data: []
                    }
                    return callback(err);
                }
                results.docsList = {
                    data: data.rows
                }

                // will register all documents
                data.rows.forEach(doc => {
                    let params;
                    if (doc.props) {
                        params = JSON.parse(doc.props)
                    }
                    // will register all docs
                    if (!doc.is_node) {
                        getModule(doc.kood, params, __dirname);
                    }
                })
                callback(err, data.rows);

            });
        },

        docs: [{id: 1, name: 'Arved'}, {id: 2, name: 'Palk'}]
    } // объект docsList
};

module.exports = Doc;



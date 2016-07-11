//'use strict';


var Doc = {
    connectDb: function () {
        var pg = require('pg'),
            config = require('../config/config'),
            db = new pg.Client(config.pg.connection);
        return db;

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
                    console.error('sql error:' + JSON.stringify(err));
                }
                db.end();
//               console.log('result:' + JSON.stringify(result));
                callback(err, result);
            });
        });
    },


    executeSqlQueries: function (sqls, params, returnData, callback) {
        // выполнит запрос, вернет callback и данные
        var db = this.connectDb(),
            dataRow,
            sqlAsNew,
            sqlParameter,
            sqlCount = sqls.length;

//        console.log('executeSqlQueries sqlCount', sqlCount);
        for (var i = 0; i < sqlCount; i++) {
            dataRow = sqls[i];
            sqlAsNew = dataRow.sqlAsNew || null;
            sqlParameter = params == 0 && sqlAsNew !== null ? sqlAsNew : dataRow.sql;

//            console.log('executeSqlQueries:', params, sqlParameter);
            dataRow.query = db.query(sqlParameter, params); // ставим в очередь
            dataRow.query.on('row', function (row, result) {
                result.addRow(row);
            });
        }
        db.on('error', function (err) {
            console.error('db error:' + JSON.stringify(err));
            callback(err, []);
        })
        db.on('drain', function () {
            db.end;
            var dataObj = {};

            sqls.forEach(function (row) {
                var myRow = row.query._result.rows, // массив результатов
                    myData = row.multiple ? myRow : myRow[0];
                returnData[row.alias] = myData;
            });
//            console.log('drain',returnData);
            callback(null, returnData);
        });
        db.connect();

    },

    selectDoc: function (docTypeId, params, callback) {
        var doc = require('./' + docTypeId),
            sql = doc.select,
            docBpm = [], // БП документа
            returnData = doc.returnData;


        if  (doc.bpm) {
            docBpm = doc.bpm;
        }   


//        console.log('selectDoc params:', params);
        // выполним запрос
        if (typeof sql == 'object') {
                Doc.executeSqlQueries(sql, params, returnData, function(err, data) {
                    callback(err, data, docBpm);
                });
        } else {
            Doc.executeSqlQuery(sql, params, function (err, data) {
                callback(err, data.rows, docBpm);
            });
        }
    },

    saveDoc: function (docTypeId, params, callback) {
        var doc = require('./' + docTypeId),
            sql = doc.saveDoc;
//        console.log('saveDoc params:' + JSON.stringify(params));
        Doc.executeSqlQuery(sql, params, callback);

    },

    executeTask: function(docTypeId, params, callback) {
        // запустит переданные методы в моделе
        var doc = require('./' + docTypeId),
            tasks = params.params.tasks,
            docId = params.params.docId,
            userId = params.userId;
        console.log('model executeTask', params, tasks);
        doc.executeTask(tasks, docId, userId, callback)
//        callback(null,'Ok');
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

        requery: function (docTypeId, callback, results, sortBy, dynamicWhere) {
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
            sqlParams = this.getGridParams(docTypeId);


            Doc.executeSqlQuery(sqlSelect, sqlParams, function (err, data) {
                results.docsGrid = {
                    data: [{
                        id: docTypeId,
                        columns: gridConfig,
                        data: data.rows
                    }]
                }
                callback(err, data.rows);
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
                    console.log('sql error:', err);
                    results.docsList = {
                        data: []
                    }
                }
                results.docsList = {
                    data: data.rows
                }
                this.data = results;
                callback(err, data.rows);

            });
        },

        docs: [{id: 1, name: 'Arved'}, {id: 2, name: 'Palk'}]
    }  // объект docsList

};

module.exports = Doc;
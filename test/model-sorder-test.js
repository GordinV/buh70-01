'use strict';
require('babel-polyfill');

describe('model dok. type SORDER tests', function () {
    var globalDocId; // для сохранения ид документа
    const doc = require('../models/sorder'),
        docTypeId = 'sorder';

    it('SORDER unit save test', function (done) {
        let promise = Promise.resolve();
        promise.then(() =>
            saveDoc().then((result) => {
                globalDocId = result;
                done();
            })), ((err) => {
            console.error('error', err);
            throw new Error('Ошибка ARV start BP, no globalDocId');
        });
    });

    it.skip('Sorder validation, should return all unfilled', function (done) {
        const requiredFields = doc.requiredFields;

        let components = {
            refs: {
                kpv: {
                    state: {
                        value: null
                    },
                    props: {
                        title: 'Kuupäev'
                    }
                },
                asutusid: {
                    state: {
                        value: 0
                    },
                    props: {
                        title: 'asutusid'
                    }

                },
                summa: {
                    state: {
                        value: 0
                    },
                    props: {
                        title: 'summa'
                    }

                }
            }
        };

        let warning = require('../frontend/mixin/validateForm')(components, requiredFields);
        if (warning !== 'Ok') {
            done();
        }

    });

    it.skip('Sorder start BP', function (done) {
        if (!globalDocId) {
            throw new Error('Ошибка ARV start BP, no globalDocId');
        }
        const DocDataObject = require('../models/documents');

        let taskParams = {
            params: {
                tasks: ['start'],
                docId: globalDocId,
            },
            userId: 1
        };

        let result = DocDataObject.executeTaskPromise(docTypeId, taskParams);
        console.log('result:', result);
        if (result) {
            done();

        } else {
            throw new Error('Ошибка sorder start BP, DocDataObject.executeTaskPromise no result ');
        }

    });

    it.skip('ARVED generateJournal BP', function (done) {
        // generateJournal
        if (!globalDocId) {
            throw new Error('Ошибка ARV generateJournal BP, no globalDocId');
        }
        let taskParams = {
                params: {
                    tasks: ['generateJournal'],
                    docId: globalDocId,
                },
                userId: 1
            },
            DocDataObject = require('../models/documents');
        DocDataObject.executeTaskPromise('arv', taskParams)
            .then((data) => {
                done();
            })
            ,
            ((err) => {
                throw new Error('Ошибка ARV test generateJournal')
            });
    });

    it.skip('ARVED endProcess BP', function (done) {
        // generateJournal
        console.log('endProcess', globalDocId);
        if (!globalDocId) {
            throw new Error('Ошибка ARV generateJournal BP, no globalDocId');
        }

        var taskParams = {
                params: {
                    tasks: ['endProcess'],
                    docId: globalDocId,
                },
                userId: 1
            },
            DocDataObject = require('../models/documents');
        DocDataObject.executeTaskPromise('arv', taskParams)
            .then((data) => {
                //             console.log('generateJournal BP, arrived data:', data);
                done();
            })
            ,
            ((err) => {
                throw new Error('Ошибка ARV test endProcess')
            });
    });

    it.skip('ARV executeAutomateTask', function (done) {
        // созданим для теста новый док
        let promise = Promise.resolve(),
            DocDataObject = require('../models/documents'),
            taskParams = {
                params: {
                    tasks: ['start'],
                    docId: globalDocId,
                },
                userId: 1
            };


        promise.then(() =>
            saveDoc().then((result) => {
                globalDocId = result;
                return result;
            })
                .then((newDocId) => {
                    console.log('After saving got new doc id:', newDocId);
                    return DocDataObject.executeAutomateTask('arv', taskParams)
                })
                .then((result) => {
                    console.log('got result:', result);
                    done();
                })
        ), ((err) => {
            throw new Error('Ошибка ARV executeAutomateTask');
        })

    })

    it.skip('ARV select', function (done) {
        var DocDataObject = require('../models/documents');

        DocDataObject.selectDocPromise('ARV', [globalDocId, 1])
            .then((data) => {
                console.log('ARV select, arrived data:');
                if (data.row.id !== globalDocId) {
                    throw new Error('Ошибка метода  selectDocPromise, arrived wrong data');
                }
                done();
            }),
            ((err) => {
                if (err) throw new Error('Ошибка метода  selectDocPromise');
            })
    });

    it.skip('ARV deleteTask success', function (done) {
        let DocDataObject = require('../models/documents'),
            Doc = require('../models/arv'),
            sql = Doc.deleteDoc;

        DocDataObject.executeSqlQueryPromise(sql, [1, globalDocId])
            .then((result) => {
                console.log('ARV deleteTask success', result);
                if (result[0].result == 1) {
                    done();
                } else {
                    console.error('Test not success due result is 0');
                    if (err) throw new Error('Ошибка метода  deleteTask success');
                }
            }),
            ((err) => {
                if (err) throw new Error('Ошибка метода  deleteTask not success');

            })

    })

    it.skip('ARV deleteTask not success', function (done) {
        // созданим для теста новый док
        let DocDataObject = require('../models/documents'),
            Doc = require('../models/arv'),
            sql = Doc.deleteDoc;
//                promise = Promise.resolve();

        DocDataObject.executeSqlQueryPromise(sql, [1, globalDocId])
            .then((result) => {
                console.log('ARV deleteTask not success', result);
                if (result[0].result == 0) {
                    done(); // удаление не возможно так как пытаемся удалить уже удаленный документ
                }
            }),
            ((err) => {
                if (err) throw new Error('Ошибка метода  deleteTask not success');

            })

    })

    it.skip('ARVED select (grid)', function (done) {
        var DocDataObject = require('../models/documents'),
            results = {},
            user = {
                asutusId: 1,
                userId: 1
            };
        // callback, results, sortBy, dynamicWhere, user
        DocDataObject['docsGrid'].requery('ARV', function (err, data) {
            if (err) throw new Error('Ошибка метода  selectDoc');
            if (data.length < 1) throw new Error('Result < 1')
            done();

        }, results, null, null, user);
    });

    it.skip('Dokprop test (ARV) select', function (done) {
        let DocDataObject = require('../models/documents'),
            promise = Promise.resolve();

        promise
            .then(
                DocDataObject.selectDocPromise('dokProps', ['ARV', 1])
                    .then(
                        done()
                    )
            ).catch((err) => {
            throw new Error('Error in  selectDocPromise')
        })

    });

});

function saveDoc() {
    var data = JSON.stringify({
        "id": 0, "doc_type_id": "SORDER", "data": {
            "id": 59,
            "docs_ids": null,
            "created": "2016-06-01T09:54:40.504143",
            "lastupdate": "2016-06-01T09:54:40.504143",
            "bpm": null,
            "doc": "Sissemakse kassaorder",
            "doc_type_id": "SORDER",
            "status": "Черновик",
            "number": "1",
            "summa": "100.0000",
            "rekvid": 1,
            "kpv": "2016-05-31",
            "asutusid": 1,
            "dokument": "Arve сохранен",
            "alus": "test",
            "muud": "muud",
            "nimi": "isik",
            "aadress": "адрес",
            "tyyp": 2,
            "regkood": "123456789           ",
            "asutus": "isik, töötaja"
        },
        "details": [
            {
                "kood": "PANK",
                "nimetus": "paNK",
                "uhik": "",
                "id": 6,
                "parentid": 14,
                "nomid": 3,
                "summa": "100.0000",
                "konto": "113",
                "kood1": null,
                "kood2": null,
                "kood3": null,
                "kood4": null,
                "kood5": null,
                "tp": null,
                "tunnus": "tunnus",
                "proj": "proj"
            }]
    });

    var DocDataObject = require('../models/documents');
    return new Promise((resolved, rejected) => {
        DocDataObject.saveDocPromise('SORDER', [data, 1, 1])
            .then((data) => {
                console.log('saved, data', data);
                var row = data[0];
                if (!row || !row.id || row.id < 1) {
                    throw new Error('id is not returned or data is empty');
                }
                resolved(row.id);
            }),
            ((err) => {
                rejected(err);
//                throw new Error('Ошибка ARV save test')

            })
    });

}


/*
 it('ARV save', function (done) {
 var data = JSON.stringify({
 "id": 1,
 "doc_type_id": "ARV",
 "data": {
 "id": 1,
 "created": "2016-02-28T15:13:51.256409",
 "lastupdate": "2016-02-28T15:13:51.256409",
 "bpm": null,
 "doc": "Arved",
 "doc_type_id": "ARV",
 "status": "Активный",
 "number": "123",
 "summa": "1.2000",
 "rekvid": 1,
 "liik": 0,
 "operid": 0,
 "kpv": "2016-02-28",
 "asutusid": 1,
 "arvid": 0,
 "lisa": "test 123",
 "tahtaeg": "2017-03-31",
 "kbmta": "1.0000",
 "kbm": "0.2000",
 "tasud": null,
 "tasudok": null,
 "muud": "Test",
 "jaak": "0.0000",
 "objektid": 0,
 "objekt": null,
 "regkood": "123456789           ",
 "asutus": "isik, töötaja"
 },
 "details": [{
 "id": 2,
 "nomid": 1,
 "kogus": "2.000",
 "hind": "12.0000",
 "kbm": "1.0000",
 "summa": "22.0000",
 "kood": "PAIGALDUS",
 "nimetus": "PV paigaldamine"
 }, {
 "id": 1,
 "nomid": 2,
 "kogus": "1.000",
 "hind": "10.0000",
 "kbm": "2.0000",
 "summa": "12.0000",
 "kood": "TEENUS",
 "nimetus": "Teenuse selgitus"
 }]
 });
 var DocDataObject = require('../models/documents');
 DocDataObject.saveDoc('ARV', [data, 1, 1], function (err, data) {
 if (err)  throw new Error('Ошибка метода  save');
 var row = data.rows[0];
 if (!row || !row.id || row.id < 1)  throw new Error('id is not returned or data is empty');
 done();
 });
 });
 */
'use strict';
require('babel-polyfill');

describe('model dok. type SMK tests', function () {
    let globalDocId; // для сохранения ид документа
    const doc = require('../models/smk'),
        docTypeId = 'SMK';

    it('SMK unit save test', (done) => {
/*
        let promis = saveDoc();
        setTimeout(()=> {
            console.log('promis', promis);
            expect(promis)
            done();
        }, 1000)
*/

        let promise = Promise.resolve();
        promise.then(() =>
            saveDoc().then((result) => {
                globalDocId = result;
                expect(globalDocId > 0).toBeTruthy();
                done();
            })), ((err) => {
            console.error('error', err);
        });

    });

    it('SMK select', function (done) {
        var DocDataObject = require('../models/documents');

        DocDataObject.selectDocPromise('SMK', [globalDocId, 1])
            .then((data) => {
                console.log('SMK select, arrived data:');
                if (data.row.id !== globalDocId) {
                    throw new Error('Ошибка метода  selectDocPromise, arrived wrong data');
                }
                done();
            }),
            ((err) => {
                if (err) throw new Error('Ошибка метода  selectDocPromise');
            })
    });

    it('SMK select (grid)', function (done) {
        let DocDataObject = require('../models/documents'),
            results = {},
            user = {
                asutusId: 1,
                userId: 1
            };
        // callback, results, sortBy, dynamicWhere, user
        DocDataObject['docsGrid'].requery('SMK',(err, data) => {
            expect(err).toBe(null);
            expect(data.length > 1).toBeTruthy();
            done();

        }, results, null, null, user);
    });

    it('SMK deleteTask', function (done) {
        let DocDataObject = require('../models/documents'),
            Doc = require('../models/smk'),
            sql = Doc.deleteDoc;

        console.log('deleteTask', sql,globalDocId);
        DocDataObject.executeSqlQueryPromise(sql, [1, globalDocId])
            .then((result) => {
                console.log('SMK deleteTask success', result);
                expect(result[0].result).toBe(1);
                    done();
            }),
            ((err) => {
                if (err) throw new Error('Ошибка метода  deleteTask not success');

            });

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


});

function saveDoc() {
    let dataJSON =  `{"id":0,"doc_type_id":"SMK","data":{"id":0,"created":"2017-06-24T21:39:57.050726","lastupdate":"2017-06-24T21:39:57.050726","selg":"test mk","doc_status":"0","bpm":null,"doc":"S mk","doc_type_id":"SMK","status":"Черновик","number":"001","summa":24,"rekvid":null,"opt":0,"kpv":"2017-06-24","asutusid":1, "maksepaev":"2017-06-24", "arvid":null,"lisa":"lisa","tahtaeg":"2017-07-01","muud":"smk muud"},"details":[{"id":"NEW0.6577064044198089","nomid":"1","summa":24,"aa":"aatest","pank":"767", "asutusid":1}]}`,
        data = JSON.parse(dataJSON),
        params = [data, 1, 1];

    const DocDataObject = require('../models/documents');

    return new Promise((resolved, rejected) => {
        DocDataObject.saveDocPromise('SMK', params)
            .then((data) => {
                let row = data[0];
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

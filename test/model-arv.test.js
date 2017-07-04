'use strict';

describe('dok. type ARV tests', function () {
    let globalDocId = 0; // для сохранения ид документа

    const doc = require('../models/arv'),
        docTypeId = 'arv',
        DocDataObject = require('../models/documents');

    let docData = doc.returnData;

    it(`${docTypeId} select New`, (done) => {
        DocDataObject.selectDoc(docTypeId, [globalDocId, 1], (err, data) => {
            expect(err).toBeNull();
            expect(data).toBeDefined();
            docData['data'] = data.row;
            docData.details = [{id: 0, nomid: 1, summa: 10}];
            docData.bpm = null;
            docData['data']['rekvid'] = 1;
            docData['data']['lisa'] = 'test';
            docData['data']['summa'] = 10;
            docData['data']['doc_status'] = 0;
            docData['data']['nimi'] = 'nimi';
            docData['data']['asutusid'] = 1;
            done();
        });
    });

    it(`${docTypeId}  validation`, () => {
        const requiredFields = doc.requiredFields;
        const validator = require('../frontend/mixin/validateForm');

        let warning = validator(null, requiredFields, docData['data']);
        expect(warning).toBeNull();
    });

    it(`${docTypeId} unit save test`, () => {
        DocDataObject.saveDoc(docTypeId.toUpperCase(), [docData, 1, 1], (err, data) => {
            expect(err).toBeNull();
            expect(data).toBeDefined();
            expect(data['rows'].length).toBeGreaterThan(0);
            expect(data['rows'][0].id).toBeGreaterThan(0);
        });
    });

    it(`${docTypeId} select`, () => {
        DocDataObject.selectDoc(docTypeId.toUpperCase(), [globalDocId, 1], (err, data) => {
            expect(err).toBeNull();
            expect(data.row.id).toBeDefined();
            expect(data.row.id).toBe(globalDocId);
        });
    });

    it(`${docTypeId} test for select (grid)`, () => {
        let results = {},
            user = {
                asutusId: 1,
                userId: 1
            };
        // callback, results, sortBy, dynamicWhere, user
        DocDataObject['docsGrid'].requery(docTypeId.toUpperCase(), (err, data) => {
            expect(err).toBeNull();
            expect(data.length).toBeGreaterThan(0);
        }, results, null, null, user);
    });

    it(`${docTypeId} bpm test`, () => {
        let taskParams = {
            params: {
                tasks: [],
                docId: globalDocId,
            },
            userId: 1
        };

        let bpm = doc.bpm;

        bpm.forEach(step => {
            taskParams.params['tasks'] = [step.action];
            DocDataObject.executeTask(docTypeId, taskParams, (err, data) => {
                expect(err).toBeNull();
                expect(data).toBeDefined();
            });
        });
    })

    it(`${docTypeId} test for deleteTask`, () => {
        let sql = doc.deleteDoc;

        DocDataObject.executeSqlQuery(sql, [1, globalDocId], (err, data) => {
            expect(err).toBeNull();
            expect(data).toBeDefined();
            expect(data[0].result).toBe(1);
        });

    });

    it(`${docTypeId} Dokprop test select`, () => {
        DocDataObject.selectDoc('dokProps', [docTypeId.toUpperCase(), 1], (err, data) => {
            expect(err).toBeNull();
            expect(data).toBeDefined();
        });

    });


    /*


     it('ARV executeAutomateTask', function (done) {
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
     saveArv().then((result) => {
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

     it('Dokprop test (ARV) select', function (done) {
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
     */
});

'use strict';

describe('model dok. type SMK tests', ()=> {
    let globalDocId = 0; // для сохранения ид документа
    const doc = require('../models/raamatupidamine/smk'),
        docTypeId = 'smk',
        DocDataObject = require('../models/documents');

    let docData = doc.returnData;

    it(`${docTypeId} select New`, (done) => {
        DocDataObject.selectDoc(docTypeId, [globalDocId, 1], (err, data) => {
            expect(err).toBeNull();
            expect(data).toBeDefined();
            docData['data'] = data.row;
            docData['doc_type_id'] = docTypeId.toUpperCase();
            docData.details = [{id: 0, nomid: 1, summa: 10, asutusid: 1, aa:'EE0000'}];
            docData.bpm = null;
            docData['data']['rekvid'] = 1;
            docData['data']['lisa'] = 'test';
            docData['data']['summa'] = 10;
            docData['data']['doc_status'] = 0;
            docData['data']['nimi'] = 'nimi';
            done();
        });
    });

    it(`${docTypeId}  validation`, () => {
        const requiredFields = doc.requiredFields;
        const validator = require('../frontend/mixin/validateForm');

        let warning = validator(null, requiredFields, docData['data']);
        expect(warning).toBeNull();
    });

    it(`${docTypeId} unit save test`, (done) => {
        DocDataObject.saveDoc(docTypeId.toUpperCase(), [docData, 1, 1], (err, data) => {
            expect(err).toBeNull();
            expect(data).toBeDefined();
            expect(data['rows'].length).toBeGreaterThan(0);
            expect(data['rows'][0].id).toBeGreaterThan(0);
            globalDocId = data['rows'][0].id;
            done();
        });
    });

    it(`${docTypeId} select`, (done) => {
        DocDataObject.selectDoc(docTypeId.toUpperCase(), [globalDocId, 1], (err, data) => {
            expect(err).toBeNull();
            expect(data.row.id).toBeDefined();
            expect(data.row.id).toBe(globalDocId);
            done();
        });
    });

    it(`${docTypeId} test for select (grid)`, (done) => {
        let results = {},
            user = {
                asutusId: 1,
                userId: 1
            };
        // callback, results, sortBy, dynamicWhere, user
        DocDataObject['docsGrid'].requery(docTypeId.toUpperCase(), (err, data) => {
            expect(err).toBeNull();
            expect(data.length).toBeGreaterThan(0);

            // найдем в результате новый документ
            let newDoc = data.filter(row => {
                if (row.id === globalDocId) return row;
            });

            expect(newDoc.length).toBeGreaterThan(0);
            done();
        }, results, null, null, user);

    });

    it.skip(`${docTypeId} bpm test`, () => {
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

    it(`${docTypeId} test for deleteTask with wrong docId`, (done) => {
        let sql = doc.deleteDoc;

        DocDataObject.executeSqlQuery(sql, [1, 0], (err, data) => {
            expect(err).toBeNull();
            expect(data).toBeDefined();
            expect(data.rows[0].error_code).not.toBeNull();
            done();
        });

    });

    it(`${docTypeId} test for deleteTask`, (done) => {
        let sql = doc.deleteDoc;

        DocDataObject.executeSqlQuery(sql, [1, globalDocId], (err, data) => {
            expect(err).toBeNull();
            expect(data).toBeDefined();
            expect(data.rows[0].result).toBe(1);
            done();
        });

        done();

    });


});

describe('Document tests', () => {
    const Document = require('./Document');
    const doc = new Document('ARV', 1, 1);

    it('should exist and have props', () => {
        expect(doc).toBeDefined();
        expect(doc.docTypeId).toBeDefined();
        expect(doc.config).toBeDefined();
        expect(doc.documentId).toBeDefined();
    });

    it('should have methods',() => {
        expect(doc.createNew).toBeDefined();
        expect(doc.select).toBeDefined();
        expect(doc.save).toBeDefined();
        expect(doc.executeTask).toBeDefined();
        expect(doc.loadLibs).toBeDefined();
    });

    it ('should have setted docTypeId and docId', () => {
        expect(doc.docTypeId).not.toBeNull();
        expect(doc.docId).not.toBeNull();
        expect(doc.userId).not.toBeNull();
    });

    it ('select method', async() => {
        expect.assertions(1);

        let returnedData = await doc.select();
        console.log('returnedData', returnedData);
        expect(returnedData).toBeDefined();
    })
});
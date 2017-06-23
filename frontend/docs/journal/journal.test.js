require('./../../../test/testdom')('<html><body></body></html>'); // создадим ДОМ

const ReactTestUtils = require('react-addons-test-utils');
const React = require('react');
const flux = require('fluxify');
let docStore = require('../../stores/doc_store.js');


describe('doc test, Journal', () => {
    // проверяем на наличие компонента и его пропсы и стейты
    // проверяем изменение стейтов после клика
    const Journal = require('./journal.jsx');
//    const style = require('./input-text-styles');

    let dataRow = require('./../../../test/fixture/doc-journal-fixture'),
        libs = require('./../../../test/fixture/datalist-fixture'),
        model = require('./../../../models/journal'),
        data = {
            row: dataRow,
            bpm: model.bpm,
            relations: [],
            details: dataRow.details,
            gridConfig: model.returnData.gridConfig
        }


    let onChangeHandler = jest.fn();

    let doc = ReactTestUtils.renderIntoDocument(<Journal data={data} bpm={model.bpm}/>);

    it('should be defined', () => {
        expect(doc).toBeDefined();
    });

    it('should contain objects in non-edited mode', () => {
        expect(doc.refs['form']).toBeDefined();
        expect(doc.refs['toolbar-container']).toBeDefined();
        expect(doc.refs['doc-toolbar']).toBeDefined();
        expect(doc.refs['doc-common']).toBeDefined();
        expect(doc.refs['input-number']).toBeDefined();
        expect(doc.refs['input-kpv']).toBeDefined();
        expect(doc.refs['input-dok']).toBeDefined();
        expect(doc.refs['select-asutusid']).toBeDefined();
        expect(doc.refs['textarea-selg']).toBeDefined();
        expect(doc.refs['textarea-muud']).toBeDefined();
        expect(doc.refs['data-grid']).toBeDefined();
        expect(doc.refs['input-summa']).toBeDefined();
        expect(doc.refs['data-grid']).toBeDefined();
    });

    it('test doc-toolbar-events', (done) => {
        let docToolbar = doc.refs['doc-toolbar'];

        expect(docToolbar.btnAddClick).toBeDefined();
        docToolbar.btnAddClick();

        setTimeout(() => {
            let state = doc.state;
            expect(state).toBeDefined();
            expect(state.edited).toBeTruthy();
            expect(doc.refs['grid-toolbar-container']).toBeDefined();
            expect(doc.refs['grid-button-add']).toBeDefined();
            expect(doc.refs['grid-button-edit']).toBeDefined();
            expect(doc.refs['grid-button-delete']).toBeDefined();
            done();
        }, 1000);

    });

    it('doc-toolbar btnAdd click event test (handleGridBtnClick(btnName, id))', () => {
        let btnAdd = doc.refs['grid-button-add'];
        expect(btnAdd).toBeDefined();
        doc.handleGridBtnClick('add');
        let state = doc.state;
        expect(state.gridRowEdit).toBeTruthy();
        expect(state.gridRowEvent).toBe('add');
        expect(state.gridRowData.id).toContain('NEW');
        expect(doc.refs['modalpage-grid-row']).toBeDefined();
        expect(doc.refs['grid-row-container']).toBeDefined();
        expect(doc.refs['deebet']).toBeDefined();
        expect(doc.refs['kreedit']).toBeDefined();
        expect(doc.refs['summa']).toBeDefined();
    });

    it ('select grid row test', ()=> {

        let db = doc.refs['deebet'],
            kr = doc.refs['kreedit'],
            summa = doc.refs['summa'];

        expect(db).toBeDefined();
        expect(kr).toBeDefined();
        expect(summa).toBeDefined();

        doc.handleGridRowChange('deebet', '111')
        doc.handleGridRowChange('kreedit', '113')
        doc.handleGridRowInput('summa', 10);
        expect(doc.state.gridRowData['deebet']).toBe('111');
        expect(doc.state.gridRowData['kreedit']).toBe('113');
        expect(doc.state.gridRowData['summa']).toBe(10);

//        ReactTestUtils.Simulate.change(inputSelect, {"target": {"value": 2}});
//        expect(inputSelect.state.value).toBe(2);

    });

    it('Grid row btnOk test', () => {
        expect(doc.modalPageClick).toBeDefined();
        doc.modalPageClick('Ok');
        expect(doc.state.gridRowEdit).toBeFalsy();
        // модальное окно редактирования должно исчезнуть
        expect(doc.refs['modalpage-grid-row']).not.toBeDefined();
        expect(doc.state.gridData.length).toBe(3);
    });


    it('gridRow ModalPage btnCancel click test', () => {
        let btnAdd = doc.refs['grid-button-add'];
        expect(btnAdd).toBeDefined();
        doc.handleGridBtnClick('add');

        expect(doc.modalPageClick).toBeDefined();
        doc.modalPageClick('Cancel');
        expect(doc.state.gridRowEdit).toBeFalsy();
        // модальное окно редактирования должно исчезнуть
        expect(doc.refs['modalpage-grid-row']).not.toBeDefined();
    });

    it('grid btnDelete test', ()=> {
        let btnDel = doc.refs['grid-button-delete'];
        expect(btnDel).toBeDefined();
        expect(doc.state.gridData.length).toBe(3);
        doc.handleGridBtnClick('delete');
        expect(doc.state.gridData.length).toBe(2);
    });

    it('test recalcDocSumma', () => {

        expect(doc.recalcDocSumma).toBeDefined();
        let docData = doc.recalcDocSumma(data.row);
        expect(docData.summa).toBe(99);
    });

    it ('test toolbar btnEdit', ()=> {
        let docToolbar = doc.refs['doc-toolbar'];
        expect(docToolbar.btnEditClick).toBeDefined();
        if (!doc.state.edited)  {
            docToolbar.btnEditClick();
            setTimeout(() => {
                expect(doc.state.edited).toBeTruthy();
                done();
            }, 1000);
        }
    });

    it ('doc-toolbar btnCancel test', (done) => {
        let docToolbar = doc.refs['doc-toolbar'];
        expect(docToolbar.btnCancelClick).toBeDefined();

        docToolbar.btnCancelClick();

        setTimeout(() => {
            expect(doc.state).toBeDefined();
            expect(doc.state.edited).toBeFalsy();
            done();
        },1000);
    });

    it('backup test',() => {
        //@todo реализовать
        expect(doc.handleToolbarEvents).toBeDefined();
    });

});

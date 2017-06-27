require('./../../../test/testdom')('<html><body></body></html>'); // создадим ДОМ

const ReactTestUtils = require('react-addons-test-utils');
const React = require('react');
const flux = require('fluxify');
let docStore = require('../../stores/doc_store.js');


describe('doc test, VMK', () => {
    // проверяем на наличие компонента и его пропсы и стейты
    // проверяем изменение стейтов после клика
    const Vorder = require('./vmk.jsx');
//    const style = require('./input-text-styles');

    let dataRow = require('./../../../test/fixture/doc-vmk-fixture'),
        libs = require('./../../../test/fixture/datalist-fixture'),
        model = require('./../../../models/vorder'),
        data = {
            row: dataRow,
            bpm: model.bpm,
            relations: [],
            details: dataRow.details,
            gridConfig: model.returnData.gridConfig
        }


    let onChangeHandler = jest.fn();

    let doc = ReactTestUtils.renderIntoDocument(<Vorder data={data} bpm={model.bpm}/>);

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
        expect(doc.refs['select-aaId']).toBeDefined();
        expect(doc.refs['input-arvnr']).toBeDefined();
        expect(doc.refs['input-maksepaev']).toBeDefined();
        expect(doc.refs['dokprop']).toBeDefined();
        expect(doc.refs['input-viitenr']).toBeDefined();
        expect(doc.refs['textarea-selg']).toBeDefined();
        expect(doc.refs['data-grid']).toBeDefined();
        expect(doc.refs['input-summa']).toBeDefined();
        expect(doc.refs['textarea-muud']).toBeDefined();
    });

    it('test doc-toolbar-events', (done) => {
        let docToolbar = doc.refs['doc-toolbar'];

        expect(docToolbar.btnEditClick).toBeDefined();
        docToolbar.btnEditClick();

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
    it('backup test', () => {
        //@todo реализовать
        expect(doc.handleToolbarEvents).toBeDefined();
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
        expect(doc.refs['nomid']).toBeDefined();
        expect(doc.refs['asutusid']).toBeDefined();
        expect(doc.refs['aa']).toBeDefined();
        expect(doc.refs['summa']).toBeDefined();
        expect(doc.refs['konto']).toBeDefined();
        expect(doc.refs['tunnus']).toBeDefined();
        expect(doc.refs['project']).toBeDefined();

    });

    it('select grid row test', () => {

        let nomId = doc.refs['nomid'],
            asutusId = doc.refs['asutusid'],
            aa = doc.refs['aa'],
            konto = doc.refs['konto'],
            summa = doc.refs['summa'];

        expect(nomId).toBeDefined();
        expect(asutusId).toBeDefined();
        expect(aa).toBeDefined();
        expect(konto).toBeDefined();
        expect(summa).toBeDefined();

        doc.handleGridRowChange('nomid', 3);
        doc.handleGridRowChange('asutusid', 1);
        doc.handleGridRowChange('aa', 'aa-test');
        doc.handleGridRowChange('konto', '113');
        doc.handleGridRowInput('summa', 10);
        expect(doc.state.gridRowData['nomid']).toBe(3);
        expect(doc.state.gridRowData['asutusid']).toBe(1);
        expect(doc.state.gridRowData['aa']).toBe('aa-test');
        expect(doc.state.gridRowData['konto']).toBe('113');
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

    it('grid btnDelete test', () => {
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

    it('test for libs', () => {
        expect(doc.createLibs).toBeDefined();
        let libs = doc.createLibs();
        expect(libs).toEqual({
            asutused: [],
            kontod: [],
            dokProps: [],
            tunnus: [],
            project: [],
            nomenclature: [],
            aa: []
        });
    });

    it('test toolbar btnEdit', () => {
        let docToolbar = doc.refs['doc-toolbar'];
        expect(docToolbar.btnEditClick).toBeDefined();
        if (!doc.state.edited) {
            docToolbar.btnEditClick();
            setTimeout(() => {
                expect(doc.state.edited).toBeTruthy();
                done();
            }, 1000);
        }
    });

    it('doc-toolbar btnCancel test', (done) => {
        let docToolbar = doc.refs['doc-toolbar'];
        expect(docToolbar.btnCancelClick).toBeDefined();

        docToolbar.btnCancelClick();

        setTimeout(() => {
            expect(doc.state).toBeDefined();
            expect(doc.state.edited).toBeFalsy();
            done();
        }, 1000);
    });

    it('test of onChange action', (done) => {
        let input = doc.refs['input-number'],
            docToolbar = doc.refs['doc-toolbar'],
            number = input.state.value;

        expect(input).toBeDefined();
        expect(docToolbar.btnEditClick).toBeDefined();
        expect(input.props.onChange).toBeDefined();
        doc.handleInput('number', '9999');
        // изменения вне режима редактирования не меняют состояния
        expect(doc.state.docData['number']).toBe(number);
        docToolbar.btnEditClick();

        // изменения должны примениться
        setTimeout(() => {
            // изменения должны примениться
//            input.value = '9999';
//            ReactTestUtils.Simulate.change(input);
            doc.handleInput('number', '9999');
            expect(doc.state.docData['number']).toBe('9999');
            docToolbar.btnCancelClick();
            done();
        }, 1000);

    });


});
/**
 * Created by HP on 24.06.2017.
 */

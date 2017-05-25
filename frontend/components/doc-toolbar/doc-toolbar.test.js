require('./../../../test/testdom')('<html><body></body></html>'); // создадим ДОМ

const ReactTestUtils = require('react-addons-test-utils');
const React = require('react');
const flux = require('fluxify');
const docStore = require('../../stores/doc_store.js');
const ToolBar = require('./doc-toolbar.jsx');
let tasks = [{step: 0, name: 'Start', action: 'start', status: 'opened'}];

describe('components test, DocToolbar', () => {
    let component = ReactTestUtils.renderIntoDocument(<ToolBar bpm = {tasks} docStatus = {0}/>);

    it('should be defined', () => {
        expect(component).toBeDefined();
    });

    it('should exists all components', ()=> {
        expect(component.refs['btnAdd']).toBeDefined();
        expect(component.refs['btnEdit']).toBeDefined();
        expect(component.refs['btnSave']).toBeDefined();
        expect(component.refs['btnPrint']).toBeDefined();
        expect(component.refs['taskWidget']).toBeDefined();
    });

    it('btnAddClick function test', ()=> {
        component.btnAddClick();
        setTimeout(()=>{
            expect(flux.stores.docStore.docId).toBe(0);
            expect(flux.stores.docStore.edited).toBeTruthy();
            expect(flux.stores.docStore.saved).toBeFalsy();
        }, 1000);
    })

    it('btnEditClick function test', ()=> {
        component.btnEditClick();
        setTimeout(()=>{
            expect(flux.stores.docStore.edited).toBeTruthy();
            expect(flux.stores.docStore.saved).toBeFalsy();
        }, 1000);
    })

    it('btnSaveClick function test', ()=> {
        component.btnSaveClick();
        setTimeout(()=>{
            expect(flux.stores.docStore.edited).toBeFalsy();
            expect(flux.stores.docStore.saved).toBeTruthy();
        }, 1000);
    })

});

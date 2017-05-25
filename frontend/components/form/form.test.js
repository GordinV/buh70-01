require('./../../../test/testdom')('<html><body></body></html>'); // создадим ДОМ

const ReactTestUtils = require('react-addons-test-utils');
const React = require('react');
const flux = require('fluxify');
const docStore = require('../../stores/doc_store.js');
const Form = require('./form.jsx');
//    const style = require('./datalist-styles');
const handlePageClick = jest.fn();

describe('components test, form', () => {
    let pages = [{docTypeId: 'ARV', docId: 1, pageName: 'Arve 1'}];

    let component = ReactTestUtils.renderIntoDocument(<Form
        pages={pages}
        handlePageClick={handlePageClick}/>);


    it('should be defined', () => {
        expect(component).toBeDefined();
    });

    it ('should contain pages',() => {
        let page = component.refs['page-0'];
        expect(page).toBeDefined();
    });

    it ('should contain label, and handle click event',() => {
        let page = component.refs['page-0'],
            label = page.refs['pageLabel'];
        expect(label).toBeDefined();
        ReactTestUtils.Simulate.click(label);
        expect(handlePageClick).toBeCalled();
        expect(handlePageClick.mock.calls).toEqual([pages]);
    });

});
require('./../../../test/testdom')('<html><body></body></html>'); // создадим ДОМ

const ReactTestUtils = require('react-addons-test-utils'),
    React = require('react'),
    Register = require('./register.jsx'),
    style = require('./register-styles'),
    data = require('./../../../test/fixture/grid-filter-fixture'),
    components = [
        {name: 'docsList', data: [], value: ''},
        {name: 'docsGrid', data: [], value: 0}
    ];


describe('doc test, register', () => {

    const component = ReactTestUtils.renderIntoDocument(<Register id= 'grid' components= {components}/>);

    it('should be define', () => {
        expect(component).toBeDefined();
    });
})
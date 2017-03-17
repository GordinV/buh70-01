require('./testdom')('<html><body></body></html>'); // создадим ДОМ

const ReactTestUtils = require('react-addons-test-utils');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
let    btnClickResult = null;

const btnClick = ()=> {
    console.log('btnClick clicked');
    btnClickResult = 'Ok';
}

describe('ReactTestUtils', () => {
    const DocButton = require('../frontend/components/doc-button.jsx'),
        className = 'doc-button',
        value = 'Add';

    var shallowRenderer = ReactTestUtils.createRenderer();

    shallowRenderer.render(<DocButton onClick={btnClick}
                                      className = {className}
                                      value = {value}/>);

    var result = shallowRenderer.getRenderOutput();

    it('should have shallow rendering doc-button, type == "input', () => {
        expect(result.type).toBe('input');
    });

    it ('will check for props value',()=> {
        expect(result.props.value).toBe(value);
        expect(result.props.onClick).toBeDefined();
    });

    it ('will Simulate onClick',()=> {
        let container = document.createElement('div');
        let docButton = require('../frontend/components/doc-button.jsx'),
            instance = ReactDOM.render(<docButton value = "Add" onClick={btnClick}/>, container)

        let node = ReactDOM.findDOMNode(instance);
        ReactTestUtils.Simulate.click(node);
        expect(btnClickResult).toBe('Ok');
    });
});

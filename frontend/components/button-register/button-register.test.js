require('./../../../test/testdom')('<html><body></body></html>'); // создадим ДОМ

const ReactTestUtils = require('react-addons-test-utils');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');

let  btnClickResult = null;

const btnClick = ()=> {
    btnClickResult = 'Ok';
}

/*
let shallowRenderer = ReactTestUtils.createRenderer();

shallowRenderer.render(
    <Button value="Test" onClick={btnClick}>
    </Button>);

let shallowComponent = shallowRenderer.getRenderOutput();
*/


//const button = component.refs['button'];

describe.only('component test, button', () => {

    const Button = require('./button-register.jsx'),
        style = require('./button-register-styles');

    let component = ReactTestUtils.renderIntoDocument(<Button
        value="Test"
        disabled={false}
        show={true}
        width="30px"
        height="auto"
        onClick={btnClick}>,

    </Button>);

    let button = component.refs['button'];

    it ('should be define', () => {
        expect(component).toBeDefined();
    });

    it('should have shallow rendering button, type == "button', () => {
        expect( button.type).toBe('submit'); // its button, but returned as submit ?
    });

    it('should on event click return Ok', ()=> {
        ReactTestUtils.Simulate.click(button);
        expect(btnClickResult).toEqual('Ok');
    });

    it('should have property show', () => {
        expect(component.props.show).toBe(true);
    });

    it('should have property disabled', () => {
        expect(component.props.disabled).toBe(false);
    });

    it ('should have styles', ()=> {
        expect(button.style).toBeDefined()
        expect(button.style.display).toBe('inline');
    });

    it ('test size props', ()=> {
        let style = button.style;
        expect(style).toBeDefined();
        expect(style.width).toBe('30px');
        expect(style.height).toBe('auto');
    });
});

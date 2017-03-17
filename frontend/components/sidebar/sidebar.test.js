
require('./../../../test/testdom')('<html><body></body></html>'); // создадим ДОМ

const ReactTestUtils = require('react-addons-test-utils');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');

let  btnClickResult = null;

const btnClick = ()=> {
    console.log('clicked');
    btnClickResult = 'Ok';
}

describe('component test, sidebar', () => {
    const Sidebar = require('./sidebar.jsx');
    const style = require('./sidebar-styles');

/*
    let shallowRenderer = ReactTestUtils.createRenderer();

    shallowRenderer.render(<Sidebar width="30%" toolbar={true}/>);

    var result = shallowRenderer.getRenderOutput();

    let component = ReactTestUtils.renderIntoDocument(<Sidebar width="30%" toolbar={true}/>);
*/
    let shallowRenderer = ReactTestUtils.createRenderer();

    shallowRenderer.render(<Sidebar width="30%" toolbar={true}/>);

    var result = shallowRenderer.getRenderOutput();

    let component = ReactTestUtils.renderIntoDocument(<Sidebar width="30%" toolbar={true}/>);
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(
        component, 'input'
    );
    it('should have shallow rendering sidebar, type == "div', () => {
        expect(result.type).toBe('div');
    });


    it ('should have childrens (2)(<div> <input/></div>)', ()=> {
        expect(result.props.children.length).toBe(2);
    });

    it ('should have in children button ', ()=> {

        let button = component.refs['sidebar-button'];
        expect(button.type).toBe('button');
    });

    it ('should on button click change width', ()=> {
        let componentWidth = component.state.width;
        let button = component.refs['sidebar-button'];
        ReactTestUtils.Simulate.click(button);
        let componentChangedWidth = component.state.width;
        expect(componentChangedWidth).not.toBe('componentWidth');
    });

    it ('after btnClick event should change component show state (true -> false)', () => {
        let toolBar = component.refs['toolbar'];
        expect(component.state.show).toBe(false);
    });

    it ('should have visibility hidden', ()=> {
        let toolbar = component.refs['content'];
        let visibility =  window.getComputedStyle(ReactDOM.findDOMNode(toolbar)).getPropertyValue("visibility");
        expect(visibility).toBe('hidden');
    });

});

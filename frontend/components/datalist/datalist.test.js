require('./../../../test/testdom')('<html><body></body></html>'); // создадим ДОМ

const ReactTestUtils = require('react-addons-test-utils');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');

describe('components test, datalist', () => {
    // проверяем на наличие компонента и его пропсы и стейты
    // проверяем изменение стейтов после клика
    const DataList = require('./datalist.jsx');
    const style = require('./datalist-styles');

    let shallowRenderer = ReactTestUtils.createRenderer();
    let data = require('./../../../test/fixture/datalist-fixture');

    shallowRenderer.render(<DataList data={data}
                                     name="docsList"
                                     bindDataField="kood"
                                     value='code1'
                                     onChangeAction='docsListChange'/>);

    let result = shallowRenderer.getRenderOutput();

    let component = ReactTestUtils.renderIntoDocument(<DataList data={data}
                                                                name="docsList"
                                                                bindDataField="kood"
                                                                value='code1'
                                                                onChangeAction='docsListChange'/>);


    let container = document.createElement('div');
    let instance = ReactDOM.render(<DataList data={data}
                                             name="docsList"
                                             bindDataField="kood"
                                             value='code1'
                                             onChangeAction='docsListChange'/>, container);

    it('should component type to be div', () => {
        expect(result.type).toBe('div');
    });

    it('should have ul li', () => {
        expect(component.refs['datalist']).toBeDefined();
        expect(component.refs['datalist-ul']).toBeDefined();
        expect(component.refs['li-0']).toBeDefined();
    });

    it('should have value = "code1"', () => {
        let value = component.state.value;
        expect(value).toBe('code1');
    });

    it('after click event should save li clicked index', () => {
        component.handleLiClick(1);
        let clickedIndex = component.state.clicked;
        expect(clickedIndex).toBe(1);
    });
})
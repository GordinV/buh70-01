require('./../../../test/testdom')('<html><body></body></html>'); // создадим ДОМ

const ReactTestUtils = require('react-addons-test-utils');
const React = require('react');

let result;

const handleClick = (e) => {
    result = e;
}

describe('component test, modalPage', () => {

    const ModalPage = require('./modalpage.jsx'),
        style = require('./modalpage-styles');

    const component = ReactTestUtils.renderIntoDocument(<ModalPage
        modalObjects = {['btnOk', 'btnCancel']}
        modalPageBtnClick={handleClick}
        show={true}
        modalPageName='Filter'>

        <span>filter test</span>
    </ModalPage>)

    it('should be define', () => {
        expect(component).toBeDefined();
    });

    it ('should contain header, btnOk, btnCancel', () => {
        expect(component.refs['modalPageHeader']).toBeDefined();
        expect(component.refs['btnOk']).toBeDefined();
        expect(component.refs['btnCancel']).toBeDefined();
        expect(component.refs['btnClose']).toBeDefined();
    });

    it ('should return Ok or Cancel as result of click events', ()=> {
        let btnOk = component.refs['btnOk'];
            ReactTestUtils.Simulate.click(btnOk.refs['button']);

        expect(result).toBe('Ok');

        let btnCancel = component.refs['btnCancel'];
        ReactTestUtils.Simulate.click(btnCancel.refs['button']);

        expect(result).toBe('Cancel');

    });

    it ('test of show attribute',()=> {
       let container = component.refs['container'];
       expect(container).toBeDefined();
       expect(container.style.display).not.toBe('none');
    });

    it('should close modalpage by clicking closeButton',() => {
        let button = component.refs['btnClose'],
            container = component.refs['container'];

         ReactTestUtils.Simulate.click(button.refs['button']);
        expect(button).toBeDefined();
        expect(component.state.show).toBe(false);
        expect(container.style.display).toBe('none');

    })
})

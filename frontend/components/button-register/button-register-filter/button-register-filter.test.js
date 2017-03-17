require('./../../../../test/testdom')('<html><body></body></html>'); // создадим ДОМ

const ReactTestUtils = require('react-addons-test-utils');
const React = require('react'),
    fs = require('fs'),
    path = require('path');

let  btnClickResult = null;

const btnClick = ()=> {
    btnClickResult = 'Ok';
}

describe.only('component test, buttonFilter', () => {

    const Button = require('./button-register-filter.jsx'),
        style = require('../button-register-styles');

    let component = ReactTestUtils.renderIntoDocument(<Button
        value="Edit"
        onClick={btnClick}>
    </Button>);

    let buttonFilter = component.refs['btnFilter'];
    let button = buttonFilter.refs['button'];

    it ('should be define', () => {
        expect(component).toBeDefined();
    });

    it('should have property show, disabled (default', () => {
        expect(buttonFilter.props.show).toBe(true);
        expect(buttonFilter.props.disabled).toBe(false);
    });

    it('should exist children image', () => {
        let image = component.refs['image'];
        expect(image).toBeDefined();
    });

    it('should exist image file', () => {
        let image = component.refs['image'],
            publicPath = path.join(__dirname, '../../../../public/'),
            src = path.join(publicPath, style.icons.filter);

        let imageFile = fs.statSync(src);
        expect(imageFile.isFile()).toBe(true);

    });


});

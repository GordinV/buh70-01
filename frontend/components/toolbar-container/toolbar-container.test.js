
const ReactTestUtils = require('react-addons-test-utils');
const React = require('react');

describe('component test, toolbarContainer', () => {
    const ToolbarContainer = require('./toolbar-container.jsx');
    const style = require('./toolbar-container-styles');

    let shallowRenderer = ReactTestUtils.createRenderer();

    shallowRenderer.render(<ToolbarContainer style = {style.toolBarContainerStyle}> <span></span></ToolbarContainer>);

    let result = shallowRenderer.getRenderOutput();

    it('should have shallow rendering toolbarContainer, type == "div', () => {
        expect(result.type).toBe('div');
    });

});

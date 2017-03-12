require('./testdom')('<html><body></body></html>'); // создадим ДОМ

const ReactTestUtils = require('react-addons-test-utils');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const chai = require('chai');

const flux = require('fluxify');
var docStore = require('../frontend/stores/doc_store.js');

var expect = chai.expect,
    btnClickResult = null,
    inputChangeResult = null;

const btnClick = ()=> {
    console.log('btnClick clicked');
    btnClickResult = 'Ok';
}


describe('ReactTestUtils, doc-input-date', () => {
    const InputDate = require('../frontend/components/doc-input-date.jsx'),
        className = 'ui-c2';

    var shallowRenderer = ReactTestUtils.createRenderer();
    const kpv = new Date();

    shallowRenderer.render(<InputDate className={className}
                                      title='Kuupäev '
                                      name='kpv'
                                      value={kpv}
                                      ref='kpv'
                                      readOnly={true}/>);

    var result = shallowRenderer.getRenderOutput();

    it('will change edit mode', () => {
        flux.doAction('editedChange', false);
        /*
         const node = this.refs.input;
         node.value = 'giraffe';
         ReactTestUtils.Simulate.change(node);
         ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
         */
    });

    it('will emulate event change', ()=> {
        flux.doAction('dataChange', {kpv: '2016-11-03'});
        let container = document.createElement('div');
        let instance = ReactDOM.render(<InputDate className={className}
                                                  title='Kuupäev '
                                                  name='kpv'
                                                  value={kpv}
                                                  readOnly={true}/>, container);

        let node = ReactDOM.findDOMNode(instance);
        node.value = kpv;
//        console.log('value:', kpv, node);
        ReactTestUtils.Simulate.change(node);
        expect(node.value).to.equal(kpv);
        let data = flux.stores.docStore.data,
            value = data['kpv'];
        console.log('data:', data, value);
//        expect(result.props.onClick).to.exist;
    });

    it('will call change of the input date', ()=> {
        const inputChangeHandle = (value)=> {
            console.log('inputChange called', value);
            inputChangeResult = value;
        }

        const InputDateSimple = require('../frontend/components/input-date.jsx'),
            className = 'ui-c2';

        let container = document.createElement('div');
        let instance = ReactDOM.render(<InputDateSimple className={className}
                                                        title='Kuupäev '
                                                        name='kpv'
                                                        value={kpv}
                                                        refId="InputDate"
                                                        onChange={inputChangeHandle}
                                                        readOnly={true}/>, container);

        let node = instance.refs.InputDate;
        node.value = '2016-11-03';
        ReactTestUtils.Simulate.change(node);
        expect(inputChangeResult).to.equal('2016-11-03');
        node.value = '2010-11-03';

        ReactTestUtils.Simulate.change(node);
        expect(inputChangeResult).to.equal('2016-11-03');
//        console.log('node:', node);
    });

});

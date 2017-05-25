require('./../../../test/testdom')('<html><body></body></html>'); // создадим ДОМ

const ReactTestUtils = require('react-addons-test-utils');
const React = require('react');

describe('doc test, Arve', () => {
    // проверяем на наличие компонента и его пропсы и стейты
    // проверяем изменение стейтов после клика
    const Arve = require('./arve.jsx');
//    const style = require('./input-text-styles');

    let dataRow = require('./../../../test/fixture/doc-common-fixture'),
        libs = require('./../../../test/fixture/datalist-fixture'),
        model = require('./../../../models/arv'),
        data = {
            row: dataRow,
            bpm: model.bpm,
            relations: [],
            details: [],
            gridConfig: model.returnData.gridConfig
        }


    let onChangeHandler = jest.fn();

    let doc = ReactTestUtils.renderIntoDocument(<Arve data={data} bpm={model.bpm}/>);

    it('should be defined', () => {
        expect(doc).toBeDefined();
    });
});

'use strict';

const PropTypes = require('prop-types');

const React = require('react'),
    Documents = require('./../documents/documents.jsx'),
    flux = require('fluxify');

const
    InputText = require('../../components/input-text/input-text.jsx'),
    TextArea = require('../../components/text-area/text-area.jsx'),
    ToolbarContainer = require('./../../components/toolbar-container/toolbar-container.jsx'),
    DocToolBar = require('./../../components/doc-toolbar/doc-toolbar.jsx'),
    MenuToolBar = require('./../../mixin/menuToolBar.jsx'),
    styles = require('./tunnused-styles');

// Create a store
const docStore = require('../../stores/doc_store.js');

/**
 * Класс реализует документ справочника признаков.
 */
class Tunnused extends Documents {
/*
    constructor() {
        super();
        this.state = {
            userData: {userAccessList: null, asutus: '', userName: ''}
        };

/!*
        this.handleToolbarEvents = this.handleToolbarEvents.bind(this);
        this.validation = this.validation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
*!/
    }
*/

/*

    render() {

        const btnParams = {
            btnStart: {
                show: false
            }
        };

        return (
            <div>
                <span>{this.state.documentName}</span>
                {MenuToolBar(btnParams, this.state.userData)}
            </div>
        );
    }
*/

}

/*
Tunnused.propTypes = {
};
*/

module.exports = Tunnused;



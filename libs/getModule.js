const fs = require('fs');
const LIBRARY = '/libs/libraries/';
const moduleLocator = require('./../libs/moduleLocator.js')();
const path = require('path');
const config = require('../config/documents');

module.exports = (docTypeId, params, modelPath) => {


    let moduleInstance = moduleLocator.get(docTypeId);

    if (!moduleInstance) {
        // will return the instance of the model
        let folder,
            doc = docTypeId.toLowerCase();

        folder = path.join(modelPath, config[doc]);

        //module exist, we can register it
        moduleLocator.register(docTypeId, require(folder));
        moduleInstance = moduleLocator.get(docTypeId)
    }

    return moduleInstance;

}

function fileExists(path) {
    try {
        let stat = fs.statSync(path);
        if (stat) return true;
    } catch (e) {
        return false;
    }
}

'use strict';
const React = require('react'),
    ReactServer = require('react-dom/server'),
    async = require('async');


exports.get = function (req, res) {
    // рендер грида на сервере при первой загрузке странице
    const Register = require('../frontend/docs/doc-register/doc-register.jsx'),
        DocDataObject = require('../models/documents');

    let docs = [],
        lastIndex = 0,
        lastParams = [],
        parameter = 'DOK';


    if (!req.session.docs) {
        req.session.docs = [];
    } else {
        // есть сохраненна сессия, возмем параметры последнего запроса
        docs = req.session.docs;
        lastIndex = docs.length - 1;
        lastParams = docs[lastIndex];
        parameter = lastParams['parameter'];
    }



    let results = [], // {}
        user = require('../middleware/userData')(req),  // check for userid in session
        sortBy,
        sqlWhere,
        docId,
        components = [
            {name: 'docsList', data: [], value: parameter},
            {name: 'docsGrid', data: [], value: parameter, lastDocId: lastParams['docId'] || 0}
        ];

    async.forEach(components, (component, callback) => {
        // выполняем запрос
        let componentName = component.name;

        if (!parameter) {
            parameter = 'DOK';
        }

        DocDataObject[componentName].requery(parameter, callback, results, sortBy, sqlWhere, user);
        //       DocDataObject[componentName].requery(null, callback, results);
    }, (err) => {
        if (err) return new Error(err);

        components = components.map((component) => {
            component.data = results[component.name].data;
            if (docId && componentName == component.name) {
                component.lastDocId = docId; // ид последнего открытого документа
            }

            // отметим последний выбор на списке документов
            if (component.name == 'docsList' && parameter) {
                component.value = parameter;
            }

            return component;
        });

        const Component = React.createElement(
            Register,
            {id: 'grid', components: components}, 'Тут будут компоненты');

        try {
            let html = ReactServer.renderToString(Component);

            // передатим в хранилище данные
            let storeInitialData = JSON.stringify(components);

            res.render('documents', {
                "user": user,
                "store": storeInitialData
                , react: html
            });

        } catch (e) {
            console.error('error:', e);
            res.statusCode = 500;
        }

    });


};
'use strict';

exports.get = function (req, res) {
    var rows = [{id: 1, name: "row1/0", text: "Text 1"}, {id: 2, name: "row2-2", text: "Text 2"}, {
        id: 3,
        name: "row3",
        text: "Text 3"
    }, {id: 4, name: "row4", text: "Text 4"}];
    var columns = [{id: "id", name: "id", width: "50px"}, {id: "name", name: "name", width: "300px"}, {
        id: "text",
        name: "text",
        width: "400px"
    }];

    res.send({"gridColumns": columns, "gridData": rows});
};


exports.post = function (req, res) {
    //   console.log('api req.body', req.body);
    var docTypeId = req.body.docType,
        dataType = req.body.dataType, // тип запрашиваемых данных
        returnData = [],
        results = {},
        DocDataObject = require('../models/documents'),
        async = require('async'),
        components,
        user = require('../middleware/userData')(req), // данные пользователя
        parameter = req.body.parameter || '',// параметры если переданы
        lastDocId = req.body.lastDocId ? req.body.lastDocId : 0,
        sortBy = req.body.sortBy || '', //порядок сортировки
        sqlWhere = req.body.sqlWhere || ''; //динамический фильтр


    try {
        components = JSON.parse(req.body.components); // массив компонентов для запроса данных
    } catch (e) {
        console.error('parse error', e);
        res.statusCode = 500;
//        res.send();
    }

    console.log('api.post docType, components, sortBy:', docTypeId, components, sortBy, sqlWhere, parameter, lastDocId);

    req.session.docs = []; // очистим результаты предыдущего запроса

    async.forEach(components,(component, callback) => {
        // сохраним в сессии параметры запроса
        if (lastDocId) {
            req.session.docs.push({
                component: component.name,
                parameter: parameter,
                sortBy: sortBy,
                sqlWhere: sqlWhere,
                docId: lastDocId
            });
        }

        // выполняем запрос
        var componentName = component.name;
        DocDataObject[componentName].requery(parameter, callback, results, sortBy, sqlWhere, user);
    }, (err) => {
        if (err) return next(err);

        returnData = components.map(function (component) {
            component.data = results[component.name].data;
            component.lastDocId = lastDocId;

/*
            if (component.name == 'docsGrid') {
                let columns = component.data[0].columns,
                    data = component.data[0].data;
            }
*/
            return component;
        })

        console.log('returnData final:' ,returnData,  req.session.docs);
        res.send(returnData);
    });

}
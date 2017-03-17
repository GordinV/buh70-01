//'use strict';

exports.get = function(req, res) {
    // рендер грида на сервере при первой загрузке странице
    var React = require('react'),
        ReactServer = require('react-dom/server'),
        Parent = require('../frontend/components/doc-register.jsx'),
        DocDataObject = require('../models/documents'),
        async = require('async'),
        results = [], // {}
        user = require('../middleware/userData')(req),  // check for userid in session
        parameter,
        sortBy,
        sqlWhere,
        docId,
        components = [
            {name: 'docsList', data:[], value: ''},
            {name: 'docsGrid', data:[], value: 0}
            ];

    async.forEach(components, function(component, callback) {
        // выполняем запрос
        var componentName = component.name;

        // ищем параметры последнего запроса
//        req.session.docs.push({component:component.name, parameter: parameter, sortBy:sortBy, sqlWhere:sqlWhere});

        if (req.session.docs) {
//            console.log('routes documents session docs found', req.session.docs);
            // ищем в сессии наш компонент
            for (var i = 0; i < req.session.docs.length; i++) {
                if (req.session.docs[i]['component'] == componentName) {
                    // нашли, забираем параметры
                    parameter = req.session.docs[i].parameter;
                    sortBy = req.session.docs[i].sortBy;
                    sqlWhere = req.session.docs[i].sqlWhere;
                    docId = req.session.docs[i].docId;
                    break;
                }
            }
        }

        DocDataObject[componentName].requery(parameter, callback, results, sortBy, sqlWhere, user);
 //       DocDataObject[componentName].requery(null, callback, results);
    }, function(err) {
        if (err) return new Error(err);

        components = components.map(function(component) {
            component.data = results[component.name].data;
            if (docId && componentName == component.name) {
                component.value = docId; // ид последнего открытого документа
            }
            
            // отметим последний выбор на списке документов
            if (component.name == 'docsList' && parameter) {
                component.value = parameter;
            }

  //          console.log('component.data', component.data);
            if (component.name == 'docsGrid' && component.data[0].id == 'DOK' ) {
                component.data = []; // заглушка, проблему с рендером
            }

            return component;
        })

//        console.log('routes documents  components',  components);

        var Component = React.createElement(
            Parent,
            { id: 'grid', components: components}, 'Тут будут компоненты');

//        console.log('start Component',Component );

        try {
            var html = ReactServer.renderToString(Component);

            // передатим в хранилище данные
            var storeInitialData = JSON.stringify(components);
  //          console.log('start render',storeInitialData );

            res.render('documents', {
                "user": user,
                "store": storeInitialData
                ,react: html
            });

        } catch (e) {
            console.error('error:', e);
        }

    });


};
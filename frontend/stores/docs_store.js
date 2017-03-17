'use strict';
const flux = require('fluxify');

var docsStore = flux.createStore({
    id: 'docsStore',
    initialState: {
        docsGrid: 0,
        docsList: '',
        name: 'vlad',
        data: [],
        sortBy:[{column:'id', direction: 'desc'}],
        sqlWhere:'',
        systemMessage: null
    },
    actionCallbacks: {
        systemMessageChange: function(updater, value) {
            updater.set({systemMessage: value});
        },
        sqlWhereChange: function(updater, value) {
            updater.set({sqlWhere: value});
            requery({name: 'docsGrid', value: this.docsList});
        },
        sortByChange: function(updater, value) {
            updater.set({sortBy: value});
            requery({name: 'docsGrid', value: this.docsList, sortBy:value});
        },
        Add: function (updater) {
            console.log('button Lisa cliked new! ' + this.docsGrid);
            add(this.docsList);
        },
        Edit: function (updater) {
            if (this.docsList && this.docsGrid) {
                edit(this.docsList, this.docsGrid);
            } else {
                console.error('Тип документа или документ не выбран');
            }
        },
        Delete: function (updater) {
            let docTypeId = this.docsList;
            requeryForAction('delete', (err, data)=> {
                if (err) {
                    flux.doAction('systemMessageChange', err); // пишем изменения в хранилище
                } else {
                    flux.doAction('systemMessageChange', null); // пишем изменения в хранилище
                    requery({name: 'docsGrid', value: docTypeId});
                }
            });
        },
        Print: function (updater) {
            console.log('button Print cliked!');
        },
        changeName: function (updater, name) {
            // Stores updates are only made inside store's action callbacks
            updater.set({name: name});
        },
        docsGridChange: function (updater, value) {
            // Stores updates are only made inside store's action callbacks
            updater.set({docsGrid: value});
//            localStorage['docsGrid'] = value;

        },
        docsListChange: function (updater, value) {
            // Stores updates are only made inside store's action callbacks
            updater.set({docsList: value});
            requery({name: 'docsGrid', value: value});
//            localStorage['docsList'] = value;
        },
        dataChange: function (updater, value) {
            // Stores updates are only made inside store's action callbacks
 //           console.log('dataChange:', value);
            updater.set({data: value});
        },

    }
});


var edit = function (docTypeId, docId) {
    var url = "/document/" + docTypeId + docId;
    document.location.href = url;
};

var add = function (docTypeId) {
    var url = "/document/" + docTypeId + '0';
    document.location.href = url;
};

var requeryForAction = (action, callback)=> {
    if (!window.jQuery) return // для тестов

    if (!$) return
    // метод обеспечит запрос на выполнение
    let parameters = {
        docId : docsStore.docsGrid,
        doc_type_id : docsStore.docsList
    }

    $.ajax({
        url: '/api/doc',
        type:"POST",
        dataType: 'json',
        data: {
            action: action,
            data: JSON.stringify(parameters)
        },
        cache: false,
        success: function(data) {
            // должны получить объект - результат
            let errorMesssage = null;
            if (data.result == 'Error') {
                errorMesssage = 'Error, ' + data.message;
            }
            callback(errorMesssage,data);
        },
        error: function(xhr, status, err) {
            console.error('/error', status, err.toString());
            callback(err, null);
            }
    });
}

var requery = function (component) {
    if (!window.jQuery) return // для тестов

    // метод обеспечит получение данных от сервера
    // component = this.state.components[name]
    // если параметры не заданы, грузим все

    var components = docsStore.data;

    // фильтруем список компонентов
    var componentsForUpdate = components.filter(function (item) {
        // ищем объект по наименованию. или вернем все если параметр не задан
 //       console.log('component:' + JSON.stringify(component));
        if (component.name == '' || item.name == component.name) {
            return item.name;
        }
    });

    // сортировка
    var sqlSortBy = '',
        sqlWhere = docsStore.sqlWhere || '';
    var sortByArray = docsStore.sortBy,
        arrType = typeof sortByArray;
    if (docsStore.sortBy) {
        for(var i = 0; i < sortByArray.length; i++) {
            if (i > 0) {
                sqlSortBy = sqlSortBy +',';
            }
            sqlSortBy = sqlSortBy + sortByArray[i].column + ' '+ sortByArray[i].direction;
        }
    }

    const URL = '/api/docs';
    $.ajax({
        url: URL,
        type: "POST",
        dataType: 'json',

        data: {
            dataType: 'component',
            docTypeId: 1,
            components: JSON.stringify(componentsForUpdate), // компоненты для обновления
            parameter: component.value, // параметры
            sortBy: sqlSortBy, // сортировка
            sqlWhere: sqlWhere, // динамический фильтр грида
        },
        cache: false,
        success: function (data) {
            // должны получить объект
 //           console.log('parent arrived data:' + JSON.stringify(data) + 'тип:' + typeof data);

            data.forEach(function (item) {
                // find item
                //console.log('parent Item:' + JSON.stringify(item) );
                // обновим данные массива компонентов
                components = components.map(function (component) {
                    if (component.name == item.name) {
                        // found
                        component.data = item.data;
                    }
                    return component;
                });

            });
//            console.log('store data update:' + JSON.stringify(components));
            flux.doAction('dataChange', components);

        }.bind(this),
        error: function (xhr, status, err) {
            console.error('/error', status, err.toString());
        }.bind(this)
    });

};

module.exports = docsStore;
var flux = require('fluxify');

var docsStore = flux.createStore({
    id: 'docsStore',
    initialState: {
        docsGrid: 0,
        docsList: '',
        name: 'vlad',
        data: [],
        sortBy:[{column:'id', direction: 'desc'}],
        sqlWhere:'',
        tooglePanel: true, // opened
        tooglePanelData: {tree: '10%', grid:'90%', left: '13%'}, // opened
    },
    actionCallbacks: {
        sqlWhereChange: function(updater, value) {
            console.log('sqlWhereChange called', value);
            updater.set({sqlWhere: value});
            requery({name: 'docsGrid', value: this.docsList});
        },
        sortByChange: function(updater, value) {
            updater.set({sortBy: value});
            requery({name: 'docsGrid', value: this.docsList, sortBy:value});
        },
        tooglePanelChange: function(updater, value, data) {
            updater.set({tooglePanel:value,tooglePanelData: data })
        },
        Add: function (updater) {
            console.log('button Lisa cliked new! ' + this.docsGrid);
            add(this.docsList);
        },
        Edit: function (updater) {
            console.log('button Muuda cliked!');
            if (this.docsList && this.docsGrid) {
                edit(this.docsList, this.docsGrid);
            } else {
                console.log('Тип документа или документ не выбран');
            }
        },
        Delete: function (updater) {
            console.log('button Delete cliked!');
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
            console.log('store docsGridChange called', value);
            updater.set({docsGrid: value});
            localStorage['docsGrid'] = value;

        },
        docsListChange: function (updater, value) {
            // Stores updates are only made inside store's action callbacks
            updater.set({docsList: value});
            requery({name: 'docsGrid', value: value});
            localStorage['docsList'] = value;
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
    console.log('Add');
    var url = "/document/" + docTypeId + '0';
    document.location.href = url;
};

var requery = function (component) {
    // метод обеспечит получение данных от сервера
    // component = this.state.components[name]
    // если параметры не заданы, грузим все

//    console.log('requery:' + JSON.stringify(component) + 'docsStore.data:' + JSON.stringify(docsStore.data));

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
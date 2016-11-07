
'use strict';
debugger;
let kpv = new Date('2016-11-06');
console.log('type:', typeof kpv, kpv);

/*
let components = {
    refs: {
        kpv: {
            state: {
                value: null
            },
            props: {
                title: 'Kuupäev'
            }
        },
        tahtaeg: {
            state: {
                value: null
            },
            props: {
                title: 'tahtaeg'
            }
        },
        asutusid : {
            state: {
                value: 0
            },
            props: {
                title: 'asutusid'
            }

        },
        summa : {
            state: {
                value: 0
            },
            props: {
                title: 'summa'
            }

        }
    }},
    now = new Date,
    fields =  [
        {
            name: 'kpv',
            type: 'D',
            min: now.setFullYear(now.getFullYear() - 1),
            max: now.setFullYear(now.getFullYear() + 1)
        },
        {
            name: 'tahtaeg',
            type: 'D',
            min: now.setFullYear(now.getFullYear() - 1),
            max: now.setFullYear(now.getFullYear() + 1)
        },
        {name: 'asutusid', type: 'N', min:null, max:null},
        {name: 'summa', type: 'N', min:-9999999, max:999999}
        ];

fields.forEach((field) => {
    console.log('field', field);
    let obj = components.refs[field.name];
    console.log('obj', obj);
})

*/

/*

const async = require('async');

let tasks = [
    'start', 'execute', 'finish'
];

let chain = Promise.resolve(),
    results = [];

// в цикле добавляем задачи в цепочку
tasks.forEach(function(task) {
    chain = chain
        .then(() => executePromise(task))
        .then((result) => {
            results.push(result);
        });
});

// в конце — выводим результаты
chain.then(() => {
    console.log('results:', results);
});

let executePromise = ((task) => {
    console.log('task:', task);
    return eval(task + '(1,2)');
})


function start(param1, param2) {
    return new Promise((resolve, reject) => {
            console.log('start', param1, param2);
            return resolve('Ok');

    })
};

function execute(param1, param2) {
    return new Promise((resolve, reject) => {
        console.log('execute', param1, param2);
        return resolve('Ok');

    })
};


function finish(param1, param2)  {
    return new Promise((resolve, reject) => {
        console.log('finish', param1, param2);
        return resolve('Ok');

    })
};
*/

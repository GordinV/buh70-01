'use strict';

var taskParams = {
    params: {
            tasks: [],
            docId: 114,
            userId: 1
            },
    userId: 1
    };



const executeTask = (docTypeId, params)=> {
    // запустит переданные методы в моделе
    debugger;
    var doc = require('../models/' + docTypeId),
        tasks = params.params.tasks,
        docId = params.params.docId,
        userId = params.userId;
    console.log('model executeTask', params, tasks);
    doc.executeTask(tasks, docId, userId)
        .then(data => {
            console.log('data:', data);
        })
}
executeTask('arv',taskParams );

/*
const sqlExecute = ()=> {
  return new Promise((resolved, rejected) => {
      db.connect((err)=> {
          if (err) {
              console.error('could not connect to postgres', err);
                rejected(err);
          }

          db.query(sqlString, sqlParams, (err, result)=> {
              if (err) {
                  console.error('sql error:' + JSON.stringify(err));
                  rejected(err);
              }
              db.end();
              console.log('result:' + JSON.stringify(result));
              resolved(result);
//        callback(err, result);
          });
      });
  })  
};


var selectDocPromise = (docTypeId, params) => {
        const doc = require('../models/' + docTypeId),
            sql = doc.select;

        let docBpm = [], // БП документа
            returnData = doc.returnData;

        if  (doc.bpm) {
            docBpm = doc.bpm;
        }

        console.log('selectDocPromise docTypeId, params: ', docTypeId, params)

        // выполним запрос
        if (typeof sql === 'object') {
            console.log('object');
            return Doc.executeSqlQueriesPromise(sql, params, returnData);
        } else {
            return Doc.executeSqlQueryPromise(sql, params, returnData);
        }
}


selectDocPromise('ARV', [23])
    .then((data)=> {
        console.log('data:', data);
    }),
    ((err) => {
        console.error('viga:', err);
    });


/*
co( function *() {
    data = yield sqlExecute();
    console.log('data:', data);

});

    co(
    function *() {
        console.log('start');
        data = yield selectDocPromise('nomenclature', null)
        console.log('data:', data);

    });
 */

/*

db.task((t) => {
    return t.any('select * from docs.doc order by id desc limit $1', 10)
        .then((records) => {
            console.log('go records:', records)
            }
        )
        .catch((err)=> {
            console.error('error:',error.message || error);
        })
});
*/

/*
    var DocDataObject = require('../models/arv'),
        bpm = DocDataObject.bpm,
        bpmStepsLength = bpm.length,
        newBpmData = {};

    console.log ('bpm',bpmStepsLength, bpm)

    debugger;

    bpm.forEach ((step, i) => {
        newBpmData = DocDataObject.setBpmStatuses(0, 1, 'finished');
        console.log('step', i, newBpmData);
 })

 */
 /*

Promise.all([start]).then(value => {
    console.log(value);
}, function(reason) {
    console.log(reason)
});
*/




// var p1 = start();
/*

Promise.all([eval('start()')]).then(value => {
    console.log(value);
}, function(reason) {
    console.log(reason)
});




 function start() {
 console.log('start 1');
 return new Promise((resolved, reject) => {
 console.log('start 2');
         resolved('Ok');
 //reject('err');
 })
 }

*/





/*
var p1 = new Promise((resolve, reject) => {
    console.log('start 1');
    setTimeout(resolve, 1000, "one");
});
*/


/*


var p2 = new Promise((resolve, reject) => {
    console.log('start 2');
    setTimeout(resolve, 2000, "two");
});
var p3 = new Promise((resolve, reject) => {
    console.log('start 3');

    setTimeout(resolve, 3000, "three");
});
var p4 = new Promise((resolve, reject) => {
    console.log('start 4');

    setTimeout(resolve, 4000, "four");
});
var p5 = new Promise((resolve, reject) => {
    console.log('start 5');

    reject("reject");
});
*/
/*

Promise.all([p1, p2, p3, p4]).then(value => {
    console.log(value);
}, function(reason) {
    console.log(reason)
});

*/

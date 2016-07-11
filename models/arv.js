'use strict';
var co = require('co');
var Arv =  {
    select: [
        {
            sql: "select d.id, to_char(created, 'DD.MM.YYYY HH:MM:SS')::text as created, to_char(lastupdate,'DD.MM.YYYY HH:MM:SS')::text as lastupdate, d.bpm, " +
            " trim(l.nimetus) as doc, trim(l.kood) as doc_type_id," +
            " trim(s.nimetus) as status, " +
            " trim(a.number) as number, a.summa, a.rekvId, a.liik, a.operid, to_char(a.kpv,'YYYY-MM-DD') as kpv, " +
            " a.asutusid, a.arvId, trim(a.lisa) as lisa, to_char(a.tahtaeg,'YYYY-MM-DD') as tahtaeg, a.kbmta, a.kbm, a.summa, " +
            " a.tasud, trim(a.tasudok) as tasudok, a.muud, a.jaak, a.objektId, trim(a.objekt) as objekt, " +
            " asutus.regkood, trim(asutus.nimetus) as asutus " +
            " from docs.doc d " +
            " inner join libs.library l on l.id = d.doc_type_id " +
            " inner join docs.arv a on a.parentId = d.id " +
            " left outer join libs.library s on s.library = 'STATUS' and s.kood = d.status::text " +
            " inner join libs.asutus as asutus on asutus.id = a.asutusId " +
            " where d.id = $1",
            sqlAsNew: "select $1::integer as id, to_char(now(), 'DD.MM.YYYY HH:MM:SS')::text as created, to_char(now(), 'DD.MM.YYYY HH:MM:SS')::text as lastupdate, null as bpm," +
            " trim(l.nimetus) as doc, trim(l.kood) as doc_type_id, " +
            " trim(s.nimetus) as status, " +
            " trim('zzzz') as number, 0.00 as summa, null as rekvId, 0 as liik, null as operid, to_char(now(),'YYYY-MM-DD') as kpv," +
            " null as asutusid, null as arvId, null as lisa, to_char(now()  + interval '14 days','YYYY-MM-DD') as tahtaeg, null as kbmta, 0.00::numeric as kbm, null as summa," +
            " null as tasud, null as tasudok, null as muud, 0.00 as jaak, null as objektId, null as objekt, " +
            " null as regkood, null as asutus " +
            " from libs.library l,   libs.library s " +
            " where l.library = 'DOK' and l.kood = 'ARV' " +
            " and s.library = 'STATUS' and s.kood = '0'",
            query: null,
            multiple: false,
            alias: 'row',
            data: []
        },
        {
            sql: "select a1.id, a1.nomid, a1.kogus, a1.hind, a1.kbm, a1.kbmta, a1.summa, a1.kood1," +
            " trim(n.kood) as kood, trim(n.nimetus) as nimetus " +
            " from docs.arv1 as a1 " +
            " inner join docs.arv a on a.id = a1.parentId " +
            " inner join libs.nomenklatuur n on n.id = a1.nomId " +
            " where a.parentid = $1",
            query: null,
            multiple: true,
            alias: 'details',
            data: []
        },
        {
            sql: "select rd.id,trim(l.kood) as doc_type, trim(l.nimetus) as name " +
                    " from docs.doc d " +
                    " left outer join docs.doc rd on rd.id in (select unnest(d.docs_ids)) " +
                    " left outer join libs.library l on rd.doc_type_id = l.id " +
                    " where d.id = $1",
            query: null,
            multiple: true,
            alias: 'relations',
            data: []
        }

    ],
    returnData: {
        row: {},
        details: [],
        relations: [],
        gridConfig: [
            {id: 'id', name: 'id', width: '0px', show: false, type: 'text', readOnly: true},
            {id: 'nomid', name: 'nomId', width: '0px', show: false, type: 'text', readOnly: false},
            {
                id: 'kood',
                name: 'Kood',
                width: '100px',
                show: true,
                type: 'select',
                readOnly: false,
                dataSet: 'nomenclature',
                valueFieldName: 'nomid'
            },
            {id: 'nimetus', name: 'Nimetus', width: '300px', show: true, readOnly: true},
            {id: 'hind', name: 'Hind', width: '100px', show: true, type: 'number', readOnly: false},
            {id: 'kogus', name: 'kogus', width: '100px', show: true, type: 'number', readOnly: false},
            {id: 'kbm', name: 'Käibemaks', width: '100px', show: true, type: 'number', readOnly: false},
            {id: 'summa', name: 'Summa', width: '100px', show: true, type: 'number', readOnly: false}
        ]
    },
    saveDoc: "select docs.sp_salvesta_arv($1, $2, $3) as id",
    bpm:[
        {step:0, name: 'Регистация документа',action:'register', nextStep:1, task: 'human', data:[], status:null, actualStep:false},
        {step:1, name: 'Расчет сальдо',action:'calcDocumentSaldo', nextStep:2, task: 'human', data:[], status:null, actualStep:false},
        {step:2, name:'Контировка', action: 'generateJournal', nextStep:3, task:'human', data:[], status:null, actualStep:false},
        {step:3, name:'Оплата', action: 'tasumine', nextStep:4, task:'human', data:[], status:null, actualStep:false},
        {step:4, name:'Конец', action: 'lopp', nextStep:null, task:'automat', data:[], status:null, actualStep:false}
    ],
    register: {command: "update docs.doc set status = 1 where id = $1", type:"sql"},
    calcDocumentSaldo: {command:"select docs.sp_updatearvjaak($1)", type:"sql"},
    generateJournal: {command: "select docs.gen_lausend_arv($1)", type:"sql"},
    executeTask: function(tasks, docId, userId, callback) {
        // выполнит набор задач, переданных в параметре
        console.log('arv executeTask', tasks, docId);
        var taskFunctions = tasks.map((task)=> {return eval(task + '(docId, userId)')});

        Promise.all(taskFunctions).then((result)=> {
                callback(null, result[0]);
            },
            (error) => {
                callback(error, null);
            });
    }
}

module.exports = Arv;

function start(docId, userId) {
    return new Promise((resolved, reject) => {
        console.log('start', docId, userId);
        var sql = 'update docs.doc set status = $1, bpm = $2 where id = $3',
            bpm = setBpmStatuses(0),
            bpmStepData = bpm[0].data;
        
        bpmStepData = [{execution: Date.now(), executor: userId, vars: null}];
//        bpmNextStep.
        bpm[0].data = bpmStepData;
        bpm[0].status = 'finished';

        // выставим актуальный статус для следующего процесса

        var  params = [1,JSON.stringify(bpm), docId];

        // 1. меняем статус на 1
        // 2. копируем БП
        // 3. апдейтим данные

        co(function*() {
            let result = yield executeSql(sql, params);
            console.log('results:' ,result); // 1
            // 3. запускаем БП и идем до первой "человечьей" задачи

        }).catch(function(err) {
            console.log('co catched error', err)
            reject(error)
        });

        resolved('Ok');

    })
}

function setBpmStatuses(actualStepIndex) {
    let bpm = Arv.bpm,
        bpmStepData = bpm[actualStepIndex].data,
        nextStep = bpm[actualStepIndex].nextStep,
        nextStepIndex;

    bpmStepData = [{execution: Date.now(), executor: userId, vars: null}];
    bpm[actualStepIndex].data = bpmStepData;
    bpm[actualStepIndex].status = 'finished';

    // выставим флаг на следующий щаг
    bpm = bpm.map(data, index => {

        if (data.step == nextStep) {
            data.actualStep = true;
            data.status = 'opened';
        }
        return data;
    });
    return bpm;

}

function executeSql(sql, params) {
    console.log('executeSql', sql, params);
    return new Promise((resolve, reject) => {
        let DocDataObject = require('./documents');

        DocDataObject.executeSqlQuery(sql, params, (err , data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })

    });

}



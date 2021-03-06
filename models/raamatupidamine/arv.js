'use strict';
//var co = require('co');
let now = new Date();
const start = require('./../BP/start'),
    generateJournal = require('./../BP/generateJournal'),
    endProcess = require('./../BP/endProcess');

const Arv = {
    select: [
        {
            sql: `select d.id, $2::integer as userid, to_char(created, 'DD.MM.YYYY HH:MM:SS')::text as created, to_char(lastupdate,'DD.MM.YYYY HH:MM:SS')::text as lastupdate, d.bpm, 
                 trim(l.nimetus) as doc, trim(l.kood) as doc_type_id,
                 trim(s.nimetus) as status, d.status as doc_status,
                 trim(a.number) as number, a.summa, a.rekvId, a.liik, a.operid, to_char(a.kpv,'YYYY-MM-DD') as kpv, 
                 a.asutusid, a.arvId, trim(a.lisa) as lisa, to_char(a.tahtaeg,'YYYY-MM-DD') as tahtaeg, a.kbmta, a.kbm, a.summa, 
                 a.tasud, trim(a.tasudok) as tasudok, a.muud, a.jaak, a.objektId, trim(a.objekt) as objekt, 
                 asutus.regkood, trim(asutus.nimetus) as asutus, 
                 a.doklausid, a.doklausid,dp.selg as dokprop 
                 from docs.doc d 
                 inner join libs.library l on l.id = d.doc_type_id 
                 inner join docs.arv a on a.parentId = d.id 
                 left outer join libs.library s on s.library = 'STATUS' and s.kood = d.status::text 
                 inner join libs.asutus as asutus on asutus.id = a.asutusId 
                 inner join ou.userid u on u.id = $2::integer 
                 left outer join libs.dokprop dp on dp.id = a.doklausid 
                 where d.id = $1`,
            sqlAsNew: `select $1::integer as id, $2::integer as userid,  
                    to_char(now(), 'DD.MM.YYYY HH:MM:SS')::text as created, 
                    to_char(now(), 'DD.MM.YYYY HH:MM:SS')::text as lastupdate, null as bpm,
                 trim(l.nimetus) as doc, trim(l.kood) as doc_type_id, 
                 trim(s.nimetus) as status, 0 as doc_status, 
                 docs.sp_get_number(u.rekvId, 'ARV', year(date()), null) as number, 0.00 as summa, 
                 null as rekvId, 0 as liik, null as operid, to_char(now(),'YYYY-MM-DD') as kpv,
                 null as asutusid, null as arvId, null as lisa, to_char(now()  + interval '14 days','YYYY-MM-DD') as tahtaeg, null as kbmta, 0.00::numeric as kbm, null as summa,
                 null as tasud, null as tasudok, null as muud, 0.00 as jaak, null as objektId, null as objekt, 
                 null as regkood, null as asutus, null::integer as doklausid, null::text as  dokprop 
                 from libs.library l,   libs.library s, ou.userid u  
                 where l.library = 'DOK' and l.kood = 'ARV' 
                 and u.id = $2::integer 
                 and s.library = 'STATUS' and s.kood = '0'`,
            query: null,
            multiple: false,
            alias: 'row',
            data: []
        },
        {
            sql: `select a1.id, $2::integer as userid, a1.nomid, a1.kogus, a1.hind, a1.kbm, a1.kbmta, a1.summa, a1.kood1,
                 trim(n.kood) as kood, trim(n.nimetus) as nimetus 
                 from docs.arv1 as a1 
                 inner join docs.arv a on a.id = a1.parentId 
                 inner join libs.nomenklatuur n on n.id = a1.nomId 
                 inner join ou.userid u on u.id = $2::integer 
                 where a.parentid = $1::integer`,
            query: null,
            multiple: true,
            alias: 'details',
            data: []
        },
        {
            sql: `select rd.id, $2::integer as userid, trim(l.kood) as doc_type, trim(l.nimetus) as name 
                 from docs.doc d 
                 left outer join docs.doc rd on rd.id in (select unnest(d.docs_ids)) 
                 left outer join libs.library l on rd.doc_type_id = l.id 
                 inner join ou.userid u on u.id = $2::integer 
                 where d.id = $1::integer`,
            query: null,
            multiple: true,
            alias: 'relations',
            data: []
        }

    ],
    grid: {
        gridConfiguration: [
            {id: "id", name: "id", width: "25px", show: false},
            {id: "number", name: "Number", width: "100px"},
            {id: "kpv", name: "Kuupaev", width: "100px"},
            {id: "summa", name: "Summa", width: "75px"},
            {id: "tahtaeg", name: "Tähtaeg", width: "100px"},
            {id: "jaak", name: "Jääk", width: "100px"},
            {id: "tasud", name: "Tasud", width: "100px"},
            {id: "asutus", name: "Asutus", width: "200px"},
            {id: "created", name: "Lisatud", width: "150px"},
            {id: "lastupdate", name: "Viimane parandus", width: "150px"},
            {id: "status", name: "Staatus", width: "100px"},
        ],
        sqlString: `select d.id, trim(a.number) as number, to_char(a.kpv,'DD.MM.YYYY') as kpv, a.summa, 
        to_char(a.tahtaeg,'DD.MM.YYYY') as tahtaeg, a.jaak, to_char(a.tasud,'DD.MM.YYYY') as tasud,
         trim(asutus.nimetus) as asutus,
         to_char(d.created,'DD.MM.YYYY HH:MM') as created, to_char(d.lastupdate,'DD.MM.YYYY HH:MM') as lastupdate,
         trim(s.nimetus) as status 
         from docs.doc d 
         inner join docs.arv a on a.parentId = d.id
         inner join libs.library s on s.kood = d.status::text
         left outer join libs.asutus asutus on a.asutusid = asutus.id 
         where d.rekvId = $1 
         and docs.usersRigths(d.id, 'select', $2)`,     //  $1 всегда ид учреждения $2 - всегда ид пользователя
        params: '',
    },
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
    saveDoc: `select docs.sp_salvesta_arv($1, $2, $3) as id`,
    deleteDoc: `select error_code, result, error_message from docs.sp_delete_arv($1, $2)`, // $1 - userId, $2 - docId
    requiredFields: [
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
        {name: 'asutusid', type: 'N', min: null, max: null},
        {name: 'summa', type: 'N', min: -9999999, max: 999999}
    ],
    bpm: [
        {
            step: 0,
            name: 'Регистация документа',
            action: 'start',
            nextStep: 1,
            task: 'human',
            data: [],
            actors: [],
            status: null,
            actualStep: false
        },
        {
            step: 1,
            name: 'Контировка',
            action: 'generateJournal',
            nextStep: 2,
            task: 'automat',
            data: [],
            status: null,
            actualStep: false
        },
//        {step:2, name:'Оплата', action: 'tasumine', nextStep:3, task:'human', data:[], status:null, actualStep:false},
        {
            step: 2,
            name: 'Конец',
            action: 'endProcess',
            nextStep: null,
            task: 'automat',
            data: [],
            actors: [],
            status: null,
            actualStep: false
        }
    ],
    register: {command: `update docs.doc set status = 1 where id = $1`, type: "sql"},
    generateJournal: {command: "select docs.gen_lausend_arv($1, $2)", type: "sql"},
    endProcess: {command: "update docs.doc set status = 2 where id = $1", type: "sql"},
    executeTask: function (task, docId, userId) {
        console.log('executeTask', task, docId, userId);
        // выполнит задачу, переданную в параметре

        let executeTask = task;
        if (executeTask.length == 0) {
            executeTask = ['start'];
        }

        let taskFunction = eval(executeTask[0]);
        return taskFunction(docId, userId, this);
    }
}

module.exports = Arv;


module.exports = {
    select: [
        {
            sql: "select d.id,  d.docs_ids, (created::date || 'T' || created::time)::text as created, (lastupdate::date || 'T' || lastupdate::time)::text as lastupdate, d.bpm, "+
                " trim(l.nimetus) as doc, trim(l.kood) as doc_type_id, " +
                " trim(s.nimetus) as status, " +
                " k.number as number, k.summa, " + 
                " k.kassaid as kassa_id, trim(aa.nimetus) as kassa, " +
                " k.rekvId, to_char(k.kpv,'YYYY-MM-DD') as kpv, k.asutusid,  trim(k.dokument) as dokument, k.alus, k.muud, k.nimi, k.aadress, k.tyyp, " +
                " asutus.regkood, trim(asutus.nimetus) as asutus, " +
                " k.arvid, ('Number:' || arv.number::text || ' Kuupäev:' || arv.kpv::text || ' Jääk:' || arv.jaak::text) as arvnr " +
                " from docs.doc d " +
                " inner join libs.library l on l.id = d.doc_type_id " +
                " inner join docs.korder1 k on k.parentId = d.id " +
                " left outer join libs.library s on s.library = 'STATUS' and s.kood = d.status::text " +
                " left outer join libs.asutus as asutus on asutus.id = k.asutusId  " +
                " left outer join ou.aa as aa on k.kassaid = aa.Id " +
                " left outer join docs.arv as arv on k.arvid = arv.Id " +
                " where d.id = $1",
            sqlAsNew: "select $1::integer as id, (now()::date || 'T' || now()::time)::text as created, (now()::date || 'T' || now()::time)::text as lastupdate, null as bpm," +
            " trim(l.nimetus) as doc, trim(l.kood) as doc_type_id, " +
            " trim(s.nimetus) as status, " +
            " (select max(number) from docs.korder1 where tyyp = 1 )::integer + 1  as number,  0 as summa, " +
            " aa.id as kassa_id, trim(aa.name) as kassa, "+
            " null as rekvId,  to_char(now(),'YYYY-MM-DD') as kpv, " +
            " null as asutusid, null as dokument, null as alus, null as muud, null as nimi, null as aadress,1 as  tyyp, 0 as summa,  null as regkood, null as asutus, "+
            " null as arvid, null as arvnr " +
            " from libs.library l,   libs.library s, (select id, trim(nimetus) as name from ou.aa where kassa = 1 order by default_ limit 1) as aa " +
            " where l.library = 'DOK' and l.kood = 'SORDER'" +
            " and s.library = 'STATUS' and s.kood = '0'",
            query: null,
            multiple: false,
            alias: 'row',
            data: []
        },
        {
            sql: "select trim(n.kood) as kood, trim(n.nimetus) as nimetus, trim(n.uhik) as uhik, k1.* " +
                " from docs.korder2 as k1 " +
                " inner join docs.korder1 k on k.id = k1.parentId " +
                " inner join libs.nomenklatuur n on n.id = k1.nomid "+
                " where k.parentid = $1",
            query: null,
            multiple: true,
            alias: 'details',
            data: []
        },
        {
            sql: "select rd.id, trim(l.kood) as doc_type, trim(l.nimetus) as name " +
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
        gridConfig: [
            {id: 'id', name: 'id', width: '0px', show: false, type: 'text', readOnly: true},
            {id: 'nimetus', name: 'Nimetus', width: '100px', show: true, type: 'text', readOnly: false},
            {id: 'summa', name: 'Summa', width: '100px', show: true, type: 'number', readOnly: false},
            {id: 'tunnus', name: 'Tunnus', width: '100px', show: true, type: 'text', readOnly: false},
            {id: 'proj', name: 'Projekt', width: '100px', show: true, type: 'text', readOnly: false}
        ]
    },
    saveDoc: "select docs.sp_salvesta_korder($1, $2, $3) as id",
    bpm:[
        {step:0, name: 'Регистация документа',action:'register', nextStep:1, task: 'human'}, 
        {step:1, name:'Контировка', action: 'human', nextStep:2, task:'human'},
        {step:2, name:'Крнец', action: 'finish', nextStep:null, task:'automat'}
    ]

}

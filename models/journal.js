var now = new Date();
module.exports = {
    select: [
        {
            sql: "select d.id, $2::integer as userid, d.docs_ids, (created::date || 'T' || created::time)::text as created, (lastupdate::date || 'T' || lastupdate::time)::text as lastupdate, d.bpm, "+
                " trim(l.nimetus) as doc, trim(l.kood) as doc_type_id, "+
                " trim(s.nimetus) as status, "+
                " jid.number as number, " +
                " j.rekvId, to_char(j.kpv,'YYYY-MM-DD') as kpv, j.asutusid,  trim(j.dok) as dok, j.selg, j.muud, " +
                " (select sum(j1.summa) as summa from docs.journal1 as j1 where parentid = j.id) as summa, " +
                " asutus.regkood, trim(asutus.nimetus) as asutus " +
                " from docs.doc d " +
                " inner join libs.library l on l.id = d.doc_type_id " +
                " inner join docs.journal j on j.parentId = d.id " +
                " inner join ou.userid u on u.id = $2::integer " +
                " left outer join docs.journalid jid on j.Id = jid.journalid " +
                " left outer join libs.library s on s.library = 'STATUS' and s.kood = d.status::text "+
                " left outer join libs.asutus as asutus on asutus.id = j.asutusId  " +
                " where d.id = $1",
            sqlAsNew: "select $1::integer as id, (now()::date || 'T' || now()::time)::text as created, (now()::date || 'T' || now()::time)::text as lastupdate, null as bpm," +
            " trim(l.nimetus) as doc, trim(l.kood) as doc_type_id, " +
            " trim(s.nimetus) as status, " +
            " trim('') as number,  null as rekvId,  to_char(now(),'YYYY-MM-DD') as kpv, " +
            " null as asutusid, null as dok, null as selg, null as muud, 0 as summa,  null as regkood, null as asutus "+
            " from libs.library l,   libs.library s, ou.userid u " +
            " where l.library = 'DOK' and l.kood = 'JOURNAL'" +
            " and u.id = $2::integer " +
            " and s.library = 'STATUS' and s.kood = '0'",
            query: null,
            multiple: false,
            alias: 'row',
            data: []
        },
        {
            sql: "select j1.*, $2::integer as userid " +
                    " from docs.journal1 as j1 "+
                    " inner join docs.journal j on j.id = j1.parentId "+
                    " inner join ou.userid u on u.id = $2::integer "+
                    " where j.parentid = $1",
            query: null,
            multiple: true,
            alias: 'details',
            data: []
        },
        {
            sql: "select rd.id, $2::integer as userid, trim(l.kood) as doc_type, trim(l.nimetus) as name " +
            " from docs.doc d " +
            " left outer join docs.doc rd on rd.id in (select unnest(d.docs_ids)) " +
            " left outer join libs.library l on rd.doc_type_id = l.id " +
            " inner join ou.userid u on u.id = $2::integer " +
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
            {id: 'deebet', name: 'Deebet', width: '100px', show: true, type: 'text', readOnly: false},
            {id: 'kreedit', name: 'Kreedit', width: '100px', show: true, type: 'text', readOnly: false},
            {id: 'summa', name: 'Summa', width: '100px', show: true, type: 'number', readOnly: false},
            {id: 'tunnus', name: 'Tunnus', width: '100px', show: true, type: 'text', readOnly: false},
            {id: 'proj', name: 'Projekt', width: '100px', show: true, type: 'text', readOnly: false}

            /*
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
*/
        ]
    },
    requiredFields: [
        {
            name: 'kpv',
            type: 'D',
            min: now.setFullYear(now.getFullYear() - 1),
            max: now.setFullYear(now.getFullYear() + 1)
        },
        {name: 'selg', type: 'C'},
        {name: 'summa', type: 'N'}
    ],
    saveDoc: "select docs.sp_salvesta_journal($1, $2, $3) as id"

}

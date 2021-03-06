module.exports = {
    selectAsLibs: "select id, trim(kood) as kood, trim(nimetus) as name from libs.library where library = 'PROJ' order by kood",
    select: [{
        sql: `select l.*, $2::integer as userid, 'PROJECT' as doc_type_id
                from libs.library l 
                where l.id = $1`,
        sqlAsNew: `select  $1::integer as id , $2::integer as userid, 'PROJECT' as doc_type_id,
            null::text as  kood,
            null::integer as rekvid,
            null::text as nimetus,
            'PROJ'::text as library,
            null::text as muud,
            null::text as properties`,
        query: null,
        multiple: false,
        alias: 'row',
        data: []
    }],
    returnData: {
        row: {}
    },
    requiredFields: [
        {name: 'kood',type: 'C'},
        {name: 'nimetus',type: 'C'},
        {name: 'library',type: 'C'}
    ],
    saveDoc: `select libs.sp_salvesta_library($1, $2, $3) as id`, // $1 - data json, $2 - userid, $3 - rekvid
    deleteDoc: `select error_code, result, error_message from libs.sp_delete_library($1::integer, $2::integer)`, // $1 - userId, $2 - docId
    grid: {
        gridConfiguration: [
            {id: "id", name: "id", width: "10%", show: false},
            {id: "kood", name: "Kood", width: "25%"},
            {id: "nimetus", name: "Nimetus", width: "35%"}
        ],
        sqlString: `select id, kood, nimetus,  $2::integer as userId
            from libs.library l
            where l.library = 'PROJ'
            and (l.rekvId = $1 or l.rekvid is null)`,     //  $1 всегда ид учреждения $2 - всегда ид пользователя
        params: ''
    },

}

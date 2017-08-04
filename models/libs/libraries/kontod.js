module.exports = {
    select: [{
        sql: `select case when l.tun5 = 1 then 'SD' when l.tun5 = 2 then 'SK' when l.tun5 = 3 then 'D' when l.tun5 = 4 then 'K' else null end::text as konto_tyyp, 
                l.*, $2::integer as userid, 'KONTOD' as doc_type_id, l.tun5 as tyyp 
                from libs.library l 
                where id = $1`,
        sqlAsNew: `select  'SD'::text as konto_tyyp, 
            $1::integer as id , $2::integer as userid, 'KONTOD' as doc_type_id,
            null::text as  kood,
            null::text as nimetus,
            'KONTOD'::text as library,
            null::integer as tun1,
            null::integer as tun2,
            null::integer as tun3,
            null::integer as tun4,
            2 as tyyp,
            null::text as muud,
            null::text as properties`,
        query: null,
        multiple: false,
        alias: 'row',
        data: []
    }],
    selectAsLibs: `select id, trim(kood) as kood, trim(kood) || ' ' || trim(nimetus) as name from libs.library where library = 'KONTOD' order by kood`,
    returnData: {
        row: {}
    },
    requiredFields: [
        {
            name: 'kood',
            type: 'C'
        },
        {
            name: 'nimetus',
            type: 'C'
        }
    ],

    saveDoc: `select libs.sp_salvesta_konto($1, $2, $3) as id`, // $1 - data json, $2 - userid, $3 - rekvid
    deleteDoc: `select error_code, result, error_message from libs.sp_delete_konto($1, $2)`, // $1 - userId, $2 - docId
    grid: {
        gridConfiguration: [
            {id: "id", name: "id", width: "10%", show: false},
            {id: "kood", name: "Kood", width: "25%"},
            {id: "nimetus", name: "Nimetus", width: "35%"},
            {id: "konto_tyyp", name: "Konto tüüp", width: "20%"}
        ],
        sqlString: `select id, kood, nimetus,  $2::integer as userId,
            case when l.tun5 = 1 then 'SD' when l.tun5 = 2 then 'SK' when l.tun5 = 3 then 'D' when l.tun5 = 4 then 'K' else null end::text as konto_tyyp
            from libs.library l
            where library = 'KONTOD' 
            and (l.rekvId = $1 or l.rekvid is null)`,     //  $1 всегда ид учреждения $2 - всегда ид пользователя
        params: ''
    },

}

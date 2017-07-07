module.exports = {
    select: `select id, trim(nimetus) as name from libs.asutus`,
    grid: {
        gridConfiguration: [
            {id: "id", name: "id", width: "10%", show: false},
            {id: "regkood", name: "Reg.kood", width: "25%"},
            {id: "nimetus", name: "Nimetus", width: "35%"},
            {id: "omvorm", name: "Om.vorm", width: "20%"},
            {id: "aadress", name: "Aadress", width: "25%"}
        ],
        sqlString: `select id, regkood, nimetus, omvorm, aadress, $2::integer as userId
            from libs.asutus a
            where (a.rekvId = $1 or a.rekvid is null)
            limit 100`,     //  $1 всегда ид учреждения $2 - всегда ид пользователя
        params: ''
    },
}
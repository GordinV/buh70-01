module.exports = {
    select: "select id, trim(arve) as kood, trim(nimetus) as name from ou.aa where parentid = 1 order by default_ desc"
}

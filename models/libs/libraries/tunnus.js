module.exports = {
    selectAsLibs: "select id, trim(kood) as kood, trim(nimetus) as name from libs.library where library = 'TUNNUS' order by kood"
}

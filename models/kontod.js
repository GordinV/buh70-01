module.exports = {
    select: "select id, trim(kood) as kood, trim(kood) || ' ' || trim(nimetus) as name from libs.library where library = 'KONTOD' order by kood"
}

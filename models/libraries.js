// doc library model

module.exports = {
    documentLibrary: [
    {
     id: 1,
     name: 'Arved'
    },
    {
    id: 2,
    name: 'Palk'
    },
    {
    id:3,
    name: 'Lausendid'
    }
    ],
    connectDb: function() {
        var pg = require('pg'),
            config = require('../config/config'),
            db = new pg.Client(config.pg.connection);
        return db;

    },
    getLibrary: function(rekvId, lib, callback) {
        // возвращает список библиотек заданого типа
        var db = this.connectDb();

        db.connect(function (err) {
            if (err) {
                return console.error('could not connect to postgres', err);
            }
            db.query("select * " +
                "           from library l " +
                "               where $1 = 0 or l.rekvid = $1 " +
                "               dok = $2                      " +
                "               order by l.kood;", [rekvId, lib],  function (err, result) {
                if (err) {
                    console.error(err);
                    return callback(err);

                }
                db.end();
                callback(err, result);
            });
        });

    }
}


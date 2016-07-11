/*
var pgp = require('pg-promise')(//options),
    config = require('../config/config'),
    db = pgp(config.pg.connection); // соединение

*/
var pg = require('pg'),
    config = require('../config/config'),
    db = new pg.Client(config.pg.connection);

module.exports = db;
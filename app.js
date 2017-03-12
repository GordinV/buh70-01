'use strict';

// Для того, чтобы предотвратить подобные глупости, прямо в начале приложения для Node.js можно поместить такую конструкцию, выводящую необработанные исключения в консоль:
//process.on(`uncaughtException`, console.error);

const express = require('express');

var app = express(),
    compression = require('compression'),
    http = require('http'),
    path = require('path'),
    routes = require('./routes/index'),
    errorHandle = require('errorhandler'),
    config = require('config'),
    log = require('libs/log')(module),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    HttpError = require('error').HttpError,
    pg = require('pg'),
    session = require('express-session'),
    pgSession = require('connect-pg-simple')(session);

require('node-jsx').install({extension: '.jsx'});
app.set('port', config.get('port'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/*
запускает каждую минуту сервис
const dailyCleanup = setInterval(() => {
    console.log('clean up called');
//    cleanup();
}, 1000 * 60);

dailyCleanup.unref();
*/

http.createServer(app).listen(config.get('port'), function () {
    log.info('Express server listening on port ' + config.get('port'));
});

// middleware

app.use(compression());
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('./middleware/sendHttpError'));

app.use(session({
    store: new pgSession({
        pg : pg,                                  // Use global pg-module
        conString : config.get('pg:connection'), // Connect using something else than default DATABASE_URL env variable
        tableName : 'session'               // Use another table-name than the default "session" one
    }),
    secret: config.get('session:secret'),
    cookie: { maxAge: config.get('session:cookie:maxAge')}
}));

require('routes')(app);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
    console.log('app.use');
    if (typeof err == 'number') { // next(404);
        console.log('app.use err', err);
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.render('error', {"message": err.message });

//        res.sendHttpError(err);
    } else {

        if (app.get('env') == 'development') {
//            errorhandler()(err, req, res, next);
            console.log('app.use err 2', err);
            res.render('error', {"message": err.message });

        } else {
            console.log('Prod. error', err);
            log.error(err);
            err = new HttpError(500);
//            res.sendHttpError(err);
        }
    }
});


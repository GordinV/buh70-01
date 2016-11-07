'use strict';
const gulp = require('gulp');
const mocha = require('gulp-mocha');
require('babel-core/register');
//const server = require('./mongoose/server');

/*
gulp.task('server', function(callback) {
    server.listen(3000, '127.0.0.1', () => console.log('http://127.0.0.1:3000/'));
    callback();
});
*/
// Compiler for React tests
require('./test/compiler.js');

gulp.task('mocha', function() {
    return gulp
        .src('./test/*.js?', { read: false })
        .pipe(mocha());
});

gulp.task('default', [
    'mocha'
]);
/*


gulp.task('default', function() {
    gulp.run('test');
});
gulp.task('test', function () {
    return gulp.src('./test/doc-button.jsx', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha());
});
*/

//gulp.task('default', gulp.series('test'));
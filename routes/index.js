const checkAuth = require('../middleware/checkAuth');

module.exports = function (app) {
    console.log('index');
// same as main
    app.get('/', require('./login').get);
    app.post('/', require('./login').post);

//login logic
    app.get('/login', require('./login').get);

    app.post('/login', require('./login').post);
    // logout logic
    app.get('/logout', require('./logout').get);
//  app.post('/logout', require('./logout').post);
//  app.get('/api/doc/', checkAuth, require('./api_doc').get);
    app.get('/document/:id', checkAuth, require('./document').get);


    // opens main page
    app.get('/main', checkAuth, require('./main').get);
    // opens page with list of departments
    app.get('/changeDepartment', checkAuth, require('./changeDepartment').get);
    app.get('/changeDepartment/:id', checkAuth, require('./changeDepartment').get);
    // opens document template
    app.get('/documents', checkAuth, require('./documents').get);
    // opens document template
    app.post('/api', checkAuth, require('./api').post);
    app.post('/api/docs', checkAuth, require('./api').post);
    app.post('/api/doc', checkAuth, require('./api_doc').post);


};
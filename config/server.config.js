//Defines all routes to load onto server(code refactoring)
const health = require('../routes/health.routes');
const users = require('../routes/users.routes');
const auth = require('../routes/auth.routes');

const express = require('express');


module.exports = function(app) {
    app.use(express.json());
    app.use('/api/health', health);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    


}
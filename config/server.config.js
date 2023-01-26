//Defines all routes to load onto server(code refactoring)
const health = require('../routes/health.routes');
const users = require('../routes/users.routes');
const auth = require('../routes/auth.routes');

const express = require('express');


module.exports = function(app) {
    app.use(express.json());
    app.use('/api/health', health);
    app.use('/api/getUsers', users);
    app.use('/api/createUsers', users);
    app.use('/api/getOneUser', users);
    app.use('/api/updateUser', users);
    app.use('/api/deleteUser', users)
    app.use('/api/auth', auth);
    


}
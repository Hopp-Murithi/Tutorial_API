//Defines all routes to load onto server(code refactoring)
const health = require('../routes/health.routes');
const users = require('../routes/users.routes');
const tutorials =require('../routes/tutorials.routes')
const auth = require('../routes/auth.routes');

const express = require('express');


module.exports = function(app) {
    app.use(express.json());
    app.use('/api/health', health);
    //User CRUD
    app.use('/api/getUsers', users);
    app.use('/api/createUsers', users);
    app.use('/api/getOneUser', users);
    app.use('/api/updateUser', users);
    app.use('/api/deleteUser', users)
    app.use('/api/userAuth', auth);

    //tutorials CRUD
    app.use('/api/getTutorials', tutorials);
    app.use('/api/createTutorial', tutorials);
    app.use('/api/getOneTutorial', tutorials);
    app.use('/api/updateTutorial', tutorials);
    app.use('/api/deleteTutorial', tutorials);
   

    


}
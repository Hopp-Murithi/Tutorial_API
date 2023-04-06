//Defines logic about the server
const express = require('express');
const dotenv = require('dotenv');
const app = express();



dotenv.config();

require('./config/db')();
require('./config/server.config')(app)


const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
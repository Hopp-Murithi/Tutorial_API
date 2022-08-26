//Defines logic about the server
const express = require('express')
const dotenv = require('dotenv');
const health = require('./routes/healthChecker.routes')
const users = require('./routes/users.routes')
const app = express();


dotenv.config();

require('./config/db')();

app.use(express.json());

app.use('/health', health);
app.use('/users', users);


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
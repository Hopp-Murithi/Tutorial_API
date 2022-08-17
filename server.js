//Defines logic about the server
const express = require('express')
const health = require('./routes/healthChecker.routes')
const app = express();

app.use(express.json());

app.use('/health', health)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
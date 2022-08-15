//Defines logic about the server
const express = require('express')
const app = express();
app.use(express.json());


const port = process.env.PORT || 3000
app.listen(3000, () => {
    console.log(`Listening on port ${port}`)
})
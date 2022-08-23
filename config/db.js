//Defines database configurations
const mongoose = require('mongoose')
const connectDatabase = () => {

    mongoose.connect(process.env.DB_LOCAL_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        .then((con) => {
            console.log(`MongoDB Database connected to host ${con.connection.port}`);
        });
}

module.exports = connectDatabase

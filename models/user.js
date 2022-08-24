//defines schema model for creating users
const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 5
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
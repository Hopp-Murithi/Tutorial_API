//defines schema model for creating tutorials

//defines schema model for creating users
const mongoose = require('mongoose');
const { Schema } = mongoose

const tutSchema = new Schema({
    Title: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    Author: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    tags: [{
        type: String,
        required: true,   
    }],
    permalink: {
        type: String
    },
    postDate: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true,
        min: 5    
    },
    video:
    {
        data: Buffer,
        contentType: String
    }
});

const Tutorial = mongoose.model('Tutorial', tutSchema);

module.exports = Tutorial;
//defines schema model for creating tutorials

const mongoose = require('mongoose');
const { Schema } = mongoose

const tutSchema = new Schema({
    Title: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    img:{
        data:Buffer,
        type:String,
        required:true
    },
    Author: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    tags:{
        type: String,
        required: true,   
    },
    permaLink:String,
    
    postDate: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true,
        min: 5    
    }
    
});

const Tutorial = mongoose.model('Tutorial', tutSchema);

module.exports = Tutorial;
//defines schema model for creating tutorials

const mongoose = require('mongoose');
const { Schema } = mongoose

const tutSchema = new Schema({
    title: {
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
    author: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    tags:{
        type: String,
        required: true,   
    },
    
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
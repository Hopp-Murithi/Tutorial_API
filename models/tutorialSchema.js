//defines schema model for creating tutorials

const mongoose = require("mongoose");
const { Schema } = mongoose;

const tutSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 3,
  },

  author: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  tags: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    min: 3,
  },
  postDate: {
    type: Date,
    required:true,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    required:true,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
    min: 10,
  },
});

const Tutorial = mongoose.model("Tutorial", tutSchema);

module.exports = Tutorial;

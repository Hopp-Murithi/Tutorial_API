//defines schema model for creating Video tutorials

const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema({
  videoTitle: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;

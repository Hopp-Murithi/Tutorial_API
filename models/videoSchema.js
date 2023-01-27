//defines schema model for creating tutorials

const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  tags: [{ type: String }],
  duration: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;

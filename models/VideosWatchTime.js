const mongoose = require("mongoose");

const VideosWatchTimeSchema = mongoose.Schema(
  {
    time: { type: String, required: true },
    lesson: { type: mongoose.Types.ObjectId, ref: "lesson" },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("videosWatchTime", VideosWatchTimeSchema);

const mongoose = require("mongoose");

const VideoSchema = mongoose.Schema({
  count: {
    type: Number,
    required: true,
    default: 1
  },
  lesson: { type: mongoose.Types.ObjectId, ref: "lesson" },
  user: { type: mongoose.Types.ObjectId, ref: "user" },
}, {
  timestamps: true
});

module.exports = mongoose.model("video", VideoSchema);
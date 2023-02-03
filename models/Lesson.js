const mongoose = require("mongoose");

const LessonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  video: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  chapter: { type: mongoose.Types.ObjectId, ref: "chapter" },
}, {
  timestamps: true
});

module.exports = mongoose.model("lesson", LessonSchema);
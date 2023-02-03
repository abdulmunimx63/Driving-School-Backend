const mongoose = require("mongoose");

const ChapterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    unlocked: {
      type: Boolean,
      required: false,
    },
    course: { type: mongoose.Types.ObjectId, ref: "course" },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lesson",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chapter", ChapterSchema);

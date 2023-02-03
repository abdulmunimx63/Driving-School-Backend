const mongoose = require("mongoose");

const QuizzReportSchema = mongoose.Schema(
  {
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctQuestions: {
      type: Number,
      required: true,
    },
    quizz: { type: mongoose.Types.ObjectId, ref: "quizz" },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("quizzReport", QuizzReportSchema);

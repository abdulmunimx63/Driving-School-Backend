const mongoose = require("mongoose");
const { QuizzQuestionSchema } = require("./QuizzQuestion");

const QuizzSchema = mongoose.Schema({
  chapter: { type: mongoose.Types.ObjectId, ref: "chapter" },
  quizzQuestions:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quizzQuestion"
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model("quizze", QuizzSchema);
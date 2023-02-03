const mongoose = require("mongoose");
const { QuizzAnswerSchema } = require("./QuizzAnswer");

const QuizzQuestionSchema = mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  questionImage: {
    type: String,
    required: true
  },
  quizzAnswers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quizzAnswer"
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model("quizzQuestion", QuizzQuestionSchema);
module.exports.QuizzQuestionSchema = QuizzQuestionSchema;
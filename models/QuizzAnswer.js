const mongoose = require("mongoose");

const QuizzAnswerSchema = mongoose.Schema({
  answer: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("quizzAnswer", QuizzAnswerSchema);
module.exports.QuizzAnswerSchema = QuizzAnswerSchema;
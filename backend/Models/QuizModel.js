const mongoose = require("mongoose");
const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz Name must be provided"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "desription  must be provided"],
      unique: true,
    },
    questions: [
      {
        question: String,
        options: [String],
        correctOption: Number,
        points: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = Quiz;

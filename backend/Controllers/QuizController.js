const Quiz = require("../Models/QuizModel");
const AppError = require("../utils/AppError");
const async_handler = require("express-async-handler");

exports.GetAllQuiz = async_handler(async (req, res, next) => {
  const allQuiz = await Quiz.find().populate({path:"questions"});
  res.status(200).json({
    status: "success",
    Quiz: allQuiz,
  });
});

exports.CreateQuiz= async_handler(async (req, res, next) => {
  const newQuiz = await Quiz.create(req.body);
  res.status(201).json({
    status: "success",
    Quiz: newQuiz,
  });
});
exports.GetQuizById = async_handler(async (req, res, next) => {
  const newQuiz = await Quiz.findById(req.params.id);
  if (!newQuiz) {
    return next(new AppError("id Question not found", 404));
  }
  res.status(201).json({
    status: "success",
    Quiz: newQuiz,
  });
});

const express=require('express');
const QuizController = require('../Controllers/QuizController')
const Router=express.Router()
Router.route('/').get(QuizController.GetAllQuiz).post(QuizController.CreateQuiz)
Router.route('/:id').get(QuizController.GetQuizById)
module.exports=Router
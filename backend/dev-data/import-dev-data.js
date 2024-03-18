const mongoose = require('mongoose');
const fs=require('fs');
const dotenv=require('dotenv')
const Quiz=require('../Models/QuizModel')
dotenv.config({path:"../config.env"})
mongoose.connect('mongodb://localhost:27017/Quiz-App').then(()=>{
    console.log("succefully")
  })
const question = JSON.parse(
    fs.readFileSync(`${__dirname}/Question.json`, 'utf-8')
  );
  const importData = async () => {
    try {
      await Quiz.create(question);
      console.log('data succefuly loaded!!!');
    } catch (err) {
      console.log(err);
    }
  };
  const deleteData=async()=>{
    try {
        await Quiz.deleteMany();
        console.log('deleted succefully');
      } catch (err) {
        console.log(err);
      }
  }
  if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }
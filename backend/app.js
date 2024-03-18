const express=require("express")
const QuizRouter=require('./routes/QuizRoutes')

const cors=require('cors')
const ErrorMidleware = require("./Middlewares/ErrorMidleware")
const morgan=require('morgan')
const dotenv=require('dotenv')
dotenv.config({path:"./config.env"})
const app=express()
console.log(process.env.NODE_ENV);
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({
  extended:true,
  limit:'10kb'
}))
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('/api/v1/quiz',QuizRouter)

app.use(ErrorMidleware)
module.exports=app
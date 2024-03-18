const mongoose = require('mongoose')
const app=require("./app")
const dotenv=require('dotenv')
dotenv.config({path:"./config.env"})
mongoose.connect(process.env.DATABASE_LOCAL).then(()=>{
    console.log("succefully")
  })
  const port=8000
  app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
  })
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if(process.env.NODE_ENV==='development'){
       SendErrorDev(err,res)
    }else if(process.env.NODE_ENV==="production"){  
      SendErrorProd(err,res)
    }
  };
  const SendErrorDev = (err,res) => {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  };
  const SendErrorProd = (err,res) => {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
     
    });
  };
  process.on('unhandledRejection',(err)=>{
    console.error(`Unhandled Rejection Errors:${err.name ||err.message }`)
    process.exit(1 )
  })
  
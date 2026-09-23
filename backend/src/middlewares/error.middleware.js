const errorMiddleware=(err,req,res,next)=>{
    console.log("ERROR:",err);

    const statusCode=err.statusCode|| 500;
    return res.status(statusCode).json({
        success:false,
        message:err.message|| "internal server error",
    });
};

export default errorMiddleware;
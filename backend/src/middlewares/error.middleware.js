const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message || "Internal Server Error";
  error.statusCode = err.statusCode || 500;

  console.error("Error occurred:", {
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  // Mongoose bad ObjectId (CastError)
  if (err.name === "CastError") {
    error.message = `Resource not found. Invalid ID format for field '${err.path}'`;
    error.statusCode = 400;
  }

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const fields = Object.keys(err.keyValue || {}).join(", ");
    error.message = `Duplicate value entered for field: ${fields}`;
    error.statusCode = 409;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    error.message = Object.values(err.errors || {})
      .map((val) => val.message)
      .join(", ");
    error.statusCode = 400;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    error.message = "Invalid JSON Web Token";
    error.statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    error.message = "JSON Web Token has expired";
    error.statusCode = 401;
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorMiddleware;
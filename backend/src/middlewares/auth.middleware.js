import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // get token from authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    // verify token
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // store decoded user information in request
    req.user = decodedToken;

    // continue to next middleware or controller
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user?.role || "unknown"}) is not allowed to access this resource`,
      });
    }
    next();
  };
};

export { authMiddleware, authorizeRoles };
export default authMiddleware;
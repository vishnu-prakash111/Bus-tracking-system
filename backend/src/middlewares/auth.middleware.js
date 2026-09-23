import jwt from "jsonwebtoken"

const authMiddleware=async (req,res)=>{
    try{
        // get token from authorization header
        const token =req.headers.authorization?.replace("Bearer "," ");

        // check token exists

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Authentication token is required",
            });
        }

        // verify token 
        const decodedToken=jwt.verify(
            token,
            process.env,ACCESS_TOKEN_SECRET
        );

        // store decode user information in request
        req.user=decodedToken;

        // continue to controller
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Invalid or expired token",
        });
    }
};

export default authMiddleware;
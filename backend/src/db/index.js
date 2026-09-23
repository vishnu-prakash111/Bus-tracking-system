import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const connectionInstance=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongoDB connected successfully !! DB HOST :${connectionInstance.connection.host}`);
    }catch(error){
        console.error("MonogDB connection error:",error.message);

        process.exit(1);
    }
};

export default connectDB;
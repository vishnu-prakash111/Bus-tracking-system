import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from './db/index.js';
import initializeSocket from "./sockets/socket.js";
import { connect } from "http2";

dotenv.config();

// connect mongoDB
connectDB();

const PORT=process.env.PORT||8000;

// create http server
const server=http.createServer(app);
// create socket.io server
const io=new Server(server,{
    cors:{
        origin:process.env.CORS_ORIGIN ||"*",
        methods:["GET","POST"], 
    },
});

// initialize the socket events
initializeSocket(io);

// start server
server.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
}); 

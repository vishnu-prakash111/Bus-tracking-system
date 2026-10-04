import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./db/index.js";
import initializeSocket from "./sockets/socket.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

// Create http server
const server = http.createServer(app);

// Create socket.io server
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"],
  },
});

// Initialize the socket events
initializeSocket(io);

// Connect DB first, then start listening
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err.message);
    process.exit(1);
  }); 

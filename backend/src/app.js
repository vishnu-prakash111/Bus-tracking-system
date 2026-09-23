import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import userRoutes from "./routes/user.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import busRoutes from "./routes/bus.routes.js";
import routeRoutes from "./routes/route.routes.js";

// Error Middleware
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();


// ================================
// GLOBAL MIDDLEWARES
// ================================

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


// ================================
// API ROUTES
// ================================

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/drivers", driverRoutes);

app.use("/api/v1/buses", busRoutes);

app.use("/api/v1/routes", routeRoutes);


// ================================
// ERROR MIDDLEWARE
// ================================

app.use(errorMiddleware);


export default app;


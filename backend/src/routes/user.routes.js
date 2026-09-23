import { Router } from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/user.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// register
router.post("/register", registerUser);

// login
router.post("/login", loginUser);

// get current logged in user
router.get("/me", authMiddleware, getCurrentUser);

export default router;
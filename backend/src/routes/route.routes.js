import { Router } from "express";

import {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
} from "../controllers/route.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// create routes
router.post("/create", authMiddleware, createRoute);

// get all the routes details
router.get("/", authMiddleware, getAllRoutes);

// get routes by id
router.get("/:id", authMiddleware, getRouteById);

// update routes
router.patch("/:id", authMiddleware, updateRoute);

// delete routes
router.delete("/:id", authMiddleware, deleteRoute);

export default router;
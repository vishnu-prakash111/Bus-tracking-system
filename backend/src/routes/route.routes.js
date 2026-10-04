import { Router } from "express";

import {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
} from "../controllers/route.controller.js";

import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// create routes (admin only - supports both POST / and POST /create)
router.post("/", authMiddleware, authorizeRoles("admin"), createRoute);
router.post("/create", authMiddleware, authorizeRoles("admin"), createRoute);

// get routes details (public for passengers and drivers)
router.get("/", getAllRoutes);
router.get("/:id", getRouteById);

// update routes (admin only)
router.patch("/:id", authMiddleware, authorizeRoles("admin"), updateRoute);
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateRoute);

// delete routes (admin only)
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteRoute);

export default router;
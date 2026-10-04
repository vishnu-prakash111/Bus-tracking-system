import { Router } from "express";

import {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
} from "../controllers/bus.controller.js";

import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// Create bus (admin only - supports both POST / and POST /create)
router.post("/", authMiddleware, authorizeRoles("admin"), createBus);
router.post("/create", authMiddleware, authorizeRoles("admin"), createBus);

// Public routes for viewing buses
router.get("/", getAllBuses);
router.get("/:id", getBusById);

// Update & delete bus (admin only)
router.patch("/:id", authMiddleware, authorizeRoles("admin"), updateBus);
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateBus);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteBus);

export default router;
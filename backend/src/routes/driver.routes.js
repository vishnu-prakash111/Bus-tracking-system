import { Router } from "express";

import {
  createDriver,
  loginDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} from "../controllers/driver.controller.js";

import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// driver login
router.post("/login", loginDriver);

// create Driver (admin only - supports both POST / and POST /create)
router.post("/", authMiddleware, authorizeRoles("admin"), createDriver);
router.post("/create", authMiddleware, authorizeRoles("admin"), createDriver);

// get all drivers
router.get("/", authMiddleware, getAllDrivers);

// get driver by id
router.get("/:id", authMiddleware, getDriverById);

// update driver (admin only)
router.patch("/:id", authMiddleware, authorizeRoles("admin"), updateDriver);
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateDriver);

// delete driver (admin only)
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteDriver);

export default router;
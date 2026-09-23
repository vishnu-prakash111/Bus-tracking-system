import { Router } from "express";

import {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} from "../controllers/driver.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// create Driver
router.post("/create", authMiddleware, createDriver);

// get all driver
router.get("/", authMiddleware, getAllDrivers);

// get driver by id
router.get("/:id", authMiddleware, getDriverById);

// update driver
router.patch("/:id", authMiddleware, updateDriver);

// delete driver
router.delete("/:id", authMiddleware, deleteDriver);

export default router;
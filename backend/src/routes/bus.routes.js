import { Router } from "express";

import {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
} from "../controllers/bus.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", authMiddleware, createBus);

router.get("/", getAllBuses);

router.get("/:id", getBusById);

router.patch("/:id", authMiddleware, updateBus);

router.delete("/:id", authMiddleware, deleteBus);

export default router;
// src/routes/orderRoutes.js
import { Router } from "express";
import {
  createOrder,
  getAllOrders,
} from "../controllers/orderController.js";

const router = Router();

router.post("/", createOrder);
router.get("/", getAllOrders);

export default router;

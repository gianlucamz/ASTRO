import { Router } from "express";
import {
  createOrder,
  listOrders,
  getOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

const router = Router();

router.use(authenticate);

router.post("/", createOrder);
router.get("/", listOrders);
router.get("/:id", getOrder);
router.patch("/:id/status", authorizeAdmin, updateOrderStatus);

export default router;

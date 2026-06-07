import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

const router = Router();

router.use(authenticate);

router.get("/", getCart);
router.post("/items", addToCart);
router.patch("/items/:id", updateCartItem);
router.delete("/items/:id", removeFromCart);
router.delete("/", clearCart);

export default router;

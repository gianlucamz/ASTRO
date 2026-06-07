import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controllers/wishlistController.js";

const router = Router();

router.use(authenticate);

router.get("/", getWishlist);
router.post("/items", addToWishlist);
router.delete("/items/:id", removeFromWishlist);
router.delete("/", clearWishlist);

export default router;

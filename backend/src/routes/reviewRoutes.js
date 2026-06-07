import { Router } from "express";
import { authenticate, optionalAuth } from "../middlewares/auth.js";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = Router();

router.get("/:productId", optionalAuth, getReviews);
router.post("/", authenticate, createReview);
router.put("/:id", authenticate, updateReview);
router.delete("/:id", authenticate, deleteReview);

export default router;

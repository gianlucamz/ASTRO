import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

import {
  listProducts,
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = Router(); 

router.get("/", listProducts);
router.get("/id/:id", getProductById);
router.get("/:slug", getProduct);
router.post("/", authenticate, authorizeAdmin, createProduct);
router.put("/:id", authenticate, authorizeAdmin, updateProduct);
router.patch("/:id", authenticate, authorizeAdmin, updateProduct);
router.delete("/:id", authenticate, authorizeAdmin, deleteProduct);

export default router;

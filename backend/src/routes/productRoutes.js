import { Router } from "express";
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/", listProducts);
router.get("/:slug", getProduct);
router.post("/", authenticate, authorizeAdmin, createProduct);
router.put("/:id", authenticate, authorizeAdmin, updateProduct);
router.patch("/:id", authenticate, authorizeAdmin, updateProduct); // adicionado
router.delete("/:id", authenticate, authorizeAdmin, deleteProduct);

export default router;

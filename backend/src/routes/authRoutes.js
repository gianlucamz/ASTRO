import { Router } from "express";
import {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", authenticate, updateUser);
router.delete("/users/:id", authenticate, deleteUser);

export default router;

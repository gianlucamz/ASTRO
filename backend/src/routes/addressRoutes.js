import { Router } from "express";
import {
  listAddresses,
  createAddress,
  deleteAddress,
} from "../controllers/addressController.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.use(authenticate);

router.get("/", listAddresses);
router.post("/", createAddress);
router.delete("/:id", deleteAddress);

export default router;

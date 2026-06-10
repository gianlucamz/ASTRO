import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import addresRoutes from "./routes/addressRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

const app = express();
app.use(
  cors({
    origin: ["https://astro-tech.up.railway.app", "http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/addresses", addresRoutes);
app.use("/reviews", reviewRoutes);
app.use("/wishlist", wishlistRoutes);

export default app;

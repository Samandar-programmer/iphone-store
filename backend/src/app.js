// src/app.js
import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route'lar
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Tekshirish uchun
app.get("/", (req, res) => {
  res.json({ message: "iPhone Store API ishlayapti" });
});

// Xatolarni qayta ishlash (oxirida bo'lishi kerak)
app.use(notFound);
app.use(errorHandler);

export default app;

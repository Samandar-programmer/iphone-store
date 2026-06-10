// src/controllers/productController.js
import prisma from "../prisma.js";

// GET /api/products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "asc" },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

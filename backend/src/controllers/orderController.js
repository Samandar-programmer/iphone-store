// src/controllers/orderController.js
import { orders, products } from "../data/products.js";

// POST /api/orders
export const createOrder = (req, res) => {
  const { name, address, phone, items } = req.body;

  // Validatsiya
  if (!name || !address || !phone) {
    return res
      .status(400)
      .json({ message: "Ism, manzil va telefon majburiy" });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Savat bo'sh bo'lmasligi kerak" });
  }

  // Mahsulotlarni tekshirib, umumiy summani hisoblash
  let total = 0;
  const orderItems = [];

  for (const item of items) {
    const product = products.find((p) => p.id === Number(item.id));
    if (!product) {
      return res
        .status(400)
        .json({ message: `Mahsulot topilmadi: id ${item.id}` });
    }
    const quantity = Number(item.quantity) || 1;
    total += product.price * quantity;
    orderItems.push({
      id: product.id,
      model: product.model,
      price: product.price,
      quantity,
    });
  }

  // Yangi buyurtma yaratish
  const newOrder = {
    id: orders.length + 1,
    name,
    address,
    phone,
    items: orderItems,
    total,
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);

  res.status(201).json({
    message: "Buyurtma qabul qilindi",
    order: newOrder,
  });
};

// GET /api/orders (qo'shimcha, tekshirish uchun foydali)
export const getAllOrders = (req, res) => {
  res.json(orders);
};

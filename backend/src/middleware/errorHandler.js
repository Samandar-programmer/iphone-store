// src/middleware/errorHandler.js
export const notFound = (req, res) => {
  res.status(404).json({ message: "Endpoint topilmadi" });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Serverda xatolik yuz berdi" });
};

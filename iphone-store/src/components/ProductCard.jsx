// src/components/ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const formatPrice = (p) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group relative rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-xl"
    >
      <div className="relative mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gray-50">
        <motion.img
          src={product.imageUrl}
          alt={product.model}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/300x300?text=iPhone";
          }}
          className="h-full w-full object-contain p-6"
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.3 }}
        />
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-12 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Tez ko'rish
        </button>
      </div>

      <Link to={`/product/${product.id}`}>
        <h3 className="text-base font-semibold text-gray-900 hover:underline">
          {product.model}
        </h3>
      </Link>

      {/* Bazadagi bitta rang va xotira */}
      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
        <span>{product.color}</span>
        <span className="text-gray-300">•</span>
        <span>{product.storage}</span>
      </div>

      <p className="mt-2 text-lg font-bold text-gray-900">{formatPrice(product.price)}</p>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          addToCart(product, 1);
          showToast(`${product.model} savatga qo'shildi`);
        }}
        className="mt-4 w-full rounded-full bg-gray-900 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
      >
        Savatga qo'shish
      </motion.button>
    </motion.div>
  );
}

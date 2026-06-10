// src/components/QuickViewModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const formatPrice = (p) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full max-w-3xl gap-6 rounded-3xl bg-white p-6 shadow-2xl md:grid-cols-2"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Rasm - imageUrl ishlatamiz */}
            <div className="flex items-center justify-center rounded-2xl bg-gray-50 p-6">
              <img
                src={product.imageUrl}
                alt={product.model}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/300x300?text=iPhone";
                }}
                className="max-h-72 object-contain"
              />
            </div>

            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900">{product.model}</h2>

              {/* Bazadagi bitta rang */}
              <p className="mt-2 text-sm text-gray-500">
                {product.color} • {product.storage}
              </p>

              <p className="mt-4 text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </p>

              {product.stock != null && (
                <p className="mt-2 text-sm text-green-600">
                  {product.stock > 0 ? `Omborda: ${product.stock} ta` : "Tugagan"}
                </p>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  addToCart(product, 1);
                  showToast(`${product.model} savatga qo'shildi`);
                  onClose();
                }}
                className="mt-auto rounded-full bg-gray-900 py-3 font-medium text-white transition hover:bg-gray-700"
              >
                Savatga qo'shish
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

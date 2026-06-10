// src/components/CartDrawer.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const FREE_SHIPPING_THRESHOLD = 1000;

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const total = getTotalPrice();
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - total, 0);
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const qualified = remaining === 0;

  const formatPrice = (p) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[95] bg-black/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 z-[96] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Sarlavha */}
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900">
                Savat
                {cartItems.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    ({cartItems.length})
                  </span>
                )}
              </h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Free shipping progress bar */}
            {cartItems.length > 0 && (
              <div className="border-b border-gray-100 px-6 py-4">
                <p className="mb-2 text-sm text-gray-700">
                  {qualified ? (
                    <span className="font-medium text-green-600">
                      🎉 Bepul yetkazib berishga ega bo'ldingiz!
                    </span>
                  ) : (
                    <>
                      Yana{" "}
                      <span className="font-bold text-gray-900">
                        {formatPrice(remaining)}
                      </span>{" "}
                      qo'shing, bepul yetkazib berish!
                    </>
                  )}
                </p>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    className={`h-full rounded-full ${
                      qualified ? "bg-green-500" : "bg-gray-900"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {/* Mahsulotlar */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="mb-3 text-5xl">🛒</p>
                  <p className="font-medium text-gray-900">Savatingiz bo'sh</p>
                  <p className="mt-1 text-sm text-gray-500">Mahsulot qo'shing.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, x: 50 }}
                        className="flex gap-4 rounded-2xl border border-gray-100 p-3"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.model}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/100x100?text=iPhone";
                          }}
                          className="h-20 w-20 shrink-0 rounded-xl bg-gray-50 object-contain p-2"
                        />
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-gray-900">{item.model}</h3>
                            {/* O'chirish - trash icon */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="shrink-0 rounded-full p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                              aria-label="O'chirish"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-xs text-gray-500">
                            {item.color} • {item.storage}
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            {/* Quantity selector - minimal */}
                            <div className="flex items-center rounded-full border border-gray-200">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
                              >
                                −
                              </button>
                              <span className="w-7 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-bold text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Pastki qism */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-gray-600">Umumiy:</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(total)}
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full rounded-full bg-gray-900 py-3.5 font-medium text-white transition hover:bg-gray-700"
                >
                  Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

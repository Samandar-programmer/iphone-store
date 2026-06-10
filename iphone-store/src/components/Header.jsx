// src/components/Header.jsx
import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function Header({ onCartClick }) {   // ← prop qo'shildi
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
        <a href="/" className="flex shrink-0 items-center gap-2">
          <span className="text-2xl"></span>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            iPhone Store
          </span>
        </a>

        <div className="mx-auto w-full max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Mahsulot qidirish..."
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-5 text-sm shadow-lg shadow-gray-200/50 transition focus:border-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-900/5"
            />
            <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </div>
        </div>

        {/* Savat - endi onClick bilan */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onCartClick}                       // ← ulandi
          className="relative shrink-0 rounded-full p-3 transition hover:bg-gray-100"
        >
          <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative">{cartCount}</span>
            </motion.span>
          )}
        </motion.button>
      </div>
    </header>
  );
}

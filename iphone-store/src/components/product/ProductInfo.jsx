// src/components/product/ProductInfo.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

export default function ProductInfo({ product, onBuyNow }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const colors = product.colors || [{ name: product.color, hex: "#22242a" }];
  const storages = product.storages || [product.storage];

  const [color, setColor] = useState(colors[0]);
  const [storage, setStorage] = useState(storages[0]);
  const [qty, setQty] = useState(1);

  const formatPrice = (p) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p);

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  const selected = { ...product, color: color.name, storage, quantity: qty };

  return (
    <div className="flex flex-col">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900"
      >
        {product.model}
      </motion.h1>
      <p className="mt-1 text-gray-500">{color.name}</p>

      {/* Narx */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
        {hasDiscount && (
          <>
            <span className="text-lg text-gray-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
            <span className="rounded-full bg-red-50 px-2 py-1 text-sm font-medium text-red-600">
              -{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </span>
          </>
        )}
      </div>

      {/* Rang variantlari */}
      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-gray-700">Rang: {color.name}</p>
        <div className="flex gap-3">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c)}
              title={c.name}
              className={`h-9 w-9 rounded-full border transition ${
                color.name === c.name ? "ring-2 ring-gray-900 ring-offset-2" : "border-gray-300"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* Xotira variantlari */}
      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-gray-700">Xotira</p>
        <div className="flex flex-wrap gap-2">
          {storages.map((s) => (
            <button
              key={s}
              onClick={() => setStorage(s)}
              className={`rounded-xl border px-5 py-2.5 text-sm font-medium transition ${
                storage === s
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-900"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Miqdor */}
      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-gray-700">Miqdor</p>
        <div className="flex w-fit items-center rounded-full border border-gray-300">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-gray-600 hover:bg-gray-100"
          >
            −
          </button>
          <span className="w-10 text-center font-medium">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      {/* Tugmalar */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            addToCart(selected, qty);
            showToast(`${product.model} savatga qo'shildi`);
          }}
          className="flex-1 rounded-full border border-gray-900 py-3.5 font-medium text-gray-900 transition hover:bg-gray-50"
        >
          Savatga qo'shish
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onBuyNow?.(selected)}
          className="flex-1 rounded-full bg-gray-900 py-3.5 font-medium text-white transition hover:bg-gray-700"
        >
          Hozir sotib olish
        </motion.button>
      </div>
    </div>
  );
}

// src/components/Cart.jsx
import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-xl font-semibold text-gray-900">
          Savatingiz bo'sh
        </h2>
        <p className="mt-2 text-gray-500">
          Mahsulot qo'shish uchun katalogga qayting.
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Savat</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4"
          >
            {/* Rasm */}
            <img
              src={item.image}
              alt={item.model}
              className="h-20 w-20 shrink-0 rounded-xl bg-gray-50 object-contain p-2"
            />

            {/* Ma'lumot */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {item.model}
              </h3>
              <p className="text-sm text-gray-500">
                {item.color} • {item.storage}
              </p>
              <p className="mt-1 font-bold text-gray-900">
                {formatPrice(item.price)}
              </p>
            </div>

            {/* Miqdor boshqaruvi */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="h-8 w-8 rounded-full border border-gray-300 text-lg leading-none text-gray-700 hover:bg-gray-100"
                aria-label="Kamaytirish"
              >
                −
              </button>
              <span className="w-8 text-center font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="h-8 w-8 rounded-full border border-gray-300 text-lg leading-none text-gray-700 hover:bg-gray-100"
                aria-label="Oshirish"
              >
                +
              </button>
            </div>

            {/* Qator bo'yicha summa */}
            <p className="w-24 text-right font-semibold text-gray-900">
              {formatPrice(item.price * item.quantity)}
            </p>

            {/* O'chirish */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="shrink-0 rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
              aria-label="O'chirish"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Umumiy summa */}
      <div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4">
        <span className="text-lg font-medium text-gray-700">Umumiy:</span>
        <span className="text-2xl font-bold text-gray-900">
          {formatPrice(getTotalPrice())}
        </span>
      </div>

      <button className="mt-4 w-full rounded-full bg-gray-900 py-3 text-sm font-medium text-white transition hover:bg-gray-700">
        Buyurtma berish
      </button>
    </section>
  );
}

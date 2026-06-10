// src/components/product/ProductTabs.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = ["Tavsif", "Xususiyatlar", "Sharhlar"];

export default function ProductTabs({ product }) {
  const [tab, setTab] = useState("Tavsif");

  const specs = product.specs || {
    Chipset: "A18 Pro",
    Kamera: "48MP asosiy",
    Batareya: "4400 mAh",
    Ekran: "6.1” Super Retina XDR",
    Material: "Titanium",
    "Operatsion tizim": "iOS 18",
  };

  const reviews = product.reviewsList || [
    { name: "Aziz", rating: 5, text: "Ajoyib telefon, tezligi zo'r!" },
    { name: "Malika", rating: 4, text: "Kamerasi juda yaxshi, narxi biroz qimmat." },
  ];

  return (
    <div className="mt-16">
      {/* Tab tugmalari */}
      <div className="flex gap-6 border-b border-gray-200">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative pb-3 text-sm font-medium transition ${
              tab === t ? "text-gray-900" : "text-gray-400 hover:text-gray-700"
            }`}
          >
            {t}
            {tab === t && (
              <motion.span
                layoutId="tab-underline"
                className="absolute -bottom-px left-0 h-0.5 w-full bg-gray-900"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab tarkibi */}
      <div className="py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "Tavsif" && (
              <p className="leading-relaxed text-gray-600">
                {product.description ||
                  `${product.model} eng so'nggi texnologiyalar bilan jihozlangan. Titanium korpus, kuchli chipset va professional kamera tizimi bilan kundalik foydalanish va professional ishlar uchun ideal tanlov.`}
              </p>
            )}

            {tab === "Xususiyatlar" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(specs).map(([key, val]) => (
                  <div key={key} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-400">{key}</p>
                    <p className="mt-1 font-semibold text-gray-900">{val}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "Sharhlar" && (
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="rounded-2xl border border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{r.name}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg
                            key={s}
                            className={`h-4 w-4 ${s <= r.rating ? "text-amber-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.367-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.075 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

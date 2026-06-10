// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import Countdown from "./Countdown";

export default function Hero() {
  // Taklif 7 kundan keyin tugaydi
  const offerEnd = new Date(Date.now() + 7 * 86400000);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 pt-32 pb-20">
      {/* Dekorativ glow */}
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-white/80 backdrop-blur"
        >
          Cheklangan taklif
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-7xl"
        >
          Yangi iPhone 16 Pro
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-lg text-white/70"
        >
          Titanium dizayn. A18 Pro chip. Eng kuchli iPhone, eng yaxshi narxda.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-white px-8 py-4 font-semibold text-gray-900 shadow-xl transition hover:bg-gray-100"
          >
            Hoziroq xarid qiling
          </motion.a>
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Countdown targetDate={offerEnd} />
        </div>
      </div>
    </section>
  );
}

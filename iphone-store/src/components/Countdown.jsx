// src/components/Countdown.jsx
import React, { useEffect, useState } from "react";

export default function Countdown({ targetDate }) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff / 3600000) % 24),
      m: Math.floor((diff / 60000) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calc());

  useEffect(() => {
    const timer = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const Box = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-2xl font-bold text-white backdrop-blur">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1 text-xs uppercase text-white/60">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-3">
      <Box value={time.d} label="kun" />
      <Box value={time.h} label="soat" />
      <Box value={time.m} label="daqiqa" />
      <Box value={time.s} label="soniya" />
    </div>
  );
}

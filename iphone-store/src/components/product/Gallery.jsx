// src/components/product/Gallery.jsx
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Gallery({ images = [], alt }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState({ show: false, x: 0, y: 0 });
  const imgRef = useRef(null);

  const fallback = "https://placehold.co/600x600?text=iPhone";
  const list = images.length ? images : [fallback];

  const handleMove = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ show: true, x, y });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Mobil: Swiper swipe */}
      <div className="md:hidden">
        <Swiper modules={[Pagination]} pagination={{ clickable: true }} className="rounded-3xl bg-gray-50">
          {list.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="flex aspect-square items-center justify-center p-8">
                <img
                  src={src}
                  alt={alt}
                  onError={(e) => { e.target.onerror = null; e.target.src = fallback; }}
                  className="max-h-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: katta rasm + hover zoom */}
      <div className="hidden md:block">
        <div
          ref={imgRef}
          onMouseEnter={() => setZoom((z) => ({ ...z, show: true }))}
          onMouseLeave={() => setZoom((z) => ({ ...z, show: false }))}
          onMouseMove={handleMove}
          className="relative flex aspect-square cursor-zoom-in items-center justify-center overflow-hidden rounded-3xl bg-gray-50"
        >
          <img
            src={list[active]}
            alt={alt}
            onError={(e) => { e.target.onerror = null; e.target.src = fallback; }}
            className="max-h-full object-contain p-8 transition-transform duration-200"
            style={
              zoom.show
                ? { transform: "scale(2)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                : {}
            }
          />
        </div>
      </div>

      {/* Thumbnaillar (desktop) */}
      <div className="hidden gap-3 md:flex">
        {list.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-50 transition ${
              active === i ? "border-gray-900" : "border-transparent hover:border-gray-300"
            }`}
          >
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              onError={(e) => { e.target.onerror = null; e.target.src = fallback; }}
              className="max-h-full object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

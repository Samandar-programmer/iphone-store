// src/components/product/RelatedProducts.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function RelatedProducts({ products = [] }) {
  if (!products.length) return null;

  const formatPrice = (p) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p);

  return (
    <section className="mt-20">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Tavsiya qilinadi</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((p) => (
          <SwiperSlide key={p.id}>
            <Link
              to={`/product/${p.id}`}
              className="block rounded-3xl border border-gray-100 bg-white p-4 transition hover:shadow-lg"
            >
              <div className="mb-3 flex aspect-square items-center justify-center rounded-2xl bg-gray-50">
                <img
                  src={p.imageUrl}
                  alt={p.model}
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x300?text=iPhone"; }}
                  className="max-h-full object-contain p-4"
                />
              </div>
              <h3 className="font-semibold text-gray-900">{p.model}</h3>
              <p className="mt-1 font-bold text-gray-900">{formatPrice(p.price)}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

// src/components/ProductList.jsx
import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import QuickViewModal from "./QuickViewModal";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ maxPrice: 1500, storages: [], colors: [] });
  const [quickView, setQuickView] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Mahsulotlarni yuklab bo'lmadi");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (p.price > filters.maxPrice) return false;
      if (filters.storages.length && !filters.storages.includes(p.storage)) return false;
      // Bazada bitta 'color' string bo'lgani uchun shunga moslab tekshiramiz
      if (filters.colors.length && !filters.colors.includes(p.color)) return false;
      return true;
    });
  }, [products, filters]);

  return (
    <section id="products" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">Mahsulotlar</h2>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <Filters filters={filters} setFilters={setFilters} />

        <div>
          {loading ? (
            <p className="py-20 text-center text-gray-500">Yuklanmoqda...</p>
          ) : error ? (
            <p className="py-20 text-center text-red-500">Xato: {error}</p>
          ) : filtered.length === 0 ? (
            <p className="py-20 text-center text-gray-500">
              Tanlangan filtrlarga mos mahsulot topilmadi.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={setQuickView} />
              ))}
            </div>
          )}
        </div>
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}

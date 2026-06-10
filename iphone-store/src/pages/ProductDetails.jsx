// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Gallery from "../components/product/Gallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductTabs from "../components/product/ProductTabs";
import RelatedProducts from "../components/product/RelatedProducts";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Bitta mahsulot
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Mahsulot topilmadi");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));

    // Tavsiya uchun barcha mahsulotlar
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((all) => setRelated(all.filter((p) => String(p.id) !== String(id)).slice(0, 8)))
      .catch(() => setRelated([]));
  }, [id]);

  if (loading) {
    return <p className="py-32 text-center text-gray-500">Yuklanmoqda...</p>;
  }

  if (!product) {
    return <p className="py-32 text-center text-red-500">Mahsulot topilmadi.</p>;
  }

  // Bazada bitta imageUrl bor, galereya uchun massivga aylantiramiz
  const images = product.images || [product.imageUrl].filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-28">
      <div className="grid gap-10 lg:grid-cols-2">
        <Gallery images={images} alt={product.model} />
        <ProductInfo product={product} />
      </div>

      <ProductTabs product={product} />
      <RelatedProducts products={related} />
    </div>
  );
}

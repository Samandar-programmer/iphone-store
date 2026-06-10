// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import CartDrawer from "./components/CartDrawer";
import ProductDetails from "./pages/ProductDetails";

function Home() {
  return (
    <>
      <Hero />
      <ProductList />
    </>
  );
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          <div className="min-h-screen bg-gray-50">
            <Header onCartClick={() => setCartOpen(true)} />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
              </Routes>
            </main>
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
          </div>
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

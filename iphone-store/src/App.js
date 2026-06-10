// src/App.jsx
import React from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={2} />
      <main>
        <ProductList />
      </main>
    </div>
  );
}

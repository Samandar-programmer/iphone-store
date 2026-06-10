// src/components/Filters.jsx
import React from "react";

const STORAGES = ["128GB", "256GB", "512GB"];
const COLORS = [
  { name: "Black", hex: "#22242a" },
  { name: "White", hex: "#f3efe7" },
  { name: "Blue", hex: "#3d4a5c" },
  { name: "Natural", hex: "#bfb9ad" },
  { name: "Green", hex: "#d3ddd0" },
  { name: "Pink", hex: "#f5d4d8" },
  { name: "Purple", hex: "#564f63" },
  { name: "Gold", hex: "#e3d0b0" },
];

export default function Filters({ filters, setFilters }) {
  const toggleStorage = (s) =>
    setFilters((f) => ({
      ...f,
      storages: f.storages.includes(s)
        ? f.storages.filter((x) => x !== s)
        : [...f.storages, s],
    }));

  const toggleColor = (c) =>
    setFilters((f) => ({
      ...f,
      colors: f.colors.includes(c)
        ? f.colors.filter((x) => x !== c)
        : [...f.colors, c],
    }));

  return (
    <aside className="space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Narx oralig'i */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900">Narx oralig'i</h3>
        <input
          type="range"
          min="400"
          max="1500"
          step="50"
          value={filters.maxPrice}
          onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
          className="w-full accent-gray-900"
        />
        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>$400</span>
          <span className="font-medium text-gray-900">${filters.maxPrice} gacha</span>
        </div>
      </div>

      {/* Xotira */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900">Xotira</h3>
        <div className="flex flex-wrap gap-2">
          {STORAGES.map((s) => (
            <button
              key={s}
              onClick={() => toggleStorage(s)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                filters.storages.includes(s)
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-900"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Ranglar */}
      <div>
        <h3 className="mb-3 font-semibold text-gray-900">Ranglar</h3>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() => toggleColor(c.name)}
              title={c.name}
              className={`h-8 w-8 rounded-full border transition ${
                filters.colors.includes(c.name)
                  ? "ring-2 ring-gray-900 ring-offset-2"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

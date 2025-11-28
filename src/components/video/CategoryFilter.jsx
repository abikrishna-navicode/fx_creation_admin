// src/components/video/CategoryFilter.jsx
import React from "react";

export default function CategoryFilter({ categories = [], active = "all", onSelect }) {
  if (!categories || categories.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1 rounded text-sm ${
            active === cat ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {cat === "all" ? "All" : cat}
        </button>
      ))}
    </div>
  );
}

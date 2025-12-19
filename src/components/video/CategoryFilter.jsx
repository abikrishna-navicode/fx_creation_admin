import React from "react";

export default function CategoryFilter({ categories = [], active = "all", onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center lg:justify-start">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1 rounded text-sm transition ${
            active === cat
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {cat === "all" ? "All" : cat}
        </button>
      ))}
    </div>
  );
}

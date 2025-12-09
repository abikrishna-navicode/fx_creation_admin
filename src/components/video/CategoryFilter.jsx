import React from "react";

export default function CategoryFilter({
  categories = [],
  active = "all",
  onSelect,
}) {
  // validate
  const uniqueCats = Array.from(new Set(categories)).filter(Boolean);

  const finalList = uniqueCats.includes("all")
    ? uniqueCats
    : ["all", ...uniqueCats];

  if (finalList.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {finalList.map((cat) => {
        const label = cat === "all"
          ? "All"
          : cat.charAt(0).toUpperCase() + cat.slice(1);

        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-3 py-1 rounded text-sm transition ${
              active === cat
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

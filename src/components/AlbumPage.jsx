import React, { useState } from "react";

export default function AlbumPage({ album, onDeleteImage }) {
  const [columns, setColumns] = useState(4); // default 4 columns

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{album.title}</h1>

        {/* Column switch */}
        <div className="flex gap-2">
          <button
            className={`px-2 py-1 border rounded ${columns === 2 ? "bg-gray-300" : ""}`}
            onClick={() => setColumns(2)}
          >
            2
          </button>
          <button
            className={`px-2 py-1 border rounded ${columns === 3 ? "bg-gray-300" : ""}`}
            onClick={() => setColumns(3)}
          >
            3
          </button>
          <button
            className={`px-2 py-1 border rounded ${columns === 4 ? "bg-gray-300" : ""}`}
            onClick={() => setColumns(4)}
          >
            4
          </button>
        </div>
      </div>

      {album.images.length === 0 ? (
        <p>No images in this album</p>
      ) : (
        <div className={`grid grid-cols-${columns} gap-4`}>
          {album.images.map((img, index) => (
            <div key={img.id} className="relative">
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-40 object-cover rounded shadow"
              />
              <button
                onClick={() => onDeleteImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1 py-0.5 rounded hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// src/components/gallery/ImageViewer.jsx
import React, { useEffect } from "react";

export default function ImageViewer({ images = [], index = 0, onClose, onIndexChange }) {
  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") return onClose?.();
      if (e.key === "ArrowRight") return onIndexChange?.((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") return onIndexChange?.((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose, onIndexChange]);

  if (!images || images.length === 0) return null;

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      {/* left click zone */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onIndexChange?.((i) => (i - 1 + images.length) % images.length);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 select-none"
        aria-label="previous"
      >
        ❮
      </button>

      <div className="max-h-[90vh] max-w-[95vw]">
        <img
          src={current.src}
          alt=""
          className="max-h-[90vh] max-w-[95vw] object-contain rounded"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
        className="absolute top-4 right-4 text-white text-3xl p-1"
        aria-label="close"
      >
        ✕
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onIndexChange?.((i) => (i + 1) % images.length);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 select-none"
        aria-label="next"
      >
        ❯
      </button>
    </div>
  );
}

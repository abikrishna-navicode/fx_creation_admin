import React, { useState } from "react";

export default function AddAlbumModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [images, setImages] = useState([]); // base64 URLs

  const toBase64 = (file) =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result);
      reader.onerror = (e) => rej(e);
      reader.readAsDataURL(file);
    });

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const converted = await Promise.all(files.map((f) => toBase64(f)));
    setImages((s) => [...s, ...converted]);
  };

  const submit = () => {
    if (!name.trim()) return alert("Album name required");
    if (images.length === 0) return alert("Add at least one image");
    onAdd({ name: name.trim(), images });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded w-[520px]">
        <h2 className="text-xl font-semibold mb-3">Add New Album</h2>

        <input
          type="text"
          placeholder="Album name"
          className="w-full border p-2 mb-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input type="file" accept="image/*" multiple onChange={handleFiles} className="mb-3" />

        {images.length > 0 && (
          <div className="grid grid-cols-5 gap-2 mb-3">
            {images.map((src, i) => (
              <img key={i} src={src} alt="" className="w-full h-20 object-cover rounded" />
            ))}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button onClick={submit} className="px-4 py-2 bg-orange-500 text-white rounded">
            Add Album
          </button>
        </div>
      </div>
    </div>
  );
}

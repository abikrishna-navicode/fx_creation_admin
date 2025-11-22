import React, { useState } from "react";

export default function AddAlbumModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);

  function handleFiles(selectedFiles) {
    const fileArray = Array.from(selectedFiles).map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...fileArray]);
  }

  function createAlbum() {
    if (!title.trim()) return alert("Enter album name");
    if (files.length === 0) return alert("Add at least one image");

    onAdd({ title, images: files });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-full max-w-lg rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add Album</h2>

        <input
          placeholder="Album Name"
          className="border w-full px-3 py-2 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          multiple
          className="mb-4"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {files.map((f) => (
              <img key={f.id} src={f.url} className="h-24 w-full object-cover rounded" />
            ))}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 border rounded" onClick={onClose}>
            Cancel
          </button>

          <button className="bg-orange-500 text-white px-4 py-2 rounded" onClick={createAlbum}>
            Add Album
          </button>
        </div>
      </div>
    </div>
  );
}

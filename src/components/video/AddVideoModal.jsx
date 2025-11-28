// src/components/video/AddVideoModal.jsx
import React, { useState } from "react";
import { saveToStorage, getFromStorage } from "../../utils/storage";

export default function AddVideoModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  
  const [categories, setCategories] = useState(getFromStorage("categories"));
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const handleAdd = () => {
    if (!title || !url || (!selectedCategory && !newCategory)) {
      alert("Please fill all fields");
      return;
    }

    let finalCategory = selectedCategory;

    if (newCategory.trim() !== "") {
      finalCategory = newCategory;
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      saveToStorage("categories", updatedCategories);
    }

    const newVideo = {
      id: Date.now(),
      title,
      url,
      category: finalCategory
    };

    const existing = getFromStorage("videos");
    const updated = [...existing, newVideo];
    saveToStorage("videos", updated);

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl relative">
        
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Add New Video</h2>

        <input
          type="text"
          placeholder="Video Title"
          className="w-full border p-2 rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Video URL"
          className="w-full border p-2 rounded mb-3"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        {/* Existing Category Dropdown */}
        <label className="text-sm font-medium">Select Category</label>
        <select
          className="w-full border p-2 rounded mb-3"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Choose category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Add New Category */}
        <input
          type="text"
          placeholder="Or add new category"
          className="w-full border p-2 rounded mb-3"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Add Video
        </button>
      </div>
    </div>
  );
}

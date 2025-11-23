import React, { useState } from "react";
import { X } from "lucide-react";

export default function NewAdvertiseModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("/mnt/data/8b2ab5ff-abc6-47a3-84da-4b14d343e6b1.png");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setName("");
    setPrice("");
    setServiceType("");
    setDate("");
    setTime("");
    setImage("/mnt/data/8b2ab5ff-abc6-47a3-84da-4b14d343e6b1.png");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !serviceType || !date || !time) return;
    onSubmit({
      id: Date.now(),
      image,
      name,
      contact: "",
      price,
      serviceType,
      date,
      time,
      status: "Pending"
    });
    handleClear();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4">Add Advertise</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <div className="w-full h-40 border-2 border-dashed border-orange-400 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {image ? (
                <img src={image} alt="preview" className="object-cover w-full h-full" />
              ) : (
                <span className="text-orange-400 text-center p-4">
                  Click or drag to upload<br />JPG, JPEG, PNG less than 1MB
                </span>
              )}
            </div>
          </label>

          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="text"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          >
            <option value="">Select service type</option>
            <option value="Camera">Camera</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Makeup">Makeup</option>
            <option value="Photography">Photography</option>
          </select>

          <div className="flex space-x-2">
            <div className="relative flex-1">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div className="relative flex-1">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";

export default function AddVideoModal({ onClose, onUpload }) {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");

  const extractId = (url) => {
    const reg = /(?:v=|youtu\.be\/|embed\/)([^&?/]+)/;
    const match = url.match(reg);
    return match ? match[1] : null;
  };

  const handleUpload = () => {
    const id = extractId(link);
    if (!id) {
      alert("Invalid YouTube link");
      return;
    }

    onUpload({
      title,
      link: `https://www.youtube.com/embed/${id}`,
      videoId: id,
      views: 0,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Add Video</h2>

        <input
          type="text"
          placeholder="YouTube Link"
          className="w-full border px-3 py-2 rounded mb-3"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <input
          type="text"
          placeholder="Video Title"
          className="w-full border px-3 py-2 rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

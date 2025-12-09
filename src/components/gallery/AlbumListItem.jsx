import React from "react";

export default function AlbumListItem({ album, onOpen, onDelete, onUpdate }) {
  return (
    <div className="flex items-center justify-between border p-3 rounded">
      <div className="flex items-center gap-4">
        {/* small cover thumb if exists */}
        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          {album.images[0] ? (
            <img src={album.images[0]} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="text-xs text-gray-400">No image</div>
          )}
        </div>

        <div>
          <button onClick={onOpen} className="text-left">
            <div className="font-semibold">{album.name}</div>
            <div className="text-xs text-gray-500">{album.images.length} images</div>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            const newName = prompt("Rename album", album.name);
            if (newName && newName.trim()) {
              onUpdate({ ...album, name: newName.trim() });
            }
          }}
          className="px-3 py-1 border rounded text-sm"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
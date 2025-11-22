import React, { useState } from "react";
import AddAlbumModal from "./AddAlbumModal";

export default function GalleryManager({ albums, onOpenAlbum, onAddAlbum, onDeleteAlbum }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gallery Management</h1>

        <button
          className="bg-orange-500 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Album
        </button>
      </div>

      {albums.length === 0 ? (
        <p className="text-gray-500">No albums yet. Add one!</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {albums.map((album, i) => (
            <div
              key={i}
              className="bg-white rounded shadow cursor-pointer overflow-hidden hover:shadow-md transition relative"
            >
              <div onClick={() => onOpenAlbum(album)}>
                <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                  {album.images.length > 0 ? (
                    <img src={album.images[0].url} className="w-full h-full object-cover" />
                  ) : (
                    "No Images"
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{album.title}</h3>
                  <p className="text-sm text-gray-500">{album.images.length} images</p>
                </div>
              </div>

              {/* Delete button */}
              <button
                onClick={() => onDeleteAlbum(album)}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <AddAlbumModal
          onClose={() => setShowModal(false)}
          onAdd={(album) => {
            onAddAlbum(album);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

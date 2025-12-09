import React, { useEffect, useState } from "react";
import AddAlbumModal from "./AddAlbumModal";
import AlbumListItem from "./AlbumListItem";
import AlbumView from "./AlbumView";
import { loadAlbumsFromStorage, saveAlbumsToStorage, generateId } from "../../utils/storage";

export default function GalleryPage() {
  const [albums, setAlbums] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    const loaded = loadAlbumsFromStorage();
    setAlbums(loaded);
  }, []);

  useEffect(() => {
    saveAlbumsToStorage(albums);
  }, [albums]);

  const addAlbum = (album) => {
    const newAlbum = { ...album, id: generateId(), createdAt: Date.now() };
    setAlbums((s) => [newAlbum, ...s]);
  };

  const deleteAlbum = (id) => {
    if (!confirm("Delete this album? This will remove all images.")) return;
    setAlbums((s) => s.filter((a) => a.id !== id));
    if (selectedAlbum && selectedAlbum.id === id) setSelectedAlbum(null);
  };

  const updateAlbum = (updated) => {
    setAlbums((s) => s.map((a) => (a.id === updated.id ? updated : a)));
    if (selectedAlbum && selectedAlbum.id === updated.id) setSelectedAlbum(updated);
  };

  return (
    <div className="bg-white p-6 rounded shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gallery Albums</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded"
          >
            + Add Album
          </button>
        </div>
      </div>

      {/* Plain list (no cards) */}
      <div className="space-y-3">
        {albums.length === 0 && (
          <div className="text-sm text-gray-500">No albums yet. Click "Add Album".</div>
        )}

        {albums.map((album) => (
          <AlbumListItem
            key={album.id}
            album={album}
            onOpen={() => setSelectedAlbum(album)}
            onDelete={() => deleteAlbum(album.id)}
            onUpdate={(u) => updateAlbum(u)}
          />
        ))}
      </div>

      {showAddModal && (
        <AddAlbumModal
          onClose={() => setShowAddModal(false)}
          onAdd={(data) => {
            addAlbum(data);
            setShowAddModal(false);
          }}
        />
      )}

      {selectedAlbum && (
        <AlbumView
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
          onDeleteAlbum={() => deleteAlbum(selectedAlbum.id)}
          onUpdateAlbum={(updated) => updateAlbum(updated)}
        />
      )}
    </div>
  );
}
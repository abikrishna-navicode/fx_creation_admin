// src/utils/storage.js
const ALBUMS_KEY = "fx_albums_v1";
const SECTIONS_KEY = "fx_sections_v1";

/**
 * Generic get/save helpers
 */
export const getFromStorage = (key, fallback = []) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error("Storage get error", err);
    return fallback;
  }
};

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error("Storage save error", err);
  }
};

/**
 * Albums helpers
 */
export const loadAlbumsFromStorage = () => getFromStorage(ALBUMS_KEY, []);
export const saveAlbumsToStorage = (albums) => saveToStorage(ALBUMS_KEY, albums);

/**
 * Sections helpers
 * Sections structure: [{ id, title, images: [{id, src}, ...] }, ...]
 */
export const loadSectionsFromStorage = () => getFromStorage(SECTIONS_KEY, []);
export const saveSectionsToStorage = (sections) => saveToStorage(SECTIONS_KEY, sections);

/**
 * Generate id
 */
export const generateId = (prefix = "") =>
  (prefix ? prefix + "_" : "") + Math.random().toString(36).slice(2, 9);

/**
 * Convert File to dataURL (base64) so images persist in localStorage
 * Returns Promise<string>
 */
export const fileToDataUrl = (file) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });

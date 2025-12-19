// src/utils/storage.js

const ALBUMS_KEY = "fx_albums_v1";
const SECTIONS_KEY = "fx_sections_v1";

/**
 * Generic get/save helpers
 */

/**
 * Retrieve JSON data from localStorage.
 * @param {string} key - localStorage key
 * @param {Array|Object} fallback - default value if key not found
 * @returns {any} parsed JSON or fallback
 */
export const getFromStorage = (key, fallback = []) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error("Storage get error:", err);
    return fallback;
  }
};

/**
 * Save JSON data to localStorage.
 * @param {string} key - localStorage key
 * @param {any} data - data to save
 */
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error("Storage save error:", err);
  }
};

/**
 * Albums helpers
 */
export const loadAlbumsFromStorage = () => getFromStorage(ALBUMS_KEY, []);
export const saveAlbumsToStorage = (albums) => saveToStorage(ALBUMS_KEY, albums);

/**
 * Sections helpers
 */
export const loadSectionsFromStorage = () => getFromStorage(SECTIONS_KEY, []);
export const saveSectionsToStorage = (sections) => saveToStorage(SECTIONS_KEY, sections);

/**
 * Generate a unique ID with optional prefix.
 * @param {string} prefix - optional prefix
 * @returns {string} unique ID
 */
export const generateId = (prefix = "") =>
  (prefix ? prefix + "_" : "") + Math.random().toString(36).slice(2, 9);

/**
 * Convert a File object to data URL (base64) for storage.
 * @param {File} file - file to convert
 * @returns {Promise<string>} base64 string
 */
export const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });

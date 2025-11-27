// utilities for localStorage
const STORAGE_KEY = "fx_albums_v1";

export const loadAlbumsFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error("Load albums error", e);
    return [];
  }
};

export const saveAlbumsToStorage = (albums) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(albums));
  } catch (e) {
    console.error("Save albums error", e);
  }
};

export const generateId = () => {
  return "alb_" + Math.random().toString(36).slice(2, 9);
};

const AUTH_KEY = "fx_admin_auth";

const ADMIN_EMAIL = "admin@fxcreation.com";
const ADMIN_PASSWORD = "123456";

export const login = (email, password) => {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isLoggedIn = () => {
  return localStorage.getItem(AUTH_KEY) === "true";
};

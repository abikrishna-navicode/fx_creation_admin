const AUTH_KEY = "fx_admin_auth";
const TOKEN_KEY = "fx_admin_token";
const USER_KEY = "fx_admin_user";

const API_URL = "https://dev.backend.fxcreationstudio.com/api/login";

/**
 * LOGIN (API)
 */
export const login = async (email, password) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // ✅ Store auth state
    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(TOKEN_KEY, data.token || "");
    localStorage.setItem(USER_KEY, JSON.stringify(data.user || {}));

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err.message || "Invalid credentials",
    };
  }
};

/**
 * LOGOUT
 */
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * AUTH CHECK
 */
export const isLoggedIn = () => {
  return localStorage.getItem(AUTH_KEY) === "true";
};

/**
 * GET TOKEN (for future APIs)
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

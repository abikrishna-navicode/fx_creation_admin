import api from "./api";

const AUTH_KEY = "fx_admin_auth";
const TOKEN_KEY = "fx_admin_token";
const USER_KEY = "fx_admin_user";

/**
 * LOGIN
 */
export const login = async (email, password) => {
  try {
    const res = await api.post("/login", { email, password });

    const { token, user } = res.data;

    if (!token) {
      throw new Error("Login failed");
    }

    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user || {}));

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message:
        err.response?.data?.message || "Invalid email or password",
    };
  }
};

/**
 * LOGOUT (API + LOCAL CLEANUP)
 */
export const logout = async () => {
  try {
    await api.post("/logout"); // 🔥 API call
  } catch (err) {
    console.warn("Logout API failed, clearing session anyway");
  } finally {
    // ✅ Always clear local session
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

/**
 * AUTH CHECK
 */
export const isLoggedIn = () => {
  return localStorage.getItem(AUTH_KEY) === "true";
};

/**
 * GET TOKEN
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

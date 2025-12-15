import React, { useState } from "react";
import { login } from "../../utils/auth";

const Login = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const success = login(email, password);

    if (success) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
        onSuccess();
      }, 1500);
    } else {
      setError("Wrong email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-[350px]"
      >
        <h2 className="text-xl font-semibold text-center mb-6">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-xs mt-2">{error}</p>
        )}

        <button
          type="submit"
          className="w-full mt-5 bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Login
        </button>

        {/* Snackbar */}
        {snackbar && (
          <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow">
            Login successful
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;

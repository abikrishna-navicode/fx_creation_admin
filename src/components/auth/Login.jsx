import React, { useState } from "react";
import { login } from "../../utils/auth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // Real-time email validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setEmailError("");
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  // Real-time password validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setPasswordError("");
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 8 characters and include a letter and a number"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Final validation
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters and include a letter and a number"
      );
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
        onSuccess();
      }, 1200);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-lg w-[400px] flex flex-col items-center"
      >
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="Logo" className="w-16 h-16 mb-3" />
          <h1 className="text-2xl font-bold text-gray-800">
            FX CREATION STUDIO
          </h1>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Admin Login
        </h2>

        {/* Email */}
        <div className="w-full mb-4">
          <input
            type="email"
            placeholder="Enter email address"
            className={`w-full border px-4 py-3 rounded text-lg focus:outline-none ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Password */}
        <div className="w-full mb-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full border px-4 py-3 rounded text-lg focus:outline-none ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        {/* API Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-5 bg-orange-500 text-white py-3 rounded text-lg hover:bg-orange-600 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {snackbar && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-5 py-3 rounded shadow-lg">
            Login successful
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;

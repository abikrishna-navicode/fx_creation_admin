import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // tailwind css entry if using tailwind

createRoot(document.getElementById("root")).render(<App />);

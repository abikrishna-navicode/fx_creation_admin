import React, { useState } from "react";
import Login from "./components/auth/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";
import { isLoggedIn } from "./utils/auth";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [page, setPage] = useState("dashboard");

  if (!loggedIn) {
    return <Login onSuccess={() => setLoggedIn(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        onNavigate={setPage}
        onLogout={() => {
          setLoggedIn(false);
          setPage("dashboard");
        }}
      />
      <main className="flex-1 p-6">
        <Main activePage={page} />
      </main>
    </div>
  );
}

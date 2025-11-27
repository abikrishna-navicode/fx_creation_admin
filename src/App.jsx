import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";

const App = () => {
  const [activePage, setActivePage] = useState("gallery"); // default to gallery

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <aside className="w-60 border-r bg-white">
        <Sidebar onNavigate={setActivePage} />
      </aside>

      <main className="flex-1 p-6 bg-white">
        <Main activePage={activePage} />
      </main>
    </div>
  );
};

export default App;

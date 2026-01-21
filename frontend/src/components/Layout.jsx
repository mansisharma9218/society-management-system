import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ role = "resident" }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-layout">
      {sidebarOpen && <Sidebar role={role} />}

      <div className="main-content">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="page">
          <div className={`content-wrapper ${!sidebarOpen ? "centered" : ""}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;

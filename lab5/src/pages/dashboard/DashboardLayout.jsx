// src/pages/dashboard/DashboardLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <aside style={{ width: 220, padding: 10, borderRight: "1px solid #ddd" }}>
        <h3>Admin Dashboard</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <NavLink to="/dashboard" end>Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/settings">Settings</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reports">Reports</NavLink>
          </li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: 10 }}>
        <Outlet />
      </main>
    </div>
  );
}

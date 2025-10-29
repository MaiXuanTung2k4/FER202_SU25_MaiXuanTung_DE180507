// src/components/Navigation.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav style={{ display: "flex", gap: 20, padding: 20 }}>
      <NavLink 
        to="/"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Home
      </NavLink>

      <NavLink
        to="/san-pham"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Sản phẩm
      </NavLink>

      <NavLink
        to="/lien-he"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Liên hệ
      </NavLink>

      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Dashboard
      </NavLink>
    </nav>
  );
}

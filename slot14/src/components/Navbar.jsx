import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "red" : "black",
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
        backgroundColor: "#f2f2f2",
      }}
    >
      <NavLink to="/" style={linkStyle}>
        Trang Chủ
      </NavLink>
      <NavLink to="/san-pham" style={linkStyle}>
        Sản Phẩm
      </NavLink>
      <NavLink to="/lien-he" style={linkStyle}>
        Liên Hệ
      </NavLink>
    </nav>
  );
}

export default Navbar;

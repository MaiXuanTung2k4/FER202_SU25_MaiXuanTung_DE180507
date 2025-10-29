// src/pages/Products.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const products = [
    { id: 101, name: "Sản phẩm 101" },
    { id: 102, name: "Sản phẩm 102" },
    { id: 103, name: "Sản phẩm 103" },
  ];

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link to={`/san-pham/${p.id}`}>
              {p.name} (ID: {p.id})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

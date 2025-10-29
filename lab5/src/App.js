// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Navigation from "./components/Navigation";

import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Settings from "./pages/dashboard/Settings";
import Reports from "./pages/dashboard/Reports";

export default function App() {
  return (
    <>
      {/* Navigation đặt cố định ở trên */}
      <Navigation />

      <Routes>
        {/* Route cơ bản */}
        <Route path="/" element={<Home />} />
        <Route path="/lien-he" element={<Contact />} />

        {/* Bài 2 – Dynamic Routing */}
        <Route path="/san-pham" element={<Products />} />
        <Route path="/san-pham/:productId" element={<ProductDetail />} />

        {/* Bài 3 – Nested Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="settings" element={<Settings />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Chi tiết sản phẩm</h2>
      <p>Sản phẩm có ID: <strong>{productId}</strong></p>

      <button onClick={() => navigate("/san-pham")}>
        ← Quay lại danh sách
      </button>
    </div>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

const AppRouter = () => {
  const token = localStorage.getItem("user");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={token ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

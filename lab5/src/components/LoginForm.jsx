import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset lỗi
    let newErrors = { username: "", password: "" };
    let hasError = false;

    if (!username.trim()) {
      newErrors.username = "Vui lòng nhập tên đăng nhập";
      hasError = true;
    }
    if (!password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    const success = await login(username, password);

    if (success) {
      navigate("/movies");
    } else {
      setErrors({ ...newErrors, password: "Sai tài khoản hoặc mật khẩu!" });
    }
  };

  const handleCancel = () => {
    setUsername("");
    setPassword("");
    setErrors({ username: "", password: "" });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3">Movie Login</h3>

        <Form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Đăng nhập
            </Button>
            <Button variant="secondary" type="button" onClick={handleCancel}>
              Hủy
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;

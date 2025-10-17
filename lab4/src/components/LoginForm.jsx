import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Vui lòng nhập đủ thông tin!");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Email không hợp lệ!");
    } else {
      setMessage("Đăng nhập thành công!");
    }
  };

  return (
    <Card className="p-3 mt-3">
      <h3>Exercise 3: Login Form</h3>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Nhập email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Nhập mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Đăng nhập</Button>
      </Form>
    </Card>
  );
}

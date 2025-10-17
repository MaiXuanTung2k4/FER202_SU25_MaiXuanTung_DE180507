import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

export default function SignUpForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirm } = form;
    if (!name || !email || !password || !confirm)
      return setMessage("Vui lòng điền đầy đủ thông tin!");
    if (!/\S+@\S+\.\S+/.test(email))
      return setMessage("Email không hợp lệ!");
    if (password.length < 6)
      return setMessage("Mật khẩu phải có ít nhất 6 ký tự!");
    if (password !== confirm)
      return setMessage("Mật khẩu không khớp!");
    setMessage("Đăng ký thành công!");
  };

  return (
    <Card className="p-3 mt-3">
      <h3>Exercise 4: Sign Up Form</h3>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Họ tên</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Họ tên"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Nhập lại mật khẩu</Form.Label>
          <Form.Control
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Đăng ký</Button>
      </Form>
    </Card>
  );
}

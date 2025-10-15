import React, { useState } from 'react';
import { Form, Button, Toast, Modal, Card, Container } from 'react-bootstrap';

function RegisterForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const usernameRegex = /^(?!\s)(?!.*\s$)[A-Za-z0-9._]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        return usernameRegex.test(value)
          ? ''
          : 'Username ≥3 ký tự, chỉ chữ/số/._, không khoảng trắng đầu/cuối';
      case 'email':
        return emailRegex.test(value) ? '' : 'Email không hợp lệ';
      case 'password':
        return passwordRegex.test(value)
          ? ''
          : 'Password ≥8, có hoa, thường, số và ký tự đặc biệt';
      case 'confirm':
        return value === form.password ? '' : 'Confirm password không khớp';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      newErrors[key] = validateField(key, form[key]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).every((err) => err === '')) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setForm({ username: '', email: '', password: '', confirm: '' });
    setErrors({});
  };

  return (
    <Container className="mt-5">
      {/* 👇 Tiêu đề thêm vào đây */}
      <h3 className="text-center mb-4 text-primary">Đăng ký tài khoản</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            value={form.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={form.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            isInvalid={!!errors.confirm}
          />
          <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
        </Form.Group>

        <div className="text-center">
          <Button variant="secondary" onClick={handleCancel} className="me-2">
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={
              Object.values(errors).some((e) => e !== '') ||
              Object.values(form).some((v) => !v)
            }
          >
            Submit
          </Button>
        </div>
      </Form>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{ position: 'fixed', top: 20, right: 20 }}
      >
        <Toast.Header>
          <strong className="me-auto">Thông báo</strong>
        </Toast.Header>
        <Toast.Body>Submitted successfully!</Toast.Body>
      </Toast>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin đã đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title>{form.username}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {form.email} <br />
                <strong>Password:</strong> {form.password}
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default RegisterForm;

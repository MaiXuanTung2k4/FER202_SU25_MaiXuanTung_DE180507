import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FormComponent() {
  const [user, setUser] = useState({ name: 'tungmx', email: 'tungmxde180507@fpt.edu.vn' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Tên: ${user.name}\nEmail: ${user.email}`);
  };

  return (
    <div style={{ width: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 className="text-center mb-4">Thông Tin Người Dùng</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Nhập tên của bạn"
            value={user.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Nhập email của bạn"
            value={user.email}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Gửi Thông Tin
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default FormComponent;

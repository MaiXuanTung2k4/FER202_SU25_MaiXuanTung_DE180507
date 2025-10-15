import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

function ProfileForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = 'Name không được rỗng';
    if (!email.includes('@')) next.email = 'Email phải có @';
    const ageNum = Number(age);
    if (!age || isNaN(ageNum) || ageNum < 18 || ageNum > 55) next.age = 'Age phải từ 18 đến 55';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setShowToast(true);
    setShowModal(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setAge('');
    setErrors({});
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Enter your age" />
          {errors.age && <div className="text-danger">{errors.age}</div>}
        </Form.Group>

        <Button variant="secondary" onClick={handleReset} style={{ marginRight: 8 }}>Cancel</Button>
        <Button variant="primary" type="submit" disabled={!name || !email || !age}>Submit</Button>
      </Form>

      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide style={{ position: 'fixed', top: 10, right: 10 }}>
        <Toast.Header>
          <strong className="me-auto">Thông báo</strong>
        </Toast.Header>
        <Toast.Body>Submitted successfully!</Toast.Body>
      </Toast>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submitted Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {email} <br />
                <strong>Age:</strong> {age}
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileForm;

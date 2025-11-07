// src/components/ConfirmModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// ⚠️ Không import usePayment ở đây — Modal không dùng context này

const ConfirmModal = ({ show, title, message, onConfirm, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;

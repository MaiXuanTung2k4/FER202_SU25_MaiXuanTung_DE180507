import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const UserFilter = ({ filter, onChange }) => (
  <Row className="mb-3">
    <Col md={4}>
      <Form.Control
        name="search"
        value={filter.search}
        onChange={onChange}
        placeholder="Search by username"
      />
    </Col>
    <Col md={3}>
      <Form.Select name="role" value={filter.role} onChange={onChange}>
        <option value="">All roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </Form.Select>
    </Col>
    <Col md={3}>
      <Form.Select name="status" value={filter.status} onChange={onChange}>
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="locked">Locked</option>
      </Form.Select>
    </Col>
  </Row>
);

export default UserFilter;

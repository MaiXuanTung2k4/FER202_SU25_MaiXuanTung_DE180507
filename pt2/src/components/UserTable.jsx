import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';

const UserTable = ({ users, onToggle, onView }) => (
  <Table bordered hover responsive>
    <thead className="table-primary text-center">
      <tr>
        <th>#</th>
        <th>Avatar</th>
        <th>Username</th>
        <th>Full Name</th>
        <th>Role</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {users.length === 0 ? (
        <tr>
          <td colSpan={7} className="text-center text-muted">
            No users found.
          </td>
        </tr>
      ) : (
        users.map((u, i) => (
          <tr key={u.id}>
            <td className="text-center">{i + 1}</td>
            <td className="text-center">
              <Image
                src={u.avatar || '/images/default-avatar.png'}
                width={40}
                height={40}
                roundedCircle
                alt={u.username}
              />
            </td>
            <td>{u.username}</td>
            <td>{u.fullName}</td>
            <td className="text-center">{u.role}</td>
            <td className="text-center">
              <span
                className={`badge ${u.status === 'active' ? 'bg-success' : 'bg-danger'}`}
              >
                {u.status}
              </span>
            </td>
            <td className="text-center">
              <Button
                size="sm"
                variant="info"
                className="me-2"
                onClick={() => onView(u)}
              >
                View Details
              </Button>
              <Button
                size="sm"
                variant={u.status === 'active' ? 'danger' : 'success'}
                onClick={() => onToggle(u)}
              >
                {u.status === 'active' ? 'Ban Account' : 'Unban'}
              </Button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </Table>
);

export default UserTable;

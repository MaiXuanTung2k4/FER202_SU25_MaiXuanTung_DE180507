// src/pages/UserManagementPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Alert,
  Navbar,
  Nav,
  Image,
  Modal,
} from 'react-bootstrap';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const UserManagementPage = () => {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState({ search: '', role: '', status: '' });
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // để hiển thị View Details modal

  // 🔹 Chỉ admin active mới được vào
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'admin') {
      setError('Bạn không có quyền truy cập. Chỉ admin mới được phép.');
      return;
    }
    if (user.status !== 'active') {
      setError('Tài khoản của bạn đã bị khóa. Không thể truy cập hệ thống.');
      return;
    }
    fetchUsers();
  }, [user]);

  // 🔹 Lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
      alert('Không thể tải danh sách người dùng.');
    }
  };

  // 🔹 Lọc dữ liệu
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    applyFilters();
  }, [filter, users]);

  const applyFilters = () => {
    let data = [...users];
    const q = filter.search.trim().toLowerCase();

    if (q) data = data.filter((u) => u.username.toLowerCase().includes(q));
    if (filter.role) data = data.filter((u) => u.role === filter.role);
    if (filter.status) data = data.filter((u) => u.status === filter.status);

    setFiltered(data);
  };

  // 🔹 Khóa / Mở tài khoản
  const toggleStatus = async (u) => {
    const newStatus = u.status === 'active' ? 'locked' : 'active';
    if (
      !window.confirm(
        `Bạn có chắc muốn ${newStatus === 'locked' ? 'KHÓA' : 'MỞ KHÓA'} tài khoản ${u.username}?`
      )
    )
      return;

    try {
      await api.patch(`/users/${u.id}`, { status: newStatus });
      setUsers((prev) =>
        prev.map((usr) => (usr.id === u.id ? { ...usr, status: newStatus } : usr))
      );
      alert(`Đã ${newStatus === 'locked' ? 'khóa' : 'mở khóa'} tài khoản ${u.username}.`);
    } catch (err) {
      console.error(err);
      alert('Không thể cập nhật trạng thái tài khoản.');
    }
  };

  // 🔹 Xem chi tiết
  const viewDetails = (u) => {
    setSelectedUser(u);
  };

  // 🔹 Đăng xuất
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('pt_user');
    navigate('/login');
  };

  // 🔹 Nếu bị khóa hoặc không phải admin
  if (error) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate('/home')}>
          Quay lại
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* 🔹 Thanh header */}
      <Navbar bg="light" className="mb-3 shadow-sm">
        <Container>
          <Navbar.Brand>User Management</Navbar.Brand>
          <Nav className="ms-auto align-items-center">
            <Button
              variant="outline-primary"
              className="me-3"
              onClick={() => navigate('/home')}
            >
              Back to Home
            </Button>
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* 🔹 Bộ lọc người dùng */}
      <Container>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              name="search"
              value={filter.search}
              onChange={handleFilterChange}
              placeholder="Search by username"
            />
          </Col>
          <Col md={3}>
            <Form.Select name="role" value={filter.role} onChange={handleFilterChange}>
              <option value="">All roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select name="status" value={filter.status} onChange={handleFilterChange}>
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="locked">Locked</option>
            </Form.Select>
          </Col>
        </Row>

        {/* 🔹 Bảng danh sách users */}
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-muted">
                  No users found.
                </td>
              </tr>
            ) : (
              filtered.map((u, i) => (
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
                      className={`badge ${
                        u.status === 'active' ? 'bg-success' : 'bg-danger'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <Button
                      size="sm"
                      variant="info"
                      className="me-2"
                      onClick={() => viewDetails(u)}
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant={u.status === 'active' ? 'danger' : 'success'}
                      onClick={() => toggleStatus(u)}
                    >
                      {u.status === 'active' ? 'Ban Account' : 'Unban'}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>

      {/* 🔹 Modal hiển thị chi tiết user */}
      <Modal show={!!selectedUser} onHide={() => setSelectedUser(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <div className="text-center mb-3">
                <Image
                  src={selectedUser.avatar || '/images/default-avatar.png'}
                  width={80}
                  height={80}
                  roundedCircle
                />
              </div>
              <p>
                <strong>ID:</strong> {selectedUser.id}
              </p>
              <p>
                <strong>Username:</strong> {selectedUser.username}
              </p>
              <p>
                <strong>Full Name:</strong> {selectedUser.fullName}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={`badge ${
                    selectedUser.status === 'active' ? 'bg-success' : 'bg-danger'
                  }`}
                >
                  {selectedUser.status}
                </span>
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedUser(null)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserManagementPage;

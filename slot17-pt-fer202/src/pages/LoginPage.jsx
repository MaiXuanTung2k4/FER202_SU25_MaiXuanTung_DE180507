import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Card,
  Alert,
} from "react-bootstrap";
import api from "../services/api";
import ConfirmModal from "../components/ConfirmModal";
import { useAuthDispatch } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(""); // ✅ lỗi từ server
  const [modalShow, setModalShow] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  // Validate input
  const validate = () => {
    const e = {};
    if (!form.identifier.trim()) e.identifier = "Username or Email is required.";
    if (!form.password.trim()) e.password = "Password is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setServerError(""); // clear error khi người dùng gõ lại
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await api.get("/users", { params: { q: form.identifier } });
      const users = res.data.filter(
        (u) => u.username === form.identifier || u.email === form.identifier
      );

      if (users.length === 0 || users[0].password !== form.password) {
        setServerError("Invalid username/email or password!");
        return;
      }

      const user = users[0];
      dispatch({ type: "LOGIN", payload: user });
      localStorage.setItem("pt_user", JSON.stringify(user));

      setModalMsg(`Welcome, ${user.username}! Login successful.`);
      setModalShow(true);
      setTimeout(() => {
        setModalShow(false);
        navigate("/home");
      }, 1500);
    } catch (err) {
      setServerError("Login failed. Please check JSON server and db.json.");
      console.error(err);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setForm({ identifier: "", password: "" });
    setErrors({});
    setServerError("");
  };

  return (
    <Container className="d-flex vh-100 align-items-center justify-content-center bg-light">
      <Row className="w-100">
        <Col md={{ span: 4, offset: 4 }}>
          <Card className="shadow-sm border-0">
            <Card.Header className="text-center bg-secondary text-white">
              <h5 className="fw-bold m-0">Login</h5>
            </Card.Header>

            <Card.Body>
              {/* ✅ Hiển thị lỗi đỏ */}
              {serverError && (
                <Alert variant="danger" dismissible onClose={() => setServerError("")}>
                  {serverError}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {/* Username or Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Username or email</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      name="identifier"
                      placeholder="Enter username or email"
                      value={form.identifier}
                      onChange={handleChange}
                      isInvalid={!!errors.identifier}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.identifier}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={form.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    style={{ width: "48%" }}
                  >
                    Login
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    style={{ width: "48%" }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <ConfirmModal
            show={modalShow}
            title="Login Success"
            message={modalMsg}
            onClose={() => setModalShow(false)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;

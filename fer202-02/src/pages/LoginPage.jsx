import { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function LoginPage() {
  const [input, setInput] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra rỗng
    if (!input.username || !input.password) {
      setError("Username and password are required");
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (input.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await api.get(
        `/users?username=${input.username}&password=${input.password}`
      );

      if (res.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        navigate("/home", { replace: true });
        window.location.reload();
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Server connection error");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "360px" }} className="shadow-sm p-4">
        <h3 className="text-center mb-4">Login</h3>

        <Form onSubmit={handleSubmit}>
          {/* Hiển thị lỗi phía trên username */}
          {error &&
            error !== "Password must be at least 6 characters" && (
              <Alert variant="danger" className="py-1 mb-3 text-center">
                {error}
              </Alert>
            )}

          {/* Ô Username */}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={input.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </Form.Group>

          {/* Ô Password */}
          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            {error === "Password must be at least 6 characters" && (
              <Form.Text className="text-danger">
                <i className="bi bi-exclamation-circle"></i> Password must be at
                least 6 characters
              </Form.Text>
            )}
          </Form.Group>

          <div className="d-grid mt-3">
            <Button type="submit" variant="primary">
              Login
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

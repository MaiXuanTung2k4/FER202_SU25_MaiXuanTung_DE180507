import React, { useReducer } from "react";
import { Form, Button, Card, Alert, Modal } from "react-bootstrap";


const initialState = {
  email: "",
  password: "",
  message: "",
  variant: "danger",
  errors: {},
  showModal: false, 
};

// Hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "SET_ERRORS":
      return { ...state, errors: action.payload };

    case "SET_MESSAGE":
      return { ...state, message: action.payload.message, variant: action.payload.variant };

    case "SHOW_MODAL":
      return { ...state, showModal: true };

    case "HIDE_MODAL":
      return { ...state, showModal: false };

    case "RESET":
      return { ...initialState };

    default:
      return state;
  }
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!state.email.trim()) newErrors.email = "Vui lòng nhập email!";
    else if (!/\S+@\S+\.\S+/.test(state.email)) newErrors.email = "Email không hợp lệ!";
    if (!state.password.trim()) newErrors.password = "Vui lòng nhập mật khẩu!";

    dispatch({ type: "SET_ERRORS", payload: newErrors });

    // Nếu có lỗi
    if (Object.keys(newErrors).length > 0) {
      dispatch({
        type: "SET_MESSAGE",
        payload: { message: "Vui lòng điền đầy đủ thông tin!", variant: "info" },
      });
      return;
    }

    // Nếu hợp lệ
    dispatch({
      type: "SET_MESSAGE",
      payload: { message: "Đăng nhập thành công!", variant: "success" },
    });

    // Hiện Modal
    dispatch({ type: "SHOW_MODAL" });
  };

  const handleCloseModal = () => {
    dispatch({ type: "HIDE_MODAL" });
    dispatch({ type: "RESET" });
  };

  return (
    <Card style={{ padding: 16, marginBottom: 16 }}>
      <h3>Exercise 3: Login Form (useReducer + Modal)</h3>

      {/* Alert phía trên */}
      {state.message && <Alert variant={state.variant}>{state.message}</Alert>}

      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nhập email"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })
            }
            isInvalid={!!state.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {state.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })
            }
            isInvalid={!!state.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {state.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Đăng nhập</Button>
      </Form>

      {/* Modal thông báo thành công */}
      <Modal show={state.showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập thành công!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Chào mừng bạn, {state.email || "người dùng"} </p>
          <p>Bạn đã đăng nhập thành coong.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

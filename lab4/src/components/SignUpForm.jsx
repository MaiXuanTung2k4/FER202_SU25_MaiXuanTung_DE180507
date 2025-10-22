import React, { useReducer } from "react";
import { Form, Button, Card, Alert, Modal } from "react-bootstrap";


const initialState = {
  name: "",
  email: "",
  password: "",
  confirm: "",
  message: "",
  variant: "danger",
  errors: {},
  showModal: false, 
};

//  Hàm reducer điều khiển toàn bộ logic
function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "SET_ERRORS":
      return { ...state, errors: action.payload };

    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload.message,
        variant: action.payload.variant,
      };

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

// Component chính
export default function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hàm kiểm tra dữ liệu nhập
  const validate = () => {
    const newErrors = {};
    if (!state.name.trim()) newErrors.name = "Vui lòng nhập họ tên!";
    if (!state.email.trim()) newErrors.email = "Vui lòng nhập email!";
    else if (!/\S+@\S+\.\S+/.test(state.email))
      newErrors.email = "Email không hợp lệ!";
    if (!state.password) newErrors.password = "Vui lòng nhập mật khẩu!";
    else if (state.password.length < 6)
      newErrors.password = "Mật khẩu cần ít nhất 6 ký tự!";
    if (!state.confirm) newErrors.confirm = "Vui lòng nhập lại mật khẩu!";
    else if (state.password !== state.confirm)
      newErrors.confirm = "Mật khẩu không khớp!";
    return newErrors;
  };

  // Khi bấm nút "Đăng ký"
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    dispatch({ type: "SET_ERRORS", payload: newErrors });

    // Nếu có lỗi
    if (Object.keys(newErrors).length > 0) {
      dispatch({
        type: "SET_MESSAGE",
        payload: {
          message: "Vui lòng điền đầy đủ thông tin!",
          variant: "info",
        },
      });
      return;
    }

    // Nếu hợp lệ
    dispatch({
      type: "SET_MESSAGE",
      payload: {
        message: "Đăng ký thành công!",
        variant: "success",
      },
    });

    // Hiển thị Modal thông báo
    dispatch({ type: "SHOW_MODAL" });
  };

  // Đóng Modal
  const handleCloseModal = () => {
    dispatch({ type: "HIDE_MODAL" });
    dispatch({ type: "RESET" });
  };

  return (
    <Card style={{ padding: 16, marginBottom: 16 }}>
      <h3>Exercise 4: Sign Up Form (useReducer + Modal)</h3>

      {/* Alert thông báo phía trên */}
      {state.message && <Alert variant={state.variant}>{state.message}</Alert>}

      <Form noValidate onSubmit={handleSubmit}>
        {/* Họ tên */}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Họ tên</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập họ tên"
            value={state.name}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "name",
                value: e.target.value,
              })
            }
            isInvalid={!!state.errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {state.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Nhập email"
            value={state.email}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "email",
                value: e.target.value,
              })
            }
            isInvalid={!!state.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {state.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Mật khẩu */}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            value={state.password}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "password",
                value: e.target.value,
              })
            }
            isInvalid={!!state.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {state.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Nhập lại mật khẩu */}
        <Form.Group className="mb-3" controlId="confirm">
          <Form.Label>Nhập lại mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={state.confirm}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "confirm",
                value: e.target.value,
              })
            }
            isInvalid={!!state.errors.confirm}
          />
          <Form.Control.Feedback type="invalid">
            {state.errors.confirm}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Đăng ký</Button>
      </Form>

      {/* Modal hiển thị sau khi đăng ký thành công */}
      <Modal show={state.showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> Tạo thành công.</p>
          <p>Email: {state.email}</p>
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

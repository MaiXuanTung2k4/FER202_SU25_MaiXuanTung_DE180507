import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  Navbar,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../store/expenseSlice";

export default function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.list);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All categories");

  useEffect(() => {
    if (user) dispatch(fetchExpenses(user.id));
  }, [dispatch, user]);

  // Tổng chi tiêu
  const filteredExpenses =
    filter === "All categories"
      ? expenses
      : expenses.filter((e) => e.category === filter);

  const total = filteredExpenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  // ====== Form xử lý ======
  const [form, setForm] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name || !form.category || form.amount <= 0) {
      alert("Please fill all fields correctly");
      return;
    }

    const expenseData = { ...form, userId: user.id };

    if (selected) {
      dispatch(updateExpense({ ...expenseData, id: selected.id }));
    } else {
      dispatch(addExpense(expenseData));
    }
    setForm({ name: "", amount: "", category: "", date: "" });
    setSelected(null);
  };

  const handleEdit = (item) => {
    setSelected(item);
    setForm({
      name: item.name,
      amount: item.amount,
      category: item.category,
      date: item.date,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this expense?")) dispatch(deleteExpense(id));
  };

  const handleReset = () => {
    setSelected(null);
    setForm({ name: "", amount: "", category: "", date: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // Lấy danh sách category duy nhất
  const categories = [
    "All categories",
    ...new Set(expenses.map((e) => e.category)),
  ];

  return (
    <>
      {/* ===== Header ===== */}
      <Navbar bg="light" className="shadow-sm mb-3 px-3">
        <Navbar.Brand className="fw-bold">💰 PersonalBudget</Navbar.Brand>
        <div className="ms-auto">
          Signed in as <b>{user.fullName}</b>{" "}
          <Button
            variant="outline-danger"
            size="sm"
            className="ms-2"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Navbar>

      <Container fluid>
        <Row className="mb-3">
          {/* ===== Tổng chi tiêu ===== */}
          <Col md={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Total of Expenses</Card.Title>
                <h5 className="text-primary fw-bold">
                  {total.toLocaleString("vi-VN")} ₫
                </h5>
              </Card.Body>
            </Card>
          </Col>

          {/* ===== Bộ lọc ===== */}
          <Col md={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Filter</Card.Title>
                <Form.Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Form.Select>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* ===== Form thêm / chỉnh sửa ===== */}
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{selected ? "Edit Expense" : "Add Expense"}</Card.Title>
                <Form onSubmit={handleSave}>
                  <Form.Group className="mb-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      name="amount"
                      type="number"
                      value={form.amount}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      onClick={handleReset}
                      type="button"
                    >
                      Reset
                    </Button>
                    <Button type="submit" variant="primary">
                      Save
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* ===== Bảng chi tiêu ===== */}
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Expense Management</Card.Title>
                <Table bordered hover responsive>
                  <thead>
                    <tr className="table-light">
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses.map((e) => (
                      <tr key={e.id}>
                        <td>{e.name}</td>
                        <td>{Number(e.amount).toLocaleString("vi-VN")} ₫</td>
                        <td>{e.category}</td>
                        <td>
                          {new Date(e.date).toLocaleDateString("vi-VN")}
                        </td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEdit(e)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(e.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* ===== Footer ===== */}
        <footer className="text-center text-muted mt-3 mb-2 small">
          © 2025 PersonalBudget Demo — Built with React, Redux Toolkit & JSON
          Server
        </footer>
      </Container>
    </>
  );
}

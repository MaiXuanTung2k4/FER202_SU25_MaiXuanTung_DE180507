import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function ExpenseForm({ onAdd }) {
  const [expense, setExpense] = useState({ name: "", amount: "", category: "", date: "" });

  const handleChange = (e) => setExpense({ ...expense, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.name || !expense.category || expense.amount <= 0) {
      alert("Please enter valid data!");
      return;
    }
    onAdd(expense);
    setExpense({ name: "", amount: "", category: "", date: "" });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control name="name" placeholder="Name" value={expense.name} onChange={handleChange} className="mb-2" />
      <Form.Control name="amount" type="number" placeholder="Amount" value={expense.amount} onChange={handleChange} className="mb-2" />
      <Form.Control name="category" placeholder="Category" value={expense.category} onChange={handleChange} className="mb-2" />
      <Form.Control name="date" type="date" value={expense.date} onChange={handleChange} className="mb-2" />
      <Button type="submit" variant="success">Add Expense</Button>
    </Form>
  );
}

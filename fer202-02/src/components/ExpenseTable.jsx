import { Table, Button } from "react-bootstrap";

export default function ExpenseTable({ data, onEdit, onDelete }) {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>Name</th><th>Amount</th><th>Category</th><th>Date</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e) => (
          <tr key={e.id}>
            <td>{e.name}</td>
            <td>{e.amount.toLocaleString()} ₫</td>
            <td>{e.category}</td>
            <td>{new Date(e.date).toLocaleDateString("vi-VN")}</td>
            <td>
              <Button variant="warning" size="sm" onClick={() => onEdit(e)}>Edit</Button>{" "}
              <Button variant="danger" size="sm" onClick={() => onDelete(e.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

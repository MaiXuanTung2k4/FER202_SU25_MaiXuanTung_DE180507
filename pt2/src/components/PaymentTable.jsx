// src/components/PaymentTable.jsx
import React from 'react';
import { Table, Button, Spinner, Card } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';

const PaymentTable = () => {
  const {
    filteredPayments,
    totalAmount,
    isLoading,
    error,
    deletePayment,
  } = usePayment();

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" />
        <div>Loading payments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-4">
        {error}
      </div>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Header as="h5">Danh sách thanh toán</Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr className="text-center">
              <th>#</th>
              <th>Semester</th>
              <th>Course Name</th>
              <th>Amount (VND)</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments && filteredPayments.length > 0 ? (
              filteredPayments.map((payment, index) => (
                <tr key={payment.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{payment.semester}</td>
                  <td>{payment.courseName}</td>
                  <td className="text-end">
                    {payment.amount.toLocaleString('vi-VN')}
                  </td>
                  <td>{payment.date}</td>
                  <td className="text-center">
                    {/* Xử lý xoá đơn giản */}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deletePayment(payment.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No payment records found.
                </td>
              </tr>
            )}
          </tbody>
          {/* Total row */}
          <tfoot>
            <tr>
              <td colSpan="3" className="text-end fw-bold">
                Total:
              </td>
              <td className="text-end fw-bold">
                {totalAmount.toLocaleString('vi-VN')}
              </td>
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default PaymentTable;

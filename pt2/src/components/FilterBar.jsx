import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';

const FilterBar = ({ filters, setFilters, semesters, onSortChange }) => {
  const handleChange = e => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
const { filteredPayments, totalAmount, setFilter, addPayment, updatePayment } = usePayment();

  return (
    <div className="mb-3 p-2 border rounded">
      <Row className="align-items-center">
        <Col md={4}>
          <Form.Control
            placeholder="Search by semester or course name"
            name="search"
            value={filters.search}
            onChange={handleChange}
          />
        </Col>
        <Col md={3}>
          <Form.Select name="semester" value={filters.semester} onChange={handleChange}>
            <option value="">All semesters</option>
            {semesters.map(s => <option key={s} value={s}>{s}</option>)}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select name="sort" value={filters.sort} onChange={(e)=>{ onSortChange(e.target.value); }}>
            <option value="">-- Sort --</option>
            <option value="name_asc">Course name A→Z</option>
            <option value="name_desc">Course name Z→A</option>
            <option value="date_asc">Date ascending</option>
            <option value="date_desc">Date descending</option>
            <option value="amount_asc">Amount ascending</option>
            <option value="amount_desc">Amount descending</option>
          </Form.Select>
        </Col>
      </Row>
    </div>
  );
};

export default FilterBar;
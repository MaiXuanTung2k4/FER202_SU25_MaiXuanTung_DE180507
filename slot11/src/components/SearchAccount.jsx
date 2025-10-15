import React, { useState } from 'react';
import { Card, Row, Col, Container, Form } from 'react-bootstrap';

const accounts = [
  { id: 1, username: 'nobita', password: '1234', avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: 2, username: 'doraemon', password: 'abcd', avatar: 'https://i.pravatar.cc/100?img=2' },
  { id: 3, username: 'shizuka', password: 'xyz', avatar: 'https://i.pravatar.cc/100?img=3' },
  { id: 4, username: 'suneo', password: 'qwer', avatar: 'https://i.pravatar.cc/100?img=4' },
];

function SearchAccount() {
  const [search, setSearch] = useState('');

  const filteredAccounts = accounts.filter((acc) =>
    acc.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">Tìm kiếm tài khoản</h3>
      <Form.Control
        type="text"
        placeholder="Nhập username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <Row>
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map((acc) => (
            <Col md={3} key={acc.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={acc.avatar} />
                <Card.Body>
                  <Card.Title>{acc.username}</Card.Title>
                  <Card.Text>Password: {acc.password}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-danger">Không tìm thấy kết quả</p>
        )}
      </Row>
    </Container>
  );
}

export default SearchAccount;

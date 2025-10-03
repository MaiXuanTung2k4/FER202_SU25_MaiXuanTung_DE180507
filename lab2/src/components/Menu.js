import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const pizzas = [
  { id: 1, name: "Margherita", price: "$8", img: "/images/pizza1.jpg" },
  { id: 2, name: "Pepperoni", price: "$10", img: "/images/pizza2.jpg" },
  { id: 3, name: "Hawaiian", price: "$12", img: "/images/pizza3.jpg" },
];

function Menu() {
  return (
    <Container className="py-5" id="menu">
      <h2 className="text-center mb-4">Our Menu</h2>
      <Row>
        {pizzas.map((pizza) => (
          <Col md={4} key={pizza.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={pizza.img} />
              <Card.Body>
                <Card.Title>{pizza.name}</Card.Title>
                <Card.Text>{pizza.price}</Card.Text>
                <Button variant="primary">Order</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Menu;

import React from "react";
import { Container, Button } from "react-bootstrap";

function Hero() {
  return (
    <div className="bg-dark text-white text-center py-5">
      <Container>
        <h1>Welcome to PizzaShop</h1>
        <p>The best pizza in town, fresh & delicious</p>
        <Button variant="warning" size="lg">Order Now</Button>
      </Container>
    </div>
  );
}

export default Hero;

import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand>🎬 Movie Manager</Navbar.Brand>
        {user && <span className="text-light">Welcome, {user.fullname}</span>}
      </Container>
    </Navbar>
  );
};

export default Header;

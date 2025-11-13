import { Navbar, Container, Button } from "react-bootstrap";

export default function Header({ user, onLogout }) {
  return (
    <Navbar bg="dark" variant="dark" className="mb-3">
      <Container>
        <Navbar.Brand>💰 PersonalBudget</Navbar.Brand>
        <Navbar.Text>
          Signed in as: <b>{user.fullName}</b> &nbsp;
          <Button variant="outline-light" size="sm" onClick={onLogout}>Logout</Button>
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}

// src/App.js
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import MyNavbar from "./components/Navbar/MyNavbar";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import FooterPage from "./pages/FooterPage";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function App() {
  const [showAccount, setShowAccount] = useState(false);

  return (
    <div>
      <MyNavbar onAccountClick={() => setShowAccount(true)} />
      <HomePage />
      <FooterPage />

      <Modal
        show={showAccount}
        onHide={() => setShowAccount(false)}
        size="lg"
        centered
        backdrop="static"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Build Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AccountPage />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAccount(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;

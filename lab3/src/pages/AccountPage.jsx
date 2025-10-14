import React, { useState } from "react";
import { ProgressBar, Form, Button, Row, Col, Nav } from "react-bootstrap";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaHashtag,
  FaQuestionCircle,
  FaImage,
} from "react-icons/fa";

export default function AccountPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    avatar: null,
    username: "",
    password: "",
    confirmPassword: "",
    secretQuestion: "",
    answer: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (!form.firstName) newErrors.firstName = "First name is required";
      if (!form.lastName) newErrors.lastName = "Last name is required";
      if (!form.email) newErrors.email = "Email is required";
      if (!form.phone) newErrors.phone = "Phone is required";
      if (!form.age) newErrors.age = "Age is required";
    } else if (step === 2) {
      if (!form.username) newErrors.username = "Username is required";
      if (!form.password) newErrors.password = "Password is required";
      if (!form.confirmPassword)
        newErrors.confirmPassword = "Confirm password is required";
      if (form.password !== form.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      if (!form.secretQuestion)
        newErrors.secretQuestion = "Secret question is required";
      if (!form.answer) newErrors.answer = "Answer is required";
    } else if (step === 3) {
      if (!form.street) newErrors.street = "Street is required";
      if (!form.city) newErrors.city = "City is required";
      if (!form.state) newErrors.state = "State is required";
      if (!form.zip) newErrors.zip = "Zip code is required";
      if (!form.country) newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);
  const handleFinish = () => {
    if (validateStep()) {
      alert("✅ Profile created successfully!");
    }
  };

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="container mt-4 mb-4 p-4 bg-white rounded shadow-sm">
      <h4 className="text-primary mb-3">Build Your Profile</h4>
      <ProgressBar now={progress} label={`${progress}%`} className="mb-4" />

      <Nav variant="tabs" activeKey={step}>
        <Nav.Item>
          <Nav.Link eventKey={1} onClick={() => setStep(1)}>
            About
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={2} onClick={() => setStep(2)}>
            Account
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={3} onClick={() => setStep(3)}>
            Address
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Form className="mt-4">
        {/* STEP 1: ABOUT */}
        {step === 1 && (
          <>
            <h5 className="mb-3 text-primary">
              <FaUser className="me-2" />
              About Information
            </h5>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUser className="me-2" /> First Name *
                  </Form.Label>
                  <Form.Control
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUser className="me-2" /> Last Name *
                  </Form.Label>
                  <Form.Control
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaEnvelope className="me-2" /> Email *
              </Form.Label>
              <Form.Control
                name="email"
                value={form.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaPhone className="me-2" /> Phone *
              </Form.Label>
              <Form.Control
                name="phone"
                value={form.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaUser className="me-2" /> Age *
              </Form.Label>
              <Form.Control
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                isInvalid={!!errors.age}
              />
              <Form.Control.Feedback type="invalid">
                {errors.age}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaImage className="me-2" /> Avatar
              </Form.Label>
              <Form.Control
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>
          </>
        )}

        {/* STEP 2: ACCOUNT */}
        {step === 2 && (
          <>
            <h5 className="mb-3 text-primary">
              <FaLock className="me-2" />
              Account Information
            </h5>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaUser className="me-2" /> Username *
              </Form.Label>
              <Form.Control
                name="username"
                value={form.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaLock className="me-2" /> Password *
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaLock className="me-2" /> Confirm Password *
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaQuestionCircle className="me-2" /> Secret Question *
              </Form.Label>
              <Form.Select
                name="secretQuestion"
                value={form.secretQuestion}
                onChange={handleChange}
                isInvalid={!!errors.secretQuestion}
              >
                <option value="">Select a question</option>
                <option value="pet">What is your first pet's name?</option>
                <option value="city">What city were you born in?</option>
                <option value="teacher">
                  Who was your favorite teacher?
                </option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.secretQuestion}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaUser className="me-2" /> Answer *
              </Form.Label>
              <Form.Control
                name="answer"
                value={form.answer}
                onChange={handleChange}
                isInvalid={!!errors.answer}
              />
              <Form.Control.Feedback type="invalid">
                {errors.answer}
              </Form.Control.Feedback>
            </Form.Group>
          </>
        )}

        {/* STEP 3: ADDRESS */}
        {step === 3 && (
          <>
            <h5 className="mb-3 text-primary">
              <FaMapMarkerAlt className="me-2" />
              Address Information
            </h5>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaMapMarkerAlt className="me-2" /> Street *
              </Form.Label>
              <Form.Control
                name="street"
                value={form.street}
                onChange={handleChange}
                isInvalid={!!errors.street}
              />
              <Form.Control.Feedback type="invalid">
                {errors.street}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaCity className="me-2" /> City *
                  </Form.Label>
                  <Form.Control
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    isInvalid={!!errors.city}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaMapMarkerAlt className="me-2" /> State *
                  </Form.Label>
                  <Form.Control
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    isInvalid={!!errors.state}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.state}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaHashtag className="me-2" /> Zip Code *
                  </Form.Label>
                  <Form.Control
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    isInvalid={!!errors.zip}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.zip}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaGlobe className="me-2" /> Country *
                  </Form.Label>
                  <Form.Select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    isInvalid={!!errors.country}
                  >
                    <option value="">Select a country</option>
                    <option>Vietnam</option>
                    <option>Japan</option>
                    <option>USA</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.country}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </>
        )}

        <div className="d-flex justify-content-between mt-4">
          {step > 1 && (
            <Button variant="secondary" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step < 3 && (
            <Button variant="primary" onClick={nextStep}>
              Next
            </Button>
          )}
          {step === 3 && (
            <Button variant="success" onClick={handleFinish}>
              Finish
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

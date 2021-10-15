import React, { useState } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import Layout from "../components/Layout/Layout";
import { login } from "../redux/actions";
import Input from "../UI/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

const LogIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);

  const userLogin = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
  };
  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }
  return (
    <div>
      <Layout />
      <h2>Sign in</h2>
      <Container>
        <Row className="mt-5">
          <Col md={{ span: 5, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                name="password"
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me?" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LogIn;

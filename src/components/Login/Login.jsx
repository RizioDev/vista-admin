import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { supabase } from "../../config/supabaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "admin@admin.com",
        password: "admin",
      });
  
      if (error) throw error;
      console.log("login correcto!", data);
    } catch (error) {
      console.error("Error de inicio de sesión:", error.message);
    }
  };
  
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col>
          <Card style={{ width: '24rem', padding: '20px' }}>
            <Card.Body>
              <Card.Title className="text-center mb-4">Club Claypole</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="pon tu email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="pon tu contraseña" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit" className="w-100">
                  Iniciar sesión
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

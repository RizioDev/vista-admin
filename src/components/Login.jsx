// src/components/Login.jsx
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const Login = ({ show, handleClose, handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación simple de usuario y contraseña
    if (username === 'admin' && password === 'admin') {
      handleLogin(username); // Llama a la función de login pasando el nombre de usuario
      handleClose(); // Cierra el modal después de iniciar sesión
    } else {
      setError('Usuario o contraseña incorrectos'); // Muestra el error si las credenciales son incorrectas
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <Button variant="primary" type="submit">
            Ingresar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;

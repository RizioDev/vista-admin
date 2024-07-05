// src/pages/Home.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import escudo from '../assets/escudo.png'; // Importa la imagen correctamente

const Home = () => {
  return (
    <Container className="text-center mt-4">
      <img src={escudo} alt="Escudo del Club Claypole" className="mb-4" style={{ maxWidth: '200px' }} />
      <h1>Bienvenido Admin de Claypole</h1>
      <p>Administrador de Socios del club</p>
    </Container>
  );
};

export default Home;


import React, { useState, useEffect } from 'react';
import { Container, Toast, ToastContainer } from 'react-bootstrap';
import SociosList from '../components/SociosList';
import AddSocioForm from '../components/AddSocioForm';

const Socios = () => {
  const [socios, setSocios] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const savedSocios = localStorage.getItem('socios');
    if (savedSocios) {
      setSocios(JSON.parse(savedSocios));
    }
  }, []);

  const addSocio = (socio) => {
    const newSocios = [...socios, { ...socio, id: socios.length + 1 }];
    setSocios(newSocios);
    localStorage.setItem('socios', JSON.stringify(newSocios));
    setShowToast(true); // Mostrar el toast al agregar un socio
  };

  return (
    <Container>
      <h1>Lista de Socios</h1>
      <AddSocioForm onAddSocio={addSocio} />
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Éxito</strong>
          </Toast.Header>
          <Toast.Body>El socio ha sido agregado correctamente.</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Socios;


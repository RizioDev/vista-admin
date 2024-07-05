// src/components/SocioDetail.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SocioDetail = ({ socio, show, handleClose, getActividadesDeSocio }) => {
  if (!socio) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Socio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {socio.id}</p>
        <p><strong>Nombre:</strong> {socio.nombre}</p>
        <p><strong>Apellido:</strong> {socio.apellido}</p>
        <p><strong>Actividad:</strong> {getActividadesDeSocio(socio.id)}</p>
        <p><strong>Alta:</strong> {socio.alta}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SocioDetail;

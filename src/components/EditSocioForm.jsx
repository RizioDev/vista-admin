// src/components/EditSocioForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditSocioForm = ({ socio, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [actividad, setActividad] = useState('');
  const [alta, setAlta] = useState('');

  useEffect(() => {
    if (socio) {
      setNombre(socio.nombre);
      setApellido(socio.apellido);
      setActividad(socio.actividad);
      setAlta(socio.alta);
    }
  }, [socio]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...socio, nombre, apellido, actividad, alta });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingrese nombre"
        />
      </Form.Group>
      <Form.Group controlId="formApellido">
        <Form.Label>Apellido</Form.Label>
        <Form.Control
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Ingrese apellido"
        />
      </Form.Group>
      <Form.Group controlId="formActividad">
        <Form.Label>Actividad</Form.Label>
        <Form.Control
          type="text"
          value={actividad}
          onChange={(e) => setActividad(e.target.value)}
          placeholder="Ingrese actividad"
        />
      </Form.Group>
      <Form.Group controlId="formAlta">
        <Form.Label>Alta</Form.Label>
        <Form.Control
          type="date"
          value={alta}
          onChange={(e) => setAlta(e.target.value)}
          placeholder="Ingrese fecha de alta"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Guardar Cambios
      </Button>
    </Form>
  );
};

export default EditSocioForm;


import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import useSocios from "../hooks/useSocios";
import {updateSocio } from "../services/sociosServices";

const EditSocioForm = ({ socio, onSave }) => {
  const { loading, error, obtenerActividadesDirectamente } = useSocios();
  const [nombre, setNombre] = useState(socio.nombre);
  const [apellido, setApellido] = useState(socio.apellido);
  const [dni, setDni] = useState(socio.dni);
  const [fechaNacimiento, setFechaNacimiento] = useState(socio.fechaNacimiento);
  const [direccion, setDireccion] = useState(socio.direccion);
  const [telefono, setTelefono] = useState(socio.telefono);
  const [email, setEmail] = useState(socio.email);
  const [actividadId, setActividadId] = useState("");

  useEffect(() => {
    obtenerActividadesDirectamente();
  }, []);

  console.log('soysocio', socio.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSocio = {
      nombre,
      apellido,
      dni,
      fechaNacimiento,
      direccion,
      telefono,
      email,
    };
    try {
      await updateSocio(socio.id, updatedSocio);
      onSave(socio.id);
    } catch (error) {
      console.log("Error al actualizar el socio:", error);
    }
  };

 

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
      <Form.Group controlId="formDni">
        <Form.Label>Número de DNI</Form.Label>
        <Form.Control
          type="text"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          placeholder="Ingrese el número de DNI"
        />
      </Form.Group>
      <Form.Group controlId="formNacimiento">
        <Form.Label>Fecha de Nacimiento</Form.Label>
        <Form.Control
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          placeholder="Ingrese fecha de nacimiento"
        />
      </Form.Group>
      <Form.Group controlId="formDireccion">
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="Ingrese la dirección"
        />
      </Form.Group>
      <Form.Group controlId="formTelefono">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Ingrese el número de teléfono"
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingrese el email"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Guardar
      </Button>

    </Form>
  );
};

export default EditSocioForm;
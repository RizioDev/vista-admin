// src/components/EditSocioForm.jsx
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { supabase } from "../config/supabaseConfig";

const EditSocioForm = ({ socio, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [actividad, setActividad] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [actividadId, setActividadId] = useState("");

  const fetchActividades = async () => {
    try {
      const { data, error } = await supabase.from("actividades").select("*");
      if (error) {
        throw error;
      }
      setActividades(data);
    } catch (error) {
      console.error("Error al obtener las actividades:", error);
    }
  };

  const darDeAlta = async (socioId) => {
    try {
      const { data, error } = await supabase
        .from("socios")
        .update({ estado: true })
        .eq('id', socioId);
      if (error) throw error;
      onSave(data);
    } catch (error) {
      console.log('Error al dar de alta al socio', error);
    }
  };

  const updateSocio = async (socioId) => {
    const { data, error } = await supabase
      .from("socios")
      .update({ nombre, apellido, actividad, fecha_nacimiento: fechaNacimiento, direccion, telefono, email, dni })
      .eq('id', socioId)
      // .eq("some_column", "someValue")
      .select();
  };

  useEffect(() => {
    fetchActividades();
  }, []);

  useEffect(() => {
    if (socio) {
      setActividad(socio.actividad);
      setNombre(socio.nombre);
      setApellido(socio.apellido);
      setActividad(socio.actividad);
      setFechaNacimiento(socio.fecha_nacimiento);
      setDireccion(socio.direccion);
      setTelefono(socio.telefono);
      setEmail(socio.email);
      setDni(socio.dni);
    }
    fetchActividades();
  }, [socio]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await updateSocio(socio.id)
    } catch (error) {
      console.log('error al updatear', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formActividad">
        <Form.Label>Actividad</Form.Label>
        <Form.Control
          as="select"
          value={actividadId}
          onChange={(e) => setActividadId(e.target.value)}
        >
          <option value="">Seleccione una actividad</option>
          {/* Aquí deberías mapear las actividades desde tu base de datos */}
          {actividades.map((actividad) => (
            <option key={actividad.id} value={actividad.id}>
              {actividad.nombre}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
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
          placeholder="Ingrese el numero de DNI"
        />
      </Form.Group>

      <Form.Group controlId="formNacimiento">
        <Form.Label>fechaNacimiento</Form.Label>
        <Form.Control
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          placeholder="Ingrese fecha de nacimiento"
        />
      </Form.Group>
      <Form.Group controlId="formDireccion">
        <Form.Label>Direccion</Form.Label>
        <Form.Control
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="Ingrese la direccion"
        />
      </Form.Group>
      <Form.Group controlId="formTelefono">
        <Form.Label>Telefono</Form.Label>
        <Form.Control
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Ingrese el numero de telefono"
        />
      </Form.Group>
      <Form.Group controlId="formDireccion">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingrese el email"
        />
      </Form.Group>
      <Form.Group controlId="formDireccion">
        <Form.Label>Dar de alta</Form.Label>
    <Button variant="secondary" color="red" onClick={darDeAlta}>Dar alta</Button>
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Agregar
      </Button>
    </Form>
  );
};

export default EditSocioForm;

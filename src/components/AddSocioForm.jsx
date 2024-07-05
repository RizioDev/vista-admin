// src/components/AddSocioForm.jsx
import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { supabase } from "../config/supabaseConfig";
import Swal from "sweetalert2";

const AddSocioForm = ({ onAddSocio }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [actividad, setActividad] = useState("");
  const [actividades, setActividades] = useState([]);
  const [actividadId, setActividadId] = useState("");

  // traigo las actividades de la db
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

  useEffect(() => {
    fetchActividades();
  }, []);

  //toast de que se creo bien el user
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  //funcion de add socio
  const addSocio = async () => {
    try {
      const { data, error } = await supabase
        .from("socios")
        .insert([
          {
            nombre: nombre,
            apellido: apellido,
            fecha_nacimiento: fechaNacimiento,
            direccion: direccion,
            telefono: telefono,
            email: email,
            dni: dni,
          },
        ])
        .select();
  
      if (error) {
        throw error;
      }
      
      //guardo la id del socio creado
      const nuevoSocioId = data[0].id;
  
      //si seleccione una actividad entonces la inserto
      //en la tabla socio_actividad con la id del socio y la id de la actividad
      if (actividadId) {
        const { data, error } = await supabase
          .from('socio_actividad')
          .insert([
            { id_socio: nuevoSocioId, id_actividad: actividadId },
          ])
          .select();

        if (error) {
          throw error;
        }
      }
     
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: "Error al agregar el socio o la actividad",
      });
    }
  };


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await addSocio();
      Toast.fire({
        icon: "success",
        title: "Usuario agregado correctamente!",
      });
      setNombre("");
      setApellido("");
      setDireccion("");
      setFechaNacimiento("");
      setTelefono("");
      setDni("");
      setTelefono("");
      setEmail("")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h2>Agregar Socio</h2>
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
        <Button variant="primary" type="submit" className="mt-3">
          Agregar
        </Button>
      </Form>
    </Container>
  );
};

export default AddSocioForm;

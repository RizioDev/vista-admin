import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
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
  const [actividadId, setActividadId] = useState("");
  const [montoPago, setMontoPago] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [actividades, setActividades] = useState([]);

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

  const addSocio = async () => {
    try {
      const { data: socioData, error: socioError } = await supabase
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

      if (socioError) {
        throw socioError;
      }

      const nuevoSocioId = socioData[0].id;

      if (actividadId) {
        const { error: socioActividadError } = await supabase
          .from("socio_actividad")
          .insert([
            { id_socio: nuevoSocioId, id_actividad: actividadId },
          ]);

        if (socioActividadError) {
          throw socioActividadError;
        }
      }

      const { error } = await supabase
        .from("pagos")
        .insert([
          {
            id_socio: nuevoSocioId,
            fecha_pago: fechaPago,
            monto: montoPago,
          },
        ]);

      if (error) {
        throw error;
      }

      return socioData[0];

    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: "Error al agregar el socio o la actividad",
      });
      throw error;
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
      setEmail("");
      setActividadId("");
      setMontoPago("");
      setFechaPago("")
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: "error",
        title: "Error al agregar el usuario",
      });
    }
  };

  return (
    <Container>
      <h2>Agregar Socio</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formActividad">
              <Form.Label>Actividad</Form.Label>
              <Form.Control
                as="select"
                value={actividadId}
                onChange={(e) => setActividadId(e.target.value)}
              >
                <option value="">Seleccione una actividad</option>
                {actividades.map((actividad) => (
                  <option key={actividad.id} value={actividad.id}>
                    {actividad.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDni">
              <Form.Label>Número de DNI</Form.Label>
              <Form.Control
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Ingrese el numero de DNI"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese nombre"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ingrese apellido"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formNacimiento">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Ingrese la dirección"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese el email"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ingrese el número de teléfono"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col md={6}>
          <Form.Group controlId="formFechaPago">
            <Form.Label>Fecha del Pago</Form.Label>
            <Form.Control
              type="date"
              value={fechaPago}
              onChange={(e) => setFechaPago(e.target.value)}
            />
          </Form.Group>
        </Col>
          <Col md={6}>
            <Form.Group controlId="formMontoPago">
              <Form.Label>Monto del Pago</Form.Label>
              <Form.Control
                type="number"
                value={montoPago}
                onChange={(e) => setMontoPago(e.target.value)}
                placeholder="Ingrese el monto del pago"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Agregar
        </Button>
      </Form>
    </Container>
  );
};

export default AddSocioForm;
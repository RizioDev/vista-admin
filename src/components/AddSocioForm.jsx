// src/components/AddSocioForm.jsx
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { supabase } from '../config/supabaseConfig';
import Swal from 'sweetalert2'



const AddSocioForm = ({ onAddSocio }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [direccion,setDireccion] = useState('')
  const [telefono,setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [dni, setDni] = useState('')
  
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  



  const addSocio = async () => {
try {
  const { data, error } = await supabase
  .from('socios')
  .insert([
    { nombre: nombre, apellido: apellido, fecha_nacimiento: fechaNacimiento, direccion: direccion, telefono: telefono, email: email, dni: dni },
  ])
  .select()
} catch (error) {
  console.log(error);
}
        
  }

  const handleSubmit = async (e) => {
try {
      e.preventDefault();
     await addSocio()
     Toast.fire({
      icon: "success",
      title: "Usuario agregado correctamente!"
    });
     setNombre('')
     setApellido('')
     setDireccion('')
     setFechaNacimiento('')
     setTelefono('')
     setDni('')
     setTelefono('')
} catch (error) {
  console.log(error);
}
  };

  return (
    <Container>
      <h2>Agregar Socio</h2>
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

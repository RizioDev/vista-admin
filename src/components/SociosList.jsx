// src/components/SociosList.jsx
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import useSocios from "../hooks/useSocios";
import { bajaSocio } from "../services/sociosServices";

const SociosList = ({ onDelete, onEdit, onView }) => {
  const { socios, loading, error, getActividadesDeSocio, getPagosSocios } = useSocios();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Actividades</th>
            <th>Estado</th>
            <th>Fecha de pago</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {socios.map((socio) => (
            <tr key={socio.id}>
              <td>{socio.id}</td>
              <td>{socio.nombre}</td>
              <td>{socio.apellido}</td>
              <td>{getActividadesDeSocio(socio.id)}</td>
              <td>{socio.estado ? "activo" : "inactivo"}</td>
              <td>{getPagosSocios(socio.id)}</td>
              <td>
                <Button
                  variant="info"
                  className="me-2"
                  onClick={() => onView(socio)}
                >
                  Ver
                </Button>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => onEdit(socio)}
                >
                  Editar
                </Button>
                <Button variant={socio.estado ? 'danger' : 'success'} onClick={() => bajaSocio(socio.id)}>
  {socio.estado ? 'Dar de baja' : 'Dar de alta'}
</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SociosList;

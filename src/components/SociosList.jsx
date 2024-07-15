import React, { useEffect } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import useSocios from "../hooks/useSocios";
import { bajaSocio } from "../services/sociosServices";


const SociosList = ({ onDelete, onEdit, onView,setSocios,renderTrigger }) => {
  const { 
    socios, 
    loading, 
    error, 
    getActividadesDeSocio, 
    getPagosSocios, 
    nextPage, 
    prevPage, 
    page, 
    totalPages,
    goToPage
  } = useSocios();
  
  useEffect(() => {
    console.log('Socios updated:', socios);
  }, [socios]);
  
  
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  

  const handleEdit = (socio) => {
    onEdit(socio);
  };

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === page} onClick={() => goToPage(number)}>
          {number}
        </Pagination.Item>,
      );
    }

    return (
      <Pagination>
        <Pagination.Prev onClick={prevPage} disabled={page === 1} />
        {items}
        <Pagination.Next onClick={nextPage} disabled={page === totalPages} />
      </Pagination>
    );
  };

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
                  onClick={() => handleEdit(socio)}
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
      <div className="d-flex justify-content-center mt-3">
        {renderPagination()}
      </div>
    </div>
  );
};

export default SociosList;

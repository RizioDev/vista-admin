import React, { useState, useEffect } from "react";
import { Table, Button, Pagination, Form, InputGroup, Modal } from "react-bootstrap";
import useSocios from "../hooks/useSocios";
import { bajaSocio, updateSocio } from "../services/sociosServices";
import { supabase } from '../config/supabaseConfig';

const SociosList = ({ onDelete, onEdit, onView, setSocios, renderTrigger }) => {
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
    goToPage,
    searchTerm,
    setSearchTerm
  } = useSocios();
  
  const [showModal, setShowModal] = useState(false);
  const [selectedSocio, setSelectedSocio] = useState(null);
  const [montoPago, setMontoPago] = useState("");
  
  useEffect(() => {
    console.log('Socios updated:', socios);
  }, [socios]);
  
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEdit = (socio) => {
    onEdit(socio);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    goToPage(1);
  };

  const handleAltaSocio = (socio) => {
    setSelectedSocio(socio);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSocio(null);
    setMontoPago("");
  };

  const handleConfirmPago = async () => {
    try {
      // Insertar un pago para el socio
      const { data: pagoData, error: pagoError } = await supabase
        .from("pagos")
        .insert([
          {
            id_socio: selectedSocio.id,
            fecha_pago: new Date().toISOString(),
            monto: parseFloat(montoPago),
          },
        ])
        .select();

      if (pagoError) throw pagoError;

      // Actualizar el estado del socio a activo
      const { data: socioData, error: socioError } = await updateSocio(selectedSocio.id, { estado: true });

      if (socioError) throw socioError;

      // Actualizar la lista de socios
      setSocios(prevSocios => prevSocios.map(s => s.id === selectedSocio.id ? { ...s, estado: true } : s));

      handleCloseModal();
    } catch (error) {
      console.error('Error al agregar pago o actualizar socio:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
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
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button variant="outline-secondary" onClick={() => setSearchTerm("")}>
          Limpiar
        </Button>
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
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
                <Button 
                  variant={socio.estado ? 'danger' : 'success'} 
                  onClick={() => socio.estado ? bajaSocio(socio.id) : handleAltaSocio(socio)}
                >
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Pago para Dar de Alta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Monto del Pago</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el monto"
              value={montoPago}
              onChange={(e) => setMontoPago(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmPago}>
            Confirmar Pago y Dar de Alta
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SociosList;
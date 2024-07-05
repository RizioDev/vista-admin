import React, { useState, useEffect } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import SociosList from '../components/SociosList';
import EditSocioForm from '../components/EditSocioForm';
import SocioDetail from '../components/SocioDetail';

const Admin = () => {
  const [socios, setSocios] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [socioToDelete, setSocioToDelete] = useState(null);
  const [socioToEdit, setSocioToEdit] = useState(null);
  const [socioToView, setSocioToView] = useState(null);

  useEffect(() => {
    const savedSocios = localStorage.getItem('socios');
    if (savedSocios) {
      setSocios(JSON.parse(savedSocios));
    }
  }, []);

  const addSocio = (socio) => {
    const newSocios = [...socios, { ...socio, id: socios.length + 1 }];
    setSocios(newSocios);
    localStorage.setItem('socios', JSON.stringify(newSocios));
  };

  const confirmDeleteSocio = (id) => {
    setSocioToDelete(id);
    setShowDeleteModal(true);
  };

  const deleteSocio = () => {
    const newSocios = socios.filter((socio) => socio.id !== socioToDelete);
    setSocios(newSocios);
    localStorage.setItem('socios', JSON.stringify(newSocios));
    setShowDeleteModal(false);
  };

  const confirmEditSocio = (socio) => {
    setSocioToEdit(socio);
    setShowEditModal(true);
  };

  const saveSocio = (editedSocio) => {
    const newSocios = socios.map((socio) =>
      socio.id === editedSocio.id ? editedSocio : socio
    );
    setSocios(newSocios);
    localStorage.setItem('socios', JSON.stringify(newSocios));
    setShowEditModal(false);
  };

  const viewSocio = (socio) => {
    setSocioToView(socio);
    setShowDetailModal(true);
  };

  return (
    <Container>
      <h1>Administrar Socios</h1>
      <SociosList socios={socios} onDelete={confirmDeleteSocio} onEdit={confirmEditSocio} onView={viewSocio} />
      
      {/* Modal para confirmar eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro que desea eliminar este socio?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={deleteSocio}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Modal para editar socio */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Socio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {socioToEdit && <EditSocioForm socio={socioToEdit} onSave={saveSocio} />}
        </Modal.Body>
      </Modal>

      {/* Modal para ver detalles del socio */}
      <SocioDetail
        socio={socioToView}
        show={showDetailModal}
        handleClose={() => setShowDetailModal(false)}
      />
    </Container>
  );
};

export default Admin;



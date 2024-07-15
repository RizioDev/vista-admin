import React, { useState, useEffect } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import SociosList from '../components/SociosList';
import EditSocioForm from '../components/EditSocioForm';
import SocioDetail from '../components/SocioDetail';
import { supabase } from '../config/supabaseConfig';

const Admin = () => {
  const [socios, setSocios] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [socioToDelete, setSocioToDelete] = useState(null);
  const [socioToEdit, setSocioToEdit] = useState(null);
  const [socioToView, setSocioToView] = useState(null);
  const [renderTrigger, setRenderTrigger] = useState(0);
  const [selectedSocio, setSelectedSocio] = useState(null);

  const handleEdit = (socio) => {
    setSelectedSocio(socio);
    setShowEditModal(true);
  };

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


  const confirmDeleteSocio = async (id) => {
  try {
    const { error } = await supabase
.from('socios')
.delete()
.eq('id', id)
  } catch (error) {
    console.log('hubo error al eliminar', error);
  }
    setShowDeleteModal(true);
  };

  const confirmEditSocio = (socio) => {
    setSelectedSocio(socio)
    setSocioToEdit(socio);
    setShowEditModal(true);
  };

  const saveSocio = (editedSocio) => {
    console.log("saveSocio called with:", editedSocio);
    setSocios(prevSocios => prevSocios.map(socio =>
      socio.id === editedSocio.id ? editedSocio : socio
    ));
    console.log(editedSocio, 'soy edited');
    setShowEditModal(false);
    setRenderTrigger(prev => prev + 1);
  };
  

  const viewSocio = (socio) => {

    setSocioToView(socio);
    setShowDetailModal(true);
  };

  return (
    <Container>
      <h1>Administrar Socios</h1>
      <SociosList socios={socios} onDelete={confirmDeleteSocio} onEdit={confirmEditSocio} onView={viewSocio} setSocios={setSocios} renderTrigger={renderTrigger} />
      

      
      {/* Modal para editar socio */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Socio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {socioToEdit && <EditSocioForm socio={socioToEdit} onSave={saveSocio}  />}
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



import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { supabase } from "../config/supabaseConfig";

const SocioDetail = ({ socio, show, handleClose }) => {
  const [loading, setLoading] = useState(true);
  const [actividades, setActividades] = useState([]);
  const [socioActividades, setSocioActividades] = useState([]);
  const [pagos, setPagos] = useState([]);

  const fetchActividades = async () => {
    let { data, error } = await supabase.from("actividades").select("*");
    if (error) {
      console.log("Hubo un error al traer las actividades", error);
    } else {
      setActividades(data);
    }
  };

  const fetchSocioActividades = async () => {
    let { data, error } = await supabase.from("socio_actividad").select("*");
    if (error) {
      console.log("Hubo error al traer los socio_actividad", error);
    } else {
      setSocioActividades(data);
    }
  };

  const fetchPagos = async () => {
    if (socio) {
      let { data, error } = await supabase
        .from("pagos")
        .select("*")
        .eq('id_socio', socio.id)
        .order('fecha_pago', { ascending: false });
      if (error) {
        console.log("Hubo un error al traer los pagos", error);
      } else {
        setPagos(data);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchActividades(), fetchSocioActividades(), fetchPagos()]);
      setLoading(false);
    };

    fetchData();
  }, [socio]);

  const getActividadesDeSocio = (socioId) => {
    const actividadesDeSocio = socioActividades
      .filter((rel) => rel.id_socio === socioId)
      .map((rel) => {
        const actividad = actividades.find((act) => act.id === rel.id_actividad);
        return actividad ? actividad.nombre : null;
      });

    return actividadesDeSocio.filter((nombre) => nombre !== null).join(', ')
  };

  if (!socio || loading) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Socio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Nombre:</strong> {socio.nombre}</p>
        <p><strong>Apellido:</strong> {socio.apellido}</p>
        <p><strong>Actividad:</strong> {getActividadesDeSocio(socio.id)}</p>
        <p><strong>Estado:</strong> {socio.estado ? "activo" : "inactivo"}</p>
        <p><strong>Pagos:</strong></p>
        <ListGroup>
          {pagos.map((pago, index) => (
            <ListGroup.Item key={index}>
              Fecha: {new Date(pago.fecha_pago).toLocaleDateString()} - Monto: ${pago.monto}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SocioDetail;
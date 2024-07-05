// src/components/SocioDetail.jsx
import React, {useState, useEffect} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { supabase } from "../config/supabaseConfig";


const SocioDetail = ({ socio, show, handleClose,  }) => {
  const [loading, setLoading] = useState(true);
  const [actividades, setActividades] = useState([]);
  const [socioActividades, setSocioActividades] = useState([]);


  const fetchActividades = async () => {
    let { data, error } = await supabase.from("actividades").select("*");
    if (error) {
      console.log("Hubo un error al traer las acti", error);
    } else {
      setActividades(data);
    }
    setLoading(false);
  };
  const fetchSocioActividades = async () => {
    let { data, error } = await supabase.from("socio_actividad").select("*");
    if (error) {
      console.log("Hubo error al traer los socio_actividad", error);
    } else {
      setSocioActividades(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchActividades();
    fetchSocioActividades();
  }, []);

  const getActividadesDeSocio = (socioId) => {
    //Lo que hace esta funcion es un filter de los datos de la tabla de socioActividad
    // que devuelve {id:1, id_socio:1, id_actividad:1}
    //y filtra y mapea todas las actividades del socio que se le pase por param
    //y el find de actividades trae todas las actividades de la db y busca a la que sea igual a la id_actividad
    //y trae el activdad.nombre
    const actividadesDeSocio = socioActividades
      .filter((rel) => rel.id_socio === socioId)
      .map((rel) => {
        const actividad = actividades.find(
          (act) => act.id === rel.id_actividad
        );
        return actividad ? actividad.nombre : null;
      });

    return actividadesDeSocio.filter((nombre) => nombre !== null).join(', ')
  };

  if (!socio) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Socio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {socio.id}</p>
        <p><strong>Nombre:</strong> {socio.nombre}</p>
        <p><strong>Apellido:</strong> {socio.apellido}</p>
        <p><strong>Actividad:</strong>{getActividadesDeSocio(socio.id)}</p>
        <p><strong>Alta:</strong> {socio.estado ? "activo" : "inactivo"}</p>
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

// src/components/SociosList.jsx
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { supabase } from "../config/supabaseConfig";

const SociosList = ({ onDelete, onEdit, onView }) => {
  const [socios, setSocios] = useState([]);
  const [socioActividades, setSocioActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actividades, setActividades] = useState([]);
  const [pagos, setPagos] = useState([])

  const fetchPagos = async () => {
let { data, error } = await supabase
.from('pagos')
.select('*')
try {
  setPagos(data)
} catch (error) {
  console.log("Hubo un error el el fetching de pagos");
}
        
  }

  const fetchSocios = async () => {
    let { data, error } = await supabase.from("socios").select("*");
    if (error) {
      console.log("Hubo error al traer a los users", error);
    } else {
      setSocios(data);
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

  const fetchActividades = async () => {
    let { data, error } = await supabase.from("actividades").select("*");
    if (error) {
      console.log("Hubo un error al traer las acti", error);
    } else {
      setActividades(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSocios();
    fetchSocioActividades();
    fetchActividades();
    fetchPagos();
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

const getPagosSocios = (socioId) => {
  const pagosDelSocio = pagos.filter((p) => p.id_socio === socioId)
  .map((rel) => {
    return rel.fecha_pago
  })
  return pagosDelSocio
}

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
                <Button variant="danger" onClick={() => onDelete(socio.id)}>
                  Eliminar
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

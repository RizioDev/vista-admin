// src/hooks/useSocios.js
import { useState, useEffect } from "react";
import {
  obtenerSocios,
  obtenerActividades,
  obtenerSocioActividades,
  obtenerPagos,
} from "../services/sociosServices";
import { supabase } from "../config/supabaseConfig";

const useSocios = () => {
  const [socios, setSocios] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [socioActividades, setSocioActividades] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10; // Número de socios por página

  const fetchData = async () => {
    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

         // Obtener el total de socios para calcular el número total de páginas
         const { count } = await supabase
         .from('socios')
         .select('*', { count: 'exact', head: true });

         setTotalPages(Math.ceil(count / pageSize));


      const [sociosData, actividadesData, socioActividadesData, pagosData] = await Promise.all([
        obtenerSocios(from, to),
        obtenerActividades(),
        obtenerSocioActividades(),
        obtenerPagos(),
      ]);
      setSocios(sociosData);
      setActividades(actividadesData);
      setSocioActividades(socioActividadesData);
      setPagos(pagosData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (newPage) => {
    setPage(newPage);
  };


  useEffect(() => {
    fetchData();

    const subscription = supabase
    .channel('custom-all-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'socios' }, (payload) => {
      if (payload.eventType === 'UPDATE') {
        setSocios(prevSocios => prevSocios.map(s => 
          s.id === payload.new.id ? { ...s, ...payload.new } : s
        ));
      } else {
        fetchData();
      }
      console.log('Cambios recibidos!', payload);
    })
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, [page]);

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  const obtenerActividadesDirectamente = async () => {
    try {
      const actividadesData = await obtenerActividades();
      setActividades(actividadesData);
    } catch (error) {
      setError(error);
    }
  };

  const getActividadesDeSocio = (socioId) => {
    const actividadesDeSocio = socioActividades
      .filter((rel) => rel.id_socio === socioId)
      .map((rel) => {
        const actividad = actividades.find((act) => act.id === rel.id_actividad);
        return actividad ? actividad.nombre : null;
      });

    return actividadesDeSocio.filter((nombre) => nombre !== null).join(", ");
  };

  const getPagosSocios = (socioId) => {
    const FechaDePagosDelSocio = pagos
      .filter((p) => p.id_socio === socioId)
      .map((rel) => rel.fecha_pago);
    return FechaDePagosDelSocio.length > 0 ? FechaDePagosDelSocio.join(", ") : "No hay pago";
  };

  return { socios, loading, error, setSocios, getActividadesDeSocio, getPagosSocios, obtenerActividadesDirectamente, nextPage, prevPage, page, totalPages, goToPage };
};

export default useSocios;

import { supabase } from '../config/supabaseConfig';

// Obtener socios
export const obtenerSocios = async (from, to) => {
  try {
    let { data, error } = await supabase.from("socios").select("*").range(from, to);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al obtener socios:', error);
    throw error;
  }
};

// Obtener socio por DNI
export const obtenerSocioPorDni = async (NumeroDni) => {
  try {
    let { data, error } = await supabase.from("socios").select("*").eq('dni', NumeroDni);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al obtener socio por DNI:', error);
    throw error;
  }
};

// Obtener actividades
export const obtenerActividades = async () => {
  try {
    let { data, error } = await supabase.from("actividades").select("*");
    if (error) console.log('aca', error);;
    return data;
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    throw error;
  }
};

// Obtener socio actividades
export const obtenerSocioActividades = async () => {
  try {
    let { data, error } = await supabase.from("socio_actividad").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al obtener socio actividades:', error);
    throw error;
  }
};

// Obtener pagos
export const obtenerPagos = async () => {
  try {
    let { data, error } = await supabase.from("pagos").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al obtener pagos:', error);
    throw error;
  }
};

// Dar de baja socio
export const bajaSocio = async (socioId) => {
  try {
    // Obtener el estado actual del socio
    let { data: currentData, error: currentError } = await supabase
      .from("socios")
      .select('estado')
      .eq('id', socioId)
      .single();

    if (currentError) throw currentError;
    if (!currentData) throw new Error('Socio no encontrado');

    // Invertir el estado actual
    const newEstado = !currentData.estado;

    // Actualizar el estado del socio
    let { data, error } = await supabase
      .from("socios")
      .update({ estado: newEstado })
      .eq('id', socioId)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error al cambiar el estado del socio:', error);
    throw error;
  }
};



// Agregar socio
export const addSocio = async (socio, actividadId) => {
  try {
    let { data, error } = await supabase.from("socios").insert([socio]).select();
    if (error) throw error;

    const nuevoSocioId = data[0].id;

    if (actividadId) {
      let { data, error } = await supabase.from('socio_actividad').insert([{ id_socio: nuevoSocioId, id_actividad: actividadId }]).select();
      if (error) throw error;
    }

    return data;
  } catch (error) {
    console.error('Error al agregar socio:', error);
    throw error;
  }
};

// Actualizar socio
export const updateSocio = async (socioId, socio) => {
  try {
    let { data, error } = await supabase.from("socios").update(socio).eq('id', socioId).select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al actualizar socio:', error);
    throw error;
  }
};

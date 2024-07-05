// src/pages/About.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

const About = () => {
  return (
    <Container>
      <h1>Instrucciones de Uso del Sistema de Gestión de Socios</h1>

      <ol>
        <li>
          <h2>Acceso al Sistema</h2>
          <p>
            <strong>Inicio de Sesión:</strong> Inicie sesión con sus credenciales de administrador para acceder a todas las funcionalidades del sistema.
          </p>
        </li>

        <li>
          <h2>Agregar un Nuevo Socio</h2>
          <p>
            <strong>Navegar a la Página de Socios:</strong> Vaya a la sección "Ingresar Socios" en el menú de navegación.
          </p>
          <p>
            <strong>Llenar el Formulario:</strong> Ingrese el nombre, apellido, actividad y fecha de alta del nuevo socio en el formulario.
          </p>
          <p>
            <strong>Enviar el Formulario:</strong> Haga clic en el botón "Agregar" para guardar el nuevo socio. Un mensaje de confirmación aparecerá en la parte superior derecha de la pantalla para indicar que el socio se ha agregado correctamente.
          </p>
        </li>

        <li>
          <h2>Ver Detalles de un Socio</h2>
          <p>
            <strong>Navegar a la Página de Administrar Socios:</strong> Vaya a la sección "Administrar Socios" en el menú de navegación.
          </p>
          <p>
            <strong>Ver Detalles:</strong> En la lista de socios, haga clic en el botón "Ver" correspondiente al socio que desea consultar. Se abrirá un modal mostrando los detalles completos del socio.
          </p>
        </li>

        <li>
          <h2>Editar la Información de un Socio</h2>
          <p>
            <strong>Navegar a la Página de Administrar Socios:</strong> Vaya a la sección "Administrar Socios" en el menú de navegación.
          </p>
          <p>
            <strong>Editar Socio:</strong> En la lista de socios, haga clic en el botón "Editar" correspondiente al socio que desea modificar. Se abrirá un modal con un formulario para editar la información del socio.
          </p>
          <p>
            <strong>Guardar Cambios:</strong> Realice los cambios necesarios y haga clic en "Guardar" para actualizar la información del socio. La lista de socios se actualizará automáticamente con la información modificada.
          </p>
        </li>

        <li>
          <h2>Eliminar un Socio</h2>
          <p>
            <strong>Navegar a la Página de Administrar Socios:</strong> Vaya a la sección "Administrar Socios" en el menú de navegación.
          </p>
          <p>
            <strong>Eliminar Socio:</strong> En la lista de socios, haga clic en el botón "Eliminar" correspondiente al socio que desea eliminar. Aparecerá un modal de confirmación preguntando si está seguro de eliminar el socio.
          </p>
          <p>
            <strong>Confirmar Eliminación:</strong> Haga clic en "Eliminar" en el modal de confirmación para eliminar el socio. La lista de socios se actualizará automáticamente para reflejar la eliminación.
          </p>
        </li>

        <li>
          <h2>Consultar Cuotas</h2>
          <p>
            <strong>Visualizar Cuotas:</strong> Las cuotas asociadas a cada socio se mostrarán en la columna "Cuotas" en la lista de socios. La información de las cuotas se carga automáticamente y se actualiza en tiempo real.
          </p>
        </li>

        <li>
          <h2>Consejos Adicionales</h2>
          <p>
            <strong>Guardar Cambios:</strong> Asegúrese de que todos los cambios se guarden correctamente. Verifique que los datos estén actualizados en la lista de socios.
          </p>
          <p>
            <strong>Seguridad:</strong> No comparta sus credenciales de administrador con nadie. Asegúrese de cerrar sesión cuando termine de usar el sistema.
          </p>
          <p>
            <strong>Soporte:</strong> En caso de cualquier problema técnico, contacte al equipo de soporte para obtener ayuda.
          </p>
        </li>
      </ol>
    </Container>
  );
};

export default About;


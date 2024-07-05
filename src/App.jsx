// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Socios from './pages/Socios';
import About from './pages/About';
import Admin from './pages/Admin';
import Login from './components/Login';
import './App.css'; // Importamos el archivo CSS para los estilos personalizados

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // Para mostrar/ocultar el modal de login

  const handleLogin = (username) => {
    setLoggedIn(true); // Marca al usuario como autenticado
    setShowLogin(false); // Oculta el modal de login
    console.log(`Usuario ${username} ha iniciado sesión.`);
  };

  const handleLogout = () => {
    setLoggedIn(false); // Marca al usuario como no autenticado
    setShowLogin(true); // Muestra el modal de login nuevamente
  };

  return (
    <Router>
      <div className="app-wrapper d-flex flex-column min-vh-100">
        <Header loggedIn={loggedIn} handleLogout={handleLogout} />
        <main className="flex-grow-1 my-4">
          <Routes>
            {/* Rutas protegidas */}
            {loggedIn && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/socios" element={<Socios />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={<Admin />} />
              </>
            )}
            {/* Ruta pública */}
            {!loggedIn && <Route path="/" element={<Home />} />}
          </Routes>
        </main>
        <Footer />
        {/* Modal de login */}
        {showLogin && <Login show={showLogin} handleClose={() => setShowLogin(false)} handleLogin={handleLogin} />}
      </div>
    </Router>
  );
};

export default App;




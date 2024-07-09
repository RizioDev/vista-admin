// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Socios from './pages/Socios';
import About from './pages/About';
import Admin from './pages/Admin';
import './App.css'; // Importamos el archivo CSS para los estilos personalizados

const App = () => {


  return (
    <Router>
      <div className="app-wrapper d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1 my-4">
          <Routes>
              <>
                <Route path="/" element={<Home />} />
                <Route path="/socios" element={<Socios />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={<Admin />} />
              </>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;




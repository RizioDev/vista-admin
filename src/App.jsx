import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Socios from './pages/Socios';
import About from './pages/About';
import Admin from './pages/Admin';
import './App.css'; 
import Login from './components/Login/Login';
import { supabase } from './config/supabaseConfig';

// verifica si el usaurio esta autenticado
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && window.location.pathname !== '/login') {
        navigate('/login');
      } else if (session && window.location.pathname === '/login') {
        navigate('/');
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  return children;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app-wrapper d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1 my-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/socios" element={<Socios />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;

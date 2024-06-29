import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import LogoutButton from '../profile/Logout';
import './Navbar.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignupClick = (e) => {
    if (user) {
      e.preventDefault();
      alert("Debes cerrar sesión para crear nueva cuenta");
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/assets/LX.png" alt="Life Experience Logo" className="logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/instructions">¿Cómo jugar?</Link></li>
        <li><Link to="/aboutUs">Sobre Nosotras</Link></li>
        {!user && <li><Link to="/login">Iniciar Sesión</Link></li>}
        <li><Link to="/signup" onClick={handleSignupClick}>Registro</Link></li>
        {user ? (
          <>
            <li><span className="user-name">Hola, {user.name || 'Usuario'}!</span></li>
            <li><LogoutButton /></li>
          </>
        ) : (
          <>
            {}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

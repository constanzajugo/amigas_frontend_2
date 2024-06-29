import React, { useContext } from 'react';
import './App.css';
import Navbar from './Navbar';
import LogoutButton from '../profile/Logout';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function App() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePlayClick = () => {
    if (token) {
      navigate('/sala-espera'); // Cambiado a '/sala-espera'
    } else {
      alert('Debe iniciar sesión para jugar');
      navigate('/login'); 
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <img src="assets/logo_juego.png" alt="Logo del juego" className="logo-juego" />
        <img src="assets/foto_tablero.jpeg" alt="Foto del tablero" className="foto-tablero" />
        <div className="button-container">
          <button className="button" onClick={handlePlayClick}>Jugar</button>
        </div>
      </div>
    </div>
  );
}

export default App;

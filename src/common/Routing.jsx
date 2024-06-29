import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Instructions from '../game/Instructions';
import Board from '../game/Board';
import UserWelcome from '../profile/UserWelcome';
import Login from '../profile/Login';
import Signup from '../profile/Signup';
import AdminCheck from '../protected/AdminCheck';
import UserCheck from '../protected/UserCheck';
import AboutUs from '../about/AboutUs';
import SelectAvatar from '../profile/SelectAvatar';
import SalaEspera from '../game/SalaEspera'; // Nuevo
import { AuthContext } from '../auth/AuthContext';

function Routing() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/welcome" element={<UserWelcome />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/board" element={token ? <Board /> : <Navigate to="/login" />} />
        <Route path="/admincheck" element={<AdminCheck />} />
        <Route path="/usercheck" element={<UserCheck />} />
        <Route path="/selectAvatar" element={<SelectAvatar />} />
        <Route path="/sala-espera" element={token ? <SalaEspera /> : <Navigate to="/login" />} /> {/* Ajustado para usar SalaEspera */}
      </Routes>
    </Router>
  );
}

export default Routing;

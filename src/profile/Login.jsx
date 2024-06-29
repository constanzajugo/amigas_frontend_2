import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Navbar from '../common/Navbar'; // Asegúrate de que la ruta a Navbar sea correcta
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        email: email,
        password: password
      });

      console.log('Response from server:', response.data);

      setError(false);
      setMsg("Login exitoso!");

      const { access_token, user } = response.data;
      setToken(access_token);
      setUser(user);

      console.log("Se seteó el token y el usuario:", access_token, user);

      // Redirigir a página de inicio
      navigate('/');

    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
      setError(true);
      alert('Credenciales incorrectas o usuario no encontrado.');
    }
  };

  return (
    <div>
      <Navbar /> {/* Asegúrate de que Navbar esté renderizando correctamente */}
      <div className="Login">
        {msg.length > 0 && <div className="successMsg">{msg}</div>}
        {error && <div className="error">Hubo un error con el inicio de sesión, por favor intenta nuevamente.</div>}
        <h2>Inicia Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input 
              type="password" 
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

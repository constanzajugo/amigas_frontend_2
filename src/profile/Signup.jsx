import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        username,
        email,
        password,
      });
      console.log('Registro exitoso! Ahora puedes seleccionar tu avatar');
      navigate('/SelectAvatar', { state: { userId: response.data.id } });
    } catch (error) {
      console.error('Ocurrió un error:', error);
      alert('Error durante el registro. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="Signup">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de usuario:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Correo electrónico:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="Registrarse" />
      </form>
    </div>
  );
};

export default Signup;

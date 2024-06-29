import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './SalaEspera.css';

const SalaEspera = () => {
  const { user } = useContext(AuthContext);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState('');
  const [roomId] = useState('room1');
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) {
      console.error('Usuario no autenticado');
      return;
    }
  
    const newSocket = io('http://localhost:3000', {
      withCredentials: true,
    });
    setSocket(newSocket);
  
    newSocket.on('connect', () => {
      console.log('Conectado al servidor de Socket.IO');
      newSocket.emit('joinRoom', roomId, user.id);
  
      newSocket.on('updatePlayers', (updatedPlayers) => {
        setPlayers(updatedPlayers);
      });
  
      newSocket.on('error', (message) => {
        setError(message);
      });
  
      newSocket.on('gameStarted', (players) => {
        localStorage.setItem('playersInGame', JSON.stringify(players));
        navigate('/board', { state: { players } });
      });

      newSocket.on('redirect', (path) => {
        navigate(path);
      });
    });
  
    newSocket.on('disconnect', () => {
      console.log('Desconectado del servidor de Socket.IO');
    });
  
    return () => {
      newSocket.emit('leaveRoom', roomId);
      newSocket.disconnect();
    };
  }, [roomId, user, navigate]);

  const handleBackToMenu = () => {
    if (socket) {
      socket.emit('leaveRoom', roomId);
      socket.disconnect();
    }
    navigate('/');
  };

  const handleStartGame = () => {
    if (socket) {
      socket.emit('startGame', roomId);
      navigate('/board', { state: { players } });
    }
  };

  const handleCloseRoom = () => {
    if (socket) {
      axios.post('http://localhost:3000/game/close-waiting-room', { roomId })
        .then(response => {
          console.log('Respuesta del servidor:', response.data);
          socket.emit('closeRoom', roomId);
          navigate('/');
        })
        .catch(error => {
          console.log('Error al cerrar la sala de espera:', error);
        });
    }
  };

  return (
    <div className="sala-espera">
      <h2>Sala de Espera</h2>
      {error && <p className="error">{error}</p>}
      {!error && (
        <>
          <p>Jugadores en la sala:</p>
          <ul>
            {players.map((player) => (
              <li key={player.id}>
                {user.id === player.id ? 'Tú' : player.name}
                <img src={player.avatar} alt={`Avatar de ${player.name}`} />
              </li>
            ))}
          </ul>
          {players.length >= 2 && (
            <button onClick={handleStartGame}>Ir a Jugar</button>
          )}
          {console.log('User email:', user.mail)}
          {user.mail.trim() === 'admin@admin.cl' && (
            <button className="close-button" onClick={handleCloseRoom}>Cerrar Sala Espera</button>
          )}
        </>
      )}
      <button onClick={handleBackToMenu}>Volver a Menu Inicial</button>
    </div>
  );
};

export default SalaEspera;

import './Board.css';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Navbar from '../common/Navbar';
import io from 'socket.io-client';
import Box from './Box.jsx';

const Board = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [players, setPlayers] = useState(location.state?.players || []);
  const [diceResult, setDiceResult] = useState(null);
  const [socket, setSocket] = useState(null);
  const [roomId] = useState('room1');
  const [currentBox, setCurrentBox] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Conectado al servidor de Socket.IO');

      newSocket.emit('joinRoom', roomId, user.id);

      newSocket.on('updatePlayerPosition', (updatedPlayers) => {
        setPlayers(updatedPlayers);
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, user.id]);

  const handleDiceRoll = async () => {
    try {
      const response = await fetch('http://localhost:3000/dice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setDiceResult(data.diceRoll);
      handleMovePlayer(data.diceRoll);
    } catch (error) {
      console.error('Error rolling dice:', error);
    }
  };

  const handleMovePlayer = async (diceRoll) => {
    try {
      const response = await fetch('http://localhost:3000/movePlayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerId: user.id,
          diceResult: diceRoll,
        }),
      });
      const data = await response.json();

      socket.emit('playerMoved', {
        roomId,
        playerId: user.id,
        newPosition: data.newPosition,
      });

      fetchBox(data.newPosition, user.id);
    } catch (error) {
      console.error('Error moving player:', error);
    }
  };

  const fetchBox = async (boxId, playerId) => {
    try {
      const response = await fetch(`http://localhost:3000/boxes/${boxId}/${playerId}`);
      if (!response.ok) {
        throw new Error('Error fetching box');
      }
      const data = await response.json();
      console.log('Current box:', data); // Añadir esta línea para depurar
      setCurrentBox(data);
    } catch (error) {
      console.error('Error fetching box:', error);
    }
  };

  const handleCloseBox = () => {
    setCurrentBox(null);
  };

  const boardItems = [
    "PARTIDA", "NECESITAS LIBROS Y ÚTILES PIERDES 2 EV", "TRABAJO MEDIO TIEMPO GANAS 3 EV", "LIFE",
    "ENCIÉRRATE A ESTUDIAR", "NECESITAS LIBROS Y ÚTILES PIERDES 2 EV", "ENCIÉRRATE A ESTUDIAR", "TRABAJO MEDIO TIEMPO GANAS 3 EV",
    "LIFE", "STOP PROFESIÓN", "DÍA DE PAGO", "PAGAS JARDÍN INFANTIL",
    "VES UNA CARRERA", "DÍA DE PAGO", "TE ROBAN SIN SEGURO INMUEBLE PIERDES 8 EV", "LIFE",
    "COMPRAS UN CUADRO", "VENCIMIENTO DE IMPUESTOS", "DÍA DE PAGO", "LIFE",
    "VAS A EXCESO DE VELOCIDAD", "VES UNA CARRERA", "¡CAMBIA PROFESIÓN! TU ELIGES!", "LIFE",
    "STOP PROPIEDAD", "COMPRAS UN SILLÓN", "COMPRASTE UNA TELEVISIÓN - PIERDES 4 EV", "DÍA DE PAGO",
    "AMUEBLA PIEZA DE TU CASA PIERDES 5 EV", "VAS A EXCESO DE VELOCIDAD", "LIFE", "TRABAJO MEDIO TIEMPO GANAS 3 EV",
    "TE VAS DE VIAJE GANAS 5 EV", "TE ENFERMASTE", "COMPRAS UN CUADRO", "ESTÁS DESPEDIDO",
    "DÍA DE PAGO", "LIFE", "SE INUNDA CASA SIN SEGURO INMUEBLE PIERDES 8 EV", "PAGAS JARDÍN INFANTIL",
    "COMPRASTE TELEVISIÓN PIERDES 4 EV", "TE ROBAN SIN SEGURO INMUEBLE PIERDES 8 EV", "¡CAMBIA PROFESIÓN! TU ELIGES", "VES UNA CARRERA",
    "ACCIDENTE DE AUTO SIN SEGURO AUTO PIERDES 8 EV", "LIFE", "DÍA DE PAGO", "TE VAS DE VIAJE GANAS 5 EV",
    "ESTÁS DESPEDIDO", "VENCIMIENTO DE IMPUESTOS", "COMPRAS UN SILLÓN", "VES UNA PELÍCULA",
    "LIFE", "AMUEBLA PIEZA DE TU CASA PIERDES 5 EV", "VES UNA PELÍCULA", "COMPRAS UN CUADRO",
    "TE ROBAN SIN SEGURO INMUEBLE PIERDES 8 EV", "SE INUNDA CASA SIN SEGURO INMUEBLE PIERDES 8 EV", "TE ENFERMASTE", "FIN"
  ];

  const generateSpiralBoard = (items) => {
    const size = Math.ceil(Math.sqrt(items.length));
    const board = Array(size).fill(null).map(() => Array(size).fill(null));
    let x = 0, y = 0, dx = 1, dy = 0, temp;

    for (let i = 0; i < items.length; i++) {
      board[y][x] = { number: i + 1, text: items[i] };
      if (board[(y + dy + size) % size][(x + dx + size) % size] !== null) {
        temp = dx;
        dx = -dy;
        dy = temp;
      }
      x += dx;
      y += dy;
    }
    return board;
  };

  const board = generateSpiralBoard(boardItems);

  const getColorClass = (text, index) => {
    if (text.includes("LIFE")) {
      return 'color-life';
    }
    const colorClasses = ['color-1', 'color-2', 'color-3'];
    return colorClasses[index % colorClasses.length];
  };

  return (
    <div className="board">
      <Navbar />
      <div className="board-container">
        <div className="sidebar-left">
          <h2>Profesiones</h2>
          <div className="grid">
            <div className="grid-item">
              <img src="/assets/artista.png" alt="Artista" />
            </div>
            <div className="grid-item">
              <img src="/assets/atleta.png" alt="Atleta" />
            </div>
            <div className="grid-item">
              <img src="/assets/superestrella.png" alt="Superestrella" />
            </div>
            <div className="grid-item">
              <img src="/assets/ejecutivo_ventas.png" alt="Ejecutivo de ventas" />
            </div>
            <div className="grid-item">
              <img src="/assets/policia.png" alt="Policía" />
            </div>
            <div className="grid-item">
              <img src="/assets/profesor.png" alt="Profesor" />
            </div>
            <div className="grid-item">
              <img src="/assets/contador.png" alt="Contador" />
            </div>
            <div className="grid-item">
              <img src="/assets/doctor.png" alt="Doctor" />
            </div>
          </div>
          <button className="small-button">Elegir</button>

          <h2>Seguros</h2>
          <div className="grid">
            <div className="grid-item">
              <img src="/assets/seguro_auto.png" alt="Seguro de Auto" />
            </div>
            <div className="grid-item">
              <img src="/assets/seguro_inmueble.png" alt="Seguro de Inmueble" />
            </div>
          </div>
          <button className="small-button">Comprar</button>

          <h2>Propiedades</h2>
          <div className="grid">
            <div className="grid-item">
              <img src="/assets/rancho.png" alt="Rancho" />
            </div>
            <div className="grid-item">
              <img src="/assets/segunda_vivienda.png" alt="Segunda Vivienda" />
            </div>
            <div className="grid-item">
              <img src="/assets/hotel.png" alt="Hotel" />
            </div>
            <div className="grid-item">
              <img src="/assets/lodge.png" alt="Lodge" />
            </div>
            <div className="grid-item">
              <img src="/assets/departamento.png" alt="Departamento" />
            </div>
            <div className="grid-item">
              <img src="/assets/casa.png" alt="Casa" />
            </div>
            <div className="grid-item">
              <img src="/assets/cabana.png" alt="Cabaña" />
            </div>
            <div className="grid-item">
              <img src="/assets/motorhome.png" alt="Casa Rodante" />
            </div>
          </div>
          <button className="small-button">Comprar</button>
        </div>
        <div className="board-div">
          {board.flat().map((item, index) => (
            item ? (
              <div key={index} className={`board-cell ${getColorClass(item.text, index)}`}>
                {players.filter(player => player.casilla === item.number).map(player => (
                  <img 
                    key={player.id} 
                    src={`/${player.avatar}`} 
                    alt={`Avatar de ${player.name}`} 
                    className={player.id === user.id ? 'jugador-token current-player' : 'jugador-token other-player'} 
                  />
                ))}
                <span>{item.number}</span> {item.text}
              </div>
            ) : (
              <div key={index} className="board-cell empty-cell"></div>
            )
          ))}
        </div>
        <div className="sidebar-right">
          {players.map(player => (
            <div key={player.id} className="player-info">
              <h2>{player.name}</h2>
              <img src={`/${player.avatar}`} alt={`Avatar de ${player.name}`} className="avatar" />
              <p>Experiencia de Vida: {player.life_experience}</p>
              <h3>Tarjetas de Seguro</h3>
              {(player.tarjetas?.seguros || []).map((seguro, index) => (
                <img key={index} src={`/assets/${seguro}.png`} alt={seguro} />
              ))}
              <h3>Tarjetas de Profesión</h3>
              {(player.tarjetas?.profesiones || []).map((profesion, index) => (
                <img key={index} src={`/assets/${profesion}.png`} alt={profesion} />
              ))}
              <h3>Tarjetas de Propiedad</h3>
              {(player.tarjetas?.propiedades || []).map((propiedad, index) => (
                <img key={index} src={`/assets/${propiedad}.png`} alt={propiedad} />
              ))}
            </div>
          ))}
        </div>
        {currentBox && (
          <div className="box-modal">
            <div className="box-content">
              <h2>{currentBox.category}</h2>
              <p>{`${currentBox.description} EV`}</p>
              <img src={currentBox.imgSrc} alt="Box" className="box-image" />
              <button onClick={handleCloseBox}>OK</button>
            </div>
          </div>
        )}
      </div>
      <div className="dice-container">
        <button onClick={handleDiceRoll}>Lanzar dado</button>
        {diceResult !== null && <p>Resultado del dado: {diceResult}</p>}
      </div>
    </div>
  );
};

export default Board;

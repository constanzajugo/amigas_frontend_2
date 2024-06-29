import './Card.css';
import { useContext } from 'react';
import { GameContext } from './Board.jsx';

export default function Card({ id, imgSrc, type, description, shown, toggle }) {
  const { setGuess } = useContext(GameContext);

  const handleGuess = () => {
    setGuess(id);
  };

  return (
    <div className="card-modal">
      <div className="card-content">
        <h2>{type}</h2>
        <p>{description}</p>
        {shown && <img src={imgSrc} className="card-image" alt="Tarjeta" />}
        <button onClick={handleGuess}>OK</button>
      </div>
    </div>
  );
}

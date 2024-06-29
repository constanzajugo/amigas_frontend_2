import './Box.css';
import { useContext } from 'react';
//import { GameContext } from './Board.jsx';

export default function Box({ id, imgSrc, category, description, shown, toggle }) {
  const { setGuess } = useContext(GameContext);

  const handleGuess = () => {
    setGuess(id);
  };

  return (
    <div className="box-modal">
      <div className="box-content">
        <h2>{category}</h2>
        <p>{`${description} EV`}</p>
        {shown && <img src={`/${imgSrc}`} className="box-image" alt="Box" />}
        <button onClick={handleGuess}>OK</button>
      </div>
    </div>
  );
}

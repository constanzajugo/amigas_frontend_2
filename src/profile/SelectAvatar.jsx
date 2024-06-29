import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './SelectAvatar.css';

const avatars = [
  '/assets/avatar1.png',
  '/assets/avatar2.png',
  '/assets/avatar3.png',
  '/assets/avatar4.png'
];

function SelectAvatar() {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleSubmit = async () => {
    if (!selectedAvatar) {
      alert("Please select an avatar.");
      return;
    }

    if (!userId) {
      alert("User ID is missing.");
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/update-avatar`, {
        userId: userId,
        avatar: selectedAvatar,
      });
      
      // Redirige a la página de inicio después de seleccionar el avatar
      navigate('/');
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  return (
    <div className="SelectAvatar">
      <h2>Elige tu avatar</h2>
      <div className="avatars">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            className={`avatar ${selectedAvatar === avatar ? 'selected' : ''}`}
            onClick={() => handleAvatarSelect(avatar)}
          />
        ))}
      </div>
      <button className="select-button" onClick={handleSubmit}>Seleccionar</button>
    </div>
  );
}

export default SelectAvatar;

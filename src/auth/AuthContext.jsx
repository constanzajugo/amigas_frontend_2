import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
      if (savedUser.mail === 'admin@admin.cl') {
        setIsAdmin(true);
      }
    }
  }, []);

  const loginUser = async (mail, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login', { mail, password });
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if (response.data.user.mail === 'admin@admin.cl') {
        setIsAdmin(true);
      }
      return response.data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Credenciales incorrectas: usuario no encontrado');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
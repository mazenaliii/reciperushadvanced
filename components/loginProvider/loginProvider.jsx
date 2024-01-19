'use client'
import React, { useState, createContext, useEffect } from 'react';

export const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const [logged, setLogged] = useState(false);
  const [tokenError, setTokenError] = useState(null);
  const [token, setToken] = useState(null); // Initial check

  useEffect(() => {
    const handleTokenChange = () => {
      try {
        const newToken = localStorage.getItem('Token');
        if (newToken) {
          setToken(newToken);
          setLogged(true);
          setTokenError(null);
        } else {
          setLogged(false); 
          setTokenError('Token not found');
          console.error('Token removed from local storage');
        }
      } catch (error) {
        setTokenError('Error accessing token');
        console.error('Error retrieving token:', error);
      }
    };

    handleTokenChange(); 

    window.addEventListener('storage', handleTokenChange);

    return () => window.removeEventListener('storage', handleTokenChange);
  }, []);

  return (
    <LoginContext.Provider value={{ logged, setLogged, tokenError, token }}>
      {children}
    </LoginContext.Provider>
  );
};

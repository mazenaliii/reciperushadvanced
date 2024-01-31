'use client'
import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios'
export const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState(null); // Initial check

  useEffect(() => {
    const handleTokenChange = async () => {
      try {
        const loginToken = localStorage.getItem('Token')
        setToken(loginToken)
        const response = await axios.get('http://localhost:8080/api/verify-token', {
          headers: {
            Authorization: `Bearer ${token || loginToken}`
          }
        }).then((response) => {
          if (response.data.isValid) {
            setLogged(true)
            console.log('Logged in successfully', response.data.isValid)
          } else {
            console.log('Not logged')
          }
        }).catch(e => console.log(e))

      } catch (error) {
        console.error('Not logged bro')
        console.log(error)
      }
    };

    handleTokenChange();

    window.addEventListener('storage', handleTokenChange);

    return () => window.removeEventListener('storage', handleTokenChange);
  }, [token]);

  return (
    <LoginContext.Provider value={{ logged, setLogged, token }}>
      {children}
    </LoginContext.Provider>
  );
};

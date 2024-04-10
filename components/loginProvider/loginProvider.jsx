'use client'
import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios'
export const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState(''); 
  const [userId, setUserId] = useState(""); 

  useEffect(() => {
    const handleTokenChange = async () => {
      try {
        const loginToken = localStorage.getItem('Token')
        setToken(loginToken)
        const response = await axios.post('https://reciperush-api.onrender.com/api/verify-token', {
          Token: `${loginToken || token}`  
        }
        ).then((response) => {
          if (response.data.isValid && response.data.userInfo.userId) {
            setUserId(response.data.userInfo.userId)
            setLogged(true)
          }
        }).catch(e => console.log(e))

      } catch (error) {
        console.log(error)
      }
    };

   !logged && handleTokenChange()
  }, [token]);

  return (
    <LoginContext.Provider value={{ logged, setLogged, token, userId }}>
      {children}
    </LoginContext.Provider>
  );
};

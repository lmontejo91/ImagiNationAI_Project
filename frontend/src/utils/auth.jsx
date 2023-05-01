import React from 'react';
import { API_URL } from '../../config';

// Función para guardar el token JWT en el almacenamiento local
const saveToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Función para eliminar el token JWT del almacenamiento local
  const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  };
  
  // Función para obtener el token JWT del almacenamiento local
  const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Función para realizar la solicitud de inicio de sesión al servidor
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/v1/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      const token = data.token;
      console.log("Login Token: "+token)
      saveToken(token);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  
  // Función para realizar la solicitud de cierre de sesión al servidor
  const logout = async () => {
    console.log(getToken());
    try {
      const response = await fetch(`${API_URL}/v1/user/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      if (response.ok) {
        // handle successful logout
        removeToken();
        return true;
      } else {
        // handle error
        console.error('error');
        return false;
      }
    } catch (error) {
      // handle network error
      console.error(error);
      return false;
    }
  }  

export { isAuthenticated, getToken, login, logout };
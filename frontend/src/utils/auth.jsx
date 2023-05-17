import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);

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
      saveToken(data.token);
      setUser(data.user);
      return true;

    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // Función para realizar la solicitud de registro al servidor
  const register = async (name, email, password) =>{
    try {
      const response = await fetch(`${API_URL}/v1/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password}),
      });

      const data = await response.json();
      saveToken(data.token);
      setUser(data.user);
      return true;

    } catch (err) {
      alert("Registration failed");
      return false;
    }
  }

  // Función para realizar la solicitud de cierre de sesión al servidor
  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/user/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      if (response.ok) {
        removeToken();
        setUser(null);
        navigate('/');
        //return true;
      } else {
        console.error('error');
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // Creamos un objeto con las propiedades y valores que queremos pasar a través del contexto de autenticación
  const authContextValue = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    setUser,
    saveToken,
  };

  // Devolvemos el proveedor del contexto de autenticación, pasando como valor el objeto que creamos antes, y como hijos el contenido que se encuentre dentro del componente <AuthProvider>
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

/* import React from 'react';
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

export { isAuthenticated, getToken, login, logout }; */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // Función para guardar el token JWT en el almacenamiento local
  const saveToken = (token) => {
    localStorage.setItem("token", token);
  };

  // Función para eliminar el token JWT del almacenamiento local
  const removeToken = () => {
    localStorage.removeItem("token");
  };

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null && token !== undefined;
  };

  // Función para obtener el token JWT del almacenamiento local
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Función para realizar la solicitud de inicio de sesión al servidor
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        saveToken(data.token);
        setUser(data.user);
        return data;
      }else{
        return data;
      } 
      
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // Función para realizar la solicitud de registro al servidor
  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/v1/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        saveToken(data.token);
        setUser(data.user);
        return data;
      }else{
        return data;
      }      

    } catch (err) {
      alert("Registration failed. Server connection error: "+err);
      return false;
    }
  };

  // Función para realizar la solicitud de cierre de sesión al servidor
  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/user/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.ok) {
        removeToken();
        setUser(null);
        navigate("/");
        //return true;
      } else {
        console.error("error");
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // Función para recuperar los datos del usuario del servidor cuando se cambia o recarga la página
  /* const fetchUserFromToken = async (token) => {
    console.log("Entra en recuperar 'User from Token'");
    try {
      const response = await fetch(`${API_URL}/v1/user/getUserFromToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.user;
      } else {
        throw new Error('Error al obtener los datos del usuario');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }; */

  useEffect(() => {
    const clearLocalStorage = () => {
      removeToken();
    };

    window.addEventListener("beforeunload", clearLocalStorage);

    // Recuperar el usuario almacenado desde el token al cargar la página
    /* const token = getToken();
    if (token) {
      const userPromise = fetchUserFromToken(token);
      userPromise.then(user => {
        setUser(user);
      }).catch(error => {
        console.error(error);
      });
    } */

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);

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

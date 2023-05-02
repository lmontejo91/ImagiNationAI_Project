import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Modal from "react-modal";
import { Navbar } from "./components";
import { AuthProvider } from './utils';

Modal.setAppElement("#root"); //Esto le dice a React Modal cuál es el elemento raíz de tu aplicación para asegurarse de que los lectores de pantalla ignoren el contenido principal de la aplicación cuando el modal esté abierto.

import { HomePage, ImagePage, GeneratorPage, UserProfilePage } from "./views";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-post/{user_id}" element={<GeneratorPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default () => (
  <AuthProvider> {/* Envuelve tu componente con AuthProvider */}
    <App />
  </AuthProvider>
);

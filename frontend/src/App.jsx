import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Modal from "react-modal";
import { Navbar, Footer } from "./components";

Modal.setAppElement("#root"); //Esto le dice a React Modal cuál es el elemento raíz de tu aplicación para asegurarse de que los lectores de pantalla ignoren el contenido principal de la aplicación cuando el modal esté abierto.

import { HomePage, ImagePage, GeneratorPage, UserProfilePage } from "./views";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generator-page" element={<GeneratorPage />} />
          <Route path="/user-page" element={<UserProfilePage />} />
          <Route path="/image-page" element={<ImagePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

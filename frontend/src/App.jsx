import React, { useState, useEffect } from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Modal from 'react-modal';
import { Navbar } from './components';

Modal.setAppElement('#root'); //Esto le dice a React Modal cuál es el elemento raíz de tu aplicación para asegurarse de que los lectores de pantalla ignoren el contenido principal de la aplicación cuando el modal esté abierto. 


import { HomePage, ImagePage, GeneratorPage, UserProfilePage } from './views';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-post" element={<GeneratorPage />} />
        </Routes>
      </main>

    </BrowserRouter>
  )
}

export default App


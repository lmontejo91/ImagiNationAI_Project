import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Modal from "react-modal";
import logo from "../assets/logo.png";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import { isAuthenticated, getToken, login, logout } from "../utils/auth";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleSuccess = () => {
    closeModal();
  };

  return (
    <nav className="w-full flex justify-between items-center bg-dark-blue sm:px-8 px-4 py-4">
      <Link to="/" className="text-white font-semibold text-lg">
        ImagiNation AI
      </Link>
      <div className="flex items-center">
        <Link
          to="/generator-page"
          className="bg-neon-blue hover:bg-white text-dark-blue px-4 py-2 rounded-md mr-4"
        >
          Generate Image
        </Link>
        <Link
          to="/user-page"
          className="bg-neon-blue hover:bg-white text-dark-blue px-4 py-2 rounded-md mr-4"
        >
          User Profile
        </Link>

        <button
          onClick={() => openModal(<FormRegister onSuccess={handleSuccess} />)}
          className="bg-neon-blue text-dark-blue px-4 py-2 rounded-md mr-4"
        >
          Register
        </button>
        <button
          onClick={() => openModal(<FormLogin onSuccess={handleSuccess} />)}
          className="bg-neon-blue text-dark-blue px-4 py-2 rounded-md mr-4"
        >
          Log In
        </button>
        <button
          onClick={() => logout()}
          className="bg-neon-blue text-dark-blue px-4 py-2 rounded-md"
        >
          Log Out
        </button>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        {/* Renderiza el contenido del modal según el botón pulsado */}
        {modalContent}
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </nav>
  );
};

export default Navbar;

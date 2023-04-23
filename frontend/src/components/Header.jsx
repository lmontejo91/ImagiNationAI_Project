import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import logo from '../assets/logo.png';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';

const Header = () => {
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

  return (
    <header className="w-full flex justify-between items-center bg-dark-blue sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-36 object-contain"></img>
      </Link>
      <div className="flex items-center">
        <button onClick={() => openModal(<FormRegister />)} className="bg-neon-blue text-dark-blue px-4 py-2 rounded-md mr-4">
          Register
        </button>
        <button onClick={() => openModal(<FormLogin />)} className="bg-neon-blue text-dark-blue px-4 py-2 rounded-md">
          Log In
        </button>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        {/* Renderiza el contenido del modal según el botón pulsado */}
        {modalContent}
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </header>
  );
};

export default Header;

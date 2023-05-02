import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import logo from '../assets/logo.png';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
//import { logout } from '../utils/auth';
import { AuthContext } from '../utils';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const authContext = useContext(AuthContext);

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
    <nav className="w-full flex justify-between items-center bg-dark-blue sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-36 object-contain"></img>
      </Link>
      <div className="flex items-center">
        <button onClick={() => openModal(<FormRegister onSuccess={handleSuccess}/>)} className="bg-neon-blue text-dark-blue px-4 py-2 rounded-md mr-4">
          Register
        </button>
        <button onClick={() => openModal(<FormLogin onSuccess={handleSuccess}/>)} className="bg-neon-blue text-dark-blue px-4 py-2 rounded-md mr-4">
          Log In
        </button>
        <button onClick={() => authContext.logout()} className="bg-neon-blue text-dark-blue px-4 py-2 rounded-md">
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

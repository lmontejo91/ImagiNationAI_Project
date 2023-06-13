import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "react-modal";
import FormLogin from "./FormLogin";
import { AuthContext } from "../utils";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const authContext = useContext(AuthContext);
  const location = useLocation();

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
    <nav className="w-full flex flex-wrap sm:justify-between items-center bg-dark-blue sm:px-8 px-4 py-4">
      <Link to="/" className="text-white font-semibold text-lg">
        ImagiNation AI
      </Link>
      <div className="flex items-center mt-4 sm:mt-0">
        {authContext.isAuthenticated() ? (
          /****** Navbar PARA USUARIO LOGGEADO ********/
          <>
            <Link
              to={`/generator-page/${authContext?.user?._id || "/"}`}
              className="hover:text-neon-pink text-white mr-6"
            >
              Image Generator
            </Link>
            <Link
              to={`/user-page/${authContext?.user?._id || "/"}`}
              className="hover:text-neon-pink text-white mr-6"
            >
              User Profile
            </Link>
            <button
              onClick={() => authContext.logout()}
              className="bg-gradient-to-br from-light-blue to-neon-blue hover:bg-gradient-to-bl text-dark-blue text-sm px-4 py-2 font-semibold rounded-md mr-4"
            >
              Log Out
            </button>
          </>
        ) : (
          /****** Navbar PARA USUARIO PÚBLICO ********/
          <>
            <Link to="/login" state={{ background: location }}>
              <button
                onClick={() =>
                  openModal(<FormLogin onSuccess={handleSuccess} />)
                }
                className="bg-gradient-to-br from-light-pink to-neon-pink hover:bg-gradient-to-bl text-dark-blue text-sm px-4 py-2 font-semibold rounded-md mr-4"
              >
                Get Started
              </button>
            </Link>
          </>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="ReactModal__Overlay"
        className="ReactModal__Content"
      >
        <button className="text-white font-bold" onClick={closeModal}>
          X
        </button>
        {modalContent}
      </Modal>
    </nav>
  );
};

export default Navbar;

import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import { FiAlertCircle } from "react-icons/fi";
import { HiOutlineExclamation, HiOutlineCheckCircle, HiOutlineInformationCircle } from "react-icons/hi";

const ModalAlert = ({ isOpen, onClose, title, message, type, redirect = false }) => {

  const [bgColor, setBgColor] = useState("bg-light-pink");
  const [borderColor, setBorderColor] = useState("border-neon-pink");

  useEffect(() => {
    if (type === 'success') {
      setBgColor("bg-light-green");
      setBorderColor("border-medium-green");
    } else if (type === 'error') {
      setBgColor("bg-light-red");
      setBorderColor("border-medium-red");
    }
  }, [type]);


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
        <button className="text-medium-grey font-bold absolute top-2 right-3" onClick={() => onClose(redirect)}>
            X
        </button>
        <div className={`${bgColor} border-t-4 ${borderColor} rounded-b text-dark-blue px-4 py-3 shadow-md`} role="alert">
            <div className="flex">
                <div className="py-1">
                    {type === 'error' ? (
                        <HiOutlineExclamation className="h-7 w-7 text-dark-blue font-bold mr-4" />
                    ) : type === 'success' ? (
                        <HiOutlineCheckCircle className="h-7 w-7 text-dark-blue font-bold mr-4" />
                    ) : (
                        <HiOutlineInformationCircle className="h-7 w-7 text-dark-blue font-bold mr-4" />
                    )}
                </div>
                <div>
                    <p className="font-bold">{title}</p>
                    {message && 
                        <p className="text-sm">{message}</p>
                    }
                </div>
            </div>
        </div>
    </Modal>
  );
};

export default ModalAlert;


/* import React from "react";
import Modal from "react-modal";
import { FiAlertCircle } from "react-icons/fi";

const ModalAlert = ({ isOpen, onClose, title, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
        <button className="text-medium-grey font-bold absolute top-2 right-3" onClick={onClose}>
            X
        </button>
        <div className="bg-light-pink border-t-4 border-neon-pink rounded-b text-dark-blue px-4 py-3 shadow-md" role="alert">
            <div className="flex">
                <div className="py-1">
                    <FiAlertCircle className="h-7 w-7 text-dark-blue font-bold mr-4" />
                </div>
                <div>
                    <p className="font-bold">{title}</p>
                    {message && 
                        <p className="text-sm">{message}</p>
                    }
                </div>
            </div>
        </div>
    </Modal>
  );
};

export default ModalAlert; */
import React from "react";
import Modal from "react-modal";
import { FiAlertCircle } from "react-icons/fi";

const ModalConfirmation = ({ isOpen, onClose, message }) => {   

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
    >

        <div className="text-dark-blue py-3">
            <div className="flex flex-col justify-center text-center">
                <FiAlertCircle className="mx-auto mb-4 text-muted w-14 h-14" />
                <h3 className="mb-5 text-lg font-normal text-muted">
                Are you sure you want to delete {message}?
                </h3>
                <div className="flex justify-center mt-2">
                    <button
                        onClick={() => onClose(true)}
                        className="bg-neon-pink hover:bg-gradient-to-bl text-dark-blue text-sm px-4 py-2 font-semibold rounded-md mr-4"
                        >
                        Yes, I'm sure
                    </button>
                    <button
                        onClick={() => onClose(false)}
                        className="bg-neon-blue hover:bg-gradient-to-bl text-dark-blue text-sm px-4 py-2 font-semibold rounded-md mr-4"
                        >
                        No, cancel
                    </button>
                </div>
            </div>
        </div>

    </Modal>
  );
};

export default ModalConfirmation;
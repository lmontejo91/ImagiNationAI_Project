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
        {/* <button className="text-medium-grey font-bold absolute top-2 right-3" onClick={onClose}>
            X
        </button> */}
        
        <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" class="block text-white bg-dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-dark-blue dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
            Toggle modal
        </button>

        <div id="popup-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" class="absolute top-3 right-2.5 text-muted bg-transparent hover:bg-light-grey hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-medium-grey dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-6 text-center">
                        <svg aria-hidden="true" class="mx-auto mb-4 text-muted w-14 h-14 dark:text-light-grey" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 class="mb-5 text-lg font-normal text-muted dark:text-light-grey">Are you sure you want to delete ${message}?</h3>
                        <button data-modal-hide="popup-modal" type="button" class="text-white bg-neon-pink hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            Yes, I'm sure
                        </button>
                        <button data-modal-hide="popup-modal" type="button" class="text-light-blue bg-white hover:bg-light-grey focus:ring-4 focus:outline-none focus:ring-light-grey rounded-lg border border-light-grey text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-dark-blue dark:text-light-grey dark:border-light-grey dark:hover:text-white dark:hover:bg-medium-grey dark:focus:ring-medium-grey">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>

    </Modal>
  );
};

export default ModalConfirmation;
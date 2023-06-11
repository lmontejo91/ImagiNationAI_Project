import React, { useState, useContext, useEffect } from "react";
import { HiPencil, HiThumbUp } from "react-icons/hi";
import { HiPencilSquare } from "react-icons/hi2";
import { AuthContext } from "../utils/auth";
import { ModalAlert, ModalConfirmation } from "./modals";
import { API_URL } from "../../config";
import { redirect } from "react-router-dom";

const UserProfileForm = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
  //const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [messageModal, setMessageModal] = useState("");
  const [typeModal, setTypeModal] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputBackgroundColor, setInputBackgroundColor] =
    useState("bg-dark-blue");
  const [inputTextColor, setInputTextColor] = useState("text-muted");
  const [formUser, setFormUser] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    password: "********",
  });

  const handleEditClick = (isEditOn) => {
    setIsEditing(isEditOn);
    setInputBackgroundColor(isEditOn ? "bg-light-grey" : "bg-dark-blue");
    setInputTextColor(isEditOn ? "text-dark-blue" : "text-muted");

    const inputs = document.querySelectorAll("input");
    const inputsValue = isEditOn ? false : true;
    inputs.forEach((input) => {
      input.readOnly = inputsValue;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormUser({ ...formUser, [name]: value });
  };

  const handleSubmitChanges = async () => {
    try {
      const response = await fetch(
        `${API_URL}/v1/user/${authContext.user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formUser),
        }
      );

      const data = await response.json();
      authContext.setUser(data.user);
      setTitleModal(
        data.success
          ? "Account updated successfully!"
          : "Account could not be updated"
      );
      setTypeModal(data.success ? "success" : "error");
      setMessageModal(data.message);
      openModalAlert();
      handleEditClick(false);
    } catch (err) {
      alert("Connection to the server failed: " + err);
      return false;
    }
  };

  const handleDeleteAccount = async (e) => {
    if (confirmed) {
      try {
        const response = await fetch(
          `${API_URL}/v1/user/${authContext.user._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setTitleModal(
          data.success
            ? "Account deleted successfully!"
            : "Account could not be deleted"
        );
        setTypeModal(data.success ? "success" : "error");
        setRedirect(data.success ? true : false);
        setMessageModal(data.message);
        openModalAlert();
      } catch (err) {
        alert("Connection to the server failed: " + err);
      }
    }
  };

  /* Modal Alert */
  const openModalAlert = () => {
    setIsModalAlertOpen(true);
  };

  const closeModalAlert = () => {
    setIsModalAlertOpen(false);
    if (redirect) authContext.logout();
  };

  /* Modal Confirmation */
  const openModalConfirmation = () => {
    setIsModalConfirmationOpen(true);
  };

  const closeModalConfirmation = (isConfirmed) => {
    setConfirmed(isConfirmed);
    if (confirmed) handleDeleteAccount();
    setIsModalConfirmationOpen(false);
  };

  return (
    <div className="mt-10">
      <form className="mt-7">
        <div className="shadow-md rounded p-12 relative">
          {" "}
          {/* ring-medium-grey ring-offset-2 ring-4 */}
          {isEditing ? (
            <>
              <button
                onClick={() => handleEditClick(false)}
                className="ml-2 absolute top-2 right-3"
              >
                <HiThumbUp className="h-6 w-6 mr-1 text-light-grey inline-flex" />{" "}
              </button>
            </>
          ) : (
            <button
              onClick={() => handleEditClick(true)}
              className="ml-2 absolute top-2 right-3"
            >
              <HiPencilSquare className="h-6 w-6 mr-1 text-light-grey inline-flex" />{" "}
            </button>
          )}
          {/* Form Fields */}
          <div className="lg:col-span-2 text-light-grey">
            <div className="grid gap-4 gap-y-6 text-sm grid-cols-1 md:grid-cols-6">
              <div className="md:col-span-3">
                <label htmlFor="firstname" className="font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className={`h-10 border-b mt-1 rounded px-4 w-full ${inputBackgroundColor} ${inputTextColor} focus:outline-none focus:ring-0`}
                  value={formUser.firstname}
                  placeholder={formUser.firstname}
                  readOnly
                  onChange={handleInputChange}
                />
              </div>

              <div className="md:col-span-3">
                <label htmlFor="lastname" className="font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className={`h-10 border-b mt-1 rounded px-4 w-full ${inputBackgroundColor} ${inputTextColor} focus:outline-none focus:ring-0`}
                  value={formUser.lastname}
                  placeholder={formUser.lastname}
                  readOnly
                  onChange={handleInputChange}
                />
              </div>

              <div className="md:col-span-6">
                <label htmlFor="username" className="font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className={`h-10 border-b mt-1 rounded px-4 w-full ${inputBackgroundColor} ${inputTextColor} focus:outline-none focus:ring-0`}
                  value={formUser.username}
                  placeholder={formUser.username}
                  readOnly
                  onChange={handleInputChange}
                />
              </div>

              <div className="md:col-span-6">
                <label htmlFor="email" className="font-semibold">
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={`h-10 border-b mt-1 rounded px-4 w-full ${inputBackgroundColor} ${inputTextColor} focus:outline-none focus:ring-0`}
                  value={formUser.email}
                  placeholder={formUser.email}
                  readOnly
                  onChange={handleInputChange}
                />
              </div>

              <div className="md:col-span-6">
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={`h-10 border-b mt-1 rounded px-4 w-full ${inputBackgroundColor} ${inputTextColor} focus:outline-none focus:ring-0`}
                  value={formUser.password}
                  placeholder="Type here your old password"
                  readOnly
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Form Buttons */}
        <div className="flex justify-center mt-12 mb-6">
          <button
            type="button"
            onClick={handleSubmitChanges}
            className="bg-gradient-to-br from-light-pink to-neon-blue hover:bg-gradient-to-bl text-dark-blue text-sm px-4 py-2 font-semibold rounded-md mr-4"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={openModalConfirmation}
            className="bg-gradient-to-br from-light-pink to-neon-pink hover:bg-gradient-to-bl text-dark-blue text-sm px-4 py-2 font-semibold rounded-md mr-4"
          >
            Delete Account
          </button>
        </div>
      </form>

      <ModalAlert
        isOpen={isModalAlertOpen}
        onClose={closeModalAlert}
        title={titleModal}
        message={messageModal}
        type={typeModal}
        redirect={redirect}
      />

      <ModalConfirmation
        isOpen={isModalConfirmationOpen}
        onClose={closeModalConfirmation}
        message="your account"
      />
    </div>
  );
};

export default UserProfileForm;

import React, { useState, useContext, useEffect } from "react";
import { HiPencil, HiThumbUp } from "react-icons/hi";
import { HiPencilSquare } from "react-icons/hi2";
import { AuthContext } from "../utils/auth";
import { ModalAlert, ModalConfirmation } from "./modals";
import { API_URL } from "../../config";

const UserProfileForm = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [messageModal, setMessageModal] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [inputBackgroundColor, setInputBackgroundColor] = useState("bg-dark-blue");  
  const [inputTextColor, setInputTextColor] = useState("text-muted");
  const [formUser, setFormUser] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    password:"********",
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

  /* useEffect(() => {
    console.log("isEditing:", isEditing);
    const inputs = document.querySelectorAll("input");
    console.log(inputs);
  }, [isEditing]); */

  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFormUser({ ...formUser, [name]: value });
    console.log(formUser);
  };

  const handleSubmitChanges = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/user/${authContext.user._id}`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formUser),
        });
    
      const data = await response.json();
      console.log(data);
      /* setTitleModal(data.sucess ? 'Account updated successfully!' : 'Account could not be updated');
      setMessageModal(data.message);  */

    } catch (err) {
      alert("Connection to the server failed: "+err);
      return false;
    }  
  };

  const handleDeleteAccount = async (e) => {
    
    const resp = openModalConfirmation();
      console.log(resp);

    /* try {
      const response = await fetch(`${API_URL}/v1/user/${authContext.user._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
      const data = await response.json();
      console.log(data);
      setTitleModal(data.success ? 'Account deleted successfully!' : 'Account could not be deleted');
      setMessageModal(data.message);

    } catch (err) {
      alert("Connection to the server failed: "+err);
      return false;
    } */
  };

  /* Modal Alert */
  const openModalAlert = () => {
    setIsModalAlertOpen(true);
  };
  
  const closeModalAlert = () => {
    setIsModalAlertOpen(false);
  };

  /* Modal Confirmation */
  const openModalConfirmation = () => {
    setIsModalConfirmationOpen(true);
  };
  
  const closeModalConfirmation = () => {
    setIsModalConfirmationOpen(false);
  };

  return (
    <div className="mt-10">
      <form className="mt-7">
        <div className="shadow-md rounded p-12 relative"> {/* ring-medium-grey ring-offset-2 ring-4 */} 
        {isEditing ? (
          <>
          <button type="submit" onClick = {() => handleEditClick(false) } className="ml-2 absolute top-2 right-3">
              <HiThumbUp className="h-6 w-6 mr-1 text-light-grey inline-flex" />{" "}
          </button>
          </>
        ) : (
          <button type="submit" onClick = {() =>  handleEditClick(true) } className="ml-2 absolute top-2 right-3">
              <HiPencilSquare className="h-6 w-6 mr-1 text-light-grey inline-flex" />{" "}
          </button>
        )}

        {/* Form Fields */}
        <div className="lg:col-span-2 text-light-grey">
          <div className="grid gap-4 gap-y-6 text-sm grid-cols-1 md:grid-cols-6">

          <div className="md:col-span-3">
              <label htmlFor="firstname" className="font-semibold">First Name</label>
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
              <label htmlFor="lastname" className="font-semibold">Last Name</label>
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
              <label htmlFor="username" className="font-semibold">Username</label>
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
              <label htmlFor="email" className="font-semibold">Email Address</label>
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
              <label htmlFor="password" className="font-semibold">Password</label>
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
        <div className="flex justify-around mt-12 mb-6">
          <button
            onClick={handleSubmitChanges}
            className="bg-gradient-to-br from-light-pink to-neon-blue hover:bg-gradient-to-bl text-dark-blue text-sm px-4 py-2 font-semibold rounded-md mr-4"
          >
            Save Changes
          </button>
          <button
            onClick={handleDeleteAccount}
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
      />

      <ModalConfirmation
        isOpen={isModalAlertOpen}
        onClose={closeModalAlert}
        message="your account"
      />
    </div>
  );
};

export default UserProfileForm;


{/* <div className="grid-cols-1 lg:grid-cols-2 gap-4"> {/* flex flex-wrap justify-around items-center gap-10 
          <div>
            <label className="text-white text-lg font-semibold">Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              placeholder={user.name}
              readOnly={!isEditing}
              onChange={handleInputChange}
              className="ml-2 px-2 py-1 rounded border-2 border-gray-300"
            />
            {isEditing ? (
              <>
              <button type="submit" className="ml-2">
                  <HiThumbUp className="h-6 w-6 mr-1 text-light-grey inline-flex" />{" "}
              </button>
              </>
            ) : (
              <button type="submit" onClick = {handleEditClick} className="ml-2">
                  <HiPencil className="h-6 w-6 mr-1 text-light-grey inline-flex" />{" "}
              </button>
            )}
          </div>
          <div>
            <label className="text-white text-lg font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder={user.email}
              readOnly={!isEditing}
              onChange={handleInputChange}
              className="ml-2 px-2 py-1 rounded border-2 border-gray-300"
            />
            {isEditing ? (
              <>
              <button type="submit" className="ml-2">
                  <HiThumbUp className="h-6 w-6 mr-1 text-light-grey inline-flex" />{" "}
              </button>
              </>
            ) : (
              <button type="submit" onClick = {handleEditClick} className="ml-2">
                  <HiPencilSquare className="h-6 w-6 mr-1 text-light-grey inline-flex" />{" "}
              </button>
            )}
          </div>
          <div>
            <label className="text-white text-lg font-semibold">Password:</label>
            <input
              type="password"
              name="password"
              value="********"
              placeholder="Introduce old password"
              readOnly={!isEditing}
              onChange={handleInputChange}
              className="ml-2 px-2 py-1 rounded border-2 border-gray-300"
            />
            {isEditing ? (
              <>
              <button type="submit" className="ml-2">
                  <HiThumbUp className="h-5 w-5 mr-1 text-light-grey inline-flex" />{" "}
              </button>
              </>
            ) : (
              <button type="submit" onClick = {handleEditClick} className="ml-2">
                  <HiPencil className="h-5 w-5 mr-1 text-light-grey inline-flex" />{" "}
              </button>
            )}
          </div>
        </div> */}
import React, { useState, useContext } from "react";
import { AuthContext } from "../utils";

const FormLogin = (props) => {
  const { onSuccess } = props;
  const [formLogin, setFormLogin] = useState({ email: "", password: "" });
  const [formRegister, setFormRegister] = useState({ firstname: "", lastname: "", username: "", email: "", password: "" });
  const [showForm, setShowForm] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const authContext = useContext(AuthContext);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formLogin;
    const { success, errorsValidation } = await authContext.login(email, password);
    
    success ? onSuccess() : setValidationErrors(errorsValidation);
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    
    const { firstname, lastname, username, email, password } = formRegister;
    const { success, errorsValidation } = await authContext.register(firstname, lastname, username, email, password);

    success ? onSuccess() : setValidationErrors(errorsValidation);
  };

  const handleFormChange = () => {  
    setShowForm(!showForm);
  };

  return (
    <div>
    {!showForm ? (
      /* FORM LOGIN */
      <form
      className="bg-dark-blue rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmitLogin}
    >
      <div className="mb-4">
        <label htmlFor="email" className="block text-white font-semibold mb-2">
          Email
        </label>

        <input
          type="email"
          id="email"
          name="email"
          required
          value={formLogin.email}
          className="bg-gray-200 appearance-none rounded w-full py-2 px-4 text-dark-blue leading-tight focus:outline-none focus:bg-white"
          onChange={(e) => {
            setFormLogin({ ...formLogin, email: e.target.value });
            setValidationErrors({ ...validationErrors, email: "" }); // Limpiar el error al cambiar el valor del campo
          }}
        />
        {validationErrors.email && (
          <p className="text-red text-xs italic mt-2">{validationErrors.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-white font-semibold mb-2"
        >
          Password
        </label>

        <input
          type="password"
          id="password"
          name="password"
          required
          value={formLogin.password}
          className="bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 leading-tight"
          onChange={(e) => {
            setFormLogin({ ...formLogin, password: e.target.value });
            setValidationErrors({ ...validationErrors, password: "" }); // Limpiar el error al cambiar el valor del campo
          }}
        />
        {validationErrors.password && (
          <p className="text-red text-xs italic mt-2">{validationErrors.password}</p>
        )}
      </div>

      <div className="mt-8">
        {validationErrors.general && (
          <p className="text-red text-xs text-center italic my-2">{validationErrors.general}</p>
        )}
        <button
          className="bg-gradient-to-r from-neon-blue via-neon-pink to-neon-pink w-full text-dark-blue font-bold py-2 px-4 rounded"
          type="submit"
        >
          Log In
        </button>
        <p className="text-white text-center text-xs font-semibold mt-5">
          Don't have an account yet? 
          <span className="text-neon-pink ps-2" 
                onClick={handleFormChange}
          >
            Register here
          </span>
        </p>
      </div>
    </form>
    ): (
      /* FORM REGISTER */
      <form
        className="bg-dark-blue rounded px-6 pt-6 pb-8 mb-4"
        onSubmit={handleSubmitRegister}
        >
        <div className="grid gap-3 grid-cols-1 md:grid-cols-6 mb-4">
          <div className="md:col-span-3">
            <label
              className="block text-white font-semibold mb-2"
              htmlFor="firstname"
            >
              First name
            </label>
            <input
              className="shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:shadow-outline"
              id="firstname"
              name="firstname"
              required
              type="text"
              placeholder="First name"
              value={formRegister.firstname}
              onChange={(e) => {
                setFormRegister({ ...formRegister, firstname: e.target.value });
                setValidationErrors({ ...validationErrors, firstname: "" }); // Limpiamos el error al cambiar el valor del campo
              }}
            />
            {validationErrors.username && (
              <p className="text-red text-xs italic mt-2">{validationErrors.firstname}</p>
            )}
          </div>
          <div className="md:col-span-3">
            <label
              className="block text-white font-semibold mb-2"
              htmlFor="lastname"
            >
              Last name
            </label>
            <input
              className="shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:shadow-outline"
              id="lastname"
              name="lastname"
              required
              type="text"
              placeholder="Last name"
              value={formRegister.lastname}
              onChange={(e) => {
                setFormRegister({ ...formRegister, lastname: e.target.value });
                setValidationErrors({ ...validationErrors, lastname: "" }); // Limpiamos el error al cambiar el valor del campo
              }}
            />
            {validationErrors.username && (
              <p className="text-red text-xs italic mt-2">{validationErrors.lastname}</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-white font-semibold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:shadow-outline"
            id="username"
            name="username"
            required
            type="text"
            placeholder="Username"
            value={formRegister.username}
            onChange={(e) => {
              setFormRegister({ ...formRegister, username: e.target.value });
              setValidationErrors({ ...validationErrors, username: "" }); // Limpiamos el error al cambiar el valor del campo
            }}
          />
          {validationErrors.username && (
            <p className="text-red text-xs italic mt-2">{validationErrors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-white font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none  rounded w-full py-2 px-3 leading-tight focus:shadow-outline"
            id="email"
            name="email"
            required
            type="email"
            placeholder="Email"
            value={formRegister.email}
            onChange={(e) => {
              setFormRegister({ ...formRegister, email: e.target.value });
              setValidationErrors({ ...validationErrors, email: "" }); // Limpiar el error al cambiar el valor del campo
            }}
          />
          {validationErrors.email && (
            <p className="text-red text-xs italic mt-2">{validationErrors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-white  font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none  rounded w-full py-2 px-3 leading-tight focus:shadow-outline"
            id="password"
            name="password"
            required
            type="password"
            placeholder="********"
            value={formRegister.password}
            onChange={(e) => {
              setFormRegister({ ...formRegister, password: e.target.value });
              setValidationErrors({ ...validationErrors, password: "" }); // Limpiar el error al cambiar el valor del campo
            }}
          />
          {validationErrors.password && (
            <p className="text-red text-xs italic mt-2">{validationErrors.password}</p>
          )}
        </div>
        <div className="mt-8">
          {validationErrors.general && (
            <p className="text-red text-xs text-center italic my-2">{validationErrors.general}</p>
          )}
          <button
            className="bg-gradient-to-r from-neon-blue via-neon-pink to-neon-pink  w-full  text-dark-blue font-bold py-2 px-4 rounded"
            type="submit"
          >
            Register
          </button>
          <p className="text-white text-center text-xs font-semibold mt-5">
            Already have an account
          <span className="text-neon-pink ps-2" 
                onClick={handleFormChange}
          >
            Login here
          </span>
        </p>
        </div>
        </form>
    )}
    </div>
  );
};

export default FormLogin;

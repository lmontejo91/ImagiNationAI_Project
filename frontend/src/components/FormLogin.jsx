import React, { useState, useContext } from "react";
import { AuthContext } from "../utils";

const FormLogin = (props) => {
  const { onSuccess } = props;
  const [formLogin, setFormLogin] = useState({ email: "", password: "" });
  const [formRegister, setFormRegister] = useState({ name: "", email: "", password: "" });
  const [showForm, setShowForm] = useState(false);
  const authContext = useContext(AuthContext);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formLogin;

    const success = await authContext.login(email, password);
    if (success) {
      onSuccess();
    } else {
      console.error("El inicio de sesión no ha sido exitoso.");
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    
    const { name, email, password } = formRegister;
    const success = await authContext.register(name, email, password);

    success ? onSuccess() : console.error("Register has failed");
  };

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setFormLogin({ ...formLogin, [name]: value });
  };

  const handleFormChange = () => {  
    setShowForm(!showForm);
  };

  return (
    <div>
    {!showForm ? (
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
          onChange={handleChangeInputs}
          className="bg-gray-200 appearance-none rounded w-full py-2 px-4 text-dark-blue leading-tight focus:outline-none focus:bg-white"
        />
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
          onChange={handleChangeInputs}
          className="bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 leading-tight"
        />
      </div>

      <div className="mt-8">
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
      <form
        className="bg-dark-blue rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmitRegister}
        >
        <div className="mb-4">
          <label
            className="block text-white font-semibold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none  rounded w-full py-2 px-3 leading-tight focus:shadow-outline"
            id="username"
            name="name"
            required
            type="text"
            placeholder="Username"
            value={formRegister.name}
            onChange={(e) => setFormRegister({ ...formRegister, name: e.target.value })}
          />
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
            onChange={(e) => setFormRegister({ ...formRegister, email: e.target.value })}
          />
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
            onChange={(e) => setFormRegister({ ...formRegister, password: e.target.value })}
          />
        </div>
        <div className="mt-8">
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

import React, { useState, useContext } from "react";
import { API_URL } from "../../config";
import { AuthContext } from "../utils";

const FormLogin = ({ onSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const authContext = useContext(AuthContext);
  const { login } = authContext;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form;

    const success = await authContext.login(email, password);
    if (success) {
      onSuccess();
    } else {
      console.error("El inicio de sesión no ha sido exitoso.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form
      className="bg-dark-blue rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label htmlFor="email" className="block text-white font-semibold mb-2">
          Email
        </label>

        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
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
          value={form.password}
          onChange={handleChange}
          className="bg-gray-200 appearance-none border-2  rounded w-full py-2 px-4  leading-tight  "
        />
      </div>

      <div className="mt-8">
        <button
          className="bg-gradient-to-r from-neon-blue via-neon-pink to-neon-pink w-full text-dark-blue font-bold py-2 px-4 rounded"
          type="submit"
        >
          Log In
        </button>
      </div>
    </form>
  );
};

export default FormLogin;

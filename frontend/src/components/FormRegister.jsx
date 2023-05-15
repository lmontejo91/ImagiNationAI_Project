import React, { useState, useContext } from "react";
import { API_URL } from "../../config";
import { AuthContext } from "../utils";

const FormRegister = ({ onSuccess }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const authContext = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(form);
      const response = await fetch(`${API_URL}/v1/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        authContext.saveToken(data.token);
        authContext.setUser(data.user);
        onSuccess();
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form
      className="bg-dark-blue rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
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
          type="text"
          placeholder="Username"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-white font-semibold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none  rounded w-full py-2 px-3 leading-tight focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
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
          type="password"
          placeholder="********"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      <div className="mt-8">
        <button
          className="bg-gradient-to-r from-neon-blue via-neon-pink to-neon-pink  w-full  text-dark-blue font-bold py-2 px-4 rounded"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default FormRegister;

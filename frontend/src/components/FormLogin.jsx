import React, { useState, useContext } from 'react';
import { API_URL } from '../../config';
import { AuthContext } from '../utils';

const FormLogin = ({ onSuccess }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const authContext = useContext(AuthContext);
  const { login } = authContext;
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form;
    

    const success = await authContext.login(email, password);
    if (success) {
      onSuccess();
    } else {
      console.error('El inicio de sesión no ha sido exitoso.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h2 className="text-2xl font-medium">Log In</h2>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label htmlFor="email" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label htmlFor="password" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="bg-neon-blue hover:bg-grey-blue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Log In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;

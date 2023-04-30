import React from 'react';
import { API_URL } from '../../config';

const FormRegister = ({ onSuccess }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const response = await fetch(`${API_URL}/v1/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "value": "register" }),
        });

        const data = await response.json();
        console.log(data);
        alert('Success');
        onSuccess();
      } catch (err) {
        alert(err);
      }
  };
  /* const [isRegistered, setRegister] = useState(false);
  const [userData, setUserData] = useState(null);

  const register = (data) => {
    setUserData(data);
    setRegister(true);
  }; */

  return (
    <form className="bg-white rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          //value="name"
          //value={form.username}
          //onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="********"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-neon-blue hover:bg-grey-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  )
};

export default FormRegister;

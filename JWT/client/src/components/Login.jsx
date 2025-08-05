import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [token, setToken] = useState('');
  const [error, setError] = useState('');


  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setToken('');

    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', credentials);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border border-gray-300 p-3 rounded-lg"
            value={credentials.username}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            value={credentials.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        {token && (
          <div className="mt-6 bg-green-100 text-green-800 p-4 rounded">
            <p className="font-medium">Token:</p>
            <p className="break-all text-sm">{token}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

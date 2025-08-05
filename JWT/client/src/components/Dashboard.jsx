import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [secret, setSecret] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('⚠️ No token found. Please login first.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get('http://localhost:3000/api/v1/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMsg(res.data.msg);
      setSecret(res.data.secret);
    } catch (err) {
      console.error('❌ Error fetching dashboard:', err);
      setError(err.response?.data?.msg || 'Unauthorized access');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center">
        {loading ? (
          <p className="text-gray-600 text-lg">⏳ Loading...</p>
        ) : error ? (
          <div className="text-red-600 font-semibold text-md">{error}</div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{msg}</h2>
            <p className="text-lg text-green-700">{secret}</p>
            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

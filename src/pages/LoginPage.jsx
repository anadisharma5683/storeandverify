import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username + "@dummy.com", username, password }),
      });
      const result = await response.json();
      navigate('/result', { state: { result: result.status } });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Left panel */}
      <div className="w-full md:w-1/2 bg-gray-900 text-white flex flex-col justify-center items-center px-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          <p className="mb-6 text-gray-400">Enter your account details</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <div className="text-right text-sm text-purple-400 hover:underline cursor-pointer">
              Forgot Password?
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 transition-colors text-white py-2 rounded-md font-semibold"
            >
              Login
            </button>
          </form>

          <div className="text-gray-400 text-sm text-center mt-6">
            Don’t have an account?{' '}
            <span className="text-white font-semibold hover:underline cursor-pointer">
              Sign up
            </span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="hidden md:flex w-1/2 bg-purple-500 justify-center items-center text-white relative overflow-hidden">
        <div className="text-center px-8 z-10">
          <h2 className="text-4xl font-bold mb-2">Welcome to</h2>
          <h3 className="text-2xl font-light">student portal</h3>
          <p className="mt-2 text-sm">Login to access your account</p>
        </div>

        <div className="absolute bottom-10 right-10 w-60">
          <img src="/assets/illustration.svg" alt="illustration" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost/certificate/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          adminEmail: email,
          adminPassword: password
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok. Status: ${response.status}. Details: ${errorText}`);
      }

      const result = await response.json();

      if (result.status === 'success') {
        setMessage("Login successful!");
        setMessageType('success');
        localStorage.setItem('isLoggedIn', 'true'); // Update login status
        setTimeout(() => {
          navigate('/Groups'); // Redirect to Groups page
        }, 1000);
      } else {
        setMessage(result.message || "An error occurred during login.");
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setMessage("An error occurred during login. Please try again.");
      setMessageType('error');
    }
  };
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-200 via-green-400 to-green-700">
      <div className="bg-white bg-opacity-90 p-8 rounded-3xl shadow-lg w-full max-w-md border-4 border-green-600">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Welcome Back!</h1>

        {message && (
          <div className={`p-4 mb-6 text-white ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded-lg`}>
            {message}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-5 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-5 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Log In
          </button>
          <div className="text-center text-sm text-gray-700 mt-4">
            Don’t have an account? <a href="/SignUp" className="text-green-400 hover:text-green-500">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

const InitialView = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setShowNavbar(true);
    // Navigate to the registrations page
    navigate('/Registrations');
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
      <div className="text-center p-8 max-w-lg mx-auto">
        <img 
          src="/backgroundd.jpg"  // Ensure the path is correct
          alt="Beautiful Nature" 
          className="w-full rounded-lg shadow-xl mb-6 transform hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to the Certificate Designer
        </h1>
        <p className="text-lg font-medium mb-8">
          Create stunning and professional certificates with ease.
        </p>
        <button 
          onClick={handleLogin}  // Handle button click
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-110"
        >
          LOG IN
        </button>
      </div>
    </div>
  );
};

export default InitialView;

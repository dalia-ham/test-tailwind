// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Check if all fields are filled
    if (!firstName || !lastName || !email || !password || !confirmPassword || !gender) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Reset the error message and navigate to the credentials page
    setErrorMessage('');
    navigate('/Credintials');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("cer3.jpg")' }}>
      <div className="bg-white bg-opacity-50 p-8 rounded-3xl shadow-lg w-full max-w-md border-4 border-green-600 mt-20">
        <h1 className="text-3xl font-semibold mb-6 text-center text-green-700">Sign Up</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="flex items-center mt-2 space-x-8">
              <label className="flex items-center text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="flex items-center text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-600 text-sm font-medium">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Register
          </button>

          <div className="text-center text-sm text-gray-700 mt-4">
            Already have an account? <a href="/Registrations" className="text-green-600 hover:text-green-500">Log in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

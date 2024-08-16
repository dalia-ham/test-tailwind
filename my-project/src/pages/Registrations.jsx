// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

function Contact() {
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Navigate to "Credentials" page on form submit
    navigate('/Credintials'); // Navigate to credentials page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("cer4.jpg")' }}>
      <div className="bg-white bg-opacity-50 p-8 rounded-3xl shadow-lg w-full max-w-md border-4 border-green-600"> {/* Added border width and color */}
        <h1 className="text-3xl font-semibold mb-6 text-center text-green-700">LOG IN</h1>
        <form className="space-y-6" onSubmit={handleSubmit}> {/* Increased spacing */}
          <div>
            <label htmlFor="Username" className="block text-sm font-medium text-gray-700 pl-2"> {/* Larger font size */}
              Username
            </label>
            <input
              type="text"
              id="Username"
              name="Username"
              className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700 pl-2">
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="checkbox"
              name="checkbox"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="checkbox" className="text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit
          </button>
          <div className="text-center text-sm text-gray-700">
            Don’t have an account? <Link to="/SignUp" className="text-green-600 hover:text-green-500">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;

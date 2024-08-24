// // eslint-disable-next-line no-unused-vars
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

// function Contact() {
//   const navigate = useNavigate(); // Use useNavigate for navigation

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent page reload on form submission

//     // Navigate to "Credentials" page on form submit
//     navigate('/Groups'); // Navigate to credentials page
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("cer4.jpg")' }}>
//       <div className="bg-white bg-opacity-50 p-8 rounded-3xl shadow-lg w-full max-w-md border-4 border-green-600"> {/* Added border width and color */}
//         <h1 className="text-3xl font-semibold mb-6 text-center text-green-700">LOG IN</h1>
//         <form className="space-y-6" onSubmit={handleSubmit}> {/* Increased spacing */}
//           <div>
//             <label htmlFor="Username" className="block text-sm font-medium text-gray-700 pl-2"> {/* Larger font size */}
//               Username
//             </label>
//             <input
//               type="text"
//               id="Username"
//               name="Username"
//               className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="Password" className="block text-sm font-medium text-gray-700 pl-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="Password"
//               name="Password"
//               className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
//               required
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               id="checkbox"
//               name="checkbox"
//               className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//             />
//             <label htmlFor="checkbox" className="text-sm text-gray-700">
//               Remember me
//             </label>
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//           >
//             Submit
//           </button>
//           <div className="text-center text-sm text-gray-700">
//             Don’t have an account? <Link to="/SignUp" className="text-green-600 hover:text-green-500">Sign up</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Contact;
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();
  
  // State to store messages
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather form data
    const formData = new FormData(e.target);
    const data = {
      adminEmail: formData.get('Username'), // Email field
      adminPassword: formData.get('Password') // Password field
    };

    // Send data to the PHP backend
    try {
      const response = await fetch('http://localhost/certificate/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  // Send the data as JSON
      });
      
      const result = await response.json();

      if (result.status === 'success') {
        // Set success message and navigate to the /Groups page
        setMessage("Login successful!");
        setMessageType('success');
        setTimeout(() => {
          navigate('/Groups');
        }, 1000); // Redirect after 1 second
      } else {
        // Set error message from the response
        setMessage(result.message);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle fetch error
      setMessage("An error occurred during login. Please try again.");
      setMessageType('error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("cer4.jpg")' }}>
      <div className="bg-white bg-opacity-50 p-8 rounded-3xl shadow-lg w-full max-w-md border-4 border-green-600">
        <h1 className="text-3xl font-semibold mb-6 text-center text-green-700">LOG IN</h1>

        {/* Show message if exists */}
        {message && (
          <div className={`p-4 mb-6 text-white ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded-lg`}>
            {message}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Username" className="block text-sm font-medium text-gray-700 pl-2">
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

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './sign.css'; // تأكد من أن المسار إلى ملف CSS صحيح

const SignUp = () => {
  const [gender, setGender] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="signupPage">
      <center>
        <form className="signupForm">
          <h1>Sign Up</h1>

          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" />

          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />

          <div>
            <label>Gender</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={handleGenderChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={handleGenderChange}
              />
              Female
            </label>
          </div>

          <button type="submit">Register</button>
          <div className="signup-prompt">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </form>
      </center>
    </div>
  );
};

export default SignUp;
// eslint-disable-next-line no-unused-vars
// import React, { useState } from 'react';

// const SignUp = () => {
//   const [gender, setGender] = useState('');

//   const handleGenderChange = (event) => {
//     setGender(event.target.value);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-cover bg-center p-4" style={{ backgroundImage: "url('cer4.jpg')" }}>
//       <div className="bg-gray-200 bg-opacity-80 p-8 rounded-2xl shadow-2xl border border-gray-300">
//         <form className="border border-black w-96 bg-yellow-400 bg-opacity-80 text-black rounded-2xl shadow-2xl p-5">
//           <h1 className="text-center font-normal text-2xl mb-4 text-black">Sign Up</h1>

//           <label htmlFor="firstName" className="block uppercase text-xs text-black mb-1">First Name</label>
//           <input type="text" id="firstName" name="firstName" className="bg-white bg-opacity-30 h-9 rounded-lg px-4 mb-3 w-full text-black" />

//           <label htmlFor="lastName" className="block uppercase text-xs text-black mb-1">Last Name</label>
//           <input type="text" id="lastName" name="lastName" className="bg-white bg-opacity-30 h-9 rounded-lg px-4 mb-3 w-full text-black" />

//           <label htmlFor="email" className="block uppercase text-xs text-black mb-1">Email</label>
//           <input type="email" id="email" name="email" className="bg-white bg-opacity-30 h-9 rounded-lg px-4 mb-3 w-full text-black" />

//           <label htmlFor="password" className="block uppercase text-xs text-black mb-1">Password</label>
//           <input type="password" id="password" name="password" className="bg-white bg-opacity-30 h-9 rounded-lg px-4 mb-3 w-full text-black" />

//           <label htmlFor="confirmPassword" className="block uppercase text-xs text-black mb-1">Confirm Password</label>
//           <input type="password" id="confirmPassword" name="confirmPassword" className="bg-white bg-opacity-30 h-9 rounded-lg px-4 mb-3 w-full text-black" />

//           <div className="mb-4">
//             <span className="block uppercase text-xs text-black mb-1">Gender</span>
//             <label className="inline-flex items-center mr-3">
//               <input
//                 type="radio"
//                 name="gender"
//                 value="male"
//                 checked={gender === 'male'}
//                 onChange={handleGenderChange}
//                 className="mr-1"
//               />
//               Male
//             </label>
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 name="gender"
//                 value="female"
//                 checked={gender === 'female'}
//                 onChange={handleGenderChange}
//                 className="mr-1"
//               />
//               Female
//             </label>
//           </div>

//           <button type="submit" className="bg-green-700 hover:bg-green-800 text-white rounded-lg h-9 w-full mb-3 shadow-md">
//             Register
//           </button>
//           <div className="text-center text-xs text-black">
//             Already have an account? <a href="/login" className="text-blue-500 underline">Log in</a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

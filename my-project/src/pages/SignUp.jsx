// // eslint-disable-next-line no-unused-vars
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SignUp = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [gender, setGender] = useState('');
//   const [phone, setPhone] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // التحقق من صحة المدخلات
//     if (!firstName || !lastName || !email || !password || !confirmPassword || !gender || !phone) {
//       setErrorMessage('Please fill out all fields.');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setErrorMessage('Passwords do not match.');
//       return;
//     }

//     // تحضير البيانات لإرسالها إلى السيرفر
//     const data = {
//       adminName: `${firstName} ${lastName}`,
//       adminEmail: email,
//       adminPhone: phone,
//       adminPassword: password,
//       gender
//     };

//     try {
//       const response = await fetch('http://localhost/test/SignUp.php', { // تعديل رابط الـ API حسب الحاجة
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });

//       const result = await response.json();

//       if (result.status === 'success') {
//         setSuccessMessage('Registration successful. Redirecting to login...');
//         setErrorMessage('');
//         setTimeout(() => navigate('/Login'), 2000); // إعادة التوجيه إلى صفحة تسجيل الدخول بعد التسجيل
//       } else {
//         setErrorMessage(result.message || 'An error occurred during registration.');
//         setSuccessMessage('');
//       }
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       setErrorMessage('Failed to connect to the server.');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-200 via-green-300 to-green-500">
//       <div className="bg-white bg-opacity-90 p-8 rounded-3xl shadow-lg w-full max-w-md border-4 border-green-600 mt-20">
//         <h1 className="text-3xl font-semibold mb-6 text-center text-green-600">Sign Up</h1>

//         <form className="space-y-6" onSubmit={handleSubmit}>
//           {/* الحقول المختلفة */}
//           <div className="grid grid-cols-2 gap-4">
//             {/* حقل الاسم الأول */}
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                 placeholder="Enter your first name"
//               />
//             </div>

//             {/* حقل الاسم الأخير */}
//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                 placeholder="Enter your last name"
//               />
//             </div>

//             {/* حقل البريد الإلكتروني */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                 placeholder="Enter your email"
//               />
//             </div>

//             {/* حقل رقم الهاتف */}
//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
//               <input
//                 type="text"
//                 id="phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                 placeholder="Enter your phone number"
//               />
//             </div>

//             {/* حقل كلمة المرور */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                 placeholder="Enter your password"
//               />
//             </div>

//             {/* تأكيد كلمة المرور */}
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                 placeholder="Confirm your password"
//               />
//             </div>

//             {/* حقل الجنس مع radio buttons */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-700">Gender</label>
//               <div className="flex items-center space-x-6 mt-2">
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="gender"
//                     value="male"
//                     checked={gender === 'male'}
//                     onChange={(e) => setGender(e.target.value)}
//                     className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
//                   />
//                   <span className="ml-2 text-gray-700">Male</span>
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="gender"
//                     value="female"
//                     checked={gender === 'female'}
//                     onChange={(e) => setGender(e.target.value)}
//                     className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
//                   />
//                   <span className="ml-2 text-gray-700">Female</span>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* زر التسجيل */}
//           <div>
//             <button
//               type="submit"
//               className="w-full py-3 px-5 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//             >
//               Register 
//             </button>
//           </div>

//           {/* عرض رسائل الخطأ أو النجاح */}
//           {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
//           {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
          
//           {/* رابط لتسجيل الدخول */}
//           <div className="text-center mt-4">
//             <p className="text-gray-700">Already have an account? <a href="/Registrations" className="text-green-400 hover:text-green-800">Log In</a></p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
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
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword || !gender || !phone) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const data = { firstName, lastName, adminEmail: email, adminPhone: phone, adminPassword: password, gender };

    try {
      const response = await fetch('http://localhost/test/SignUp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.status === 'success') {
        setSuccessMessage('Registration successful.');
        setErrorMessage('');
        setTimeout(() => navigate('/Registrations'), 2000);
      } else {
        setErrorMessage(result.message || 'An error occurred during registration.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Failed to connect to the server.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-200 via-green-300 to-green-500">
      <div className="bg-white bg-opacity-90 p-8 rounded-3xl shadow-lg w-full max-w-md border-4 border-green-600 mt-20">
        <h1 className="text-3xl font-semibold mb-6 text-center text-green-600">Sign Up</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900"
                placeholder="Confirm your password"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <div className="flex items-center space-x-6 mt-2">
              <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="male"
                    value="male"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700">Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="female"
                    value="female"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700">Female</span>
                </label>
              </div>
            </div>
          </div>
          {errorMessage && (
            <div className="text-red-600 text-sm">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="text-green-600 text-sm">
              {successMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <a href="/Registrations" className="text-green-600 hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

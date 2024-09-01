// // eslint-disable-next-line no-unused-vars
// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const CredentialForm = () => {
//   const location = useLocation();
//   const { records } = location.state || { records: [] };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col p-4">
//       {/* Top Section */}
//       <div className="bg-white shadow p-4 mb-4">
//         <h1 className="text-2xl font-semibold">Credential Details</h1>
//         <div className="text-sm text-blue-600 mt-2">
//           <span>This credential is Unpublished.</span>
//           <span> Changes will only be visible to you until you publish.</span>
//         </div>
//       </div>

//       {/* Main Section */}
//       <div className="flex flex-grow">
//         {/* Left Panel: Form */}
//         <div className="w-1/2 bg-white shadow p-4 mr-4">
//           <h2 className="text-xl font-semibold mb-4">Credential Information</h2>
//           <form className="space-y-4">
//             {records.map((record, index) => (
//               <div key={index}>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Recipient Name</label>
//                   <input
//                     type="text"
//                     placeholder="Enter recipient name"
//                     value={record.name}
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Recipient Email Address</label>
//                   <input
//                     type="email"
//                     placeholder="Enter email address"
//                     value={record.email}
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Issue Date</label>
//                   <input
//                     type="date"
//                     value={record.issueDate}
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                   />
//                 </div>
//               </div>
//             ))}
//             <button
//               type="submit"
//               className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
//             >
//               Save
//             </button>
//           </form>
//         </div>

//         {/* Right Panel: Preview */}
//         <div className="w-1/2 bg-white shadow p-4">
//           <h2 className="text-xl font-semibold mb-4">Credential Preview</h2>
//           {/* Placeholder for the preview */}
//           <div className="border border-gray-300 h-full flex items-center justify-center">
//             <span className="text-gray-500">Certificate Preview will appear here</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CredentialForm;

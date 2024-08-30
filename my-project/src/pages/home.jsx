// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Modal from 'react-modal';

// Modal.setAppElement('#root');

// function Home() {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [modalContent, setModalContent] = useState('');
//   const [selectedCredentials, setSelectedCredentials] = useState([]);
//   const [credentials, setCredentials] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCredentials = async () => {
//       try {
//         const response = await fetch('http://localhost/test/home.php', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch credentials');
//         }

//         const data = await response.json();
//         console.log('Fetched data:', data);

//         if (data.status === 'success') {
//           if (data.data && data.data.length > 0) {
//             setCredentials(data.data);
//             setError(null);
//           } else {
//             setError('No data available');
//           }
//         } else {
//           setError(data.message);
//         }
//       } catch (error) {
//         setError(error.message);
//         console.error('Error fetching credentials:', error);
//       }
//     };

//     fetchCredentials();
//   }, []);

//   const handleOpen = (id) => {
//     navigate(`/pathways/${id}`);
//   };

//   const filteredCredentials = credentials.filter(
//     (credential) =>
//       credential.Recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       credential.Credential_ID.toString().includes(searchQuery) ||
//       credential.Group.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSelectChange = (event) => {
//     const selectedValue = event.target.value;

//     if (selectedValue === 'Single Credentials' || selectedValue === 'Multiple Credentials') {
//       setModalContent(selectedValue);
//       setModalIsOpen(true);
//     } else if (selectedValue === 'Create Credentials') {
//       handleCreateCredential();
//     }
//   };

//   const handleCheckboxChange = (id) => {
//     setSelectedCredentials((prevSelected) => {
//       if (prevSelected.includes(id)) {
//         return prevSelected.filter((item) => item !== id);
//       } else {
//         return [...prevSelected, id];
//       }
//     });
//   };

//   const handleDelete = () => {
//     setCredentials((prevCredentials) =>
//       prevCredentials.filter((credential) => !selectedCredentials.includes(credential.Credential_ID))
//     );
//     setSelectedCredentials([]);
//   };

//   const handleCreateCredential = () => {
//     navigate('/Groups');
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   return (
//     <div className="min-h-screen mt-12 bg-gradient-to-b from-white via-green-100 to-green-600">
//       <div className="flex justify-between items-center py-4 px-6">
//         <h1 className="text-2xl font-semibold">Credentials</h1>
//       </div>

//       <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b">
//         <div className="flex space-x-2">
//           <select className="bg-green-800 text-white px-4 py-2 rounded-md text-sm">
//             <option>Update Credentials</option>
//           </select>

//           <select 
//             className="bg-green-800 text-white px-4 py-2 rounded-md text-sm"
//             onChange={handleSelectChange}
//           >
//             <option value="" disabled>Create Credentials</option>
//             <option value="Single Credentials">Single Credentials</option>
//             <option value="Multiple Credentials">Multiple Credentials</option>
//             <option value="Create Credentials">Create Credentials</option>
//           </select>
//         </div>
//       </div>

//       <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
//         <div className="flex flex-wrap gap-4">
//           <input
//             type="text"
//             placeholder="Search for a name, email, or ID"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto text-sm"
//           />
//         </div>

//         <button
//           onClick={handleDelete}
//           className="bg-green-800 text-white px-6 py-2 rounded-md shadow-lg hover:bg-red-500 transition-colors"
//           disabled={selectedCredentials.length === 0}
//         >
//           Delete Selected
//         </button>
//       </div>

//       <div className="px-6 py-4">
//         {error ? (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
//             <strong>Error:</strong> {error}
//           </div>
//         ) : credentials.length === 0 ? (
//           <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-md mb-4">
//             <strong>Warning:</strong> No data available
//           </div>
//         ) : (
//           <table className="min-w-full text-sm border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="text-left py-2 px-4">
//                   <input
//                     type="checkbox"
//                     onChange={(e) => {
//                       if (e.target.checked) {
//                         setSelectedCredentials(filteredCredentials.map((cred) => cred.Credential_ID));
//                       } else {
//                         setSelectedCredentials([]);
//                       }
//                     }}
//                     checked={selectedCredentials.length === filteredCredentials.length}
//                   />
//                 </th>
//                 <th className="text-left py-2 px-4">Credential ID</th>
//                 <th className="text-left py-2 px-4">Status</th>
//                 <th className="text-left py-2 px-4">Recipient</th>
//                 <th className="text-left py-2 px-4">Group</th>
//                 <th className="text-left py-2 px-4">Issue Date</th>
//                 <th className="text-left py-2 px-4">Expiry Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCredentials.map((credential) => (
//                 <tr key={credential.Credential_ID}>
//                   <td className="py-2 px-4">
//                     <input
//                       type="checkbox"
//                       checked={selectedCredentials.includes(credential.Credential_ID)}
//                       onChange={() => handleCheckboxChange(credential.Credential_ID)}
//                     />
//                   </td>
//                   <td className="py-2 px-4">{credential.Credential_ID}</td>
//                   <td className="py-2 px-4">{credential.Status}</td>
//                   <td className="py-2 px-4">{credential.Recipient}</td>
//                   <td className="py-2 px-4">{credential.Group}</td>
//                   <td className="py-2 px-4">{credential.Issue_Date}</td>
//                   <td className="py-2 px-4">{credential.Expiry_Date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
//         <div className="bg-white p-6 rounded-md shadow-lg">
//           <h2 className="text-lg font-semibold mb-4">{modalContent}</h2>
//           <button
//             onClick={closeModal}
//             className="bg-gray-800 text-white px-4 py-2 rounded-md"
//           >
//             Close
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default Home;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [selectedCredentials, setSelectedCredentials] = useState([]);
  const [credentials, setCredentials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await fetch('http://localhost/test/home.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch credentials');
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        if (data.status === 'success') {
          if (data.data && data.data.length > 0) {
            setCredentials(data.data);
            setError(null);
          } else {
            setError('No data available');
          }
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching credentials:', error);
      }
    };

    fetchCredentials();
  }, []);

  const handleOpen = (id) => {
    navigate(`/pathways/${id}`);
  };

  const handlePublishToggle = (id) => {
    setCredentials((prevCredentials) =>
      prevCredentials.map((credential) =>
        credential.Credential_ID === id
          ? { ...credential, Status: credential.Status === 'Published' ? 'Not Published' : 'Published' }
          : credential
      )
    );
  };

  const filteredCredentials = credentials.filter(
    (credential) =>
      credential.Recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      credential.Credential_ID.toString().includes(searchQuery) ||
      credential.Group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === 'Single Credentials' || selectedValue === 'Multiple Credentials') {
      setModalContent(selectedValue);
      setModalIsOpen(true);
    } else if (selectedValue === 'Create Credentials') {
      handleCreateCredential();
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedCredentials((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((item) => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleDelete = () => {
    setCredentials((prevCredentials) =>
      prevCredentials.filter((credential) => !selectedCredentials.includes(credential.Credential_ID))
    );
    setSelectedCredentials([]);
  };

  const handleCreateCredential = () => {
    navigate('/Groups');
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-b from-white via-green-100 to-green-600">
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-semibold">Credentials</h1>
      </div>

      <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b">
        <div className="flex space-x-2">
          <select className="bg-green-800 text-white px-4 py-2 rounded-md text-sm">
            <option>Update Credentials</option>
          </select>

          <select 
            className="bg-green-800 text-white px-4 py-2 rounded-md text-sm"
            onChange={handleSelectChange}
          >
            <option value="" disabled>Create Credentials</option>
            <option value="Single Credentials">Single Credentials</option>
            <option value="Multiple Credentials">Multiple Credentials</option>
            <option value="Create Credentials">Create Credentials</option>
          </select>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search for a name, email, or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto text-sm"
          />
        </div>

        <button
          onClick={handleDelete}
          className="bg-green-800 text-white px-6 py-2 rounded-md shadow-lg hover:bg-red-500 transition-colors"
          disabled={selectedCredentials.length === 0}
        >
          Delete Selected
        </button>
      </div>

      <div className="px-6 py-4">
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            <strong>Error:</strong> {error}
          </div>
        ) : credentials.length === 0 ? (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-md mb-4">
            <strong>Warning:</strong> No data available
          </div>
        ) : (
          <table className="min-w-full text-sm border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-2 px-4">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCredentials(filteredCredentials.map((cred) => cred.Credential_ID));
                      } else {
                        setSelectedCredentials([]);
                      }
                    }}
                    checked={selectedCredentials.length === filteredCredentials.length}
                  />
                </th>
                <th className="text-left py-2 px-4">Credential ID</th>
                <th className="text-left py-2 px-4">Status</th>
                <th className="text-left py-2 px-4">Recipient</th>
                <th className="text-left py-2 px-4">Group</th>
                <th className="text-left py-2 px-4">Issue Date</th>
                <th className="text-left py-2 px-4">Expiry Date</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCredentials.map((credential) => (
                <tr key={credential.Credential_ID}>
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      checked={selectedCredentials.includes(credential.Credential_ID)}
                      onChange={() => handleCheckboxChange(credential.Credential_ID)}
                    />
                  </td>
                  <td className="py-2 px-4">{credential.Credential_ID}</td>
                  <td className="py-2 px-4">{credential.Status}</td>
                  <td className="py-2 px-4">{credential.Recipient}</td>
                  <td className="py-2 px-4">{credential.Group}</td>
                  <td className="py-2 px-4">{credential.Issue_Date}</td>
                  <td className="py-2 px-4">{credential.Expiry_Date}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleOpen(credential.Credential_ID)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => handlePublishToggle(credential.Credential_ID)}
                      className={`px-4 py-2 rounded-md ${
                        credential.Status === 'Published' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}
                    >
                      {credential.Status === 'Published' ? 'Unpublish' : 'Publish'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h2 className="text-lg font-semibold mb-4">{modalContent}</h2>
          <button
            onClick={closeModal}
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Home;

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [selectedCredentials, setSelectedCredentials] = useState([]);

  // بيانات الجدول
  const [credentials, setCredentials] = useState([
    { id: 108809486, status: 'Active', recipient: 'Ahmad', group: 'cwdc', issueDate: 'Jul 14, 2024', expiryDate: '—' },
    { id: 108809487, status: 'Expired', recipient: 'Sara', group: 'cert', issueDate: 'May 10, 2024', expiryDate: 'Jul 14, 2024' },
  ]);

  // Function to handle the click and navigate to the details page
  const handleOpen = (id) => {
    console.log(`Navigating to /pathways/${id}`); // تحقق من أن المعرف يتم تمريره بشكل صحيح
    navigate(`/pathways/${id}`);
  };

  // Filter credentials based on search query
  const filteredCredentials = credentials.filter(
    (credential) =>
      credential.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      credential.id.toString().includes(searchQuery) ||
      credential.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle the select change to navigate to a new page or open a dialog
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    // Open a dialog based on the selected value
    if (selectedValue === 'Single Credentials' || selectedValue === 'Multiple Credentials') {
      setModalContent(selectedValue); // Set modal content based on the selection
      setModalIsOpen(true); // Open the modal
    } 
  };

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    setSelectedCredentials((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((item) => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  // Handle delete selected credentials
  const handleDelete = () => {
    setCredentials((prevCredentials) =>
      prevCredentials.filter((credential) => !selectedCredentials.includes(credential.id))
    );
    setSelectedCredentials([]); // Clear selected after deletion
  };

  // Close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="min-h-screen mt-12 bg-transparent"> {/* Removed background */}
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-semibold">Credentials</h1>
      </div>

      {/* Buttons inside the top bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b">
        <div className="flex space-x-2">
          <select className="bg-green-800 text-white px-4 py-2 rounded-md text-sm">
            <option>Update Credentials</option>
            <option>Multiple Group</option>
          </select>

          {/* Dropdown for Create Credentials */}
          <select 
            className="bg-green-800 text-white px-4 py-2 rounded-md text-sm"
            onChange={handleSelectChange} // Handle option change
          >
            <option value="" disabled selected>Create Credentials</option> {/* Keep it fixed */}
            <option value="Single Credentials">Single Credentials</option>
            <option value="Multiple Credentials">Multiple Credentials</option>
          </select>
        </div>
      </div>

      {/* Filters with Delete Button */}
      <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search for a name, email, or ID"
            value={searchQuery} // رابط البحث بحالة البحث
            onChange={(e) => setSearchQuery(e.target.value)} // تحديث حالة البحث عند الكتابة
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto text-sm"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-md text-sm">
            <option>Collections</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md text-sm">
            <option>Groups</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md text-sm">
            <option>Status</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md text-sm">
            <option>Visibility</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md text-sm">
            <option>Engagement</option>
          </select>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-md text-sm">
            <option>Custom Attributes</option>
          </select>
        </div>

        {/* Delete Selected Button */}
        <button
          onClick={handleDelete}
          className="bg-green-800 text-white px-6 py-2 rounded-md shadow-lg hover:bg-red-500 transition-colors"
          disabled={selectedCredentials.length === 0}
        >
          Delete Selected
        </button>
      </div>

      {/* Table */}
      <div className="px-6 py-4">
        <table className="min-w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-2 px-4">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCredentials(filteredCredentials.map((cred) => cred.id));
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
              <th className="text-left py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredCredentials.map((credential) => (
              <tr key={credential.id}>
                <td className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={selectedCredentials.includes(credential.id)}
                    onChange={() => handleCheckboxChange(credential.id)}
                  />
                </td>
                <td className="py-2 px-4">{credential.id}</td>
                <td className="py-2 px-4">{credential.status}</td>
                <td className="py-2 px-4">{credential.recipient}</td>
                <td className="py-2 px-4">{credential.group}</td>
                <td className="py-2 px-4">{credential.issueDate}</td>
                <td className="py-2 px-4">{credential.expiryDate}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleOpen(credential.id)} // تمرير المعرف بشكل صحيح
                    className="bg-black text-white px-4 py-1 rounded-md text-sm"
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Dialog */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Credentials Modal"
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="flex flex-col">
          {/* Title */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Create Credential</h2>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>

          {/* Search Field */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for Group ID"
              className="px-4 py-2 border border-gray-300 rounded-md w-full text-sm"
            />
          </div>

          {/* Modal Content */}
          <div>
            <p>{modalContent}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Home;

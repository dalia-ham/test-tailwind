// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // لتفادي التحذيرات في React

function Home() {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Function to handle the click and navigate to the details page
  const handleOpen = (id) => {
    navigate(`/credential/${id}`);
  };

  // Handle the select change to navigate to a new page or open a dialog
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    // Open a dialog based on the selected value
    if (selectedValue === 'Single Credentials' || selectedValue === 'Multiple Credentials') {
      setModalContent(selectedValue); // Set modal content based on the selection
      setModalIsOpen(true); // Open the modal
    } 
  };

  // Close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="min-h-screen mt-12">
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-semibold">Credentials</h1>
      </div>

      {/* Two buttons above filters */}
      <div className="flex justify-end space-x-2 px-6 py-4">
        <select className="bg-green-500 text-white px-4 py-2 rounded-md text-sm">
          <option>Single Group</option>
          <option>Multiple Group</option>
        </select>

        {/* Dropdown for Create Credentials */}
        <select 
          className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
          onChange={handleSelectChange} // Handle option change
        >
          <option value="" disabled selected>Create Credentials</option> {/* Keep it fixed */}
          <option value="Single Credentials">Single Credentials</option>
          <option value="Multiple Credentials">Multiple Credentials</option>
        </select>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search for a name, email, or ID"
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
      </div>

      {/* Table */}
      <div className="px-6 py-4">
        <table className="min-w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
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
            <tr>
              <td className="py-2 px-4">108809486</td>
              <td className="py-2 px-4">Active</td>
              <td className="py-2 px-4">Ahmad</td>
              <td className="py-2 px-4">cwdc</td>
              <td className="py-2 px-4">Jul 14, 2024</td>
              <td className="py-2 px-4">—</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleOpen(108809486)}
                  className="bg-black text-white px-4 py-1 rounded-md text-sm"
                >
                  Open
                </button>
              </td>
            </tr>
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
        <h2 className="text-xl font-semibold mb-4">{modalContent}</h2>
        <p className="mb-6">This is the dialog for {modalContent}. You can add additional content here.</p>
        <button
          onClick={closeModal}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

export default Home;

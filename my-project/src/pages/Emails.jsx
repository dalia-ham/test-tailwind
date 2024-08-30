// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Form = () => {
  const [records, setRecords] = useState([{ name: '', email: '', issueDate: '' }]);
  const navigate = useNavigate();
  const location = useLocation();
  const { templateSrc } = location.state || { templateSrc: '' };

  const addRecord = () => {
    setRecords([...records, { name: '', email: '', issueDate: '' }]);
  };

  const handleChange = (index, field, value) => {
    const newRecords = [...records];
    newRecords[index][field] = value;
    setRecords(newRecords);
  };

  const handleCreate = () => {
    navigate('/CredentialForm', { state: { records, templateSrc } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-8">
      {/* Steps Indicator */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create Credentials for CWDC</h1>
        <div className="flex mt-4">
          <div className="flex items-center">
            <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full">1 - Fill Data</span>
          </div>
          <div className="flex items-center ml-6">
            <span className="px-4 py-2 bg-gray-200 text-gray-600 rounded-full">2 - Summary</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white shadow p-4 rounded-md mt-8">
        <p className="text-gray-600 mb-4">Creating {records.length} credential{records.length > 1 ? 's' : ''}</p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6">#</th>
                <th className="py-3 px-6">Recipient Name *</th>
                <th className="py-3 px-6">Email *</th>
                <th className="py-3 px-6">Issue Date *</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {records.map((record, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">
                    <input
                      type="text"
                      placeholder="Recipient Name"
                      value={record.name}
                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="email"
                      placeholder="Email"
                      value={record.email}
                      onChange={(e) => handleChange(index, 'email', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="date"
                      value={record.issueDate}
                      onChange={(e) => handleChange(index, 'issueDate', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={addRecord}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          + Add record
        </button>
      </div>

      {/* Buttons */}
      <div className="flex mt-6">
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded mr-2">
          Cancel
        </button>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Form;

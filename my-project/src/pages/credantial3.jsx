
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Draggable from 'react-draggable';

const CredentialForm = () => {
  const location = useLocation();
  const { records, templateSrc } = location.state || { records: [], templateSrc: '' };

  // Initialize state for text properties (size, color, font, position) for each field
  const [textProperties, setTextProperties] = useState(
    records.map(() => ({
      name: { size: 16, color: '#000000', font: 'Arial', position: { x: 50, y: 50 } },
      grade: { size: 16, color: '#000000', font: 'Arial', position: { x: 50, y: 100 } },
      issueDate: { size: 16, color: '#000000', font: 'Arial', position: { x: 50, y: 150 } },
    }))
  );

  // Initialize state for global text properties
  const [globalTextProperties, setGlobalTextProperties] = useState({
    size: 16,
    color: '#000000',
    font: 'Arial',
  });

  // Update text property
  const handleTextChange = (index, field, property, value) => {
    const updatedProperties = [...textProperties];
    updatedProperties[index][field][property] = value;
    setTextProperties(updatedProperties);
  };

  // Update global text properties
  const handleGlobalTextChange = (property, value) => {
    setGlobalTextProperties((prev) => ({
      ...prev,
      [property]: value,
    }));
    // Apply global changes to all text properties
    const updatedProperties = textProperties.map((textProp) => ({
      name: { ...textProp.name, [property]: value },
      grade: { ...textProp.grade, [property]: value },
      issueDate: { ...textProp.issueDate, [property]: value },
    }));
    setTextProperties(updatedProperties);
  };

  async function addStudentAndCertificate(records) {
    for (const record of records) {
      try {
        // Add student
        const response = await fetch('http://localhost/certificate/add_student.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            studentName: record.name,
            studentEmail: record.email,
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Failed to add student:', errorData);
          alert(`Failed to add student: ${record.name}`);
          continue;
        }
  
        const studentData = await response.json();
        const studentId = studentData.studentId;
  
        // Add certificate
        const certResponse = await fetch('http://localhost/certificate/add_certificate.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            student_id: 4,
            issueDate: record.issueDate,
            expiryDate: '2024-4-4', // Adjust as necessary
            institutionId: '4', // Adjust as necessary
            group: 'Group B', // Adjust as necessary
            status: 'Active', // Adjust as necessary
            adminId: '1', // Adjust as necessary
          }),
        });
  
        if (!certResponse.ok) {
          const certData = await certResponse.json();
          console.error('Failed to add certificate:', certData);
          alert(`Failed to add certificate for student: ${record.name}`);
          continue;
        }
  
        console.log('Student and certificate added successfully');
        alert(`Student ${record.name} and certificate added successfully!`);
      } catch (error) {
        console.error('Error adding student and certificate:', error);
        alert(`Error adding student and certificate for ${record.name}: ${error.message}`);
      }
    }
  }
  
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
      {/* Top Section */}
      <div className="bg-white shadow p-4 mb-4">
        <h1 className="text-2xl font-semibold">Credential Details</h1>
        <div className="text-sm text-blue-600 mt-2">
          <span>This credential is Unpublished.</span>
          <span> Changes will only be visible to you until you publish.</span>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-grow">
        {/* Left Panel: Form */}
        <div className="w-1/2 bg-white shadow p-4 mr-4">
          <h2 className="text-xl font-semibold mb-4">Credential Information</h2>
          <form className="space-y-4">
            {records.map((record, index) => (
              <div key={index}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Credential License ID</label>
                  <input
                    type="text"
                    placeholder="Enter license ID"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Recipient ID</label>
                  <input
                    type="text"
                    placeholder="Enter recipient ID"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Recipient Name</label>
                  <input
                    type="text"
                    placeholder="Enter recipient name"
                    value={record.name}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    onChange={(e) => handleTextChange(index, 'name', 'value', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Recipient Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={record.email}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Grade</label>
                  <input
                    type="text"
                    placeholder="Enter grade"
                    value={record.grade}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    onChange={(e) => handleTextChange(index, 'grade', 'value', e.target.value)}
                  />
                </div>
                <div className="flex space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                    <input
                      type="date"
                      value={record.issueDate}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded"
                      onChange={(e) => handleTextChange(index, 'issueDate', 'value', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                      type="date"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>

                {/* Text Styling Controls */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Font Size</label>
                  <input
                    type="number"
                    value={globalTextProperties.size}
                    onChange={(e) => handleGlobalTextChange('size', e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Font Color</label>
                  <input
                    type="color"
                    value={globalTextProperties.color}
                    onChange={(e) => handleGlobalTextChange('color', e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Font Family</label>
                  <select
                    value={globalTextProperties.font}
                    onChange={(e) => handleGlobalTextChange('font', e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                  </select>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addStudentAndCertificate(records)}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Save Credentials
            </button>
           
          </form>
        </div>

        {/* Right Panel: Preview */}
        <div className="w-1/2 bg-white shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Credential Preview</h2>
          <div className="relative bg-gray-200">
            <img src={templateSrc} alt="Template" className="w-full h-auto" />

            {/* Preview Text Fields */}
            {records.map((record, index) => (
              <React.Fragment key={index}>
                <Draggable
                  defaultPosition={textProperties[index].name.position}
                  onStop={(e, data) => handleTextChange(index, 'name', 'position', { x: data.x, y: data.y })}
                >
                  <div
                    style={{
                      position: 'absolute',
                      fontSize: textProperties[index].name.size,
                      color: textProperties[index].name.color,
                      fontFamily: textProperties[index].name.font,
                    }}
                  >
                    {record.name}
                  </div>
                </Draggable>

                <Draggable
                  defaultPosition={textProperties[index].grade.position}
                  onStop={(e, data) => handleTextChange(index, 'grade', 'position', { x: data.x, y: data.y })}
                >
                  <div
                    style={{
                      position: 'absolute',
                      fontSize: textProperties[index].grade.size,
                      color: textProperties[index].grade.color,
                      fontFamily: textProperties[index].grade.font,
                    }}
                  >
                    {record.grade}
                  </div>
                </Draggable>

                <Draggable
                  defaultPosition={textProperties[index].issueDate.position}
                  onStop={(e, data) => handleTextChange(index, 'issueDate', 'position', { x: data.x, y: data.y })}
                >
                  <div
                    style={{
                      position: 'absolute',
                      fontSize: textProperties[index].issueDate.size,
                      color: textProperties[index].issueDate.color,
                      fontFamily: textProperties[index].issueDate.font,
                    }}
                  >
                    {record.issueDate}
                  </div>
                </Draggable>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialForm;

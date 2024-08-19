// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

function MyForm() {
  const [displayName, setDisplayName] = useState('');
  const [identifiers, setIdentifiers] = useState('');
  const [courseWebsite, setCourseWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      displayName,
      identifiers,
      courseWebsite,
      description,
      skills,
      category,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("cer3.jpg")' }}>
      <div className="bg-white bg-opacity-50 p-8 rounded-3xl shadow-lg w-full max-w-md border-4 border-green-600 mt-20">
        <h1 className="text-3xl font-semibold mb-6 text-center text-green-700">My Form</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Display Name:</label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="identifiers" className="block text-sm font-medium text-gray-700">Identifiers:</label>
            <input
              id="identifiers"
              type="text"
              value={identifiers}
              onChange={(e) => setIdentifiers(e.target.value)}
              className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="courseWebsite" className="block text-sm font-medium text-gray-700">Course Website:</label>
            <input
              id="courseWebsite"
              type="url"
              value={courseWebsite}
              onChange={(e) => setCourseWebsite(e.target.value)}
              className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills:</label>
            <input
              id="skills"
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyForm;

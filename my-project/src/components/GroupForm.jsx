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
    <div className="min-h-screen flex items-center justify-center">

    <form onSubmit={handleSubmit} className="space-y-4 p-4   bg-white shadow-md rounded w-1/2 " >
      <div>
        <label htmlFor="displayName" className="block text-gray-700 font-medium mb-2">Display Name:</label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label htmlFor="identifiers" className="block text-gray-700 font-medium mb-2">Identifiers:</label>
        <input
          id="identifiers"
          type="text"
          value={identifiers}
          onChange={(e) => setIdentifiers(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label htmlFor="courseWebsite" className="block text-gray-700 font-medium mb-2">Course Website:</label>
        <input
          id="courseWebsite"
          type="url"
          value={courseWebsite}
          onChange={(e) => setCourseWebsite(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label htmlFor="skills" className="block text-gray-700 font-medium mb-2">Skills:</label>
        <input
          id="skills"
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category:</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
    </form>
    </div>
  );
}

export default MyForm;

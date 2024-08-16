// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';

function CredentialDetails() {
  const { id } = useParams(); // Get the ID from the URL

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-semibold mb-4">Credential Details</h1>
      <p>Displaying details for credential ID: {id}</p>
      {/* You can add more information or a form to display or edit the credential */}
    </div>
  );
}

export default CredentialDetails;

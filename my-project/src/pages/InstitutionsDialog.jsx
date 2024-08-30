// InstitutionsDialog.jsx
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, Button } from '@mui/material';

const InstitutionsDialog = ({ open, onClose, onApply }) => {
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);

  useEffect(() => {
    // Fetch the list of institutions from your PHP script
    fetch('http://localhost/certificate/fetch.php')
      .then(response => response.json())
      .then(data => {
        setInstitutions(data);
      })
      .catch(error => console.error('Error fetching institutions:', error));
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedInstitutions(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    onApply(selectedInstitutions);  // Pass selected institutions back to parent component
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Institutions</DialogTitle>
      <DialogContent>
        {institutions.map(institution => (
          <div key={institution.id} className="flex items-center mb-2">
            <Checkbox
              checked={selectedInstitutions.includes(institution.id)}
              onChange={() => handleCheckboxChange(institution.id)}
            />
            <span>{institution.institutionName}</span>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApply} color="primary">Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InstitutionsDialog;

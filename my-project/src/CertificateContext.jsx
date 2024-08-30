// src/CertificateContext.js
// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';

export const CertificateContext = createContext();

export const CertificateProvider = ({ children }) => {
    const [certificateData, setCertificateData] = useState({});
    const [recipientData, setRecipientData] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const updateCertificateData = (newData) => {
        setCertificateData(prevData => ({ ...prevData, ...newData }));
    };

    const addRecipientData = (newRecipient) => {
        setRecipientData([...recipientData, newRecipient]);
    };

    const contextValue = {
        certificateData,
        updateCertificateData,
        recipientData,
        addRecipientData,
        selectedTemplate,
        setSelectedTemplate,
    };

    return (
        <CertificateContext.Provider value={contextValue}>
            {children}
        </CertificateContext.Provider>
    );
};
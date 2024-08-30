//to check context
// src/pages/CertificatePreview.jsx
import React, { useContext } from 'react';
import { CertificateContext } from '../CertificateContext';

const CertificatePreview = () => {
    const { certificateData } = useContext(CertificateContext);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-md rounded p-4 w-1/2">
                <h2 className="text-2xl font-bold mb-4">Certificate Preview</h2>
                <div className="space-y-4">
                    <div>
                        <strong>Display Name:</strong> {certificateData.displayName || "N/A"}
                    </div>
                    <div>
                        <strong>Identifiers:</strong> {certificateData.identifiers || "N/A"}
                    </div>
                    <div>
                        <strong>Course Website:</strong> {certificateData.courseWebsite || "N/A"}
                    </div>
                    <div>
                        <strong>Description:</strong> <div dangerouslySetInnerHTML={{ __html: certificateData.description }} />
                    </div>
                    <div>
                        <strong>Skills:</strong> {certificateData.skills ? certificateData.skills.map(skill => skill.text).join(', ') : "N/A"}
                    </div>
                    <div>
                        <strong>Category:</strong> {certificateData.category || "N/A"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CertificatePreview;
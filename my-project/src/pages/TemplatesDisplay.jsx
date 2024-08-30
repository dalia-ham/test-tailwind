/* eslint-disable no-unused-vars */
// TemplatesDisplay.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function TemplatesDisplay() {
    const { institutions_id } = useParams();
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // تأكد من استخدام useNavigate بشكل صحيح

    const handleTemplateSelect = (templateSrc) => {
        // الانتقال إلى صفحة Emails مع تمرير templateSrc
        navigate('/Emails', { state: { templateSrc } });
    };

    useEffect(() => {
        fetch(`http://localhost/certificate/getTemplate.php?institutions_id=${institutions_id}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setTemplates(data.photos);
                } else {
                    console.error('Error fetching templates:', data.message);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching templates:', error);
                setLoading(false);
            });
    }, [institutions_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Templates for Institution {institutions_id}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {templates.map((template, index) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-lg">
                        <img
                            src={template.photo_url}
                            alt={`Template ${index + 1}`}
                            className="w-full h-64 object-cover mb-2 cursor-pointer"
                            onClick={() => handleTemplateSelect(template.photo_url)} // استدعاء handleTemplateSelect مع template.photo_url
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TemplatesDisplay;

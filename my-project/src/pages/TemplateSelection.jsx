// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';

function TemplateSelection() {
    const navigate = useNavigate();

    const handleTemplateSelect = (templateId, templateSrc) => {
      // navigate('/template-view', { state: { templateSrc } });
        navigate('/Emails', { state: { templateSrc } });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-8">Select a Template</h1>
            <div className="space-y-4">
                <img
                    src="src/image/2.png"
                    alt="Template 1"
                    className="cursor-pointer w-24 h-24 object-cover"
                    onClick={() => handleTemplateSelect(1, 'src/image/2.png')}
                />
                <img
                    src="src/image/4.png"
                    alt="Template 2"
                    className="cursor-pointer w-24 h-24 object-cover"
                    onClick={() => handleTemplateSelect(2, 'src/image/4.png')}
                />
                {/* يمكنك إضافة المزيد من التمبلتات هنا */}
            </div>
        </div>
    );
}

export default TemplateSelection;
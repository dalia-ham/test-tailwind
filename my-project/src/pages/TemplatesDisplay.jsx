

// import React, { useState, useEffect } from 'react'; // تأكد من وجود هذا السطر
// import { useParams } from 'react-router-dom';

// function TemplatesDisplay() {
//     const { id } = useParams();
//     const [templates, setTemplates] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetch(`http://localhost/certificate/getTemplate.php?institutions_id=${id}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data.status === 'success') {
//                     setTemplates(data.photos);
//                 } else {
//                     console.error('Error fetching templates:', data.message);
//                 }
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching templates:', error);
//                 setLoading(false);
//             });
//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="flex flex-col items-center h-screen bg-gray-100">
//             <h1 className="text-3xl font-bold mb-6">Templates for Institution {id}</h1>
//             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {templates.map((template, index) => (
//                     <div key={index} className="p-4 border border-gray-300 rounded-lg">
//                         <img
//                             src={template.photo_url}
//                             alt={`Template ${index + 1}`} // Corrected here
//                             className="w-full h-64 object-cover mb-2"
//                         />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default TemplatesDisplay;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TemplatesDisplay() {
    const { id } = useParams();
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost/certificate/getTemplate.php?institutions_id=${id}`)
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
    }, [id]);

    const handleTemplateClick = (template) => {
        // التنقل إلى صفحة Form مع بيانات القالب
        navigate('/Emails', { state: { templateSrc: template.photo_url } });
        

    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Templates for Institution {id}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {templates.map((template, index) => (
                    <div 
                        key={index} 
                        className="p-4 border border-gray-300 rounded-lg cursor-pointer"
                        onClick={() => handleTemplateClick(template)} // إرسال كامل القالب
                    >
                        <img
                            src={template.photo_url}
                            alt={`Template ${index + 1}`}
                            className="w-full h-64 object-cover mb-2"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TemplatesDisplay;



// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Modal({ isOpen, onClose, onSubmit, newCredential, handleInputChange, handleFileChange }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    &times;
                </button>
                <form onSubmit={onSubmit} className="flex flex-col">
                    <label className="mb-2 text-lg text-green-900 font-bold">
                        Credential Name:
                        <input
                            type="text"
                            name="text"
                            // eslint-disable-next-line react/prop-types
                            value={newCredential.text}
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-2 text-base border border-gray-900 rounded bg-gray-200 w-full text-green-900"
                        />
                    </label>
                    <label className="mb-2 text-lg text-green-900 font-bold">
                        Image File:
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            required
                            className="mt-1 p-2 text-base border border-gray-900 rounded bg-gray-200 w-full"
                        />
                    </label>
                    <label className="mb-2 text-lg text-green-900 font-bold">
                        Button Color:
                        <input
                            type="color"
                            name="color"
                            // eslint-disable-next-line react/prop-types
                            value={newCredential.color}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border-none rounded w-full"
                        />
                    </label>
                    <button type="submit" className="mt-3 px-4 py-2 bg-green-700 text-gray-900 font-semibold rounded hover:bg-green-800">
                        Add Credential
                    </button>
                </form>
            </div>
        </div>
    );
}

function CredentialButtons() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [newCredential, setNewCredential] = useState({
        id: '',
        imgSrc: '',
        text: '',
        color: '#007bff'
    });
    const [credentials, setCredentials] = useState([
        { id: 'button1', imgSrc: '/image3.png', text: 'Course completion certificate', color: '#D9DAD9' },
        { id: 'button2', imgSrc: '/image.png', text: 'Certificate of appreciation', color: '#68A4A5' },
        { id: 'button3', imgSrc: '/image2.png', text: 'Volunteer work certificate', color: '#4C8055' },
    ]);

    // Filter credentials based on search query
    const filteredCredentials = credentials.filter(credential =>
        credential.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle input changes for the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCredential(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle file upload and set image preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewCredential(prevState => ({
                    ...prevState,
                    imgSrc: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission and add new credential
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setCredentials(prevCredentials => [
            ...prevCredentials,
            { ...newCredential, id: `button${prevCredentials.length + 1}` }
        ]);
        setNewCredential({ id: '', imgSrc: '', text: '', color: '#007bff' });
        setShowForm(false);
    };

    // Handle credential button click
    const handleCredentialClick = (id) => {
        navigate(`/Pathways/${id}`);
    };

    return (
        <div className="flex flex-col items-center h-screen bg-cover bg-center bg-no-repeat bg-gray-100" style={{ backgroundImage: 'url(/background0.jpg)', paddingTop: '120px' }}>
            <h1 className="text-4xl font-cursive mb-4 text-gray-800">Credential</h1>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 p-3 text-lg border border-green-700 rounded bg-white max-w-md w-full"
            />
            <div className="flex flex-wrap justify-center gap-12 mt-10">
                {filteredCredentials.map((credential) => (
                    <button
                        key={credential.id}
                        className="flex flex-col items-center justify-center p-6 border-none rounded-lg text-xl font-bold text-gray-900 w-52 h-52 transition-transform transform hover:scale-105 hover:shadow-lg"
                        style={{ backgroundColor: credential.color }}
                        onClick={() => handleCredentialClick(credential.id)}
                    >
                        <img src={credential.imgSrc} alt={credential.text} className="w-20 h-16 mb-2" />
                        <span>{credential.text}</span>
                    </button>
                ))}
            </div>
            <a href="#" className="mt-5 text-blue-500 text-lg" onClick={() => setShowForm(true)}>
                Add New Credential
            </a>
            <Modal
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                onSubmit={handleFormSubmit}
                newCredential={newCredential}
                handleInputChange={handleInputChange}
                handleFileChange={handleFileChange}
            />
        </div>
    );
}

export default CredentialButtons;



// eslint-disable-next-line no-unused-vars
// import React, { useState } from 'react';

// // Modal Component
// // eslint-disable-next-line react/prop-types
// function Modal({ isOpen, onClose, onSubmit, newCredential, handleInputChange, handleFileChange }) {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
//             <div className="bg-white p-6 rounded-lg max-w-sm w-full">
//                 <button
//                     className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//                     onClick={onClose}
//                 >
//                     &times;
//                 </button>
//                 <form onSubmit={onSubmit} className="flex flex-col">
//                     <label className="mb-2 text-lg text-green-900 font-bold">
//                         Credential Name:
//                         <input
//                             type="text"
//                             name="text"
//                             // eslint-disable-next-line react/prop-types
//                             value={newCredential.text}
//                             onChange={handleInputChange}
//                             required
//                             className="mt-1 p-2 text-base border border-gray-900 rounded bg-gray-200 w-full text-green-900"
//                         />
//                     </label>
//                     <label className="mb-2 text-lg text-green-900 font-bold">
//                         Image File:
//                         <input
//                             type="file"
//                             onChange={handleFileChange}
//                             accept="image/*"
//                             required
//                             className="mt-1 p-2 text-base border border-gray-900 rounded bg-gray-200 w-full"
//                         />
//                     </label>
//                     <label className="mb-2 text-lg text-green-900 font-bold">
//                         Button Color:
//                         <input
//                             type="color"
//                             name="color"
//                             // eslint-disable-next-line react/prop-types
//                             value={newCredential.color}
//                             onChange={handleInputChange}
//                             className="mt-1 p-2 border-none rounded w-full"
//                         />
//                     </label>
//                     <button type="submit" className="mt-3 px-4 py-2 bg-green-700 text-gray-900 font-semibold rounded hover:bg-green-800">
//                         Add Credential
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// // Main Component
// function Credentials() {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [showForm, setShowForm] = useState(false);
//     const [newCredential, setNewCredential] = useState({
//         id: '',
//         imgSrc: '',
//         text: '',
//         color: '#007bff'
//     });
//     const [credentials, setCredentials] = useState([
//         { id: 'button1', imgSrc: '/image3.png', text: 'Course completion certificate', color: '#D9DAD9' },
//         { id: 'button2', imgSrc: '/image.png', text: 'Certificate of appreciation', color: '#68A4A5' },
//         { id: 'button3', imgSrc: '/image2.png', text: 'Volunteer work certificate', color: '#4C8055' },
//     ]);

//     // Filter credentials based on search query
//     const filteredCredentials = credentials.filter(credential =>
//         credential.text.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // Handle input changes for the form
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewCredential(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     // Handle file upload and set image preview
//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setNewCredential(prevState => ({
//                     ...prevState,
//                     imgSrc: reader.result
//                 }));
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // Handle form submission and add new credential
//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         setCredentials(prevCredentials => [
//             ...prevCredentials,
//             { ...newCredential, id: `button${prevCredentials.length + 1}` }
//         ]);
//         setNewCredential({ id: '', imgSrc: '', text: '', color: '#007bff' });
//         setShowForm(false);
//     };

//     return (
//         <div className="flex flex-col items-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background0.jpg)', paddingTop: '120px' }}>
//             <h1 className="text-4xl font-cursive mb-4 text-gray-800">Credential</h1>
//             <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="mb-4 p-3 text-lg border border-green-700 rounded bg-white max-w-md w-full"
//             />
//             <div className="flex flex-wrap justify-center gap-12 mt-10">
//                 {filteredCredentials.map((credential) => (
//                     <button
//                         key={credential.id}
//                         className="flex flex-col items-center justify-center p-6 border-none rounded-lg text-xl font-bold text-gray-900 w-52 h-52 transition-transform transform hover:scale-105 hover:shadow-lg"
//                         style={{ backgroundColor: credential.color }}
//                     >
//                         <img src={credential.imgSrc} alt={credential.text} className="w-20 h-16 mb-2" />
//                         <span>{credential.text}</span>
//                     </button>
//                 ))}
//             </div>
//             <a href="#" className="mt-5 text-blue-500 text-lg" onClick={() => setShowForm(true)}>
//                 Add New Credential
//             </a>
//             <Modal
//                 isOpen={showForm}
//                 onClose={() => setShowForm(false)}
//                 onSubmit={handleFormSubmit}
//                 newCredential={newCredential}
//                 handleInputChange={handleInputChange}
//                 handleFileChange={handleFileChange}
//             />
//         </div>
//     );
// }

// export default Credentials;

// import '../style.css';

// function Credentials() {
//     return (
//         <div className="container">
//             <h1>Credential</h1>
//             <div className="button-container">
//                 <button className="button" id="button1">
//                     <img src="/image3.png" alt="Image 1" />
//                     <span>Course completion certificate</span>
//                 </button>
//                 <button className="button" id="button2">
//                     <img src="/image.png" alt="Image 2" />
//                     <span>Certificate of appreciation</span>
//                 </button>
//                 <button className="button" id="button3">
//                     <img src="/image2.png" alt="Image 3" />
//                     <span>Volunteer work certificate</span>
//                 </button>
//             </div>
//             <a href="#" id="add-credential-link">Add New Credential</a>

//         </div>
//     );
// }

// export default Credentials;



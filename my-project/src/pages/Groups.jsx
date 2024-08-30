/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CredentialButtons() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [newCredential, setNewCredential] = useState({
        text: '',
        imgSrc: '',
    });
    const [credentials, setCredentials] = useState([]);

    useEffect(() => {
        fetch('http://localhost/certificate/fetch.php')
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map(item => ({
                    id: item.id, // الحفاظ على المعرف الفريد للمؤسسة
                    imgSrc: item.photo, // استخدام رابط الصورة
                    text: item.institutionName,
                    color: getRandomGreenColor()
                }));
                setCredentials(formattedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredCredentials = credentials.filter(credential =>
        credential.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCredential(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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

    const getRandomGreenColor = () => {
        const greenShades = ['#4CAF50', '#8BC34A', '#388E3C', '#43A047', '#66BB6A', '#81C784', '#A5D6A7'];
        return greenShades[Math.floor(Math.random() * greenShades.length)];
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('institutionName', newCredential.text);
        formData.append('photo', document.querySelector('input[type="file"]').files[0]);

        fetch('http://localhost/certificate/insert.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const newId = credentials.length + 1; // استخدام الطول كمعرف جديد
                    const newColor = getRandomGreenColor();
                    setCredentials(prevCredentials => [
                        ...prevCredentials,
                        { ...newCredential, id: newId, color: newColor }
                    ]);
                    setNewCredential({ text: '', imgSrc: '' });
                    setShowForm(false);
                } else {
                    console.error('Error adding credential:', data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const handleCredentialClick = (institutions_id) => {
        navigate(`/templates/${institutions_id}`);
    };

    return (
        <div className="flex flex-col items-center h-screen bg-cover bg-center bg-no-repeat bg-gray-100" style={{ backgroundImage: 'url(/background0.jpg)' }}>
            <h1 className="text-3xl font-bold italic mb-6 text-gray-800 mt-32">Credential</h1>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 mt-8 p-3 text-lg border border-green-700 rounded bg-white max-w-md w-full mt-16"
            />
            <div className="flex flex-wrap justify-center gap-12 ">
                {filteredCredentials.map((credential) => (
                    <button
                        key={credential.id}
                        className="flex flex-col items-center justify-center p-6 border-none rounded-lg text-xl font-bold text-gray-900 w-52 h-52 transition-transform transform hover:scale-105 hover:shadow-lg"
                        style={{ backgroundColor: credential.color }}
                        onClick={() => handleCredentialClick(credential.id)} // تمرير معرف المؤسسة
                    >
                        <img src={credential.imgSrc} alt={credential.text} className="w-20 h-16 mb-2" />
                        <span>{credential.text}</span>
                    </button>
                ))}
            </div>
            <button 
                onClick={() => setShowForm(true)} 
                className="mt-5 text-blue-500 text-lg bg-transparent border-none hover:underline"
            >
                Add New Credential
            </button>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
                        <button
                            type="button"
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowForm(false)}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <form onSubmit={handleFormSubmit} className="flex flex-col">
                            <label className="mb-2 text-lg text-green-900 font-bold">
                                Credential Name:
                                <input
                                    type="text"
                                    name="text"
                                    value={newCredential.text}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 p-2 text-base border border-gray-300 rounded bg-gray-200 w-full text-green-900"
                                />
                            </label>
                            <label className="mb-2 text-lg text-green-900 font-bold">
                                Image File:
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    required
                                    className="mt-1 p-2 border border-gray-300 rounded bg-gray-200 w-full"
                                />
                            </label>
                            <div className="flex justify-between mt-3">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-700 text-white font-semibold rounded hover:bg-green-800"
                                >
                                    Add Credential
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CredentialButtons;

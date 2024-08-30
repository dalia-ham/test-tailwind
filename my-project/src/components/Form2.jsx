// // eslint-disable-next-line no-unused-vars
// import React, { useState, useRef } from 'react';

// function MyForm() {
//   const [displayName, setDisplayName] = useState('');
//   const [identifiers, setIdentifiers] = useState('');
//   const [courseWebsite, setCourseWebsite] = useState('');
//   const [description, setDescription] = useState('');
//   const [skills, setSkills] = useState([]);
//   const [category, setCategory] = useState('');
//   const descriptionRef = useRef(null);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log({
//       displayName,
//       identifiers,
//       courseWebsite,
//       description,
//       skills,
//       category,
//     });
//   };

//   const handleDelete = (i) => {
//     setSkills(skills.filter((_, index) => index !== i));
//   };

//   const handleAddition = (tag) => {
//     setSkills([...skills, tag]);
//   };

//   const formatText = (command) => {
//     document.execCommand(command, false, null);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-200 to-green-600 pt-16">
//       <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded w-1/2 border-4 border-green-600">
//         <div>
//           <label htmlFor="displayName" className="block text-gray-700 font-medium mb-2">Display Name:</label>
//           <input
//             id="displayName"
//             type="text"
//             value={displayName}
//             onChange={(e) => setDisplayName(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             autoComplete="name"
//           />
//         </div>
//         <div>
//           <label htmlFor="identifiers" className="block text-gray-700 font-medium mb-2">Identifiers:</label>
//           <input
//             id="identifiers"
//             type="text"
//             value={identifiers}
//             onChange={(e) => setIdentifiers(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             autoComplete="identifier"
//           />
//         </div>
//         <div>
//           <label htmlFor="courseWebsite" className="block text-gray-700 font-medium mb-2">Course Website:</label>
//           <input
//             id="courseWebsite"
//             type="url"
//             value={courseWebsite}
//             onChange={(e) => setCourseWebsite(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             autoComplete="url"
//           />
//         </div>
//         <div>
//           <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description:</label>
//           <div className="mb-2 flex space-x-2">
//             <button type="button" onClick={() => formatText('bold')} className="p-2 bg-gray-200 hover:bg-gray-300 rounded">
//               <strong>B</strong>
//             </button>
//             <button type="button" onClick={() => formatText('italic')} className="p-2 bg-gray-200 hover:bg-gray-300 rounded">
//               <em>I</em>
//             </button>
//             <button type="button" onClick={() => formatText('underline')} className="p-2 bg-gray-200 hover:bg-gray-300 rounded">
//               <u>U</u>
//             </button>
//             <button type="button" onClick={() => formatText('strikeThrough')} className="p-2 bg-gray-200 hover:bg-gray-300 rounded">
//               <s>S</s>
//             </button>
//           </div>
//           <div
//             contentEditable
//             ref={descriptionRef}
//             onInput={(e) => setDescription(e.currentTarget.innerHTML)}
//             className="w-full p-2 border border-gray-300 rounded h-32 overflow-y-auto"
//             dir="auto"
//             dangerouslySetInnerHTML={{ __html: description }}
//           />
//         </div>
//         <div>
//           <label htmlFor="skills" className="block text-gray-700 font-medium mb-2">Skills:</label>
//           <div className="flex flex-wrap p-2 border border-gray-300 rounded">
//             {skills.map((skill, index) => (
//               <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mt-2 flex items-center">
//                 {skill.text}
//                 <button type="button" onClick={() => handleDelete(index)} className="ml-2 text-red-500 cursor-pointer">
//                   ×
//                 </button>
//               </span>
//             ))}
//           </div>
//           <input
//             type="text"
//             placeholder="Add a skill"
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && e.target.value.trim() !== '') {
//                 handleAddition({ id: e.target.value, text: e.target.value });
//                 e.target.value = '';
//               }
//             }}
//             className="border border-gray-300 w-full p-2 mt-2 rounded"
//             autoComplete="off"
//           />
//         </div>
//         <div>
//           <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category:</label>
//           <input
//             id="category"
//             type="text"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             autoComplete="category"
//           />
//         </div>
//         <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default MyForm;



//src/pages/ContentForm.jsx
import React, { useState, useContext, useRef } from 'react';
import { CertificateContext } from '../CertificateContext';
import { useNavigate } from 'react-router-dom';

function ContentForm() {
    const { updateCertificateData } = useContext(CertificateContext);
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState('');
    const [identifiers, setIdentifiers] = useState('');
    const [courseWebsite, setCourseWebsite] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState([]);
    const [category, setCategory] = useState('');
    const descriptionRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            displayName,
            identifiers,
            courseWebsite,
            description,
            skills,
            category,
        };
        updateCertificateData(formData);
        console.log(formData);
        navigate('/template-selection')
        //just to test strorage in context
       // navigate('/certificate-preview');
    };

    const handleDelete = (i) => {
        setSkills(skills.filter((_, index) => index !== i));
    };

    const handleAddition = (tag) => {
        setSkills([...skills, tag]);
    };

    const formatText = (command) => {
        document.execCommand(command, false, null);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-green shadow-md rounded w-1/2">
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
                    <div className="mb-2 flex space-x-2">
                        <button type="button" onClick={() => formatText('bold')} className="p-2 bg-gray-200 hover:bg-gray-300 rounded">
                            <strong>B</strong>
                        </button>
                        <button type="button" onClick={() => formatText('italic')} className="p-2 bg-gray-200 hover:bg-gray-300 rounded">
                            <em>I</em>
                        </button>
                        <button type="button" onClick={() => formatText('underline')} className="p-2 bg-gray-200 hover:bg-gray-300 rounded">
                            <u>U</u>
                        </button>
                        <button type="button" onClick={() => formatText('strikeThrough')} className="p-2 bg-gray-200 hover:bg-gray-300 rounded">
                            <s>S</s>
                        </button>
                    </div>
                    <div
                        contentEditable
                        ref={descriptionRef}
                        onInput={(e) => setDescription(e.currentTarget.innerHTML)}
                        className="w-full p-2 border border-gray-300 rounded h-32 overflow-y-auto"
                        dir="auto"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </div>
                <div>
                    <label htmlFor="skills" className="block text-gray-700 font-medium mb-2">Skills:</label>
                    <div className="flex flex-wrap p-2 border border-gray-300 rounded">
                        {skills.map((skill, index) => (
                            <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mt-2 flex items-center">
                                {skill.text}
                                <button type="button" onClick={() => handleDelete(index)} className="ml-2 text-red-500 cursor-pointer">
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                    <input
    type="text"
    placeholder="Add a skill"
    onKeyDown={(e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            e.preventDefault(); // منع الفورم من التقديم عند الضغط على Enter
            handleAddition({ id: e.target.value, text: e.target.value });
            e.target.value = '';
        }
    }}
    className="border border-gray-300 w-full p-2 mt-2 rounded"
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

export default ContentForm;
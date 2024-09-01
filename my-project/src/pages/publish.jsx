// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const Publish = () => {
  const certificateRef = useRef();
  const [certificateData, setCertificateData] = useState(null);
  const [credentialId, setCredentialId] = useState(""); // state to store credential ID

  // Function to fetch certificate data from API
  const fetchCertificateData = async () => {
    try {
      const response = await axios.post("API_ENDPOINT", { id: credentialId }); // استبدل API_ENDPOINT بـ رابط API الخاص بك
      setCertificateData(response.data); // قم بتخزين بيانات الشهادة في حالة
    } catch (error) {
      console.error("Error fetching certificate data", error);
    }
  };

  const handleDownloadPDF = () => {
    const input = certificateRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("certificate.pdf");
    });
  };

  return (
    <div className="publish-page min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="mt-4">
        {/* Input field to enter credential ID */}
        <input
          type="text"
          placeholder="Enter Credential ID"
          value={credentialId}
          onChange={(e) => setCredentialId(e.target.value)}
          className="border border-gray-300 p-2 rounded mb-4"
        />

        <button
          onClick={fetchCertificateData}
          className="bg-blue-600 text-white py-2 px-4 rounded mb-4"
        >
          Fetch Certificate Data
        </button>
      </div>

      {certificateData && (
        <div
          ref={certificateRef}
          className="certificate-area bg-white p-8 border border-gray-300 rounded shadow-lg w-full max-w-4xl"
        >
          {/* Display Certificate Data */}
          <h1 className="text-2xl font-bold mt-4">Group: {certificateData.Group}</h1>
          <p className="text-lg">Status: {certificateData.status}</p>
          <p className="text-lg">Issue Date: {certificateData.issueDate}</p>
          <p className="text-lg">Expiry Date: {certificateData.ExpiryDate}</p>
          <p className="text-lg">Student ID: {certificateData.student_id}</p>
          <p className="text-lg">Institution ID: {certificateData.institution_id}</p>
          <p className="text-lg">Admin ID: {certificateData.admin_id}</p>
          {/* Any additional certificate content */}
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white py-2 px-4 rounded"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default Publish;













// // eslint-disable-next-line no-unused-vars
// import React, { useRef, useState } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import axios from "axios";

// const Publish = () => {
//   const certificateRef = useRef();
//   const [certificateData, setCertificateData] = useState(null);

//   // Function to fetch certificate data from API
//   const fetchCertificateData = async () => {
//     try {
//       const response = await axios.get("API_ENDPOINT"); // استبدل API_ENDPOINT بـ رابط API الخاص بك
//       setCertificateData(response.data); // قم بتخزين بيانات الشهادة في حالة
//     } catch (error) {
//       console.error("Error fetching certificate data", error);
//     }
//   };

//   const handleDownloadPDF = () => {
//     const input = certificateRef.current;
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("landscape", "pt", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("certificate.pdf");
//     });
//   };

//   return (
//     <div className="publish-page min-h-screen bg-gray-100 flex flex-col items-center p-4">
//       <div className="mt-4">
//         <button
//           onClick={fetchCertificateData}
//           className="bg-blue-600 text-white py-2 px-4 rounded mb-4"
//         >
//           Fetch Certificate Data
//         </button>
//       </div>

//       {certificateData && (
//         <div
//           ref={certificateRef}
//           className="certificate-area bg-white p-8 border border-gray-300 rounded shadow-lg w-full max-w-4xl"
//         >
//           {/* Display Certificate Image or Data */}
//           <img
//             src={certificateData.image} // استبدل هذا بحقل الصورة من استجابة API
//             alt="Certificate"
//             className="w-full h-auto"
//           />
//           <h1 className="text-2xl font-bold mt-4">{certificateData.title}</h1>
//           {/* Additional certificate content */}
//         </div>
//       )}

//       <div className="mt-4">
//         <button
//           onClick={handleDownloadPDF}
//           className="bg-green-600 text-white py-2 px-4 rounded"
//         >
//           Download as PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Publish;

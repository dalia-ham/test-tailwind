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
//       const response = await axios.get("publish.php"); // استبدل API_ENDPOINT بـ رابط API الخاص بك
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
//     <div className="publish-page min-h-screen bg-gradient-to-b from-green-200 to-green-800 flex flex-col items-center justify-center p-4">
//       <div className="mb-8">
//         <button
//           onClick={fetchCertificateData}
//           className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 transition-colors"
//         >
//           Fetch Certificate Data
//         </button>
//       </div>

//       {certificateData && (
//         <div
//           ref={certificateRef}
//           className="certificate-area bg-white p-8 border border-gray-300 rounded shadow-lg w-full max-w-4xl mt-8"
//         >
//           {/* Display Certificate Image or Data */}
//           <img
//             src={certificateData.image} // استبدل هذا بحقل الصورة من استجابة API
//             alt="Certificate"
//             className="w-full h-auto mb-4"
//           />
//           <h1 className="text-3xl font-bold">{certificateData.title}</h1>
//           {/* Additional certificate content */}
//         </div>
//       )}

//       <div className="mt-8">
//         <button
//           onClick={handleDownloadPDF}
//           className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 transition-colors"
//         >
//           Download as PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Publish;
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const Publish = () => {
  const certificateRef = useRef();
  const [certificateData, setCertificateData] = useState(null);
  const [credentialId, setCredentialId] = useState(""); // state to store credential ID
  const [loading, setLoading] = useState(false);

  // Function to fetch certificate data from API
  const fetchCertificateData = async () => {
    setLoading(true); // Set loading to true when starting the fetch
    try {
      const response = await axios.post("http://localhost/certificate/publish.php", { id: credentialId }); // Replace with your API endpoint
      if (response.data.status === "success") {
        setCertificateData(response.data); // Store certificate data in state
      } else {
        console.error(response.data.message);
        setCertificateData(null); // Clear certificate data on error
      }
    } catch (error) {
      console.error("Error fetching certificate data", error);
    } finally {
      setLoading(false); // Set loading to false after fetch completes
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
    <div className="publish-page min-h-screen bg-gradient-to-b from-green-200 to-green-600 flex flex-col items-center justify-center p-4">
      <div className="mt-4 w-full max-w-lg">
        {/* Input field to enter credential ID */}
        <input
          type="text"
          placeholder="Enter Credential ID"
          value={credentialId}
          onChange={(e) => setCredentialId(e.target.value)}
          className="border border-gray-300 p-2 rounded mb-4 w-full"
        />

        <button
          onClick={fetchCertificateData}
          className="bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          {loading ? "Fetching..." : "Fetch Certificate Data"}
        </button>
      </div>

      {certificateData && (
        <div
          ref={certificateRef}
          className="certificate-area bg-white p-8 border border-gray-300 rounded shadow-lg w-full max-w-4xl mt-8 flex flex-col items-center"
        >
          {/* Display Certificate Image */}
          {certificateData.photo && (
            <img
              src={certificateData.photo} // Assuming `photo` contains the URL of the image
              alt="Certificate"
              className="mb-4 w-full max-w-2xl"
            />
          )}
          {/* Display Certificate Data */}
          
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

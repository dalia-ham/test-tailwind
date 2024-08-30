
// import './App.css'
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/home';
// import Contact from './pages/Registrations';
// import Analystics from './pages/Analistics';
// import Credentials from './pages/Credintials';
// import Designs from './pages/Designs';
// import Emails from './pages/Emails';
// import Groups from './pages/Groups';
// import SignUp from './pages/SignUp';
// import Integrations from './pages/Integrations';
// import Pathways from './pages/Pathways';
// function App() {


//   return (
//   <>
//       <Navbar />
     
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/Registrations" element={<Contact />} />
//           <Route path="/Analistics" element={<Analystics />} />
//           <Route path="/Credintials" element={<Credentials />} />
//           <Route path="/Designs" element={<Designs />} />
//           <Route path="/Emails" element={<Emails />} />
//           <Route path="/Groups" element={<Groups />} />
//           <Route path="/Integrations" element={<Integrations />} />
//           <Route path="/Pathways" element={<Pathways />} />
//           <Route path="/SignUp" element={<SignUp />} />


//         </Routes>
//     <h1 className="text-3xl font-bold underline text-amber-500">
     
//     </h1>
//      </>
//   )
// }

// export default App;
// src/App.jsx
// src/App.jsx// src/App.jsx

// import './App.css';// src/App.jsx

//import { Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar';

import Home from './pages/home';
import Contact from './pages/Registrations';
import Analystics from './pages/Analistics';
import Credentials from './pages/Credintials';
import Emails from './pages/Emails';
import Groups from './pages/Groups';
import SignUp from './pages/SignUp';
import Integrations from './pages/Integrations';
import Pathways from './pages/Pathways';
import CertificateEditor from './pages/CertificateEditor';
import CredentialForm from './pages/credantial2';  // تأكد من استخدام الاسم الصحيح
import CertificatePreview from './pages/CertificatePreview';
// eslint-disable-next-line no-unused-vars
import { CertificateProvider } from './CertificateContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TemplateSelection from './pages/TemplateSelection';
import TemplatesDisplay from './pages/TemplatesDisplay';


function App() {
  return (
    <CertificateProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registrations" element={<Contact />} />
        <Route path="/Analistics" element={<Analystics />} />
        <Route path="/Credintials" element={<Credentials />} />
        <Route path="/Designs" element={<CertificateEditor />} />
        <Route path="/Emails" element={<Emails />} />
        <Route path="/Groups" element={<Groups />} />
        <Route path="/Integrations" element={<Integrations />} />
        <Route path="/Pathways" element={<Pathways />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/CredentialForm" element={<CredentialForm />} />  {}
        <Route path="/pathways/:id" element={<Pathways />} />
        <Route path="/certificate-preview" element={<CertificatePreview />} />
        <Route path="/template-selection" element={<TemplateSelection />} />
        <Route path="/templates/:institutions_id" element={<TemplatesDisplay />} /> {/* إضافة مسار عرض القوالب */}
      </Routes>
      <h1 className="text-3xl font-bold underline text-amber-500"></h1>
    </CertificateProvider >
  );
}

export default App;

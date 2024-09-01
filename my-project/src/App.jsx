import React from 'react';
import { Routes, Route } from 'react-router-dom'; // استخدم Routes و Route فقط
import Navbar from './components/Navbar';
import Home from './pages/home';
import Contact from './pages/Registrations';
import Analystics from './pages/Analistics';
import Credentials from './pages/Credintials';
import Emails from './pages/Emails';
import Groups from './pages/Groups';
import SignUp from './pages/SignUp';
import ContentForm from './pages/Integrations';
import Pathways from './pages/Pathways';
import CertificateEditor from './pages/CertificateEditor';
import CredentialForm from './pages/credantial3'; 
import CertificatePreview from './pages/CertificatePreview';
import { CertificateProvider } from './CertificateContext';
import TemplateSelection from './pages/TemplateSelection';
import TemplatesDisplay from './pages/TemplatesDisplay';
import MyForm from './components/GroupForm';
import InitialView from './pages/InitialView'; // Import InitialView

function App() {
  return (
    <CertificateProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        InitialView
        <Route path="/InitialView" element={<InitialView />} />

        <Route path="/Registrations" element={<Contact />} />
        <Route path="/Analistics" element={<Analystics />} />
        <Route path="/Credintials" element={<Credentials />} />
        <Route path="/Designs" element={<CertificateEditor />} />
        <Route path="/Emails" element={<Emails />} />
        <Route path="/Groups" element={<Groups />} />
        <Route path="/Integrations/:id" element={<ContentForm />} />
        <Route path="/Pathways/:id" element={<Pathways />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/CredentialForm" element={<CredentialForm />} />
        <Route path="/certificate-preview" element={<CertificatePreview />} />
        <Route path="/template-selection" element={<TemplateSelection />} />
        <Route path="/TemplatesDisplay/:id" element={<TemplatesDisplay />} />
        <Route path="/publish/" element={<publish />} />
      </Routes>
    </CertificateProvider>
  );
}

export default App;


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
import { Routes, Route } from 'react-router-dom';
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
// eslint-disable-next-line no-unused-vars
import credantial2 from './pages/credantial2';
import CreateCredentials from './pages/create_credentials';
function App() {
  return (
    <>
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
        <Route path="/CredentialDetails" element={<create_credentials />} />
        <Route path="/credantial2" element={<credantial2 />} />
        <Route path="/create_credentials" element={<create_credentials />} />
        <Route path="/pathways/:id" element={<Pathways />} />




      </Routes>
      <h1 className="text-3xl font-bold underline text-amber-500"></h1>
    </>
  );
}

export default App;

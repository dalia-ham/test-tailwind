
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Contact from './pages/Registrations';
import Analystics from './pages/Analistics';
import Credentials from './pages/Credintials';
import Designs from './pages/Designs';
import Emails from './pages/Emails';
import Groups from './pages/Groups';
import Integrations from './pages/Integrations';
import Pathways from './pages/Pathways';
function App() {


  return (
  <>
      <Navbar />
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Registrations" element={<Contact />} />
          <Route path="/Analistics" element={<Analystics />} />
          <Route path="/Credintials" element={<Credentials />} />
          <Route path="/Designs" element={<Designs />} />
          <Route path="/Emails" element={<Emails />} />
          <Route path="/Groups" element={<Groups />} />
          <Route path="/Integrations" element={<Integrations />} />
          <Route path="/Pathways" element={<Pathways />} />
        </Routes>
    <h1 className="text-3xl font-bold underline text-amber-400">
     
    </h1>
     </>
  )
}

export default App;

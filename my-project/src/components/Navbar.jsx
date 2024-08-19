import { Link } from 'react-router-dom';
import '../index.css';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-green-900 text-zinc-50 p-4 shadow-lg z-50">
      <ul className="flex space-x-4 justify-center">
        <li>
          <Link to="/" className="text-white hover:text-cyan-300">Home</Link>
        </li>
        <li>
          <Link to="/Registrations" className="text-white hover:text-cyan-300">Registrations</Link>
        </li>
        
        <li>
          <Link to="/Groups" className="text-white hover:text-cyan-300">Groups</Link>
        </li>
        <li>
          <Link to="/Designs" className="text-white hover:text-cyan-300">Designs</Link>
        </li>
        
       
        <li>
          <Link to="/Pathways" className="text-white hover:text-cyan-300">Pathways</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

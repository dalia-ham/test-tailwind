
import { Link } from 'react-router-dom';
import '../index.css';

function Navbar() {
  return (
    <nav className="bg-green-900 text-zinc-50 p-4 m  w-full">

<ul className="flex space-x-4 w-auto ">
<li>
  <Link to="/" className="text-white hover:text-cyan-300 ">Home</Link>
</li>

<li>
  <Link to="/Registrations" className="text-white hover:text-cyan-300">Registrations</Link>
</li>

<li>
  <Link to="/Analistics" className="text-white hover:cyan-300">Analistics</Link>
</li>
<li>
  <Link to="/Credintials" className="text-white hover:text-cyan-300">Credintials</Link>
</li>
<li>
  <Link to="/Designs" className="text-white hover:text-cyan-300">Designs</Link>
</li>

<li>
  <Link to="/Emails" className="text-white hover:text-cyan-300">Emails</Link>
</li>
<li>
  <Link to="/Groups" className="text-white hover:text-cyan-300">Groups</Link>
</li>
<li>
  <Link to="/Integrations" className="text-white hover:text-cyan-300">Integrations</Link>
</li>
<li>
  <Link to="/Pathways" className="text-white hover:text-cyan-300">Pathways</Link>
</li>


      </ul>
    </nav>
  );
}

export default Navbar;

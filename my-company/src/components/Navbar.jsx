import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ background: '#333', padding: '10px' }}>
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ marginRight: '20px' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/about" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>About</Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/services" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Services</Link>
        </li>
        <li>
          <Link to="/contact" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar; 